# Early Return Pattern

## 1. Early Return Là Gì?

**Early Return** là pattern viết code mà **thoát sớm** khỏi function khi điều kiện không thỏa mãn, thay vì dùng nhiều nested if-else.

### Tại Sao Dùng Early Return?
- ✅ **Code sạch hơn**: Ít indentation, dễ đọc
- ✅ **Performance tốt**: Tránh xử lý logic không cần thiết
- ✅ **Dễ debug**: Logic rõ ràng, ít nhầm lẫn
- ✅ **Dễ maintain**: Thêm điều kiện mới dễ dàng

---

## 2. Ví Dụ Cơ Bản

### ❌ Cách KHÔNG TỐT (Nested If-Else)

```jsx
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoading) {
      if (username.trim() === '') {
        if (password.length < 6) {
          // Logic đăng nhập phức tạp
          console.log('Đăng nhập thành công');
        } else {
          alert('Mật khẩu phải ít nhất 6 ký tự');
        }
      } else {
        alert('Vui lòng nhập username');
      }
    } else {
      alert('Đang xử lý, vui lòng chờ');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

### ✅ Cách TỐT (Early Return)

```jsx
function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Early return - Thoát sớm nếu đang loading
    if (isLoading) {
      alert('Đang xử lý, vui lòng chờ');
      return;
    }

    // Early return - Thoát sớm nếu thiếu username
    if (username.trim() === '') {
      alert('Vui lòng nhập username');
      return;
    }

    // Early return - Thoát sớm nếu mật khẩu quá ngắn
    if (password.length < 6) {
      alert('Mật khẩu phải ít nhất 6 ký tự');
      return;
    }

    // Logic chính - Chỉ chạy khi tất cả điều kiện OK
    console.log('Đăng nhập thành công');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 3. Early Return Trong React Components

### Ví Dụ 1: Loading State

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Early return - Hiển thị loading
  if (loading) {
    return <div>Loading user data... ⏳</div>;
  }

  // Early return - Hiển thị error
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error} ❌</div>;
  }

  // Early return - Hiển thị empty state
  if (!user) {
    return <div>No user data found 📄</div>;
  }

  // Render chính - Chỉ khi có data
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
```

### Ví Dụ 2: Authentication Guard

```jsx
function AdminPanel() {
  const user = useAuth();

  // Early return - Chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Early return - Không phải admin
  if (user.role !== 'admin') {
    return <div style={{ color: 'red' }}>Access Denied 🚫</div>;
  }

  // Early return - Tài khoản chưa verify
  if (!user.isVerified) {
    return <div>Please verify your email first 📧</div>;
  }

  // Render admin panel
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminControls />
    </div>
  );
}
```

---

## 4. Early Return Với Hooks

### useEffect Cleanup

```jsx
function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Early return - Không kết nối
    if (!isConnected) return;

    // Setup WebSocket connection
    const ws = new WebSocket('ws://chat.example.com');

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, JSON.parse(event.data)]);
    };

    // Cleanup function
    return () => ws.close();
  }, [isConnected]);

  // Early return trong JSX
  if (!isConnected) {
    return <button onClick={() => setIsConnected(true)}>Connect to Chat</button>;
  }

  return (
    <div>
      <h2>Chat Room</h2>
      {messages.map((msg, i) => <p key={i}>{msg.text}</p>)}
    </div>
  );
}
```

### Custom Hook với Early Return

```jsx
function useUserData(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Early return - Không có userId
    if (!userId) return;

    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}
```

---

## 5. Early Return Trong Functions

### Utility Functions

```jsx
function formatPrice(price, currency = 'USD') {
  // Early return - Invalid price
  if (typeof price !== 'number' || price < 0) {
    return 'Invalid price';
  }

  // Early return - Zero price
  if (price === 0) {
    return 'Free';
  }

  // Format price
  return `${currency} ${price.toFixed(2)}`;
}

