Tốt lắm 👏 — giờ bạn đã đi đến **3 sự kiện nền tảng nhất trong React**:
👉 `onClick`, `onChange`, `onSubmit`

Ba "nhân vật" này xuất hiện gần như trong **mọi ứng dụng React**, nên mình sẽ giúp bạn hiểu **tường tận từ gốc** — đúng phong cách "Lão Tông dạy người mới" nhé 😄

---

## 🧩 MỤC TIÊU BÀI HỌC

Sau buổi này bạn sẽ hiểu được:

1. Ba event này hoạt động **ra sao trong React (SyntheticEvent)**
2. Cách **viết đúng cú pháp**
3. Cách **xử lý dữ liệu người dùng**
4. Và làm **3 ví dụ thực tế + 1 bài tập tổng hợp**

---

## ⚙️ 1️⃣ `onClick` — Khi người dùng nhấn (chuột, nút, link...)

### 💡 Ý tưởng đời thường

Khi bạn bấm công tắc đèn 💡 → đèn sáng.
Trong React, khi bạn bấm nút → React gọi **hàm xử lý** bạn gán trong `onClick`.

---

### 🧠 Ví dụ code:

```jsx
function ClickExample() {
  const handleClick = () => {
    alert("Bạn vừa click nút!");
  };

  return <button onClick={handleClick}>Nhấn tôi</button>;
}

export default ClickExample;
```

---

### 🔍 Giải thích:

| Thành phần    | Ý nghĩa                                                    |
| ------------- | ---------------------------------------------------------- |
| `onClick`     | Tên sự kiện trong React (viết camelCase)                   |
| `handleClick` | Hàm xử lý (callback) được gọi khi click                    |
| `alert(...)`  | Thực hiện hành động bạn muốn (ở đây là hiển thị thông báo) |

✅ React **không dùng `onclick="..."`** như HTML, mà dùng `{}` để gán hàm JS.

---

## ⚙️ 2️⃣ `onChange` — Khi dữ liệu trong input thay đổi

### 💡 Tình huống

Bạn gõ chữ vào ô tìm kiếm 🔍, React cần biết mỗi lần bạn nhập ký tự gì để cập nhật giao diện.

---

### 🧠 Ví dụ:

```jsx
import { useState } from "react";

function ChangeExample() {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nhập tên của bạn"
        onChange={handleChange}
      />
      <p>Xin chào, {name}</p>
    </div>
  );
}
```

---

### 🔍 Giải thích:

| Thành phần           | Ý nghĩa                                    |
| -------------------- | ------------------------------------------ |
| `onChange`           | Gọi hàm khi người dùng nhập hoặc xoá ký tự |
| `event.target`       | Chính là thẻ `<input>` đang được nhập      |
| `event.target.value` | Lấy giá trị người dùng nhập vào            |
| `setName()`          | Cập nhật state để giao diện render lại     |

✅ Đây là ví dụ của **Controlled Component** trong React (input bị React "điều khiển").

---

## ⚙️ 3️⃣ `onSubmit` — Khi form được gửi đi

### 💡 Tình huống

Bạn điền form đăng ký, bấm nút Gửi → React cần chặn reload và xử lý dữ liệu.

---

### 🧠 Ví dụ:

```jsx
function SubmitExample() {
  const handleSubmit = (event) => {
    event.preventDefault(); // chặn reload trang
    const name = event.target.elements.name.value;
    alert(`Xin chào, ${name}!`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nhập tên của bạn" />
      <button>Gửi</button>
    </form>
  );
}
```

---

### 🔍 Giải thích:

| Thành phần                         | Ý nghĩa                                          |
| ---------------------------------- | ------------------------------------------------ |
| `onSubmit`                         | Kích hoạt khi người dùng nhấn "Enter" hoặc "Gửi" |
| `event.preventDefault()`           | Chặn hành vi mặc định của form (reload trang)    |
| `event.target.elements.name.value` | Lấy giá trị input có `name="name"`               |
| `alert(...)`                       | Hiển thị thông báo hoặc xử lý dữ liệu            |

---

## 🧠 Tổng hợp so sánh nhanh

| Event      | Kích hoạt khi...      | Thường dùng cho...        | Tham số chính                |
| ---------- | --------------------- | ------------------------- | ---------------------------- |
| `onClick`  | Click chuột, bấm nút  | Button, icon, link        | `event`                      |
| `onChange` | Nhập dữ liệu thay đổi | Input, textarea, select   | `event.target.value`         |
| `onSubmit` | Gửi form              | Form, đăng nhập, tìm kiếm | `event.target.elements[...]` |

---

## 🎯 4️⃣ Bài tập tổng hợp

Tạo form đơn giản có:

* 1 ô nhập tên (`name`)
* 1 ô nhập email (`email`)
* 1 nút Gửi (`Submit`)

Khi người dùng nhập → hiển thị ngay bên dưới:

```
Tên: [name]
Email: [email]
```

Khi bấm Gửi → hiển thị alert:

```
Form đã gửi: [name] - [email]
```

---

### 💡 Gợi ý khung code:

```jsx
import { useState } from "react";

function FormPractice() {
  const [form, setForm] = useState({ name: "", email: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form đã gửi: ${form.name} - ${form.email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" onChange={handleChange} placeholder="Tên" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <button>Gửi</button>
      <p>Tên: {form.name}</p>
      <p>Email: {form.email}</p>
    </form>
  );
}
```

---

## ✅ Tóm tắt ghi nhớ nhanh:

| Tên        | Cách dùng               | Ghi nhớ nhanh                |
| ---------- | ----------------------- | ---------------------------- |
| `onClick`  | `<button onClick={fn}>` | "Click là chạy"              |
| `onChange` | `<input onChange={fn}>` | "Nhập là đổi"                |
| `onSubmit` | `<form onSubmit={fn}>`  | "Gửi là chặn reload + xử lý" |

---