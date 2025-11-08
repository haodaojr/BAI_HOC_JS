# 📝 NOTE 5: EVENT HANDLERS VỚI PARAMETERS - CHI TIẾT

## 🧩 Vấn Đề Cơ Bản

Làm sao truyền thêm tham số vào event handler ngoài `event` object?

```jsx
// ❌ SAI - Function được gọi ngay lập tức!
<button onClick={handleClick('Hello')}>Click</button>

// ✅ ĐÚNG - Function được gọi khi click
<button onClick={(e) => handleClick('Hello', e)}>Click</button>
```

---

═══════════════════════════════════════════════════════════════
📍 HEADER: Vị trí trong lộ trình
═══════════════════════════════════════════════════════════════

🎯 **TUẦN 3: TƯƠNG TÁC CƠ BẢN**  
📅 **Ngày 20-21: Event Handlers với Parameters**  
🔄 **Tiến độ:** Tuần 3/24 (12.5%)  
📊 **Mục tiêu tuần này:** Hiểu các cách truyền parameters vào event handlers

═══════════════════════════════════════════════════════════════

## 🎯 Event Handlers với Parameters

---

## ⚙️ 1. Các Cách Truyền Parameters

### Cách 1: Arrow Function (Phổ biến nhất)

```jsx
function Greeting() {
  const sayHello = (name, e) => {
    console.log(`Hello, ${name}!`);
    console.log('Event:', e);
  };

  return (
    <div>
      <button onClick={(e) => sayHello('John', e)}>Say Hi to John</button>
      <button onClick={(e) => sayHello('Jane', e)}>Say Hi to Jane</button>
    </div>
  );
}
```

**Ưu điểm:**
- ✅ Dễ đọc, dễ hiểu
- ✅ Linh hoạt, có thể truyền nhiều params

**Nhược điểm:**
- ⚠️ Tạo function mới mỗi lần render (có thể ảnh hưởng performance với list lớn)

---

### Cách 2: Bind Method

```jsx
function Greeting() {
  const sayHello = (name, e) => {
    console.log(`Hello, ${name}!`);
    console.log('Event:', e);
  };

  return (
    <div>
      <button onClick={sayHello.bind(null, 'John')}>Say Hi to John</button>
      <button onClick={sayHello.bind(null, 'Jane')}>Say Hi to Jane</button>
    </div>
  );
}
```

**Lưu ý:** Event object `e` sẽ tự động được truyền vào cuối cùng.

---

### Cách 3: Higher-Order Function (Factory Pattern)

```jsx
function Greeting() {
  const createClickHandler = (name) => {
    return (e) => {
      console.log(`Hello, ${name}!`);
      console.log('Event:', e);
    };
  };

  return (
    <div>
      <button onClick={createClickHandler('John')}>Say Hi to John</button>
      <button onClick={createClickHandler('Jane')}>Say Hi to Jane</button>
    </div>
  );
}
```

**Ưu điểm:**
- ✅ Code sạch hơn
- ✅ Dễ tái sử dụng

---

### Cách 4: Data Attributes (Tốt cho Event Delegation)

```jsx
function Greeting() {
  const sayHello = (e) => {
    const name = e.target.dataset.name;
    console.log(`Hello, ${name}!`);
  };

  return (
    <div>
      <button onClick={sayHello} data-name="John">Say Hi to John</button>
      <button onClick={sayHello} data-name="Jane">Say Hi to Jane</button>
    </div>
  );
}
```

**Ưu điểm:**
- ✅ Chỉ 1 function, tối ưu performance
- ✅ Phù hợp với danh sách lớn

---

## 🛒 2. Ví Dụ Thực Tế: Shopping Cart

```jsx
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Phone', price: 500 },
    { id: 3, name: 'Tablet', price: 300 }
  ];

  // Cách 1: Arrow Function
  const addToCart = (productId, productName, e) => {
    console.log(`Added ${productName} (ID: ${productId}) to cart`);
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={(e) => addToCart(product.id, product.name, e)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 📝 3. Ví Dụ: Multiple Parameters với Form

```jsx
function UserForm() {
  const handleInputChange = (fieldName, value, e) => {
    console.log(`Field: ${fieldName}`);
    console.log(`Value: ${value}`);
    console.log(`Event type: ${e.type}`);
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => handleInputChange('username', e.target.value, e)}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => handleInputChange('email', e.target.value, e)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => handleInputChange('password', e.target.value, e)}
      />
    </form>
  );
}
```

---

## ⚡ 4. Tối Ưu Performance với useCallback

Khi list lớn, nên dùng `useCallback` để tránh tạo function mới mỗi lần render:

```jsx
import { useCallback } from 'react';

