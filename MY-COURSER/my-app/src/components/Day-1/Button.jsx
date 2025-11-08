function Button({ label = "Click me", color = "blue", size = "medium" }) {
  const style = {
    backgroundColor: color,
    padding: size === "large" ? "12px 24px" : "8px 16px",
    border: "none",
    color: "white",
    borderRadius: "8px",
  };

  return <button style={style}>{label}</button>;
}

export default Button;
