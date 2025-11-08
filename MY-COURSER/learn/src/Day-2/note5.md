# ⚡ COMPONENT COMPOSITION BASICS (COMPONENT TRONG COMPONENT) - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Component Composition = Xây dựng component phức tạp từ component đơn giản**

**3 cách chính:**
1. **Children Props**: `<Component>{children}</Component>`
2. **Props Drilling**: Truyền props qua nhiều tầng
3. **Render Props**: Truyền function làm prop

---

## 🔥 PHẦN 1: CHILDREN PROPS - CƠ BẢN

### **🔍 Children Props là gì? Tại sao dùng để compose?**

**Children props = Nội dung bên trong thẻ mở và đóng của component.**

**Cách đơn giản nhất để compose components:**

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>Tiêu đề</h2>
      <p>Nội dung bài viết...</p>
      <button>Đọc thêm</button>
    </Card>
  );
}
```

**Phân tích TỪNG KÝ TỰ:**

**1. `function Card({ children })`:**
- `children`: Prop đặc biệt chứa nội dung bên trong thẻ
- Không cần khai báo trong destructuring, React tự động truyền

**2. `{children}`:**
- Hiển thị nội dung được truyền vào
- Có thể là text, JSX, hoặc component khác

**3. Trong JSX:**
```jsx
<Card>
  <h2>Tiêu đề</h2>    {/* Đây là children */}
  <p>Nội dung...</p>   {/* Cũng là children */}
  <button>Đọc thêm</button> {/* Và cái này nữa */}
</Card>
```

**Kết quả HTML:**

```html
<div class="card">
  <h2>Tiêu đề</h2>
  <p>Nội dung bài viết...</p>
  <button>Đọc thêm</button>
</div>
```

**Tại sao dùng children props?**
- **Flexible**: Component có thể chứa bất kỳ nội dung gì
- **Reusable**: Card có thể wrap text, form, image...
- **Clean**: Không cần truyền nhiều props riêng lẻ

---

### **❌ LỖI PHỔ BIẾN:**

**❌ Lỗi 1: Quên {children}**
```jsx
function Card({ children }) {
  return (
    <div className="card">
      {/* Quên {children} → nội dung không hiển thị */}
    </div>
  );
}
```

**✅ Đúng:**
```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children} {/* Phải có cái này */}
    </div>
  );
}
```

**❌ Lỗi 2: Truyền children như prop thường**
```jsx
// SAI: Truyền như prop thường
<Card children={<h2>Title</h2>} />

// ĐÚNG: Dùng children syntax
<Card>
  <h2>Title</h2>
</Card>
```

**❌ Lỗi 3: Children không phải JSX**
```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children} {/* OK nếu children là JSX */}
    </div>
  );
}

// Nhưng nếu children là string:
<Card>"Đây là string"</Card> // OK

// Nếu children là number:
<Card>{42}</Card> // OK

// Nếu children là object:
<Card>{{ name: 'John' }}</Card> // LỖI: Objects are not valid as a React child
```
---

## 🔥 PHẦN 2: COMPONENT TRONG COMPONENT

### **🔍 Tại sao component trong component? Học từ best practice**

**Component composition = Xây component lớn từ nhiều component nhỏ.**

### **1. Basic Composition (Cơ bản):**

```jsx
function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
      <UserMenu />
    </header>
  );
}

function Logo() {
  return <img src="logo.png" alt="Logo" />;
}

function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  );
}

function UserMenu() {
  return (
    <div className="user-menu">
      <Avatar />
      <span>John Doe</span>
    </div>
  );
}
```

**Tại sao composition tốt?**
- **Separation of concerns**: Mỗi component làm 1 việc
- **Reusable**: Logo có thể dùng ở nhiều chỗ
- **Maintainable**: Sửa Logo không ảnh hưởng Header
- **Testable**: Test từng component riêng

### **2. Props Flow (Truyền props):**

```jsx
function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <ProductImage image={product.image} />
      <ProductInfo name={product.name} price={product.price} />
      <AddToCartButton productId={product.id} />
    </div>
  );
}

function ProductImage({ image }) {
  return <img src={image} alt="Product" />;
}

function ProductInfo({ name, price }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{price}đ</p>
    </div>
  );
}

function AddToCartButton({ productId }) {
  function handleClick() {
    console.log(`Add product ${productId} to cart`);
  }

  return <button onClick={handleClick}>Thêm vào giỏ</button>;
}
```

**Data flow:**
```
ProductList
  ↓ (products array)
ProductCard (product object)
  ↓ (product.image)
ProductImage
  ↓ (product.name, product.price)
ProductInfo
  ↓ (product.id)
