# ⚡ PROPS CONCEPT & DATA FLOW - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Props = Properties = Thuộc tính của component**

**Props là cách React truyền data từ parent component xuống child component.**

```jsx
// Parent component
function App() {
  const userName = "Minh";
  return <Greeting name={userName} />;
}

// Child component
function Greeting({ name }) {
  return <h1>Xin chào {name}!</h1>;
}
```

---

## 🔥 PHẦN 1: TẠI SAO CẦN PROPS?

### **🔍 Tại sao components cần giao tiếp với nhau?**

**Vấn đề:** Components cần data từ bên ngoài để hiển thị

```jsx
// ❌ SAI: Component cứng nhắc, không linh hoạt
function UserCard() {
  return (
    <div>
      <h2>Nguyễn Văn A</h2>
      <p>Developer</p>
      <p>nguyenvana@email.com</p>
    </div>
  );
}

// ✅ ĐÚNG: Component linh hoạt với props
function UserCard({ name, role, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{email}</p>
    </div>
  );
}

// Sử dụng:
<UserCard name="Nguyễn Văn A" role="Developer" email="nguyenvana@email.com" />
<UserCard name="Trần Thị B" role="Designer" email="tranthib@email.com" />
```

**Lợi ích của props:**
- ✅ **Reusable**: 1 component dùng cho nhiều data khác nhau
- ✅ **Maintainable**: Thay đổi data không cần sửa component
- ✅ **Testable**: Test component với data khác nhau
- ✅ **Flexible**: Component thích ứng với data đầu vào

---

## 🔥 PHẦN 2: DATA FLOW TRONG REACT

### **🔍 Unidirectional Data Flow (Luồng data 1 chiều)**

**Data chỉ chảy từ parent → child, KHÔNG ngược lại**

```jsx
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <CounterDisplay count={count} />  {/* Parent → Child */}
      <CounterButton onIncrement={() => setCount(count + 1)} /> {/* Function xuống */}
    </div>
  );
}

function CounterDisplay({ count }) {
  return <p>Giá trị hiện tại: {count}</p>; // Chỉ nhận, không thay đổi
}

function CounterButton({ onIncrement }) {
  return <button onClick={onIncrement}>Tăng</button>; // Gọi function từ parent
}
```

**Quy tắc:**
- 🔽 **Parent** quản lý state
- 🔽 **Parent** truyền data xuống children qua props
- 🔼 **Children** báo lên parent qua callback functions
- 🚫 **Children** KHÔNG được thay đổi props trực tiếp

---

## 🔥 PHẦN 3: TRUYỀN VÀ NHẬN PROPS CƠ BẢN

### **1. Truyền props (Parent)**

```jsx
function Parent() {
  const message = "Hello World";
  const number = 42;
  const isActive = true;

  return (
    <Child
      message={message}      // String
      number={number}        // Number
      isActive={isActive}    // Boolean
    />
  );
}
```

### **2. Nhận props (Child)**

```jsx
function Child({ message, number, isActive }) {
  return (
    <div>
      <p>{message}</p>
      <p>Number: {number}</p>
      <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
}
```

**Lưu ý:**
- ✅ Tên prop phải khớp: `message={message}` → `{ message }`
- ✅ Có thể đổi tên: `text={message}` → `{ text }`
- ✅ Props là read-only: KHÔNG được `message = "new value"`

---

## 🔥 PHẦN 4: PROPS DESTRUCTURING PATTERNS

### **🔍 Tại sao cần destructuring? Code ngắn hơn, rõ ràng hơn**

```jsx
// ❌ Không destructuring - dài dòng
function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.role}</p>
      <p>{props.email}</p>
    </div>
  );
}

// ✅ Destructuring - ngắn gọn
function UserCard({ name, role, email }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{role}</p>
      <p>{email}</p>
    </div>
  );
}
```

### **Các patterns destructuring:**

**1. Basic destructuring:**
```jsx
function Component({ prop1, prop2, prop3 }) {
  // ...
}
```

**2. Default values:**
```jsx
function Button({ text, variant = 'primary', disabled = false }) {
  // variant mặc định là 'primary' nếu không truyền
  // disabled mặc định là false
}
```

