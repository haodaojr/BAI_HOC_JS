# ⚡ FILE ORGANIZATION: 1 COMPONENT = 1 FILE - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Quy tắc vàng: 1 component = 1 file**

**Cấu trúc thư mục:**
```
src/
├── components/
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
└── App.jsx
```

---

## 🔥 PHẦN 1: TẠI SAO CẦN TỔ CHỨC FILE?

### **🔍 Tại sao 1 component = 1 file? Học từ best practice và anti-pattern**

### **❌ Vấn đề khi tất cả trong 1 file (Anti-pattern):**

```jsx
// App.jsx - File 500+ dòng, khó quản lý
function App() {
  // 10 components trong 1 file - RẤT TỆ!
  function Header() { /* 50 dòng */ }
  function Hero() { /* 80 dòng */ }
  function Features() { /* 100 dòng */ }
  function Testimonials() { /* 70 dòng */ }
  function Footer() { /* 40 dòng */ }
  function Pricing() { /* 90 dòng */ }
  function ContactForm() { /* 60 dòng */ }
  // ... và còn nhiều nữa

  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Footer />
      <Pricing />
      <ContactForm />
    </div>
  );
}
```

**Vấn đề chi tiết:**
- **File quá dài**: 500+ dòng, scroll mòn chuột
- **Khó tìm component**: Ctrl+F tìm "Header" thấy 10 kết quả
- **Khó sửa**: Sửa Header ảnh hưởng cả file
- **Khó reuse**: Muốn dùng Header ở file khác? Copy-paste
- **Khó test**: Test cả app thay vì test từng component
- **Merge conflict**: 2 người sửa components khác nhau → conflict
- **Performance**: Bundle size lớn, load chậm

---

### **✅ Giải pháp: 1 component = 1 file (Best practice)**

```jsx
// components/Header.jsx - Chỉ 50 dòng, tập trung
function Header() {
  return (
    <header>
      <nav>
        <Logo />
        <Menu />
      </nav>
    </header>
  );
}
export default Header;

// components/Hero.jsx - Chỉ 80 dòng, tập trung
function Hero() {
  return (
    <section className="hero">
      <h1>Welcome</h1>
      <p>Description</p>
      <Button>Get Started</Button>
    </section>
  );
}
export default Hero;

// App.jsx - Chỉ 20 dòng, clean
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
// ... import các component khác

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
    </div>
  );
}
```

**Lợi ích:**
- **File nhỏ**: Mỗi file 50-100 dòng, dễ đọc
- **Dễ tìm**: Header.jsx chứa duy nhất component Header
- **Dễ sửa**: Sửa Header không ảnh hưởng file khác
- **Reuse dễ**: Import Header vào bất kỳ file nào
- **Test riêng**: Test Header độc lập với Hero
- **Ít conflict**: Merge chỉ ảnh hưởng file được sửa
- **Performance**: Code splitting, lazy loading tốt hơn

---

### **📊 So sánh trực quan:**

| Tiêu chí | 1 file chứa tất cả | 1 component = 1 file |
|----------|-------------------|----------------------|
| **File size** | 500+ dòng | 50-100 dòng |
| **Tìm code** | Khó, nhiều kết quả | Dễ, chính xác |
| **Sửa code** | Ảnh hưởng toàn file | Chỉ ảnh hưởng component đó |
| **Reuse** | Copy-paste | Import |
| **Testing** | Test cả app | Test từng component |
| **Merge conflict** | Thường xuyên | Hiếm |
| **Performance** | Bundle lớn | Code splitting tốt |
| **Maintainability** | Khó | Dễ |

---

## 🔥 PHẦN 2: CẤU TRÚC THƯ MỤC CHUẨN

### **🔍 Tại sao cần cấu trúc thư mục? Khi nào dùng cách nào?**

### **1. Cấu trúc cơ bản (cho dự án nhỏ):**

