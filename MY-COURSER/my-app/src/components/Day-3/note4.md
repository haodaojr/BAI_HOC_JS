# Switch Statement Alternatives

## 1. Vấn Đề Với Switch Statement

**Switch statement** hoạt động tốt trong JavaScript thuần, nhưng có vấn đề khi dùng trong React JSX:

```jsx
// ❌ KHÔNG THỂ dùng switch trực tiếp trong JSX
function StatusDisplay() {
  const status = 'success';

  return (
    <div>
      {switch (status) {        // ❌ Syntax Error!
        case 'success':
          return <p>✅ Success!</p>;
        case 'error':
          return <p>❌ Error!</p>;
        default:
          return <p>⚠️ Unknown</p>;
      }}
    </div>
  );
}
```

**Vấn đề:**
- Switch là **statement**, không phải **expression**
- Không thể return JSX trực tiếp
- Code dài dòng, khó maintain

---

## 2. Giải Pháp: Object Literal Pattern

### Cách 1: Object với Functions

```jsx
function StatusDisplay() {
  const status = 'success';

  // Object chứa các component functions
  const statusComponents = {
    success: () => <p style={{ color: 'green' }}>✅ Success!</p>,
    error: () => <p style={{ color: 'red' }}>❌ Error!</p>,
    warning: () => <p style={{ color: 'orange' }}>⚠️ Warning!</p>,
    default: () => <p>⚠️ Unknown status</p>
  };

  // Lấy component tương ứng hoặc default
  const StatusComponent = statusComponents[status] || statusComponents.default;

  return (
    <div>
      <StatusComponent />
    </div>
  );
}
```

### Cách 2: Object với JSX trực tiếp

```jsx
function StatusDisplay() {
  const status = 'success';

  const statusMessages = {
    success: <p style={{ color: 'green' }}>✅ Success!</p>,
    error: <p style={{ color: 'red' }}>❌ Error!</p>,
    warning: <p style={{ color: 'orange' }}>⚠️ Warning!</p>
  };

  return (
    <div>
      {statusMessages[status] || <p>⚠️ Unknown status</p>}
    </div>
  );
}
```

---

## 3. Giải Pháp: Map Pattern

### Sử dụng Map để linh hoạt hơn

```jsx
function NotificationSystem() {
  const notifications = new Map([
    ['success', { icon: '✅', color: 'green', message: 'Operation successful!' }],
    ['error', { icon: '❌', color: 'red', message: 'Something went wrong!' }],
    ['warning', { icon: '⚠️', color: 'orange', message: 'Please be careful!' }]
  ]);

  const type = 'success';
  const config = notifications.get(type);

  if (!config) {
    return <div>Unknown notification type</div>;
  }

  return (
    <div style={{ color: config.color, padding: '10px', border: '1px solid' }}>
      <span style={{ fontSize: '20px' }}>{config.icon}</span>
      <span>{config.message}</span>
    </div>
  );
}
```

---

## 4. Giải Pháp: Factory Function Pattern

### Tạo function trả về component

```jsx
function createStatusComponent(status) {
  switch (status) {
    case 'success':
      return () => <p style={{ color: 'green' }}>✅ Success!</p>;
    case 'error':
      return () => <p style={{ color: 'red' }}>❌ Error!</p>;
    case 'warning':
      return () => <p style={{ color: 'orange' }}>⚠️ Warning!</p>;
    default:
      return () => <p>⚠️ Unknown status</p>;
  }
}

function StatusDisplay() {
  const status = 'success';
  const StatusComponent = createStatusComponent(status);

  return (
    <div>
      <StatusComponent />
    </div>
  );
}
```

---

## 5. Giải Pháp: Ternary Chains (Multiple Conditions)

### Cho 3+ lựa chọn, dùng ternary lồng nhau

```jsx
function UserRoleDisplay() {
  const role = 'admin'; // 'admin', 'moderator', 'user', 'guest'

  return (
    <div>
      <h2>User Role:</h2>
      {role === 'admin' ? (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
          👑 Administrator - Full Access
        </div>
      ) : role === 'moderator' ? (
        <div style={{ backgroundColor: 'orange', color: 'white', padding: '10px' }}>
          🛡️ Moderator - Limited Admin
        </div>
      ) : role === 'user' ? (
        <div style={{ backgroundColor: 'blue', color: 'white', padding: '10px' }}>
          👤 Regular User
        </div>
      ) : (
        <div style={{ backgroundColor: 'gray', color: 'white', padding: '10px' }}>
          👻 Guest User
        </div>
      )}
    </div>
  );
}
```

