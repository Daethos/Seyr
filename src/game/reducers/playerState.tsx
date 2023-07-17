import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../../components/GameCompiler/GameStore";


export const playerSlice = createSlice({
    name: 'ascean',
    initialState: {
        player: {} as Player,
        isLoading: false,
    },
    reducers: {
        getAsceanAllFetch: (state) => {
            state.isLoading = true;    
        },
        getAsceanAllSuccess: (state, action) => {
            state.player = action.payload;
            state.isLoading = false;
        },
        getAsceanAllFailure: (state) => {
            state.isLoading = false;
        },
    },
});

export const { getAsceanAllFetch, getAsceanAllSuccess, getAsceanAllFailure } = playerSlice.actions;
export default playerSlice.reducer;