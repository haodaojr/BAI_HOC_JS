function Aso({datas}){
    return(
        <div>
            {datas.map((data)=>(
                <div key={data.id}>
                    <h3>{data.name}</h3>
                    <p>{data.age}</p>
                </div>
            ))}
        </div>
    )
}
export default Aso;