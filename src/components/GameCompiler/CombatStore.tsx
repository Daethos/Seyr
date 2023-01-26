import { useReducer } from 'react'

interface CombatData {
    player: object;
    action: string;
    player_action: string;
    counter_guess: string;
    playerBlessing: string;
    player_health: number;
    current_player_health: number;
    new_player_health: number;
    weapons: any[];
    weapon_one: object;
    weapon_two: object;
    weapon_three: object;
    playerEffects: any[];
    player_damage_type: string;
    player_defense: object;
    player_attributes: object;

    player_start_description: string;
    player_special_description: string;
    player_action_description: string;
    palyer_influence_decsription: string;
    player_influence_decsription_two: string;
    player_death_description: string;

    critical_success: boolean;
    counter_success: boolean;
    dual_wielding: boolean;
    glancing_blow: boolean;
    religious_success: boolean;
    roll_success: boolean;
    player_win: boolean;

    computer: object;
    computer_action: string;
    computer_counter_guess: string;
    computerBlessing: string;
    computer_health: number;
    current_computer_health: number;
    new_computer_health: number;
    computer_weapons: any[];
    computer_weapon_one: object;
    computer_weapon_two: object;
    computer_weapon_three: object;
    computerEffects: any[];
    computer_damage_type: string;
    computer_defense: object;
    computer_attributes: object;

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

    computer_start_description: string;
    computer_special_description: string;
    computer_action_description: string;
    computer_influence_decsription: string;
    computer_influence_decsription_two: string;
    computer_death_description: string;

    computer_critical_success: boolean;
    computer_counter_success: boolean;
    computer_dual_wielding: boolean;
    computer_glancing_blow: boolean;
    computer_religious_success: boolean;
    computer_roll_success: boolean;
    computer_win: boolean;

    combatRound: number;
    sessionRound: number;
}

interface Action {
    type: string;
    payload: any;
}

export const ACTIONS = {
    SET_PLAYER: 'SET_PLAYER',
    SET_COMPUTER: 'SET_COMPUTER',
    SET_DUEL: 'SET_DUEL',
    RESET_PLAYER: 'RESET_PLAYER',
    RESET_COMPUTER: 'RESET_COMPUTER',
    RESET_DUEL: 'RESET_DUEL',
    SET_NEW_COMPUTER: 'SET_NEW_COMPUTER',
    SET_COMBAT_ACTION: 'SET_COMBAT_ACTION',
    SET_COMBAT_COUNTER: 'SET_COMBAT_COUNTER',
    SET_DAMAGE_TYPE: 'SET_DAMAGE_TYPE',
    SET_PRAYER_BLESSING: 'SET_PRAYER_BLESSING',
    SET_WEAPON_ORDER: 'SET_WEAPON_ORDER',
    INITIATE_COMBAT: 'INITIATE_COMBAT',
    SET_PLAYER_QUICK: 'SET_PLAYER_QUICK',
    SET_PLAYER_SLICK: 'SET_PLAYER_SLICK',
    SAVE_EXPERIENCE: 'SAVE_EXPERIENCE',
}

const initialCombatData: CombatData = {
    player: {},
    action: '',
    player_action: '',
    counter_guess: '',
    playerBlessing: 'Buff',
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
    player_start_description: '',
    player_special_description: '',
    player_action_description: '',
    palyer_influence_decsription: '',
    player_influence_decsription_two: '',
    player_death_description: '',
    critical_success: false,
    counter_success: false,
    dual_wielding: false,
    glancing_blow: false,
    religious_success: false,
    roll_success: false,
    player_win: false,
    computer: {},
    computer_action: '',
    computer_counter_guess: '',
    computerBlessing: 'Buff',
    computer_health: 0,
    current_computer_health: 0,
    new_computer_health: 0,
    computer_weapons: [],
    computer_weapon_one: {},
    computer_weapon_two: {},
    computer_weapon_three: {},
    computerEffects: [],
    computer_damage_type: '',
    computer_defense: {},
    computer_attributes: {},
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
    computer_start_description: '',
    computer_special_description: '',
    computer_action_description: '',
    computer_influence_decsription: '',
    computer_influence_decsription_two: '',
    computer_death_description: '',
    computer_critical_success: false,
    computer_counter_success: false,
    computer_dual_wielding: false,
    computer_glancing_blow: false,
    computer_religious_success: false,
    computer_roll_success: false,
    computer_win: false,
    combatRound: 0,
    sessionRound: 0,
}

