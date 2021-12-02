import {configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer
    }
})