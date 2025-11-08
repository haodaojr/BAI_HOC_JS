# ⚡ JSX EXPRESSIONS & JAVASCRIPT EMBEDDING - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **JSX Expression = Code JavaScript trong dấu `{}`**

**3 quy tắc vàng:**
1. ✅ **Expression** (có giá trị) → Được phép
2. ❌ **Statement** (if/for/while) → KHÔNG được
3. ✅ Dùng **toán tử 3 ngôi**, **&&**, **||** thay thế

---

## 🔥 PHẦN 1: EXPRESSION vs STATEMENT (Hiểu 1 lần là đủ)

### **Expression (Biểu thức) - CÓ GIÁ TRỊ:**
```jsx
{5 + 3}           // ✅ Trả về: 8
{userName}        // ✅ Trả về: giá trị biến
{getName()}       // ✅ Trả về: kết quả hàm
{price * 1.1}     // ✅ Trả về: số
{isActive ? "Yes" : "No"}  // ✅ Trả về: chuỗi
```

### **Statement (Câu lệnh) - KHÔNG CÓ GIÁ TRỊ:**
```jsx
{if (x > 5) {...}}      // ❌ Lỗi
{for (let i=0; i<10; i++) {...}}  // ❌ Lỗi
{let x = 5;}            // ❌ Lỗi
```

### **🎯 Nguyên tắc đơn giản:**
**Hỏi:** "Cái này có thể gán vào biến không?"

```javascript
let result = 5 + 3;           // ✅ Được → Expression
let result = if (x > 5) {};   // ❌ Lỗi → Statement
```

---

## 🔥 PHẦN 2: 8 CÁCH NHÚNG JS VÀO JSX

### **1. Biến đơn giản**
```jsx
function User() {
  let name = "Minh";
  let age = 25;
  
  return <h1>{name} - {age} tuổi</h1>;
}
// Kết quả: Minh - 25 tuổi
```

---

### **2. Tính toán**
```jsx
function Price() {
  let price = 100000;
  let tax = 0.1;
  
  return (
    <div>
      <p>Giá gốc: {price}đ</p>
      <p>Thuế: {price * tax}đ</p>
      <p>Tổng: {price + price * tax}đ</p>
    </div>
  );
}
// Kết quả: 
// Giá gốc: 100000đ
// Thuế: 10000đ
// Tổng: 110000đ
```

---

### **3. Gọi hàm**
```jsx
function Greeting() {
  function getTime() {
    return new Date().toLocaleTimeString();
  }
  
  return <h1>Bây giờ là: {getTime()}</h1>;
}
// Kết quả: Bây giờ là: 14:30:25
```

---

### **4. Template Strings**
```jsx
function Product() {
  let name = "Laptop";
  let brand = "Dell";
  
  return <h1>{`${brand} ${name}`}</h1>;
}
// Kết quả: Dell Laptop
```

---

### **5. Toán tử 3 ngôi (Thay if/else)**
```jsx
function Status() {
  let isOnline = true;
  
  return (
    <div>
      Trạng thái: {isOnline ? "Online" : "Offline"}
    </div>
  );
}
// Kết quả: Trạng thái: Online
```

**Cú pháp:**
```javascript
{điềuKiện ? nếuĐúng : nếuSai}
```

---

### **6. Toán tử && (Hiển thị có điều kiện)**
```jsx
function Notification() {
  let hasNewMessage = true;
  let messageCount = 5;
  
  return (
    <div>
      {hasNewMessage && <p>Bạn có {messageCount} tin nhắn mới</p>}
    </div>
  );
}
// Nếu hasNewMessage = true → Hiển thị <p>
// Nếu hasNewMessage = false → Không hiển thị gì
```

**Logic:**
```javascript
true && <p>Text</p>   // → Hiển thị <p>
false && <p>Text</p>  // → Không hiển thị
```

---

### **7. Array.map() - Render danh sách**
```jsx
function ProductList() {
  let products = ["Laptop", "Mouse", "Keyboard"];
  
  return (
    <ul>
      {products.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
// Kết quả:
// • Laptop
// • Mouse
// • Keyboard
```

**Giải thích map():**
```javascript
products.map((item, index) => {...})
```
- `item`: Từng phần tử trong mảng
- `index`: Vị trí (0, 1, 2...)
- `key={index}`: React cần để phân biệt các phần tử

---

### **8. Object properties**
```jsx
function UserCard() {
  let user = {
    name: "Minh",
    age: 25,
    email: "minh@gmail.com"
  };
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Tuổi: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

---

## 🔥 PHẦN 3: CONDITIONAL RENDERING (3 cách)

### **Cách 1: Toán tử 3 ngôi (inline)**
```jsx
function LoginButton() {
  let isLoggedIn = false;
  
  return (
    <button>
      {isLoggedIn ? "Đăng xuất" : "Đăng nhập"}
    </button>
  );
}
```

---

### **Cách 2: Toán tử &&**
```jsx
function AdminPanel() {
  let isAdmin = true;
  
  return (
    <div>
      <h1>Dashboard</h1>
      {isAdmin && <button>Xóa người dùng</button>}
    </div>
  );
}
// Chỉ admin mới thấy nút "Xóa người dùng"
```

---

### **Cách 3: If/else NGOÀI JSX**
```jsx
function UserGreeting() {
  let isLoggedIn = true;
  
  // If/else TRƯỚC return
  if (isLoggedIn) {
    return <h1>Chào mừng bạn!</h1>;
  } else {
    return <h1>Vui lòng đăng nhập</h1>;
  }
}
```

---

## 🔥 PHẦN 4: LỖI PHỔ BIẾN & CÁCH SỬA

### **❌ Lỗi 1: Dùng if trong `{}`**
```jsx
// SAI
{if (isActive) <p>Active</p>}

