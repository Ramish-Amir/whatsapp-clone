import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeSelectedChat } from '../redux/actions/productActions'
import ChatsPanel from './ChatsPanel'
import ChatWindow from './ChatWindow'
import NoChats from './NoChats'


function WhatsApp() {
  const dispatch = useDispatch()
  const selectedChat = useSelector(state => state.selectedChat)

  useEffect(() => {
    return () => {
      dispatch(removeSelectedChat())
    }
  }, [])

  return (
    <>
      <ChatsPanel />
      {
        selectedChat?.chatId ?
          <ChatWindow /> : <NoChats />
      }
    </>
  )
}

export default WhatsApp