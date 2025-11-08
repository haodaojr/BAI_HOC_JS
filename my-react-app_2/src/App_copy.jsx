import React from "react";
import UserCard from "./UserCard";

class App_copy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: "",
      age: "",
      city: "",
    };
  }

  // Lifecycle: Chạy khi component được tạo
  componentDidMount() {
    const initialUsers = [
      { id: 1, name: "Alice", age: 25, city: "Hà Nội" },
      { id: 2, name: "Bob", age: 30, city: "Hồ Chí Minh" },
    ];
    this.setState({ users: initialUsers });
  }

  // Lifecycle: Chạy khi state hoặc props thay đổi
  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      document.title = `Có ${this.state.users.length} người dùng`;
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  addUser = (e) => {
    e.preventDefault();
    const { name, age, city, users } = this.state;
    if (name && age && city) {
      const newUser = { id: users.length + 1, name, age: Number(age), city };
      this.setState({
        users: [...users, newUser],
        name: "",
        age: "",
        city: "",
      });
    } else {
      alert("Vui lòng nhập đủ tên, tuổi và thành phố!");
    }
  };

  render() {
    const { users, name, age, city } = this.state;
    return (
      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h1>Danh sách người dùng</h1>
        <form
          onSubmit={this.addUser}
          style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
        >
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            placeholder="Nhập tên"
          />
          <input
            type="number"
            name="age"
            value={age}
            onChange={this.handleInputChange}
            placeholder="Nhập tuổi"
          />
          <input
            type="text"
            name="city"
            value={city}
            onChange={this.handleInputChange}
            placeholder="Nhập thành phố"
          />
          <button type="submit" style={{ padding: "5px 10px" }}>
            Thêm
          </button>
        </form>
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
}

export default App_copy;
