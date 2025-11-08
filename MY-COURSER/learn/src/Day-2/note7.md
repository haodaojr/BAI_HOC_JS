# ⚡ PRACTICE: REFACTOR JSX EXERCISES THÀNH SEPARATE COMPONENTS - PHIÊN BẢN NHANH

## 🎯 MỤC TIÊU BÀI TẬP

**Sau bài này bạn sẽ:**
- Biết cách refactor JSX thuần thành components
- Áp dụng component composition
- Tạo component library nhỏ
- Hiểu cách tổ chức code theo component

---

## 📝 BÀI TẬP 1: REFACTOR PRODUCT CARD

### **🔍 Tại sao cần refactor Product Card? Học từ thực tế**

**Code gốc có vấn đề:**
- Tất cả trong 1 file App.jsx
- 80+ dòng code JSX phức tạp
- Khó reuse ProductCard ở chỗ khác
- Khó maintain khi sửa styling
- Khó test từng phần riêng lẻ

**Giải pháp: Tách thành components nhỏ**

### **✅ KẾT QUẢ SAU KHI REFACTOR:**

**Bước 1: Tạo ProductCard.jsx**
```jsx
// components/ProductCard.jsx
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductRating from './ProductRating';
import AddToCartButton from './AddToCartButton';

function ProductCard({ product }) {
  return (
    <div style={{
      width: 300,
      border: '1px solid #e0e0e0',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <ProductImage image={product.image} name={product.name} />
      <div style={{ padding: 16 }}>
        <ProductInfo name={product.name} />
        <ProductRating rating={product.rating} />
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#e74c3c'
          }}>
            {product.price.toLocaleString('vi-VN')}đ
          </div>
        </div>
        <AddToCartButton inStock={product.inStock} />
      </div>
    </div>
  );
}

export default ProductCard;
```

**Bước 2: Tạo ProductImage.jsx**
```jsx
// components/ProductImage.jsx
function ProductImage({ image, name }) {
  return (
    <img
      src={image}
      alt={name}
      style={{
        width: '100%',
        height: 200,
        objectFit: 'cover'
      }}
    />
  );
}

export default ProductImage;
```

**Bước 3: Tạo ProductInfo.jsx**
```jsx
// components/ProductInfo.jsx
function ProductInfo({ name }) {
  return (
    <h3 style={{
      margin: '0 0 10px 0',
      fontSize: 18,
      fontWeight: 600,
      color: '#2d3436'
    }}>
      {name}
    </h3>
  );
}

export default ProductInfo;
```

**Bước 4: Tạo ProductRating.jsx**
```jsx
// components/ProductRating.jsx
function ProductRating({ rating }) {
  return (
    <div style={{
      marginBottom: 12,
      fontSize: 14
    }}>
      <span style={{ color: '#ffa502' }}>
        {'⭐'.repeat(Math.floor(rating))}
      </span>
      <span style={{
        color: '#636e72',
        marginLeft: 8
      }}>
        ({rating})
      </span>
    </div>
  );
}

export default ProductRating;
```

**Bước 5: Tạo AddToCartButton.jsx**
```jsx
// components/AddToCartButton.jsx
function AddToCartButton({ inStock }) {
  return (
    <button
      style={{
        width: '100%',
        padding: '12px 20px',
        backgroundColor: inStock ? '#0984e3' : '#b2bec3',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        cursor: inStock ? 'pointer' : 'not-allowed'
      }}
    >
      {inStock ? '🛒 Thêm vào giỏ' : 'Hết hàng'}
    </button>
  );
}

export default AddToCartButton;
```

**Bước 6: Sửa App.jsx**
```jsx
// App.jsx
import ProductCard from './components/ProductCard';

function App() {
  const product = {
    name: "Laptop Gaming",
    price: 25000000,
    image: "https://via.placeholder.com/300x200",
    rating: 4.5,
    inStock: true
  };

  return <ProductCard product={product} />;
}

export default App;
```

