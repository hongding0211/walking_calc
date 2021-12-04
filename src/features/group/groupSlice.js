import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {getGroupsByUid} from "../../api/client";

const initialState = []

export const fetchGroups = createAsyncThunk(
    'group/fetchGroups',
    async (uid) => {
        return await getGroupsByUid(uid)
    }
)

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchGroups.fulfilled]: (state, action) => {
            const uid = action.meta.arg
            state.length = 0
            for (let group of action.payload) {
                const recordLength = group.records.length
                let latestEdit = 0
                let debt = 0
                // calculate latest edited time
                if (recordLength > 0)
                    latestEdit = group.records[recordLength - 1].time
                // TODO calculate debt
                for (const record of group.records) {
                    // user paid the bill
                    const dividedBill = record.paid / record.forWhom.length
                    const totalBill = Number(record.paid)
                    if (uid === record.who) {
                        debt += totalBill
                    }
                    // someone paid for user
                    if (record.forWhom.find(e => e === uid)) {
                        debt -= dividedBill
                    }
                }
                group = {...group, latestEdit, debt}
                state.push(group)
            }
            // resort by latest edited time
            state.sort((x, y) => y.latestEdit - x.latestEdit)
        }
    }
})


export default groupSlice.reducer

export const selectGroups = state => state.group

export const selectTotalDebt = ({group}) => {
    let sum = 0
    for (const g of group)
        sum += g.debt
    return sum
}

export const selectGroupById = groupId => state => state.group.find(e => e.groupID === groupId)
