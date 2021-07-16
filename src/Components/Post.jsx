import axios from 'axios';
import React from 'react';
import {FaHandsHelping} from 'react-icons/fa'
import PostDelete from './PostDelete';
import PostEdit from './PostEdit';

const AddClap = (Post, NewLike) => {
    axios.patch("http://localhost:3001/posts/" + Post.id, {claps: Post.claps + 1,})
            .then(({data})=> NewLike(data.claps))
}
       
const ShowTimeCreated = (DateCreated) => {
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

const Post = ({DB, RoleUser, User, NewLike, PostForUpdate}) =>{
    
    return(
        <div className = "Post--list">
            {DB?.map((Post,index) => {
                return(
                    <div className = "Post" key = {index}>
                        <div className = "Post--header">{Post.title}</div>
                        <div className = "Post--text">{Post.description}</div> 

                         {RoleUser === 'reader' ? <div className = "Post--Clap">
                         <div className = "Post--Clap__Btn"  onClick = {() => AddClap(Post, NewLike)}> <FaHandsHelping size = "2em" color = "#3371fb"/> </div>
                            <div>{Post.claps}</div>  
                         </div>: null}  

                         {RoleUser === 'writer' && Post.user.id === User.id ? <div className = "Post--Edit">

                            <PostEdit Post = {Post} PostForUpdate = {PostForUpdate}/>

                            <PostDelete PostDeleteId = {Post.id} NewLike = {CheckDelete => NewLike(CheckDelete)} />
                            </div>
                            :null} 
                            <div className="LastUpdate">{ShowTimeCreated(Post.createdAt)}</div>
                        
                        </div>
                    )
            })}
        </div>
    )
}

export default Post;