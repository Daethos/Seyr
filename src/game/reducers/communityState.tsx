import { createSlice } from "@reduxjs/toolkit";
import { Player } from "../../components/GameCompiler/GameStore";

export const communitySlice = createSlice({
    name: 'community',
    initialState: {
        ascean: [],
        focus: null,
        scores: [],
        isLoading: false,
    },
    reducers: { 
        getCommunityAsceanFetch: (state) => {
            state.isLoading = true;
        },
        getCommunityAsceanSuccess: (state, action) => {
            state.ascean = action.payload.ascean;
            state.scores = action.payload.scores;
            state.isLoading = false;
        },
        getCommunityAsceanFailure: (state) => {
            state.isLoading = false;
        },
        getFocusAsceanFetch: (state, _action) => {
            state.isLoading = true;
        },
        getFocusAsceanSuccess: (state, action) => {
            state.focus = action.payload;
            state.isLoading = false;
        },
    },
});

export const { getCommunityAsceanFetch, getCommunityAsceanSuccess, getFocusAsceanFetch, getFocusAsceanSuccess } = communitySlice.actions;
export default communitySlice.reducer;