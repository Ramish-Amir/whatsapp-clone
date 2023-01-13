import React, { useEffect, useState } from 'react'
import styles from '../styles/ChatsPanel.module.css'
import { MdSearch } from "react-icons/md";
import ChatTile from './ChatTile';
import { MdDonutLarge, MdChat, MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import NewChatCard from './NewChatCard';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../App';
import { getUserChats } from '../services.js/chat';
import { setChats } from '../redux/actions/productActions';


function ChatsPanel() {
    const allChats = useSelector((state) => state.allChats.chats)
    const dispath = useDispatch()
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const navigate = useNavigate();

    const chatsRef = db.collection('chats')

    useEffect(() => {
        const getChats = async () => {
            const myChats = await getUserChats()
            dispath(setChats(myChats))
        }
        chatsRef.onSnapshot(() => {
            getChats()
        })
    }, [])

    const onCloseSnackBar = () => {
        setOpenSnackBar(false)
    }

    return (
        <div className={styles.chatsPanel}>

            <div className={styles.cpHeader}>
                <div className={styles.userDP}></div>
                <div className={styles.headerActions}>
                    <MdDonutLarge />
                    <MdChat onClick={() => { setOpenSnackBar(!openSnackbar) }} />
                    <MdLogout onClick={() => {
                        localStorage.removeItem('token')
                        navigate('/')
                    }} />
                </div>
            </div>


            <div className={styles.panelSearch} >
                <div className={styles.searchBox}>
                    <MdSearch className={styles.icon} />
                    <input placeholder='Search or Start new chat' />
                </div>
            </div>
            <div className={styles.chatTilesContainer}>

                {allChats?.map((chat, index) => (
                    <ChatTile key={index} id={index} chat={chat}
                    />
                ))}

            </div>

            {openSnackbar && < NewChatCard onCloseSnackbar={onCloseSnackBar} />}
        </div>
    )
}

export default ChatsPanel