export interface CombatData {
    player: any;
    action: string;
    player_action: string;
    counter_guess: string;
    playerBlessing: string;
    prayerSacrifice: string;
    prayerSacrificeName: string,
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
    player_attributes: any;
    player_defense_default: object;
    realized_player_damage: number;
    playerDamaged: boolean;
    enemyPersuaded: boolean;
    enemyPrayerConsumed: boolean;
    persuasionScenario: boolean;
    luckoutScenario: boolean;

    player_start_description: string;
    player_special_description: string;
    player_action_description: string;
    player_influence_description: string;
    player_influence_description_two: string;
    player_death_description: string;

    critical_success: boolean;
    counter_success: boolean;
    dual_wielding: boolean;
    glancing_blow: boolean;
    religious_success: boolean;
    roll_success: boolean;
    player_win: boolean;
    player_luckout: boolean;
    playerTrait: string;
    playerGrapplingWin: boolean;

    computer: any;
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
    computer_defense_default: object;
    potential_computer_damage: number;
    realized_computer_damage: number;
    computerDamaged: boolean;

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
    computer_influence_description: string;
    computer_influence_description_two: string;
    computer_death_description: string;

    computer_critical_success: boolean;
    computer_counter_success: boolean;
    computer_dual_wielding: boolean;
    computer_glancing_blow: boolean;
    computer_religious_success: boolean;
    computer_roll_success: boolean;
    computer_win: boolean;

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
    isStalwart: boolean; // +10% Defense, -5% Movement
    enemyID: string;
    combatTimer: number;

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
    player_action: '',
    counter_guess: '',
    playerBlessing: 'Buff',
    prayerSacrifice: '',
    prayerSacrificeName: '',
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
    playerDamaged: false,
    enemyPersuaded: false,
    enemyPrayerConsumed: false,
    persuasionScenario: false,
    luckoutScenario: false,
    player_start_description: '',
    player_special_description: '',
    player_action_description: '',
    player_influence_description: '',
    player_influence_description_two: '',
    player_death_description: '',
    critical_success: false,
    counter_success: false,
    dual_wielding: false,
    glancing_blow: false,
    religious_success: false,
    roll_success: false,
    player_win: false,
    player_luckout: false,
    playerGrapplingWin: false,
    playerTrait: '',
    computer: null,
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
    computer_defense_default: {},
    potential_computer_damage: 0,
    realized_computer_damage: 0,
    computerDamaged: false,
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
    computer_influence_description: '',
    computer_influence_description_two: '',
    computer_death_description: '',
    computer_critical_success: false,
    computer_counter_success: false,
    computer_dual_wielding: false,
    computer_glancing_blow: false,
    computer_religious_success: false,
    computer_roll_success: false,
    computer_win: false,
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
    enemyID: '',
    combatTimer: 0,
    isEnemy: false,
    npcType: '',
    isAggressive: false,
    startedAggressive: false,
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
                player_health: action.payload.ascean.health.total,
                current_player_health: action.payload.ascean.health.total,
                new_player_health: action.payload.ascean.health.total,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weapon_one: action.payload.combat_weapon_one,
                weapon_two: action.payload.combat_weapon_two,
                weapon_three: action.payload.combat_weapon_three,
                player_defense: action.payload.defense,
                player_attributes: action.payload.attributes,
                player_damage_type: action.payload.combat_weapon_one.damage_type[0],
                highScore: action.payload.ascean.high_score,
            };
        case 'SET_PLAYER':
            return {
                ...state,
                player: action.payload.ascean,
                player_health: action.payload.ascean.health.total,
                current_player_health: action.payload.ascean.health.current === -10 ? action.payload.ascean.health.total : action.payload.ascean.health.current,
                new_player_health: action.payload.ascean.health.current === -10 ? action.payload.ascean.health.total : action.payload.ascean.health.current,
                weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                weapon_one: action.payload.combat_weapon_one,
                weapon_two: action.payload.combat_weapon_two,
                weapon_three: action.payload.combat_weapon_three,
                player_defense: action.payload.defense,
                player_attributes: action.payload.attributes,
                player_damage_type: action.payload.combat_weapon_one.damage_type[0],
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
                computer_health: action.payload.attributes.healthTotal,
                current_computer_health: action.payload.attributes.healthTotal,
                new_computer_health: action.payload.attributes.healthTotal,
                computer_weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                computer_weapon_one: action.payload.combat_weapon_one,
                computer_weapon_two: action.payload.combat_weapon_two,
                computer_weapon_three: action.payload.combat_weapon_three,
                computer_defense: action.payload.defense,
                computer_attributes: action.payload.attributes,
                computer_damage_type: action.payload.combat_weapon_one.damage_type[0],
                current_player_health: action.payload.ascean.health.current === 0 ? action.payload.ascean.health.total * 0.05 : action.payload.ascean.health.current,
                new_player_health: action.payload.ascean.health.current === 0 ? action.payload.ascean.health.total * 0.05 : action.payload.ascean.health.current,
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
                current_player_health: state.player_health,
                new_player_health: state.player_health,
                current_computer_health: state.computer_health,
                new_computer_health: state.computer_health,
                combatEngaged: true,
                gameIsLive: false,
                player_win: false,
                computer_win: false,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
                winStreak: 0,
            };
        case 'RESET_COMPUTER':
            return {
                ...state,
                current_player_health: state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                new_player_health: state.current_player_health > state.player_health ? state.player_health : state.current_player_health,
                current_computer_health: state.computer_health,
                new_computer_health: state.computer_health,
                combatEngaged: true,
                gameIsLive: false,
                player_win: false,
                computer_win: false,
                combatRound: 1,
                sessionRound: state.sessionRound === 0 ? 1 : state.sessionRound + 1,
                winStreak: state.player.level > state.computer.level ? 0: state.winStreak,
            };
        case 'SET_NEW_COMPUTER':
            const newHealth = state.new_player_health > state.player_health ? state.player_health : state.new_player_health === 0 ? state.player_health * 0.05 : state.new_player_health;
            return {
                ...state,
                current_player_health: newHealth,
                new_player_health: newHealth,
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
                player_win: false,
                computer_win: false,
                combatRound: 1,
            };
        case 'SET_PHASER_COMPUTER_ENEMY':
            return {
                ...state, 
                computer: action.payload.enemy.ascean,
                computer_health: action.payload.enemy.attributes.healthTotal,
                current_computer_health: action.payload.health,
                new_computer_health: action.payload.health,
                computer_weapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                new_player_health: state.new_player_health > state.player_health ? state.player_health : state.new_player_health === 0 ? state.player_health * 0.05 : state.new_player_health,
                computer_weapon_one: action.payload.enemy.combat_weapon_one,
                computer_weapon_two: action.payload.enemy.combat_weapon_two,
                computer_weapon_three: action.payload.enemy.combat_weapon_three,
                computer_defense: action.payload.enemy.defense,
                computer_attributes: action.payload.enemy.attributes,
                player_win: action.payload.isDefeated, // In Order To Denote Whether That Enemy Has Been Defeated So The Proper Settings Are Loaded In Dialog Etc...
                computer_win: action.payload.isTriumphant, // In Order to Discern whether the Player has been Defeated so the proper settings are loaded in dialog etc...
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
                computer_health: action.payload.enemy.attributes.healthTotal,
                current_computer_health: action.payload.health,
                new_computer_health: action.payload.health,
                computer_weapons: [action.payload.enemy.combat_weapon_one, action.payload.enemy.combat_weapon_two, action.payload.enemy.combat_weapon_three],
                new_player_health: state.new_player_health > state.player_health ? state.player_health : state.new_player_health === 0 ? state.player_health * 0.05 : state.new_player_health,
                computer_weapon_one: action.payload.enemy.combat_weapon_one,
                computer_weapon_two: action.payload.enemy.combat_weapon_two,
                computer_weapon_three: action.payload.enemy.combat_weapon_three,
                computer_defense: action.payload.enemy.defense,
                computer_attributes: action.payload.enemy.attributes,
                player_win: false,
                computer_win: false,
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
                player_win: false,
                player_luckout: false,
                playerGrapplingWin: false,
                computer_win: false,
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
                computer_health: action.payload.attributes.healthTotal,
                current_computer_health: action.payload.attributes.healthTotal,
                new_computer_health: action.payload.attributes.healthTotal,
                computer_weapons: [action.payload.combat_weapon_one, action.payload.combat_weapon_two, action.payload.combat_weapon_three],
                new_player_health: state.new_player_health > state.player_health ? state.player_health : state.new_player_health === 0 ? state.player_health * 0.05 : state.new_player_health,
                computer_weapon_one: action.payload.combat_weapon_one,
                computer_weapon_two: action.payload.combat_weapon_two,
                computer_weapon_three: action.payload.combat_weapon_three,
                computer_defense: action.payload.defense,
                computer_attributes: action.payload.attributes,
                player_win: false,
                computer_win: false,
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
                prayerSacrifice: action.payload.prayer,
                prayerSacrificeName: action.payload.name,
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
            let resetWeapons = [state.weapon_one, state.weapon_two, state.weapon_three];
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
                new_computer_health: 0,
                current_computer_health: 0,
                player_luckout: action.payload.playerLuckout,
                playerTrait: action.payload.playerTrait,
                player_win: true,
                luckoutScenario: true,
            };
        case 'LUCKOUT_FAILURE':
            return {
                ...state,
                winStreak: 0,
                player_luckout: action.payload.playerLuckout,
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
                new_computer_health: 0,
                current_computer_health: 0,
                player_win: action.payload,
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
                player_luckout: action.payload,
            };
        case 'RESET_GRAPPLING_WIN':
            return {
                ...state,
                playerGrapplingWin: action.payload,
            };
        case 'COMPUTER_WIN':
            const weaponReset = [state.weapon_one, state.weapon_two, state.weapon_three];
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
                player_win: false,
                computer_win: false,
                enemyPersuaded: false,
                combatEngaged: false,
                gameIsLive: false,
                dodgeStatus: false,
                instantStatus: false,
                playerTrait: '',
                action: '',
                player_action: '',
                computer_action: '',
                counter_guess: '',
                computer_counter_guess: '',
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
                realized_player_damage: 0,
                realized_computer_damage: 0,
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
            console.log('Player Health: ', currentHealth, 'Player Health Healed: ', playerHealthHealed, 'Player Health: ', playerHealth);
            return {
                ...state,
                current_player_health: playerHealth,
                new_player_health: playerHealth,
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