AddToCartButton
```

**Lợi ích:**
- **Single source of truth**: Data từ ProductList
- **Props drilling**: Truyền xuống các component con
- **Controlled components**: Parent quản lý state

---

## 🔥 PHẦN 3: SPECIALIZED COMPONENTS

### **1. Layout Components:**

```jsx
function PageLayout({ children }) {
  return (
    <div className="page">
      <Header />
      <main className="content">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
    </PageLayout>
  );
}

function AboutPage() {
  return (
    <PageLayout>
      <AboutHero />
      <TeamSection />
      <ContactSection />
    </PageLayout>
  );
}
```

### **2. Container Components:**

```jsx
function UserContainer({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(user => {
      setUser(user);
      setLoading(false);
    });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return <UserProfile user={user} />;
}

function UserProfile({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## 🔥 PHẦN 4: CONDITIONAL COMPOSITION

### **1. Conditional Children:**

```jsx
function Alert({ type, children }) {
  const alertClass = `alert alert-${type}`;
  
  return (
    <div className={alertClass}>
      {type === 'error' && <span>❌</span>}
      {type === 'success' && <span>✅</span>}
      {type === 'warning' && <span>⚠️</span>}
      {children}
    </div>
  );
}

// Usage
<Alert type="success">
  Đăng ký thành công!
</Alert>

<Alert type="error">
  Có lỗi xảy ra. Vui lòng thử lại.
</Alert>
```

### **2. Optional Components:**

```jsx
function ProductCard({ product, showActions = true }) {
  return (
    <div className="product-card">
      <ProductImage image={product.image} />
      <ProductInfo product={product} />
      {showActions && <ProductActions product={product} />}
    </div>
  );
}

function ProductActions({ product }) {
  return (
    <div className="product-actions">
      <button>Add to Cart</button>
      <button>Add to Wishlist</button>
    </div>
  );
}
```

---

## 🔥 PHẦN 5: COMPOSITION PATTERNS

### **1. Compound Components:**

```jsx
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) => 
        React.cloneElement(child, { 
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        })
      )}
    </div>
  );
}

function Tab({ children, isActive, onClick }) {
  return (
    <button 
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Usage
<Tabs>
  <Tab>Home</Tab>
  <Tab>About</Tab>
  <Tab>Contact</Tab>
</Tabs>
```

### **2. Render Props:**

```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  function handleMouseMove(event) {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  }
  
  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage
<MouseTracker 
  render={({ x, y }) => (
    <div>
      Mouse position: {x}, {y}
    </div>
  )}
/>
```

---

## 🔥 PHẦN 6: PROPS DRILLING VÀ CONTEXT

### **1. Props Drilling Problem:**

```jsx
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeProvider theme={theme} setTheme={setTheme}>
      <Header theme={theme} setTheme={setTheme} />
    </ThemeProvider>
  );
}

function ThemeProvider({ theme, setTheme, children }) {
  return (
    <div className={`theme-${theme}`}>
      {children}
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </div>
  );
}

function Header({ theme, setTheme }) {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle theme={theme} setTheme={setTheme} />
    </header>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

### **2. Solution with Context (sẽ học sau):**

```jsx
const ThemeContext = React.createContext();

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

---

## 🔥 PHẦN 7: BEST PRACTICES

### **1. Keep Components Small:**

```jsx
// ✅ Tốt - Components nhỏ, tập trung
function ProductCard({ product }) {
  return (
    <Card>
      <ProductImage image={product.image} />
      <ProductDetails product={product} />
      <ProductActions product={product} />
    </Card>
  );
}

// ❌ Không nên - Component quá lớn
function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <div>
          <button>Add to Cart</button>
          <button>Add to Wishlist</button>
          <button>Share</button>
        </div>
      </div>
    </div>
  );
}
```

### **2. Use Meaningful Names:**

```jsx
// ✅ Tốt
function BlogPost({ post }) {
  return (
    <article>
      <BlogPostHeader post={post} />
      <BlogPostContent content={post.content} />
      <BlogPostFooter post={post} />
    </article>
  );
}

// ❌ Không rõ ràng
function Post({ data }) {
  return (
    <div>
      <Header info={data} />
      <Content text={data.text} />
      <Footer meta={data} />
    </div>
  );
}
```

### **3. Prefer Composition over Inheritance:**

```jsx
// ✅ Composition
function IconButton({ icon, children, ...props }) {
  return (
    <button {...props}>
      <Icon name={icon} />
      {children}
    </button>
  );
}

// ❌ Inheritance (không khuyến khích trong React)
class IconButton extends React.Component {
  render() {
    return (
      <button>
        <Icon name={this.props.icon} />
        {this.props.children}
      </button>
    );
  }
}
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Tạo Card Component với composition**

```jsx
// Yêu cầu: Tạo Card component có thể chứa bất kỳ nội dung nào
// Sử dụng children props

function Card({ children }) {
  // TODO: Implement
}

function App() {
  return (
    <Card>
      <h2>Tiêu đề</h2>
      <p>Nội dung</p>
    </Card>
  );
}
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Tạo Card component cơ bản</summary>

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {/* TODO: Hiển thị children */}
    </div>
  );
}
```
</details>

<details>
<summary>Bước 2: Thêm {children}</summary>

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children} {/* Hiển thị nội dung được truyền vào */}
    </div>
  );
}
```
</details>

<details>
<summary>Bước 3: Thêm styling</summary>

```jsx
function Card({ children }) {
  return (
    <div className="card" style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      margin: 16
    }}>
      {children}
    </div>
  );
}

function App() {
  return (
    <Card>
      <h2>Tiêu đề</h2>
      <p>Nội dung</p>
    </Card>
  );
}
```
</details>

---

### **Bài 2: Product List với composition**

```jsx
// Yêu cầu: Tạo ProductList và ProductCard
// ProductList chứa nhiều ProductCard
// Mỗi ProductCard hiển thị thông tin sản phẩm

const products = [
  { id: 1, name: 'Laptop', price: 20000000 },
  { id: 2, name: 'Mouse', price: 500000 }
];

function ProductList({ products }) {
  // TODO: Implement
}

function ProductCard({ product }) {
  // TODO: Implement
}
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Tạo ProductCard</summary>

```jsx
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Giá: {product.price.toLocaleString()}đ</p>
      <button>Thêm vào giỏ</button>
    </div>
  );
}
```
</details>

<details>
<summary>Bước 2: Tạo ProductList với map</summary>

```jsx
function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```
</details>

<details>
<summary>Bước 3: Thêm styling</summary>

```jsx
function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card" style={{
      border: '1px solid #ddd',
      padding: 16,
      margin: 8,
      borderRadius: 8
    }}>
      <h3>{product.name}</h3>
      <p>Giá: {product.price.toLocaleString()}đ</p>
      <button>Thêm vào giỏ</button>
    </div>
  );
}
```
</details>

---

### **Bài 3: Layout với composition**

```jsx
// Yêu cầu: Tạo PageLayout component
// Có Header, main content, Footer
// Sử dụng children cho phần main