**3. Rename props:**
```jsx
function Image({ src: imageUrl, alt: altText }) {
  // src được đổi tên thành imageUrl
  // alt được đổi tên thành altText
  return <img src={imageUrl} alt={altText} />;
}
```

**4. Rest props:**
```jsx
function Button({ variant, ...otherProps }) {
  // variant được tách ra
  // otherProps chứa tất cả props còn lại
  return <button className={`btn-${variant}`} {...otherProps} />;
}
```

---

## 🔥 PHẦN 5: PROPS VỚI OBJECTS VÀ ARRAYS

### **1. Props là object:**

```jsx
function App() {
  const user = {
    name: "Minh",
    age: 25,
    email: "minh@example.com"
  };

  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Tuổi: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

### **2. Props là array:**

```jsx
function App() {
  const hobbies = ["Đọc sách", "Chơi nhạc", "Đi du lịch"];

  return <HobbyList hobbies={hobbies} />;
}

function HobbyList({ hobbies }) {
  return (
    <ul>
      {hobbies.map((hobby, index) => (
        <li key={index}>{hobby}</li>
      ))}
    </ul>
  );
}
```

### **3. Props là nested object/array:**

```jsx
function App() {
  const product = {
    name: "Laptop",
    price: 20000000,
    specs: {
      cpu: "i7",
      ram: "16GB",
      storage: "512GB"
    },
    reviews: [
      { id: 1, rating: 5, comment: "Tuyệt vời!" },
      { id: 2, rating: 4, comment: "Tốt" }
    ]
  };

  return <ProductDetail product={product} />;
}