**Lợi ích sau khi refactor:**
- ✅ Code ngắn hơn: App.jsx chỉ 15 dòng
- ✅ Reusable: Dùng ProductCard ở nhiều trang
- ✅ Maintainable: Sửa ProductImage không ảnh hưởng ProductRating
- ✅ Testable: Test từng component riêng
- ✅ Readable: Dễ hiểu cấu trúc component

```jsx
// components/ProductCard.jsx
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import ProductRating from './ProductRating';
import AddToCartButton from './AddToCartButton';

function ProductCard({ product }) {
  return (
    <div style={{
      width: 300,
      border: '1px solid #e0e0e0',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <ProductImage image={product.image} name={product.name} />
      
      <div style={{ padding: 16 }}>
        <ProductInfo name={product.name} />
        <ProductRating rating={product.rating} />
        
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#e74c3c'
          }}>
            {product.price.toLocaleString('vi-VN')}đ
          </div>
        </div>
        
        <AddToCartButton inStock={product.inStock} />
      </div>
    </div>
  );
}

export default ProductCard;

// components/ProductImage.jsx
function ProductImage({ image, name }) {
  return (
    <img 
      src={image} 
      alt={name}
      style={{ 
        width: '100%', 
        height: 200, 
        objectFit: 'cover' 
      }}
    />
  );
}

export default ProductImage;

// components/ProductInfo.jsx
function ProductInfo({ name }) {
  return (
    <h3 style={{ 
      margin: '0 0 10px 0',
      fontSize: 18,
      fontWeight: 600,
      color: '#2d3436'
    }}>
      {name}
    </h3>
  );
}

export default ProductInfo;

// components/ProductRating.jsx
function ProductRating({ rating }) {
  return (
    <div style={{ 
      marginBottom: 12,
      fontSize: 14 
    }}>
      <span style={{ color: '#ffa502' }}>
        {'⭐'.repeat(Math.floor(rating))}
      </span>
      <span style={{ 
        color: '#636e72',
        marginLeft: 8 
      }}>
        ({rating})
      </span>
    </div>
  );
}

export default ProductRating;

// components/AddToCartButton.jsx
function AddToCartButton({ inStock }) {
  return (
    <button
      style={{
        width: '100%',
        padding: '12px 20px',
        backgroundColor: inStock ? '#0984e3' : '#b2bec3',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        cursor: inStock ? 'pointer' : 'not-allowed'
      }}
    >
      {inStock ? '🛒 Thêm vào giỏ' : 'Hết hàng'}
    </button>
  );
}

export default AddToCartButton;

// App.jsx
import ProductCard from './components/ProductCard';

function App() {
  const product = {
    name: "Laptop Gaming",
    price: 25000000,
    image: "https://via.placeholder.com/300x200",
    rating: 4.5,
    inStock: true
  };
  
  return <ProductCard product={product} />;
}

export default App;
```

---

## 📝 BÀI TẬP 2: REFACTOR USER PROFILE CARD

### **🔍 Tại sao User Profile Card cần refactor? Phân tích chi tiết**

**Code gốc có vấn đề:**
- 200+ dòng JSX phức tạp trong 1 file
- Nhiều sections khác nhau: avatar, info, stats, contact
- Styling inline dài dòng, khó maintain
- Không thể reuse từng phần riêng lẻ
- Khó test từng functionality

**Giải pháp: Tách theo logical sections**

### **✅ KẾT QUẢ SAU KHI REFACTOR:**

**Bước 1: Tạo UserProfileCard.jsx (main component)**
```jsx
// components/UserProfileCard.jsx
import UserAvatar from './UserAvatar';
import UserInfo from './UserInfo';
import UserStats from './UserStats';
import UserContact from './UserContact';
import FollowButton from './FollowButton';

function UserProfileCard({ user }) {
  return (
    <div style={{
      width: 350,
      backgroundColor: 'white',
      borderRadius: 16,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        height: 120,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }} />

      <div style={{
        marginTop: -60,
        padding: '0 24px 24px'
      }}>
        <UserAvatar avatar={user.avatar} isOnline={user.isOnline} />
        <UserInfo name={user.name} role={user.role} isOnline={user.isOnline} />
        <UserStats stats={user} />
        <UserContact contact={user} />
        <FollowButton />
      </div>
    </div>
  );
}

export default UserProfileCard;
```

