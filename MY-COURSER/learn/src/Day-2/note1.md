# ⚡ FUNCTION COMPONENT ANATOMY VÀ CÚ PHÁP - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Function Component = Hàm JavaScript trả về JSX**

**3 phần cốt lõi:**
1. **Function Declaration**: `function ComponentName() {`
2. **Return Statement**: `return <JSX />;`
3. **Export**: `export default ComponentName;`

---

## 🔥 PHẦN 1: CẤU TRÚC CƠ BẢN CỦA FUNCTION COMPONENT

### **Ví dụ đơn giản nhất:**

```jsx
function HelloWorld() {
  return <h1>Xin chào thế giới!</h1>;
}

export default HelloWorld;
```

**Phân tích TỪNG KÝ TỰ:**

**1. `function`:**
- Từ khóa JavaScript để khai báo hàm
- React component BẮT BUỘC là một hàm
- Hàm này sẽ được React gọi mỗi khi render

**2. `HelloWorld`:**
- Tên component (PHẢI viết hoa chữ cái đầu)
- Tuân theo quy tắc PascalCase
- React dùng chữ hoa để phân biệt với HTML tag

**🔍 Tại sao component PHẢI viết hoa chữ cái đầu?**

**Lý do 1: Phân biệt với HTML tag**
```jsx
// HTML tag (viết thường) - React hiểu là thẻ HTML thật
<div>Hello</div>
<button>Click</button>

// Component (viết hoa) - React hiểu là component do bạn tạo
<HelloWorld />
<Button />
```

**Lý do 2: Quy tắc của React**
```jsx
// ❌ Viết thường → React tìm HTML tag, không gọi function
function button() {
  return <div>My Button</div>;
}
<button />  // React tìm <button> HTML, KHÔNG gọi function button()

// ✅ Viết hoa → React gọi function component
function Button() {
  return <div>My Button</div>;
}
<Button />  // React gọi function Button()
```

**3. `()`:**
- Tham số đầu vào của hàm
- Component có thể nhận `props` qua tham số này
- Có thể để trống nếu không cần props

**4. `{`:**
- Bắt đầu thân hàm (function body)
- Chứa toàn bộ logic của component

**5. `return`:**
- Từ khóa JavaScript để trả về giá trị
- Component PHẢI return JSX (hoặc null)
- Chỉ được return 1 element cha duy nhất

**6. `<h1>Xin chào thế giới!</h1>`:**
- JSX element (JavaScript XML)
- React sẽ chuyển thành HTML thật
- Có thể chứa text, attributes, children

**7. `;`:**
- Kết thúc câu lệnh JavaScript
- JSX cũng là JavaScript expression

**8. `}`:**
- Đóng thân hàm

**9. `export default HelloWorld;`:**
- Xuất component ra ngoài file
- Cho phép file khác import và sử dụng

**🔍 Giải thích `export default`:**

**`export default` là gì?**
- Cú pháp ES6 để xuất component ra ngoài
- Cho phép file khác import component này

**Ví dụ:**

**File: `HelloWorld.jsx`**
```jsx
function HelloWorld() {
  return <h1>Hello</h1>;
}

export default HelloWorld;
// "Xuất" component HelloWorld ra ngoài
```

**File: `App.jsx`**
```jsx
import HelloWorld from './HelloWorld';
// "Nhập" component HelloWorld vào

function App() {
  return (
    <div>
      <HelloWorld />  {/* Sử dụng component */}
    </div>
  );
}
```

**🎯 2 cách export:**

**1. Named Export (có tên):**
```jsx
// File: components.jsx
export function Button() { ... }
export function Input() { ... }

// Import:
import { Button, Input } from './components';
```

**2. Default Export (mặc định):**
```jsx
// File: Button.jsx
function Button() { ... }
export default Button;

// Import:
import Button from './Button';
// Có thể đổi tên:
import MyButton from './Button';
```

**📌 Quy tắc:**
- 1 file CHỈ có 1 default export
- 1 file có thể có nhiều named export

---

### **❌ LỖI PHỔ BIẾN:**

**❌ Lỗi 1: Component name viết thường**
```jsx
function helloWorld() {  // SAI!
  return <h1>Hello</h1>;
}
// Lỗi: Component name phải viết hoa chữ cái đầu
```

**✅ Đúng:**
```jsx
function HelloWorld() {
  return <h1>Hello</h1>;
}
```

**❌ Lỗi 2: Quên return**
```jsx
function HelloWorld() {
  <h1>Hello</h1>  // SAI! Thiếu return
}
```

**✅ Đúng:**
```jsx
function HelloWorld() {
  return <h1>Hello</h1>;
}
```

