# If/Else trong JSX (Ternary Operator)

## 1. Vấn Đề: Không Thể Dùng If/Else Trực Tiếp Trong JSX

```jsx
// ❌ SAI - Không thể dùng if/else trong JSX
function Greeting() {
  return (
    <div>
      {if (isLoggedIn) {
        <h1>Welcome back!</h1>
      } else {
        <h1>Please sign in</h1>
      }}
    </div>
  );
}
```

**Lý do**: JSX chỉ chấp nhận **expressions**, không chấp nhận **statements**.

- **Expression**: Trả về giá trị (`2 + 2`, `user.name`, `isTrue ? 'yes' : 'no'`)
- **Statement**: Không trả về giá trị (`if`, `for`, `while`)

---

## 2. Giải Pháp: Ternary Operator (Toán Tử Ba Ngôi)

### Cú pháp:
```javascript
condition ? expressionIfTrue : expressionIfFalse
```

### Ví dụ cơ bản:

```jsx
function Greeting() {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in</h1>}
    </div>
  );
}
```

---

## 3. Ví Dụ Thực Tế

### A. Login/Logout Button

```jsx
function LoginButton() {
  const isLoggedIn = false;

  return (
    <div>
      {isLoggedIn ? (
        <button>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
}
```

### B. User Profile

```jsx
function UserProfile() {
  const user = {
    name: 'John Doe',
    isPremium: true
  };

  return (
    <div>
      <h2>{user.name}</h2>
      {user.isPremium ? (
        <span style={{ color: 'gold' }}>⭐ Premium Member</span>
      ) : (
        <span style={{ color: 'gray' }}>Free Member</span>
      )}
    </div>
  );
}
```

### C. Loading State

```jsx
function DataDisplay() {
  const isLoading = true;
  const data = { title: 'React Tutorial', views: 1000 };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h3>{data.title}</h3>
          <p>{data.views} views</p>
        </div>
      )}
    </div>
  );
}
```

---

## 4. Multiple Conditions (Ternary Lồng Nhau)

```jsx
function UserStatus() {
  const status = 'premium'; // 'guest', 'member', 'premium'

  return (
    <div>
      <h2>Account Type:</h2>
      {status === 'guest' ? (
        <p>👤 Guest User</p>
      ) : status === 'member' ? (
        <p>🙂 Regular Member</p>
      ) : (
        <p>⭐ Premium Member</p>
      )}
    </div>
  );
}
```

**Lưu ý**: Ternary lồng nhau khó đọc! Nên tránh quá 2 cấp.

---

## 5. Ternary với JSX Phức Tạp

### Dùng dấu ngoặc đơn `()` để gom nhiều dòng:

```jsx
function ProductCard() {
  const product = {
    name: 'Laptop',
    price: 1000,
    inStock: true
  };

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      
      {product.inStock ? (
        <div>
          <button className="btn-primary">Add to Cart</button>
          <p style={{ color: 'green' }}>✅ In Stock</p>
        </div>
      ) : (
        <div>
          <button className="btn-disabled" disabled>Out of Stock</button>
          <p style={{ color: 'red' }}>❌ Not Available</p>
        </div>
      )}
    </div>
  );
}
```

---

## 6. Ternary vs If/Else Bên Ngoài JSX

### Cách 1: If/Else bên ngoài (Dễ đọc hơn với logic phức tạp)

```jsx
function Notification() {
  const type = 'error'; // 'success', 'warning', 'error'
  
  let icon;
  let color;
  let message;
  
  if (type === 'success') {
    icon = '✅';
    color = 'green';
    message = 'Operation successful!';
  } else if (type === 'warning') {
    icon = '⚠️';
    color = 'orange';
    message = 'Please be careful!';
  } else {
    icon = '❌';
    color = 'red';
    message = 'Something went wrong!';
  }

  return (
    <div style={{ color: color }}>
      {icon} {message}
    </div>
  );
}
```

### Cách 2: Ternary trong JSX (Ngắn gọn với logic đơn giản)

```jsx
function Notification() {
  const type = 'error';

  return (
    <div style={{ 
      color: type === 'success' ? 'green' : type === 'warning' ? 'orange' : 'red' 
    }}>
      {type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '❌'}
      {type === 'success' ? 'Success!' : type === 'warning' ? 'Warning!' : 'Error!'}
    </div>
  );
}
```

---

## 7. Ternary với Inline Styles

```jsx
function Button() {
  const isActive = true;

  return (
    <button
      style={{
        backgroundColor: isActive ? '#007bff' : '#ccc',
        color: isActive ? 'white' : 'black',
        cursor: isActive ? 'pointer' : 'not-allowed',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px'
      }}
    >
      {isActive ? 'Active' : 'Inactive'}
    </button>
  );
}
```

---

## 8. Ternary với className

```jsx
function Alert() {
  const isError = true;

  return (
    <div className={isError ? 'alert alert-error' : 'alert alert-success'}>
      {isError ? 'Error occurred!' : 'Success!'}
    </div>
  );
}

// Hoặc dùng template literals
function Alert2() {
  const type = 'warning';

  return (
    <div className={`alert alert-${type}`}>
      This is a {type} message
    </div>
  );
}
```

