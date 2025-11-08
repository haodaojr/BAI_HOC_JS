# ⚡ JSX ATTRIBUTES vs HTML ATTRIBUTES - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **3 khác biệt chính:**
1. 🔄 **Tên thuộc tính**: HTML dùng `kebab-case` → JSX dùng `camelCase`
2. 🏷️ **Từ khóa trùng**: `class`, `for` → `className`, `htmlFor`
3. 📦 **Giá trị động**: HTML dùng `""` → JSX dùng `{}`

---

## 🔥 PHẦN 1: BẢNG SO SÁNH NHANH

| HTML | JSX | Lý do |
|------|-----|-------|
| `class="..."` | `className="..."` | `class` là từ khóa JS |
| `for="..."` | `htmlFor="..."` | `for` là vòng lặp JS |
| `onclick="..."` | `onClick={...}` | camelCase + hàm không phải chuỗi |
| `onchange="..."` | `onChange={...}` | camelCase |
| `tabindex="1"` | `tabIndex={1}` | camelCase + số không cần `""` |
| `maxlength="10"` | `maxLength={10}` | camelCase |
| `readonly` | `readOnly` | camelCase |
| `<input>` | `<input />` | Tự đóng bắt buộc |
| `style="color: red"` | `style={{color: 'red'}}` | Object thay vì chuỗi |

---

## 🔥 PHẦN 2: 5 NHÓM THUỘC TÍNH QUAN TRỌNG

### **1. Thuộc tính CLASS và ID**

```jsx
// ❌ HTML
<div class="container" id="main">
  <p class="text-red">Hello</p>
</div>

// ✅ JSX
<div className="container" id="main">
  <p className="text-red">Hello</p>
</div>
```

**📌 Lưu ý:**
- `id` KHÔNG đổi (vẫn là `id`)
- CHỈ `class` → `className`

---

### **2. Event Handlers (Xử lý sự kiện)**

```jsx
// ❌ HTML
<button onclick="handleClick()">Click</button>
<input onchange="handleChange()" />
<form onsubmit="handleSubmit()">

// ✅ JSX
<button onClick={handleClick}>Click</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>
```

**🎯 Quy tắc:**
- Viết **camelCase**: `onClick`, `onChange`, `onSubmit`
- Truyền **hàm**, KHÔNG có `()`
- Dùng `{}` chứ không phải `""`

**Ví dụ đầy đủ:**
```jsx
function App() {
  function handleClick() {
    alert("Clicked!");
  }
  
  function handleChange(event) {
    console.log(event.target.value);
  }
  
  return (
    <div>
      <button onClick={handleClick}>Bấm tôi</button>
      <input onChange={handleChange} />
    </div>
  );
}
```

---

### **3. Form Attributes**

```jsx
// ❌ HTML
<label for="email">Email:</label>
<input 
  type="text" 
  id="email" 
  maxlength="50"
  readonly
  value="test@gmail.com"
>

// ✅ JSX
<label htmlFor="email">Email:</label>
<input 
  type="text" 
  id="email" 
  maxLength={50}
  readOnly
  defaultValue="test@gmail.com"
/>
```

**Bảng chi tiết:**

| HTML | JSX | Giá trị trong JSX |
|------|-----|-------------------|
| `for` | `htmlFor` | Chuỗi `"..."` |
| `maxlength` | `maxLength` | Số `{50}` |
| `readonly` | `readOnly` | Boolean `{true}` hoặc chỉ ghi `readOnly` |
| `value` | `value` hoặc `defaultValue` | `value={biến}` (controlled) <br> `defaultValue="..."` (uncontrolled) |

---

### **4. Style Attribute (Quan trọng!)**

**❌ HTML (chuỗi CSS):**
```html
<div style="background-color: blue; font-size: 16px; margin-top: 20px;">
  Hello
</div>
```

**✅ JSX (Object JavaScript):**
```jsx
<div style={{
  backgroundColor: 'blue',
  fontSize: 16,
  marginTop: 20
}}>
  Hello
</div>
```

**🎯 Quy tắc style trong JSX:**

1. **Dùng Object `{{}}`** (2 cặp ngoặc)
   - Ngoặc ngoài: Báo JSX là expression
   - Ngoặc trong: Object JavaScript

2. **Thuộc tính CSS → camelCase**
   ```javascript
   background-color → backgroundColor
   font-size → fontSize
   margin-top → marginTop
   ```

3. **Giá trị số KHÔNG cần đơn vị**
   ```jsx
   fontSize: 16     // Tự động thành 16px
   width: 200       // Tự động thành 200px
   opacity: 0.5     // Giữ nguyên
   ```

4. **Giá trị chuỗi dùng `''`**
   ```jsx
   color: 'red'
   backgroundColor: '#ff0000'
   width: '50%'     // Phải có đơn vị khi dùng %
   ```

