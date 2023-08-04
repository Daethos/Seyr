import { createSlice } from "@reduxjs/toolkit";
import { Equipment, Player } from "../../components/GameCompiler/GameStore";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        player: {} as unknown as Player,
        dialog: {},
        traits: null,
        loading: true,
        loadingAscean: false,
        loadingDeity: false,
        loadedAscean: false,
        playerBlessed: false,
        checkLoot: false,
        combatResolved: false,
        instantStatus: false,
        showDialog: false,
        showInventory: false,
        lootDrops: [] as Equipment[],
        merchantEquipment: [],
        cityOption: 'Innkeep',
        currentIntent: 'challenge',
        shake: { duration: 200, intensity: 1 },
        vibrationTime: 150,
        soundEffectVolume: 0.3,
        currentNodeIndex: 0,
        currentNode: { id: '', text: '', options: [], npcIds: [] },
        renderedOptions: [],
        renderedText: '',
        showLootIds: [] as string[],
        showLoot: false,
        asceanState: {
            ascean: {},
            currentHealth: 0,
            constitution: 0,
            strength: 0,
            agility: 0,
            achre: 0,
            caeren: 0,
            kyosir: 0,
            level: 0,
            opponent: 0,
            opponentExp: 0,
            experience: 0,
            experienceNeeded: 0,
            mastery: '',
            faith: '',
            avarice: false,
        },
        tutorial: null,
        asceanViews: 'Character',
        gameTimer: 0,
        staminaPercentage: 100,
        dialogTag: false,
        pauseState: false,
        showPlayer: false,
        currentGame: false,
        gameChange: false,
        scrollEnabled: false,
    },
    reducers: {
        getGameFetch: (state, _action) => { state.loading = true; },
        getDrinkFirewaterFetch: (state, _action) => {},
        getReplenishFirewaterFetch: (state, _action) => {},
        getRestoreFirewaterFetch: (state, _action) => {},
        getGainExperienceFetch: (state, _action) => {},
        getAsceanAndInventoryFetch: (state, _action) => {},
        getOnlyInventoryFetch: (state, _action) => {},
        getLootDropFetch: (state, _action) => {},
        getCombatStatisticFetch: (state, _action) => {},
        getAsceanLevelUpFetch: (state, _action) => {},
        getThieverySuccessFetch: (state, _action) => {},
        getPurchaseFetch: (state, _action) => {},

        // ==================== Player Concerns ==================== \\

        setPlayer: (state, action) => {
            return { ...state, player: action.payload };
        },
        setPlayerLevelUp: (state, action) => {
            return { ...state, player: { ...action.payload, inventory: state.player.inventory } };
        },
        setAsceanState: (state, action) => {
            return { ...state, asceanState: action.payload };
        },
        setAttributes: (state, action) => {
            const { constitution, strength, agility, achre, caeren, kyosir, statistics } = action.payload;
            return { ...state, player: { ...state.player, constitution, strength, agility, achre, caeren, kyosir, statistics } };
        },
        setCurrency: (state, action) => {
            return { ...state, player: { ...state.player, currency: action.payload } };
        },
        setExperience: (state, action) => {
            return { ...state, player: { ...state.player, experience: action.payload } };
        },
        setFirewater: (state, action) => {
            return { ...state, player: { ...state.player, firewater: action.payload } };
        },
        setInitialAsceanState: (state, action) => {
            return {
                ...state,
                asceanState: {
                    ...state.asceanState,
                    'ascean': action.payload.ascean,
                    'currentHealth': action.payload.ascean.health.current,
                    'level': action.payload.ascean.level,
                    'experience': action.payload.ascean.experience,
                    'experienceNeeded': action.payload.ascean.level * 1000,
                    'mastery': action.payload.ascean.mastery,
                    'faith': action.payload.ascean.faith,
                },
            };
        },
        setInventory: (state, action) => {
            return { ...state, player: { ...state.player, inventory: action.payload } };
        },
        setJournal: (state, action) => {
            return { ...state, player: { ...state.player, journal: action.payload } };
        },
        setJournalEntry: (state, action) => {
            return { ...state, player: { ...state.player, journal: { ...state.player.journal, currentEntry: action.payload  } } };
        },
        setSettings: (state, action) => { 
            return { ...state, soundEffectVolume: action.payload.soundEffectVolume, shake: action.payload.shake, vibrationTime: action.payload.vibrationTime };
        },
        setStaminaPercentage: (state, action) => {
            return { ...state, staminaPercentage: action.payload };
        },
        setStatistics: (state, action) => {
            return { ...state, player: { ...state.player, statistics: action.payload } };
        },
        setTraits: (state, action) => {
            return { ...state, traits: action.payload };
        },

        // ==================== Game Concerns ==================== \\

        setAsceanViews: (state, action) => {
            return { ...state, asceanViews: action.payload };
        },
        setCheckLoot: (state, action) => {
            return { ...state, checkLoot: action.payload };
        },
        setCombatResolved: (state, action) => {
            return { ...state, combatResolved: action.payload };
        },
        setCurrentGame: (state, action) => {
            return { ...state, currentGame: action.payload };
        },
        setCurrentIntent: (state, action) => {
            return { ...state, currentIntent: action.payload };
        },
        setDialog: (state, action) => {
            return { ...state, dialog: action.payload };
        },
        setDialogTag: (state, action) => {
            return { ...state, dialogTag: action.payload };
        },
        setGameChange: (state, action) => {
            return { ...state, gameChange: action.payload };
        },
        setGameTimer: (state, action) => {
            return { ...state, gameTimer: action.payload };
        },
        setInstantStatus: (state, action) => {
            return { ...state, instantStatus: action.payload };
        }, 
        setPlayerBlessing: (state, action) => {
            return { ...state, playerBlessed: action.payload };
        }, 
        setShowDialog: (state, action) => {
            return { ...state, showDialog: action.payload };
        },
        setShowInventory: (state, action) => {
            return { ...state, showInventory: action.payload };
        },
        setMerchantEquipment: (state, action) => {
            return { ...state, merchantEquipment: action.payload };
        },
        setPauseState: (state, action) => {
            return { ...state, pauseState: action.payload };
        },
        setScrollEnabled: (state, action) => {
            return { ...state, scrollEnabled: action.payload };
        },
        setShowPlayer: (state, action) => {
            return { ...state, showPlayer: action.payload };
        },
        setTutorial: (state, action) => {
            return { ...state, player: { ...state.player, tutorial: action.payload } };
        },
        setTutorialContent: (state, action) => {
            return { ...state, tutorial: action.payload };
        },

        // ==================== Loot Drops ==================== \\

        setLootDrops: (state, action) => {
            return { ...state, lootDrops: [ ...state.lootDrops, action.payload ] };
        },
        setClearLootDrop: (state, action) => {
            const lootDrops = state.lootDrops.filter((drop) => drop._id !== action.payload);
            return { ...state, lootDrops: lootDrops }; 
        },
        setClearLootDrops: (state) => {
            return { ...state, lootDrops: [] };
        },
        setShowLoot: (state, action) => {
            if (action.payload.interacting) {
                return {
                    ...state,
                    showLootIds: [ ...state.showLootIds, action.payload.loot ],
                    showLoot: action.payload.interacting,
                };
            } else {
                const updatedShowLootIds = state.showLootIds.filter((id) => id !== action.payload.loot);
                return {
                    ...state,
                    showLootIds: updatedShowLootIds.length > 0 ? updatedShowLootIds : [],
                    showLoot: updatedShowLootIds.length > 0,
                };
            };
        },
        setShowLootOne: (state, action) => {
            return { ...state, showLoot: action.payload };
        }, 

        // ==================== Dialogue ==================== \\

        setCurrentDialogNode: (state, action) => { return { ...state, currentNode: action.payload }; },
        setCurrentNodeIndex: (state, action) => { return { ...state, currentNodeIndex: action.payload }; },
        setRendering: (state, action) => { return { ...state, renderedOptions: action.payload.options, renderedText: action.payload.text }; },

        // ==================== Settings ==================== \\

        setVolume: (state, action) => { return { ...state, soundEffectVolume: action.payload }; },
        setShake: (state, action) => { return { ...state, shake: action.payload }; },
        setVibrationTime: (state, action) => { return { ...state, vibrationTime: action.payload }; },
    },
});

