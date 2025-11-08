# ⚡ useState VỚI PRIMITIVE VALUES

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **useState với Primitive Values**

**Primitive values** = String, Number, Boolean, null, undefined, Symbol, BigInt

**3 primitive types quan trọng nhất:**
1. **String**: Text input, display text
2. **Number**: Counters, calculations, quantities
3. **Boolean**: Toggles, flags, conditions

**✅ Đúng:** `const [count, setCount] = useState(0);`
**❌ Sai:** `const [count] = useState(0);`

---

## 🔥 PHẦN 1: STRING STATE

### **🔍 Tại sao cần string state?**

**String state** dùng để lưu trữ và cập nhật text data trong component. React cần control input values để đồng bộ UI với state.

### **🔍 Text Input cơ bản:**

```jsx
function TextInput() {
  const [text, setText] = useState(''); // Khởi tạo rỗng

  function handleChange(event) {
    setText(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Nhập text..."
      />
      <p>Bạn đã nhập: {text}</p>
      <p>Độ dài: {text.length} ký tự</p>
    </div>
  );
}
```

### **🔍 Controlled vs Uncontrolled:**

```jsx
// ✅ Controlled Component (Khuyên dùng)
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// ❌ Uncontrolled Component (Không khuyên)
function UncontrolledInput() {
  return <input defaultValue="Hello" />;
}
```

### **🔍 String với validation:**

```jsx
function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Real-time validation
    if (newEmail && !newEmail.includes('@')) {
      setError('Email phải chứa @');
    } else {
      setError('');
    }
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Nhập email..."
        style={{ borderColor: error ? 'red' : '#ddd' }}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
}
```

---

## ❌ LỖI PHỔ BIẾN:

**❌ Lỗi 1: Không dùng controlled inputs**
```jsx
// ❌ Sai: Uncontrolled input
function BadInput() {
  return <input />; // Không có value, onChange
}

// ✅ Đúng: Controlled input
function GoodInput() {
  const [value, setValue] = useState('');
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

**❌ Lỗi 2: Mutate string directly**
```jsx
// ❌ Sai: Thay đổi string trực tiếp
function BadString() {
  const [text, setText] = useState('hello');

  function handleClick() {
    text.toUpperCase(); // Không thay đổi state!
    setText(text); // Vẫn là 'hello'
  }
}

