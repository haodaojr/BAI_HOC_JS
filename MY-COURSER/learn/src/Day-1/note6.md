# ⚡ PRACTICE: CHUYỂN ĐỔI HTML SANG JSX

## 🎯 MỤC TIÊU BÀI TẬP

**Sau bài này bạn sẽ:**
- Thành thạo chuyển HTML → JSX
- Nhận ra lỗi thường gặp
- Biết xử lý thuộc tính, style, events
- Tự tin làm việc với JSX

---

## 📝 BÀI TẬP 1: PRODUCT CARD (CƠ BẢN)

### **HTML gốc:**
```html
<div class="product-card">
  <img src="laptop.jpg" alt="Laptop Gaming">
  <h3 class="product-title">Laptop Gaming ROG</h3>
  <p class="price">25.000.000đ</p>
  <p class="description">
    CPU i7, RAM 16GB, RTX 3060
  </p>
  <button class="btn-primary" onclick="addToCart()">
    Thêm vào giỏ
  </button>
</div>
```

### **❓ Các lỗi cần sửa:**
<details>
<summary>👉 Xem gợi ý</summary>

1. `class` → ?
2. `<img>` thiếu gì?
3. `onclick` → ?
4. Hàm `addToCart()` có dấu `()` không?
</details>

---

### **✅ ĐÁP ÁN:**

```jsx
function ProductCard() {
  function addToCart() {
    console.log("Đã thêm vào giỏ hàng");
  }
  
  return (
    <div className="product-card">
      <img src="laptop.jpg" alt="Laptop Gaming" />
      <h3 className="product-title">Laptop Gaming ROG</h3>
      <p className="price">25.000.000đ</p>
      <p className="description">
        CPU i7, RAM 16GB, RTX 3060
      </p>
      <button className="btn-primary" onClick={addToCart}>
        Thêm vào giỏ
      </button>
    </div>
  );
}
```

### **📌 Giải thích từng thay đổi:**

| HTML | JSX | Lý do |
|------|-----|-------|
| `class="..."` | `className="..."` | `class` là từ khóa JS |
| `<img src="...">` | `<img src="..." />` | JSX bắt buộc tự đóng |
| `onclick="addToCart()"` | `onClick={addToCart}` | camelCase + hàm không có `()` |
| Không có gì | Bọc trong `function` | JSX phải trong component |

---

## 📝 BÀI TẬP 2: LOGIN FORM (FORM & INPUT)

### **HTML gốc:**
```html
<div class="login-container" style="max-width: 400px; margin: auto;">
  <h2>Đăng nhập</h2>
  <form onsubmit="handleSubmit()">
    <div class="form-group">
      <label for="email">Email:</label>
      <input 
        type="email" 
        id="email" 
        class="form-control"
        placeholder="email@example.com"
        required
      >
    </div>
    
    <div class="form-group">
      <label for="password">Mật khẩu:</label>
      <input 
        type="password" 
        id="password" 
        class="form-control"
        minlength="6"
        required
      >
    </div>
    
    <div class="form-check">
      <input type="checkbox" id="remember" class="form-check-input">
      <label for="remember" class="form-check-label">
        Ghi nhớ đăng nhập
      </label>
    </div>
    
    <button type="submit" class="btn btn-primary">
      Đăng nhập
    </button>
  </form>
</div>
```

### **❓ Các lỗi cần sửa:**
<details>
<summary>👉 Xem gợi ý</summary>

1. `class` → ?
2. `style` dạng string → ?
3. `for` → ?
4. `onsubmit` → ?
5. `minlength` → ?
6. Các thẻ `<input>` thiếu gì?
</details>

---

### **✅ ĐÁP ÁN:**

```jsx
function LoginForm() {
  function handleSubmit(event) {
    event.preventDefault(); // Ngăn reload trang
    console.log("Form submitted");
  }
  
  return (
    <div className="login-container" style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            className="form-control"
            placeholder="email@example.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input 
            type="password" 
            id="password" 
            className="form-control"
            minLength={6}
            required
          />
        </div>
        
        <div className="form-check">
          <input type="checkbox" id="remember" className="form-check-input" />
          <label htmlFor="remember" className="form-check-label">
            Ghi nhớ đăng nhập
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
```

