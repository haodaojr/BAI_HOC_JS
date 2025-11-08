// export function App1_1(){
//   const xoasanpham = (id,ten) =>{
//     console.log(`Xóa sản phẩm : ID = ${id} , Tên = ${ten}`);
//   };
//   return(
//     <div>
//       <button onClick={()=>xoasanpham(1,"Ao Thun")}>Xoá sản phẩm 1</button>
//       <button onClick={()=>xoasanpham(2,"Quan Jean")}>Xoá sản phẩm 2</button>
//     </div>
//   )
// }

// Ưu điểm:

// Dễ đọc, dễ hiểu
// Có thể truyền nhiều tham số
// Có thể truy cập event object

// Nhược điểm:

// Tạo function mới mỗi lần render (có thể ảnh hưởng hiệu suất)

// export function App1_1(){
//   const xoasanpham = (id,ten) =>{
//     console.log(`Xóa sản phẩm : ID = ${id} , Tên = ${ten}`);
//   };
//   return(
//     <div>
//       <button onClick={()=>xoasanpham(1,"Ao Thun")}>Xoá sản phẩm 1</button>
//       <button onClick={()=>xoasanpham(2,"Quan Jean")}>Xoá sản phẩm 2</button>
//     </div>
//   )
// }


import React from "react";

export function App1_1() {
  // Hàm xử lý khi form được submit
  const handleSubmit = (event) => {
    event.preventDefault(); // ❌ Ngăn reload trang (preventDefault)
    console.log("Form submitted!");
    alert("Đặt món thành công!");
  };

  // Hàm xử lý khi tên thay đổi
  const handleNameChange = (event) => {
    console.log("SyntheticEvent:", event); // 🧠 React tạo ra đối tượng SyntheticEvent
    console.log("Tên người dùng:", event.target.value);
  };

  // Hàm xử lý khi chọn món
  const handleSelect = (event) => {
    console.log("Món được chọn:", event.target.value);
  };

  // Hàm xử lý khi click nút xóa (có truyền parameter)
  const handleDelete = (foodName, event) => {
    event.stopPropagation(); // ⚠️ Ngăn không cho click lan sang div cha (stopPropagation)
    alert(`Đã xoá món: ${foodName}`);
  };

  // Event delegation: lắng nghe click từ cha bao quanh các item
  const handleMenuClick = (event) => {
    if (event.target.tagName === "LI") {
      alert(`Bạn vừa chọn món: ${event.target.textContent}`);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>🍱 Đặt món ăn</h2>

      {/* 🧾 Form */}
      <form onSubmit={handleSubmit}>
        <label>
          Tên của bạn:
          <input type="text" onChange={handleNameChange} />
        </label>
        <br /><br />

        <label>
          Chọn món:
          <select onChange={handleSelect}>
            <option>Bún bò</option>
            <option>Phở gà</option>
            <option>Cơm tấm</option>
          </select>
        </label>
        <br /><br />

        <button type="submit">Đặt món</button>
      </form>

      <hr />

      {/* 🍔 Danh sách món ăn (dùng event delegation) */}
      <h3>Menu hôm nay:</h3>
      <ul onClick={handleMenuClick} style={{ cursor: "pointer" }}>
        <li>
          Pizza{" "}
          <button onClick={(e) => handleDelete("Pizza", e)}>Xóa</button>
        </li>
        <li>
          Bánh mì{" "}
          <button onClick={(e) => handleDelete("Bánh mì", e)}>Xóa</button>
        </li>
        <li>
          Cơm rang{" "}
          <button onClick={(e) => handleDelete("Cơm rang", e)}>Xóa</button>
        </li>
      </ul>
    </div>
  );
}
