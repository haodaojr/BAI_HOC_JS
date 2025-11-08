import React, { useState } from 'react';
import './App.css';

// 🎯 DỰ ÁN TỔNG KẾT GIAI ĐOẠN 1
// Personal Portfolio Website với 12+ components
// Áp dụng đầy đủ kiến thức JSX, components, props, events, conditional rendering

// 🎨 THEME CONFIGURATION
const themes = {
  light: {
    background: '#ffffff',
    text: '#1f2937',
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    cardBg: '#f8fafc',
    border: '#e5e7eb'
  },
  dark: {
    background: '#1f2937',
    text: '#f9fafb',
    primary: '#60a5fa',
    secondary: '#34d399',
    accent: '#fbbf24',
    cardBg: '#374151',
    border: '#4b5563'
  }
};

// 🎯 HEADER COMPONENT
function Header({ theme, toggleTheme, currentSection, setCurrentSection }) {

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '💪' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <header style={{
      backgroundColor: theme.cardBg,
      borderBottom: `1px solid ${theme.border}`,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '1rem 0' 
    }}>
      <nav style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: theme.primary
        }}>
          Your Name
        </div>

        {/* Desktop Navigation */}
        <ul style={{
          display: 'flex',
          gap: '2rem',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentSection(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentSection === item.id ? theme.primary : theme.text,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: currentSection === item.id ? 'bold' : 'normal',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = theme.primary + '20';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: `2px solid ${theme.primary}`,
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = theme.primary;
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = theme.primary;
          }}
        >
          {theme === themes.light ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
}

// 🏠 HERO SECTION
function Hero({ theme }) {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi, I'm Your Name 👋";

  React.useEffect(() => {
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
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`,
      padding: '120px 2rem 2rem'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '800px'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: theme.text,
          marginBottom: '1rem',
          minHeight: '4rem'
        }}>
          {displayText}
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: theme.text + '80',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Full Stack Developer passionate about creating amazing user experiences
          with modern web technologies.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button style={{
            backgroundColor: theme.primary,
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}>
            View My Work 🚀
          </button>

          <button style={{
            backgroundColor: 'transparent',
            color: theme.primary,
            border: `2px solid ${theme.primary}`,
            padding: '1rem 2rem',
            borderRadius: '0.5rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = theme.primary;
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = theme.primary;
          }}>
            Download CV 📄
          </button>
        </div>
      </div>
    </section>
  );
}

// 👤 ABOUT SECTION
function About({ theme }) {
  return (
    <section id="about" style={{
      padding: '5rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        color: theme.text,
        marginBottom: '3rem'
      }}>
        About Me
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center'
      }}>
        <div>
          <img
            src="https://via.placeholder.com/400x400"
            alt="Profile"
            style={{
              width: '100%',
              borderRadius: '1rem',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        <div>
          <h3 style={{
            fontSize: '1.8rem',
            color: theme.text,
            marginBottom: '1rem'
          }}>
            Passionate Developer
          </h3>

          <p style={{
            color: theme.text + '80',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            I'm a full-stack developer with 3+ years of experience building web applications.
            I love creating beautiful, functional, and user-friendly experiences.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: theme.cardBg,
              padding: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: theme.primary
              }}>
                50+
              </div>
              <div style={{ color: theme.text + '80' }}>
                Projects
              </div>
            </div>

            <div style={{
              backgroundColor: theme.cardBg,
              padding: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: theme.primary
              }}>
                3+
              </div>
              <div style={{ color: theme.text + '80' }}>
                Years Experience
              </div>
            </div>

            <div style={{
              backgroundColor: theme.cardBg,
              padding: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: theme.primary
              }}>
                100+
              </div>
              <div style={{ color: theme.text + '80' }}>
                Happy Clients
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 💪 SKILLS SECTION
function Skills({ theme }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skills = [
    { name: 'JavaScript', level: 90, category: 'frontend' },
    { name: 'React', level: 85, category: 'frontend' },
    { name: 'TypeScript', level: 80, category: 'frontend' },
    { name: 'Node.js', level: 75, category: 'backend' },
    { name: 'Python', level: 70, category: 'backend' },
    { name: 'MongoDB', level: 65, category: 'database' },
    { name: 'PostgreSQL', level: 70, category: 'database' },
    { name: 'AWS', level: 60, category: 'devops' }
  ];

  const categories = [
    { id: 'all', label: 'All Skills', icon: '🎯' },
    { id: 'frontend', label: 'Frontend', icon: '💻' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'database', label: 'Database', icon: '🗄️' },
    { id: 'devops', label: 'DevOps', icon: '🚀' }
  ];

  const filteredSkills = selectedCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section id="skills" style={{
      padding: '5rem 2rem',
      backgroundColor: theme.cardBg,
      borderTop: `1px solid ${theme.border}`,
      borderBottom: `1px solid ${theme.border}`
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          color: theme.text,
          marginBottom: '3rem'
        }}>
          My Skills
        </h2>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3rem',
          flexWrap: 'wrap'
        }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              style={{
                backgroundColor: selectedCategory === category.id ? theme.primary : theme.cardBg,
                color: selectedCategory === category.id ? 'white' : theme.text,
                border: `2px solid ${selectedCategory === category.id ? theme.primary : theme.border}`,
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {filteredSkills.map((skill, index) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              theme={theme}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 📊 SKILL BAR COMPONENT
function SkillBar({ skill, theme, delay }) {
  const [currentLevel, setCurrentLevel] = useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLevel(skill.level);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [skill.level, delay]);

  return (
    <div style={{
      backgroundColor: theme.background,
      padding: '1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.border}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <span style={{
          fontWeight: 'bold',
          color: theme.text
        }}>
          {skill.name}
        </span>
        <span style={{
          color: theme.primary,
          fontWeight: 'bold'
        }}>
          {currentLevel}%
        </span>
      </div>

      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: theme.border,
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${currentLevel}%`,
          height: '100%',
          backgroundColor: theme.primary,
          borderRadius: '4px',
          transition: 'width 1s ease-in-out'
        }} />
      </div>
    </div>
  );
}

