import React, { useEffect, useState } from 'react'
import styles from '../styles/ChatTile.module.css'
import { MdExpandMore } from "react-icons/md";
import PanelDropdown from './PanelDropdown';
import { useDispatch } from 'react-redux';
import { setSelectedChat } from '../redux/actions/productActions';
import { db, DEFAULT_AVATAR } from '../App';
import { formatDateFromTimestamp, getChatUser } from '../services.js/chat';

const ChatTile = (props) => {
  const { chat } = props
  const [chatUser, setChatUser] = useState({})
  const dispatch = useDispatch()
  const [openDropdown, setOpenDropdown] = useState(false)

  const onOpenSelectedChat = (chat) => {
    dispatch(setSelectedChat(chat))
  }

  useEffect(() => {
    setChatUser(getChatUser(chat?.users))
  }, [chat])

  useEffect(() => {
    return () => {
      setOpenDropdown(false)
    }
  }, [])

  const onCloseDropdown = () => {
    setOpenDropdown(false)
  }

  return (
    <div className={styles.chatTile} onClick={() => { onOpenSelectedChat(chat) }}>
      <div className={styles.chatImgCont}>
        <div className={styles.chatImg} style={{
          backgroundImage: `url(${chatUser?.profileUrl || DEFAULT_AVATAR})`,
          backgroundSize: 'cover'
        }} />
      </div>
      <div className={styles.chatTileContent}>
        <div className={styles.title}>
          <div>{chatUser?.name}</div>
          <span>{formatDateFromTimestamp(chat?.updatedAt?.seconds)}</span>
        </div>
        <div className={styles.chatDesc}>
          <span className={styles.chatMsg}>{chat?.lastMessage} </span>
          <div className={styles.chatActions}>
            <MdExpandMore
              onClick={(e) => {
                setOpenDropdown(!openDropdown)
                e.stopPropagation()
              }}
              className={styles.dropdownIcon} />
            {openDropdown && <PanelDropdown chat={chat} onCloseDropdown={onCloseDropdown} />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChatTile