import React from 'react';
import styles from '../styles/ChatsPanel.module.css'
import { MdOutlineRefresh, MdChat, MdMoreVert  } from "react-icons/md";

function ChatPanelHeader() {
  return (
    <div className={styles.cpHeader}>
        <div className={styles.userDP}></div>
        <div className={styles.headerActions}>
        <MdOutlineRefresh />
        <MdChat />
        <MdMoreVert />
        </div>
    </div>
  )
}

export default ChatPanelHeader