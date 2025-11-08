// App2.jsx
import { useEffect, useState } from "react";
import ChaoHoi from "./components/ChaoHoi";
import Array from './components/Day-1/Arary';
import Object from './components/Day-1/Object';
import Aso from './components/Day-1/AsO';


function App2() {
  const [address, setAddress] = useState("TP HCM");
  const info = {name: "Hào", age: 20, job: "Lập trình viên"};
  const items = ['JavaScript','PHP','Dart','Java','Python'];
  const users = [
    { id: 1, name: "Lan", age: 20 },
    { id: 2, name: "Hào", age: 25 },
    { id: 3, name: "Minh", age: 30 }
  ];

  useEffect(() => {
    console.log("Address đã được cập nhật:", address);
  });
  // hook useEffect  mỗi khi giá trị address thay đổi (từ phía cha gửi xuống hoặc từ cha cập nhật state),
  // effect sẽ chạy sau chu trình render và thực thi console.log với giá trị mới của address.
  // Cụ thể:

  // Ban đầu: address có giá trị ban đầu (ví dụ "TP HCM").
  // Khi bạn nhấn nút Change và gọi setAddress("Ha Noi") từ cha:
  // React sẽ cập nhật state, lên lịch render lại.
  // Sau khi render xong, useEffect có dependencies là [address] sẽ chạy với address đã cập nhật.
  // console.log("Address đã được cập nhật:", address) sẽ in ra giá trị mới, ví dụ Ha Noi

  return (
    <div>
      <ChaoHoi
        job="Sinh vien"
        age={20}
        address={address}
        onAddressChange={setAddress}
      />
      <ChaoHoi
        name="Nguyen Van B"
        job="Giao vien"
        age={30}
        address={address}
        onAddressChange={setAddress}
      />
      <ChaoHoi
        name="Nguyen Van C"
        job="Lao dong"
        age={15}
        address={address}
        onAddressChange={setAddress}
      />
      <ChaoHoi address={address} onAddressChange={setAddress} />

      <Array items={items}/>
      <Object info={info}/>
      <Aso datas={users}/>
    </div>
  );
}

export default App2;
