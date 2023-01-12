
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_AVATAR } from '../App'
import { openSnackbar } from '../redux/actions/productActions'
import { login, signup } from '../services.js/auth'
import styles from '../styles/AuthCard.module.css'


function AuthCard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isSignUpForm, setSignUpForm] = useState(false)
    const [authForm, setAuthForm] = useState({
        name: '',
        email: '',
        password: '',
        profileUrl: ''
    })

    const validateForm = () => {
        const { name, email, password } = authForm
        if (isSignUpForm) {
            if (!name?.trim() || !email?.trim() || !password?.trim()) {
                dispatch(openSnackbar('Name, email and password are required!'))
                return false
            }
        } else {
            if (!email?.trim() || !password?.trim()) {
                dispatch(openSnackbar('Fill both email and password fields to proceed!'))
                return false
            }
        }

        return true
    }

    const onSignup = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            const user = await signup({
                ...authForm,
                profileUrl: authForm?.profileUrl || DEFAULT_AVATAR
            })

            if (user.error) {
                dispatch(openSnackbar(user?.error))
            }
            else {
                localStorage.setItem("token", user)
                navigate('whatsapp')
            }
        }
    }

    const onLogin = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            const user = await login(authForm)

            if (user?.error) {
                dispatch(openSnackbar(user?.error))
            } else {
                localStorage.setItem('token', user?.id)
                navigate('/whatsapp')
            }
        }
    }


    return (
        <>
            <form className={styles.authForm}>
                {
                    isSignUpForm
                        ?
                        <>
                            <div className={styles.inputContainer}>
                                <input autoFocus type={'text'} placeholder='Name' value={authForm?.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} />
                                <input type={'email'} placeholder='Email' value={authForm?.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
                                <input type={'text'} placeholder='Profile Picture Url (optional)' value={authForm?.profileUrl} onChange={(e) => setAuthForm({ ...authForm, profileUrl: e.target.value })} />
                                <input type={'password'} placeholder='Password' value={authForm?.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
                            </div>

                            <button onClick={(e) => onSignup(e)}>Sign Up</button>

                            <p>Already registered? {' '}
                                <span onClick={() => { setSignUpForm(false) }}>
                                    Login
                                </span>
                            </p>
                        </>
                        :
                        <>
                            <div className={`${styles.inputContainer} ${styles.inputContainerVer}`}>
                                <input autoFocus type={'email'} placeholder='Email' value={authForm?.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
                                <input type={'password'} placeholder='Password' value={authForm?.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
                            </div>

                            <button onClick={(e) => onLogin(e)}>Login</button>

                            <p>Do not have account? {' '}
                                <span onClick={() => { setSignUpForm(true) }}>
                                    Signup
                                </span>
                            </p>
                        </>

                }
            </form>
        </>
    )
}

export default AuthCard