**Ví dụ phức tạp:**
```jsx
function StyledCard() {
  let cardStyle = {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '300px'
  };
  
  return (
    <div style={cardStyle}>
      <h2 style={{ color: 'blue', fontSize: 24 }}>Tiêu đề</h2>
      <p style={{ margin: 0 }}>Nội dung</p>
    </div>
  );
}
```

---

### **5. Boolean Attributes**

**HTML:**
```html
<input type="checkbox" checked>
<input type="text" disabled>
<button autofocus>Click</button>
<video autoplay muted>
```

**JSX:**
```jsx
<input type="checkbox" checked={true} />
<input type="text" disabled={true} />
<button autoFocus>Click</button>
<video autoPlay muted>
```

**🎯 Quy tắc:**
- **Viết tắt**: `<input disabled />` = `<input disabled={true} />`
- **Tắt thuộc tính**: `<input disabled={false} />`
- **Động**: `<input disabled={isDisabled} />`

**Ví dụ thực tế:**
```jsx
function LoginForm() {
  let isLoading = true;
  let agreeTerms = false;
  
  return (
    <form>
      <input type="text" disabled={isLoading} />
      <button disabled={!agreeTerms}>Đăng nhập</button>
    </form>
  );
}
```

---

## 🔥 PHẦN 3: THUỘC TÍNH ĐỘNG (Dynamic Attributes)

### **Cách 1: Biến đơn**
```jsx
function Avatar() {
  let imageUrl = "https://example.com/avatar.jpg";
  let userName = "Minh";
  
  return <img src={imageUrl} alt={userName} />;
}
```

---

