# ⚡ useState Fundamentals & Patterns

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **useState là gì?**
**useState** là React Hook giúp component "nhớ" và cập nhật dữ liệu. Khi state thay đổi → component tự động re-render.

### **Cú pháp cơ bản:**
```jsx
const [state, setState] = useState(initialValue);
```

### **3 quy tắc vàng:**
1. ✅ **Chỉ gọi trong function component** (không được trong class component)
2. ✅ **Chỉ gọi ở top level** (không được trong loop, condition, nested function)
3. ✅ **Có thể gọi nhiều lần** (nhiều state variables)

---

## 🔥 PHẦN 1: useState VỚI PRIMITIVE VALUES

### **1. String State:**
```jsx
function TextInput() {
  const [text, setText] = useState(''); // Khởi tạo rỗng

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập text..."
      />
      <p>Bạn đã nhập: {text}</p>
    </div>
  );
}
```

### **2. Number State:**
```jsx
function Counter() {
  const [count, setCount] = useState(0); // Khởi tạo bằng 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

### **3. Boolean State:**
```jsx
function ToggleButton() {
  const [isOn, setIsOn] = useState(false); // Khởi tạo false

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'Bật' : 'Tắt'}
    </button>
  );
}
```

---

## 🔥 PHẦN 2: STATE VS PROPS DEEP COMPARISON

### **Props (Dữ liệu từ parent):**
```jsx
// Parent component
function App() {
  const [userName, setUserName] = useState('John');

  return <UserProfile name={userName} />;
}

// Child component (NHẬN props)
function UserProfile({ name }) {
  // ❌ KHÔNG thể thay đổi props trực tiếp
  // name = 'Jane'; // SAI!

  return <h1>Hello {name}</h1>;
}
```

### **State (Dữ liệu nội bộ):**
```jsx
function UserProfile() {
  const [name, setName] = useState('John'); // ✅ Có thể thay đổi

  return (
    <div>
      <h1>Hello {name}</h1>
      <button onClick={() => setName('Jane')}>
        Đổi tên
      </button>
    </div>
  );
}
```

### **📊 Bảng so sánh:**

| Tiêu chí | Props | State |
|----------|-------|-------|
| **Nguồn gốc** | Từ parent component | Tự tạo trong component |
| **Thay đổi** | ❌ Không thể | ✅ Có thể với setter |
| **Mục đích** | Cấu hình component | Lưu trạng thái nội bộ |
| **Re-render** | Khi parent re-render | Khi state thay đổi |
| **Sharing** | Có thể share với children | Chỉ trong component đó |

---

## 🔥 PHẦN 3: STATE UPDATES & RE-RENDERING MECHANISM

### **Cách React xử lý state updates:**

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  console.log('Component render với count:', count);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

**Luồng hoạt động:**
1. User click button
2. `setCount(count + 1)` được gọi
3. React cập nhật state (count = 1)
4. Component re-render
5. UI cập nhật hiển thị count mới

### **⚠️ Lỗi phổ biến - Stale State:**

```jsx
// ❌ SAI - Dùng state cũ
function BadCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // Dùng count cũ
    setCount(count + 1); // Vẫn dùng count cũ!
    setCount(count + 1); // Vẫn dùng count cũ!
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Kết quả:** Count chỉ tăng 1, không phải 3!

---

## 🔥 PHẦN 4: FUNCTIONAL UPDATES PATTERN

### **Cách sửa lỗi stale state:**

