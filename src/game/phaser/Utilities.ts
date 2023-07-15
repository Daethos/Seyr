import React from "react";
import { GAME_ACTIONS, GameData, Game_Action, NPC, Player } from "../../components/GameCompiler/GameStore";
import * as asceanAPI from '../../utils/asceanApi';
import * as eqpAPI from '../../utils/equipmentApi';
import * as gameAPI from '../../utils/gameApi';
import { ACTIONS, Action, CombatData, shakeScreen } from "../../components/GameCompiler/CombatStore";
import EventEmitter from "./EventEmitter";
import userService from "../../utils/userService";
import { Merchant } from "../../components/GameCompiler/NPCs";
import { getNpcDialog } from "../../components/GameCompiler/Dialog";
import useGameSounds from '../../components/GameCompiler/Sounds'; 
import { StatusEffect } from "../../components/GameCompiler/StatusEffects";

export const getAsceanAndInventory = async (asceanID: string, dispatch: React.Dispatch<Action>, gameDispatch: React.Dispatch<Game_Action>): Promise<void> => {
    try {
        const firstResponse = await asceanAPI.getAsceanAndInventory(asceanID);
        gameDispatch({ type: GAME_ACTIONS.SET_ASCEAN_AND_INVENTORY, payload: firstResponse.data });
        const response = await asceanAPI.getAsceanStats(asceanID);
        dispatch({
            type: ACTIONS.SET_PLAYER_SLICK,
            payload: response.data.data
        });
        gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
    } catch (err: any) {
        console.log(err.message, 'Error Getting Ascean Quickly');
    };
};

export const getOnlyInventory = async (asceanID: string, gameDispatch: React.Dispatch<Game_Action>): Promise<void> => {
    try {
        const firstResponse = await asceanAPI.getAsceanInventory(asceanID);
        gameDispatch({ type: GAME_ACTIONS.SET_INVENTORY, payload: firstResponse });
        gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
    } catch (err: any) {
        console.log(err.message, 'Error Getting Ascean Quickly');
    };
};

export const drinkFirewater = async (dispatch: React.Dispatch<Action>, gameDispatch: React.Dispatch<Game_Action>, state: CombatData, gameState: GameData): Promise<void> => {
    if (gameState.player?.firewater?.charges === 0) return;
    try {
        dispatch({ type: ACTIONS.PLAYER_REST, payload: 40 });
        const response = await asceanAPI.drinkFirewater(state.player._id);
        gameDispatch({ type: GAME_ACTIONS.SET_FIREWATER, payload: response.firewater });
        gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
    } catch (err: any) {
        console.log(err, "Error Drinking Firewater");
    };
};

export const updateEnemyAction = async (e: any, state: CombatData, dispatch: React.Dispatch<Action>, gameState: GameData): Promise<void> => {
    try {
        const { enemyID, enemy, damageType, combatStats, weapons, health, actionData, state } = e;
        let enemyData = {
            ...state,
            computer: enemy,
            computer_attributes: combatStats.attributes,
            computer_weapon_one: combatStats.combat_weapon_one,
            computer_weapon_two: combatStats.combat_weapon_two,
            computer_weapon_three: combatStats.combat_weapon_three,
            new_computer_health: health,
            current_computer_health: health,
            computer_health: combatStats.healthTotal,
            computer_defense: combatStats.defense,
            enemyID: '',
            computer_weapons: weapons,
            action: '',
            computer_action: actionData.action,
            computer_counter_guess: actionData.counter,
            computer_damage_type: damageType,
            computerEffects: [],
        };
        console.log(`%c Enemy Action: "${enemyData.computer_action} ${enemyData.computer_counter_guess}"`, 'color: red; font-size: 16px; font-weight: bold;` ');
        let response = await gameAPI.phaserAction(enemyData);
        if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
        dispatch({ type: ACTIONS.REGISTER_ENEMY_ACTIONS, payload: response.data });
        response.data.enemyID = enemyID;
        await updateCombat(response.data);
        await soundEffects(response.data, gameState);
        shakeScreen(gameState.shake);
        // if (response.data.player_win === true) await handlePlayerWin(response.data, dispatch, gameState, gameDispatch, asceanState, setAsceanState);
        // if (response.data.computer_win === true) await handleComputerWin(response.data, dispatch, gameState, gameDispatch); // TODO:FIXME: Probably handle these in useEffects moving forward
        setTimeout(() => {
            dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
        }, 1500);
    } catch (err: any) {
        console.log(err.message, 'Error Updating Enemy Action');
    };
};

