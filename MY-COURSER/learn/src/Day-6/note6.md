# ⚡ MULTIPLE STATE VARIABLES STRATEGY

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Multiple State Variables Strategy**

**Strategy** = Cách tổ chức multiple state variables trong component

**3 approaches:**
1. **Multiple useState**: Simple, independent states
2. **Object state**: Related data, complex forms
3. **useReducer**: Complex state logic, multiple related updates

---

## 🔥 PHẦN 1: MULTIPLE USESTATE APPROACH

### **🔍 Khi nào dùng multiple useState:**

```jsx
function UserForm() {
  // ✅ Good: Independent, simple values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(18);
  const [isSubscribed, setIsSubscribed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, age, isSubscribed });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
      <label>
        <input
          type="checkbox"
          checked={isSubscribed}
          onChange={(e) => setIsSubscribed(!isSubscribed)}
        />
        Subscribe to newsletter
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Lợi ích:**
- ✅ Clear, explicit state variables
- ✅ Easy to understand what each state does
- ✅ Independent updates don't affect others
- ✅ Good for simple forms

---

## 🔥 PHẦN 2: OBJECT STATE APPROACH

### **🔍 Khi nào dùng object state:**

```jsx
function ComplexUserForm() {
  // ✅ Good: Related data, complex updates
  const [user, setUser] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: ''
    },
    preferences: {
      theme: 'light',
      notifications: true,
      language: 'en'
    }
  });

  function updatePersonal(field, value) {
    setUser(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  }

  function updatePreferences(field, value) {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  }

  return (
    <form>
      {/* Personal Info */}
      <input
        value={user.personal.firstName}
        onChange={(e) => updatePersonal('firstName', e.target.value)}
        placeholder="First Name"
      />
      <input
        value={user.personal.lastName}
        onChange={(e) => updatePersonal('lastName', e.target.value)}
        placeholder="Last Name"
      />

      {/* Preferences */}
      <select
        value={user.preferences.theme}
        onChange={(e) => updatePreferences('theme', e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </form>
  );
}
```

**Lợi ích:**
- ✅ Group related data together
- ✅ Easier to pass around as single object
- ✅ Good for complex forms with sections
- ✅ Better for API calls (single object)

---

## 🔥 PHẦN 3: USEREDUCER APPROACH

### **🔍 Khi nào dùng useReducer:**

```jsx
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: 'all'
  });

  function addTodo(text) {
    dispatch({
      type: 'ADD_TODO',
      payload: { id: Date.now(), text, completed: false }
    });
  }

  function toggleTodo(id) {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'completed') return todo.completed;
    if (state.filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div>
      <button onClick={() => addTodo('New todo')}>Add Todo</button>
      <select
        value={state.filter}
        onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      {filteredTodos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}
```

**Lợi ích:**
- ✅ Complex state logic in one place
- ✅ Predictable state updates
- ✅ Easy to test reducer logic
- ✅ Good for state machines

---

## 🔥 PHẦN 4: HYBRID APPROACH

### **🔍 Kết hợp multiple strategies:**

```jsx
function ComplexApp() {
  // Simple, independent states
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(false);

  // Related form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      zipCode: ''
    }
  });

  // Complex business logic
  const [appState, dispatch] = useReducer(appReducer, {
    user: null,
    todos: [],
    notifications: []
  });

  // Helper functions
  function updateFormField(section, field, value) {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object'
        ? { ...prev[section], [field]: value }
        : value
    }));
  }

  return (
    <div className={theme}>
      {isLoading && <div>Loading...</div>}

      <form>
        <input
          value={formData.name}
          onChange={(e) => updateFormField('name', null, e.target.value)}
          placeholder="Name"
        />
        <input
          value={formData.address.street}
          onChange={(e) => updateFormField('address', 'street', e.target.value)}
          placeholder="Street"
        />
      </form>

      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

---

## 🔥 PHẦN 5: STATE INITIALIZATION PATTERNS

### **🔍 Lazy initialization:**

```jsx
function ExpensiveComponent() {
  // ✅ Good: Only compute when needed
  const [data, setData] = useState(() => {
    console.log('Computing expensive initial value...');
    return computeExpensiveValue();
  });

  return <div>Data: {data}</div>;
}
```

### **🔍 From props:**

```jsx
function UserCard({ userId }) {
  // ✅ Good: Initialize from props
  const [user, setUser] = useState(() => getUserById(userId));

  // Update when props change
  useEffect(() => {
    setUser(getUserById(userId));
  }, [userId]);

  return <div>{user.name}</div>;
}
```

### **🔍 From localStorage:**

```jsx
function App() {
  // ✅ Good: Persist across sessions
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('app-settings');
    return saved ? JSON.parse(saved) : {
      theme: 'light',
      language: 'en',
      notifications: true
    };
  });

  // Save to localStorage when settings change
  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
  }, [settings]);

  return <div>Settings loaded</div>;
}
```

---

## 🔥 PHẦN 6: PERFORMANCE OPTIMIZATION

### **🔍 useMemo cho computed values:**

```jsx
function UserList({ users, filter }) {
  const [sortBy, setSortBy] = useState('name');

  // ✅ Good: Memoize expensive computation
  const filteredAndSortedUsers = useMemo(() => {
    console.log('Filtering and sorting users...');
    let result = users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'email') return a.email.localeCompare(b.email);
      return 0;
    });

    return result;
  }, [users, filter, sortBy]);

  return (
    <div>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="email">Email</option>
      </select>

      {filteredAndSortedUsers.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### **🔍 useCallback cho event handlers:**

```jsx
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  // ✅ Good: Prevent unnecessary re-renders of child
  const handleAddItem = useCallback((item) => {
    setItems(prev => [...prev, item]);
  }, []);

  // ✅ Good: Include dependencies
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return (
    <div>
      <ChildComponent onAddItem={handleAddItem} />
      <button onClick={handleIncrement}>Count: {count}</button>
    </div>
  );
}
```

---

## 🔥 PHẦN 7: COMMON PITFALLS

### **❌ Too many useState calls:**

```jsx
function BadComponent() {
  // ❌ Bad: Too many individual states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Better: Group related data
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zipCode: ''
  });
}
```

### **❌ Unnecessary object state:**

```jsx
function SimpleCounter() {
  // ❌ Bad: Unnecessary object for simple value
  const [state, setState] = useState({ count: 0 });

  function increment() {
    setState(prev => ({ count: prev.count + 1 }));
  }

  // Better: Simple primitive
  const [count, setCount] = useState(0);
}
```

### **❌ Missing dependencies in effects:**

```jsx
function BadEffect() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);

  // ❌ Bad: Missing multiplier dependency
  useEffect(() => {
    console.log('Count * multiplier:', count * multiplier);
  }, [count]); // Missing multiplier!

  return <div />;
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Strategy | When to Use | Pros | Cons |
|----------|-------------|------|------|
| **Multiple useState** | Simple, independent values | Clear, easy to understand | Many variables, potential inconsistency |
| **Object State** | Related form data, complex objects | Grouped logic, single source of truth | More complex updates, potential mutations |
| **useReducer** | Complex state logic, state machines | Predictable, testable, scalable | More boilerplate, learning curve |
| **Hybrid** | Mixed complexity | Flexibility, best of all worlds | Can be confusing if overused |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Biết khi nào dùng multiple useState
- [ ] Biết khi nào dùng object state
- [ ] Biết khi nào dùng useReducer
- [ ] Có thể combine multiple strategies
- [ ] Hiểu lazy initialization
- [ ] Sử dụng useMemo và useCallback properly
- [ ] Tránh common pitfalls
- [ ] Optimize performance với proper state management

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Học: **"State initialization patterns"**

**Muốn luyện thêm?** → Thử: **"Refactor component với multiple state strategies"**

**Chưa rõ?** → Hỏi: **"Ví dụ về hybrid approach"**