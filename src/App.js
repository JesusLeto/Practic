import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Authen from './Components/Authen';
import Post from './Components/Post';
import AddingPostBlock from './Components/AddingPostBlock';
import SelectSort from './Components/SelectSort';
import EditPostBlock from './Components/EditPostBlock';



 function App() {


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
  const [PostForUpdate,setPostForUpdate] = useState(null)
  const [UpdatedPost,setUpdatedPost] = useState(null)



  useEffect(()=>{
        axios.get(process.env.REACT_APP_DB_CONN + `/posts?_expand=user&_sort=${PropertySort}&_order=${KindSort}&_limit=${Fetching? 10:(NumberPage-1)*10 }&_page=${Fetching? NumberPage: ""}`)
        .then((responce) => {if(Fetching){
                          setDB([...DB,...responce.data]); 
                          setNumberPage(prev => prev + 1); 
                          setTotalCount(responce.headers['x-total-count'])}
                        else{
                          setDB(responce.data)
                        }})
                .finally(() => setFetching(false))         
    },[Fetching,NewLike,NewPost,UpdatedPost])

  useEffect(() => {
    if(PropertySort != 'createdAt' || KindSort != 'desc' || ChangeSort!=null){
      setDB([])
      setNumberPage(1)
      setFetching(true)
      setChangeSort(Math.random())
    }
  },[PropertySort,KindSort])

  useEffect( ()=>{
    if(CheckUser)
      axios.get(process.env.REACT_APP_DB_CONN + `/users?login=${CheckUser.login}&password=${CheckUser.password}`)
        .then(({data})=> data.length !== 0 ? setUser(data[0]) : console.log("User not found"))
  },[CheckUser])

  useEffect(() => {
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

        {/* ----------------------------Выбор метода сортировки---------------------------- */}
    <SelectSort setSort = {(newPropertySort, newKindSort) => {setPropertySort(newPropertySort); setKindSort(newKindSort)}}/>


    {User?.role === 'writer' ? <div className = "AddNewPage--Btn" onClick = {() => setShowAddingBlock(true)}>Создать пост</div>: null}

      {/* ----------------------------Блок добавления поста---------------------------- */}
    {ShowAddingBlock ? <AddingPostBlock  WriterId = {User.id} 
                                          NewPost = {Post => setNewPost(Post)} 
                                          CloseAddingBlock = {() => setShowAddingBlock(false)}/>: null}

      {/* ----------------------------Блок аутентификации---------------------------- */}
    {ShowSingIn && <Authen CloseForm = {() => setShowSingIn(false)} SingIn = {User => setCheckUser(User)}/>}
     
      {/* ----------------------------Посты---------------------------- */}
    <Post DB = {DB} 
          RoleUser = {User?.role} 
          User = {User} 
          NewLike = {Like => setNewLike(Like)} 
          PostForUpdate = {PostObj => setPostForUpdate(PostObj)} />

      {/* ----------------------------Блок изменения поста---------------------------- */}
    {PostForUpdate ? <EditPostBlock PostForUpdate = {PostForUpdate} 
                                      NewUpdate = {NewUpdate => setUpdatedPost(NewUpdate)} 
                                      CloseEditPostBlock = {()=> setPostForUpdate(null)}/> 
                                      : null}

    </div>
  );
}

export default App;
