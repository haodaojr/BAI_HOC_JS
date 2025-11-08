# 📝 NOTE 4: EVENT DELEGATION TRONG REACT - CHI TIẾT

## 🧩 Event Delegation là gì?

**Event Delegation** là kỹ thuật xử lý sự kiện bằng cách gắn event listener vào phần tử cha thay vì gắn vào từng phần tử con. Khi sự kiện xảy ra ở phần tử con, nó sẽ "bubble up" (nổi lên) đến phần tử cha.

### Lợi ích:
- ✅ Giảm số lượng event listeners (tối ưu performance)
- ✅ Hoạt động với các phần tử được thêm động
- ✅ Giảm memory usage
- ✅ Code sạch hơn, dễ maintain

---

═══════════════════════════════════════════════════════════════
📍 HEADER: Vị trí trong lộ trình
═══════════════════════════════════════════════════════════════

🎯 **TUẦN 3: TƯƠNG TÁC CƠ BẢN**  
📅 **Ngày 18-19: Event Delegation Patterns**  
🔄 **Tiến độ:** Tuần 3/24 (12.5%)  
📊 **Mục tiêu tuần này:** Hiểu và áp dụng Event Delegation để tối ưu performance

═══════════════════════════════════════════════════════════════

## 🎯 Event Delegation trong React

---

## 🧩 1. Event Bubbling trong DOM

Khi một sự kiện xảy ra, nó sẽ "nổi" từ phần tử con lên phần tử cha:

```
Child Element → Parent Element → Grandparent → ... → document
```

---

## ⚙️ 2. Event Delegation trong React - Cách Hoạt Động

**Điểm đặc biệt**: React đã tự động implement event delegation!

- Tất cả events trong React được gắn vào **root container** (không phải từng element)
- React sử dụng **SyntheticEvent** để xử lý cross-browser compatibility
- Khi event xảy ra, React xác định đúng component nào cần xử lý

---

## ❌ 3. Ví Dụ SAI - Không dùng Event Delegation

```jsx
function BadList() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {/* Mỗi button có 1 event handler riêng - tốn memory! */}
          <button onClick={() => console.log(`Clicked ${item}`)}>
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

**Vấn đề:**
- ❌ 5 event listeners riêng biệt
- ❌ Tốn memory
- ❌ Không scale được với list lớn

---

## ✅ 4. Ví Dụ ĐÚNG - Dùng Event Delegation

```jsx
function GoodList() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  // Chỉ 1 event handler duy nhất!
  const handleClick = (e) => {
    // Kiểm tra xem có phải click vào button không
    if (e.target.tagName === 'BUTTON') {
      console.log(`Clicked ${e.target.textContent}`);
    }
  };

  return (
    <ul onClick={handleClick}>
      {items.map((item, index) => (
        <li key={index}>
          <button>{item}</button>
        </li>
      ))}
    </ul>
  );
}
```

**Ưu điểm:**
- ✅ Chỉ 1 event listener
- ✅ Performance tốt
- ✅ Scale được với list lớn

---

## 📊 5. Sử Dụng `data-*` Attributes

Cách tốt nhất để truyền data khi dùng event delegation:

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build Project' },
    { id: 3, text: 'Get Job' }
  ];

  const handleAction = (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const todoId = button.dataset.id;
    const action = button.dataset.action;

    console.log(`Action: ${action}, Todo ID: ${todoId}`);
  };

  return (
    <div onClick={handleAction}>
      {todos.map(todo => (
        <div key={todo.id}>
          <span>{todo.text}</span>
          <button data-id={todo.id} data-action="edit">Edit</button>
          <button data-id={todo.id} data-action="delete">Delete</button>
        </div>
      ))}
    </div>
  );
}
```

---

## 🎯 6. Ví Dụ Thực Tế: Menu Navigation

