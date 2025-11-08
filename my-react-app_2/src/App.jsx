import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";

function App() {
  // State cho danh sách người dùng
  const [users, setUsers] = useState([]);
  // State cho form nhập liệu
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  // useEffect để lấy dữ liệu ban đầu
  useEffect(() => {
    const initialUsers = [
      { id: 1, name: "Alice", age: 25, city: "Hà Nội" },
      { id: 2, name: "Bob", age: 30, city: "Hồ Chí Minh" },
    ];
    setUsers(initialUsers);
  }, []); // Chỉ chạy một lần khi component mount

  // useEffect để cập nhật tiêu đề
  useEffect(() => {
    document.title = `Có ${users.length} người dùng`;
  }, [users]); // Chạy khi users thay đổi

  // Hàm thêm người dùng mới
  const addUser = (e) => {
    e.preventDefault();
    // khi dùng e.preventDefault() mà nhấn nút gửi thì trang sẽ không load lại
    // nếu mà không dùng thì trang sẽ load lại
    if (name && age && city) {
      const newUser = { id: users.length + 1, name, age: Number(age), city };
      setUsers([...users, newUser]);
      setName("");
      setAge("");
      setCity("");
      // Xóa dữ liệu trong ô nhập (input) để chuẩn bị cho lần nhập tiếp theo.
    } else {
      alert("Vui lòng nhập đủ tên, tuổi và thành phố!");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h1>Danh sách người dùng {users.length}</h1>
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
      {/* Trong React (JSX), dấu ngoặc nhọn {} được dùng để nhúng biểu thức JavaScript vào trong HTML. */}
      {users.length === 0 ? (
        <p>Chưa có người dùng nào.</p>
      ) : (
        users.map((user) => (
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
        ))
      )}
    </div>
  );
}

export default App;
