# ⚡ MINI PROJECT: INTERACTIVE QUIZ APP (CHƯA CÓ STATE PERSISTENCE)

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Quiz App Features:**
- ✅ Multiple choice questions
- ✅ Score tracking
- ✅ Progress indicator
- ✅ Result summary
- ✅ Restart functionality
- ✅ Timer (optional)

**Technical Requirements:**
- State management (questions, current question, score, etc.)
- Event handling (answer selection, navigation)
- Conditional rendering (show results, show questions)
- Array methods (map, filter, find)

---

## 🔥 QUIZ APP IMPLEMENTATION

### **1. Quiz Data Structure:**

```jsx
const quizData = [
  {
    id: 1,
    question: "React là gì?",
    options: [
      "Một framework JavaScript",
      "Một thư viện JavaScript",
      "Một ngôn ngữ lập trình",
      "Một cơ sở dữ liệu"
    ],
    correctAnswer: 1, // Index của đáp án đúng
    explanation: "React là một thư viện JavaScript để xây dựng giao diện người dùng."
  },
  {
    id: 2,
    question: "JSX là gì?",
    options: [
      "Một framework CSS",
      "JavaScript XML",
      "Một loại database",
      "Một server-side language"
    ],
    correctAnswer: 1,
    explanation: "JSX là cú pháp cho phép viết HTML trong JavaScript."
  },
  // Thêm nhiều câu hỏi...
];
```

### **2. Main Quiz Component:**

