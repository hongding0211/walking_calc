import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getOneUserById} from "../../api/client";

const initialState = {
    isLogin: false,
    joinGroup: null,
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
    reducers: {
        quitLogin: state => {
            state.isLogin = false
        },
        request2JoinGroup: (state, action) => {
            state.joinGroup = action.payload
        },
        finishJoinGroup: state => state.joinGroup = null
    },
    extraReducers: {
        [fetchUserData.fulfilled]: (state, action) => {
            if (action.payload != null) {
                state.user = action.payload
                state.isLogin = true
            }
        },
        [fetchMemberData.fulfilled]: (state, action) => {
            if (action.payload != null)
                state.otherMembers.push(action.payload)
        }
    }
})


export default usersSlice.reducer

export const {quitLogin, request2JoinGroup, finishJoinGroup} = usersSlice.actions

export const selectLoginStatus = state => state.users.isLogin

export const selectUserData = state => state.users.user

export const selectJoinGroup = state => state.users.joinGroup

// export const selectMemberByUid = uid => state => {
//     const m = state.users.otherMembers.find(e => e.uid === uid)
//     return m ? m : null
// }

export const selectMembersByUids = uids => state => {
    let members = []
    for (const uid of uids) {
        const m = state.users.otherMembers.find(e => e.uid === uid)
        if (m)
            members.push(m)
    }
    return members
}
