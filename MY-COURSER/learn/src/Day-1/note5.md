# ⚡ CONDITIONAL RENDERING CỞ BẢN TRONG JSX - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Conditional Rendering = Hiển thị có điều kiện**

**4 cách phổ biến:**

```jsx
// 1. If/else (NGOÀI JSX)
if (condition) {
  return <ComponentA />;
} else {
  return <ComponentB />;
}

// 2. Toán tử 3 ngôi (TRONG JSX)
{condition ? <ComponentA /> : <ComponentB />}

// 3. Toán tử && (Hiển thị hoặc không)
{condition && <Component />}

// 4. Toán tử || (Giá trị mặc định)
{value || 'Default'}
```

---

## 🔥 PHẦN 1: IF/ELSE (NGOÀI JSX)

### **Cú pháp:**
```jsx
function Component() {
  if (điềuKiện) {
    return <JSX1 />;
  } else {
    return <JSX2 />;
  }
}
```

---

### **Ví dụ 1: Login/Logout đơn giản**

```jsx
function Greeting() {
  let isLoggedIn = true;
  
  if (isLoggedIn) {
    return <h1>Chào mừng bạn trở lại!</h1>;
  } else {
    return <h1>Vui lòng đăng nhập</h1>;
  }
}
```

**Phân tích:**
- Nếu `isLoggedIn = true` → Hiển thị "Chào mừng bạn trở lại!"
- Nếu `isLoggedIn = false` → Hiển thị "Vui lòng đăng nhập"

---

### **Ví dụ 2: Kiểm tra quyền admin**

```jsx
function Dashboard() {
  let userRole = "admin"; // "admin", "user", "guest"
  
  if (userRole === "admin") {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <button>Xóa người dùng</button>
        <button>Quản lý hệ thống</button>
      </div>
    );
  } else if (userRole === "user") {
    return (
      <div>
        <h1>User Dashboard</h1>
        <button>Xem hồ sơ</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Guest View</h1>
        <p>Vui lòng đăng nhập để xem thêm</p>
      </div>
    );
  }
}
```

**🎯 Khi nào dùng if/else:**
- Component trả về JSX HOÀN TOÀN khác nhau
- Logic phức tạp (nhiều điều kiện)
- Dễ đọc với người mới

---

### **Ví dụ 3: Loading state**

```jsx
function UserProfile() {
  let isLoading = true;
  let userData = { name: "Minh", age: 25 };
  
  if (isLoading) {
    return <p>Đang tải dữ liệu...</p>;
  }
  
  return (
    <div>
      <h2>{userData.name}</h2>
      <p>Tuổi: {userData.age}</p>
    </div>
  );
}
```

**Giải thích:**
- Kiểm tra loading TRƯỚC
- Return sớm (early return) nếu đang loading
- Code sau chỉ chạy khi KHÔNG loading

---

## 🔥 PHẦN 2: TOÁN TỬ 3 NGÔI `? :` (TRONG JSX)

### **Cú pháp:**
```jsx
{điềuKiện ? giáTrịNếuĐúng : giáTrịNếuSai}
```

---

### **Ví dụ 1: Đơn giản (Text)**

```jsx
function Status() {
  let isOnline = true;
  
  return (
    <div>
      Trạng thái: {isOnline ? "Online" : "Offline"}
    </div>
  );
}
```

**Kết quả:**
- `isOnline = true` → "Trạng thái: Online"
- `isOnline = false` → "Trạng thái: Offline"

---

### **Ví dụ 2: Hiển thị component**

```jsx
function LoginButton() {
  let isLoggedIn = false;
  
  return (
    <div>
      {isLoggedIn ? (
        <button>Đăng xuất</button>
      ) : (
        <button>Đăng nhập</button>
      )}
    </div>
  );
}
```

**📌 Lưu ý:**
- Component phải bọc trong `( )` nếu nhiều dòng
- Có thể lồng nhiều toán tử 3 ngôi (nhưng khó đọc)

---

### **Ví dụ 3: Style động**

```jsx
function Button() {
  let isActive = true;
  
  return (
    <button
      style={{
        backgroundColor: isActive ? '#007bff' : '#ccc',
        color: isActive ? 'white' : '#666',
        cursor: isActive ? 'pointer' : 'not-allowed'
      }}
    >
      {isActive ? "Bấm tôi" : "Đã vô hiệu hóa"}
    </button>
  );
}
```

