# ⚡ PRACTICE: TẠO 10+ COMPONENTS VỚI PROPS VARIATIONS - PHIÊN BẢN NHANH

## 🎯 MỤC TIÊU BÀI TẬP

**Sau bài này bạn sẽ:**
- Thành thạo việc tạo components với props đa dạng
- Biết cách handle các kiểu props khác nhau
- Có library components nhỏ để reuse
- Hiểu cách tổ chức props patterns

---

## 📝 COMPONENT 1: BUTTON (MULTI-VARIANT)

### **Yêu cầu:**
- Variants: primary, secondary, danger, success
- Sizes: small, medium, large
- States: disabled, loading
- Events: onClick

### **✅ IMPLEMENTATION:**

```jsx
function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick
}) {
  const baseStyles = {
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8
  };

  const variants = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' },
    success: { backgroundColor: '#28a745', color: 'white' }
  };

  const sizes = {
    small: { padding: '6px 12px', fontSize: 14 },
    medium: { padding: '8px 16px', fontSize: 16 },
    large: { padding: '12px 24px', fontSize: 18 }
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        opacity: disabled || loading ? 0.6 : 1
      }}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && <span>⏳</span>}
      {children}
    </button>
  );
}

// Usage examples:
<Button>Default Button</Button>
<Button variant="danger" size="large">Delete</Button>
<Button variant="success" loading>Processing...</Button>
<Button disabled>Disabled</Button>
```

---

## 📝 COMPONENT 2: INPUT (FORM CONTROL)

### **Yêu cầu:**
- Types: text, email, password, number
- States: error, success, disabled
- Validation: required, minLength, maxLength
- Events: onChange, onBlur, onFocus

### **✅ IMPLEMENTATION:**

```jsx
function Input({
  type = 'text',
  placeholder,
  value,
  error,
  success,
  disabled = false,
  required = false,
  minLength,
  maxLength,
  onChange,
  onBlur,
  onFocus
}) {
  const baseStyles = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: 4,
    fontSize: 16,
    transition: 'border-color 0.2s'
  };

  const getBorderColor = () => {
    if (error) return '#dc3545';
    if (success) return '#28a745';
    return '#ddd';
  };

  const getStyles = () => ({
    ...baseStyles,
    borderColor: getBorderColor(),
    backgroundColor: disabled ? '#f8f9fa' : 'white',
    cursor: disabled ? 'not-allowed' : 'text'
  });

  return (
    <div style={{ marginBottom: 16 }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        style={getStyles()}
      />
      {error && <span style={{ color: '#dc3545', fontSize: 14 }}>{error}</span>}
      {success && <span style={{ color: '#28a745', fontSize: 14 }}>✓ {success}</span>}
    </div>
  );
}

// Usage examples:
<Input placeholder="Enter your name" required />
<Input type="email" placeholder="Email" error="Invalid email" />
<Input type="password" placeholder="Password" minLength={8} />
<Input value="Success" success="Valid input" />
```

---

## 📝 COMPONENT 3: CARD (LAYOUT CONTAINER)

### **Yêu cầu:**
- Content: title, body, footer
- Styling: shadow, padding, borderRadius
- Actions: clickable, hover effects

### **✅ IMPLEMENTATION:**

```jsx
function Card({
  title,
  children,
  footer,
  shadow = true,
  padding = 16,
  borderRadius = 8,
  clickable = false,
  onClick
}) {
  const styles = {
    backgroundColor: 'white',
    borderRadius,
    padding,
    boxShadow: shadow ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
    border: shadow ? 'none' : '1px solid #e9ecef',
    cursor: clickable ? 'pointer' : 'default',
    transition: clickable ? 'transform 0.2s, box-shadow 0.2s' : 'none'
  };

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  return (
    <div style={styles} onClick={handleClick}>
      {title && (
        <h3 style={{
          margin: '0 0 12px 0',
          fontSize: 18,
          fontWeight: 600
        }}>
          {title}
        </h3>
      )}

      <div style={{ marginBottom: footer ? 16 : 0 }}>
        {children}
      </div>

      {footer && (
        <div style={{
          borderTop: '1px solid #e9ecef',
          paddingTop: 12,
          marginTop: 12
        }}>
          {footer}
        </div>
      )}
    </div>
  );
}

// Usage examples:
<Card title="Basic Card">
  <p>This is card content</p>
</Card>

<Card
  title="Clickable Card"
  clickable
  onClick={() => alert('Card clicked!')}
  footer={<Button size="small">Action</Button>}
>
  <p>Click me!</p>
</Card>
```

