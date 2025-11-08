# ⚡ REACT EVENT SYSTEM (SYNTHETICEVENT) - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **SyntheticEvent = Wrapper của React cho browser events**

**3 điểm khác biệt chính:**
1. **Cross-browser**: Hoạt động giống nhau trên mọi trình duyệt
2. **Performance**: Pooled (tái sử dụng) để tối ưu memory
3. **Normalized**: API thống nhất, không còn browser inconsistencies

---

## 🔥 PHẦN 1: SYNTHETICEVENT LÀ GÌ?

### **🔍 Tại sao React cần SyntheticEvent?**

**❌ Vấn đề với native events:**
```javascript
// Browser khác nhau → event object khác nhau
button.addEventListener('click', function(event) {
  // Chrome: event.path exists
  // Firefox: event.path undefined
  // Safari: event.path khác
});
```

**✅ React giải pháp:**
```jsx
function handleClick(event) {
  // event luôn có cùng API trên mọi browser
  console.log(event.type); // 'click'
  console.log(event.target); // DOM element
}
```

### **🎯 SyntheticEvent features:**

**1. Cross-browser consistency:**
```jsx
function handleEvent(event) {
  // Cùng API trên Chrome, Firefox, Safari, Edge
  event.preventDefault(); // ✅ Luôn hoạt động
  event.stopPropagation(); // ✅ Luôn hoạt động
  event.target; // ✅ Luôn có
  event.currentTarget; // ✅ Luôn có
}
```

**2. Performance optimization:**
```jsx
// React tái sử dụng event objects
function handleClick(event) {
  // Event object được "pooled" và tái sử dụng
  // Không tạo mới mỗi lần event fire
  console.log(event.type); // OK
  setTimeout(() => {
    console.log(event.type); // ❌ Undefined (đã bị nullified)
  }, 0);
}
```

**3. Normalized properties:**
```jsx
function handleChange(event) {
  // input.value luôn là string (normalized)
  const value = event.target.value; // ✅ String
  const checked = event.target.checked; // ✅ Boolean
}
```

---

## 🔥 PHẦN 2: CẤU TRÚC SYNTHETICEVENT

### **🔍 Event object properties:**

```jsx
function handleClick(event) {
  console.log('=== SyntheticEvent Properties ===');

  // Basic info
  console.log('Type:', event.type); // 'click', 'change', 'submit'
  console.log('Native event:', event.nativeEvent); // Browser's native event

  // Target elements
  console.log('Target:', event.target); // Element triggered event
  console.log('Current target:', event.currentTarget); // Element with handler

  // Event phase
  console.log('Event phase:', event.eventPhase); // 1=capturing, 2=target, 3=bubbling

  // Timestamps
  console.log('Timestamp:', event.timeStamp); // When event occurred

  // State
  console.log('Default prevented:', event.defaultPrevented); // preventDefault called?
  console.log('Propagation stopped:', event.isPropagationStopped()); // stopPropagation called?

  // Coordinates (for mouse events)
  console.log('Client X/Y:', event.clientX, event.clientY);
  console.log('Page X/Y:', event.pageX, event.pageY);
  console.log('Screen X/Y:', event.screenX, event.screenY);
}
```

### **🎯 Target vs CurrentTarget:**

```jsx
function ListItem({ item, onDelete }) {
  return (
    <div onClick={onDelete}>
      <span>{item.name}</span>
      <button onClick={(e) => {
        e.stopPropagation(); // Ngăn event bubble lên parent
        onDelete(item.id);
      }}>
        Delete
      </button>
    </div>
  );
}

// Khi click button:
// event.target = <button> element
// event.currentTarget = <div> element (có onClick handler)
```

---

## 🔥 PHẦN 3: COMMON SYNTHETICEVENT METHODS

### **1. preventDefault() - Ngăn default behavior:**

