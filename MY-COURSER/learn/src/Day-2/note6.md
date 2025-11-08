# ⚡ KHI NÀO NÊN TÁCH COMPONENT MỚI - PHIÊN BẢN NHANH

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **3 dấu hiệu cần tách component:**
1. **Reusability**: Code được dùng lại nhiều chỗ
2. **Complexity**: Component quá 50 dòng hoặc có nhiều logic
3. **Single Responsibility**: Component làm quá nhiều việc

**✅ Nguyên tắc: 1 component = 1 responsibility**

---

## 🔥 PHẦN 1: SINGLE RESPONSIBILITY PRINCIPLE

### **🔍 Tại sao 1 component chỉ làm 1 việc? Học từ anti-pattern**

**Single Responsibility = 1 component = 1 trách nhiệm chính**

**❌ Anti-pattern: Component làm nhiều việc (God Component)**

```jsx
// ❌ TỆ: Component làm 5 việc cùng lúc
function UserManagement() {
  // Việc 1: Quản lý state (fetch data)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Việc 2: Xử lý form (add user)
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Việc 3: Validation
  const [errors, setErrors] = useState({});

  // Việc 4: Filter/search
  const [searchTerm, setSearchTerm] = useState('');

  // Việc 5: Render UI phức tạp
  return (
    <div>
      {/* Form add user */}
      {/* Search input */}
      {/* User list với filter */}
      {/* Loading states */}
      {/* Error handling */}
    </div>
  );
}
```

**Vấn đề:**
- **Khó hiểu**: Đọc code không biết component làm gì
- **Khó test**: Test cả 5 chức năng cùng lúc
- **Khó reuse**: Không thể dùng riêng phần nào
- **Dễ break**: Sửa 1 chức năng ảnh hưởng các chức năng khác
- **Merge conflict**: Nhiều người sửa cùng file

**✅ Best practice: Tách thành components nhỏ, mỗi cái 1 trách nhiệm**

```jsx
// ✅ TỐT: Mỗi component 1 trách nhiệm
function UserManagement() {
  return (
    <div>
      <AddUserForm />
      <UserSearch />
      <UserList />
    </div>
  );
}

// Component 1: Chỉ thêm user
function AddUserForm() {
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  // Chỉ logic form
}

// Component 2: Chỉ search
function UserSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  // Chỉ logic search
}

// Component 3: Chỉ hiển thị list
function UserList({ users, loading }) {
  // Chỉ render UI
}
```

**Lợi ích:**
- **Dễ hiểu**: Mỗi component rõ ràng mục đích
- **Dễ test**: Test từng chức năng riêng
- **Dễ reuse**: Dùng AddUserForm ở trang khác
- **Ít bug**: Sửa search không ảnh hưởng add user
- **Ít conflict**: Mỗi người sửa component riêng

---

### **🎯 Nguyên tắc áp dụng:**

**1. Container vs Presentational:**
```jsx
// Container: Quản lý data & logic
function UserListContainer() {
  const [users, loading] = useUsers(); // Hook lấy data
  return <UserListView users={users} loading={loading} />;
}

// Presentational: Chỉ render UI
function UserListView({ users, loading }) {
  if (loading) return <div>Loading...</div>;
  return <ul>{users.map(user => <li>{user.name}</li>)}</ul>;
}
```

**2. Hooks để tách logic:**
```jsx
// Tách logic ra hook
function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  return { users, loading };
}

// Component chỉ render
function UserList() {
  const { users, loading } = useUsers();
  return <UserListView users={users} loading={loading} />;
}
```

---

## 🔥 PHẦN 2: ĐẤU HIỆU CẦN TÁCH COMPONENT

### **1. Component quá dài (> 50 dòng):**

