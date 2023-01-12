import { db } from "../App"
import { authenticateUser, findUserByEmail } from "./auth"
import firebase from 'firebase/compat/app'


export const createChat = async (email) => {
    try {
        const currentUser = await authenticateUser()

        if (!currentUser.exists) {
            return { error: 'Something went wrong. Please signin again.' }
        }

        const user = await findUserByEmail(email)

        if (!user) {
            return { error: `User with email: ${email} does not exist!` }
        }

        const chatId = getChatId(currentUser?.id, user?.id)

        const existingChat = await getChatById(chatId)

        // if (existingChat?.exists) {
        //     return { error: `User [${email}] is already in your chat list` }
        // }

        const chatsRef = db.collection('chats')

        await chatsRef.doc(chatId).set({
            id: chatId,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            messages: []
        })

        return true

    } catch (error) {
        console.error(error)
        return { error: 'Something went wrong' }
    }
}

export const getChatId = (firstId, secondId) => {
    return firstId > secondId
        ? firstId + secondId
        : secondId + firstId
}

export const getChatById = async (chatId) => {
    const chatsRef = db.collection('chats')
    const chat = await chatsRef.doc(chatId).get()

    if (!chat?.exists) return null

    return chat
}

export const getUserChats = async () => {
    const chatsRef = db.collection('chats')

    const user = await authenticateUser()

    if (!user) {
        return { error: 'Looks like you are not logged in' }
    }

    const chats = chatsRef.onSnapshot(
        async () => {
            const allChats = await chatsRef
                .orderBy('updatedAt')
                .get()

            const myChats = []
            allChats?.docs?.forEach(chat => {
                if (chat?.id?.includes(user?.id)) {
                    myChats.push(chat.id)
                }
            })

            return myChats
        }
    )

    return chats
}