import React, { useState, useEffect } from 'react'
import styles from '../styles/NewChatCard.module.css'
import { MdCancel } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import { openSnackbar } from '../redux/actions/productActions'
import { createChat } from '../services.js/chat'

function NewChatCard(props) {
    const allChats = useSelector((state) => state.allChats.chats)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [chat, setChat] = useState({
        name: '',
        profileUrl: ''
    })

    useEffect(() => {
        return () => { }
    }, [])

    const getChatTime = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    // const onAdd = (e) => {
    //     e.preventDefault();
    //     if (chat.name) {
    //         const newChat = {
    //             name: chat.name,
    //             profileUrl: chat.profileUrl,
    //             time: getChatTime(new Date()),
    //             chat: []
    //         }
    //         dispatch(setChats([newChat, ...allChats]))
    //         dispatch(selectedChat(newChat))
    //     }
    //     props.onCloseSnackbar()
    // }

    const onCreateChat = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            return
        }

        const chat = await createChat(email)

        if (chat?.error) {
            dispatch(openSnackbar(chat?.error))
            return
        }

        props.onCloseSnackbar()

    }

    return (
        <div className={styles.snackbar} >
            <div className={styles.header}>
                <span>Start New Chat</span>
                <MdCancel className={styles.cancel} onClick={() => props.onCloseSnackbar()} />
            </div>

            <form>
                {/* <input autoFocus placeholder='Enter Name' value={chat?.name} onChange={(e) => {setChat({...chat, name: e.target.value})}}  />
                <input placeholder='Enter Profile Picture Url' value={chat?.profileUrl} onChange={(e) => {setChat({...chat, profileUrl: e.target.value})}} /> */}
                {/* <div className={styles.footer}><button onClick={onAdd}>Add</button></div> */}

                <input autoFocus placeholder='Enter email' value={email} onChange={(e) => { setEmail(e.target.value) }} />

                <div className={styles.footer}><button onClick={onCreateChat}>Add</button></div>
            </form>
        </div>
    )
}

export default NewChatCard