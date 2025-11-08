# 🎯 KẾ HOẠCH DẠY: JSX Syntax & Compilation Process

Mình sẽ:

1. **BỔ SUNG kiến thức nền**: Giải thích React là gì, tại sao cần JSX, và HTML/JS cơ bản liên quan
2. **GIẢI THÍCH chi tiết**: Cú pháp JSX từng ký tự, quá trình biên dịch, cách trình duyệt hiểu JSX
3. **THÊM ví dụ thực tế**: Code HTML so sánh với JSX, xem quá trình biên dịch từng bước
4. **THÊM bài tập**: Chuyển đổi HTML sang JSX, quan sát code đã biên dịch
5. **CẢNH BÁO lỗi phổ biến**: className vs class, tự đóng thẻ, return nhiều element, viết JS trong JSX

⏱️ **Ước tính**: 25-30 phút đọc + thực hành

👉 **Sẵn sàng bắt đầu chưa?**

---

# 📚 PHẦN 1/3: KIẾN THỨC NỀN TẢNG (Bắt buộc đọc trước!)

## 🔍 Bước 1: Hiểu React là gì (không giả định bạn biết)

### **React là gì?**
React là một **thư viện JavaScript** (library) giúp xây dựng giao diện người dùng (UI - User Interface) cho website.

**Ví dụ dễ hiểu:**
- Bạn vào Facebook → thấy nút Like, comment, share → đó là UI
- Khi bấm Like, số lượng thay đổi mà KHÔNG load lại trang → đó là React làm việc

### **Tại sao cần React?**

**❌ Cách cũ (JavaScript thuần):**
```javascript
// Giả sử muốn hiển thị tên người dùng
let userName = "Minh";
document.getElementById("greeting").innerHTML = "Xin chào " + userName;
```

**Vấn đề:**
- Khi dữ liệu nhiều → code rối
- Thay đổi dữ liệu → phải tự cập nhật HTML thủ công
- Khó quản lý khi ứng dụng lớn

**✅ Cách mới (React):**
```jsx
// React tự động cập nhật UI khi dữ liệu thay đổi
function Greeting() {
  let userName = "Minh";
  return <h1>Xin chào {userName}</h1>;
}
```

**Lợi ích:**
- Code ngắn gọn, dễ đọc
- React TỰ ĐỘNG cập nhật UI khi dữ liệu đổi
- Dễ tái sử dụng (viết 1 lần, dùng nhiều chỗ)

---

## 🔍 Bước 2: JSX là gì? (Khái niệm cốt lõi)

### **Định nghĩa đơn giản:**
**JSX = JavaScript + XML (HTML)**

JSX cho phép **viết code giống HTML ngay trong file JavaScript**.

### **So sánh trực quan:**

**HTML thuần (file .html):**
```html
<div class="card">
  <h2>Sản phẩm</h2>
  <p>Giá: 100k</p>
</div>
```

**JSX (file .jsx):**
```jsx
function ProductCard() {
  return (
    <div className="card">
      <h2>Sản phẩm</h2>
      <p>Giá: 100k</p>
    </div>
  );
}
```

### **🎯 Điểm khác biệt quan trọng:**

| Đặc điểm | HTML | JSX |
|----------|------|-----|
| Viết ở đâu? | File `.html` riêng | Trong file `.js` hoặc `.jsx` |
| Thuộc tính class | `class="..."` | `className="..."` |
| Thẻ tự đóng | `<img>` hoặc `<img />` | BẮT BUỘC `<img />` |
| Nhúng JS | Không được | Dùng `{biến}` |

---

## 🔍 Bước 3: Tại sao cần JSX? (Động lực học)

### **❓ Câu hỏi tự nhiên: "Sao không viết HTML bình thường?"**

**Trả lời:**

**1. Nhúng dữ liệu động dễ dàng:**

