// ✅ Component con hiển thị kết quả
import React from "react";

// ✅ Destructuring props
const Results = ({ score, totalQuestionNum, restartQuiz, rewatchQuiz }) => {
  return (
    <div>
      <h2>Kết Quả</h2>

      {/* ✅ JSX expression nhúng biến */}
      <p className="result">
        Bạn trả lời đúng {score} / {totalQuestionNum} câu 👏👏👏
      </p>

      {/* ✅ Truyền hàm props làm event handler */}
      <div className="resultButtonsContainer">
        <button className="result-button" onClick={rewatchQuiz}>
          🔍 Xem Lại
        </button>
        <button className="result-button" onClick={restartQuiz}>
          🔁 Làm Lại
        </button>
      </div>
    </div>
  );
};

export default Results;
``