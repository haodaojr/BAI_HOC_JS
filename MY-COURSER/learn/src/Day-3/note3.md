# ⚡ PROPS VALIDATION & DEBUGGING - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Props Validation = Kiểm tra tính hợp lệ của props**

**Đảm bảo components nhận đúng kiểu dữ liệu:**

```jsx
// Với PropTypes
import PropTypes from 'prop-types';

function UserCard({ name, age, isActive }) {
  return <div>...</div>;
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isActive: PropTypes.bool
};
```

---

## 🔥 PHẦN 1: TẠI SAO CẦN PROPS VALIDATION?

### **🔍 Vấn đề: Runtime errors do props sai kiểu**

```jsx
// ❌ Không validation - dễ lỗi runtime
function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>        {/* Lỗi nếu user = undefined */}
      <p>Tuổi: {user.age}</p>     {/* Lỗi nếu age = string */}
      <p>Active: {user.isActive ? 'Yes' : 'No'}</p>
    </div>
  );
}

// Sử dụng sai:
<UserCard user={undefined} /> // Lỗi: Cannot read property 'name'
<UserCard user={{ name: "Minh", age: "25" }} /> // Lỗi: "25" + tuổi logic sai
```

**Validation giúp:**
- ✅ Phát hiện lỗi sớm trong development
- ✅ Cung cấp warning rõ ràng
- ✅ Tài liệu cho component API
- ✅ Tránh runtime crashes

---

## 🔥 PHẦN 2: PROPTYPES BASICS

### **1. Cài đặt PropTypes:**

```bash
npm install prop-types
```

### **2. Basic Validation:**

```jsx
import PropTypes from 'prop-types';

function Greeting({ name, age, isStudent }) {
  return (
    <div>
      <h1>Chào {name}!</h1>
      <p>Tuổi: {age}</p>
      <p>{isStudent ? 'Học sinh' : 'Không phải học sinh'}</p>
    </div>
  );
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,    // Bắt buộc
  age: PropTypes.number,                // Tùy chọn
  isStudent: PropTypes.bool             // Tùy chọn
};
```

### **3. Các kiểu dữ liệu phổ biến:**

```jsx
Component.propTypes = {
  // Primitive types
  name: PropTypes.string,
  age: PropTypes.number,
  isActive: PropTypes.bool,

  // Required
  id: PropTypes.string.isRequired,

  // Objects
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string.isRequired
  }),

  // Arrays
  tags: PropTypes.arrayOf(PropTypes.string),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string
    })
  ),

  // Functions
  onClick: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,

  // Any type
  data: PropTypes.any,

  // Specific values
  status: PropTypes.oneOf(['pending', 'approved', 'rejected']),
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
```

---

## 🔥 PHẦN 3: ADVANCED VALIDATION PATTERNS

### **1. Custom Validation Functions:**

```jsx
function isValidEmail(props, propName, componentName) {
  const value = props[propName];

  if (!value) return null; // Optional prop

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected a valid email.`
    );
  }

  return null;
}

function UserForm({ email, age }) {
  return <form>...</form>;
}

UserForm.propTypes = {
  email: isValidEmail,
  age: function(props, propName, componentName) {
    const value = props[propName];

    if (value < 0 || value > 150) {
      return new Error(
        `${propName} must be between 0 and 150 in ${componentName}`
      );
    }
  }
};
```

### **2. Complex Object Validation:**

```jsx
const productShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  category: PropTypes.oneOf(['electronics', 'books', 'clothing']),
  tags: PropTypes.arrayOf(PropTypes.string),
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string
    })
  )
});

function ProductCard({ product }) {
  return <div>...</div>;
}

