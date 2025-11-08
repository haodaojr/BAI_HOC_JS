# ⚡ MINI PROJECT: LANDING PAGE VỚI 8-10 REUSABLE COMPONENTS - PHIÊN BẢN NHANH

## 🎯 MỤC TIÊU DỰ ÁN

**Tạo landing page hoàn chỉnh với:**
- 8-10 reusable components
- Component composition
- Responsive design
- Modern UI/UX
- Clean architecture

---

## 📋 THIẾT KẾ LANDING PAGE

### **Cấu trúc trang:**
1. **Header/Navigation** - Điều hướng
2. **Hero Section** - Phần giới thiệu chính
3. **Features Section** - Tính năng
4. **Testimonials** - Phản hồi khách hàng
5. **Pricing Cards** - Bảng giá
6. **CTA Section** - Call-to-action
7. **Footer** - Chân trang

### **Components cần tạo:**
- `Header`
- `HeroSection`
- `FeaturesSection`
- `TestimonialCard`
- `PricingCard`
- `CTASection`
- `Footer`
- `Button` (tái sử dụng)
- `Card` (tái sử dụng)

---

## 🏗️ IMPLEMENTATION

### **1. Tạo Component Library Base:**

```jsx
// components/ui/Button.jsx
function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick 
}) {
  const variants = {
    primary: { backgroundColor: '#007bff', color: 'white' },
    secondary: { backgroundColor: '#6c757d', color: 'white' },
    outline: { 
      backgroundColor: 'transparent', 
      color: '#007bff', 
      border: '2px solid #007bff' 
    }
  };
  
  const sizes = {
    small: { padding: '8px 16px', fontSize: '14px' },
    medium: { padding: '12px 24px', fontSize: '16px' },
    large: { padding: '16px 32px', fontSize: '18px' }
  };
  
  return (
    <button
      style={{
        border: 'none',
        borderRadius: '6px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ...variants[variant],
        ...sizes[size]
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

// components/ui/Card.jsx
function Card({ children, style = {} }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      ...style
    }}>
      {children}
    </div>
  );
}

export default Card;
```

### **2. Header Component:**

```jsx
// components/Header.jsx
import Button from './ui/Button';

function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1000,
      padding: '16px 40px'
    }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
          MyApp
        </div>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#333' }}>Home</a>
          <a href="#features" style={{ textDecoration: 'none', color: '#333' }}>Features</a>
          <a href="#pricing" style={{ textDecoration: 'none', color: '#333' }}>Pricing</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#333' }}>Contact</a>
          <Button size="small">Get Started</Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
```

### **3. Hero Section:**

```jsx
// components/HeroSection.jsx
import Button from './ui/Button';

function HeroSection() {
  return (
    <section style={{
      padding: '120px 40px 80px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Build Amazing Apps with React
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          marginBottom: '40px',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Create modern, responsive web applications faster than ever.
          Join thousands of developers building the future.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Button size="large">Start Building</Button>
          <Button variant="outline" size="large">Learn More</Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
```

### **4. Features Section:**

```jsx
// components/FeaturesSection.jsx
import Card from './ui/Card';

function FeaturesSection() {
  const features = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Built with performance in mind. Load times under 2 seconds.'
    },
    {
      icon: '🎨',
      title: 'Beautiful Design',
      description: 'Modern, clean interface that your users will love.'
    },
    {
      icon: '📱',
      title: 'Responsive',
      description: 'Works perfectly on desktop, tablet, and mobile devices.'
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Enterprise-grade security to protect your data.'
    },
    {
      icon: '⚡',
      title: 'Easy to Use',
      description: 'Intuitive interface that anyone can use.'
    },
    {
      icon: '🔧',
      title: 'Customizable',
      description: 'Tailor the platform to fit your specific needs.'
    }
  ];
  
  return (
    <section id="features" style={{ 
      padding: '80px 40px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            marginBottom: '16px',
            color: '#333'
          }}>
            Powerful Features
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#666',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Everything you need to build amazing applications
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {features.map((feature, index) => (
            <Card key={index} style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                {feature.icon}
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                marginBottom: '16px',
                color: '#333'
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                color: '#666',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
```

### **5. Testimonial Card:**

