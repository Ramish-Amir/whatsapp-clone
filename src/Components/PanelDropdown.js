import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSelectedChat, selectedChat, setChats } from '../redux/actions/productActions';
import styles from '../styles/PanelDropdown.module.css';

function PanelDropdown(props) {
  const allChats = useSelector(state => state.allChats.chats)
  const dispatch = useDispatch()

  const onDeleteChat = (id) => {
    props.onCloseDropdown()
    const chatList = [...allChats]
    chatList.splice(id, 1)
    dispatch(setChats(chatList))
    dispatch(removeSelectedChat())
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.item} onClick={() => { onDeleteChat(props.id) }}>Delete Chat</div>
    </div>
  )
}

export default PanelDropdown;