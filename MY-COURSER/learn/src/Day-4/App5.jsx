import { useState, useEffect } from 'react';
import '../App.css';

function App5() {
  // Áp dụng từ note1: React Event System (SyntheticEvent)
  // - Sử dụng SyntheticEvent properties
  // - preventDefault() và stopPropagation()
  // - Event pooling và persist()

  // Áp dụng từ note2: Event Handling Patterns
  // - Inline handlers, named handlers, parameters
  // - Callback props pattern
  // - useCallback for performance

  // Áp dụng từ note3: onClick, onChange, onSubmit Events
  // - onClick với state updates
  // - onChange với controlled inputs
  // - onSubmit với form validation

  // Áp dụng từ note4: Event Delegation
  // - Event delegation cho lists
  // - Data attributes
  // - Performance optimization

  // Áp dụng từ note5: 5 Interactive Components
  // - Counter with steps
  // - Color picker
  // - Accordion
  // - Star rating
  // - Tabs

  // Áp dụng từ note6: Quiz App
  // - Multiple choice questions
  // - Score tracking
  // - Results summary

  // Áp dụng từ note7: Calculator UI
  // - Complex event handling
  // - State management
  // - Keyboard support

  // Áp dụng từ note8: Integration Patterns
  // - Component communication
  // - Global event handling
  // - Custom hooks

  // Áp dụng từ note9: Challenge Project
  // - Complete interactive app
  // - Complex state management
  // - Multiple features integration

  return (
    <div className="App" style={{ backgroundColor: '#ffffff', color: '#333333' }}>
      <header className="App-header" style={{ backgroundColor: '#f8f9fa', color: '#333333', borderBottom: '1px solid #dee2e6' }}>
        <h1 style={{ color: '#333333' }}>Day 4: Event System & Handling</h1>
        <p style={{ color: '#666666' }}>Interactive Components Showcase</p>
      </header>

      <main className="App-main" style={{ backgroundColor: '#ffffff' }}>
        {/* Counter Component - from note5 */}
        <CounterWithSteps />

        {/* Color Picker - from note5 */}
        <ColorPicker />

        {/* Accordion - from note5 */}
        <Accordion />

        {/* Star Rating - from note5 */}
        <StarRating />

        {/* Tabs - from note5 */}
        <Tabs />

        {/* Quiz App - from note6 */}
        <QuizApp />

        {/* Calculator - from note7 */}
        <Calculator />
      </main>
    </div>
  );
}

