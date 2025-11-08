// import ReactHooksExamples from "./components/Day-1/ReactHooksExamples.jsx";

// function App4() {
//   return (
//     <div>
//       <h1>App4 - React Hooks Examples</h1>
//       <ReactHooksExamples />
//     </div>
//   );
// }

// export default App4;

import { useState } from "react";
import FormExample from "./components/Day-2/FormExample";
import EventHandlingPatterns from "./components/Day-2/EventHandlingPatterns";

function App4() {
  console.log("🔹 App đang render...");
  const [lastClickedId, setLastClickedId] = useState(null);

  const handleEvent = (id) => {
    console.log("🔹 Sản phẩm được click có ID:", id);
    setLastClickedId(id);
    alert(`Bạn vừa click vào sản phẩm có ID: ${id}`);
  };
  const handleEvent2 = (message, e) => [
    console.log("🔹 Sản phẩm được click có message:", message),
    console.log("🔹 Sản phẩm được click có event:", e),
  ];

  const handleInputChange = (fieldName, value , e) =>{
    console.log("fieldName : ",fieldName),
    console.log("value : ",value),
    console.log("event : ",e)
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🧩 React SyntheticEvent & Event Handling Patterns</h2>
      <p>🪄 Sản phẩm bạn vừa chọn: {lastClickedId ?? "Chưa chọn"}</p>

      {/* <button onClick={(e)=>handleEvent2("hello",e)}></button> */}
      <button onClick={handleEvent2("hello")}>Chọn</button>

      <form action="" style={{ margin: '50px' , textAlign:'center' }}>
        <input type="text"placeholder="Username" onChange={(e) => handleInputChange('username',e.target.value,e) } />
        <input type="email" placeholder="Email" onChange={(e) => handleInputChange('email',e.target.value,e) } />
        <input type="password" placeholder="Password" onChange={(e) => handleInputChange('password',e.target.value,e) } />
      </form>

      {/* Form ví dụ riêng */}
      <FormExample />

      {/* Truyền hàm handleEvent xuống component con */}
      <EventHandlingPatterns onClick={handleEvent} />
    </div>

  );
}

export default App4;
