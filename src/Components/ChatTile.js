import React, { useState } from 'react'
import styles from '../styles/ChatTile.module.css'
import { MdExpandMore } from "react-icons/md";
import PanelDropdown from './PanelDropdown';

const ChatTile = () => {
  const [openDropdown, setOpenDropdown] = useState(false)

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
            <MdExpandMore onClick={() => {setOpenDropdown(!openDropdown)}} className={styles.dropdownIcon} />
            {openDropdown && <PanelDropdown />}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ChatTile