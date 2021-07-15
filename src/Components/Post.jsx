import axios from 'axios';
import React, {useState} from 'react';
import {FaHandsHelping} from 'react-icons/fa'
import PostDelete from './PostDelete';
import PostEdit from './PostEdit';
import './EditBlockStyle.scss';

const AddClap = (Post, NewLike ) => {
    axios.patch("http://localhost:3001/posts/" + Post.id, {claps: Post.claps + 1,})
            .then(({data})=> NewLike(data.claps))
}
        // -----------------Edit Post-----------------
const EditPost = (PostEditId,PostEditTitle,PostEditText,setPostEditId,NewUpdate) =>{
    axios.patch("http://localhost:3001/posts/" + PostEditId,{
        title: PostEditTitle, 
        description: PostEditText,
        updateAt: new Date()})
        .then(() =>{setPostEditId(null); NewUpdate(Math.random())} )
}

const ShowTimeCreatedAndUpdate = (DateCreated) => {
   const interval =  Math.floor((new Date () - new Date(DateCreated))/ 86400000)
   if(interval === 0)
    return "Сегодня"

   const LastNumb = interval.toString().split('').pop()

   switch(LastNumb){
        case '1':
           return `${interval} день назад`
        case '2':
        case '3':
        case '4':
            return `${interval} дня назад`
        default:
            return `${interval} дней назад`
   }
}

const Post = ({DB, RoleUser, User, NewLike, NewUpdate}) =>{

    const [PostEditId,setPostEditId] = useState(null)
    const [PostEditText, setPostEditText] = useState("")
    const [PostEditTitle, setPostEditTitle] = useState("")

    // console.log("EditID",PostEditId)
    
    return(
        <div className = "Post--list">
            {DB ? DB.map((Post,index) => {
                return(
                    <div className = "Post" key = {index}>
                        <div className = "Post--header">{Post.title}</div>
                        <div className = "Post--text">{Post.description}</div> 

                         {RoleUser === 'reader' ? <div className = "Post--Clap">
                         <div className = "Post--Clap__Btn"  onClick = {() => AddClap(Post, NewLike)}> <FaHandsHelping size = "2em" color = "#3371fb"/> </div>
                            <div>{Post.claps}</div>  
                         </div>: null}  

                         {RoleUser === 'writer' && Post.user.id === User.id ? <div className = "Post--Edit">

                            <PostEdit Post = {Post} PostEditId = {EditId => setPostEditId(EditId)} PostEditText = {EditText => setPostEditText(EditText)}
                                                                    PostEditTitle = {EditTitle => setPostEditTitle(EditTitle)}/>
                            <PostDelete PostDeleteId = {Post.id} NewLike = {CheckDelete => NewLike(CheckDelete)} />
                            </div>
                            :null} 
                            <div className="LastUpdate">{ShowTimeCreatedAndUpdate(Post.createdAt)}</div>
                        
                         {Post.id === PostEditId ? <div className = "Wrapper--Edit--block">
                         <div className="Edit--block">
                             <input type="text" className = "Edit--block__tile" value = {PostEditTitle} onChange = {e => setPostEditTitle(e.target.value)} />
                            <textarea className = "Edit--block__input" value = {PostEditText} onChange = {e => setPostEditText(e.target.value)} ></textarea>
                            <button className = "Edit--block__Btn--Update" onClick = {()=> {
                                if(PostEditTitle&&PostEditText)
                                    EditPost(PostEditId, PostEditTitle, PostEditText, setPostEditId, NewUpdate)
                                    else{
                                        alert("Empty input")
                                    }}}>Изменить</button>
                            <button className = "Edit--block__Btn--Cancer" onClick = {()=>setPostEditId(null)}>Отмена</button>
                            </div>

                         </div> : null}

                        </div>
                    )
            }): null}
        </div>
    )
}

export default Post;