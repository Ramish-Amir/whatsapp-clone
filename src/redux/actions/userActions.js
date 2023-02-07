import { UserActionTypes } from "../constants/action-types"


export const setUser = (user) => {
    return {
        type: UserActionTypes.SET_USER,
        playload: user
    }
}

export const removeUser = () => {
    return {
        type: UserActionTypes.REMOVE_USER
    }
}