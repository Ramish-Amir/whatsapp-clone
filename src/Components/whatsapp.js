import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { openSnackbar, removeSelectedChat } from '../redux/actions/productActions'
import ChatsPanel from './ChatsPanel'
import ChatWindow from './ChatWindow'
import NoChats from './NoChats'


function WhatsApp() {
  const dispatch = useDispatch()
  const selectedChat = useSelector(state => state.selectedChat)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('token')

    if (!user) {
      dispatch(openSnackbar('Please login to continue'))
      navigate('/')
    }
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