---

## 📝 COMPONENT 4: AVATAR (USER IMAGE)

### **Yêu cầu:**
- Sources: image URL, fallback text
- Sizes: small, medium, large, custom
- Shapes: circle, square, rounded
- Status: online, offline, away

### **✅ IMPLEMENTATION:**

```jsx
function Avatar({
  src,
  alt = 'Avatar',
  size = 'medium',
  shape = 'circle',
  status,
  fallback = '👤'
}) {
  const [hasError, setHasError] = useState(false);

  const sizes = {
    small: 32,
    medium: 48,
    large: 64
  };

  const sizeValue = typeof size === 'number' ? size : sizes[size];

  const baseStyles = {
    width: sizeValue,
    height: sizeValue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sizeValue * 0.6,
    fontWeight: 600,
    color: 'white',
    backgroundColor: '#6c757d',
    position: 'relative'
  };

  const shapeStyles = {
    circle: { borderRadius: '50%' },
    square: { borderRadius: 0 },
    rounded: { borderRadius: 8 }
  };

  const statusColors = {
    online: '#28a745',
    offline: '#6c757d',
    away: '#ffc107'
  };

  return (
    <div style={{ ...baseStyles, ...shapeStyles[shape] }}>
      {src && !hasError ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: shape === 'circle' ? '50%' : shape === 'rounded' ? 8 : 0
          }}
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{fallback}</span>
      )}

      {status && (
        <span style={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          width: sizeValue * 0.25,
          height: sizeValue * 0.25,
          borderRadius: '50%',
          backgroundColor: statusColors[status],
          border: '2px solid white'
        }} />
      )}
    </div>
  );
}

// Usage examples:
<Avatar src="https://i.pravatar.cc/100?img=1" status="online" />
<Avatar size="large" fallback="JD" status="away" />
<Avatar shape="square" size={80} fallback="AB" />
```

---

## 📝 COMPONENT 5: BADGE (STATUS INDICATOR)

### **Yêu cầu:**
- Variants: primary, secondary, success, danger, warning
- Sizes: small, medium, large
- Content: text, icon + text, dot only

### **✅ IMPLEMENTATION:**

```jsx
function Badge({
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  dot = false
}) {
  const variants = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    success: { backgroundColor: '#28a745', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' },
    warning: { backgroundColor: '#ffc107', color: 'black' }
  };

  const sizes = {
    small: { padding: '2px 6px', fontSize: 12 },
    medium: { padding: '4px 8px', fontSize: 14 },
    large: { padding: '6px 12px', fontSize: 16 }
  };

  if (dot) {
    return (
      <span style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: variants[variant].backgroundColor
      }} />
    );
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      borderRadius: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      ...variants[variant],
      ...sizes[size]
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}

// Usage examples:
<Badge variant="success">Active</Badge>
<Badge variant="danger" size="small">Error</Badge>
<Badge variant="warning" icon="⚠️">Warning</Badge>
<Badge dot variant="success" />
```

---

## 📝 COMPONENT 6: MODAL (OVERLAY DIALOG)

### **Yêu cầu:**
- States: open/closed
- Content: title, body, footer
- Actions: close button, backdrop click
- Sizes: small, medium, large

### **✅ IMPLEMENTATION:**

