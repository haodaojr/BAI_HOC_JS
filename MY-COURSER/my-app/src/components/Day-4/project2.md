# 🎴 DỰ ÁN TỔNG KẾT GIAI ĐOẠN 1: INTERACTIVE BUSINESS CARD

**Mục tiêu:** Xây dựng business card tương tác với animations, áp dụng kiến thức events, conditional rendering, và component composition.

---

## 📋 YÊU CẦU DỰ ÁN

### ✅ Tính năng bắt buộc:
- [ ] **Card Flip Animation** - Lật thẻ để xem mặt sau
- [ ] **Contact Buttons** - Click để copy email/phone
- [ ] **Social Media Links** - Hover effects với animations
- [ ] **Theme Toggle** - Chuyển đổi card themes
- [ ] **QR Code** - Tạo QR code cho contact info
- [ ] **Download VCard** - Tải file contact (.vcf)
- [ ] **Responsive Design** - Hoạt động trên mọi thiết bị
- [ ] **Loading States** - Animations khi load data
- [ ] **Error Handling** - Xử lý lỗi gracefully
- [ ] **Accessibility** - Keyboard navigation, screen reader

### 🎯 Yêu cầu kỹ thuật:
- **8+ Components** riêng biệt
- **Event handling** phức tạp (click, hover, keyboard)
- **Conditional rendering** nâng cao
- **State management** với useState/useEffect
- **CSS animations** hoặc Framer Motion
- **Form handling** cho edit mode
- **Local storage** để lưu preferences
- **Clean animations** và transitions

---

## 🏗️ CẤU TRÚC COMPONENTS

```
src/
├── components/
│   ├── BusinessCard.jsx      // Main card component
│   ├── CardFront.jsx         // Front side của card
│   ├── CardBack.jsx          // Back side của card
│   ├── ContactButtons.jsx    // Email, phone, website buttons
│   ├── SocialLinks.jsx       // Social media icons
│   ├── ThemeSelector.jsx     // Theme toggle buttons
│   ├── QRCode.jsx            // QR code generator
│   ├── EditMode.jsx          // Edit card information
│   └── LoadingSpinner.jsx    // Loading animation
├── hooks/
│   ├── useCardFlip.js        // Custom hook cho flip animation
│   ├── useLocalStorage.js    // Custom hook cho localStorage
│   └── useCopyToClipboard.js // Custom hook cho copy functionality
├── utils/
│   ├── generateQR.js         // QR code generation
│   ├── generateVCard.js      // VCard file generation
│   └── themes.js             // Card themes data
└── App.jsx
```

---

## 🎨 THIẾT KẾ GIAO DIỆN

### Card Dimensions:
- **Desktop:** 400px x 250px
- **Mobile:** 350px x 220px
- **Aspect ratio:** 16:10

### Color Schemes:
```javascript
const themes = {
  professional: {
    primary: '#1F2937',
    secondary: '#374151',
    accent: '#3B82F6',
    text: '#F9FAFB'
  },
  creative: {
    primary: '#7C3AED',
    secondary: '#A855F7',
    accent: '#F59E0B',
    text: '#FFFFFF'
  },
  minimal: {
    primary: '#FFFFFF',
    secondary: '#F3F4F6',
    accent: '#6B7280',
    text: '#111827'
  }
};
```

---

## 📝 CHI TIẾT TỪNG COMPONENT

