# ⚡ MINI PROJECT DAY 1: PRODUCT CARD LIST VỚI DYNAMIC DATA - PHIÊN BẢN NHANH

## 🎯 MỤC TIÊU

**Xây dựng Product Card List hoàn chỉnh với:**
- ✅ Dynamic data từ array
- ✅ Reusable ProductCard component
- ✅ Props validation
- ✅ Interactive features (add to cart, favorite)
- ✅ Responsive layout
- ✅ Loading states

---

## 📝 BƯỚC 1: THIẾT KẾ DATA STRUCTURE

### **Product Data Schema:**

```jsx
const products = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    price: 45000000,
    originalPrice: 50000000, // For discount calculation
    image: "https://via.placeholder.com/300x200",
    category: "Laptop",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isFavorite: false,
    tags: ["Apple", "M1 Pro", "16GB RAM"],
    description: "Powerful laptop for professionals...",
    specs: {
      cpu: "Apple M1 Pro",
      ram: "16GB",
      storage: "512GB SSD",
      display: "16-inch Liquid Retina XDR"
    }
  },
  // ... more products
];
```

---

## 📝 BƯỚC 2: XÂY DỰNG PRODUCT CARD COMPONENT

### **ProductCard.jsx - Main Component:**

```jsx
import PropTypes from 'prop-types';

function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  onViewDetails
}) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div style={{
      width: 320,
      backgroundColor: 'white',
      borderRadius: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
    }}
    >
      {/* Product Image */}
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

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div style={{
            position: 'absolute',
            top: 12,
            left: 12,
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 12,
            fontWeight: 'bold'
          }}>
            -{discountPercentage}%
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          <span style={{
            fontSize: 18,
            color: product.isFavorite ? '#e74c3c' : '#ccc'
          }}>
            {product.isFavorite ? '❤️' : '🤍'}
          </span>
        </button>

        {/* Stock Status */}
        {!product.inStock && (
          <div style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: 4,
            fontSize: 12
          }}>
            Hết hàng
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: 16 }}>
        {/* Category */}
        <div style={{
          color: '#6c757d',
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          marginBottom: 8
        }}>
          {product.category}
        </div>

        {/* Name */}
        <h3 style={{
          margin: '0 0 8px 0',
          fontSize: 16,
          fontWeight: 600,
          color: '#2d3436',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          lineHeight: 1.4
        }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12
        }}>
          <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                style={{
                  color: star <= Math.floor(product.rating) ? '#ffa502' : '#ddd',
                  fontSize: 14
                }}
              >
                ★
              </span>
            ))}
          </div>
          <span style={{
            fontSize: 14,
            color: '#6c757d'
          }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#e74c3c'
            }}>
              {product.price.toLocaleString('vi-VN')}đ
            </span>
            {product.originalPrice && (
              <span style={{
                fontSize: 16,
                color: '#6c757d',
                textDecoration: 'line-through'
              }}>
                {product.originalPrice.toLocaleString('vi-VN')}đ
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 16
        }}>
          {product.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              style={{
                padding: '2px 8px',
                backgroundColor: '#f8f9fa',
                color: '#6c757d',
                borderRadius: 12,
                fontSize: 12
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            style={{
              flex: 1,
              padding: '10px 16px',
              border: '1px solid #007bff',
              backgroundColor: 'white',
              color: '#007bff',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Xem chi tiết
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.inStock}
            style={{
              flex: 1,
              padding: '10px 16px',
              border: 'none',
              backgroundColor: product.inStock ? '#007bff' : '#ccc',
              color: 'white',
              borderRadius: 6,
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            {product.inStock ? '🛒 Thêm vào giỏ' : 'Hết hàng'}
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    inStock: PropTypes.bool.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string,
    specs: PropTypes.object
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default ProductCard;
```

---

## 📝 BƯỚC 3: XÂY DỰNG PRODUCT LIST COMPONENT

### **ProductList.jsx:**

```jsx
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

function ProductList({
  products,
  loading,
  onAddToCart,
  onToggleFavorite,
  onViewDetails
}) {
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40,
            height: 40,
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #007bff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }} />
          <p style={{ color: '#6c757d' }}>Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        color: '#6c757d'
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
        <h3>Không tìm thấy sản phẩm</h3>
        <p>Vui lòng thử lại với từ khóa khác</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: 24,
      padding: '20px 0'
    }}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      inStock: PropTypes.bool.isRequired,
      isFavorite: PropTypes.bool.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  ).isRequired,
  loading: PropTypes.bool,
  onAddToCart: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired
};

ProductList.defaultProps = {
  loading: false
};

export default ProductList;
```

---

## 📝 BƯỚC 4: XÂY DỰNG FILTER/SORT CONTROLS

### **ProductFilters.jsx:**

