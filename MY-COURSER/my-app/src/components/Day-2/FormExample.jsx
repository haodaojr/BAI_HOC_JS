import { useState } from "react";
function FormExample(){
    const [name,setName] = useState("");
    const handleSubmit = (event) =>{
        event.preventDefault();
        alert(`Tên của bạn là: ${name}`);
        console.log("🔹 Form submit event:",event);
        console.log("🔹 Form submit event type:",event.type);
        console.log("🔹 Form submit event target:",event.target.elements);
        console.log("🔹 Form submit event target value:",event.target.elements[0].value);
    };

    return(
        <div style={{ textAlign:'center', marginTop:'50px', color:'yellowgreen' }}>
            <form action="" onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhap Vào Tôi Đi" />
            </form>
        </div>
    )
}
export default FormExample;