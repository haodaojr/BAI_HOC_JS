# ⚡ ONCLICK, ONCHANGE, ONSUBMIT EVENTS - CHI TIẾT

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **3 events quan trọng nhất trong React:**

**1. onClick**: Xử lý click events
**2. onChange**: Xử lý input changes  
**3. onSubmit**: Xử lý form submission

**Patterns chung:**
- ✅ Luôn preventDefault() cho forms
- ✅ Destructuring event.target
- ✅ Controlled components với state

---

## 🔥 PHẦN 1: ONCLICK EVENT - CHI TIẾT

### **🔍 onClick cơ bản:**

```jsx
function ClickButton() {
  function handleClick(event) {
    console.log('Button clicked!');
    console.log('Event type:', event.type); // 'click'
    console.log('Target:', event.target); // <button> element
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

### **🔍 onClick với state:**

```jsx
function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  function handleClick() {
    setIsOn(!isOn);
  }

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: isOn ? '#4CAF50' : '#f44336',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer'
      }}
    >
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

### **🔍 onClick với parameters:**

```jsx
function ActionButtons() {
  function handleAction(actionType, data) {
    console.log(`${actionType}:`, data);
  }

  return (
    <div>
      <button onClick={() => handleAction('save', { id: 1, name: 'Doc' })}>
        Save Document
      </button>
      <button onClick={() => handleAction('delete', { id: 1 })}>
        Delete Document
      </button>
    </div>
  );
}
```

### **🔍 Multiple click handlers:**

```jsx
function MultiActionButton() {
  function handleSingleClick() {
    console.log('Single click');
  }

  function handleDoubleClick() {
    console.log('Double click');
  }

  return (
    <button
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      Click or double-click me
    </button>
  );
}
```

### **🔍 Conditional onClick:**

```jsx
function ConditionalButton({ isLoggedIn, onLogin, onLogout }) {
  return (
    <button onClick={isLoggedIn ? onLogout : onLogin}>
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  );
}
```

---

## 🔥 PHẦN 2: ONCHANGE EVENT - CHI TIẾT

### **🔍 onChange với text input:**

```jsx
function TextInput() {
  const [text, setText] = useState('');

  function handleChange(event) {
    console.log('New value:', event.target.value);
    setText(event.target.value);
  }

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>You typed: {text}</p>
    </div>
  );
}
```

