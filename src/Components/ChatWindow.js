import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/ChatWindow.module.css'
import { MdEmojiEmotions, MdAttachFile, MdMic, MdSearch, MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar, setChats } from '../redux/actions/productActions';
import { formatDateFromTimestamp, getChatUser, sendMessage } from '../services.js/chat';
import { DEFAULT_AVATAR } from '../App';
import { v4 as uuidv4 } from 'uuid';
import { selectedChat as setSelectedChat } from '../redux/actions/productActions';


function ChatWindow() {
    const selectedChat = useSelector(state => state.selectedChat)
    const allChats = useSelector(state => state.allChats.chats)
    const [chatUser, setChatUser] = useState({})
    const dispatch = useDispatch()
    const bottom = useRef()

    const userId = localStorage.getItem('token')

    const [input, setInput] = useState('');

    useEffect(() => {
        allChats?.forEach(chat => {
            if (chat?.chatId === selectedChat?.chatId) {
                return dispatch(setSelectedChat(chat))
            }
        })
        bottom.current.scrollIntoView({ behavior: 'smooth' })
    }, [allChats])

    useEffect(() => {
        bottom.current.scrollIntoView()
    }, [])

    useEffect(() => {
        setChatUser(getChatUser(selectedChat?.users))
    }, [selectedChat])

    const onSendMessage = async (e) => {
        e.preventDefault()

        const messages = selectedChat?.messages || []
        const newMessage = {
            id: uuidv4(),
            text: input,
            uid: userId,
            time: Date.now()
        }
        messages.push(newMessage)
        const response = await sendMessage(selectedChat?.chatId, messages)

        if (response?.error) {
            dispatch(openSnackbar(response?.error))
        }

        setInput('')
    }

    const getChatTime = (timestamp) => {
        let newDate = new Date(timestamp)
        const nDate = newDate.toDateString("en-PK", { day: '2-digit', month: '2-digit', year: '2-digit' });
        const time = newDate.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })
        const fullTime = nDate + ' ' + time
        return fullTime
    }

    const handleKeyDown = async (e) => {
        if (input && e.key === 'Enter') {
            await onSendMessage(e);
        }
    }

    return (
        <div className={styles.chatWindow}>
            <div className={styles.cwHeader}>
                <div className={styles.windowTitle}>
                    <div className={styles.userDP} style={{
                        backgroundImage: `url(${chatUser?.profileUrl || DEFAULT_AVATAR})`,
                        backgroundSize: 'cover'
                    }} ></div>
                    <div className={styles.chatTitle}>{chatUser?.name}</div>
                </div>
                <div className={styles.headerActions}>
                    <MdSearch />
                    <MdMoreVert />
                </div>
            </div>

            <div className={styles.chat}>
                {
                    selectedChat?.messages?.map(message =>

                    (<div key={message?.id}
                        className={message?.uid === userId ? styles.sent : styles.received}>
                        <div className={styles.message}>
                            {message?.text}
                            <div className={styles.msgTime}>{getChatTime(message?.time)}</div>
                        </div>
                    </div>)
                    )

                }
                <div ref={bottom}></div>
            </div>

            <div className={styles.bottomInputBar}>
                <MdEmojiEmotions className={styles.bottomIcons} />
                <MdAttachFile className={styles.bottomIcons} />
                <input autoFocus placeholder='Type a message' value={input} onChange={(e) => { setInput(e.target.value) }} onKeyDown={(e) => { handleKeyDown(e) }} />
                <MdMic className={styles.bottomIcons} onClick={onSendMessage} />

            </div>

        </div>
    )
}

export default ChatWindow