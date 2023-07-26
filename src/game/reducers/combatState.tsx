import { createSlice } from '@reduxjs/toolkit';
import { initialCombatData } from '../../components/GameCompiler/CombatStore';
import { compress } from '../sagas/rootSaga';
import { getSocketInstance } from '../sagas/socketManager';
import { SOCKET } from '../sagas/socketSaga';

const combatSlice = createSlice({
    name: 'combat',
    initialState: initialCombatData,
    reducers: {
        // ===== Combat Getter ===== \\
        getEnemyActionFetch: (state, _action) => {},
        getCombatStateUpdate: (state, _action) => {},
        getCombatStatisticFetch: (state, _action) => {},
        getAsceanHealthUpdateFetch: (state, _action) => {},
        getInitiateFetch: (state, _action) => {},
        getCombatSettingFetch: (state, _action) => {},
        getDrinkFirewaterFetch: (state, _action) => {},
        getEffectTickFetch: (state, _action) => {},
        getCombatFetch: (state, _action) => {},
        getCombatTimerFetch: (state, _action) => {},
        getPersuasionFetch: (state, _action) => {},
        getLuckoutFetch: (state, _action) => {},
        getEnemySetupFetch: (state, _action) => {},
        getNpcSetupFetch: (state, action) => {},
        // ===== Combat Setup / Breakdown ===== \\
        setCombatPlayer: (state, action) => {
            return {
                ...state,
                player: action.payload.ascean,
                player_health: action.payload.ascean.health.total,
                current_player_health: action.payload.ascean.health.current,
                new_player_health: action.payload.ascean.health.current,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weapon_one: action.payload.combat_weapon_one,
                weapon_two: action.payload.combat_weapon_two,
                weapon_three: action.payload.combat_weapon_three,
                player_defense: action.payload.defense,
                player_attributes: action.payload.attributes,
                player_damage_type: action.payload.combat_weapon_one.damage_type[0],
                highScore: action.payload.ascean.high_score,
            };
        },
        setEnemy: (state, action) => {
            return {
                ...state,
                computer: action.payload.enemy.ascean,
                computer_health: action.payload.enemy.attributes.healthTotal,
                current_computer_health: action.payload.health,
                new_computer_health: action.payload.health,
                computer_weapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                computer_weapon_one: action.payload.enemy.combat_weapon_one,
                computer_weapon_two: action.payload.enemy.combat_weapon_two,
                computer_weapon_three: action.payload.enemy.combat_weapon_three,
                computer_defense: action.payload.enemy.defense,
                computer_attributes: action.payload.enemy.attributes,
                computer_damage_type: action.payload.enemy.combat_weapon_one.damage_type[0],
                new_player_health: state.new_player_health > state.player_health ? state.player_health : state.new_player_health === 0 ? state.player_health * 0.05 : state.new_player_health,
                // Phaser Enemy Pieces
                isEnemy: true,
                npcType: '',
                isAggressive: action.payload.isAggressive,
                startedAggressive: action.payload.isAggressive,
                player_win: action.payload.isDefeated,
                computer_win: action.payload.isTriumphant,
                enemyID: action.payload.enemyID,   
            }
        },
        setNpc: (state, action) => {
            return {
                ...state,
                computer: action.payload.enemy.ascean,
                computer_health: action.payload.enemy.attributes.healthTotal,
                current_computer_health: action.payload.health,
                new_computer_health: action.payload.health,
                computer_weapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                computer_weapon_one: action.payload.enemy.combat_weapon_one,
                computer_weapon_two: action.payload.enemy.combat_weapon_two,
                computer_weapon_three: action.payload.enemy.combat_weapon_three,
                computer_defense: action.payload.enemy.defense,
                computer_attributes: action.payload.enemy.attributes,
                computer_damage_type: action.payload.enemy.combat_weapon_one.damage_type[0],
                new_player_health: state.new_player_health > state.player_health ? state.player_health : state.new_player_health === 0 ? state.player_health * 0.05 : state.new_player_health,
                // Phaser Enemy Pieces
                isEnemy: false,
                isAggressive: false,
                startedAggressive: false,
                player_win: false,
                computer_win: false,
                enemyID: action.payload.enemyID,
                npcType: action.payload.npcType,
            };
        },
        setCombat: (state) => {
            return {
                ...state,
                combatEngaged: true,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound,
            };
        },
        setAggression: (state, action) => {
            return {
                ...state,
                isAggressive: action.payload,
                startedAggressive: action.payload,
            };
        },
        clearNonAggressiveEnemy: (state) => {
            return {
                ...state,
                computer: null,
                persuasionScenario: false,
                luckoutScenario: false,
                enemyPersuaded: false,
                player_luckout: false,
                player_win: false,
                playerGrapplingWin: false,
                computer_win: false,
                combatEngaged: false,
                playerTrait: '',
                isEnemy: false,
            };
        },
        clearNpc: (state) => {
            console.log('clearNpc');
            return {
                ...state,
                computer: null,
                npcType: '',
            };
        },
        setPhaser: (state, action) => {
            return {
                ...state,
                phaser: action.payload,
            };
        },
        setPhaserAggression: (state, action) => {
            const socket = getSocketInstance();
            socket.emit(SOCKET.SET_PHASER_AGGRESSION, action.payload);
            return {
                ...state,
                isAggressive: action.payload,
                combatEngaged: action.payload,
            };
        },
        // TODO:FIXME: These need to also perform the socket.emit to update combatData, possible redress by creating a combat/getFetch generator
        setRest: (state, action) => {
            const healed = Math.floor(state.new_player_health + state.player_health * (action.payload / 100)) ;
            const newHealth = healed > state.player_health ? state.player_health : healed;
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { ['new_player_health']: newHealth });
            return {
                ...state,
                new_player_health: newHealth,
                current_player_health: newHealth,
            };
        },
        setWeather: (state, action) => {
            return {
                ...state,
                weather: action.payload,
            };
        },
        // ===== Combat Input Concerns ===== \\
        setCombatInput: (state, action) => {
            console.log(action.payload, "Combat Input");
            const { key, value } = action.payload;
            return { ...state, [key]: value };
        },
        setDamageType: (state, action) => {
            return {
                ...state,
                player_damage_type: action.payload,
            };
        },
        setInstantCombat: (state, action) => {
            return {
                ...action.payload,
                instantStatus: true,
                action: '',
            };
        }, 
        setPlayerBlessing: (state, action) => {
            return {
                ...state,
                playerBlessing: action.payload,
            };
        },
        setPrayerSacrifice: (state, action) => {
            return {
                ...state,
                prayerSacrifice: action.payload.prayer,
                prayerSacrificeName: action.payload.name,
            };
        },
        setWeaponOrder: (state, action) => {
            return {
                ...state,
                weapons: action.payload,
                player_damage_type: action.payload[0].damage_type[0],
            };
        },
        setToggleDamaged: (state, action) => {
            return {
                ...state,
                playerDamaged: action.payload,
                computerDamaged: action.payload,
            };
        },
        setEnemyActions: (state, action) => {
            return {
                ...state,
                player_win: action.payload.player_win,
                computer_win: action.payload.computer_win,
                player_action_description: action.payload.player_action_description,
                computer_action_description: action.payload.computer_action_description,
                player_start_description: action.payload.player_start_description,
                computer_start_description: action.payload.computer_start_description,
                player_death_description: action.payload.player_death_description,
                computer_death_description: action.payload.computer_death_description,
                player_special_description: action.payload.player_special_description,
                computer_special_description: action.payload.computer_special_description,
                player_influence_description: action.payload.player_influence_description,
                computer_influence_description: action.payload.computer_influence_description,
                player_influence_description_two: action.payload.player_influence_description_two,
                computer_influence_description_two: action.payload.computer_influence_description_two,
                potential_computer_damage: action.payload.potential_computer_damage,
                realized_computer_damage: action.payload.realized_computer_damage,
                playerDamaged: action.payload.playerDamaged,
                computerDamaged: action.payload.computerDamaged,
                new_player_health: action.payload.new_player_health,
                current_player_health: action.payload.current_player_health,
                computer_roll_success: action.payload.computer_roll_success,
                computer_counter_success: action.payload.computer_counter_success,
                computer_glancing_blow: action.payload.computer_glancing_blow,
                playerEffects: action.payload.playerEffects,  
            };
        },
        
        setRemoveEffect: (state, action) => {
            const socket = getSocketInstance();
            socket.emit(SOCKET.REMOVE_EFFECT, action.payload);
            return {
                ...state,
                playerEffects: state.playerEffects.filter(effect => effect.id !== action.payload),
                computerEffects: state.computerEffects.filter(effect => effect.id !== action.payload),
            };
        },
        setStalwart: (state, action) => {
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { ['isStalwart']: action.payload });
            return {
                ...state,
                isStalwart: action.payload,
            };
        },
        setCombatTimer: (state, action) => {
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { ['combatTimer']: action.payload });
            return {
                ...state,
                combatTimer: action.payload,
            };
        }, 

        // ===== Combat Resolution Concerns ===== \\
        setCombatResolution: (state, action) => {
            return { 
                ...state,
                ...action.payload
             };
        },
        setEffectResponse: (state, action) => {
            return { 
                ...state,
                ...action.payload 
            };
        },
        setPlayerWin: (state, _action) => {
            const socket = getSocketInstance();
            const weaps: any[] = state.weapons.map(weapon => [state.weapon_one, state.weapon_two, state.weapon_three].find(w => w._id === weapon._id));
            socket.emit(SOCKET.PLAYER_WIN, weaps);
            return {
                ...state,
                weapons: weaps,
                winStreak: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                // combatEngaged: false,
                instantStatus: false
            };
        },
        setEnemyWin: (state, _action) => {
            const socket = getSocketInstance();
            const weaps = state.weapons.map(weapon => [state.weapon_one, state.weapon_two, state.weapon_three].find(w => w._id === weapon._id));
            socket.emit(SOCKET.COMPUTER_WIN, weaps);
            return {
                ...state,
                weapons: weaps,
                loseStreak: state.loseStreak + 1,
                winStreak: 0,
                combatEngaged: false,
                instantStatus: false
            };
        },
        clearCombat: (state) => {
            return {
                ...state,
                // computer: null,
                player_win: false,
                computer_win: false,
                combatEngaged: false,
                enemyPersuaded: false,
                instantStatus: false,
                action: '',
                counter_guess: '',
                computer_action: '',
                computer_counter_guess: '',
                playerTrait: '',
                player_action_description: '',
                computer_action_description: '',
                player_start_description: '',
                computer_start_description: '',
                player_death_description: '',
                computer_death_description: '',
                player_special_description: '',
                computer_special_description: '',
                player_influence_description: '',
                computer_influence_description: '',
                player_influence_description_two: '',
                computer_influence_description_two: '',
                potential_player_damage: 0,
                potential_computer_damage: 0,
                realized_player_damage: 0,
                realized_computer_damage: 0,
                playerDamaged: false,
                computerDamaged: false,
                combatRound: 0,
                actionData: [],
                typeAttackData: [],
                typeDamageData: [],
                totalDamageData: 0,
                prayerData: [],
                deityData: [],
                playerEffects: [],
                computerEffects: [],
            };
        },
        
        // ===== Noncombat Resolution Concerns ===== \\
        setPlayerLuckout: (state, action) => {
            return {
                ...state,
                winStreak: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                new_computer_health: 0,
                current_computer_health: 0,
                player_luckout: action.payload.playerLuckout,
                playerTrait: action.payload.playerTrait,
                player_win: true,
                luckoutScenario: true
            };
        },
        setLuckoutFailure: (state, action) => {
            return {
                ...state,
                winStreak: 0,
                player_luckout: action.payload.playerLuckout,
                playerTrait: action.payload.playerTrait,
                luckoutScenario: true
            };
        },
        setEnemyPersuaded: (state, action) => {
            return {
                ...state,
                enemyPersuaded: action.payload.enemyPersuaded,
                playerTrait: action.payload.playerTrait,
                persuasionScenario: true
            };
        },
        resetLuckout: (state, action) => {
            return {
                ...state,
                player_luckout: action.payload,
            };
        },
    }
});

