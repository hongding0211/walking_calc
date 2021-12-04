import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import groupSlice from "../features/group/groupSlice";

export default configureStore({
    reducer: {
        users: usersReducer,
        group: groupSlice
    }
})