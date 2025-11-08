import React, { useState } from "react";
import "./Product.css";

function Product() {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 14 Pro", price: 1000, quantity: 0 },
    { id: 2, name: "MacBook Pro", price: 2000, quantity: 0 },
    { id: 3, name: "AirPods Pro", price: 250, quantity: 0 },
  ]);

  const increaseQuantity = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="product-container">
      <h2>Danh sách sản phẩm</h2>

      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Giá: ${product.price}</p>
            <div className="quantity-controls">
              <button onClick={() => decreaseQuantity(product.id)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => increaseQuantity(product.id)}>+</button>
            </div>
            <p>Thành tiền: ${product.price * product.quantity}</p>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Tổng giá trị giỏ hàng: ${total}</h3>
      </div>
    </div>
  );
}

export default Product;