### **📌 Thay đổi quan trọng:**

| HTML | JSX | Giải thích |
|------|-----|-----------|
| `style="max-width: 400px"` | `style={{ maxWidth: 400 }}` | Object, camelCase, số không cần đơn vị |
| `for="email"` | `htmlFor="email"` | `for` là từ khóa vòng lặp |
| `onsubmit="..."` | `onSubmit={handleSubmit}` | camelCase + không có `()` |
| `minlength="6"` | `minLength={6}` | camelCase + số dùng `{}` |
| `<input>` | `<input />` | Bắt buộc tự đóng |

---

## 📝 BÀI TẬP 3: NAVIGATION BAR (LIST & LINKS)

### **HTML gốc:**
```html
<nav class="navbar" style="background-color: #333; padding: 15px;">
  <div class="container">
    <a href="/" class="navbar-brand" style="color: white; font-size: 24px;">
      MyWebsite
    </a>
    
    <ul class="nav-menu" style="list-style: none; display: flex; gap: 20px;">
      <li><a href="/" class="nav-link">Trang chủ</a></li>
      <li><a href="/about" class="nav-link">Giới thiệu</a></li>
      <li><a href="/products" class="nav-link">Sản phẩm</a></li>
      <li><a href="/contact" class="nav-link">Liên hệ</a></li>
    </ul>
    
    <div class="nav-actions">
      <input 
        type="search" 
        placeholder="Tìm kiếm..." 
        style="padding: 5px 10px;"
      >
      <button class="btn-login" onclick="openLogin()">Đăng nhập</button>
    </div>
  </div>
</nav>
```

### **✅ ĐÁP ÁN:**

```jsx
function Navbar() {
  function openLogin() {
    console.log("Mở form đăng nhập");
  }
  
  return (
    <nav className="navbar" style={{ backgroundColor: '#333', padding: 15 }}>
      <div className="container">
        <a href="/" className="navbar-brand" style={{ color: 'white', fontSize: 24 }}>
          MyWebsite
        </a>
        
        <ul className="nav-menu" style={{ listStyle: 'none', display: 'flex', gap: 20 }}>
          <li><a href="/" className="nav-link">Trang chủ</a></li>
          <li><a href="/about" className="nav-link">Giới thiệu</a></li>
          <li><a href="/products" className="nav-link">Sản phẩm</a></li>
          <li><a href="/contact" className="nav-link">Liên hệ</a></li>
        </ul>
        
        <div className="nav-actions">
          <input 
            type="search" 
            placeholder="Tìm kiếm..." 
            style={{ padding: '5px 10px' }}
          />
          <button className="btn-login" onClick={openLogin}>Đăng nhập</button>
        </div>
      </div>
    </nav>
  );
}
```

### **📌 Điểm chú ý:**

- `background-color` → `backgroundColor`
- `font-size` → `fontSize`
- `list-style` → `listStyle`
- Giá trị số: `padding: 15` (tự động thêm `px`)
- Giá trị string: `padding: '5px 10px'` (phải có dấu ngoặc)

---

## 📝 BÀI TẬP 4: USER PROFILE CARD (COMPLEX LAYOUT)

### **HTML gốc:**
```html
<div class="profile-card" style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
  <div class="profile-header" style="display: flex; align-items: center; gap: 15px;">
    <img 
      src="avatar.jpg" 
      alt="User Avatar"
      class="avatar"
      style="width: 80px; height: 80px; border-radius: 50%;"
    >
    
    <div class="user-info">
      <h3 style="margin: 0; color: #333;">Nguyễn Văn A</h3>
      <p style="margin: 5px 0; color: #666;">Web Developer</p>
      <span class="badge" style="background-color: #28a745; color: white; padding: 3px 8px; border-radius: 3px;">
        Online
      </span>
    </div>
  </div>
  
  <hr style="border: none; border-top: 1px solid #eee; margin: 15px 0;">
  
  <div class="profile-stats" style="display: flex; justify-content: space-around;">
    <div class="stat-item" style="text-align: center;">
      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">152</p>
      <p style="margin: 0; color: #999;">Bài viết</p>
    </div>
    
    <div class="stat-item" style="text-align: center;">
      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">1.2K</p>
      <p style="margin: 0; color: #999;">Người theo dõi</p>
    </div>
    
    <div class="stat-item" style="text-align: center;">
      <p style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">340</p>
      <p style="margin: 0; color: #999;">Đang theo dõi</p>
    </div>
  </div>
  
  <button 
    class="btn-follow" 
    style="width: 100%; margin-top: 15px; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;"
    onclick="handleFollow()"
  >
    Theo dõi
  </button>
</div>
```

