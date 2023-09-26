import { createSlice } from '@reduxjs/toolkit';
import { initialCombatData } from '../../components/GameCompiler/CombatStore';
import { getSocketInstance } from '../../sagas/socketManager';
import { SOCKET } from '../../sagas/socketSaga';

const combatSlice = createSlice({
    name: 'combat',
    initialState: initialCombatData,
    reducers: {
        // ===== Combat Getter ===== \\
        getPlayerActionFetch: (state, _action) => {},
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
        getNpcSetupFetch: (state, _action) => {},
        getDrainFetch: (state, _action) => {},
        getRemoveEffectFetch: (state, _action) => {},
        getHealthFetch: (state, _action) => {},

        clearEverything: (state) => {
            return {
                ...initialCombatData
            };
        },

        // ==================== Combat Setup / Breakdown ==================== \\

        setCombatPlayer: (state, action) => {
            return {
                ...state,
                player: action.payload.ascean,
                playerHealth: action.payload.ascean.health.total,
                newPlayerHealth: action.payload.ascean.health.current,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weaponOne: action.payload.combat_weapon_one,
                weaponTwo: action.payload.combat_weapon_two,
                weaponThree: action.payload.combat_weapon_three,
                playerDefense: action.payload.defense,
                playerAttributes: action.payload.attributes,
                playerDamageType: action.payload.combat_weapon_one.damage_type[0],
                highScore: action.payload.ascean.high_score,
            };
        },
        setEnemy: (state, action) => {
            return {
                ...state,
                computer: action.payload.enemy.ascean,
                computerHealth: action.payload.enemy.attributes.healthTotal,
                newComputerHealth: action.payload.health,
                computerWeapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                computerWeaponOne: action.payload.enemy.combat_weapon_one,
                computerWeaponTwo: action.payload.enemy.combat_weapon_two,
                computerWeaponThree: action.payload.enemy.combat_weapon_three,
                computerDefense: action.payload.enemy.defense,
                computerAttributes: action.payload.enemy.attributes,
                computerDamageType: action.payload.enemy.combat_weapon_one.damage_type[0],
                newPlayerHealth: state.newPlayerHealth > state.playerHealth ? state.playerHealth : state.newPlayerHealth === 0 ? state.playerHealth * 0.05 : state.newPlayerHealth,
                // Phaser Enemy Pieces
                isEnemy: true,
                npcType: '',
                isAggressive: action.payload.isAggressive,
                startedAggressive: action.payload.isAggressive,
                playerWin: action.payload.isDefeated,
                computerWin: action.payload.isTriumphant,
                enemyID: action.payload.enemyID,   
            };
        },
        setNpc: (state, action) => {
            return {
                ...state,
                computer: action.payload.enemy.ascean,
                computerHealth: action.payload.enemy.attributes.healthTotal,
                newComputerHealth: action.payload.health,
                computerWeapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                computerWeaponOne: action.payload.enemy.combat_weapon_one,
                computerWeaponTwo: action.payload.enemy.combat_weapon_two,
                computerWeaponThree: action.payload.enemy.combat_weapon_three,
                computerDefense: action.payload.enemy.defense,
                computerAttributes: action.payload.enemy.attributes,
                computerDamageType: action.payload.enemy.combat_weapon_one.damage_type[0],
                newPlayerHealth: state.newPlayerHealth > state.playerHealth ? state.playerHealth : state.newPlayerHealth === 0 ? state.playerHealth * 0.05 : state.newPlayerHealth,
                // Phaser Enemy Pieces
                isEnemy: false,
                isAggressive: false,
                startedAggressive: false,
                playerWin: false,
                computerWin: false,
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
                playerLuckout: false,
                playerWin: false,
                playerGrapplingWin: false,
                computerWin: false,
                combatEngaged: false,
                playerTrait: '',
                enemyID: '',
                isEnemy: false,
            };
        },
        clearNpc: (state) => {
            return {
                ...state,
                computer: null,
                npcType: '',
                enemyID: '',
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
        setDrain: (state, action) => {
            console.log(action.payload, "Drained");
            return {
                ...state,
                newPlayerHealth: action.payload.newHealth,
                newComputerHealth: state.newComputerHealth - action.payload.drained,
            };
        },
        setRest: (state, action) => {
            const healed = Math.floor(state.newPlayerHealth + state.playerHealth * (action.payload / 100)) ;
            const newHealth = healed > state.playerHealth ? state.playerHealth : healed;
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { newPlayerHealth: newHealth });
            return {
                ...state,
                newPlayerHealth: newHealth,
            };
        },
        setRestEnemy: (state, action) => {
            const healed = Math.floor(state.newComputerHealth + state.computerHealth * (action.payload / 100)) ;
            const newHealth = healed > state.computerHealth ? state.computerHealth : healed;
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { newComputerHealth: newHealth });
            return {
                ...state,
                newComputerHealth: newHealth,
            };
        },
        setWeather: (state, action) => { 
            return { ...state, weather: action.payload }; 
        },

        // ==================== Combat Input Concerns ==================== \\

        setCombatInput: (state, action) => {
            const { key, value } = action.payload;
            return { ...state, [key]: value };
        },
        setDamageType: (state, action) => {
            return { ...state, playerDamageType: action.payload };
        }, 
        setPlayerBlessing: (state, action) => {
            return { ...state, playerBlessing: action.payload };
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
                playerDamageType: action.payload[0].damage_type[0],
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
                playerWin: action.payload.playerWin,
                computerWin: action.payload.computerWin,
                playerActionDescription: action.payload.playerActionDescription,
                computerActionDescription: action.payload.computerActionDescription,
                playerStartDescription: action.payload.playerStartDescription,
                computerStartDescription: action.payload.computerStartDescription,
                playerDeathDescription: action.payload.playerDeathDescription,
                computerDeathDescription: action.payload.computerDeathDescription,
                playerSpecialDescription: action.payload.playerSpecialDescription,
                computerSpecialDescription: action.payload.computerSpecialDescription,
                playerInfluenceDescription: action.payload.playerInfluenceDescription,
                computerInfluenceDescription: action.payload.computerInfluenceDescription,
                playerInfluenceDescriptionTwo: action.payload.playerInfluenceDescriptionTwo,
                computerInfluenceDescriptionTwo: action.payload.computerInfluenceDescriptionTwo,
                potentialComputerDamage: action.payload.potentialComputerDamage,
                realizedComputerDamage: action.payload.realizedComputerDamage,
                playerDamaged: action.payload.playerDamaged,
                computerDamaged: action.payload.computerDamaged,
                newPlayerHealth: action.payload.newPlayerHealth,
                computerCriticalSuccess: action.payload.computerCriticalSuccess,
                computerReligiousSuccess: action.payload.computerReligiousSuccess,
                computerRollSuccess: action.payload.computerRollSuccess,
                computerCounterSuccess: action.payload.computerCounterSuccess,
                computerGlancingBlow: action.payload.computerGlancingBlow,
                computerDualWielding: action.payload.computerDualWielding,
                playerEffects: action.payload.playerEffects,  
            };
        },
        setPlayerActions: (state, action) => {
            return {
                ...state,
                playerWin: action.payload.playerWin,
                computerWin: action.payload.computerWin,
                playerActionDescription: action.payload.playerActionDescription,
                computerActionDescription: action.payload.computerActionDescription,
                playerStartDescription: action.payload.playerStartDescription,
                computerStartDescription: action.payload.computerStartDescription,
                playerDeathDescription: action.payload.playerDeathDescription,
                computerDeathDescription: action.payload.computerDeathDescription,
                playerSpecialDescription: action.payload.playerSpecialDescription,
                computerSpecialDescription: action.payload.computerSpecialDescription,
                playerInfluenceDescription: action.payload.playerInfluenceDescription,
                computerInfluenceDescription: action.payload.computerInfluenceDescription,
                playerInfluenceDescriptionTwo: action.payload.playerInfluenceDescriptionTwo,
                computerInfluenceDescriptionTwo: action.payload.computerInfluenceDescriptionTwo,
                potentialPlayerDamage: action.payload.potentialPlayerDamage,
                realizedPlayerDamage: action.payload.realizedPlayerDamage,
                potentialComputerDamage: action.payload.potentialComputerDamage,
                realizedComputerDamage: action.payload.realizedComputerDamage,
                playerDamaged: action.payload.playerDamaged,
                newPlayerHealth: action.payload.newPlayerHealth,
                criticalSuccess: action.payload.criticalSuccess,
                religiousSuccess: action.payload.religiousSuccess,
                rollSuccess: action.payload.rollSuccess,
                counterSuccess: action.payload.counterSuccess,
                glancingBlow: action.payload.glancingBlow,
                dualWielding: action.payload.dualWielding,
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
        setCaerenic: (state, action) => {
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { isCaerenic: action.payload });
            return {
                ...state,
                isCaerenic: action.payload,
            };
        },
        setStalwart: (state, action) => {
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { isStalwart: action.payload });
            return {
                ...state,
                isStalwart: action.payload,
            };
        },
        setCombatTimer: (state, action) => {
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { combatTimer: action.payload });
            return { ...state, combatTimer: action.payload };
        }, 

        // ==================== Combat Resolution Concerns ==================== \\

        setCombatResolution: (state, action) => {
            return { ...state, ...action.payload };
        },
        setEffectResponse: (state, action) => {
            return { ...state, ...action.payload };
        },
        setPlayerWin: (state, _action) => {
            const socket = getSocketInstance();
            const weaps: any[] = state.weapons.map(weapon => [state.weaponOne, state.weaponTwo, state.weaponThree].find(w => w._id === weapon._id));
            socket.emit(SOCKET.PLAYER_WIN, weaps);
            return {
                ...state,
                weapons: weaps,
                winStreak: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                instantStatus: false
            };
        },
        setEnemyWin: (state, _action) => {
            const socket = getSocketInstance();
            const weaps = state.weapons.map(weapon => [state.weaponOne, state.weaponTwo, state.weaponThree].find(w => w._id === weapon._id));
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
        setInstantStatus: (state, action) => {
            const socket = getSocketInstance();
            socket.emit(SOCKET.UPDATE_COMBAT_DATA, { instantStatus: action.payload });
            return {
                ...state,
                instantStatus: action.payload,
            };
        },
        clearCombat: (state) => {
            return {
                ...state,
                playerWin: false,
                computerWin: false,
                combatEngaged: false,
                enemyPersuaded: false,
                instantStatus: false,
                action: '',
                counterGuess: '',
                computerAction: '',
                computerCounterGuess: '',
                playerTrait: '',
                playerActionDescription: '',
                computerActionDescription: '',
                playerStartDescription: '',
                computerStartDescription: '',
                playerDeathDescription: '',
                computerDeathDescription: '',
                playerSpecialDescription: '',
                computerSpecialDescription: '',
                playerInfluenceDescription: '',
                computerInfluenceDescription: '',
                playerInfluenceDescriptionTwo: '',
                computerInfluenceDescriptionTwo: '',
                potentialPlayerDamage: 0,
                potentialComputerDamage: 0,
                realizedPlayerDamage: 0,
                realizedComputerDamage: 0,
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
                enemyID: '',
            };
        }, 

        // ==================== Noncombat Resolution Concerns ==================== \\

        setClearGame: (state) => {
            return {
                ...state,
                weapons: [state.weaponOne, state.weaponTwo, state.weaponThree],
                playerDamageType: state.weaponOne.damage_type[0],
                playerDefense: state.playerDefenseDefault,
                playerWin: false,
                computerWin: false,
                combatEngaged: false,
                enemyPersuaded: false,
                instantStatus: false,
                combatRound: 0,
                sessionRound: 0,
                computer: null,
                isEnemy: false,
                isStalwart: false,
                isCaerenic: false,
            };
        },

        setPlayerLuckout: (state, action) => {
            return {
                ...state,
                winStreak: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                newComputerHealth: 0,
                playerLuckout: action.payload.playerLuckout,
                playerTrait: action.payload.playerTrait,
                playerWin: true,
                luckoutScenario: true
            };
        },
        setLuckoutFailure: (state, action) => {
            return {
                ...state,
                winStreak: 0,
                playerLuckout: action.payload.playerLuckout,
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
                playerLuckout: action.payload,
            };
        },
    }
});

export const {
    getCombatStateUpdate,
    getPlayerActionFetch,
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
    getDrainFetch,
    getRemoveEffectFetch,
    getHealthFetch,

    clearEverything,
    
    setClearGame,
    setCombatPlayer,
    setEnemy,
    setNpc,
    setCombat,
    setAggression,
    clearNonAggressiveEnemy,
    clearNpc,
    setPhaser,
    setDrain,
    setRest,
    setRestEnemy,
    setWeather,
    setPhaserAggression,

    setCombatTimer,
    setCombatInput,
    setDamageType, 
    setEnemyActions,
    setToggleDamaged,
    setWeaponOrder,
    setCombatResolution,
    setPlayerActions,
    setPlayerBlessing,
    setPrayerSacrifice,
    setRemoveEffect,

    setInstantStatus,
    setEffectResponse,
    setPlayerWin,
    setEnemyWin,
    clearCombat,
    setPlayerLuckout,
    setLuckoutFailure,
    setEnemyPersuaded,
    resetLuckout,
    setCaerenic,
    setStalwart
} = combatSlice.actions;

export default combatSlice.reducer;