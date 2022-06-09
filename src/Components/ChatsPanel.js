import React, { useEffect, useState } from 'react'
import styles from '../styles/ChatsPanel.module.css'
import { MdSearch } from "react-icons/md";
import ChatTile from './ChatTile';
import { MdDonutLarge, MdChat, MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../redux/actions/productActions';


function ChatsPanel() {
    const dispatch = useDispatch()
    const allChats = useSelector((state) => state.allChats.chats)
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // const initialChat = {
        //         name: 'Test Chat',
        //         profileUrl: 'https://saiuniversity.edu.in/wp-content/uploads/2021/02/default-img.jpg',
        //         time: '2:17 pm'
        // }
        // dispatch(setChats([initialChat]))
    }, [])

    const onCloseSnackBar = () => {
        setOpenSnackBar(false)
    }

    const renderChatList = allChats.map((chat, index) => (
        <ChatTile key={index} id={index} chat={chat} />
    ))

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
                
                {allChats.length > 0 && renderChatList}

            </div>

            {openSnackbar && < Snackbar onCloseSnackbar={onCloseSnackBar} />}
        </div>
    )
}

export default ChatsPanel