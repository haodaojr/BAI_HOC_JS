# ⚡ PRACTICE: BUILD COMPONENT LIBRARY NHỎ (BUTTON, CARD, AVATAR, BADGE) - PHIÊN BẢN NHANH

## 🎯 MỤC TIÊU BÀI TẬP

**Sau bài này bạn sẽ:**
- Tạo được component library hoàn chỉnh
- Hiểu cách thiết kế component API
- Biết cách handle variants và props
- Có thể reuse components trong nhiều dự án

---

## 📝 BÀI TẬP 1: BUTTON COMPONENT

### **Yêu cầu:**
Tạo Button component với:
- Variants: primary, secondary, success, danger, warning
- Sizes: small, medium, large
- States: disabled, loading
- Events: onClick
- Icon support (left/right)

### **✅ IMPLEMENTATION:**

```jsx
// components/ui/Button.jsx
import { useState } from 'react';

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  ...props
}) {
  const [isPressed, setIsPressed] = useState(false);
  
  // Base styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    userSelect: 'none',
    outline: 'none',
    position: 'relative',
    overflow: 'hidden'
  };
  
  // Variant styles
  const variants = {
    primary: {
      backgroundColor: disabled ? '#ccc' : '#007bff',
      color: 'white',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: disabled ? '#ccc' : '#0056b3'
      }
    },
    secondary: {
      backgroundColor: disabled ? '#ccc' : '#6c757d',
      color: 'white',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: disabled ? '#ccc' : '#545b62'
      }
    },
    success: {
      backgroundColor: disabled ? '#ccc' : '#28a745',
      color: 'white',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: disabled ? '#ccc' : '#1e7e34'
      }
    },
    danger: {
      backgroundColor: disabled ? '#ccc' : '#dc3545',
      color: 'white',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: disabled ? '#ccc' : '#bd2130'
      }
    },
    warning: {
      backgroundColor: disabled ? '#ccc' : '#ffc107',
      color: '#212529',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: disabled ? '#ccc' : '#e0a800'
      }
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#007bff',
      border: '1px solid #007bff',
      '&:hover': {
        backgroundColor: '#007bff',
        color: 'white'
      }
    }
  };
  
  // Size styles
  const sizes = {
    small: {
      padding: '6px 12px',
      fontSize: 14,
      height: 32
    },
    medium: {
      padding: '8px 16px',
      fontSize: 16,
      height: 40
    },
    large: {
      padding: '12px 24px',
      fontSize: 18,
      height: 48
    }
  };
  
  // Loading spinner
  const LoadingSpinner = () => (
    <div style={{
      width: 16,
      height: 16,
      border: '2px solid transparent',
      borderTop: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  );
  
  // Handle click
  const handleClick = (event) => {
    if (disabled || loading) return;
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    
    if (onClick) {
      onClick(event);
    }
  };
  
  // Combine styles
  const buttonStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    opacity: (disabled || loading) ? 0.6 : 1,
    transform: isPressed ? 'scale(0.98)' : 'scale(1)'
  };
  
  // Render icon
  const renderIcon = () => {
    if (!icon) return null;
    return <span style={{ fontSize: size === 'small' ? 14 : size === 'large' ? 20 : 16 }}>{icon}</span>;
  };
  
  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <button
        type={type}
        style={buttonStyles}
        disabled={disabled || loading}
        onClick={handleClick}
        {...props}
      >
        {loading && <LoadingSpinner />}
        
        {icon && iconPosition === 'left' && renderIcon()}
        
        {!loading && children}
        
        {icon && iconPosition === 'right' && renderIcon()}
      </button>
    </>
  );
}

export default Button;
```

### **📖 USAGE EXAMPLES:**

```jsx
// Basic usage
<Button>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="outline">Outline</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// With icons
<Button icon="📧">Send Email</Button>
<Button icon="➕" iconPosition="right">Add Item</Button>

// Events
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>
```

---

## 📝 BÀI TẬP 2: CARD COMPONENT

### **Yêu cầu:**
Tạo Card component với:
- Header, body, footer sections
- Shadow variants
- Border radius options
- Hover effects
- Custom styling support

### **✅ IMPLEMENTATION:**