```jsx
function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium'
}) {
  if (!isOpen) return null;

  const sizes = {
    small: { width: 400 },
    medium: { width: 600 },
    large: { width: 800 }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }} onClick={handleBackdropClick}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 0,
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
        ...sizes[size]
      }}>
        {/* Header */}
        {(title || onClose) && (
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid #e9ecef',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {title && <h3 style={{ margin: 0 }}>{title}</h3>}
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  color: '#6c757d'
                }}
              >
                ×
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: 20 }}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid #e9ecef',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 8
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// Usage example:
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="secondary" onClick={() => setShowModal(false)}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleConfirm}>
        Delete
      </Button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

---

## 📝 COMPONENT 7: TABS (NAVIGATION)

### **Yêu cầu:**
- Multiple tabs
- Active state management
- Content switching
- Custom styling

### **✅ IMPLEMENTATION:**

```jsx
function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div>
      {/* Tab Headers */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #e9ecef'
      }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '12px 20px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#f8f9fa' : 'white',
              borderBottom: activeTab === tab.id ? '2px solid #007bff' : '2px solid transparent',
              cursor: 'pointer',
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? '#007bff' : '#6c757d'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: 20 }}>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
}

// Usage example:
const tabs = [
  { id: 'profile', label: 'Profile', content: <div>Profile content</div> },
  { id: 'settings', label: 'Settings', content: <div>Settings content</div> },
  { id: 'security', label: 'Security', content: <div>Security content</div> }
];

<Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
```

---

## 📝 COMPONENT 8: TOAST (NOTIFICATION)

### **Yêu cầu:**
- Types: success, error, warning, info
- Auto-dismiss
- Manual close
- Multiple toasts

### **✅ IMPLEMENTATION:**

```jsx
function Toast({
  message,
  type = 'info',
  duration = 5000,
  onClose
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!visible) return null;

  const types = {
    success: { backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' },
    error: { backgroundColor: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' },
    warning: { backgroundColor: '#fff3cd', color: '#856404', borderColor: '#ffeaa7' },
    info: { backgroundColor: '#d1ecf1', color: '#0c5460', borderColor: '#bee5eb' }
  };

  return (
    <div style={{
      padding: '12px 16px',
      borderRadius: 4,
      border: `1px solid ${types[type].borderColor}`,
      backgroundColor: types[type].backgroundColor,
      color: types[type].color,
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span>{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        style={{
          background: 'none',
          border: 'none',
          color: types[type].color,
          cursor: 'pointer',
          fontSize: 18,
          padding: 0,
          marginLeft: 12
        }}
      >
        ×
      </button>
    </div>
  );
}

// ToastContainer component
function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 1000,
      maxWidth: 400
    }}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

// Usage example:
const [toasts, setToasts] = useState([]);

const addToast = (message, type = 'info') => {
  const id = Date.now();
  setToasts([...toasts, { id, message, type }]);
};

const removeToast = (id) => {
  setToasts(toasts.filter(t => t.id !== id));
};

<ToastContainer toasts={toasts} removeToast={removeToast} />
<Button onClick={() => addToast('Success!', 'success')}>Show Success</Button>
```

---

## 📝 COMPONENT 9: DROPDOWN (SELECT MENU)

### **Yêu cầu:**
- Options list
- Selected value
- onChange callback
- Placeholder text

### **✅ IMPLEMENTATION:**

```jsx
function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{
        padding: '8px 12px',
        border: '1px solid #ddd',
        borderRadius: 4,
        fontSize: 16,
        backgroundColor: disabled ? '#f8f9fa' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        minWidth: 200
      }}
    >
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Usage example:
const countries = [
  { value: 'vn', label: 'Việt Nam' },
  { value: 'us', label: 'United States' },
  { value: 'jp', label: 'Japan' }
];

<Dropdown
  options={countries}
  value={selectedCountry}
  onChange={setSelectedCountry}
  placeholder="Chọn quốc gia"
/>
```

---

## 📝 COMPONENT 10: PROGRESS BAR

### **Yêu cầu:**
- Progress value (0-100)
- Colors and styling
- Size variants
- Label display

### **✅ IMPLEMENTATION:**

```jsx
function ProgressBar({
  value,
  max = 100,
  color = '#007bff',
  size = 'medium',
  showLabel = false,
  label
}) {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    small: { height: 4, fontSize: 12 },
    medium: { height: 8, fontSize: 14 },
    large: { height: 12, fontSize: 16 }
  };

  const sizeStyle = sizes[size];

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 4,
          fontSize: sizeStyle.fontSize
        }}>
          <span>{label || 'Progress'}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}

      <div style={{
        width: '100%',
        height: sizeStyle.height,
        backgroundColor: '#e9ecef',
        borderRadius: sizeStyle.height / 2,
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
  );
}

