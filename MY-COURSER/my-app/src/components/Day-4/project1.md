# 🚀 DỰ ÁN TỔNG KẾT GIAI ĐOẠN 1: PERSONAL PORTFOLIO WEBSITE

**Mục tiêu:** Xây dựng website cá nhân với 12+ components, áp dụng đầy đủ kiến thức JSX, components, props, events, conditional rendering từ Day 1-3.

---

## 📋 YÊU CẦU DỰ ÁN

### ✅ Tính năng bắt buộc:
- [ ] **Header/Navigation** - Menu điều hướng responsive
- [ ] **Hero Section** - Giới thiệu bản thân với animation
- [ ] **About Section** - Thông tin cá nhân, kỹ năng
- [ ] **Skills Section** - Danh sách kỹ năng với progress bars
- [ ] **Projects Section** - Portfolio các dự án
- [ ] **Experience Section** - Kinh nghiệm làm việc
- [ ] **Contact Form** - Form liên hệ với validation
- [ ] **Footer** - Thông tin liên hệ, social links
- [ ] **Theme Toggle** - Chuyển đổi dark/light mode
- [ ] **Mobile Responsive** - Hoạt động tốt trên mobile
- [ ] **Smooth Animations** - Transitions mượt mà
- [ ] **Loading States** - Hiển thị loading khi cần

### 🎯 Yêu cầu kỹ thuật:
- **12+ Components** riêng biệt
- Sử dụng **JSX, Props, Events** đầy đủ
- **Conditional rendering** (&&, ||, ternary)
- **State management** với useState
- **Event handling** (onClick, onChange, onSubmit)
- **Form validation** cơ bản
- **Responsive design** với CSS/Tailwind
- **Clean code** structure

---

## 🏗️ CẤU TRÚC COMPONENTS

```
src/
├── components/
│   ├── Header.jsx           // Navigation menu
│   ├── Hero.jsx             // Hero section với animation
│   ├── About.jsx            // About section
│   ├── Skills.jsx           // Skills với progress bars
│   ├── Projects.jsx         // Projects grid
│   ├── Experience.jsx       // Experience timeline
│   ├── ContactForm.jsx      // Contact form với validation
│   ├── Footer.jsx           // Footer với social links
│   ├── ThemeToggle.jsx      // Dark/Light mode toggle
│   ├── LoadingSpinner.jsx   // Loading component
│   ├── ProjectCard.jsx      // Reusable project card
│   └── SkillBar.jsx         // Reusable skill progress bar
├── App.jsx                  // Main component
└── index.css               // Global styles
```

---

## 🎨 THIẾT KẾ GIAO DIỆN

### Color Scheme:
- **Primary:** #3B82F6 (Blue)
- **Secondary:** #10B981 (Green)
- **Accent:** #F59E0B (Amber)
- **Dark mode:** #1F2937 background, #F9FAFB text

### Typography:
- **Heading:** Inter/Playfair Display
- **Body:** Inter/Open Sans
- **Mono:** Fira Code (cho code)

---

## 📝 CHI TIẾT TỪNG COMPONENT

### 1. Header.jsx
```jsx
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  return (
    <header className={`${isDark ? 'dark' : ''}`}>
      <nav>
        <div className="logo">Your Name</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="mobile-menu">
            {/* Menu items */}
          </ul>
        )}

        {/* Theme Toggle */}
        <ThemeToggle isDark={isDark} onToggle={setIsDark} />
      </nav>
    </header>
  );
}
```

### 2. Hero.jsx
```jsx
function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi, I'm [Your Name]";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="typing-effect">{displayText}</h1>
        <p className="subtitle">Full Stack Developer</p>
        <div className="hero-buttons">
          <button className="btn-primary">View My Work</button>
          <button className="btn-secondary">Download CV</button>
        </div>
      </div>
      <div className="hero-image">
        <img src="/avatar.jpg" alt="Profile" />
      </div>
    </section>
  );
}
```

### 3. Skills.jsx
```jsx
function Skills() {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 }
  ];

  return (
    <section id="skills">
      <h2>My Skills</h2>
      <div className="skills-grid">
        {skills.map(skill => (
          <SkillBar
            key={skill.name}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </div>
    </section>
  );
}

function SkillBar({ name, level }) {
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentLevel(level), 500);
    return () => clearTimeout(timer);
  }, [level]);

  return (
    <div className="skill-bar">
      <div className="skill-info">
        <span>{name}</span>
        <span>{currentLevel}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${currentLevel}%` }}
        />
      </div>
    </div>
  );
}
```

### 4. Projects.jsx
```jsx
function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-commerce Website',
      category: 'web',
      image: '/project1.jpg',
      description: 'Full-stack e-commerce with React & Node.js',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com/...',
      demo: 'https://demo.com'
    },
    // More projects...
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects">
      <h2>My Projects</h2>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {['all', 'web', 'mobile', 'design'].map(category => (
          <button
            key={category}
            className={filter === category ? 'active' : ''}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card" onClick={onClick}>
      <img src={project.image} alt={project.title} />
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="technologies">
          {project.technologies.map(tech => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 5. ContactForm.jsx
```jsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="success-message">
        <h3>✅ Thank you for your message!</h3>
        <p>I'll get back to you soon.</p>
        <button onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="submit-btn"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}
```

---

## 🎨 STYLING VỚI TAILWIND CSS

### Cài đặt Tailwind:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### tailwind.config.js:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      }
    },
  },
  plugins: [],
}
```

### index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors;
  }

  .btn-secondary {
    @apply border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all;
  }
}

@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
}
```

---

## 🎭 ANIMATIONS VỚI FRAMER MOTION

### Cài đặt:
```bash
npm install framer-motion
```

### Ví dụ animations:
```jsx
import { motion } from 'framer-motion';

function AnimatedSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2>Animated Section</h2>
      <p>This section animates when scrolled into view</p>
    </motion.section>
  );
}
```

---

## 📱 RESPONSIVE DESIGN

### Mobile-first approach:
```jsx
function ResponsiveComponent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex">
        {/* Desktop menu items */}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden">
          {/* Mobile menu items */}
        </nav>
      )}
    </div>
  );
}
```

---

## 🚀 DEPLOYMENT

### Vercel (Khuyến nghị):
```bash
npm install -g vercel
vercel --prod
```

### Netlify:
```bash
npm run build
# Upload dist/ folder to Netlify
```

---

## ✅ CHECKLIST HOÀN THÀNH

### Components (12+):
- [ ] Header/Navigation
- [ ] Hero Section
- [ ] About Section
- [ ] Skills Section
- [ ] Projects Section
- [ ] Experience Section
- [ ] Contact Form
- [ ] Footer
- [ ] Theme Toggle
- [ ] Loading Spinner
- [ ] Project Card
- [ ] Skill Bar

### Features:
- [ ] Responsive design
- [ ] Dark/Light mode
- [ ] Form validation
- [ ] Smooth animations
- [ ] Loading states
- [ ] Error handling

### Technical Requirements:
- [ ] JSX syntax
- [ ] Props passing
- [ ] Event handling
- [ ] Conditional rendering
- [ ] State management
- [ ] Component composition
- [ ] Clean code structure

---

## 🎯 NEXT STEPS

Sau khi hoàn thành dự án này, bạn đã sẵn sàng cho:

1. **Phase 2:** Data Fetching & API Integration
2. **Phase 3:** TypeScript & Testing
3. **Phase 4:** Advanced Patterns & Production

**Chúc mừng! Bạn đã hoàn thành Giai Đoạn 1 của lộ trình React! 🎉**