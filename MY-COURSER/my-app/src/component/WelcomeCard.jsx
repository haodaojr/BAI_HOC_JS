function WelcomeCard({name,age}){
    return(
        <div style={{ border: "2px solid #2196F3", padding: "10px", borderRadius: "8px" }}>
            <h2>XIn Chao, {name} </h2>
            <p>Tuoi cua ban la: {age}</p>
        </div>
    )
}

export default WelcomeCard;