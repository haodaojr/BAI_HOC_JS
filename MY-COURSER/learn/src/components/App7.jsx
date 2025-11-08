import { useState } from 'react';
import './App.css';

function App7() {
  return (
    <div className="App" style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          color: '#333',
          fontSize: '2.5rem',
          marginBottom: '10px'
        }}>
          Interactive Business Card
        </h1>
        <p style={{
          color: '#666',
          fontSize: '1.1rem'
        }}>
          Hover and click to interact with the card
        </p>
      </header>

      <BusinessCard />

      <footer style={{
        marginTop: '40px',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>Built with React - Day 5 Project</p>
      </footer>
    </div>
  );
}

// Business Card Component
function BusinessCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const cardData = {
    front: {
      name: "Nguyễn Văn A",
      title: "Full Stack Developer",
      company: "Tech Solutions Inc.",
      avatar: "https://via.placeholder.com/120",
      tagline: "Building digital experiences"
    },
    back: {
      email: "nguyenvana@techsolutions.com",
      phone: "+84 123 456 789",
      website: "nguyenvana.dev",
      linkedin: "linkedin.com/in/nguyenvana",
      github: "github.com/nguyenvana",
      location: "Hà Nội, Việt Nam"
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    setClickCount(prev => prev + 1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div style={{
      perspective: '1000px',
      margin: '20px 0'
    }}>
      {/* Card Container */}
      <div
        style={{
          width: '380px',
          height: '220px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          cursor: 'pointer',
          boxShadow: isHovered
            ? '0 20px 40px rgba(0,0,0,0.15), 0 0 20px rgba(0,123,255,0.3)'
            : '0 10px 30px rgba(0,0,0,0.1)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
        onClick={handleCardClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {/* Front Side */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: 'white'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <img
              src={cardData.front.avatar}
              alt="Avatar"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.3)',
                objectFit: 'cover'
              }}
            />
            <div>
              <h2 style={{
                margin: '0 0 4px 0',
                fontSize: '1.3rem',
                fontWeight: '700'
              }}>
                {cardData.front.name}
              </h2>
              <p style={{
                margin: '0 0 2px 0',
                fontSize: '0.9rem',
                opacity: 0.9
              }}>
                {cardData.front.title}
              </p>
              <p style={{
                margin: 0,
                fontSize: '0.8rem',
                opacity: 0.8
              }}>
                {cardData.front.company}
              </p>
            </div>
          </div>

          {/* Tagline */}
          <div style={{
            textAlign: 'center',
            marginTop: '20px'
          }}>
            <p style={{
              margin: 0,
              fontSize: '1rem',
              fontStyle: 'italic',
              opacity: 0.9
            }}>
              "{cardData.front.tagline}"
            </p>
          </div>

          {/* Click hint */}
          <div style={{
            textAlign: 'center',
            marginTop: '10px'
          }}>
            <p style={{
              margin: 0,
              fontSize: '0.8rem',
              opacity: 0.7
            }}>
              Click to flip ↻
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: '16px',
          padding: '24px',
          transform: 'rotateY(180deg)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: 'white'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: '1.2rem',
              fontWeight: '700'
            }}>
              Contact Information
            </h2>
            <div style={{
              width: '40px',
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.5)',
              margin: '0 auto'
            }} />
          </div>

          {/* Contact Details */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📧</span>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Email</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  {cardData.back.email}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📱</span>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Phone</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  {cardData.back.phone}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🌐</span>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Website</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  {cardData.back.website}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>💼</span>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>LinkedIn</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  {cardData.back.linkedin}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>📍</span>
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Location</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  {cardData.back.location}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '16px'
          }}>
            <button style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.3s'
            }}>
              💼
            </button>
            <button style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.3s'
            }}>
              🐙
            </button>
          </div>
        </div>
      </div>

      {/* Interaction Stats */}
      <div style={{
        marginTop: '30px',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        minWidth: '300px'
      }}>
        <h3 style={{
          margin: '0 0 16px 0',
          color: '#333',
          fontSize: '1.2rem'
        }}>
          Card Interactions
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px'
        }}>
          <div style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#007bff'
            }}>
              {clickCount}
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: '#666',
              marginTop: '4px'
            }}>
              Clicks
            </div>
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: isFlipped ? '#28a745' : '#dc3545'
            }}>
              {isFlipped ? 'Back' : 'Front'}
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: '#666',
              marginTop: '4px'
            }}>
              Side
            </div>
          </div>

          <div style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: isHovered ? '#ffc107' : '#6c757d'
            }}>
              {isHovered ? 'Yes' : 'No'}
            </div>
            <div style={{
              fontSize: '0.8rem',
              color: '#666',
              marginTop: '4px'
            }}>
              Hovered
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => {
            setIsFlipped(false);
            setClickCount(0);
          }}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'background-color 0.3s'
          }}
        >
          Reset Card
        </button>
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: '30px',
        maxWidth: '500px',
        textAlign: 'center',
        color: '#666',
        lineHeight: '1.6'
      }}>
        <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>
          How to Interact:
        </h4>
        <ul style={{
          textAlign: 'left',
          display: 'inline-block',
          padding: 0,
          margin: 0,
          listStyle: 'none'
        }}>
          <li style={{ marginBottom: '8px' }}>
            🖱️ <strong>Hover:</strong> See glow effect and shadow
          </li>
          <li style={{ marginBottom: '8px' }}>
            👆 <strong>Click:</strong> Flip between front and back
          </li>
          <li style={{ marginBottom: '8px' }}>
            📊 <strong>Stats:</strong> Track interactions below
          </li>
          <li>
            🔄 <strong>Reset:</strong> Clear all interaction data
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App7;