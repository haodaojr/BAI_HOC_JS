import { useState, useEffect } from 'react';
import '../App.css';

function App6() {
  // State management cho toàn bộ portfolio
  const [currentSection, setCurrentSection] = useState('home');
  const [theme, setTheme] = useState('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Data cho portfolio
  const portfolioData = {
    personal: {
      name: "Nguyễn Văn A",
      title: "Full Stack Developer",
      avatar: "https://via.placeholder.com/150",
      bio: "Tôi là một lập trình viên full-stack với niềm đam mê tạo ra các ứng dụng web chất lượng cao.",
      location: "Hà Nội, Việt Nam",
      email: "nguyenvana@example.com",
      phone: "+84 123 456 789"
    },
    skills: [
      { name: "React", level: 90, color: "#61dafb" },
      { name: "JavaScript", level: 85, color: "#f7df1e" },
      { name: "Node.js", level: 80, color: "#68a063" },
      { name: "CSS", level: 75, color: "#1572b6" },
      { name: "HTML", level: 95, color: "#e34f26" },
      { name: "Git", level: 70, color: "#f05032" }
    ],
    projects: [
      {
        id: 1,
        title: "E-commerce Website",
        description: "Website thương mại điện tử với React và Node.js",
        image: "https://via.placeholder.com/400x250",
        technologies: ["React", "Node.js", "MongoDB"],
        github: "#",
        demo: "#",
        category: "web"
      },
      {
        id: 2,
        title: "Weather App",
        description: "Ứng dụng thời tiết với API integration",
        image: "https://via.placeholder.com/400x250",
        technologies: ["React", "API", "CSS"],
        github: "#",
        demo: "#",
        category: "web"
      },
      {
        id: 3,
        title: "Task Manager",
        description: "Ứng dụng quản lý công việc với local storage",
        image: "https://via.placeholder.com/400x250",
        technologies: ["React", "LocalStorage", "CSS"],
        github: "#",
        demo: "#",
        category: "web"
      }
    ],
    experience: [
      {
        id: 1,
        position: "Frontend Developer",
        company: "Tech Company",
        period: "2022 - Hiện tại",
        description: "Phát triển giao diện người dùng với React và TypeScript"
      },
      {
        id: 2,
        position: "Junior Developer",
        company: "Startup XYZ",
        period: "2021 - 2022",
        description: "Tham gia phát triển các dự án web với JavaScript"
      }
    ]
  };

  // Navigation handler
  const handleNavigation = (section) => {
    setCurrentSection(section);
    setIsMenuOpen(false); // Đóng menu mobile
  };

  // Theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Scroll to top khi chuyển section
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection]);

  return (
    <div className={`portfolio-app ${theme}`} style={{
      backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
      color: theme === 'light' ? '#333333' : '#ffffff',
      minHeight: '100vh'
    }}>
      {/* Navigation */}
      <Navigation
        currentSection={currentSection}
        onNavigate={handleNavigation}
        theme={theme}
        onThemeToggle={toggleTheme}
        isMenuOpen={isMenuOpen}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Main Content */}
      <main style={{ paddingTop: '80px' }}>
        {currentSection === 'home' && <HeroSection data={portfolioData.personal} />}
        {currentSection === 'about' && <AboutSection data={portfolioData.personal} />}
        {currentSection === 'skills' && <SkillsSection skills={portfolioData.skills} />}
        {currentSection === 'projects' && <ProjectsSection projects={portfolioData.projects} />}
        {currentSection === 'experience' && <ExperienceSection experience={portfolioData.experience} />}
        {currentSection === 'contact' && <ContactSection contact={portfolioData.personal} />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Navigation Component
function Navigation({ currentSection, onNavigate, theme, onThemeToggle, isMenuOpen, onMenuToggle }) {
  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: '🏠' },
    { id: 'about', label: 'Giới thiệu', icon: '👤' },
    { id: 'skills', label: 'Kỹ năng', icon: '💡' },
    { id: 'projects', label: 'Dự án', icon: '💼' },
    { id: 'experience', label: 'Kinh nghiệm', icon: '📈' },
    { id: 'contact', label: 'Liên hệ', icon: '📧' }
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: theme === 'light' ? 'rgba(255,255,255,0.95)' : 'rgba(26,26,26,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${theme === 'light' ? '#e9ecef' : '#333'}`,
      zIndex: 1000,
      padding: '0 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px'
      }}>
        {/* Logo */}
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: theme === 'light' ? '#007bff' : '#61dafb'
        }}>
          Portfolio
        </div>

        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '30px',
          alignItems: 'center'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: 'none',
                border: 'none',
                color: currentSection === item.id
                  ? (theme === 'light' ? '#007bff' : '#61dafb')
                  : (theme === 'light' ? '#666' : '#ccc'),
                fontSize: '16px',
                fontWeight: currentSection === item.id ? '600' : '400',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            style={{
              background: 'none',
              border: `2px solid ${theme === 'light' ? '#007bff' : '#61dafb'}`,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          style={{
            display: window.innerWidth < 768 ? 'block' : 'none',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer'
          }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          display: window.innerWidth < 768 ? 'block' : 'none',
          position: 'absolute',
          top: '80px',
          left: 0,
          right: 0,
          backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
          borderTop: `1px solid ${theme === 'light' ? '#e9ecef' : '#333'}`,
          padding: '20px'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'block',
                width: '100%',
                background: 'none',
                border: 'none',
                color: currentSection === item.id
                  ? (theme === 'light' ? '#007bff' : '#61dafb')
                  : (theme === 'light' ? '#666' : '#ccc'),
                fontSize: '16px',
                padding: '12px 0',
                textAlign: 'left',
                cursor: 'pointer'
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// Hero Section Component
function HeroSection({ data }) {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 20px'
    }}>
      <div style={{
        maxWidth: '800px',
        textAlign: 'center'
      }}>
        <img
          src={data.avatar}
          alt="Avatar"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            marginBottom: '30px',
            border: '5px solid #007bff'
          }}
        />

        <h1 style={{
          fontSize: '3rem',
          marginBottom: '10px',
          background: 'linear-gradient(45deg, #007bff, #61dafb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {data.name}
        </h1>

        <h2 style={{
          fontSize: '1.5rem',
          color: '#666',
          marginBottom: '20px'
        }}>
          {data.title}
        </h2>

        <p style={{
          fontSize: '1.2rem',
          lineHeight: '1.6',
          marginBottom: '30px',
          color: '#777'
        }}>
          {data.bio}
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '12px 30px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'transform 0.3s'
          }}>
            Xem dự án
          </button>

          <button style={{
            padding: '12px 30px',
            backgroundColor: 'transparent',
            color: '#007bff',
            border: '2px solid #007bff',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}>
            Liên hệ
          </button>
        </div>
      </div>
    </section>
  );
}