```jsx
// ✅ ĐÚNG - Dùng functional update
function GoodCounter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(prevCount => prevCount + 1); // Dùng giá trị mới nhất
    setCount(prevCount => prevCount + 1); // Dùng giá trị mới nhất
    setCount(prevCount => prevCount + 1); // Dùng giá trị mới nhất
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Kết quả:** Count tăng 3 như mong muốn!

### **Khi nào dùng functional update:**
- ✅ Khi state update phụ thuộc vào giá trị hiện tại
- ✅ Trong event handlers phức tạp
- ✅ Khi có nhiều setState liên tiếp

---

## 🔥 PHẦN 5: MULTIPLE STATE VARIABLES STRATEGY

### **Cách 1: Nhiều useState riêng biệt (Khuyên dùng):**

```jsx
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(18);

  return (
    <form>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Age"
      />
    </form>
  );
}
```

### **Cách 2: Object State (Cho form phức tạp):**

```jsx
function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 18
  });

  function handleChange(field, value) {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }

  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Name"
      />
      {/* ... */}
    </form>
  );
}
```

### **🎯 Khi nào dùng cách nào:**

| Tình huống | Cách 1 (Nhiều useState) | Cách 2 (Object State) |
|------------|-------------------------|----------------------|
| **Form đơn giản** | ✅ Dễ hiểu, ít code | ❌ Quá phức tạp |
| **Form phức tạp** | ❌ Nhiều state variables | ✅ Dễ quản lý |
| **Logic độc lập** | ✅ Tách biệt rõ ràng | ❌ Cùng 1 object |
| **Performance** | ✅ Re-render tối ưu | ❌ Re-render toàn bộ |

---

## 🔥 PHẦN 6: STATE INITIALIZATION PATTERNS

### **1. Lazy Initialization (Với function):**

```jsx
function ExpensiveComponent() {
  const [data, setData] = useState(() => {
    // Chỉ chạy 1 lần khi component mount
    console.log('Computing expensive initial value...');
    return computeExpensiveValue();
  });

  return <div>Data: {data}</div>;
}
```

### **2. Từ Props:**

```jsx
function UserCard({ userId }) {
  const [user, setUser] = useState(() => {
    // Khởi tạo từ props
    return getUserById(userId);
  });

  return <div>{user.name}</div>;
}
```

### **3. Từ Local Storage:**

```jsx
function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => {
    // Lấy từ localStorage
    return localStorage.getItem('theme') || 'light';
  });

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

---

## 🔥 PHẦN 7: PRACTICE - COUNTER VARIATIONS

### **1. Basic Counter:**

```jsx
function BasicCounter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### **2. Step Counter:**

```jsx
function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div>
      <h2>Count: {count}</h2>
      <div>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          min="1"
        />
      </div>
      <button onClick={() => setCount(c => c + step)}>+{step}</button>
      <button onClick={() => setCount(c => c - step)}>-{step}</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### **3. Counter with History:**

```jsx
function HistoryCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  function updateCount(newCount) {
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  }

  function undo() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCount(newHistory[newHistory.length - 1]);
    }
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => updateCount(count + 1)}>+</button>
      <button onClick={() => updateCount(count - 1)}>-</button>
      <button onClick={undo} disabled={history.length <= 1}>Undo</button>
      <div>History: {history.join(' → ')}</div>
    </div>
  );
}
```

---

## 🔥 PHẦN 8: PRACTICE - TOGGLE COMPONENTS

### **1. Show/Hide Panel:**

```jsx
function TogglePanel() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Panel
      </button>

      {isVisible && (
        <div style={{
          padding: '20px',
          border: '1px solid #ddd',
          marginTop: '10px'
        }}>
          <h3>This is the hidden panel!</h3>
          <p>You can put any content here.</p>
        </div>
      )}
    </div>
  );
}
```

### **2. Theme Switcher:**

```jsx
function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{
      backgroundColor: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#333',
      padding: '20px',
      minHeight: '200px'
    }}>
      <h2>Theme: {isDark ? 'Dark' : 'Light'}</h2>
      <button onClick={() => setIsDark(!isDark)}>
        Switch to {isDark ? 'Light' : 'Dark'} Theme
      </button>
    </div>
  );
}
```

### **3. Tab Switcher:**

