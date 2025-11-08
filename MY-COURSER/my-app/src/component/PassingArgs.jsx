export default function PassingArgs(){
    function handleClick(name,e){
        console.log(`hello ${name}`),
        console.log('NativeEvent :' ,e.nativeEvent);
    }
    return(
        <div>
            <button onClick={(e)=>handleClick('Kenn',e)}>Click Me</button>
            <button onClick={handleClick.bind(null,'Alex')}>Click Me Too</button>
        </div>
    );
}