```jsx
// components/ui/Card.jsx
function Card({
  children,
  shadow = 'medium',
  borderRadius = 'medium',
  hoverable = false,
  padding = 'medium',
  className = '',
  style = {},
  ...props
}) {
  // Shadow variants
  const shadows = {
    none: 'none',
    small: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    medium: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    large: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
    xl: '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)'
  };
  
  // Border radius variants
  const borderRadii = {
    none: 0,
    small: 4,
    medium: 8,
    large: 12,
    xl: 16,
    full: 9999
  };
  
  // Padding variants
  const paddings = {
    none: 0,
    small: 12,
    medium: 16,
    large: 24,
    xl: 32
  };
  
  // Base styles
  const baseStyles = {
    backgroundColor: 'white',
    borderRadius: borderRadii[borderRadius],
    boxShadow: shadows[shadow],
    overflow: 'hidden',
    transition: hoverable ? 'all 0.3s ease' : 'none',
    cursor: hoverable ? 'pointer' : 'default'
  };
  
  // Hover styles
  const hoverStyles = hoverable ? {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: shadows.large
    }
  } : {};
  
  // Content styles
  const contentStyles = {
    padding: paddings[padding]
  };
  
  return (
    <div
      className={`card ${className}`}
      style={{
        ...baseStyles,
        ...hoverStyles,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Sub-components for better composition
function CardHeader({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`card-header ${className}`}
      style={{
        padding: '16px 24px',
        borderBottom: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardBody({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`card-body ${className}`}
      style={{
        padding: '24px',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function CardFooter({ children, className = '', style = {}, ...props }) {
  return (
    <div
      className={`card-footer ${className}`}
      style={{
        padding: '16px 24px',
        borderTop: '1px solid #e9ecef',
        backgroundColor: '#f8f9fa',
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Attach sub-components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
```

### **📖 USAGE EXAMPLES:**

```jsx
import Card from './components/ui/Card';

// Basic card
<Card>
  <h3>Card Title</h3>
  <p>Card content...</p>
</Card>

// Card with shadow variants
<Card shadow="small">Small shadow</Card>
<Card shadow="large">Large shadow</Card>

// Card with different padding
<Card padding="small">Small padding</Card>
<Card padding="large">Large padding</Card>

// Hoverable card
<Card hoverable>
  <h3>Hover me!</h3>
  <p>This card has hover effects</p>
</Card>

// Structured card with header/body/footer
<Card>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  
  <Card.Body>
    <p>This is the main content of the card.</p>
    <p>More content here...</p>
  </Card.Body>
  
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>

// Custom styling
<Card 
  style={{ 
    backgroundColor: '#f8f9fa',
    border: '2px solid #007bff' 
  }}
>
  Custom styled card
</Card>
```

---

## 📝 BÀI TẬP 3: AVATAR COMPONENT

### **Yêu cầu:**
Tạo Avatar component với:
- Hình ảnh hoặc fallback text/icon
- Kích thước linh hoạt
- Status indicator (online/offline)
- Border và shadow options
- Lazy loading

### **✅ IMPLEMENTATION:**