// About Section Component
function AboutSection({ data }) {
  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#007bff'
      }}>
        Giới thiệu về tôi
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div>
          <img
            src={data.avatar}
            alt="About me"
            style={{
              width: '100%',
              maxWidth: '300px',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>
            Xin chào! Tôi là {data.name}
          </h3>

          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.7',
            marginBottom: '20px',
            color: '#666'
          }}>
            {data.bio} Tôi có kinh nghiệm trong việc phát triển các ứng dụng web hiện đại
            sử dụng React, Node.js và các công nghệ mới nhất.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>
                3+
              </div>
              <div style={{ color: '#666' }}>Năm kinh nghiệm</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
                10+
              </div>
              <div style={{ color: '#666' }}>Dự án hoàn thành</div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffc107' }}>
                5+
              </div>
              <div style={{ color: '#666' }}>Công nghệ thành thạo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Skills Section Component
function SkillsSection({ skills }) {
  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#007bff'
      }}>
        Kỹ năng của tôi
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {skills.map((skill, index) => (
          <div key={index} style={{
            backgroundColor: '#f8f9fa',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                margin: 0,
                color: skill.color,
                fontSize: '1.3rem'
              }}>
                {skill.name}
              </h3>
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#666'
              }}>
                {skill.level}%
              </span>
            </div>

            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#e9ecef',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${skill.level}%`,
                height: '100%',
                backgroundColor: skill.color,
                borderRadius: '4px',
                transition: 'width 1s ease-in-out'
              }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Projects Section Component
