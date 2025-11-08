// import React from 'react';
// import { DelegationDemo } from './component/DelegationDemo';

// export default function App1_1() {
//     return(
//         <DelegationDemo />
//     )
// }

import {useState} from 'react';

export default function App1_1(){
    const [name,setName] = useState('Khach');
    const [isOn , setIsOn] = useState(false);

    return(
        <div>
            <p>Xin chào, {name}!</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <p>Bong den dang bat - tat : {isOn ? 'On' :'Off'}</p>
            <button onClick={() => setIsOn(!isOn)}>Chuyển trạng thái</button>
        </div>
    )
}