export const saveExperience = async (gameState: GameData, state: CombatData, dispatch: React.Dispatch<Action>, gameDispatch: React.Dispatch<Game_Action>, setAsceanState: React.Dispatch<any>, asceanState: any): Promise<void> => {
    console.log('Saving Experience!', gameState.saveExp, state.player_win);
    if (!gameState.saveExp) return;
    try {
        gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You reflect on the moments of your duel with ${gameState.opponent.name} as you count your pouch of winnings.` });
        const response = await asceanAPI.saveExperience(asceanState);
        if (response.data.gold > 0 && response.data.silver > 0) {
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.gold} gold and ${response.data.silver} silver.`] });
        } else if (response.data.gold > 0 && response.data.silver === 0) { 
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.gold} gold.`] });
        } else if (response.data.gold === 0 && response.data.silver > 0) {
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.silver} silver.`] });
        } else {
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points.`] });
        };
        const cleanRes = await asceanAPI.getCleanAscean(state.player._id);
        gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: cleanRes.data });
        dispatch({
            type: ACTIONS.SAVE_EXPERIENCE,
            payload: cleanRes.data
        });
        setAsceanState({
            ...asceanState,
            'ascean': cleanRes.data,
            'currentHealth': cleanRes.data.health.current,
            'constitution': 0,
            'strength': 0,
            'agility': 0,
            'achre': 0,
            'caeren': 0,
            'kyosir': 0,
            'level': cleanRes.data.level,
            'opponent': 0,
            'opponentExp': 0,
            'experience': cleanRes.data.experience,
            'experienceNeeded': cleanRes.data.level * 1000,
            'mastery': cleanRes.data.mastery,
            'faith': cleanRes.data.faith,
        });
        gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: false });
    } catch (err: any) {
        console.log(err.message, 'Error Saving Experience');
    };
};

export const gainExperience = async (data: CombatData, gameDispatch: React.Dispatch<Game_Action>, setAsceanState: React.Dispatch<any>, asceanState: any): Promise<void> => {
    try {
        let opponentExp: number = Math.round(data.computer.level * 100 * (data.computer.level / data.player.level) + data.player_attributes.rawKyosir);
        if (data.prayerData.includes('Avarice')) opponentExp = Math.round(opponentExp * 1.2);
        console.log(opponentExp, 'Opponent Exp in Gain Experience');
        if (asceanState.ascean.experience + opponentExp >= asceanState.experienceNeeded) {
            setAsceanState({
                ...asceanState,
                'opponentExp': opponentExp,
                'currentHealth': data.new_player_health,
                'experience': asceanState.experienceNeeded,
                'avarice': data.prayerData.includes('Avarice') ? true : false,
            });
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
        };
        if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
            setAsceanState({
                ...asceanState,
                'opponentExp': opponentExp,
                'currentHealth': data.new_player_health,
                'experience': Math.round(asceanState.experience + opponentExp),
                'avarice': data.prayerData.includes('Avarice') ? true : false,
            });
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
        };
    } catch (err: any) {
        console.log(err.message, 'Error Gaining Experience');
    };
}; 

export const getOneLootDrop = async (level: number, gameDispatch: React.Dispatch<Game_Action>, state: CombatData): Promise<void> => {
    try {
        let response = await eqpAPI.getLootDrop(level);
        gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROPS, payload: response.data[0] });
        let roll = Math.floor(Math.random() * 100) + 1;
        if (roll <= 25) {
            let second = await eqpAPI.getLootDrop(level);
            gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROPS, payload: second.data[0] });
            EventEmitter.emit('enemyLootDrop', { enemyID: state.enemyID, drops: [response.data[0], second.data[0]] });
        } else {
            EventEmitter.emit('enemyLootDrop', { enemyID: state.enemyID, drops: response.data });
        };
        gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
    } catch (err: any) {
        console.log(err, 'Error Getting Loot Drop');
    };
};

export const levelUpAscean = async (ascean: Player, setAsceanState: React.Dispatch<any>, asceanState: any): Promise<void> => {
    try {
        let response = await asceanAPI.levelUp(ascean); 
        setAsceanState({
            ...asceanState,
            ascean: response.data,
            constitution: 0,
            strength: 0,
            agility: 0,
            achre: 0,
            caeren: 0,
            kyosir: 0,
            level: response.data.level,
            experience: response.data.experience,
            experienceNeeded: response.data.level * 1000,
            mastery: response.data.mastery,
            faith: response.data.faith,
        });
        // await getAsceanLeveled(ascean._id, dispatch, gameDispatch); TODO:FIXME: Will change this to be called from the game store // kek I wish
    } catch (err: any) {
        console.log(err.message, 'Error Leveling Up');
    };
};

export const getAsceanLeveled = async (asceanID: string, dispatch: React.Dispatch<any>, gameDispatch: React.Dispatch<Game_Action>): Promise<void> => {
    try {
        const firstResponse = await asceanAPI.getCleanAscean(asceanID);
        gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_LEVEL_UP, payload: firstResponse.data });
        const response = await asceanAPI.getAsceanStats(asceanID);
        dispatch({
            type: ACTIONS.SET_PLAYER_LEVEL_UP,
            payload: response.data.data
         });
    } catch (err: any) {
        console.log(err.message, 'Error Getting Ascean Leveled');
    };
};

export const fetchEnemy = async (e: any, state: CombatData): Promise<void> => {
    const getOpponent = async () => {
        try { 
            let minLevel: number = 0;
            let maxLevel: number = 0; 
            if (state.player.level < 3) {
                minLevel = 1;
                maxLevel = 2;
            } else  if (state.player.level <= 4) { // 3-4 
                minLevel = 2;
                maxLevel = 4;
            } else if (state.player.level <= 6) { 
                minLevel = 4;
                maxLevel = 6;
            } else if (state.player.level <= 8) {
                minLevel = 5;
                maxLevel = 9;
            } else if (state.player.level <= 10) { // 9-10
                minLevel = 7;
                maxLevel = 12;
            } else if (state.player.level <= 12) {
                minLevel = 8;
                maxLevel = 14;
            } else if (state.player.level <= 14) { // 11-14
                minLevel = 10;
                maxLevel = 16;
            } else if (state.player.level <= 18) { // 15-18
                minLevel = 12;
                maxLevel = 18;
            } else if (state.player.level <= 20) {
                minLevel = 16;
                maxLevel = 20;
            };
            const enemyData = {
                username: 'mirio',
                minLevel: minLevel,
                maxLevel: maxLevel
            };
            const secondResponse = await userService.getRandomEnemy(enemyData);
            const selectedOpponent = await asceanAPI.getCleanAscean(secondResponse.data.ascean._id);
            const response = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            return {
                game: selectedOpponent.data,
                combat: response.data.data,
                enemyID: e.enemyID
            };
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        };
    };
    const opponent = await getOpponent();
    EventEmitter.emit('enemy-fetched', opponent);
};

export const fetchNpc = async (e: any): Promise<void> => { 
    try {
        const CITY_OPTIONS = {
            'Merchant-Alchemy': 'Alchemist',
            'Merchant-Armor': 'Armorer',
            'Merchant-Smith': 'Blacksmith',
            'Merchant-Jewelry': 'Jeweler',
            'Merchant-General': 'General Merchant',
            'Merchant-Tailor': 'Tailor',
            'Merchant-Mystic': 'Senarian',
            'Merchant-Weapon': 'Sevasi',
        };
        const getNPC = async () => {
            let npc: NPC = Object.assign({}, Merchant);
            npc.name = 'Traveling ' + CITY_OPTIONS[e.npcType as keyof typeof CITY_OPTIONS];
            const response = await asceanAPI.getAnimalStats(npc);
            return {
                game: npc,
                combat: response.data.data,
                enemyID: e.enemyID
            };
        };
        const npc = await getNPC();
        EventEmitter.emit('npc-fetched', npc);
    } catch (err: any) {
        console.log("Error Getting an NPC");
    };
};

export const getOpponentDialog = async (enemy: string, gameDispatch: React.Dispatch<Game_Action>): Promise<void> => {
    try {
        const response = getNpcDialog(enemy);
        if (!response) return;
        gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
    } catch (err: any) {
        console.log(err.message, '<- Error in Getting an Ascean to Edit')
    };
}; 

export async function handlePlayerLuckout(dispatch: React.Dispatch<Action>,  gameState: GameData, state: CombatData, gameDispatch: React.Dispatch<Game_Action>, setAsceanState: React.Dispatch<any>, asceanState: any): Promise<void> {
    try {
        const { playReligion } = useGameSounds(gameState.soundEffectVolume);
        playReligion();
        await getOneLootDrop(state.computer.level, gameDispatch, state);
        await gainExperience(state, gameDispatch, setAsceanState, asceanState);
        dispatch({ type: ACTIONS.RESET_LUCKOUT, payload: false });
    } catch (err: any) {
        console.log("Error Handling Player Win");
    };
};

export const deleteEquipment = async (eqp: any): Promise<void> => {
    try {
        await eqpAPI.deleteEquipment(eqp);
    } catch (err) {
        console.log(err, 'Error!')
    };
};

export const soundEffects = async (effects: CombatData, gameState: GameData): Promise<void> => {
    try {
        const { playCounter, playRoll, playPierce, playSlash, playBlunt, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind } = useGameSounds(gameState.soundEffectVolume);
        if (effects.realized_player_damage > 0) {
            const soundEffectMap = {
                Spooky: playDaethic,
                Righteous: playDaethic,
                Wild: playWild,
                Earth: playEarth,
                Fire: playFire,
                Frost: playFrost,
                Lightning: playLightning,
                Sorcery: playSorcery,
                Wind: playWind,
                Pierce: (weapons: any[]) => (weapons[0].type === "Bow" || weapons[0].type === "Greatbow") ? playBow() : playPierce(),
                Slash: playSlash,
                Blunt: playBlunt,
            };
        
            const { player_damage_type, weapons } = effects;
            const soundEffectFn = soundEffectMap[player_damage_type as keyof typeof soundEffectMap];
            if (soundEffectFn) {
                soundEffectFn(weapons);
            };
        };
        if (effects.realized_computer_damage > 0) {
            const soundEffectMap = {
                Spooky: playDaethic,
                Righteous: playDaethic,
                Wild: playWild,
                Earth: playEarth,
                Fire: playFire,
                Frost: playFrost,
                Lightning: playLightning,
                Sorcery: playSorcery,
                Wind: playWind,
                Pierce: (computer_weapons: any[]) => (computer_weapons[0].type === "Bow" || computer_weapons[0].type === 'Greatbow') ? playBow() : playPierce(),
                Slash: playSlash,
                Blunt: playBlunt,
            };
        
            const { computer_damage_type, computer_weapons } = effects;
            const soundEffectFn = soundEffectMap[computer_damage_type as keyof typeof soundEffectMap];
            if (soundEffectFn) {
                soundEffectFn(computer_weapons);
            };
        };
        if (effects.religious_success === true) {
            playReligion();
        };
        if (effects.roll_success === true || effects.computer_roll_success === true) {
            playRoll();
        };
        if (effects.counter_success === true || effects.computer_counter_success === true) {
            playCounter();
        };
    } catch (err: any) {
        console.log(err.message, 'Error Setting Sound Effects')
    };
};

export const handlePlayerWin = async (combatData: CombatData, dispatch: React.Dispatch<Action>, gameState: GameData, gameDispatch: React.Dispatch<Game_Action>, asceanState: any, setAsceanState: React.Dispatch<any>): Promise<void> => {
    try {
        const { playReligion } = useGameSounds(gameState.soundEffectVolume);
        playReligion();
        await gainExperience(combatData, gameDispatch, setAsceanState, asceanState);
        const statistic = {
            asceanID: combatData.player._id,
            wins: 1,
            losses: 0,
            total: 1,
            actionData: combatData.actionData,
            typeAttackData: combatData.typeAttackData,
            typeDamageData: combatData.typeDamageData,
            totalDamageData: combatData.totalDamageData,
            prayerData: combatData.prayerData,
            deityData: combatData.deityData,

        };
        const response = await asceanAPI.recordCombatStatistic(statistic);
        console.log(response, "Player Win Response Recorded");
        gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
        gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
        await getOneLootDrop(combatData.computer.level, gameDispatch, combatData);
        setTimeout(() => {
            dispatch({ type: ACTIONS.PLAYER_WIN, payload: combatData });
            gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
        }, 6000);
    } catch (err: any) {
        console.log("Error Handling Player Win");
    };
};

export const handleComputerWin = async (combatData: CombatData, dispatch: React.Dispatch<Action>, gameState: GameData, gameDispatch: React.Dispatch<Game_Action>): Promise<void> => {
    try {
        const { playDeath } = useGameSounds(gameState.soundEffectVolume);
        const statistic = {
            asceanID: combatData.player._id,
            wins: 0,
            losses: 1,
            total: 1,
            actionData: combatData.actionData,
            typeAttackData: combatData.typeAttackData,
            typeDamageData: combatData.typeDamageData,
            totalDamageData: combatData.totalDamageData,
            prayerData: combatData.prayerData,
            deityData: combatData.deityData,
        };
        const response = await asceanAPI.recordCombatStatistic(statistic);
        console.log(response, "Player Loss Response Recorded");
        gameDispatch({ type: GAME_ACTIONS.SET_STATISTICS, payload: response });
        await asceanAPI.asceanHealth({ health: combatData.new_player_health, id: combatData.player._id });
        playDeath();
        // gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
        // gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You have lost the battle to ${gameState?.opponent?.name}, yet still there is always Achre for you to gain.` })
        // setTimeout(() => {
            dispatch({ type: ACTIONS.COMPUTER_WIN, payload: combatData });
            // gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: false });
            // gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
        // }, 6000);
    } catch (err: any) {
        console.log("Error Handling Player Win");
    };
};

