import React from 'react';
import styles from '../styles/PanelDropdown.module.css';

function PanelDropdown() {
  return (
    <div className={styles.dropdown}>
        <div className={styles.item}>Archive Chat</div>
        <div className={styles.item}>Mute Notifications</div>
        <div className={styles.item}>Delete Chat</div>
        <div className={styles.item}>Pin Chat</div>
        <div className={styles.item}>Mark as unread</div>
    </div>
  )
}

export default PanelDropdown;