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
    dialogId: string;
};

export interface Equipment {
    name: string;
    type: string;
    rarity: string;
    itemType: string;
    grip: string | null;
    attack_type: string | null;
    damage_type: [string] | [string, string] | [] | null;
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

const nonNamedEnemy = 
    ['Achreon Druid', "Ahn'are Apostle", "Anashtre", 
    "Astral Apostle", "Cambiren Druid", "Chiomic Jester", 
    "Daethic Inquisitor", "Daethic Knight", "Fang Duelist", 
    "Fang Mercenary", 'Firesworn', 'Fyers Occultist', 
    'Ilire Occultist', 'Kingsman', "Kyn'gian Shaman", 
    "Licivitan Soldier", "Ma'ier Occultist", "Marauder", 
    "Northren Wanderer", "Nyren", "Old Li'ivi Occultist", 
    "Quor'eite Occultist", "Quor'eite Stalker", "Rahvrecur", 
    "Se'dyrist", "Sedyreal Guard", "Se'va Shrieker", 
    "Shrygeian Bard", "Southron Wanderer", "Soverain Blood Cloak", "Tshaeral Shaman"];

const namedEnemy = 
    ["Cyrian Shyne", "Dorien Caderyn", "Eugenes", "Evrio Lorian Peroumes", 
    "Fierous Ashfyre", "Garris Ashenus", "King Mathyus Caderyn", "Kreceus", 
    "Laetrois Ath'Shaorah", "Leaf", "Lorian", "Mavrios Ilios", "Mirio", 
    "Sera Lorian", "Synaethis Spiras", "Torreous Ashfyre", "Vincere"];

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

export const QUESTS = [
    {
        name: ["Marauder", "Southron Wanderer", "Fang Mercenary", "Quor'eite Occultist"],
        title: "Lost Temple",
        description: "Travel deep into the jungle to find a hidden temple and explore its secrets", 
        isBounty: false,
    },
    {
        name: ["Tshaeral Shaman", "Kyn'gian Shaman", "Achreon Druid", "Cambiren Druid", "Se'va Shrieker", "Fyers Occultist"],
        title: "Replenish Firewater",
        description: "To walk in the land of hush and tendril and refill your flask, you must let it bleed--not of yourself but of our enemy",
        isBounty: true,
    },
    {
        name: ["Northren Wanderer", "Southron Wanderer", "Nyren", "Rahvrecur", "Se'dyrist"],
        title: "Sunken Cities",
        description: "Explore the ruins of an ancient city and discover its treasures",
        isBounty: false,
    },
    {
        name: ["Fang Duelist", "Shrygeian Bard", "Chiomic Jester"],
        title: "The Murder of a Merchant",
        description: "Aid in the investigation of a murder that occured recently",
        isBounty: true,
    },
    {
        name: ["Ma'ier Occultist", "Old Li'ivi Occultist", "Eugenes", "Garris Ashenus"],
        title: "Mist of the Moon",
        description: "Ingratiate yourself with the Ma'ier and gain their trust to understand the Blood Moon Prophecy",
        isBounty: false,
    },
    {
        name: ["Ilire Occultist", "Old Li'ivi Occultist"],
        title: "Sheath of the Sun",
        description: "Ingratiate yourself with the Ilire and gain their trust to understand the Black Sun Prophecy",
        isBounty: false,
    },
    {
        name: ["Achreon Druid", "Cambiren Druid"],
        title: "The Draochre",
        description: "Ingratiate yourself with the Druids and gain their trust to understand the Wild",
        isBounty: false,
    },
    {
        name: ["Tshaeral Shaman", "Kyn'gian Shaman", "Dorien Caderyn", "Mirio"],
        title: "The Land of Hush and Tendril",
        description: "Peer into this. Spoken as though not of this world, yet all the same it wraps. Do you wish this?",
        isBounty: false,
    },
    {
        name: ["Fyers Occultist", "Firesworn", "Torreous Ashfyre", "Fierous Ashfyre"],
        title: "The Phoenix",
        description: "Learn more about the Phoenix and its origin of rebirth",
        isBounty: false,
    },
    {
        name: ["Ahn'are Apostle", "Synaethis Spiras", "Kreceus"],
        title: "The Ahn'are",
        description: "Learn more about the Ahn'are and their origin of flight",
        isBounty: false,
    },
    {
        name: ["Sera Lorian", "Daethic Inquisitor", "Daethic Knight"],
        title: "Seek Devotion",
        description: "Become initiated into the faith of Daethos",
        isBounty: false,
    },
    {
        name: ["Anashtre", "Ahn'are Apostle", "Astral Apostle", "Kreceus"],
        title: "Anashtre Ascension",
        description: "Seek information about the Anashtre and the ritual of the past to form the lightning wing of Astra",
        isBounty: false,
    },
    {
        name: ["Old Li'ivi Occultist", "Chiomic Jester", "Shrygeian Bard"],
        title: "Curse of the Ky'myr",
        description: "Track down the mystery behind the Ky'myr and its curse of ceaselessness.",
        isBounty: false,

    },
    {
        name: ["Daethic Inquisitor", "Daethic Knight", "Lorian", "Mavros Ilios"],
        title: "Providence",
        description: "Aid in the proliferation of Daethos across the land",
        isBounty: false,

    }
]

export const getQuests = (name: string) => {
    return QUESTS.filter(quest => quest.name.includes(name));
};

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
    saveQuest: boolean;
    lootRoll: boolean;
    itemSaved: boolean;
    eqpSwap: boolean;
    checkLoot: boolean;
    removeItem: boolean;
    purchasingItem: boolean;

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
    currentQuest: string;
    questData: object;
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
    SAVE_QUEST: 'SAVE_QUEST',
    SET_SAVE_WORLD: 'SET_SAVE_WORLD',
    WORLD_SAVED: 'WORLD_SAVED',

