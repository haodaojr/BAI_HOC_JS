import React, { useState } from 'react'

const Uu3 = () => {
    const [name, setName] = useState('');
  return (
    <div>
        <input type="text"value={name} onChange={(e)=>setName(e.target.value)} />
        <p>{name}</p>
    </div>
  )
}

export default Uu3