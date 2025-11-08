function CounterButton({onIncrease, onDecrease}){
    return(
        <div>
            <button onClick={onIncrease}>Increase</button>
            <button onClick={onDecrease}>Decrease</button>
        </div>
    )
}
export default CounterButton;