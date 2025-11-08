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
          {theme.background === '#ffffff' ? '🌙' : '☀️'}
        </button>
      </nav>
    </header>
  );
}

export default Header;