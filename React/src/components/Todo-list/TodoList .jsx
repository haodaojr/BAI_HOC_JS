import React from "react";
const todos = [
  {
    id: 1,
    text: "Học React",
    completed: true,
    createdAt: "2025-10-21T08:00:00Z",
    updatedAt: "2025-10-21T09:00:00Z",
    priority: "high",
    deadline: "2025-10-25",
    note: "Hoàn thành chương useState",
    category: "learning",
  },
  {
    id: 2,
    text: "Dọn phòng",
    completed: false,
    createdAt: "2025-10-22T19:00:00Z",
    updatedAt: "2025-10-22T19:30:00Z",
    priority: "low",
    deadline: "2025-10-27",
    note: "Dọn bàn học và quét nhà",
    category: "home",
  },
  {
    id: 3,
    text: "Tập thể dục",
    completed: false,
    createdAt: "2025-10-22T20:00:00Z",
    updatedAt: "2025-10-22T20:00:00Z",
    priority: "medium",
    deadline: "2025-10-24",
    note: "Chạy bộ 30 phút",
    category: "health",
  },
];
const TodoList = () => {
  return (
    <div
      className="todo-container"
      style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}
    >
      <h2>📋 Danh sách công việc</h2>

      <form style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Nhập công việc..."
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Thêm
        </button>
      </form>

      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <button>Tất cả</button>
        <button>Hoàn thành</button>
        <button>Chưa làm</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              color: "#333",
              marginBottom: 10,
              padding: 10,
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  fontWeight: "bold",
                  color: todo.completed ? "gray" : "black",
                }}
              >
                {todo.text}
              </span>
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 6,
                  fontSize: 12,
                  backgroundColor:
                    todo.priority === "high"
                      ? "#ff6b6b"
                      : todo.priority === "medium"
                      ? "#ffd93d"
                      : "#6bcB77",
                  color: "white",
                }}
              >
                {todo.priority}
              </span>
            </div>

            <small>📅 Deadline: {todo.deadline}</small>
            <small>
              🕒 Tạo lúc: {new Date(todo.createdAt).toLocaleString()}
            </small>
            <small>🗂️ Danh mục: {todo.category}</small>
            <small>📝 Ghi chú: {todo.note}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
