import { combineReducers } from "redux";
import { chatReducer, selectedChatReducer } from "./chatReducer";

const reducers = combineReducers({
    allChats: chatReducer,
    selectedChat: selectedChatReducer
});

export default reducers;