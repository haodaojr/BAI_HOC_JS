# ⚡ IMPORT/EXPORT PATTERNS (DEFAULT VS NAMED EXPORTS) - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **2 loại export chính:**
1. **Default Export**: `export default Component` - 1 file, 1 export chính
2. **Named Export**: `export { Component }` - nhiều export trong 1 file

**✅ Khuyên dùng:**
- **Default export** cho components
- **Named export** cho utilities, constants

---

## 🔥 PHẦN 1: DEFAULT EXPORT

### **🔍 Default Export là gì? Tại sao dùng cho component?**

**Default export = Export chính của file, chỉ có 1 cái trong 1 file.**

**Cách sử dụng:**

```jsx
// Button.jsx - Export
function Button() { /* ... */ }
export default Button;

// App.jsx - Import
import Button from './components/Button';
import MyButton from './components/Button'; // Có thể đổi tên
```

**Phân tích TỪNG KÝ TỰ:**

**1. `export default Button`:**
- `export default`: Xuất component này ra ngoài làm export chính
- `Button`: Tên component được export
- 1 file CHỈ CÓ 1 default export

**2. `import Button from './components/Button'`:**
- `import Button`: Import vào với tên Button
- `from './components/Button'`: Từ file Button.jsx
- Có thể đổi tên: `import MyButton from './components/Button'`

**✅ Ưu điểm:**
- Import ngắn gọn: `import Button from './Button'`
- Dễ rename: `import MyButton from './Button'`
- Phù hợp component chính của file
- Clean imports trong App.jsx

**❌ Nhược điểm:**
- 1 file chỉ có 1 default export
- Khó track khi file có nhiều thứ export
- Phải import đúng tên file

---

### **❌ LỖI PHỔ BIẾN:**

**❌ Lỗi 1: Import default như named**
```jsx
// Button.jsx
function Button() { /* ... */ }
export default Button;

// App.jsx - SAI
import { Button } from './Button'; // Lỗi: Button is not exported

// ĐÚNG
import Button from './Button';
```

**❌ Lỗi 2: 2 default export trong 1 file**
```jsx
// Button.jsx - SAI
export default function Button() { /* ... */ }
export default function IconButton() { /* ... */ } // Lỗi: chỉ 1 default

// ĐÚNG: Tách thành 2 file
// Button.jsx
export default function Button() { /* ... */ }

// IconButton.jsx
export default function IconButton() { /* ... */ }
```

**❌ Lỗi 3: Import sai tên**
```jsx
// Button.jsx
export default function Button() { /* ... */ }

// App.jsx - SAI
import button from './Button'; // Lỗi: tên phải khớp (Button vs button)

// ĐÚNG
import Button from './Button';
```

---

## 🔥 PHẦN 2: NAMED EXPORT

### **🔍 Named Export là gì? Tại sao dùng cho utilities?**

**Named export = Export có tên, 1 file có thể có nhiều named export.**

**Cách sử dụng:**

```jsx
// utils/helpers.js - Export
export function formatDate(date) {
  return new Intl.DateTimeFormat('vi-VN').format(date);
}

export function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ';
}

export const API_URL = 'https://api.example.com';

// App.jsx - Import
import { formatDate, formatPrice, API_URL } from './utils/helpers';
```

**Phân tích TỪNG KÝ TỰ:**

**1. `export function formatDate(date)`:**
- `export`: Xuất ra ngoài
- `function formatDate(date)`: Function với tên cụ thể
- Phải import đúng tên: `formatDate`

**2. `export const API_URL = '...'`:**
- Xuất constant ra ngoài
- Import: `import { API_URL } from './utils/helpers'`

**3. `import { formatDate, formatPrice } from './utils/helpers'`:**
- Dấu `{}`: Import named exports
- Phải liệt kê đúng tên các thứ cần import
- Có thể đổi tên: `import { formatDate as format } from './utils/helpers'`

**✅ Ưu điểm:**
- Nhiều export trong 1 file (utilities thường có nhiều function)
- Import rõ ràng: Biết chính xác import cái gì
- Tree-shaking tốt: Bundle chỉ những thứ được dùng
- Dễ refactor: Đổi tên function thì import cũng đổi theo

**❌ Nhược điểm:**
- Import dài dòng: `import { formatDate, formatPrice, API_URL }`
- Phải nhớ đúng tên để import
- Khó đổi tên khi import (phải dùng `as`)

---

### **❌ LỖI PHỔ BIẾN:**

