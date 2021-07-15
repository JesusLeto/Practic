import React from 'react'
import {TiEdit} from 'react-icons/ti'

const PostEdit = ({Post, PostEditId, PostEditText,PostEditTitle}) => {
    return(
        <div className="Post--Edit__Text" onClick = {() => {PostEditId(Post.id); PostEditText(Post.description); PostEditTitle(Post.title)}}> 
        <TiEdit size = "2em" color = "#3371fb"/>
        <span >Изменить</span>
        </div>
    )
}

export default PostEdit