```jsx
// components/TestimonialCard.jsx
import Card from './ui/Card';

function TestimonialCard({ testimonial }) {
  return (
    <Card style={{ 
      padding: '32px',
      textAlign: 'center',
      height: '100%'
    }}>
      <div style={{ 
        fontSize: '64px', 
        marginBottom: '20px',
        color: '#007bff'
      }}>
        "
      </div>
      
      <p style={{ 
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#666',
        marginBottom: '24px',
        fontStyle: 'italic'
      }}>
        {testimonial.text}
      </p>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover'
          }}
        />
        <div>
          <div style={{ 
            fontWeight: 'bold',
            color: '#333'
          }}>
            {testimonial.name}
          </div>
          <div style={{ 
            fontSize: '14px',
            color: '#666'
          }}>
            {testimonial.role}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TestimonialCard;
```

### **6. Testimonials Section:**

```jsx
// components/TestimonialsSection.jsx
import TestimonialCard from './TestimonialCard';

function TestimonialsSection() {
  const testimonials = [
    {
      text: "This platform has revolutionized how we build applications. The speed and ease of use is incredible!",
      name: "Sarah Johnson",
      role: "CTO, TechCorp",
      avatar: "https://i.pravatar.cc/100?img=1"
    },
    {
      text: "We've increased our development speed by 300% since switching to this platform. Highly recommended!",
      name: "Mike Chen",
      role: "Lead Developer, StartupXYZ",
      avatar: "https://i.pravatar.cc/100?img=2"
    },
    {
      text: "The best investment we've made for our development team. The results speak for themselves.",
      name: "Emily Davis",
      role: "Product Manager, InnovateCo",
      avatar: "https://i.pravatar.cc/100?img=3"
    }
  ];
  
  return (
    <section style={{ 
      padding: '80px 40px',
      backgroundColor: 'white'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            marginBottom: '16px',
            color: '#333'
          }}>
            What Our Customers Say
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#666'
          }}>
            Join thousands of satisfied customers
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
```

### **7. Pricing Card:**

```jsx
// components/PricingCard.jsx
import Card from './ui/Card';
import Button from './ui/Button';

function PricingCard({ plan }) {
  return (
    <Card style={{ 
      padding: '40px',
      textAlign: 'center',
      position: 'relative',
      ...(plan.popular && {
        border: '2px solid #007bff',
        transform: 'scale(1.05)'
      })
    }}>
      {plan.popular && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          MOST POPULAR
        </div>
      )}
      
      <h3 style={{ 
        fontSize: '24px', 
        fontWeight: 'bold', 
        marginBottom: '16px',
        color: '#333'
      }}>
        {plan.name}
      </h3>
      
      <div style={{ marginBottom: '24px' }}>
        <span style={{ 
          fontSize: '48px', 
          fontWeight: 'bold',
          color: '#007bff'
        }}>
          ${plan.price}
        </span>
        <span style={{ color: '#666' }}>/month</span>
      </div>
      
      <p style={{ 
        color: '#666',
        marginBottom: '32px',
        minHeight: '48px'
      }}>
        {plan.description}
      </p>
      
      <ul style={{ 
        listStyle: 'none',
        padding: 0,
        marginBottom: '32px',
        textAlign: 'left'
      }}>
        {plan.features.map((feature, index) => (
          <li key={index} style={{ 
            padding: '8px 0',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ 
              color: '#28a745',
              marginRight: '12px',
              fontSize: '18px'
            }}>
              ✓
            </span>
            {feature}
          </li>
        ))}
      </ul>
      
      <Button 
        variant={plan.popular ? 'primary' : 'outline'}
        size="large"
        style={{ width: '100%' }}
      >
        {plan.buttonText}
      </Button>
    </Card>
  );
}

export default PricingCard;
```

### **8. Pricing Section:**

```jsx
// components/PricingSection.jsx
import PricingCard from './PricingCard';

function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: 9,
      description: "Perfect for small projects",
      features: [
        "Up to 5 projects",
        "10GB storage",
        "Basic support",
        "Email notifications"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: 29,
      description: "Best for growing businesses",
      features: [
        "Unlimited projects",
        "100GB storage",
        "Priority support",
        "Advanced analytics",
        "Team collaboration",
        "Custom integrations"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: 99,
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "24/7 dedicated support",
        "Custom development",
        "SLA guarantee",
        "On-premise deployment"
      ],
      buttonText: "Contact Sales",
      popular: false
    }
  ];
  
  return (
    <section id="pricing" style={{ 
      padding: '80px 40px',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            marginBottom: '16px',
            color: '#333'
          }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: '#666'
          }}>
            Choose the plan that's right for you
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
```