### **Cách 2: Template String**
```jsx
function ProductImage() {
  let productId = 123;
  let imageUrl = `https://shop.com/images/${productId}.jpg`;
  
  return <img src={imageUrl} alt="Product" />;
}
```

---

### **Cách 3: Conditional Class**
```jsx
function Button() {
  let isActive = true;
  let isPrimary = false;
  
  return (
    <button className={isActive ? 'btn-active' : 'btn-inactive'}>
      Click
    </button>
  );
}
```

**Nâng cao hơn (nhiều class):**
```jsx
function Card() {
  let isHighlighted = true;
  let isLarge = false;
  
  // Cách 1: Ghép chuỗi
  let classes = 'card ' + 
    (isHighlighted ? 'card-highlight ' : '') +
    (isLarge ? 'card-large' : '');
  
  return <div className={classes}>Card</div>;
  
  // Cách 2: Template string
  let classes2 = `card ${isHighlighted ? 'card-highlight' : ''} ${isLarge ? 'card-large' : ''}`;
  
  return <div className={classes2}>Card</div>;
}
```

---

### **Cách 4: Object Style động**
```jsx
function Box() {
  let isDark = true;
  let size = 200;
  
  return (
    <div style={{
      backgroundColor: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#333',
      width: size,
      height: size,
      padding: 20
    }}>
      Box
    </div>
  );
}
```

---

## 🔥 PHẦN 4: THUỘC TÍNH ĐỆC BIỆT TRONG JSX

### **1. `key` (Chỉ có trong JSX)**
```jsx
function TodoList() {
  let todos = ["Học React", "Làm bài tập", "Đi ngủ"];
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
  );
}
```

**🎯 Quy tắc `key`:**
- CHỈ dùng khi render danh sách với `map()`
- Giúp React nhận diện phần tử nào thay đổi
- Phải UNIQUE (duy nhất) trong danh sách
- Dùng `id` từ database tốt hơn `index`

---

### **2. `dangerouslySetInnerHTML` (Nguy hiểm!)**

**❌ KHÔNG thể làm:**
```jsx
let htmlString = "<h1>Hello</h1>";
<div>{htmlString}</div>  // Hiển thị: <h1>Hello</h1> (text thuần)
```

**✅ Cách đúng (nhưng nguy hiểm):**
```jsx
function RenderHTML() {
  let htmlString = "<h1>Hello</h1>";
  
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
}
// Hiển thị: Hello (như HTML thật)
```

**⚠️ CẢNH BÁO:**
- Chỉ dùng với HTML **AN TOÀN**
- KHÔNG dùng với HTML từ người dùng → Dễ bị hack (XSS attack)

---

### **3. `defaultValue` vs `value`**

**Controlled Component (React quản lý):**
```jsx
function ControlledInput() {
  let [text, setText] = useState('');
  
  return (
    <input 
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
```

**Uncontrolled Component (DOM quản lý):**
```jsx
function UncontrolledInput() {
  return <input defaultValue="Giá trị ban đầu" />;
}
```

---

## 🔥 PHẦN 5: LỖI PHỔ BIẾN

### **❌ Lỗi 1: Quên đổi `class`**
```jsx
// SAI
<div class="container">...</div>

// ĐÚNG
<div className="container">...</div>
```

---

### **❌ Lỗi 2: Style dùng chuỗi**
```jsx
// SAI
<div style="color: red">...</div>

// ĐÚNG
<div style={{ color: 'red' }}>...</div>
```

---

### **❌ Lỗi 3: Event có dấu `()`**
```jsx
// SAI
<button onClick={handleClick()}>Click</button>
// Hàm sẽ chạy NGAY khi render, không chờ click

// ĐÚNG
<button onClick={handleClick}>Click</button>
```

---

### **❌ Lỗi 4: Boolean attribute sai cú pháp**
```jsx
// SAI
<input disabled="true" />  // Vẫn bị disabled ngay cả khi ="false"!

// ĐÚNG
<input disabled={true} />
<input disabled />
<input disabled={isDisabled} />
```

---

### **❌ Lỗi 5: Quên tự đóng thẻ**
```jsx
// SAI
<img src="...">
<input type="text">

// ĐÚNG
<img src="..." />
<input type="text" />
```

---

## ⚡ BÀI TẬP NHANH

### **Bài 1: Chuyển HTML sang JSX**
```html
<!-- HTML -->
<div class="product-card" style="padding: 20px; background-color: white;">
  <img src="laptop.jpg" class="product-image">
  <h3 class="product-title">Laptop Gaming</h3>
  <label for="quantity">Số lượng:</label>
  <input type="number" id="quantity" maxlength="3" value="1">
  <button onclick="addToCart()" disabled>Thêm vào giỏ</button>
</div>
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function ProductCard() {
  function addToCart() {
    console.log("Added to cart");
  }
  
  return (
    <div className="product-card" style={{ padding: 20, backgroundColor: 'white' }}>
      <img src="laptop.jpg" className="product-image" alt="Laptop" />
      <h3 className="product-title">Laptop Gaming</h3>
      <label htmlFor="quantity">Số lượng:</label>
      <input type="number" id="quantity" maxLength={3} defaultValue="1" />
      <button onClick={addToCart} disabled>Thêm vào giỏ</button>
    </div>
  );
}
```
</details>

---

### **Bài 2: Tạo nút động**
```jsx
// Yêu cầu:
// - Nếu isLoading = true: Nút disabled, text "Đang xử lý..."
// - Nếu isLoading = false: Nút active, text "Gửi"
// - Nút có style: nền xanh khi active, nền xám khi disabled

function SubmitButton() {
  let isLoading = false;
  
  return (
    <button /* TODO: Thêm thuộc tính */>
      {/* TODO: Text động */}
    </button>
  );
}
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function SubmitButton() {
  let isLoading = false;
  
  return (
    <button 
      disabled={isLoading}
      style={{
        backgroundColor: isLoading ? '#ccc' : '#007bff',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: 4
      }}
    >
      {isLoading ? "Đang xử lý..." : "Gửi"}
    </button>
  );
}
```
</details>

---

### **Bài 3: Card với class động**
```jsx
// Yêu cầu:
// - Base class: "card"
// - Nếu isHighlighted = true: Thêm class "card-highlight"
// - Nếu size = "large": Thêm class "card-large"

function Card() {
  let isHighlighted = true;
  let size = "large"; // "small", "medium", "large"
  
  return (
    <div className={/* TODO */}>
      Card Content
    </div>
  );
}
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function Card() {
  let isHighlighted = true;
  let size = "large";
  
  let classes = `card ${isHighlighted ? 'card-highlight' : ''} ${size === 'large' ? 'card-large' : ''}`;
  
  return (
    <div className={classes}>
      Card Content
    </div>
  );
}
```
</details>

---

## 📊 BẢNG TRA CỨU NHANH

### **Event Handlers phổ biến:**
| Sự kiện | JSX | Khi nào xảy ra |
|---------|-----|----------------|
| Click | `onClick={fn}` | Bấm chuột |
| Change | `onChange={fn}` | Input thay đổi |
| Submit | `onSubmit={fn}` | Gửi form |
| Focus | `onFocus={fn}` | Click vào input |
| Blur | `onBlur={fn}` | Click ra ngoài |
| MouseOver | `onMouseOver={fn}` | Rê chuột vào |
| KeyPress | `onKeyPress={fn}` | Nhấn phím |

### **Style properties thường dùng:**
```jsx
style={{
  // Text
  color: 'red',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  
  // Box
  backgroundColor: '#f0f0f0',
  padding: 20,
  margin: 10,
  border: '1px solid #ccc',
  borderRadius: 8,
  
  // Layout
  width: 200,
  height: 100,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}}
```

---

## ✅ CHECKLIST

- [ ] Biết `class` → `className`, `for` → `htmlFor`
- [ ] Biết viết style dạng Object
- [ ] Biết event handler dùng camelCase
- [ ] Hiểu khác biệt `value` vs `defaultValue`
- [ ] Biết thuộc tính động với `{}`
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"JSX children và nested elements"**

**Muốn luyện thêm?** → Hỏi: **"Cho 5 bài tập về JSX attributes"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**