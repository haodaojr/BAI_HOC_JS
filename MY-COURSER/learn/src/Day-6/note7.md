# ⚡ STATE INITIALIZATION PATTERNS

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **State Initialization Patterns**

**Initialization** = Cách set giá trị ban đầu cho state

**4 patterns chính:**
1. **Default values**: Giá trị cố định
2. **Lazy initialization**: Compute khi cần
3. **From props**: Khởi tạo từ props
4. **From external sources**: API, localStorage

---

## 🔥 PHẦN 1: DEFAULT VALUES

### **🔍 Simple default values:**

```jsx
function Counter() {
  // ✅ Default primitive value
  const [count, setCount] = useState(0);

  // ✅ Default string
  const [name, setName] = useState('John Doe');

  // ✅ Default boolean
  const [isVisible, setIsVisible] = useState(true);

  return <div>Count: {count}</div>;
}
```

### **🔍 Default object/array:**

```jsx
function UserForm() {
  // ✅ Default object
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 18,
    isActive: true
  });

  // ✅ Default array
  const [todos, setTodos] = useState([]);

  // ✅ Default complex object
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    language: 'en'
  });

  return <div>Form ready</div>;
}
```

---

## 🔥 PHẦN 2: LAZY INITIALIZATION

### **🔍 Khi nào dùng lazy initialization:**

```jsx
function ExpensiveComponent() {
  // ✅ Good: Chỉ compute 1 lần khi component mount
  const [data, setData] = useState(() => {
    console.log('Computing expensive value...');
    return computeExpensiveValue();
  });

  // ✅ Good: Complex calculations
  const [fibonacci, setFibonacci] = useState(() => {
    const n = 1000;
    console.log(`Computing fibonacci(${n})...`);
    return fibonacciRecursive(n);
  });

  return <div>Data: {data}</div>;
}

function computeExpensiveValue() {
  // Giả sử đây là tính toán nặng
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
  }
  return result;
}
```

**Lợi ích:**
- ✅ Chỉ chạy 1 lần khi component mount
- ✅ Không chạy lại khi component re-render
- ✅ Tối ưu performance cho expensive computations

---

## 🔥 PHẦN 3: INITIALIZATION FROM PROPS

### **🔍 Basic props initialization:**

```jsx
function UserCard({ userId, initialName }) {
  // ✅ Good: Initialize từ props
  const [name, setName] = useState(initialName || 'Unknown');

  // ✅ Good: Initialize từ computed value của props
  const [displayName, setDisplayName] = useState(() =>
    initialName ? initialName.toUpperCase() : 'UNKNOWN'
  );

  return <div>{displayName}</div>;
}

// Usage
<UserCard initialName="John Doe" />
```

### **🔍 Sync với props changes:**

```jsx
function ControlledInput({ value: propValue, onChange }) {
  // ✅ Controlled component: Luôn sync với props
  const [internalValue, setInternalValue] = useState(propValue);

  // Sync khi props thay đổi
  useEffect(() => {
    setInternalValue(propValue);
  }, [propValue]);

  function handleChange(e) {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  }

  return (
    <input
      value={internalValue}
      onChange={handleChange}
    />
  );
}
```

### **🔍 Uncontrolled with default:**

```jsx
function UncontrolledInput({ defaultValue, onChange }) {
  // ✅ Uncontrolled: Chỉ dùng default, không sync
  const [value, setValue] = useState(defaultValue || '');

  function handleChange(e) {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(newValue);
  }

  return (
    <input
      value={value}
      onChange={handleChange}
    />
  );
}
```

---

## 🔥 PHẦN 4: FROM EXTERNAL SOURCES

### **🔍 From localStorage:**

```jsx
function ThemeSwitcher() {
  // ✅ Persist theme across sessions
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff' }}>
      <button onClick={toggleTheme}>
        Current theme: {theme}
      </button>
    </div>
  );
}
```