const CombatStore = (state: CombatData, action: Action) => {

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
                player_damage_type: action.payload.combat_weapon_one.damage_type[0]
            };
        case 'SET_COMPUTER':
            return {
                ...state,
                computer: action.payload.ascean,
                computer_health: action.payload.attributes.healthTotal,
                current_computer_health: action.payload.attributes.healthTotal,
                new_computer_health: action.payload.attributes.healthTotal,
                computer_weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                computer_weapon_one: action.payload.combat_weapon_one,
                computer_weapon_two: action.payload.combat_weapon_two,
                computer_weapon_three: action.payload.combat_weapon_three,
                computer_defense: action.payload.defense,
                computer_attributes: action.payload.attributes,
                computer_damage_type: action.payload.combat_weapon_one.damage_type[0]
            };
        case 'SET_DUEL':
            return {
                ...state,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
            };
        case 'RESET_PLAYER': // Player Is Dead
            return {
                ...state,
                player_defense: action.payload.defense,
                player_attributes: action.payload.attributes,
                current_player_health: action.payload.health,
                new_player_health: action.payload.health,
                weapons: [action.payload.weaponOne, action.payload.weaponTwo, action.payload.weaponThree],
                weapon_one: action.payload.weaponOne,
                weapon_two: action.payload.weaponTwo,
                weapon_three: action.payload.weaponThree,
                player_damage_type: state.current_player_health === 0 ? action.payload.weaponOne.damage_type[0] : state.player_damage_type,
                current_computer_health: action.payload.computerHealth,
                new_computer_health: action.payload.computerHealth,
                player_win: false,
                computer_win: false,
                combatRound: 1,
            };
        case 'RESET_COMPUTER': // Computer Is Dead
            return {
                ...state,
                current_player_health: state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                new_player_health: state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                current_computer_health: state.computer_health,
                new_computer_health: state.computer_health,
                player_win: false,
                computer_win: false,
                combatRound: 1,
            };
        case 'SET_NEW_COMPUTER': // Fetching New Opponent
            return {
                ...state,
                current_player_health: state.current_player_health === 0 || state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                new_player_health: state.new_player_health === 0 || state.new_player_health > state.player_health ? state.player_health : state.new_player_health,
                computer: action.payload.ascean,
                computer_health: action.payload.attributes.healthTotal,
                current_computer_health: action.payload.attributes.healthTotal,
                new_computer_health: action.payload.attributes.healthTotal,
                computer_weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                computer_weapon_one: action.payload.combat_weapon_one,
                computer_weapon_two: action.payload.combat_weapon_two,
                computer_weapon_three: action.payload.combat_weapon_three,
                computer_defense: action.payload.defense,
                computer_attributes: action.payload.attributes,
                combatRound: 1,
            };
        case 'SET_COMBAT_ACTION':
            return {
                ...state,
                action: action.payload,
                counter_guess: '',
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
        case 'SET_PRAYER_BLESSING':
            return {
                ...state,
                playerBlessing: action.payload,
            }
        case 'SET_WEAPON_ORDER':
            return {
                ...state,
                weapons: action.payload,
                player_damage_type: action.payload[0].damage_type[0],
            };
        case 'INITIATE_COMBAT':
            return {
                ...state,
                action: '',
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
            }
        case 'SAVE_EXPERIENCE':
            return {
                ...state,
                player: action.payload,
                player_win: false,
            }
        default: 
            return state;
    }
}

export const [state, dispatch] = useReducer(CombatStore, initialCombatData);