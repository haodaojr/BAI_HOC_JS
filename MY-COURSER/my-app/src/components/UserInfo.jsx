function UserInfo({ name, age, job }) {
  return (
    <div>
      <h1>Xin chào, {name}!</h1>
      <p>
        Tôi {age} tuổi và hiện đang làm công việc: <strong>{job}</strong>
      </p>
    </div>
  );
}

export default UserInfo;
