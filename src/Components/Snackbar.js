import React, { useState, useEffect } from 'react'
import styles from '../styles/Snackbar.module.css'
import { MdCancel } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { setChats } from '../redux/actions/productActions'

function Snackbar(props) {
    const allChats = useSelector((state) => state.allChats.chats)
    const dispatch = useDispatch()
    const [chat, setChat] = useState({
        name: '',
        profileUrl: ''
    })

    useEffect(() => {
      return () => {}
    }, [])
    
    const getChatTime = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    const onAdd = (e) => {
        e.preventDefault();
        if (chat.name && chat.profileUrl) {
            const newChat = {
                name: chat.name,
                profileUrl: chat.profileUrl,
                time: getChatTime(new Date)
            }
            dispatch(setChats([...allChats, newChat]))
        }
        props.onCloseSnackbar()
    }

    return (
        <div className={styles.snackbar} >
            <div className={styles.header}>
                <span>Add New Chat</span>
                <MdCancel className={styles.cancel} onClick={() => props.onCloseSnackbar()} />
            </div>

            <form>
                <input autoFocus placeholder='Enter Name' value={chat?.name} onChange={(e) => {setChat({...chat, name: e.target.value})}}  />
                <input placeholder='Enter Profile Picture Url' value={chat?.profileUrl} onChange={(e) => {setChat({...chat, profileUrl: e.target.value})}} />
                <div className={styles.footer}><button onClick={onAdd}>Add</button></div>
            </form>
        </div>
    )
}

export default Snackbar