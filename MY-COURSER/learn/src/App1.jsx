// import { useState } from "react";

// export function App1() {
//   const [useName, setUsename] = useState("");
//   const [usePassword, setPassword] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "useName") {
//       setUsename(value);
//     } else if (name === "usePassword") {
//       setPassword(value);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("login :", { useName, usePassword });
//   };  

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       console.log("Enter key pressed");
//     }
//   };
//   return (
//     <div>
//       <form value={{useName}} onSubmit={handleSubmit}>
//         <input name="useName" value={useName} type="text" onChange={handleInputChange} onKeyPress={handleKeyPress} />
//         <input name="usePassword" value={usePassword} onChange={handleInputChange} onKeyPress={handleKeyPress} />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }



export function App1() {
  const handleDelegation = (e) =>{
    if(e.target.tagName === 'BUTTON'){
      console.log("Bạn chọn : ",e.target.textContent);
    }
  }
  return(
    <div onClick={handleDelegation}>
      <button>🧃 Coffee </button>
      <button>🍵 Tea </button>
      <button>🥤 Milk </button>
    </div>
  )
 }