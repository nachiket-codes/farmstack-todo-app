import { configureStore } from "@reduxjs/toolkit"
import TodoSlice from "./features/TodoSlice"
import userSlice from "./features/userSlice"

export const store = configureStore({
    reducer : {
        todo : TodoSlice,
        user : userSlice
    }
})