### 1. BusinessCard.jsx (Main Component)
```jsx
import { useState, useEffect } from 'react';
import { useCardFlip } from '../hooks/useCardFlip';
import { useLocalStorage } from '../hooks/useLocalStorage';
import CardFront from './CardFront';
import CardBack from './CardBack';
import ThemeSelector from './ThemeSelector';

function BusinessCard() {
  const [cardData, setCardData] = useLocalStorage('businessCard', {
    name: 'John Doe',
    title: 'Full Stack Developer',
    company: 'Tech Corp',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    website: 'https://johndoe.dev',
    avatar: '/avatar.jpg'
  });

  const [currentTheme, setCurrentTheme] = useLocalStorage('cardTheme', 'professional');
  const [isEditMode, setIsEditMode] = useState(false);
  const { isFlipped, flipCard } = useCardFlip();

  const themes = {
    professional: { /* colors */ },
    creative: { /* colors */ },
    minimal: { /* colors */ }
  };

  const currentThemeColors = themes[currentTheme];

  return (
    <div className="business-card-container">
      <ThemeSelector
        themes={Object.keys(themes)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      <div
        className={`business-card ${isFlipped ? 'flipped' : ''}`}
        style={{
          '--primary-color': currentThemeColors.primary,
          '--secondary-color': currentThemeColors.secondary,
          '--accent-color': currentThemeColors.accent,
          '--text-color': currentThemeColors.text
        }}
        onClick={flipCard}
      >
        <div className="card-inner">
          <CardFront
            cardData={cardData}
            isEditMode={isEditMode}
            onEditToggle={() => setIsEditMode(!isEditMode)}
          />
          <CardBack
            cardData={cardData}
            isEditMode={isEditMode}
            onDataChange={setCardData}
          />
        </div>
      </div>

      <p className="flip-hint">
        {isFlipped ? 'Click to see front' : 'Click to flip card'}
      </p>
    </div>
  );
}

export default BusinessCard;
```

### 2. CardFront.jsx
```jsx
import ContactButtons from './ContactButtons';
import SocialLinks from './SocialLinks';

function CardFront({ cardData, isEditMode, onEditToggle }) {
  return (
    <div className="card-front">
      <div className="card-header">
        <img
          src={cardData.avatar}
          alt={cardData.name}
          className="avatar"
          onError={(e) => {
            e.target.src = '/default-avatar.png';
          }}
        />

        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent card flip
            onEditToggle();
          }}
          aria-label="Edit card"
        >
          ✏️
        </button>
      </div>

      <div className="card-content">
        <h1 className="name">{cardData.name}</h1>
        <h2 className="title">{cardData.title}</h2>
        <p className="company">{cardData.company}</p>
      </div>

      <div className="card-actions">
        <ContactButtons
          email={cardData.email}
          phone={cardData.phone}
          website={cardData.website}
        />
        <SocialLinks />
      </div>
    </div>
  );
}

export default CardFront;
```

### 3. ContactButtons.jsx
```jsx
import { useState } from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

function ContactButtons({ email, phone, website }) {
  const [copiedField, setCopiedField] = useState(null);
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = async (field, value) => {
    const success = await copyToClipboard(value);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const openLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="contact-buttons">
      <button
        className={`contact-btn email ${copiedField === 'email' ? 'copied' : ''}`}
        onClick={() => handleCopy('email', email)}
        title="Copy email"
      >
        📧 {copiedField === 'email' ? 'Copied!' : 'Email'}
      </button>

      <button
        className={`contact-btn phone ${copiedField === 'phone' ? 'copied' : ''}`}
        onClick={() => handleCopy('phone', phone)}
        title="Copy phone"
      >
        📱 {copiedField === 'phone' ? 'Copied!' : 'Phone'}
      </button>

      <button
        className="contact-btn website"
        onClick={() => openLink(website)}
        title="Visit website"
      >
        🌐 Website
      </button>
    </div>
  );
}

export default ContactButtons;
```

### 4. SocialLinks.jsx
```jsx
import { useState } from 'react';

function SocialLinks() {
  const [hoveredLink, setHoveredLink] = useState(null);

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: '💼' },
    { name: 'GitHub', url: 'https://github.com/johndoe', icon: '💻' },
    { name: 'Twitter', url: 'https://twitter.com/johndoe', icon: '🐦' },
    { name: 'Instagram', url: 'https://instagram.com/johndoe', icon: '📷' }
  ];

  const handleSocialClick = (url, e) => {
    e.stopPropagation(); // Prevent card flip
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="social-links">
      {socialLinks.map((link) => (
        <button
          key={link.name}
          className={`social-btn ${hoveredLink === link.name ? 'hovered' : ''}`}
          onClick={(e) => handleSocialClick(link.url, e)}
          onMouseEnter={() => setHoveredLink(link.name)}
          onMouseLeave={() => setHoveredLink(null)}
          title={link.name}
          aria-label={`Visit ${link.name}`}
        >
          <span className="icon">{link.icon}</span>
          {hoveredLink === link.name && (
            <span className="tooltip">{link.name}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default SocialLinks;
```

