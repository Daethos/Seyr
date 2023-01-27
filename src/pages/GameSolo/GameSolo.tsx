import { useEffect, useState, useCallback, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import './GameSolo.css'
import * as asceanAPI from '../../utils/asceanApi';  
import * as eqpAPI from '../../utils/equipmentApi';
import userService from "../../utils/userService";
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import * as gameAPI from '../../utils/gameApi'
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import GameAscean from '../../components/GameCompiler/GameAscean';
import GameActions from '../../components/GameCompiler/GameActions';
import GameAnimations from '../../components/GameCompiler/GameAnimations';
import GameConditions from '../../components/GameCompiler/GameConditions';
import useSound from 'use-sound'
import LevelUpModal from '../../game/LevelUpModal';
import { getNpcDialog } from '../../components/GameCompiler/Dialog';
import DialogBox from '../../game/DialogBox';
import Button from 'react-bootstrap/Button';
import InventoryBag from '../../components/GameCompiler/InventoryBag';
import { ACTIONS, CombatStore, initialCombatData } from '../../components/GameCompiler/CombatStore';

interface GameProps {
    user: any;
}

const GameSolo = ({ user }: GameProps) => {
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [ascean, setAscean] = useState<any>({});
    const [opponent, setOpponent] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false);
    const [emergencyText, setEmergencyText] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [saveExp, setSaveExp] = useState<boolean>(false);
    const [dialog, setDialog] = useState<any>({});
    const [lootRoll, setLootRoll] = useState<boolean>(false);
    const [lootDrop, setLootDrop] = useState<any>([]);
    const [lootDropTwo, setLootDropTwo] = useState<any>([]);
    const [itemSaved, setItemSaved] = useState<boolean>(false);
    const [showInventory, setShowInventory] = useState<boolean>(false);
    const [eqpSwap, setEqpSwap] = useState<boolean>(false);
    const [removeItem, setRemoveItem] = useState<boolean>(false);
    
    // const [combatInitiated, setCombatInitiated] = useState<boolean>(false); // Reduced
    // const [actionStatus, setActionStatus] = useState<boolean>(false); // Reduced
    // const [highScore, setHighScore] = useState<number>(0);
    // const [winStreak, setWinStreak] = useState<number>(0);
    // const [loseStreak, setLoseStreak] = useState<number>(0);
    // const [combatEngaged, setCombatEngaged] = useState<boolean>(false); // Reduced
    // const [playerWin, setPlayerWin] = useState<boolean>(false); // Redirect to state.player_win
    // const [computerWin, setComputerWin] = useState<boolean>(false); // Redirect to state.computer_win
    // const [gameIsLive, setGameIsLive] = useState<boolean>(false); // Reduced
    
    const [background, setBackground] = useState<any>(null);

    const opponentSfx = process.env.PUBLIC_URL + `/sounds/opponent.mp3`;
    const [playOpponent] = useSound(opponentSfx, { volume: 0.3 });

    const weaponOrderSfx = process.env.PUBLIC_URL + `/sounds/weapon-order.mp3`;
    const [playWO] = useSound(weaponOrderSfx, { volume: 0.3 });
    const counterSfx = process.env.PUBLIC_URL + `/sounds/counter-success.mp3`;
    const [playCounter] = useSound(counterSfx, { volume: 0.3 });
    const rollSfx = process.env.PUBLIC_URL + `/sounds/roll-success.mp3`;
    const [playRoll] = useSound(rollSfx, { volume: 0.3 });

    const pierceSfx = process.env.PUBLIC_URL + `/sounds/sword-stab.mp3`;
    const [playPierce] = useSound(pierceSfx, { volume: 0.3 });

    const slashSfx = process.env.PUBLIC_URL + `/sounds/slash-attack.mp3`;
    const [playSlash] = useSound(slashSfx, { volume: 0.3 });

    const bluntSfx = process.env.PUBLIC_URL + `/sounds/blunt-attack.mp3`;
    const [playBlunt] = useSound(bluntSfx, { volume: 0.3 });

    const deathSfx = process.env.PUBLIC_URL + `/sounds/death-sound.mp3`;
    const [playDeath] = useSound(deathSfx, { volume: 0.3 });

    const winSfx = process.env.PUBLIC_URL + `/sounds/win-sound.mp3`;
    const [playWin] = useSound(winSfx, { volume: 0.3 });

    const replaySfx = process.env.PUBLIC_URL + `/sounds/replay-sound.mp3`;
    const [playReplay] = useSound(replaySfx, { volume: 0.3 });

    const religiousSfx = process.env.PUBLIC_URL + `/sounds/religious.mp3`;
    const [playReligion] = useSound(religiousSfx, { volume: 0.3 });

    const daethicSfx = process.env.PUBLIC_URL + `/sounds/daethic-magic.mp3`;
    const [playDaethic] = useSound(daethicSfx, { volume: 0.3 });

    const wildSfx = process.env.PUBLIC_URL + `/sounds/wild-magic.mp3`;
    const [playWild] = useSound(wildSfx, { volume: 0.3 });

    const earthSfx = process.env.PUBLIC_URL + `/sounds/earth-magic.mp3`;
    const [playEarth] = useSound(earthSfx, { volume: 0.3 });

    const fireSfx = process.env.PUBLIC_URL + `/sounds/fire-magic.mp3`;
    const [playFire] = useSound(fireSfx, { volume: 0.3 });

    const bowSfx = process.env.PUBLIC_URL + `/sounds/bow-attack.mp3`;
    const [playBow] = useSound(bowSfx, { volume: 0.3 });

    const frostSfx = process.env.PUBLIC_URL + `/sounds/frost-magic.mp3`;
    const [playFrost] = useSound(frostSfx, { volume: 0.3 });

    const lightningSfx = process.env.PUBLIC_URL + `/sounds/lightning-magic.mp3`;
    const [playLightning] = useSound(lightningSfx, { volume: 0.3 });

    const sorcerySfx = process.env.PUBLIC_URL + `/sounds/sorcery-magic.mp3`;
    const [playSorcery] = useSound(sorcerySfx, { volume: 0.3 });

    const windSfx = process.env.PUBLIC_URL + `/sounds/wind-magic.mp3`;
    const [playWind] = useSound(windSfx, { volume: 0.3 });

    const { asceanID } = useParams();

    // const [weaponOne, setWeaponOne] = useState<any>({});
    // const [weaponTwo, setWeaponTwo] = useState<any>({});
    // const [weaponThree, setWeaponThree] = useState<any>({});
    // const [playerWeapons, setPlayerWeapons] = useState<any>([]);
    // const [dodgeStatus, setDodgeStatus] = useState<boolean>(false);

    // const [totalPlayerHealth, setTotalPlayerHealth] = useState<number>(0);
    // const [currentPlayerHealth, setCurrentPlayerHealth] = useState<number>(-5);

    // const [attributes, setAttributes] = useState<any>([]);
    // const [playerDefense, setPlayerDefense] = useState<any>([]);

    // const [computerWeapons, setComputerWeapons] = useState<any>({});
    // const [computerWeaponOne, setComputerWeaponOne] = useState<object>({});
    // const [computerWeaponTwo, setComputerWeaponTwo] = useState<object>({});
    // const [computerWeaponThree, setComputerWeaponThree] = useState<object>({});

    // const [computerAttributes, setComputerAttributes] = useState<any>([]);
    // const [computerDefense, setComputerDefense] = useState<any>([]);
    // const [currentComputerHealth, setCurrentComputerHealth] = useState<number>(-5);
    // const [totalComputerHealth, setTotalComputerHealth] = useState<number>(0);

    // const [combatData, setCombatData] = useState<any>({
    //     player: ascean,
    //     action: '',
    //     player_action: '',
    //     counter_guess: '',
    //     player_health: currentPlayerHealth,
    //     weapons: [],
    //     weapon_one: weaponOne,
    //     weapon_two: weaponTwo,
    //     weapon_three: weaponThree,
    //     player_damage_type: '',
    //     player_defense: playerDefense,
    //     player_attributes: attributes,
    //     new_player_health: currentPlayerHealth,
    //     new_computer_health: currentComputerHealth,
    //     player_start_description: '',
    //     player_special_description: '',
    //     player_action_description: '',
    //     player_influence_description: '',
    //     player_influence_description_two: '',
    //     player_death_description: '',
    //     counter_success: false,
    //     dual_wielding: false,
    //     glancing_blow: false,
    //     religious_success: false,
    //     roll_success: false,
    //     player_win: false,
    //     critical_success: false,
    //     playerBlessing: 'Buff',
    //     playerEffects: [],
        
    //     computer: '',
    //     computer_health: currentComputerHealth,
    //     computer_action: '',
    //     computer_counter_guess: '',
    //     computer_weapons: [],
    //     computer_weapon_one: computerWeaponOne,
    //     computer_weapon_two: computerWeaponTwo,
    //     computer_weapon_three: computerWeaponThree,
    //     computer_damage_type: '',
    //     computer_defense: computerDefense,
    //     computer_attributes: computerAttributes,
    //     computer_start_description: '',
    //     computer_special_description: '',
    //     computer_action_description: '',
    //     computer_influence_description: '',
    //     computer_influence_description_two: '',
    //     computer_death_description: '',
    //     current_player_health: currentPlayerHealth,
    //     current_computer_health: currentComputerHealth,
    //     attack_weight: 0,
    //     counter_weight: 0,
    //     dodge_weight: 0,
    //     posture_weight: 0,
    //     roll_weight: 0,
    //     counter_attack_weight: 0,
    //     counter_counter_weight: 0,
    //     counter_dodge_weight: 0,
    //     counter_posture_weight: 0,
    //     counter_roll_weight: 0,
    //     computer_counter_success: false,
    //     computer_critical_success: false,
    //     computer_dual_wielding: false,
    //     computer_glancing_blow: false,
    //     computer_religious_success: false,
    //     computer_roll_success: false,
    //     computer_win: false,
    //     computerBlessing: '',
    //     computerEffects: [],

    //     combatRound: 0,
    //     sessionRound: 0,
    // });

    const [asceanState, setAsceanState] = useState({
        ascean: ascean,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        level: ascean.level,
        opponent: opponent.level,
        opponentExp: 0,
        experience: ascean.experience,
        experienceNeeded: ascean.level * 1000,
        mastery: ascean.mastery,
        faith: ascean.faith,
    });

    const getAscean = useCallback(async () => {
        setLoadingAscean(true)
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);

            const response = await asceanAPI.getAsceanStats(asceanID)
            console.log(response.data.data, 'Response Compiling Stats')
            // setWeaponOne(response.data.data.combat_weapon_one)
            // setWeaponTwo(response.data.data.combat_weapon_two)
            // setWeaponThree(response.data.data.combat_weapon_three)
            // setPlayerDefense(response.data.data.defense)
            // setAttributes(response.data.data.attributes)
            // setTotalPlayerHealth(response.data.data.attributes.healthTotal)
            // setCurrentPlayerHealth(response.data.data.attributes.healthTotal)
            // setPlayerWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three]);
            dispatch({
                type: ACTIONS.SET_PLAYER,
                payload: response.data.data
            });
            setLoadingAscean(false)
            let minLevel: number = 0;
            let maxLevel: number = 0;
            if (firstResponse.data.level < 3) {
                minLevel = 1;
                maxLevel = 3;
            } else if (firstResponse.data.level < 5) {
                minLevel = 2;
                maxLevel = 5;
            } else if (firstResponse.data.level < 8) {
                minLevel = 4;
                maxLevel = 10;
            } else if (firstResponse.data.level < 11) {
                minLevel = 6;
                maxLevel = 13;
            } else if (firstResponse.data.level < 14) {
                minLevel = 9;
                maxLevel = 16;
            } else if (firstResponse.data.level < 17) {
                minLevel = 12;
                maxLevel = 18;
            } else if (firstResponse.data.level <= 20) {
                minLevel = 15;
                maxLevel = 20;
            }
            setLoading(true)
            const secondResponse = await userService.getProfile('mirio');

            const profilesInRange = secondResponse.data.ascean.filter((a: any) => a.level >= minLevel && a.level <= maxLevel);
            const randomOpponent = Math.floor(Math.random() * profilesInRange.length);
            setOpponent(profilesInRange[randomOpponent]);
            const opponentResponse = await asceanAPI.getAsceanStats(profilesInRange[randomOpponent]._id);

            // setComputerDefense(opponentResponse.data.data.defense);
            // setComputerAttributes(opponentResponse.data.data.attributes);
            // setTotalComputerHealth(opponentResponse.data.data.attributes.healthTotal);
            // setCurrentComputerHealth(opponentResponse.data.data.attributes.healthTotal);
            // setComputerWeaponOne(opponentResponse.data.data.combat_weapon_one);
            // setComputerWeaponTwo(opponentResponse.data.data.combat_weapon_two);
            // setComputerWeaponThree(opponentResponse.data.data.combat_weapon_three);
            setAsceanState({
                ...asceanState,
                'ascean': response.data.data.ascean,
                'level': response.data.data.ascean.level,
                'opponent': opponentResponse.data.data.ascean.level,
                'experience': 0,
                'experienceNeeded': response.data.data.ascean.level * 1000,
                'mastery': response.data.data.ascean.mastery,
                'faith': response.data.data.ascean.faith,
            })
            // setCombatData({
            //     ...combatData,
                
            //     'player': response.data.data.ascean,
            //     'player_health': response.data.data.attributes.healthTotal,
            //     'current_player_health': response.data.data.attributes.healthTotal,
            //     'new_player_health': response.data.data.attributes.healthTotal,
            //     'weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
            //     'weapon_one': response.data.data.combat_weapon_one,
            //     'weapon_two': response.data.data.combat_weapon_two,
            //     'weapon_three': response.data.data.combat_weapon_three,
            //     'player_defense': response.data.data.defense,
            //     'player_attributes': response.data.data.attributes,
            //     'player_damage_type': response.data.data.combat_weapon_one.damage_type[0],
                
            //     'computer': opponentResponse.data.data.ascean,
            //     'computer_health': opponentResponse.data.data.attributes.healthTotal,
            //     'current_computer_health': opponentResponse.data.data.attributes.healthTotal,
            //     'new_computer_health': opponentResponse.data.data.attributes.healthTotal,
            //     'computer_weapons': [opponentResponse.data.data.combat_weapon_one, opponentResponse.data.data.combat_weapon_two, opponentResponse.data.data.combat_weapon_three],
            //     'computer_weapon_one': opponentResponse.data.data.combat_weapon_one,
            //     'computer_weapon_two': opponentResponse.data.data.combat_weapon_two,
            //     'computer_weapon_three': opponentResponse.data.data.combat_weapon_three,
            //     'computer_defense': opponentResponse.data.data.defense,
            //     'computer_attributes': opponentResponse.data.data.attributes,
            //     'computer_damage_type': opponentResponse.data.data.combat_weapon_one.damage_type[0],
                
            //     'combatRound': 1,
            //     'sessionRound': 1,
            // });
            dispatch({
                type: ACTIONS.SET_COMPUTER,
                payload: opponentResponse.data.data
            });
            // setComputerWeapons([opponentResponse.data.data.combat_weapon_one, opponentResponse.data.data.combat_weapon_two, opponentResponse.data.data.combat_weapon_three])
            // setComputerWin(false);
            // setPlayerWin(false);
            // setGameIsLive(true);
            playOpponent();
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        }
    }, [asceanID])

    // useEffect(() => {
    //     console.log(state, 'This is the State Imported From CombatStore')
    // }, [state])

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean])

    useEffect(() => {
        getOpponentDialog();
    }, [opponent])

    const getOpponentDialog = async () => {
        try {
            const response = getNpcDialog(opponent.name);
            setDialog(response);
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        }
    }
      

    const getOpponent = async () => {
        setLoading(true)
        try {
            let minLevel: number = 0;
            let maxLevel: number = 0;
            if (ascean.level < 3) { // 1-2
                minLevel = 1;
                maxLevel = 3;
            } else if (ascean.level <= 4) { // 3-4
                minLevel = 2;
                maxLevel = 4;
            } else if (ascean.level <= 6) { // 5-6
                minLevel = 4;
                maxLevel = 8;
            } else if (ascean.level <= 8) { // 7-8
                minLevel = 4;
                maxLevel = 10;
            } else if (ascean.level <= 10) { // 9-10
                minLevel = 6;
                maxLevel = 12;
            } else if (ascean.level <= 14) { // 11-14
                minLevel = 8;
                maxLevel = 16;
            } else if (ascean.level <= 18) { // 15-18
                minLevel = 12;
                maxLevel = 18;
            } else if (ascean.level <= 20) {
                minLevel = 16;
                maxLevel = 20;
            }

            const firstResponse = await userService.getProfile('mirio');
            const profilesInRange = firstResponse.data.ascean.filter((a: any) => a.level >= minLevel && a.level <= maxLevel);
            const randomOpponent = Math.floor(Math.random() * profilesInRange.length);
            setOpponent(profilesInRange[randomOpponent]);
            const response = await asceanAPI.getAsceanStats(profilesInRange[randomOpponent]._id);
            // const randomOpponent = Math.floor(Math.random() * firstResponse.data.ascean.length);
            // setOpponent(firstResponse.data.ascean[randomOpponent]);
            // console.log(firstResponse.data.ascean[randomOpponent], '<- New Opponent');
            // const response = await asceanAPI.getAsceanStats(firstResponse.data.ascean[randomOpponent]._id)
            console.log(response.data.data, 'Response Compiling Stats For Opponent')
            // setComputerDefense(response.data.data.defense)
            // setComputerAttributes(response.data.data.attributes)
            // setTotalComputerHealth(response.data.data.attributes.healthTotal)
            // setCurrentComputerHealth(response.data.data.attributes.healthTotal)
            // setComputerWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three])
            // setCombatData({
            //     ...combatData,
            //     'current_player_health': currentPlayerHealth === 0 || currentPlayerHealth > totalPlayerHealth ? totalPlayerHealth : currentPlayerHealth,
            //     'new_player_health': currentPlayerHealth === 0 || currentPlayerHealth > totalPlayerHealth ? totalPlayerHealth : currentPlayerHealth,
            //     'computer': response.data.data.ascean,
            //     'computer_health': response.data.data.attributes.healthTotal,
            //     'current_computer_health': response.data.data.attributes.healthTotal,
            //     'new_computer_health': response.data.data.attributes.healthTotal,
            //     'computer_weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
            //     'computer_weapon_one': response.data.data.combat_weapon_one,
            //     'computer_weapon_two': response.data.data.combat_weapon_two,
            //     'computer_weapon_three': response.data.data.combat_weapon_three,
            //     'computer_defense': response.data.data.defense,
            //     'computer_attributes': response.data.data.attributes,
            //     'combatRound': 1,
            // });
            // if (currentPlayerHealth === 0 || currentPlayerHealth > totalPlayerHealth) {
            //     setCurrentPlayerHealth(totalPlayerHealth);
            // }
            dispatch({
                type: ACTIONS.SET_NEW_COMPUTER,
                payload: response.data.data
            });
            // setComputerWin(false);
            // setPlayerWin(false);
            // setGameIsLive(true);
            playOpponent();
            setLoading(false)
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        }
    }

    const levelUpAscean = async (vaEsai: any) => {
        try {
            console.log(vaEsai, 'Va Esai');
            let response = await asceanAPI.levelUp(vaEsai);
            console.log(response, 'Level Up');
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
                experience: 0,
                experienceNeeded: response.data.level * 1000,
                mastery: response.data.mastery,
                faith: response.data.faith,
            });
            getAscean();
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up')
        }
    }

    useEffect(() => {
        if (saveExp === false) return;
        console.log(asceanState, 'Ascean State')
        saveExperience();
        return () => {
            setSaveExp(false);
        }
    }, [asceanState, saveExp]);

    const saveExperience = async () => {
        if (saveExp === false || state.player_win === false) {
            console.log('Either A Loss or Already At Max Exp');
            return;
        }
        try {
            // setLoadingAscean(true);
            const response = await asceanAPI.saveExperience(asceanState);
            console.log(response.data, 'Response Saving Experience');
            // setAscean(response.data);
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
            // setCombatData({
            //     ...combatData,
            //     'player': firstResponse.data,
            //     'player_win': false,
            // });
            dispatch({
                type: ACTIONS.SAVE_EXPERIENCE,
                payload: firstResponse.data
            });
            setAsceanState({
                ...asceanState,
                'ascean': firstResponse.data,
                'constitution': 0,
                'strength': 0,
                'agility': 0,
                'achre': 0,
                'caeren': 0,
                'kyosir': 0,
                'level': firstResponse.data.level,
                'opponent': opponent.level,
                'experience': 0,
                'experienceNeeded': firstResponse.data.level * 1000,
                'mastery': firstResponse.data.mastery,
                'faith': firstResponse.data.faith,
            });
            if (response.data.gold > 0 && response.data.silver > 0) {
                setEmergencyText([`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.gold} gold and ${response.data.silver} silver.`]);
            } else if (response.data.gold > 0 && response.data.silver === 0) { 
                setEmergencyText([`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.gold} gold.`]);
            } else if (response.data.gold === 0 && response.data.silver > 0) {
                setEmergencyText([`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.silver} silver.`]);
            } else {
                setEmergencyText([`You gained up to ${asceanState.opponentExp} experience points.`]);
            }
            setSaveExp(false);
            setLoadingAscean(false);
        } catch (err: any) {
            console.log(err.message, 'Error Saving Experience');
        }
    }

    const gainExperience = async () => {
        try {
            let opponentExp: number = Math.round(state.computer.level * 100 * (state.computer.level / state.player.level) + state.player_attributes.rawKyosir);
            console.log(opponentExp, 'Experience Gained');
            if (asceanState.ascean.experience + opponentExp >= asceanState.experienceNeeded) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'experience': asceanState.experienceNeeded,
                });
                setSaveExp(true);
            } 
            if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'experience': Math.round(asceanState.experience + opponentExp),
                });
                setSaveExp(true);
            }
        } catch (err: any) {
            console.log(err.message, 'Error Gaining Experience')
        }
    }

    useEffect(() => {
        if (itemSaved === false) return;
        getAsceanQuickly();
        return () => {
            setItemSaved(false);
        }
    }, [itemSaved, state])

    useEffect(() => {
        getAsceanSlicker();
      return () => {
        setEqpSwap(false);
      }
    }, [eqpSwap])

    useEffect(() => {
      getAsceanSlicker();
    
      return () => {
        setRemoveItem(false);
      }
    }, [removeItem])
    

    const getAsceanSlicker = async () => {
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
            const response = await asceanAPI.getAsceanStats(asceanID);
            console.log(response.data.data, 'Response Compiling Stats');
            // setWeaponOne(response.data.data.combat_weapon_one);
            // setWeaponTwo(response.data.data.combat_weapon_two);
            // setWeaponThree(response.data.data.combat_weapon_three);
            // setPlayerDefense(response.data.data.defense);
            // setAttributes(response.data.data.attributes);
            // setTotalPlayerHealth(response.data.data.attributes.healthTotal);
            // setCurrentPlayerHealth(response.data.data.attributes.healthTotal)
            // setPlayerWeapons([response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three]);
            // setCombatData({
            //     ...combatData,
            //     'player': response.data.data.ascean,
            //     'player_health': response.data.data.attributes.healthTotal,
            //     // 'current_player_health': response.data.data.attributes.healthTotal,
            //     // 'new_player_health': response.data.data.attributes.healthTotal,
            //     'weapons': [response.data.data.combat_weapon_one, response.data.data.combat_weapon_two, response.data.data.combat_weapon_three],
            //     'weapon_one': response.data.data.combat_weapon_one,
            //     'weapon_two': response.data.data.combat_weapon_two,
            //     'weapon_three': response.data.data.combat_weapon_three,
            //     'player_defense': response.data.data.defense,
            //     'player_attributes': response.data.data.attributes,
            //     'player_damage_type': response.data.data.combat_weapon_one.damage_type[0],
            // });
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        }
    }
    

    const getAsceanQuickly = async () => {
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
            // setCombatData({...combatData, 'player': firstResponse.data});
            dispatch({
                type: ACTIONS.SET_PLAYER_QUICK,
                payload: firstResponse.data
            });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        }
    }

    useEffect(() => {
        if (lootRoll === false) return;
        getOneLootDrop(state.computer.level);
        return () => {
            setLootRoll(false);
        }
    }, [lootRoll, state.player_win])
    
    const getOneLootDrop = async (level: number) => {
        try {
            console.log(level, 'Level For Loot Drop')
            let response = await eqpAPI.getLootDrop(level);
            console.log(response.data[0], 'Loot Drop');
            setLootDrop(response.data[0]);

            let roll = Math.floor(Math.random() * 100) + 1;
            if (roll <= 25) {
                let second = await eqpAPI.getLootDrop(level);
                console.log(second.data[0], 'Second Loot Drop');
                setLootDropTwo(second.data[0]);
            } else {
                setLootDropTwo(null);
            }
            setItemSaved(false);
        } catch (err: any) {
            console.log(err.message, 'Error Getting Loot Drop')
        }
    }
    
    useEffect(() => {
        if (state.highScore > ascean.high_score) {
            console.log('Congratulations on the New High Score, Sir!');
            updateHighScore();
        } else {
            return;
        }
    }, [state.highScore])

    const updateHighScore = async () => {
        setLoadingAscean(true);
        try {
            const response = await asceanAPI.highScore({
                'asceanId': ascean._id,
                'highScore': state.highScore
            });
            // console.log(response.data, 'Response Updating High Score')
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
            // setAscean(response.data)
            // getAscean()
            setLoadingAscean(false);
        } catch (err: any) {
            console.log(err.message, 'Error Updating High Score')
        }
    }

    function handleAction(action: any) {
        // console.log(action.target.value, '<- Action being handled')
        // setCombatData({
        //     ...combatData,
        //     'action': action.target.value,
        //     'counter_guess': ''
        // });
        dispatch({
            type: ACTIONS.SET_COMBAT_ACTION,
            payload: action.target.value
        })
        setTimeLeft(10);
    }

    function handleCounter(counter: any) {
        // console.log(counter.target.value, 'New Counter')
        // setCombatData({
        //     ...combatData,
        //     'action': 'counter',
        //     'counter_guess': counter.target.value
        // });
        dispatch({
            type: ACTIONS.SET_COMBAT_COUNTER,
            payload: counter.target.value
        });
        setTimeLeft(10);
    }

    async function setWeaponOrder(weapon: any) {
        try {
            const findWeapon = state.weapons.filter((weap: { name: any; }) => weap?.name === weapon.target.value);
            const newWeaponOrder = async () => state?.weapons.sort((a: any, b: any) => {
                return (
                    a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0
                )
            });
            const response = await newWeaponOrder();
            playWO();
            console.log(response, '<- Response re-ordering weapons');
            // setCombatData({...combatData, 'weapons': response, 'player_damage_type': response[0].damage_type[0]});
            dispatch({
                type: ACTIONS.SET_WEAPON_ORDER,
                payload: response
            });
            setTimeLeft(10);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Weapon Order')
        }
    }

    async function setDamageType(damageType: any) {
        try {    
            // console.log(damageType.target.value, '<- Damage Type')
            playWO();
            // setCombatData({...combatData, 'player_damage_type': damageType.target.value});
            dispatch({
                type: ACTIONS.SET_DAMAGE_TYPE,
                payload: damageType.target.value
            });
            setTimeLeft(10);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Damage Type')
        }
    }

    async function setPrayerBlessing(prayer: any) {
        try {
            // console.log(prayer.target.value, '<- Prayer');
            playWO();
            // setCombatData({...combatData, 'playerBlessing': prayer.target.value});
            dispatch({
                type: ACTIONS.SET_PRAYER_BLESSING,
                payload: prayer.target.value
            });
            setTimeLeft(10);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Prayer')
        }
    }

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault()
        try {
            if (state.action === 'dodge') { 
                // setDodgeStatus(true);
                dispatch({
                    type: ACTIONS.SET_DODGE_STATUS,
                    payload: true
                }); 
            }
            if (state.action === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose An Action!\n`
            ])
                return
            }
            setEmergencyText([``]);
            setTimeLeft(10);
            const response = await gameAPI.initiateAction(state);
            // dispatch({
            //     type: ACTIONS.SET_COMBAT_INITIATED,
            //     payload: true
            // });
            // setCombatInitiated(true);
            // setActionStatus(true);
            console.log(response.data, 'Response Initiating Combat');
            // setCombatData({...response.data, 'action': ''}); // Guessing the variable, something along those lines. Should be all that's needed to update
            dispatch({
                type: ACTIONS.INITIATE_COMBAT,
                payload: response.data
            });
            // setCurrentPlayerHealth(response.data.new_player_health);
            // setCurrentComputerHealth(response.data.new_computer_health);
            // setPlayerWin(response.data.player_win);
            // setComputerWin(response.data.computer_win);
            if (response.data.critical_success === true) {
                if (response.data.player_damage_type === 'Spooky' || response.data.player_damage_type === 'Righteous') {
                    playDaethic();
                }
                if (response.data.player_damage_type === 'Wild') {
                    playWild();
                }
                if (response.data.player_damage_type === 'Earth') {
                    playEarth();
                }
                if (response.data.player_damage_type === 'Fire') {
                    playFire();
                }
                if (response.data.player_damage_type === 'Frost') {
                    playFrost();
                }
                if (response.data.player_damage_type === 'Lightning') {
                    playLightning();
                }
                if (response.data.player_damage_type === 'Sorcery') {
                    playSorcery();
                }
                if (response.data.player_damage_type === 'Wind') {
                    playWind();
                }
                if (response.data.player_damage_type === 'Pierce' && response.data.weapons[0].type !== 'Bow') {
                    playPierce();
                }
                if (response.data.player_damage_type === 'Blunt') {
                    playBlunt();
                }
                if (response.data.player_damage_type === 'Slash') {
                    playSlash();
                }
                if (response.data.weapons[0].type === 'Bow') {
                    playBow();
                }
            }
            if (response.data.religious_success === true) {
                playReligion();
            }
            if (response.data.roll_success === true || response.data.computer_roll_success === true) {
                playRoll();
            }
            if (response.data.counter_success === true || response.data.computer_counter_success === true) {
                playCounter();
            }
            if (response.data.player_win === true) {
                playWin();
                // setWinStreak((winStreak: number) => winStreak + 1);
                // if (winStreak + 1 > highScore) {
                //     setHighScore((score) => score + 1)
                // }
                gainExperience();
                // setLoseStreak(0);
                // setGameIsLive(false);
                // setCombatEngaged(false);
                // setDodgeStatus(false);
                setLootRoll(true);
                setTimeLeft(0);
                dispatch({
                    type: ACTIONS.PLAYER_WIN,
                    payload: response.data
                });
            }
            if (response.data.computer_win === true) {
                playDeath();
                // setLoseStreak((loseStreak: number) => loseStreak + 1);
                // setWinStreak(0);
                // setGameIsLive(false);
                // setCombatEngaged(false);
                // setDodgeStatus(false);
                setTimeLeft(0);
                dispatch({
                    type: ACTIONS.COMPUTER_WIN,
                    payload: response.data
                });
            }
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        }
    }

    const resetAscean = async () => {
        try {
            // await getOpponent();
            // if (currentPlayerHealth > totalPlayerHealth) {
            //     // setCurrentPlayerHealth(totalPlayerHealth);
            //     // setCombatData({
            //     //     ...combatData,
            //     //     'player_defense': playerDefense,
            //     //     'player_attributes': attributes,
            //     //     'computer_defense': computerDefense,
            //     //     'current_player_health': totalPlayerHealth,
            //     //     'new_player_health': totalPlayerHealth,
            //     //     'current_computer_health': totalComputerHealth,
            //     //     'new_computer_health': totalComputerHealth,
            //     //     // 'weapons': [weaponOne, weaponTwo, weaponThree],
            //     //     // 'playerEffects': [],
            //     //     // 'computerEffects': [],
            //     //     'player_win': false,
            //     //     'computer_win': false,
            //     //     'combatRound': 1,
            //     // });
            //     dispatch({
            //         type: ACTIONS.RESET_COMPUTER,
            //         payload: state,
            //     });
            // } else if (currentPlayerHealth === 0) {
            //     // setCurrentPlayerHealth(totalPlayerHealth);
            //     // setCombatData({
            //     //     ...combatData,
            //     //     'player_defense': playerDefense,
            //     //     'player_attributes': attributes,
            //     //     'computer_defense': computerDefense,
            //     //     'current_player_health': totalPlayerHealth,
            //     //     'new_player_health': totalPlayerHealth,
            //     //     'current_computer_health': totalComputerHealth,
            //     //     'new_computer_health': totalComputerHealth,
            //     //     'weapons': [weaponOne, weaponTwo, weaponThree],
            //     //     'player_damage_type': weaponOne.damage_type[0],
            //     //     // 'playerEffects': [],
            //     //     // 'computerEffects': [],
            //     //     'player_win': false,
            //     //     'computer_win': false,
            //     //     'combatRound': 1,
            //     // });
            //     dispatch({
            //         type: ACTIONS.RESET_PLAYER,
            //         payload: {
            //             defense: state.player_defense_default,
            //             attributes: state.attributes,
            //             health: state.player_health,
            //             weaponOne: state.weapon_one,
            //             weaponTwo: state.weapon_two,
            //             weaponThree: state.weapon_three,
            //             computerHealth: state.computer_health,
            //         }
            //     });
            // } else {
            //     // setCombatData({
            //     //     ...combatData,
            //     //     'player_defense': playerDefense,
            //     //     'computer_defense': computerDefense,
            //     //     'player_attributes': attributes,
            //     //     'current_computer_health': totalComputerHealth,
            //     //     'new_computer_health': totalComputerHealth,
            //     //     // 'weapons': [weaponOne, weaponTwo, weaponThree],
            //     //     // 'playerEffects': [],
            //     //     // 'computerEffects': [],
            //     //     'player_win': false,
            //     //     'computer_win': false,
            //     //     'combatRound': 1,
            //     // });
            //     dispatch({
            //         type: ACTIONS.RESET_COMPUTER,
            //         payload: state,
            //     });
            // }

            if (state.current_player_health === 0 || state.new_player_health === 0) {
                dispatch({
                    type: ACTIONS.RESET_PLAYER,
                    payload: state
                });
            } else {
                dispatch({
                    type: ACTIONS.RESET_COMPUTER,
                    payload: state,
                });
            }
            // setCurrentComputerHealth(totalComputerHealth);
            // setComputerWin(false);
            // setPlayerWin(false);
            // setCombatEngaged(true);
            // setGameIsLive(true);
            // if (ascean.level > opponent.level) {
            //     setWinStreak(0);
            // }
            playReplay();
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        }
    }

    useEffect(() => {
        // console.log(background, 'Background')
        if (ascean?.origin && background === null) {
            const getPlayerBackground = {
                background: "url(" + getBackgroundStyle(ascean.origin) + ")",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            };
            setBackground(getPlayerBackground);
        }
    }, [ascean])
    

    const num = Math.floor(Math.random() * 3) + 1;
    const chance = Math.floor(Math.random() * 3) + 1;
    function getBackgroundStyle(origin: string) {
        // console.log(origin, 'Origin of', ascean.name)
        switch (origin) {
            case 'Ashtre':
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/astralands_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/licivitas_${num}.jpg`;
                }
            case 'Fyers':
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/firelands_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/west_fangs_${num}.jpg`;
                }
            case "Li'ivi":
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/licivitas_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/west_fangs_${num}.jpg`;
                }
            case "Notheo":
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/kingdom_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/west_fangs_${num}.jpg`;
                }
            case "Nothos":
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/soverains_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/kingdom_${num}.jpg`;
                }
            case "Quor'eite":
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/sedyrus_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/licivitas_${num}.jpg`;
                }
            case 'Sedyreal':
                if (chance >= 2) {
                    return process.env.PUBLIC_URL + `/images/sedyrus_${num}.jpg`;
                } else {
                    return process.env.PUBLIC_URL + `/images/firelands_${num}.jpg`;
                }
        }
    }
      

    function sleep(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    }

    if (loading || loadingAscean) {
        return (
            <Loading Combat={true} />
        )
    }

    return (
        <Container fluid id="game-container" style={ background }>
            <GameAnimations 
                playerCritical={state.critical_success} computerCritical={state.computer_critical_success}
                playerAction={state.player_action} computerAction={state.computer_action} 
                playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_computer_damage} 
                roll_success={state.roll_success} computer_roll_success={state.computer_roll_success}
                counterSuccess={state.counter_success} computerCounterSuccess={state.computer_counter_success}
            />
            {/* { combatData?.computer_attributes?.healthTotal && currentComputerHealth >= 0 ? */}
                <GameAscean state={state} ascean={opponent} totalPlayerHealth={state.computer_health} loading={loadingAscean} player={false} currentPlayerHealth={state.new_computer_health} />
                {/* : <>{opponentStatCompiler}</>
            } */}
            <GameConditions 
                setEmergencyText={setEmergencyText} dispatch={dispatch} state={state} gainExperience={gainExperience}
                playDeath={playDeath} playCounter={playCounter} playRoll={playRoll}
                playDaethic={playDaethic} playEarth={playEarth} playFire={playFire} playBow={playBow} playFrost={playFrost}
                playLightning={playLightning} playSorcery={playSorcery} playWind={playWind} playPierce={playPierce} setLootRoll={setLootRoll}
                playSlash={playSlash} playBlunt={playBlunt} playWin={playWin} playWild={playWild}
                playReligion={playReligion} timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            />
            {
                !state.combatEngaged ?
                <>
                <DialogBox 
                    npc={opponent.name} dialog={dialog} dispatch={dispatch} state={state}
                    playerWin={state.player_win} computerWin={state.computer_win} ascean={ascean} enemy={opponent} itemSaved={itemSaved} setItemSaved={setItemSaved}
                    winStreak={state.winStreak} loseStreak={state.loseStreak} highScore={state.highScore} lootDropTwo={lootDropTwo} setLootDropTwo={setLootDropTwo}
                    resetAscean={resetAscean} getOpponent={getOpponent} lootDrop={lootDrop} setLootDrop={setLootDrop}
                    />
                <Button variant='' className='inventory-button' onClick={() => setShowInventory(!showInventory)}>Inventory</Button>    
                </>
                : ''
            }
            {
                showInventory ?
                <InventoryBag inventory={ascean.inventory} ascean={ascean} eqpSwap={eqpSwap} removeItem={removeItem} setEqpSwap={setEqpSwap} setRemoveItem={setRemoveItem} />
                : ""
            }
            {
                asceanState.ascean.experience === asceanState.experienceNeeded ?
                <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
                : ''
            }
            <GameAscean state={state} ascean={ascean} player={true} totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} loading={loadingAscean} />
            
            { state.player_win || state.computer_win || !state.combatEngaged ? '' : state?.weapons ?
            <GameActions 
                setDamageType={setDamageType} dispatch={dispatch} state={state}
                sleep={sleep} setPrayerBlessing={setPrayerBlessing}
                weapons={state.weapons} damageType={state.weapons[0].damage_type} setWeaponOrder={setWeaponOrder}
                handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} 
                currentWeapon={state.weapons[0]} currentDamageType={state.player_damage_type} currentAction={state.action} currentCounter={state.counter_guess} 
                setEmergencyText={setEmergencyText} timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            /> : <Loading Combat={true} />
            }
            <GameCombatText 
               emergencyText={emergencyText} 
                playerCombatText={state.player_action_description} computerCombatText={state.computer_action_description} 
                playerActionText={state.player_start_description} computerActionText={state.computer_start_description}
                playerDeathText={state.player_death_description} computerDeathText={state.computer_death_description}
                playerSpecialText={state.player_special_description} computerSpecialText={state.computer_special_description}
                playerReligiousText={state.player_influence_description} computerReligiousText={state.computer_influence_description}
                playerReligiousTextTwo={state.player_influence_description_two} computerReligiousTextTwo={state.computer_influence_description_two}
            />
        </Container>
    )
}

export default GameSolo