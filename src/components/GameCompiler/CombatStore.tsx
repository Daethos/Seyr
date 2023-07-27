export interface CombatData {
    player: any;
    action: string;
    playerAction: string;
    counterGuess: string;
    playerBlessing: string;
    prayerSacrifice: string;
    prayerSacrificeName: string,
    playerHealth: number;
    currentPlayerHealth: number;
    newPlayerHealth: number;
    weapons: any[];
    weaponOne: any;
    weaponTwo: any;
    weaponThree: any;
    playerEffects: any[];
    playerDamageType: string;
    playerDefense: any;
    playerAttributes: any;
    playerDefenseDefault: any;
    realizedPlayerDamage: number;
    playerDamaged: boolean;
    enemyPersuaded: boolean;
    enemyPrayerConsumed: boolean;
    persuasionScenario: boolean;
    luckoutScenario: boolean;

    playerStartDescription: string;
    playerSpecialDescription: string;
    playerActionDescription: string;
    playerInfluenceDescription: string;
    playerInfluenceDescriptionTwo: string;
    playerDeathDescription: string;

    criticalSuccess: boolean;
    counterSuccess: boolean;
    dualWielding: boolean;
    glancingBlow: boolean;
    religiousSuccess: boolean;
    rollSuccess: boolean;
    playerWin: boolean;
    playerLuckout: boolean;
    playerTrait: string;
    playerGrapplingWin: boolean;

    computer: any;
    computerAction: string;
    computerCounterGuess: string;
    computerBlessing: string;
    computerHealth: number;
    currentComputerHealth: number;
    newComputerHealth: number;
    computerWeapons: any[];
    computerWeaponOne: object;
    computerWeaponTwo: object;
    computerWeaponThree: object;
    computerEffects: any[];
    computerDamageType: string;
    computerDefense: object;
    computerAttributes: object;
    computerDefenseDefault: object;
    potentialComputerDamage: number;
    realizedComputerDamage: number;
    computerDamaged: boolean;

    attackWeight: number;
    counterWeight: number;
    dodgeWeight: number;
    postureWeight: number;
    rollWeight: number;
    counterAttackWeight: number;
    counterCounterWeight: number;
    counterDodgeWeight: number;
    counterPostureWeight: number;
    counterRollWeight: number;

    computerStartDescription: string;
    computerSpecialDescription: string;
    computerActionDescription: string;
    computerInfluenceDescription: string;
    computerInfluenceDescriptionTwo: string;
    computerDeathDescription: string;

    computerCriticalSuccess: boolean;
    computerCounterSuccess: boolean;
    computerDualWielding: boolean;
    computerGlancingBlow: boolean;
    computerReligiousSuccess: boolean;
    computerRollSuccess: boolean;
    computerWin: boolean;

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

    actionData: [];
    typeAttackData: [];
    typeDamageData: [];
    totalDamageData: number;
    prayerData: string[];
    deityData: [];

    weather: string;
    phaser: boolean;
    isStalwart: boolean; // +15% Defense, Cannot Dodge, Roll
    isCaerenic: boolean; // +15% Attack, -15% Defense
    enemyID: string;
    combatTimer: number;
    soundEffects: boolean;

    isEnemy: boolean;
    npcType: string;
    isAggressive: boolean;
    startedAggressive: boolean;
};

export interface Action {
    type: string;
    payload: any;
};

