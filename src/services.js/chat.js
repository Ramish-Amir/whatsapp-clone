import { db } from "../App"
import { authenticateUser, findUserByEmail } from "./auth"


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

        const chatsRef = db.collection('chats')

        await chatsRef.doc(chatId).set({})

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