**❌ HTML thuần (KHÔNG làm được):**
```html
<h1>Xin chào [tên người dùng ở đây]</h1>
<!-- Làm sao hiển thị biến userName? -->
```

**✅ JSX (Làm được ngay):**
```jsx
function Greeting() {
  let userName = "Minh"; // Biến JavaScript
  return <h1>Xin chào {userName}</h1>; // Nhúng biến vào HTML
}
// Kết quả: Xin chào Minh
```

**2. Logic và UI ở cùng chỗ:**

**❌ Cách cũ:**
```html
<!-- file index.html -->
<div id="product"></div>

<script>
  // file script.js (riêng)
  document.getElementById("product").innerHTML = "<h2>Laptop</h2>";
</script>
```
→ Phải nhảy qua nhảy lại 2 file

**✅ JSX:**
```jsx
// Tất cả ở 1 chỗ!
function Product() {
  let name = "Laptop";
  return <h2>{name}</h2>;
}
```

**3. Tái sử dụng code:**

**❌ HTML thuần:**
```html
<!-- Phải copy paste nhiều lần -->
<div class="card">
  <h2>Sản phẩm 1</h2>
</div>

<div class="card">
  <h2>Sản phẩm 2</h2>
</div>
```

**✅ JSX:**
```jsx
function Card({ title }) {
  return <div className="card"><h2>{title}</h2></div>;
}

// Sử dụng:
<Card title="Sản phẩm 1" />
<Card title="Sản phẩm 2" />
```

---

# 📚 PHẦN 2/3: CÚ PHÁP JSX CHI TIẾT

## 🔍 Bước 4: Cú pháp cơ bản JSX (Phân tích từng ký tự)

### **Ví dụ JSX đơn giản nhất:**

```jsx
function HelloWorld() {
  return <h1>Xin chào thế giới!</h1>;
}
```

**Phân tích từng dòng:**

**Dòng 1:** `function HelloWorld() {`
- `function`: Từ khóa JavaScript tạo hàm
- `HelloWorld`: Tên hàm (PHẢI viết hoa chữ cái đầu trong React)
- `()`: Không có tham số đầu vào
- `{`: Bắt đầu nội dung hàm

**Dòng 2:** `return <h1>Xin chào thế giới!</h1>;`
- `return`: Trả về kết quả của hàm
- `<h1>...</h1>`: Code JSX giống HTML
- `;`: Kết thúc câu lệnh JavaScript

**Dòng 3:** `}`
- Đóng hàm

### **🎯 Quy tắc vàng số 1: JSX phải có 1 thẻ bao ngoài**

**❌ SAI (Lỗi cú pháp):**
```jsx
function WrongWay() {
  return (
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
  );
}
// Lỗi: Không thể return 2 thẻ cùng lúc!
```

**✅ ĐÚNG - Cách 1 (Dùng div bao ngoài):**
```jsx
function CorrectWay1() {
  return (
    <div>
      <h1>Tiêu đề</h1>
      <p>Nội dung</p>
    </div>
  );
}
```

**✅ ĐÚNG - Cách 2 (Dùng Fragment - không tạo thẻ thừa):**
```jsx
function CorrectWay2() {
  return (
    <>
      <h1>Tiêu đề</h1>
      <p>Nội dung</p>
    </>
  );
}
```

**Giải thích `<>...</>`:**
- `<>`: Fragment - thẻ "ảo" của React
- Không tạo thẻ HTML thật trong trình duyệt
- Chỉ dùng để bọc nhiều thẻ JSX

---

## 🔍 Bước 5: Nhúng JavaScript vào JSX (Siêu quan trọng!)

### **Quy tắc: Dùng dấu ngoặc nhọn `{}`**

**Cú pháp:**
```jsx
<thẻHTML> {biếnJS} </thẻHTML>
```

### **Ví dụ 1: Hiển thị biến**

