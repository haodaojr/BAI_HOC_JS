# ⚡ INTEGRATION PATTERNS - KẾT HỢP EVENTS VỚI COMPONENTS

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Integration Patterns:**
- ✅ **Component Communication**: Parent ↔ Child events
- ✅ **Event Bubbling**: Nested component events
- ✅ **Global State**: Cross-component communication
- ✅ **Custom Hooks**: Reusable event logic
- ✅ **Context API**: Global event handling

---

## 🔥 PATTERN 1: PARENT-CHILD COMMUNICATION

### **🔍 Callback Props Pattern:**

```jsx
// Parent Component
function TodoApp() {
  const [todos, setTodos] = useState([]);

  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  return (
    <div>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodo} />
    </div>
  );
}

// Child Component - Form
function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add new todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

// Child Component - List
function TodoList({ todos, onToggleTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, onToggle }) {
  return (
    <li>
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
    </li>
  );
}
```

---

## 🔥 PATTERN 2: EVENT BUBBLING WITH DELEGATION

### **🔍 Complex Nested Components:**

```jsx
function Dashboard() {
  function handleDashboardClick(event) {
    // Handle dashboard-wide events
    console.log('Dashboard clicked');
  }

  return (
    <div onClick={handleDashboardClick}>
      <Header />
      <Sidebar onMenuClick={(menuId) => console.log('Menu:', menuId)} />
      <MainContent />
    </div>
  );
}

function Sidebar({ onMenuClick }) {
  function handleSidebarClick(event) {
    // Stop bubbling for sidebar-specific actions
    if (event.target.closest('.menu-item')) {
      event.stopPropagation();
    }
  }

  return (
    <div className="sidebar" onClick={handleSidebarClick}>
      <MenuList onMenuClick={onMenuClick} />
    </div>
  );
}

function MenuList({ onMenuClick }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Users' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <ul>
      {menuItems.map(item => (
        <li key={item.id}>
          <button
            className="menu-item"
            onClick={() => onMenuClick(item.id)}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 🔥 PATTERN 3: GLOBAL EVENT HANDLING

### **🔍 Window/Global Events:**

```jsx
function useGlobalEvents() {
  useEffect(() => {
    function handleKeyDown(event) {
      // Global keyboard shortcuts
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        console.log('Save shortcut triggered');
      }

      if (event.key === 'Escape') {
        console.log('Escape pressed - close modals, etc.');
      }
    }

    function handleResize() {
      console.log('Window resized:', window.innerWidth, window.innerHeight);
    }

    function handleOnlineStatus() {
      console.log('Online status changed:', navigator.onLine);
    }

    // Add listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
}

function App() {
  useGlobalEvents(); // Apply global event handling

  return (
    <div>
      <h1>App with Global Events</h1>
      <p>Try pressing Ctrl+S or Escape</p>
    </div>
  );
}
```

---

## 🔥 PATTERN 4: CUSTOM HOOKS FOR EVENTS

### **🔍 useEventListener Hook:**

```jsx
function useEventListener(eventName, handler, element = window) {
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event) => savedHandler.current(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

// Usage
function MyComponent() {
  const [keyPressed, setKeyPressed] = useState('');

  useEventListener('keydown', (event) => {
    setKeyPressed(event.key);
  });

  return (
    <div>
      <p>Last key pressed: {keyPressed}</p>
      <input placeholder="Focus and type..." />
    </div>
  );
}
```

### **🔍 useLocalStorage Hook with Events:**

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));

      // Dispatch custom event for cross-tab synchronization
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key, value: valueToStore }
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);

  useEventListener('localStorageChange', (event) => {
    if (event.detail.key === 'todos') {
      console.log('Todos updated in another tab:', event.detail.value);
    }
  });

  return (
    <div>
      {/* Todo app */}
    </div>
  );
}
```

---

## 🔥 PATTERN 5: CONTEXT API FOR EVENTS

### **🔍 Event Context:**

```jsx
const EventContext = createContext();

function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  const dispatchEvent = useCallback((eventType, payload) => {
    const event = {
      id: Date.now(),
      type: eventType,
      payload,
      timestamp: new Date()
    };

    setEvents(prev => [event, ...prev]);

    // Trigger event listeners
    window.dispatchEvent(new CustomEvent(eventType, { detail: payload }));
  }, []);

  const value = {
    events,
    dispatchEvent
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within EventProvider');
  }
  return context;
}

// Usage
function App() {
  return (
    <EventProvider>
      <Dashboard />
    </EventProvider>
  );
}

function Dashboard() {
  const { dispatchEvent, events } = useEvents();

  function handleUserAction(action) {
    dispatchEvent('user_action', { action, userId: 123 });
  }

  return (
    <div>
      <button onClick={() => handleUserAction('save')}>Save</button>
      <button onClick={() => handleUserAction('delete')}>Delete</button>

      <EventLog events={events} />
    </div>
  );
}

function EventLog({ events }) {
  return (
    <div>
      <h3>Event Log</h3>
      {events.map(event => (
        <div key={event.id}>
          {event.type}: {JSON.stringify(event.payload)}
        </div>
      ))}
    </div>
  );
}
```

---

## 🔥 PATTERN 6: EVENT MIDDLEWARE

### **🔍 Event Processing Pipeline:**

```jsx
function useEventMiddleware() {
  const [eventQueue, setEventQueue] = useState([]);
  const [processedEvents, setProcessedEvents] = useState([]);

  const middlewares = [
    // Logger middleware
    (event) => {
      console.log('Event:', event.type, event.payload);
      return event;
    },

    // Validation middleware
    (event) => {
      if (!event.type) {
        throw new Error('Event must have a type');
      }
      return event;
    },

    // Analytics middleware
    (event) => {
      // Send to analytics service
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', event.type, event.payload);
      }
      return event;
    }
  ];

  const dispatchEvent = useCallback(async (eventType, payload) => {
    let event = { type: eventType, payload, timestamp: new Date() };

    // Add to queue
    setEventQueue(prev => [...prev, event]);

    try {
      // Process through middlewares
      for (const middleware of middlewares) {
        event = await middleware(event);
      }

      // Mark as processed
      setProcessedEvents(prev => [...prev, event]);
      setEventQueue(prev => prev.filter(e => e !== event));

    } catch (error) {
      console.error('Event processing error:', error);
      setEventQueue(prev => prev.filter(e => e !== event));
    }
  }, []);

  return {
    dispatchEvent,
    eventQueue,
    processedEvents
  };
}

// Usage
function App() {
  const { dispatchEvent, eventQueue, processedEvents } = useEventMiddleware();

  return (
    <div>
      <button onClick={() => dispatchEvent('button_click', { buttonId: 'save' })}>
        Save
      </button>

      <div>
        <h4>Processing: {eventQueue.length}</h4>
        <h4>Processed: {processedEvents.length}</h4>
      </div>
    </div>
  );
}
```

---

## 🔥 PATTERN 7: ASYNC EVENT HANDLING

### **🔍 Debounced Events:**

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log('Searching for:', debouncedSearchTerm);
      // API call here
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### **🔍 Throttled Events:**

```jsx
function useThrottle(callback, delay) {
  const lastRan = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRan.current >= delay) {
      callback(...args);
      lastRan.current = Date.now();
    }
  }, [callback, delay]);
}

function ScrollComponent() {
  const handleScroll = useThrottle(() => {
    console.log('Scroll event (throttled)');
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div style={{ height: '200vh' }}>
      <p>Scroll to see throttled events</p>
    </div>
  );
}
```

---

## 📊 INTEGRATION PATTERNS SUMMARY

| Pattern | Use Case | Complexity | Performance |
|---------|----------|------------|-------------|
| **Callback Props** | Parent-child communication | Low | High |
| **Event Delegation** | Large lists, nested components | Medium | High |
| **Global Events** | App-wide shortcuts, window events | Low | Medium |
| **Custom Hooks** | Reusable event logic | Medium | High |
| **Context API** | Cross-component communication | High | Medium |
| **Event Middleware** | Complex event processing | High | Medium |
| **Async Events** | API calls, debouncing | High | High |

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Callback props pattern for component communication
- [ ] Event delegation for large component trees
- [ ] Global event handling with useEffect
- [ ] Custom hooks for reusable event logic
- [ ] Context API for global state/events
- [ ] Event middleware for processing pipelines
- [ ] Async event handling (debounce/throttle)
- [ ] Error handling in event chains
- [ ] Performance optimization techniques

---

## 🎯 FINAL INTEGRATION EXAMPLE

**Complete App with All Patterns:**

```jsx
// App.jsx
function App() {
  return (
    <EventProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Dashboard />
          </Layout>
        </Router>
      </ThemeProvider>
    </EventProvider>
  );
}

// Dashboard.jsx
function Dashboard() {
  const { dispatchEvent } = useEvents();
  const { theme, toggleTheme } = useTheme();

  useGlobalEvents(); // Keyboard shortcuts, etc.

  function handleUserAction(action) {
    dispatchEvent('user_action', { action, timestamp: Date.now() });
  }

  return (
    <div>
      <Header onThemeToggle={toggleTheme} />
      <Sidebar onMenuClick={handleUserAction} />
      <MainContent onAction={handleUserAction} />
    </div>
  );
}
```

**This creates a fully integrated event system where:**
- Components communicate through callbacks
- Global events are handled centrally
- State changes trigger appropriate UI updates
- Performance is optimized through delegation
- User interactions are tracked and processed