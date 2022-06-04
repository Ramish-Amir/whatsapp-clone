import React from 'react';
import styles from '../styles/PanelDropdown.module.css';

function PanelDropdown(props) {
  return (
    <div className={styles.dropdown}>
        <div className={styles.item} onClick={() => {props.onDeleteChat(props.id)}}>Delete Chat</div>
    </div>
  )
}

export default PanelDropdown;