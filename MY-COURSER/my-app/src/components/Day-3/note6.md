# Keys Importance và Best Practices

## 1. Tại Sao Keys Quan Trọng Trong React?

**Keys** là unique identifier giúp React **theo dõi và quản lý** các elements trong list một cách hiệu quả.

### Vấn Đề Nếu Không Có Keys

```jsx
// ❌ KHÔNG CÓ KEY - React không biết element nào thay đổi
function BadList() {
  const [items, setItems] = useState(['A', 'B', 'C']);

  const addItem = () => {
    setItems(['D', ...items]); // Thêm 'D' vào đầu
  };

  return (
    <div>
      <button onClick={addItem}>Add D</button>
      {items.map(item => (
        <div>{item}</div> // ❌ Không có key!
      ))}
    </div>
  );
}
```

**Hậu quả:**
- React phải re-render toàn bộ list
- UI có thể không update đúng
- Performance kém với list lớn
- React warning trong console

### ✅ Giải Pháp Với Keys

```jsx
// ✅ CÓ KEY - React biết chính xác element nào thay đổi
function GoodList() {
  const [items, setItems] = useState([
    { id: 1, text: 'A' },
    { id: 2, text: 'B' },
    { id: 3, text: 'C' }
  ]);

  const addItem = () => {
    setItems([{ id: 4, text: 'D' }, ...items]);
  };

  return (
    <div>
      <button onClick={addItem}>Add D</button>
      {items.map(item => (
        <div key={item.id}>{item.text}</div> // ✅ Có key!
      ))}
    </div>
  );
}
```

**Lợi ích:**
- React chỉ re-render element mới
- UI update chính xác
- Performance tối ưu
- Không có warning

---

## 2. Cách Keys Hoạt Động Bên Trong React

### Reconciliation Algorithm

React sử dụng **Virtual DOM** để so sánh:
1. **Current Virtual DOM** (trước khi update)
2. **New Virtual DOM** (sau khi update)

Keys giúp React:
- **Identify** elements (xác định element nào)
- **Track changes** (theo dõi thay đổi)
- **Minimize re-renders** (tối thiểu re-render)

### Ví Dụ Minh Họa

```jsx
// Trước khi update
<div key="1">A</div>
<div key="2">B</div>
<div key="3">C</div>

// Sau khi thêm 'D' vào đầu
<div key="4">D</div>  // ← Element mới
<div key="1">A</div>  // ← Element cũ, không thay đổi
<div key="2">B</div>  // ← Element cũ, không thay đổi
<div key="3">C</div>  // ← Element cũ, không thay đổi
```

**React biết:**
- Key "4" là element mới → render mới
- Keys "1", "2", "3" vẫn tồn tại → không re-render

---

## 3. Best Practices Cho Keys

### ✅ Nên Dùng:

**1. ID từ Database (Tốt nhất):**
```jsx
const users = [
  { id: 123, name: 'John' },
  { id: 456, name: 'Jane' }
];

{users.map(user => (
  <div key={user.id}>{user.name}</div>
))}
```

**2. UUID hoặc Unique String:**
```jsx
const items = [
  { uuid: 'abc-123', title: 'Item 1' },
  { uuid: 'def-456', title: 'Item 2' }
];

{items.map(item => (
  <div key={item.uuid}>{item.title}</div>
))}
```

**3. Composite Keys (Cho nested data):**
```jsx
const comments = [
  { postId: 1, commentId: 101, text: 'Great!' },
  { postId: 1, commentId: 102, text: 'Nice!' }
];

{comments.map(comment => (
  <div key={`${comment.postId}-${comment.commentId}`}>
    {comment.text}
  </div>
))}
```

### ❌ Không Nên Dùng:

**1. Array Index (Trong hầu hết trường hợp):**
```jsx
// ❌ SAI - Index thay đổi khi reorder
{todos.map((todo, index) => (
  <div key={index}>{todo}</div>
))}
```

**2. Random Values:**
```jsx
// ❌ SAI - Key thay đổi mỗi render
{items.map(item => (
  <div key={Math.random()}>{item}</div>
))}
```

**3. Object Reference:**
```jsx
// ❌ SAI - Reference thay đổi
{todos.map(todo => (
  <div key={todo}>{todo.text}</div>
))}
```

---

## 4. Keys Với Các Tình Huống Đặc Biệt

### Keys Với Fragments

```jsx
import { Fragment } from 'react';

function ListWithFragments() {
  const items = ['A', 'B', 'C'];

  return (
    <div>
      {items.map(item => (
        <Fragment key={item}>
          <h3>{item}</h3>
          <p>Description for {item}</p>
        </Fragment>
      ))}
    </div>
  );
}
```

### Keys Với Conditional Rendering