export const {
    getCombatStateUpdate,
    getEnemyActionFetch,
    getCombatStatisticFetch,
    getAsceanHealthUpdateFetch,
    getCombatFetch,
    getCombatSettingFetch,
    getDrinkFirewaterFetch,
    getEffectTickFetch,
    getInitiateFetch,
    getCombatTimerFetch,
    getPersuasionFetch,
    getLuckoutFetch,
    getEnemySetupFetch,
    getNpcSetupFetch,

    setCombatPlayer,
    setEnemy,
    setNpc,
    setCombat,
    setAggression,
    clearNonAggressiveEnemy,
    clearNpc,
    setPhaser,
    setRest,
    setWeather,
    setPhaserAggression,

    setCombatTimer,
    setCombatInput,
    setDamageType, 
    setEnemyActions,
    setToggleDamaged,
    setWeaponOrder,
    setCombatResolution,
    setInstantCombat,
    setPlayerBlessing,
    setPrayerSacrifice,
    setRemoveEffect,

    setEffectResponse,
    setPlayerWin,
    setEnemyWin,
    clearCombat,
    setPlayerLuckout,
    setLuckoutFailure,
    setEnemyPersuaded,
    resetLuckout,
    setStalwart
} = combatSlice.actions;

export default combatSlice.reducer;