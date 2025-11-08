# ⚡ STATE UPDATES & RE-RENDERING MECHANISM

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **State Updates & Re-rendering**

**Re-rendering** = React tạo lại component với data mới khi state thay đổi

**Mechanism:**
1. User interaction → setState called
2. React update state
3. Component re-render với state mới
4. DOM updated

**Key concepts:** Batching, stale state, functional updates

---

## 🔥 PHẦN 1: CÁCH REACT XỬ LÝ STATE UPDATES

### **🔍 Basic re-rendering flow:**

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  console.log('Component render với count:', count);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Luồng hoạt động:**
1. **Initial render:** `count = 0`, console log "Component render với count: 0"
2. **User clicks button:** `setCount(1)` called
3. **React updates state:** `count` becomes `1`
4. **Re-render triggered:** Component render lại
5. **Console log:** "Component render với count: 1"
6. **UI updated:** Button shows "Count: 1"

### **🔍 Multiple state updates:**

```jsx
function MultiUpdate() {
  const [count, setCount] = useState(0);
  console.log('Render với count:', count);

  function handleClick() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+3</button>
    </div>
  );
}
```

**Kết quả:** Count chỉ tăng 1, không phải 3!

**Tại sao?** Vì `count` vẫn là giá trị cũ (stale state) trong cùng 1 render cycle.

---

## 🔥 PHẦN 2: STALE STATE PROBLEM

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

**Debug log:**
```
Initial: count = 0
Click: setCount(0 + 1), setCount(0 + 1), setCount(0 + 1)
Re-render: count = 1 (chỉ tăng 1)
```

### **✅ Giải pháp - Functional updates:**

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

**Debug log:**
```
Initial: count = 0
Click: setCount(0+1), setCount(1+1), setCount(2+1)
Re-render: count = 3 (tăng đúng 3)
```

---

## 🔥 PHẦN 3: FUNCTIONAL UPDATES PATTERN

### **🔍 Khi nào dùng functional updates:**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  function addTodo(text) {
    // ✅ Functional update cho array
    setTodos(prevTodos => [
      ...prevTodos,
      { id: Date.now(), text, completed: false }
    ]);
  }

  function toggleTodo(id) {
    // ✅ Functional update cho object trong array
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function updateTodo(id, updates) {
    // ✅ Functional update cho partial updates
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  }

  return (
    <div>
      <button onClick={() => addTodo('New todo')}>Add Todo</button>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span>{todo.text}</span>
        </div>
      ))}
    </div>
  );
}
```

### **🎯 Best practices:**

```jsx
// ✅ Good: Functional updates
setCount(prev => prev + 1);
setUser(prev => ({ ...prev, name: 'New name' }));
setTodos(prev => [...prev, newTodo]);