**Bước 2: Tạo UserAvatar.jsx**
```jsx
// components/UserAvatar.jsx
function UserAvatar({ avatar, isOnline }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={avatar}
        alt="User Avatar"
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '5px solid white',
          objectFit: 'cover'
        }}
      />

      <span style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 20,
        height: 20,
        backgroundColor: isOnline ? '#00b894' : '#636e72',
        border: '3px solid white',
        borderRadius: '50%'
      }} />
    </div>
  );
}

export default UserAvatar;
```

**Bước 3: Tạo UserInfo.jsx**
```jsx
// components/UserInfo.jsx
function UserInfo({ name, role, isOnline }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h2 style={{
        margin: '0 0 4px 0',
        fontSize: 24,
        fontWeight: 700,
        color: '#2d3436'
      }}>
        {name}
      </h2>

      <p style={{
        margin: '0 0 8px 0',
        color: '#636e72',
        fontSize: 16
      }}>
        {role}
      </p>

      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        backgroundColor: isOnline ? '#d5f4e6' : '#f1f3f5',
        color: isOnline ? '#00b894' : '#636e72',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600
      }}>
        {isOnline ? '🟢 Online' : '⚫ Offline'}
      </span>
    </div>
  );
}

export default UserInfo;
```

**Bước 4: Tạo UserStats.jsx và StatItem.jsx**
```jsx
// components/UserStats.jsx
import StatItem from './StatItem';

function UserStats({ stats }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      margin: '24px 0',
      padding: '16px 0',
      borderTop: '1px solid #e9ecef',
      borderBottom: '1px solid #e9ecef'
    }}>
      <StatItem value={stats.posts} label="Bài viết" />
      <StatItem value={stats.followers} label="Người theo dõi" />
      <StatItem value={stats.following} label="Đang theo dõi" />
    </div>
  );
}

export default UserStats;

// components/StatItem.jsx
function StatItem({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 20,
        fontWeight: 700,
        color: '#2d3436'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 12,
        color: '#636e72',
        marginTop: 4
      }}>
        {label}
      </div>
    </div>
  );
}

export default StatItem;
```

**Bước 5: Tạo UserContact.jsx và ContactItem.jsx**
```jsx
// components/UserContact.jsx
import ContactItem from './ContactItem';

function UserContact({ contact }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <ContactItem icon="📧" value={contact.email} />
      <ContactItem icon="📱" value={contact.phone} />
      <ContactItem icon="📍" value={contact.location} />
    </div>
  );
}

export default UserContact;

// components/ContactItem.jsx
function ContactItem({ icon, value }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: 12,
      color: '#636e72',
      fontSize: 14
    }}>
      <span style={{ marginRight: 10, fontSize: 18 }}>{icon}</span>
      {value}
    </div>
  );
}

export default ContactItem;
```

**Bước 6: Tạo FollowButton.jsx**
```jsx
// components/FollowButton.jsx
function FollowButton() {
  return (
    <button
      style={{
        width: '100%',
        padding: '12px 20px',
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer'
      }}
    >
      Theo dõi
    </button>
  );
}

export default FollowButton;
```

**Bước 7: Sửa App.jsx**
```jsx
// App.jsx
import UserProfileCard from './components/UserProfileCard';

function App() {
  const user = {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "Senior Developer",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    location: "Hà Nội, Việt Nam",
    isOnline: true,
    followers: 1234,
    following: 567,
    posts: 89
  };

  return <UserProfileCard user={user} />;
}

export default App;
```

