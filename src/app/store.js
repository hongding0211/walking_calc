import {configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import groupSlice from "../features/group/groupSlice";

export default configureStore({
    reducer: {
        authentication: authenticationReducer,
        group: groupSlice
    }
})