**❌ Lỗi 1: Import named như default**
```jsx
// utils.js
export function formatDate() { /* ... */ }

// App.jsx - SAI
import formatDate from './utils'; // Lỗi: formatDate is not default export

// ĐÚNG
import { formatDate } from './utils';
```

**❌ Lỗi 2: Import sai tên**
```jsx
// utils.js
export function formatDate() { /* ... */ }

// App.jsx - SAI
import { formatdate } from './utils'; // Lỗi: tên sai (formatdate vs formatDate)

// ĐÚNG
import { formatDate } from './utils';
```

**❌ Lỗi 3: Quên destructuring**
```jsx
// utils.js
export function formatDate() { /* ... */ }

// App.jsx - SAI
import formatDate from './utils'; // Lỗi: không có {}

import formatDate = require('./utils'); // Cũng sai

// ĐÚNG
import { formatDate } from './utils';
```

---

## 🔥 PHẦN 3: KHI NÀO DÙNG DEFAULT EXPORT?

### **🎯 Khi nào dùng Default Export? Nguyên tắc đơn giản**

**Dùng default export khi:**
- File đó có **1 thứ chính** cần export
- Thường là **component chính** của file
- Muốn import **ngắn gọn**

**✅ Dùng default export cho:**

**1. React Components (Component chính của file):**

```jsx
// components/UserProfile.jsx
function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default UserProfile; // Component chính = default export

// Sử dụng:
import UserProfile from './components/UserProfile'; // Ngắn gọn
```

**Tại sao default cho component?**
- 1 file thường có 1 component chính
- Import component thường xuyên → cần ngắn gọn
- Dễ rename khi import

**2. Page Components (Trang):**

```jsx
// pages/Home.jsx
function Home() {
  return <div>Home page</div>;
}

export default Home; // Page chính = default export

// pages/About.jsx
function About() {
  return <div>About page</div>;
}

export default About; // Page chính = default export
```

**3. Layout Components (Bố cục):**

```jsx
// layouts/Header.jsx
function Header() {
  return <header>Site Header</header>;
}

export default Header; // Layout chính = default export
```

---

### **❌ KHÔNG dùng default export cho:**

**1. Utilities (nhiều function trong 1 file):**
```jsx
// utils/date.js - SAI nếu dùng default
function formatDate() { /* ... */ }
function getRelativeTime() { /* ... */ }
export default formatDate; // Chỉ export 1, còn getRelativeTime?

// ĐÚNG: Named exports
export function formatDate() { /* ... */ }
export function getRelativeTime() { /* ... */ }
```

**2. Constants (nhiều hằng số):**
```jsx
// constants/colors.js - SAI
export default const PRIMARY = '#007bff'; // Chỉ 1 constant?

// ĐÚNG
export const PRIMARY = '#007bff';
export const SECONDARY = '#6c757d';
export const SUCCESS = '#28a745';
```

**3. Khi file có nhiều thứ quan trọng:**
```jsx
// ❌ SAI: Chỉ export 1, còn lại?
function Button() { /* ... */ }
function validateEmail() { /* ... */ }
export default Button;

// ✅ ĐÚNG: Export cả hai
export default Button;
export { validateEmail };
```

---

## 🔥 PHẦN 4: KHI NÀO DÙNG NAMED EXPORT?

### **🎯 Khi nào dùng Named Export? Nguyên tắc đơn giản**

**Dùng named export khi:**
- File có **nhiều thứ** cần export
- Muốn **import rõ ràng** cái gì
- Thường là **utilities, constants, hooks**

**✅ Dùng named export cho:**

**1. Utility Functions (nhiều function helper):**

```jsx
// utils/date.js
export function formatDate(date) {
  return new Intl.DateTimeFormat('vi-VN').format(date);
}

export function getRelativeTime(date) {
  // logic tính thời gian tương đối
  const now = new Date();
  const diff = now - date;
  // ... return "2 giờ trước", "Hôm qua", etc
}

// utils/validation.js
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^(\+84|0)[3|5|7|8|9][0-9]{8}$/.test(phone);
}
```

**Tại sao named cho utilities?**
- 1 file utils thường có nhiều function
- Import rõ ràng: `import { formatDate } from './utils'`
- Tree-shaking: Bundle chỉ function được dùng

**2. Constants (nhiều hằng số):**

```jsx
// constants/api.js
export const API_BASE_URL = 'https://api.example.com';
export const API_TIMEOUT = 5000;
export const API_RETRIES = 3;

// constants/ui.js
export const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545'
};

export const BREAKPOINTS = {
  mobile: '576px',
  tablet: '768px',
  desktop: '992px'
};
```

