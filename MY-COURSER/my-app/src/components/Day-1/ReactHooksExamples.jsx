import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useContext,
  useReducer,
  useLayoutEffect,
} from "react";

/*
╔══════════════════════════════════════════════════════════════════════════════╗
║  REACT HOOKS - HƯỚNG DẪN HOÀN CHỈNH CHO NGƯỜI MỚI 100%                      ║
║                                                                              ║
║  Tài liệu này được thiết kế để BẤT CỨ AI - kể cả người CHƯA học lập trình  ║
║  - đều có thể hiểu và áp dụng được React Hooks vào dự án thực tế.          ║
║                                                                              ║
║  📚 Cấu trúc: Prerequisites → Từng Hook với giải thích chi tiết → Thực hành ║
╚══════════════════════════════════════════════════════════════════════════════╝
*/

/*
═══════════════════════════════════════════════════════════════════════════════
PHẦN 0: KIẾN THỨC CẦN CÓ TRƯỚC KHI HỌC HOOKS (PREREQUISITES)
═══════════════════════════════════════════════════════════════════════════════

⚠️ QUAN TRỌNG: Bạn PHẢI hiểu các khái niệm sau trước khi học Hooks!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1️⃣ DESTRUCTURING (Phân rã) - Cú pháp lấy giá trị từ Array/Object
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ví dụ KHÔNG dùng destructuring:
  const arr = [1, 2];
  const first = arr[0];    // Lấy phần tử đầu
  const second = arr[1];   // Lấy phần tử thứ 2

Ví dụ DÙNG destructuring (Cách viết ngắn gọn hơn):
  const [first, second] = [1, 2];
  // first = 1, second = 2

  ⚡ Hooks dùng cú pháp này RẤT NHIỀU!
  const [count, setCount] = useState(0);
  //     ↑       ↑
  //   biến    hàm thay đổi biến

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2️⃣ ARROW FUNCTION (Hàm mũi tên) - Cách viết function ngắn gọn
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cách viết CŨ:
  function sayHello() {
    console.log("Hello");
  }

Cách viết MỚI (arrow function):
  const sayHello = () => {
    console.log("Hello");
  }

  ⚡ Trong Hooks, bạn sẽ thấy: () => { ... } rất nhiều!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3️⃣ CALLBACK - Hàm được truyền vào hàm khác
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ví dụ:
  setTimeout(() => {
    console.log("Chạy sau 1 giây");
  }, 1000);

  // () => { console.log(...) } là callback
  // setTimeout sẽ GỌI callback này sau 1 giây

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4️⃣ JSX - Viết HTML trong JavaScript
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSX KHÔNG phải HTML! Nó CHỈ GIỐNG HTML.

Khác biệt quan trọng:
  HTML:    <button onclick="...">     (chữ thường)
  JSX:     <button onClick={...}>     (viết hoa chữ C)

  HTML:    <div class="box">
  JSX:     <div className="box">      (class → className)

Nhúng JavaScript vào JSX bằng dấu { }:
  const name = "An";
  return <h1>Xin chào {name}</h1>;  // Hiển thị: Xin chào An

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5️⃣ COMPONENT - Khối xây dựng của React
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Component là 1 hàm trả về JSX (giao diện).

Ví dụ:
  function Welcome() {
    return <h1>Xin chào!</h1>;
  }

  // Dùng component:
  <Welcome />  // Hiển thị: Xin chào!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6️⃣ RE-RENDER - React vẽ lại giao diện
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Khi dữ liệu thay đổi → React vẽ lại component → Giao diện cập nhật.

⚠️ Biến thường (let/const) KHÔNG làm React vẽ lại!
⚡ Hooks (như useState) GIÚP React biết khi nào cần vẽ lại!

OK! Bây giờ bạn đã sẵn sàng học Hooks! 🚀
*/

/*
═══════════════════════════════════════════════════════════════════════════════
HOOK #1: useState - Lưu trữ dữ liệu có thể thay đổi
═══════════════════════════════════════════════════════════════════════════════

📌 useState LÀM GÌ?
   - Tạo một "biến đặc biệt" có thể thay đổi
   - Khi biến thay đổi → React TỰ ĐỘNG vẽ lại giao diện

📌 TẠI SAO KHÔNG DÙNG let/const?
   Ví dụ SAI:
     let count = 0;
     count = count + 1;  // Biến thay đổi
     // ❌ Nhưng giao diện KHÔNG cập nhật!

   Ví dụ ĐÚNG:
     const [count, setCount] = useState(0);
     setCount(count + 1);  // ✅ Giao diện cập nhật!

📌 CÚ PHÁP:
   const [tênBiến, hàmThayĐổi] = useState(giáTriBanĐầu);

   Giải thích:
   - tênBiến: Tên bạn đặt cho biến (ví dụ: count, name, isOpen)
   - hàmThayĐổi: Hàm để thay đổi biến (quy ước: set + TênBiến viết hoa chữ cái đầu)
   - giáTriBanĐầu: Giá trị khi component mới xuất hiện (số, chuỗi, boolean, array, object...)

📌 QUY TẮC ĐẶT TÊN:
   ✅ ĐÚNG: const [count, setCount] = useState(0);
   ✅ ĐÚNG: const [name, setName] = useState("");
   ✅ ĐÚNG: const [isOpen, setIsOpen] = useState(false);
   ❌ SAI:  const [count, updateCount] = useState(0);  // Nên dùng setCount
*/

function UseStateBasicExample() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHÂN TÍCH TỪNG PHẦN của dòng code này:
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [count, setCount] = useState(0);

  // 1. const - Khai báo biến không đổi (nhưng count có thể đổi qua setCount)
  // 2. [count, setCount] - Destructuring: Lấy 2 giá trị từ useState
  //    - count: Biến lưu giá trị hiện tại (ban đầu = 0)
  //    - setCount: Hàm để thay đổi count
  // 3. = - Gán giá trị
  // 4. useState(0) - Gọi hook useState với giá trị ban đầu là 0
  //    useState TRẢ VỀ một array [giáTriHiệnTại, hàmThayĐổi]

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #4CAF50",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>useState - Ví dụ cơ bản: Đếm số</h3>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HIỂN THỊ giá trị count */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        Số đếm: {count}
        {/* Dấu {} để nhúng JavaScript vào JSX */}
        {/* count là biến, giá trị sẽ hiển thị ở đây */}
      </p>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* NÚT TĂNG */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <button onClick={() => setCount(count + 1)}>
        {/* onClick: Sự kiện khi click chuột
            () => setCount(count + 1): Arrow function gọi setCount với giá trị mới
            setCount(count + 1): Cập nhật count = count + 1, trigger re-render */}
        Tăng (+1)
      </button>

      <button
        onClick={() => setCount(count - 1)}
        style={{ marginLeft: "10px" }}
      >
        Giảm (-1)
      </button>

      <button onClick={() => setCount(0)} style={{ marginLeft: "10px" }}>
        Reset về 0
      </button>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LƯU Ý QUAN TRỌNG */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#FFF3CD",
          borderRadius: "5px",
        }}
      >
        <strong>⚠️ Lưu ý:</strong>
        <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
          <li>
            KHÔNG được thay đổi count trực tiếp: <code>count = 5</code> ❌
          </li>
          <li>
            PHẢI dùng setCount: <code>setCount(5)</code> ✅
          </li>
          <li>setCount KHÔNG thay đổi ngay lập tức (React xử lý sau)</li>
        </ul>
      </div>
    </div>
  );
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
useState - VÍ DỤ THỰC TẾ: Form nhập liệu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Đây là ví dụ BẠN SẼ DÙNG NHIỀU NHẤT trong thực tế!
*/

function UseStateFormExample() {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Tạo 2 state: một cho tên, một cho email
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const [name, setName] = useState(""); // Chuỗi rỗng ban đầu
  const [email, setEmail] = useState(""); // Chuỗi rỗng ban đầu

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #2196F3",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>useState - Form nhập liệu (Thực tế)</h3>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* INPUT NHẬP TÊN */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div>
        <label>Tên của bạn:</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên..."
          style={{ padding: "5px", width: "250px", marginTop: "5px" }}
        />
        {/* value={name}: Giá trị hiển thị = biến name
           onChange={(e) => setName(e.target.value)}: Khi gõ → cập nhật name */}
      </div>

      <div style={{ marginTop: "15px" }}>
        <label>Email của bạn:</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email..."
          style={{ padding: "5px", width: "250px", marginTop: "5px" }}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HIỂN THỊ KẾT QUẢ */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#E3F2FD",
          borderRadius: "5px",
        }}
      >
        <strong>📝 Thông tin bạn đã nhập:</strong>
        <p>Tên: {name || "(chưa nhập)"}</p>
        <p>Email: {email || "(chưa nhập)"}</p>
        {/* name || "(chưa nhập)": Nếu name rỗng → hiển thị "(chưa nhập)" */}
      </div>
    </div>
  );
}

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
useState - LỖI PHỔ BIẾN VÀ CÁCH TRÁNH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

function UseStateCommonMistakes() {
  const [count, setCount] = useState(0);

  // ❌ LỖI 1: Thay đổi state trực tiếp
  const wrongWay = () => {
    // count = count + 1;  // ❌ KHÔNG BAO GIỜ làm thế này!
    // Giao diện SẼ KHÔNG cập nhật!
  };

  // ✅ ĐÚNG: Dùng hàm set
  const correctWay = () => {
    setCount(count + 1); // ✅ Đúng!
  };

  // ❌ LỖI 2: Gọi nhiều setState liên tiếp
  const wrongMultipleUpdates = () => {
    setCount(count + 1); // count = 1
    setCount(count + 1); // count VẪN = 1 (vì count chưa cập nhật!)
    setCount(count + 1); // count VẪN = 1
    // Kết quả: Chỉ tăng 1 thay vì 3!
  };

  // ✅ ĐÚNG: Dùng updater function
  const correctMultipleUpdates = () => {
    setCount((c) => c + 1); // c là giá trị MỚI NHẤT
    setCount((c) => c + 1); // c đã được cập nhật
    setCount((c) => c + 1); // c đã được cập nhật
    // Kết quả: Tăng 3! ✅
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #F44336",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>useState - Lỗi phổ biến</h3>
      <p>Count: {count}</p>

      <button onClick={correctWay}>Tăng 1 (Đúng)</button>
      <button onClick={correctMultipleUpdates} style={{ marginLeft: "10px" }}>
        Tăng 3 (Đúng)
      </button>

      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#FFEBEE",
          borderRadius: "5px",
        }}
      >
        <strong>🚫 CẤM làm:</strong>
        <pre
          style={{
            backgroundColor: "#FFF",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          {`// ❌ SAI:
count = count + 1;

// ❌ SAI:
setCount(count + 1);
setCount(count + 1);  // Không tăng 2 lần!

// ✅ ĐÚNG:
setCount(c => c + 1);
setCount(c => c + 1);  // Tăng 2 lần!`}
        </pre>
      </div>
    </div>
  );
}

/*
═══════════════════════════════════════════════════════════════════════════════
HOOK #2: useEffect - Chạy code "bên lề" (Side Effects)
═══════════════════════════════════════════════════════════════════════════════

📌 useEffect LÀM GÌ?
   - Chạy code SAU KHI component hiển thị lên màn hình
   - Dùng cho: Gọi API, timer, đổi title trang, lắng nghe events...

📌 TẠI SAO CẦN useEffect?
   ❌ KHÔNG nên viết trực tiếp trong component:
     function MyComponent() {
       fetch("https://api.com/data");  // ❌ Chạy MỖI LẦN render!
       return <div>Hello</div>;
     }

   ✅ ĐÚNG: Dùng useEffect:
     function MyComponent() {
       useEffect(() => {
         fetch("https://api.com/data");  // ✅ Chỉ chạy khi cần!
       }, []);
       return <div>Hello</div>;
     }

📌 CÚ PHÁP:
   useEffect(() => {
     // Code chạy sau khi render

     return () => {
       // Cleanup: Dọn dẹp trước khi component biến mất
     };
   }, [dependencies]);

   - dependencies: Mảng các biến, khi biến thay đổi → Chạy lại effect
   - [] rỗng: Chỉ chạy 1 lần khi component xuất hiện
   - [variable]: Chạy khi variable thay đổi
   - undefined: Chạy sau MỖI lần render (nguy hiểm!)
*/

function UseEffectBasicExample() {
  const [data, setData] = useState("Đang tải...");

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHÂN TÍCH useEffect này:
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  useEffect(() => {
    console.log("🔄 useEffect đang chạy...");

    // Giả lập gọi API: Sau 2 giây sẽ có dữ liệu
    const timer = setTimeout(() => {
      setData("✅ Dữ liệu từ API đã tải xong!");
    }, 2000);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // CLEANUP FUNCTION - QUAN TRỌNG! (Dọn dẹp)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    return () => {
      clearTimeout(timer); // Xóa timer nếu component bị unmount
      console.log("🧹 Cleanup: xóa timer để tránh memory leak");
    };
  }, []); // []: Chỉ chạy 1 lần khi component mount

  return (
    <div
      style={{
        padding: "20px",
        border: "2px solid #FF9800",
        margin: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>useEffect - Ví dụ cơ bản: Tải dữ liệu</h3>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* HIỂN THỊ TRẠNG THÁI TẢI DỮ LIỆU */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        {data}
        {/* Ban đầu: "Đang tải..."
           Sau 2 giây: "✅ Dữ liệu từ API đã tải xong!" */}
      </p>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* LƯU Ý QUAN TRỌNG */}
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        style={{
          marginTop: "15px",
          padding: "10px",
          backgroundColor: "#FFF3E0",
          borderRadius: "5px",
        }}
      >
        <strong>⚠️ Quan trọng:</strong>
        <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
          <li>useEffect chạy SAU KHI component render xong</li>
          <li>Cleanup function chạy khi component bị xóa</li>
          <li>Không có cleanup → Memory leak (rò rỉ bộ nhớ)</li>
          <li>Mở Console (F12) để xem log!</li>
        </ul>
      </div>
    </div>
  );
}

// Component chính
function ReactHooksExamples() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🎓 React Hooks - Khóa Học Hoàn Chỉnh</h1>
      <p>Đây là tài liệu học chi tiết cho người mới bắt đầu hoàn toàn!</p>

      <UseStateBasicExample />
      <UseStateFormExample />
      <UseStateCommonMistakes />
      <UseEffectBasicExample />
    </div>
  );
}

export default ReactHooksExamples;