export const handleEffectTick = async (state: CombatData, effect: StatusEffect, effectTimer: number, dispatch: React.Dispatch<Action>): Promise<void> => {
    try {
        const data = { combatData: state, effect, effectTimer };
        const response = await gameAPI.effectTick(data);
        console.log(response, "Response From Effect Tick");
        dispatch({ type: ACTIONS.EFFECT_RESPONSE, payload: response.data });
        // if (response.data.player_win === true) await handlePlayerWin(response.data);
        // if (response.data.computer_win === true) await handleComputerWin(response.data);
        setTimeout(() => {
            dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
        }, 1500);
    } catch (err: any) {
        console.log(err, "Error In Effect Tick");
    };
};

export const handleInitiate = async (combatData: CombatData, dispatch: React.Dispatch<Action>, gameState: GameData): Promise<void> => {
    try { 
        console.log(`%c Player: Action - ${combatData.action} Counter -${combatData.counter_guess} | Computer: Action - ${combatData.computer_action} Counter -${combatData.computer_counter_guess}`, 'color: green; font-size: 16px; font-weight: bold;` ')
        const response = await gameAPI.phaserAction(combatData);
        console.log(response.data, "Initiate Response")
        if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
        await updateCombat(response.data);
        dispatch({ type: ACTIONS.INITIATE_COMBAT, payload: response.data });
        await soundEffects(response.data, gameState);
        shakeScreen(gameState.shake);
        // if (response.data.player_win === true) await handlePlayerWin(response.data);
        // if (response.data.computer_win === true) await handleComputerWin(response.data);
        setTimeout(() => {
            dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
        }, 1500);
    } catch (err: any) {
        console.log(err.message, 'Error Initiating Combat')
    };
};

