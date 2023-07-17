import { createSlice } from "@reduxjs/toolkit";
import { initialGameData } from "../../components/GameCompiler/GameStore";

export const playerSlice = createSlice({
    name: 'game',
    initialState: initialGameData,
    reducers: { },
});

export const { } = playerSlice.actions;
export default playerSlice.reducer;