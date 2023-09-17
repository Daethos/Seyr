import { DialogNode, DialogNodeOption } from "./DialogNode";

export interface Ascean {
    name: string;
    description: string;
    user: object;
    health: { current: number; total: number; };
    
    constitution: number;
    strength: number;
    agility: number;
    achre: number;
    caeren: number;
    kyosir: number;
    
    weapon_one: Equipment;
    weapon_two: Equipment;
    weapon_three: Equipment;
    shield: Equipment;
    helmet: Equipment;
    chest: Equipment; 
    legs: Equipment;
    amulet: Equipment;
    ring_one: Equipment;
    ring_two: Equipment;
    trinket: Equipment;
    
    faith: string;
    mastery: string;
    origin: string;
    sex: string;
    
    currency: { silver: number; gold: number; };
    experience: number;
    high_score: number;
    level: number;
    
    coordinates: object;
    firewater: { charges: number; maxCharges: number; };
    inventory: [];
    maps: [];
    quests: []; 
    
    index: string;
    shareable: string;
    visibiility: string;
    dislikes: [];
    double_dislikes: [];
    likes: [];
    [key: string]: any;
};

export interface Player extends Ascean {
    primary: { name: string, description: string };
    secondary: { name: string, description: string };
    tertiary: { name: string, description: string };
    journal: { entries: { type: [{ title: String, body: String, footnote: String, date: Date, location: String, coordinates: { x: Number, y: Number, }, }], default: null, length: number, }, currentEntry: { type: Number, default: 0, }, lastEntry: { type: Number, default: 0, }, },
    tutorial: {
        'firstBoot': { type: Boolean, default: true },
        'firstCity': { type: Boolean, default: true },
        'firstCombat': { type: Boolean, default: true },
        'firstQuest': { type: Boolean, default: true }, 
        'firstInventory': { type: Boolean, default: true },
        'firstLoot': { type: Boolean, default: true }, 
        'firstDeath': { type: Boolean, default: true },
        'firstLevelUp': { type: Boolean, default: true },
        'firstPhenomena': { type: Boolean, default: true },
    }
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
    alive: boolean;
    
    currency: object;
    level: number;
    experience: number;
    dialogId: string;
};

export interface Equipment {
    name: string;
    type: string;
    rarity: string;
    itemType: string;
    grip: string | null;
    attack_type: string | null;
    damage_type: [string] | [string, string] | [string, string, string] | [] | null;
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
};

// TODO:FIXME: Kyrisos (Kyrisian working name atm), Senari (Senarian working name atm) are not Ancients used yet for NPC's 
const nonNamedEnemy = [
    'Achreon Druid', "Ahn'are Apostle", "Anashtre", 
    "Astral Apostle", "Cambiren Druid", "Chiomic Jester", 
    "Daethic Inquisitor", "Daethic Knight", "Fang Duelist", 
    "Fang Mercenary", 'Firesworn', 'Fyers Occultist', 
    'Ilire Occultist', 'Kingsman', "Kyn'gian Shaman", 'Kyrisian', 
    "Licivitan Soldier", "Ma'ier Occultist", "Marauder", 
    "Northren Wanderer", "Nyren", "Old Li'ivi Occultist", 
    "Quor'eite Occultist", "Quor'eite Stalker", "Rahvrecur", 
    "Se'dyrist", "Sedyreal Guard", 'Senarian', "Se'va Shrieker", 
    "Shrygeian Bard", "Southron Wanderer", "Soverain Blood Cloak", "Tshaeral Shaman"
];

// TODO:FIXME: Plenty of work to incorporate more named enemies
const namedEnemy = [
    "Achreus", "Ashreu'ul", "Caelan Greyne", "Chios Dachreon", "Cyrian Shyne", "Daetheus", 
    "Dorien Caderyn", "Eugenes", "Evrio Lorian Peroumes", "Fierous Ashfyre", "Garris Ashenus", 
    "King Mathyus Caderyn", "Kreceus", "Laetrois Ath'Shaorah", "Leaf", "Lorian", "Mavros Ilios", 
    "Mirio", "Quor'estes", "Relien Myelle", "Sedeysus", "Sera Lorian", "Synaethi Spiras", "Torreous Ashfyre", 
    "Tshios Ash'air", "Vincere"
];

export const nameCheck = (name: string) => {
    if (namedEnemy.includes(name)) {
        return true;
    } else {
        return false;
    };
};

