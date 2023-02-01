import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/ChatWindow.module.css'
import { MdEmojiEmotions, MdAttachFile, MdMic, MdSearch, MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from '../redux/actions/productActions';
import { getChatUser, sendMessage } from '../services.js/chat';
import { DEFAULT_AVATAR, db } from '../App';
import { setSelectedChat } from '../redux/actions/productActions';


function ChatWindow() {
    const selectedChat = useSelector(state => state.selectedChat)
    const [chatUser, setChatUser] = useState({})
    const [chatMessages, setChatMessages] = useState([])
    const [input, setInput] = useState('');
    const [smoothScroll, setSmoothScroll] = useState(false)
    const dispatch = useDispatch()

    const bottom = useRef()
    const userId = localStorage.getItem('token')

    useEffect(() => {
        setSmoothScroll(false)
        dispatch(setSelectedChat({}))

        setChatUser(getChatUser(selectedChat?.users))
        if (selectedChat?.chatId) {
            const chatRef = db.collection('chats').doc(selectedChat.chatId).collection('messages').orderBy('time')
            const unsubscribe = chatRef.onSnapshot(snapshot => {
                const messages = []

                if (snapshot.docs) {
                    snapshot.docs.forEach(doc => {
                        messages.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    })
                    setChatMessages(messages)
                }
            })

            return () => {
                unsubscribe()
            }

        }
    }, [selectedChat.chatId])

    useEffect(() => {
        if (chatMessages?.length) {
            smoothScroll
                ? bottom?.current?.scrollIntoView({ behavior: 'smooth' })
                : bottom?.current?.scrollIntoView()
            setSmoothScroll(true)
        }
    }, [chatMessages])

    const onSendMessage = async (e) => {
        e.preventDefault()

        if (!input.trim()) return

        const text = input
        setInput('')
        const message = {
            text,
            uid: userId,
            time: Date.now()
        }

        const response = await sendMessage(selectedChat?.chatId, message)

        if (response?.error) {
            dispatch(openSnackbar(response?.error))
        }
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
                    chatMessages?.map((message) =>

                    (<div key={message?.id}
                        className={message?.uid === userId ? styles.sent : styles.received}>
                        <div className={styles.message}>
                            <span>{message?.text}</span>
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