**Lưu ý:** Ternary lồng nhau > 2 cấp sẽ khó đọc. Nên dùng object pattern.

---

## 6. Giải Pháp: Custom Hook Pattern

### Tách logic ra custom hook

```jsx
function useStatusDisplay(status) {
  const statusConfig = {
    success: {
      icon: '✅',
      color: 'green',
      bgColor: '#d4edda',
      message: 'Operation completed successfully!'
    },
    error: {
      icon: '❌',
      color: 'red',
      bgColor: '#f8d7da',
      message: 'An error occurred. Please try again.'
    },
    warning: {
      icon: '⚠️',
      color: '#856404',
      bgColor: '#fff3cd',
      message: 'Warning: Please check your input.'
    },
    info: {
      icon: 'ℹ️',
      color: '#0c5460',
      bgColor: '#d1ecf1',
      message: 'Information: Please read carefully.'
    }
  };

  return statusConfig[status] || {
    icon: '❓',
    color: 'gray',
    bgColor: '#f8f9fa',
    message: 'Unknown status'
  };
}

function StatusDisplay() {
  const status = 'success';
  const config = useStatusDisplay(status);

  return (
    <div style={{
      color: config.color,
      backgroundColor: config.bgColor,
      padding: '15px',
      borderRadius: '5px',
      border: `1px solid ${config.color}`,
      margin: '10px 0'
    }}>
      <span style={{ fontSize: '24px', marginRight: '10px' }}>{config.icon}</span>
      <strong>{config.message}</strong>
    </div>
  );
}
```

---

## 7. Giải Pháp: Component Mapping Pattern

### Tạo object chứa các component

```jsx
// Tạo các component riêng biệt
function SuccessMessage() {
  return <p style={{ color: 'green' }}>✅ Success!</p>;
}

function ErrorMessage() {
  return <p style={{ color: 'red' }}>❌ Error!</p>;
}

function WarningMessage() {
  return <p style={{ color: 'orange' }}>⚠️ Warning!</p>;
}

function DefaultMessage() {
  return <p>⚠️ Unknown status</p>;
}

// Object mapping
const statusComponents = {
  success: SuccessMessage,
  error: ErrorMessage,
  warning: WarningMessage,
  default: DefaultMessage
};

function StatusDisplay() {
  const status = 'success';
  const StatusComponent = statusComponents[status] || statusComponents.default;

  return (
    <div>
      <StatusComponent />
    </div>
  );
}
```

---

## 8. So Sánh Các Giải Pháp

| Pattern | Code Length | Performance | Readability | Use Case |
|---------|-------------|-------------|-------------|----------|
| **Object Literal** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Simple mappings |
| **Map** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Dynamic data |
| **Factory Function** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | Complex logic |
| **Ternary Chain** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | 2-3 conditions |
| **Custom Hook** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Reusable logic |
| **Component Mapping** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Complex UI |

---

## 9. Ví Dụ Thực Tế: Theme System

