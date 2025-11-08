import React, { useState } from 'react'

const Uu2 = () => {
    const [name,setName] = useState('');
    const [age,setAge] = useState(0);
    const handleSubmit = (e) =>{
        e.prevenentDefault();
        console.log('Name : ', name);
        console.log('Age : ', age);
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) =>setName(e.target.value)} />
            <input type="text" value={age} onChange={(e) =>setAge(Number(e.target.value))} />
            <button type="submit">Submit</button>
        </form>
        <p>Tên: {name}, Tuổi: {age}</p>
    </div>
  )
}

export default Uu2