```jsx
function UserProfile() {
  let userName = "Minh Anh";
  let age = 25;
  
  return (
    <div>
      <h1>Tên: {userName}</h1>
      <p>Tuổi: {age}</p>
    </div>
  );
}
```

**Phân tích:**
- `{userName}`: Lấy giá trị biến `userName` ("Minh Anh")
- `{age}`: Lấy giá trị biến `age` (25)
- **Kết quả HTML thật:**
  ```html
  <div>
    <h1>Tên: Minh Anh</h1>
    <p>Tuổi: 25</p>
  </div>
  ```

### **Ví dụ 2: Tính toán trong `{}`**

```jsx
function Calculator() {
  let price = 100000;
  let quantity = 3;
  
  return (
    <div>
      <p>Đơn giá: {price}đ</p>
      <p>Số lượng: {quantity}</p>
      <p>Tổng: {price * quantity}đ</p>
    </div>
  );
}
```

**Phân tích:**
- `{price * quantity}`: Tính toán `100000 * 3 = 300000`
- **Kết quả:** `Tổng: 300000đ`

### **Ví dụ 3: Gọi hàm trong `{}`**

```jsx
function Greeting() {
  function formatName(firstName, lastName) {
    return firstName + " " + lastName;
  }
  
  return <h1>Xin chào {formatName("Nguyễn", "Văn A")}</h1>;
}
```

**Phân tích:**
- `{formatName("Nguyễn", "Văn A")}`: Gọi hàm, trả về "Nguyễn Văn A"
- **Kết quả:** `Xin chào Nguyễn Văn A`

### **⚠️ Lỗi thường gặp:**

**❌ Quên dấu `{}`:**
```jsx
<h1>Tên: userName</h1>
// Kết quả: Tên: userName (hiển thị chữ "userName" thay vì giá trị)
```

**✅ Đúng:**
```jsx
<h1>Tên: {userName}</h1>
// Kết quả: Tên: Minh Anh
```

---

## 🔍 Bước 6: Thuộc tính (Attributes) trong JSX

### **Quy tắc: Một số thuộc tính khác HTML**

### **Bảng so sánh:**

| HTML | JSX | Lý do |
|------|-----|-------|
| `class` | `className` | `class` là từ khóa JS |
| `for` | `htmlFor` | `for` là từ khóa JS (vòng lặp) |
| `onclick` | `onClick` | Viết theo camelCase |
| `tabindex` | `tabIndex` | Viết theo camelCase |

### **Ví dụ chi tiết:**

**❌ HTML thuần:**
```html
<div class="container">
  <label for="email">Email:</label>
  <input type="text" id="email" onclick="handleClick()">
</div>
```

**✅ JSX tương đương:**
```jsx
function Form() {
  return (
    <div className="container">
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" onClick={handleClick} />
    </div>
  );
}
```

**Phân tích từng thay đổi:**

1. **`class` → `className`**
   - **Lý do:** Trong JavaScript, `class` là từ khóa tạo lớp (class)
   - Nếu dùng `class`, trình duyệt sẽ bị nhầm lẫn

2. **`for` → `htmlFor`**
   - **Lý do:** `for` là từ khóa vòng lặp trong JS (`for (let i = 0; i < 10; i++)`)
   - Dùng `htmlFor` để tránh xung đột

3. **`onclick` → `onClick`**
   - **Lý do:** JSX dùng **camelCase** (viết hoa chữ cái đầu từ thứ 2)
   - Các event khác: `onSubmit`, `onMouseOver`, `onChange`...

4. **`onclick="handleClick()"` → `onClick={handleClick}`**
   - Trong JSX, truyền **hàm** chứ không phải **chuỗi**
   - **KHÔNG có dấu ngoặc `()`** (sẽ giải thích sau)

### **Ví dụ thuộc tính động:**

```jsx
function Button() {
  let isDisabled = true;
  let buttonText = "Gửi";
  
  return (
    <button disabled={isDisabled} className="btn-primary">
      {buttonText}
    </button>
  );
}
```

