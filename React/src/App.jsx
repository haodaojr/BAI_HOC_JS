import React, { useState } from "react";
import Color from "./Color";

const App = () => {
  const [color, setColor] = useState("red");
  return (
    <div>
      <Color color={color} />
      <button onClick={() => setColor(color === "blue" ? "red" : "blue")}>
        Nhấn để đổi màu
      </button>
    </div>
  );
};

export default App;
