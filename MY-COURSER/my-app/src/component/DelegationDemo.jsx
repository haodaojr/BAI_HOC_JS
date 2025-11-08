import React, { useState } from 'react';

// Ví dụ mở rộng về Event Delegation
export function DelegationDemo() {
    const [items, setItems] = useState([
        { id: 1, name: 'Item 1', completed: false },
        { id: 2, name: 'Item 2', completed: false },
        { id: 3, name: 'Item 3', completed: false }
    ]);

    // Event Delegation Handler chính
    function handleDelegation(e) {
        const target = e.target;
        const action = target.dataset.action;
        const id = target.dataset.id;

        if (!action || !id) return

        switch (action) {
            case 'toggle':
                setItems(prev => prev.map(item =>
                    item.id === parseInt(id) ? { ...item, completed: !item.completed } : item
                ));
                break;
            case 'delete':
                setItems(prev => prev.filter(item => item.id !== parseInt(id)));
                break;
            case 'edit': {
                const newName = prompt('Nhập tên mới:', items.find(item => item.id === parseInt(id))?.name);
                if (newName) {
                    setItems(prev => prev.map(item =>
                        item.id === parseInt(id) ? { ...item, name: newName } : item
                    ));
                }
                break;
            }
            default:
                break;
        }
    }

    // Thêm item mới
    function addItem() {
        const newId = Math.max(...items.map(item => item.id)) + 1;
        setItems(prev => [...prev, { id: newId, name: `Item ${newId}`, completed: false }]);
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Event Delegation Demo - Quản lý danh sách</h2>

            {/* Container chính với event delegation */}
            <div
                onClick={handleDelegation}
                style={{
                    border: '2px solid #ccc',
                    padding: '15px',
                    margin: '10px 0',
                    backgroundColor: '#f9f9f9'
                }}
            >
                <h3>Danh sách công việc:</h3>
                {items.map(item => (
                    <div
                        key={item.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '10px',
                            margin: '5px 0',
                            border: '1px solid #ddd',
                            backgroundColor: item.completed ? '#e8f5e8' : '#fff'
                        }}
                    >
                        {/* Checkbox để toggle hoàn thành */}
                        <input
                            type="checkbox"
                            checked={item.completed}
                            data-action="toggle"
                            data-id={item.id}
                            readOnly
                            style={{ marginRight: '10px' }}
                        />

                        {/* Tên item */}
                        <span
                            style={{
                                flex: 1,
                                textDecoration: item.completed ? 'line-through' : 'none'
                            }}
                        >
                            {item.name}
                        </span>

                        {/* Nút chỉnh sửa */}
                        <button
                            data-action="edit"
                            data-id={item.id}
                            style={{
                                marginLeft: '10px',
                                padding: '5px 10px',
                                backgroundColor: '#ffc107',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer'
                            }}
                        >
                            Sửa
                        </button>

                        {/* Nút xóa */}
                        <button
                            data-action="delete"
                            data-id={item.id}
                            style={{
                                marginLeft: '5px',
                                padding: '5px 10px',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer'
                            }}
                        >
                            Xóa
                        </button>
                    </div>
                ))}
            </div>

            {/* Nút thêm item mới */}
            <button
                onClick={addItem}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
            >
                Thêm Item Mới
            </button>

            {/* Giải thích */}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
                <h4>Cách hoạt động của Event Delegation:</h4>
                <ul>
                    <li><strong>Container chính:</strong> Có event listener onClick</li>
                    <li><strong>Data attributes:</strong> Mỗi element con có data-action và data-id</li>
                    <li><strong>Handler:</strong> Kiểm tra target và thực hiện action tương ứng</li>
                    <li><strong>Ưu điểm:</strong> Ít event listeners, hiệu quả với dynamic content</li>
                </ul>
            </div>
        </div>
    );
}