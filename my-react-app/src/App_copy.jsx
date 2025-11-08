// import { useState } from "react";
import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  const heading = React.createElement("h1", null, "Welcome to Vite + React");

  const paragraph = React.createElement(
    "p",
    null,
    "This is a simple setup to get you started with Vite and React."
  );

  const editNote = React.createElement(
    "p",
    null,
    "Edit ",
    React.createElement("code", null, "src/App.jsx"),
    " to see changes in real-time."
  );

  const logoContainer = React.createElement(
    "div",
    { className: "logos" },
    React.createElement(
      "a",
      {
        href: "https://vite.dev ",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      React.createElement("img", {
        src: viteLogo,
        className: "logo",
        alt: "Vite logo",
      })
    ),
    React.createElement(
      "a",
      {
        href: "https://react.dev ",
        target: "_blank",
        rel: "noopener noreferrer",
      },
      React.createElement("img", {
        src: reactLogo,
        className: "logo react",
        alt: "React logo",
      })
    )
  );

  const container = React.createElement(
    "div",
    null,
    heading,
    paragraph,
    editNote,
    logoContainer
  );

  return container;
}

export default App;
