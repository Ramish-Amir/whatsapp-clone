import React, { useEffect, useState } from 'react'
import styles from '../styles/ChatsPanel.module.css'
import { MdSearch } from "react-icons/md";
import ChatTile from './ChatTile';
import { MdDonutLarge, MdChat, MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


function ChatsPanel() {
    const [chatList, setChatList] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const dummyRooms = [1,2,3,4,5,6,7,8,9]
        generateChatList(dummyRooms);
    }, [])

    const generateChatList = (roomsList) => { 
        setChatList( roomsList.map((room, index) => (
            <ChatTile key={index} />
        )))
    }

    return (
        <div className={styles.chatsPanel}>

            <div className={styles.cpHeader}>
                <div className={styles.userDP}></div>
                <div className={styles.headerActions}>
                    <MdDonutLarge />
                    <MdChat />
                    <MdLogout onClick={() => navigate('/')} />
                </div>
            </div>


            <div className={styles.panelSearch} >
                <div className={styles.searchBox}>
                    <MdSearch className={styles.icon} />
                    <input placeholder='Search or Start new chat' />
                </div>
            </div>
            <div className={styles.chatTilesContainer}>
                
                {chatList.length > 0 && chatList}

                {/* <ChatTile />
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
                <ChatTile /> */}
            </div>
        </div>
    )
}

export default ChatsPanel