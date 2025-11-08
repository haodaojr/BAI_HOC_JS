import React from "react";
import Header from "./components/Header/Header";
import './App.css';
import UserCard from "./UserCard";

function App(){
  const handleGreet = (name, age, city) => {
    alert(`Xin chào ${name}, Tuổi: ${age} , Thành phố: ${city}`);
  }
  return(
    <div className="App">
      <h1>Danh sách người dùng</h1>
      <UserCard name="Nguyễn Văn A" age={20} city="Hà Nội" 
       onGreet = {() => handleGreet("Nguyễn Văn A","20", "Hà Nội")}
       />
       <UserCard name = "Nguyen Thi Van B" age = {25} city = "Hồ Chí Minh"
       onGreet = {() => handleGreet("Nguyen Thi Van B", "25", "Hồ Chí Minh")}
       />
       <UserCard name = "Nguyen Van C" age = {30} city = "Hà Tĩnh"
       onGreet = {() => handleGreet("Nguyen Van C", "30", "Hà Tĩnh")}
       />
    </div>
  )
}

export default App;




// function App(){
//   return (
//     <div className="App">
//      <Header title="My React App" />
//       <main>
//         <h2>Welcome to my app</h2>
//       </main>
//     </div>
//   );
// }

// export default App;