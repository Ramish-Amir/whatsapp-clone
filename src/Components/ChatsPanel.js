import React from 'react'
import ChatPanelHeader from './ChatPanelHeader'
import styles from '../styles/ChatsPanel.module.css'
import { MdSearch } from "react-icons/md";
import ChatTile from './ChatTile';

function ChatsPanel() {
  return (
    <div className={styles.chatsPanel}>
        <ChatPanelHeader />
        <div className={styles.panelSearch} >
            <div className={styles.searchBox}>
                <MdSearch  className={styles.icon}/>
                <input placeholder='Search or Start new chat' />
            </div>
        </div>
        <div className={styles.chatTilesContainer}>
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
            <ChatTile />
        </div>
    </div>
  )
}

export default ChatsPanel