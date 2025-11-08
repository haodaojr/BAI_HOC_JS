# REACT HOOKS INTRODUCTION & RULES OF HOOKS

Chào bạn! Mình sẽ dạy bạn về **React Hooks** từ con số 0 một cách chi tiết nhất có thể. Hãy yên tâm, mình sẽ giải thích từng khái niệm, từng dòng code một cách rõ ràng.

---

## 📚 PHẦN 1: REACT HOOKS LÀ GÌ?

### 🎯 Trước khi vào Hooks, cần hiểu React Component

**Component** trong React giống như một "hộp chức năng" - nó là một đoạn code có thể tái sử dụng để tạo ra giao diện. Ví dụ: nút bấm, form đăng nhập, thanh menu...

Có 2 loại Component chính:
- **Class Component** (kiểu cũ, phức tạp hơn)
- **Function Component** (kiểu mới, đơn giản hơn)

### 🪝 Vậy Hooks là gì?

**Hooks** ra đời năm 2019, là những **hàm đặc biệt** của React cho phép bạn sử dụng các tính năng của React (như state, lifecycle...) ngay trong **Function Component** mà không cần viết Class Component phức tạp.

**Tại sao gọi là "Hooks"?**
- Hook nghĩa là "móc, câu"
- Vì nó "móc" vào các tính năng của React để sử dụng

**Lợi ích:**
- Code ngắn gọn hơn, dễ đọc hơn
- Dễ tái sử dụng logic
- Không cần hiểu về `this`, `bind` trong JavaScript
- Dễ test hơn

---

## 📚 PHẦN 2: CÁC HOOKS CƠ BẢN NHẤT

### 1️⃣ useState - Quản lý trạng thái

#### 💡 useState là gì?

`useState` là một Hook giúp bạn **tạo và quản lý dữ liệu thay đổi** trong component. Khi dữ liệu này thay đổi, giao diện sẽ **tự động cập nhật**.

#### 📝 Cú pháp:

```javascript
const [tênBiến, hàmThayĐổiBiến] = useState(giáTriBanĐầu);
```

**Giải thích từng phần:**
- `useState`: là tên hàm Hook mà React cung cấp
- `tênBiến`: là biến chứa giá trị hiện tại
- `hàmThayĐổiBiến`: là hàm dùng để thay đổi giá trị của biến (thường đặt tên theo dạng `setTênBiến`)
- `giáTriBanĐầu`: là giá trị khởi tạo lúc đầu cho biến

