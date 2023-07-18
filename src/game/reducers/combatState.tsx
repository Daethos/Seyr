import { createSlice } from '@reduxjs/toolkit';
import { initialCombatData } from '../../components/GameCompiler/CombatStore';

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
        getEffectTickFetch: (state, _action) => {},
        getCombatFetch: (state, _action) => {},
        getStalwartFetch: (state, _action) => {},
        getCombatTimerFetch: (state, _action) => {},
        // ===== Combat Setup / Breakdown ===== \\
        setCombatPlayer: (state, action) => {
            state.player = action.payload.ascean;
            state.player_health = action.payload.ascean.health.total;
            state.current_player_health = action.payload.ascean.health.current;
            state.new_player_health = action.payload.ascean.health.current;
            state.weapons = [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three];
            state.weapon_one = action.payload.combat_weapon_one;
            state.weapon_two = action.payload.combat_weapon_two;
            state.weapon_three = action.payload.combat_weapon_three;
            state.player_defense = action.payload.defense;
            state.player_attributes = action.payload.attributes;
            state.player_damage_type = action.payload.combat_weapon_one.damage_type[0];
            state.highScore = action.payload.ascean.high_score;
        },
        setEnemy: (state, action) => {
            state.computer = action.payload.enemy.ascean;
            state.computer_health = action.payload.enemy.attributes.healthTotal;
            state.current_computer_health = action.payload.health;
            state.new_computer_health = action.payload.health;
            state.computer_weapons = [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three];
            state.computer_weapon_one = action.payload.enemy.combat_weapon_one;
            state.computer_weapon_two = action.payload.enemy.combat_weapon_two;
            state.computer_weapon_three = action.payload.enemy.combat_weapon_three;
            state.computer_defense = action.payload.enemy.defense;
            state.computer_attributes = action.payload.enemy.attributes;
            state.computer_damage_type = action.payload.enemy.combat_weapon_one.damage_type[0];
            state.new_player_health = state.new_player_health > state.player_health ? state.player_health : state.new_player_health === 0 ? state.player_health * 0.05 : state.new_player_health;
            // Phaser Enemy Pieces
            state.isEnemy = true;
            state.npcType = '';
            state.isAggressive = action.payload.isAggressive;
            state.startedAggressive = action.payload.isAggressive;
            state.player_win = action.payload.isDefeated;
            state.computer_win = action.payload.isTriumphant;
            state.enemyID = action.payload.enemyID;   
        },
        setNpc: (state, action) => {
            state.computer = action.payload.enemy.ascean;
            state.computer_health = action.payload.enemy.attributes.healthTotal;
            state.current_computer_health = action.payload.health;
            state.new_computer_health = action.payload.health;
            state.computer_weapons = [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three];
            state.computer_weapon_one = action.payload.enemy.combat_weapon_one;
            state.computer_weapon_two = action.payload.enemy.combat_weapon_two;
            state.computer_weapon_three = action.payload.enemy.combat_weapon_three;
            state.computer_defense = action.payload.enemy.defense;
            state.computer_attributes = action.payload.enemy.attributes;
            state.computer_damage_type = action.payload.enemy.combat_weapon_one.damage_type[0];
            state.new_player_health = state.new_player_health > state.player_health ? state.player_health : state.new_player_health === 0 ? state.player_health * 0.05 : state.new_player_health;
            // Phaser Enemy Pieces
            state.isEnemy = false;
            state.isAggressive = false;
            state.startedAggressive = false;
            state.player_win = false;
            state.computer_win = false;
            state.enemyID = action.payload.enemyID;
            state.npcType = action.payload.npcType;
        },
        setCombat: (state) => {
            state.combatEngaged = true;
            state.combatRound = 1;
            state.sessionRound = state.sessionRound === 0 ? 1 : state.sessionRound;
        },
        setAggression: (state, action) => {
            state.isAggressive = action.payload;
            state.combatEngaged = action.payload;
        },
        clearNonAggressiveEnemy: (state) => {
            state.computer = null;
            state.persuasionScenario = false;
            state.luckoutScenario = false;
            state.enemyPersuaded = false;
            state.player_luckout = false;
            state.player_win = false;
            state.playerGrapplingWin = false;
            state.computer_win = false;
            state.combatEngaged = false;
            state.playerTrait = '';
            state.isEnemy = false;
        },
        clearNpc: (state) => {
            state.computer = null;
            state.npcType = '';
        },
        setPhaser: (state, action) => {
            state.phaser = action.payload;
        },
        setRest: (state, action) => {
            const percentage = action.payload;
            const current = state.new_player_health;
            const healed = Math.floor(current + (percentage / 100));
            const newHealth = healed > state.player_health ? state.player_health : healed;
            state.new_player_health = newHealth;
            state.current_player_health = newHealth;
        },
        setWeather: (state, action) => {
            state.weather = action.payload;
        },
        // ===== Combat Input Concerns ===== \\
        setCombatInput: (state, action) => {
            const { key, value } = action.payload;
            state = {
                ...state,
                [key]: value
            };
        },
        setClearCounter: (state) => {
            state.counter_guess = '';
        },
        setActionStatus: (state, action) => {
            state.actionStatus = action.payload;
        },
        setAction: (state, action) => {
            state.action = action.payload;
            state.counter_guess = '';
        },
        setCounter: (state, action) => {
            state.action = 'counter';
            state.counter_guess = action.payload;
        },
        setDamageType: (state, action) => {
            state.player_damage_type = action.payload;
        },
        setInstantCombat: (state, action) => {
            state = action.payload;
            state.action = '';
            state.instantStatus = true;
        },
        setInstantStatus: (state, action) => {
            state.instantStatus = action.payload;
        },
        setPlayerBlessing: (state, action) => {
            state.playerBlessing = action.payload;
        },
        setPrayerSacrifice: (state, action) => {
            state.prayerSacrifice = action.payload.prayer;
            state.prayerSacrificeName = action.payload.name;
        },
        setWeaponOrder: (state, action) => {
            state.weapons = action.payload;
            state.player_damage_type = action.payload[0].damage_type[0];
        },
        setToggleDamaged: (state, action) => {
            state.playerDamaged = action.payload;
            state.computerDamaged = action.payload;
        },
        setEnemyActions: (state, action) => {
            state.player_win = action.payload.player_win;
            state.computer_win = action.payload.computer_win;
            state.player_action_description = action.payload.player_action_description;
            state.computer_action_description = action.payload.computer_action_description;
            state.player_start_description = action.payload.player_start_description;
            state.computer_start_description = action.payload.computer_start_description;
            state.player_death_description = action.payload.player_death_description;
            state.computer_death_description = action.payload.computer_death_description;
            state.player_special_description = action.payload.player_special_description;
            state.computer_special_description = action.payload.computer_special_description;
            state.player_influence_description = action.payload.player_influence_description;
            state.computer_influence_description = action.payload.computer_influence_description;
            state.player_influence_description_two = action.payload.player_influence_description_two;
            state.computer_influence_description_two = action.payload.computer_influence_description_two;
            state.potential_computer_damage = action.payload.potential_computer_damage;
            state.realized_computer_damage = action.payload.realized_computer_damage;
            state.playerDamaged = action.payload.playerDamaged;
            state.computerDamaged = action.payload.computerDamaged;
            state.new_player_health = action.payload.new_player_health;
            state.current_player_health = action.payload.current_player_health;
            state.computer_roll_success = action.payload.computer_roll_success;
            state.computer_counter_success = action.payload.computer_counter_success;
            state.computer_glancing_blow = action.payload.computer_glancing_blow;
            state.playerEffects = action.payload.playerEffects;  
        },
        setRemoveEffect: (state, action) => {
            state.playerEffects = state.playerEffects.filter(effect => effect.id !== action.payload);
            state.computerEffects = state.computerEffects.filter(effect => effect.id !== action.payload);
        },
        setStalwart: (state, action) => {
            state.isStalwart = action.payload;
        },
        setCombatTimer: (state, action) => {
            state.combatTimer = action.payload;
        },
        // ===== Combat Resolution Concerns ===== \\
        setCombatInitiated: (state, action) => {
            state = action.payload;
        },
        setEffectResponse: (state, action) => {
            state = action.payload;
        },
        setPlayerWin: (state, _action) => {
            const weaps: any[] = state.weapons.map(weapon => [state.weapon_one, state.weapon_two, state.weapon_three].find(w => w._id === weapon._id));
            state.weapons = weaps;
            state.winStreak = state.winStreak + 1;
            state.highScore = state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore;
            state.loseStreak = 0;
            state.combatEngaged = false;
            state.instantStatus = false;
        },
        setEnemyWin: (state, _action) => {
            const weaps = state.weapons.map(weapon => [state.weapon_one, state.weapon_two, state.weapon_three].find(w => w._id === weapon._id));
            state.loseStreak = state.loseStreak + 1;
            state.winStreak = 0;
            state.combatEngaged = false;
            state.instantStatus = false;
            state.weapons = weaps;
        },
        clearCombat: (state) => {
            state.computer = null;
            state.player_win = false;
            state.computer_win = false;
            state.combatEngaged = false;
            state.enemyPersuaded = false;
            state.instantStatus = false;
            state.action = '';
            state.counter_guess = '';
            state.computer_action = '';
            state.computer_counter_guess = '';
            state.playerTrait = '';
            state.computer_counter_guess = '';
            state.player_action_description = '';
            state.computer_action_description = '';
            state.player_start_description = '';
            state.computer_start_description = '';
            state.player_death_description = '';
            state.computer_death_description = '';
            state.player_special_description = '';
            state.computer_special_description = '';
            state.player_influence_description = '';
            state.computer_influence_description = '';
            state.player_influence_description_two = '';
            state.computer_influence_description_two = '';
            state.realized_player_damage = 0;
            state.realized_computer_damage = 0;
            state.combatRound = 0;
            state.actionData = [];
            state.typeAttackData = [];
            state.typeDamageData = [];
            state.totalDamageData = 0;
            state.prayerData = [];
            state.deityData = [];
            state.playerEffects = [];
            state.computerEffects = [];
        },
        
        // ===== Noncombat Resolution Concerns ===== \\
        setPlayerLuckout: (state, action) => {
            state.winStreak = state.winStreak + 1;
            state.highScore = state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore;
            state.loseStreak = 0;
            state.new_computer_health = 0;
            state.current_computer_health = 0;
            state.player_luckout = action.payload.playerLuckout;
            state.playerTrait = action.payload.playerTrait;
            state.player_win = true;
            state.luckoutScenario = true;    
        },
        setLuckoutFailure: (state, action) => {
            state.winStreak = 0;
            state.player_luckout = action.payload.playerLuckout;
            state.playerTrait = action.payload.playerTrait;
            state.luckoutScenario = true;
        },
        setEnemyPersuaded: (state, action) => {
            state.enemyPersuaded = action.payload.enemyPersuaded;
            state.playerTrait = action.payload.playerTrait;
            state.persuasionScenario = true;
        },
        resetLuckout: (state, action) => {
            state.player_luckout = action.payload;
        },
    }
});

export const {
    getCombatStateUpdate,
    getEnemyActionFetch,
    getCombatStatisticFetch,
    getAsceanHealthUpdateFetch,
    getInitiateFetch,
    getCombatSettingFetch,
    getEffectTickFetch,
    getCombatFetch,
    getStalwartFetch,
    getCombatTimerFetch,


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

    setCombatTimer,
    setCombatInput,
    setClearCounter,
    setActionStatus, 
    setAction,
    setCounter,
    setDamageType, 
    setEnemyActions,
    setToggleDamaged,
    setWeaponOrder,
    setCombatInitiated,
    setInstantCombat,
    setPlayerBlessing,
    setPrayerSacrifice,
    setInstantStatus,
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