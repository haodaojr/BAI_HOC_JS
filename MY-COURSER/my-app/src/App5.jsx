function App5(){
  const isLoggedIn = true;
  return(
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>}
  </div>
  )
}
export default App5;
