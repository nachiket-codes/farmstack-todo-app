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

export const addTodo = createAsyncThunk('todos/addTodo', async ( todo ) => {
    const response = await apiClient.post('/todos/add',
        todo,
        {
        headers : {
            'Content-Type': "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
        }
    })
    return response.data;
})

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async( todoId ) => {
    const response = await apiClient.delete(`/todos/${todoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
            }
    })
    return response.data;
})

export const editTodo = createAsyncThunk("todo/editTodo", async(todo) => {
    const response = await apiClient.put(`/todos/edit`, todo, {
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
        .addCase(addTodo.fulfilled, (state) => {
            console.log("Todo added")
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.todo_id)
        })
        .addCase(editTodo.fulfilled, (state, action) => {
            state.todos = state.todos.map(todo => todo.id === action.payload.id ? action.payload : todo)
        })
    }
})

export default TodoSlice.reducer;