**Phân tích:**
- `disabled={isDisabled}`: Nếu `isDisabled = true`, nút bị vô hiệu hóa
- `{buttonText}`: Hiển thị text "Gửi"

---

## 🔍 Bước 7: Thẻ tự đóng (Self-closing tags)

### **Quy tắc: BẮT BUỘC có dấu `/` trước `>`**

**❌ HTML cho phép (nhưng JSX KHÔNG):**
```html
<img src="photo.jpg">
<input type="text">
<br>
```

**✅ JSX BẮT BUỘC:**
```jsx
<img src="photo.jpg" />
<input type="text" />
<br />
```

### **Ví dụ thực tế:**

```jsx
function ProfileImage() {
  let imageUrl = "https://example.com/avatar.jpg";
  
  return (
    <div>
      <img src={imageUrl} alt="Avatar" />
      <br />
      <input type="text" placeholder="Nhập tên" />
    </div>
  );
}
```

**Phân tích:**
- `<img ... />`: Phải có `/` trước `>`
- `<br />`: Thẻ ngắt dòng cũng phải tự đóng
- `<input ... />`: Tương tự

**⚠️ Lỗi phổ biến:**
```jsx
<img src="photo.jpg">
// Lỗi: Unterminated JSX element
```

---

# 📚 PHẦN 3/3: QUÁ TRÌNH BIÊN DỊCH JSX

## 🔍 Bước 8: JSX không phải JavaScript thật! (Bí mật lớn)

### **Sự thật:**
**Trình duyệt KHÔNG HIỂU JSX!**

### **Quy trình 3 bước:**

```
JSX (code bạn viết) 
  ↓ [Babel biên dịch]
JavaScript thuần 
  ↓ [Trình duyệt chạy]
HTML hiển thị
```

### **Ví dụ minh họa:**

**Bước 1: Code JSX bạn viết**
```jsx
function Greeting() {
  return <h1 className="title">Xin chào!</h1>;
}
```

**Bước 2: Babel biên dịch thành JS thuần**
```javascript
function Greeting() {
  return React.createElement(
    "h1",                    // Tên thẻ
    { className: "title" },  // Thuộc tính
    "Xin chào!"              // Nội dung
  );
}
```

**Bước 3: React tạo HTML thật**
```html
<h1 class="title">Xin chào!</h1>
```

---

## 🔍 Bước 9: Phân tích `React.createElement()` (Hiểu sâu)

### **Cú pháp:**
```javascript
React.createElement(type, props, children)
```

**Tham số:**
- `type`: Tên thẻ HTML (string) hoặc Component (function)
- `props`: Object chứa thuộc tính
- `children`: Nội dung bên trong thẻ

### **Ví dụ phức tạp hơn:**

**JSX:**
```jsx
<div className="card">
  <h2>Sản phẩm</h2>
  <p>Giá: 100k</p>
</div>
```

**Biên dịch thành:**
```javascript
React.createElement(
  "div",
  { className: "card" },
  React.createElement("h2", null, "Sản phẩm"),
  React.createElement("p", null, "Giá: 100k")
)
```

**Phân tích:**
- Thẻ `<div>`: Cha
  - Thuộc tính: `{ className: "card" }`
  - Con thứ 1: `<h2>` → `React.createElement("h2", null, "Sản phẩm")`
  - Con thứ 2: `<p>` → `React.createElement("p", null, "Giá: 100k")`

---

## 🔍 Bước 10: Công cụ biên dịch - Babel (Ai làm việc đó?)

### **Babel là gì?**
**Babel** là công cụ chuyển đổi code JavaScript hiện đại (bao gồm JSX) thành code cũ mà mọi trình duyệt hiểu được.

### **Vị trí Babel trong dự án:**

