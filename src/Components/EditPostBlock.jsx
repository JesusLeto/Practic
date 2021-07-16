import React, {useState} from 'react'
import axios from 'axios';
import './EditPostBlockStyle.scss';

const EditPost = (PostEditId,PostEditTitle,PostEditText,NewUpdate,CloseEditPostBlock) =>{
    axios.patch("http://localhost:3001/posts/" + PostEditId,{
        title: PostEditTitle, 
        description: PostEditText,
        updatedAt: new Date()})
        .then(() => {NewUpdate(Math.random()); CloseEditPostBlock()})
}

const EditPostBlock = ({PostForUpdate, NewUpdate, CloseEditPostBlock}) => {

    const [PostEditText, setPostEditText] = useState(PostForUpdate.description)
    const [PostEditTitle, setPostEditTitle] = useState(PostForUpdate.title)

    return(
        <div className = "Wrapper--Edit--block">
            <div className="Edit--block">
                <div>Залоголовок</div>
                <input type="text" className = "Edit--block__tile" value = {PostEditTitle} onChange = {e => setPostEditTitle(e.target.value)} />
                <div>Пост</div>
                    <textarea className = "Edit--block__input" value = {PostEditText} onChange = {e => setPostEditText(e.target.value)} ></textarea>
                    <button className = "Edit--block__Btn--Update" onClick = {()=> {
                                if(PostEditTitle&&PostEditText)
                                    EditPost(PostForUpdate.id, PostEditTitle, PostEditText, NewUpdate,CloseEditPostBlock)
                                    else{
                                        alert("Empty input")
                                    }}}>Изменить</button>
                    <button className = "Edit--block__Btn--Close" onClick = {CloseEditPostBlock}>Отмена</button>
            </div>

        </div>
    )
}

export default EditPostBlock