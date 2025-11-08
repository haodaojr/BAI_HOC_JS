export default  function BasicHandler(){
    function handleClick(e){
        console.log('synthetic event :', e);
        console.log('event target :', e.target);
        console.log('native event :', e.nativeEvent);  
    }

    return(
        <div>
            <button onClick={handleClick}></button>
        </div>
    );
}