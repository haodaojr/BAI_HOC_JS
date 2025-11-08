# Rendering Lists với map() & Keys

## 1. Tại Sao Cần Render Lists?

Trong React, bạn thường cần hiển thị **nhiều items** từ array:

```jsx
// Array dữ liệu
const products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
  { id: 3, name: 'Tablet', price: 300 }
];

// ❌ SAI - Viết thủ công từng item
function ProductList() {
  return (
    <div>
      <div>Laptop - $1000</div>
      <div>Phone - $500</div>
      <div>Tablet - $300</div>
    </div>
  );
}

// ✅ ĐÚNG - Dùng map() để render động
function ProductList() {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          {product.name} - ${product.price}
        </div>
      ))}
    </div>
  );
}
```

---

## 2. Cách Hoạt Động Của map()

**`map()`** là method của Array, tạo ra **mảng mới** từ mảng cũ:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Tạo mảng mới với mỗi phần tử nhân 2
const doubled = numbers.map(num => num * 2);
// Result: [2, 4, 6, 8, 10]

// Tạo JSX elements
const listItems = numbers.map(num => <li key={num}>{num}</li>);
// Result: [<li key="1">1</li>, <li key="2">2</li>, ...]
```

**Trong React:**
- `map()` trả về array of JSX elements
- React render tất cả elements trong array
- Mỗi element cần có **unique key**

---

## 3. Cú Pháp Cơ Bản

```jsx
function TodoList() {
  const todos = ['Learn React', 'Build App', 'Deploy'];

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
        </li>
      ))}
    </ul>
  );
}
```

**Giải thích:**
- `todo`: Item hiện tại trong array
- `index`: Vị trí của item (0, 1, 2...)
- `key={index}`: Unique identifier cho React

---

## 4. Keys Importance - Tại Sao Quan Trọng?

### Vấn Đề Nếu Không Có Keys

```jsx
// ❌ KHÔNG CÓ KEY
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

**Vấn đề:**
- React không biết element nào thay đổi
- Re-render không hiệu quả
- UI có thể không update đúng
- Performance kém với list lớn

### ✅ Giải Pháp Với Keys

```jsx
// ✅ CÓ KEY
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
- React biết chính xác element nào thay đổi
- Re-render hiệu quả
- UI update đúng
- Performance tốt

---

## 5. Best Practices Cho Keys

### ✅ Nên Dùng:

**1. ID từ database:**
```jsx
const users = [
  { id: 123, name: 'John' },
  { id: 456, name: 'Jane' }
];

{users.map(user => (
  <div key={user.id}>{user.name}</div>
))}
```

**2. UUID hoặc unique string:**
```jsx
const items = [
  { uuid: 'abc-123', title: 'Item 1' },
  { uuid: 'def-456', title: 'Item 2' }
];

{items.map(item => (
  <div key={item.uuid}>{item.title}</div>
))}
```

### ❌ Không Nên Dùng:

**1. Array index (trong hầu hết trường hợp):**
```jsx
// ❌ SAI - Index thay đổi khi reorder
{todos.map((todo, index) => (
  <div key={index}>{todo}</div>
))}
```

**2. Random values:**
```jsx
// ❌ SAI - Key thay đổi mỗi render
{todos.map(todo => (
  <div key={Math.random()}>{todo}</div>
))}
```

**3. Object reference:**
```jsx
// ❌ SAI - Reference thay đổi
{todos.map(todo => (
  <div key={todo}>{todo.text}</div>
))}
```

---

## 6. Keys Với Nested Components

```jsx
function ProductList() {
  const products = [
    { id: 1, name: 'Laptop', category: 'Electronics' },
    { id: 2, name: 'Book', category: 'Education' }
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
      <p>{product.category}</p>
    </div>
  );
}
```

**Lưu ý:** Key chỉ cần ở component gọi `map()`, không cần trong component con.

---

## 7. Keys Với Dynamic Lists

### Thêm Item

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build App' }
  ]);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(), // Unique ID
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

## 8. Keys Với Fragments

```jsx
function ListWithFragments() {
  const items = ['A', 'B', 'C'];

  return (
    <div>
      {items.map(item => (
        <React.Fragment key={item}>
          <h3>{item}</h3>
          <p>Description for {item}</p>
        </React.Fragment>
      ))}
    </div>
  );
}

