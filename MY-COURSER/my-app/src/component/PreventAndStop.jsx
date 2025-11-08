export default function PreventAndStop(){
    function handleLink(e){
        e.preventDefault();
        alert('Link click prevented!');  
        console.log('Event after preventDefault:', e);  
    };

    function handleDiv(e){
        alert('Div clicked!');
        console.log('Event after stopPropagation:', e);
    };

    function handleButton(e){
        e.stopPropagation();
        alert('Button clicked, event propagation stopped!');
        console.log('Event after stopPropagation:', e);
    };


    return (
        <div onClick={handleDiv}>
            <a href="https://react.dev" onClick={handleLink}>
            React Link
            </a>
            <button onClick={handleButton}>Stop Propagation</button>
        </div>
    )
}