**Lợi ích:**
- ✅ Code tổ chức theo logical sections
- ✅ Mỗi component có trách nhiệm rõ ràng
- ✅ Dễ maintain từng phần riêng lẻ
- ✅ Có thể reuse StatItem, ContactItem ở components khác
- ✅ App.jsx cực kỳ clean

```jsx
// components/UserProfileCard.jsx
import UserAvatar from './UserAvatar';
import UserInfo from './UserInfo';
import UserStats from './UserStats';
import UserContact from './UserContact';
import FollowButton from './FollowButton';

function UserProfileCard({ user }) {
  return (
    <div style={{
      width: 350,
      backgroundColor: 'white',
      borderRadius: 16,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      <div style={{
        height: 120,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }} />
      
      <div style={{ 
        marginTop: -60,
        padding: '0 24px 24px'
      }}>
        <UserAvatar avatar={user.avatar} isOnline={user.isOnline} />
        <UserInfo name={user.name} role={user.role} isOnline={user.isOnline} />
        <UserStats stats={user} />
        <UserContact contact={user} />
        <FollowButton />
      </div>
    </div>
  );
}

export default UserProfileCard;

// components/UserAvatar.jsx
function UserAvatar({ avatar, isOnline }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src={avatar} 
        alt="User Avatar"
        style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          border: '5px solid white',
          objectFit: 'cover'
        }}
      />
      
      <span style={{
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 20,
        height: 20,
        backgroundColor: isOnline ? '#00b894' : '#636e72',
        border: '3px solid white',
        borderRadius: '50%'
      }} />
    </div>
  );
}

export default UserAvatar;

// components/UserInfo.jsx
function UserInfo({ name, role, isOnline }) {
  return (
    <div style={{ marginTop: 16 }}>
      <h2 style={{ 
        margin: '0 0 4px 0',
        fontSize: 24,
        fontWeight: 700,
        color: '#2d3436'
      }}>
        {name}
      </h2>
      
      <p style={{
        margin: '0 0 8px 0',
        color: '#636e72',
        fontSize: 16
      }}>
        {role}
      </p>
      
      <span style={{
        display: 'inline-block',
        padding: '4px 12px',
        backgroundColor: isOnline ? '#d5f4e6' : '#f1f3f5',
        color: isOnline ? '#00b894' : '#636e72',
        borderRadius: 12,
        fontSize: 12,
        fontWeight: 600
      }}>
        {isOnline ? '🟢 Online' : '⚫ Offline'}
      </span>
    </div>
  );
}

export default UserInfo;

// components/UserStats.jsx
import StatItem from './StatItem';

function UserStats({ stats }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      margin: '24px 0',
      padding: '16px 0',
      borderTop: '1px solid #e9ecef',
      borderBottom: '1px solid #e9ecef'
    }}>
      <StatItem value={stats.posts} label="Bài viết" />
      <StatItem value={stats.followers} label="Người theo dõi" />
      <StatItem value={stats.following} label="Đang theo dõi" />
    </div>
  );
}

export default UserStats;

// components/StatItem.jsx
function StatItem({ value, label }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        fontSize: 20, 
        fontWeight: 700,
        color: '#2d3436' 
      }}>
        {value}
      </div>
      <div style={{ 
        fontSize: 12,
        color: '#636e72',
        marginTop: 4
      }}>
        {label}
      </div>
    </div>
  );
}

export default StatItem;

// components/UserContact.jsx
import ContactItem from './ContactItem';

function UserContact({ contact }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <ContactItem icon="📧" value={contact.email} />
      <ContactItem icon="📱" value={contact.phone} />
      <ContactItem icon="📍" value={contact.location} />
    </div>
  );
}

export default UserContact;

// components/ContactItem.jsx
function ContactItem({ icon, value }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: 12,
      color: '#636e72',
      fontSize: 14
    }}>
      <span style={{ marginRight: 10, fontSize: 18 }}>{icon}</span>
      {value}
    </div>
  );
}

export default ContactItem;

// components/FollowButton.jsx
function FollowButton() {
  return (
    <button
      style={{
        width: '100%',
        padding: '12px 20px',
        backgroundColor: '#667eea',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer'
      }}
    >
      Theo dõi
    </button>
  );
}

export default FollowButton;

// App.jsx
import UserProfileCard from './components/UserProfileCard';

function App() {
  const user = {
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "Senior Developer",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    location: "Hà Nội, Việt Nam",
    isOnline: true,
    followers: 1234,
    following: 567,
    posts: 89
  };
  
  return <UserProfileCard user={user} />;
}

export default App;
```

