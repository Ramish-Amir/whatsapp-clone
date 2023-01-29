import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/ChatWindow.module.css'
import { MdEmojiEmotions, MdAttachFile, MdMic, MdSearch, MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { openSnackbar } from '../redux/actions/productActions';
import { getChatUser, sendMessage } from '../services.js/chat';
import { DEFAULT_AVATAR, db } from '../App';
import { v4 as uuidv4 } from 'uuid';
import { setSelectedChat } from '../redux/actions/productActions';



function ChatWindow() {
    const selectedChat = useSelector(state => state.selectedChat)
    const [chatUser, setChatUser] = useState({})
    const [chatMessages, setChatMessages] = useState([])
    const dispatch = useDispatch()

    const bottom = useRef()
    const common = useRef()

    const userId = localStorage.getItem('token')

    const [input, setInput] = useState('');

    // useEffect(() => {
        

    //     return () => {
    //         console.log('Chat changed >>> ', selectedChat?.chatId)
    //     }
    // }, [selectedChat?.chatId])

    useEffect(() => {
        console.log('Chatttttt')
        console.log('chat id: ', selectedChat?.chatId)
        // bottom?.current?.scrollIntoView()
        setChatUser(getChatUser(selectedChat?.users))
        // console.log('Chatttttt')
        if (selectedChat?.chatId) {
            const chatRef = db.collection('chats').doc(selectedChat.chatId).collection('messages').orderBy('time')
            console.log('Second useEffect')

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
                    bottom?.current?.scrollIntoView()
                }
            })


            return () => {
                unsubscribe()
                dispatch(setSelectedChat({}))
            }


        }
    }, [selectedChat.chatId])

    const onSendMessage = async (e) => {
        e.preventDefault()

        // const messages = selectedChat?.messages || []
        const message = {
            text: input,
            uid: userId,
            time: Date.now()
        }
        // messages.push(newMessage)
        const response = await sendMessage(selectedChat?.chatId, message)

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
                    {/* {
                        // console.log('chatUser: ', chatUser);
                        console.log('selected chat: ', selectedChat)
                    } */}
                    <div className={styles.chatTitle}>{chatUser?.name}</div>
                </div>
                <div className={styles.headerActions}>
                    <MdSearch />
                    <MdMoreVert />
                </div>
            </div>

            <div className={styles.chat}>
                {
                    chatMessages?.map((message, index) =>

                    (<div ref={index === chatMessages.length - 1 ? bottom : common} key={message?.id}
                        className={message?.uid === userId ? styles.sent : styles.received}>
                        <div className={styles.message}>
                            <span>{message?.text}</span>
                            <div className={styles.msgTime}>{getChatTime(message?.time)}</div>
                        </div>
                    </div>)
                    )

                }
                {/* <div ref={bottom}></div> */}
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