**Khi dùng Create React App hoặc Vite:**
- Babel đã được **cài sẵn** và **cấu hình tự động**
- Bạn KHÔNG cần làm gì cả!
- Viết JSX → Lưu file → Babel tự động biên dịch

### **Xem code đã biên dịch (Thực hành):**

**Cách 1: Dùng Babel online**
1. Vào https://babeljs.io/repl
2. Paste code JSX vào bên trái
3. Xem kết quả JS thuần bên phải

**Cách 2: Trong dự án React**
```bash
# Mở DevTools (F12) → Tab "Sources"
# Xem file .js trong thư mục /static/js/
# Code đã được biên dịch và minify (rút gọn)
```

---

# 🎯 KIỂM TRA HIỂU BIẾT

**Trả lời các câu hỏi sau (KHÔNG tra Google!):**

### **Câu 1:**
Code JSX sau có lỗi gì?
```jsx
function App() {
  return (
    <h1>Tiêu đề</h1>
    <p>Nội dung</p>
  );
}
```

<details>
<summary>👉 Xem đáp án</summary>

**Lỗi:** Thiếu thẻ bao ngoài (phải có 1 thẻ cha duy nhất)

**Sửa:**
```jsx
function App() {
  return (
    <>
      <h1>Tiêu đề</h1>
      <p>Nội dung</p>
    </>
  );
}
```
</details>

---

### **Câu 2:**
Tại sao phải viết `className` thay vì `class` trong JSX?

<details>
<summary>👉 Xem đáp án</summary>

Vì `class` là từ khóa dành riêng trong JavaScript (dùng để tạo class), nên React dùng `className` để tránh xung đột.
</details>

---

### **Câu 3:**
Code sau sẽ hiển thị gì?
```jsx
function Test() {
  let number = 5;
  return <h1>Kết quả: {number + 10}</h1>;
}
```

<details>
<summary>👉 Xem đáp án</summary>

**Hiển thị:** `Kết quả: 15`

Vì `{number + 10}` thực hiện phép tính `5 + 10 = 15`
</details>

---

### **Câu 4:**
Thẻ `<img>` trong JSX phải viết như thế nào?

<details>
<summary>👉 Xem đáp án</summary>

**Phải tự đóng:** `<img src="..." alt="..." />`

**KHÔNG được:** `<img src="..." alt="...">`
</details>

---

# 🏋️ BÀI TẬP THỰC HÀNH

## **Bài 1: Chuyển HTML sang JSX**

**Đề bài:** Chuyển đổi HTML sau thành JSX

```html
<div class="product-card">
  <img src="laptop.jpg" alt="Laptop">
  <h3>Laptop Gaming</h3>
  <p class="price">15.000.000đ</p>
  <button onclick="addToCart()">Thêm vào giỏ</button>
</div>
```

<details>
<summary>👉 Xem hướng dẫn</summary>

**Các bước:**
1. Đổi `class` → `className`
2. Thêm `/` cho thẻ `<img>`
3. Đổi `onclick` → `onClick`
4. Bọc JSX trong function

**Đáp án:**
```jsx
function ProductCard() {
  function addToCart() {
    console.log("Đã thêm vào giỏ!");
  }
  
  return (
    <div className="product-card">
      <img src="laptop.jpg" alt="Laptop" />
      <h3>Laptop Gaming</h3>
      <p className="price">15.000.000đ</p>
      <button onClick={addToCart}>Thêm vào giỏ</button>
    </div>
  );
}
```
</details>

---

## **Bài 2: Nhúng biến vào JSX**

**Đề bài:** Tạo component hiển thị thông tin sinh viên

**Yêu cầu:**
- Tên: "Nguyễn Văn A"
- Tuổi: 20
- Điểm trung bình: 8.5
- Hiển thị tổng điểm 3 môn: Toán (9), Lý (8), Hóa (8.5)

<details>
<summary>👉 Xem hướng dẫn</summary>