---

## 📝 BÀI TẬP 3: TẠO COMPONENT LIBRARY NHỎ

### **🔍 Tại sao cần Component Library? Học từ best practices**

**Component Library là tập hợp các UI components tái sử dụng.**

**Lợi ích:**
- ✅ Consistent design system
- ✅ Faster development
- ✅ Easier maintenance
- ✅ Better team collaboration
- ✅ Reusable across projects

**Cách tạo Component Library:**

### **✅ IMPLEMENTATION:**

```jsx
// components/ui/Button.jsx
function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick 
}) {
  const baseStyles = {
    border: 'none',
    borderRadius: 6,
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s'
  };
  
  const variants = {
    primary: {
      backgroundColor: disabled ? '#ccc' : '#007bff',
      color: 'white'
    },
    secondary: {
      backgroundColor: disabled ? '#ccc' : '#6c757d',
      color: 'white'
    },
    danger: {
      backgroundColor: disabled ? '#ccc' : '#dc3545',
      color: 'white'
    }
  };
  
  const sizes = {
    small: { padding: '6px 12px', fontSize: 14 },
    medium: { padding: '8px 16px', fontSize: 16 },
    large: { padding: '12px 24px', fontSize: 18 }
  };
  
  return (
    <button
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        opacity: disabled ? 0.6 : 1
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

// components/ui/Card.jsx
function Card({ children, padding = 16, shadow = true }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: 8,
      padding,
      boxShadow: shadow ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
      border: shadow ? 'none' : '1px solid #e9ecef'
    }}>
      {children}
    </div>
  );
}

export default Card;

// components/ui/Avatar.jsx
function Avatar({ src, alt, size = 40, fallback = '👤' }) {
  const [hasError, setHasError] = useState(false);
  
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      fontSize: size * 0.6
    }}>
      {src && !hasError ? (
        <img 
          src={src} 
          alt={alt}
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }}
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}

export default Avatar;

// components/ui/Badge.jsx
function Badge({ 
  children, 
  variant = 'primary',
  size = 'medium' 
}) {
  const variants = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    success: { backgroundColor: '#28a745', color: 'white' },
    danger: { backgroundColor: '#dc3545', color: 'white' },
    warning: { backgroundColor: '#ffc107', color: 'black' },
    info: { backgroundColor: '#17a2b8', color: 'white' }
  };
  
  const sizes = {
    small: { padding: '2px 6px', fontSize: 12 },
    medium: { padding: '4px 8px', fontSize: 14 },
    large: { padding: '6px 12px', fontSize: 16 }
  };
  
  return (
    <span style={{
      display: 'inline-block',
      borderRadius: 12,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      ...variants[variant],
      ...sizes[size]
    }}>
      {children}
    </span>
  );
}

export default Badge;

// components/ui/index.js
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Avatar } from './Avatar';
export { default as Badge } from './Badge';

// App.jsx - Demo sử dụng
import { Button, Card, Avatar, Badge } from './components/ui';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>UI Component Library</h1>
      
      <Card>
        <h2>Button Variants</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
        
        <h2>Button Sizes</h2>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </div>
      </Card>
      
      <Card style={{ marginTop: 20 }}>
        <h2>Avatar & Badge</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <Avatar src="https://i.pravatar.cc/100?img=1" alt="User" />
          <div>
            <h3 style={{ margin: 0 }}>Nguyễn Văn A</h3>
            <Badge variant="success">Online</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
```

---

## 📝 BÀI TẬP 4: MINI PROJECT - LANDING PAGE