// Usage examples:
<ProgressBar value={75} showLabel label="Upload Progress" />
<ProgressBar value={45} color="#28a745" size="large" />
<ProgressBar value={90} color="#dc3545" size="small" showLabel />
```

---

## 📝 COMPONENT 11: ACCORDION (COLLAPSIBLE CONTENT)

### **Yêu cầu:**
- Multiple sections
- Expand/collapse
- Single or multiple open
- Custom icons

### **✅ IMPLEMENTATION:**

```jsx
function Accordion({ items, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(openItems.includes(index)
        ? openItems.filter(i => i !== index)
        : [...openItems, index]
      );
    } else {
      setOpenItems(openItems.includes(index) ? [] : [index]);
    }
  };

  return (
    <div style={{ border: '1px solid #e9ecef', borderRadius: 4 }}>
      {items.map((item, index) => (
        <div key={index} style={{ borderBottom: index < items.length - 1 ? '1px solid #e9ecef' : 'none' }}>
          <button
            onClick={() => toggleItem(index)}
            style={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: 'white',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            {item.title}
            <span style={{
              transform: openItems.includes(index) ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}>
              ▼
            </span>
          </button>

          {openItems.includes(index) && (
            <div style={{
              padding: '0 20px 16px 20px',
              color: '#6c757d'
            }}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Usage example:
const accordionItems = [
  { title: 'What is React?', content: 'React is a JavaScript library...' },
  { title: 'Why use React?', content: 'React makes building UI easier...' },
  { title: 'How to learn React?', content: 'Start with the official docs...' }
];

<Accordion items={accordionItems} allowMultiple />
```

---

## 📝 COMPONENT 12: LOADING SPINNER

### **Yêu cầu:**
- Different sizes
- Colors
- Text overlay
- Inline or overlay

### **✅ IMPLEMENTATION:**

```jsx
function LoadingSpinner({
  size = 'medium',
  color = '#007bff',
  text,
  overlay = false
}) {
  const sizes = {
    small: 20,
    medium: 40,
    large: 60
  };

  const spinnerSize = sizes[size];

  const spinner = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12
    }}>
      <div style={{
        width: spinnerSize,
        height: spinnerSize,
        border: `${spinnerSize / 8}px solid #f3f3f3`,
        borderTop: `${spinnerSize / 8}px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />

      {text && <span style={{ color: '#6c757d' }}>{text}</span>}
    </div>
  );

  if (overlay) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Add CSS animation (in your CSS file or style tag)
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Usage examples:
<LoadingSpinner />
<LoadingSpinner size="large" color="#28a745" text="Loading..." />
<LoadingSpinner overlay text="Please wait..." />
```

---

## 🎯 TỔNG KẾT

**Bạn đã tạo được 12 components với props đa dạng:**

1. **Button** - Multi-variant, sizes, states
2. **Input** - Form control với validation
3. **Card** - Layout container
4. **Avatar** - User image với fallbacks
5. **Badge** - Status indicators
6. **Modal** - Overlay dialogs
7. **Tabs** - Navigation component
8. **Toast** - Notifications
9. **Dropdown** - Select menus
10. **ProgressBar** - Progress indicators
11. **Accordion** - Collapsible content
12. **LoadingSpinner** - Loading states

**Props patterns đã áp dụng:**
- ✅ Primitive types (string, number, boolean)
- ✅ Objects và arrays
- ✅ Function callbacks
- ✅ Default values
- ✅ Destructuring
- ✅ Conditional props
- ✅ Complex validation

**Đây là foundation để build UI library thực tế!**