---

### **Ví dụ 4: Class động**

```jsx
function Alert() {
  let type = "success"; // "success", "error", "warning"
  
  return (
    <div className={type === "success" ? "alert-success" : "alert-error"}>
      {type === "success" ? "✅ Thành công!" : "❌ Lỗi!"}
    </div>
  );
}
```

---

### **Ví dụ 5: Nhiều điều kiện (lồng nhau)**

```jsx
function OrderStatus() {
  let status = "shipping"; // "pending", "shipping", "delivered"
  
  return (
    <div>
      {status === "pending" ? (
        <p>⏳ Đang xử lý</p>
      ) : status === "shipping" ? (
        <p>🚚 Đang giao hàng</p>
      ) : status === "delivered" ? (
        <p>✅ Đã giao</p>
      ) : (
        <p>❓ Không xác định</p>
      )}
    </div>
  );
}
```

**⚠️ Cảnh báo:**
- Lồng quá nhiều → khó đọc
- Nên dùng if/else hoặc switch ngoài JSX

---

### **🎯 Khi nào dùng toán tử 3 ngôi:**
- Điều kiện đơn giản (có 2 lựa chọn)
- Render inline (trong JSX)
- Text, class, style nhỏ

---

## 🔥 PHẦN 3: TOÁN TỬ && (HIỂN THỊ HOẶC KHÔNG)

### **Cú pháp:**
```jsx
{điềuKiện && <Component />}
```

**Logic:**
- `true && <Component />` → Hiển thị `<Component />`
- `false && <Component />` → KHÔNG hiển thị gì

---

### **Ví dụ 1: Hiển thị thông báo**

```jsx
function Notification() {
  let hasNewMessage = true;
  
  return (
    <div>
      <h1>Dashboard</h1>
      {hasNewMessage && <p>🔔 Bạn có tin nhắn mới!</p>}
    </div>
  );
}
```

**Kết quả:**
- `hasNewMessage = true` → Hiển thị thông báo
- `hasNewMessage = false` → KHÔNG hiển thị

---

### **Ví dụ 2: Nút chỉ admin thấy**

```jsx
function AdminPanel() {
  let isAdmin = true;
  
  return (
    <div>
      <h1>Trang quản trị</h1>
      {isAdmin && (
        <div>
          <button>Xóa người dùng</button>
          <button>Sửa cài đặt</button>
        </div>
      )}
    </div>
  );
}
```

---

### **Ví dụ 3: Hiển thị dựa trên số lượng**

```jsx
function Cart() {
  let itemCount = 5;
  
  return (
    <div>
      <h1>Giỏ hàng</h1>
      {itemCount > 0 && <p>Bạn có {itemCount} sản phẩm</p>}
      {itemCount === 0 && <p>Giỏ hàng trống</p>}
    </div>
  );
}
```

---

### **Ví dụ 4: Error message**

```jsx
function LoginForm() {
  let error = "Email không hợp lệ";
  
  return (
    <form>
      <input type="email" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button>Đăng nhập</button>
    </form>
  );
}
```

---

### **⚠️ BẪY PHỔ BIẾN với &&**

**❌ Lỗi: Hiển thị số 0**
```jsx
function ProductList() {
  let count = 0;
  
  return (
    <div>
      {count && <p>Có {count} sản phẩm</p>}
      {/* Nếu count = 0 → Hiển thị số 0 trên màn hình! */}
    </div>
  );
}
```

**Giải thích:**
- `0 && <p>...</p>` → React hiển thị `0` (vì 0 là số)
- `false && <p>...</p>` → Không hiển thị gì

**✅ Cách sửa:**
```jsx
function ProductList() {
  let count = 0;
  
  return (
    <div>
      {count > 0 && <p>Có {count} sản phẩm</p>}
      {/* count > 0 → true/false, không phải số */}
    </div>
  );
}
```

---

### **🎯 Khi nào dùng &&:**
- Chỉ cần hiển thị hoặc không (KHÔNG có else)
- Điều kiện đơn giản
- Muốn code ngắn gọn

---

