import { SnackbarActionTypes } from "../constants/action-types"


const initialSnackbarState = {
    open: false,
    message: ''
}

export const snackbarReducer = (state = initialSnackbarState, { type, payload }) => {
    switch (type) {

        case SnackbarActionTypes.OPEN_SNACKBAR:
            {
                return {
                    open: true,
                    message: payload
                }
            }

        case SnackbarActionTypes.CLOSE_SNACKBAR:
            return {
                open: false,
                message: ''
            }

        default:
            return state
    }
}