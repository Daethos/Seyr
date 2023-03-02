export interface Ascean {
    name: string;
    description: string;
    user: object;
    
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    
    weapon_one: object;
    weapon_two: object;
    weapon_three: object;
    shield: object;
    helmet: object;
    chest: object; 
    legs: object;
    amulet: object;
    ring_one: object;
    ring_two: object;
    trinket: object;
    
    faith: string;
    mastery: string;
    origin: string;
    sex: string;
    
    currency: object;
    experience: number;
    high_score: number;
    level: number;
    
    coordinates: object;
    firewater: object;
    inventory: [];
    maps: [];
    quests: [];
    tutorial: object;
    
    index: string;
    shareable: string;
    visibiility: string;
    dislikes: [];
    double_dislikes: [];
    likes: [];
};

export interface Player extends Ascean {
    currentCharges: number;
    maxCharges: number;
};

export interface Enemy extends Ascean {
    named: boolean;
    type: string;
    humanoid: boolean;
    animal: boolean;
};

export interface NPC {
    name: string;
    named: boolean;
    type: string;
    description: string;
    
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    
    weapon_one: object;
    weapon_two: object;
    weapon_three: object;
    shield: object;
    helmet: object;
    chest: object; 
    legs: object;
    amulet: object;
    ring_one: object;
    ring_two: object;
    trinket: object;
    
    faith: string;
    mastery: string;
    origin: string;
    sex: string;
    
    currency: object;
    level: number;
    experience: number;
};

export interface Equipment {
    name: string;
    type: string;
    rarity: string;
    itemType: string;
    grip: string | null;
    attack_type: string | null;
    damage_type: [string] | [] | null;
    physical_damage: number | null;
    magical_damage: number | null;
    physical_penetration: number | null;
    magical_penetration: number | null;
    physical_resistance: number | null;
    magical_resistance: number | null;
    critical_chance: number;
    critical_damage: number;
    dodge: number;
    roll: number;
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    influences: [string] | null;
    imgURL: string;
    _id: string;
}

export interface GameData {
    player: Ascean;
    opponent: Enemy;
    background: string;
    dialog: object;

    loading: boolean;
    loadingAscean: boolean;
    loadingOpponent: boolean;
    loadingOverlay: boolean;
    loadingContent: boolean;
    loadingCombatOverlay: boolean;

    loadedAscean: boolean;

    saveExp: boolean;
    lootRoll: boolean;
    itemSaved: boolean;
    eqpSwap: boolean;
    checkLoot: boolean;
    removeItem: boolean;

    gameplayModal: boolean;
    gameplayEvent: object;

    combatResolved: boolean;

    showCity: boolean;
    showDialog: boolean;
    showInventory: boolean;

    cityButton: boolean;

    lootDrop: Equipment;
    lootDropTwo: Equipment;
    merchantEquipment: Equipment;

    cityOption: string;
    currentIntent: string;
    overlayContent: string;
    storyContent: string;
    combatOverlayText: string;
};

interface Game_Action {
    type: string;
    payload: any;
};

