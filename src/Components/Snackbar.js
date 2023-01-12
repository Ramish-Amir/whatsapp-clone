import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeSnackbar, openSnackbar } from '../redux/actions/productActions';
import styles from '../styles/Snackbar.module.css';


function Snackbar() {
    const snackbar = useSelector(state => state.snackbar)
    const dispatch = useDispatch()

    useEffect(() => {
        if (snackbar?.open) {
            onCloseSnackbar()
        }
    }, [snackbar])

    const onCloseSnackbar = () => {
        const messageLength = snackbar?.message?.length
        const duration = messageLength > 200
            ? messageLength * 25
            : 2000
        setTimeout(() => {
            dispatch(closeSnackbar())
        }, duration)
    }

    return (
        snackbar?.open
            ? <div className={styles.snackbar}>
                <p>{snackbar?.message}</p>
            </div>
            : null
    )
}

export default Snackbar