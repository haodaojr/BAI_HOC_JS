import React from "react";

const App11 = () => {
  return (
    <div
      style={{
        width: "400px",
        background: "white",
        padding: "10px",
        margin: "10px",
        paddingLeft: "20px",
        textAlign: "center",
        borderRadius: "10px",
      }}
    >
      <form action="">
        <label htmlFor="">
          <input
            type="text"
            placeholder="ban hay nhap cho ten vao"
            style={{ width: "200px" }}
          />
        </label>
        <br />
        <label htmlFor="">
          <input
            type="text"
            placeholder="ban hay nhap cho ten vao"
            style={{ width: "200px" }}
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App11;
