import { ActionsTypes, SnackbarActionTypes } from "../constants/action-types";

export const setChats = (chats) => {
    return {
        type: ActionsTypes.SET_CHATS,
        payload: chats
    }
}

export const setSelectedChat = (chat) => {
    return {
        type: ActionsTypes.SET_SELECTED_CHAT,
        payload: chat
    }
}

export const removeSelectedChat = () => {
    return {
        type: ActionsTypes.REMOVE_SELECTED_CHAT
    }
}

export const openSnackbar = (message) => {
    return {
        type: SnackbarActionTypes.OPEN_SNACKBAR,
        payload: message
    }
}

export const closeSnackbar = () => {
    return {
        type: SnackbarActionTypes.CLOSE_SNACKBAR
    }
}