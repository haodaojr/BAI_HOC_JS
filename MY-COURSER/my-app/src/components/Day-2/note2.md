Rất hay 👏 Bạn đang tiến tới phần cực kỳ quan trọng trong React:
👉 **Event Handling Patterns** – các **mẫu (pattern)** phổ biến khi xử lý sự kiện trong React.

Đây là **nền tảng để viết code React chuyên nghiệp, rõ ràng và dễ mở rộng**.
Mình sẽ hướng dẫn theo đúng phong cách dành cho người mới nhé:
→ Giải thích dễ hiểu
→ Có ví dụ trực quan
→ Có sơ đồ dòng chảy
→ Có bài tập luyện tập 🎯

---

## 🧩 1. Hiểu đơn giản trước đã

💡 "Event Handling" nghĩa là **xử lý sự kiện người dùng** (click, nhập, gửi form, rê chuột...).
Còn "pattern" nghĩa là **một cách làm chuẩn, có quy tắc, dễ tái sử dụng**.

Vì vậy, **Event Handling Pattern** = cách bạn **tổ chức code xử lý sự kiện** sao cho:

* Dễ đọc 👀
* Dễ bảo trì 🔧
* Dễ tái sử dụng 🔁

---

## 🎯 2. Các Pattern phổ biến trong React

### 🔹 Pattern 1: Inline Handler (Xử lý trực tiếp)

Đơn giản, nhanh, dùng khi demo hoặc form nhỏ.

```jsx
<button onClick={() => alert("Hello!")}>Click me</button>
```

✅ Ưu điểm: dễ viết
❌ Nhược điểm: khó tái sử dụng, mỗi lần render → tạo hàm mới

---

### 🔹 Pattern 2: Defined Handler (Tách riêng hàm xử lý)

Tách riêng logic ra thành hàm rõ ràng.

```jsx
function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

✅ Rõ ràng, dễ đọc
✅ Dễ thêm logic, dễ test
🔸 Dùng nhiều nhất trong React thực tế

---

### 🔹 Pattern 3: Handler có tham số (Truyền dữ liệu vào sự kiện)

Ví dụ có danh sách sản phẩm, mỗi nút cần biết "id sản phẩm" nào được click.

```jsx
function App() {
  const handleClick = (id) => {
    console.log("Bạn vừa click sản phẩm ID:", id);
  };

  return (
    <>
      <button onClick={() => handleClick(1)}>Sản phẩm 1</button>
      <button onClick={() => handleClick(2)}>Sản phẩm 2</button>
    </>
  );
}
```

✅ Gọn, linh hoạt
⚠️ Lưu ý: `onClick={() => handleClick(id)}` là tạo hàm mới mỗi lần render → không sao với app nhỏ,
nhưng nếu bạn muốn tối ưu, có thể dùng `useCallback`.

---

### 🔹 Pattern 4: Handler Reuse (Tái sử dụng cho nhiều input)

Dùng **cùng một hàm** để xử lý nhiều sự kiện khác nhau.
Ví dụ form có nhiều ô nhập:

```jsx
function FormExample() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form>
      <input name="name" value={form.name} onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
    </form>
  );
}
```

✅ Rất phổ biến
✅ Dễ mở rộng
🔹 Một hàm, xử lý nhiều input → "Reusable Pattern"

---

### 🔹 Pattern 5: Event Delegation (Uỷ quyền sự kiện)

Thay vì gán `onClick` cho từng nút, gán cho **cha chung** để xử lý tất cả.

```jsx
function App() {
  const handleParentClick = (e) => {
    if (e.target.tagName === "BUTTON") {
      console.log("Bạn click:", e.target.textContent);
    }
  };

  return (
    <div onClick={handleParentClick}>
      <button>Like</button>
      <button>Share</button>
      <button>Comment</button>
    </div>
  );
}
```

✅ Hiệu quả, ít hàm hơn
✅ Dễ xử lý nhóm nút giống nhau
⚠️ Nhưng cần biết `e.target` để phân biệt phần tử được click.

---

### 🔹 Pattern 6: Prevent + Stop (Chặn hành vi mặc định hoặc dừng lan truyền)

```jsx
const handleSubmit = (e) => {
  e.preventDefault();  // chặn reload trang
  e.stopPropagation(); // không lan lên cha
  console.log("Form submitted!");
};
```

✅ Rất quan trọng khi có form lồng nhau hoặc nút nằm trong cha có event.

---

### 🔹 Pattern 7: SyntheticEvent Persistence (Giữ event sau callback)

React "tái sử dụng" (pool) event để tối ưu bộ nhớ, nên cần `persist()` nếu dùng async.

```jsx
const handleClick = (e) => {
  e.persist();
  setTimeout(() => {
    console.log(e.type); // Không bị lỗi
  }, 1000);
};
```

---

## 📊 3. Sơ đồ tư duy tổng quát

```
React Event Handling Patterns
│
├── Inline handler        → onClick={() => ...}
├── Defined handler       → const handleClick = () => ...
├── Parameterized handler → onClick={() => handleClick(id)}
├── Reusable handler      → dùng chung cho nhiều input
├── Event delegation      → xử lý từ cha
├── Prevent + Stop        → e.preventDefault(), e.stopPropagation()
└── Persist event         → e.persist() để dùng async
```

---

## 🚀 EVENT HANDLING PATTERNS CHI TIẾT (Nâng cao)

### **Pattern 1: Controlled Components (Form Inputs)**

💡 **Ý nghĩa:** Input được React "kiểm soát" hoàn toàn - giá trị luôn đồng bộ với state.

```jsx
import { useState } from 'react';