**3. Custom Hooks (logic tái sử dụng):**

```jsx
// hooks/useAuth.js
export function useAuth() {
  const [user, setUser] = useState(null);
  // logic authentication
  return { user, login, logout };
}

export function useUser(userId) {
  // logic fetch user data
  return { user, loading, error };
}

// hooks/useApi.js
export function useApi(endpoint) {
  // logic API calls
  return { data, loading, error, refetch };
}
```

**4. Types/Interfaces (TypeScript):**

```jsx
// types/user.js
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}
```

---

### **❌ KHÔNG dùng named export cho:**

**1. Component chính của file:**
```jsx
// components/Button.jsx - SAI
export function Button() { /* ... */ }

// ĐÚNG
function Button() { /* ... */ }
export default Button;
```

**2. Khi chỉ có 1 thứ cần export:**
```jsx
// utils/singleHelper.js - SAI nếu chỉ 1 function
export function formatPrice() { /* ... */ }

// Có thể dùng default nếu chỉ 1
export default function formatPrice() { /* ... */ }
```

---

## 🔥 PHẦN 5: MIXED EXPORTS (Default + Named)

### **1 file có cả 2 loại:**

```jsx
// components/Form.jsx
function Form({ children }) {
  return <form>{children}</form>;
}

// Named exports cho utilities
export function validateForm(data) { /* ... */ }
export function submitForm(data) { /* ... */ }

// Default export cho component chính
export default Form;
```

**Import:**

```jsx
// Import default
import Form from './components/Form';

// Import named
import { validateForm, submitForm } from './components/Form';
```

---

## 🔥 PHẦN 6: INDEX FILES (BARREL EXPORTS)

### **Tạo file index.js để export tất cả:**

```jsx
// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { default as Modal } from './Modal';

// utils/index.js
export { formatDate, getRelativeTime } from './date';
export { isValidEmail, isValidPhone } from './validation';
export { API_BASE_URL, API_TIMEOUT } from './constants';
```

**Lợi ích:**
- Import từ 1 nơi: `import { Button, Card } from './components'`
- Dễ maintain
- Clean imports

---

## 🔥 PHẦN 7: IMPORT PATTERNS

### **1. Import Default:**

```jsx
// File: Button.jsx
function Button() { /* ... */ }
export default Button;

// Import:
import Button from './Button';
import MyButton from './Button'; // Có thể đổi tên
```

### **2. Import Named:**

```jsx
// File: utils.js
export function formatDate() { /* ... */ }
export const API_URL = 'https://...';

// Import:
import { formatDate, API_URL } from './utils';
// Hoặc đổi tên:
import { formatDate as format, API_URL as url } from './utils';
```

### **3. Import All (không khuyến khích):**

```jsx
// Import tất cả named exports
import * as Utils from './utils';

// Sử dụng:
Utils.formatDate(date);
Utils.API_URL;
```

### **4. Side Effect Import:**

```jsx
// Chỉ import để chạy code (không export gì)
import './styles.css';
import './setup.js';
```

---

## 🔥 PHẦN 8: BEST PRACTICES

### **1. 1 Component = 1 Default Export:**

```jsx
// ✅ Tốt
// Button.jsx
function Button() { /* ... */ }
export default Button;

// ❌ Không nên
// Button.jsx
export function PrimaryButton() { /* ... */ }
export function SecondaryButton() { /* ... */ }
```

### **2. Utilities = Named Exports:**

```jsx
// ✅ Tốt
// helpers.js
export function formatDate() { /* ... */ }
export function formatPrice() { /* ... */ }

// ❌ Không nên
// helpers.js
function formatDate() { /* ... */ }
function formatPrice() { /* ... */ }
export default { formatDate, formatPrice };
```

### **3. Consistent Naming:**

```jsx
// ✅ Tốt - tên file khớp tên component
// Button.jsx → export default Button
// UserCard.jsx → export default UserCard

// ❌ Không nên
// btn.jsx → export default Button
// user.jsx → export default UserCard
```

---

## 🔥 PHẦN 9: LỖI THƯỜNG GẶP

### **❌ Lỗi 1: Import sai cách**

```jsx
// File: Button.jsx
function Button() { /* ... */ }
export default Button;

// ❌ Sai
import { Button } from './Button'; // Lỗi: Button is not exported

// ✅ Đúng
import Button from './Button';
```

### **❌ Lỗi 2: Export sai cách**