## 🔥 PHẦN 4: TOÁN TỬ || (GIÁ TRỊ MẶC ĐỊNH)

### **Cú pháp:**
```jsx
{giáTrị || giáTrịMặcĐịnh}
```

**Logic:**
- Nếu `giáTrị` có → Dùng `giáTrị`
- Nếu `giáTrị` là `null`, `undefined`, `""`, `0`, `false` → Dùng `giáTrịMặcĐịnh`

---

### **Ví dụ 1: Tên mặc định**

```jsx
function UserProfile() {
  let userName = ""; // Hoặc null, undefined
  
  return (
    <h1>{userName || "Khách"}</h1>
  );
}
// Kết quả: Khách
```

---

### **Ví dụ 2: Ảnh mặc định**

```jsx
function Avatar() {
  let imageUrl = null;
  
  return (
    <img 
      src={imageUrl || "https://via.placeholder.com/150"} 
      alt="Avatar" 
    />
  );
}
```

---

### **Ví dụ 3: Text mặc định**

```jsx
function Product() {
  let description = "";
  
  return (
    <div>
      <h2>Laptop</h2>
      <p>{description || "Không có mô tả"}</p>
    </div>
  );
}
```

---

### **⚠️ Lưu ý với số 0:**

```jsx
function Counter() {
  let count = 0;
  
  return <p>{count || "Không có"}</p>;
  // Hiển thị: "Không có" (vì 0 bị coi là falsy)
}
```

**✅ Cách sửa (nếu muốn hiển thị 0):**
```jsx
function Counter() {
  let count = 0;
  
  return <p>{count ?? "Không có"}</p>;
  // Dùng ?? (Nullish coalescing) → Chỉ thay thế null/undefined
}
```

---

## 🔥 PHẦN 5: SO SÁNH 4 CÁCH

### **Bảng tổng hợp:**

| Phương pháp | Cú pháp | Khi nào dùng | Ví dụ |
|-------------|---------|--------------|-------|
| **if/else** | `if (x) return A; else return B;` | Logic phức tạp, nhiều điều kiện | Login page |
| **? :** | `{x ? A : B}` | 2 lựa chọn, render inline | Online/Offline |
| **&&** | `{x && A}` | Hiển thị hoặc không | Admin button |
| **\|\|** | `{x \|\| default}` | Giá trị mặc định | Avatar placeholder |

---

### **Ví dụ so sánh cùng 1 tình huống:**

**Tình huống:** Hiển thị điểm số học sinh

```jsx
function StudentScore() {
  let score = 8.5;
  
  // CÁCH 1: if/else
  if (score >= 8) {
    return <p style={{ color: 'green' }}>Giỏi: {score}</p>;
  } else if (score >= 6.5) {
    return <p style={{ color: 'blue' }}>Khá: {score}</p>;
  } else {
    return <p style={{ color: 'red' }}>Yếu: {score}</p>;
  }
  
  // CÁCH 2: Toán tử 3 ngôi (lồng)
  return (
    <p style={{ 
      color: score >= 8 ? 'green' : score >= 6.5 ? 'blue' : 'red' 
    }}>
      {score >= 8 ? 'Giỏi' : score >= 6.5 ? 'Khá' : 'Yếu'}: {score}
    </p>
  );
  
  // CÁCH 3: Tách logic ra ngoài
  let getGrade = () => {
    if (score >= 8) return { text: 'Giỏi', color: 'green' };
    if (score >= 6.5) return { text: 'Khá', color: 'blue' };
    return { text: 'Yếu', color: 'red' };
  };
  
  let grade = getGrade();
  return <p style={{ color: grade.color }}>{grade.text}: {score}</p>;
}
```

**🎯 Khuyến nghị:**
- CÁCH 1: Dễ đọc nhất
- CÁCH 2: Ngắn nhưng khó đọc
- CÁCH 3: Chuyên nghiệp, dễ maintain

---

## 🔥 PHẦN 6: KỸ THUẬT NÂNG CAO

### **1. Early Return (Return sớm)**

**❌ Cách thường:**
```jsx
function Profile({ user }) {
  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  } else {
    return <p>Không tìm thấy người dùng</p>;
  }
}
```