ProductCard.propTypes = {
  product: productShape.isRequired
};
```

---

## 🔥 PHẦN 4: DEFAULT PROPS

### **1. defaultProps (Legacy way):**

```jsx
function Button({ text, variant, size }) {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Button.defaultProps = {
  variant: 'primary',
  size: 'medium'
};
```

### **2. Modern way (Destructuring defaults):**

```jsx
function Button({
  text,
  variant = 'primary',
  size = 'medium'
}) {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
```

**Ưu tiên destructuring defaults vì:**
- ✅ Ít code hơn
- ✅ Không cần defaultProps riêng
- ✅ TypeScript friendly

---

## 🔥 PHẦN 5: DEBUGGING PROPS ISSUES

### **1. Console Logging:**

```jsx
function DebugComponent(props) {
  console.log('Props received:', props);
  console.log('Prop types:', DebugComponent.propTypes);

  return <div>Check console!</div>;
}
```

### **2. React DevTools:**

- Mở Chrome DevTools → Components tab
- Click vào component → xem Props panel
- Xem warnings trong Console

### **3. Common Error Patterns:**

```jsx
// ❌ Lỗi: Prop undefined
<UserCard user={undefined} /> // Warning: user is required

// ❌ Lỗi: Sai type
<UserCard age="25" /> // Warning: age should be number

// ❌ Lỗi: Invalid value
<Button variant="tertiary" /> // Warning: variant should be oneOf ['primary', 'secondary']
```

### **4. Conditional Validation:**

```jsx
function Component({ type, value }) {
  // Validation logic có thể phức tạp
  if (type === 'email' && value && !value.includes('@')) {
    console.warn('Invalid email format');
  }

  return <div>...</div>;
}
```

---

## 🔥 PHẦN 6: TYPESCRIPT ALTERNATIVE

### **1. TypeScript Interfaces:**

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  age?: number; // Optional
}

interface UserCardProps {
  user: User;
  showEmail?: boolean;
  onEdit?: (user: User) => void;
}

function UserCard({ user, showEmail = false, onEdit }: UserCardProps) {
  return (
    <div>
      <h2>{user.name}</h2>
      {showEmail && <p>{user.email}</p>}
      {user.age && <p>Age: {user.age}</p>}
      {onEdit && <button onClick={() => onEdit(user)}>Edit</button>}
    </div>
  );
}
```

### **2. TypeScript vs PropTypes:**

| Aspect | PropTypes | TypeScript |
|--------|-----------|------------|
| **Runtime** | ✅ Có validation runtime | ❌ Chỉ compile-time |
| **Setup** | Cần install package | Cần config TypeScript |
| **Performance** | Chậm hơn (dev only) | Nhanh (compile-time) |
| **DX** | Warnings trong console | Errors trong IDE |
| **Bundle size** | Tăng (dev only) | Không tăng |

---

## 🔥 PHẦN 7: BEST PRACTICES

### **1. Always validate required props:**

```jsx
// ✅ Tốt
Component.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

// ❌ Không nên
Component.propTypes = {
  title: PropTypes.string, // Có thể undefined
  onClick: PropTypes.func  // Có thể undefined
};
```

### **2. Use specific types:**

```jsx
// ✅ Tốt - Cụ thể
status: PropTypes.oneOf(['active', 'inactive', 'pending'])

// ❌ Không nên - Quá rộng
status: PropTypes.any
```

### **3. Document complex props:**

```jsx
// Sử dụng JSDoc cho complex props
/**
 * @param {Object} product - Product object
 * @param {string} product.id - Unique identifier
 * @param {string} product.name - Product name
 * @param {number} product.price - Price in VND
 */
function ProductCard({ product }) {
  // ...
}
```

### **4. Combine with defaultProps:**

```jsx
function Select({ options, value, onChange, placeholder = 'Chọn...' }) {
  return (
    <select value={value} onChange={onChange}>
      <option value="">{placeholder}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Basic PropTypes**

```jsx
// Thêm PropTypes cho component sau
function UserProfile({ user, showStats }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      {showStats && (
        <div>
          <p>Posts: {user.posts}</p>
          <p>Followers: {user.followers}</p>
        </div>
      )}
    </div>
  );
}

// TODO: Thêm PropTypes
// user: shape với name (string, required), email (string), posts (number), followers (number)
// showStats: boolean, default false
```

### **Bài 2: Custom Validation**

```jsx
// Tạo custom validator cho password
function isStrongPassword(props, propName, componentName) {
  // TODO: Validate password có ít nhất 8 ký tự, có chữ hoa, chữ thường, số
}

// Sử dụng:
function SignupForm({ password }) {
  return <input type="password" value={password} />;
}

SignupForm.propTypes = {
  password: isStrongPassword
};
```

### **Bài 3: Complex Object Validation**

```jsx
// Validate shopping cart
const cartItemShape = PropTypes.shape({
  // TODO: id (string, required), name (string, required), price (number, required), quantity (number, min 1)
});

function ShoppingCart({ items, total }) {
  return (
    <div>
      <h2>Giỏ hàng</h2>
      {items.map(item => (
        <div key={item.id}>
          {item.name} - {item.price}đ x {item.quantity}
        </div>
      ))}
      <p>Tổng: {total}đ</p>
    </div>
  );
}

// TODO: Thêm PropTypes cho items (arrayOf cartItemShape) và total (number)
```

---

## 📊 BẢNG TRA CỨU NHANH

| Validation Type | Syntax | Example |
|-----------------|--------|---------|
| **Required** | `.isRequired` | `PropTypes.string.isRequired` |
| **Optional** | `PropTypes.type` | `PropTypes.string` |
| **One of values** | `.oneOf([...])` | `PropTypes.oneOf(['small', 'large'])` |
| **One of types** | `.oneOfType([...])` | `PropTypes.oneOfType([PropTypes.string, PropTypes.number])` |
| **Array of** | `.arrayOf(type)` | `PropTypes.arrayOf(PropTypes.string)` |
| **Object shape** | `.shape({...})` | `PropTypes.shape({name: PropTypes.string})` |
| **Custom** | `function(props, propName, componentName)` | Custom validation function |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu tại sao cần props validation
- [ ] Biết cách dùng PropTypes cơ bản
- [ ] Thành thạo advanced validation patterns
- [ ] Biết dùng defaultProps
- [ ] Có kỹ năng debug props issues
- [ ] Biết TypeScript alternative
- [ ] Tuân thủ best practices
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Practice: Tạo 10+ components với props variations"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về props validation"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**