# ⚡ FUNCTIONAL UPDATES PATTERN

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Functional Updates Pattern**

**Functional updates** = Sử dụng function thay vì direct value trong setState

**Cú pháp:** `setState(prevState => newState)`

**Giải quyết:** Stale state, multiple updates, async operations

---

## 🔥 PHẦN 1: STALE STATE PROBLEM

### **❌ Vấn đề stale state:**

```jsx
function BadCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // ❌ Tất cả đều dùng count cũ
    setCount(count + 1); // count = 0
    setCount(count + 1); // vẫn count = 0
    setCount(count + 1); // vẫn count = 0
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Kết quả:** Count chỉ tăng 1 thay vì 3!

---

## 🔥 PHẦN 2: FUNCTIONAL UPDATES SOLUTION

### **✅ Giải pháp functional updates:**

```jsx
function GoodCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // ✅ Dùng giá trị mới nhất
    setCount(prevCount => prevCount + 1); // 0 + 1 = 1
    setCount(prevCount => prevCount + 1); // 1 + 1 = 2
    setCount(prevCount => prevCount + 1); // 2 + 1 = 3
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Kết quả:** Count tăng đúng 3!

---

## 🔥 PHẦN 3: KHI NÀO DÙNG FUNCTIONAL UPDATES

### **🎯 Cases cần dùng:**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  // ✅ 1. Multiple updates liên tiếp
  function addThreeTodos() {
    setTodos(prev => [...prev, 'Todo 1']);
    setTodos(prev => [...prev, 'Todo 2']);
    setTodos(prev => [...prev, 'Todo 3']);
  }

  // ✅ 2. Update phụ thuộc vào giá trị hiện tại
  function toggleAll() {
    setTodos(prev => prev.map(todo => ({
      ...todo,
      completed: !todo.completed
    })));
  }

  // ✅ 3. Async operations
  function loadData() {
    fetchData().then(newData => {
      setTodos(prev => [...prev, ...newData]);
    });
  }

  // ✅ 4. Complex state logic
  function updateUser(id, updates) {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  }

  return (
    <div>
      <button onClick={addThreeTodos}>Add 3 Todos</button>
      <button onClick={toggleAll}>Toggle All</button>
      <button onClick={loadData}>Load Data</button>
      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

### **🎯 Cases KHÔNG cần dùng:**

```jsx
function SimpleForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // ❌ Không cần functional updates cho simple assignments
  function handleNameChange(e) {
    setName(e.target.value); // OK
  }

  // ❌ Không cần cho reset về giá trị cố định
  function resetForm() {
    setName(''); // OK
    setEmail(''); // OK
  }

  return (
    <form>
      <input value={name} onChange={handleNameChange} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={resetForm}>Reset</button>
    </form>
  );
}
```

---

## 🔥 PHẦN 4: OBJECT STATE VỚI FUNCTIONAL UPDATES

### **🔍 Updating object properties:**

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 25,
    email: 'john@example.com'
  });

  // ✅ Correct: Functional update
  function updateName(newName) {
    setUser(prev => ({
      ...prev,
      name: newName
    }));
  }

  // ✅ Correct: Multiple properties
  function updateProfile(updates) {
    setUser(prev => ({
      ...prev,
      ...updates
    }));
  }

  // ✅ Correct: Nested objects
  function updateAddress(newAddress) {
    setUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        ...newAddress
      }
    }));
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <button onClick={() => updateName('Jane')}>Change Name</button>
      <button onClick={() => updateProfile({ age: 26, email: 'jane@example.com' })}>
        Update Profile
      </button>
    </div>
  );
}
```

### **❌ Common mistakes:**

```jsx
function BadUserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 25
  });

  // ❌ Wrong: Mutation trực tiếp
  function badUpdate() {
    user.age = 26; // Không trigger re-render!
    setUser(user);
  }

  // ❌ Wrong: Missing spread operator
  function badUpdate2() {
    setUser({
      name: 'Jane' // Mất age property!
    });
  }

  // ❌ Wrong: Stale state trong async
  function badAsyncUpdate() {
    setTimeout(() => {
      setUser({ ...user, age: user.age + 1 }); // user cũ!
    }, 1000);
  }

  return <div />;
}
```

---

## 🔥 PHẦN 5: ARRAY STATE VỚI FUNCTIONAL UPDATES

### **🔍 Common array operations:**

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);

  // ✅ Add item
  function addTodo(text) {
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ]);
  }

  // ✅ Remove item
  function removeTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  // ✅ Update item
  function toggleTodo(id) {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  // ✅ Insert at specific position
  function insertTodo(index, newTodo) {
    setTodos(prev => [
      ...prev.slice(0, index),
      newTodo,
      ...prev.slice(index)
    ]);
  }

  // ✅ Sort array
  function sortTodos() {
    setTodos(prev => [...prev].sort((a, b) => a.text.localeCompare(b.text)));
  }

  // ✅ Clear completed
  function clearCompleted() {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }

  return (
    <div>
      <button onClick={() => addTodo('New todo')}>Add Todo</button>
      <button onClick={sortTodos}>Sort</button>
      <button onClick={clearCompleted}>Clear Completed</button>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔥 PHẦN 6: ADVANCED PATTERNS

### **🔍 Combining with useReducer:**

```jsx
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  // Functional updates vẫn có thể dùng với useReducer
  function incrementAsync() {
    setTimeout(() => {
      dispatch({ type: 'increment' });
    }, 1000);
  }

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={incrementAsync}>+ (Async)</button>
    </div>
  );
}
```

### **🔍 Custom hook with functional updates:**

```jsx
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initial);
  }, [initial]);

  const setValue = useCallback((value) => {
    setCount(value);
  }, []);

  return { count, increment, decrement, reset, setValue };
}