export const ACTIONS = {
    SET_GUEST: 'SET_GUEST',
    SET_PLAYER: 'SET_PLAYER',
    SET_EXPERIENCE: 'SET_EXPERIENCE',
    SET_CURRENCY: 'SET_CURRENCY',
    SET_COMPUTER: 'SET_COMPUTER',
    SET_NEW_COMPUTER_GUEST: 'SET_NEW_COMPUTER_GUEST',
    SET_PHASER_AGGRESSION: 'SET_PHASER_AGGRESSION',
    SET_DUEL: 'SET_DUEL',
    RESET_LUCKOUT: 'RESET_LUCKOUT',
    RESET_GRAPPLING_WIN: 'RESET_GRAPPLING_WIN',
    ENEMY_PERSUADED: 'ENEMY_PERSUADED',
    RESET_PLAYER: 'RESET_PLAYER',
    RESET_COMPUTER: 'RESET_COMPUTER',
    RESET_DUEL: 'RESET_DUEL',
    CLEAR_NON_AGGRESSIVE_ENEMY: 'CLEAR_NON_AGGRESSIVE_ENEMY',
    CLEAR_NPC: 'CLEAR_NPC',
    SET_NEW_COMPUTER: 'SET_NEW_COMPUTER',
    SET_PHASER_COMPUTER_ENEMY: 'SET_PHASER_COMPUTER_ENEMY',
    SET_PHASER_COMPUTER_NPC: 'SET_PHASER_COMPUTER_NPC',
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
    CONSUME_PRAYER: 'CONSUME_PRAYER',
    AUTO_COMBAT: 'AUTO_COMBAT',
    SET_PLAYER_QUICK: 'SET_PLAYER_QUICK',
    SET_PLAYER_SLICK: 'SET_PLAYER_SLICK',
    SET_PLAYER_LEVEL_UP: 'SET_PLAYER_LEVEL_UP',
    SAVE_EXPERIENCE: 'SAVE_EXPERIENCE',
    CLEAR_COUNTER: 'CLEAR_COUNTER',
    AUTO_ENGAGE: 'AUTO_ENGAGE',
    PLAYER_LUCKOUT: 'PLAYER_LUCKOUT',
    LUCKOUT_FAILURE: 'LUCKOUT_FAILURE',
    PLAYER_WIN: 'PLAYER_WIN',
    COMPUTER_WIN: 'COMPUTER_WIN',
    CLEAR_DUEL: 'CLEAR_DUEL',
    SET_WEATHER: 'SET_WEATHER',
    PLAYER_REST: 'PLAYER_REST',
    TOGGLED_DAMAGED: 'TOGGLED_DAMAGED',
    SET_GRAPPLING_WIN: 'SET_GRAPPLING_WIN',
    SET_PHASER: 'SET_PHASER',
    SET_STALWART: 'SET_STALWART',
    SET_COMBAT_TIMER: 'SET_COMBAT_TIMER',
    EFFECT_RESPONSE: 'EFFECT_RESPONSE',
    REMOVE_EFFECT: 'REMOVE_EFFECT',
    SET_UPDATE_STATE: 'SET_UPDATE_STATE',
    REGISTER_ENEMY_ACTIONS: 'REGISTER_ENEMY_ACTIONS',
};

export const initialCombatData: CombatData = {
    player: {},
    action: '',
    playerAction: '',
    counterGuess: '',
    playerBlessing: 'Buff',
    prayerSacrifice: '',
    prayerSacrificeName: '',
    playerHealth: 0,
    currentPlayerHealth: 0,
    newPlayerHealth: 0,
    weapons: [],
    weaponOne: {},
    weaponTwo: {},
    weaponThree: {},
    playerEffects: [],
    playerDamageType: '',
    playerDefense: {},
    playerAttributes: {},
    playerDefenseDefault: {},
    realizedPlayerDamage: 0,
    playerDamaged: false,
    enemyPersuaded: false,
    enemyPrayerConsumed: false,
    persuasionScenario: false,
    luckoutScenario: false,
    playerStartDescription: '',
    playerSpecialDescription: '',
    playerActionDescription: '',
    playerInfluenceDescription: '',
    playerInfluenceDescriptionTwo: '',
    playerDeathDescription: '',
    criticalSuccess: false,
    counterSuccess: false,
    dualWielding: false,
    glancingBlow: false,
    religiousSuccess: false,
    rollSuccess: false,
    playerWin: false,
    playerLuckout: false,
    playerGrapplingWin: false,
    playerTrait: '',
    computer: null,
    computerAction: '',
    computerCounterGuess: '',
    computerBlessing: 'Buff',
    computerHealth: 0,
    currentComputerHealth: 0,
    newComputerHealth: 0,
    computerWeapons: [],
    computerWeaponOne: {},
    computerWeaponTwo: {},
    computerWeaponThree: {},
    computerEffects: [],
    computerDamageType: '',
    computerDefense: {},
    computerAttributes: {},
    computerDefenseDefault: {},
    potentialComputerDamage: 0,
    realizedComputerDamage: 0,
    computerDamaged: false,
    attackWeight: 0,
    counterWeight: 0,
    dodgeWeight: 0,
    postureWeight: 0,
    rollWeight: 0,
    counterAttackWeight: 0,
    counterCounterWeight: 0,
    counterDodgeWeight: 0,
    counterPostureWeight: 0,
    counterRollWeight: 0,
    computerStartDescription: '',
    computerSpecialDescription: '',
    computerActionDescription: '',
    computerInfluenceDescription: '',
    computerInfluenceDescriptionTwo: '',
    computerDeathDescription: '',
    computerCriticalSuccess: false,
    computerCounterSuccess: false,
    computerDualWielding: false,
    computerGlancingBlow: false,
    computerReligiousSuccess: false,
    computerRollSuccess: false,
    computerWin: false,
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
    actionData: [],
    typeAttackData: [],
    typeDamageData: [],
    totalDamageData: 0,
    prayerData: [],
    deityData: [],
    weather: '',
    phaser: false,
    isStalwart: false,
    isCaerenic: false,
    enemyID: '',
    combatTimer: 0,
    isEnemy: false,
    npcType: '',
    isAggressive: false,
    startedAggressive: false,
    soundEffects: false,
};