```
src/
├── components/          # Components tái sử dụng
│   ├── Button.jsx       # Component Button
│   ├── Card.jsx         # Component Card
│   ├── Input.jsx        # Component Input
│   └── Modal.jsx        # Component Modal
├── pages/              # Components trang (page-level)
│   ├── Home.jsx         # Trang chủ
│   ├── About.jsx        # Trang giới thiệu
│   └── Dashboard.jsx    # Trang dashboard
├── layouts/            # Components layout (cấu trúc trang)
│   ├── Header.jsx       # Header của trang
│   ├── Footer.jsx       # Footer của trang
│   └── Sidebar.jsx      # Sidebar
├── hooks/              # Custom hooks (logic tái sử dụng)
│   ├── useAuth.js       # Hook xử lý auth
│   └── useProducts.js   # Hook xử lý products
├── utils/              # Helper functions (utilities)
│   ├── formatDate.js    # Hàm format date
│   └── formatPrice.js   # Hàm format price
└── App.jsx             # Component root
```

**Khi nào dùng:** Dự án nhỏ (< 20 components), team nhỏ

---

### **2. Cấu trúc theo feature (cho dự án lớn):**

```
src/
├── features/           # Chia theo tính năng
│   ├── auth/           # Tính năng authentication
│   │   ├── components/ # Components của auth
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── hooks/      # Hooks của auth
│   │   │   └── useAuth.js
│   │   └── utils/      # Utils của auth
│   │       └── authHelpers.js
│   ├── products/       # Tính năng products
│   │   ├── components/
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductList.jsx
│   │   ├── hooks/
│   │   │   └── useProducts.js
│   │   └── utils/
│   │       └── productHelpers.js
│   └── cart/           # Tính năng cart
│       ├── components/
│       │   ├── CartItem.jsx
│       │   └── CartSummary.jsx
│       └── hooks/
│           └── useCart.js
├── shared/             # Components dùng chung
│   ├── ui/             # UI primitives
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   └── layouts/        # Layout components
│       ├── Header.jsx
│       └── Footer.jsx
└── App.jsx
```

**Khi nào dùng:** Dự án lớn (> 50 components), team lớn, nhiều features

---

### **3. Mỗi component 1 file (Quy tắc vàng):**

```jsx
// components/Button.jsx - Tốt: 1 component = 1 file
function Button({ children, onClick, variant }) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
```

```jsx
// components/Card.jsx - Tốt: 1 component = 1 file
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

export default Card;
```

**❌ Không nên:**
```jsx
// components/UI.jsx - Tệ: Nhiều components trong 1 file
function Button() { /* ... */ }
function Card() { /* ... */ }
function Input() { /* ... */ }
function Modal() { /* ... */ }

export { Button, Card, Input, Modal };
```

---

### **4. File name = Component name (Quy tắc bắt buộc):**

```
components/
├── UserProfile.jsx      # Component: UserProfile
├── ProductCard.jsx      # Component: ProductCard
├── LoginForm.jsx        # Component: LoginForm
├── TodoList.jsx         # Component: TodoList
└── SearchBar.jsx        # Component: SearchBar
```

**Tại sao?**
- Dễ tìm: Tìm "UserProfile" → mở UserProfile.jsx
- Nhất quán: Không bị nhầm lẫn tên
- IDE support: Auto-complete, refactoring tốt hơn

---

## 🔥 PHẦN 3: QUY TẮC ĐẶT TÊN FILE

### **File name = Component name:**

```
components/
├── UserProfile.jsx      # Component: UserProfile
├── ProductCard.jsx      # Component: ProductCard
├── LoginForm.jsx        # Component: LoginForm
├── TodoList.jsx         # Component: TodoList
└── SearchBar.jsx        # Component: SearchBar
```

### **Index files để export:**

```jsx
// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Modal } from './Modal';
```

**Lợi ích:**
- Import ngắn gọn: `import { Button, Card } from './components'`
- Dễ quản lý exports
- Tách biệt logic và presentation

---

## 🔥 PHẦN 4: CÁCH IMPORT/EXPORT

### **1. Default Export (Khuyên dùng cho component):**

```jsx
// Button.jsx
function Button() { /* ... */ }
export default Button;

// App.jsx
import Button from './components/Button';
```

### **2. Named Export (cho utilities):**

```jsx
// utils/helpers.js
export function formatDate(date) { /* ... */ }
export function formatPrice(price) { /* ... */ }

// App.jsx
import { formatDate, formatPrice } from './utils/helpers';
```

