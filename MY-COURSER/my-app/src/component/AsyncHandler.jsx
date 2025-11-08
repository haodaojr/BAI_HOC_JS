export default function AsyncHandle(){
    async function handleClick(e) {
        e.persist();
        console.log('Before wait : ', e.type);
        await new Promise((r) => setTimeout(r,1000));
        console.log('After wait : ', e.type);
    }

    return(
        <div>
            <button onClick={handleClick}>Click Me To Test AsyncHandle</button>
        </div>
    )
}