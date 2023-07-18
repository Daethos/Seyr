import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../../components/GameCompiler/GameStore";


export const playerSlice = createSlice({
    name: 'ascean',
    initialState: {
        player: {} as Player,
        isLoading: false,
    },
    reducers: {
        getAsceanFetch: (state) => {
            state.isLoading = true;    
        },
        getAsceanSuccess: (state, action) => {
            state.player = action.payload;
            state.isLoading = false;
        },
        getAsceanFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export const { getAsceanFetch, getAsceanSuccess, getAsceanFailure } = playerSlice.actions;
export default playerSlice.reducer;