### **3. Import từ index file:**

```jsx
// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';

// App.jsx
import { Button, Card } from './components';
```

---

## 🔥 PHẦN 5: TỔ CHỨC THEO FEATURE

### **1. Cách 1: Group by type (theo loại):**

```
src/
├── components/
│   ├── ui/              # UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── forms/           # Form components
│   │   ├── LoginForm.jsx
│   │   └── RegisterForm.jsx
│   └── layout/          # Layout components
│       ├── Header.jsx
│       └── Footer.jsx
```

### **2. Cách 2: Group by feature (theo tính năng):**

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   └── hooks/
│   │       └── useAuth.js
│   ├── products/
│   │   ├── components/
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductList.jsx
│   │   └── hooks/
│   │       └── useProducts.js
```

---

## 🔥 PHẦN 6: QUY TẮC IMPORT TRONG COMPONENT

### **1. Thứ tự import chuẩn:**

```jsx
// 1. React imports
import React from 'react';
import { useState, useEffect } from 'react';

// 2. Third-party libraries
import axios from 'axios';
import { format } from 'date-fns';

// 3. Local imports
import Button from './Button';
import { formatPrice } from '../utils/helpers';

// 4. Relative imports (sibling files)
import Card from './Card';
import Modal from './Modal';

// 5. Styles (cuối cùng)
import './Component.css';
```

### **2. Import grouping:**

```jsx
// ✅ Tốt - nhóm theo loại
import React, { useState } from 'react';

import Button from '../ui/Button';
import Card from '../ui/Card';
import { formatDate } from '../../utils/date';

import './UserProfile.css';

