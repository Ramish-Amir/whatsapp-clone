import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/ChatWindow.module.css'
import { MdEmojiEmotions, MdAttachFile, MdMic, MdSearch, MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../redux/actions/productActions';


function ChatWindow() {
    const selectedChat = useSelector(state => state.selectedChat)
    const allChats = useSelector(state => state.allChats.chats)
    const dispatch = useDispatch()
    const bottom = useRef()

    const [input, setInput] = useState('');



    const messages = (selectedChat.chat).map((message, index) => 
        <div key={index} className={message.sent ? styles.sent : styles.received}>
            <div className={styles.message}>{message.text}
                <div className={styles.msgTime}>{message.time}</div>
            </div>
        </div>
    )

    useEffect(() => {
        bottom.current.scrollIntoView({behavior: 'smooth'})
    }, [messages])

    const sendMessage = (e) => {
        e.preventDefault()
        updateCurrentChat()
    }

    const updateCurrentChat = () => {
        allChats.forEach((chat, index) => {
            if (chat.name === selectedChat.name && chat.profileUrl === selectedChat.profileUrl && chat.time === selectedChat.time) {
                const message = input
                setInput('')
                addToChat(index, message)
            }
        })
    }

    const addToChat = (chatIndex, message) => {
        const currentChat = selectedChat
        const tempChatList = allChats
        tempChatList.splice(chatIndex, 1)
        const prevChat = selectedChat?.chat
        const newMessage = {
            text: message,
            time: getChatTime(new Date()),
            sent: true
        }
        const reply = {
            text: 'Sorry! I cannot receive your message because the app is not connected to the database.',
            time: getChatTime(new Date()),
            sent: false
        }
        prevChat.push(newMessage);
        prevChat.push(reply)
        currentChat.chat = prevChat
        currentChat.time = getChatTime(new Date())
        dispatch(setChats([currentChat, ...tempChatList]))
    }

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

    const handleKeyDown = (e) => {
        if (input && e.key === 'Enter') {
            sendMessage(e);
        }
    }

    return (
        <div className={styles.chatWindow}>
            <div className={styles.cwHeader}>
                <div className={styles.windowTitle}>
                    <div className={styles.userDP} style={{
                        backgroundImage: `url(${selectedChat?.profileUrl})`,
                        backgroundSize: 'cover'
                    }} ></div>
                    <div className={styles.chatTitle}>{selectedChat.name}</div>
                </div>
                <div className={styles.headerActions}>
                    <MdSearch />
                    <MdMoreVert />
                </div>
            </div>

            <div className={styles.chat}>
                {messages}
                <div ref={bottom}></div>
            </div>

            <div className={styles.bottomInputBar}>
                <MdEmojiEmotions className={styles.bottomIcons} />
                <MdAttachFile className={styles.bottomIcons} />
                <input placeholder='Type a message' value={input} onChange={(e) => { setInput(e.target.value) }} onKeyDown={(e) => { handleKeyDown(e) }} />
                <MdMic className={styles.bottomIcons} onClick={sendMessage} />

            </div>

        </div>
    )
}

export default ChatWindow