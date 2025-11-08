// import ProfileCard from './components/ProfileCard.jsx';
// import './App.css';

// function App() {
//   return (
//     <div>
//       <h1>My Profile Cards</h1>
//       <ProfileCard
//         name="John Doe"
//         age={25}
//         bio="I love coding with React!"
//       />
//       <ProfileCard
//         name="Jane Smith"
//         age={30}
//         bio="Web developer and coffee lover."
//       />
//     </div>
//   );
// }

// export default App;
// function Box({ children }) {
//   return (
//     <div style={{ border: "2px solid blue", padding: "10px" }}>{children}</div>
//   );
// }

// function App() {
//   const name = "Hào";
//   const age = 20;
//   const job = "Lập trình viên";
//   const users = { name: "Hào", age: 20, job: "Lập trình viên" };
//   const usersList = [
//     { name: "Hào", age: 20, job: "Lập trình viên" },
//     { name: "An", age: 22, job: "Designer" },
//     { name: "Bình", age: 19, job: "Student" },
//   ];
//   return (
//     <div>
//       <Box>
//         <h1> Xin Chao ,{name} !</h1>
//         <p>Toi {age >= 18 ? "tren 18" : "duoi 18"} </p>
//         <p>Toi la {job}</p>
//         <p>Toi la {users.name}</p>
//         <p>Toi la {users.age}</p>
//         <p>Toi la {users.job}</p>
//         <button className="btn" onClick={() => alert("Hi!")}>
//           Nhấn tôi
//         </button>
//         <ul>
//           <li>Item 1</li>
//           <li>Item 2</li>
//           <li>Item 3</li>
//         </ul>
//         <ul>
//           {usersList.map((user,index) => (
//             user.age >= 20 ? (
//               <li key = {index}>{user.name} - {user.age} - Người lớn</li>
//             ) : (
//               <li key = {index}>{user.name} -{user.age} - Trẻ vị thành niên</li>
//             )
//           ))}
//         </ul>
//       </Box>
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import Box from './components/Box';
import UserInfo from './components/UserInfo';
import ShowListButton from './components/ShowListButton';
import JobFilter from './components/JobFilter';
import UserList from './components/UserList';
import WelcomeCard from './components/WelcomeCard';

function App() {
  const name = "Hào";
  const age = 20;
  const job = "Lập trình viên";

  const usersList = [
    { id: 1, name: "Hào", age: 20, job: "Lập trình viên" },
    { id: 2, name: "An", age: 22, job: "Designer" },
    { id: 3, name: "Bình", age: 19, job: "Student" },
  ];

  const [selectedJob, setSelectedJob] = useState("all");
  const [showList, setShowList] = useState(false);

  const jobs = ["all", ...new Set(usersList.map(user => user.job))];
  const filteredUsers = usersList.filter(user =>
    selectedJob === "all" ? true : user.job === selectedJob
  );

  return (
    <div>
      <Box>
        <WelcomeCard name="An" age={29}/>
        <WelcomeCard name="Minh" age={33}/>
        
        <UserInfo name={name} age={age} job={job} />
        
        <ShowListButton showList={showList} setShowList={setShowList} />

        {showList && (
          <div>
            <JobFilter 
              jobs={jobs} 
              selectedJob={selectedJob} 
              setSelectedJob={setSelectedJob} 
            />
            <UserList users={filteredUsers} />
          </div>
        )}
      </Box>
    </div>
  );
}

export default App;