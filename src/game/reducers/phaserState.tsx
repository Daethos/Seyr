import { createSlice } from '@reduxjs/toolkit';
import { Equipment } from '../../components/GameCompiler/GameStore';

export const phaserSlice = createSlice({
    name: 'phaser',
    initialState: {
        assets: null as [] | null,
        player: null,
        gameChange: false,
    },
    reducers: {
        getPhaserAssets: (state) => {
            return {
                ...state,
                gameChange: false,
            };
        },
        getPhaserPlayer: (state) => {
            return {
                ...state,
                player: null,
                gameChange: false,
            };
        },

        setPhaserAssets: (state, action) => {
            return {
                ...state,
                assets: action.payload,
                gameChange: true,
            };
        },
        setPhaserPlayer: (state, action) => {
            return {
                ...state,
                player: action.payload,
            };
        },
        setPhaserGameChange: (state, action) => {
            return {
                ...state,
                gameChange: action.payload,
            };
        },
    },
    extraReducers: (builder) => {},
});

export const {
    getPhaserAssets,
    getPhaserPlayer,
    
    setPhaserAssets,
    setPhaserPlayer,
    setPhaserGameChange,

} = phaserSlice.actions;

export default phaserSlice.reducer;