### **9. CTA Section:**

```jsx
// components/CTASection.jsx
import Button from './ui/Button';

function CTASection() {
  return (
    <section style={{
      padding: '80px 40px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          marginBottom: '24px'
        }}>
          Ready to Get Started?
        </h2>
        
        <p style={{ 
          fontSize: '18px', 
          marginBottom: '40px',
          opacity: 0.9,
          lineHeight: '1.6'
        }}>
          Join thousands of developers building amazing applications.
          Start your free trial today.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button size="large">Start Free Trial</Button>
          <Button variant="outline" size="large">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
```

### **10. Footer:**

```jsx
// components/Footer.jsx
function Footer() {
  return (
    <footer style={{
      backgroundColor: '#333',
      color: 'white',
      padding: '40px 40px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          <div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '16px',
              color: '#007bff'
            }}>
              MyApp
            </div>
            <p style={{ 
              color: '#ccc',
              lineHeight: '1.6'
            }}>
              Building the future of web development, one component at a time.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Features</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Pricing</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Documentation</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>About</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Blog</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Careers</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '16px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Help Center</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Contact</a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{ color: '#ccc', textDecoration: 'none' }}>Privacy</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid #555',
          paddingTop: '20px',
          textAlign: 'center',
          color: '#ccc'
        }}>
          <p>&copy; 2024 MyApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
```

### **11. Main App Component:**

```jsx
// App.jsx
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
```

---

## 🎨 RESPONSIVE DESIGN

### **Thêm CSS responsive:**

```jsx
// Thêm vào mỗi component hoặc tạo file CSS riêng
const responsiveStyles = `
  @media (max-width: 768px) {
    .hero-content {
      padding: 60px 20px;
    }
    
    .hero-title {
      font-size: 32px !important;
    }
    
    .features-grid {
      grid-template-columns: 1fr !important;
    }
    
    .pricing-grid {
      grid-template-columns: 1fr !important;
    }
    
    .nav-links {
      display: none !important;
    }
  }
`;

// Inject styles
<style dangerouslySetInnerHTML={{ __html: responsiveStyles }} />
```

---

## 🚀 FEATURES NÂNG CAO

### **1. Smooth Scrolling:**

```jsx
// Thêm vào Header component
function handleNavClick(sectionId) {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth' });
}

// Sử dụng:
<a 
  href={`#${sectionId}`} 
  onClick={(e) => {
    e.preventDefault();
    handleNavClick(sectionId);
  }}
>
  Link Text
</a>
```

### **2. Animation on Scroll:**

```jsx
// components/hooks/useIntersectionObserver.js
import { useEffect, useRef, useState } from 'react';

function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [options]);
  
  return [ref, isIntersecting];
}

export default useIntersectionObserver;
```

### **3. Loading States:**

```jsx
// Thêm loading state cho các section
function FeaturesSection() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  
  if (isLoading) {
    return <div>Loading features...</div>;
  }
  
  return (
    // Normal content
  );
}
```

---

## 📊 TỔNG KẾT DỰ ÁN

### **Components đã tạo:**
✅ Header (Navigation)
✅ HeroSection 
✅ FeaturesSection
✅ TestimonialCard
✅ TestimonialsSection
✅ PricingCard
✅ PricingSection
✅ CTASection
✅ Footer
✅ Button (reusable)
✅ Card (reusable)

### **Kỹ thuật áp dụng:**
- Component composition
- Props drilling
- Reusable components
- Responsive design
- Clean architecture
- Modern UI patterns

### **Kết quả:**
- Landing page hoàn chỉnh
- 10+ reusable components
- Responsive trên mọi thiết bị
- Modern, professional design
- Clean, maintainable code

### **Next Steps:**
- Add animations/transitions
- Implement form validation
- Add dark mode toggle
- Create admin dashboard
- Add internationalization