**❌ Lỗi 3: Return nhiều element không bọc**
```jsx
function HelloWorld() {
  return (
    <h1>Hello</h1>
    <p>World</p>  // SAI! Phải bọc trong 1 element cha
  );
}
```

**✅ Đúng:**
```jsx
function HelloWorld() {
  return (
    <>
      <h1>Hello</h1>
      <p>World</p>
    </>
  );
}
```

---

### **📊 DÒNG CHẢY CỦA FUNCTION COMPONENT:**

```
1. Định nghĩa Component
   ↓
function HelloWorld() {
   ↓
2. Xử lý logic (nếu có)
   ↓
const message = "Hello";
   ↓
3. Return JSX
   ↓
return <h1>{message}</h1>;
   ↓
4. Export để dùng ở file khác
   ↓
export default HelloWorld;
   ↓
5. Import và sử dụng
   ↓
import HelloWorld from './HelloWorld';
<HelloWorld />
   ↓
6. React render lên DOM
   ↓
<h1>Hello</h1> (HTML thật trên trình duyệt)
```

---

## 🔥 PHẦN 2: CÁC CÁCH VIẾT FUNCTION COMPONENT

### **Cách 1: Function Declaration (Khuyên dùng)**

```jsx
function WelcomeMessage() {
  return <h1>Chào mừng bạn!</h1>;
}

export default WelcomeMessage;
```

**✅ Ưu điểm:**
- Rõ ràng, dễ đọc
- Hoisting (có thể sử dụng trước khi khai báo)
- Tương thích tốt với tất cả phiên bản JavaScript

---

### **Cách 2: Arrow Function**

```jsx
const WelcomeMessage = () => {
  return <h1>Chào mừng bạn!</h1>;
};

export default WelcomeMessage;
```

**Hoặc viết ngắn gọn hơn:**

```jsx
const WelcomeMessage = () => <h1>Chào mừng bạn!</h1>;

export default WelcomeMessage;
```

**📌 Lưu ý:**
- Arrow function KHÔNG có hoisting
- Phải khai báo trước khi sử dụng
- Viết ngắn gọn khi chỉ có 1 dòng return

---

### **Cách 3: Arrow Function với Implicit Return**

```jsx
const UserCard = ({ name, age }) => (
  <div>
    <h2>{name}</h2>
    <p>Tuổi: {age}</p>
  </div>
);

export default UserCard;
```

**Giải thích:**
- `()` bao quanh JSX thay cho `return`
- Chỉ dùng khi JSX đơn giản, không có logic phức tạp

---

## 🔥 PHẦN 3: COMPONENT VỚI PROPS

### **Component nhận props:**

```jsx
function UserProfile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Email: {props.email}</p>
      <p>Tuổi: {props.age}</p>
    </div>
  );
}

export default UserProfile;
```

**Sử dụng component:**

```jsx
<UserProfile 
  name="Nguyễn Văn A" 
  email="a@gmail.com" 
  age={25} 
/>
```

---

### **Destructuring props (Khuyên dùng):**

```jsx
function UserProfile({ name, email, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Tuổi: {age}</p>
    </div>
  );
}

export default UserProfile;
```

**✅ Lợi ích:**
- Code ngắn gọn hơn
- Rõ ràng hơn về props nào được sử dụng
- Tránh lặp lại `props.`

---

## 🔥 PHẦN 4: COMPONENT VỚI STATE (useState)

### **Import useState:**

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Tăng
      </button>
    </div>
  );
}

export default Counter;
```

**Phân tích TỪNG KÝ TỰ:**

**1. `import { useState } from 'react'`:**
- Import hook `useState` từ React
- `useState` là function giúp tạo state
- Phải import trước khi sử dụng

**2. `const [count, setCount] = useState(0)`:**

**2.1 `const`:**
- Từ khóa khai báo biến không thể thay đổi
- `[count, setCount]` là array destructuring
- Không thể gán lại `count = 5` (sẽ lỗi)

**2.2 `[count, setCount]`:**
- **Array Destructuring** của JavaScript
- `useState(0)` trả về mảng có 2 phần tử:
  ```javascript
  // Điều này:
  const [count, setCount] = useState(0);

  // Tương đương với:
  const stateArray = useState(0);
  const count = stateArray[0];      // Phần tử đầu tiên
  const setCount = stateArray[1];   // Phần tử thứ hai
  ```

**2.3 `count`:**
- Tên biến TỰ ĐẶT (bạn có thể đặt tên gì cũng được)
- Chứa **giá trị hiện tại** của state
- Ví dụ: `count = 0` ban đầu, sau đó có thể là `1, 2, 3...`
- **QUAN TRỌNG:** `count` là **READ-ONLY** (chỉ đọc)
  - ❌ SAI: `count = count + 1`
  - ✅ ĐÚNG: `setCount(count + 1)`

**2.4 `setCount`:**
- Tên hàm TỰ ĐẶT (quy ước: `set` + tên state)
- **Hàm duy nhất** để thay đổi giá trị của `count`
- Khi gọi `setCount(5)`:
  1. React cập nhật `count` thành `5`
  2. Component **tự động render lại**
  3. Hiển thị giá trị mới lên UI

**2.5 `= useState(0)`:**
- `useState`: Hook của React (phải import trước khi dùng)
- `(0)`: Giá trị ban đầu của state
  - Có thể là: số `0`, chuỗi `""`, mảng `[]`, object `{}`
  - **CHỈ chạy 1 LẦN** khi component render lần đầu

**🎯 Ví dụ thực tế:**
```jsx
import { useState } from 'react';