export const handleInstant = async (state: CombatData, dispatch: React.Dispatch<Action>, gameState: GameData, gameDispatch: React.Dispatch<Game_Action>): Promise<void> => {
    try {
        const { playReligion } = useGameSounds(gameState.soundEffectVolume);
        gameDispatch({ type: GAME_ACTIONS.INSTANT_COMBAT, payload: true });
        const response = await gameAPI.instantAction(state);
        console.log(response.data, "Instant Response");
        if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
        await updateCombat(response.data);
        dispatch({ type: ACTIONS.INSTANT_COMBAT, payload: response.data });
        // if (response.data.player_win === true) await handlePlayerWin(response.data);
        shakeScreen(gameState.shake);
        playReligion();
        setTimeout(() => {
            dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
        }, 1500);
    } catch (err: any) {
        console.log(err.message, 'Error Initiating Insant Action')
    };
};

export const handlePrayer = async (state: CombatData, dispatch: React.Dispatch<Action>, gameState: GameData): Promise<void> => {
    try {
        if (state.prayerSacrifice === '') return;
        const { playReligion } = useGameSounds(gameState.soundEffectVolume);
        const response = await gameAPI.consumePrayer(state);
        console.log(response.data, "Prayer Response");
        if ('vibrate' in navigator) navigator.vibrate(gameState.vibrationTime);
        await updateCombat(response.data);
        dispatch({ type: ACTIONS.CONSUME_PRAYER, payload: response.data });
        // if (response.data.player_win === true) await handlePlayerWin(response.data);
        shakeScreen(gameState.shake);
        playReligion();
        setTimeout(() => {
            dispatch({ type: ACTIONS.TOGGLED_DAMAGED, payload: false  });
        }, 1500);
    } catch (err: any) {
        console.log(err.message, 'Error Initiating Action')
    };
};

