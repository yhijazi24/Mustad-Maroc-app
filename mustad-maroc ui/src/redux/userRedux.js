import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false,
                state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false,
                state.error = true;
        },
        registerStart: (state) =>{
            state.isFetching = true;
            state.success = false;
        },
        registerSuccess: (state) => {
            state.isFetching = false;
            state.success = true;
            state.error = false;
        },
        registerFailure: (state) =>{
            state.isFetching = false;
            state.error = true;
            state.success = false;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, registerFailure, registerSuccess, registerStart } = userSlice.actions;
export default userSlice.reducer; 