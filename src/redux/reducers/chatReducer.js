import { ActionsTypes } from "../constants/action-types";

const initialChatsState = {
    chats: []
}

export const chatReducer = (state = initialChatsState, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SET_CHATS:
            return { ...state, chats: payload }
        default:
            return state
    }
}

export const selectedChatReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SET_SELECTED_CHAT:
            return { ...state, ...payload }
        case ActionsTypes.REMOVE_SELECTED_CHAT:
            console.log('first')
            return {}
        default:
            return state
    }
}