import { StrictMode } from "react";
//  giúp cảnh báo nếu bạn viết code không tốt
import { createRoot } from "react-dom/client";
// Đây là cách React gắn giao diện vào trang web thật.
import "./index.css";
// import App from "./App.jsx";
import App from "./App_copy_2.jsx";
import TodoList from "./TodoList.jsx";
import UserCard from "./UserCard.jsx";
import State from "./State";


createRoot(document.getElementById("root")).render(
  // Đây là bước nối React vào trang HTML thật sự dòng : <div id="root"></div>
  // render(...) : là hiển thị giao diện React lên màn hình
  // Bạn truyền vào các component mà bạn muốn hiển thị:
  <StrictMode>
    <App />
    <TodoList
      todos={[
        { text: "Learn React", completed: false },
        { text: "Build a project", completed: true },
      ]}
    />
    <State />
  </StrictMode>
);

// Giờ mình sẽ chỉ rõ props trong chính đoạn code của bạn, giải thích từng phần rõ ràng
