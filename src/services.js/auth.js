import bcrypt from 'bcryptjs'
import { db } from "../App"

const HASH_SALT = 8

export const signup = async (data) => {
    try {
        const { email } = data
        const usersRef = db.collection('users')

        const user = await usersRef.where("email", "==", email).get()

        if (user?.docs?.length) {
            console.log('User already exists')
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
        const usersRef = db.collection('users')

        const response = await usersRef.where("email", "==", email).get()

        if (!response?.docs?.length) {
            console.log('User does not exist')
            return {
                error: `User with email: ${email} is not registered.`
            }
        }

        const user = response?.docs[0].data()

        const isCorrectPassword = await bcrypt.compare(password, user?.password)

        console.log(user)

        if (!isCorrectPassword) {
            return { error: 'Incorrect password' }
        }

        return user

    } catch (error) {
        console.error('Error on login: ', error)
    }
}