import { ActionsTypes } from "../constants/action-types";

export const setChats = (chats) => {
    return {
        type: ActionsTypes.SET_CHATS,
        payload: chats
    }
}

export const selectedChat = (chat) => {
    return {
        type: ActionsTypes.SELECTED_CHAT,
        payload: chat
    }
}

export const removeSelectedChat = () => {
    return {
        type : ActionsTypes.REMOVE_SELECTED_CHAT
    }
}