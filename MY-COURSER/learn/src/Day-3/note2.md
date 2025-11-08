# ⚡ PROPS VỚI FUNCTIONS & EVENT HANDLERS - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Function Props = Callback functions để child giao tiếp với parent**

**Child component gọi function từ parent để báo thay đổi:**

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return <Child onIncrement={handleIncrement} />;
}

function Child({ onIncrement }) {
  return <button onClick={onIncrement}>Tăng</button>;
}
```

---

## 🔥 PHẦN 1: TẠI SAO CẦN FUNCTION PROPS?

### **🔍 Vấn đề: Child component cần thay đổi parent state**

```jsx
// ❌ SAI: Child không thể thay đổi parent state trực tiếp
function Parent() {
  const [count, setCount] = useState(0);

  return <Child count={count} />;
}

function Child({ count }) {
  // KHÔNG THỂ: setCount(count + 1)
  // Vì setCount chỉ có ở Parent
}

// ✅ ĐÚNG: Child gọi callback từ parent
function Parent() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return <Child onIncrement={handleIncrement} />;
}

function Child({ onIncrement }) {
  return <button onClick={onIncrement}>Tăng</button>;
}
```

**Luồng hoạt động:**
1. Parent tạo function `handleIncrement`
2. Parent truyền xuống: `onIncrement={handleIncrement}`
3. Child gọi khi cần: `onIncrement()`
4. Parent state được cập nhật

---

## 🔥 PHẦN 2: EVENT HANDLERS PATTERNS

### **1. Basic Event Handler:**

```jsx
function TodoItem({ todo, onToggle }) {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}  // Gọi trực tiếp
      />
      <span>{todo.text}</span>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([...]);

  const handleToggle = (todoId) => {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => handleToggle(todo.id)}  // Truyền function
        />
      ))}
    </div>
  );
}
```

### **2. Event Handler với Parameters:**

```jsx
function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    onAddToCart(product.id, 1); // Truyền parameters
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={handleAddToCart}>
        Thêm vào giỏ
      </button>
    </div>
  );
}

function ProductList() {
  const handleAddToCart = (productId, quantity) => {
    console.log(`Add product ${productId}, quantity: ${quantity}`);
    // Logic thêm vào giỏ hàng...
  };

  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
```

### **3. Event Handler với Event Object:**

```jsx
function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Ngăn reload trang
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

function App() {
  const handleLogin = (credentials) => {
    console.log('Login with:', credentials);
    // Logic đăng nhập...
  };

  return <LoginForm onSubmit={handleLogin} />;
}
```

---

## 🔥 PHẦN 3: COMMON FUNCTION PROP PATTERNS

### **1. Toggle Pattern:**

```jsx
function Switch({ isOn, onToggle }) {
  return (
    <button onClick={onToggle}>
      {isOn ? 'Tắt' : 'Bật'}
    </button>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <Switch
      isOn={isDarkMode}
      onToggle={() => setIsDarkMode(!isDarkMode)}
    />
  );
}
```

### **2. CRUD Operations:**

```jsx
function UserTable({ users, onEdit, onDelete }) {
  return (
    <table>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button onClick={() => onEdit(user)}>Sửa</button>
            <button onClick={() => onDelete(user.id)}>Xóa</button>
          </td>
        </tr>
      ))}
    </table>
  );
}

