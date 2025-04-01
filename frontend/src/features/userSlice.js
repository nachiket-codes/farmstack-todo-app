import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiClient from "../apiClient"


const initialState = {
    username : '',
    loading : false,
}

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
    const response = await apiClient('/users/get', 
        {
            headers : {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        }
    )
    return response.data
})

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase( fetchUser.fulfilled, (state, action) => {
            state.username = action.payload.username
            state.loading = false
        })
        .addCase( fetchUser.rejected, (state) => {
            state.loading = false
        })
        .addCase( fetchUser.pending, (state) => {
            state.loading = true
        })
    }
})

export default UserSlice.reducer;