### **✅ ĐÁP ÁN:**

```jsx
function UserProfileCard() {
  function handleFollow() {
    console.log("Đã theo dõi người dùng");
  }
  
  return (
    <div className="profile-card" style={{ 
      border: '1px solid #ddd', 
      borderRadius: 8, 
      padding: 20 
    }}>
      <div className="profile-header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 15 
      }}>
        <img 
          src="avatar.jpg" 
          alt="User Avatar"
          className="avatar"
          style={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%' 
          }}
        />
        
        <div className="user-info">
          <h3 style={{ margin: 0, color: '#333' }}>Nguyễn Văn A</h3>
          <p style={{ margin: '5px 0', color: '#666' }}>Web Developer</p>
          <span className="badge" style={{ 
            backgroundColor: '#28a745', 
            color: 'white', 
            padding: '3px 8px', 
            borderRadius: 3 
          }}>
            Online
          </span>
        </div>
      </div>
      
      <hr style={{ 
        border: 'none', 
        borderTop: '1px solid #eee', 
        margin: '15px 0' 
      }} />
      
      <div className="profile-stats" style={{ 
        display: 'flex', 
        justifyContent: 'space-around' 
      }}>
        <div className="stat-item" style={{ textAlign: 'center' }}>
          <p style={{ 
            margin: 0, 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#333' 
          }}>152</p>
          <p style={{ margin: 0, color: '#999' }}>Bài viết</p>
        </div>
        
        <div className="stat-item" style={{ textAlign: 'center' }}>
          <p style={{ 
            margin: 0, 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#333' 
          }}>1.2K</p>
          <p style={{ margin: 0, color: '#999' }}>Người theo dõi</p>
        </div>
        
        <div className="stat-item" style={{ textAlign: 'center' }}>
          <p style={{ 
            margin: 0, 
            fontSize: 24, 
            fontWeight: 'bold', 
            color: '#333' 
          }}>340</p>
          <p style={{ margin: 0, color: '#999' }}>Đang theo dõi</p>
        </div>
      </div>
      
      <button 
        className="btn-follow" 
        style={{ 
          width: '100%', 
          marginTop: 15, 
          padding: 10, 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: 5, 
          cursor: 'pointer' 
        }}
        onClick={handleFollow}
      >
        Theo dõi
      </button>
    </div>
  );
}
```

### **💡 Cách tối ưu (Style riêng):**

```jsx
function UserProfileCard() {
  function handleFollow() {
    console.log("Đã theo dõi người dùng");
  }
  
  // Tách style ra ngoài cho dễ đọc
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 20
  };
  
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 15
  };
  
  const avatarStyle = {
    width: 80,
    height: 80,
    borderRadius: '50%'
  };
  
  const buttonStyle = {
    width: '100%',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer'
  };
  
  return (
    <div className="profile-card" style={cardStyle}>
      <div className="profile-header" style={headerStyle}>
        <img 
          src="avatar.jpg" 
          alt="User Avatar"
          className="avatar"
          style={avatarStyle}
        />
        
        <div className="user-info">
          <h3 style={{ margin: 0, color: '#333' }}>Nguyễn Văn A</h3>
          <p style={{ margin: '5px 0', color: '#666' }}>Web Developer</p>
          <span className="badge" style={{ 
            backgroundColor: '#28a745', 
            color: 'white', 
            padding: '3px 8px', 
            borderRadius: 3 
          }}>
            Online
          </span>
        </div>
      </div>
      
      <hr style={{ 
        border: 'none', 
        borderTop: '1px solid #eee', 
        margin: '15px 0' 
      }} />
      
      <div className="profile-stats" style={{ 
        display: 'flex', 
        justifyContent: 'space-around' 
      }}>
        {/* Stats items... */}
      </div>
      
      <button className="btn-follow" style={buttonStyle} onClick={handleFollow}>
        Theo dõi
      </button>
    </div>
  );
}
```