```jsx
function FilteredList() {
  const [showCompleted, setShowCompleted] = useState(false);
  const todos = [
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build App', completed: false }
  ];

  const visibleTodos = showCompleted
    ? todos
    : todos.filter(todo => !todo.completed);

  return (
    <div>
      <button onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? 'Hide' : 'Show'} Completed
      </button>

      {visibleTodos.map(todo => (
        <div key={todo.id}>
          {todo.text} {todo.completed && '✅'}
        </div>
      ))}
    </div>
  );
}
```

### Keys Với Nested Components

```jsx
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' }
  ];

  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}        // ✅ Key ở parent component
          product={product}
        />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
```

**Quan trọng:** Key chỉ cần ở component gọi `map()`, không cần trong component con.

---

## 5. Keys Với Dynamic Lists

### Thêm Item

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' }
  ]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(), // ✅ Unique ID
      text: 'New Todo'
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

### Xóa Item

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build App' }
  ]);

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

### Sắp Xếp (Reorder)

```jsx
function SortableList() {
  const [items, setItems] = useState([
    { id: 1, text: 'A' },
    { id: 2, text: 'B' },
    { id: 3, text: 'C' }
  ]);

  const sortItems = () => {
    setItems([...items].sort((a, b) => b.text.localeCompare(a.text)));
  };

  return (
    <div>
      <button onClick={sortItems}>Sort Z-A</button>
      {items.map(item => (
        <div key={item.id}>{item.text}</div> // ✅ Key ổn định
      ))}
    </div>
  );
}
```

---

## 6. Performance Impact Của Keys

### Với Keys Tốt

```jsx
// ✅ Performance tốt
function OptimizedList() {
  const [items, setItems] = useState([
    { id: 1, text: 'A' },
    { id: 2, text: 'B' },
    { id: 3, text: 'C' }
  ]);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
}
```

### Với Keys Kém

```jsx
// ❌ Performance kém
function BadPerformanceList() {
  const [items, setItems] = useState(['A', 'B', 'C']);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>{item}</div> // ❌ Index thay đổi
      ))}
    </div>
  );
}
```

### Với Memoization

```jsx
import { memo } from 'react';

const TodoItem = memo(({ todo, onDelete }) => {
  console.log('Rendering:', todo.text); // Chỉ log khi props thay đổi
  return (
    <div>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build App' }
  ]);

  const deleteTodo = useCallback((id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }, [todos]);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  );
}
```

---

## 7. Debugging Key Issues

### React DevTools

1. Mở React DevTools trong browser
2. Chọn component có list
3. Xem "Rendered by" để debug re-renders

### Console Logging

```jsx
function DebugList() {
  const items = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' }
  ];

  return (
    <div>
      {items.map(item => {
        console.log('Rendering item:', item.id);
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}
```

### Key Validation

```jsx
function ValidatedList() {
  const items = [
    { id: 1, name: 'A' },
    { id: 2, name: 'B' },
    { id: 1, name: 'C' } // ❌ Duplicate ID!
  ];

  // Validate keys
  const keySet = new Set();
  const hasDuplicateKeys = items.some(item => {
    if (keySet.has(item.id)) {
      console.error('Duplicate key found:', item.id);
      return true;
    }
    keySet.add(item.id);
    return false;
  });

  return (
    <div>
      {hasDuplicateKeys && <p style={{ color: 'red' }}>Warning: Duplicate keys detected!</p>}
      {items.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

---

## 8. Common Mistakes Và Cách Sửa

### ❌ Mistake 1: Dùng Index Làm Key

**Sai:**
```jsx
{todos.map((todo, index) => (
  <div key={index}>{todo}</div>
))}
```

**Đúng:**
```jsx
{todos.map(todo => (
  <div key={todo.id}>{todo.text}</div>
))}
```

### ❌ Mistake 2: Quên Key

**Sai:**
```jsx
{items.map(item => (
  <div>{item}</div> // ❌ Missing key
))}
```

**Đúng:**
```jsx
{items.map(item => (
  <div key={item.id}>{item}</div> // ✅ Có key
))}
```

### ❌ Mistake 3: Key Thay Đổi

**Sai:**
```jsx
{items.map(item => (
  <div key={Math.random()}>{item}</div> // ❌ Key thay đổi
))}
```

**Đúng:**
```jsx
{items.map(item => (
  <div key={item.id}>{item}</div> // ✅ Key ổn định
))}
```

### ❌ Mistake 4: Key Không Unique

**Sai:**
```jsx
const items = [
  { name: 'A' },
  { name: 'A' } // Same name
];

