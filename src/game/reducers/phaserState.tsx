import { createSlice } from '@reduxjs/toolkit';

export const phaserSlice = createSlice({
    name: 'phaser',
    initialState: {
        assets: null as [] | null,
        player: null,
        players: {},
        self: null,
        socketId: '',
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
            console.log(action.payload, "Is Typing?")
            return {
                ...state,
                isTyping: action.payload,
            };
        },
        setPhaserAssets: (state, action) => {
            return {
                ...state,
                assets: action.payload,
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
        setPlayers: (state, action) => { 
            return {
                ...state,
                players: action.payload,
            };
        },
        setSocketId: (state, action) => {
            return {
                ...state,
                socketId: action.payload,
            };
        },
        setSelf: (state, action) => {
            return {
                ...state,
                self: action.payload,
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
    setPlayers,
    setSocketId,
    setSelf,

} = phaserSlice.actions;

export default phaserSlice.reducer;