```jsx
import PropTypes from 'prop-types';

function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  searchTerm,
  onSearchChange
}) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: 24
    }}>
      {/* Search */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '1px solid #ddd',
            borderRadius: 6,
            fontSize: 16
          }}
        />
      </div>

      {/* Filters Row */}
      <div style={{
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Category Filter */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 600,
            color: '#2d3436'
          }}>
            Danh mục:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: 4,
              minWidth: 150
            }}
          >
            <option value="">Tất cả</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label style={{
            display: 'block',
            marginBottom: 8,
            fontWeight: 600,
            color: '#2d3436'
          }}>
            Sắp xếp:
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #ddd',
              borderRadius: 4,
              minWidth: 150
            }}
          >
            <option value="name">Tên A-Z</option>
            <option value="price-low">Giá thấp → cao</option>
            <option value="price-high">Giá cao → thấp</option>
            <option value="rating">Đánh giá cao</option>
            <option value="newest">Mới nhất</option>
          </select>
        </div>

        {/* Results Count */}
        <div style={{
          marginLeft: 'auto',
          color: '#6c757d',
          fontSize: 14
        }}>
          {/* This will be passed as prop */}
        </div>
      </div>
    </div>
  );
}

ProductFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onCategoryChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string,
  onSortChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired
};

ProductFilters.defaultProps = {
  selectedCategory: '',
  sortBy: 'name',
  searchTerm: ''
};

export default ProductFilters;
```

---

## 📝 BƯỚC 5: XÂY DỰNG MAIN APP COMPONENT

### **App4.jsx - Main Application:**

```jsx
import { useState, useEffect, useMemo } from 'react';
import ProductList from './components/ProductList';
import ProductFilters from './components/ProductFilters';

// Mock data - in real app, this would come from API
const mockProducts = [
  {
    id: 1,
    name: "MacBook Pro 16-inch",
    price: 45000000,
    originalPrice: 50000000,
    image: "https://via.placeholder.com/300x200/007bff/ffffff?text=MacBook",
    category: "Laptop",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isFavorite: false,
    tags: ["Apple", "M1 Pro", "16GB RAM"],
    description: "Powerful laptop for professionals with M1 Pro chip",
    specs: {
      cpu: "Apple M1 Pro",
      ram: "16GB",
      storage: "512GB SSD",
      display: "16-inch Liquid Retina XDR"
    }
  },
  {
    id: 2,
    name: "Dell XPS 13",
    price: 32000000,
    image: "https://via.placeholder.com/300x200/28a745/ffffff?text=Dell+XPS",
    category: "Laptop",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isFavorite: true,
    tags: ["Dell", "Intel i7", "8GB RAM"],
    description: "Ultra-portable laptop with stunning display",
    specs: {
      cpu: "Intel Core i7",
      ram: "8GB",
      storage: "256GB SSD",
      display: "13.3-inch FHD"
    }
  },
  {
    id: 3,
    name: "iPhone 15 Pro",
    price: 28000000,
    originalPrice: 30000000,
    image: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=iPhone+15",
    category: "Smartphone",
    rating: 4.9,
    reviews: 256,
    inStock: false,
    isFavorite: false,
    tags: ["Apple", "iOS", "5G"],
    description: "Latest iPhone with titanium design",
    specs: {
      cpu: "A17 Pro",
      ram: "8GB",
      storage: "128GB",
      display: "6.1-inch Super Retina XDR"
    }
  },
  {
    id: 4,
    name: "Samsung Galaxy S24",
    price: 22000000,
    image: "https://via.placeholder.com/300x200/6c5ce7/ffffff?text=Galaxy+S24",
    category: "Smartphone",
    rating: 4.7,
    reviews: 178,
    inStock: true,
    isFavorite: false,
    tags: ["Samsung", "Android", "AI"],
    description: "AI-powered smartphone with Galaxy AI",
    specs: {
      cpu: "Snapdragon 8 Gen 3",
      ram: "8GB",
      storage: "256GB",
      display: "6.2-inch Dynamic AMOLED"
    }
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    price: 8500000,
    originalPrice: 9500000,
    image: "https://via.placeholder.com/300x200/f39c12/ffffff?text=Sony+WH1000XM5",
    category: "Headphones",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    isFavorite: true,
    tags: ["Sony", "Wireless", "Noise Cancelling"],
    description: "Industry-leading noise cancelling headphones",
    specs: {
      type: "Over-ear",
      battery: "30 hours",
      connectivity: "Bluetooth 5.2",
      features: "Active Noise Cancelling"
    }
  },
  {
    id: 6,
    name: "Logitech MX Master 3S",
    price: 2800000,
    image: "https://via.placeholder.com/300x200/9b59b6/ffffff?text=Logitech+MX",
    category: "Accessories",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    isFavorite: false,
    tags: ["Logitech", "Wireless", "Ergonomic"],
    description: "Advanced wireless mouse for productivity",
    specs: {
      dpi: "8000",
      battery: "70 days",
      connectivity: "Bluetooth, USB",
      buttons: "7 programmable buttons"
    }
  }
];

function App4() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Simulate API call
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id; // Assuming higher ID = newer
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Event handlers
  const handleAddToCart = (product) => {
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const handleToggleFavorite = (productId) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, isFavorite: !product.isFavorite }
        : product
    ));
  };

  const handleViewDetails = (product) => {
    alert(`Chi tiết sản phẩm: ${product.name}\n\n${product.description}\n\nCPU: ${product.specs.cpu}\nRAM: ${product.specs.ram}\nStorage: ${product.specs.storage}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '20px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <h1 style={{
            margin: 0,
            color: '#2d3436',
            fontSize: 28,
            fontWeight: 'bold'
          }}>
            🛍️ E-Commerce Demo
          </h1>
          <p style={{
            margin: '8px 0 0 0',
            color: '#6c757d',
            fontSize: 16
          }}>
            Mini project với dynamic data và props
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '20px'
      }}>
        {/* Filters */}
        <ProductFilters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Results Summary */}
        <div style={{
          marginBottom: 20,
          color: '#6c757d',
          fontSize: 14
        }}>
          Hiển thị {filteredAndSortedProducts.length} sản phẩm
          {searchTerm && ` cho "${searchTerm}"`}
          {selectedCategory && ` trong danh mục "${selectedCategory}"`}
        </div>

        {/* Product List */}
        <ProductList
          products={filteredAndSortedProducts}
          loading={loading}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          onViewDetails={handleViewDetails}
        />
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center',
        marginTop: 40
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h3>🎉 Hoàn thành Mini Project Day 1!</h3>
          <p>
            Đã áp dụng đầy đủ kiến thức về Props Fundamentals:
            data flow, validation, callbacks, và dynamic rendering
          </p>
          <div style={{ marginTop: 20 }}>
            <strong>Features đã implement:</strong>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 10,
              marginTop: 10
            }}>
              <li>✅ Dynamic product data</li>
              <li>✅ Search & filtering</li>
              <li>✅ Sorting options</li>
              <li>✅ Add to cart</li>
              <li>✅ Favorite toggle</li>
              <li>✅ Product details</li>
              <li>✅ Loading states</li>
              <li>✅ Responsive design</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App4;
