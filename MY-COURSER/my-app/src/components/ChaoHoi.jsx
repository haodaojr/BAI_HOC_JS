import React from "react";

function ChaoHoi({ name = "Khach", job, age, address, onAddressChange }) {
  const handleChangeAddress = () => {
    if (typeof onAddressChange === "function") {
      onAddressChange("Ha Noi");
    }
  };

  return (
    <div>
      <h2>Chao Hoi , {name}</h2>

      <p>Toi la {job}</p>

      <p>Toi {age >= 18 ? "tren 18" : "duoi 18"}</p>

      <p>Toi o {address}</p>

      <button onClick={handleChangeAddress}>Change</button>
    </div>
  );
}

export default ChaoHoi;
