import {configureStore} from "@reduxjs/toolkit"
import {combineReducers} from "redux"
import { alertsSlice } from "./alertSlice"
import { userSlice } from "./userSlice";
import { memberSlice } from "./memberSlice";

const rootReducer = combineReducers({
    alerts: alertsSlice.reducer,
    user : userSlice.reducer,
    member : memberSlice.reducer,

});

const store = configureStore ({
    reducer:rootReducer,
});
export default store;