---

## 📝 BÀI TẬP 5: COMMENT SECTION (LIST RENDERING)

### **HTML gốc:**
```html
<div class="comments-section">
  <h3>Bình luận (3)</h3>
  
  <div class="comment-form" style="margin-bottom: 20px;">
    <textarea 
      class="form-control" 
      rows="3"
      placeholder="Viết bình luận..."
      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;"
    ></textarea>
    <button 
      class="btn-submit"
      style="margin-top: 10px; padding: 8px 15px; background-color: #007bff; color: white; border: none; border-radius: 5px;"
      onclick="submitComment()"
    >
      Gửi bình luận
    </button>
  </div>
  
  <div class="comments-list">
    <div class="comment-item" style="border-bottom: 1px solid #eee; padding: 15px 0;">
      <div class="comment-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <img src="user1.jpg" style="width: 40px; height: 40px; border-radius: 50%;">
        <div>
          <strong>Nguyễn Văn A</strong>
          <span style="color: #999; font-size: 14px; margin-left: 10px;">2 giờ trước</span>
        </div>
      </div>
      <p class="comment-text">Bài viết rất hay và bổ ích!</p>
      <div class="comment-actions">
        <button style="border: none; background: none; color: #007bff; cursor: pointer;" onclick="likeComment(1)">
          👍 Thích (5)
        </button>
        <button style="border: none; background: none; color: #007bff; cursor: pointer; margin-left: 15px;" onclick="replyComment(1)">
          💬 Trả lời
        </button>
      </div>
    </div>
    
    <div class="comment-item" style="border-bottom: 1px solid #eee; padding: 15px 0;">
      <div class="comment-header" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
        <img src="user2.jpg" style="width: 40px; height: 40px; border-radius: 50%;">
        <div>
          <strong>Trần Thị B</strong>
          <span style="color: #999; font-size: 14px; margin-left: 10px;">5 giờ trước</span>
        </div>
      </div>
      <p class="comment-text">Cảm ơn bạn đã chia sẻ!</p>
      <div class="comment-actions">
        <button style="border: none; background: none; color: #007bff; cursor: pointer;" onclick="likeComment(2)">
          👍 Thích (3)
        </button>
        <button style="border: none; background: none; color: #007bff; cursor: pointer; margin-left: 15px;" onclick="replyComment(2)">
          💬 Trả lời
        </button>
      </div>
    </div>
  </div>
</div>
```

### **✅ ĐÁP ÁN (Với data động):**