### 5. CardBack.jsx
```jsx
import QRCode from './QRCode';
import EditMode from './EditMode';

function CardBack({ cardData, isEditMode, onDataChange }) {
  const generateVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${cardData.name}
TITLE:${cardData.title}
ORG:${cardData.company}
EMAIL:${cardData.email}
TEL:${cardData.phone}
URL:${cardData.website}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${cardData.name.replace(/\s+/g, '_')}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isEditMode) {
    return <EditMode cardData={cardData} onDataChange={onDataChange} />;
  }

  return (
    <div className="card-back">
      <div className="card-header">
        <h2>Contact Information</h2>
        <button
          className="download-btn"
          onClick={(e) => {
            e.stopPropagation();
            generateVCard();
          }}
          title="Download vCard"
        >
          📥 Download Contact
        </button>
      </div>

      <div className="contact-details">
        <div className="detail-item">
          <span className="icon">📧</span>
          <span className="text">{cardData.email}</span>
        </div>

        <div className="detail-item">
          <span className="icon">📱</span>
          <span className="text">{cardData.phone}</span>
        </div>

        <div className="detail-item">
          <span className="icon">🌐</span>
          <span className="text">{cardData.website}</span>
        </div>
      </div>

      <div className="qr-section">
        <h3>Scan for Contact</h3>
        <QRCode
          data={{
            name: cardData.name,
            email: cardData.email,
            phone: cardData.phone,
            website: cardData.website
          }}
        />
      </div>
    </div>
  );
}

export default CardBack;
```

### 6. QRCode.jsx
```jsx
import { useEffect, useRef } from 'react';

function QRCode({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Simple QR code generation (you can use a library like qrcode.js)
    const generateQR = async () => {
      try {
        // For demo purposes, we'll create a simple pattern
        // In real app, use: npm install qrcode
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 150, 150);

        // Simple QR-like pattern (just for demo)
        ctx.fillStyle = 'black';
        for (let i = 0; i < 15; i++) {
          for (let j = 0; j < 15; j++) {
            if (Math.random() > 0.5) {
              ctx.fillRect(i * 10, j * 10, 10, 10);
            }
          }
        }

        // Add text in center
        ctx.fillStyle = 'white';
        ctx.font = '8px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('QR CODE', 75, 75);

      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [data]);

  return (
    <div className="qr-code-container">
      <canvas
        ref={canvasRef}
        width="150"
        height="150"
        className="qr-canvas"
      />
      <p className="qr-text">Scan to add contact</p>
    </div>
  );
}

export default QRCode;
```

### 7. EditMode.jsx
```jsx
import { useState } from 'react';

function EditMode({ cardData, onDataChange }) {
  const [formData, setFormData] = useState(cardData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    onDataChange(formData);
    setIsSaving(false);
  };

  const handleCancel = () => {
    setFormData(cardData); // Reset to original
  };

  return (
    <div className="edit-mode">
      <h2>Edit Card Information</h2>

      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Company:</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Website:</label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </div>

      <div className="edit-actions">
        <button
          className="save-btn"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>

        <button
          className="cancel-btn"
          onClick={handleCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditMode;
```

---

## 🎭 ANIMATIONS VỚI CSS

### Card Flip Animation:
```css
.business-card {
  width: 400px;
  height: 250px;
  perspective: 1000px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.business-card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.card-back {
  transform: rotateY(180deg);
}
```

### Button Hover Effects:
```css
.contact-btn {
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.contact-btn.copied {
  background-color: #10B981 !important;
  animation: pulse 0.5s;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

### Social Links Animation:
```css
.social-btn {
  transition: all 0.3s ease;
  position: relative;
}

.social-btn:hover {
  transform: scale(1.1);
}

.social-btn .tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  animation: fadeInUp 0.3s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
```

---

## 🔧 CUSTOM HOOKS

### useCardFlip.js:
```javascript
import { useState } from 'react';

