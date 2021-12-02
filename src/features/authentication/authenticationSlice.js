import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
    uid: 0,
    name: '',
    img: null,
}


export const fetchUserData = createAsyncThunk(
    'authentication/fetchUserData',
    async (uid) => {
        let fetchRes = await fetch(global.host + `/getUsers?uid=${uid}`)
        return await fetchRes.json()
    }
)

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserData.fulfilled]: (state, action) => {
            if (action.payload.code === 200) {
                const u = action.payload.data.users[0]
                state.uid = u.uid
                state.name = u.name
                state.img = 'data:image/png;base64,' + u.img
            }
        }
    }
})


export default authenticationSlice.reducer

export const selectUserData = state => state.authentication