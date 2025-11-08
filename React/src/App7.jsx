import React, { useState } from "react";

function DynamicForm() {
  // 🧠 Lưu danh sách các số điện thoại (mảng các object)
  const [phones, setPhones] = useState([{ number: "" }]);

  // 🧠 Xử lý khi người dùng thay đổi 1 ô input
  const handleChange = (index, event) => {
    const newPhones = [...phones];
    newPhones[index].number = event.target.value;
    setPhones(newPhones);
  };

  // ➕ Thêm 1 ô input mới
  const handleAdd = () => {
    setPhones([...phones, { number: "" }]);
  };

  // ❌ Xóa 1 ô input
  const handleRemove = (index) => {
    const newPhones = [...phones];
    newPhones.splice(index, 1); // xóa theo vị trí
    setPhones(newPhones);
  };

  // 📤 Gửi form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra ô nào trống
    if (phones.some((p) => !p.number.trim())) {
      alert("⚠️ Có ô số điện thoại bị trống!");
      return;
    }

    alert(`📞 Các số điện thoại đã nhập:\n${phones
      .map((p) => p.number)
      .join(", ")}`);

    // Reset form
    setPhones([{ number: "" }]);
  };

  return (
    <div style={styles.container}>
      <h2>📱 Form thêm/xóa số điện thoại</h2>
      <form onSubmit={handleSubmit}>
        {phones.map((phone, index) => (
          <div key={index} style={styles.row}>
            <input
              type="text"
              placeholder={`Số điện thoại ${index + 1}`}
              value={phone.number}
              onChange={(e) => handleChange(index, e)}
              style={styles.input}
            />
            {/* Chỉ hiển thị nút xóa nếu có hơn 1 ô */}
            {phones.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                style={styles.removeBtn}
              >
                ❌
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={handleAdd} style={styles.addBtn}>
          ➕ Thêm số điện thoại
        </button>

        <br />
        <button type="submit" style={styles.submitBtn}>
          Gửi Form
        </button>
      </form>

      <pre style={styles.preview}>
        🧾 Dữ liệu hiện tại: {JSON.stringify(phones, null, 2)}
      </pre>
    </div>
  );
}

export default DynamicForm;

// 🎨 Style cơ bản
const styles = {
  container: {
    maxWidth: "400px",
    margin: "30px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  removeBtn: {
    marginLeft: "8px",
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  addBtn: {
    background: "#2196f3",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  submitBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  preview: {
    marginTop: "20px",
    background: "#f5f5f5",
    padding: "10px",
    borderRadius: "5px",
  },
};
