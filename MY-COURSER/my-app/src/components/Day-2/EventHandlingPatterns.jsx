function EventHandlingPatterns({ onClick }) {
  const products = [
    { id: 1, name: "🍎 Táo đỏ" },
    { id: 2, name: "🍌 Chuối vàng" },
    { id: 3, name: "🍇 Nho tím" },
  ];

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Danh sách sản phẩm</h3>
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onClick(product.id)} // gọi callback từ cha
          style={{
            margin: "5px",
            padding: "8px 16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {product.name}
        </button>
      ))}
    </div>
  );
}

export default EventHandlingPatterns;
