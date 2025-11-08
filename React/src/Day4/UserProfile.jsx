// import React, { useState } from "react";

// const UserProfile = () => {
//   const [user, setUser] = useState({
//     name: "John Doe",
//     age: 30,
//     address: {
//       city: "Hà Nội",
//       street: "Trần Duy Hưng",
//     },
//   });

//   const increaseAge = () => {
//     setUser({
//       ...user,
//       age: user.age + 1,
//       // address: {
//       //   ...user.address,
//       //   street : "Nguyễn Trãi",
//       // }
//     });
//   };

//   const increaseAddress = () => {
//     setUser({
//       ...user,
//       address: {
//         ...user.address,
//         street: user.address.street === "Trần Duy Hưng" ? "Nguyễn Trãi" : "Trần Duy Hưng",
//       },
//     });
//   };

//   return (
//     <div>
//       <h2>👤 Thông tin người dùng</h2>
//       <p>Tên: {user.name}</p>
//       <p>Tuổi: {user.age}</p>
//       <p>Địa chỉ: {user.address.city}, {user.address.street}</p>
//       <button onClick={increaseAge}>Tăng tuổi</button>
//       <button onClick={increaseAddress}>Địa chỉ</button>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Hào",
    age: 22,
    address: {
      city: "Hà Nội",
      street: "Trần Duy Hưng",
      location: {
        lat: 21.0278,
        lng: 105.8342,
      },
    },
  });

  const changeStreet = () => {
    setUser({
      ...user,
      address: {
        ...user.address,
        street:
          user.address.street === "Trần Duy Hưng"
            ? "Nguyễn Trãi"
            : "Trần Duy Hưng",
      },
    });
  };

  const moveLocation = () => {
    setUser({
      ...user,
      address: {
        ...user.address,
        location: {
          ...user.address.location,
          lat: user.address.location.lat + 0.001,
          lng: user.address.location.lng + 0.001,
        },
      },
    });
  };

  return (
    <div>
      <div>
        <h3>👤 {user.name}</h3>
        <p>Tuổi: {user.age}</p>
        <p>
          Địa chỉ: {user.address.city}, {user.address.street}
        </p>
        <p>
          Toạ độ: ({user.address.location.lat}, {user.address.location.lng})
        </p>

        <button onClick={changeStreet}>Đổi tên đường</button>
        <button onClick={moveLocation}>Di chuyển vị trí</button>
      </div>
    </div>
  );
};

export default UserProfile;
