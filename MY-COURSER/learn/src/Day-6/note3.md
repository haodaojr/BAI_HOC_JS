# ⚡ STATE VS PROPS DEEP COMPARISON

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **State vs Props**

**Props** = Data truyền từ parent component xuống child component (read-only)

**State** = Data nội bộ của component, có thể thay đổi (mutable)

**Key difference:** Props không thể thay đổi trong component nhận, State có thể thay đổi trong component sở hữu.

---

## 🔥 PHẦN 1: PROPS CƠ BẢN

### **🔍 Props là gì?**

```jsx
// Parent component
function App() {
  const userName = "Nguyễn Văn A";

  return <UserProfile name={userName} />;
}

// Child component (NHẬN props)
function UserProfile({ name }) {
  // name = "Nguyễn Văn B"; // ❌ SAI: Không thể thay đổi props

  return <h1>Hello {name}</h1>;
}
```

### **🔍 Props destructuring:**

```jsx
// Không destructuring
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
      <span>{props.role}</span>
    </div>
  );
}

// Với destructuring (Khuyên dùng)
function UserCard({ name, email, role }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      <span>{role}</span>
    </div>
  );
}
```

### **🔍 Default props:**

```jsx
function Button({ children, variant = 'primary', size = 'medium' }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`}>
      {children}
    </button>
  );
}

// Usage
<Button>Click me</Button> // variant='primary', size='medium'
<Button variant="danger" size="large">Delete</Button>
```

---

## 🔥 PHẦN 2: STATE CƠ BẢN

### **🔍 State là gì?**

```jsx
function Counter() {
  const [count, setCount] = useState(0); // ✅ Có thể thay đổi

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

### **🔍 State vs Variables:**

```jsx
function BadCounter() {
  let count = 0; // ❌ Thường variable - không trigger re-render

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => count++}>+</button> {/* Không hoạt động */}
    </div>
  );
}

function GoodCounter() {
  const [count, setCount] = useState(0); // ✅ State - trigger re-render

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

---

## 🔥 PHẦN 3: PROPS VS STATE COMPARISON

### **📊 Bảng so sánh chi tiết:**

| Tiêu chí | Props | State |
|----------|-------|-------|
| **Nguồn gốc** | Từ parent component | Tự tạo trong component |
| **Thay đổi** | ❌ Không thể | ✅ Có thể với setter |
| **Mục đích** | Cấu hình component | Lưu trạng thái nội bộ |
| **Re-render** | Khi parent re-render | Khi state thay đổi |
| **Sharing** | Có thể share với children | Chỉ trong component đó |
| **Initial value** | Từ parent | Có thể từ props hoặc default |
| **Update method** | Parent update → re-render | setState function |
| **Testing** | Pass different props | Test state changes |

### **🎯 Khi nào dùng props vs state:**

```jsx
// ✅ Props: Data từ parent
function ProductCard({ product, onAddToCart }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}

// ✅ State: Internal component data
function ProductCard({ product, onAddToCart }) {
  const [isInCart, setIsInCart] = useState(false);

  function handleAddToCart() {
    setIsInCart(true);
    onAddToCart(product.id);
  }

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <button
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
```

---

## 🔥 PHẦN 4: PROPS DRILLING PROBLEM

### **❌ Props drilling (không tốt):**

```jsx
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div>
      <Header theme={theme} onThemeChange={setTheme} />
      <Main theme={theme} />
      <Sidebar theme={theme} />
      <Footer theme={theme} />
    </div>
  );
}

function Header({ theme, onThemeChange }) {
  return <ThemeToggle theme={theme} onThemeChange={onThemeChange} />;
}

function ThemeToggle({ theme, onThemeChange }) {
  return (
    <button onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

**Vấn đề:**
- ✅ Code hoạt động
- ❌ Props phải pass qua nhiều layers
- ❌ Khó maintain khi component tree lớn
- ❌ Coupling cao giữa components

### **✅ Giải pháp với Context (sẽ học sau):**

```jsx
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
      <Sidebar />
      <Footer />
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

---

## 🔥 PHẦN 5: DERIVED STATE FROM PROPS

### **🔍 State derived từ props:**

```jsx
function UserProfile({ user }) {
  // ❌ Sai: Không nên tạo state từ props
  const [name, setName] = useState(user.name);

  // ✅ Đúng: Sử dụng trực tiếp props
  return <h1>{user.name}</h1>;
}
```

### **🔍 Khi cần state từ props:**

```jsx
function EditableUserProfile({ user, onSave }) {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Update editedUser khi props thay đổi
  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  function handleSave() {
    onSave(editedUser);
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div>
        <input
          value={editedUser.name}
          onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setEditMode(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => setEditMode(true)}>Edit</button>
    </div>
  );
}
```

---

## 🔥 PHẦN 6: LIFECYCLE OF PROPS & STATE

### **🔍 Props lifecycle:**

```jsx
function ChildComponent({ data }) {
  console.log('1. Component render với props:', data);

  useEffect(() => {
    console.log('2. useEffect chạy khi data thay đổi:', data);
  }, [data]);

  return <div>{data}</div>;
}

function ParentComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Parent state: {count}
      </button>
      <ChildComponent data={count} />
    </div>
  );
}

// Sequence:
// 1. Parent render
// 2. Child render với props
// 3. Child useEffect chạy
// 4. User click button
// 5. Parent re-render
// 6. Child re-render với props mới
// 7. Child useEffect chạy lại
```

### **🔍 State lifecycle:**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  console.log('1. Component render với state:', count);

  useEffect(() => {
    console.log('2. useEffect chạy khi count thay đổi:', count);
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Sequence:
// 1. Component render với initial state (0)
// 2. useEffect chạy
// 3. User click button
// 4. setCount called
// 5. Component re-render với new state (1)
// 6. useEffect chạy lại
```

---

## 🔥 PHẦN 7: COMMON PATTERNS

### **1. Props + State combination:**

```jsx
function TodoItem({ todo, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false); // Internal state
  const [editText, setEditText] = useState(todo.text); // Derived from props

  // Update editText khi props thay đổi
  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  function handleSave() {
    onToggle(todo.id, editText); // Call parent callback
    setIsEditing(false);
  }

  return (
    <div>
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
        />
      ) : (
        <span onClick={() => setIsEditing(true)}>{todo.text}</span>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
}
```

### **2. Controlled component pattern:**

```jsx
function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  function handleChange(field, value) {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData); // Pass data to parent
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="Email"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Concept | Props | State |
|---------|-------|-------|
| **Definition** | Data from parent | Internal data |
| **Mutability** | Read-only | Mutable |
| **Source** | Parent component | Component itself |
| **Updates** | Parent changes | Component changes |
| **Sharing** | Downward flow | Local only |
| **Testing** | Pass different values | Test state transitions |
| **Performance** | Re-render when changed | Re-render when updated |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu props là read-only data từ parent
- [ ] Biết state là mutable internal data
- [ ] Phân biệt khi nào dùng props vs state
- [ ] Hiểu props drilling problem
- [ ] Biết cách combine props và state
- [ ] Hiểu lifecycle của props và state
- [ ] Áp dụng được controlled component pattern

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Học: **"State updates và re-rendering mechanism"**

**Muốn luyện thêm?** → Thử: **"Tạo component với props + state combination"**

**Chưa rõ?** → Hỏi: **"Ví dụ về props drilling"**