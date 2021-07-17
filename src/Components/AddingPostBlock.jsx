import React, {useState} from 'react';
import axios from 'axios';
import '../style/AddingPostBlockStyle.scss'

const AddingPostBlock = ({WriterId, NewPost, CloseAddingBlock}) =>{

    const [TextNewPost, setTextNewPage] = useState("")
    const [TitleNewPost, setTitleNewPost] = useState("")

    const AddNewPost = (TitleNewPost,TextNewPost,WriterId) =>{
        if(TitleNewPost&&TextNewPost)
        {
            axios.post('http://localhost:3001/posts', {
            title: TitleNewPost,
            description: TextNewPost,
            claps: 0,
            userId: WriterId,
            createdAt: new Date(),
            updateAt: new Date()
        }).then(({data}) => {NewPost(data); CloseAddingBlock()})
        }
        else{
            alert("Заголовок и текст не должны быть пусты")
        }
    }

    return (
        <div className = "Wrapper--AddingPostBlock">
            <div className="AddingPostBlock">
            <span>Заголовок поста</span>
            <input type="text" className = "AddingPostBlock__Title" value = {TitleNewPost}
            onChange = {e => setTitleNewPost(e.target.value)}/>
            <span>Текст поста</span>
            <textarea name="AddingPostBlock__input" className = "AddingPostBlock__input" value = {TextNewPost}
            onChange = {e => setTextNewPage(e.target.value)}></textarea>

            <button className = "AddingPostBlock__Btn" onClick = {() => AddNewPost(TitleNewPost,TextNewPost,WriterId)}>Добавить</button>
            <button className = "AddingPostBlock__CloseBtn" onClick = {() =>CloseAddingBlock()}>Отмена</button>
            </div>
        </div>
    )
}

export default AddingPostBlock