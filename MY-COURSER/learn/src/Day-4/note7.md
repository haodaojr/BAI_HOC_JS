# ⚡ MINI PROJECT: CALCULATOR UI VỚI EVENT HANDLING

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Calculator Features:**
- ✅ Basic arithmetic operations (+, -, ×, ÷)
- ✅ Clear and backspace functionality
- ✅ Error handling (divide by zero)
- ✅ Keyboard support
- ✅ History of calculations
- ✅ Responsive design

**Technical Focus:**
- Complex event handling patterns
- State management for calculator logic
- Input validation and error states
- Keyboard event integration

---

## 🔥 CALCULATOR IMPLEMENTATION

### **1. Calculator Logic & State:**

```jsx
function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  // Calculator operations
  const operations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => b !== 0 ? a / b : 'Error',
    '=': (a, b) => b
  };

  // Input digit
  function inputDigit(digit) {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  }

  // Input decimal point
  function inputDecimal() {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }

  // Clear all
  function clearAll() {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }

  // Clear entry
  function clearEntry() {
    setDisplay('0');
  }

  // Backspace
  function backspace() {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }

  // Perform operation
  function performOperation(nextOperation) {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const result = operations[operation](currentValue, inputValue);

      // Add to history
      const calculation = `${currentValue} ${operation} ${inputValue} = ${result}`;
      setHistory(prev => [calculation, ...prev.slice(0, 9)]); // Keep last 10

      setDisplay(String(result));
      setPreviousValue(result);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation === '=' ? null : nextOperation);
  }

  // Keyboard support
  useEffect(() => {
    function handleKeyPress(event) {
      const { key } = event;

      if (key >= '0' && key <= '9') {
        inputDigit(parseInt(key));
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        performOperation(key);
      } else if (key === 'Enter' || key === '=') {
        performOperation('=');
      } else if (key === 'Escape') {
        clearAll();
      } else if (key === 'Backspace') {
        backspace();
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  // Button component
  function Button({ children, onClick, className = '', ...props }) {
    return (
      <button
        className={`calculator-button ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        {/* Display */}
        <div className="calculator-display">
          {display}
        </div>

        {/* Keypad */}
        <div className="calculator-keypad">
          {/* Row 1 */}
          <Button onClick={clearAll} className="function">AC</Button>
          <Button onClick={clearEntry} className="function">CE</Button>
          <Button onClick={backspace} className="function">⌫</Button>
          <Button onClick={() => performOperation('/')} className="operator">÷</Button>

          {/* Row 2 */}
          <Button onClick={() => inputDigit(7)}>7</Button>
          <Button onClick={() => inputDigit(8)}>8</Button>
          <Button onClick={() => inputDigit(9)}>9</Button>
          <Button onClick={() => performOperation('*')} className="operator">×</Button>

          {/* Row 3 */}
          <Button onClick={() => inputDigit(4)}>4</Button>
          <Button onClick={() => inputDigit(5)}>5</Button>
          <Button onClick={() => inputDigit(6)}>6</Button>
          <Button onClick={() => performOperation('-')} className="operator">-</Button>

          {/* Row 4 */}
          <Button onClick={() => inputDigit(1)}>1</Button>
          <Button onClick={() => inputDigit(2)}>2</Button>
          <Button onClick={() => inputDigit(3)}>3</Button>
          <Button onClick={() => performOperation('+')} className="operator">+</Button>

          {/* Row 5 */}
          <Button onClick={() => inputDigit(0)} className="zero">0</Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={() => performOperation('=')} className="equals">=</Button>
        </div>
      </div>

      {/* History Panel */}
      <div className="calculator-history">
        <h3>Calculation History</h3>
        <div className="history-list">
          {history.length === 0 ? (
            <p>No calculations yet</p>
          ) : (
            history.map((calc, index) => (
              <div key={index} className="history-item">
                {calc}
              </div>
            ))
          )}
        </div>
        {history.length > 0 && (
          <button
            onClick={() => setHistory([])}
            className="clear-history"
          >
            Clear History
          </button>
        )}
      </div>

      <style jsx>{`
        .calculator-container {
          display: flex;
          gap: 20px;
          max-width: 600px;
          margin: 20px auto;
          font-family: 'Arial', sans-serif;
        }

        .calculator {
          flex: 1;
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .calculator-display {
          background: #fff;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          font-size: 2rem;
          font-weight: bold;
          text-align: right;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          overflow-x: auto;
        }

        .calculator-keypad {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .calculator-button {
          padding: 15px;
          border: none;
          border-radius: 8px;
          font-size: 1.2rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          background: #fff;
          border: 2px solid #e9ecef;
        }

        .calculator-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .calculator-button:active {
          transform: translateY(0);
        }

        .function {
          background: #6c757d;
          color: white;
        }

        .operator {
          background: #ffc107;
          color: #212529;
        }

        .equals {
          background: #28a745;
          color: white;
          grid-column: span 2;
        }

        .zero {
          grid-column: span 2;
        }

        .calculator-history {
          flex: 1;
          background: white;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .history-list {
          max-height: 300px;
          overflow-y: auto;
          margin: 10px 0;
        }

        .history-item {
          padding: 8px;
          border-bottom: 1px solid #e9ecef;
          font-family: 'Courier New', monospace;
          font-size: 0.9rem;
        }

        .clear-history {
          background: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          width: 100%;
        }

        .clear-history:hover {
          background: #c82333;
        }
      `}</style>
    </div>
  );
}

