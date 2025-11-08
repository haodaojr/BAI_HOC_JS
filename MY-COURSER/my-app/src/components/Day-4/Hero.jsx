import { useState, useEffect } from 'react';

// 🏠 HERO SECTION
function Hero({ theme }) {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Hi, I'm Your Name 👋";

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

export default Hero;