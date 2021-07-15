import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Authen from './Components/Authen';
import Post from './Components/Post';
import AddingPostBlock from './Components/AddingPostBlock';
import SelectSort from './Components/SelectSort';


 function App() {

  console.log("RERENDER")

  const [ShowSingIn, setShowSingIn] = useState(false)
  const [CheckUser, setCheckUser] = useState(null)
  const [User, setUser] = useState(null)
  const [DB,setDB] = useState([])
  const [NewLike, setNewLike] = useState(0)
  const [ShowAddingBlock,setShowAddingBlock] = useState(false)
  const [NewPost, setNewPost] = useState(null)
  const [PropertySort, setPropertySort] = useState('createdAt')
  const [KindSort, setKindSort] = useState('desc')
  const [NumberPage,setNumberPage] = useState(1)
  const [Fetching, setFetching] = useState(true)
  const [TotalCount, setTotalCount] = useState(0)
  const [ChangeSort, setChangeSort] = useState(null)
  const [UpdatedPost,setUpdatedPost] = useState(null)

  console.log(NewLike)

  //--------------------В useEffect 1 изменяет стейты не одновременно--------------------

  useEffect(()=>{
    console.log("UseEffect 1")
    if(Fetching)
      axios.get(`http://localhost:3001/posts?_expand=user&_sort=${PropertySort}&_order=${KindSort}&_limit=10&_page=${NumberPage}`)
      .then((responce) => {setDB([...DB,...responce.data]); setNumberPage(prev => prev + 1); setTotalCount(responce.headers['x-total-count'])})
              .finally(() => setFetching(false))         
  },[ChangeSort,Fetching])

  useEffect(()=> {
    if(NewLike || NewPost || UpdatedPost)
      axios.get(`http://localhost:3001/posts?_expand=user&_sort=${PropertySort}&_order=${KindSort}&_limit=${(NumberPage-1)*10}`) //ПОФИКСИИИИТЬ
      .then(({data}) => setDB(data))
  },[NewLike,NewPost,UpdatedPost])

  // --------------------------------------------------------------------------------

  useEffect(() => {
    if(PropertySort != 'createdAt' || KindSort != 'desc' || ChangeSort!=null){
      setDB([])
      setNumberPage(1)
      setFetching(true)
      setChangeSort(Math.random())
    }
  },[PropertySort,KindSort])


  useEffect( ()=>{
    console.log("UseEffect 2")
    if(CheckUser)
      axios.get(`http://localhost:3001/users?login=${CheckUser.login}&password=${CheckUser.password}`)
        .then(({data})=> data.length !== 0 ? setUser(data[0]) : console.log("User not found"))
  },[CheckUser])

  useEffect(() => {
    console.log("UseEffect 3")
    document.addEventListener('scroll', scrollHadler)
    return function() {
      document.removeEventListener('scroll', scrollHadler)
    }
  },[Fetching])
  
  const scrollHadler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && DB.length < TotalCount){
        setFetching(true)
    }
  }
  


  

  return (
    <div className="App">
      <div className="header">
        <div className="header--Btn_block">
          {
            User?.role ? <button className = "header--button Out--Btn" onClick = {() => setUser(null)}>Выход</button>:
            <button className = "header--button Show--Sing--In" onClick = {() => setShowSingIn(true)}>Логин</button>
          }
        </div>
     </div>
{/* ------------------------------------------------------ */}
    
      <SelectSort setSort = {(newPropertySort, newKindSort) => {setPropertySort(newPropertySort); setKindSort(newKindSort)}}/>

{/* ------------------------------------------------------ */}
     {User?.role === 'writer' ? <div className = "AddNewPage--Btn" onClick = {() => setShowAddingBlock(true)}>Создать пост</div>: null}

     {ShowAddingBlock ? <AddingPostBlock WriterId = {User.id} NewPost = {Post => setNewPost(Post)} CloseAddingBlock = {() => setShowAddingBlock(false)}/>: null}

     {ShowSingIn && <Authen CloseForm = {() => setShowSingIn(false)} SingIn = {User => setCheckUser(User)}/>}
     
     
     <Post DB = {DB} RoleUser = {User?.role} User = {User} NewLike = {(CountClaps) => {setNewLike(CountClaps)}} NewUpdate = {NewUpdate => setUpdatedPost(NewUpdate)}/>

    </div>
  );
}

export default App;