```jsx
// ❌ Quá dài - 80+ dòng
function ProductPage({ product }) {
  return (
    <div>
      <div className="hero">
        <img src={product.image} alt={product.name} />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>
      
      <div className="pricing">
        <h2>Giá: {product.price}đ</h2>
        <button>Add to Cart</button>
        <button>Add to Wishlist</button>
      </div>
      
      <div className="reviews">
        <h3>Đánh giá ({product.reviews.length})</h3>
        {product.reviews.map(review => (
          <div key={review.id}>
            <div className="review-header">
              <img src={review.user.avatar} alt={review.user.name} />
              <div>
                <strong>{review.user.name}</strong>
                <div className="stars">
                  {'⭐'.repeat(review.rating)}
                </div>
              </div>
            </div>
            <p>{review.comment}</p>
            <small>{review.date}</small>
          </div>
        ))}
      </div>
      
      <div className="related-products">
        <h3>Sản phẩm liên quan</h3>
        {/* More complex code... */}
      </div>
    </div>
  );
}

// ✅ Tách thành components nhỏ
function ProductPage({ product }) {
  return (
    <div>
      <ProductHero product={product} />
      <ProductPricing product={product} />
      <ProductReviews reviews={product.reviews} />
      <RelatedProducts products={product.related} />
    </div>
  );
}

function ProductHero({ product }) {
  return (
    <div className="hero">
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}

function ProductPricing({ product }) {
  return (
    <div className="pricing">
      <h2>Giá: {product.price}đ</h2>
      <button>Add to Cart</button>
      <button>Add to Wishlist</button>
    </div>
  );
}

function ProductReviews({ reviews }) {
  return (
    <div className="reviews">
      <h3>Đánh giá ({reviews.length})</h3>
      {reviews.map(review => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
}

function ReviewItem({ review }) {
  return (
    <div className="review-item">
      <ReviewHeader review={review} />
      <p>{review.comment}</p>
      <small>{review.date}</small>
    </div>
  );
}
```

---

### **2. Code được lặp lại:**

```jsx
// ❌ Lặp lại code
function Dashboard() {
  return (
    <div>
      <div className="stat-card">
        <h3>Users</h3>
        <p className="stat-number">1,234</p>
        <span className="stat-change positive">+12%</span>
      </div>
      
      <div className="stat-card">
        <h3>Revenue</h3>
        <p className="stat-number">$45,678</p>
        <span className="stat-change positive">+8%</span>
      </div>
      
      <div className="stat-card">
        <h3>Orders</h3>
        <p className="stat-number">567</p>
        <span className="stat-change negative">-3%</span>
      </div>
    </div>
  );
}

// ✅ Tách thành reusable component
function Dashboard() {
  const stats = [
    { title: 'Users', value: '1,234', change: '+12%', type: 'positive' },
    { title: 'Revenue', value: '$45,678', change: '+8%', type: 'positive' },
    { title: 'Orders', value: '567', change: '-3%', type: 'negative' }
  ];
  
  return (
    <div>
      {stats.map(stat => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}

function StatCard({ title, value, change, type }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="stat-number">{value}</p>
      <span className={`stat-change ${type}`}>
        {change}
      </span>
    </div>
  );
}
```

---

### **3. Logic phức tạp (useEffect, state management):**

```jsx
// ❌ Component làm quá nhiều việc
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  useEffect(() => {
    fetchUsers().then(setUsers).catch(setError).finally(() => setLoading(false));
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'email') return a.email.localeCompare(b.email);
    return 0;
  });
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <input 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search users..."
      />
      <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="email">Sort by Email</option>
      </select>
      
      {sortedUsers.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

// ✅ Tách thành container + presentational components
function UserList() {
  return (
    <UserListContainer>
      {({ users, loading, error, searchTerm, setSearchTerm, sortBy, setSortBy }) => (
        <UserListView 
          users={users}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}
    </UserListContainer>
  );
}

function UserListContainer({ children }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
  useEffect(() => {
    fetchUsers().then(setUsers).catch(setError).finally(() => setLoading(false));
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'email') return a.email.localeCompare(b.email);
    return 0;
  });
  
  return children({
    users: sortedUsers,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy
  });
}

function UserListView({ 
  users, 
  loading, 
  error, 
  searchTerm, 
  onSearchChange, 
  sortBy, 
  onSortChange 
}) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <UserSearch 
        value={searchTerm} 
        onChange={onSearchChange} 
      />
      <UserSort 
        value={sortBy} 
        onChange={onSortChange} 
      />
      
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}

function UserSearch({ value, onChange }) {
  return (
    <input 
      value={value} 
      onChange={e => onChange(e.target.value)}
      placeholder="Search users..."
    />
  );
}

function UserSort({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="name">Sort by Name</option>
      <option value="email">Sort by Email</option>
    </select>
  );
}

function UserItem({ user }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## 🔥 PHẦN 3: KHI KHÔNG NÊN TÁCH COMPONENT

### **1. Component quá nhỏ (< 10 dòng):**

```jsx
// ❌ Không cần tách - quá nhỏ
function UserAvatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />;
}

