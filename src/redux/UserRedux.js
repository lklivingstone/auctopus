import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user_details",
    initialState: {
        user : null,
        token : null,
        books : null,
        booksMap: {},
        isFetching : false,
        error : false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action)=> {
            state.isFetching = false
            state.error = false
            state.user = action.payload["user"]
            state.books = action.payload["books"]
            state.booksMap = action.payload["booksMap"]
            state.token = action.payload["access_token"]
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        logOut: (state)=> {
            state.user = null
            state.token = null
            state.books = null
            state.isFetching = false
            state.error = false
        },
        updateOwnedBooks: (state, action)=> {
            state.books = action.payload
        },
        updateOwnedBooksMap: (state, action)=> {
            state.booksMap = action.payload
        }
    }
})

export const { loginStart, loginFailure, loginSuccess, logOut, updateOwnedBooks, updateOwnedBooksMap } = userSlice.actions
export default userSlice.reducer