import "./TodoApp.css";
import { useEffect, useState } from "react";

export default function TodoApp() {
  const [todoList, setTodoList] = useState(() => {
    const stored = localStorage.getItem('todoList');
    return stored
      ? JSON.parse(stored)
      : [
          { id: 1, text: "Learn React", completed: false },
          { id: 2, text: "Build a project", completed: true },
        ];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    },
    [todoList]
  );

  const filteredList = todoList.filter(todo => { 
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // all
  });

  return (
    <div className="todo-app">
      <TodoForm
        onAdd={(task) =>
          setTodoList((todoList) => [
            ...todoList,
            { id: Date.now(), text: task, completed: false },
          ])
        }
      />
      <FilterButtons value={filter} onFilter={(cond) => setFilter(cond) } />
      <ul className="todo-list"> 
        {filteredList.map((todoItem) => (
          <TodoItem
            key={todoItem.id}
            value={todoItem}
            onToggle={(isCompleted) =>
              setTodoList((todoList) =>
                todoList.map((item) =>
                  item.id === todoItem.id ? { ...item, completed: isCompleted } : item,
                ),
              )
            }
            onDelete={() => 
              setTodoList((todoList) => todoList.filter(item => item.id !== todoItem.id))
            }
          />
        ))}
      </ul>
    </div>
  );
}

function TodoForm({ onAdd }) {
  const [task, setTask] = useState("");

  return (
    <form className="todo-form"
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(task);
        setTask("");
      }}
    >
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter Task to do..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TodoItem({ value, onToggle, onDelete }) {
  return (
    <li className={ `todo-item ${value.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={value.completed}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <span>{value.text}</span>
      <button onClick={ onDelete }>Delete</button>
    </li>
  );
}

function FilterButtons({ value, onFilter }) {
  return (
    <div className="filter-buttons">
      <button disabled={ value === 'all'} onClick={() => onFilter("all")}>All</button>
      <button disabled={ value === 'active'} onClick={() => onFilter("active")}>Active</button>
      <button disabled={ value === 'completed'} onClick={() => onFilter("completed")}>Completed</button>
    </div>
  );
}
