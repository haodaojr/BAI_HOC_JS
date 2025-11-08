import React, { useState } from "react";

const App6 = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    gender: "",
    city: "",
  });

  const [error, setError] = useState({});

  // 🧩 Khi gõ vào input hoặc chọn giới tính
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError({});
  };

  // 🧩 Kiểm tra dữ liệu
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Tên không được để trống";
    if (!formData.age) newErrors.age = "Tuổi không được để trống";
    if (!formData.address) newErrors.address = "Địa chỉ không được để trống";
    if (!formData.gender) newErrors.gender = "Hãy chọn giới tính";
    if (!formData.city) newErrors.city = "Thành phố không được để trống";
    return newErrors;
  };

  // 🧩 Gửi form
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }

    alert(
      `✅ Thông tin:\nTên: ${formData.name}\nTuổi: ${formData.age}\nĐịa chỉ: ${formData.address}\nGiới tính: ${formData.gender}\nThành phố: ${formData.city}`
    );

    console.log(formData);

    // Reset lại form
    setFormData({
      name: "",
      age: "",
      address: "",
      gender: "",
      city: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Form cập nhật đồng loạt 5trường</h2>
        <label>
          <select value={formData.city} name="city" onChange={handleChange}>
            <option value="">-- Chọn thành phố --</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hải Phòng">Hải Phòng</option>
            <option value="Cần Thơ">Cần Thơ</option>
            <option value="An Giang">An Giang</option>
          </select>
        </label>
        {error.city && <p style={{ color: "red" }}>{error.city}</p>}
        <label>
          Tên:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        {error.name && <p style={{ color: "red" }}>{error.name}</p>}

        <label>
          Tuổi:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </label>
        {error.age && <p style={{ color: "red" }}>{error.age}</p>}

        <label>
          Địa chỉ:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        {error.address && <p style={{ color: "red" }}>{error.address}</p>}

        <fieldset style={{ marginTop: "10px" }}>
          <legend>Giới tính:</legend>

          <label>
            <input
              type="radio"
              name="gender"
              value="Nam"
              checked={formData.gender === "Nam"}
              onChange={handleChange}
            />
            Nam
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Nữ"
              checked={formData.gender === "Nữ"}
              onChange={handleChange}
            />
            Nữ
          </label>

          <label>
            <input
              type="radio"
              name="gender"
              value="Khác"
              checked={formData.gender === "Khác"}
              onChange={handleChange}
            />
            Khác
          </label>
        </fieldset>
        {error.gender && <p style={{ color: "red" }}>{error.gender}</p>}

        <button type="submit">Gửi</button>

        <p>
          <span style={{ color: "green" }}>
            🧾 Dữ liệu hiện tại: {JSON.stringify(formData, null, 2)}
          </span>
        </p>
      </form>
    </div>
  );
};

export default App6;
