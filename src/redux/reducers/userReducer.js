import { UserActionTypes } from "../constants/action-types"

const initialUserState = {}

export const userReducer = (state = initialUserState, { type, playload }) => {
    switch (type) {
        case UserActionTypes.SET_USER:
            return { ...state, ...playload }

        case UserActionTypes.REMOVE_USER:
            return state

        default:
            return state
    }
}