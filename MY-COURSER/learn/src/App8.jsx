import { useState } from 'react';
import './App.css';

function App8() {
  return (
    <div className="App" style={{
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{
          color: '#333',
          fontSize: '2.5rem',
          marginBottom: '10px'
        }}>
          useState Fundamentals Demo
        </h1>
        <p style={{
          color: '#666',
          fontSize: '1.1rem'
        }}>
          Interactive examples of React useState Hook
        </p>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '30px'
      }}>
        <BasicCounter />
        <StepCounter />
        <HistoryCounter />
        <TogglePanel />
        <ThemeSwitcher />
        <TabSwitcher />
        <SimpleCalculator />
      </div>
    </div>
  );
}

// Basic Counter Component
function BasicCounter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0, color: '#007bff' }}>Basic Counter</h3>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px'
        }}>
          {count}
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => setCount(count - 1)}
            style={buttonStyle('#dc3545')}
          >
            -
          </button>
          <button
            onClick={() => setCount(0)}
            style={buttonStyle('#6c757d')}
          >
            Reset
          </button>
          <button
            onClick={() => setCount(count + 1)}
            style={buttonStyle('#28a745')}
          >
            +
          </button>
        </div>
      </div>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        <strong>useState:</strong> const [count, setCount] = useState(0);
      </div>
    </div>
  );
}

// Step Counter Component
function StepCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0, color: '#007bff' }}>Step Counter</h3>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px'
        }}>
          {count}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Step:</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            min="1"
            style={{
              width: '60px',
              padding: '5px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => setCount(c => c - step)}
            style={buttonStyle('#dc3545')}
          >
            -{step}
          </button>
          <button
            onClick={() => setCount(0)}
            style={buttonStyle('#6c757d')}
          >
            Reset
          </button>
          <button
            onClick={() => setCount(c => c + step)}
            style={buttonStyle('#28a745')}
          >
            +{step}
          </button>
        </div>
      </div>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        <strong>Multiple states:</strong> count và step riêng biệt
      </div>
    </div>
  );
}

// History Counter Component
function HistoryCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  function updateCount(newCount) {
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  }

  function undo() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      setCount(newHistory[newHistory.length - 1]);
    }
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0, color: '#007bff' }}>History Counter</h3>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px'
        }}>
          {count}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '15px' }}>
          <button
            onClick={() => updateCount(count - 1)}
            style={buttonStyle('#dc3545')}
          >
            -
          </button>
          <button
            onClick={undo}
            disabled={history.length <= 1}
            style={buttonStyle('#ffc107', history.length <= 1)}
          >
            Undo
          </button>
          <button
            onClick={() => updateCount(count + 1)}
            style={buttonStyle('#28a745')}
          >
            +
          </button>
        </div>

        <div style={{
          fontSize: '0.9rem',
          color: '#666',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <strong>History:</strong> {history.join(' → ')}
        </div>
      </div>
      <div style={{ fontSize: '0.9rem', color: '#666' }}>
        <strong>Functional updates:</strong> setCount(prev => prev + 1)
      </div>
    </div>
  );
}

// Toggle Panel Component
function TogglePanel() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0, color: '#007bff' }}>Toggle Panel</h3>

      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          ...buttonStyle('#007bff'),
          width: '100%',
          marginBottom: '20px'
        }}
      >
        {isVisible ? 'Hide Panel' : 'Show Panel'}
      </button>

      {isVisible && (
        <div style={{
          padding: '20px',
          backgroundColor: '#e9ecef',
          borderRadius: '6px',
          border: '2px dashed #007bff'
        }}>
          <h4 style={{ marginTop: 0, color: '#007bff' }}>Hidden Panel!</h4>
          <p style={{ marginBottom: 0 }}>
            This panel is controlled by boolean state.
            Click the button above to toggle visibility.
          </p>
        </div>
      )}

      <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '15px' }}>
        <strong>Boolean state:</strong> const [isVisible, setIsVisible] = useState(false);
      </div>
    </div>
  );
}

// Theme Switcher Component
function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{
      backgroundColor: isDark ? '#333' : 'white',
      color: isDark ? 'white' : '#333',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'all 0.3s'
    }}>
      <h3 style={{ marginTop: 0, color: isDark ? '#61dafb' : '#007bff' }}>
        Theme Switcher
      </h3>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{
          fontSize: '1.5rem',
          marginBottom: '15px',
          padding: '10px',
          borderRadius: '6px',
          backgroundColor: isDark ? '#444' : '#f8f9fa'
        }}>
          Current Theme: <strong>{isDark ? 'Dark 🌙' : 'Light ☀️'}</strong>
        </div>

        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            ...buttonStyle(isDark ? '#61dafb' : '#007bff'),
            padding: '12px 24px',
            fontSize: '16px'
          }}
        >
          Switch to {isDark ? 'Light' : 'Dark'} Theme
        </button>
      </div>

      <div style={{ fontSize: '0.9rem', color: isDark ? '#ccc' : '#666' }}>
        <strong>Theme state:</strong> const [isDark, setIsDark] = useState(false);
      </div>
    </div>
  );
}