export const ENEMY_ENEMIES = {
    "Achreon Druid": ["Kyn'gian Shaman", "Tshaeral Shaman", "Kingsman", "Northren Wanderer"],
    "Ahn'are Apostle": ["Astral Apostle", "Licivitan Soldier", "Daethic Inquisitor", "Daethic Knight"],
    "Anashtre": ["Daethic Knight", "Soverain Blood Cloak", "Licivitan Soldier", "Daethic Inquisitor"],
    "Astral Apostle": ["Ahn'are Apostle", "Licivitan Soldier", "Daethic Inquisitor", "Daethic Knight"],
    "Cambiren Druid": ["Kyn'gian Shaman", "Tshaeral Shaman", "Kingsman", "Northren Wanderer"],
    "Chiomic Jester": ["Fang Duelist", "Fang Mercenary", "Marauder", "Shrygeian Bard"],
    "Daethic Inquisitor": ["Ilire Occultist", "Fyers Occultist", "Ma'ier Occultist", "Quor'eite Occultist", "Old Li'ivi Occultist"],
    "Daethic Knight": ["Anashtre", "Soverain Blood Cloak", "Firesworn", "Se'va Shrieker", "Quor'eite Stalker"],
    "Fang Duelist": ["Chiomic Jester", "Fang Mercenary", "Marauder", "Shrygeian Bard"],
    "Fang Mercenary": ["Chiomic Jester", "Fang Duelist", "Marauder", "Shrygeian Bard"],
    "Firesworn": ["Daethic Knight", "Fang Mercenary", "Se'va Shrieker", "Quor'eite Stalker", "Southron Wanderer"],
    "Fyers Occultist": ["Daethic Inquisitor", "Ilire Occultist", "Ma'ier Occultist", "Quor'eite Occultist", "Old Li'ivi Occultist"],
    "Ilire Occultist": ["Daethic Inquisitor", "Fyers Occultist", "Ma'ier Occultist", "Quor'eite Occultist", "Old Li'ivi Occultist"],
    "Kingsman": ["Achreon Druid", "Cambiren Druid", "Northren Wanderer", "Soverain Blood Cloak"],
    "Kyn'gian Shaman": ["Achreon Druid", "Cambiren Druid", "Southron Wanderer", "Sedyreal Guard", "Quor'eite Stalker"],
    "Licivitan Soldier": ["Old Li'ivi Occultist", "Firesworn", "Soverain Blood Cloak", "Kingsman", "Se'va Shrieker"],
    "Ma'ier Occultist": ["Daethic Inquisitor", "Fyers Occultist", "Ilire Occultist", "Quor'eite Occultist", "Old Li'ivi Occultist"],
    "Marauder": ["Fang Duelist", "Fang Mercenary", "Chiomic Jester", "Shrygeian Bard"],
    "Northren Wanderer": ["Achreon Druid", "Cambiren Druid", "Kingsman", "Soverain Blood Cloak"],
    "Nyren": ["Rahvrecur", "Se'va Shrieker", "Marauder", "Fang Mercenary"],
    "Old Li'ivi Occultist": ["Daethic Inquisitor", "Fyers Occultist", "Ilire Occultist", "Ma'ier Occultist", "Quor'eite Occultist"],
    "Quor'eite Occultist": ["Daethic Inquisitor", "Fyers Occultist", "Ilire Occultist", "Ma'ier Occultist", "Old Li'ivi Occultist"],
    "Quor'eite Stalker": ["Daethic Knight", "Firesworn", "Se'va Shrieker", "Sedyreal Guard", "Southron Wanderer"],
    "Rahvrecur": ["Nyren", "Se'va Shrieker", "Marauder", "Fang Mercenary"],
    "Se'dyrist": ["Se'va Shrieker", "Fang Mercenary", "Sedyreal Guard", "Firesworn"],
    "Sedyreal Guard": ["Se'dyrist", "Se'va Shrieker", "Firesworn", "Quor'eite Stalker", "Southron Wanderer"],
    "Se'va Shrieker": ["Se'dyrist", "Sedyreal Guard", "Firesworn", "Quor'eite Stalker", "Southron Wanderer"],
    "Shrygeian Bard": ["Chiomic Jester", "Fang Duelist", "Fang Mercenary", "Marauder"],
    "Southron Wanderer": ["Firesworn", "Quor'eite Stalker", "Sedyreal Guard", "Se'va Shrieker"],
    "Soverain Blood Cloak": ["Anashtre", "Licivitan Soldier", "Kingsman", "Northren Wanderer"],
    "Tshaeral Shaman": ["Achreon Druid", "Cambiren Druid", "Daethic Knight", "Daethic Inquisitor"],

    "Cyrian Shyne": ["King Mathyus Caderyn"],
    "Dorien Caderyn": ["Garris Ashenus"],
    "Eugenes": [""],
    "Evrio Lorian Peroumes": ["Mirio"],
    "Fierous Ashfyre": ["Synaethi Spiras"],
    "Garris Ashenus": ["Dorien Caderyn"],
    "King Mathyus Caderyn": ["Cyrian Shyne"],
    "Kreceus": ["Ahn'are Apostle", "Licivitan Soldier", "Evrio Lorian Peroumes", "Mirio"],
    "Laetrois Ath'Shaorah": ["Mavrios Ilios"],
    "Leaf": ["Kingsman", "Northren Wanderer"],
    "Lorian": ["Mavrios Ilios"],
    "Mavrios Ilios": ["Laetrois Ath'Shaorah", "Lorian"],
    "Mirio": ["Evrio Lorian Peroumes"],
    "Sera Lorian": ["Evrio Lorian Peroumes", "Dorien Caderyn"],
    "Synaethi Spiras": ["Fierous Ashfyre", "Torreous Ashfyre"],
    "Torreous Ashfyre": ["Synaethi Spiras"],
    "Vincere": ["King Mathyus Caderyn", "Dorien Caderyn", "Sera Lorian", "Evrio Lorian Peroumes"]
};

export interface GameData {
    player: Player;
    opponent: Enemy;
    background: string;
    dialog: object;

    primary: { name: string, description: string, style: string };
    secondary: { name: string, description: string, style: string };
    tertiary: { name: string, description: string, style: string };

    miniGameCambiren: boolean;
    miniGameSevan: boolean;
    miniGameShrygeian: boolean;
    miniGameTshaeral: boolean;

    loading: boolean;
    loadingAscean: boolean;
    loadingOpponent: boolean;
    loadingDeity: boolean;
    loadingOverlay: boolean;
    loadingUnderlay: boolean;
    loadingContent: boolean;
    loadingCombatOverlay: boolean;
    loadingCombatSpectatorOverlay: boolean;
    loadingSpectator: boolean;

    loadedAscean: boolean;

    playerBlessed: boolean;
    saveExp: boolean;
    saveQuest: boolean;
    lootRoll: boolean;
    itemSaved: boolean;
    eqpSwap: boolean;
    checkLoot: boolean;
    removeItem: boolean;
    repositionInventory: boolean;
    purchasingItem: boolean;

    gameplayModal: boolean;
    gameplayEvent: object;

    combatResolved: boolean;
    combatSpectatorResolved: boolean;
    instantStatus: boolean;

    showMap: boolean;
    showCity: boolean;
    showDialog: boolean;
    showInventory: boolean;

    cityButton: boolean;

    lootDrops: any[];
    lootDrop: Equipment;
    lootDropTwo: Equipment;
    merchantEquipment: any[];
    showLootIds: any[];

    cityOption: string;
    currentIntent: string;
    currentQuest: string;
    questData: object;
    overlayContent: string;
    underlayContent: string;
    storyContent: string;
    combatOverlayText: string;
    combatSpectatorOverlayText: string;

    mapMode: string;
    timeLeft: number;
    moveTimer: number;
    shake: { duration: number; intensity: number; };
    vibrationTime: number;
    canvasPosition: { x: number, y: number };
    canvasWidth: number;
    canvasHeight: number;
    joystickSpeed: number;
    soundEffectVolume: number;

    // Dialog Concerns And Options
    currentNodeIndex: number;
    currentNode: DialogNode | undefined;
    renderedOptions: DialogNodeOption[];
    renderedText: string;

    showLootOne: boolean;
    showLootTwo: boolean;
};

export interface Game_Action {
    type: string;
    payload: any;
};

