import React, { useEffect, useState } from 'react'
import styles from '../styles/ChatsPanel.module.css'
import { MdSearch } from "react-icons/md";
import ChatTile from './ChatTile';
import { MdDonutLarge, MdChat, MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';


function ChatsPanel() {
    const [chatList, setChatList] = useState([]);
    const [openSnackbar, setOpenSnackBar] = useState(false);
    const navigate = useNavigate();

    useEffect(() => { 
        const initialChatList = [{
            name: 'Test Chat',
            profileUrl: 'https://saiuniversity.edu.in/wp-content/uploads/2021/02/default-img.jpg',
            time: '2:17 pm'
        }]
        setChatList(initialChatList)
    }, [])

    const onCloseSnackBar = () => {
        setOpenSnackBar(false)
    }

    const onAddNewChat = (newChat) => {
        const tempChat = {
            ...newChat,
            time: getChatTime(new Date)
        }
        setChatList((prevChatList) => (
            [...prevChatList, tempChat]
        ))
        setOpenSnackBar(false)

    }

    const onDeleteChat = (index) => {
        const tempList = [...chatList]
        tempList.splice(index,1)
        setChatList(tempList)
    }

    const generateChatList = (chats) => { 
        return ( chats.map((chat, index) => (
            <ChatTile key={index} id={index} chat={chat} onDeleteChat={onDeleteChat} />
        )))
    }

    const getChatTime = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

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
                
                {chatList.length > 0 && generateChatList(chatList)}

            </div>

            {openSnackbar && < Snackbar newChatHandler={onAddNewChat} onCloseSnackbar={onCloseSnackBar} />}
        </div>
    )
}

export default ChatsPanel