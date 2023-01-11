import { authenticateUser, findUserByEmail } from "./auth"


export const createChat = async (email) => {
    const currentUser = await authenticateUser()

    if (!currentUser.exists) {
        alert('You are not logged in')
        return { error: 'SOmething went wrong. Please signin again.'}
    }

    const user = await findUserByEmail(email)

    if (!user) {
        alert(`User with email: ${email} does not exist!`)
        return { error: `User with email: ${email} does not exist!`}
    }

    console.log('Current user id: ', currentUser?.id)
    console.log('User id: ', user?.id)

    const chatId = user.id > currentUser.id
                    ? user.id + currentUser.id
                    : currentUser.id + user.id

    
}