export const { 
    getGameFetch, 
    getAsceanAndInventoryFetch, 
    getAsceanLevelUpFetch, 
    getDrinkFirewaterFetch, 
    getGainExperienceFetch, 
    getLootDropFetch, 
    getOnlyInventoryFetch, 
    getPurchaseFetch, 
    getReplenishFirewaterFetch, 
    getRestoreFirewaterFetch,
    getThieverySuccessFetch,
    
    setPlayer, 
    setSettings, 
    setInitialAsceanState,
    setPlayerLevelUp, 
    setShowPlayer,
    setShake, 
    setVibrationTime, 
    setVolume, 
    
    setAsceanState, 
    setAttributes, 
    setCurrency, 
    setExperience, 
    setFirewater, 
    setInventory, 
    setJournal, 
    setJournalEntry, 
    setStatistics, 
    setTraits, 
    setTutorial,
    setTutorialContent,
    
    setAsceanViews,
    setGameTimer,
    setCombatResolved, 
    setCurrentGame,
    setGameChange,
    setScrollEnabled,
    setInstantStatus, 
    setMerchantEquipment,
    setPauseState, 
    setPlayerBlessing,
    setStaminaPercentage, 
    
    setShowInventory, 
    setCheckLoot, 
    setLootDrops, 
    setShowLoot, 
    setClearLootDrops, 
    setClearLootDrop, 
    setShowLootOne, 
    
    setDialog, 
    setDialogTag,
    setShowDialog, 
    setCurrentDialogNode, 
    setCurrentIntent, 
    setCurrentNodeIndex, 
    setRendering, 

} = gameSlice.actions;

export default gameSlice.reducer;