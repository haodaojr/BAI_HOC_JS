import React, { useState } from "react";

const Test = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [user, setUser] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(editIndex !== null){
        const upadate = [...user];
        upadate[editIndex] = formData;
        setUser(upadate);
        setEditIndex(null);
        return;
    }else{
        setUser([...user, formData]);
    }
    setFormData({
      name: "",
      email: "",
    });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
  };

  const handleUpdate = (index) =>{
    setFormData(user[index]);
    setEditIndex(index);
  }
  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit}
        style={{ padding: "20px", margin: "20px" }}
      >
        <label htmlFor="">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="nhap ten cua ban vao"
          />
        </label>
        <br />
        <label htmlFor="">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="nhap email cua ban vao"
          />
        </label>
        <br />
        <button type="submit">{editIndex !== null ? "Sửa" : "Thêm"}</button>
      </form>
       <ul>
          {user.map((item, index) => (
            <li key={index}>
              {item.name} - {item.email}
              <button onClick={()=>handleUpdate(index)}>Sửa</button>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Test;