// 🚀 PROJECTS SECTION
function Projects({ theme }) {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'web',
      image: 'https://via.placeholder.com/400x250',
      description: 'Full-stack e-commerce with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      category: 'web',
      image: 'https://via.placeholder.com/400x250',
      description: 'Collaborative task management with real-time updates',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      category: 'web',
      image: 'https://via.placeholder.com/400x250',
      description: 'Beautiful weather app with location-based forecasts',
      technologies: ['React', 'OpenWeather API', 'Chart.js'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 4,
      title: 'Mobile Banking App',
      category: 'mobile',
      image: 'https://via.placeholder.com/400x250',
      description: 'Secure mobile banking application',
      technologies: ['React Native', 'Firebase', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: '🎯' },
    { id: 'web', label: 'Web Apps', icon: '💻' },
    { id: 'mobile', label: 'Mobile Apps', icon: '📱' },
    { id: 'design', label: 'Design', icon: '🎨' }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" style={{
      padding: '5rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        color: theme.text,
        marginBottom: '3rem'
      }}>
        My Projects
      </h2>

      {/* Filter Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            style={{
              backgroundColor: filter === category.id ? theme.primary : 'transparent',
              color: filter === category.id ? 'white' : theme.text,
              border: `2px solid ${filter === category.id ? theme.primary : theme.border}`,
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            theme={theme}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          theme={theme}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

// 🃏 PROJECT CARD COMPONENT
function ProjectCard({ project, theme, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: theme.cardBg,
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `1px solid ${theme.border}`
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-5px)';
        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      }}
    >
      {project.featured && (
        <div style={{
          backgroundColor: theme.accent,
          color: 'white',
          padding: '0.25rem 0.75rem',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          display: 'inline-block',
          borderRadius: '0 0 0.5rem 0'
        }}>
          ⭐ FEATURED
        </div>
      )}

      <img
        src={project.image}
        alt={project.title}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover'
        }}
      />

      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: theme.text,
          marginBottom: '0.5rem'
        }}>
          {project.title}
        </h3>

        <p style={{
          color: theme.text + '80',
          marginBottom: '1rem',
          lineHeight: '1.5'
        }}>
          {project.description}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          {project.technologies.map(tech => (
            <span
              key={tech}
              style={{
                backgroundColor: theme.primary + '20',
                color: theme.primary,
                padding: '0.25rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem'
        }}>
          <button style={{
            backgroundColor: 'transparent',
            color: theme.primary,
            border: `1px solid ${theme.primary}`,
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(project.github, '_blank');
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = theme.primary;
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = theme.primary;
          }}>
            GitHub
          </button>

          <button style={{
            backgroundColor: theme.primary,
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
          onClick={(e) => {
            e.stopPropagation();
            window.open(project.demo, '_blank');
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.8';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
          }}>
            Live Demo
          </button>
        </div>
      </div>
    </div>
  );
}

// 📋 PROJECT MODAL COMPONENT
function ProjectModal({ project, theme, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '2rem'
    }}
    onClick={onClose}>
      <div style={{
        backgroundColor: theme.background,
        borderRadius: '0.5rem',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto',
        position: 'relative'
      }}
      onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: theme.text
          }}>
            ×
        </button>

        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '250px',
            objectFit: 'cover',
            borderRadius: '0.5rem 0.5rem 0 0'
          }}
        />

        <div style={{ padding: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            color: theme.text,
            marginBottom: '1rem'
          }}>
            {project.title}
          </h2>

          <p style={{
            color: theme.text + '80',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            {project.description}
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}>
            {project.technologies.map(tech => (
              <span
                key={tech}
                style={{
                  backgroundColor: theme.primary + '20',
                  color: theme.primary,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 'bold'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => window.open(project.github, '_blank')}
              style={{
                backgroundColor: 'transparent',
                color: theme.primary,
                border: `1px solid ${theme.primary}`,
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                View Code
            </button>
            <button
              onClick={() => window.open(project.demo, '_blank')}
              style={{
                backgroundColor: theme.primary,
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Live Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 💼 EXPERIENCE SECTION
function Experience({ theme }) {
  const experiences = [
    {
      id: 1,
      company: 'Tech Corp',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      description: 'Led development of multiple web applications serving 100K+ users. Mentored junior developers and implemented best practices.',
      technologies: ['React', 'Node.js', 'AWS', 'PostgreSQL'],
      achievements: [
        'Improved app performance by 40%',
        'Led team of 5 developers',
        'Implemented CI/CD pipeline'
      ]
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Built and maintained multiple client projects. Worked closely with design team to implement pixel-perfect UIs.',
      technologies: ['React', 'Python', 'Django', 'MongoDB'],
      achievements: [
        'Delivered 15+ projects on time',
        'Reduced bug reports by 60%',
        'Introduced automated testing'
      ]
    },
    {
      id: 3,
      company: 'Freelance',
      position: 'Web Developer',
      period: '2019 - 2020',
      description: 'Developed custom websites and web applications for small businesses and startups.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      achievements: [
        'Built 50+ websites',
        '100% client satisfaction',
        'Learned modern web technologies'
      ]
    }
  ];

  return (
    <section id="experience" style={{
      padding: '5rem 2rem',
      backgroundColor: theme.cardBg,
      borderTop: `1px solid ${theme.border}`,
      borderBottom: `1px solid ${theme.border}`
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          color: theme.text,
          marginBottom: '3rem'
        }}>
          Work Experience
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              theme={theme}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 📄 EXPERIENCE CARD COMPONENT
function ExperienceCard({ experience, theme, isEven }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      backgroundColor: theme.background,
      borderRadius: '0.5rem',
      padding: '2rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.border}`,
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: isEven ? '-1rem' : 'auto',
        right: isEven ? 'auto' : '-1rem',
        width: '1rem',
        height: '1rem',
        backgroundColor: theme.primary,
        borderRadius: '50%',
        border: `3px solid ${theme.background}`
      }} />

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: '0.25rem'
          }}>
            {experience.position}
          </h3>
          <p style={{
            color: theme.primary,
            fontWeight: 'bold',
            marginBottom: '0.5rem'
          }}>
            {experience.company}
          </p>
          <p style={{
            color: theme.text + '60',
            fontSize: '0.875rem'
          }}>
            {experience.period}
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: 'none',
            border: `1px solid ${theme.border}`,
            borderRadius: '0.25rem',
            padding: '0.25rem 0.5rem',
            cursor: 'pointer',
            color: theme.text,
            fontSize: '0.875rem'
          }}
        >
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>
      </div>

      <p style={{
        color: theme.text + '80',
        lineHeight: '1.6',
        marginBottom: '1rem'
      }}>
        {experience.description}
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        {experience.technologies.map(tech => (
          <span
            key={tech}
            style={{
              backgroundColor: theme.secondary + '20',
              color: theme.secondary,
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: 'bold'
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {isExpanded && (
        <div style={{
          borderTop: `1px solid ${theme.border}`,
          paddingTop: '1rem'
        }}>
          <h4 style={{
            color: theme.text,
            marginBottom: '0.5rem'
          }}>
            Key Achievements:
          </h4>
          <ul style={{
            color: theme.text + '80',
            paddingLeft: '1.5rem'
          }}>
            {experience.achievements.map((achievement, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// 📧 CONTACT FORM COMPONENT
function ContactForm({ theme }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
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
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        backgroundColor: theme.secondary + '20',
        borderRadius: '0.5rem',
        border: `1px solid ${theme.secondary}`
      }}>
        <div style={{
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          ✅
        </div>
        <h3 style={{
          color: theme.text,
          marginBottom: '1rem'
        }}>
          Thank you for your message!
        </h3>
        <p style={{
          color: theme.text + '80',
          marginBottom: '2rem'
        }}>
          I'll get back to you as soon as possible.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          style={{
            backgroundColor: theme.primary,
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    }}>
      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{
          display: 'block',
          color: theme.text,
          marginBottom: '0.5rem',
          fontWeight: 'bold'
        }}>
          Name *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${errors.name ? '#ef4444' : theme.border}`,
            borderRadius: '0.25rem',
            backgroundColor: theme.background,
            color: theme.text,
            fontSize: '1rem'
          }}
          placeholder="Your full name"
        />
        {errors.name && (
          <p style={{
            color: '#ef4444',
            fontSize: '0.875rem',
            marginTop: '0.25rem'
          }}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label style={{
          display: 'block',
          color: theme.text,
          marginBottom: '0.5rem',
          fontWeight: 'bold'
        }}>
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${errors.email ? '#ef4444' : theme.border}`,
            borderRadius: '0.25rem',
            backgroundColor: theme.background,
            color: theme.text,
            fontSize: '1rem'
          }}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p style={{
            color: '#ef4444',
            fontSize: '0.875rem',
            marginTop: '0.25rem'
          }}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label style={{
          display: 'block',
          color: theme.text,
          marginBottom: '0.5rem',
          fontWeight: 'bold'
        }}>
          Subject
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${theme.border}`,
            borderRadius: '0.25rem',
            backgroundColor: theme.background,
            color: theme.text,
            fontSize: '1rem'
          }}
          placeholder="What's this about?"
        />
      </div>

      <div style={{ gridColumn: '1 / -1' }}>
        <label style={{
          display: 'block',
          color: theme.text,
          marginBottom: '0.5rem',
          fontWeight: 'bold'
        }}>
          Message *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: `1px solid ${errors.message ? '#ef4444' : theme.border}`,
            borderRadius: '0.25rem',
            backgroundColor: theme.background,
            color: theme.text,
            fontSize: '1rem',
            resize: 'vertical'
          }}
          placeholder="Tell me about your project..."
        />
        {errors.message && (
          <p style={{
            color: '#ef4444',
            fontSize: '0.875rem',
            marginTop: '0.25rem'
          }}>
            {errors.message}
          </p>
        )}
      </div>

      <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? theme.border : theme.primary,
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '0.25rem',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}

// 📧 CONTACT SECTION
function Contact({ theme }) {
  return (
    <section id="contact" style={{
      padding: '5rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        color: theme.text,
        marginBottom: '3rem'
      }}>
        Get In Touch
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            color: theme.text,
            marginBottom: '1rem'
          }}>
            Let's work together!
          </h3>

          <p style={{
            color: theme.text + '80',
            lineHeight: '1.6',
            marginBottom: '2rem'
          }}>
            I'm always interested in new opportunities and exciting projects.
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: theme.primary + '20',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.primary,
                fontSize: '1.2rem'
              }}>
                📧
              </div>
              <div>
                <div style={{
                  fontWeight: 'bold',
                  color: theme.text
                }}>
                  Email
                </div>
                <div style={{ color: theme.text + '80' }}>
                  your.email@example.com
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: theme.secondary + '20',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.secondary,
                fontSize: '1.2rem'
              }}>
                📱
              </div>
              <div>
                <div style={{
                  fontWeight: 'bold',
                  color: theme.text
                }}>
                  Phone
                </div>
                <div style={{ color: theme.text + '80' }}>
                  +1 (234) 567-8900
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: theme.accent + '20',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.accent,
                fontSize: '1.2rem'
              }}>
                📍
              </div>
              <div>
                <div style={{
                  fontWeight: 'bold',
                  color: theme.text
                }}>
                  Location
                </div>
                <div style={{ color: theme.text + '80' }}>
                  San Francisco, CA
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ContactForm theme={theme} />
        </div>
      </div>
    </section>
  );
}

// 🦶 FOOTER COMPONENT
function Footer({ theme }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: theme.cardBg,
      borderTop: `1px solid ${theme.border}`,
      padding: '2rem 2rem 1rem',
      marginTop: '5rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          marginBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          <a
            href="#home"
            style={{
              color: theme.text,
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Home
          </a>
          <a
            href="#about"
            style={{
              color: theme.text,
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            About
          </a>
          <a
            href="#skills"
            style={{
              color: theme.text,
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Skills
          </a>
          <a
            href="#projects"
            style={{
              color: theme.text,
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Projects
          </a>
          <a
            href="#contact"
            style={{
              color: theme.text,
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Contact
          </a>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '1rem'
        }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.text,
              fontSize: '1.5rem',
              textDecoration: 'none'
            }}
          >
            💻
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.text,
              fontSize: '1.5rem',
              textDecoration: 'none'
            }}
          >
            💼
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: theme.text,
              fontSize: '1.5rem',
              textDecoration: 'none'
            }}
          >
            🐦
          </a>
        </div>

        <p style={{
          color: theme.text + '60',
          fontSize: '0.875rem'
        }}>
          © {currentYear} Your Name. Built with React & ❤️
        </p>
      </div>
    </footer>
  );
}

// 🎯 MAIN APP COMPONENT
function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [currentSection, setCurrentSection] = useState('home');

  const theme = currentTheme === 'light' ? themes.light : themes.dark;

  const toggleTheme = () => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrentSection(sectionId);
  };

  return (
    <div style={{
      backgroundColor: theme.background,
      color: theme.text,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        currentSection={currentSection}
        setCurrentSection={scrollToSection}
      />

      <Hero theme={theme} />

      <About theme={theme} />

      <Skills theme={theme} />

      <Projects theme={theme} />

      <Experience theme={theme} />

      <Contact theme={theme} />

      <Footer theme={theme} />
    </div>
  );
}

export default App;
