import { ActionsTypes } from "../constants/action-types";

const initialChatsState = {
    chats: [ 
        {
        name: 'Test Chat',
        profileUrl: 'https://saiuniversity.edu.in/wp-content/uploads/2021/02/default-img.jpg',
        time: '2:17 pm',
        chat: []
    } 
]
}

export const chatReducer = (state = initialChatsState, { type, payload }) => {
    switch (type) {
        case ActionsTypes.SET_CHATS:
            return {...state, chats: payload}
        default:
            return state
    }
}

export const selectedChatReducer = (state={}, {type, payload}) => {
    switch (type) {
        case ActionsTypes.SELECTED_CHAT:
            return {...state, ...payload}
        case ActionsTypes.REMOVE_SELECTED_CHAT:
            return {}
        default:
            return state
    }
}