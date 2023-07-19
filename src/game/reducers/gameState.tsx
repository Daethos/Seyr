import { createSlice } from "@reduxjs/toolkit";
import { Equipment, Player } from "../../components/GameCompiler/GameStore";

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        player: {} as unknown as Player,
        dialog: {},
        traits: {},
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
        }
    },
    reducers: {
        getGameFetch: (state, _action) => {
            state.loading = true;    
        }, 
        getDrinkFirewaterFetch: (state, _action) => {
            state.loadedAscean = false;
        },
        getReplenishFirewaterFetch: (state, _action) => {
            state.loadedAscean = false;
        },
        getGainExperienceFetch: (state, _action) => {
            state.loadedAscean = false;
        },
        getAsceanAndInventoryFetch: (state, _action) => {
            state.loadingAscean = true;
        },
        getOnlyInventoryFetch: (state, _action) => {
            state.loadingAscean = true;
        },
        getLootDropFetch: (state, _action) => {},
        getCombatStatisticFetch: (state, _action) => {
            state.loadedAscean = false;
        },
        getInteractingLootFetch: (state, _action) => {},
        getAsceanLevelUpFetch: (state, _action) => {
            state.loadedAscean = false;
        },
        getThieverySuccessFetch: (state, _action) => {},
        getPurchaseFetch: (state, _action) => {},
        // ===== Player Concerns ===== \\
        setPlayer: (state, action) => {
            state.player = action.payload;
        },
        setPlayerLevelUp: (state, action) => {
            state.player = {
                ...action.payload,
                inventory: state.player.inventory,
            };
        },
        setAsceanState: (state, action) => {
            state.asceanState = action.payload;
        },
        setAttributes: (state, action) => {
            state.player.constitution = action.payload.constitution;
            state.player.strength = action.payload.strength;
            state.player.agility = action.payload.agility;
            state.player.achre = action.payload.achre;
            state.player.caeren = action.payload.caeren;
            state.player.kyosir = action.payload.kyosir;
            state.player.statistics = action.payload.statistics;
        },
        setCurrency: (state, action) => {
            state.player.currency = action.payload;
            state.loadedAscean = true;
        },
        setExperience: (state, action) => {
            state.player.experience = action.payload;
            state.loadedAscean = true;
        },
        setFirewater: (state, action) => {
            state.player.firewater = action.payload;
            state.loadedAscean = true;
        },
        setInitialAsceanState: (state, action) => {
            state.asceanState = {
                ...state.asceanState,
                'ascean': action.payload.ascean,
                'currentHealth': action.payload.ascean.health.current,
                'level': action.payload.ascean.level,
                'experience': action.payload.ascean.experience,
                'experienceNeeded': action.payload.ascean.level * 1000,
                'mastery': action.payload.ascean.mastery,
                'faith': action.payload.ascean.faith,
            };
        },
        setInventory: (state, action) => {
            state.player.inventory = action.payload;
            state.loadedAscean = true;
        },
        setJournal: (state, action) => {
            state.player.journal = action.payload;
        },
        setJournalEntry: (state, action) => {
            state.player.journal = {
                ...state.player.journal,
                currentEntry: action.payload,
            };
        },
        setSettings: (state, action) => { 
            state.soundEffectVolume = action.payload.soundEffectVolume;
            state.shake = action.payload.shake;
            state.vibrationTime = action.payload.vibrationTime;   
        },
        setStatistics: (state, action) => {
            state.player.statistics = action.payload;
        },
        setTraits: (state, action) => {
            state.traits = action.payload;
        },
        // ===== Game Concerns ===== \\
        setCheckLoot: (state, action) => {
            state.checkLoot = action.payload;
        },
        setCombatResolved: (state, action) => {
            state.combatResolved = action.payload;
        },
        setCurrentIntent: (state, action) => {
            state.currentIntent = action.payload;
        },
        setDialog: (state, action) => {
            state.dialog = action.payload;
        },
        setInstantStatus: (state, action) => {
            state.instantStatus = action.payload;
        }, 
        setPlayerBlessing: (state, action) => {
            state.playerBlessed = action.payload;
        }, 
        setShowDialog: (state, action) => {
            console.log(`setShowDialog: ${action.payload}`);
            state.showDialog = action.payload;
        },
        setShowInventory: (state, action) => {
            state.showInventory = action.payload;
        },
        setMerchantEquipment: (state, action) => {
            state.merchantEquipment = action.payload;
        },
        // ===== Loot Drops ===== \\
        setLootDrops: (state, action) => {
            state.lootDrops = [
                ...state.lootDrops,
                action.payload,
            ];
        },
        setClearLootDrop: (state, action) => {
            const lootDrops = state.lootDrops.filter((drop) => drop._id !== action.payload);
            state.lootDrops = lootDrops;
        },
        setClearLootDrops: (state) => {
            state.lootDrops = [];
        },
        setShowLoot: (state, action) => {
            if (action.payload.interacting) {
                state.showLootIds = [
                    ...state.showLootIds,
                    action.payload.loot,
                ];
                state.showLoot = action.payload.interacting
            } else {
                state.showLootIds = [
                    ...state.showLootIds.filter((id) => id !== action.payload.loot),
                ];
                state.showLoot = state.showLootIds.length > 1 ? state.showLoot : false;
            };
        },
        setShowLootOne: (state, action) => {
            state.showLoot = action.payload;
        }, 
        // ===== Dialogue ===== \\
        setCurrentDialogNode: (state, action) => {
            console.log(`setCurrentDialogNode: ${action.payload}`);
            state.currentNode = action.payload;
        },
        setCurrentNodeIndex: (state, action) => {
            state.currentNodeIndex = action.payload;
        },
        setRendering: (state, action) => {
            state.renderedText = action.payload.text;
            state.renderedOptions = action.payload.options;
        },
        // ====== Settings ====== \\
        setVolume: (state, action) => {
            state.soundEffectVolume = action.payload;
        },
        setShake: (state, action) => {
            state.shake = action.payload;
        },
        setVibrationTime: (state, action) => {
            state.vibrationTime = action.payload;
        },
    },
});

export const { 
    getGameFetch, 
    getAsceanAndInventoryFetch, 
    getAsceanLevelUpFetch, 
    getDrinkFirewaterFetch, 
    getInteractingLootFetch, 
    getGainExperienceFetch, 
    getLootDropFetch, 
    getOnlyInventoryFetch, 
    getPurchaseFetch, 
    getReplenishFirewaterFetch, 
    getThieverySuccessFetch, 
    
    setPlayer, 
    setSettings, 
    setInitialAsceanState,
    setPlayerLevelUp, 
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
    
    setCombatResolved, 
    setInstantStatus, 
    setMerchantEquipment, 
    setPlayerBlessing, 
    
    setShowInventory, 
    setCheckLoot, 
    setLootDrops, 
    setShowLoot, 
    setClearLootDrops, 
    setClearLootDrop, 
    setShowLootOne, 
    
    setDialog, 
    setShowDialog, 
    setCurrentDialogNode, 
    setCurrentIntent, 
    setCurrentNodeIndex, 
    setRendering, 

} = gameSlice.actions;

export default gameSlice.reducer;