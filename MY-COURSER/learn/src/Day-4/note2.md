# ⚡ EVENT HANDLING PATTERNS - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Event Handling = Cách xử lý events trong React components**

**4 patterns chính:**
1. **Inline handlers**: `onClick={() => doSomething()}`
2. **Named handlers**: `onClick={handleClick}`
3. **Parameter handlers**: `onClick={() => handleClick(id)}`
4. **Callback props**: Parent truyền function xuống child

---

## 🔥 PHẦN 1: INLINE EVENT HANDLERS

### **🔍 Pattern đơn giản nhất:**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**✅ Khi nào dùng:**
- Event handler đơn giản (1-2 dòng)
- Không cần reuse logic
- Không cần test riêng

**❌ Khi nào không dùng:**
- Logic phức tạp
- Cần truyền parameters
- Handler được gọi nhiều lần

---

## 🔥 PHẦN 2: NAMED EVENT HANDLERS

### **🔍 Tách logic ra function riêng:**

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(count + 1);
  }

  function handleDecrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <button onClick={handleIncrement}>+</button>
      <span>{count}</span>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}
```

**✅ Lợi ích:**
- Code dễ đọc hơn
- Dễ debug
- Dễ test riêng
- Có thể reuse

---

## 🔥 PHẦN 3: EVENT HANDLERS VỚI PARAMETERS

### **🔍 Truyền parameters vào handler:**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build app' }
  ]);

  function deleteTodo(todoId) {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

**🎯 Pattern quan trọng:**
```jsx
// ✅ Đúng: Arrow function wrapper
<button onClick={() => deleteTodo(todo.id)}>Delete</button>

// ❌ Sai: Gọi function ngay lập tức
<button onClick={deleteTodo(todo.id)}>Delete</button>
```

---

## 🔥 PHẦN 4: CALLBACK PROPS PATTERN

### **🔍 Parent truyền function xuống child:**

```jsx
// Parent component
function App() {
  const [message, setMessage] = useState('');

  function handleMessageChange(newMessage) {
    setMessage(newMessage);
  }

  return (
    <div>
      <MessageInput onMessageChange={handleMessageChange} />
      <p>Message: {message}</p>
    </div>
  );
}

// Child component
function MessageInput({ onMessageChange }) {
  function handleSubmit(event) {
    event.preventDefault();
    const input = event.target.elements.message;
    onMessageChange(input.value);
    input.value = '';
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="message" placeholder="Type message..." />
      <button type="submit">Send</button>
    </form>
  );
}
```

**🎯 Data flow:**
1. Parent tạo function `handleMessageChange`
2. Parent truyền xuống child: `onMessageChange={handleMessageChange}`
3. Child gọi function khi cần: `onMessageChange(newValue)`
4. Parent state được update

---

## 🔥 PHẦN 5: ADVANCED PATTERNS

### **1. useCallback for performance:**

```jsx
import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty deps: function không đổi giữa renders

  return <CounterButton onClick={handleIncrement} />;
}