### **🔍 From API calls:**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(() => {
    // ✅ Lazy load user data
    fetchUser(userId).then(setUser);
    return null; // Initial value while loading
  });

  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState(null);

  // Alternative: Use useEffect for API calls
  useEffect(() => {
    setLoading(true);
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>No user found</div>;

  return <div>{user.name}</div>;
}
```

### **🔍 From URL params:**

```jsx
function ProductPage() {
  const { productId } = useParams();

  const [product, setProduct] = useState(() => {
    // ✅ Initialize from URL
    const saved = sessionStorage.getItem(`product-${productId}`);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (!product) {
      fetchProduct(productId).then(fetchedProduct => {
        setProduct(fetchedProduct);
        sessionStorage.setItem(`product-${productId}`, JSON.stringify(fetchedProduct));
      });
    }
  }, [productId, product]);

  return product ? <div>{product.name}</div> : <div>Loading...</div>;
}
```

---

## 🔥 PHẦN 5: COMPLEX INITIALIZATION PATTERNS

### **🔍 Factory functions:**

```jsx
function createInitialState(userId) {
  return {
    user: null,
    settings: {
      theme: 'light',
      notifications: true
    },
    todos: [],
    loading: true,
    error: null
  };
}

function App({ userId }) {
  // ✅ Clean initialization with factory
  const [state, setState] = useState(() => createInitialState(userId));

  return <div>App state initialized</div>;
}
```

### **🔍 Conditional initialization:**

```jsx
function DynamicForm({ type }) {
  // ✅ Different initial state based on type
  const [formData, setFormData] = useState(() => {
    switch (type) {
      case 'user':
        return {
          name: '',
          email: '',
          role: 'user'
        };
      case 'product':
        return {
          title: '',
          price: 0,
          category: 'general'
        };
      default:
        return {};
    }
  });

  return <div>Form for {type}</div>;
}
```

### **🔍 Environment-based initialization:**

```jsx
function ConfigComponent() {
  const [config, setConfig] = useState(() => {
    // ✅ Different config based on environment
    if (process.env.NODE_ENV === 'development') {
      return {
        apiUrl: 'http://localhost:3000',
        debug: true,
        theme: 'light'
      };
    } else {
      return {
        apiUrl: 'https://api.production.com',
        debug: false,
        theme: 'dark'
      };
    }
  });

  return <div>Config loaded for {process.env.NODE_ENV}</div>;
}
```

---

## 🔥 PHẦN 6: RESETTING STATE

### **🔍 Manual reset:**

```jsx
function FormWithReset() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const initialState = {
    name: '',
    email: '',
    message: ''
  };

  function resetForm() {
    setFormData(initialState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitting:', formData);
    resetForm(); // Reset after submit
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="Name"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
}
```

### **🔍 Reset with key prop:**

```jsx
function ResettableCounter() {
  const [key, setKey] = useState(0);

  function reset() {
    setKey(prev => prev + 1); // Force re-mount
  }

  return (
    <div>
      <button onClick={reset}>Reset Counter</button>
      <Counter key={key} />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Counter reset to 0');
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

---

## 🔥 PHẦN 7: COMMON MISTAKES

### **❌ Wrong: Expensive computation on every render:**

```jsx
function BadComponent() {
  // ❌ Bad: Chạy lại mỗi render
  const [data, setData] = useState(computeExpensiveValue());

  return <div>{data}</div>;
}
```

### **❌ Wrong: Stale props in initialization:**

```jsx
function BadUserCard({ userId }) {
  // ❌ Bad: userId có thể undefined khi init
  const [user, setUser] = useState(getUserById(userId));

  return <div>{user?.name}</div>;
}
```

### **❌ Wrong: Async operations in initialization:**

```jsx
function BadAsyncComponent() {
  // ❌ Bad: Promise không thể làm initial value
  const [data, setData] = useState(fetchData());

  return <div>{data}</div>;
}
```

### **✅ Correct approaches:**

```jsx
function GoodAsyncComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(result => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{data}</div>;
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Pattern | When to Use | Example |
|---------|-------------|---------|
| **Default Values** | Simple static values | `useState(0)` |
| **Lazy Init** | Expensive computations | `useState(() => compute())` |
| **From Props** | Controlled components | `useState(propValue)` |
| **From Storage** | Persistence | `useState(() => localStorage.getItem())` |
| **From API** | Dynamic data | `useState(null)` + useEffect |
| **Factory Function** | Complex initial state | `useState(() => createState())` |
| **Conditional** | Different states | `useState(() => type === 'A' ? valA : valB)` |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Biết các patterns cơ bản (default, lazy, props)
- [ ] Hiểu khi nào dùng lazy initialization
- [ ] Có thể initialize từ external sources
- [ ] Biết cách sync state với props changes
- [ ] Tránh common mistakes
- [ ] Implement complex initialization logic
- [ ] Reset state properly

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Tạo: **"App9 với practice exercises"**

**Muốn luyện thêm?** → Thử: **"Tạo component với complex initialization"**

**Chưa rõ?** → Hỏi: **"Ví dụ về conditional initialization"**