**Đáp án:**
```jsx
function StudentInfo() {
  let name = "Nguyễn Văn A";
  let age = 20;
  let gpa = 8.5;
  
  let mathScore = 9;
  let physicsScore = 8;
  let chemistryScore = 8.5;
  
  return (
    <div className="student-card">
      <h2>Thông tin sinh viên</h2>
      <p>Tên: {name}</p>
      <p>Tuổi: {age}</p>
      <p>Điểm TB: {gpa}</p>
      <p>Tổng điểm 3 môn: {mathScore + physicsScore + chemistryScore}</p>
    </div>
  );
}
```
</details>

---

## **Bài 3: Sửa lỗi JSX**

**Đề bài:** Code sau có 5 lỗi, hãy tìm và sửa

```jsx
function BrokenComponent() {
  let title = "React JSX";
  return (
    <h1 class="header">{title}
    <p>Đây là đoạn văn</p>
    <img src="logo.png">
    <input type="text">
  );
}
```

<details>
<summary>👉 Xem đáp án</summary>

**5 lỗi:**
1. `class` → `className`
2. Thiếu đóng thẻ `</h1>`
3. Thiếu thẻ bao ngoài (chỉ được return 1 thẻ cha)
4. `<img>` thiếu `/`
5. `<input>` thiếu `/`

**Code đã sửa:**
```jsx
function FixedComponent() {
  let title = "React JSX";
  return (
    <div>
      <h1 className="header">{title}</h1>
      <p>Đây là đoạn văn</p>
      <img src="logo.png" alt="Logo" />
      <input type="text" />
    </div>
  );
}
```
</details>

---

# ⚠️ LỖI PHỔ BIẾN & CÁCH KHẮC PHỤC

## **Lỗi 1: Adjacent JSX elements must be wrapped**

**Code lỗi:**
```jsx
return (
  <h1>Title</h1>
  <p>Content</p>
);
```

**Nguyên nhân:** Return nhiều thẻ cùng cấp

**Khắc phục:**
```jsx
return (
  <>
    <h1>Title</h1>
    <p>Content</p>
  </>
);
```

---

## **Lỗi 2: className is not defined**

**Code lỗi:**
```jsx
<div class="container">...</div>
```

**Nguyên nhân:** Dùng `class` thay vì `className`

**Khắc phục:**
```jsx
<div className="container">...</div>
```

---

## **Lỗi 3: Unterminated JSX element**

**Code lỗi:**
```jsx
<img src="photo.jpg">
```

**Nguyên nhân:** Thẻ tự đóng thiếu `/`

**Khắc phục:**
```jsx
<img src="photo.jpg" />
```

---

# ✅ CHECKLIST TỰ ĐÁNH GIÁ

Đánh dấu ✅ khi bạn đã hiểu:

- [ ] JSX là gì và tại sao cần nó
- [ ] JSX phải có 1 thẻ bao ngoài
- [ ] Dùng `{}` để nhúng JavaScript
- [ ] Đổi `class` → `className`, `for` → `htmlFor`
- [ ] Thẻ tự đóng phải có `/`
- [ ] Babel biên dịch JSX thành `React.createElement()`
- [ ] Hiểu được flow: JSX → JS → HTML
- [ ] Làm được 3 bài tập trên

---

# 🎯 BƯỚC TIẾP THEO

**Khi bạn đã ✅ hết checklist:**

➡️ Hỏi tôi: **"Tiếp tục: JSX expressions và JavaScript embedding"**

**Nội dung bài sau:**
- If/else trong JSX
- Vòng lặp map()
- Render danh sách
- Conditional rendering nâng cao

---

**💬 BẠN CÓ HIỂU HẾT CHƯA?**

Nếu có phần nào chưa rõ, hãy hỏi tôi:
- "Giải thích lại phần [tên phần]"
- "Cho thêm ví dụ về [chủ đề]"
- "Phần [X] khó quá, dạy chậm hơn"