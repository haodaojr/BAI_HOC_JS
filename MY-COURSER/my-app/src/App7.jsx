import React, { useState } from "react";

const themes = {
  light: {
    background: "#ffffff", // Màu nền trắng
    text: "#1f2937", // Màu chữ xám đen
    primary: "#3b82f6", // Màu chính xanh dương
    secondary: "#10b981", // Màu phụ xanh lá
    accent: "#f59e0b", // Màu nhấn vàng cam
    cardBg: "#f8fafc", // Màu nền card xám nhạt
    border: "#e5e7eb", // Màu viền xám
  },
  dark: {
    background: "#1f2937", // Màu nền xám đen
    text: "#f9fafb", // Màu chữ trắng
    primary: "#60a5fa", // Màu chính xanh sáng
    secondary: "#34d399", // Màu phụ xanh lá sáng
    accent: "#fbbf24", // Màu nhấn vàng sáng
    cardBg: "#374151", // Màu nền card xám
    border: "#4b5563", // Màu viền xám đậm
  },
};

function DemoThemes() {
  const [currentTheme, setCurrentTheme] = useState("light");

  const theme = currentTheme === "light" ? themes.light : themes.dark;

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h2>Current Theme: {currentTheme}</h2>

      <button onClick={() => setCurrentTheme("light")}>Light Mode</button>
      <button onClick={() => setCurrentTheme("dark")}>Dark Mode</button>
    </div>
  );
}

export default function  App7(){
  return(
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🎓 HỌC REACT THEO CODE PORTFOLIO</h1>
      <p style={{ 
        backgroundColor: '#fef3c7', 
        padding: '10px', 
        borderRadius: '5px',
        border: '2px solid #f59e0b'
      }}>
        <strong>Function 1/12:</strong> THEMES CONFIGURATION
      </p>
      <hr />
      
      <DemoThemes />
    </div>
  )
}