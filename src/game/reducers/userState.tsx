import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../pages/App/App";
import userService from "../../utils/userService";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userService.getUser() as User | null,
        ascean: [],
        isLoading: false,
        hasAscean: true,
        socket: false,
    },
    reducers: {
        getUserFetch: (state) => {
            state.isLoading = true;    
        },
        getUserSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        getUserFailure: (state) => {
            state.isLoading = false;
        },
        getUserAsceanFetch: (state) => {
            state.isLoading = true;
        },
        getUserAsceanSuccess: (state, action) => {
            state.ascean = action.payload;
            state.isLoading = false;
            state.hasAscean = action.payload.length > 0 ? true : false;
        },
        getUserAsceanFailure: (state) => {
            state.isLoading = false;
        },
        getUserLogout: (state) => {
            console.log('getUserLogout');
            state.user = null;
            state.ascean = [];
        }, 
    },
});

export const { getUserFetch, getUserSuccess, getUserFailure, getUserLogout, getUserAsceanFetch, getUserAsceanSuccess } = userSlice.actions;
export default userSlice.reducer;