# ⚡ PRACTICE: TẠO UI CARDS VỚI JSX THUẦN

## 🎯 MỤC TIÊU BÀI TẬP

**Sau bài này bạn sẽ:**
- Tạo được các loại card UI phổ biến
- Làm chủ JSX thuần (chưa chia component nhỏ)
- Thực hành style inline, conditional rendering
- Hiểu cách xử lý data trong JSX

---

## 📝 BÀI TẬP 1: PRODUCT CARD CƠ BẢN

### **Yêu cầu:**
Tạo card hiển thị sản phẩm với:
- Hình ảnh sản phẩm
- Tên sản phẩm
- Giá gốc (gạch ngang nếu có giảm giá)
- Giá sau giảm (màu đỏ)
- Badge "SALE" nếu có giảm giá
- Nút "Thêm vào giỏ"
- Rating (sao)

### **✅ CODE HOÀN CHỈNH:**

```jsx
function ProductCard() {
  // Data sản phẩm
  const product = {
    id: 1,
    name: "Laptop Gaming ROG Strix",
    image: "https://via.placeholder.com/300x200",
    price: 25000000,
    discount: 0.15, // 15% giảm giá
    rating: 4.5,
    inStock: true
  };
  
  // Tính giá sau giảm
  const finalPrice = product.price * (1 - product.discount);
  const hasDiscount = product.discount > 0;
  
  function addToCart() {
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  }
  
  // Render sao rating
  function renderStars(rating) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push('⭐');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  }
  
  return (
    <div style={{
      width: 300,
      border: '1px solid #e0e0e0',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}>
      {/* Hình ảnh */}
      <div style={{ position: 'relative' }}>
        <img 
          src={product.image} 
          alt={product.name}
          style={{ 
            width: '100%', 
            height: 200, 
            objectFit: 'cover' 
          }}
        />
        
        {/* Badge SALE */}
        {hasDiscount && (
          <span style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: '#ff4757',
            color: 'white',
            padding: '5px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 'bold'
          }}>
            SALE {Math.round(product.discount * 100)}%
          </span>
        )}
        
        {/* Badge hết hàng */}
        {!product.inStock && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold'
          }}>
            HẾT HÀNG
          </div>
        )}
      </div>
      
      {/* Nội dung */}
      <div style={{ padding: 16 }}>
        {/* Tên sản phẩm */}
        <h3 style={{ 
          margin: '0 0 10px 0',
          fontSize: 18,
          fontWeight: 600,
          color: '#2d3436',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {product.name}
        </h3>
        
        {/* Rating */}
        <div style={{ 
          marginBottom: 12,
          fontSize: 14 
        }}>
          <span style={{ color: '#ffa502' }}>
            {renderStars(product.rating)}
          </span>
          <span style={{ 
            color: '#636e72',
            marginLeft: 8 
          }}>
            ({product.rating})
          </span>
        </div>
        
        {/* Giá */}
        <div style={{ marginBottom: 16 }}>
          {hasDiscount && (
            <div style={{
              textDecoration: 'line-through',
              color: '#95a5a6',
              fontSize: 14,
              marginBottom: 4
            }}>
              {product.price.toLocaleString('vi-VN')}đ
            </div>
          )}
          
          <div style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: hasDiscount ? '#e74c3c' : '#2d3436'
          }}>
            {finalPrice.toLocaleString('vi-VN')}đ
          </div>
        </div>
        
        {/* Nút mua */}
        <button
          onClick={addToCart}
          disabled={!product.inStock}
          style={{
            width: '100%',
            padding: '12px 20px',
            backgroundColor: product.inStock ? '#0984e3' : '#b2bec3',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: product.inStock ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s'
          }}
        >
          {product.inStock ? '🛒 Thêm vào giỏ' : 'Hết hàng'}
        </button>
      </div>
    </div>
  );
}
```

### **📌 Giải thích code:**

**1. Tính toán giá:**
```jsx
const finalPrice = product.price * (1 - product.discount);
const hasDiscount = product.discount > 0;
```

**2. Render sao động:**
```jsx
function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? '⭐' : '☆');
  }
  return stars.join('');
}
```

**3. Badge SALE với position absolute:**
```jsx
{hasDiscount && (
  <span style={{
    position: 'absolute',
    top: 10,
    right: 10,
    // ...
  }}>
    SALE {Math.round(product.discount * 100)}%
  </span>
)}
```

