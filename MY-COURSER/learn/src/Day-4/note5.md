# ⚡ PRACTICE: TẠO 5 INTERACTIVE COMPONENTS KHÁC NHAU

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **5 Interactive Components:**
1. **Counter with Steps** - Counter có thể tùy chỉnh step
2. **Color Picker** - Chọn màu với visual feedback
3. **Accordion** - Expandable panels
4. **Star Rating** - Đánh giá bằng sao
5. **Tabs** - Tab navigation system

**Mỗi component:**
- ✅ Interactive (events)
- ✅ State management
- ✅ Visual feedback
- ✅ Reusable

---

## 🔥 COMPONENT 1: COUNTER WITH STEPS

### **Yêu cầu:**
- Có thể tăng/giảm với step tùy chỉnh
- Hiển thị step hiện tại
- Reset về 0
- Validation: không âm

### **✅ CODE HOÀN CHỈNH:**

```jsx
function CounterWithSteps() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);

  function handleIncrement() {
    const newCount = count + step;
    setCount(newCount);
    setHistory(prev => [...prev, { action: 'increment', value: newCount, step }]);
  }

  function handleDecrement() {
    const newCount = Math.max(0, count - step); // Không âm
    setCount(newCount);
    setHistory(prev => [...prev, { action: 'decrement', value: newCount, step }]);
  }

  function handleReset() {
    setCount(0);
    setHistory(prev => [...prev, { action: 'reset', value: 0, step }]);
  }

  function handleStepChange(event) {
    const newStep = parseInt(event.target.value) || 1;
    setStep(Math.max(1, newStep)); // Tối thiểu 1
  }

  function undoLast() {
    if (history.length > 0) {
      const lastAction = history[history.length - 1];
      setCount(lastAction.value - (lastAction.action === 'increment' ? lastAction.step :
                                   lastAction.action === 'decrement' ? -lastAction.step : 0));
      setHistory(prev => prev.slice(0, -1));
    }
  }

  return (
    <div style={{
      border: '2px solid #007bff',
      borderRadius: 12,
      padding: 24,
      maxWidth: 400,
      margin: '20px auto',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#007bff' }}>
        Counter with Steps
      </h3>

      {/* Step selector */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
          Step: {step}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={handleStepChange}
          style={{ width: '100%' }}
        />
      </div>

      {/* Counter display */}
      <div style={{
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: '20px 0',
        color: count > 10 ? '#28a745' : count > 5 ? '#ffc107' : '#6c757d'
      }}>
        {count}
      </div>

      {/* Control buttons */}
      <div style={{
        display: 'flex',
        gap: 12,
        justifyContent: 'center',
        marginBottom: 16
      }}>
        <button
          onClick={handleDecrement}
          disabled={count === 0}
          style={{
            padding: '12px 20px',
            backgroundColor: count === 0 ? '#6c757d' : '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: count === 0 ? 'not-allowed' : 'pointer',
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          -{step}
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: '12px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          Reset
        </button>

        <button
          onClick={handleIncrement}
          style={{
            padding: '12px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          +{step}
        </button>
      </div>

      {/* Undo button */}
      {history.length > 0 && (
        <button
          onClick={undoLast}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 14,
            marginBottom: 16
          }}
        >
          ↶ Undo ({history.length})
        </button>
      )}

      {/* History */}
      {history.length > 0 && (
        <div>
          <h4 style={{ margin: '16px 0 8px 0' }}>History:</h4>
          <div style={{
            maxHeight: 100,
            overflowY: 'auto',
            backgroundColor: 'white',
            borderRadius: 4,
            padding: 8
          }}>
            {history.slice(-5).reverse().map((action, index) => (
              <div key={index} style={{
                fontSize: 12,
                color: '#666',
                marginBottom: 4
              }}>
                {action.action === 'increment' && `+${action.step} → ${action.value}`}
                {action.action === 'decrement' && `-${action.step} → ${action.value}`}
                {action.action === 'reset' && `Reset → 0`}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 🔥 COMPONENT 2: COLOR PICKER

### **Yêu cầu:**
- Chọn màu từ palette
- Preview màu được chọn
- Copy hex code
- Random color generator

### **✅ CODE HOÀN CHỈNH:**

```jsx
function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#007bff');
  const [customColor, setCustomColor] = useState('#007bff');
  const [copied, setCopied] = useState(false);

  const colorPalette = [
    '#007bff', '#28a745', '#dc3545', '#ffc107',
    '#17a2b8', '#6f42c1', '#e83e8c', '#fd7e14',
    '#20c997', '#6c757d', '#343a40', '#007bff'
  ];

  function handleColorSelect(color) {
    setSelectedColor(color);
    setCustomColor(color);
  }

  function handleCustomColorChange(event) {
    const color = event.target.value;
    setCustomColor(color);
    setSelectedColor(color);
  }

  function generateRandomColor() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    setSelectedColor(randomColor);
    setCustomColor(randomColor);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(selectedColor).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: 12,
      padding: 24,
      maxWidth: 400,
      margin: '20px auto',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#28a745' }}>
        Color Picker
      </h3>

      {/* Color preview */}
      <div style={{
        width: '100%',
        height: 120,
        backgroundColor: selectedColor,
        borderRadius: 8,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textShadow: '0 0 4px rgba(0,0,0,0.5)'
      }}>
        {selectedColor.toUpperCase()}
      </div>

      {/* Color palette */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Palette:</h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8
        }}>
          {colorPalette.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorSelect(color)}
              style={{
                width: 60,
                height: 60,
                backgroundColor: color,
                border: selectedColor === color ? '3px solid #000' : '2px solid #ddd',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          ))}
        </div>
      </div>

      {/* Custom color input */}
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ margin: '0 0 12px 0' }}>Custom Color:</h4>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            style={{
              width: 60,
              height: 60,
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          />
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => {
              setSelectedColor(e.target.value);
              setCustomColor(e.target.value);
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: 4,
              fontFamily: 'monospace'
            }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={generateRandomColor}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 16
          }}
        >
          🎲 Random
        </button>

        <button
          onClick={copyToClipboard}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: copied ? '#28a745' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 16
          }}
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>
      </div>
    </div>
  );
}
```

---

## 🔥 COMPONENT 3: ACCORDION

### **Yêu cầu:**
- Multiple expandable panels
- Only one panel open at a time
- Smooth animations
- Keyboard navigation

### **✅ CODE HOÀN CHỈNH:**

```jsx
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const panels = [
    {
      id: 1,
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently.'
    },
    {
      id: 2,
      title: 'Why use React?',
      content: 'React provides a component-based architecture, virtual DOM for performance, and a large ecosystem of tools and libraries. It makes building complex UIs more manageable.'
    },
    {
      id: 3,
      title: 'How does React work?',
      content: 'React uses a virtual DOM to track changes and efficiently update the real DOM. Components re-render when their state or props change, and React handles the diffing and patching.'
    },
    {
      id: 4,
      title: 'What is JSX?',
      content: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. It gets compiled to React.createElement() calls.'
    }
  ];

  function togglePanel(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  function handleKeyDown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePanel(index);
    }
  }

  return (
    <div style={{
      border: '2px solid #ffc107',
      borderRadius: 12,
      padding: 0,
      maxWidth: 600,
      margin: '20px auto',
      backgroundColor: '#f8f9fa',
      overflow: 'hidden'
    }}>
      <h3 style={{
        margin: 0,
        padding: 20,
        backgroundColor: '#ffc107',
        color: '#212529',
        textAlign: 'center'
      }}>
        Accordion FAQ
      </h3>

      {panels.map((panel, index) => (
        <div key={panel.id}>
          {/* Panel header */}
          <button
            onClick={() => togglePanel(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: activeIndex === index ? '#fff3cd' : 'white',
              border: 'none',
              borderBottom: index < panels.length - 1 ? '1px solid #dee2e6' : 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'background-color 0.3s'
            }}
            aria-expanded={activeIndex === index}
            aria-controls={`panel-${panel.id}`}
          >
            <span>{panel.title}</span>
            <span style={{
              transform: activeIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s',
              fontSize: 12
            }}>
              ▼
            </span>
          </button>

          {/* Panel content */}
          <div
            id={`panel-${panel.id}`}
            style={{
              maxHeight: activeIndex === index ? '500px' : '0',
              overflow: 'hidden',
              transition: 'max-height 0.3s ease-in-out',
              backgroundColor: 'white'
            }}
          >
            <div style={{
              padding: activeIndex === index ? '0 20px 20px 20px' : '0 20px',
              color: '#6c757d',
              lineHeight: 1.6
            }}>
              {panel.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 🔥 COMPONENT 4: STAR RATING

### **Yêu cầu:**
- Click vào sao để đánh giá
- Hover preview
- Hiển thị rating text
- Reset rating

### **✅ CODE HOÀN CHỈNH:**

```jsx
function StarRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const ratingLabels = {
    0: 'No rating',
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  function handleStarClick(starValue) {
    setRating(starValue);
  }

  function handleStarHover(starValue) {
    setHoverRating(starValue);
  }

  function handleMouseLeave() {
    setHoverRating(0);
  }

  function resetRating() {
    setRating(0);
    setHoverRating(0);
  }

  function renderStar(starValue) {
    const isActive = starValue <= (hoverRating || rating);
    return (
      <span
        key={starValue}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => handleStarHover(starValue)}
        style={{
          fontSize: 32,
          cursor: 'pointer',
          color: isActive ? '#ffc107' : '#e9ecef',
          transition: 'color 0.2s',
          userSelect: 'none'
        }}
      >
        ★
      </span>
    );
  }

  const currentRating = hoverRating || rating;

  return (
    <div style={{
      border: '2px solid #e83e8c',
      borderRadius: 12,
      padding: 24,
      maxWidth: 400,
      margin: '20px auto',
      backgroundColor: '#f8f9fa',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#e83e8c' }}>
        Star Rating
      </h3>

      {/* Stars */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 16
        }}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map(starValue => renderStar(starValue))}
      </div>

      {/* Rating display */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: currentRating > 0 ? '#ffc107' : '#6c757d',
          marginBottom: 8
        }}>
          {currentRating > 0 ? `${currentRating}/5` : '☆'}
        </div>
        <div style={{
          fontSize: 18,
          color: '#6c757d',
          fontWeight: 500
        }}>
          {ratingLabels[currentRating]}
        </div>
      </div>

      {/* Rating summary */}
      {rating > 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: 16,
          borderRadius: 8,
          marginBottom: 16
        }}>
          <h4 style={{ margin: '0 0 8px 0', color: '#28a745' }}>
            Thank you for rating!
          </h4>
          <p style={{ margin: 0, color: '#6c757d' }}>
            You rated this {ratingLabels[rating].toLowerCase()} ({rating} star{rating !== 1 ? 's' : ''})
          </p>
        </div>
      )}

      {/* Reset button */}
      {(rating > 0 || hoverRating > 0) && (
        <button
          onClick={resetRating}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14
          }}
        >
          Reset Rating
        </button>
      )}

      {/* Statistics */}
      <div style={{
        marginTop: 20,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        fontSize: 14,
        color: '#6c757d'
      }}>
        <div>Current Rating: {rating}</div>
        <div>Hover Preview: {hoverRating}</div>
        <div>Display Rating: {currentRating}</div>
      </div>
    </div>
  );
}
```

---

## 🔥 COMPONENT 5: TABS

### **Yêu cầu:**
- Multiple tabs
- Content switching
- Active tab indicator
- Keyboard navigation

### **✅ CODE HOÀN CHỈNH:**

```jsx
function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 'home',
      title: 'Home',
      icon: '🏠',
      content: (
        <div>
          <h3>Welcome Home!</h3>
          <p>This is the home tab content. You can put any content here.</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </div>
      )
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: '👤',
      content: (
        <div>
          <h3>User Profile</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              style={{ borderRadius: '50%' }}
            />
            <div>
              <h4>John Doe</h4>
              <p>Software Developer</p>
              <p>📧 john@example.com</p>
            </div>
          </div>
          <p>Bio: Passionate developer who loves React and modern web technologies.</p>
        </div>
      )
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      content: (
        <div>
          <h3>Settings</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4 }}>Theme:</label>
              <select style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}>
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4 }}>Notifications:</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" defaultChecked />
                Enable notifications
              </label>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 4 }}>Language:</label>
              <select style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}>
                <option>English</option>
                <option>Vietnamese</option>
                <option>French</option>
              </select>
            </div>
            <button
              type="submit"
              style={{
                padding: '12px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              Save Settings
            </button>
          </form>
        </div>
      )
    },
    {
      id: 'about',
      title: 'About',
      icon: 'ℹ️',
      content: (
        <div>
          <h3>About This App</h3>
          <p>This is a demonstration of a tabbed interface built with React.</p>
          <div style={{ backgroundColor: '#f8f9fa', padding: 16, borderRadius: 8, marginTop: 16 }}>
            <h4>Features:</h4>
            <ul>
              <li>Responsive design</li>
              <li>Keyboard navigation</li>
              <li>Accessible markup</li>
              <li>Smooth transitions</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  function handleTabClick(index) {
    setActiveTab(index);
  }

  function handleKeyDown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveTab(index);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setActiveTab((activeTab + 1) % tabs.length);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setActiveTab(activeTab === 0 ? tabs.length - 1 : activeTab - 1);
    }
  }

  return (
    <div style={{
      border: '2px solid #6f42c1',
      borderRadius: 12,
      padding: 0,
      maxWidth: 800,
      margin: '20px auto',
      backgroundColor: '#f8f9fa',
      overflow: 'hidden'
    }}>
      {/* Tab headers */}
      <div style={{
        display: 'flex',
        backgroundColor: '#6f42c1',
        borderBottom: '1px solid #5a32a3'
      }}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              flex: 1,
              padding: '16px 20px',
              backgroundColor: activeTab === index ? 'white' : 'transparent',
              color: activeTab === index ? '#6f42c1' : 'white',
              border: 'none',
              borderBottom: activeTab === index ? '3px solid #6f42c1' : '3px solid transparent',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: activeTab === index ? 'bold' : 'normal',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
            aria-selected={activeTab === index}
            role="tab"
          >
            <span>{tab.icon}</span>
            <span>{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{
        padding: 24,
        backgroundColor: 'white',
        minHeight: 300
      }}>
        {tabs[activeTab].content}
      </div>

      {/* Tab indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #dee2e6'
      }}>
        <div style={{
          display: 'flex',
          gap: 8
        }}>
          {tabs.map((_, index) => (
            <div
              key={index}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: activeTab === index ? '#6f42c1' : '#dee2e6',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onClick={() => setActiveTab(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 📊 BẢNG TỔNG HỢP

| Component | Main Event | State | Features |
|-----------|------------|-------|----------|
| **Counter** | onClick | count, step, history | Custom steps, undo |
| **Color Picker** | onClick, onChange | selectedColor | Palette, custom, copy |
| **Accordion** | onClick | activeIndex | Animation, keyboard nav |
| **Star Rating** | onClick, onMouseEnter | rating, hoverRating | Preview, labels |
| **Tabs** | onClick | activeTab | Keyboard nav, indicators |

---

## ✅ CHECKLIST TỰ ĐÁNH GIÁ

- [ ] Tạo được Counter with custom steps
- [ ] Implement Color Picker với palette
- [ ] Xây dựng Accordion với animations
- [ ] Làm Star Rating với hover preview
- [ ] Tạo Tabs với keyboard navigation
- [ ] Mỗi component đều interactive và có state
- [ ] Code clean và reusable

---

## 🎯 TIẾP THEO

**Đã hoàn thành 5 components?** → Hỏi: **"Build calculator UI với event handling"**

**Muốn luyện thêm?** → Hỏi: **"Cho thêm interactive components khác"**

**Chưa rõ?** → Hỏi: **"Giải thích lại component [tên]"**