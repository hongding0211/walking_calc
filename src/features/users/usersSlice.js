import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getOneUserById} from "../../api/client";

const initialState = {
    user: {
        uid: '',
        name: '',
        img: null
    },
    otherMembers: []
}


export const fetchUserData = createAsyncThunk(
    'users/fetchUserData',
    async (uid) => {
        return await getOneUserById(uid)
    }
)

export const fetchMemberData = createAsyncThunk(
    'users/fetchmemberData',
    async (uid, {getState}) => {
        const currentMembers = getState().users.otherMembers
        if (currentMembers.find(e => e.uid === uid))
            return new Promise(((resolve, reject) => reject('members exists')))
        else
            return await getOneUserById(uid)
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserData.fulfilled]: (state, action) => {
            if (action.payload != null)
                state.user = action.payload
        },
        [fetchMemberData.fulfilled]: (state, action) => {
            if (action.payload != null)
                state.otherMembers.push(action.payload)
        }
    }
})


export default usersSlice.reducer

export const selectUserData = state => state.users.user

export const selectMembersByUids = uids => state => {
    let members = []
    for (const uid of uids) {
        const m = state.users.otherMembers.find(e => e.uid === uid)
        if (m)
            members.push(m)
    }
    return members
}