**4. Nút disabled khi hết hàng:**
```jsx
<button
  disabled={!product.inStock}
  style={{
    backgroundColor: product.inStock ? '#0984e3' : '#b2bec3',
    cursor: product.inStock ? 'pointer' : 'not-allowed'
  }}
>
```

---

## 📝 BÀI TẬP 2: USER PROFILE CARD

### **Yêu cầu:**
Tạo card profile với:
- Avatar
- Tên người dùng
- Vai trò (role)
- Badge trạng thái (Online/Offline)
- Thông tin: Email, Phone, Location
- Social media icons
- Nút Follow/Unfollow

### **✅ CODE HOÀN CHỈNH:**

```jsx
function UserProfileCard() {
  const user = {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "Senior Developer",
    email: "nguyenvana@example.com",
    phone: "+84 123 456 789",
    location: "Hà Nội, Việt Nam",
    isOnline: true,
    followers: 1234,
    following: 567,
    posts: 89,
    isFollowing: false,
    social: {
      facebook: "facebook.com/user",
      twitter: "twitter.com/user",
      linkedin: "linkedin.com/in/user"
    }
  };
  
  function handleFollow() {
    if (user.isFollowing) {
      alert("Đã bỏ theo dõi!");
    } else {
      alert("Đã theo dõi!");
    }
  }
  
  function openSocial(platform) {
    alert(`Mở ${platform}: ${user.social[platform]}`);
  }
  
  return (
    <div style={{
      width: 350,
      backgroundColor: 'white',
      borderRadius: 16,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden'
    }}>
      {/* Header background */}
      <div style={{
        height: 120,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }} />
      
      {/* Profile content */}
      <div style={{ 
        marginTop: -60,
        padding: '0 24px 24px'
      }}>
        {/* Avatar */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '5px solid white',
              objectFit: 'cover'
            }}
          />
          
          {/* Online badge */}
          <span style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            width: 20,
            height: 20,
            backgroundColor: user.isOnline ? '#00b894' : '#636e72',
            border: '3px solid white',
            borderRadius: '50%'
          }} />
        </div>
        
        {/* User info */}
        <div style={{ marginTop: 16 }}>
          <h2 style={{ 
            margin: '0 0 4px 0',
            fontSize: 24,
            fontWeight: 700,
            color: '#2d3436'
          }}>
            {user.name}
          </h2>
          
          <p style={{
            margin: '0 0 8px 0',
            color: '#636e72',
            fontSize: 16
          }}>
            {user.role}
          </p>
          
          {/* Status badge */}
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            backgroundColor: user.isOnline ? '#d5f4e6' : '#f1f3f5',
            color: user.isOnline ? '#00b894' : '#636e72',
            borderRadius: 12,
            fontSize: 12,
            fontWeight: 600
          }}>
            {user.isOnline ? '🟢 Online' : '⚫ Offline'}
          </span>
        </div>
        
        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '24px 0',
          padding: '16px 0',
          borderTop: '1px solid #e9ecef',
          borderBottom: '1px solid #e9ecef'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: 20, 
              fontWeight: 700,
              color: '#2d3436' 
            }}>
              {user.posts}
            </div>
            <div style={{ 
              fontSize: 12,
              color: '#636e72',
              marginTop: 4
            }}>
              Bài viết
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: 20, 
              fontWeight: 700,
              color: '#2d3436' 
            }}>
              {user.followers}
            </div>
            <div style={{ 
              fontSize: 12,
              color: '#636e72',
              marginTop: 4
            }}>
              Người theo dõi
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: 20, 
              fontWeight: 700,
              color: '#2d3436' 
            }}>
              {user.following}
            </div>
            <div style={{ 
              fontSize: 12,
              color: '#636e72',
              marginTop: 4
            }}>
              Đang theo dõi
            </div>
          </div>
        </div>
        
        {/* Contact info */}
        <div style={{ marginBottom: 20 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 12,
            color: '#636e72',
            fontSize: 14
          }}>
            <span style={{ marginRight: 10, fontSize: 18 }}>📧</span>
            {user.email}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 12,
            color: '#636e72',
            fontSize: 14
          }}>
            <span style={{ marginRight: 10, fontSize: 18 }}>📱</span>
            {user.phone}
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            color: '#636e72',
            fontSize: 14
          }}>
            <span style={{ marginRight: 10, fontSize: 18 }}>📍</span>
            {user.location}
          </div>
        </div>
        
        {/* Social media */}
        <div style={{
          display: 'flex',
          gap: 12,
          marginBottom: 20,
          justifyContent: 'center'
        }}>
          <button
            onClick={() => openSocial('facebook')}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#3b5998',
              color: 'white',
              fontSize: 18,
              cursor: 'pointer'
            }}
          >
            f
          </button>
          
          <button
            onClick={() => openSocial('twitter')}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#1da1f2',
              color: 'white',
              fontSize: 18,
              cursor: 'pointer'
            }}
          >
            🐦
          </button>
          
          <button
            onClick={() => openSocial('linkedin')}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              backgroundColor: '#0077b5',
              color: 'white',
              fontSize: 18,
              cursor: 'pointer'
            }}
          >
            in
          </button>
        </div>
        
        {/* Follow button */}
        <button
          onClick={handleFollow}
          style={{
            width: '100%',
            padding: '12px 20px',
            backgroundColor: user.isFollowing ? 'white' : '#667eea',
            color: user.isFollowing ? '#667eea' : 'white',
            border: user.isFollowing ? '2px solid #667eea' : 'none',
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        >
          {user.isFollowing ? '✓ Đang theo dõi' : '+ Theo dõi'}
        </button>
      </div>
    </div>
  );
}
```

