import React , { useState } from "react";

function Counter(){
    const [count , setCount] = useState(0);
    const tang =  ()=> {
        setCount(count + 1);
    }
    const tru = () => {
        setCount(count - 1);
    }
    return (
        <div>
            <h1>Counter</h1>
            <p>count : {count}</p>
            <button onClick={tang}>Tang</button>
            <button onClick={tru}>Tru</button>
        </div>
    )
}
export default Counter;