```jsx
function Form({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault(); // ❌ Không reload trang
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### **2. stopPropagation() - Ngăn event bubbling:**

```jsx
function NestedComponents() {
  return (
    <div onClick={() => console.log('Parent clicked')}>
      <button onClick={(e) => {
        e.stopPropagation(); // ❌ Không trigger parent onClick
        console.log('Button clicked');
      }}>
        Click me
      </button>
    </div>
  );
}
```

### **3. persist() - Giữ event object:**

```jsx
function handleAsync(event) {
  // ❌ Sai: Event bị nullified trong async
  setTimeout(() => {
    console.log(event.target.value); // Undefined
  }, 1000);

  // ✅ Đúng: Persist event
  event.persist();
  setTimeout(() => {
    console.log(event.target.value); // OK
  }, 1000);
}
```

---

## 🔥 PHẦN 4: SYNTHETICEVENT TYPES

### **🔍 Mouse Events:**

```jsx
function MouseExample() {
  function handleMouse(event) {
    console.log('Mouse position:', event.clientX, event.clientY);
    console.log('Button:', event.button); // 0=left, 1=middle, 2=right
    console.log('Buttons:', event.buttons); // Bitmask of pressed buttons
  }

  return (
    <div
      onMouseDown={handleMouse}
      onMouseUp={handleMouse}
      onMouseMove={handleMouse}
      onClick={handleMouse}
      onDoubleClick={handleMouse}
    >
      Mouse interaction area
    </div>
  );
}
```

### **🔍 Keyboard Events:**

```jsx
function KeyboardExample() {
  function handleKey(event) {
    console.log('Key:', event.key); // 'a', 'Enter', 'ArrowUp'
    console.log('Code:', event.code); // 'KeyA', 'Enter', 'ArrowUp'
    console.log('KeyCode:', event.keyCode); // Legacy numeric code
    console.log('Alt/Ctrl/Shift:', event.altKey, event.ctrlKey, event.shiftKey);
    console.log('Repeat:', event.repeat); // Key being held down?
  }

  return (
    <input
      onKeyDown={handleKey}
      onKeyUp={handleKey}
      onKeyPress={handleKey} // Deprecated, use onKeyDown
    />
  );
}
```

### **🔍 Form Events:**

```jsx
function FormExample() {
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    console.log(`${name}:`, type === 'checkbox' ? checked : value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" onChange={handleChange} />
      <input name="password" type="password" onChange={handleChange} />
      <input name="agree" type="checkbox" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### **🔍 Focus Events:**

```jsx
function FocusExample() {
  function handleFocus(event) {
    console.log('Focused on:', event.target.name);
  }

  function handleBlur(event) {
    console.log('Blurred from:', event.target.name);
  }

  return (
    <div>
      <input name="first" onFocus={handleFocus} onBlur={handleBlur} />
      <input name="second" onFocus={handleFocus} onBlur={handleBlur} />
    </div>
  );
}
```

---

## 🔥 PHẦN 5: EVENT HANDLING PATTERNS

### **1. Inline arrow function:**

```jsx
function ButtonList({ items, onDelete }) {
  return (
    <div>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => onDelete(item.id)} // ✅ Pass parameter
        >
          Delete {item.name}
        </button>
      ))}
    </div>
  );
}
```

### **2. Named function:**

```jsx
function ButtonList({ items, onDelete }) {
  function handleDelete(itemId) {
    return () => onDelete(itemId); // ✅ Return function
  }

  return (
    <div>
      {items.map(item => (
        <button
          key={item.id}
          onClick={handleDelete(item.id)} // ❌ Wrong: calls immediately
        >
          Delete {item.name}
        </button>
      ))}
    </div>
  );
}
```

### **3. useCallback for performance:**

```jsx
import { useCallback } from 'react';

function ParentComponent() {
  const handleDelete = useCallback((itemId) => {
    console.log('Deleting item:', itemId);
  }, []); // Dependencies array

  return <ButtonList onDelete={handleDelete} />;
}
```

---

## 🔥 PHẦN 6: COMMON MISTAKES & DEBUG

### **❌ Lỗi phổ biến:**

**1. Event handler called immediately:**
```jsx
// ❌ Sai: Hàm được gọi ngay khi render
<button onClick={handleClick(item.id)}>Click</button>

// ✅ Đúng: Truyền function reference
<button onClick={() => handleClick(item.id)}>Click</button>
```

**2. Accessing event in async code:**
```jsx
// ❌ Sai: Event bị nullified
function handleChange(event) {
  setTimeout(() => {
    console.log(event.target.value); // Undefined
  }, 1000);
}

// ✅ Đúng: Persist hoặc capture value
function handleChange(event) {
  const value = event.target.value; // Capture ngay
  setTimeout(() => {
    console.log(value); // OK
  }, 1000);
}
```

**3. stopPropagation vs preventDefault confusion:**
```jsx
// stopPropagation: Ngăn event bubble lên parent
// preventDefault: Ngăn default browser behavior

function handleLinkClick(event) {
  event.preventDefault(); // ❌ Không navigate
  event.stopPropagation(); // ❌ Không trigger parent handlers
}
```

### **🔧 Debug events:**

```jsx
function debugEvent(event) {
  console.log('=== Event Debug ===');
  console.log('Type:', event.type);
  console.log('Target:', event.target);
  console.log('CurrentTarget:', event.currentTarget);
  console.log('Phase:', event.eventPhase);
  console.log('Default prevented:', event.defaultPrevented);

  // For form events
  if (event.target.name) {
    console.log('Name:', event.target.name);
    console.log('Value:', event.target.value);
  }
}
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Basic Event Handling**

```jsx
function ClickCounter() {
  const [count, setCount] = useState(0);

  function handleClick(event) {
    console.log('Button clicked!');
    console.log('Event type:', event.type);
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

### **Bài 2: Form Events**

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form data:', formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

### **Bài 3: Event with Parameters**

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build app', completed: false }
  ]);

  function toggleTodo(todoId) {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span style={{
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.text}
          </span>
          <button onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Event Type | Handler | Description | Common Use |
|------------|---------|-------------|------------|
| `onClick` | `(event) => {}` | Click events | Buttons, links |
| `onChange` | `(event) => {}` | Input changes | Form inputs |
| `onSubmit` | `(event) => {}` | Form submission | Forms |
| `onFocus` | `(event) => {}` | Element focused | Inputs |
| `onBlur` | `(event) => {}` | Element unfocused | Inputs |
| `onMouseOver` | `(event) => {}` | Mouse enters | Hover effects |
| `onMouseOut` | `(event) => {}` | Mouse leaves | Hover effects |
| `onKeyDown` | `(event) => {}` | Key pressed | Keyboard shortcuts |
| `onKeyUp` | `(event) => {}` | Key released | Form validation |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu SyntheticEvent là gì và tại sao cần
- [ ] Biết các properties quan trọng của event object
- [ ] Phân biệt target vs currentTarget
- [ ] Biết dùng preventDefault() và stopPropagation()
- [ ] Hiểu event pooling và persist()
- [ ] Biết các loại event phổ biến
- [ ] Thành thạo event handling patterns
- [ ] Tránh được common mistakes
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Event handling patterns và best practices"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về SyntheticEvent"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**