export default Calculator;
```

---

## 🔥 ADVANCED CALCULATOR WITH MORE FEATURES

### **Scientific Calculator Extension:**

```jsx
function ScientificCalculator() {
  // Extend basic calculator with scientific functions
  const [mode, setMode] = useState('basic'); // 'basic' or 'scientific'

  const scientificOperations = {
    'sin': (x) => Math.sin(x * Math.PI / 180), // Degrees
    'cos': (x) => Math.cos(x * Math.PI / 180),
    'tan': (x) => Math.tan(x * Math.PI / 180),
    'log': (x) => Math.log10(x),
    'ln': (x) => Math.log(x),
    'sqrt': (x) => Math.sqrt(x),
    'x²': (x) => x * x,
    'x³': (x) => x * x * x,
    '1/x': (x) => 1 / x,
    'π': () => Math.PI,
    'e': () => Math.E
  };

  function performScientificOperation(operation) {
    const inputValue = parseFloat(display);

    if (scientificOperations[operation]) {
      const result = scientificOperations[operation](inputValue);
      setDisplay(String(result));
      setHistory(prev => [`${operation}(${inputValue}) = ${result}`, ...prev.slice(0, 9)]);
    }
  }

  return (
    <div className="scientific-calculator">
      {/* Mode toggle */}
      <div className="mode-toggle">
        <button
          onClick={() => setMode('basic')}
          className={mode === 'basic' ? 'active' : ''}
        >
          Basic
        </button>
        <button
          onClick={() => setMode('scientific')}
          className={mode === 'scientific' ? 'active' : ''}
        >
          Scientific
        </button>
      </div>

      {/* Display */}
      <div className="calculator-display">
        {display}
      </div>

      {/* Basic keypad */}
      <div className="calculator-keypad">
        {/* Basic operations */}
      </div>

      {/* Scientific keypad */}
      {mode === 'scientific' && (
        <div className="scientific-keypad">
          <button onClick={() => performScientificOperation('sin')}>sin</button>
          <button onClick={() => performScientificOperation('cos')}>cos</button>
          <button onClick={() => performScientificOperation('tan')}>tan</button>
          <button onClick={() => performScientificOperation('log')}>log</button>
          <button onClick={() => performScientificOperation('ln')}>ln</button>
          <button onClick={() => performScientificOperation('sqrt')}>√</button>
          <button onClick={() => performScientificOperation('x²')}>x²</button>
          <button onClick={() => performScientificOperation('x³')}>x³</button>
          <button onClick={() => performScientificOperation('1/x')}>1/x</button>
          <button onClick={() => performScientificOperation('π')}>π</button>
          <button onClick={() => performScientificOperation('e')}>e</button>
        </div>
      )}
    </div>
  );
}
```

---

## 📊 CALCULATOR FEATURES BREAKDOWN

| Feature | Implementation | Events Used | State Management |
|---------|----------------|-------------|------------------|
| **Number Input** | `inputDigit()` | onClick | display state |
| **Operations** | `performOperation()` | onClick | operation, previousValue |
| **Clear Functions** | `clearAll()`, `clearEntry()` | onClick | Reset states |
| **Backspace** | `backspace()` | onClick | String manipulation |
| **Keyboard Support** | `useEffect` + `addEventListener` | onKeyDown | Global event handling |
| **History** | Array state | State updates | history array |
| **Error Handling** | Conditional checks | - | Display validation |

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Basic arithmetic operations (+, -, ×, ÷)
- [ ] Clear (AC) and Clear Entry (CE) functions
- [ ] Backspace functionality
- [ ] Decimal point input
- [ ] Error handling (divide by zero)
- [ ] Keyboard support for all operations
- [ ] Calculation history
- [ ] Responsive button styling
- [ ] State management for complex calculator logic
- [ ] Event handling for all user interactions

---

## 🎯 ADVANCED FEATURES TO ADD

**Phase 2 Enhancements:**
1. **Memory functions** (MC, MR, MS, M+)
2. **Percentage calculations**
3. **Bracket support** for complex expressions
4. **History with clickable recall**
5. **Sound effects** for button presses
6. **Themes** (light/dark mode)
7. **Resizable display**
8. **Export calculation history**

**Phase 3: Scientific Calculator:**
1. **Trigonometric functions** (sin, cos, tan)
2. **Logarithmic functions** (log, ln)
3. **Power functions** (x², x³, x^y)
4. **Constants** (π, e)
5. **Angle mode** (degrees/radians)
6. **Factorial** and other advanced functions

**Code này cung cấp foundation hoàn chỉnh cho:**
- Interactive calculator UI
- Complex event handling patterns
- State management best practices
- Keyboard integration
- Error handling strategies