// ❌ Bad: Direct state mutation
setCount(count + 1); // Stale state risk
setUser({ ...user, name: 'New name' }); // OK nhưng không optimal
setTodos([...todos, newTodo]); // OK nhưng không optimal
```

---

## 🔥 PHẦN 4: STATE BATCHING

### **🔍 Automatic batching:**

```jsx
function BatchingExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  console.log('Render');

  function handleClick() {
    console.log('Before updates');
    setCount(1);
    setName('Jane');
    console.log('After updates');
  }

  return (
    <div>
      <p>Count: {count}, Name: {name}</p>
      <button onClick={handleClick}>Update Both</button>
    </div>
  );
}
```

**Output:**
```
Render (initial)
Before updates
After updates
Render (final - chỉ 1 lần)
```

**React tự động batch multiple updates thành 1 re-render!**

### **🔍 Batching với async code:**

```jsx
function AsyncBatching() {
  const [count, setCount] = useState(0);
  console.log('Render với count:', count);

  function handleClick() {
    // Synchronous updates → batched
    setCount(1);
    setCount(2);
    setCount(3);

    // Async updates → not batched
    setTimeout(() => {
      setCount(4);
      setCount(5);
    }, 1000);
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Output:**
```
Render với count: 0
Render với count: 3 (batched)
Render với count: 4
Render với count: 5 (not batched)
```

---

## 🔥 PHẦN 5: RE-RENDER TRIGGERS

### **🔍 Khi nào component re-render:**

```jsx
function ReRenderTriggers() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John', age: 25 });
  const [todos, setTodos] = useState([]);

  // 1. ✅ State changes trigger re-render
  function updateCount() {
    setCount(count + 1);
  }

  // 2. ✅ Object state changes trigger re-render
  function updateUser() {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  }

  // 3. ✅ Array state changes trigger re-render
  function addTodo() {
    setTodos(prev => [...prev, 'New todo']);
  }

  // 4. ✅ Props changes trigger re-render (từ parent)
  // 5. ✅ Context changes trigger re-render
  // 6. ✅ Parent re-render → children re-render

  return (
    <div>
      <p>Count: {count}</p>
      <p>User: {user.name}, Age: {user.age}</p>
      <p>Todos: {todos.length}</p>

      <button onClick={updateCount}>Update Count</button>
      <button onClick={updateUser}>Update User</button>
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}
```

### **🔍 Khi nào KHÔNG re-render:**

```jsx
function NoReRender() {
  const [count, setCount] = useState(0);

  // ❌ Same value → no re-render
  function setSameValue() {
    setCount(0); // count đã là 0
  }

  // ❌ Object reference same → no re-render
  const user = { name: 'John' };
  function setSameObject() {
    setUser(user); // Same reference
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={setSameValue}>Set Same Value</button>
      <button onClick={setSameObject}>Set Same Object</button>
    </div>
  );
}
```

---

## 🔥 PHẦN 6: PERFORMANCE IMPLICATIONS

### **🔍 Unnecessary re-renders:**

```jsx
function BadPerformance() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // ❌ Re-render khi count thay đổi (không cần thiết)
  const fullName = name + ' Doe';

  return (
    <div>
      <ExpensiveComponent fullName={fullName} />
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

function ExpensiveComponent({ fullName }) {
  console.log('Expensive component re-rendered');
  // Giả sử component này rất nặng...
  return <div>{fullName}</div>;
}
```

### **✅ Optimization với useMemo:**

```jsx
function GoodPerformance() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // ✅ Chỉ re-compute khi name thay đổi
  const fullName = useMemo(() => {
    console.log('Computing full name...');
    return name + ' Doe';
  }, [name]);

  return (
    <div>
      <ExpensiveComponent fullName={fullName} />
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}
```

---

## 🔥 PHẦN 7: DEBUGGING RE-RENDERS

### **🔍 React DevTools:**

```jsx
// 1. Install React DevTools extension
// 2. Open Components tab
// 3. Check "Highlight updates when components render"
// 4. See which components re-render and why
```

### **🔍 Console logging:**

```jsx
function DebugReRenders() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  // Log every render
  console.log('Component re-rendered!', { count, name });

  // Log specific state changes
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  useEffect(() => {
    console.log('Name changed:', name);
  }, [name]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={() => setCount(count + 1)}>Update Count</button>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
    </div>
  );
}
```

### **🔍 useEffect for debugging:**

```jsx
function DebugWithEffect() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('Data changed:', data);
    return () => console.log('Cleanup for data:', data);
  }, [data]);

  return (
    <div>
      <button onClick={() => setData({ id: 1, name: 'Test' })}>
        Set Data
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Concept | Description | When to Use |
|---------|-------------|-------------|
| **Functional Updates** | `setState(prev => newValue)` | Multiple updates, async code |
| **Batching** | Multiple updates → 1 render | Automatic in React 18+ |
| **Stale State** | Using old state value | Avoid with functional updates |
| **Re-render Triggers** | State/props/context changes | Normal behavior |
| **Performance** | useMemo, useCallback | Expensive computations |
| **Debugging** | React DevTools, console.log | Development only |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu re-rendering mechanism
- [ ] Biết cách tránh stale state
- [ ] Sử dụng functional updates đúng cách
- [ ] Hiểu state batching
- [ ] Biết khi nào component re-render
- [ ] Optimize performance với useMemo
- [ ] Debug re-renders effectively

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Học: **"Functional updates pattern"**

**Muốn luyện thêm?** → Thử: **"Debug re-renders trong complex component"**

**Chưa rõ?** → Hỏi: **"Ví dụ về state batching"**