```jsx
// components/ui/Avatar.jsx
import { useState } from 'react';

function Avatar({
  src,
  alt = '',
  size = 40,
  shape = 'circle', // circle, square, rounded
  status, // online, offline, away, busy
  statusPosition = 'bottom-right',
  border = false,
  borderColor = '#ffffff',
  borderWidth = 2,
  shadow = false,
  fallbackIcon = '👤',
  fallbackText,
  lazy = false,
  onClick,
  className = '',
  style = {},
  ...props
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  
  // Base styles
  const baseStyles = {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: onClick ? 'pointer' : 'default',
    userSelect: 'none',
    transition: 'all 0.2s ease'
  };
  
  // Shape styles
  const shapes = {
    circle: { borderRadius: '50%' },
    square: { borderRadius: 0 },
    rounded: { borderRadius: 8 }
  };
  
  // Status styles
  const statusStyles = {
    position: 'absolute',
    width: size * 0.3,
    height: size * 0.3,
    borderRadius: '50%',
    border: `${borderWidth}px solid ${borderColor}`,
    zIndex: 1
  };
  
  const statusColors = {
    online: '#28a745',
    offline: '#6c757d',
    away: '#ffc107',
    busy: '#dc3545'
  };
  
  const statusPositions = {
    'top-left': { top: -2, left: -2 },
    'top-right': { top: -2, right: -2 },
    'bottom-left': { bottom: -2, left: -2 },
    'bottom-right': { bottom: -2, right: -2 }
  };
  
  // Fallback content
  const getFallbackContent = () => {
    if (fallbackText) {
      return (
        <span style={{
          fontSize: size * 0.4,
          fontWeight: 600,
          color: '#6c757d'
        }}>
          {fallbackText.charAt(0).toUpperCase()}
        </span>
      );
    }
    
    return (
      <span style={{ fontSize: size * 0.5 }}>
        {fallbackIcon}
      </span>
    );
  };
  
  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Combine styles
  const avatarStyles = {
    ...baseStyles,
    ...shapes[shape],
    border: border ? `${borderWidth}px solid ${borderColor}` : 'none',
    boxShadow: shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    backgroundColor: (!src || imageError) ? '#f8f9fa' : 'transparent',
    ...style
  };
  
  // Status indicator
  const renderStatus = () => {
    if (!status) return null;
    
    return (
      <span
        style={{
          ...statusStyles,
          ...statusPositions[statusPosition],
          backgroundColor: statusColors[status]
        }}
      />
    );
  };
  
  // Image element
  const renderImage = () => {
    if (!src || imageError) return null;
    
    return (
      <img
        src={isInView ? src : ''}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: shapes[shape].borderRadius,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading={lazy ? 'lazy' : 'eager'}
      />
    );
  };
  
  // Handle click
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
    }
  };
  
  return (
    <div
      className={`avatar ${className}`}
      style={avatarStyles}
      onClick={handleClick}
      {...props}
    >
      {renderImage()}
      {(!src || imageError) && getFallbackContent()}
      {renderStatus()}
    </div>
  );
}

export default Avatar;
```

### **📖 USAGE EXAMPLES:**

```jsx
import Avatar from './components/ui/Avatar';

// Basic avatar
<Avatar src="https://i.pravatar.cc/100?img=1" alt="User" />

// Different sizes
<Avatar src="https://i.pravatar.cc/100?img=1" size={32} />
<Avatar src="https://i.pravatar.cc/100?img=1" size={64} />

// Shapes
<Avatar src="https://i.pravatar.cc/100?img=1" shape="circle" />
<Avatar src="https://i.pravatar.cc/100?img=1" shape="square" />
<Avatar src="https://i.pravatar.cc/100?img=1" shape="rounded" />

// With status
<Avatar 
  src="https://i.pravatar.cc/100?img=1" 
  status="online" 
/>
<Avatar 
  src="https://i.pravatar.cc/100?img=1" 
  status="busy" 
  statusPosition="top-right"
/>

// Fallback options
<Avatar fallbackText="John Doe" />
<Avatar fallbackIcon="🧑" />

// With border and shadow
<Avatar 
  src="https://i.pravatar.cc/100?img=1" 
  border 
  shadow 
/>

// Clickable avatar
<Avatar 
  src="https://i.pravatar.cc/100?img=1" 
  onClick={() => console.log('Avatar clicked!')}
/>

// Lazy loading
<Avatar 
  src="https://i.pravatar.cc/100?img=1" 
  lazy 
/>
```

---

## 📝 BÀI TẬP 4: BADGE COMPONENT

### **Yêu cầu:**
Tạo Badge component với:
- Variants: primary, secondary, success, danger, warning, info
- Sizes: small, medium, large
- Shapes: pill, square
- Icons support
- Dot variant (chỉ màu)
- Position options (absolute positioning)

### **✅ IMPLEMENTATION:**

