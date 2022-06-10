import React, { useState } from 'react'
import styles from '../styles/ChatWindow.module.css'
import { MdEmojiEmotions, MdAttachFile, MdMic, MdSearch, MdMoreVert } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../redux/actions/productActions';


function ChatWindow() {
    const selectedChat = useSelector(state => state.selectedChat)
    const allChats = useSelector(state => state.allChats.chats)
    const dispatch = useDispatch()

    const [input, setInput] = useState('');

    const messages = (selectedChat.chat).map((message, index) => 
        <div key={index} className={message.sent ? styles.sent : styles.received}>
            <div className={styles.message}>{message.text}
                <div className={styles.msgTime}>{message.time}</div>
            </div>
        </div>
    )
    const sendMessage = (e) => {
        e.preventDefault()
        updateCurrentChat()
    }

    const updateCurrentChat = () => {
        allChats.map((chat, index) => {
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
            time: getChatTime(new Date),
            sent: true
        }
        const reply = {
            text: 'Sorry! I cannot receive your message because the app is not connected to the database.',
            time: getChatTime(new Date),
            sent: false
        }
        prevChat.push(newMessage);
        prevChat.push(reply)
        currentChat.chat = prevChat
        currentChat.time = getChatTime(new Date)
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
                {/* <div className={`${styles.sent}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.received}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.sent}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.received}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.sent}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.received}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.sent}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div>
                <div className={`${styles.received}`}>
                    <div className={`${styles.message}`}>Use the online image color picker above to select a color and get the HTML Color Code of this pixel. Also you get the HEX color code value, RGB value and HSV value. Under 'Use Your Image' You can upload your own image (for example an screenshot of your desktop), paste an image from clipboard, put a picture url in the textbox below. Or use an website url, you will see a thumbnail on the left side.
                        <div className={styles.msgTime}>2:17 pm</div>
                    </div>
                </div> */}
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