// Counter Component (from note5)
function CounterWithSteps() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function handleIncrement() {
    setCount(count + step);
  }

  function handleDecrement() {
    setCount(Math.max(0, count - step));
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div style={{
      border: '2px solid #007bff',
      borderRadius: 12,
      padding: 24,
      margin: '20px 0',
      backgroundColor: '#ffffff',
      color: '#333333'
    }}>
      <h3 style={{ color: '#007bff' }}>Counter with Steps</h3>
      <div style={{ marginBottom: 16 }}>
        <label>Step: {step} </label>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </div>
      <div style={{ fontSize: 48, textAlign: 'center', margin: '20px 0' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={handleDecrement} style={{ padding: '12px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 6 }}>
          -{step}
        </button>
        <button onClick={handleReset} style={{ padding: '12px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 6 }}>
          Reset
        </button>
        <button onClick={handleIncrement} style={{ padding: '12px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 6 }}>
          +{step}
        </button>
      </div>
    </div>
  );
}

// Color Picker Component (from note5)
function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#007bff');

  const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: 12,
      padding: 24,
      margin: '20px 0',
      backgroundColor: '#ffffff',
      color: '#333333'
    }}>
      <h3 style={{ color: '#28a745' }}>Color Picker</h3>
      <div style={{
        width: 100,
        height: 100,
        backgroundColor: selectedColor,
        borderRadius: 8,
        margin: '20px auto'
      }} />
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              width: 50,
              height: 50,
              backgroundColor: color,
              border: selectedColor === color ? '3px solid #000' : '2px solid #ddd',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Accordion Component (from note5)
function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const panels = [
    { title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.' },
    { title: 'Why use React?', content: 'React provides component-based architecture and efficient rendering.' },
    { title: 'How does React work?', content: 'React uses virtual DOM and reconciliation algorithm.' }
  ];

  function togglePanel(index) {
    setActiveIndex(activeIndex === index ? null : index);
  }

  return (
    <div style={{
      border: '2px solid #ffc107',
      borderRadius: 12,
      margin: '20px 0',
      backgroundColor: '#ffffff',
      color: '#333333'
    }}>
      <h3 style={{ padding: 20, margin: 0, backgroundColor: '#ffc107', color: '#212529' }}>
        Accordion FAQ
      </h3>
      {panels.map((panel, index) => (
        <div key={index}>
          <button
            onClick={() => togglePanel(index)}
            style={{
              width: '100%',
              padding: '16px 20px',
              backgroundColor: activeIndex === index ? '#fff3cd' : 'white',
              border: 'none',
              borderBottom: index < panels.length - 1 ? '1px solid #dee2e6' : 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>{panel.title}</span>
            <span>{activeIndex === index ? '−' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div style={{
              padding: '0 20px 20px 20px',
              backgroundColor: 'white',
              color: '#6c757d'
            }}>
              {panel.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Star Rating Component (from note5)
function StarRating() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  function handleStarClick(starValue) {
    setRating(starValue);
  }

  function renderStar(starValue) {
    const isActive = starValue <= (hoverRating || rating);
    return (
      <span
        key={starValue}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => setHoverRating(starValue)}
        onMouseLeave={() => setHoverRating(0)}
        style={{
          fontSize: 32,
          cursor: 'pointer',
          color: isActive ? '#ffc107' : '#e9ecef'
        }}
      >
        ★
      </span>
    );
  }

  return (
    <div style={{
      border: '2px solid #e83e8c',
      borderRadius: 12,
      padding: 24,
      margin: '20px 0',
      backgroundColor: '#ffffff',
      color: '#333333',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#e83e8c' }}>Star Rating</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '20px 0' }}>
        {[1, 2, 3, 4, 5].map(starValue => renderStar(starValue))}
      </div>
      <div style={{ fontSize: 24, marginBottom: 16 }}>
        {rating > 0 ? `${rating}/5 stars` : 'Rate this!'}
      </div>
      {rating > 0 && (
        <button
          onClick={() => setRating(0)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          Reset Rating
        </button>
      )}
    </div>
  );
}

// Tabs Component (from note5)
function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'Home', content: 'Welcome to the home tab!' },
    { title: 'Profile', content: 'This is your profile information.' },
    { title: 'Settings', content: 'Configure your preferences here.' }
  ];

  return (
    <div style={{
      border: '2px solid #6f42c1',
      borderRadius: 12,
      margin: '20px 0',
      backgroundColor: '#ffffff',
      color: '#333333'
    }}>
      <div style={{
        display: 'flex',
        backgroundColor: '#6f42c1',
        borderBottom: '1px solid #5a32a3'
      }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              flex: 1,
              padding: '16px 20px',
              backgroundColor: activeTab === index ? 'white' : 'transparent',
              color: activeTab === index ? '#6f42c1' : 'white',
              border: 'none',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: activeTab === index ? 'bold' : 'normal'
            }}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div style={{
        padding: 24,
        backgroundColor: 'white',
        minHeight: 100
      }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

// Quiz App Component (from note6)
function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const quizData = [
    {
      question: "React là gì?",
      options: ["Framework", "Library", "Language", "Database"],
      correctAnswer: 1
    },
    {
      question: "JSX là gì?",
      options: ["CSS", "JavaScript XML", "JSON", "Database"],
      correctAnswer: 1
    }
  ];

  function handleAnswerSelect(questionId, answerIndex) {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  }

  function handleNext() {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  }

  const currentQuestionData = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  if (showResults) {
    const correctAnswers = quizData.filter(q =>
      selectedAnswers[q.question] === q.correctAnswer
    ).length;
    const score = Math.round((correctAnswers / quizData.length) * 100);

    return (
      <div style={{
        border: '2px solid #17a2b8',
        borderRadius: 12,
        padding: 24,
        margin: '20px 0',
        backgroundColor: '#ffffff',
        color: '#333333',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#17a2b8' }}>Quiz Results</h3>
        <div style={{ fontSize: 48, margin: '20px 0', color: score >= 70 ? '#28a745' : '#dc3545' }}>
          {score}%
        </div>
        <p>{correctAnswers}/{quizData.length} correct answers</p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setSelectedAnswers({});
            setShowResults(false);
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={{
      border: '2px solid #17a2b8',
      borderRadius: 12,
      padding: 24,
      margin: '20px 0',
      backgroundColor: '#ffffff',
      color: '#333333'
    }}>
      <h3 style={{ color: '#17a2b8' }}>React Quiz</h3>
      <div style={{
        width: '100%',
        height: 8,
        backgroundColor: '#e9ecef',
        borderRadius: 4,
        marginBottom: 20
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#17a2b8',
          borderRadius: 4
        }} />
      </div>

      <h4>{currentQuestionData.question}</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '20px 0' }}>
        {currentQuestionData.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(currentQuestionData.question, index)}
            style={{
              padding: 16,
              textAlign: 'left',
              border: `2px solid ${selectedAnswers[currentQuestionData.question] === index ? '#17a2b8' : '#e9ecef'}`,
              borderRadius: 8,
              backgroundColor: selectedAnswers[currentQuestionData.question] === index ? '#e7f3ff' : 'white',
              cursor: 'pointer'
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        style={{
          padding: '12px 24px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer'
        }}
      >
        {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  );
}

// Calculator Component (from note7)
function Calculator() {
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

  function clearAll() {
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
      let result;

      switch (operation) {
        case '+':
          result = currentValue + inputValue;
          break;
        case '-':
          result = currentValue - inputValue;
          break;
        case '*':
          result = currentValue * inputValue;
          break;
        case '/':
          result = inputValue !== 0 ? currentValue / inputValue : 'Error';
          break;
        default:
          result = inputValue;
      }

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
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  return (
    <div style={{
      border: '2px solid #fd7e14',
      borderRadius: 12,
      padding: 24,
      margin: '20px 0',
      backgroundColor: '#ffffff',
      color: '#333333'
    }}>
      <h3 style={{ color: '#fd7e14' }}>Calculator</h3>
      <div style={{
        background: '#fff',
        border: '2px solid #e9ecef',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'right',
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}>
        {display}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10
      }}>
        <button onClick={clearAll} style={{ gridColumn: 'span 2', padding: 15, backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          AC
        </button>
        <button onClick={() => setDisplay(display.slice(0, -1) || '0')} style={{ padding: 15, backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          ⌫
        </button>
        <button onClick={() => performOperation('/')} style={{ padding: 15, backgroundColor: '#ffc107', color: '#212529', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          ÷
        </button>

        {[7, 8, 9].map(num => (
          <button key={num} onClick={() => inputDigit(num)} style={{ padding: 15, backgroundColor: '#fff', border: '2px solid #e9ecef', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem' }}>
            {num}
          </button>
        ))}
        <button onClick={() => performOperation('*')} style={{ padding: 15, backgroundColor: '#ffc107', color: '#212529', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          ×
        </button>

        {[4, 5, 6].map(num => (
          <button key={num} onClick={() => inputDigit(num)} style={{ padding: 15, backgroundColor: '#fff', border: '2px solid #e9ecef', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem' }}>
            {num}
          </button>
        ))}
        <button onClick={() => performOperation('-')} style={{ padding: 15, backgroundColor: '#ffc107', color: '#212529', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          −
        </button>

        {[1, 2, 3].map(num => (
          <button key={num} onClick={() => inputDigit(num)} style={{ padding: 15, backgroundColor: '#fff', border: '2px solid #e9ecef', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem' }}>
            {num}
          </button>
        ))}
        <button onClick={() => performOperation('+')} style={{ padding: 15, backgroundColor: '#ffc107', color: '#212529', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          +
        </button>

        <button onClick={() => inputDigit(0)} style={{ gridColumn: 'span 2', padding: 15, backgroundColor: '#fff', border: '2px solid #e9ecef', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem' }}>
          0
        </button>
        <button onClick={inputDecimal} style={{ padding: 15, backgroundColor: '#fff', border: '2px solid #e9ecef', borderRadius: 8, cursor: 'pointer', fontSize: '1.2rem' }}>
          .
        </button>
        <button onClick={() => performOperation('=')} style={{ padding: 15, backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          =
        </button>
      </div>

      <div style={{ marginTop: 20, fontSize: '0.9rem', color: '#6c757d', textAlign: 'center' }}>
        Use keyboard for faster input!
      </div>
    </div>
  );
}

export default App5;