```jsx
function CommentsSection() {
  // Data mô phỏng (thực tế sẽ từ API hoặc state)
  const comments = [
    {
      id: 1,
      author: "Nguyễn Văn A",
      avatar: "user1.jpg",
      text: "Bài viết rất hay và bổ ích!",
      time: "2 giờ trước",
      likes: 5
    },
    {
      id: 2,
      author: "Trần Thị B",
      avatar: "user2.jpg",
      text: "Cảm ơn bạn đã chia sẻ!",
      time: "5 giờ trước",
      likes: 3
    },
    {
      id: 3,
      author: "Lê Văn C",
      avatar: "user3.jpg",
      text: "Tôi có thể tham khảo thêm tài liệu ở đâu?",
      time: "1 ngày trước",
      likes: 1
    }
  ];
  
  function submitComment() {
    console.log("Gửi bình luận");
  }
  
  function likeComment(commentId) {
    console.log(`Thích bình luận ${commentId}`);
  }
  
  function replyComment(commentId) {
    console.log(`Trả lời bình luận ${commentId}`);
  }
  
  return (
    <div className="comments-section">
      <h3>Bình luận ({comments.length})</h3>
      
      <div className="comment-form" style={{ marginBottom: 20 }}>
        <textarea 
          className="form-control" 
          rows={3}
          placeholder="Viết bình luận..."
          style={{ 
            width: '100%', 
            padding: 10, 
            border: '1px solid #ddd', 
            borderRadius: 5 
          }}
        />
        <button 
          className="btn-submit"
          style={{ 
            marginTop: 10, 
            padding: '8px 15px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: 5 
          }}
          onClick={submitComment}
        >
          Gửi bình luận
        </button>
      </div>
      
      <div className="comments-list">
        {comments.map(comment => (
          <div 
            key={comment.id} 
            className="comment-item" 
            style={{ 
              borderBottom: '1px solid #eee', 
              padding: '15px 0' 
            }}
          >
            <div className="comment-header" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 10, 
              marginBottom: 10 
            }}>
              <img 
                src={comment.avatar} 
                alt={comment.author}
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: '50%' 
                }} 
              />
              <div>
                <strong>{comment.author}</strong>
                <span style={{ 
                  color: '#999', 
                  fontSize: 14, 
                  marginLeft: 10 
                }}>
                  {comment.time}
                </span>
              </div>
            </div>
            
            <p className="comment-text">{comment.text}</p>
            
            <div className="comment-actions">
              <button 
                style={{ 
                  border: 'none', 
                  background: 'none', 
                  color: '#007bff', 
                  cursor: 'pointer' 
                }} 
                onClick={() => likeComment(comment.id)}
              >
                👍 Thích ({comment.likes})
              </button>
              <button 
                style={{ 
                  border: 'none', 
                  background: 'none', 
                  color: '#007bff', 
                  cursor: 'pointer', 
                  marginLeft: 15 
                }} 
                onClick={() => replyComment(comment.id)}
              >
                💬 Trả lời
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### **📌 Điểm quan trọng:**

1. **Dùng `map()` thay vì copy-paste HTML:**
   ```jsx
   {comments.map(comment => (...))}
   ```

2. **Phải có `key` prop:**
   ```jsx
   <div key={comment.id}>
   ```

3. **Event handler với tham số:**
   ```jsx
   onClick={() => likeComment(comment.id)}
   // KHÔNG phải: onClick={likeComment(comment.id)}
   ```

4. **Hiển thị data động:**
   ```jsx
   {comment.author}
   {comment.text}
   {comment.likes}
   ```

---

## 📝 BÀI TẬP 6: TABLE (DATA TABLE)

### **HTML gốc:**
```html
<div class="table-container">
  <h3>Danh sách sinh viên</h3>
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr style="background-color: #f8f9fa;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">ID</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Họ tên</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Email</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Điểm</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #dee2e6;">Hành động</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">1</td>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Nguyễn Văn A</td>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">a@gmail.com</td>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">8.5</td>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">
          <button style="margin-right: 5px; padding: 5px 10px; background-color: #ffc107; border: none; border-radius: 3px;" onclick="editStudent(1)">
            Sửa
          </button>
          <button style="padding: 5px 10px; background-color: #dc3545; color: white; border: none; border-radius: 3px;" onclick="deleteStudent(1)">
            Xóa
          </button>
        </td>
      </tr>
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">2</td>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">Trần Thị B</td>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">b@gmail.com</td>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">9.0</td>
        <td style="padding: 12px; border-bottom: 1px solid #dee2e6;">
          <button style="margin-right: 5px; padding: 5px 10px; background-color: #ffc107; border: none; border-radius: 3px;" onclick="editStudent(2)">
            Sửa
          </button>
          <button style="padding: 5px 10px; background-color: #dc3545; color: white; border: none; border-radius: 3px;" onclick="deleteStudent(2)">
            Xóa
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### **✅ ĐÁP ÁN:**

```jsx
function StudentTable() {
  const students = [
    { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", score: 8.5 },
    { id: 2, name: "Trần Thị B", email: "b@gmail.com", score: 9.0 },
    { id: 3, name: "Lê Văn C", email: "c@gmail.com", score: 7.5 },
    { id: 4