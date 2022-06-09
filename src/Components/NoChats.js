import React from 'react'
import styles from '../styles/NoChats.module.css'
import { MdChat } from "react-icons/md";


function NoChats() {
  return (
    <div className={styles.noChatWindow}>
        Click on <MdChat className={styles.icon} /> icon to add new chat
    </div>
  )
}

export default NoChats