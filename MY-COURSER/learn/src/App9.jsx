import { useState } from 'react';
import './App.css';

// Practice: Counter variations (increment, decrement, reset, step)
function CounterVariations() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => Math.max(0, prev - step));
  const reset = () => setCount(0);
  const double = () => setCount(prev => prev * 2);

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', margin: '20px', borderRadius: '8px' }}>
      <h3>Counter Variations</h3>
      <div style={{ fontSize: '2rem', margin: '20px 0' }}>
        Count: {count}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>Step: </label>
        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Math.max(1, Number(e.target.value)))}
          min="1"
          style={{ width: '60px', marginLeft: '8px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={increment} style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
          +{step}
        </button>
        <button onClick={decrement} style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px' }}>
          -{step}
        </button>
        <button onClick={reset} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
          Reset
        </button>
        <button onClick={double} style={{ padding: '8px 16px', backgroundColor: '#ffc107', color: '#212529', border: 'none', borderRadius: '4px' }}>
          ×2
        </button>
      </div>
    </div>
  );
}

// Practice: Toggle components (show/hide, theme switcher)
function ToggleComponents() {
  const [isVisible, setIsVisible] = useState(true);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  return (
    <div style={{
      padding: '20px',
      border: '1px solid #ddd',
      margin: '20px',
      borderRadius: '8px',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000'
    }}>
      <h3>Toggle Components</h3>

      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={isVisible}
            onChange={() => setIsVisible(!isVisible)}
          />
          Show/Hide Content
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          Dark Theme
        </label>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>
      </div>

      {isVisible && (
        <div style={{
          padding: '16px',
          backgroundColor: theme === 'dark' ? '#555' : '#f8f9fa',
          borderRadius: '4px',
          marginTop: '16px'
        }}>
          <h4>Content Panel</h4>
          <p>Theme: {theme}</p>
          <p>Notifications: {notifications ? 'Enabled' : 'Disabled'}</p>
          <p>This content can be toggled on/off.</p>
        </div>
      )}
    </div>
  );
}

// Mini Project: Simple Calculator với useState
function SimpleCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
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
    setOperation(nextOperation === '=' ? null : nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : 'Error';
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const buttonStyle = (bgColor = '#fff') => ({
    padding: '15px 10px',
    backgroundColor: bgColor,
    color: bgColor === '#fff' ? '#333' : 'white',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    minWidth: '50px'
  });

  return (
    <div style={{
      width: '320px',
      margin: '20px auto',
      border: '2px solid #333',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#f8f9fa'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#333'}}>Simple Calculator</h3>

      <div style={{
        backgroundColor: '#977c7cff',
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        <button onClick={clear} style={buttonStyle('#dc3545')}>C</button>
        <button onClick={() => performOperation('/')} style={buttonStyle('#6c757d')}>/</button>
        <button onClick={() => performOperation('*')} style={buttonStyle('#6c757d')}>*</button>
        <button onClick={() => performOperation('-')} style={buttonStyle('#6c757d')}>-</button>

        <button onClick={() => inputDigit(7)} style={buttonStyle()}>7</button>
        <button onClick={() => inputDigit(8)} style={buttonStyle()}>8</button>
        <button onClick={() => inputDigit(9)} style={buttonStyle()}>9</button>
        <button onClick={() => performOperation('+')} style={{...buttonStyle('#6c757d'), gridColumn: 'span 1'}}>+</button>

        <button onClick={() => inputDigit(4)} style={buttonStyle()}>4</button>
        <button onClick={() => inputDigit(5)} style={buttonStyle()}>5</button>
        <button onClick={() => inputDigit(6)} style={buttonStyle()}>6</button>

        <button onClick={() => inputDigit(1)} style={buttonStyle()}>1</button>
        <button onClick={() => inputDigit(2)} style={buttonStyle()}>2</button>
        <button onClick={() => inputDigit(3)} style={buttonStyle()}>3</button>
        <button onClick={() => performOperation('=')} style={{...buttonStyle('#28a745'), gridColumn: 'span 1'}}>=</button>

        <button onClick={() => inputDigit(0)} style={{...buttonStyle('#000000ff'), gridColumn: 'span 2'}}>0</button>
        <button onClick={inputDecimal} style={buttonStyle('#000000ff')}>.</button>
      </div>
    </div>
  );
}

// Main App9 Component
function App9() {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
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
          Day 6: useState Fundamentals & Patterns
        </h1>
        <p style={{
          color: '#666',
          fontSize: '1.1rem'
        }}>
          Practice exercises and mini project with useState
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <CounterVariations />
        <ToggleComponents />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <SimpleCalculator />
      </div>

      <footer style={{
        marginTop: '40px',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>Built with React useState - Day 6 Practice</p>
      </footer>
    </div>
  );
}

export default App9;