// Usage
function CounterApp() {
  const { count, increment, decrement, reset, setValue } = useCounter(5);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setValue(10)}>Set to 10</button>
    </div>
  );
}
```

---

## 🔥 PHẦN 7: PERFORMANCE CONSIDERATIONS

### **🔍 When functional updates help performance:**

```jsx
function OptimizedList() {
  const [items, setItems] = useState([]);

  // ✅ Good: Functional update tránh stale closure
  const addItem = useCallback((newItem) => {
    setItems(prev => [...prev, newItem]);
  }, []);

  // ✅ Good: useMemo với functional updates
  const completedCount = useMemo(() => {
    return items.filter(item => item.completed).length;
  }, [items]);

  return (
    <div>
      <p>Completed: {completedCount}</p>
      <button onClick={() => addItem({ id: Date.now(), completed: false })}>
        Add Item
      </button>
    </div>
  );
}
```

### **🔍 When NOT to use functional updates:**

```jsx
function SimpleInput() {
  const [value, setValue] = useState('');

  // ❌ Unnecessary: Simple assignment
  function handleChange(e) {
    setValue(prev => e.target.value); // Không cần thiết
  }

  // ✅ Better: Direct assignment
  function handleChange(e) {
    setValue(e.target.value);
  }

  return <input value={value} onChange={handleChange} />;
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Pattern | When to Use | Example |
|---------|-------------|---------|
| **Functional Updates** | Multiple updates, async, dependent state | `setCount(prev => prev + 1)` |
| **Direct Updates** | Simple assignments, reset values | `setName('John')` |
| **Object Updates** | Partial object updates | `setUser(prev => ({ ...prev, name }))` |
| **Array Updates** | Add, remove, update items | `setTodos(prev => [...prev, newTodo])` |
| **Async Updates** | setTimeout, Promises | Functional updates required |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu stale state problem
- [ ] Biết cách dùng functional updates
- [ ] Áp dụng cho object state
- [ ] Áp dụng cho array state
- [ ] Biết khi nào cần/không cần functional updates
- [ ] Tạo custom hooks với functional updates
- [ ] Optimize performance với functional updates

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Học: **"Multiple state variables strategy"**

**Muốn luyện thêm?** → Thử: **"Tạo todo app với functional updates"**

**Chưa rõ?** → Hỏi: **"Ví dụ về array operations với functional updates"**