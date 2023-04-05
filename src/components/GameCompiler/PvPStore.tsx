import { useEffect, useRef } from 'react';
import { Player } from './GameStore';

export interface UserData {
    _id: string;
    bio: string;
    email: string;
    username: string;
    photoUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface PvPData {
    room: string;
    playerPosition: number;
    enemyPosition: number;
    player: any;
    action: string;
    player_action: string;
    counter_guess: string;
    playerBlessing: string;
    prayerSacrifice: string;
    player_health: number;
    current_player_health: number;
    new_player_health: number;
    weapons: any[];
    weapon_one: any;
    weapon_two: any;
    weapon_three: any;
    playerEffects: any[];
    player_damage_type: string;
    player_defense: object;
    player_attributes: object;
    player_defense_default: object;
    realized_player_damage: number;

    player_start_description: string;
    player_special_description: string;
    player_action_description: string;
    player_influence_description: string;
    player_influence_description_two: string;
    player_death_description: string;
    deaths: number;

    critical_success: boolean;
    counter_success: boolean;
    dual_wielding: boolean;
    glancing_blow: boolean;
    religious_success: boolean;
    roll_success: boolean;
    player_win: boolean;
    player_luckout: boolean;
    enemyPersuaded: boolean;
    playerTrait: string;
    playerDamaged: boolean;
    enemyDamaged: boolean;

    enemy: any;
    enemy_action: string;
    enemy_counter_guess: string;
    enemyBlessing: string;
    enemy_health: number;
    current_enemy_health: number;
    new_enemy_health: number;
    enemy_weapons: any[];
    enemy_weapon_one: object;
    enemy_weapon_two: object;
    enemy_weapon_three: object;
    enemyEffects: any[];
    enemy_damage_type: string;
    enemy_defense: object;
    enemy_attributes: object;
    enemy_defense_default: object;
    realized_enemy_damage: number;

    attack_weight: number;
    counter_weight: number;
    dodge_weight: number;
    posture_weight: number;
    roll_weight: number;
    counter_attack_weight: number;
    counter_counter_weight: number;
    counter_dodge_weight: number;
    counter_posture_weight: number;
    counter_roll_weight: number;

    enemy_start_description: string;
    enemy_special_description: string;
    enemy_action_description: string;
    enemy_influence_description: string;
    enemy_influence_description_two: string;
    enemy_death_description: string;

    enemy_critical_success: boolean;
    enemy_counter_success: boolean;
    enemy_dual_wielding: boolean;
    enemy_glancing_blow: boolean;
    enemy_religious_success: boolean;
    enemy_roll_success: boolean;
    enemy_win: boolean;

    combatInitiated: boolean;
    actionStatus: boolean;
    gameIsLive: boolean;
    combatEngaged: boolean;
    dodgeStatus: boolean;
    instantStatus: boolean;
    combatRound: number;
    sessionRound: number;
    highScore: number;
    winStreak: number;
    loseStreak: number;

    playerReady: boolean;
    enemyReady: boolean;

    weather: string;
};

interface Action {
    type: string;
    payload: any;
};


export const initialPvPData: PvPData = {
    room: '',
    playerPosition: 0,
    enemyPosition: 0,
    player: {},
    action: '',
    player_action: '',
    counter_guess: '',
    playerBlessing: 'Buff',
    prayerSacrifice: '',
    player_health: 0,
    current_player_health: 0,
    new_player_health: 0,
    weapons: [],
    weapon_one: {},
    weapon_two: {},
    weapon_three: {},
    playerEffects: [],
    player_damage_type: '',
    player_defense: {},
    player_attributes: {},
    player_defense_default: {},
    realized_player_damage: 0,
    player_start_description: '',
    player_special_description: '',
    player_action_description: '',
    player_influence_description: '',
    player_influence_description_two: '',
    player_death_description: '',
    deaths: 0,
    critical_success: false,
    counter_success: false,
    dual_wielding: false,
    glancing_blow: false,
    religious_success: false,
    roll_success: false,
    player_win: false,
    player_luckout: false,
    enemyPersuaded: false,
    playerTrait: '',
    playerDamaged: false,
    enemyDamaged: false,
    enemy: {},
    enemy_action: '',
    enemy_counter_guess: '',
    enemyBlessing: 'Buff',
    enemy_health: 0,
    current_enemy_health: 0,
    new_enemy_health: 0,
    enemy_weapons: [],
    enemy_weapon_one: {},
    enemy_weapon_two: {},
    enemy_weapon_three: {},
    enemyEffects: [],
    enemy_damage_type: '',
    enemy_defense: {},
    enemy_attributes: {},
    enemy_defense_default: {},
    realized_enemy_damage: 0,
    attack_weight: 0,
    counter_weight: 0,
    dodge_weight: 0,
    posture_weight: 0,
    roll_weight: 0,
    counter_attack_weight: 0,
    counter_counter_weight: 0,
    counter_dodge_weight: 0,
    counter_posture_weight: 0,
    counter_roll_weight: 0,
    enemy_start_description: '',
    enemy_special_description: '',
    enemy_action_description: '',
    enemy_influence_description: '',
    enemy_influence_description_two: '',
    enemy_death_description: '',
    enemy_critical_success: false,
    enemy_counter_success: false,
    enemy_dual_wielding: false,
    enemy_glancing_blow: false,
    enemy_religious_success: false,
    enemy_roll_success: false,
    enemy_win: false,
    combatInitiated: false,
    actionStatus: false,
    gameIsLive: false,
    combatEngaged: false,
    dodgeStatus: false,
    instantStatus: false,
    combatRound: 0,
    sessionRound: 0,
    highScore: 0,
    winStreak: 0,
    loseStreak: 0,
    playerReady: false,
    enemyReady: false,
    weather: '',
};

export const ACTIONS = {
    SET_PLAYER: 'SET_PLAYER',
    SET_PLAYER_POSITION: 'SET_PLAYER_POSITION',
    SET_ENEMY: 'SET_ENEMY',
    SET_DUEL: 'SET_DUEL',
    RESET_LUCKOUT: 'RESET_LUCKOUT',
    ENEMY_PERSUADED: 'ENEMY_PERSUADED',
    RESET_PLAYER: 'RESET_PLAYER',
    RESET_ENEMY: 'RESET_ENEMY',
    RESET_DUEL: 'RESET_DUEL',
    SET_NEW_COMPUTER_ENEMY: 'SET_NEW_COMPUTER_ENEMY',
    SET_NEW_ENEMY: 'SET_NEW_ENEMY',
    SET_ACTION_STATUS: 'SET_ACTION_STATUS',
    SET_COMBAT_ACTION: 'SET_COMBAT_ACTION',
    SET_COMBAT_COUNTER: 'SET_COMBAT_COUNTER',
    SET_COMBAT_INITIATED: 'SET_COMBAT_INITIATED',
    SET_DAMAGE_TYPE: 'SET_DAMAGE_TYPE',
    SET_DODGE_STATUS: 'SET_DODGE_STATUS',
    SET_INSTANT_STATUS: 'SET_INSTANT_STATUS',
    SET_PRAYER_BLESSING: 'SET_PRAYER_BLESSING',
    SET_PRAYER_SACRIFICE: 'SET_PRAYER_SACRIFICE',
    SET_WEAPON_ORDER: 'SET_WEAPON_ORDER',
    INITIATE_COMBAT: 'INITIATE_COMBAT',
    INSTANT_COMBAT: 'INSTANT_COMBAT',
    AUTO_COMBAT: 'AUTO_COMBAT',
    SET_PLAYER_QUICK: 'SET_PLAYER_QUICK',
    SET_PLAYER_SLICK: 'SET_PLAYER_SLICK',
    SET_PLAYER_LEVEL_UP: 'SET_PLAYER_LEVEL_UP',
    SAVE_EXPERIENCE: 'SAVE_EXPERIENCE',
    CLEAR_COUNTER: 'CLEAR_COUNTER',
    AUTO_ENGAGE: 'AUTO_ENGAGE',
    PLAYER_WIN: 'PLAYER_WIN',
    PLAYER_LUCKOUT: 'PLAYER_LUCKOUT',
    ENEMY_WIN: 'ENEMY_WIN',
    CLEAR_DUEL: 'CLEAR_DUEL',
    SET_WEATHER: 'SET_WEATHER',
    PLAYER_REST: 'PLAYER_REST',
    SET_PLAYER_READY: 'SET_PLAYER_READY',
    SET_ENEMY_READY: 'SET_ENEMY_READY',
    TOGGLED_DAMAGED: 'TOGGLED_DAMAGED',
}

export const PvPStore = (state: PvPData, action: Action) => {
    switch (action.type) {
        case 'SET_PLAYER':
            return {
                ...state,
                player: action.payload.ascean,
                player_health: action.payload.attributes.healthTotal,
                current_player_health: action.payload.attributes.healthTotal,
                new_player_health: action.payload.attributes.healthTotal,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weapon_one: action.payload.combat_weapon_one,
                weapon_two: action.payload.combat_weapon_two,
                weapon_three: action.payload.combat_weapon_three,
                player_defense: action.payload.defense,
                player_attributes: action.payload.attributes,
                player_damage_type: action.payload.combat_weapon_one.damage_type[0],
                highScore: action.payload.ascean.high_score,
            };
        case 'SET_PLAYER_POSITION':
            return {
                ...state,
                playerPosition: action.payload
            };
        case 'SET_ENEMY':
            return {
                ...state,
                enemy: action.payload.ascean,
                enemy_health: action.payload.attributes.healthTotal,
                current_enemy_health: action.payload.attributes.healthTotal,
                new_enemy_health: action.payload.attributes.healthTotal,
                enemy_weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                enemy_weapon_one: action.payload.combat_weapon_one,
                enemy_weapon_two: action.payload.combat_weapon_two,
                enemy_weapon_three: action.payload.combat_weapon_three,
                enemy_defense: action.payload.defense,
                enemy_attributes: action.payload.attributes,
                enemy_damage_type: action.payload.combat_weapon_one.damage_type[0]
            };
        case 'SET_PLAYER_READY':
            return {
                ...state,
                playerReady: true
            };
        case 'SET_ENEMY_READY':
            return {
                ...state,
                enemyReady: true
            };
        case 'SET_DUEL':
            return {
                ...state,
                gameIsLive: false,
                combatEngaged: true,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
            };
        case 'RESET_PLAYER':
            return {
                ...state,
                current_player_health: state.player_health,
                new_player_health: state.player_health,
                current_enemy_health: state.enemy_health,
                new_enemy_health: state.enemy_health,
                combatEngaged: true,
                gameIsLive: false,
                player_win: false,
                enemy_win: false,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
                winStreak: 0,
            };
        case 'RESET_ENEMY':
            return {
                ...state,
                current_player_health: state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                new_player_health: state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                current_enemy_health: state.enemy_health,
                new_enemy_health: state.enemy_health,
                combatEngaged: true,
                gameIsLive: false,
                player_win: false,
                enemy_win: false,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
                winStreak: state.player.level > state.enemy.level ? 0: state.winStreak,
            };
            case 'SET_NEW_COMPUTER_ENEMY':
                return {
                    ...state,
                    current_player_health: state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                    new_player_health: state.new_player_health === 0 || state.new_player_health > state.player_health ? state.player_health : state.new_player_health,
                    enemy: action.payload.ascean,
                    enemy_health: action.payload.attributes.healthTotal,
                    current_enemy_health: action.payload.attributes.healthTotal,
                    new_enemy_health: action.payload.attributes.healthTotal,
                    enemy_weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                    enemy_weapon_one: action.payload.combat_weapon_one,
                    enemy_weapon_two: action.payload.combat_weapon_two,
                    enemy_weapon_three: action.payload.combat_weapon_three,
                    enemy_defense: action.payload.defense,
                    enemy_attributes: action.payload.attributes,
                    player_win: false,
                    enemy_win: false,
                    combatRound: 1,
                    enemyPosition: -1,
                };
        case 'SET_NEW_ENEMY':
            let newEnemyPosition = findEnemyPosition(action.payload.enemy.ascean._id, action.payload.playerState);
            return {
                ...state,
                current_player_health: state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                new_player_health: state.new_player_health === 0 || state.new_player_health > state.player_health ? state.player_health : state.new_player_health,
                enemy: action.payload.enemy.ascean,
                enemy_health: action.payload.enemy.attributes.healthTotal,
                current_enemy_health: action.payload.enemy.attributes.healthTotal,
                new_enemy_health: action.payload.enemy.attributes.healthTotal,
                enemy_weapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                enemy_weapon_one: action.payload.enemy.combat_weapon_one,
                enemy_weapon_two: action.payload.enemy.combat_weapon_two,
                enemy_weapon_three: action.payload.enemy.combat_weapon_three,
                enemy_defense: action.payload.enemy.defense,
                enemy_attributes: action.payload.enemy.attributes,
                player_win: false,
                enemy_win: false,
                combatRound: 1,
                enemyPosition: newEnemyPosition,
            };
        case 'AUTO_ENGAGE':
            return {
                ...state,
                gameIsLive: action.payload,
            };
        case 'CLEAR_COUNTER':
            return {
                ...state,
                counter_guess: ''
            };
        case 'SET_ACTION_STATUS':
            return {
                ...state,
                actionStatus: action.payload,
            };
        case 'SET_COMBAT_ACTION':
            return {
                ...state,
                action: action.payload,
                counter_guess: '',
            };
        case 'SET_COMBAT_INITIATED':
            return {
                ...state,
                combatInitiated: action.payload,
            };
        case 'SET_COMBAT_COUNTER':
            return {
                ...state,
                action: 'counter',
                counter_guess: action.payload,

            };
        case 'SET_DAMAGE_TYPE':
            return {
                ...state,
                player_damage_type: action.payload,
            };
        case 'SET_DODGE_STATUS':
            return {
                ...state,
                dodgeStatus: action.payload,
            };
        case 'SET_INSTANT_STATUS':
            return {
                ...state,
                instantStatus: action.payload,
            };
        case 'SET_PRAYER_BLESSING':
            return {
                ...state,
                playerBlessing: action.payload,
            };
        case 'SET_PRAYER_SACRIFICE':
            return {
                ...state,
                prayerSacrifice: action.payload,
            };
        case 'SET_WEAPON_ORDER':
            return {
                ...state,
                weapons: action.payload,
                player_damage_type: action.payload[0].damage_type[0],
            };
        case 'INITIATE_COMBAT':
            return {
                ...action.payload,
                action: '',
                actionStatus: true,
                dodgeStatus: action.payload.action === 'dodge' ? true : action.payload.dodgeStatus === true ? true : false,
                combatInitiated: true,
                instantStatus: action.payload.instantStatus === true ? true : false,
            };
        case 'INSTANT_COMBAT':
            return {
                ...action.payload,
                action: '',
                actionStatus: true,
                combatInitiated: true,
                instantStatus: true,
            };
        case 'AUTO_COMBAT':
            return {
                ...action.payload,
                action: '',
                dodgeStatus: action.payload.action === 'dodge' ? true : action.payload.dodgeStatus === true ? true : false,
                combatInitiated: true,
                instantStatus: action.payload.instantStatus === true ? true : false,
            };
        case 'TOGGLED_DAMAGED': 
            return {
                ...state,
                playerDamaged: action.payload,
                enemyDamaged: action.payload,
            };
        case 'PLAYER_WIN':
            return {
                ...state,
                winStreak: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                gameIsLive: false,
                combatEngaged: false,
                dodgeStatus: false,
                instantStatus: false,
            };
        case 'ENEMY_PERSUADED':
            return {
                ...state,
                enemyPersuaded: action.payload.enemyPersuaded,
                playerTrait: action.payload.playerTrait,
            };
        case 'RESET_LUCKOUT':
            return {
                ...state,
                player_luckout: action.payload,
            };
        case 'PLAYER_LUCKOUT':
            return {
                ...state,
                winStreak: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                new_computer_health: 0,
                current_computer_health: 0,
                player_luckout: true,
            };
        case 'ENEMY_WIN':
            return {
                ...state,
                loseStreak: state.loseStreak + 1,
                winStreak: 0,
                gameIsLive: false,
                combatEngaged: false,
                dodgeStatus: false,
                instantStatus: false,
                deaths: state.deaths + 1,
            }
        case 'CLEAR_DUEL':
            return {
                ...state,
                player_win: false,
                enemy_win: false,
                enemyPersuaded: false,
                combatEngaged: false,
                gameIsLive: false,
                dodgeStatus: false,
                instantStatus: false,
                action: '',
                enemy_action: '',
                counter_guess: '',
                enemy_counter_guess: '',
                realized_player_damage: 0,
                realized_enemy_damage: 0,
                combatRound: 0,
                sessionRound: 0,
            };
        case 'SET_PLAYER_QUICK':
            return {
                ...state,
                player: action.payload,
            };
        case 'SET_PLAYER_SLICK':
            return {
                ...state,
                player: action.payload.ascean,
                player_health: action.payload.attributes.healthTotal,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weapon_one: action.payload.combat_weapon_one,
                weapon_two: action.payload.combat_weapon_two,
                weapon_three: action.payload.combat_weapon_three,
                player_defense: action.payload.defense,
                player_attributes: action.payload.attributes,
                player_damage_type: action.payload.combat_weapon_one.damage_type[0],
            };
        case 'SET_PLAYER_LEVEL_UP':
            return {
                ...state,
                player: action.payload.ascean,
                player_health: action.payload.attributes.healthTotal,
                current_player_health: action.payload.attributes.healthTotal,
                new_player_health: action.payload.attributes.healthTotal,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weapon_one: action.payload.combat_weapon_one,
                weapon_two: action.payload.combat_weapon_two,
                weapon_three: action.payload.combat_weapon_three,
                player_defense: action.payload.defense,
                player_attributes: action.payload.attributes,
                player_damage_type: action.payload.combat_weapon_one.damage_type[0],
            };
        case 'SAVE_EXPERIENCE':
            return {
                ...state,
                player: action.payload,
            };
        case 'SET_WEATHER': 
            return {
                ...state,
                weather: action.payload,
            };
        case 'PLAYER_REST':
            const percentage = action.payload;
            let currentHealth = state.new_player_health < 0 ? 0 : state.new_player_health;
            const playerHealthHealed = Math.floor(currentHealth + (state.player_health * (percentage / 100)));
            const playerHealth = playerHealthHealed > state.player_health ? state.player_health : playerHealthHealed;
            console.log(percentage, playerHealthHealed, playerHealth, "The %, the Health Healed, and the new Player Health")
            return {
                ...state,
                current_player_health: playerHealth,
                new_player_health: playerHealth,
            };
        default: 
            return state;
    };
};

export interface PlayerData {
    playerOne: { ascean: Player, user: UserData, room: '', player: 0, ready: false, deaths: 0 } | null;
    playerTwo:  { ascean: Player, user: UserData, room: '', player: 0, ready: false, deaths: 0 } | null;
    playerThree:  { ascean: Player, user: UserData, room: '', player: 0, ready: false, deaths: 0 } | null;
    playerFour:  { ascean: Player, user: UserData, room: '', player: 0, ready: false, deaths: 0 } | null;
};

export const initialPlayerData: PlayerData = {
    playerOne: null,
    playerTwo: null,
    playerThree: null,
    playerFour: null,
};

export interface PlayerAction {
    type: string;
    payload: any;
};

export const PLAYER_ACTIONS = {
    SET_PLAYER_STATE: 'SET_PLAYER_STATE',
    SET_PLAYER_ONE: 'SET_PLAYER_ONE',
    SET_PLAYER_TWO: 'SET_PLAYER_TWO',
    SET_PLAYER_THREE: 'SET_PLAYER_THREE',
    SET_PLAYER_FOUR: 'SET_PLAYER_FOUR',
    SET_PLAYER_ONE_READY: 'SET_PLAYER_ONE_READY',
    SET_PLAYER_TWO_READY: 'SET_PLAYER_TWO_READY',
    SET_PLAYER_THREE_READY: 'SET_PLAYER_THREE_READY',
    SET_PLAYER_FOUR_READY: 'SET_PLAYER_FOUR_READY',
    SET_PLAYER_ONE_DEATH: 'SET_PLAYER_ONE_DEATH',
    SET_PLAYER_TWO_DEATH: 'SET_PLAYER_TWO_DEATH',
    SET_PLAYER_THREE_DEATH: 'SET_PLAYER_THREE_DEATH',
    SET_PLAYER_FOUR_DEATH: 'SET_PLAYER_FOUR_DEATH',
};

export const PlayerStore = (playerState: PlayerData, playerAction: PlayerAction) => {
    switch (playerAction.type) {
        case 'SET_PLAYER_STATE':
            return {
                ...playerState,
                ...playerAction.payload,
            };
        case 'SET_PLAYER_ONE':
            return {
                ...playerState,
                playerOne: playerAction.payload,
            };
        case 'SET_PLAYER_TWO':
            return {
                ...playerState,
                playerTwo: playerAction.payload,
            };
        case 'SET_PLAYER_THREE':
            return {
                ...playerState,
                playerThree: playerAction.payload,
            };
        case 'SET_PLAYER_FOUR':
            return {
                ...playerState,
                playerFour: playerAction.payload,
            };
        case 'SET_PLAYER_ONE_READY':
            return {
                ...playerState,
                playerOne: {
                    ...playerState.playerOne,
                    ready: playerAction.payload,
                },
            };
        case 'SET_PLAYER_TWO_READY':
            return {
                ...playerState,
                playerTwo: {
                    ...playerState.playerTwo,
                    ready: playerAction.payload,
                },
            };
        case 'SET_PLAYER_THREE_READY':
            return {
                ...playerState,
                playerThree: {
                    ...playerState.playerThree,
                    ready: playerAction.payload,
                },
            };
        case 'SET_PLAYER_FOUR_READY':
            return {
                ...playerState,
                playerFour: {
                    ...playerState.playerFour,
                    ready: playerAction.payload,
                },
            };
        case 'SET_PLAYER_ONE_DEATH':
            return {
                ...playerState,
                playerOne: {
                    ...playerState.playerOne,
                    deaths: playerAction.payload,
                },
            };
        case 'SET_PLAYER_TWO_DEATH':
            return {
                ...playerState,
                playerTwo: {
                    ...playerState.playerTwo,
                    deaths: playerAction.payload,
                },
            };
        case 'SET_PLAYER_THREE_DEATH':
            return {
                ...playerState,
                playerThree: {
                    ...playerState.playerThree,
                    deaths: playerAction.payload,
                },
            };
        case 'SET_PLAYER_FOUR_DEATH':
            return {
                ...playerState,
                playerFour: {
                    ...playerState.playerFour,
                    deaths: playerAction.payload,
                },
            };
        default:
            return playerState;
    };
};

function findEnemyPosition(asceanID: string, playerState: PlayerData) {
    console.log(asceanID, "Ascean ID in Finding Enemy Position");
    if (asceanID === undefined) return -1;
    if (playerState.playerOne && playerState.playerOne.ascean.id === asceanID) {
        return 1;
    } else if (playerState.playerTwo && playerState.playerTwo.ascean.id === asceanID) {
        return 2;
    } else if (playerState.playerThree && playerState.playerThree.ascean.id === asceanID) {
        return 3;
    } else if (playerState.playerFour && playerState.playerFour.ascean.id === asceanID) {
        return 4;
    } else {
        return -1;
    };
};