import React, { useState } from 'react'
import styles from '../styles/ChatTile.module.css'
import { MdExpandMore } from "react-icons/md";
import PanelDropdown from './PanelDropdown';
import { useDispatch } from 'react-redux';
import { selectedChat } from '../redux/actions/productActions';

const ChatTile = (props) => {
  const dispatch = useDispatch()
  const [openDropdown, setOpenDropdown] = useState(false)
  const onOpenSelectedChat = (chat) => {
    dispatch(selectedChat(chat))
  }

  return (
    <div className={styles.chatTile} onClick={() => { onOpenSelectedChat(props.chat) }}>
      <div className={styles.chatImgCont}>
        <div className={styles.chatImg} style={{
          backgroundImage: `url(${props.chat?.profileUrl})`,
          backgroundSize: 'cover'
        }} />
      </div>
      <div className={styles.chatTileContent}>
        <div className={styles.title}>
          <div>{props.chat?.name}</div>
          <span>{props.chat?.time}</span>
        </div>
        <div className={styles.chatDesc}>
          <span>Message ... </span>
          <div className={styles.chatActions}>
            <MdExpandMore onClick={() => { setOpenDropdown(!openDropdown) }} className={styles.dropdownIcon} />
            {openDropdown && <PanelDropdown id={props.id} />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChatTile