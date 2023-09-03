import { createSlice } from '@reduxjs/toolkit';
import { Equipment } from '../../components/GameCompiler/GameStore';

export const phaserSlice = createSlice({
    name: 'phaser',
    initialState: {
        assets: null as [] | null,
        player: null,
        gameChange: false,
        currentMessage: '',
        messageList: [],
        showChat: false,
        loading: true,
        isTyping: false,
        room: 'Lobby',
        password: 'Lobby',
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

        setMessageList: (state, action) => {
            console.log(action.payload, "Action Payload For Message List?")
            return {
                ...state,
                messageList: action.payload,
            };
        },
        setCurrentMessage: (state, action) => {
            return {
                ...state,
                currentMessage: action.payload,
            };
        },
        setRoom: (state, action) => {
            return {
                ...state,
                room: action.payload,
            };
        },
        setPassword: (state, action) => {
            return {
                ...state,
                password: action.payload,
            };
        },
        setShowChat: (state, action) => {
            return {
                ...state,
                showChat: action.payload,
            };
        },
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload,
            };
        },
        setIsTyping: (state, action) => {
            return {
                ...state,
                isTyping: action.payload,
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
    
    setMessageList,
    setCurrentMessage,
    setRoom,
    setPassword,
    setShowChat,
    setLoading,
    setIsTyping,

    setPhaserAssets,
    setPhaserPlayer,
    setPhaserGameChange,

} = phaserSlice.actions;

export default phaserSlice.reducer;