function PageLayout({ children }) {
  // TODO: Implement
}

function Header() {
  return <header style={{ background: '#333', color: 'white', padding: 16 }}>Header</header>;
}

function Footer() {
  return <footer style={{ background: '#333', color: 'white', padding: 16 }}>Footer</footer>;
}

function HomePage() {
  return (
    <PageLayout>
      <h1>Home Page Content</h1>
      <p>Welcome to our website!</p>
    </PageLayout>
  );
}
```

**🔍 Gợi ý từng bước:**

<details>
<summary>Bước 1: Tạo PageLayout với children</summary>

```jsx
function PageLayout({ children }) {
  return (
    <div>
      {/* TODO: Thêm Header */}
      {/* TODO: Thêm main với children */}
      {/* TODO: Thêm Footer */}
    </div>
  );
}
```
</details>

<details>
<summary>Bước 2: Thêm Header và Footer</summary>

```jsx
function PageLayout({ children }) {
  return (
    <div>
      <Header />
      {/* TODO: Thêm main với children */}
      <Footer />
    </div>
  );
}
```
</details>

<details>
<summary>Bước 3: Thêm main content với children</summary>

```jsx
function PageLayout({ children }) {
  return (
    <div>
      <Header />
      <main style={{ padding: 20, minHeight: '60vh' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return <header style={{ background: '#333', color: 'white', padding: 16 }}>Header</header>;
}

function Footer() {
  return <footer style={{ background: '#333', color: 'white', padding: 16 }}>Footer</footer>;
}

function HomePage() {
  return (
    <PageLayout>
      <h1>Home Page Content</h1>
      <p>Welcome to our website!</p>
    </PageLayout>
  );
}
```
</details>

---

## 📊 BẢNG TRA CỨU NHANH

| Pattern | Khi nào dùng | Ví dụ |
|---------|--------------|-------|
| **Children Props** | Component wrapper đơn giản | `<Card>{content}</Card>` |
| **Props Passing** | Truyền data xuống component con | `<ProductCard product={product} />` |
| **Conditional Rendering** | Hiển thị component theo điều kiện | `{show && <Component />}` |
| **Compound Components** | Nhóm components liên quan | `<Tabs><Tab>Home</Tab></Tabs>` |
| **Render Props** | Chia sẻ logic giữa components | `<Mouse render={pos => <div>{pos.x}</div>} />` |

### **Composition Principles:**

| ✅ Best Practice | ❌ Anti-pattern |
|------------------|-----------------|
| Small, focused components | Large, monolithic components |
| Clear component boundaries | Tight coupling |
| Flexible APIs | Rigid structures |
| Reusable pieces | One-off implementations |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu children props
- [ ] Biết cách compose components
- [ ] Biết props drilling
- [ ] Hiểu render props pattern
- [ ] Biết best practices
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Khi nào nên tách component mới"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về component composition"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**