---

## 9. Khi Nào Dùng Gì?

| Tình Huống | Nên Dùng | Ví Dụ |
|------------|----------|-------|
| 2 lựa chọn đơn giản | Ternary trong JSX | Show/hide button |
| 3+ lựa chọn | If/else bên ngoài | Multiple status types |
| Logic phức tạp | Function riêng | Complex calculations |
| Chỉ hiển thị khi true | `&&` operator | Show notification |

---

## 10. Ví Dụ Component Hoàn Chỉnh

```jsx
function WeatherWidget() {
  const weather = {
    temp: 25,
    condition: 'sunny', // 'sunny', 'rainy', 'cloudy'
    isDay: true
  };

  return (
    <div className="weather-widget">
      <h2>Weather Forecast</h2>
      
      {/* Temperature display */}
      <p className="temp">
        {weather.temp}°C
        {weather.temp > 30 ? ' 🔥' : weather.temp < 10 ? ' ❄️' : ' ☀️'}
      </p>

      {/* Condition icon */}
      <div className="icon">
        {weather.condition === 'sunny' ? (
          <span style={{ fontSize: '50px' }}>☀️</span>
        ) : weather.condition === 'rainy' ? (
          <span style={{ fontSize: '50px' }}>🌧️</span>
        ) : (
          <span style={{ fontSize: '50px' }}>☁️</span>
        )}
      </div>

      {/* Time of day */}
      <p>
        {weather.isDay ? '☀️ Daytime' : '🌙 Nighttime'}
      </p>

      {/* Recommendation */}
      {weather.condition === 'rainy' ? (
        <div className="alert">
          <p>⚠️ Don't forget your umbrella!</p>
        </div>
      ) : weather.temp > 30 ? (
        <div className="alert">
          <p>💧 Stay hydrated!</p>
        </div>
      ) : (
        <div className="alert">
          <p>✅ Perfect weather!</p>
        </div>
      )}
    </div>
  );
}
```

---

## 11. Bài Tập Thực Hành

### Bài 1: Traffic Light Component
Tạo component đèn giao thông với 3 trạng thái: red, yellow, green. Hiển thị màu và message tương ứng.

```jsx
function TrafficLight() {
  const light = 'red'; // 'red', 'yellow', 'green'
  
  // TODO: Implement ternary operator
  return (
    <div>
      {/* Your code here */}
    </div>
  );
}
```

### Bài 2: Score Display
Hiển thị điểm thi và grade (A, B, C, D, F) dựa trên điểm số.
- 90-100: A (Excellent)
- 80-89: B (Good)
- 70-79: C (Average)
- 60-69: D (Below Average)
- <60: F (Fail)

### Bài 3: Shopping Cart Button
Tạo nút "Add to Cart" với các trạng thái:
- Nếu hết hàng: disabled, màu xám, text "Out of Stock"
- Nếu còn hàng nhưng giỏ đã đầy: disabled, text "Cart Full"
- Nếu còn hàng: enabled, màu xanh, text "Add to Cart"

---

## 12. Common Mistakes ❌

### Mistake 1: Quên Return Null

```jsx
// ❌ SAI - Không có else branch
{isVisible ? <div>Content</div>}

// ✅ ĐÚNG - Có else branch (hoặc dùng && operator)
{isVisible ? <div>Content</div> : null}
```

### Mistake 2: Ternary Quá Phức Tạp

```jsx
// ❌ KHÓ ĐỌC
{a ? b ? c ? d : e : f : g}

// ✅ DỄ ĐỌC - Tách ra if/else
let result;
if (a) {
  if (b) {
    result = c ? d : e;
  } else {
    result = f;
  }
} else {
  result = g;
}
return <div>{result}</div>;
```

### Mistake 3: Quên Dấu Ngoặc

```jsx
// ❌ SAI - Thiếu dấu ngoặc cho JSX nhiều dòng
{isTrue ? 
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
: <p>False</p>}

// ✅ ĐÚNG
{isTrue ? (
  <div>
    <h1>Title</h1>
    <p>Text</p>
  </div>
) : (
  <p>False</p>
)}
```

---

## 🎯 Key Takeaways

1. **Không dùng if/else trong JSX** - Dùng ternary operator: `condition ? true : false`
2. **Dấu ngoặc đơn `()`** - Bọc JSX nhiều dòng
3. **Tránh ternary lồng sâu** - Khó đọc, dùng if/else bên ngoài
4. **Luôn có else branch** - Hoặc return `null`
5. **Template literals** - Dùng cho className động: `` `alert-${type}` ``
6. **Inline styles** - Có thể dùng ternary trong object
7. **Khi logic phức tạp** - Tách ra function riêng hoặc variable bên ngoài

---

Bạn đã hiểu rõ về Ternary Operator chưa? Muốn làm bài tập hay tiếp tục với **Logical Operators (&& và ||)**? 🚀