// Tab Switcher Component
function TabSwitcher() {
  const [activeTab, setActiveTab] = useState('tab1');

  const tabs = {
    tab1: { title: 'Home', content: '🏠 Welcome to our website! This is the home page content.' },
    tab2: { title: 'About', content: '👥 We are a team of developers passionate about React and modern web technologies.' },
    tab3: { title: 'Contact', content: '📧 Get in touch with us at contact@example.com or call +1-234-567-890.' }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0, color: '#007bff' }}>Tab Switcher</h3>

      <div style={{
        display: 'flex',
        marginBottom: '20px',
        borderBottom: '1px solid #e9ecef'
      }}>
        {Object.keys(tabs).map(tabId => (
          <button
            key={tabId}
            onClick={() => setActiveTab(tabId)}
            style={{
              flex: 1,
              padding: '12px 16px',
              backgroundColor: activeTab === tabId ? '#007bff' : 'transparent',
              color: activeTab === tabId ? 'white' : '#666',
              border: 'none',
              borderBottom: activeTab === tabId ? '2px solid #0056b3' : 'none',
              cursor: 'pointer',
              fontWeight: activeTab === tabId ? 'bold' : 'normal',
              transition: 'all 0.3s'
            }}
          >
            {tabs[tabId].title}
          </button>
        ))}
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '6px',
        minHeight: '80px'
      }}>
        {tabs[activeTab].content}
      </div>

      <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '15px' }}>
        <strong>String state:</strong> const [activeTab, setActiveTab] = useState('tab1');
      </div>
    </div>
  );
}

// Simple Calculator Component
function SimpleCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  function inputDigit(digit) {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  }

  function inputDecimal() {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }

  function clear() {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }

  function performOperation(nextOperation) {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }

  function calculate(firstValue, secondValue, operation) {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  }

  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      gridColumn: 'span 2'
    }}>
      <h3 style={{ marginTop: 0, color: '#007bff' }}>Simple Calculator</h3>

      <div style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px',
        textAlign: 'right',
        fontSize: '24px',
        fontFamily: 'monospace',
        minHeight: '40px'
      }}>
        {display}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px'
      }}>
        {/* Row 1 */}
        <button onClick={clear} style={calcButtonStyle('#dc3545')}>C</button>
        <button onClick={() => performOperation('/')} style={calcButtonStyle('#6c757d')}>/</button>
        <button onClick={() => performOperation('*')} style={calcButtonStyle('#6c757d')}>*</button>
        <button onClick={() => performOperation('-')} style={calcButtonStyle('#6c757d')}>-</button>

        {/* Row 2 */}
        <button onClick={() => inputDigit(7)} style={calcButtonStyle()}>7</button>
        <button onClick={() => inputDigit(8)} style={calcButtonStyle()}>8</button>
        <button onClick={() => inputDigit(9)} style={calcButtonStyle()}>9</button>
        <button onClick={() => performOperation('+')} style={calcButtonStyle('#6c757d')} style={{ gridRow: 'span 2' }}>+</button>

        {/* Row 3 */}
        <button onClick={() => inputDigit(4)} style={calcButtonStyle()}>4</button>
        <button onClick={() => inputDigit(5)} style={calcButtonStyle()}>5</button>
        <button onClick={() => inputDigit(6)} style={calcButtonStyle()}>6</button>

        {/* Row 4 */}
        <button onClick={() => inputDigit(1)} style={calcButtonStyle()}>1</button>
        <button onClick={() => inputDigit(2)} style={calcButtonStyle()}>2</button>
        <button onClick={() => inputDigit(3)} style={calcButtonStyle()}>3</button>
        <button onClick={() => performOperation('=')} style={calcButtonStyle('#28a745')} style={{ gridRow: 'span 2' }}>=</button>

        {/* Row 5 */}
        <button onClick={() => inputDigit(0)} style={calcButtonStyle()} style={{ gridColumn: 'span 2' }}>0</button>
        <button onClick={inputDecimal} style={calcButtonStyle()}>.</button>
      </div>

      <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '15px' }}>
        <strong>Complex state:</strong> display, previousValue, operation, waitingForOperand
      </div>
    </div>
  );
}

// Helper functions
function buttonStyle(bgColor = '#007bff', disabled = false) {
  return {
    padding: '8px 16px',
    backgroundColor: disabled ? '#ccc' : bgColor,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  };
}

function calcButtonStyle(bgColor = '#f8f9fa') {
  return {
    padding: '15px 10px',
    backgroundColor: bgColor,
    color: bgColor === '#f8f9fa' ? '#333' : 'white',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    minHeight: '50px'
  };
}

export default App8;