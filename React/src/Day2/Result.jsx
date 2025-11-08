import React from "react";

const Result = ({ score, total, handleRestartQuiz, handleReview }) => {
  return (
    <div>
      <h1>🎯 Kết Quả</h1>
      <h2>Điểm: {score} / {total}</h2>
      <h2>{score >= total / 2 ? "✅ Pass" : "❌ Fail"}</h2>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={handleRestartQuiz}
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔄 Làm lại quiz
        </button>

        <button
          onClick={handleReview}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          👀 Xem lại kết quả
        </button>
      </div>
    </div>
  );
};

export default Result;
