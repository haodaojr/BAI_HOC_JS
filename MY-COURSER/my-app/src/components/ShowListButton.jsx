function ShowListButton({ showList, setShowList }) {
  return (
    <button
      onClick={() => setShowList(!showList)}
      style={{
        padding: "8px 16px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        marginBottom: "10px",
        cursor: "pointer",
      }}
    >
      {showList ? "Ẩn danh sách" : "Hiển thị danh sách"}
    </button>
  );
}

export default ShowListButton;
