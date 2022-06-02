import React from 'react'
import styles from '../styles/ChatWindow.module.css'
import ChatWindowHeader from './ChatWindowHeader'
import { MdEmojiEmotions, MdAttachFile, MdMic  } from "react-icons/md";


function ChatWindow() {
  return (
    <div className={styles.chatWindow}>
        <ChatWindowHeader />
        
        <div className={styles.bottomInputBar}>
            <MdEmojiEmotions className={styles.bottomIcons} />
            <MdAttachFile className={styles.bottomIcons} />
            <input placeholder='Type a message' />
            <MdMic className={styles.bottomIcons} />

        </div>

    </div>
  )
}

export default ChatWindow