#### 🔍 Ví dụ cụ thể:

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Tăng lên
      </button>
    </div>
  );
}
```

**Phân tích chi tiết từng dòng code:**

1. `import { useState } from 'react';`
   - `import`: từ khóa để nhập thư viện vào
   - `{ useState }`: lấy hàm useState từ thư viện React (dấu {} để lấy một phần cụ thể)
   - `from 'react'`: từ thư viện tên là react

2. `function Counter() { ... }`
   - `function`: từ khóa khai báo hàm trong JavaScript
   - `Counter`: tên của component (viết hoa chữ cái đầu theo quy ước React)
   - Đây là một Function Component

3. `const [count, setCount] = useState(0);`
   - `const`: từ khóa khai báo hằng số (không thể gán lại)
   - `count`: biến lưu số lần đã click, ban đầu là 0
   - `setCount`: hàm để thay đổi giá trị của count
   - `useState(0)`: gọi Hook useState với giá trị khởi tạo là 0
   - Dấu `[]`: này gọi là destructuring - cách tách mảng thành các biến riêng

4. `<p>Bạn đã click {count} lần</p>`
   - `<p>`: thẻ HTML tạo đoạn văn bản
   - `{count}`: cú pháp JSX để hiển thị giá trị biến count ra giao diện
   - Dấu `{}`: báo cho React biết đây là code JavaScript, không phải text thường

5. `<button onClick={() => setCount(count + 1)}>`
   - `<button>`: thẻ HTML tạo nút bấm
   - `onClick`: sự kiện khi người dùng click chuột (viết camelCase trong React)
   - `() => setCount(count + 1)`: arrow function (hàm mũi tên) trong JavaScript
     - `() =>`: cú pháp arrow function - hàm không có tham số
     - `setCount(count + 1)`: gọi hàm setCount để tăng giá trị count lên 1

---

### 2️⃣ useEffect - Xử lý side effects

#### 💡 useEffect là gì?

`useEffect` là Hook giúp bạn thực hiện các **tác vụ phụ** (side effects) như:
- Gọi API lấy dữ liệu
- Đăng ký sự kiện (event listeners)
- Thay đổi document title
- Set timer/interval

**Side effect** là gì? Là những tác vụ ảnh hưởng ra bên ngoài component (gọi API, thay đổi DOM, lưu localStorage...)

#### 📝 Cú pháp:

```javascript
useEffect(() => {
  // Code chạy sau khi component render
  
  return () => {
    // Code dọn dẹp (cleanup) - chạy trước khi component unmount
  };
}, [dependencies]);
```

**Giải thích từng phần:**
- `useEffect`: tên hàm Hook
- `() => { ... }`: arrow function chứa code bạn muốn chạy
- `return () => { ... }`: (optional) hàm cleanup để dọn dẹp trước khi component bị xóa
- `[dependencies]`: mảng các biến phụ thuộc - khi biến này thay đổi thì useEffect chạy lại

#### 🔍 Ví dụ cụ thể:

```javascript
import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API lấy thông tin user
    fetch('https://api.example.com/user/1')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []); // Mảng rỗng [] nghĩa là chỉ chạy 1 lần khi component mount

  if (loading) {
    return <p>Đang tải...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**Phân tích chi tiết từng dòng code:**

1. `const [user, setUser] = useState(null);`
   - Tạo state `user` để lưu thông tin người dùng
   - Ban đầu là `null` (không có gì) vì chưa lấy được dữ liệu

2. `const [loading, setLoading] = useState(true);`
   - Tạo state `loading` để biết đang tải dữ liệu hay không
   - Ban đầu là `true` (đang tải)

3. `useEffect(() => { ... }, []);`
   - Gọi useEffect với 2 tham số:
     - Tham số 1: arrow function chứa code cần chạy
     - Tham số 2: mảng rỗng `[]` nghĩa là effect chỉ chạy 1 lần sau lần render đầu tiên

4. `fetch('https://api.example.com/user/1')`
   - `fetch`: hàm JavaScript để gọi API
   - Truyền vào URL của API
   - Hàm này trả về một Promise (lời hứa sẽ có dữ liệu)

5. `.then(response => response.json())`
   - `.then()`: xử lý khi fetch thành công
   - `response`: đối tượng phản hồi từ server
   - `response.json()`: chuyển dữ liệu từ dạng JSON text sang JavaScript object

6. `.then(data => { setUser(data); setLoading(false); })`
   - Khi đã có dữ liệu JSON:
     - `setUser(data)`: lưu dữ liệu user vào state
     - `setLoading(false)`: đánh dấu đã tải xong

7. `if (loading) { return <p>Đang tải...</p>; }`
   - Kiểm tra nếu `loading` là `true` (đang tải)
   - Thì hiển thị dòng chữ "Đang tải..."
   - `return`: dừng hàm, không chạy code phía dưới

---

## 📚 PHẦN 3: RULES OF HOOKS (QUY TẮC CỦA HOOKS)

React có **2 quy tắc BẮT BUỘC** khi sử dụng Hooks. Nếu vi phạm, code sẽ bị lỗi!

### ⚠️ Quy tắc 1: Chỉ gọi Hooks ở cấp cao nhất (Top Level)

#### 🚫 KHÔNG ĐƯỢC làm:

```javascript
function BadExample() {
  const [count, setCount] = useState(0);
  
  if (count > 5) {
    // ❌ SAI: Gọi Hook trong điều kiện if
    const [name, setName] = useState('');
  }
  
  for (let i = 0; i < 3; i++) {
    // ❌ SAI: Gọi Hook trong vòng lặp
    const [items, setItems] = useState([]);
  }
  
  return <div>Bad Example</div>;
}
```

**Giải thích tại sao SAI:**
- React dựa vào **thứ tự gọi Hooks** để biết Hook nào tương ứng với state nào
- Nếu gọi Hook trong `if`, `for`, hoặc hàm lồng nhau, thứ tự có thể thay đổi giữa các lần render
- Điều này làm React bị lẫn lộn và gây lỗi

#### ✅ ĐÚNG cách:

```javascript
function GoodExample() {
  // ✅ ĐÚNG: Gọi Hooks ngay ở đầu hàm, không nằm trong điều kiện
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  
  // Các điều kiện, vòng lặp đặt sau khi đã gọi Hooks
  if (count > 5) {
    console.log('Count lớn hơn 5');
  }
  
  return <div>Good Example</div>;
}
```

**Giải thích tại sao ĐÚNG:**
- Tất cả Hooks được gọi ở đầu hàm, không nằm trong điều kiện
- Thứ tự gọi Hooks luôn giống nhau mỗi lần render
- React có thể theo dõi và quản lý state chính xác

---

### ⚠️ Quy tắc 2: Chỉ gọi Hooks trong React Functions

#### 🚫 KHÔNG ĐƯỢC làm:

```javascript
// ❌ SAI: Gọi Hook trong hàm JavaScript thường
function normalFunction() {
  const [count, setCount] = useState(0); // Lỗi!
  return count;
}

// ❌ SAI: Gọi Hook ngoài function
const [globalCount, setGlobalCount] = useState(0); // Lỗi!
```

**Giải thích tại sao SAI:**
- Hooks chỉ hoạt động trong React Function Components hoặc Custom Hooks
- Hàm JavaScript thường không có cơ chế quản lý state của React
- Gọi Hook ngoài function sẽ không có context để hoạt động

#### ✅ ĐÚNG cách:

```javascript
// ✅ ĐÚNG: Gọi Hook trong React Function Component
function MyComponent() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}

// ✅ ĐÚNG: Gọi Hook trong Custom Hook
function useCounter() {
  const [count, setCount] = useState(0);
  return [count, setCount];
}
```

**Giải thích tại sao ĐÚNG:**
- `MyComponent` là React Function Component (tên viết hoa chữ cái đầu)
- `useCounter` là Custom Hook (bắt đầu bằng từ "use")
- Cả hai đều là nơi hợp lệ để gọi Hooks

---

## 📚 PHẦN 4: TÓM TẮT QUY TẮC HOOKS

### 📋 Checklist nhớ nhanh:

✅ **Luôn gọi Hooks ở cấp cao nhất:**
- Không trong `if`, `else`, `switch`
- Không trong vòng lặp `for`, `while`
- Không trong hàm lồng nhau (nested functions)
- Không trong try/catch

✅ **Chỉ gọi Hooks trong:**
- React Function Components
- Custom Hooks (tên bắt đầu bằng "use")

✅ **Thứ tự gọi Hooks:**
- Phải giống nhau mỗi lần component render
- Không thay đổi số lượng Hooks giữa các lần render

---

## 📚 PHẦN 5: VÍ DỤ THỰC TÊ KẾT HỢP

Bây giờ mình sẽ tạo một ví dụ hoàn chỉnh kết hợp nhiều Hooks và tuân thủ đúng quy tắc:

```javascript
import { useState, useEffect } from 'react';

function TodoApp() {
  // ✅ ĐÚNG: Tất cả Hooks ở đầu, không trong điều kiện
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  
  // useEffect để load dữ liệu khi component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []); // Chỉ chạy 1 lần khi mount
  
  // useEffect để lưu dữ liệu mỗi khi todos thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]); // Chạy lại mỗi khi todos thay đổi
  
  // Các hàm xử lý
  const handleAddTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInputValue('');
  };
  
  const handleToggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Lọc todos theo filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    <div>
      <h1>Todo App</h1>
      
      <div>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập công việc..."
        />
        <button onClick={handleAddTodo}>Thêm</button>
      </div>
      
      <div>
        <button onClick={() => setFilter('all')}>Tất cả</button>
        <button onClick={() => setFilter('active')}>Đang làm</button>
        <button onClick={() => setFilter('completed')}>Hoàn thành</button>
      </div>
      
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
```

**Phân tích toàn bộ code:**

1. **Import Hooks:**
   ```javascript
   import { useState, useEffect } from 'react';
   ```
   - Import 2 Hooks cần dùng từ thư viện react

2. **Khai báo các state:**
   ```javascript
   const [todos, setTodos] = useState([]);
   const [inputValue, setInputValue] = useState('');
   const [filter, setFilter] = useState('all');
   ```
   - `todos`: mảng chứa danh sách công việc, ban đầu là mảng rỗng `[]`
   - `inputValue`: chuỗi text người dùng nhập vào, ban đầu là chuỗi rỗng `''`
   - `filter`: chuỗi lưu bộ lọc hiện tại ('all', 'active', hoặc 'completed'), ban đầu là 'all'

3. **useEffect load dữ liệu:**
   ```javascript
   useEffect(() => {
     const savedTodos = localStorage.getItem('todos');
     if (savedTodos) {
       setTodos(JSON.parse(savedTodos));
     }
   }, []);
   ```
   - `localStorage.getItem('todos')`: lấy dữ liệu đã lưu trong trình duyệt (key là 'todos')
   - `JSON.parse()`: chuyển chuỗi JSON thành JavaScript object
   - Mảng phụ thuộc `[]` rỗng nên chỉ chạy 1 lần khi component mount (hiển thị lần đầu)

4. **useEffect lưu dữ liệu:**
   ```javascript
   useEffect(() => {
     localStorage.setItem('todos', JSON.stringify(todos));
   }, [todos]);
   ```
   - `JSON.stringify(todos)`: chuyển object JavaScript thành chuỗi JSON
   - `localStorage.setItem()`: lưu chuỗi vào trình duyệt
   - Mảng phụ thuộc `[todos]` nên effect chạy lại mỗi khi todos thay đổi

5. **Hàm thêm todo:**
   ```javascript
   const handleAddTodo = () => {
     if (inputValue.trim() === '') return;
     
     const newTodo = {
       id: Date.now(),
       text: inputValue,
       completed: false
     };
     
     setTodos([...todos, newTodo]);
     setInputValue('');
   };
   ```
   - `inputValue.trim()`: xóa khoảng trắng đầu cuối
   - `Date.now()`: lấy timestamp hiện tại làm id duy nhất
   - `[...todos, newTodo]`: spread operator - tạo mảng mới chứa tất cả todos cũ + newTodo
   - `setInputValue('')`: xóa ô input sau khi thêm

6. **Hàm toggle completed:**
   ```javascript
   const handleToggleTodo = (id) => {
     setTodos(todos.map(todo => 
       todo.id === id ? { ...todo, completed: !todo.completed } : todo
   ));
   };
   ```
   - `todos.map()`: duyệt qua từng todo trong mảng
   - `todo.id === id`: kiểm tra todo có id trùng với id cần toggle không
   - `{ ...todo, completed: !todo.completed }`: tạo object mới với completed đảo ngược
   - `!todo.completed`: phủ định - nếu true thành false, false thành true

7. **Hàm xóa todo:**
   ```javascript
   const handleDeleteTodo = (id) => {
     setTodos(todos.filter(todo => todo.id !== id));
   };
   ```
   - `todos.filter()`: lọc mảng, giữ lại những phần tử thỏa điều kiện
   - `todo.id !== id`: giữ lại những todo có id khác với id cần xóa

8. **Lọc todos theo filter:**
   ```javascript
   const filteredTodos = todos.filter(todo => {
     if (filter === 'active') return !todo.completed;
     if (filter === 'completed') return todo.completed;
     return true;
   });
   ```
   - Nếu filter là 'active': chỉ giữ todo chưa hoàn thành
   - Nếu filter là 'completed': chỉ giữ todo đã hoàn thành
   - Còn lại ('all'): giữ tất cả

9. **Input nhập todo:**
   ```javascript
   <input 
     type="text"
     value={inputValue}
     onChange={(e) => setInputValue(e.target.value)}
     placeholder="Nhập công việc..."
   />
   ```
   - `value={inputValue}`: hiển thị giá trị từ state
   - `onChange`: sự kiện khi người dùng gõ phím
   - `(e) => setInputValue(e.target.value)`: arrow function nhận event `e`, lấy giá trị mới từ `e.target.value` và cập nhật state

10. **Nút thêm:**
    ```javascript
    <button onClick={handleAddTodo}>Thêm</button>
    ```
    - `onClick={handleAddTodo}`: gọi hàm handleAddTodo khi click (không có dấu ngoặc `()`)

11. **Nút filter:**
    ```javascript
    <button onClick={() => setFilter('all')}>Tất cả</button>
    ```
    - `onClick={() => setFilter('all')}`: arrow function gọi setFilter với giá trị 'all'
    - Dùng arrow function vì cần truyền tham số cho setFilter

12. **Hiển thị danh sách:**
    ```javascript
    {filteredTodos.map(todo => (
      <li key={todo.id}>
        ...
      </li>
    ))}
    ```
    - `filteredTodos.map()`: duyệt qua mảng và render từng todo thành `<li>`
    - `key={todo.id}`: thuộc tính bắt buộc khi render danh sách, giúp React theo dõi từng phần tử
    - Dùng `()` sau arrow function để return JSX

13. **Checkbox:**
    ```javascript
    <input 
      type="checkbox"
      checked={todo.completed}
      onChange={() => handleToggleTodo(todo.id)}
    />
    ```
    - `checked={todo.completed}`: thuộc tính checked dựa vào state completed
    - `onChange`: gọi handleToggleTodo khi click checkbox

14. **Text có gạch ngang:**
    ```javascript
    <span style={{ 
      textDecoration: todo.completed ? 'line-through' : 'none' 
    }}>
      {todo.text}
    </span>
    ```
    - `style={{ }}`: cú pháp inline style trong React (dùng object JavaScript)
    - `todo.completed ? 'line-through' : 'none'`: toán tử 3 ngôi (ternary) - nếu completed thì gạch ngang, không thì không có gạch

---

## 🎯 KẾT LUẬN

Bạn đã học xong:
- ✅ React Hooks là gì và tại sao cần dùng
- ✅ Hai Hooks cơ bản nhất: useState và useEffect
- ✅ Hai quy tắc bắt buộc của Hooks
- ✅ Ví dụ thực tế áp dụng đúng quy tắc

**Bước tiếp theo bạn nên làm:**
1. Thực hành lại ví dụ Todo App trên
2. Tìm hiểu thêm các Hooks khác: useContext, useReducer, useRef, useMemo, useCallback
3. Tạo Custom Hooks của riêng bạn

Nếu có bất kỳ phần nào chưa hiểu, hãy hỏi lại mình nhé! Mình sẽ giải thích lại bằng cách khác dễ hiểu hơn. 😊