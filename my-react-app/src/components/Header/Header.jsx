import React from "react";
import "./Header.css";

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;