### **📌 Kỹ thuật nổi bật:**

**1. Avatar với online badge:**
```jsx
<div style={{ position: 'relative', display: 'inline-block' }}>
  <img style={{ borderRadius: '50%' }} />
  <span style={{
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: isOnline ? 'green' : 'gray',
    borderRadius: '50%'
  }} />
</div>
```

**2. Gradient background:**
```jsx
<div style={{
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}} />
```

**3. Stats layout với flexbox:**
```jsx
<div style={{
  display: 'flex',
  justifyContent: 'space-around'
}}>
  <div style={{ textAlign: 'center' }}>...</div>
</div>
```

---

## 📝 BÀI TẬP 3: BLOG POST CARD

### **Yêu cầu:**
Tạo card bài viết blog với:
- Featured image
- Category badge
- Tiêu đề
- Mô tả ngắn
- Thông tin tác giả (avatar + tên)
- Thời gian đăng
- Số lượt xem và comments
- Nút "Đọc thêm"

### **✅ CODE HOÀN CHỈNH:**

```jsx
function BlogPostCard() {
  const post = {
    id: 1,
    title: "10 Best Practices for React Development in 2025",
    excerpt: "Learn the latest and most effective techniques for building scalable React applications. These tips will help you write cleaner, more maintainable code...",
    image: "https://via.placeholder.com/400x250",
    category: "React",
    author: {
      name: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/50?img=5"
    },
    date: "2025-01-15",
    readTime: 8,
    views: 1234,
    comments: 45,
    isBookmarked: false
  };
  
  // Format ngày
  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hôm nay';
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
    return `${Math.floor(diffDays / 30)} tháng trước`;
  }
  
  function handleReadMore() {
    alert(`Đọc bài: ${post.title}`);
  }
  
  function handleBookmark() {
    alert(post.isBookmarked ? 'Đã bỏ lưu' : 'Đã lưu bài viết');
  }
  
  return (
    <div style={{
      width: 400,
      backgroundColor: 'white',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}>
      {/* Featured Image */}
      <div style={{ position: 'relative' }}>
        <img 
          src={post.image} 
          alt={post.title}
          style={{
            width: '100%',
            height: 250,
            objectFit: 'cover'
          }}
        />
        
        {/* Category Badge */}
        <span style={{
          position: 'absolute',
          top: 16,
          left: 16,
          padding: '6px 16px',
          backgroundColor: '#0984e3',
          color: 'white',
          borderRadius: 20,
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 0.5
        }}>
          {post.category}
        </span>
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'white',
            fontSize: 18,
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {post.isBookmarked ? '🔖' : '📌'}
        </button>
      </div>
      
      {/* Content */}
      <div style={{ padding: 20 }}>
        {/* Title */}
        <h2 style={{
          margin: '0 0 12px 0',
          fontSize: 20,
          fontWeight: 700,
          color: '#2d3436',
          lineHeight: 1.4,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {post.title}
        </h2>
        
        {/* Excerpt */}
        <p style={{
          margin: '0 0 16px 0',
          color: '#636e72',
          fontSize: 14,
          lineHeight: 1.6,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {post.excerpt}
        </p>
        
        {/* Author Info */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              marginRight: 12,
              objectFit: 'cover'
            }}
          />
          
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#2d3436',
              marginBottom: 2
            }}>
              {post.author.name}
            </div>
            
            <div style={{
              fontSize: 12,
              color: '#636e72'
            }}>
              {formatDate(post.date)} • {post.readTime} phút đọc
            </div>
          </div>
        </div>
        
        {/* Stats & Read More */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid #e9ecef'
        }}>
          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: 16,
            fontSize: 14,
            color: '#636e72'
          }}>
            <span>👁️ {post.views}</span>
            <span>💬 {post.comments}</span>
          </div>
          
          {/* Read More Button */}
          <button
            onClick={handleReadMore}
            style={{
              padding: '8px 20px',
              backgroundColor: '#0984e3',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            Đọc thêm →
          </button>
        </div>
      </div>
    </div>
  );
}
```

