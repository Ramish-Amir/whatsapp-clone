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

        if (currentUser?.id === user?.id) {
            return { error: `You cannot chat with your self!` }
        }

        const chatId = getChatId(currentUser?.id, user?.id)

        const existingChat = await getChatById(chatId)

        if (existingChat?.exists) {
            return { error: `User [${email}] is already in your chat list` }
        }

        const batch = db.batch()
        const usersRef = db.collection('users')
        const chatsRef = db.collection('chats')

        batch.update(
            usersRef.doc(user.id),
            { chats: [...user.data()?.chats, chatId] }
        )

        batch.update(
            usersRef.doc(currentUser.id),
            { chats: [...currentUser.data()?.chats, chatId] }
        )

        batch.set(
            chatsRef.doc(chatId),
            {
                chatId,
                users: [
                    { id: currentUser.id, name: currentUser.data().name, email: currentUser.data().email, profileUrl: currentUser.data().profileUrl },
                    { id: user.id, name: user.data().name, email: user.data().email, profileUrl: user.data().profileUrl },
                ],
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            }
        )

        await batch.commit()
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
    try {
        const chatsRef = db.collection('chats')
        const chat = await chatsRef.doc(chatId).get()

        if (!chat?.exists) return null

        return chat
    } catch (error) {
        console.log('Error: ', error)
        return null
    }
}

export const sendMessage = async (chatId, message) => {
    try {
        const batch = db.batch()
        const chatRef = db.collection('chats').doc(chatId)
        const messagesRef = db.collection('chats').doc(chatId).collection('messages').doc()

        batch.set(messagesRef, message)
        batch.update(
            chatRef,
            {
                lastMessage: message?.text,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }
        )

        await batch.commit()

        return true

    } catch (error) {
        console.error('ERROR >> ', error)
        return { error: 'Error sending message' }
    }
}

export const getUserChats = async () => {
    try {
        const chatsRef = db.collection('chats')

        const user = await authenticateUser()

        if (!user) {
            return {
                error: 'Please login to continue',
                statusCode: 401
            }
        }

        const userChats = user.data().chats

        if (!userChats?.length) {
            return []
        }

        const chatChunks = divideChatIntoChunks(10, userChats)
        const myChats = []

        for (const chunk of chatChunks) {
            const allChats = await chatsRef
                .where('chatId', 'in', chunk)
                .orderBy('updatedAt', 'desc')
                .get()

            allChats?.docs?.forEach(chat => {
                console.log('Chat doc >> ', chat)
                myChats.push(chat?.data())
            })
        }

        return myChats
    } catch (error) {
        console.log('Get user chats error: ', error)
        return { error: 'Error loading chats' }
    }
}

export const divideChatIntoChunks = (chunkSize, userChats) => {
    // const allChats = userChats
    console.log('Input chats length: ', userChats?.length)
    const chatChunks = []

    while (userChats?.length > chunkSize) {
        chatChunks.push(userChats.splice(0, chunkSize))
    }

    chatChunks.push(userChats)
    return chatChunks

}

export const deleteUserChat = async (chat) => {
    try {
        const batch = db.batch()
        const usersRef = db.collection('users')
        chat?.users?.forEach(async (user) => {
            const userData = await usersRef.doc(user?.id).get()
            const userChats = userData?.data()?.chats
            const chats = userChats?.filter(currentChat => currentChat !== chat?.chatId)
            const userRef = usersRef.doc(user.id)
            batch.update(userRef, { chats })
        })

        const chatRef = db.collection('chats').doc(chat?.chatId)
        batch.delete(chatRef)
        const messages = await chatRef.collection('messages').get()

        messages?.forEach((doc) => {
            batch.delete(doc.ref)
        })

        await batch.commit()

        return true
    } catch (error) {
        console.log('ERROR: DELETE CHAT :', error)
        return { error: 'Could not delete chat!' }
    }

}

export const updateCurrentChat = async (chatId) => {
    const chatRef = db.collection('chats').doc(chatId)

    const updatedDocument = chatRef
}

export const getChatUser = (users) => {
    let chatUser = {}
    users?.forEach(user => {
        if (user?.id !== localStorage.getItem('token')) {
            chatUser = user
        }
    })
    return chatUser
}

export const formatDateFromTimestamp = (timestamp) => {
    // Create a new date object from the timestamp
    var date = new Date(timestamp * 1000);

    // Get the current date
    var today = new Date();

    // Check if the date is from today
    if (date?.toDateString() === today?.toDateString()) {
        // Return hours and minutes
        return date.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' });
    }

    // Check if the date is from yesterday
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return "yesterday";
    }

    // Check if the date is from within the last week
    var daysSince = today - date;
    var daysInWeek = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    if (daysSince < daysInWeek) {
        // Return the day name
        return date.toLocaleDateString("en-PK", { weekday: 'long' });
    }

    // Otherwise, return the date in the format dd/mm/yy
    return date.toLocaleDateString("en-PK", { day: '2-digit', month: '2-digit', year: '2-digit' });
}