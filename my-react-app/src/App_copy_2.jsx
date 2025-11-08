import React, { useState } from "react";
import UserCard from "./UserCard";
import "./App.css";

function App() {
  // State cho danh sách người dùng
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", age: 25, city: "Hà Nội" },
    { id: 2, name: "Bob", age: 30, city: "Hồ Chí Minh" },
    { id: 3, name: "Charlie", age: 35, city: "Đà Nẵng" },
  ]);

  // State cho form nhập liệu
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  // Hàm thêm người dùng mới
  const addUser = (e) => {
    e.preventDefault();
    if (name && age && city) {
      const newUser = { id: users.length + 1, name, age: Number(age), city };
      setUsers([...users, newUser]);
      setName("");
      setAge("");
      setCity("");
    } else {
      alert("Vui lòng nhập tên và tuổi va thành phố của người dùng!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Danh sách người dùng</h1>

      {/* Form thêm người dùng */}
      <form
        onSubmit={addUser}
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Nhập tuổi"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Nhập thành phố"
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Thêm
        </button>
      </form>

      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          age={user.age}
          city={user.city}
          onGreet={() =>
            alert(
              `Xin chào ${user.name}, Tuổi: ${user.age}, Thành phố: ${user.city}`
            )
          }
        />
      ))}
    </div>
  );
}

export default App;