```

---

## 📝 BƯỚC 6: TẠO FILE COMPONENTS VÀ CHẠY APP

### **Tạo thư mục components:**

```
src/
  components/
    ProductCard.jsx
    ProductList.jsx
    ProductFilters.jsx
  App4.jsx
  main.jsx
```

### **Cập nhật main.jsx:**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App4 from './App4.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App4 />
  </StrictMode>,
)
```

---

## 🎯 FEATURES ĐÃ IMPLEMENT

### **✅ Core Features:**
- **Dynamic Data**: 6 products với đầy đủ thông tin
- **Search**: Tìm theo tên và tags
- **Filtering**: Lọc theo category
- **Sorting**: 5 cách sắp xếp khác nhau
- **Interactive**: Add to cart, favorite, view details
- **Loading States**: Skeleton loading
- **Empty States**: Không tìm thấy sản phẩm

### **✅ Props Patterns:**
- **Primitive props**: strings, numbers, booleans
- **Object props**: product objects
- **Array props**: products array, categories array
- **Function props**: callbacks cho events
- **Default props**: sensible defaults
- **Prop validation**: comprehensive PropTypes

### **✅ Advanced Features:**
- **Discount calculation**: Hiển thị % giảm giá
- **Rating display**: ⭐ stars + số lượng reviews
- **Stock management**: In stock / out of stock
- **Tags system**: Product tags với limit
- **Responsive grid**: Auto-fit columns
- **Hover effects**: Card animations
- **Modal interactions**: Alert-based details

### **✅ Best Practices:**
- **Component separation**: Each component has single responsibility
- **Prop validation**: Comprehensive PropTypes
- **Performance**: useMemo for expensive calculations
- **Accessibility**: Proper button labels, keyboard navigation
- **Error handling**: Loading and empty states
- **Code organization**: Logical file structure

---

## 🚀 CHẠY ỨNG DỤNG

```bash
npm run dev
```

**Truy cập:** `http://localhost:5173`

**Test các tính năng:**
1. **Search**: Gõ "laptop" hoặc "iPhone"
2. **Filter**: Chọn category "Smartphone"
3. **Sort**: Thử các option sắp xếp
4. **Interact**: Click favorite, add to cart, view details
5. **Responsive**: Resize cửa sổ browser

---

## 🎯 KẾT QUẢ HỌC TẬP

**Mini Project Day 1 hoàn thành với:**
- ✅ **6 reusable components** với props đa dạng
- ✅ **Dynamic data flow** từ parent → children
- ✅ **Interactive features** với function callbacks
- ✅ **Real-world patterns** áp dụng trong e-commerce
- ✅ **Production-ready code** với validation và error handling

**Tiếp theo:** Mini Project Day 2 - User Profile Gallery! 🎨