function Counter() {
  // Khởi tạo state với giá trị 0
  const [count, setCount] = useState(0);

  // count ban đầu = 0
  console.log(count); // 0

  function increase() {
    setCount(count + 1);
    // Sau khi gọi: count = 1, component render lại
  }

  return (
    <div>
      <p>Số đếm: {count}</p> {/* Hiển thị: Số đếm: 0 */}
      <button onClick={increase}>Tăng</button>
    </div>
  );
}
```

**⚠️ Lỗi phổ biến với useState:**

**❌ Lỗi 1: Thay đổi trực tiếp state**
```jsx
const [count, setCount] = useState(0);

// SAI: Thay đổi trực tiếp
count = count + 1; // Lỗi: Assignment to constant variable

// ĐÚNG:
setCount(count + 1);
```

**❌ Lỗi 2: Quên import useState**
```jsx
// SAI: Dùng mà không import
function Counter() {
  const [count, setCount] = useState(0); // Lỗi: useState is not defined
}

// ĐÚNG:
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
}
```

**❌ Lỗi 3: Gán sai giá trị ban đầu**
```jsx
// SAI: Gán undefined
const [user, setUser] = useState(); // user = undefined

// ĐÚNG: Gán giá trị mặc định
const [user, setUser] = useState(null);
const [name, setName] = useState('');
const [items, setItems] = useState([]);
```

**❌ Lỗi 4: Cập nhật state sai cách**
```jsx
const [count, setCount] = useState(0);

// SAI: Dùng giá trị cũ để tính mới
setCount(count + 1);
setCount(count + 1); // Vẫn +1, không +2

// ĐÚNG: Dùng callback
setCount(prevCount => prevCount + 1);
setCount(prevCount => prevCount + 1); // +2
```

---

### **🔍 Tại sao cần useState?**

**❌ Cách cũ (không dùng state):**
```jsx
function Counter() {
  let count = 0; // Biến thường

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => count++}> {/* KHÔNG hoạt động! */}
        Tăng
      </button>
    </div>
  );
}
```

**Vấn đề:**
- Click button không cập nhật UI
- React không biết biến thay đổi
- Component không render lại

**✅ Cách đúng (dùng useState):**
```jsx
function Counter() {
  const [count, setCount] = useState(0); // State

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}> {/* HOẠT ĐỘNG! */}
        Tăng
      </button>
    </div>
  );
}
```

**useState giúp:**
- Lưu trữ data trong component
- Tự động render lại khi data thay đổi
- Đồng bộ UI với data

---

## 🔥 PHẦN 5: COMPONENT VỚI EVENT HANDLERS

### **Xử lý sự kiện:**

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleSubmit(event) {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
      />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}

export default LoginForm;
```

**Giải thích:**
- `onChange`: Sự kiện khi input thay đổi
- `e.target.value`: Lấy giá trị từ input
- `onSubmit`: Sự kiện khi submit form
- `event.preventDefault()`: Ngăn reload trang

---

## 🔥 PHẦN 6: COMPONENT VỚI CONDITIONAL RENDERING

### **Render có điều kiện:**

```jsx
function Notification({ message, type }) {
  if (!message) {
    return null; // Không render gì
  }
  
  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
}

export default Notification;
```

**Sử dụng:**

```jsx
<Notification message="Đăng nhập thành công!" type="success" />
<Notification message="" type="error" /> {/* Không hiển thị */}
```

---

## 🔥 PHẦN 7: COMPONENT VỚI LIST RENDERING

### **Render danh sách:**

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
```

**Sử dụng:**

```jsx
const myTodos = [
  { id: 1, text: 'Học React' },
  { id: 2, text: 'Làm bài tập' },
  { id: 3, text: 'Đi ngủ' }
];

<TodoList todos={myTodos} />
```

---

## ⚡ BÀI TẬP NHANH (5 phút)

### **Bài 1: Tạo component hiển thị thông tin sản phẩm**

```jsx
// Yêu cầu: Tạo ProductCard component
// Props: name, price, image, inStock
// Hiển thị: hình ảnh, tên, giá, trạng thái còn hàng

