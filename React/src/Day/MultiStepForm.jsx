import React from "react";

const MultiStepForm = ({ step, onNext, onPrev, onSubmit }) => {
  let content;
  if (step === 1) {
    content = (
      <div>
        <h3>📝 Bước 1: Thông tin cá nhân</h3>
        <input placeholder="Họ tên" style={{ padding: "8px", width: "100%" }} />
        <input
          placeholder="Email"
          style={{ padding: "8px", width: "100%", marginTop: "10px" }}
        />
      </div>
    );
  } else if (step === 2) {
    content = (
      <div>
        <h3>📞 Bước 2: Thông tin liên hệ</h3>
        <input
          placeholder="Số điện thoại"
          style={{ padding: "8px", width: "100%" }}
        />
        <input
          placeholder="Địa chỉ"
          style={{ padding: "8px", width: "100%", marginTop: "10px" }}
        />
      </div>
    );
  } else if (step === 3) {
    content = (
      <div>
        <h3>✅ Bước 3: Xác nhận</h3>
        <p>Kiểm tra lại thông tin của bạn:</p>
        <ul>
          <li>Họ tên: Nguyễn Văn A</li>
          <li>Email: example@email.com</li>
          <li>SĐT: 0123456789</li>
        </ul>
      </div>
    );
  } else {
    content = <p>❓ Bước không hợp lệ</p>;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
      }}
    >
      {content}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        {step > 1 && (
          <button onClick={onPrev} style={{ padding: "8px 16px" }}>
            ← Quay lại
          </button>
        )}{" "}
        {step < 3 ? (
          <button
            onClick={onNext}
            style={{
              padding: "8px 16px",
              background: "#007bff",
              color: "white",
            }}
          >
            Tiếp theo →
          </button>
        ) : (
          <button
            onClick={onSubmit}
            style={{
              padding: "8px 16px",
              background: "#28a745",
              color: "white",
            }}
          >
            Hoàn thành ✓
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
