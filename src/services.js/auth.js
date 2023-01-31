import bcrypt from 'bcryptjs'
import { db } from "../App"

const HASH_SALT = 8

export const signup = async (data) => {
    try {
        const usersRef = db.collection('users')
        const { email } = data

        const user = await usersRef.where("email", "==", email).get()

        if (user?.docs?.length) {
            return {
                error: `User with email: ${email} is already registered.`
            }
        }

        const encryptedPassword = bcrypt.hashSync(data?.password, HASH_SALT)

        const newUser = await usersRef.add({ ...data, password: encryptedPassword })

        return newUser?.id
    } catch (error) {
        console.error('Error on signup: ', error)
    }
}

export const login = async (data) => {
    try {
        const { email, password } = data

        const user = await findUserByEmail(email)

        if (!user) {
            console.log('User does not exist')
            return {
                error: `User with email: ${email} is not registered.`
            }
        }

        const isCorrectPassword = await bcrypt.compare(password, (user?.data()).password)

        if (!isCorrectPassword) {
            return { error: 'Incorrect password' }
        }

        return user

    } catch (error) {
        console.error('Error on login: ', error)
    }
}

export const authenticateUser = async () => {
    const userId = localStorage.getItem("token")

    if (!userId) return null

    const usersRef = db.collection('users')
    const user = await usersRef.doc(userId).get()

    if (!user?.exists) return null

    return user
}

export const findUserByEmail = async (email) => {
    const usersRef = db.collection('users')
    const response = await usersRef.where('email', '==', email).get()

    if (!response.docs.length) return null

    return response.docs[0]
}