```jsx
function TabSwitcher() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = {
    tab1: { title: 'Tab 1', content: 'This is tab 1 content' },
    tab2: { title: 'Tab 2', content: 'This is tab 2 content' },
    tab3: { title: 'Tab 3', content: 'This is tab 3 content' }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {Object.keys(tabs).map(tabId => (
          <button
            key={tabId}
            onClick={() => setActiveTab(tabId)}
            style={{
              padding: '10px 20px',
              backgroundColor: activeTab === tabId ? '#007bff' : '#f8f9fa',
              color: activeTab === tabId ? 'white' : '#333',
              border: '1px solid #ddd',
              cursor: 'pointer'
            }}
          >
            {tabs[tabId].title}
          </button>
        ))}
      </div>

      <div style={{
        padding: '20px',
        border: '1px solid #ddd',
        minHeight: '100px'
      }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}
```

---

## 🔥 PHẦN 9: MINI PROJECT - SIMPLE CALCULATOR

```jsx
function SimpleCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  function inputDigit(digit) {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  }

  function inputDecimal() {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }

  function clear() {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }

  function performOperation(nextOperation) {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }

  function calculate(firstValue, secondValue, operation) {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  }

  return (
    <div style={{
      width: '300px',
      margin: '0 auto',
      border: '2px solid #333',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px',
        textAlign: 'right',
        fontSize: '24px',
        fontFamily: 'monospace'
      }}>
        {display}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {/* Row 1 */}
        <button onClick={clear} style={buttonStyle('#dc3545')}>C</button>
        <button onClick={() => performOperation('/')} style={buttonStyle('#6c757d')}>/</button>
        <button onClick={() => performOperation('*')} style={buttonStyle('#6c757d')}>*</button>
        <button onClick={() => performOperation('-')} style={buttonStyle('#6c757d')}>-</button>

        {/* Row 2 */}
        <button onClick={() => inputDigit(7)} style={buttonStyle()}>7</button>
        <button onClick={() => inputDigit(8)} style={buttonStyle()}>8</button>
        <button onClick={() => inputDigit(9)} style={buttonStyle()}>9</button>
        <button onClick={() => performOperation('+')} style={buttonStyle('#6c757d', 2)}>+</button>

        {/* Row 3 */}
        <button onClick={() => inputDigit(4)} style={buttonStyle()}>4</button>
        <button onClick={() => inputDigit(5)} style={buttonStyle()}>5</button>
        <button onClick={() => inputDigit(6)} style={buttonStyle()}>6</button>

        {/* Row 4 */}
        <button onClick={() => inputDigit(1)} style={buttonStyle()}>1</button>
        <button onClick={() => inputDigit(2)} style={buttonStyle()}>2</button>
        <button onClick={() => inputDigit(3)} style={buttonStyle()}>3</button>
        <button onClick={() => performOperation('=')} style={buttonStyle('#28a745', 2)}>=</button>

        {/* Row 5 */}
        <button onClick={() => inputDigit(0)} style={buttonStyle('#f8f9fa', 2)}>0</button>
        <button onClick={inputDecimal} style={buttonStyle('#f8f9fa')}>.</button>
      </div>
    </div>
  );
}

function buttonStyle(bgColor = '#fff', gridColumn = 1) {
  return {
    padding: '15px 10px',
    backgroundColor: bgColor,
    color: bgColor === '#fff' ? '#333' : 'white',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    gridColumn: `span ${gridColumn}`,
    transition: 'background-color 0.2s'
  };
}
```

---

## 📊 CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Hiểu useState là gì và cách hoạt động
- [ ] Biết sự khác biệt giữa State và Props
- [ ] Hiểu re-rendering mechanism
- [ ] Biết dùng functional updates pattern
- [ ] Biết strategy cho multiple state variables
- [ ] Làm được các practice exercises
- [ ] Hoàn thành mini calculator project

---

## 🎯 TIẾP THEO

**Đã hiểu useState?** → Học useEffect để handle side effects!

**Cần luyện thêm?** → Làm thêm các practice exercises