export const CombatStore = (state: CombatData, action: Action) => {
    switch (action.type) {
        case 'SET_UPDATE_STATE':
            const { key, value } = action.payload;
            return {
                ...state,
                [key]: value,
            };
        case 'REMOVE_EFFECT':
            return {
                ...state,
                playerEffects: state.playerEffects.filter((effect) => effect.id !== action.payload),
                computerEffects: state.computerEffects.filter((effect) => effect.id !== action.payload),
            };
        case 'SET_COMBAT_TIMER':
            return {
                ...state,
                combatTimer: action.payload,
            };
        case 'SET_STALWART':
            return {
                ...state,
                isStalwart: action.payload,
            };
        case 'SET_PHASER':
            return {
                ...state,
                phaser: action.payload,
            };
        case 'SET_GUEST':
            return {
                ...state,
                player: action.payload.ascean,
                playerHealth: action.payload.ascean.health.total,
                currentPlayerHealth: action.payload.ascean.health.total,
                newPlayerHealth: action.payload.ascean.health.total,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weaponOne: action.payload.combat_weapon_one,
                weaponTwo: action.payload.combat_weapon_two,
                weaponThree: action.payload.combat_weapon_three,
                playerDefense: action.payload.defense,
                playerAttributes: action.payload.attributes,
                playerDamageType: action.payload.combat_weapon_one.damage_type[0],
                highScore: action.payload.ascean.high_score,
            };
        case 'SET_PLAYER':
            return {
                ...state,
                player: action.payload.ascean,
                playerHealth: action.payload.ascean.health.total,
                currentPlayerHealth: action.payload.ascean.health.current === -10 ? action.payload.ascean.health.total : action.payload.ascean.health.current,
                newPlayerHealth: action.payload.ascean.health.current === -10 ? action.payload.ascean.health.total : action.payload.ascean.health.current,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weaponOne: action.payload.combat_weapon_one,
                weaponTwo: action.payload.combat_weapon_two,
                weaponThree: action.payload.combat_weapon_three,
                playerDefense: action.payload.defense,
                playerAttributes: action.payload.attributes,
                playerDamageType: action.payload.combat_weapon_one.damage_type[0],
                highScore: action.payload.ascean.high_score,
            };
        case 'SET_EXPERIENCE':
            return {
                ...state,
                player: {
                    ...state.player,
                    experience: action.payload.experience,
                    firewater: action.payload.firewater,
                    currency: action.payload.currency,
                },
            };
        case 'SET_CURRENCY':
            return {
                ...state,
                player: {
                    ...state.player,
                    currency: action.payload,
                },
            };
        case 'SET_COMPUTER':
            return {
                ...state,
                computer: action.payload.ascean,
                computerHealth: action.payload.attributes.healthTotal,
                currentComputerHealth: action.payload.attributes.healthTotal,
                newComputerHealth: action.payload.attributes.healthTotal,
                computerWeapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                computerWeaponOne: action.payload.combat_weapon_one,
                computerWeaponTwo: action.payload.combat_weapon_two,
                computerWeaponThree: action.payload.combat_weapon_three,
                computerDefense: action.payload.defense,
                computerAttributes: action.payload.attributes,
                computerDamageType: action.payload.combat_weapon_one.damage_type[0],
                currentPlayerHealth: action.payload.ascean.health.current === 0 ? action.payload.ascean.health.total * 0.05 : action.payload.ascean.health.current,
                newPlayerHealth: action.payload.ascean.health.current === 0 ? action.payload.ascean.health.total * 0.05 : action.payload.ascean.health.current,
            };
        case 'SET_DUEL':
            return {
                ...state,
                gameIsLive: false,
                combatEngaged: true,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
            };
        case 'SET_PHASER_AGGRESSION':
            return {
                ...state,
                combatEngaged: action.payload,
                isAggressive: action.payload,
            };
        case 'RESET_PLAYER':
            return {
                ...state,
                currentPlayerHealth: state.playerHealth,
                newPlayerHealth: state.playerHealth,
                currentComputerHealth: state.computerHealth,
                newComputerHealth: state.computerHealth,
                combatEngaged: true,
                gameIsLive: false,
                playerWin: false,
                computerWin: false,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
                winStreak: 0,
            };
        case 'RESET_COMPUTER':
            return {
                ...state,
                currentPlayerHealth: state.currentPlayerHealth > state.playerHealth ? state.playerHealth : state.currentPlayerHealth,
                newPlayerHealth: state.currentPlayerHealth > state.playerHealth ? state.playerHealth : state.currentPlayerHealth,
                currentComputerHealth: state.computerHealth,
                newComputerHealth: state.computerHealth,
                combatEngaged: true,
                gameIsLive: false,
                playerWin: false,
                computerWin: false,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
                winStreak: state.player.level > state.computer.level ? 0: state.winStreak,
            };
        case 'SET_NEW_COMPUTER':
            const newHealth = state.newPlayerHealth > state.playerHealth ? state.playerHealth : state.newPlayerHealth === 0 ? state.playerHealth * 0.05 : state.newPlayerHealth;
            return {
                ...state,
                currentPlayerHealth: newHealth,
                newPlayerHealth: newHealth,
                computer: action.payload.ascean,
                computerHealth: action.payload.attributes.healthTotal,
                currentComputerHealth: action.payload.attributes.healthTotal,
                newComputerHealth: action.payload.attributes.healthTotal,
                computerWeapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                computerWeaponOne: action.payload.combat_weapon_one,
                computerWeaponTwo: action.payload.combat_weapon_two,
                computerWeaponThree: action.payload.combat_weapon_three,
                computerDefense: action.payload.defense,
                computerAttributes: action.payload.attributes,
                playerWin: false,
                computerWin: false,
                combatRound: 1,
            };
        case 'SET_PHASER_COMPUTER_ENEMY':
            return {
                ...state, 
                computer: action.payload.enemy.ascean,
                computerHealth: action.payload.enemy.attributes.healthTotal,
                currentComputerHealth: action.payload.health,
                newComputerHealth: action.payload.health,
                computerWeapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                newPlayerHealth: state.newPlayerHealth > state.playerHealth ? state.playerHealth : state.newPlayerHealth === 0 ? state.playerHealth * 0.05 : state.newPlayerHealth,
                computerWeaponOne: action.payload.enemy.combat_weapon_one,
                computerWeaponTwo: action.payload.enemy.combat_weapon_two,
                computerWeaponThree: action.payload.enemy.combat_weapon_three,
                computerDefense: action.payload.enemy.defense,
                computerAttributes: action.payload.enemy.attributes,
                playerWin: action.payload.isDefeated, // In Order To Denote Whether That Enemy Has Been Defeated So The Proper Settings Are Loaded In Dialog Etc...
                computerWin: action.payload.isTriumphant, // In Order to Discern whether the Player has been Defeated so the proper settings are loaded in dialog etc...
                enemyID: action.payload.enemyID,
                npcType: '',
                isEnemy: true,
                isAggressive: action.payload.isAggressive,
                startedAggressive: action.payload.isAggressive, 
                // combatRound: 1,
            };
        case 'SET_PHASER_COMPUTER_NPC':
            return {
                ...state,
                computer: action.payload.enemy.ascean,
                computerHealth: action.payload.enemy.attributes.healthTotal,
                currentComputerHealth: action.payload.health,
                newComputerHealth: action.payload.health,
                computerWeapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                newPlayerHealth: state.newPlayerHealth > state.playerHealth ? state.playerHealth : state.newPlayerHealth === 0 ? state.playerHealth * 0.05 : state.newPlayerHealth,
                computerWeaponOne: action.payload.enemy.combat_weapon_one,
                computerWeaponTwo: action.payload.enemy.combat_weapon_two,
                computerWeaponThree: action.payload.enemy.combat_weapon_three,
                computerDefense: action.payload.enemy.defense,
                computerAttributes: action.payload.enemy.attributes,
                playerWin: false,
                computerWin: false,
                enemyID: action.payload.enemyID,
                npcType: action.payload.npcType,
                isEnemy: false,
                isAggressive: false,
                startedAggressive: false,
            };
        case 'CLEAR_NON_AGGRESSIVE_ENEMY':
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
                isEnemy: false,
            };
        case 'CLEAR_NPC':
            return {
                ...state,
                computer: null,
                npcType: '',
            };
        case 'SET_NEW_COMPUTER_GUEST':
            return {
                ...state,
                computer: action.payload.ascean,
                computerHealth: action.payload.attributes.healthTotal,
                currentComputerHealth: action.payload.attributes.healthTotal,
                newComputerHealth: action.payload.attributes.healthTotal,
                computerWeapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                newPlayerHealth: state.newPlayerHealth > state.playerHealth ? state.playerHealth : state.newPlayerHealth === 0 ? state.playerHealth * 0.05 : state.newPlayerHealth,
                computerWeaponOne: action.payload.combat_weapon_one,
                computerWeaponTwo: action.payload.combat_weapon_two,
                computerWeaponThree: action.payload.combat_weapon_three,
                computerDefense: action.payload.defense,
                computerAttributes: action.payload.attributes,
                playerWin: false,
                computerWin: false,
                combatRound: 1,
            };
        case 'AUTO_ENGAGE':
            return {
                ...state,
                gameIsLive: action.payload,
            };
        case 'CLEAR_COUNTER':
            return {
                ...state,
                counterGuess: ''
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
                counterGuess: '',
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
                counterGuess: action.payload,
            };
        case 'SET_DAMAGE_TYPE':
            return {
                ...state,
                playerDamageType: action.payload,
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
                prayerSacrifice: action.payload.prayer,
                prayerSacrificeName: action.payload.name,
            };
        case 'SET_WEAPON_ORDER':
            return {
                ...state,
                weapons: action.payload,
                playerDamageType: action.payload[0].damage_type[0],
            };
        case 'INITIATE_COMBAT':
            return {
                ...action.payload,
                action: '',
                actionStatus: true,
                dodgeStatus: action.payload.action === 'dodge' ? true : action.payload.dodgeStatus === true ? true : false,
                combatInitiated: true,
            };
        case 'INSTANT_COMBAT':
            return {
                ...action.payload,
                action: '',
                combatInitiated: true,
                instantStatus: true,
            };
        case 'EFFECT_RESPONSE':
            return {
                ...action.payload,
            };
        case 'CONSUME_PRAYER':
            return {
                ...action.payload,
            };
        case 'AUTO_COMBAT':
            return {
                ...action.payload,
                action: '',
                dodgeStatus: action.payload.action === 'dodge' ? true : action.payload.dodgeStatus === true ? true : false,
                combatInitiated: true,
            };
        case 'TOGGLED_DAMAGED': 
            return {
                ...state,
                playerDamaged: action.payload,
                computerDamaged: action.payload,
            };
        case 'PLAYER_WIN':
            let resetWeapons = [state.weaponOne, state.weaponTwo, state.weaponThree];
            let weapy: any[] = state.weapons.map(weapon => resetWeapons.find(w => w._id === weapon._id));;
            return {
                ...state,
                winStreak: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                gameIsLive: false,
                combatEngaged: false,
                dodgeStatus: false,
                instantStatus: false,
                weapons: weapy,
            };
        case 'PLAYER_LUCKOUT':
            return {
                ...state,
                winStreak: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                newComputerHealth: 0,
                currentComputerHealth: 0,
                playerLuckout: action.payload.playerLuckout,
                playerTrait: action.payload.playerTrait,
                playerWin: true,
                luckoutScenario: true,
            };
        case 'LUCKOUT_FAILURE':
            return {
                ...state,
                winStreak: 0,
                playerLuckout: action.payload.playerLuckout,
                playerTrait: action.payload.playerTrait,
                luckoutScenario: true,
            };
        case 'SET_GRAPPLING_WIN':
            console.log('grappling win')
            return {
                ...state,
                winStrea: state.winStreak + 1,
                highScore: state.winStreak + 1 > state.highScore ? state.winStreak + 1 : state.highScore,
                loseStreak: 0,
                newComputerHealth: 0,
                currentComputerHealth: 0,
                playerWin: action.payload,
                playerGrapplingWin: action.payload,
            };
        case 'ENEMY_PERSUADED':
            return {
                ...state,
                enemyPersuaded: action.payload.enemyPersuaded,
                playerTrait: action.payload.playerTrait,
                persuasionScenario: true,
            };
        case 'RESET_LUCKOUT':
            return {
                ...state,
                playerLuckout: action.payload,
            };
        case 'RESET_GRAPPLING_WIN':
            return {
                ...state,
                playerGrapplingWin: action.payload,
            };
        case 'COMPUTER_WIN':
            const weaponReset = [state.weaponOne, state.weaponTwo, state.weaponThree];
            const resetty = state.weapons.map(weapon => weaponReset.find(w => w._id === weapon._id));
            return {
                ...state,
                loseStreak: state.loseStreak + 1,
                winStreak: 0,
                gameIsLive: false,
                combatEngaged: false,
                dodgeStatus: false,
                instantStatus: false,
                weapons: resetty,
            };
        case 'CLEAR_DUEL':
            return {
                ...state,
                computer: null,
                playerWin: false,
                computerWin: false,
                enemyPersuaded: false,
                combatEngaged: false,
                gameIsLive: false,
                dodgeStatus: false,
                instantStatus: false,
                playerTrait: '',
                action: '',
                playerAction: '',
                computerAction: '',
                counterGuess: '',
                computerCounterGuess: '',
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
                realizedPlayerDamage: 0,
                realizedComputerDamage: 0,
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
        case 'REGISTER_ENEMY_ACTIONS':
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
                currentPlayerHealth: action.payload.currentPlayerHealth,
                computerRollSuccess: action.payload.computerRollSuccess,
                computerCounterSuccess: action.payload.computerCounterSuccess,
                computerGlancingBlow: action.payload.computerGlancingBlow,
                playerEffects: action.payload.playerEffects,    
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
                playerHealth: action.payload.attributes.healthTotal,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weaponOne: action.payload.combat_weapon_one,
                weaponTwo: action.payload.combat_weapon_two,
                weaponThree: action.payload.combat_weapon_three,
                playerDefense: action.payload.defense,
                playerAttributes: action.payload.attributes,
                playerDamageType: action.payload.combat_weapon_one.damage_type[0],
            };
        case 'SET_PLAYER_LEVEL_UP':
            return {
                ...state,
                player: action.payload.ascean,
                playerHealth: action.payload.attributes.healthTotal,
                currentPlayerHealth: action.payload.attributes.healthTotal,
                newPlayerHealth: action.payload.attributes.healthTotal,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weaponOne: action.payload.combat_weapon_one,
                weaponTwo: action.payload.combat_weapon_two,
                weaponThree: action.payload.combat_weapon_three,
                playerDefense: action.payload.defense,
                playerAttributes: action.payload.attributes,
                playerDamageType: action.payload.combat_weapon_one.damage_type[0],
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
            let currentHealth = state.newPlayerHealth < 0 ? 0 : state.newPlayerHealth;
            const playerHealthHealed = Math.floor(currentHealth + (state.playerHealth * (percentage / 100)));
            const playerHealth = playerHealthHealed > state.playerHealth ? state.playerHealth : playerHealthHealed;
            console.log('Player Health: ', currentHealth, 'Player Health Healed: ', playerHealthHealed, 'Player Health: ', playerHealth);
            return {
                ...state,
                currentPlayerHealth: playerHealth,
                newPlayerHealth: playerHealth,
            };
        default: 
            return state;
    };
};

export function shakeScreen(settings: {duration: number, intensity: number}) {
    const body = document.querySelector('body')!;
    const initialPosition = body.style.transform;
    let startTime: number | null = null;
  
    function shake(currentTime: number) {
        if (!startTime) startTime = currentTime;
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / settings.duration, 1);
        const randomX = Math.floor(Math.random() * settings.intensity) + 1;
        const randomY = Math.floor(Math.random() * settings.intensity) + 1;
        const offsetX = randomX * Math.sin(progress * 4 * Math.PI);
        const offsetY = randomY * Math.sin(progress * 4 * Math.PI);
        body.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        if (progress < 1) {
            requestAnimationFrame(shake);
        } else {
            body.style.transform = initialPosition;
            body.removeEventListener('transitionend', resetPosition);
        };
    };

    function resetPosition() {
        body.style.transform = initialPosition;
    };
    
    body.addEventListener('transitionend', resetPosition);

    requestAnimationFrame(shake);
};