function ControlledInput() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={value}           // React kiểm soát giá trị
        onChange={handleChange} // React cập nhật khi user nhập
        placeholder="Nhập gì đó..."
      />
      <p>Bạn đã nhập: {value}</p>
    </div>
  );
}
```

**Ưu điểm:**
- ✅ State luôn chính xác
- ✅ Validation dễ dàng
- ✅ Có thể format/transform input
- ✅ Test dễ dàng

**Nhược điểm:**
- ❌ Nhiều re-render nếu input dài

---

### **Pattern 2: Uncontrolled Components (Ref-based)**

💡 **Ý nghĩa:** Để DOM tự quản lý giá trị, React chỉ can thiệp khi cần.

```jsx
import { useRef } from 'react';

function UncontrolledInput() {
  const inputRef = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value; // Lấy giá trị trực tiếp từ DOM
    console.log('Giá trị:', value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        ref={inputRef}        // React không kiểm soát giá trị
        defaultValue="Mặc định" // Giá trị ban đầu
      />
      <button type="submit">Gửi</button>
    </form>
  );
}
```

**Ưu điểm:**
- ✅ Ít re-render
- ✅ Performance tốt cho form dài
- ✅ Dễ tích hợp với thư viện bên thứ 3

**Nhược điểm:**
- ❌ Khó validation
- ❌ State không đồng bộ
- ❌ Khó test

---

### **Pattern 3: Event Delegation (List Items)**

💡 **Ý nghĩa:** Gán 1 event handler cho parent, để con cháu tự xử lý.

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React', completed: false },
    { id: 2, text: 'Viết code', completed: true }
  ]);
  
  // 1 handler cho toàn bộ list
  const handleItemClick = (e) => {
    const todoId = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    
    if (action === 'toggle') {
      setTodos(todos.map(todo => 
        todo.id === todoId 
          ? { ...todo, completed: !todo.completed }
          : todo
      ));
    } else if (action === 'delete') {
      setTodos(todos.filter(todo => todo.id !== todoId));
    }
  };
  
  return (
    <ul onClick={handleItemClick}>
      {todos.map(todo => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <span 
            data-id={todo.id}
            data-action="toggle"
            style={{ cursor: 'pointer' }}
          >
            {todo.completed ? '✅' : '⬜'} {todo.text}
          </span>
          <button 
            data-id={todo.id}
            data-action="delete"
          >
            Xóa
          </button>
        </li>
      ))}
    </ul>
  );
}
```

**Ưu điểm:**
- ✅ Performance tốt (ít event listener)
- ✅ Dễ maintain
- ✅ Tự động handle dynamic items

---

### **Pattern 4: Custom Event Handlers**

💡 **Ý nghĩa:** Tạo wrapper functions để tái sử dụng logic.

