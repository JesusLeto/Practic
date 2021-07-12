import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Authen from './Components/Authen';
import Post from './Components/Post';


 function App() {


  const [ShowSingIn, setShowSingIn] = useState(false)
  const [CheckUser, setCheckUser] = useState(null)
  const [User, setUser] = useState(null)
  const [DB,setDB] = useState(null)
  const [NewLike, setNewLike] = useState(0)

  console.log("Rerender")
  // console.log("DB", DB)
  // console.log(DB.then(data => data))

  useEffect( ()=>{
    console.log("UseEffect 1")
    if(CheckUser)
      axios.get(`http://localhost:3001/users?login=${CheckUser.login}&password=${CheckUser.password}`)
        .then(({data})=> data.length !== 0 ? setUser(data[0]) : console.log("User not found"))
  },[CheckUser])
  
   useEffect(()=>{
    console.log("UseEffect 2")
        axios.get('http://localhost:3001/posts?_expand=user').then(({data}) => setDB(data))
    },[User, NewLike])



  return (
    <div className="App">


      <div className="header">
        <div className="header--Btn_block">
          {User?.role ? <button className = "header--button Out--Btn" onClick = {() => setUser(null)}>Выход</button>:
           <button className = "header--button Show--Sing--In" onClick = {() => setShowSingIn(true)}>Логин</button>}
        </div>

     {
       ShowSingIn && <Authen CloseForm = {() => setShowSingIn(false)} SingIn = {User => setCheckUser(User)}/>
     }
     
     </div>
     
     <Post DB = {DB} RoleUser = {User?.role} User = {User} NewLike = {(CountClaps) => setNewLike(CountClaps)}/>

    </div>
  );
}

export default App;
