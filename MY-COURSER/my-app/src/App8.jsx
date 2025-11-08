import React, { useState } from "react";

const themes = {
  light: {
    background: "#ffffff",
    text: "#1f2937",
    primary: "#3b82f6",
    cardBg: "#f8fafc",
    border: "#e5e7eb",
  },
  dark: {
    background: "#1f2937",
    text: "#f9fafb",
    primary: "#60a5fa",
    cardBg: "#374151",
    border: "#4b5563",
  },
};

function Header({ theme, currentTheme, toggleTheme, currentSection, setCurrentSection }) {
  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "about", label: "About", icon: "👤" },
    { id: "skills", label: "Skills", icon: "💪" },
    { id: "projects", label: "Projects", icon: "🚀" },
    { id: "experience", label: "Experience", icon: "💼" },
    { id: "contact", label: "Contact", icon: "📧" },
  ];

  return (
    <header
      style={{
        backgroundColor: theme.cardBg,
        borderBottom: `1px solid ${theme.border}`,
        padding: "1rem 2rem",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1.5rem", fontWeight: "bold", color: theme.primary }}>
          Your Name
        </div>

        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentSection(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: currentSection === item.id ? theme.primary : theme.text,
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: currentSection === item.id ? "bold" : "normal",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                }}
              >
                <span>{item.icon}</span> {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleTheme}
          style={{
            border: `2px solid ${theme.primary}`,
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            backgroundColor: "transparent",
            fontSize: "1.2rem",
          }}
        >
          {currentTheme === "light" ? "🌙" : "☀️"}
        </button>
      </nav>
    </header>
  );
}


export default function App8() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [currentSection, setCurrentSection] = useState("home");
  const theme = currentTheme === "light" ? themes.light : themes.dark;
  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <div
      style={{
        backgroundColor: theme.background,
        minHeight: "100vh",
        color: theme.text,
      }}
    >
      <div
        style={{
          backgroundColor: "#fef3c7",
          padding: "10px",
          color: "#000",
        }}
      >
        <strong>Function 2/12:</strong> HEADER COMPONENT
      </div>

      <Header
        theme={themes}
        toggleTheme={toggleTheme}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      />

      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Section hiện tại: {currentSection}</h1>
        <p>Click vào menu hoặc theme toggle để test!</p>
      </div>
    </div>
  );
}