export const setWeaponOrder = async (weapon: any, gameState: GameData, dispatch: React.Dispatch<Action>, state: CombatData): Promise<void> => {
    try {
        const { playWO } = useGameSounds(gameState.soundEffectVolume);
        const findWeapon = state.weapons.filter((weap: { name: any; }) => weap?.name === weapon.target.value);
        const newWeaponOrder = async () => state?.weapons.sort((a: any, b: any) => {
            return ( a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0 )
        });
        const response = await newWeaponOrder();
        playWO();
        dispatch({ type: ACTIONS.SET_WEAPON_ORDER, payload: response });
    } catch (err: any) {
        console.log(err.message, 'Error Setting Weapon Order');
    };
};

export const setDamageType = async (damageType: any, gameState: GameData, dispatch: React.Dispatch<Action>): Promise<void> => {
    try {    
        const { playWO } = useGameSounds(gameState.soundEffectVolume);
        playWO();
        dispatch({ type: ACTIONS.SET_DAMAGE_TYPE, payload: damageType.target.value });
    } catch (err: any) {
        console.log(err.message, 'Error Setting Damage Type');
    };
};

export const setPrayerBlessing = async (prayer: any, gameState: GameData, dispatch: React.Dispatch<Action>): Promise<void> => {
    try {
        const { playWO } = useGameSounds(gameState.soundEffectVolume);
        playWO();
        dispatch({ type: ACTIONS.SET_PRAYER_BLESSING, payload: prayer.target.value });
    } catch (err: any) {
        console.log(err.message, 'Error Setting Prayer');
    };
}; 

export const updateCombatListener = async (combatData: CombatData): Promise<void> => {
    try {
        EventEmitter.emit('update-combat-data', combatData);
    } catch (err: any) {
        console.log(err.message, 'Error Updating Combat Listener');
    };
};

export const updateCombat = async (combatData: CombatData): Promise<void> => {
    try {
        EventEmitter.emit('update-combat', combatData);
    } catch (err: any) {
        console.log(err.message, 'Error Updating Combat Listener');
    };
};