export const GAME_ACTIONS = {
    SET_GAME_DATA: 'SET_GAME_DATA',
    SET_PLAYER: 'SET_PLAYER',
    SET_PLAYER_TRAITS: 'SET_PLAYER_TRAITS',
    SET_OPPONENT: 'SET_OPPONENT',
    SET_BACKGROUND: 'SET_BACKGROUND',
    SET_DIALOG: 'SET_DIALOG',
    SET_TUTORIAL: 'SET_TUTORIAL',
    SET_PLAYER_BLESSING: 'SET_PLAYER_BLESSING',
    SAVE_EXP: 'SAVE_EXP',
    SAVE_QUEST: 'SAVE_QUEST',
    SET_SAVE_WORLD: 'SET_SAVE_WORLD',
    WORLD_SAVED: 'WORLD_SAVED',

    SET_PLAYER_LEVEL_UP: 'SET_PLAYER_LEVEL_UP',
    SET_PLAYER_CURRENCY: 'SET_PLAYER_CURRENCY',
    SET_EXPERIENCE: 'SET_EXPERIENCE',
    SET_FIREWATER: 'SET_FIREWATER',
    SET_QUESTS: 'SET_QUESTS',
    SET_INVENTORY: 'SET_INVENTORY',
    SET_INVENTORY_POSITION: 'SET_INVENTORY_POSITION',
    SET_ASCEAN_ATTRIBUTES: 'SET_ASCEAN_ATTRIBUTES',
    SET_ASCEAN_AND_INVENTORY: 'SET_ASCEAN_AND_INVENTORY',
    SET_JOURNAL: 'SET_JOURNAL',
    SET_JOURNAL_ENTRY: 'SET_JOURNAL_ENTRY',
    SET_STATISTICS: 'SET_STATISTICS',

    SET_PURCHASING_ITEM: 'SET_PURCHASING_ITEM',

    INSTANT_COMBAT: 'INSTANT_COMBAT',
    LOOT_ROLL: 'LOOT_ROLL',
    ITEM_SAVED: 'ITEM_SAVED',
    EQP_SWAP: 'EQP_SWAP',
    CHECK_LOOT: 'CHECK_LOOT',
    REMOVE_ITEM: 'REMOVE_ITEM',
    REPOSITION_INVENTORY: 'REPOSITION_INVENTORY',

    LOADING: 'LOADING',
    LOADING_ASCEAN: 'LOADING_ASCEAN',
    LOADING_OPPONENT: 'LOADING_OPPONENT',
    LOADING_DEITY: 'LOADING_DEITY',
    LOADING_OVERLAY: 'LOADING_OVERLAY',
    LOADING_UNDERLAY: 'LOADING_UNDERLAY',
    LOADING_CONTENT: 'LOADING_CONTENT',
    LOADING_COMBAT_OVERLAY: 'LOADING_COMBAT_OVERLAY',
    LOADING_COMBAT_SPECTATOR_OVERLAY: 'LOADING_COMBAT_SPECTATOR_OVERLAY',
    LOADING_SPECTATOR: 'LOADING_SPECTATOR',
    LOADED_ASCEAN: 'LOADED_ASCEAN',

    GET_OPPONENT: 'GET_OPPONENT',

    SET_ENTER_CITY: 'SET_ENTER_CITY',
    SET_LEAVE_CITY: 'SET_LEAVE_CITY',

    CLOSE_OVERLAY: 'CLOSE_OVERLAY',
    CLOSE_UNDERLAY: 'CLOSE_UNDERLAY',

    CLEAR_LOOTDROP: 'CLEAR_LOOTDROP',
    CLEAR_LOOT_DROPS: 'CLEAR_LOOT_DROPS',
    CLEAR_LOOT_DROP: 'CLEAR_LOOT_DROP',
    CLEAR_SHOW_LOOT: 'CLEAR_SHOW_LOOT',
    CLEAR_SHOW_LOOT_ONE: 'CLEAR_SHOW_LOOT_ONE',

    SET_GAMEPLAY_MODAL: 'SET_GAMEPLAY_MODAL',
    SET_GAMEPLAY_EVENT: 'SET_GAMEPLAY_EVENT',
    SET_COMBAT_RESOLVED: 'SET_COMBAT_RESOLVED',
    SET_COMBAT_SPECTATOR_RESOLVED: 'SET_COMBAT_SPECTATOR_RESOLVED',
    SET_SHOW_CITY: 'SET_SHOW_CITY',
    SET_SHOW_DIALOG: 'SET_SHOW_DIALOG',
    SET_SHOW_INVENTORY: 'SET_SHOW_INVENTORY',
    SET_SHOW_MAP: 'SET_SHOW_MAP',
    SET_CITY_BUTTON: 'SET_CITY_BUTTON',
    SET_LOOT_DROPS: 'SET_LOOT_DROPS',
    SET_LOOT_DROP: 'SET_LOOT_DROP',
    SET_LOOT_DROP_TWO: 'SET_LOOT_DROP_TWO',
    SET_SHOW_LOOT: 'SET_SHOW_LOOT',
    SET_MERCHANT_EQUIPMENT: 'SET_MERCHANT_EQUIPMENT',

    SET_CITY_OPTION: 'SET_CITY_OPTION',
    SET_CURRENT_INTENT: 'SET_CURRENT_INTENT',
    SET_CURRENT_QUEST: 'SET_CURRENT_QUEST',
    SET_OVERLAY_CONTENT: 'SET_OVERLAY_CONTENT',
    SET_UNDERLAY_CONTENT: 'SET_UNDERLAY_CONTENT',
    SET_STORY_CONTENT: 'SET_STORY_CONTENT',
    SET_COMBAT_OVERLAY_TEXT: 'SET_COMBAT_OVERLAY_TEXT',

    SET_GAME_SETTINGS: 'SET_GAME_SETTINGS',
    SET_MAP_MODE: 'SET_MAP_MODE',
    SET_TIME_LEFT: 'SET_TIME_LEFT',
    SET_MOVE_TIMER: 'SET_MOVE_TIMER',
    SET_SHAKE_DURATION: 'SET_SHAKE_DURATION',
    SET_SHAKE_INTENSITY: 'SET_SHAKE_INTENSITY',
    SET_VIBRATION_TIME: 'SET_VIBRATION_TIME',
    SET_CANVAS_POSITION: 'SET_CANVAS_POSITION',
    SET_CANVAS_WIDTH: 'SET_CANVAS_WIDTH',
    SET_CANVAS_HEIGHT: 'SET_CANVAS_HEIGHT',
    SET_JOYSTICK_SPEED: 'SET_JOYSTICK_SPEED',
    SET_VOLUME: 'SET_VOLUME',

    SET_MINIGAME_CAMBIREN: 'SET_MINIGAME_CAMBIREN',
    SET_MINIGAME_SEVAN: 'SET_MINIGAME_SEVAN',
    SET_MINIGAME_SHRYGEIAN: 'SET_MINIGAME_SHRYGEIAN',
    SET_MINIGAME_TSHAERAL: 'SET_MINIGAME_TSHAERAL',

    SET_CURRENT_NODE_INDEX: 'SET_CURRENT_NODE_INDEX',
    SET_CURRENT_DIALOG_NODE: 'SET_CURRENT_DIALOG_NODE',
    SET_RENDERING: 'SET_RENDERING',
};

