import React, { useState } from 'react'
import styles from '../styles/ChatTile.module.css'
import { MdExpandMore } from "react-icons/md";
import PanelDropdown from './PanelDropdown';

const ChatTile = (props) => {
  const [openDropdown, setOpenDropdown] = useState(false)

  return (
    <div className={styles.chatTile}>
      <div className={styles.chatImgCont}>
        <div className={styles.chatImg} style={{
          background: `url(${props.chat?.profileUrl}) center center`,
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
            {openDropdown && <PanelDropdown />}
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChatTile