# Logical Operators (&& và ||)

## 1. Tổng Quan

**Logical Operators** là toán tử logic dùng để render có điều kiện trong React:

| Operator | Tên | Khi Nào Dùng | Ví Dụ |
|----------|-----|--------------|-------|
| `&&` | AND | Chỉ render khi điều kiện `true` | `{isLoggedIn && <Dashboard />}` |
| `||` | OR | Render giá trị đầu tiên truthy | `{username || 'Guest'}` |
| `??` | Nullish Coalescing | Fallback cho `null`/`undefined` | `{count ?? 0}` |

---

## 2. AND Operator (&&) - Render Có Điều Kiện

### Cách Hoạt Động:
```javascript
true && 'Hello'   // → 'Hello'
false && 'Hello'  // → false (không render gì)
```

### Ví Dụ Cơ Bản:

```jsx
function Notification() {
  const hasNewMessages = true;

  return (
    <div>
      <h2>Inbox</h2>
      {/* Chỉ hiển thị khi có tin nhắn mới */}
      {hasNewMessages && <p style={{ color: 'red' }}>You have new messages! 📧</p>}
    </div>
  );
}
```

**So sánh với Ternary:**
```jsx
// ❌ Dài dòng với ternary
{hasNewMessages ? <p>New messages!</p> : null}

// ✅ Ngắn gọn với &&
{hasNewMessages && <p>New messages!</p>}
```

---

## 3. Ví Dụ Thực Tế với &&

### A. Show/Hide Elements

```jsx
function UserPanel() {
  const isAdmin = true;
  const isPremium = false;

  return (
    <div>
      <h2>User Panel</h2>
      
      {/* Chỉ admin mới thấy */}
      {isAdmin && (
        <button style={{ backgroundColor: 'red', color: 'white' }}>
          🔧 Admin Settings
        </button>
      )}

      {/* Chỉ premium user mới thấy */}
      {isPremium && (
        <div style={{ backgroundColor: 'gold', padding: '10px' }}>
          ⭐ Premium Features Unlocked!
        </div>
      )}

      {/* Hiển thị upgrade nếu KHÔNG phải premium */}
      {!isPremium && (
        <button>Upgrade to Premium 🚀</button>
      )}
    </div>
  );
}
```

### B. Conditional Content

```jsx
function ProductList() {
  const products = ['Laptop', 'Phone', 'Tablet'];
  const isEmpty = products.length === 0;

  return (
    <div>
      <h2>Products</h2>
      
      {/* Hiển thị nếu có sản phẩm */}
      {products.length > 0 && (
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      )}

      {/* Hiển thị nếu rỗng */}
      {isEmpty && <p style={{ color: 'gray' }}>No products available 📦</p>}
    </div>
  );
}
```

---

## 4. OR Operator (||) - Fallback Values

### Cách Hoạt Động:
```javascript
'John' || 'Guest'    // → 'John'
'' || 'Guest'        // → 'Guest'
null || 'Default'    // → 'Default'
0 || 100            // → 100 (cẩn thận với 0!)
```

### Ví Dụ:

```jsx
function UserGreeting() {
  const username = ''; // Empty string
  const score = 0;     // Zero

  return (
    <div>
      {/* Hiển thị username hoặc 'Guest' */}
      <h2>Hello, {username || 'Guest'}! 👋</h2>

      {/* ⚠️ CẢNH BÁO: 0 bị coi là falsy! */}
      <p>Score: {score || 'No score'}</p>
      {/* Output: "Score: No score" ❌ */}
    </div>
  );
}
```

---

## 5. Nullish Coalescing (??) - Fix vấn đề của ||

**Vấn đề của `||`**: Coi `0`, `''`, `false` là falsy

**Giải pháp `??`**: Chỉ check `null` và `undefined`

```jsx
function ScoreDisplay() {
  const score = 0;
  const name = '';
  const data = null;

  return (
    <div>
      {/* || operator - SAI với số 0 */}
      <p>Score with ||: {score || 'No score'}</p>
      {/* Output: "No score" ❌ */}

      {/* ?? operator - ĐÚNG với số 0 */}
      <p>Score with ??: {score ?? 'No score'}</p>
      {/* Output: "0" ✅ */}

      {/* || coi empty string là falsy */}
      <p>Name with ||: {name || 'Anonymous'}</p>
      {/* Output: "Anonymous" */}

      {/* ?? giữ nguyên empty string */}
      <p>Name with ??: {name ?? 'Anonymous'}</p>
      {/* Output: "" (empty) */}

      {/* Cả 2 đều cho kết quả giống nhau với null */}
      <p>Data: {data ?? 'No data'}</p>
      {/* Output: "No data" ✅ */}
    </div>
  );
}
```

---

## 6. Multiple Conditions với &&

```jsx
function Dashboard() {
  const isLoggedIn = true;
  const hasPermission = true;
  const isVerified = true;

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Tất cả điều kiện phải TRUE */}
      {isLoggedIn && hasPermission && isVerified && (
        <div style={{ padding: '20px', backgroundColor: '#d4edda' }}>
          <h3>✅ Full Access Granted</h3>
          <p>You can see everything!</p>
        </div>
      )}

      {/* Ít nhất 1 điều kiện FALSE */}
      {(!isLoggedIn || !hasPermission || !isVerified) && (
        <div style={{ padding: '20px', backgroundColor: '#f8d7da' }}>
          <h3>⛔ Access Denied</h3>
          <p>Please complete all requirements.</p>
        </div>
      )}
    </div>
  );
}
```

---

## 7. Combining && và ||

```jsx
function CommentSection() {
  const comments = ['Great!', 'Nice work!'];
  const isLoading = false;
  const error = null;

  return (
    <div>
      <h2>Comments</h2>

      {/* Hiển thị loading */}
      {isLoading && <p>Loading comments... ⏳</p>}

      {/* Hiển thị error */}
      {error && <p style={{ color: 'red' }}>Error: {error} ❌</p>}

      {/* Hiển thị comments hoặc empty message */}
      {!isLoading && !error && (
        comments.length > 0 ? (
          <ul>
            {comments.map((comment, i) => (
              <li key={i}>{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first! 💬</p>
        )
      )}
    </div>
  );
}
```

---

## 8. Common Patterns

### Pattern 1: Show/Hide Button

```jsx
function TodoItem() {
  const isCompleted = false;
  const showDeleteButton = true;

  return (
    <div>
      <span>Learn React</span>
      
      {!isCompleted && <button>Complete ✅</button>}
      {isCompleted && <span style={{ color: 'green' }}>Done! ✓</span>}
      {showDeleteButton && <button>Delete 🗑️</button>}
    </div>
  );
}
```

### Pattern 2: Array Length Check

```jsx
function ItemList() {
  const items = ['Item 1', 'Item 2'];

  return (
    <div>
      {/* Hiển thị count nếu có items */}
      {items.length > 0 && <p>Total: {items.length} items</p>}

      {/* Hiển thị list nếu có items */}
      {items.length > 0 && (
        <ul>
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}

      {/* Hiển thị empty state */}
      {items.length === 0 && <p>No items found</p>}
    </div>
  );
}
```

### Pattern 3: User Authentication

```jsx
function Header() {
  const user = { name: 'John', avatar: '👤' };
  const isLoggedIn = true;

  return (
    <header>
      <h1>My App</h1>
      
      {isLoggedIn && user ? (
        <div>
          <span>{user.avatar}</span>
          <span>{user.name}</span>
          <button>Logout</button>
        </div>
      ) : (
        <button>Login</button>
      )}
    </header>
  );
}
```

---

## 9. ⚠️ Pitfalls (Những Lỗi Thường Gặp)

### Pitfall 1: Số 0 với &&

```jsx
function BadExample() {
  const count = 0;

  return (
    <div>
      {/* ❌ SAI - Render số 0 ra màn hình */}
      {count && <p>You have {count} items</p>}
      {/* Output: "0" (không phải là gì cả) */}

      {/* ✅ ĐÚNG - Check rõ ràng */}
      {count > 0 && <p>You have {count} items</p>}
      {/* Output: không hiển thị gì */}
    </div>
  );
}
```

### Pitfall 2: Empty String

```jsx
function AnotherBadExample() {
  const name = '';

  return (
    <div>
      {/* ❌ Không hiển thị gì */}
      {name && <p>Hello, {name}</p>}

      {/* ✅ ĐÚNG - Check length */}
      {name.length > 0 && <p>Hello, {name}</p>}
    </div>
  );
}
```

### Pitfall 3: Nested Objects

```jsx
function NestedExample() {
  const user = null;

  return (
    <div>
      {/* ❌ ERROR - Cannot read property 'name' of null */}
      {user && <p>{user.name}</p>}

      {/* ✅ ĐÚNG - Optional chaining */}
      {user?.name && <p>{user.name}</p>}
    </div>
  );
}
```

---

## 10. When to Use What?

| Tình Huống | Nên Dùng | Ví Dụ |
|-----------|----------|-------|
| Hiển thị khi `true` | `&&` | `{isLoggedIn && <Dashboard />}` |
| Hiển thị khi `false` | `!condition &&` | `{!isLoggedIn && <Login />}` |
| 2 lựa chọn | Ternary `? :` | `{isDay ? '☀️' : '🌙'}` |
| Fallback text | `||` hoặc `??` | `{name || 'Guest'}` |
| Fallback cho số | `??` | `{count ?? 0}` |
| Nhiều điều kiện | Combine | `{a && b && <Component />}` |

---

## 11. Best Practices ✅

1. **Luôn check rõ ràng với numbers:**
   ```jsx
   {count > 0 && <Message />}  // ✅
   {count && <Message />}       // ❌
   ```

2. **Dùng `??` cho numbers và booleans:**
   ```jsx
   {score ?? 'No score'}  // ✅
   {score || 'No score'}  // ❌ (sai với 0)
   ```

3. **Wrap JSX nhiều dòng trong `()`:**
   ```jsx
   {isTrue && (
     <div>
       <h1>Title</h1>
       <p>Content</p>
     </div>
   )}
   ```

4. **Tránh logic phức tạp trong JSX:**
   ```jsx
   // ❌ Khó đọc
   {a && b && !c && d.length > 0 && <Component />}

   // ✅ Dễ đọc
   const shouldShow = a && b && !c && d.length > 0;
   {shouldShow && <Component />}
   ```

---

## 🎯 Key Takeaways

1. **`&&`** = Render khi điều kiện `true`
2. **`||`** = Fallback value (cẩn thận với `0`, `''`, `false`)
3. **`??`** = Fallback chỉ cho `null`/`undefined` (an toàn hơn `||`)
4. **Check rõ ràng** với numbers: `count > 0 &&`
5. **Optional chaining** với nested objects: `user?.name &&`
6. **Combine operators** cho logic phức tạp
7. **Extract logic** ra variables khi quá phức tạp

---

Bạn đã hiểu rõ về Logical Operators chưa? Mình có thể tạo file **interactive demo** với tất cả ví dụ như trước không? 🚀