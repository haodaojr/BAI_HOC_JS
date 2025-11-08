function Welcome({ isLoggedIn, userName }) {
  return (
    <div>
      {isLoggedIn ? (
        <h2>Xin chào, {userName} 👋</h2>
      ) : (
        <button>Đăng nhập</button>
      )}
    </div>
  );
}
export default Welcome;