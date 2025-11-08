import React from "react";

const Color = ({ color }) => {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: color,
        margin: "10px",
      }}
    >
      Color
    </div>
  );
};

export default Color;


