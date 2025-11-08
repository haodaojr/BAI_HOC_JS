function UserList({ users }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {users.map((user) => (
        <li
          key={user.id}
          style={{
            padding: "10px",
            margin: "5px 0",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
            color: "#333",
          }}
        >
          {user.name} - {user.age} tuổi - {user.job}
        </li>
      ))}
    </ul>
  );
}

export default UserList;