export function useCardFlip() {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(prev => !prev);
  };

  const resetFlip = () => {
    setIsFlipped(false);
  };

  return {
    isFlipped,
    flipCard,
    resetFlip
  };
}
```

### useCopyToClipboard.js:
```javascript
import { useState } from 'react';

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return true;
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
        return false;
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return {
    isCopied,
    copyToClipboard
  };
}
```

### useLocalStorage.js:
```javascript
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
```

---

## 📱 RESPONSIVE DESIGN

```css
/* Mobile Styles */
@media (max-width: 768px) {
  .business-card {
    width: 350px;
    height: 220px;
  }

  .contact-buttons {
    flex-direction: column;
    gap: 8px;
  }

  .social-links {
    justify-content: center;
    gap: 15px;
  }

  .card-content h1 {
    font-size: 1.2rem;
  }

  .card-content h2 {
    font-size: 1rem;
  }
}

/* Tablet Styles */
@media (max-width: 1024px) and (min-width: 769px) {
  .business-card {
    width: 380px;
    height: 240px;
  }
}
```

---

## ♿ ACCESSIBILITY

### Keyboard Navigation:
```javascript
function BusinessCard() {
  // ... existing code ...

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flipCard();
    }
  };

  return (
    <div
      className="business-card"
      tabIndex="0"
      role="button"
      aria-label="Business card - click to flip"
      onKeyDown={handleKeyDown}
      // ... other props
    >
      {/* Card content */}
    </div>
  );
}
```

### Screen Reader Support:
```jsx
<div
  role="region"
  aria-label="Business card front"
  aria-live="polite"
>
  <h1>{cardData.name}</h1>
  <p>{cardData.title}</p>
</div>
```

---

## 🚀 ADVANCED FEATURES

### Drag & Drop Avatar:
```jsx
function AvatarUpload({ onAvatarChange }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => onAvatarChange(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div
      className={`avatar-upload ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drop image here or click to browse</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => onAvatarChange(e.target.result);
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
}
```

### Share Card:
```jsx
function ShareCard({ cardData }) {
  const shareCard = async () => {
    const shareData = {
      title: `${cardData.name}'s Business Card`,
      text: `Contact information for ${cardData.name}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <button onClick={shareCard} className="share-btn">
      📤 Share Card
    </button>
  );
}
```

---

## ✅ CHECKLIST HOÀN THÀNH

### Components (8+):
- [ ] BusinessCard (main)
- [ ] CardFront
- [ ] CardBack
- [ ] ContactButtons
- [ ] SocialLinks
- [ ] ThemeSelector
- [ ] QRCode
- [ ] EditMode

### Features:
- [ ] Card flip animation
- [ ] Contact copy functionality
- [ ] Social media links
- [ ] Theme switching
- [ ] QR code generation
- [ ] VCard download
- [ ] Edit mode
- [ ] Local storage persistence

### Technical Requirements:
- [ ] Event handling (click, hover, keyboard)
- [ ] Conditional rendering
- [ ] State management
- [ ] Custom hooks
- [ ] CSS animations
- [ ] Responsive design
- [ ] Accessibility
- [ ] Error handling

---

## 🎯 LEARNING OUTCOMES

Sau dự án này, bạn sẽ nắm vững:

1. **Complex Event Handling** - Mouse, keyboard, touch events
2. **Animation Techniques** - CSS transforms, transitions
3. **State Management** - Multiple states, complex interactions
4. **Custom Hooks** - Reusable logic extraction
5. **Local Storage** - Data persistence
6. **File Operations** - Download, upload
7. **Responsive Design** - Mobile-first approach
8. **Accessibility** - ARIA, keyboard navigation
9. **Error Boundaries** - Graceful error handling
10. **Performance Optimization** - Memoization, lazy loading

---

## 🚀 DEPLOYMENT & SHARING

### GitHub Pages:
```bash
npm install gh-pages --save-dev
# Add to package.json scripts
"deploy": "gh-pages -d build"
npm run deploy
```

### Netlify/Vercel:
- Connect GitHub repository
- Auto-deploy on push
- Custom domain setup

### Share Your Card:
- Generate unique URL for each card
- Social media sharing
- QR code for easy access

---

**Dự án Business Card Interactive này sẽ là portfolio piece ấn tượng, showcase khả năng React của bạn! 🎉**