import { useState } from "react";

export default function TodoApp() {
  const [todoList, setTodoList] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: true },
  ]);

  return (
    <div>
      <TodoForm
        onAdd={(task) =>
          setTodoList([
            ...todoList,
            {id: Date.now(), text: task, completed: false}
          ])
        }
      ></TodoForm>
      <ul>
        {todoList.map((todo) => 
          <li key={todo.id}>{todo.text}</li>
        )}
      </ul>
    </div>
  );
}

function TodoForm({ onAdd }) {
  const [task, setTask] = useState('');

  return (
    <form onSubmit={(e) => { 
      e.preventDefault();
      onAdd(task);
      setTask('');
    }}>
      <input
        value={ task }
        onChange={e => setTask(e.target.value)}
        placeholder="Enter Task" />
      <button type="submit">Add Task</button>
    </form>
  );
}

