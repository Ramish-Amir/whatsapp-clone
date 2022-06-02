import React from 'react'
import styles from '../styles/ChatTile.module.css'
import { MdExpandMore } from "react-icons/md";

function ChatTile() {
  return (
    <div className={styles.chatTile}>
      <div className={styles.chatImgCont}>
        <div className={styles.chatImg} />
      </div>
      <div className={styles.chatTileContent}>
        <div className={styles.title}>
          <div>Tom Cruise</div>
          <span>2:17 pm</span>
        </div>
        <div className={styles.chatDesc}>
          <span>Thanks</span>
          <div className={styles.chatActions}>
            <MdExpandMore className={styles.dropdownIcon} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatTile