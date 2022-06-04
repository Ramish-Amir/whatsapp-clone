import React, { useState, useEffect } from 'react'
import styles from '../styles/Snackbar.module.css'
import { MdCancel } from "react-icons/md"

function Snackbar(props) {
    const [chat, setChat] = useState({
        name: '',
        profileUrl: ''
    })

    useEffect(() => {
      return () => {}
    }, [])
    

    const onAdd = (e) => {
        e.preventDefault();
        if (chat.name && chat.profileUrl) {
            props.newChatHandler(chat) 
        }
    }

    return (
        <div className={styles.snackbar} >
            <div className={styles.header}>
                <span>Add New Chat</span>
                <MdCancel className={styles.cancel} onClick={() => props.onCloseSnackbar()} />
            </div>

            <form>
                <input placeholder='Enter Name' value={chat?.name} onChange={(e) => {setChat({...chat, name: e.target.value})}}  />
                <input placeholder='Enter Profile Picture Url' value={chat?.profileUrl} onChange={(e) => {setChat({...chat, profileUrl: e.target.value})}} />
                <div className={styles.footer}><button onClick={onAdd}>Add</button></div>
            </form>
        </div>
    )
}

export default Snackbar