// ✅ Đúng: Tạo string mới
function GoodString() {
  const [text, setText] = useState('hello');

  function handleClick() {
    setText(text.toUpperCase()); // Tạo string mới
  }
}
```

---

## 📊 So sánh trực quan:

| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| `<input />` | `<input value={val} onChange={...} />` | Controlled component |
| `text.toUpperCase()` | `setText(text.toUpperCase())` | Tạo value mới |
| `defaultValue` | `value` + `onChange` | State sync với UI |

---

## 🔥 PHẦN 2: NUMBER STATE

### **🔍 Tại sao cần number state?**

**Number state** dùng cho các giá trị số học, counters, và calculations. React cần convert string từ input thành number để tính toán chính xác.

### **🔍 Counter cơ bản:**

```jsx
function Counter() {
  const [count, setCount] = useState(0); // Khởi tạo bằng 0

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### **🔍 Number input với validation:**

```jsx
function AgeInput() {
  const [age, setAge] = useState(18);

  function handleChange(event) {
    const newAge = parseInt(event.target.value) || 0;
    // Validation: tuổi từ 0-120
    if (newAge >= 0 && newAge <= 120) {
      setAge(newAge);
    }
  }

  return (
    <div>
      <label>Tuổi: </label>
      <input
        type="number"
        value={age}
        onChange={handleChange}
        min="0"
        max="120"
      />
      <p>Tuổi: {age}</p>
      {age < 18 && <p style={{ color: 'orange' }}>Chưa đủ tuổi</p>}
    </div>
  );
}
```

### **🔍 Calculator với numbers:**

```jsx
function SimpleCalculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  function calculate(operation) {
    let res = 0;
    switch (operation) {
      case '+':
        res = num1 + num2;
        break;
      case '-':
        res = num1 - num2;
        break;
      case '*':
        res = num1 * num2;
        break;
      case '/':
        res = num2 !== 0 ? num1 / num2 : 'Error';
        break;
      default:
        res = 0;
    }
    setResult(res);
  }

  return (
    <div>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(Number(e.target.value))}
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(Number(e.target.value))}
      />
      <div>
        <button onClick={() => calculate('+')}>+</button>
        <button onClick={() => calculate('-')}>-</button>
        <button onClick={() => calculate('*')}>*</button>
        <button onClick={() => calculate('/')}>/</button>
      </div>
      <h3>Kết quả: {result}</h3>
    </div>
  );
}
```

---

## ❌ LỖI PHỔ BIẾN:

**❌ Lỗi 1: Không convert string to number**
```jsx
// ❌ Sai: event.target.value là string
function BadNumber() {
  const [age, setAge] = useState(0);

  return (
    <input
      type="number"
      onChange={(e) => setAge(e.target.value)} // String "25"
    />
  );
}

// ✅ Đúng: Convert to number
function GoodNumber() {
  const [age, setAge] = useState(0);

  return (
    <input
      type="number"
      onChange={(e) => setAge(Number(e.target.value))} // Number 25
    />
  );
}
```

**❌ Lỗi 2: NaN handling**
```jsx
// ❌ Sai: Không handle NaN
function BadCalc() {
  const [num, setNum] = useState(0);

  return (
    <input
      onChange={(e) => setNum(parseInt(e.target.value))} // NaN nếu empty
    />
  );
}

// ✅ Đúng: Handle NaN
function GoodCalc() {
  const [num, setNum] = useState(0);

  return (
    <input
      onChange={(e) => setNum(parseInt(e.target.value) || 0)} // 0 nếu NaN
    />
  );
}
```

---

## 📊 So sánh trực quan:

| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| `setAge(e.target.value)` | `setAge(Number(e.target.value))` | Convert string to number |
| `parseInt(value)` | `parseInt(value) || 0` | Handle NaN |
| `count++` | `setCount(count + 1)` | Functional update |

---

## 🔥 PHẦN 3: BOOLEAN STATE

### **🔍 Tại sao cần boolean state?**

**Boolean state** dùng cho các trạng thái true/false như show/hide, enabled/disabled, loading states. React cần boolean để conditional rendering và logic.

### **🔍 Toggle button:**

```jsx
function ToggleButton() {
  const [isOn, setIsOn] = useState(false); // Khởi tạo false

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      style={{
        backgroundColor: isOn ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer'
      }}
    >
      {isOn ? 'Bật' : 'Tắt'}
    </button>
  );
}
```

### **🔍 Show/Hide panel:**

```jsx
function TogglePanel() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Ẩn' : 'Hiện'} Panel
      </button>

      {isVisible && (
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          marginTop: '10px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>Panel Content</h3>
          <p>Đây là nội dung của panel có thể ẩn/hiện.</p>
        </div>
      )}
    </div>
  );
}
```

### **🔍 Multiple toggles:**

```jsx
function MultiToggle() {
  const [showText, setShowText] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{
      backgroundColor: darkMode ? '#333' : '#fff',
      color: darkMode ? '#fff' : '#333',
      padding: '20px',
      minHeight: '200px'
    }}>
      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={showText}
            onChange={() => setShowText(!showText)}
          />
          Hiển thị text
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={showImage}
            onChange={() => setShowImage(!showImage)}
          />
          Hiển thị ảnh
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Dark mode
        </label>
      </div>

      {showText && <p>Đây là đoạn text có thể ẩn/hiện.</p>}
      {showImage && (
        <img
          src="https://via.placeholder.com/200x100"
          alt="Sample"
          style={{ marginTop: '10px' }}
        />
      )}
    </div>
  );
}
```

---

## ❌ LỖI PHỔ BIẾN:

**❌ Lỗi 1: Confusing boolean logic**
```jsx
// ❌ Sai: Logic confusing
function BadToggle() {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div>
      <button onClick={() => setIsHidden(!isHidden)}>
        {isHidden ? 'Show' : 'Hide'} {/* Logic ngược */}
      </button>
      {!isHidden && <p>Content</p>} {/* Double negative */}
    </div>
  );
}

// ✅ Đúng: Logic clear
function GoodToggle() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'}
      </button>
      {isVisible && <p>Content</p>}
    </div>
  );
}
```

**❌ Lỗi 2: Unnecessary boolean conversion**
```jsx
// ❌ Sai: Unnecessary !!
function BadBoolean() {
  const [loading, setLoading] = useState(false);

  return (
    <button disabled={!!loading}> {/* Unnecessary */}
      Click me
    </button>
  );
}

// ✅ Đúng: Direct boolean
function GoodBoolean() {
  const [loading, setLoading] = useState(false);

  return (
    <button disabled={loading}>
      Click me
    </button>
  );
}
```

---

## 📊 So sánh trực quan:

| ❌ Sai | ✅ Đúng | Lý do |
|--------|---------|-------|
| `isHidden` + `!isHidden` | `isVisible` + `isVisible` | Positive naming |
| `!!loading` | `loading` | Direct boolean |
| `checked={value ? true : false}` | `checked={value}` | Unnecessary ternary |

---

## ⚡ BÀI TẬP NHANH (5 phút)

### **Bài 1: Primitive Types Practice**

```jsx
// Tạo component với 3 primitive types:
// 1. String input cho tên
// 2. Number input cho tuổi
// 3. Boolean checkbox cho "đã kết hôn"
// 4. Hiển thị kết quả khi submit

// 1. Khai báo state cho từng type?
// 2. Xử lý onChange cho string?
// 3. Xử lý onChange cho number?
// 4. Xử lý onChange cho boolean?
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Import và khai báo state</summary>

```jsx
import { useState } from 'react';

function UserInfoForm() {
  const [name, setName] = useState(''); // String
  const [age, setAge] = useState(18); // Number
  const [isMarried, setIsMarried] = useState(false); // Boolean
  const [submitted, setSubmitted] = useState(false); // Boolean
}
```
</details>

<details>
<summary>Bước 2: Handle string input</summary>

```jsx
function handleNameChange(e) {
  setName(e.target.value); // String trực tiếp
}
```
</details>

<details>
<summary>Bước 3: Handle number input</summary>

```jsx
function handleAgeChange(e) {
  setAge(Number(e.target.value) || 0); // Convert to number
}
```
</details>

<details>
<summary>Bước 4: Handle boolean checkbox</summary>

```jsx
function handleMarriedChange(e) {
  setIsMarried(e.target.checked); // Boolean trực tiếp
}
```
</details>

<details>
<summary>Đáp án cuối cùng</summary>

```jsx
function UserInfoForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(18);
  const [isMarried, setIsMarried] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <h3>Thông tin của bạn:</h3>
        <p>Tên: {name}</p>
        <p>Tuổi: {age}</p>
        <p>Đã kết hôn: {isMarried ? 'Có' : 'Không'}</p>
        <button onClick={() => setSubmitted(false)}>Nhập lại</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Tên: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Tuổi: </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value) || 0)}
          min="0"
          max="120"
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={isMarried}
            onChange={(e) => setIsMarried(e.target.checked)}
          />
          Đã kết hôn
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
```
</details>

---

## 📊 BẢNG TRA CỨU NHANH

| Primitive Type | Use Case | Example |
|----------------|----------|---------|
| **String** | Text input, display | `useState('')` |
| **Number** | Counters, quantities | `useState(0)` |
| **Boolean** | Toggles, flags | `useState(false)` |
| **null** | Empty state | `useState(null)` |
| **undefined** | Not initialized | `useState(undefined)` |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Sử dụng string state cho text inputs
- [ ] Implement number state cho counters
- [ ] Tạo boolean state cho toggles
- [ ] Kết hợp multiple primitive types
- [ ] Biết khi nào dùng primitive vs object state
- [ ] Validate primitive values
- [ ] Handle edge cases (empty, invalid values)

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Học: **"State vs Props deep comparison"**

**Muốn luyện thêm?** → Thử: **"Tạo form với validation sử dụng primitives"**

**Chưa rõ?** → Hỏi: **"Ví dụ về combining primitives"**