### **🔍 Tại sao Landing Page cần nhiều components? Áp dụng kiến thức đã học**

**Landing Page = Trang đích, thường có nhiều sections khác nhau.**

**Cấu trúc thường gặp:**
- Header (navigation)
- Hero (phần giới thiệu chính)
- Features (tính năng)
- Testimonials (phản hồi khách hàng)
- Pricing (bảng giá)
- Footer (chân trang)

**Mỗi section nên là 1 component riêng để:**
- ✅ Dễ maintain từng phần
- ✅ Có thể thêm/bớt sections linh hoạt
- ✅ Reuse sections ở trang khác
- ✅ Test từng section riêng

### **✅ STRUCTURE:**

```jsx
// components/layout/Header.jsx
import { Button } from '../ui';

function Header() {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 40px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: 24, fontWeight: 'bold' }}>
        MyApp
      </div>
      
      <nav>
        <a href="#home" style={{ margin: '0 15px', textDecoration: 'none' }}>Home</a>
        <a href="#features" style={{ margin: '0 15px', textDecoration: 'none' }}>Features</a>
        <a href="#pricing" style={{ margin: '0 15px', textDecoration: 'none' }}>Pricing</a>
        <Button size="small">Get Started</Button>
      </nav>
    </header>
  );
}

export default Header;

// components/sections/HeroSection.jsx
import { Button } from '../ui';

function HeroSection() {
  return (
    <section style={{
      padding: '100px 40px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: 48, marginBottom: 20 }}>
        Build Amazing Apps
      </h1>
      <p style={{ fontSize: 20, marginBottom: 40, opacity: 0.9 }}>
        The fastest way to build modern web applications
      </p>
      <div>
        <Button variant="secondary" size="large" style={{ marginRight: 20 }}>
          Get Started
        </Button>
        <Button variant="outline" size="large">
          Learn More
        </Button>
      </div>
    </section>
  );
}

export default HeroSection;

// components/sections/FeaturesSection.jsx
import { Card } from '../ui';

function FeaturesSection() {
  const features = [
    {
      icon: '🚀',
      title: 'Fast Development',
      description: 'Build apps 10x faster with our components'
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Pre-built components with modern design'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Works perfectly on all devices'
    }
  ];
  
  return (
    <section style={{ padding: '80px 40px', backgroundColor: '#f8f9fa' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 style={{ fontSize: 36, marginBottom: 20 }}>Features</h2>
        <p style={{ fontSize: 18, color: '#6c757d' }}>
          Everything you need to build amazing applications
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 30,
        maxWidth: 1200,
        margin: '0 auto'
      }}>
        {features.map((feature, index) => (
          <Card key={index} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>
              {feature.icon}
            </div>
            <h3 style={{ marginBottom: 15 }}>{feature.title}</h3>
            <p style={{ color: '#6c757d' }}>{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;

// components/layout/Footer.jsx
function Footer() {
  return (
    <footer style={{
      padding: '40px',
      backgroundColor: '#343a40',
      color: 'white',
      textAlign: 'center'
    }}>
      <p>&copy; 2024 MyApp. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

// App.jsx
import Header from './components/layout/Header';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}

export default App;
```

---

## 📊 TỔNG KẾT

### **Quy trình refactor:**
1. **Identify reusable parts** - Tìm phần code lặp lại
2. **Extract to components** - Tách thành component riêng
3. **Create proper file structure** - Đặt file đúng chỗ
4. **Use proper imports/exports** - Import/export đúng cách
5. **Test composition** - Đảm bảo hoạt động tốt

### **Lợi ích:**
- ✅ Code dễ maintain
- ✅ Components reusable
- ✅ Dễ test riêng lẻ
- ✅ Team collaboration tốt hơn
- ✅ Performance tối ưu (code splitting)

### **Best practices:**
- 1 component = 1 file
- PascalCase naming
- Default export cho components
- Named export cho utilities
- Barrel exports (index.js)
- Proper prop interfaces