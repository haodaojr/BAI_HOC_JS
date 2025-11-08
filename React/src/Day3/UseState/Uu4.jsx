// import React, { useState } from 'react'

// const Uu4 = () => {
//     const [name,setName] = useState('');
//     const [age,setAge] = useState(0);
//     const handleSubmitForm= (e) =>{
//         e.preventDefault();
//         console.log('Name : ', name);
//         console.log('Age : ', age);
//     }
//   return (
//     <div>
//         <form action="" onSubmit={handleSubmitForm}>
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//             <input type="text" value={age} onChange={(e) => setAge(Number(e.target.value))} />
//             <button type="submit">Submit</button>
//         </form>
//         <p>Tên: {name}, Tuổi: {age}</p>
//     </div>
//   )
// }

// export default Uu4

import React from "react";

const Uu4 = () => {
  const [text, setText] = React.useState("Hello");
  const [name, setName] = React.useState("");

  const handleSetName = () => {
    setName(text); // lấy giá trị hiện tại của text
  };

  return (
    <div>
      <h2>Demo useState với string</h2>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value.trimStart())}
        placeholder="Nhập text ở đây"
      />

      <button onClick={() => setText((prev) => (prev === "" ? "Hello" : prev + "!"))}>
        Update Text
      </button>

      <button onClick={handleSetName}>Set Name</button>

      <div>
        <p>Text hiện tại: {text}</p>
        <p>Name hiện tại: {name}</p>
      </div>
    </div>
  );
};

export default Uu4;
