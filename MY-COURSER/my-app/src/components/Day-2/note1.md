Tốt lắm 💪
Bây giờ mình sẽ **học và thực hành ngay với React Event System (SyntheticEvent)** — một chủ đề cực kỳ quan trọng trong React.
Mình sẽ dạy bạn theo **cách dành cho người mới**: từng bước, có ví dụ, giải thích từng dòng, và có bài tập thực hành luôn.

---

## 🧩 1. Khái niệm cơ bản

🔹 **SyntheticEvent** là "phiên bản đặc biệt" của **sự kiện trình duyệt (DOM Event)** mà React tự tạo ra.
Nó giúp React hoạt động đồng nhất trên mọi trình duyệt (cross-browser compatible).

> Nói dễ hiểu: React không dùng trực tiếp `addEventListener`, mà tự "bọc" sự kiện lại → gọi là `SyntheticEvent`.

---

## 🧠 2. Ví dụ thực tế đời thường

👉 Giả sử bạn tổ chức một cuộc thi hát 🎤.
Bạn không cho mọi người hát thẳng vào micro thật (vì mỗi người hát khác nhau, có thể méo tiếng).
Thay vào đó, bạn **dùng một phần mềm trung gian** xử lý âm thanh để **mọi người đều hát qua bộ lọc chung** → chất lượng đồng đều.

🔸 Tương tự, React **bọc các event thật của DOM** lại thành **SyntheticEvent** → React xử lý chúng thống nhất.

---

## 💻 3. Ví dụ code đơn giản

Tạo file `App.jsx`:

```jsx
import React from "react";

function App() {
  // Hàm xử lý sự kiện click
  const handleClick = (event) => {
    console.log("🔹 SyntheticEvent object:", event);
    console.log("🔹 Loại sự kiện:", event.type);
    console.log("🔹 Nút được nhấn:", event.target.textContent);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🧩 React SyntheticEvent Demo</h2>
      <button onClick={handleClick}>Nhấn vào tôi</button>
    </div>
  );
}

export default App;
```

---

## 🔍 4. Giải thích từng dòng

| Dòng                          | Giải thích                                                       |
| ----------------------------- | ---------------------------------------------------------------- |
| `const handleClick = (event)` | Khi bạn click vào button, React tự truyền vào **SyntheticEvent** |
| `event.type`                  | Trả về loại sự kiện, ví dụ `"click"`                             |
| `event.target`                | Chính là phần tử HTML được click (ở đây là `<button>`)           |
| `event.target.textContent`    | Lấy nội dung chữ bên trong nút                                   |
| `onClick={handleClick}`       | Gắn sự kiện **React SyntheticEvent** (không phải DOM click thật) |

---

## ⚠️ 5. Điểm đặc biệt của SyntheticEvent

1. React **tự động gộp (pool)** event lại để tiết kiệm bộ nhớ.
   👉 Sau khi callback kết thúc, `event` sẽ **không còn hợp lệ** (nó bị "null" hóa).
   Nếu bạn cần dùng nó sau này (ví dụ trong setTimeout), hãy gọi `event.persist()`.

2. React dùng **các tên viết theo kiểu camelCase**
   Ví dụ:

   * `onClick` (React) → thay cho `onclick` (DOM)
   * `onChange`, `onSubmit`, `onMouseEnter`, ...

---

## 🧪 6. Thực hành 1 — thử click

👉 Chạy code, mở tab Console trong trình duyệt Developer Tools.
Sau đó click nút và xem log hiện ra.
Bạn sẽ thấy **SyntheticEvent** xuất hiện kèm các thuộc tính như `bubbles`, `target`, `type`,...

---

## 🎯 7. Thực hành 2 — thử delay event

Thêm đoạn này để kiểm tra `event.persist()`:

```jsx
const handleClick = (event) => {
  event.persist(); // Giữ lại event để dùng sau này
  setTimeout(() => {
    console.log("⏰ Dùng event sau 2s:", event.type);
  }, 2000);
};
```

Nếu bạn **không gọi `event.persist()`**, React sẽ báo lỗi vì event đã bị "giải phóng".

---

## 💡 Bài tập cho bạn

### Bài tập 1

Tạo 3 nút:

* "Chào buổi sáng"
* "Chào buổi trưa"
* "Chào buổi tối"

Khi click vào mỗi nút → in ra console:

```
Bạn vừa chào buổi sáng!
```

(với nội dung tương ứng)

### Gợi ý:

```jsx
const handleClick = (event) => {
  const text = event.target.textContent;
  console.log(`Bạn vừa ${text}!`);
};
```

---

### Bài tập 2 (nâng cao nhẹ)

Thêm một input, khi người dùng nhập tên và click nút "Chào", in ra:

```
Xin chào, Hào!
```

---

Bạn muốn mình **tạo sẵn code mẫu cho bài tập 1 và 2** để bạn chỉ việc chạy thử luôn không?
Hay bạn muốn **tự làm trước**, mình sẽ **chấm và sửa lỗi** cho bạn?