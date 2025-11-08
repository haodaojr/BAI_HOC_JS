import React, { useState } from "react";

function ProfileCard({ name, age: initialAge, bio }) {
  const [currentAge, setCurrentAge] = useState(initialAge);

  const handleBirthday = () => {
    setCurrentAge(currentAge + 1);
  };

  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p>Age: {currentAge}</p>
      <p>{bio}</p>
      <button
        onClick={handleBirthday}
        style={{
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Happy Birthday! 🎂
      </button>
    </div>
  );
}

export default ProfileCard;
