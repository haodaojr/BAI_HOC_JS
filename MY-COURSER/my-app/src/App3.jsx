import { useEffect, useState } from "react";
import CounterButton from "./components/Day-1/CounterButton.jsx";
import Button from "./components/Day-1/Button.jsx";
import Welcome from "./components/Day-1/Welcome.jsx";
import UserProfile from "./components/Day-1/UserProfile.jsx";
// import EventExamples from "./components/Day-1/EventExamples.jsx";
function App3() {
  const [count, setCount] = useState(0);
  const [StatusToggle, setStatusToggle] = useState(true);
  const user = { name: "Hào Đào", loggedIn: false };
  useEffect(()=>{
    console.log("isOnline đã được sau khi cập nhật : ", StatusToggle);
  }, [StatusToggle])

  useEffect(()=>{
    document.title= 'Bạn đã click ' + count + ' lần';
  }, [count])
  function handleIncrease() {
    setCount(count + 1);
    }
  function handleDecrease() {
    setCount(count - 1);
  }
  return (
    <div>
      <h2>Giá trị hiện tại: {count}</h2>
      <CounterButton onIncrease={handleIncrease} onDecrease={handleDecrease} />
      <Button/>
      <Button label="Xóa" color="red" />
      <Button size="large" />
      <Welcome isLoggedIn={user.loggedIn} userName={user.name} />
      <UserProfile name="Hào Đào" age={18} job="Developer" isOnline={StatusToggle} onStatusToggle={setStatusToggle}  />
      {/* <EventExamples /> */}
    </div>
  );
}
export default App3;