function CounterButton({ onClick }) {
  console.log('CounterButton re-rendered'); // Chỉ log 1 lần
  return <button onClick={onClick}>+</button>;
}
```

### **2. Event delegation pattern:**

```jsx
function Menu({ items, onItemClick }) {
  function handleClick(event) {
    const itemId = event.target.dataset.id;
    if (itemId) {
      onItemClick(itemId);
    }
  }

  return (
    <ul onClick={handleClick}>
      {items.map(item => (
        <li key={item.id} data-id={item.id}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// Usage
<Menu
  items={[
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' }
  ]}
  onItemClick={(id) => console.log('Clicked:', id)}
/>
```

### **3. Generic event handlers:**

```jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = useCallback((fieldName) => (event) => {
    setValues(prev => ({
      ...prev,
      [fieldName]: event.target.value
    }));
  }, []);

  return { values, handleChange };
}

function LoginForm() {
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  return (
    <form>
      <input
        value={values.email}
        onChange={handleChange('email')}
        placeholder="Email"
      />
      <input
        type="password"
        value={values.password}
        onChange={handleChange('password')}
        placeholder="Password"
      />
    </form>
  );
}
```

---

## 🔥 PHẦN 6: COMMON EVENT TYPES

### **1. onClick - Click events:**

```jsx
function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}

// Usage
<Button onClick={() => alert('Clicked!')}>
  Click me
</Button>
```

### **2. onChange - Input changes:**

```jsx
function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

// Usage
const [name, setName] = useState('');
<TextInput
  value={name}
  onChange={setName}
  placeholder="Enter name"
/>
```

### **3. onSubmit - Form submission:**

```jsx
function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(credentials);
  }

  function handleChange(field) {
    return (event) => {
      setCredentials(prev => ({
        ...prev,
        [field]: event.target.value
      }));
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={handleChange('email')}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={handleChange('password')}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### **4. onKeyDown - Keyboard events:**

```jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  }

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search..."
    />
  );
}
```

---

## 🔥 PHẦN 7: EVENT DELEGATION TRONG REACT

### **🔍 Event delegation là gì?**

**1 event handler cho nhiều elements thay vì 1 handler cho 1 element**

```jsx
// ❌ Không tối ưu: N event handlers
function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)} // N handlers
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// ✅ Tối ưu: 1 event handler
function TodoList({ todos, onToggle }) {
  function handleToggle(event) {
    const todoId = event.target.dataset.id;
    if (todoId) {
      onToggle(todoId);
    }
  }

  return (
    <ul onClick={handleToggle}>
      {todos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            data-id={todo.id}
            checked={todo.completed}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

**🎯 Khi nào dùng event delegation:**
- ✅ Nhiều elements cùng loại
- ✅ Elements được tạo dynamic
- ✅ Cần performance tối ưu
- ✅ Structure phức tạp

---

## 🔥 PHẦN 8: PREVENTDEFAULT & STOPPROPAGATION

### **1. preventDefault() - Ngăn default behavior:**

```jsx
function Link({ href, children }) {
  function handleClick(event) {
    event.preventDefault(); // ❌ Không navigate
    console.log('Link clicked, but no navigation');
  }

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
```

### **2. stopPropagation() - Ngăn event bubbling:**

```jsx
function NestedButtons() {
  return (
    <div onClick={() => console.log('Parent clicked')}>
      <button onClick={(e) => {
        e.stopPropagation(); // ❌ Không trigger parent
        console.log('Child clicked');
      }}>
        Child Button
      </button>
    </div>
  );
}
```

### **3. Combination:**

```jsx
function FormWithNestedButton({ onSubmit, onCancel }) {
  function handleSubmit(event) {
    event.preventDefault(); // Ngăn form submit
    event.stopPropagation(); // Ngăn bubble nếu có
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <div>
        <button type="submit">Submit</button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Ngăn trigger form submit
            onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Interactive Counter**

```jsx
function InteractiveCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <div>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          min="1"
        />
      </div>

      <div>
        <button onClick={() => setCount(count - step)}>-</button>
        <span style={{ margin: '0 20px', fontSize: '24px' }}>
          {count}
        </span>
        <button onClick={() => setCount(count + step)}>+</button>
      </div>

      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### **Bài 2: Todo List với Events**

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function addTodo() {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      }]);
      setInputValue('');
    }
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      addTodo();
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### **Bài 3: Form Validation**

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  }

  function handleChange(field) {
    return (event) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ''
        }));
      }
    };
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={formData.name}
          onChange={handleChange('name')}
          placeholder="Your name"
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>

      <div>
        <input
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="Your email"
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      <div>
        <textarea
          value={formData.message}
          onChange={handleChange('message')}
          placeholder="Your message"
          rows={4}
        />
        {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
      </div>

      <button type="submit">Send Message</button>
    </form>
  );
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Pattern | Syntax | Use Case | Example |
|---------|--------|----------|---------|
| **Inline** | `onClick={() => doSomething()}` | Simple actions | `<button onClick={() => setCount(c + 1)}>+</button>` |
| **Named** | `onClick={handleClick}` | Complex logic | `<button onClick={handleSubmit}>Submit</button>` |
| **With params** | `onClick={() => handleClick(id)}` | Dynamic data | `<button onClick={() => deleteItem(item.id)}>Delete</button>` |
| **Callback** | `onAction={callback}` | Parent-child | `<Child onUpdate={handleUpdate} />` |
| **useCallback** | `useCallback(fn, deps)` | Performance | `const handler = useCallback(() => {...}, []);` |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu 4 patterns chính của event handling
- [ ] Biết khi nào dùng inline vs named handlers
- [ ] Thành thạo truyền parameters vào event handlers
- [ ] Hiểu callback props pattern
- [ ] Biết dùng useCallback để tối ưu performance
- [ ] Hiểu event delegation
- [ ] Biết preventDefault vs stopPropagation
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"onClick, onChange, onSubmit events chi tiết"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về event patterns"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**