function TodoList() {
  const todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build App' },
    { id: 3, text: 'Deploy' }
  ];

  // ❌ Không tối ưu - tạo function mới mỗi render
  const deleteTodo = (id) => {
    console.log(`Delete todo ${id}`);
  };

  // ✅ Tối ưu - function được cache
  const deleteTodoOptimized = useCallback((id) => {
    return (e) => {
      console.log(`Delete todo ${id}`);
    };
  }, []);

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={deleteTodoOptimized(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 🎯 5. Ví Dụ Phức Tạp: Modal với Dynamic Content

```jsx
function ProductGallery() {
  const products = [
    { id: 1, name: 'Product 1', image: 'img1.jpg', description: 'Great product' },
    { id: 2, name: 'Product 2', image: 'img2.jpg', description: 'Amazing quality' },
    { id: 3, name: 'Product 3', image: 'img3.jpg', description: 'Best seller' }
  ];

  const openModal = (productId, productName, description, e) => {
    console.log('Opening modal for:', productName);
    console.log('Description:', description);
    console.log('Product ID:', productId);
    // Logic mở modal ở đây
  };

  const addToWishlist = (productId, productName, e) => {
    e.stopPropagation(); // Ngăn bubble up
    console.log(`Added ${productName} to wishlist`);
  };

  return (
    <div className="gallery">
      {products.map(product => (
        <div
          key={product.id}
          className="product-card"
          onClick={(e) => openModal(product.id, product.name, product.description, e)}
        >
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <button
            onClick={(e) => addToWishlist(product.id, product.name, e)}
          >
            ❤️ Wishlist
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 📦 6. Pattern: Named Parameters với Object

Khi có nhiều parameters, dùng object để dễ đọc:

```jsx
function NotificationSystem() {
  const showNotification = ({ type, message, duration, e }) => {
    console.log(`Type: ${type}`);
    console.log(`Message: ${message}`);
    console.log(`Duration: ${duration}ms`);
    console.log('Event:', e);
  };

  return (
    <div>
      <button onClick={(e) => showNotification({
        type: 'success',
        message: 'Operation completed!',
        duration: 3000,
        e
      })}>
        Success
      </button>

      <button onClick={(e) => showNotification({
        type: 'error',
        message: 'Something went wrong!',
        duration: 5000,
        e
      })}>
        Error
      </button>
    </div>
  );
}
```

---

## 📊 7. So Sánh Các Cách

| Cách | Performance | Dễ Đọc | Use Case |
|------|-------------|---------|----------|
| Arrow Function | ⚠️ Trung bình | ✅ Cao | Ít items, code đơn giản |
| Bind | ⚠️ Trung bình | 😐 Trung bình | Ít dùng |
| Higher-Order | ✅ Tốt | ✅ Cao | Logic phức tạp |
| Data Attributes | ✅✅ Rất tốt | ✅ Cao | List lớn, event delegation |
| useCallback | ✅✅ Rất tốt | 😐 Trung bình | List lớn, optimization |

---

═══════════════════════════════════════════════════════════════
⏸️ CHECKPOINT: Kiểm tra hiểu biết
═══════════════════════════════════════════════════════════════

**Câu hỏi kiểm tra:**

1️⃣ **Tại sao không thể dùng `onClick={handleClick(param)}`?**

2️⃣ **Cách nào tốt nhất cho list lớn? Tại sao?**

3️⃣ **useCallback giúp gì trong event handlers?**

4️⃣ **Khi nào nên dùng object parameters?**

5️⃣ **Sự khác biệt giữa bind và arrow function?**

**Bài tập code:**  
Tạo một StarRating component (5 sao) sử dụng parameters trong event handlers. Paste code để review nhé! 🚀

═══════════════════════════════════════════════════════════════
🎯 FOOTER: Bước tiếp theo
═══════════════════════════════════════════════════════════════

**Hoàn thành checkpoint trên rồi nhắn mình nhé!**  

**Ngày mai (Ngày 22-23):** preventDefault & stopPropagation  
**Tuần tới:** Lists & Keys - Render mảng dữ liệu  

Bạn đã hiểu cách truyền parameters chưa? Cần ví dụ thêm không? 🤔

---

## 🎯 Key Takeaways

1. **Arrow Function**: Cách đơn giản nhất `onClick={(e) => func(param, e)}`
2. **Event Object**: Luôn là parameter cuối cùng
3. **Data Attributes**: Tốt cho performance với list lớn
4. **useCallback**: Dùng khi cần optimize
5. **Object Parameters**: Dùng khi có nhiều params
6. **Không gọi function trực tiếp**: `onClick={func()}` ❌
7. **Higher-Order Functions**: Tạo factory để return event handlers

---

Bạn đã hiểu rõ cách truyền parameters chưa? Muốn làm bài tập thực hành hay chuyển sang **preventDefault và stopPropagation**? 🚀