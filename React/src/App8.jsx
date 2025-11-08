import React, { useState } from "react";

const App8 = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userAge: "",
    userAddress: "",
    userGender: "",
    userCity: "",
  });

  // const [error, setError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `userName: ${formData.userName}, userAge: ${formData.userAge}, userAddress: ${formData.userAddress}, userGender: ${formData.userGender}, userCity: ${formData.userCity}`
    );
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <input
            type="text"
            name="userAge"
            value={formData.userAge}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <input
            type="text"
            name="userAddress"
            value={formData.userAddress}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <input
            type="radio"
            name="userGender"
            value="male"
            checked={formData.userGender === "male"}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <input
            type="radio"
            name="userGender"
            value="female"
            checked={formData.userGender === "female"}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <input
            type="radio"
            name="userGender"
            value="other"
            checked={formData.userGender === "other"}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="">
          <select name="userCity" id="" value={formData.userCity} onChange={handleChange}>
            <option value="HN">-- HN --</option>
            <option value="HCM">-- HCM --</option>
            <option value="TB">-- TB --</option>
            <option value="DT">-- DT --</option>
            <option value="GL">-- GL --</option>
          </select>
        </label>
      </form>
      <p>{JSON.stringify(formData, null, 2)}</p>
    </div>
  );
};

export default App8;
