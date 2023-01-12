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
    const userId = localStorage.getItem('token')

    // const { chats } = useChat(() => { }, [allChats])

    // console.log(myChats)

    // if (userId) {
    //     chatsRef.onSnapshot(
    //         async (snapshot) => {
    // const myChats = await chatsRef
    //     .where('id', 'like', `%${userId}%`)
    //     .orderBy('updatedAt')
    //     .get()

    // console.log(myChats)
    //         }
    //     )

    // }

    useEffect(() => {
        const getChats = async () => {
            const myChats = await getUserChats()
            console.log(myChats)
            dispath(setChats(myChats))
        }
        chatsRef.onSnapshot(() => {
            getChats()
        })

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

                {allChats.length > 0 && generateChatList()}

            </div>

            {openSnackbar && < NewChatCard onCloseSnackbar={onCloseSnackBar} />}
        </div>
    )
}

export default ChatsPanel