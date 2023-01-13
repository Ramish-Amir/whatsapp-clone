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

        // if (existingChat?.exists) {
        //     return { error: `User [${email}] is already in your chat list` }
        // }

        const chatsRef = db.collection('chats')

        await chatsRef.doc(chatId).set({
            chatId,
            users: [
                { id: currentUser.id, name: currentUser.data().name, email: currentUser.data().email, profileUrl: currentUser.data().profileUrl },
                { id: user.id, name: user.data().name, email: user.data().email, profileUrl: user.data().profileUrl },
            ],
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

export const sendMessage = async (chatId, messages) => {
    try {
        const chatRef = db.collection('chats').doc(chatId)

        await chatRef.update({
            messages,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })

        return true

    } catch (error) {
        return { error: 'Error sending message' }
    }
}

export const getUserChats = async () => {
    const chatsRef = db.collection('chats')

    const user = await authenticateUser()

    if (!user) {
        return { error: 'Looks like you are not logged in' }
    }
    const myChats = []

    const allChats = await chatsRef
        .orderBy('updatedAt', 'desc')
        .get()

    allChats?.docs?.forEach(chat => {
        if (chat?.id?.includes(user?.id)) {
            myChats.push(chat?.data())
        }
    })

    return myChats
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