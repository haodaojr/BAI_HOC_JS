function UserProfile({name, age, job, isOnline, onStatusToggle}){

    return(
        <div>
            <h1>{name} ({isOnline ? "online" : "offline"})</h1>
            <p>{job}</p>
            <p>tuổi: {age}</p>
            <button onClick={() => onStatusToggle(!isOnline)}>Đổi trạng thái</button>
            <button onClick={()=> alert(`Xin chào, ${name}`)}>Click Me Plz</button>
        </div>
    )
}
export default UserProfile; 