**✅ Cách tốt hơn:**
```jsx
function Profile({ user }) {
  if (!user) {
    return <p>Không tìm thấy người dùng</p>;
  }
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**Lợi ích:**
- Xử lý trường hợp đặc biệt trước
- Code chính không bị lồng trong if/else

---

### **2. Switch Case (NGOÀI JSX)**

```jsx
function StatusBadge({ status }) {
  let badge;
  
  switch (status) {
    case 'success':
      badge = <span className="badge-success">✅ Thành công</span>;
      break;
    case 'error':
      badge = <span className="badge-error">❌ Lỗi</span>;
      break;
    case 'warning':
      badge = <span className="badge-warning">⚠️ Cảnh báo</span>;
      break;
    default:
      badge = <span className="badge-default">ℹ️ Thông tin</span>;
  }
  
  return <div>{badge}</div>;
}
```

---

### **3. Object Mapping (Chuyên nghiệp)**

```jsx
function StatusIcon({ status }) {
  const statusConfig = {
    pending: { icon: '⏳', text: 'Đang xử lý', color: 'orange' },
    shipping: { icon: '🚚', text: 'Đang giao', color: 'blue' },
    delivered: { icon: '✅', text: 'Đã giao', color: 'green' },
    cancelled: { icon: '❌', text: 'Đã hủy', color: 'red' }
  };
  
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <span style={{ color: config.color }}>
      {config.icon} {config.text}
    </span>
  );
}
```

**Lợi ích:**
- Không có if/else dài dòng
- Dễ thêm/sửa status mới
- Code sạch, dễ đọc

---

### **4. Render Function**

```jsx
function UserList({ users }) {
  const renderEmptyState = () => (
    <div className="empty">
      <p>Không có người dùng</p>
      <button>Thêm người dùng</button>
    </div>
  );
  
  const renderUserList = () => (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
  
  return (
    <div>
      <h1>Danh sách người dùng</h1>
      {users.length === 0 ? renderEmptyState() : renderUserList()}
    </div>
  );
}
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Login Form**

```jsx
// Yêu cầu:
// - Nếu đang loading: Hiển thị "Đang đăng nhập..."
// - Nếu có lỗi: Hiển thị lỗi màu đỏ
// - Nút disabled khi loading

function LoginForm() {
  let isLoading = false;
  let error = "";
  
  return (
    <div>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mật khẩu" />
      {/* TODO: Hiển thị error nếu có */}
      <button /* TODO: disabled khi loading */>
        {/* TODO: Text động */}
      </button>
    </div>
  );
}
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function LoginForm() {
  let isLoading = false;
  let error = "Email không hợp lệ";
  
  return (
    <div>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Mật khẩu" />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button disabled={isLoading}>
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </div>
  );
}
```
</details>

---

### **Bài 2: Product Card**

```jsx
// Yêu cầu:
// - Nếu inStock = true: Hiển thị giá + nút "Mua ngay"
// - Nếu inStock = false: Hiển thị "Hết hàng" + nút disabled
// - Nếu có discount: Hiển thị giá gốc gạch ngang + giá sau giảm

function ProductCard() {
  let product = {
    name: "Laptop Gaming",
    price: 20000000,
    discount: 0.1,
    inStock: true
  };
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      {/* TODO: Conditional rendering */}
    </div>
  );
}
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function ProductCard() {
  let product = {
    name: "Laptop Gaming",
    price: 20000000,
    discount: 0.1,
    inStock: true
  };
  
  let finalPrice = product.price * (1 - product.discount);
  
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      
      {product.inStock ? (
        <>
          {product.discount > 0 && (
            <p style={{ textDecoration: 'line-through', color: '#999' }}>
              {product.price.toLocaleString()}đ
            </p>
          )}
          <p style={{ fontSize: 24, color: 'red', fontWeight: 'bold' }}>
            {finalPrice.toLocaleString()}đ
          </p>
          <button>Mua ngay</button>
        </>
      ) : (
        <>
          <p style={{ color: 'red' }}>Hết hàng</p>
          <button disabled>Không thể mua</button>
        </>
      )}
    </div>
  );
}
```
</details>

---

### **Bài 3: User Role**

```jsx
// Yêu cầu:
// - admin: Hiển thị "Admin Panel" + 3 nút (Xóa, Sửa, Thêm)
// - user: Hiển thị "User Dashboard" + 1 nút (Xem hồ sơ)
// - guest: Hiển thị "Vui lòng đăng nhập"

function Dashboard() {
  let role = "admin"; // "admin", "user", "guest"
  
  // TODO: Dùng if/else hoặc switch
}
```

<details>
<summary>👉 Đáp án - Cách 1 (if/else)</summary>

```jsx
function Dashboard() {
  let role = "admin";
  
  if (role === "admin") {
    return (
      <div>
        <h1>Admin Panel</h1>
        <button>Xóa người dùng</button>
        <button>Sửa cài đặt</button>
        <button>Thêm nội dung</button>
      </div>
    );
  } else if (role === "user") {
    return (
      <div>
        <h1>User Dashboard</h1>
        <button>Xem hồ sơ</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Vui lòng đăng nhập</h1>
        <button>Đăng nhập</button>
      </div>
    );
  }
}
```
</details>

<details>
<summary>👉 Đáp án - Cách 2 (Object mapping)</summary>

```jsx
function Dashboard() {
  let role = "admin";
  
  const roleConfig = {
    admin: {
      title: "Admin Panel",
      buttons: ["Xóa người dùng", "Sửa cài đặt", "Thêm nội dung"]
    },
    user: {
      title: "User Dashboard",
      buttons: ["Xem hồ sơ"]
    },
    guest: {
      title: "Vui lòng đăng nhập",
      buttons: ["Đăng nhập"]
    }
  };
  
  const config = roleConfig[role] || roleConfig.guest;
  
  return (
    <div>
      <h1>{config.title}</h1>
      {config.buttons.map((btn, index) => (
        <button key={index}>{btn}</button>
      ))}
    </div>
  );
}
```
</details>

---

### **Bài 4: Score Badge**

```jsx
// Yêu cầu:
// - score >= 9: "Xuất sắc" (màu vàng)
// - score >= 8: "Giỏi" (màu xanh lá)
// - score >= 6.5: "Khá" (màu xanh dương)
// - score >= 5: "Trung bình" (màu cam)
// - score < 5: "Yếu" (màu đỏ)

function ScoreBadge() {
  let score = 8.5;
  
  // TODO: Hiển thị badge với màu phù hợp
}
```

<details>
<summary>👉 Đáp án</summary>

```jsx
function ScoreBadge() {
  let score = 8.5;
  
  let getGrade = (score) => {
    if (score >= 9) return { text: 'Xuất sắc', color: 'gold' };
    if (score >= 8) return { text: 'Giỏi', color: 'green' };
    if (score >= 6.5) return { text: 'Khá', color: 'blue' };
    if (score >= 5) return { text: 'Trung bình', color: 'orange' };
    return { text: 'Yếu', color: 'red' };
  };
  
  let grade = getGrade(score);
  
  return (
    <div>
      <p>Điểm: {score}</p>
      <span style={{ 
        backgroundColor: grade.color, 
        color: 'white',
        padding: '5px 10px',
        borderRadius: 5
      }}>
        {grade.text}
      </span>
    </div>
  );
}
```
</details>

---

## 📊 BẢNG LỖI THƯỜNG GẶP

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|----------|
| `0` hiển thị trên màn hình | Dùng `count && <p>...</p>` | Đổi thành `count > 0 && <p>...</p>` |
| Lồng quá nhiều `? :` | Điều kiện phức tạp | Dùng if/else hoặc switch |
| Quên `( )` khi JSX nhiều dòng | `{condition ? <div>...</div>}` | `{condition ? (<div>...</div>) : ...}` |
| Statement trong `{}` | `{if (x) {...}}` | Dùng toán tử 3 ngôi hoặc && |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu 4 cách conditional rendering
- [ ] Biết khi nào dùng if/else, khi nào dùng `? :`
- [ ] Hiểu khác biệt `&&` vs `? :`
- [ ] Biết cách tránh lỗi hiển thị số 0
- [ ] Biết early return pattern
- [ ] Biết object mapping technique
- [ ] Làm được 4 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Practice: Chuyển đổi 5-10 HTML templates sang JSX"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập conditional rendering nâng cao"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**