// ✅ Để trong component chính
function UserProfile({ user }) {
  return (
    <div>
      <img src={user.avatar} alt={user.name} className="avatar" />
      <h3>{user.name}</h3>
    </div>
  );
}
```

### **2. Component chỉ dùng 1 lần:**

```jsx
// ❌ Tách component chỉ dùng 1 lần
function SpecialBanner() {
  return <div className="special-banner">Special Offer!</div>;
}

function HomePage() {
  return (
    <div>
      <SpecialBanner />
      {/* other content */}
    </div>
  );
}

// ✅ Để inline
function HomePage() {
  return (
    <div>
      <div className="special-banner">Special Offer!</div>
      {/* other content */}
    </div>
  );
}
```

### **3. Logic quá đơn giản:**

```jsx
// ❌ Tách component chỉ để wrap text
function HighlightedText({ children }) {
  return <span className="highlight">{children}</span>;
}

// ✅ Dùng trực tiếp
function Article() {
  return (
    <p>
      This is <span className="highlight">important</span> text.
    </p>
  );
}
```

---

## 🔥 PHẦN 4: REFACTORING PATTERNS

### **1. Extract Method Pattern:**

```jsx
// Trước khi refactor
function ProductCard({ product }) {
  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div>
        <span>{product.price}đ</span>
        <button>Add to Cart</button>
      </div>
      <div>
        Rating: {'⭐'.repeat(product.rating)}
      </div>
    </div>
  );
}

// Sau khi refactor
function ProductCard({ product }) {
  return (
    <div>
      <ProductImage product={product} />
      <ProductInfo product={product} />
      <ProductActions product={product} />
      <ProductRating rating={product.rating} />
    </div>
  );
}

function ProductImage({ product }) {
  return <img src={product.image} alt={product.name} />;
}

function ProductInfo({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
    </div>
  );
}

function ProductActions({ product }) {
  return (
    <div>
      <span>{product.price}đ</span>
      <button>Add to Cart</button>
    </div>
  );
}

function ProductRating({ rating }) {
  return <div>Rating: {'⭐'.repeat(rating)}</div>;
}
```

### **2. Extract State Pattern:**

```jsx
// Trước
function ComplexForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  // Validation logic...
  // Submit logic...
  
  return (
    <form>
      {/* Many input fields */}
    </form>
  );
}

// Sau
function ComplexForm() {
  return (
    <FormStateManager>
      {({ formData, errors, handleChange, handleSubmit }) => (
        <FormView 
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </FormStateManager>
  );
}

function FormStateManager({ children }) {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  // Validation logic...
  // Submit logic...
  
  return children({
    formData,
    errors,
    handleChange: (field, value) => setFormData({...formData, [field]: value}),
    handleSubmit: (data) => console.log('Submit:', data)
  });
}

function FormView({ formData, errors, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {/* Input fields */}
    </form>
  );
}
```

---

## 🔥 PHẦN 5: TESTING CONSIDERATIONS

### **1. Testability:**

```jsx
// ✅ Dễ test - component nhỏ, focused
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={onToggle}
      />
      <span style={{ 
        textDecoration: todo.completed ? 'line-through' : 'none' 
      }}>
        {todo.text}
      </span>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

// ❌ Khó test - logic phức tạp
function TodoList({ todos }) {
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });
  
  // More complex logic...
  
  return (
    <div>
      {/* Complex UI */}
    </div>
  );
}
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Phân tích và refactor**

```jsx
// Component này có vấn đề gì? Khi nào nên tách?

function BlogPost({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  
  useEffect(() => {
    fetchComments(post.id).then(setComments);
  }, [post.id]);
  
  function handleLike() {
    setLikes(likes + 1);
    // API call...
  }
  
  function handleComment(newComment) {
    setComments([...comments, newComment]);
    // API call...
  }
  
  return (
    <article>
      <header>
        <h2>{post.title}</h2>
        <div>
          <span>{post.author}</span>
          <time>{post.date}</time>
        </div>
      </header>
      
      <div>{post.content}</div>
      
      <footer>
        <button onClick={handleLike}>
          👍 {likes}
        </button>
        <button onClick={() => setShowComments(!showComments)}>
          💬 {comments.length}
        </button>
        
        {showComments && (
          <div>
            {comments.map(comment => (
              <div key={comment.id}>
                <strong>{comment.author}:</strong> {comment.text}
              </div>
            ))}
            
            <form onSubmit={handleComment}>
              <input type="text" placeholder="Viết bình luận..." />
              <button type="submit">Gửi</button>
            </form>
          </div>
        )}
      </footer>
    </article>
  );
}
```