export const initialGameData: GameData = {
    player: {} as unknown as Player,
    opponent: null as unknown as Enemy,
    background: '',
    dialog: {},
    primary: { name: '', description: '', style: '' },
    secondary: { name: '', description: '', style: '' },
    tertiary: { name: '', description: '', style: '' },
    miniGameCambiren: false,
    miniGameSevan: false,
    miniGameShrygeian: false,
    miniGameTshaeral: false,
    loading: true,
    loadingAscean: false,
    loadingOpponent: false,
    loadingDeity: false,
    loadingOverlay: false,
    loadingUnderlay: false,
    loadingContent: false,
    loadingCombatOverlay: false,
    loadingCombatSpectatorOverlay: false,
    loadingSpectator: false,
    loadedAscean: false,
    playerBlessed: false,
    saveExp: false,
    saveQuest: false,
    lootRoll: false,
    itemSaved: false,
    eqpSwap: false,
    checkLoot: false,
    removeItem: false,
    repositionInventory: false,
    purchasingItem: false,
    gameplayModal: false,
    gameplayEvent: { title: "", description: "" },
    combatResolved: false,
    combatSpectatorResolved: false,
    instantStatus: false,
    showCity: false,
    showDialog: false,
    showInventory: false,
    showMap: false,
    cityButton: false,
    lootDrops: [],
    lootDrop: [] as unknown as Equipment,
    lootDropTwo: [] as unknown as Equipment,
    merchantEquipment: [],
    cityOption: 'Innkeep',
    currentIntent: 'challenge',
    currentQuest: '',
    questData: {},
    overlayContent: '',
    underlayContent: '',
    storyContent: '', 
    combatOverlayText: '',
    combatSpectatorOverlayText: '',
    mapMode: 'FULL_MAP',
    timeLeft: 12,
    moveTimer: 6,
    shake: { duration: 200, intensity: 1 },
    vibrationTime: 150,
    canvasPosition: { x: 0.75, y: 1.5 },
    canvasWidth: 300,
    canvasHeight: 300,
    joystickSpeed: 1000,
    soundEffectVolume: 0.3,
    currentNodeIndex: 0,
    currentNode: { id: '', text: '', options: [], npcIds: [] },
    renderedOptions: [],
    renderedText: '',
    showLootOne: false,
    showLootTwo: false,
    showLootIds: [],
};

