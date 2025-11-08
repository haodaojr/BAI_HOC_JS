import React from "react";

function TodoList({todos}) {
  // const todos = [
  //   { text: "Learn React", completed: false },
  //   { text: "Build a project", completed: true },
  //   { text: "Read documentation", completed: false },
  // ];
  return (
    <div className="todo-list">
      <h2>Todo List</h2>

      {todos.length === 0 ? (
        <p>Chua co gi de xem</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo.text} - {todo.completed ? "Done" : "Pending"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