function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#007bff'
      }}>
        Dự án của tôi
      </h2>

      {/* Filter buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '40px',
        flexWrap: 'wrap'
      }}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            style={{
              padding: '8px 20px',
              backgroundColor: filter === category ? '#007bff' : '#f8f9fa',
              color: filter === category ? 'white' : '#666',
              border: `2px solid ${filter === category ? '#007bff' : '#e9ecef'}`,
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            {category === 'all' ? 'Tất cả' : category.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px'
      }}>
        {filteredProjects.map(project => (
          <div key={project.id} style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            cursor: 'pointer'
          }}>
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }}
            />

            <div style={{ padding: '25px' }}>
              <h3 style={{
                margin: '0 0 10px 0',
                fontSize: '1.4rem',
                color: '#333'
              }}>
                {project.title}
              </h3>

              <p style={{
                margin: '0 0 20px 0',
                color: '#666',
                lineHeight: '1.6'
              }}>
                {project.description}
              </p>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginBottom: '20px'
              }}>
                {project.technologies.map((tech, index) => (
                  <span key={index} style={{
                    backgroundColor: '#e9ecef',
                    color: '#495057',
                    padding: '4px 12px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                gap: '10px'
              }}>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  Xem demo
                </button>
                <button style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: 'transparent',
                  color: '#007bff',
                  border: '2px solid #007bff',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  GitHub
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Experience Section Component
function ExperienceSection({ experience }) {
  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#007bff'
      }}>
        Kinh nghiệm làm việc
      </h2>

      <div style={{ position: 'relative' }}>
        {experience.map((exp, index) => (
          <div key={exp.id} style={{
            display: 'flex',
            gap: '30px',
            marginBottom: '40px',
            position: 'relative'
          }}>
            {/* Timeline dot */}
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#007bff',
              borderRadius: '50%',
              flexShrink: 0,
              marginTop: '8px',
              position: 'relative',
              zIndex: 2
            }} />

            {/* Timeline line */}
            {index < experience.length - 1 && (
              <div style={{
                position: 'absolute',
                left: '9px',
                top: '28px',
                width: '2px',
                height: 'calc(100% + 12px)',
                backgroundColor: '#e9ecef',
                zIndex: 1
              }} />
            )}

            {/* Content */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                margin: '0 0 5px 0',
                fontSize: '1.4rem',
                color: '#333'
              }}>
                {exp.position}
              </h3>

              <div style={{
                color: '#007bff',
                fontWeight: '600',
                marginBottom: '10px'
              }}>
                {exp.company} • {exp.period}
              </div>

              <p style={{
                margin: 0,
                color: '#666',
                lineHeight: '1.6'
              }}>
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection({ contact }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <section style={{
      padding: '80px 20px',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '40px',
        color: '#007bff'
      }}>
        Liên hệ với tôi
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 768 ? '1fr' : '1fr 1fr',
        gap: '60px'
      }}>
        {/* Contact Info */}
        <div>
          <h3 style={{
            fontSize: '1.8rem',
            marginBottom: '30px',
            color: '#333'
          }}>
            Hãy trò chuyện!
          </h3>

          <div style={{ marginBottom: '30px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              gap: '15px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#007bff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                📧
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#333' }}>Email</div>
                <div style={{ color: '#666' }}>{contact.email}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '20px',
              gap: '15px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#28a745',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                📱
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#333' }}>Phone</div>
                <div style={{ color: '#666' }}>{contact.phone}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#ffc107',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px'
              }}>
                📍
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#333' }}>Location</div>
                <div style={{ color: '#666' }}>{contact.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} style={{
            backgroundColor: '#f8f9fa',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: '600',
                color: '#333'
              }}>
                Họ tên
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: '600',
                color: '#333'
              }}>
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleChange('email')}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: '600',
                color: '#333'
              }}>
                Tin nhắn
              </label>
              <textarea
                value={formData.message}
                onChange={handleChange('message')}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e9ecef',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              {isSubmitted ? '✅ Đã gửi!' : 'Gửi tin nhắn'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#2d3436',
      color: 'white',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p style={{
          margin: '0 0 20px 0',
          fontSize: '1.1rem'
        }}>
          © {currentYear} Portfolio. Built with React & ❤️
        </p>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <a href="#" style={{
            color: '#61dafb',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            GitHub
          </a>
          <a href="#" style={{
            color: '#61dafb',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            LinkedIn
          </a>
          <a href="#" style={{
            color: '#61dafb',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}

export default App6;