```jsx
function Navigation() {
  const menuItems = [
    { id: 'home', label: 'Home', url: '/' },
    { id: 'about', label: 'About', url: '/about' },
    { id: 'services', label: 'Services', url: '/services' },
    { id: 'contact', label: 'Contact', url: '/contact' }
  ];

  const handleNavClick = (e) => {
    e.preventDefault();

    // Tìm thẻ <a> gần nhất
    const link = e.target.closest('a');
    if (!link) return;

    const page = link.dataset.page;
    console.log(`Navigating to: ${page}`);
    // Xử lý navigation logic ở đây
  };

  return (
    <nav onClick={handleNavClick}>
      <ul>
        {menuItems.map(item => (
          <li key={item.id}>
            <a href={item.url} data-page={item.id}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

---

## 🔍 7. Event Target vs CurrentTarget

```jsx
function Example() {
  const handleClick = (e) => {
    console.log('Target:', e.target);         // Phần tử được click trực tiếp
    console.log('CurrentTarget:', e.currentTarget); // Phần tử có event handler
  };

  return (
    <div onClick={handleClick} style={{ padding: '20px', background: 'lightblue' }}>
      <button>Click Me</button>
      <span>Or Click Here</span>
    </div>
  );
}
```

**Kết quả khi click button:**
- `e.target` → `<button>`
- `e.currentTarget` → `<div>`

---

## 🎯 8. Khi Nào NÊN dùng Event Delegation?

✅ **NÊN dùng khi:**
- Có nhiều phần tử cùng loại (list items, buttons, cards)
- Các phần tử được render động
- Muốn tối ưu performance với list lớn

❌ **KHÔNG NÊN dùng khi:**
- Mỗi element cần logic xử lý khác nhau hoàn toàn
- Code trở nên phức tạp, khó đọc
- Cần access trực tiếp đến phần tử cụ thể

---

## 🖼️ 9. Thực Hành - Image Gallery với Event Delegation

Tạo một gallery có thể click vào ảnh để xem preview:

```jsx
function ImageGallery() {
  const images = [
    { id: 1, url: 'https://picsum.photos/200/200?random=1', title: 'Image 1' },
    { id: 2, url: 'https://picsum.photos/200/200?random=2', title: 'Image 2' },
    { id: 3, url: 'https://picsum.photos/200/200?random=3', title: 'Image 3' },
    { id: 4, url: 'https://picsum.photos/200/200?random=4', title: 'Image 4' }
  ];

  const handleGalleryClick = (e) => {
    const img = e.target.closest('img');
    if (!img) return;

    const imageId = img.dataset.id;
    const imageTitle = img.alt;

    alert(`Viewing: ${imageTitle} (ID: ${imageId})`);
  };

  return (
    <div
      onClick={handleGalleryClick}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}
    >
      {images.map(image => (
        <img
          key={image.id}
          src={image.url}
          alt={image.title}
          data-id={image.id}
          style={{ width: '100%', cursor: 'pointer' }}
        />
      ))}
    </div>
  );
}
```

---

═══════════════════════════════════════════════════════════════
⏸️ CHECKPOINT: Kiểm tra hiểu biết
═══════════════════════════════════════════════════════════════

**Câu hỏi kiểm tra:**

1️⃣ **Event Delegation là gì? Tại sao cần dùng?**

2️⃣ **Event bubbling hoạt động như thế nào?**

3️⃣ **Sự khác biệt giữa `e.target` và `e.currentTarget`?**

4️⃣ **Khi nào NÊN và KHÔNG NÊN dùng event delegation?**

5️⃣ **Tại sao React tự động implement event delegation?**

**Bài tập code:**  
Tạo một TodoList component sử dụng Event Delegation pattern với data attributes. Paste code để review nhé! 🚀

═══════════════════════════════════════════════════════════════
🎯 FOOTER: Bước tiếp theo
═══════════════════════════════════════════════════════════════

**Hoàn thành checkpoint trên rồi nhắn mình nhé!**  

**Ngày mai (Ngày 20-21):** preventDefault & stopPropagation  
**Tuần tới:** Lists & Keys - Render mảng dữ liệu  

Bạn đã hiểu Event Delegation chưa? Cần ví dụ thêm không? 🤔

---

## 🎯 Key Takeaways

1. **Event Delegation** = Gắn event vào parent, xử lý events từ children
2. React tự động implement event delegation ở root level
3. Dùng `e.target` để biết element nào được click
4. Dùng `e.currentTarget` để biết element nào có event handler
5. Dùng `data-*` attributes để truyền data
6. Dùng `closest()` để tìm parent element phù hợp
7. Tối ưu performance khi có nhiều elements giống nhau

---

Bạn đã hiểu rõ về Event Delegation chưa? Muốn làm bài tập thực hành hay tiếp tục với **preventDefault và stopPropagation**? 🚀