```jsx
function ThemeSelector() {
  const themes = {
    light: {
      backgroundColor: '#ffffff',
      color: '#000000',
      border: '1px solid #ddd'
    },
    dark: {
      backgroundColor: '#333333',
      color: '#ffffff',
      border: '1px solid #666'
    },
    blue: {
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      border: '1px solid #1976d2'
    }
  };

  const [currentTheme, setCurrentTheme] = useState('light');
  const theme = themes[currentTheme] || themes.light;

  return (
    <div>
      <div style={{
        padding: '20px',
        margin: '10px 0',
        ...theme
      }}>
        <h3>This is {currentTheme} theme</h3>
        <p>The background and text colors change based on the selected theme.</p>
      </div>

      <div>
        {Object.keys(themes).map(themeName => (
          <button
            key={themeName}
            onClick={() => setCurrentTheme(themeName)}
            style={{ margin: '5px' }}
          >
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## 10. Ví Dụ: Form Validation Messages

```jsx
function ValidationMessage() {
  const [fieldErrors, setFieldErrors] = useState({});

  const errorMessages = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: 'Password must be at least 8 characters',
    maxLength: 'Input exceeds maximum length',
    pattern: 'Input format is invalid'
  };

  const getErrorMessage = (errorType) => {
    return errorMessages[errorType] || 'Invalid input';
  };

  const validateField = (fieldName, value) => {
    const errors = { ...fieldErrors };

    if (fieldName === 'email' && value && !value.includes('@')) {
      errors.email = 'email';
    } else if (fieldName === 'password' && value && value.length < 8) {
      errors.password = 'minLength';
    } else {
      delete errors[fieldName];
    }

    setFieldErrors(errors);
  };

  return (
    <form>
      <div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => validateField('email', e.target.value)}
        />
        {fieldErrors.email && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {getErrorMessage(fieldErrors.email)}
          </p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => validateField('password', e.target.value)}
        />
        {fieldErrors.password && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {getErrorMessage(fieldErrors.password)}
          </p>
        )}
      </div>
    </form>
  );
}
```

---

## 11. Best Practices ✅

1. **Dùng Object Literal cho mappings đơn giản:**
   ```jsx
   const components = { success: <Success />, error: <Error /> };
   ```

2. **Dùng Map cho data động:**
   ```jsx
   const config = new Map([['key', 'value']]);
   ```

3. **Dùng Custom Hook cho logic phức tạp:**
   ```jsx
   const config = useStatusConfig(status);
   ```

4. **Luôn có fallback:**
   ```jsx
   const Component = components[status] || components.default;
   ```

5. **Tách logic ra functions:**
   ```jsx
   const getComponent = (status) => { /* logic */ };
   ```

---

## 12. Common Mistakes ❌

### Mistake 1: Switch trong JSX

```jsx
// ❌ SAI
return (
  <div>
    {switch (status) {
      case 'success': return <p>Success</p>;
      default: return <p>Default</p>;
    }}
  </div>
);
```

### Mistake 2: Quên default case

```jsx
// ❌ Có thể undefined
const components = { success: <Success /> };
return components[status]; // Undefined nếu status không match
```

### Mistake 3: Object keys không match

```jsx
// ❌ Case sensitive
const themes = { Light: '#fff', Dark: '#000' };
const theme = themes['light']; // Undefined!
```

---

## 13. Bài Tập Thực Hành

### Bài 1: Traffic Light Component

Tạo component đèn giao thông với 3 trạng thái: red, yellow, green.
Mỗi trạng thái có màu sắc và message khác nhau.

```jsx
function TrafficLight() {
  const [currentLight, setCurrentLight] = useState('red');

  // TODO: Tạo object mapping cho các trạng thái
  // red: { color: 'red', message: 'Stop' }
  // yellow: { color: 'yellow', message: 'Caution' }
  // green: { color: 'green', message: 'Go' }

  const config = // TODO: Lấy config dựa trên currentLight

  return (
    <div>
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: config.color,
        margin: '20px auto'
      }}></div>
      <p style={{ textAlign: 'center' }}>{config.message}</p>
      <button onClick={() => {
        // TODO: Cycle qua các lights: red -> yellow -> green -> red
      }}>
        Change Light
      </button>
    </div>
  );
}
```

### Bài 2: Notification System

Tạo hệ thống thông báo với các loại: success, error, warning, info.
Mỗi loại có icon, màu sắc, và message khác nhau.

### Bài 3: User Role Permissions

Tạo component hiển thị permissions dựa trên role:
- admin: tất cả permissions
- moderator: edit, delete posts
- user: create posts, comment
- guest: chỉ view

---

## 🎯 Key Takeaways

1. **Switch statement không hoạt động trong JSX** - Dùng object literal thay thế
2. **Object Literal pattern** - Đơn giản, hiệu quả cho mappings
3. **Map pattern** - Linh hoạt cho data động
4. **Factory functions** - Khi cần logic phức tạp
5. **Custom hooks** - Tái sử dụng logic
6. **Luôn có fallback** - Tránh undefined errors
7. **Component mapping** - Tách biệt UI components
8. **Performance matters** - Chọn pattern phù hợp

---

Bạn đã hiểu rõ các Switch Alternatives chưa? Muốn làm bài tập thực hành hay chuyển sang **Lists & Keys** tiếp theo? 🚀