**Yêu cầu:** Xác định các vấn đề và đề xuất cách refactor

<details>
<summary>👉 Phân tích vấn đề</summary>

**Vấn đề:**
1. Component quá dài (> 50 dòng)
2. Quá nhiều responsibilities: display, state management, API calls
3. Logic phức tạp: likes, comments, form handling
4. Khó test và maintain

**Giải pháp:**
- Tách thành BlogPost (container) + BlogPostView (presentational)
- Tách CommentSection thành component riêng
- Tách CommentForm thành component riêng
- Tách LikeButton thành component riêng
</details>

---

### **Bài 2: Tách component từ code lặp lại**

```jsx
// Code có lặp lại - hãy refactor

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="metric">
        <h3>Total Users</h3>
        <div className="value">1,234</div>
        <div className="change positive">+12%</div>
      </div>
      
      <div className="metric">
        <h3>Total Sales</h3>
        <div className="value">$45,678</div>
        <div className="change positive">+8%</div>
      </div>
      
      <div className="metric">
        <h3>Total Orders</h3>
        <div className="value">567</div>
        <div className="change negative">-3%</div>
      </div>
      
      <div className="metric">
        <h3>Conversion Rate</h3>
        <div className="value">3.2%</div>
        <div className="change positive">+0.5%</div>
      </div>
    </div>
  );
}
```

**Yêu cầu:** Tách thành MetricCard component

<details>
<summary>👉 Đáp án</summary>

```jsx
function Dashboard() {
  const metrics = [
    { title: 'Total Users', value: '1,234', change: '+12%', type: 'positive' },
    { title: 'Total Sales', value: '$45,678', change: '+8%', type: 'positive' },
    { title: 'Total Orders', value: '567', change: '-3%', type: 'negative' },
    { title: 'Conversion Rate', value: '3.2%', change: '+0.5%', type: 'positive' }
  ];
  
  return (
    <div className="dashboard">
      {metrics.map(metric => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}

function MetricCard({ title, value, change, type }) {
  return (
    <div className="metric">
      <h3>{title}</h3>
      <div className="value">{value}</div>
      <div className={`change ${type}`}>{change}</div>
    </div>
  );
}
```
</details>

---

### **Bài 3: Xác định khi nào KHÔNG nên tách**

```jsx
// Các trường hợp sau có nên tách component không?

// Case 1: Button đơn giản
function SubmitButton() {
  return <button type="submit">Submit</button>;
}

// Case 2: Loading spinner
function LoadingSpinner() {
  return <div className="spinner">Loading...</div>;
}

// Case 3: Error message
function ErrorMessage({ message }) {
  return <div className="error">{message}</div>;
}

// Case 4: Wrapper div
function Container({ children }) {
  return <div className="container">{children}</div>;
}
```

**Yêu cầu:** Đánh giá từng case

<details>
<summary>👉 Đánh giá</summary>

**Case 1: SubmitButton**
- ❌ KHÔNG nên tách - quá đơn giản, chỉ dùng 1 lần có thể inline

**Case 2: LoadingSpinner**  
- ✅ Nên tách - có thể reuse nhiều chỗ, có styling riêng

**Case 3: ErrorMessage**
- ✅ Nên tách - có thể reuse, nhận props message

**Case 4: Container**
- ❌ KHÔNG nên tách - chỉ là wrapper, có thể dùng styled div trực tiếp
</details>

---

## 📊 BẢNG TRA CỨU NHANH

| Dấu hiệu | Nên tách | Không nên tách |
|----------|----------|----------------|
| **Dài > 50 dòng** | ✅ | ❌ |
| **Reuse > 2 lần** | ✅ | ❌ |
| **Nhiều responsibilities** | ✅ | ❌ |
| **Complex state/logic** | ✅ | ❌ |
| **Dài < 10 dòng** | ❌ | ✅ |
| **Chỉ dùng 1 lần** | ❌ | ✅ |
| **Logic đơn giản** | ❌ | ✅ |

### **Refactoring Checklist:**

- [ ] Component có single responsibility?
- [ ] Component có thể reuse được?
- [ ] Component dễ test?
- [ ] Component dễ maintain?
- [ ] Props interface rõ ràng?

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu Single Responsibility Principle
- [ ] Nhận biết dấu hiệu cần tách component
- [ ] Biết khi nào KHÔNG nên tách
- [ ] Biết các refactoring patterns
- [ ] Xem xét testing khi tách component
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Practice: Refactor JSX exercises thành separate components"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm bài tập về khi nào nên tách component"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**