function ProductCard({ name, price, image, inStock }) {
  // TODO: Implement component
}

export default ProductCard;
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Tạo cấu trúc cơ bản</summary>

```jsx
function ProductCard({ name, price, image, inStock }) {
  return (
    <div className="product-card">
      {/* TODO: Thêm nội dung */}
    </div>
  );
}

export default ProductCard;
```
</details>

<details>
<summary>Bước 2: Thêm hình ảnh</summary>

```jsx
function ProductCard({ name, price, image, inStock }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      {/* TODO: Thêm tên và giá */}
    </div>
  );
}

export default ProductCard;
```
</details>

<details>
<summary>Bước 3: Thêm tên và giá</summary>

```jsx
function ProductCard({ name, price, image, inStock }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Giá: {price.toLocaleString()}đ</p>
      {/* TODO: Thêm trạng thái */}
    </div>
  );
}

export default ProductCard;
```
</details>

<details>
<summary>Bước 4: Thêm trạng thái còn hàng</summary>

```jsx
function ProductCard({ name, price, image, inStock }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Giá: {price.toLocaleString()}đ</p>
      <p>Trạng thái: {inStock ? 'Còn hàng' : 'Hết hàng'}</p>
    </div>
  );
}

export default ProductCard;
```
</details>

---

### **Bài 2: Tạo component counter với state**

```jsx
// Yêu cầu: Tạo Counter component
// Có nút tăng, giảm, reset
// Hiển thị số hiện tại

function Counter() {
  // TODO: Implement with useState
}

export default Counter;
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Import useState và tạo component</summary>

```jsx
import { useState } from 'react';

function Counter() {
  // TODO: Khởi tạo state
  return (
    <div>
      {/* TODO: Hiển thị count */}
      {/* TODO: Thêm buttons */}
    </div>
  );
}

export default Counter;
```
</details>

<details>
<summary>Bước 2: Khởi tạo state</summary>

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* TODO: Hiển thị count */}
      {/* TODO: Thêm buttons */}
    </div>
  );
}

export default Counter;
```
</details>

<details>
<summary>Bước 3: Hiển thị count và thêm buttons</summary>

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Tăng</button>
      <button onClick={() => setCount(count - 1)}>Giảm</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
```
</details>

---

### **Bài 3: Tạo component form đăng ký**

```jsx
// Yêu cầu: Tạo RegisterForm component
// Có input: name, email, password
// Nút submit
// Log thông tin khi submit

function RegisterForm() {
  // TODO: Implement with useState and form handling
}

export default RegisterForm;
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Import useState và tạo state</summary>

```jsx
import { useState } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // TODO: Tạo handleSubmit
  // TODO: Tạo form JSX

  return (
    <form>
      {/* TODO: Thêm inputs và button */}
    </form>
  );
}

export default RegisterForm;
```
</details>

<details>
<summary>Bước 2: Tạo handleSubmit function</summary>

```jsx
import { useState } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Đăng ký thành công!');
  }

  // TODO: Tạo form JSX

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: Thêm inputs và button */}
    </form>
  );
}

export default RegisterForm;
```
</details>

<details>
<summary>Bước 3: Thêm inputs và button</summary>

```jsx
import { useState } from 'react';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Đăng ký thành công!');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Họ tên"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
        required
      />
      <button type="submit">Đăng ký</button>
    </form>
  );
}

export default RegisterForm;
```
</details>

---

## 📊 BẢNG TỔNG HỢP

| Thành phần | Cú pháp | Ví dụ |
|------------|---------|-------|
| **Function Declaration** | `function Name() { return <JSX />; }` | `function App() { return <h1>Hello</h1>; }` |
| **Arrow Function** | `const Name = () => <JSX />;` | `const App = () => <h1>Hello</h1>;` |
| **Props** | `function Name({ prop })` | `function User({ name })` |
| **State** | `const [state, setState] = useState(initial)` | `const [count, setCount] = useState(0)` |
| **Event** | `onEvent={handler}` | `onClick={handleClick}` |
| **Conditional** | `{condition ? <A /> : <B />}` | `{isLoggedIn ? <Dashboard /> : <Login />}` |
| **List** | `{array.map(item => <Item key={item.id} />)}` | `{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}` |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu cấu trúc cơ bản của function component
- [ ] Biết 3 cách viết function component
- [ ] Biết cách nhận và sử dụng props
- [ ] Biết cách sử dụng useState
- [ ] Biết cách xử lý events
- [ ] Biết cách render có điều kiện
- [ ] Biết cách render danh sách
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Component naming conventions (PascalCase, descriptive names)"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về function component anatomy"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**