// import React from "react";

// const quizData = [
//   {
//     number: 1,
//     question: "Biến nào sau đây là hợp lệ trong Javascript?",
//     options: ["_var1", "_var_1", "1var", "var-1"],
//     answer: "_var_1",
//   },
//   {
//     number: 2,
//     question: "Từ khóa nào được dùng để khai báo hằng số trong JavaScript?",
//     options: ["let", "const", "var", "static"],
//     answer: "const",
//   },
//   {
//     number: 3,
//     question: "Kết quả của biểu thức 2 + '2' trong JavaScript là gì?",
//     options: ["4", "22", "NaN", "Error"],
//     answer: "22",
//   },
//   {
//     number: 4,
//     question: "Phương thức nào được dùng để in dữ liệu ra console?",
//     options: ["print()", "display()", "log()", "console.log()"],
//     answer: "console.log()",
//   },
//   {
//     number: 5,
//     question: "Kiểu dữ liệu nào KHÔNG tồn tại trong JavaScript?",
//     options: ["number", "string", "float", "boolean"],
//     answer: "float",
//   },
//   {
//     number: 6,
//     question: "Kết quả của typeof null là gì?",
//     options: ["null", "undefined", "object", "number"],
//     answer: "object",
//   },
//   {
//     number: 7,
//     question:
//       "Phép so sánh nào trong JavaScript so sánh cả giá trị và kiểu dữ liệu?",
//     options: ["==", "===", "!=", "!=="],
//     answer: "===",
//   },
//   {
//     number: 8,
//     question: "Câu lệnh nào dùng để dừng vòng lặp trong JavaScript?",
//     options: ["exit", "stop", "break", "return"],
//     answer: "break",
//   },
//   {
//     number: 9,
//     question: "Phương thức nào của Array dùng để thêm phần tử vào cuối mảng?",
//     options: ["push()", "pop()", "shift()", "unshift()"],
//     answer: "push()",
//   },
//   {
//     number: 10,
//     question: "Trong JavaScript, DOM là viết tắt của cụm từ nào?",
//     options: [
//       "Document Object Model",
//       "Data Object Method",
//       "Dynamic Output Mechanism",
//       "Document Oriented Management",
//     ],
//     answer: "Document Object Model",
//   },
// ];

// const Quiz = () => {
//   return (
//     <div>
//       {quizData.map((item, index) => {
//         return (
//           <div key={index} className="question">
//             <h2>
//               {item.number} - {item.question}
//             </h2>
//             <div className="option">
//               {item.options.map((options, i) => (
//                 <button
//                   key={i}
//                   className="option"
//                   style={{
//                     margin: "5px",
//                     padding: "8px 12px",
//                     borderRadius: "8px",
//                     border: "1px solid #ccc",
//                     cursor: "pointer",
//                   }}
//                 >
//                     {options}
//                 </button>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Quiz;

import React from "react";

const quizData = [
  {
    number: 1,
    question: "Biến nào sau đây là hợp lệ trong Javascript?",
    options: ["_var1", "_var_1", "1var", "var-1"],
    answer: "_var_1",
  },
  {
    number: 2,
    question: "Từ khóa nào được dùng để khai báo hằng số trong JavaScript?",
    options: ["let", "const", "var", "static"],
    answer: "const",
  },
  {
    number: 3,
    question: "Kết quả của biểu thức 2 + '2' trong JavaScript là gì?",
    options: ["4", "22", "NaN", "Error"],
    answer: "22",
  },
  {
    number: 4,
    question: "Phương thức nào được dùng để in dữ liệu ra console?",
    options: ["print()", "display()", "log()", "console.log()"],
    answer: "console.log()",
  },
  {
    number: 5,
    question: "Kiểu dữ liệu nào KHÔNG tồn tại trong JavaScript?",
    options: ["number", "string", "float", "boolean"],
    answer: "float",
  },
];

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = React.useState(0);
  const [optionSelected, setOptionSelected] = React.useState("");

  const [score, setScore] = React.useState(0);
  const currentQuestion = quizData[currentQuiz];

  const handleSelectOption = (option) => {
    setOptionSelected(option);
    console.log("Selected option:", option);
  };

  const handleNext = () => {
    if (currentQuiz < quizData.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setOptionSelected("");
    }
  };

  const handlePrev = () => {
    if (currentQuiz > 0) {
      setCurrentQuiz(currentQuiz - 1);
      setOptionSelected("");
    }
  };

  const handlescore = () => {
    if (optionSelected === currentQuestion.answer) {
      setScore((score) => score + 1);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>
        🧠 Câu {currentQuestion.number}: {currentQuestion.question}
      </h2>

      {currentQuestion.options.map((option) => (
        <button
          onClick={() => handleSelectOption(option)}
          key={option}
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

      {optionSelected &&
        (optionSelected === currentQuestion.answer ? (
          <p className="correct" style={{ color: "green", fontWeight: "bold" }}>
            ✅ Chính xác! Đáp án đúng là: {currentQuestion.answer}
          </p>
        ) : (
          <p className="incorrect" style={{ color: "red", fontWeight: "bold" }}>
            ❌ Sai rồi! Đáp án đúng là: {currentQuestion.answer}
          </p>
        ))}

      <p>Câu Trả Lời Của Bạn Là: {optionSelected || "Chưa chọn"}</p>

      <div className="nav-buttons" style={{ marginTop: "20px" }}>
        <button
          className="prev"
          onClick={handlePrev}
          disabled={currentQuiz === 0}
        >
          ⬅ Prev
        </button>
        <button
          className="next"
          onClick={handleNext}
          disabled={currentQuiz === quizData.length - 1}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Quiz;
