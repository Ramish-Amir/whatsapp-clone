import React from 'react'
import styles from '../styles/ChatWindow.module.css'
import { MdSearch, MdMoreVert  } from "react-icons/md";

const  ChatWindowHeader = () => {
    return (
        <div className={styles.cwHeader}>
            <div className={styles.windowTitle}>
                <div className={styles.userDP}></div>
                <div className={styles.chatTitle}>Tom Cruise</div>
            </div>
            <div className={styles.headerActions}>
                <MdSearch />
                <MdMoreVert />
            </div>
        </div>
    )
}

export default ChatWindowHeader