```jsx
// ❌ Sai
export default function Button() { /* ... */ }
export default function Card() { /* ... */ } // Lỗi: chỉ 1 default export

// ✅ Đúng
export default function Button() { /* ... */ }

// Card.jsx
export default function Card() { /* ... */ }
```

### **❌ Lỗi 3: Import không cần thiết**

```jsx
// ❌ Import nhưng không dùng
import React from 'react'; // React 17+ không cần
import Button from './Button'; // Nhưng không dùng Button

// ✅ Chỉ import cái cần dùng
import { useState } from 'react';
import Button from './Button';
```

---

## ⚡ BÀI TẬP NHANH (5 phút)

### **Bài 1: Chọn loại export phù hợp**

```jsx
// Với mỗi trường hợp, chọn default hay named export:

// 1. React Component: UserProfile
// 2. Utility function: formatDate
// 3. Constant: API_BASE_URL
// 4. Custom hook: useAuth
// 5. Page component: HomePage
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Nguyên tắc lựa chọn</summary>

**Default export:**
- React components
- Page components
- Layout components
- 1 file có 1 thứ chính

**Named export:**
- Utility functions
- Constants
- Custom hooks
- 1 file có nhiều thứ
</details>

<details>
<summary>Đáp án chi tiết</summary>

```jsx
// 1. React Component: UserProfile → Default export
//    Vì là component chính của file UserProfile.jsx

// 2. Utility function: formatDate → Named export
//    Vì là helper function, file utils thường có nhiều function

// 3. Constant: API_BASE_URL → Named export
//    Vì constants thường nhóm nhiều cái trong 1 file

// 4. Custom hook: useAuth → Named export
//    Vì hooks thường có nhiều hook trong 1 file

// 5. Page component: HomePage → Default export
//    Vì là page chính của file Home.jsx
```
</details>

---

### **Bài 2: Sửa lỗi import/export**

```jsx
// Code có lỗi - hãy sửa:

// utils.js
function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ';
}
export default formatPrice;

// helpers.js
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function validatePhone(phone) {
  return /^(\+84|0)[3|5|7|8|9][0-9]{8}$/.test(phone);
}

// App.jsx
import formatPrice from './utils'; // ❌ Sai cách import
import validateEmail from './helpers'; // ❌ Sai
import validatePhone from './helpers'; // ❌ Sai
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Phân tích exports</summary>

```jsx
// utils.js: export DEFAULT formatPrice
// → Import: import formatPrice from './utils'

// helpers.js: export NAMED validateEmail, validatePhone
// → Import: import { validateEmail, validatePhone } from './helpers'
```
</details>

<details>
<summary>Bước 2: Sửa import trong App.jsx</summary>

```jsx
// App.jsx - sửa import
import formatPrice from './utils'; // ✅ Đúng (default)
import { validateEmail, validatePhone } from './helpers'; // ✅ Đúng (named)
```
</details>

---

### **Bài 3: Tạo index file**

```jsx
// Tạo file components/index.js để export:
// - Button (default từ ./Button)
// - Card (default từ ./Card)
// - Input (default từ ./Input)
// - formatDate (named từ ./utils/date)
// - API_URL (named từ ./utils/api)
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Export default components</summary>

```jsx
// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
```
</details>

<details>
<summary>Bước 2: Export named utilities</summary>

```jsx
// components/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';
export { formatDate } from './utils/date';
export { API_URL } from './utils/api';
```
</details>

<details>
<summary>Bước 3: Cách sử dụng</summary>

```jsx
// Sử dụng:
import { Button, Card, formatDate, API_URL } from './components';

// Tất cả imports từ 1 nơi, clean!
```
</details>

---

## 📊 BẢNG TRA CỨU NHANH

| Loại | Export Syntax | Import Syntax | Khi nào dùng |
|------|---------------|---------------|--------------|
| **Default** | `export default Component` | `import Component from './file'` | Component chính của file |
| **Named** | `export { function }` | `import { function } from './file'` | Utilities, constants, hooks |
| **Mixed** | `export default Main; export { util }` | `import Main from './file'; import { util } from './file'` | Component + utilities |

### **Best Practices:**

| ✅ Khuyên dùng | ❌ Tránh |
|---------------|----------|
| Default cho components | Named cho components |
| Named cho utilities | Default cho utilities |
| Index files | Deep imports |
| Consistent naming | Inconsistent patterns |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu default vs named export
- [ ] Biết khi nào dùng loại nào
- [ ] Biết cách import đúng
- [ ] Hiểu index files
- [ ] Tránh được lỗi thường gặp
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Component composition basics (component trong component)"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về import/export"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**