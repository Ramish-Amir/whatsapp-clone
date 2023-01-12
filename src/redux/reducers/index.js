import { combineReducers } from "redux";
import { chatReducer, selectedChatReducer } from "./chatReducer";
import { snackbarReducer } from "./snackbarReducer";

const reducers = combineReducers({
    allChats: chatReducer,
    selectedChat: selectedChatReducer,
    snackbar: snackbarReducer
});

export default reducers;