### **🔍 onChange với destructuring:**

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <form>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First name"
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last name"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
    </form>
  );
}
```

### **🔍 onChange với different input types:**

```jsx
function MultiInputForm() {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    number: 0,
    checkbox: false,
    radio: 'option1',
    select: 'apple'
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  return (
    <form>
      {/* Text input */}
      <input
        name="text"
        type="text"
        value={formData.text}
        onChange={handleChange}
      />

      {/* Email input */}
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />

      {/* Password input */}
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      {/* Number input */}
      <input
        name="number"
        type="number"
        value={formData.number}
        onChange={handleChange}
      />

      {/* Checkbox */}
      <label>
        <input
          name="checkbox"
          type="checkbox"
          checked={formData.checkbox}
          onChange={handleChange}
        />
        Agree to terms
      </label>

      {/* Radio buttons */}
      <div>
        <label>
          <input
            name="radio"
            type="radio"
            value="option1"
            checked={formData.radio === 'option1'}
            onChange={handleChange}
          />
          Option 1
        </label>
        <label>
          <input
            name="radio"
            type="radio"
            value="option2"
            checked={formData.radio === 'option2'}
            onChange={handleChange}
          />
          Option 2
        </label>
      </div>

      {/* Select */}
      <select
        name="select"
        value={formData.select}
        onChange={handleChange}
      >
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
      </select>
    </form>
  );
}
```

### **🔍 onChange với validation:**

```jsx
function ValidatedInput() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function handleChange(event) {
    const newValue = event.target.value;
    setValue(newValue);

    // Real-time validation
    if (newValue.length < 3) {
      setError('Must be at least 3 characters');
    } else {
      setError('');
    }
  }

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          borderColor: error ? 'red' : '#ddd'
        }}
      />
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </div>
  );
}
```

---

## 🔥 PHẦN 3: ONSUBMIT EVENT - CHI TIẾT

### **🔍 onSubmit cơ bản:**

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault(); // ❌ Quan trọng: Ngăn reload trang

    console.log('Login attempt:', { email, password });

    // Simulate API call
    if (email && password) {
      alert('Login successful!');
    } else {
      alert('Please fill all fields');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### **🔍 onSubmit với validation:**

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  }

  function handleChange(field) {
    return (event) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value
      }));

      // Clear error when user types
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ''
        }));
      }
    };
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Registration successful:', formData);
    alert('Account created successfully!');

    // Reset form
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={formData.username}
          onChange={handleChange('username')}
          placeholder="Username"
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${errors.username ? 'red' : '#ddd'}`,
            borderRadius: 4
          }}
        />
        {errors.username && (
          <span style={{ color: 'red', fontSize: '14px' }}>
            {errors.username}
          </span>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          placeholder="Email"
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${errors.email ? 'red' : '#ddd'}`,
            borderRadius: 4
          }}
        />
        {errors.email && (
          <span style={{ color: 'red', fontSize: '14px' }}>
            {errors.email}
          </span>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          placeholder="Password"
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${errors.password ? 'red' : '#ddd'}`,
            borderRadius: 4
          }}
        />
        {errors.password && (
          <span style={{ color: 'red', fontSize: '14px' }}>
            {errors.password}
          </span>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          placeholder="Confirm Password"
          style={{
            width: '100%',
            padding: '8px',
            border: `1px solid ${errors.confirmPassword ? 'red' : '#ddd'}`,
            borderRadius: 4
          }}
        />
        {errors.confirmPassword && (
          <span style={{ color: 'red', fontSize: '14px' }}>
            {errors.confirmPassword}
          </span>
        )}
      </div>

      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        Create Account
      </button>
    </form>
  );
}
```

### **🔍 onSubmit với async operations:**

```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Sending message:', formData);
      setSubmitMessage('Message sent successfully!');

      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChange(field) {
    return (event) => {
      setFormData(prev => ({
        ...prev,
        [field]: event.target.value
      }));
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={handleChange('name')}
        placeholder="Your name"
        required
        disabled={isSubmitting}
      />

      <input
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        placeholder="Your email"
        required
        disabled={isSubmitting}
      />

      <textarea
        value={formData.message}
        onChange={handleChange('message')}
        placeholder="Your message"
        required
        disabled={isSubmitting}
        rows={4}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          opacity: isSubmitting ? 0.6 : 1,
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitMessage && (
        <p style={{
          color: submitMessage.includes('successfully') ? 'green' : 'red',
          marginTop: 16
        }}>
          {submitMessage}
        </p>
      )}
    </form>
  );
}
```

---

## 🔥 PHẦN 4: EVENT DELEGATION TRONG REACT

### **🔍 Event delegation với onClick:**

```jsx
function TodoList({ todos, onToggle, onDelete }) {
  function handleClick(event) {
    const { target } = event;
    const todoId = target.dataset.id;
    const action = target.dataset.action;

    if (!todoId || !action) return;

    if (action === 'toggle') {
      onToggle(todoId);
    } else if (action === 'delete') {
      onDelete(todoId);
    }
  }

  return (
    <ul onClick={handleClick}>
      {todos.map(todo => (
        <li key={todo.id} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px',
          borderBottom: '1px solid #eee'
        }}>
          <input
            type="checkbox"
            data-id={todo.id}
            data-action="toggle"
            checked={todo.completed}
          />
          <span style={{
            flex: 1,
            textDecoration: todo.completed ? 'line-through' : 'none'
          }}>
            {todo.text}
          </span>
          <button
            data-id={todo.id}
            data-action="delete"
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '4px 8px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 🔥 PHẦN 5: PREVENTDEFAULT & STOPPROPAGATION

### **🔍 preventDefault() patterns:**

```jsx
function LinkButton({ href, onCustomClick }) {
  function handleClick(event) {
    event.preventDefault(); // Ngăn navigation
    onCustomClick(href);
  }

  return (
    <a href={href} onClick={handleClick}>
      Custom Link
    </a>
  );
}

function FormWithCustomSubmit({ onSubmit }) {
  function handleSubmit(event) {
    event.preventDefault(); // Ngăn form submit mặc định
    // Custom validation logic
    onSubmit();
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### **🔍 stopPropagation() patterns:**

```jsx
function Modal({ onClose, children }) {
  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Ngăn đóng modal khi click nội dung
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 8,
          maxWidth: 500,
          width: '90%'
        }}
      >
        {children}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            background: 'none',
            border: 'none',
            fontSize: 24,
            cursor: 'pointer'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}
```

---

## ⚡ BÀI TẬP THỰC HÀNH

### **Bài 1: Interactive Like Button**

```jsx
function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  function handleClick() {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  }

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        backgroundColor: isLiked ? '#1877f2' : '#e4e6ea',
        color: isLiked ? 'white' : '#1c1e21',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600
      }}
    >
      <span>{isLiked ? '👍' : '👍'}</span>
      <span>{isLiked ? 'Liked' : 'Like'}</span>
      {likes > 0 && <span>({likes})</span>}
    </button>
  );
}
```

### **Bài 2: Search Input with Debounce**

```jsx
function SearchInput({ onSearch }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Search when debounced query changes
  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{
          width: '100%',
          padding: '12px 16px',
          paddingRight: 40,
          border: '1px solid #ddd',
          borderRadius: 6,
          fontSize: 16
        }}
      />
      <span style={{
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#666'
      }}>
        🔍
      </span>
    </div>
  );
}