// ❌ Không nên - import lẫn lộn
import React, { useState } from 'react';
import Button from '../ui/Button';
import { formatDate } from '../../utils/date';
import Card from '../ui/Card';
import './UserProfile.css';
```

---

## 🔥 PHẦN 7: COMPONENT CO-LOCATION

### **1. Đặt CSS cùng component:**

```
components/
├── Button/
│   ├── Button.jsx
│   ├── Button.css
│   └── index.js
├── Card/
│   ├── Card.jsx
│   ├── Card.css
│   └── index.js
```

### **2. Component với test:**

```
components/
├── Button/
│   ├── Button.jsx
│   ├── Button.test.jsx
│   ├── Button.css
│   └── index.js
```

---

## 🔥 PHẦN 8: LỖI THƯỜNG GẶP

### **❌ Lỗi 1: Nhiều component trong 1 file**

```jsx
// ❌ Không nên
function App() {
  function Header() { /* ... */ }
  function Hero() { /* ... */ }
  function Footer() { /* ... */ }
  
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
```

### **✅ Cách sửa:**

```jsx
// components/Header.jsx
function Header() { /* ... */ }
export default Header;

// components/Hero.jsx
function Hero() { /* ... */ }
export default Hero;

// components/Footer.jsx
function Footer() { /* ... */ }
export default Footer;

// App.jsx
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
```

---

### **❌ Lỗi 2: Import không có thứ tự**

```jsx
// ❌ Lẫn lộn
import './App.css';
import React from 'react';
import Button from './components/Button';
import { useState } from 'react';
import axios from 'axios';
```

### **✅ Cách sửa:**

```jsx
// ✅ Có thứ tự
import React, { useState } from 'react';
import axios from 'axios';

import Button from './components/Button';

import './App.css';
```

---

### **❌ Lỗi 3: File name không khớp component name**

```jsx
// ❌ button.jsx (viết thường)
function Button() { /* ... */ }

// ❌ ButtonComponent.jsx (quá dài)
function Button() { /* ... */ }
```

### **✅ Cách sửa:**

```jsx
// ✅ Button.jsx
function Button() { /* ... */ }
```

---

## ⚡ BÀI TẬP NHANH (5 phút)

### **Bài 1: Tổ chức lại component**

```jsx
// Code hiện tại - tất cả trong 1 file
function App() {
  function Header() {
    return <header>Header</header>;
  }

  function Content() {
    return <main>Content</main>;
  }

  function Footer() {
    return <footer>Footer</footer>;
  }

  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

**Yêu cầu:** Tách thành 3 file riêng biệt và import vào App.jsx

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Tạo file Header.jsx</summary>

```jsx
// components/Header.jsx
function Header() {
  return <header>Header</header>;
}
export default Header;
```
</details>

<details>
<summary>Bước 2: Tạo file Content.jsx</summary>

```jsx
// components/Content.jsx
function Content() {
  return <main>Content</main>;
}
export default Content;
```
</details>

<details>
<summary>Bước 3: Tạo file Footer.jsx</summary>

```jsx
// components/Footer.jsx
function Footer() {
  return <footer>Footer</footer>;
}
export default Footer;
```
</details>

<details>
<summary>Bước 4: Sửa App.jsx</summary>

```jsx
// App.jsx
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```
</details>

---

### **Bài 2: Tạo cấu trúc thư mục**

```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── Card.jsx
│   ├── forms/
│   │   ├── LoginForm.jsx
│   │   └── ContactForm.jsx
│   └── index.js
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   └── Contact.jsx
└── App.jsx
```

**Yêu cầu:** Tạo file index.js để export tất cả components

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Tạo file index.js</summary>

```jsx
// components/index.js
export { default as Button } from './ui/Button';
export { default as Input } from './ui/Input';
export { default as Card } from './ui/Card';
export { default as LoginForm } from './forms/LoginForm';
export { default as ContactForm } from './forms/ContactForm';
```
</details>

<details>
<summary>Bước 2: Sử dụng trong App.jsx</summary>

```jsx
// App.jsx
import { Button, Card, LoginForm } from './components';

// Giờ có thể dùng trực tiếp
<Button>Click me</Button>
<Card>Content</Card>
<LoginForm />
```
</details>

---

### **Bài 3: Sắp xếp import**

```jsx
// Code hiện tại - import lẫn lộn
import './UserProfile.css';
import React, { useState } from 'react';
import { format } from 'date-fns';
import Card from './components/Card';
import Button from './components/Button';
import axios from 'axios';
import { useEffect } from 'react';
```

**Yêu cầu:** Sắp xếp lại theo thứ tự chuẩn

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Nhóm React imports</summary>

```jsx
// 1. React imports (đầu tiên)
import React, { useState, useEffect } from 'react';
```
</details>

<details>
<summary>Bước 2: Nhóm third-party libraries</summary>

```jsx
// 2. Third-party libraries
import axios from 'axios';
import { format } from 'date-fns';
```
</details>

<details>
<summary>Bước 3: Nhóm local imports</summary>

```jsx
// 3. Local imports
import Card from './components/Card';
import Button from './components/Button';
```
</details>

<details>
<summary>Bước 4: Nhóm styles (cuối cùng)</summary>

```jsx
// 4. Styles (cuối cùng)
import './UserProfile.css';
```
</details>

---

## 📊 BẢNG TRA CỨU NHANH

### **Cấu trúc thư mục:**

| Thư mục | Chứa gì | Ví dụ |
|---------|---------|-------|
| `components/` | Components tái sử dụng | Button, Card, Modal |
| `pages/` | Components trang | Home, About, Dashboard |
| `layouts/` | Components layout | Header, Footer, Sidebar |
| `hooks/` | Custom hooks | useAuth, useProducts |
| `utils/` | Helper functions | formatDate, formatPrice |

### **Quy tắc import:**

| Thứ tự | Loại import | Ví dụ |
|--------|-------------|-------|
| 1 | React | `import React from 'react'` |
| 2 | Third-party | `import axios from 'axios'` |
| 3 | Local components | `import Button from './Button'` |
| 4 | Utils/helpers | `import { formatDate } from '../utils'` |
| 5 | Styles | `import './Component.css'` |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu tại sao cần tổ chức file
- [ ] Biết cấu trúc thư mục chuẩn
- [ ] Biết quy tắc đặt tên file
- [ ] Biết cách import/export
- [ ] Biết cách group components
- [ ] Biết thứ tự import chuẩn
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Import/export patterns (default vs named exports)"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về file organization"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**