export const GAME_ACTIONS = {
    SET_GAME_DATA: 'SET_GAME_DATA',
    SET_PLAYER: 'SET_PLAYER',
    SET_OPPONENT: 'SET_OPPONENT',
    SET_BACKGROUND: 'SET_BACKGROUND',
    SET_DIALOG: 'SET_DIALOG',
    SAVE_EXP: 'SAVE_EXP',
    SET_SAVE_WORLD: 'SET_SAVE_WORLD',
    WORLD_SAVED: 'WORLD_SAVED',

    LOOT_ROLL: 'LOOT_ROLL',
    ITEM_SAVED: 'ITEM_SAVED',
    EQP_SWAP: 'EQP_SWAP',
    CHECK_LOOT: 'CHECK_LOOT',
    REMOVE_ITEM: 'REMOVE_ITEM',

    LOADING: 'LOADING',
    LOADING_ASCEAN: 'LOADING_ASCEAN',
    LOADING_OPPONENT: 'LOADING_OPPONENT',
    LOADING_OVERLAY: 'LOADING_OVERLAY',
    LOADING_CONTENT: 'LOADING_CONTENT',
    LOADING_COMBAT_OVERLAY: 'LOADING_COMBAT_OVERLAY',
    LOADED_ASCEAN: 'LOADED_ASCEAN',

    GET_OPPONENT: 'GET_OPPONENT',

    SET_ENTER_CITY: 'SET_ENTER_CITY',
    SET_LEAVE_CITY: 'SET_LEAVE_CITY',

    CLOSE_OVERLAY: 'CLOSE_OVERLAY',

    CLEAR_LOOTDROP: 'CLEAR_LOOTDROP',

    SET_GAMEPLAY_MODAL: 'SET_GAMEPLAY_MODAL',
    SET_GAMEPLAY_EVENT: 'SET_GAMEPLAY_EVENT',
    SET_COMBAT_RESOLVED: 'SET_COMBAT_RESOLVED',
    SET_SHOW_CITY: 'SET_SHOW_CITY',
    SET_SHOW_DIALOG: 'SET_SHOW_DIALOG',
    SET_SHOW_INVENTORY: 'SET_SHOW_INVENTORY',
    SET_CITY_BUTTON: 'SET_CITY_BUTTON',
    SET_LOOT_DROP: 'SET_LOOT_DROP',
    SET_LOOT_DROP_TWO: 'SET_LOOT_DROP_TWO',
    SET_MERCHANT_EQUIPMENT: 'SET_MERCHANT_EQUIPMENT',

    SET_CITY_OPTION: 'SET_CITY_OPTION',
    SET_CURRENT_INTENT: 'SET_CURRENT_INTENT',
    SET_OVERLAY_CONTENT: 'SET_OVERLAY_CONTENT',
    SET_STORY_CONTENT: 'SET_STORY_CONTENT',
    SET_COMBAT_OVERLAY_TEXT: 'SET_COMBAT_OVERLAY_TEXT',

};

export const initialGameData: GameData = {
    player: {} as unknown as Player,
    opponent: null as unknown as Enemy,
    background: '',
    dialog: {},
    loading: true,
    loadingAscean: false,
    loadingOpponent: false,
    loadingOverlay: false,
    loadingContent: false,
    loadingCombatOverlay: false,
    loadedAscean: false,
    saveExp: false,
    lootRoll: false,
    itemSaved: false,
    eqpSwap: false,
    checkLoot: false,
    removeItem: false,
    gameplayModal: false,
    gameplayEvent: { title: "", description: "" },
    combatResolved: false,
    showCity: false,
    showDialog: false,
    showInventory: false,
    cityButton: false,
    lootDrop: [] as unknown as Equipment,
    lootDropTwo: [] as unknown as Equipment,
    merchantEquipment: [] as unknown as Equipment,
    cityOption: 'Innkeep',
    currentIntent: 'challenge',
    overlayContent: '',
    storyContent: '', 
    combatOverlayText: '',
};