```jsx
// components/ui/Badge.jsx
function Badge({
  children,
  variant = 'primary',
  size = 'medium',
  shape = 'pill', // pill, square
  icon,
  iconPosition = 'left',
  dot = false, // true for dot-only badge
  position, // absolute positioning: top-left, top-right, bottom-left, bottom-right
  className = '',
  style = {},
  ...props
}) {
  // Base styles
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    fontWeight: 600,
    fontFamily: 'inherit',
    userSelect: 'none',
    transition: 'all 0.2s ease'
  };
  
  // Variant styles
  const variants = {
    primary: {
      backgroundColor: '#007bff',
      color: 'white'
    },
    secondary: {
      backgroundColor: '#6c757d',
      color: 'white'
    },
    success: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    danger: {
      backgroundColor: '#dc3545',
      color: 'white'
    },
    warning: {
      backgroundColor: '#ffc107',
      color: '#212529'
    },
    info: {
      backgroundColor: '#17a2b8',
      color: 'white'
    },
    light: {
      backgroundColor: '#f8f9fa',
      color: '#212529',
      border: '1px solid #dee2e6'
    },
    dark: {
      backgroundColor: '#343a40',
      color: 'white'
    }
  };
  
  // Size styles
  const sizes = {
    small: {
      padding: dot ? '0' : '2px 6px',
      fontSize: 12,
      height: dot ? 8 : 'auto',
      width: dot ? 8 : 'auto'
    },
    medium: {
      padding: dot ? '0' : '4px 8px',
      fontSize: 14,
      height: dot ? 10 : 'auto',
      width: dot ? 10 : 'auto'
    },
    large: {
      padding: dot ? '0' : '6px 12px',
      fontSize: 16,
      height: dot ? 12 : 'auto',
      width: dot ? 12 : 'auto'
    }
  };
  
  // Shape styles
  const shapes = {
    pill: { borderRadius: 12 },
    square: { borderRadius: 4 }
  };
  
  // Position styles (for absolute positioning)
  const positions = {
    'top-left': {
      position: 'absolute',
      top: -4,
      left: -4,
      zIndex: 1
    },
    'top-right': {
      position: 'absolute',
      top: -4,
      right: -4,
      zIndex: 1
    },
    'bottom-left': {
      position: 'absolute',
      bottom: -4,
      left: -4,
      zIndex: 1
    },
    'bottom-right': {
      position: 'absolute',
      bottom: -4,
      right: -4,
      zIndex: 1
    }
  };
  
  // Combine styles
  const badgeStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    ...shapes[shape],
    ...(position ? positions[position] : {}),
    ...style
  };
  
  // Render icon
  const renderIcon = () => {
    if (!icon || dot) return null;
    return <span style={{ fontSize: 'inherit' }}>{icon}</span>;
  };
  
  // If dot variant, only render the colored circle
  if (dot) {
    return (
      <span
        className={`badge badge-${variant} ${className}`}
        style={badgeStyles}
        {...props}
      />
    );
  }
  
  return (
    <span
      className={`badge badge-${variant} ${className}`}
      style={badgeStyles}
      {...props}
    >
      {icon && iconPosition === 'left' && renderIcon()}
      {children}
      {icon && iconPosition === 'right' && renderIcon()}
    </span>
  );
}

export default Badge;
```

### **📖 USAGE EXAMPLES:**

```jsx
import Badge from './components/ui/Badge';

// Basic badges
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>

// Sizes
<Badge size="small">Small</Badge>
<Badge size="medium">Medium</Badge>
<Badge size="large">Large</Badge>

// Shapes
<Badge shape="pill">Pill</Badge>
<Badge shape="square">Square</Badge>

// With icons
<Badge icon="✓" variant="success">Completed</Badge>
<Badge icon="⚠️" variant="warning" iconPosition="right">
  Warning
</Badge>

// Dot badges
<Badge variant="success" dot />
<Badge variant="danger" dot size="large" />

// Positioned badges (absolute)
<div style={{ position: 'relative', display: 'inline-block' }}>
  <Avatar src="..." />
  <Badge variant="success" dot position="top-right" />
</div>

// Status badges
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Inactive</Badge>

// Custom styling
<Badge 
  style={{ 
    backgroundColor: '#ff6b6b',
    color: 'white',
    textTransform: 'uppercase'
  }}
>
  Custom
</Badge>
```

---

## 📝 BÀI TẬP 5: TẠO COMPONENT LIBRARY HOÀN CHỈNH

### **Tạo file index.js để export tất cả:**

```jsx
// components/ui/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Avatar } from './Avatar';
export { default as Badge } from './Badge';
```

### **Tạo file demo để test:**

