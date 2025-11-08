import { useState } from 'react';
import './App.css';

function App2() {
  // Áp dụng từ note1: JSX Syntax & Compilation Process
  // - Sử dụng JSX với cú pháp đúng
  // - Nhúng JavaScript vào JSX với {}
  // - Sử dụng className thay vì class
  // - Thẻ tự đóng với />

  // Áp dụng từ note2: JSX Expressions & JavaScript Embedding
  // - Sử dụng expressions trong {}
  // - Tính toán, gọi hàm
  // - Toán tử 3 ngôi
  // - Toán tử && cho conditional rendering
  // - Map array để render danh sách

  // Áp dụng từ note3: JSX Attributes vs HTML Attributes
  // - className thay vì class
  // - onClick thay vì onclick
  // - style dạng object
  // - camelCase cho attributes

  // Áp dụng từ note4: JSX Fragments & React.Fragment
  // - Sử dụng Fragment <>...</> để bọc nhiều elements

  // Áp dụng từ note5: Conditional Rendering
  // - if/else ngoài JSX
  // - Toán tử 3 ngôi
  // - Toán tử &&

  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [showDetails, setShowDetails] = useState(false);

  // Ví dụ từ note2: Array map
  const features = [
    { id: 1, name: 'JSX Syntax', desc: 'Viết HTML trong JS' },
    { id: 2, name: 'Expressions', desc: 'Nhúng JS vào JSX' },
    { id: 3, name: 'Attributes', desc: 'Thuộc tính JSX' },
    { id: 4, name: 'Fragments', desc: 'Bọc elements' },
    { id: 5, name: 'Conditional', desc: 'Render có điều kiện' }
  ];

  // Ví dụ từ note5: Conditional rendering với if/else
  const renderGreeting = () => {
    if (isLoggedIn) {
      return <h2>Xin chào! Bạn đã đăng nhập.</h2>;
    } else {
      return <h2>Vui lòng đăng nhập để tiếp tục.</h2>;
    }
  };

  return (
    <>
      {/* Header với Fragment */}
      <div className="app-header">
        <h1>React JSX Demo - Day 1</h1>
        <p>Học JSX từ note1 đến note5</p>
      </div>

      {/* Greeting với conditional rendering */}
      <div className="greeting-section">
        {renderGreeting()}
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="login-btn"
        >
          {isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
        </button>
      </div>

      {/* Counter với expressions và attributes */}
      <div className="counter-section">
        <h2>Counter Demo</h2>
        <div className="card">
          <button
            onClick={() => setCount(count => count + 1)}
            style={{
              backgroundColor: count > 5 ? '#4CAF50' : '#2196F3',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Count is {count}
          </button>
          <p>
            {count > 0 ? `Bạn đã click ${count} lần` : 'Chưa click lần nào'}
          </p>
          {/* Toán tử && từ note5 */}
          {count > 10 && <p style={{ color: 'red' }}>Bạn click nhiều quá!</p>}
        </div>
      </div>

      {/* Features list với map từ note2 */}
      <div className="features-section">
        <h2>Tính năng đã học</h2>
        <div className="features-grid">
          {features.map(feature => (
            <div key={feature.id} className="feature-card">
              <h3>{feature.name}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Details toggle với conditional rendering */}
      <div className="details-section">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="toggle-btn"
        >
          {showDetails ? 'Ẩn chi tiết' : 'Hiện chi tiết'}
        </button>

        {/* Toán tử && từ note5 */}
        {showDetails && (
          <div className="details-content">
            <h3>Chi tiết về JSX</h3>
            <ul>
              <li>JSX = JavaScript + XML</li>
              <li>Dùng {} để nhúng JavaScript</li>
              <li>className thay vì class</li>
              <li>Fragment để bọc nhiều elements</li>
              <li>Conditional rendering với if/else, ?:, &&</li>
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2024 React JSX Learning</p>
      </footer>
    </>
  );
}

export default App2;