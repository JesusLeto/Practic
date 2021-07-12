import axios from 'axios';
import React, {useState} from 'react';
import {FaHandsHelping} from 'react-icons/fa'
import PostDelete from './PostDelete';

import PostEdit from './PostEdit';

const AddClap = (Post, NewLike ) => {
    axios.patch("http://localhost:3001/posts/" + Post.id, {claps: Post.claps + 1,})
            .then(({data})=> NewLike(data.claps))
}

const EditPostText = (PostEditId,PostEditText,setPostEditId,NewLike) =>{
    axios.patch("http://localhost:3001/posts/" + PostEditId,{description: PostEditText})
        .then(() =>{setPostEditId(null); NewLike(Math.random())} )
}

const Post = ({DB, User, RoleUser, NewLike}) =>{

    const [PostEditId,setPostEditId] = useState(null)
    const [PostEditText, setPostEditText] = useState("")

    console.log("EditID",PostEditId)
    
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

                            <PostEdit Post = {Post} PostEditId = {EditId => setPostEditId(EditId)} PostEditText = {EditText => setPostEditText(EditText)}/>
                            <PostDelete PostDeleteId = {Post.id} NewLike = {CheckDelte => NewLike(CheckDelte)} />
                            </div>
                            
                            :null} 

                         {Post.id === PostEditId ? <div className="Edit--block">
                            <textarea value = {PostEditText} onChange = {e => setPostEditText(e.target.value)} ></textarea>
                            <button className = "Edit--block__Btn" onClick = {()=> EditPostText(PostEditId, PostEditText, setPostEditId, NewLike)}>Ok</button>
                         </div>: null}

                        </div>
                    )
            }): null}
        </div>
    )
}

export default Post;