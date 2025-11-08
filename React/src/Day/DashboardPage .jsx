import React from 'react';

// Các component riêng cho từng trang
const DashboardPage = () => (
  <div style={{ padding: '20px', background: '#e3f2fd' }}>
    <h3>📊 Dashboard</h3>
    <p>Chào mừng đến trang tổng quan!</p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
      <div style={{ background: 'white', padding: '15px', borderRadius: '4px' }}>
        <strong>Người dùng:</strong> 1,234
      </div>
      <div style={{ background: 'white', padding: '15px', borderRadius: '4px' }}>
        <strong>Đơn hàng:</strong> 567
      </div>
    </div>
  </div>
);

const ProfilePage = () => (
  <div style={{ padding: '20px', background: '#f3e5f5' }}>
    <h3>👤 Hồ sơ cá nhân</h3>
    <p><strong>Tên:</strong> Nguyễn Văn A</p>
    <p><strong>Email:</strong> user@example.com</p>
    <p><strong>Vai trò:</strong> Admin</p>
  </div>
);

const SettingsPage = () => (
  <div style={{ padding: '20px', background: '#fff3e0' }}>
    <h3>⚙️ Cài đặt</h3>
    <label style={{ display: 'block', marginBottom: '10px' }}>
      <input type="checkbox" /> Nhận thông báo qua email
    </label>
    <label style={{ display: 'block', marginBottom: '10px' }}>
      <input type="checkbox" defaultChecked /> Chế độ tối
    </label>
    <button style={{ marginTop: '10px', padding: '8px 16px' }}>Lưu cài đặt</button>
  </div>
);

const NotFoundPage = () => (
  <div style={{ padding: '20px', background: '#ffebee', textAlign: 'center' }}>
    <h3>❌ 404 - Không tìm thấy trang</h3>
    <p>Trang bạn đang tìm không tồn tại.</p>
  </div>
);

// Component chính
function PageRouter({ page }) {
  // Ánh xạ tên trang -> Component
  const pages = {
    dashboard: DashboardPage,
    profile: ProfilePage,
    settings: SettingsPage,
  };

  // Lấy component tương ứng, nếu không có thì dùng NotFoundPage
  const PageComponent = pages[page] || NotFoundPage;
  
  return <PageComponent />;
}


export default PageRouter;