function ProductDetail({ product }) {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>Giá: {product.price.toLocaleString()}đ</p>

      <h3>Thông số:</h3>
      <ul>
        <li>CPU: {product.specs.cpu}</li>
        <li>RAM: {product.specs.ram}</li>
        <li>Storage: {product.specs.storage}</li>
      </ul>

      <h3>Đánh giá:</h3>
      {product.reviews.map(review => (
        <div key={review.id}>
          <p>Rating: {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔥 PHẦN 6: PROPS VỚI FUNCTIONS (EVENT HANDLERS PREVIEW)

### **🔍 Function props = Callback để child báo lên parent**

```jsx
function App() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <CounterButton onClick={handleIncrement} />
    </div>
  );
}

function CounterButton({ onClick }) {
  return <button onClick={onClick}>Tăng</button>;
}
```

**Cách hoạt động:**
1. Parent tạo function `handleIncrement`
2. Parent truyền xuống child: `onClick={handleIncrement}`
3. Child gọi function khi click: `onClick()`
4. Parent state được cập nhật

---

## 🔥 PHẦN 7: DEFAULT PROPS PATTERNS

### **🔍 Default props khi không truyền prop**

```jsx
// Cách 1: Destructuring với default value
function Button({ text, variant = 'primary', size = 'medium' }) {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      {text}
    </button>
  );
}

// Cách 2: defaultProps (legacy)
function Button({ text, variant, size }) {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  variant: 'primary',
  size: 'medium'
};
```

**Khi nào dùng default props:**
- ✅ Component có prop optional
- ✅ Muốn behavior mặc định
- ✅ Tránh undefined errors

---

## 🔥 PHẦN 8: CHILDREN PROPS (CƠ BẢN)

### **🔍 Children = Nội dung bên trong thẻ component**

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Sử dụng:
<Card>
  <h2>Tiêu đề</h2>
  <p>Nội dung</p>
  <button>Action</button>
</Card>
```

**Children có thể là:**
- Text: `<Card>Hello</Card>`
- JSX: `<Card><h1>Title</h1></Card>`
- Component: `<Card><MyComponent /></Card>`
- Array: `<Card>{items.map(item => <Item key={item.id} />)}</Card>`

---

## 🔥 PHẦN 9: COMMON PROPS MISTAKES & DEBUG

### **❌ Lỗi phổ biến:**

**1. Truyền sai kiểu dữ liệu:**
```jsx
// ❌ Sai: Truyền string thay vì number
<Counter initialValue="5" /> // "5" là string

// ✅ Đúng:
<Counter initialValue={5} /> // 5 là number
```

**2. Quên destructuring:**
```jsx
// ❌ Sai: Dùng props.prop thay vì { prop }
function Component(props) {
  return <h1>{props.title}</h1>; // Dài dòng
}

// ✅ Đúng:
function Component({ title }) {
  return <h1>{title}</h1>; // Ngắn gọn
}
```

**3. Thay đổi props trực tiếp:**
```jsx
// ❌ Sai: Mutate props
function Component({ user }) {
  user.name = "New Name"; // KHÔNG ĐƯỢC!
  return <h1>{user.name}</h1>;
}

// ✅ Đúng: Tạo copy hoặc dùng callback
function Component({ user, onUpdate }) {
  const handleUpdate = () => {
    onUpdate({ ...user, name: "New Name" });
  };
}
```

**4. Props undefined:**
```jsx
// ❌ Sai: Không check undefined
function UserCard({ user }) {
  return <h2>{user.name}</h2>; // Lỗi nếu user = undefined
}

// ✅ Đúng: Check hoặc default
function UserCard({ user }) {
  if (!user) return <div>No user</div>;
  return <h2>{user.name}</h2>;
}
```

### **🔧 Cách debug props:**

**1. Console.log props:**
```jsx
function Component(props) {
  console.log('Props received:', props);
  return <div>...</div>;
}
```

**2. React DevTools:**
- Mở DevTools → Components tab
- Click vào component → xem props

**3. PropTypes (optional):**
```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age }) {
  return <div>{name} - {age}</div>;
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number
};
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Props cơ bản**

```jsx
// Tạo component Welcome nhận props name và age
function Welcome({ name, age }) {
  return (
    <div>
      <h1>Chào mừng {name}!</h1>
      <p>Bạn {age} tuổi.</p>
    </div>
  );
}

// Sử dụng:
<Welcome name="Minh" age={25} />
```

### **Bài 2: Props với object**

```jsx
// Tạo component ProductCard nhận props product (object)
function ProductCard({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Giá: {product.price}đ</p>
    </div>
  );
}

// Sử dụng:
const laptop = { name: "Laptop", description: "Gaming laptop", price: 20000000 };
<ProductCard product={laptop} />
```

### **Bài 3: Props với array**

```jsx
// Tạo component TagList nhận props tags (array)
function TagList({ tags }) {
  return (
    <div>
      {tags.map((tag, index) => (
        <span key={index} className="tag">{tag}</span>
      ))}
    </div>
  );
}

// Sử dụng:
<TagList tags={["React", "JavaScript", "Frontend"]} />
```

### **Bài 4: Default props**

```jsx
// Tạo component Button với default props
function Button({ text, variant = 'primary', disabled = false }) {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

// Sử dụng:
<Button text="Click me" /> // variant = 'primary', disabled = false
<Button text="Delete" variant="danger" /> // disabled = false
```

### **Bài 5: Children props**

```jsx
// Tạo component Modal nhận children
function Modal({ children }) {
  return (
    <div className="modal">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}

// Sử dụng:
<Modal>
  <h2>Xác nhận</h2>
  <p>Bạn có chắc chắn muốn xóa?</p>
  <button>OK</button>
  <button>Cancel</button>
</Modal>
```

---

## 📊 BẢNG TRA CỨU NHANH

| Prop Type | Cách truyền | Cách nhận | Ví dụ |
|-----------|-------------|-----------|-------|
| String | `text="Hello"` | `{ text }` | `<Greeting text="Hi" />` |
| Number | `count={5}` | `{ count }` | `<Counter count={5} />` |
| Boolean | `disabled={true}` | `{ disabled }` | `<Button disabled={true} />` |
| Object | `user={userObj}` | `{ user }` | `<Profile user={userObj} />` |
| Array | `items={arr}` | `{ items }` | `<List items={arr} />` |
| Function | `onClick={fn}` | `{ onClick }` | `<Btn onClick={handleClick} />` |
| Children | `<Comp>JSX</Comp>` | `{ children }` | `<Card><h1>Title</h1></Card>` |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu props là gì và tại sao cần
- [ ] Biết unidirectional data flow
- [ ] Biết cách truyền và nhận props cơ bản
- [ ] Thành thạo destructuring patterns
- [ ] Biết xử lý props với objects/arrays
- [ ] Hiểu function props (callbacks)
- [ ] Biết dùng default props
- [ ] Hiểu children props
- [ ] Tránh được common mistakes
- [ ] Làm được 5 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Props với functions và event handlers"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về props patterns"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**