// Hoặc shorthand
import { Fragment } from 'react';

{items.map(item => (
  <Fragment key={item}>
    <h3>{item}</h3>
    <p>Description for {item}</p>
  </Fragment>
))}
```

---

## 9. Keys Với Conditional Rendering

```jsx
function ConditionalList() {
  const [showCompleted, setShowCompleted] = useState(false);
  const todos = [
    { id: 1, text: 'Learn React', completed: true },
    { id: 2, text: 'Build App', completed: false },
    { id: 3, text: 'Deploy', completed: false }
  ];

  const filteredTodos = showCompleted
    ? todos
    : todos.filter(todo => !todo.completed);

  return (
    <div>
      <button onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? 'Hide' : 'Show'} Completed
      </button>

      {filteredTodos.map(todo => (
        <div key={todo.id}>
          {todo.text} {todo.completed && '✅'}
        </div>
      ))}
    </div>
  );
}
```

---

## 10. Performance Considerations

### Memoization với Lists

```jsx
import { memo } from 'react';

const TodoItem = memo(({ todo, onDelete }) => {
  console.log('Rendering:', todo.text); // Chỉ log khi re-render
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

### Virtual Scrolling cho Lists Lớn

```jsx
// Với thư viện react-window
import { FixedSizeList as List } from 'react-window';

function LargeList() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`
  }));

  const Row = ({ index, style }) => (
    <div style={style}>
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

## 11. When to Use What? - Chọn Pattern Phù Hợp

| Tình Huống | Nên Dùng | Ví Dụ |
|------------|----------|-------|
| **List đơn giản, ít thay đổi** | `map()` cơ bản | Static menu items |
| **List có filter/search** | `filter()` + `map()` | Product catalog với search |
| **List có sort** | `sort()` + `map()` | User table với sort |
| **Nested lists** | `map()` lồng nhau | Categories với products |
| **Large lists (1000+)** | Virtual scrolling | Chat messages, logs |
| **Dynamic add/remove** | Stable keys | Todo list, cart items |
| **Performance critical** | `memo()` + keys | Real-time dashboards |

---

## 12. Common Mistakes ❌

### Mistake 1: Dùng index làm key

```jsx
// ❌ SAI - Index thay đổi khi reorder
{todos.map((todo, index) => (
  <div key={index}>{todo}</div>
))}

// ✅ ĐÚNG - Dùng stable ID
{todos.map(todo => (
  <div key={todo.id}>{todo.text}</div>
))}
```

### Mistake 2: Dùng Math.random()

```jsx
// ❌ SAI - Key thay đổi mỗi render
{items.map(item => (
  <div key={Math.random()}>{item}</div>
))}

// ✅ ĐÚNG - Dùng unique identifier
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### Mistake 3: Quên key trong loops

```jsx
// ❌ SAI - React warning
{items.map(item => (
  <div>{item}</div> // Missing key!
))}

// ✅ ĐÚNG - Luôn có key
{items.map(item => (
  <div key={item.id}>{item}</div>
))}
```

### Mistake 4: Key không unique

```jsx
// ❌ SAI - Duplicate keys
{items.map(item => (
  <div key="same-key">{item}</div>
))}

// ✅ ĐÚNG - Keys unique
{items.map((item, index) => (
  <div key={`item-${index}`}>{item}</div>
))}
```

### Mistake 5: Không filter trước khi map

```jsx
// ❌ SAI - Map rồi mới filter (inefficient)
{items
  .map(item => <div key={item.id}>{item.name}</div>)
  .filter((_, index) => index < 5) // Filter JSX elements
}

// ✅ ĐÚNG - Filter data trước
{items
  .filter(item => item.visible)
  .map(item => <div key={item.id}>{item.name}</div>)
}
```

### Mistake 6: Mutate array trong map

```jsx
// ❌ SAI - Side effects trong map
{items.map(item => {
  item.viewCount++; // Mutate original array!
  return <div key={item.id}>{item.name}</div>;
})}

// ✅ ĐÚNG - Pure functions
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

---

## 13. Best Practices ✅

1. **Luôn dùng stable, unique keys:**
   ```jsx
   {items.map(item => (
     <div key={item.id}>{item.name}</div>
   ))}
   ```

2. **Dùng index chỉ khi array không thay đổi:**
   ```jsx
   // ✅ OK cho static lists
   {['A', 'B', 'C'].map((letter, index) => (
     <div key={index}>{letter}</div>
   ))}
   ```

3. **Tạo ID nếu không có:**
   ```jsx
   {items.map((item, index) => (
     <div key={`item-${index}`}>{item}</div>
   ))}
   ```

4. **Keys phải consistent across re-renders:**
   ```jsx
   // ✅ Stable key
   const itemKey = `item-${item.id}`;
   <div key={itemKey}>{item.name}</div>
   ```

5. **Filter/map/sort theo thứ tự hợp lý:**
   ```jsx
   // ✅ Filter trước, sort sau, map cuối
   {items
     .filter(item => item.active)
     .sort((a, b) => a.name.localeCompare(b.name))
     .map(item => <div key={item.id}>{item.name}</div>)
   }
   ```

6. **Debug key issues:**
   ```jsx
   // Thêm log để debug
   {items.map(item => {
     console.log('Rendering item:', item.id);
     return <div key={item.id}>{item.name}</div>;
   })}
   ```

7. **Extract complex logic:**
   ```jsx
   // ✅ Tách ra function riêng
   const visibleItems = items.filter(item => item.visible);

   return (
     <div>
       {visibleItems.map(item => (
         <div key={item.id}>{item.name}</div>
       ))}
     </div>
   );
   ```

---

## 13. Ví Dụ Hoàn Chỉnh: Todo App

```jsx
import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build Todo App', completed: true },
    { id: 3, text: 'Deploy App', completed: false }
  ]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      const newTodo = {
        id: Date.now(), // Unique ID
        text: input,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo App</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new todo..."
          style={{ padding: '8px', marginRight: '8px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px' }}>
          Add
        </button>
      </div>

      <p>{completedCount}/{todos.length} completed</p>

      <div>
        {todos.map(todo => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '8px' }}
            />
            <span style={{ flex: 1 }}>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: '8px', color: 'red' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
```

---

## 14. Bài Tập Thực Hành

### Bài 1: Product Catalog

Tạo danh sách sản phẩm với:
- Hiển thị tên, giá, hình ảnh
- Nút "Add to Cart" cho mỗi sản phẩm
- Filter theo category

### Bài 2: User Management

Tạo bảng users với:
- Hiển thị avatar, tên, email, role
- Nút edit/delete cho mỗi user
- Sort theo tên hoặc email

### Bài 3: News Feed

Tạo feed tin tức với:
- Hiển thị title, excerpt, author, date
- Nút "Read More" link đến bài viết
- Pagination hoặc infinite scroll

---

## 🎯 Key Takeaways

1. **`map()` transforms arrays** - Tạo JSX elements từ data
2. **Filter before mapping** - Giảm số elements cần render
3. **Transform in map** - Thay đổi data khi render
4. **Nested maps** - Lists trong lists
5. **Conditional rendering** - Show/hide items
6. **Empty & loading states** - UX tốt hơn
7. **Pagination** - Handle large datasets
8. **Search & sort** - Interactive lists
9. **Performance** - Memoization cho large lists
10. **Keys are critical** - Unique và stable identifiers

---

Bạn đã hiểu rõ về Rendering Lists và Keys chưa? Muốn làm bài tập thực hành hay chuyển sang **Forms & Controlled Components** tiếp theo? 🚀