```jsx
// Custom hook cho form validation
function useFormValidation(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  // Generic change handler
  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Validation logic
    if (field === 'email' && !value.includes('@')) {
      setErrors(prev => ({ ...prev, email: 'Email không hợp lệ' }));
    } else {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  return { values, errors, handleChange };
}

function ContactForm() {
  const { values, errors, handleChange } = useFormValidation({
    name: '',
    email: '',
    message: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
      alert('Có lỗi validation!');
      return;
    }
    console.log('Form data:', values);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={values.name}
        onChange={handleChange('name')}
        placeholder="Tên"
      />
      
      <input 
        type="email"
        value={values.email}
        onChange={handleChange('email')}
        placeholder="Email"
      />
      {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      
      <textarea
        value={values.message}
        onChange={handleChange('message')}
        placeholder="Tin nhắn"
      />
      
      <button type="submit">Gửi</button>
    </form>
  );
}
```

---

### **Pattern 5: Debounced Event Handlers**

💡 **Ý nghĩa:** Trì hoãn xử lý event để tránh spam (như search).

```jsx
import { useState, useEffect, useRef } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

function SearchComponent() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // Đợi 500ms
  
  useEffect(() => {
    if (debouncedQuery) {
      // Gọi API search
      console.log('Searching for:', debouncedQuery);
      // fetchSearchResults(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Tìm kiếm..."
    />
  );
}
```

---

### **Pattern 6: Event Bubbling & Capturing**

💡 **Ý nghĩa:** Hiểu cách event lan truyền trong DOM tree.

```jsx
function EventBubblingDemo() {
  const handleParent = () => console.log('Parent clicked');
  const handleChild = (e) => {
    console.log('Child clicked');
    // e.stopPropagation(); // Ngăn bubble lên parent
  };
  
  return (
    <div onClick={handleParent} style={{ padding: '20px', background: 'lightblue' }}>
      <button onClick={handleChild}>
        Click me
      </button>
    </div>
  );
}

// Thứ tự log: Child clicked → Parent clicked (bubbling)
```

---

### **🎯 Best Practices Tổng hợp**

✅ **Controlled cho form quan trọng** (validation, transformation)  
✅ **Uncontrolled cho performance** (file uploads, large forms)  
✅ **Event delegation cho lists** (dynamic items)  
✅ **Debounce cho search** (API calls)  
✅ **Custom handlers cho reusability** (forms, validation)  
✅ **stopPropagation() khi cần** (modals, dropdowns)  
✅ **preventDefault() cho links/forms** (custom behavior)

## 🎯 4. Bài tập thực hành

### 🧪 Bài 1:

Tạo 3 nút: "Like ❤️", "Share 🔁", "Comment 💬"
👉 Khi click → in ra console tên nút được click.

### Gợi ý:

* Dùng **Event Delegation Pattern**
* Xử lý trong một hàm cha duy nhất

---

### 🧪 Bài 2:

Tạo form với 2 input (`name`, `email`)
👉 Khi người dùng nhập, cập nhật `state` và hiển thị kết quả ngay bên dưới.

Gợi ý:

* Dùng **Reusable Handler Pattern**

---

Bạn muốn mình **tạo sẵn code hoàn chỉnh cho 2 bài thực hành** này luôn để bạn chạy thử không,
hay bạn muốn **tự code rồi mình kiểm tra và sửa lỗi cho bạn**?

═══════════════════════════════════════════════════════════════
⏸️ CHECKPOINT: Kiểm tra hiểu biết
═══════════════════════════════════════════════════════════════

**Câu hỏi kiểm tra:**

1️⃣ **Khi nào dùng Controlled vs Uncontrolled components?**

2️⃣ **Event delegation hoạt động như thế nào? Ưu điểm?**

3️⃣ **Debouncing giúp gì trong event handling?**

4️⃣ **Tại sao cần custom event handlers?**

5️⃣ **stopPropagation() làm gì? Khi nào dùng?**

**Bài tập code:**  
Tạo một TodoList component sử dụng Event Delegation pattern. Paste code để review nhé! 🚀

═══════════════════════════════════════════════════════════════
🎯 FOOTER: Bước tiếp theo
═══════════════════════════════════════════════════════════════

**Hoàn thành checkpoint trên rồi nhắn mình nhé!**  

**Ngày mai:** Lists & Keys - Render mảng dữ liệu  
**Tuần tới:** State Management nâng cao  

Bạn hiểu các patterns chưa? Cần ví dụ thêm không? 🤔