// ĐÚNG
{isActive && <p>Active</p>}
// hoặc
{isActive ? <p>Active</p> : null}
```

---

### **❌ Lỗi 2: Quên `key` trong map()**
```jsx
// SAI
{items.map(item => <li>{item}</li>)}

// ĐÚNG
{items.map((item, index) => <li key={index}>{item}</li>)}
```

---

### **❌ Lỗi 3: Render object trực tiếp**
```jsx
let user = { name: "Minh" };

// SAI
<p>{user}</p>  // Lỗi: Objects are not valid as a React child

// ĐÚNG
<p>{user.name}</p>
```

---

### **❌ Lỗi 4: Quên ngoặc khi return nhiều dòng**
```jsx
// SAI
{items.map(item => 
  <li>{item}</li>
  <span>X</span>
)}

// ĐÚNG
{items.map(item => (
  <>
    <li>{item}</li>
    <span>X</span>
  </>
))}
```

---

## ⚡ BÀI TẬP NHANH (5 phút)

### **Bài 1: Hiển thị giá có giảm**
```jsx
function Product() {
  let price = 100000;
  let discount = 0.2;
  let hasDiscount = true;
  
  return (
    <div>
      <p>Giá: {price}đ</p>
      {/* TODO: Nếu có giảm giá, hiển thị giá sau giảm */}
    </div>
  );
}
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function Product() {
  let price = 100000;
  let discount = 0.2;
  let hasDiscount = true;
  
  return (
    <div>
      <p>Giá gốc: {price}đ</p>
      {hasDiscount && (
        <p>Giá sau giảm: {price * (1 - discount)}đ</p>
      )}
    </div>
  );
}
```
</details>

---

### **Bài 2: Render danh sách sinh viên**
```jsx
function StudentList() {
  let students = [
    { id: 1, name: "An", score: 8.5 },
    { id: 2, name: "Bình", score: 7.0 },
    { id: 3, name: "Chi", score: 9.0 }
  ];
  
  return (
    <ul>
      {/* TODO: Hiển thị: Tên - Điểm */}
    </ul>
  );
}
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function StudentList() {
  let students = [
    { id: 1, name: "An", score: 8.5 },
    { id: 2, name: "Bình", score: 7.0 },
    { id: 3, name: "Chi", score: 9.0 }
  ];
  
  return (
    <ul>
      {students.map(student => (
        <li key={student.id}>
          {student.name} - {student.score} điểm
        </li>
      ))}
    </ul>
  );
}
```
</details>

---

### **Bài 3: Hiển thị trạng thái**
```jsx
function OrderStatus() {
  let status = "shipping"; // "pending", "shipping", "delivered"
  
  return (
    <div>
      Trạng thái: {/* TODO: 
        - pending → Đang xử lý
        - shipping → Đang giao
        - delivered → Đã giao
      */}
    </div>
  );
}
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function OrderStatus() {
  let status = "shipping";
  
  return (
    <div>
      Trạng thái: {
        status === "pending" ? "Đang xử lý" :
        status === "shipping" ? "Đang giao" :
        status === "delivered" ? "Đã giao" :
        "Không xác định"
      }
    </div>
  );
}
```
</details>

---

## 📊 BẢNG TỔNG HỢP NHANH

| Tình huống | Cú pháp | Ví dụ |
|-----------|---------|-------|
| Hiển thị biến | `{biến}` | `{name}` |
| Tính toán | `{a + b}` | `{price * 1.1}` |
| If có 2 kết quả | `{điềuKiện ? a : b}` | `{isActive ? "Yes" : "No"}` |
| If chỉ 1 kết quả | `{điềuKiện && <...>}` | `{isAdmin && <Button />}` |
| Render mảng | `{arr.map(...)}` | `{items.map(i => <li>{i}</li>)}` |
| Gọi hàm | `{hàm()}` | `{getDate()}` |

---

## ✅ CHECKLIST TỰ KIỂM TRA

- [ ] Hiểu Expression vs Statement
- [ ] Biết dùng `{}` để nhúng JS
- [ ] Biết 3 cách conditional rendering
- [ ] Dùng được `map()` render danh sách
- [ ] Biết khi nào dùng `&&`, khi nào dùng `? :`
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Nếu đã hiểu:**
➡️ Hỏi: **"JSX attributes vs HTML attributes"**

**Nếu muốn luyện thêm:**
➡️ Hỏi: **"Cho thêm bài tập về JSX expressions"**

**Nếu chưa rõ:**
➡️ Hỏi: **"Giải thích lại [phần nào đó]"**