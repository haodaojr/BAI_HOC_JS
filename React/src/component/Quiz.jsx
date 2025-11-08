// ✅ Import React và component con (Results)
import React from "react";
import Results from "./Results ";

// ✅ Dữ liệu câu hỏi (mảng các object) → ví dụ cho list rendering
const quizData = [
  {
    number: 1,
    question: "Biến nào sau đây là hợp lệ trong JavaScript?",
    options: ["1variable", "_variable", "var-name", "var name"],
    answer: "_variable",
  },
  {
    number: 2,
    question:
      "Trong JavaScript, kiểu dữ liệu nào sau đây là kiểu dữ liệu nguyên thủy (primitive)?",
    options: ["object", "array", "string", "function"],
    answer: "string",
  },
  {
    number: 3,
    question:
      "Thuật toán sắp xếp nào sau đây có độ phức tạp trung bình là O(n log n)?",
    options: ["Bubble Sort", "Insertion Sort", "Merge Sort", "Linear Sort"],
    answer: "Merge Sort",
  },
  {
    number: 4,
    question: "Kết quả của `typeof null` trong JavaScript là gì?",
    options: ["'null'", "'undefined'", "'object'", "'number'"],
    answer: "'object'",
  },
  {
    number: 5,
    question: "Bộ nhớ Stack dùng để làm gì?",
    options: [
      "Lưu trữ dữ liệu dạng hàng đợi",
      "Lưu trữ các lời gọi hàm (function calls)",
      "Lưu ảnh",
      "Lưu video",
    ],
    answer: "Lưu trữ các lời gọi hàm (function calls)",
  },
  {
    number: 6,
    question: "Toán tử nào so sánh nghiêm ngặt giá trị và kiểu dữ liệu?",
    options: ["<", ">", "<=", ">="],
    answer: "<=",
  },
];

// ✅ Function Component chính: Quiz
const Quiz = () => {
  // ✅ State: dữ liệu động trong React
  const [optionSelected, setOptionSelected] = React.useState(null); // Lưu lựa chọn hiện tại
  const [score, setScore] = React.useState(0); // Lưu điểm
  const [currentQuiz, setCurrentQuiz] = React.useState(0); // Chỉ số câu hiện tại
  const question = quizData[currentQuiz]; // Lấy câu hỏi hiện tại
  const [isQuizEnded, setIsQuizEnded] = React.useState(false); // Đánh dấu quiz đã kết thúc chưa
  const [userAnswers, setUserAnswers] = React.useState(
    Array(quizData.length).fill(null) // Tạo mảng rỗng để lưu đáp án người dùng
  );

  // ✅ Khi chọn 1 đáp án
  const handleSelected = (option) => {
    setOptionSelected(option); // Cập nhật lựa chọn

    // ✅ Lưu đáp án vào mảng userAnswers (theo vị trí currentQuiz)
    setUserAnswers((prev) => {
      const newAnswers = [...prev]; // Tạo bản sao mảng cũ
      newAnswers[currentQuiz] = option; // Ghi đè đáp án ở vị trí hiện tại
      return newAnswers; // Trả mảng mới cho React
    });

    // ✅ Nếu chọn đúng thì cộng điểm
    if (option === question.answer) {
      setScore((score) => score + 1);
    }
  };

  // ✅ Chuyển sang câu kế tiếp
  const handleNext = () => {
    if (currentQuiz < quizData.length - 1) {
      setCurrentQuiz(currentQuiz + 1); // Tăng chỉ số câu
      setOptionSelected(null); // Reset lựa chọn
    } else {
      setIsQuizEnded(true); // Đến câu cuối → hiển thị kết quả
    }
  };

  // ✅ Quay lại câu trước
  const handlePrev = () => {
    if (currentQuiz > 0) {
      setCurrentQuiz(currentQuiz - 1);
      setOptionSelected(null);
    }
  };

  // ✅ Làm lại từ đầu
  const restartQuiz = () => {
    setCurrentQuiz(0);
    setIsQuizEnded(false);
    setScore(0);
    setOptionSelected(null);
    setUserAnswers(Array(quizData.length).fill(null));
  };

  // ✅ Xem lại kết quả (không reset điểm)
  const rewatchQuiz = () => {
    setIsQuizEnded(false);
    setCurrentQuiz(0);
    setOptionSelected(null);
  };

  // ✅ Khi chuyển câu → tự động hiển thị lại lựa chọn trước đó nếu có
  React.useEffect(() => {
    const previousAnswer = userAnswers[currentQuiz];
    setOptionSelected(previousAnswer);
  }, [currentQuiz, userAnswers]);

  // ✅ Conditional Rendering: nếu quiz đã kết thúc → render component Results
  if (isQuizEnded) {
    return (
      <Results
        score={score}
        totalQuestionNum={quizData.length}
        restartQuiz={restartQuiz}
        rewatchQuiz={rewatchQuiz}
      />
    );
  }

  // ✅ JSX UI chính của Quiz
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>🧠 Câu {question.number}</h1>
      <p>Câu hỏi: {question.question}</p>

      {/* ✅ List Rendering: hiển thị các lựa chọn */}
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleSelected(option)} // ✅ Event handler với parameter
          disabled={optionSelected !== null} // ✅ Conditional attribute
          className="option"
          style={{
            margin: "5px",
            padding: "8px 12px",
            borderRadius: "8px",
          }}
        >
          {option}
        </button>
      ))}

      {/* ✅ Conditional Rendering: hiển thị đúng/sai */}
      {optionSelected &&
        (optionSelected === question.answer ? (
          <p className="correct" style={{ color: "green" }}>
            ✅ Đáp án đúng rồi: {optionSelected}
          </p>
        ) : (
          <p className="wrong" style={{ color: "red" }}>
            ❌ Đáp án sai rồi: {optionSelected}
          </p>
        ))}

      {/* ✅ Hiển thị đáp án bạn chọn */}
      <p>Đáp án của bạn là: {optionSelected}</p>

      {/* ✅ Nút điều hướng */}
      <div
        style={{
          margin: "5px",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <button className="prev" onClick={handlePrev}>
          ◀ Prev
        </button>
        <button className="next" onClick={handleNext}>
          Next ▶
        </button>
      </div>
    </div>
  );
};

// ✅ Export component để dùng nơi khác
export default Quiz;
