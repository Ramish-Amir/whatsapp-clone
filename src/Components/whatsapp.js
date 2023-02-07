import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { openSnackbar, removeSelectedChat } from '../redux/actions/productActions'
import { setUser } from '../redux/actions/userActions'
import { authenticateUser } from '../services.js/auth'
import ChatsPanel from './ChatsPanel'
import ChatWindow from './ChatWindow'
import NoChats from './NoChats'


function WhatsApp() {
  const dispatch = useDispatch()
  const selectedChat = useSelector(state => state.selectedChat)
  const navigate = useNavigate()

  useEffect(() => {

    authenticateUser().then((user) => {
      if (!user) {
        dispatch(openSnackbar('Please login to continue'))
        navigate('/')
      }

      dispatch(setUser({
        id: user.id,
        name: user.data()?.name,
        email: user.data()?.email,
        profileUrl: user.data()?.profileUrl
      }))

    }).catch(error => {
      console.error(error)
    })

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