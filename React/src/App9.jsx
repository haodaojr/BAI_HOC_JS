import React from 'react';
import { Menu, Item, contextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = "my-menu";

export default function App() {
  const show = (event) => {
    event.preventDefault();
    contextMenu.show({
      id: MENU_ID,
      event: event,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Ô này click chuột phải vào */}
      <div
        onContextMenu={show}
        className="bg-white p-12 rounded-lg shadow-lg cursor-pointer"
      >
        <h1 className="text-2xl font-bold mb-2">Click chuột phải vào đây!</h1>
        <p className="text-gray-600">Menu sẽ hiện ra</p>
      </div>

      {/* Menu hiển thị */}
      <Menu id={MENU_ID}>
        <Item onClick={() => alert('Bạn click Đổi tên')}>Đổi tên</Item>
        <Item onClick={() => alert('Bạn click Xóa')}>Xóa</Item>
        <Item onClick={() => alert('Bạn click Chia sẻ')}>Chia sẻ</Item>
      </Menu>
    </div>
  );
}