export const GameStore = (game: GameData, action: Game_Action) => {
    switch (action.type) {
        case GAME_ACTIONS.SET_GAME_DATA:
            return {
                ...game,
            };
        case GAME_ACTIONS.SET_PLAYER:
            return {
                ...game,
                player: action.payload,
            };
        case GAME_ACTIONS.SET_OPPONENT:
            return {
                ...game,
                opponent: action.payload,
            };
        case GAME_ACTIONS.GET_OPPONENT:
            return {
                ...game,
                checkLoot: action.payload,
                loadingOpponent: action.payload,
            };
        case GAME_ACTIONS.SET_SAVE_WORLD:
            return {
                ...game,
                overlayContent: action.payload,
                loadingContent: true,
            };
        case GAME_ACTIONS.WORLD_SAVED:
            return {
                ...game,
                overlayContent: '',
                loadingContent: false,
                loadingOverlay: false,
            };
        case GAME_ACTIONS.SET_BACKGROUND:
            return {
                ...game,
                background: action.payload,
            };
        case GAME_ACTIONS.SET_DIALOG:
            return {
                ...game,
                dialog: action.payload,
            };
        case GAME_ACTIONS.SAVE_EXP:
            return {
                ...game,
                saveExp: action.payload,
            };
        case GAME_ACTIONS.LOOT_ROLL:
            return {
                ...game,
                lootRoll: action.payload,
            };
        case GAME_ACTIONS.ITEM_SAVED:
            return {
                ...game,
                itemSaved: action.payload,
            };
        case GAME_ACTIONS.EQP_SWAP:
            return {
                ...game,
                eqpSwap: action.payload,
            };
        case GAME_ACTIONS.CHECK_LOOT:
            return {
                ...game,
                checkLoot: action.payload,
            };
        case GAME_ACTIONS.REMOVE_ITEM:
            return {
                ...game,
                removeItem: action.payload,
            };
        case GAME_ACTIONS.LOADING:
            return {
                ...game,
                loading: action.payload,
            };
        case GAME_ACTIONS.LOADING_ASCEAN:
            return {
                ...game,
                loadingAscean: action.payload,
            };
        case GAME_ACTIONS.LOADING_OPPONENT:
            return {
                ...game,
                loadingOpponent: action.payload,
                showInventory: false,
            };
        case GAME_ACTIONS.LOADING_OVERLAY:
            return {
                ...game,
                loadingOverlay: action.payload,
            };
        case GAME_ACTIONS.LOADING_CONTENT:
            return {
                ...game,
                loadingContent: action.payload,
            };
        case GAME_ACTIONS.LOADING_COMBAT_OVERLAY:
            return {
                ...game,
                loadingCombatOverlay: action.payload,
            };
        case GAME_ACTIONS.LOADED_ASCEAN:
            return {
                ...game,
                loadedAscean: action.payload,
            };
        case GAME_ACTIONS.SET_GAMEPLAY_MODAL:
            return {
                ...game,
                gameplayModal: action.payload,
            };
        case GAME_ACTIONS.SET_GAMEPLAY_EVENT:
            return {
                ...game,
                gameplayEvent: action.payload,
            };
        case GAME_ACTIONS.SET_COMBAT_RESOLVED:
            return {
                ...game,
                combatResolved: action.payload,
                loadingCombatOverylay: action.payload,
                combatOverlayText: '',
            };
        case GAME_ACTIONS.SET_SHOW_CITY:
            return {
                ...game,
                showCity: action.payload,
            };
        case GAME_ACTIONS.SET_SHOW_DIALOG:
            return {
                ...game,
                showDialog: action.payload,
            };
        case GAME_ACTIONS.SET_SHOW_INVENTORY:
            return {
                ...game,
                showInventory: action.payload,
            };
        case GAME_ACTIONS.SET_CITY_BUTTON:
            return {
                ...game,
                cityButton: action.payload,
            };
        case GAME_ACTIONS.SET_LOOT_DROP:
            return {
                ...game,
                lootDrop: action.payload,
            };
        case GAME_ACTIONS.SET_LOOT_DROP_TWO:
            return {
                ...game,
                lootDropTwo: action.payload,
            };
        case GAME_ACTIONS.SET_MERCHANT_EQUIPMENT:
            return {
                ...game,
                merchantEquipment: action.payload,
            };
        case GAME_ACTIONS.SET_CITY_OPTION:
            return {
                ...game,
                cityOption: action.payload,
            };
        case GAME_ACTIONS.SET_CURRENT_INTENT:
            return {
                ...game,
                currentIntent: action.payload,
            };
        case GAME_ACTIONS.SET_OVERLAY_CONTENT:
            return {
                ...game,
                overlayContent: action.payload,
            };
        case GAME_ACTIONS.SET_STORY_CONTENT:
            return {
                ...game,
                storyContent: action.payload,
            };
        case GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT:
            return {
                ...game,
                combatOverlayText: action.payload,
            };
        case GAME_ACTIONS.SET_LEAVE_CITY:
            return {
                ...game,
                cityButton: action.payload,
                showCity: action.payload,
            };
        case GAME_ACTIONS.SET_ENTER_CITY:
            return {
                ...game,
                storyContent: action.payload,
                cityButton: true,
            };
        case GAME_ACTIONS.CLOSE_OVERLAY:
            return {
                ...game,
                overlayContent: '',
                loadingOverlay: action.payload,
                loadingContent: action.payload,
            };
        case GAME_ACTIONS.CLEAR_LOOTDROP:
            let lootDrop = action.payload;
            if (lootDrop?._id === game.lootDrop?._id) {
                return {
                    ...game,
                    lootDrop: null,
                };
            } else {
                return {
                    ...game,
                    lootDropTwo: null,
                };
            }
        default:
            return game;
    };
};