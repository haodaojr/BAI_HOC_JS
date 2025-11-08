import React from "react";
import Results from "./Result";

const quizData = [
  {
    number: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    number: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    number: 3,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    number: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Jane Austen",
    ],
    answer: "William Shakespeare",
  },
  {
    number: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Au", "Ag", "Gd"],
    answer: "Au",
  },
];

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = React.useState(0);
  const [isQuizEnd, setIsQuizEnd] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState(Array(quizData.length).fill(null));
  const [showReview, setShowReview] = React.useState(false);

  const handleSelectOption = (option) => {
    // Lưu đáp án người dùng chọn
    const newAnswers = [...answers];
    newAnswers[currentQuiz] = option;
    setAnswers(newAnswers);
  };

  const handleBtnNext = () => {
    const yourOption = answers[currentQuiz];
    if (yourOption === null) {
      alert("Bạn cần chọn đáp án trước khi sang câu tiếp theo!");
      return;
    }

    if (currentQuiz < quizData.length - 1) {
      setCurrentQuiz((prev) => prev + 1);
    } else {
      // Tính điểm khi hoàn thành quiz
      let totalScore = 0;
      answers.forEach((ans, i) => {
        if (ans === quizData[i].answer) totalScore++;
      });
      setScore(totalScore);
      setIsQuizEnd(true);
    }
  };

  const handleBtnPrev = () => {
    if (currentQuiz > 0) {
      setCurrentQuiz((prev) => prev - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuiz(0);
    setIsQuizEnd(false);
    setAnswers(Array(quizData.length).fill(null));
    setScore(0);
    setShowReview(false);
  };

  if (isQuizEnd) {
    return (
      <Results
        score={score}
        total={quizData.length}
        quizData={quizData}
        answers={answers}
        handleRestartQuiz={handleRestartQuiz}
        handleReview={() => {
          setIsQuizEnd(false);
          setShowReview(true);
          setCurrentQuiz(0);
        }}
      />
    );
  }

  const yourOption = answers[currentQuiz];

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        background: "linear-gradient(135deg, #e0f7fa, #f0f8ff)",
        color: "#333",
        width: "450px",
        margin: "50px auto",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
      }}
    >
      <h1 style={{ color: "#0077b6" }}>🧠 Quiz App</h1>

      <h3>
        Câu hỏi: {quizData[currentQuiz].number}/{quizData.length}
      </h3>
      <h3 style={{ color: "#004aad" }}>{quizData[currentQuiz].question}</h3>

      <div
        style={{
          padding: "20px",
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {quizData[currentQuiz].options.map((option, index) => {
          const isCorrect = option === quizData[currentQuiz].answer;
          const isSelected = yourOption === option;

          let backgroundColor = "#fff";
          if (isSelected) {
            backgroundColor = isCorrect ? "#4CAF50" : "#F44336";
          }

          return (
            <button
              key={index}
              onClick={() => !showReview && handleSelectOption(option)}
              disabled={showReview}
              style={{
                width: "80%",
                padding: "10px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                backgroundColor,
                color: isSelected ? "#fff" : "#333",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "all 0.25s ease-in-out",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>

      <h3 style={{ color: "#555", marginTop: "15px" }}>
        Đáp Án Của Bạn:{" "}
        <span style={{ color: "#0077b6" }}>{yourOption || "Chưa chọn"}</span>
      </h3>

      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
        <button
          onClick={handleBtnPrev}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          ◀ Previous
        </button>

        <button
          onClick={handleBtnNext}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {currentQuiz === quizData.length - 1 ? "Finish 🏁" : "Next ▶"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