// Usage
console.log(formatPrice(29.99));    // "USD 29.99"
console.log(formatPrice(0));        // "Free"
console.log(formatPrice(-5));       // "Invalid price"
console.log(formatPrice('abc'));    // "Invalid price"
```

### Validation Function

```jsx
function validateUser(user) {
  // Early return - Missing user
  if (!user) {
    return { isValid: false, error: 'User is required' };
  }

  // Early return - Missing name
  if (!user.name || user.name.trim() === '') {
    return { isValid: false, error: 'Name is required' };
  }

  // Early return - Invalid email
  if (!user.email || !user.email.includes('@')) {
    return { isValid: false, error: 'Valid email is required' };
  }

  // Early return - Age check
  if (user.age < 18) {
    return { isValid: false, error: 'Must be 18 or older' };
  }

  // All validations passed
  return { isValid: true };
}
```

---

## 6. So Sánh Early Return vs If-Else

| Aspect | Early Return | Nested If-Else |
|--------|-------------|----------------|
| **Readability** | ✅ High | ❌ Low (deep nesting) |
| **Performance** | ✅ Better | ❌ Worse (check all conditions) |
| **Maintainability** | ✅ Easy to add conditions | ❌ Hard to modify |
| **Debugging** | ✅ Clear flow | ❌ Confusing flow |
| **Code Length** | ✅ Shorter | ❌ Longer |

---

## 7. Common Patterns

### Pattern 1: Guard Clauses

```jsx
function processOrder(order) {
  // Guard clauses - Thoát sớm nếu invalid
  if (!order) return { success: false, error: 'Order is required' };
  if (!order.items || order.items.length === 0) return { success: false, error: 'Order must have items' };
  if (order.total <= 0) return { success: false, error: 'Order total must be positive' };

  // Process order
  return { success: true, data: processPayment(order) };
}
```

### Pattern 2: Component Props Validation

```jsx
function UserCard({ user, showDetails = false }) {
  // Early return - Invalid props
  if (!user) return <div>No user data</div>;
  if (!user.name) return <div>User name is required</div>;

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      {showDetails && (
        <div>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
}
```

### Pattern 3: API Error Handling

```jsx
function useApiCall(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Early return - No URL
    if (!url) return;

    fetch(url)
      .then(response => {
        // Early return - Bad response
        if (!response.ok) throw new Error('API Error');
        return response.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}
```

---

## 8. ⚠️ Khi Nào KHÔNG Nên Dùng Early Return

### ❌ Không nên dùng khi:
- Logic có **side effects** cần cleanup
- Cần **return multiple values**
- Function là **pure function** (luôn return cùng type)

### Ví dụ không nên dùng:

```jsx
// ❌ KHÔNG TỐT - Side effects
function updateUser(userId, newData) {
  if (!userId) return; // Database connection vẫn mở!

  const connection = getDatabaseConnection();
  // ... update logic
  connection.close(); // Không bao giờ chạy!
}

// ✅ TỐT - Proper cleanup
function updateUser(userId, newData) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const connection = getDatabaseConnection();
  try {
    // ... update logic
  } finally {
    connection.close(); // Luôn chạy
  }
}
```

---

## 9. Best Practices ✅

1. **Use early returns for validation:**
   ```jsx
   if (!isValid) return;
   ```

2. **Keep early returns simple:**
   ```jsx
   if (!user) return <div>No user</div>;
   ```

3. **Combine with error boundaries:**
   ```jsx
   if (error) throw new Error('Something went wrong');
   ```

4. **Document your early returns:**
   ```jsx
   // Early return: User not authenticated
   if (!user) return <LoginPrompt />;
   ```

5. **Test your early returns:**
   ```jsx
   // Write tests for each early return condition
   ```

---

## 10. Bài Tập Thực Hành

### Bài 1: Form Validation với Early Return

Tạo form đăng ký với validation:
- Username required, min 3 chars
- Email required, valid format
- Password required, min 8 chars
- Confirm password matches

```jsx
function RegistrationForm() {
  const [form, setForm] = useState({
    username: '', email: '', password: '', confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Implement early returns for validation
    // 1. Check username
    // 2. Check email
    // 3. Check password
    // 4. Check confirm password

    console.log('Registration successful!');
  };

  // TODO: Implement form JSX
  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### Bài 2: Component với Multiple Conditions

Tạo component hiển thị sản phẩm với các trạng thái:
- Loading
- Error
- No products
- Products list

### Bài 3: API Hook với Early Returns

Tạo custom hook `usePosts` với:
- Loading state
- Error handling
- Empty state
- Data display

---

## 🎯 Key Takeaways

1. **Early Return** = Thoát sớm khi điều kiện không thỏa mãn
2. **Giảm nesting** = Code dễ đọc, maintain
3. **Performance tốt** = Tránh xử lý không cần thiết
4. **Dễ debug** = Logic flow rõ ràng
5. **Validation first** = Check điều kiện trước, logic sau
6. **JSX early returns** = Perfect cho conditional rendering
7. **Combine với hooks** = Cleanup effects, error handling
8. **Test coverage** = Đảm bảo tất cả early return paths

---

Bạn đã hiểu rõ về Early Return Pattern chưa? Muốn làm bài tập thực hành hay chuyển sang **Lists & Keys** tiếp theo? 🚀