```jsx
// App.jsx
import { Button, Card, Avatar, Badge } from './components/ui';

function App() {
  return (
    <div style={{ padding: 40, fontFamily: 'Arial, sans-serif' }}>
      <h1>UI Component Library Demo</h1>
      
      {/* Button Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>Buttons</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="outline">Outline</Button>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
          <Button icon="📧">With Icon</Button>
          <Button icon="➕" iconPosition="right">Add Item</Button>
        </div>
      </section>
      
      {/* Card Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>Cards</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <Card shadow="small">
            <Card.Body>
              <h3>Basic Card</h3>
              <p>This is a basic card with small shadow.</p>
            </Card.Body>
          </Card>
          
          <Card shadow="large" hoverable>
            <Card.Header>
              <h3>Hoverable Card</h3>
            </Card.Header>
            <Card.Body>
              <p>This card has hover effects and large shadow.</p>
            </Card.Body>
            <Card.Footer>
              <Button size="small">Action</Button>
            </Card.Footer>
          </Card>
          
          <Card borderRadius="large" padding="large">
            <h3>Custom Card</h3>
            <p>This card has large border radius and padding.</p>
          </Card>
        </div>
      </section>
      
      {/* Avatar Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>Avatars</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
          <Avatar src="https://i.pravatar.cc/100?img=1" />
          <Avatar src="https://i.pravatar.cc/100?img=2" size={64} />
          <Avatar src="https://i.pravatar.cc/100?img=3" shape="square" />
          <Avatar src="https://i.pravatar.cc/100?img=4" shape="rounded" />
          
          <Avatar status="online" src="https://i.pravatar.cc/100?img=5" />
          <Avatar status="busy" src="https://i.pravatar.cc/100?img=6" />
          <Avatar status="away" src="https://i.pravatar.cc/100?img=7" />
          
          <Avatar fallbackText="JD" />
          <Avatar fallbackIcon="🧑" />
          
          <Avatar 
            src="https://i.pravatar.cc/100?img=8" 
            border 
            shadow 
          />
        </div>
      </section>
      
      {/* Badge Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>Badges</h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="light">Light</Badge>
          <Badge variant="dark">Dark</Badge>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          <Badge size="small">Small</Badge>
          <Badge size="medium">Medium</Badge>
          <Badge size="large">Large</Badge>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          <Badge shape="pill">Pill</Badge>
          <Badge shape="square">Square</Badge>
          <Badge icon="✓" variant="success">Completed</Badge>
          <Badge icon="⚠️" variant="warning">Warning</Badge>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <Badge variant="success" dot />
          <Badge variant="danger" dot />
          <Badge variant="warning" dot />
          <Badge variant="info" dot />
        </div>
      </section>
      
      {/* Combined Example */}
      <section>
        <h2>Combined Example</h2>
        
        <Card hoverable>
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15, marginBottom: 15 }}>
              <div style={{ position: 'relative' }}>
                <Avatar 
                  src="https://i.pravatar.cc/100?img=10" 
                  status="online"
                  size={50}
                />
                <Badge variant="success" dot position="top-right" />
              </div>
              
              <div>
                <h3 style={{ margin: 0 }}>Nguyễn Văn A</h3>
                <p style={{ margin: 5, color: '#6c757d' }}>Senior Developer</p>
                <Badge variant="info" size="small">Online</Badge>
              </div>
            </div>
            
            <p style={{ marginBottom: 15 }}>
              Passionate developer with 5+ years of experience in React and Node.js.
            </p>
            
            <div style={{ display: 'flex', gap: 10 }}>
              <Button size="small" variant="primary">View Profile</Button>
              <Button size="small" variant="outline">Send Message</Button>
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

export default App;
```

---

## 📊 TỔNG KẾT COMPONENT LIBRARY

### **Cấu trúc thư mục:**
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Avatar.jsx
│   │   ├── Badge.jsx
│   │   └── index.js
│   └── ...
```

### **Design Principles:**
- **Consistent API**: Props naming, variants, sizes
- **Flexible**: Custom styling, composition
- **Accessible**: Proper ARIA attributes, keyboard navigation
- **Performant**: Optimized rendering, lazy loading
- **Maintainable**: Clean code, good documentation

### **Best Practices:**
- ✅ Use TypeScript for better prop validation
- ✅ Add comprehensive documentation
- ✅ Include unit tests
- ✅ Follow semantic versioning
- ✅ Provide Storybook for development
- ✅ Support theme customization

### **Next Steps:**
- Add more components (Input, Modal, Dropdown, etc.)
- Implement theming system
- Add animation/transitions
- Create documentation site
- Publish to npm