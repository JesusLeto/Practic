import axios from 'axios'
import React from 'react'
import {MdDelete} from 'react-icons/md'




const PostDelete = ({PostDeleteId, NewLike}) => {
    return(
        <div className="Post--Edit__Delete" onClick = {()=> {
            axios.delete(process.env.REACT_APP_DB_CONN + "/posts/"+ PostDeleteId).then(()=> NewLike(Math.random()))
        }}> 
        <MdDelete size = "2em" color = "#3371fb"/>
        <span >Удалить</span>
        </div>
                        
    )
}

export default PostDelete


                            