{items.map((item, index) => (
  <div key={item.name}>{item.name}</div> // ❌ Duplicate keys
))}
```

**Đúng:**
```jsx
{items.map((item, index) => (
  <div key={`${item.name}-${index}`}>{item.name}</div> // ✅ Unique
))}
```

---

## 9. Advanced Patterns

### Lazy Loading Với Keys

```jsx
function LazyList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    const newItems = await fetchItems();
    setItems(prev => [...prev, ...newItems]);
    setLoading(false);
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}
```

### Virtual Scrolling

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`
  }));

  const Row = ({ index, style }) => (
    <div style={style} key={items[index].id}>
      {items[index].text}
    </div>
  );

  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={35}
    >
      {Row}
    </List>
  );
}
```

---

## 10. Best Practices Tổng Hợp

### ✅ Luôn Tuân Thủ:

1. **Dùng stable, unique keys:**
   ```jsx
   {items.map(item => (
     <div key={item.id}>{item.name}</div>
   ))}
   ```

2. **Dùng index chỉ cho static lists:**
   ```jsx
   {['A', 'B', 'C'].map((letter, index) => (
     <div key={index}>{letter}</div>
   ))}
   ```

3. **Tạo composite keys khi cần:**
   ```jsx
   <div key={`${parentId}-${childId}`}>{content}</div>
   ```

4. **Validate keys trong development:**
   ```jsx
   if (process.env.NODE_ENV === 'development') {
     // Check for duplicate keys
   }
   ```

5. **Monitor performance với React DevTools**

### ⚠️ Cẩn Trọng:

- **Không dùng index cho dynamic lists**
- **Không dùng random values**
- **Không dùng object references**
- **Không duplicate keys**

---

## 11. Performance Benchmarks

### Test Case: 1000 Items

| Key Type | Render Time | Re-render Time | Memory Usage |
|----------|-------------|----------------|--------------|
| **Stable ID** | 50ms | 10ms | Low |
| **Index** | 50ms | 50ms | Medium |
| **Random** | 50ms | 100ms | High |
| **No Key** | 50ms | 200ms | Very High |

### Khi Nào Keys Ảnh Hưởng Performance

- **List < 100 items**: Keys ít ảnh hưởng
- **List 100-1000 items**: Keys quan trọng
- **List > 1000 items**: Keys critical
- **Frequent updates**: Keys rất quan trọng

---

## 12. Migration Guide: Fix Existing Code

### Bước 1: Identify Lists Without Keys

```jsx
// Tìm code như này
{items.map(item => (
  <div>{item}</div> // ❌ Missing key
))}
```

### Bước 2: Add Keys

```jsx
// Thêm key
{items.map(item => (
  <div key={item.id}>{item}</div> // ✅ Added key
))}
```

### Bước 3: Verify Uniqueness

```jsx
// Kiểm tra duplicate keys
const keySet = new Set();
items.forEach(item => {
  if (keySet.has(item.id)) {
    console.warn('Duplicate key:', item.id);
  }
  keySet.add(item.id);
});
```

### Bước 4: Test Performance

```jsx
// Sử dụng React DevTools để measure
// - Render count
// - Time per render
// - Components re-rendered
```

---

## 13. FAQ - Câu Hỏi Thường Gặp

### Q: Tại sao React cần keys?

**A:** Keys giúp React identify elements khi list thay đổi, tối ưu re-rendering và maintain correct UI state.

### Q: Index có sao không?

**A:** Index OK cho static lists không thay đổi. Nhưng với dynamic lists (add/remove/sort), index gây bugs.

### Q: Tôi có thể dùng Math.random() không?

**A:** Không! Random keys thay đổi mỗi render, làm React re-render toàn bộ list.

### Q: Keys có ảnh hưởng performance không?

**A:** Có, đặc biệt với large lists. Keys tốt giúp React update chỉ elements cần thiết.

### Q: Tôi quên key thì sao?

**A:** React sẽ warning trong console và dùng index mặc định, nhưng không tối ưu.

### Q: Keys có cần globally unique không?

**A:** Không, chỉ cần unique trong cùng list. Có thể duplicate keys giữa các lists khác nhau.

---

## 🎯 Key Takeaways

1. **Keys giúp React track elements** - Cần unique và stable
2. **Dùng ID từ database** - Tốt nhất cho keys
3. **Index chỉ cho static lists** - Không dùng cho dynamic data
4. **Keys ở component gọi map()** - Không cần trong component con
5. **Performance critical với large lists** - Keys tốt = performance tốt
6. **Debug với React DevTools** - Monitor re-renders
7. **Validate keys trong development** - Catch issues sớm
8. **Consistent keys across re-renders** - Giữ nguyên để React optimize

---

Bạn đã hiểu rõ về Keys importance và best practices chưa? Muốn làm bài tập thực hành hay chuyển sang **Lists & Keys** tiếp theo? 🚀