// Usage
function App() {
  function handleSearch(query) {
    console.log('Searching for:', query);
    // API call here
  }

  return <SearchInput onSearch={handleSearch} />;
}
```

### **Bài 3: Multi-step Form**

```jsx
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    interests: []
  });

  const totalSteps = 3;

  function handleChange(field) {
    return (event) => {
      const value = event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };
  }

  function handleInterestChange(interest) {
    return (event) => {
      const checked = event.target.checked;
      setFormData(prev => ({
        ...prev,
        interests: checked
          ? [...prev.interests, interest]
          : prev.interests.filter(i => i !== interest)
      }));
    };
  }

  function nextStep() {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted:', formData);
    alert('Registration completed!');
  }

  function renderStep() {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3>Step 1: Personal Information</h3>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              placeholder="Full name"
              required
            />
            <input
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              placeholder="Email"
              required
            />
            <input
              type="number"
              value={formData.age}
              onChange={handleChange('age')}
              placeholder="Age"
              required
            />
          </div>
        );

      case 2:
        return (
          <div>
            <h3>Step 2: Location</h3>
            <select
              value={formData.country}
              onChange={handleChange('country')}
              required
            >
              <option value="">Select country</option>
              <option value="vn">Vietnam</option>
              <option value="us">United States</option>
              <option value="jp">Japan</option>
            </select>
          </div>
        );

      case 3:
        return (
          <div>
            <h3>Step 3: Interests</h3>
            <label>
              <input
                type="checkbox"
                checked={formData.interests.includes('tech')}
                onChange={handleInterestChange('tech')}
              />
              Technology
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.interests.includes('sports')}
                onChange={handleInterestChange('sports')}
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                checked={formData.interests.includes('music')}
                onChange={handleInterestChange('music')}
              />
              Music
            </label>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      {/* Progress indicator */}
      <div style={{ marginBottom: 20 }}>
        Step {currentStep} of {totalSteps}
        <div style={{
          width: '100%',
          height: 4,
          backgroundColor: '#e9ecef',
          borderRadius: 2,
          marginTop: 8
        }}>
          <div style={{
            width: `${(currentStep / totalSteps) * 100}%`,
            height: '100%',
            backgroundColor: '#007bff',
            borderRadius: 2,
            transition: 'width 0.3s'
          }} />
        </div>
      </div>

      {/* Step content */}
      {renderStep()}

      {/* Navigation buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20
      }}>
        {currentStep > 1 && (
          <button type="button" onClick={prevStep}>
            Previous
          </button>
        )}

        {currentStep < totalSteps ? (
          <button type="button" onClick={nextStep}>
            Next
          </button>
        ) : (
          <button type="submit">
            Complete Registration
          </button>
        )}
      </div>
    </form>
  );
}
```

---

## 📊 BẢNG TRA CỨU NHANH

| Event | Trigger | Common Use | preventDefault? |
|-------|---------|------------|----------------|
| `onClick` | User clicks element | Buttons, links, toggles | Sometimes |
| `onChange` | Input value changes | Text inputs, selects, checkboxes | No |
| `onSubmit` | Form submission | Forms | **Always** |
| `onFocus` | Element gains focus | Input validation | No |
| `onBlur` | Element loses focus | Input validation | No |
| `onKeyDown` | Key pressed | Shortcuts, navigation | Sometimes |
| `onMouseOver` | Mouse enters element | Hover effects | No |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Thành thạo onClick với state và parameters
- [ ] Biết xử lý onChange cho tất cả input types
- [ ] Luôn preventDefault() trong onSubmit
- [ ] Biết validation và error handling
- [ ] Hiểu event delegation patterns
- [ ] Thành thạo preventDefault vs stopPropagation
- [ ] Làm được 3 bài tập trên

---

## 🎯 TIẾP THEO

**Đã hiểu?** → Hỏi: **"Event delegation trong React"**

**Muốn luyện thêm?** → Hỏi: **"Cho bài tập về onClick, onChange, onSubmit"**

**Chưa rõ?** → Hỏi: **"Giải thích lại [phần nào đó]"**