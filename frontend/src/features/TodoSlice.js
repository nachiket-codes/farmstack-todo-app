import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import apiClient from "../apiClient"


const initialState = {
    todos : [],
    loading : false,
    error : ''
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const response = await apiClient.get("/todos/", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
            }
    })
    return response.data;
})

const TodoSlice = createSlice({
    name: "Todos",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = action.payload
            state.loading = false
        })
        .addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(fetchTodos.pending, (state) =>{
            state.loading = true
        })
    }
})

export default TodoSlice.reducer;