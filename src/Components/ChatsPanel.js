import React from 'react'
import styles from '../styles/ChatsPanel.module.css'
import { MdSearch } from "react-icons/md";
import ChatTile from './ChatTile';
import { MdDonutLarge, MdChat, MdMoreVert  } from "react-icons/md";


function ChatsPanel() {
    return (
        <div className={styles.chatsPanel}>

            <div className={styles.cpHeader}>
                <div className={styles.userDP}></div>
                <div className={styles.headerActions}>
                    <MdDonutLarge />
                    <MdChat />
                    <MdMoreVert />
                </div>
            </div>


            <div className={styles.panelSearch} >
                <div className={styles.searchBox}>
                    <MdSearch className={styles.icon} />
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