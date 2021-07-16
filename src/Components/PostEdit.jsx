import React from 'react'
import {TiEdit} from 'react-icons/ti'

const PostEdit = ({Post, PostForUpdate}) => {
    return(
        <div className="Post--Edit__Text" onClick = {() => {PostForUpdate(Post)}}> 
        <TiEdit size = "2em" color = "#3371fb"/>
        <span >Изменить</span>
        </div>
    )
}

export default PostEdit