### **📌 Kỹ thuật nâng cao:**

**1. Giới hạn số dòng text (ellipsis):**
```jsx
style={{
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2, // Giới hạn 2 dòng
  WebkitBoxOrient: 'vertical'
}}
```

**2. Format ngày thông minh:**
```jsx
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.ceil((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hôm nay';
  if (diffDays === 1) return 'Hôm qua';
  // ...
}
```

**3. Layout phức tạp với flexbox:**
```jsx
<div style={{
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}}>
  <div style={{ flex: 1 }}>...</div>
  <button>...</button>
</div>
```

---

## 📝 BÀI TẬP 4: PRICING CARD (3 MỨC GIÁ)

### **Yêu cầu:**
Tạo 3 card giá cạnh nhau:
- Basic, Pro, Enterprise
- Giá/tháng
- Danh sách tính năng (có/không có)
- Badge "Popular" cho gói Pro
- Nút "Chọn gói" với style khác nhau
- Hover effect

### **✅ CODE HOÀN CHỈNH:**

```jsx
function PricingCards() {
  const plans = [
    {
      id: 1,
      name: "Basic",
      price: 99000,
      period: "tháng",
      description: "Phù hợp cho cá nhân",
      isPopular: false,
      features: [
        { name: "5 Projects", included: true },
        { name: "10GB Storage", included: true },
        { name: "Basic Support", included: true },
        { name: "Team Collaboration", included: false },
        { name: "Advanced Analytics", included: false },
        { name: "Priority Support", included: false }
      ],
      buttonText: "Bắt đầu",
      color: "#636e72"
    },
    {
      id: 2,
      name: "Pro",
      price: 299000,
      period: "tháng",
      description: "Tốt nhất cho doanh nghiệp nhỏ",
      isPopular: true,
      features: [
        { name: "Unlimited Projects", included: true },
        { name: "100GB Storage", included: true },
        { name: "Priority Support", included: true },
        { name: "Team Collaboration", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Custom Domain", included: false }
      ],
      buttonText: "Bắt đầu ngay",
      color: "#0984e3"
    },
    {
      id: 3,
      name: "Enterprise",
      price: 999000,
      period: "tháng",
      description: "Giải pháp cho doanh nghiệp lớn",
      isPopular: false,
      features: [
        { name: "Unlimited Everything", included: true },
        { name: "Unlimited Storage", included: true },
        { name: "24/7 Dedicated Support", included: true },
        { name: "Team Collaboration", included: true },
        { name: "Advanced Analytics", included: true },
        { name: "Custom Domain", included: true }
      ],
      buttonText: "Liên hệ",
      color: "#6c5ce7"
    }
  ];
  
  function handleSelectPlan(planName) {
    alert(`Bạn đã chọn gói ${planName}`);
  }
  
  return (
    <div style={{
      display: 'flex',
      gap: 24,
      padding: 40,
      backgroundColor: '#f8f9fa',
      justifyContent: 'center',
      flexWrap: 'wrap'
    }}>
      {plans.map(plan => (
        <div
          key={plan.id}
          style={{
            width: 320,
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 32,
            boxShadow: plan.isPopular 
              ? '0 8px 24px rgba(9,132,227,0.2)' 
              : '0 2px 8px rgba(0,0,0,0.1)',
            transform: plan.isPopular ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s',
            position: 'relative',
            border: plan.isPopular ? '2px solid #0984e3' : '1px solid #e9ecef'
          }}
        >
          {/* Popular Badge */}
          {plan.isPopular && (
            <div style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '6px 20px',
              backgroundColor: '#0984e3',
              color: 'white',
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: 1
            }}>
              ⭐ Phổ biến nhất
            </div>
          )}
          
          {/* Plan Name */}
          <h3 style={{
            margin: '0 0 8px 0',
            fontSize: 24,
            fontWeight: 700,
            color: plan.color,
            textAlign: 'center'
          }}>
            {plan.name}
          </h3>
          
          {/* Description */}
          <p style={{
            margin: '0 0 24px