```jsx
function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);

  // Quiz data
  const quizData = [
    {
      id: 1,
      question: "React là gì?",
      options: [
        "Một framework JavaScript",
        "Một thư viện JavaScript",
        "Một ngôn ngữ lập trình",
        "Một cơ sở dữ liệu"
      ],
      correctAnswer: 1,
      explanation: "React là một thư viện JavaScript để xây dựng giao diện người dùng."
    },
    {
      id: 2,
      question: "JSX là gì?",
      options: [
        "Một framework CSS",
        "JavaScript XML",
        "Một loại database",
        "Một server-side language"
      ],
      correctAnswer: 1,
      explanation: "JSX là cú pháp cho phép viết HTML trong JavaScript."
    },
    {
      id: 3,
      question: "useState dùng để làm gì?",
      options: [
        "Tạo component",
        "Quản lý state",
        "Xử lý events",
        "Tạo API calls"
      ],
      correctAnswer: 1,
      explanation: "useState là hook để quản lý state trong functional components."
    },
    {
      id: 4,
      question: "Props trong React là gì?",
      options: [
        "Local state của component",
        "Data truyền từ parent xuống child",
        "CSS styles",
        "Event handlers"
      ],
      correctAnswer: 1,
      explanation: "Props là cách truyền data từ parent component xuống child component."
    },
    {
      id: 5,
      question: "onClick trong JSX tương ứng với?",
      options: [
        "onclick (HTML)",
        "addEventListener",
        "onClick (camelCase)",
        "Cả A và C"
      ],
      correctAnswer: 3,
      explanation: "onClick trong JSX sử dụng camelCase và truyền function thay vì string."
    }
  ];

  // Initialize quiz
  useEffect(() => {
    setQuizStartTime(new Date());
  }, []);

  // Handle answer selection
  function handleAnswerSelect(questionId, answerIndex) {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  }

  // Navigate to next question
  function handleNext() {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  }

  // Navigate to previous question
  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  // Finish quiz
  function finishQuiz() {
    setQuizEndTime(new Date());
    setShowResults(true);
  }

  // Restart quiz
  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStartTime(new Date());
    setQuizEndTime(null);
  }

  // Calculate results
  const results = useMemo(() => {
    if (!showResults) return null;

    const totalQuestions = quizData.length;
    const answeredQuestions = Object.keys(selectedAnswers).length;
    const correctAnswers = quizData.filter(q =>
      selectedAnswers[q.id] === q.correctAnswer
    ).length;

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = quizEndTime && quizStartTime
      ? Math.round((quizEndTime - quizStartTime) / 1000)
      : 0;

    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      score,
      timeSpent,
      passed: score >= 70 // Pass threshold
    };
  }, [showResults, selectedAnswers, quizData, quizStartTime, quizEndTime]);

  // Current question data
  const currentQuestionData = quizData[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestionData?.id];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  // Show results screen
  if (showResults) {
    return (
      <div style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 32,
        backgroundColor: 'white',
        borderRadius: 16,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: results.passed ? '#28a745' : '#dc3545',
          marginBottom: 32
        }}>
          {results.passed ? '🎉 Chúc mừng!' : '😅 Cố gắng lần sau!'}
        </h1>

        {/* Score display */}
        <div style={{
          textAlign: 'center',
          marginBottom: 32
        }}>
          <div style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: results.passed ? '#28a745' : '#dc3545',
            marginBottom: 8
          }}>
            {results.score}%
          </div>
          <div style={{
            fontSize: 18,
            color: '#6c757d'
          }}>
            {results.correctAnswers}/{results.totalQuestions} câu đúng
          </div>
        </div>

        {/* Statistics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 16,
          marginBottom: 32
        }}>
          <div style={{
            textAlign: 'center',
            padding: 16,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
          }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#007bff' }}>
              {results.answeredQuestions}
            </div>
            <div style={{ fontSize: 14, color: '#6c757d' }}>Đã trả lời</div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: 16,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
          }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#28a745' }}>
              {results.correctAnswers}
            </div>
            <div style={{ fontSize: 14, color: '#6c757d' }}>Đúng</div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: 16,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
          }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#dc3545' }}>
              {results.totalQuestions - results.correctAnswers}
            </div>
            <div style={{ fontSize: 14, color: '#6c757d' }}>Sai</div>
          </div>

          <div style={{
            textAlign: 'center',
            padding: 16,
            backgroundColor: '#f8f9fa',
            borderRadius: 8
          }}>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#6c757d' }}>
              {results.timeSpent}s
            </div>
            <div style={{ fontSize: 14, color: '#6c757d' }}>Thời gian</div>
          </div>
        </div>

        {/* Detailed results */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ marginBottom: 16 }}>Chi tiết kết quả:</h3>
          {quizData.map(question => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;
            const isAnswered = userAnswer !== undefined;

            return (
              <div key={question.id} style={{
                padding: 16,
                marginBottom: 12,
                borderRadius: 8,
                backgroundColor: isAnswered
                  ? (isCorrect ? '#d4edda' : '#f8d7da')
                  : '#fff3cd',
                border: `1px solid ${isAnswered
                  ? (isCorrect ? '#c3e6cb' : '#f5c6cb')
                  : '#ffeaa7'}`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 8
                }}>
                  <span style={{
                    fontSize: 18,
                    color: isAnswered
                      ? (isCorrect ? '#155724' : '#721c24')
                      : '#856404'
                  }}>
                    {isAnswered
                      ? (isCorrect ? '✅' : '❌')
                      : '⚠️'}
                  </span>
                  <strong style={{
                    color: isAnswered
                      ? (isCorrect ? '#155724' : '#721c24')
                      : '#856404'
                  }}>
                    Câu {question.id}: {question.question}
                  </strong>
                </div>

                {!isAnswered && (
                  <div style={{ color: '#856404', fontStyle: 'italic' }}>
                    Chưa trả lời
                  </div>
                )}

                {isAnswered && !isCorrect && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ color: '#721c24', marginBottom: 4 }}>
                      <strong>Đáp án của bạn:</strong> {question.options[userAnswer]}
                    </div>
                    <div style={{ color: '#155724' }}>
                      <strong>Đáp án đúng:</strong> {question.options[question.correctAnswer]}
                    </div>
                  </div>
                )}

                <div style={{
                  marginTop: 8,
                  padding: 8,
                  backgroundColor: 'white',
                  borderRadius: 4,
                  fontSize: 14,
                  color: '#6c757d'
                }}>
                  <strong>Giải thích:</strong> {question.explanation}
                </div>
              </div>
            );
          })}
        </div>

        {/* Restart button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={restartQuiz}
            style={{
              padding: '16px 32px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              fontSize: 18,
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            🔄 Làm lại quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz questions screen
  return (
    <div style={{
      maxWidth: 600,
      margin: '40px auto',
      padding: 32,
      backgroundColor: 'white',
      borderRadius: 16,
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32
      }}>
        <h1 style={{ margin: 0, color: '#2d3436' }}>React Quiz</h1>
        <div style={{
          fontSize: 14,
          color: '#6c757d'
        }}>
          Câu {currentQuestion + 1}/{quizData.length}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100%',
        height: 8,
        backgroundColor: '#e9ecef',
        borderRadius: 4,
        marginBottom: 32,
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#007bff',
          borderRadius: 4,
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Question */}
      <div style={{ marginBottom: 32 }}>
        <h2 style={{
          fontSize: 24,
          color: '#2d3436',
          marginBottom: 24,
          lineHeight: 1.4
        }}>
          {currentQuestionData.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {currentQuestionData.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestionData.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                style={{
                  padding: 16,
                  textAlign: 'left',
                  border: `2px solid ${isSelected ? '#007bff' : '#e9ecef'}`,
                  borderRadius: 8,
                  backgroundColor: isSelected ? '#e7f3ff' : 'white',
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = '#007bff';
                    e.target.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.borderColor = '#e9ecef';
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <div style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? '#007bff' : '#6c757d'}`,
                    backgroundColor: isSelected ? '#007bff' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isSelected && (
                      <span style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                        ✓
                      </span>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          style={{
            padding: '12px 24px',
            backgroundColor: currentQuestion === 0 ? '#6c757d' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: currentQuestion === 0 ? 'not-allowed' : 'pointer',
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          ← Trước
        </button>

        <div style={{
          fontSize: 14,
          color: '#6c757d'
        }}>
          {Object.keys(selectedAnswers).length}/{quizData.length} đã trả lời
        </div>

        <button
          onClick={handleNext}
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          {currentQuestion === quizData.length - 1 ? 'Hoàn thành' : 'Tiếp →'}
        </button>
      </div>
    </div>
  );
}

export default QuizApp;
```

---

## 📊 TÍNH NĂNG CHÍNH

| Feature | Implementation | Events Used |
|---------|----------------|-------------|
| **Question Navigation** | State management | onClick buttons |
| **Answer Selection** | Radio button simulation | onClick options |
| **Progress Tracking** | Visual progress bar | State updates |
| **Results Calculation** | Score computation | useMemo |
| **Timer** | Time tracking | useEffect |
| **Restart** | Reset all state | onClick |

---

## ✅ CHECKLIST HOÀN THÀNH

- [ ] Multiple choice questions với state management
- [ ] Answer selection và validation
- [ ] Progress indicator
- [ ] Results summary với detailed breakdown
- [ ] Score calculation và pass/fail logic
- [ ] Restart functionality
- [ ] Responsive design
- [ ] No state persistence (localStorage not used)

---

## 🎯 EXTENSIONS ĐỀ XUẤT

**Để nâng cao Quiz App:**

1. **Timer cho mỗi câu hỏi**
2. **Randomize question order**
3. **Different difficulty levels**
4. **Save progress to localStorage**
5. **User authentication**
6. **Leaderboard system**
7. **Question categories**
8. **Multimedia questions (images/videos)**

**Code này sẵn sàng để:**
- Tích hợp vào Day-4 App5.jsx
- Mở rộng thành full-featured quiz platform
- Sử dụng làm base cho các interactive apps khác