    SET_PLAYER_LEVEL_UP: 'SET_PLAYER_LEVEL_UP',
    SET_EXPERIENCE: 'SET_EXPERIENCE',
    SET_FIREWATER: 'SET_FIREWATER',
    SET_QUESTS: 'SET_QUESTS',
    SET_INVENTORY: 'SET_INVENTORY',
    SET_ASCEAN_AND_INVENTORY: 'SET_ASCEAN_AND_INVENTORY',

    SET_PURCHASING_ITEM: 'SET_PURCHASING_ITEM',

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
    SET_CURRENT_QUEST: 'SET_CURRENT_QUEST',
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
    saveQuest: false,
    lootRoll: false,
    itemSaved: false,
    eqpSwap: false,
    checkLoot: false,
    removeItem: false,
    purchasingItem: false,
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
    currentQuest: '',
    questData: {},
    overlayContent: '',
    storyContent: '', 
    combatOverlayText: '',
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
        case 'SET_EXPERIENCE':
            return {
                ...game,
                player: {
                    ...game.player,
                    experience: action.payload.experience,
                    firewater: action.payload.firewater,
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
            console.log("Setting Inventory", action.payload)
            return {
                ...game,
                player: {
                    ...game.player,
                    currency: action.payload.currency,
                    inventory: action.payload.inventory,
                },
            };
        case 'SET_ASCEAN_AND_INVENTORY':
            return {
                ...game,
                player:  action.payload,
            };
        case 'SET_QUESTS':
            return {
                ...game,
                player: {
                    ...game.player,
                    quests: action.payload,
                },
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
            console.log("Swapping Equipment?", action.payload);
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
        case 'LOADING_OVERLAY':
            return {
                ...game,
                loadingOverlay: action.payload,
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
        case 'SET_CITY_BUTTON':
            return {
                ...game,
                cityButton: action.payload,
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