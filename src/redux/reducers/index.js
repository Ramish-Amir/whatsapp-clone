import { combineReducers } from "redux";
import { chatReducer, selectedChatReducer } from "./chatReducer";
import { snackbarReducer } from "./snackbarReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
    allChats: chatReducer,
    selectedChat: selectedChatReducer,
    snackbar: snackbarReducer,
    user: userReducer
});

export default reducers;