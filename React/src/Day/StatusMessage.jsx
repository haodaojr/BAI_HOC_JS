import React from "react";

const StatusMessage = ({ status }) => {
  const message = {
    loading: (
      <div style={{ color: "blue", padding: "10px", border: "2px solid blue" }}>
        <span>⏳</span> Đang tải dữ liệu...
      </div>
    ),

    errors: (
      <div style={{ color: "blue", padding: "10px", border: "2px solid blue" }}>
        <span>❌</span> Có lỗi xảy ra! Vui lòng thử lại.
      </div>
    ),

    success: (
      <div
        style={{ color: "green", padding: "10px", border: "2px solid green" }}
      >
        <span>✅</span> Dữ liệu đã được tải thành công!
      </div>
    ),

    idle: (
      <div style={{ color: "gray", padding: "10px", border: "2px solid gray" }}>
        <span>💤</span> Chưa có hoạt động
      </div>
    ),
  };

  return (
    message[status] || (
      <div style={{ color: "orange", padding: "10px" }}>
        😶 Trạng thái không xác định
      </div>
    )
  );
};

export default StatusMessage;
