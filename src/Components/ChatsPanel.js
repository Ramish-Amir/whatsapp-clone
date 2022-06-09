import React, { useEffect, useState } from 'react'
import styles from '../styles/ChatsPanel.module.css'
import { MdSearch } from "react-icons/md";
import ChatTile from './ChatTile';
import { MdDonutLarge, MdChat, MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';
import { useSelector } from 'react-redux';


function ChatsPanel() {
    const allChats = useSelector((state) => state.allChats.chats)
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    }, [])

    const onCloseSnackBar = () => {
        setOpenSnackBar(false)
    }

    const generateChatList = () => {
        return (
            allChats.map((chat, index) => (
                <ChatTile key={index} id={index} chat={chat}
                 />
            ))
        )
    }

    // const renderChatList = allChats.map((chat, index) => (
    //     <ChatTile key={index} id={index} chat={chat} onClick={() => {onOpenSelectedChat()}} />
    // ))

    return (
        <div className={styles.chatsPanel}>

            <div className={styles.cpHeader}>
                <div className={styles.userDP}></div>
                <div className={styles.headerActions}>
                    <MdDonutLarge />
                    <MdChat onClick={() => {setOpenSnackBar(!openSnackbar)}} />
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
                
                {allChats.length > 0 && generateChatList()}

            </div>

            {openSnackbar && < Snackbar onCloseSnackbar={onCloseSnackBar} />}
        </div>
    )
}

export default ChatsPanel