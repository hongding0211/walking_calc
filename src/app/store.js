import {combineReducers, configureStore} from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage'
import usersReducer from '../features/users/usersSlice'
import groupReducer from '../features/group/groupSlice'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

export default configureStore({
    reducer: persistReducer(
        {key: 'root', storage},
        combineReducers({
            users: usersReducer,
            group: groupReducer
        })
    ),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }),
})