export const GameStore = (game: GameData, action: Game_Action) => {
    switch (action.type) {
        case 'SET_GAME_DATA':
            return {
                ...game,
            };
        case 'SET_PLAYER':
            return {
                ...game,
                player: action.payload,
            };
        case 'SET_PLAYER_TRAITS':
            return {
                ...game,
                primary: action.payload.primary,
                secondary: action.payload.secondary,
                tertiary: action.payload.tertiary,
            };
        case 'SET_OPPONENT':
            return {
                ...game,
                opponent: action.payload,
            };
        case 'GET_OPPONENT':
            return {
                ...game,
                checkLoot: action.payload,
                loadingOpponent: action.payload,
            };
        case 'SET_SAVE_WORLD':
            return {
                ...game,
                overlayContent: action.payload,
                loadingContent: true,
            };
        case 'WORLD_SAVED':
            return {
                ...game,
                overlayContent: '',
                loadingContent: false,
                loadingOverlay: false,
            };
        case 'SET_BACKGROUND':
            return {
                ...game,
                background: action.payload,
            };
        case 'SET_DIALOG':
            return {
                ...game,
                dialog: action.payload,
            };
        case 'SET_TUTORIAL':
            return {
                ...game,
                player: {
                    ...game.player,
                    tutorial: action.payload,
                }
            };
        case 'SET_PLAYER_BLESSING':
            return {
                ...game,
                playerBlessed: action.payload,
            };
        case 'SAVE_EXP':
            return {
                ...game,
                saveExp: action.payload,
            };
        case 'SAVE_QUEST':
            return {
                ...game,
                saveQuest: action.payload,
            };
        case 'SET_PLAYER_LEVEL_UP':
            return {
                ...game,
                player: {
                    ...action.payload, // update all properties except inventory
                    inventory: game.player.inventory // keep the existing inventory
                }
            };
        case 'SET_PLAYER_CURRENCY':
            return {
                ...game,
                player: {
                    ...game.player,
                    currency: action.payload,
                }
            };
        case 'SET_EXPERIENCE':
            return {
                ...game,
                player: {
                    ...game.player,
                    experience: action.payload.experience,
                    firewater: action.payload.firewater,
                    currency: action.payload.currency,
                },
            };
        case 'SET_FIREWATER':
            return {
                ...game,
                player: {
                    ...game.player,
                    firewater: action.payload,
                },
            };
        case 'SET_INVENTORY':
            return {
                ...game,
                player: {
                    ...game.player,
                    currency: action.payload.currency,
                    inventory: action.payload.inventory,
                },
            };
        case 'SET_INVENTORY_POSITION':
            return {
                ...game,
                player: {
                    ...game.player,
                    inventory: action.payload,
                },
            };
        case 'SET_ASCEAN_AND_INVENTORY':
            return {
                ...game,
                player:  action.payload,
            };
        case 'SET_ASCEAN_ATTRIBUTES':
            return {
                ...game,
                player: {
                    ...game.player,
                    constitution: action.payload.constitution,
                    strength: action.payload.strength,
                    agility: action.payload.agility,
                    achre: action.payload.achre,
                    caeren: action.payload.caeren,
                    kyosir: action.payload.kyosir,
                    statistics: action.payload.statistics,
                },
            };
        case 'SET_JOURNAL':
            return {
                ...game,
                player: {
                    ...game.player,
                    journal: action.payload,
                },
            };
        case 'SET_JOURNAL_ENTRY':
            return {
                ...game,
                player: {
                    ...game.player,
                    journal: {
                        ...game.player.journal,
                        currentEntry: action.payload,
                    }
                }
            };
        case 'SET_STATISTICS':
            return {
                ...game,
                player: {
                    ...game.player,
                    statistics: action.payload,
                },
            };
        case 'SET_QUESTS':
            return {
                ...game,
                player: {
                    ...game.player,
                    quests: action.payload,
                },
            };
        case 'INSTANT_COMBAT':
            return {
                ...game,
                instantStatus: action.payload,
            };
        case 'LOOT_ROLL':
            return {
                ...game,
                lootRoll: action.payload,
            };
        case 'ITEM_SAVED':
            return {
                ...game,
                itemSaved: action.payload,
            };
        case 'EQP_SWAP':
            return {
                ...game,
                eqpSwap: action.payload,
            };
        case 'CHECK_LOOT':
            return {
                ...game,
                checkLoot: action.payload,
            };
        case 'REMOVE_ITEM':
            return {
                ...game,
                removeItem: action.payload,
            };
        case 'REPOSITION_INVENTORY':
            return {
                ...game,
                repositionInventory: action.payload,
            };
        case 'SET_PURCHASING_ITEM':
            return {
                ...game,
                purchasingItem: action.payload,
            };
        case 'LOADING':
            return {
                ...game,
                loading: action.payload,
            };
        case 'LOADING_ASCEAN':
            return {
                ...game,
                loadingAscean: action.payload,
            };
        case 'LOADING_OPPONENT':
            return {
                ...game,
                loadingOpponent: action.payload,
                showInventory: false,
            };
        case 'LOADING_DEITY':
            return {
                ...game,
                loadingDeity: action.payload,
            };
        case 'LOADING_OVERLAY':
            return {
                ...game,
                loadingOverlay: action.payload,
            };
        case 'LOADING_UNDERLAY':
            return {
                ...game,
                loadingUnderlay: action.payload,
            };
        case 'LOADING_CONTENT':
            return {
                ...game,
                loadingContent: action.payload,
            };
        case 'LOADING_COMBAT_OVERLAY':
            return {
                ...game,
                loadingCombatOverlay: action.payload,
            };
        case 'LOADING_COMBAT_SPECTATOR_OVERLAY':
            return {
                ...game,
                loadingCombatSpectatorOverlay: action.payload,
            };
        case 'LOADING_SPECTATOR':
            return {
                ...game,
                loadingSpectator: action.payload,
            };
        case 'LOADED_ASCEAN':
            return {
                ...game,
                loadedAscean: action.payload,
            };
        case 'SET_GAMEPLAY_MODAL':
            return {
                ...game,
                gameplayModal: action.payload,
            };
        case 'SET_GAMEPLAY_EVENT':
            return {
                ...game,
                gameplayEvent: action.payload,
            };
        case 'SET_COMBAT_RESOLVED':
            return {
                ...game,
                combatResolved: action.payload,
                loadingCombatOverylay: action.payload,
                combatOverlayText: '',
            };
        case 'SET_COMBAT_SPECTATOR_RESOLVED':
            return {
                ...game,
                combatSpectatorResolved: action.payload,
                loadingCombatSpectatorOverylay: action.payload,
                combatSpectatorOverlayText: '',
            };
        case 'SET_SHOW_CITY':
            return {
                ...game,
                showCity: action.payload,
            };
        case 'SET_SHOW_DIALOG':
            return {
                ...game,
                showDialog: action.payload,
            };
        case 'SET_SHOW_INVENTORY':
            return {
                ...game,
                showInventory: action.payload,
            };
        case 'SET_SHOW_MAP':
            return {
                ...game,
                showMap: action.payload,
            };
        case 'SET_CITY_BUTTON':
            return {
                ...game,
                cityButton: action.payload,
            };
        case 'SET_LOOT_DROPS':
            return {
                ...game,
                lootDrops: [
                    ...game.lootDrops,
                    action.payload,
                ],
            };
        case 'CLEAR_LOOT_DROPS':
            return {
                ...game,
                lootDrops: [],
            };
        case 'CLEAR_LOOT_DROP':
            const newLootDrops = game.lootDrops.filter(lootDrop => lootDrop._id !== action.payload);
            return {
                ...game,
                lootDrops: newLootDrops,
            };
        case 'SET_LOOT_DROP':
            return {
                ...game,
                lootDrop: action.payload,
            };
        case 'SET_LOOT_DROP_TWO':
            return {
                ...game,
                lootDropTwo: action.payload,
            };
        case 'SET_SHOW_LOOT':
            if (action.payload.interacting) {
                return {
                    ...game,
                    showLootIds: [
                        ...game.showLootIds,
                        action.payload.loot,
                    ],
                    showLootOne: action.payload.interacting,
                };
            } else {
                return {
                    ...game,
                    showLootIds: [
                        ...game.showLootIds.filter(lootId => lootId !== action.payload.loot),
                    ],
                    showLootOne: game.showLootIds.length > 1 ? game.showLootOne : false,
                };
            };
        case 'CLEAR_SHOW_LOOT':
            return {
                ...game,
                showLootIds: [
                    ...game.showLootIds.filter(lootId => lootId !== action.payload.loot),
                ],
                showLootOne: game.showLootIds.length > 1 ? game.showLootOne : false,
            };
        case 'CLEAR_SHOW_LOOT_ONE':
            return {
                ...game,
                showLootOne: false,
            };
        case 'SET_MERCHANT_EQUIPMENT':
            return {
                ...game,
                merchantEquipment: action.payload,
            };
        case 'SET_CITY_OPTION':
            return {
                ...game,
                cityOption: action.payload,
            };
        case 'SET_CURRENT_INTENT':
            return {
                ...game,
                currentIntent: action.payload,
            };
        case 'SET_OVERLAY_CONTENT':
            return {
                ...game,
                overlayContent: action.payload,
            };
        case 'SET_UNDERLAY_CONTENT':
            return {
                ...game,
                underlayContent: action.payload,
            };
        case 'SET_STORY_CONTENT':
            return {
                ...game,
                storyContent: action.payload,
            };
        case 'SET_COMBAT_OVERLAY_TEXT':
            return {
                ...game,
                combatOverlayText: action.payload,
            };
        case 'SET_LEAVE_CITY':
            return {
                ...game,
                cityButton: action.payload,
                showCity: action.payload,
            };
        case 'SET_ENTER_CITY':
            return {
                ...game,
                storyContent: action.payload,
                cityButton: true,
            };
        case 'CLOSE_OVERLAY':
            return {
                ...game,
                overlayContent: '',
                loadingOverlay: action.payload,
                loadingContent: action.payload,
            };
        case 'CLOSE_UNDERLAY':
            return {
                ...game,
                underlayContent: '',
                loadingUnderlay: action.payload,
                loadingContent: action.payload,
            };
        case 'SET_CURRENT_QUEST': 
            return {
                ...game,
                currentQuest: action.payload.intent,
                questData: action.payload.questData,
            };
        case 'CLEAR_LOOTDROP':
            let lootDrop = action.payload;
            if (lootDrop?._id === game.lootDrop?._id) {
                return {
                    ...game,
                    lootDrop: null,
                    showLootOne: false,
                };
            } else {
                return {
                    ...game,
                    lootDropTwo: null,
                    showLootTwo: false,
                };
            };
        case 'SET_GAME_SETTINGS':
            return {
                ...game,
                mapMode: action.payload.mapMode,
                joystickSpeed: action.payload.joystickSpeed,
                soundEffectVolume: action.payload.soundEffectVolume,
                timeLeft: action.payload.timeLeft,
                moveTimer: action.payload.moveTimer,
                shake: action.payload.shake,
                canvasPosition: action.payload.canvasPosition,
                canvasHeight: action.payload.canvasHeight,
                canvasWidth: action.payload.canvasWidth,
                vibrationTime: action.payload.vibrationTime,
            };
        case 'SET_MAP_MODE':
            return {
                ...game,
                mapMode: action.payload,
            };
        case 'SET_TIME_LEFT':
            return {
                ...game,
                timeLeft: action.payload,
            };
        case 'SET_MOVE_TIMER':
            return {
                ...game,
                moveTimer: action.payload,
            };
        case 'SET_SHAKE_DURATION':
            return {
                ...game,
                shake: {
                    ...game.shake,
                    duration: action.payload,
                }
            };
        case 'SET_SHAKE_INTENSITY':
            return {
                ...game,
                shake: {
                    ...game.shake,
                    intensity: action.payload,
                }
            };
        case 'SET_CANVAS_POSITION':
            return {
                ...game,
                canvasPosition: action.payload,
            };
        case 'SET_CANVAS_HEIGHT':
            return {
                ...game,
                canvasHeight: action.payload,
            };
        case 'SET_CANVAS_WIDTH':
            return {
                ...game,
                canvasWidth: action.payload,
            };
        case 'SET_JOYSTICK_SPEED':
            return {
                ...game,
                joystickSpeed: action.payload,
            };
        case 'SET_VIBRATION_TIME':
            return {
                ...game,
                vibrationTime: action.payload,
            };
        case 'SET_VOLUME':
            return {
                ...game,
                soundEffectVolume: action.payload,
            };
        case 'SET_MINIGAME_CAMBIREN':
            return {
                ...game,
                miniGameCambiren: action.payload,
            };
        case 'SET_MINIGAME_SEVAN':
            return {
                ...game,
                miniGameSevan: action.payload,
            };
        case 'SET_MINIGAME_SHRYGEIAN':
            return {
                ...game,
                miniGameShrygeian: action.payload,
            };
        case 'SET_MINIGAME_TSHAERAL':
            return {
                ...game,
                miniGameTshaeral: action.payload,
            };
        case 'SET_CURRENT_DIALOG_NODE':
            return {
                ...game,
                currentNode: action.payload,
            };
        case 'SET_CURRENT_NODE_INDEX':
            return {
                ...game,
                currentNodeIndex: action.payload,
            };
        case 'SET_RENDERING':
            return {
                ...game,
                renderedOptions: action.payload.options,
                renderedText: action.payload.text,
            };   
        default:
            return game;
    };
};