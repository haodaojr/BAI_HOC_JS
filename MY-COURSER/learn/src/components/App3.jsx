import { useState } from 'react';
import './App.css';

// Tạo các components theo kiến thức từ Day-2
// Áp dụng component composition, file organization, import/export

// Component 1: Button (reusable UI component)
function Button({ children, variant = 'primary', onClick, disabled = false }) {
  const styles = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        border: 'none',
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        ...styles[variant]
      }}
    >
      {children}
    </button>
  );
}

// Component 2: Card (layout component)
function Card({ children, title }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: 8,
      padding: 16,
      margin: 16,
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {title && <h3 style={{ marginTop: 0 }}>{title}</h3>}
      {children}
    </div>
  );
}

// Component 3: UserProfile (business component)
function UserProfile({ user }) {
  return (
    <Card title="Thông tin người dùng">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <div>
          <h4 style={{ margin: 0 }}>{user.name}</h4>
          <p style={{ margin: 4, color: '#666' }}>{user.role}</p>
          <span style={{
            padding: '2px 8px',
            borderRadius: 12,
            fontSize: 12,
            backgroundColor: user.isOnline ? '#d4edda' : '#f8d7da',
            color: user.isOnline ? '#155724' : '#721c24'
          }}>
            {user.isOnline ? '🟢 Online' : '⚫ Offline'}
          </span>
        </div>
      </div>
    </Card>
  );
}

// Component 4: ProductList (composite component)
function ProductList({ products }) {
  return (
    <Card title={`Danh sách sản phẩm (${products.length})`}>
      <div style={{ display: 'grid', gap: 16 }}>
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </Card>
  );
}

// Component 5: ProductItem (child component của ProductList)
function ProductItem({ product }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: 12,
      border: '1px solid #eee',
      borderRadius: 4
    }}>
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: 80,
          height: 80,
          objectFit: 'cover',
          borderRadius: 4
        }}
      />
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0 }}>{product.name}</h4>
        <p style={{ margin: 4, color: '#666' }}>{product.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>
            {product.price.toLocaleString()}đ
          </span>
          <span style={{ color: '#ffa502' }}>
            {'⭐'.repeat(Math.floor(product.rating))}
          </span>
        </div>
      </div>
      <Button variant="primary" onClick={() => alert(`Đã thêm ${product.name} vào giỏ`)}>
        Thêm vào giỏ
      </Button>
    </div>
  );
}

// Component 6: Counter (interactive component)
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Card title="Counter Demo">
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 48, margin: 20 }}>{count}</h2>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <Button onClick={() => setCount(count - 1)} disabled={count <= 0}>
            Giảm
          </Button>
          <Button variant="secondary" onClick={() => setCount(0)}>
            Reset
          </Button>
          <Button onClick={() => setCount(count + 1)}>
            Tăng
          </Button>
        </div>
        {count > 10 && (
          <p style={{ color: 'red', marginTop: 16 }}>
            ⚠️ Số quá lớn! Hãy reset.
          </p>
        )}
      </div>
    </Card>
  );
}

// Component 7: TodoList (complex component)
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Học React components', completed: true },
    { id: 2, text: 'Tạo component library', completed: false },
    { id: 3, text: 'Refactor code', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
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

  return (
    <Card title="Todo List">
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Thêm công việc mới..."
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: 4
            }}
          />
          <Button onClick={addTodo}>Thêm</Button>
        </div>
      </div>

      <div>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </div>

      <div style={{ marginTop: 16, padding: '12px', backgroundColor: '#f8f9fa', borderRadius: 4 }}>
        <small>
          Hoàn thành: {todos.filter(t => t.completed).length}/{todos.length}
        </small>
      </div>
    </Card>
  );
}

// Component 8: TodoItem (child của TodoList)
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 0',
      borderBottom: '1px solid #eee'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
      />
      <span style={{
        flex: 1,
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#666' : '#000'
      }}>
        {todo.text}
      </span>
      <Button variant="danger" onClick={onDelete}>
        Xóa
      </Button>
    </div>
  );
}

// Component chính: App3
function App3() {
  // Data mẫu
  const user = {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "React Developer",
    isOnline: true
  };

  const products = [
    {
      id: 1,
      name: "Laptop Gaming",
      description: "CPU i7, RAM 16GB, RTX 3060",
      price: 25000000,
      image: "https://via.placeholder.com/100x100",
      rating: 4.5
    },
    {
      id: 2,
      name: "Mouse Gaming",
      description: "RGB, 16000 DPI, Wireless",
      price: 1200000,
      image: "https://via.placeholder.com/100x100",
      rating: 4.2
    },
    {
      id: 3,
      name: "Keyboard Mechanical",
      description: "Switch Blue, RGB, Hot-swappable",
      price: 3500000,
      image: "https://via.placeholder.com/100x100",
      rating: 4.8
    }
  ];

  return (
    <>
      {/* Header */}
      <div style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>React Components Demo - Day 2</h1>
        <p>Áp dụng kiến thức component composition, organization và patterns</p>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        {/* User Profile */}
        <UserProfile user={user} />

        {/* Counter */}
        <Counter />

        {/* Product List */}
        <ProductList products={products} />

        {/* Todo List */}
        <TodoList />

        {/* Footer */}
        <Card>
          <div style={{ textAlign: 'center', color: '#666' }}>
            <h3>🎉 Hoàn thành!</h3>
            <p>Đã áp dụng tất cả kiến thức về React components từ Day 2</p>
            <div style={{ marginTop: 16 }}>
              <Button variant="primary">Xem App2 (JSX)</Button>
              <Button variant="secondary" style={{ marginLeft: 8 }}>
                Xem App (Original)
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default App3;