function App() {
  const [users, setUsers] = useState([...]);

  const handleEdit = (user) => {
    // Logic edit user
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  return (
    <UserTable
      users={users}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
```

### **3. Form Handling:**

```jsx
function ContactForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Tên"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <textarea
        placeholder="Tin nhắn"
        value={formData.message}
        onChange={(e) => handleChange('message', e.target.value)}
      />
      <button type="submit">Gửi</button>
      <button type="button" onClick={onCancel}>Hủy</button>
    </form>
  );
}

function App() {
  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  const handleCancel = () => {
    console.log('Form cancelled');
  };

  return (
    <ContactForm
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
```

---

## 🔥 PHẦN 4: FUNCTION PROP BEST PRACTICES

### **1. Naming Conventions:**

```jsx
// ✅ Tốt: on + EventName
onClick, onSubmit, onChange, onToggle, onDelete

// ✅ Tốt: handle + Action
handleSubmit, handleDelete, handleUpdate

// ❌ Không nên: action, callback, func
```

### **2. Function Stability (useCallback):**

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ✅ Tốt: useCallback để tránh re-render không cần thiết
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  // ❌ Không tối ưu: Function mới mỗi render
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return <Child onIncrement={handleIncrement} />;
}
```

### **3. Default Functions:**

```jsx
function Button({ onClick = () => {} }) {
  return <button onClick={onClick}>Click me</button>;
}

// Sử dụng không cần truyền onClick
<Button /> // Không lỗi
```

---

## 🔥 PHẦN 5: COMMON MISTAKES & DEBUG

### **❌ Lỗi phổ biến:**

**1. Gọi function ngay lập tức:**
```jsx
// ❌ Sai: Gọi ngay khi render
<Child onClick={handleClick()} />

// ✅ Đúng: Truyền reference
<Child onClick={handleClick} />
```

**2. Quên dependencies trong useCallback:**
```jsx
// ❌ Sai: Quên dependencies
const handleUpdate = useCallback(() => {
  setItems(items.filter(item => item.id !== id));
}, []); // items không có trong dependencies

// ✅ Đúng: Thêm dependencies
const handleUpdate = useCallback(() => {
  setItems(items.filter(item => item.id !== id));
}, [items, id]);
```

**3. Function trong loop/map:**
```jsx
// ❌ Sai: Tạo function trong map (performance kém)
{todos.map(todo => (
  <TodoItem
    key={todo.id}
    onDelete={() => {
      // Inline function - tạo mới mỗi render
      setTodos(todos.filter(t => t.id !== todo.id));
    }}
  />
))}

// ✅ Đúng: Tách function riêng
const handleDelete = (todoId) => {
  setTodos(todos.filter(t => t.id !== todoId));
};

{todos.map(todo => (
  <TodoItem
    key={todo.id}
    onDelete={() => handleDelete(todo.id)}
  />
))}
```

### **🔧 Debug Function Props:**

**1. Console.log trong child:**
```jsx
function Child({ onAction }) {
  const handleClick = () => {
    console.log('onAction function:', onAction);
    onAction();
  };

  return <button onClick={handleClick}>Click</button>;
}
```

**2. Check if function exists:**
```jsx
function Child({ onAction }) {
  const handleClick = () => {
    if (typeof onAction === 'function') {
      onAction();
    } else {
      console.error('onAction is not a function');
    }
  };

  return <button onClick={handleClick}>Click</button>;
}
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Counter với function props**

```jsx
// Tạo Counter component với increment/decrement
function Counter({ count, onIncrement, onDecrement }) {
  return (
    <div>
      <button onClick={onDecrement}>-</button>
      <span>{count}</span>
      <button onClick={onIncrement}>+</button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  // TODO: Tạo handleIncrement và handleDecrement
  // TODO: Truyền props xuống Counter
}
```

### **Bài 2: Todo List với CRUD**

```jsx
// Tạo TodoList với add/remove/toggle
function TodoList({ todos, onAdd, onToggle, onDelete }) {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      onAdd(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Thêm công việc..."
        />
        <button type="submit">Thêm</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => onDelete(todo.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  // TODO: Implement onAdd, onToggle, onDelete
  // TODO: Truyền props xuống TodoList
}
```

### **Bài 3: Form với validation**

```jsx
// Tạo LoginForm với validation
function LoginForm({ onSubmit, errors = {} }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange('email')}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange('password')}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button type="submit">Đăng nhập</button>
    </form>
  );
}

function App() {
  const [errors, setErrors] = useState({});

  const handleSubmit = (data) => {
    // TODO: Validation logic
    // TODO: Call API
    // TODO: Set errors if validation fails
  };

  // TODO: Truyền props xuống LoginForm
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Pattern | Parent | Child | Khi nào dùng |
|---------|--------|-------|--------------|
| **Basic Callback** | `onClick={() => doSomething()}` | `onClick={onClick}` | Action đơn giản |
| **With Parameters** | `onAction={(id) => handleAction(id)}` | `onAction={() => onAction(id)}` | Cần truyền data |
| **With Event** | `onSubmit={handleSubmit}` | `onSubmit={(e) => onSubmit(e)}` | Form handling |
| **Toggle** | `onToggle={() => setState(!state)}` | `onClick={onToggle}` | On/off actions |
| **CRUD** | `onDelete={(id) => deleteItem(id)}` | `onClick={() => onDelete(id)}` | Database operations |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu tại sao cần function props
- [ ] Biết cách truyền callback từ parent xuống child
- [ ] Thành thạo event handlers patterns
- [ ] Biết dùng useCallback để tối ưu
- [ ] Tránh được common mistakes
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Props validation và TypeScript"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về function props"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**