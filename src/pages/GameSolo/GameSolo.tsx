import { useEffect, useState, useCallback, useReducer, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './GameSolo.css';
import * as asceanAPI from '../../utils/asceanApi';  
import * as eqpAPI from '../../utils/equipmentApi';
import * as gameAPI from '../../utils/gameApi'
import * as mapAPI from '../../utils/mapApi';
import userService from "../../utils/userService";
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import GameCombatText from '../../components/GameCompiler/GameCombatText';
import GameAscean from '../../components/GameCompiler/GameAscean';
import GameActions from '../../components/GameCompiler/GameActions';
import GameAnimations from '../../components/GameCompiler/GameAnimations';
import GameConditions from '../../components/GameCompiler/GameConditions';
import useSound from 'use-sound'
import LevelUpModal from '../../game/LevelUpModal';
import { getNpcDialog, getMerchantDialog } from '../../components/GameCompiler/Dialog';
import DialogBox from '../../game/DialogBox';
import Button from 'react-bootstrap/Button';
import InventoryBag from '../../components/GameCompiler/InventoryBag';
import { GAME_ACTIONS, GameStore, initialGameData, Ascean, Enemy, Player, NPC } from '../../components/GameCompiler/GameStore';
import { ACTIONS, CombatStore, initialCombatData } from '../../components/GameCompiler/CombatStore';
import { MAP_ACTIONS, MapStore, initialMapData, DIRECTIONS, moveContent } from '../../components/GameCompiler/WorldStore';
import Settings from '../../components/GameCompiler/Settings';
import Joystick from '../../components/GameCompiler/Joystick';
import Coordinates from '../../components/GameCompiler/Coordinates';
import GameplayEventModal from '../../components/GameCompiler/GameplayEventModal';
import GameplayOverlay from '../../components/GameCompiler/GameplayOverlay';
import Content from '../../components/GameCompiler/Content';
import CityBox from '../../components/GameCompiler/CityBox';
import StoryBox from '../../components/GameCompiler/StoryBox';
import CombatOverlay from '../../components/GameCompiler/CombatOverlay';
import GameMap from '../../components/GameCompiler/GameMap';
import { Wolf } from '../../components/GameCompiler/Animals';
import { Merchant } from '../../components/GameCompiler/NPCs';
import useJoystick from '../../components/GameCompiler/useJoystick';

interface GameProps {
    user: any;
};

const GameSolo = ({ user }: GameProps) => {
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [mapState, mapDispatch] = useReducer(MapStore, initialMapData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
    const [emergencyText, setEmergencyText] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [background, setBackground] = useState<any | null>({
        background: ''
    }); // ------
    const [soundEffectVolume, setSoundEffectVolume] = useState<number>(0.3);
    // const { direction, handleDirectionChange } = useJoystick();

    type Direction = keyof typeof DIRECTIONS;

    const opponentSfx = process.env.PUBLIC_URL + `/sounds/opponent.mp3`;
    const [playOpponent] = useSound(opponentSfx, { volume: soundEffectVolume });

    const weaponOrderSfx = process.env.PUBLIC_URL + `/sounds/weapon-order.mp3`;
    const [playWO] = useSound(weaponOrderSfx, { volume: soundEffectVolume });
    const counterSfx = process.env.PUBLIC_URL + `/sounds/counter-success.mp3`;
    const [playCounter] = useSound(counterSfx, { volume: soundEffectVolume });
    const rollSfx = process.env.PUBLIC_URL + `/sounds/roll-success.mp3`;
    const [playRoll] = useSound(rollSfx, { volume: soundEffectVolume });

    const pierceSfx = process.env.PUBLIC_URL + `/sounds/sword-stab.mp3`;
    const [playPierce] = useSound(pierceSfx, { volume: soundEffectVolume });

    const slashSfx = process.env.PUBLIC_URL + `/sounds/slash-attack.mp3`;
    const [playSlash] = useSound(slashSfx, { volume: soundEffectVolume });

    const bluntSfx = process.env.PUBLIC_URL + `/sounds/blunt-attack.mp3`;
    const [playBlunt] = useSound(bluntSfx, { volume: soundEffectVolume });

    const deathSfx = process.env.PUBLIC_URL + `/sounds/death-sound.mp3`;
    const [playDeath] = useSound(deathSfx, { volume: soundEffectVolume });

    const winSfx = process.env.PUBLIC_URL + `/sounds/win-sound.mp3`;
    const [playWin] = useSound(winSfx, { volume: soundEffectVolume });

    const replaySfx = process.env.PUBLIC_URL + `/sounds/replay-sound.mp3`;
    const [playReplay] = useSound(replaySfx, { volume: soundEffectVolume });

    const religiousSfx = process.env.PUBLIC_URL + `/sounds/religious.mp3`;
    const [playReligion] = useSound(religiousSfx, { volume: soundEffectVolume });

    const daethicSfx = process.env.PUBLIC_URL + `/sounds/daethic-magic.mp3`;
    const [playDaethic] = useSound(daethicSfx, { volume: soundEffectVolume });

    const wildSfx = process.env.PUBLIC_URL + `/sounds/wild-magic.mp3`;
    const [playWild] = useSound(wildSfx, { volume: soundEffectVolume });

    const earthSfx = process.env.PUBLIC_URL + `/sounds/earth-magic.mp3`;
    const [playEarth] = useSound(earthSfx, { volume: soundEffectVolume });

    const fireSfx = process.env.PUBLIC_URL + `/sounds/fire-magic.mp3`;
    const [playFire] = useSound(fireSfx, { volume: soundEffectVolume });

    const bowSfx = process.env.PUBLIC_URL + `/sounds/bow-attack.mp3`;
    const [playBow] = useSound(bowSfx, { volume: soundEffectVolume });

    const frostSfx = process.env.PUBLIC_URL + `/sounds/frost-magic.mp3`;
    const [playFrost] = useSound(frostSfx, { volume: soundEffectVolume });

    const lightningSfx = process.env.PUBLIC_URL + `/sounds/lightning-magic.mp3`;
    const [playLightning] = useSound(lightningSfx, { volume: soundEffectVolume });

    const sorcerySfx = process.env.PUBLIC_URL + `/sounds/sorcery-magic.mp3`;
    const [playSorcery] = useSound(sorcerySfx, { volume: soundEffectVolume });

    const windSfx = process.env.PUBLIC_URL + `/sounds/wind-magic.mp3`;
    const [playWind] = useSound(windSfx, { volume: soundEffectVolume });

    const walk1Sfx = process.env.PUBLIC_URL + `/sounds/walk-1.mp3`;
    const walk2Sfx = process.env.PUBLIC_URL + `/sounds/walk-2.mp3`;
    const walk3Sfx = process.env.PUBLIC_URL + `/sounds/walk-3.mp3`;
    const walk4Sfx = process.env.PUBLIC_URL + `/sounds/walk-4.mp3`;
    const walk8Sfx = process.env.PUBLIC_URL + `/sounds/walk-8.mp3`;
    const walk9Sfx = process.env.PUBLIC_URL + `/sounds/walk-9.mp3`;
    const [playWalk1] = useSound(walk1Sfx, { volume: soundEffectVolume });
    const [playWalk2] = useSound(walk2Sfx, { volume: soundEffectVolume });
    const [playWalk3] = useSound(walk3Sfx, { volume: soundEffectVolume });
    const [playWalk4] = useSound(walk4Sfx, { volume: soundEffectVolume });
    const [playWalk8] = useSound(walk8Sfx, { volume: soundEffectVolume });
    const [playWalk9] = useSound(walk9Sfx, { volume: soundEffectVolume });

    const merchantSfx = process.env.PUBLIC_URL + `/sounds/merchant.mp3`;
    const [playMerchant] = useSound(merchantSfx, { volume: soundEffectVolume });
    const dungeonSfx = process.env.PUBLIC_URL + `/sounds/dungeon.mp3`;
    const [playDungeon] = useSound(dungeonSfx, { volume: soundEffectVolume });
    const phenomenaSfx = process.env.PUBLIC_URL + `/sounds/phenomena.mp3`;
    const [playPhenomena] = useSound(phenomenaSfx, { volume: soundEffectVolume });
    const treasureSfx = process.env.PUBLIC_URL + `/sounds/treasure.mp3`;
    const [playTreasure] = useSound(treasureSfx, { volume: soundEffectVolume });

    const actionButtonSfx = process.env.PUBLIC_URL + `/sounds/action-button.mp3`;
    const [playActionButton] = useSound(actionButtonSfx, { volume: soundEffectVolume });
    const combatRoundSfx = process.env.PUBLIC_URL + `/sounds/combat-round.mp3`;
    const [playCombatRound] = useSound(combatRoundSfx, { volume: soundEffectVolume });

    const { asceanID } = useParams();

    const [asceanState, setAsceanState] = useState({
        ascean: gameState.player,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        level: gameState.player.level,
        opponent: 0,
        opponentExp: 0,
        experience: gameState.player.experience,
        experienceNeeded: gameState.player.level * 1000,
        mastery: gameState.player.mastery,
        faith: gameState.player.faith,
    });

    useEffect(() => {
        console.log(background, "Background")
    }, [background])

    // useEffect(() => { console.log(gameState, "Current Game State") } , [gameState]);

    // useEffect(() => {
    //     console.log(mapState.steps, "Player Step Count");
    // }, [mapState.steps]);

    const getAscean = useCallback(async () => {
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: firstResponse.data });
            // console.log(firstResponse, 'First Response')
            const response = await asceanAPI.getAsceanStats(asceanID);
            // console.log(response, 'Response');
            
            dispatch({
                type: ACTIONS.SET_PLAYER,
                payload: response.data.data
            });
            setAsceanState({
                ...asceanState,
                'ascean': response.data.data.ascean,
                'level': response.data.data.ascean.level,
                'opponent': 0,
                'experience': 0,
                'experienceNeeded': response.data.data.ascean.level * 1000,
                'mastery': response.data.data.ascean.mastery,
                'faith': response.data.data.ascean.faith,
            });
            gameDispatch({ type: GAME_ACTIONS.LOADING, payload: false });
            if (response.data.data.ascean.tutorial.firstBoot === true) {
                gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
            }; 
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    }, [asceanID]);

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean]);

    const getOpponentDialog = async (enemy: string) => {
        try {
            // console.log(enemy, "Enemy");
            const response = getNpcDialog(enemy);
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    const getNPCDialog = async (enemy: string) => {
        try {
            // console.log(enemy, "Enemy");
            const response = getMerchantDialog(enemy);
            gameDispatch({ type: GAME_ACTIONS.SET_DIALOG, payload: response });
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    const getOpponent = async () => {
        gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        try {
            let minLevel: number = 0;
            let maxLevel: number = 0;
            const chance = Math.random();
            if (gameState.player.level === 1) {
                if (chance > 0.5) {
                    const wolf: Enemy = Object.assign({}, Wolf);
                    gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: wolf });
                    const response = await asceanAPI.getAnimalStats(wolf);
                    // console.log(response.data.data, "Response with Wolf?");
                    setAsceanState({
                        ...asceanState,
                        'opponent': wolf.level,
                    });
                    dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
                    setTimeout(() => {
                        dispatch({
                            type: ACTIONS.SET_DUEL,
                            payload: ''
                        });
                        playOpponent();
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                    }, 2000);
                    return;
                }
            }
            if (gameState.player.level === 2) {
                if (chance > 0.67) {
                    const wolf: Enemy = Object.assign({}, Wolf);
                    gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: wolf });
                    const response = await asceanAPI.getAnimalStats(wolf);
                    // console.log(response.data.data, "Response with Wolf?");
                    setAsceanState({
                        ...asceanState,
                        'opponent': wolf.level,
                    });
                    dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
                    setTimeout(() => {
                        dispatch({
                            type: ACTIONS.SET_DUEL,
                            payload: ''
                        });
                        playOpponent();
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
                    }, 2000);
                    return;
                }
            }
            if (gameState.player.level < 3) {
                minLevel = 1;
                maxLevel = 2;
            } else  if (gameState.player.level <= 4) { // 3-4
                minLevel = 2;
                maxLevel = 4;
            } else if (gameState.player.level <= 6) { // 5-6
                minLevel = 4;
                maxLevel = 8;
            } else if (gameState.player.level <= 8) { // 7-8
                minLevel = 4;
                maxLevel = 10;
            } else if (gameState.player.level <= 10) { // 9-10
                minLevel = 6;
                maxLevel = 12;
            } else if (gameState.player.level <= 14) { // 11-14
                minLevel = 8;
                maxLevel = 16;
            } else if (gameState.player.level <= 18) { // 15-18
                minLevel = 12;
                maxLevel = 18;
            } else if (gameState.player.level <= 20) {
                minLevel = 16;
                maxLevel = 20;
            }
            const enemyData = {
                username: 'mirio',
                minLevel: minLevel,
                maxLevel: maxLevel
            };
            const secondResponse = await userService.getRandomEnemy(enemyData);
            console.log(secondResponse, 'Enemy Response');
            const selectedOpponent = await asceanAPI.getOneAscean(secondResponse.data.ascean._id);
            console.log(selectedOpponent, 'Selected Opponent');
            const response = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            console.log(response.data.data, 'Opponent Response');
            gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: selectedOpponent.data })
            setAsceanState({
                ...asceanState,
                'opponent': selectedOpponent.data.level,
            });
            dispatch({
                type: ACTIONS.SET_NEW_COMPUTER,
                payload: response.data.data
            });
            playOpponent();
            await getOpponentDialog(selectedOpponent.data.name);
            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
            if (!gameState?.showDialog && mapState?.currentTile?.content !== 'city') {
                gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        };
    };

    const levelUpAscean = async (vaEsai: any) => {
        try {
            let response = await asceanAPI.levelUp(vaEsai);
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
            await getAsceanLeveled();
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up')
        };
    };

    useEffect(() => {
        if (gameState.saveExp === false) return;
        console.log(asceanState, 'Ascean State');
        saveExperience();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: false });
        };
    }, [asceanState, gameState.saveExp]);

    const saveExperience = async () => {
        if (gameState.saveExp === false || state.player_win === false) {
            return;
        };
        try {
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You reflect on the moments of your duel with ${gameState.opponent.name} as you count your pouch of winnings.` });
            const response = await asceanAPI.saveExperience(asceanState);
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: firstResponse.data });
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
                'opponent': gameState.opponent.level,
                'experience': 0,
                'experienceNeeded': firstResponse.data.level * 1000,
                'mastery': firstResponse.data.mastery,
                'faith': firstResponse.data.faith,
            });
            if (response.data.gold > 0 && response.data.silver > 0) {
                gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.gold} gold and ${response.data.silver} silver.`] });
            } else if (response.data.gold > 0 && response.data.silver === 0) { 
                gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.gold} gold.`] });
            } else if (response.data.gold === 0 && response.data.silver > 0) {
                gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points and received ${response.data.silver} silver.`] });
            } else {
                gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: [`You gained up to ${asceanState.opponentExp} experience points.`] });
            };
            gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error Saving Experience');
        };
    };

    const gainExperience = async () => {
        try {
            let opponentExp: number = Math.round(state.computer.level * 100 * (state.computer.level / state.player.level) + state.player_attributes.rawKyosir);
            if (asceanState.ascean.experience + opponentExp >= asceanState.experienceNeeded) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'experience': asceanState.experienceNeeded,
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
            if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'experience': Math.round(asceanState.experience + opponentExp),
                });
                gameDispatch({ type: GAME_ACTIONS.SAVE_EXP, payload: true });
            };
        } catch (err: any) {
            console.log(err.message, 'Error Gaining Experience')
        };
    };

    useEffect(() => {
        if (gameState.itemSaved === false) return;
        getAsceanQuickly();
        return () => {
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
        };
    }, [gameState.itemSaved, state]);

    useEffect(() => {
        getAsceanSlicker();
      return () => {
        gameDispatch({ type: GAME_ACTIONS.EQP_SWAP, payload: false });
      };
    }, [gameState.eqpSwap]);

    useEffect(() => {
      getAsceanSlicker();
      return () => {
        gameDispatch({ type: GAME_ACTIONS.REMOVE_ITEM, payload: false });
      };
    }, [gameState.removeItem]);

    const deleteEquipment = async (eqp: any) => {
        try {
            const response = await eqpAPI.deleteEquipment(eqp);
            console.log(response, 'Delete Response!');
        } catch (err) {
            console.log(err, 'Error!')
        };
    };

    const getAsceanLeveled = async () => {
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: firstResponse.data });
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_LEVEL_UP,
                payload: response.data.data
             });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Leveled');
        };
    };

    const getAsceanSlicker = async () => {
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: firstResponse.data });
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        };
    };

    const getAsceanQuickly = async () => {
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: firstResponse.data });
            dispatch({
                type: ACTIONS.SET_PLAYER_QUICK,
                payload: firstResponse.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        };
    };

    const clearOpponent = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: null });
            dispatch({
                type: ACTIONS.CLEAR_DUEL,
                payload: null
            });
            if (gameState.showDialog) {
                gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: false });
            };
            if (mapState.currentTile.content !== 'city' && state.new_computer_health <= 0) {
                mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
            };
        } catch (err: any) {
            console.log(err.message, 'Error Clearing Duel');
        };
    };

    const saveWorld = async () => {
        try {
            // const response = await mapAPI.saveNewMap(mapState);
            // console.log(response);
            // mapDispatch({
            //     type: MAP_ACTIONS.SET_MAP_DATA,
            //     payload: response
            // });
            gameDispatch({ type: GAME_ACTIONS.SET_SAVE_WORLD, payload: `Good luck, ${gameState.player.name}, for no Ancient bears witness to it on your journey. Ponder what you wish to do in this world, without guidance but for your hands in arms. \n\n Enemies needn't stay such a way, yet a Good Lorian is a rare sight. Be whom you wish and do what you will, live and yearn for wonder in the ley, or scour cities if you have the coin. Pillage and strip ruins of their refuse, clear caves and dungeons of reclusive mercenaries, knights, druids, occultists, and more. \n\n The world doesn't need you, the world doesn't want you. The world's heroes are long dead since the Ancients fell. Many have sought to join these legends best they could, and in emulation have erected the Ascea, a season's long festival of athletic, intellectual, and poetic competition judged in the manner of the Ancients before; an Ascean, worthy, vying to be crowned the va'Esai and become revered across the land as 'Worthy of the Preservation of Being.' \n\n Whatever you seek in this world, if you wish it so, it starts with the Ascea.`})
            setTimeout(() => {
                gameDispatch({ type: GAME_ACTIONS.WORLD_SAVED, payload: true });
            }, 60000);
        } catch (err: any) {
            console.log(err.message, 'Error Saving World');
        };
    };

    const saveAsceanCoords = async (x: number, y: number) => {
        try {
            const data = {
                ascean: gameState.player._id, 
                coordinates: {
                    x: x,
                   y: y,
                },
            };
            // const response = await asceanAPI.saveAsceanCoords(data);
            // console.log(response, 'Response Saving Ascean Coordinates');
        } catch (err: any) {
            console.log(err.message, 'Error Saving Ascean Coordinates');
        };
    };

    const generateWorld = async (mapName: string) => {
        mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: true });
        try {
            const data = {
                name: mapName,
                ascean: gameState.player,
            };
            const response = await mapAPI.createMap(data);
            // console.log(response, 'Response Generating World Environment.');
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA,
                payload: response
            });
            const coords = await getAsceanCoords(gameState?.player?.coordinates?.x, gameState?.player?.coordinates?.y, response.map);
            // console.log(coords, "Coordinates?")
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_COORDS,
                payload: coords,
            });
            mapDispatch({ type: MAP_ACTIONS.SET_GENERATING_WORLD, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error Generating World Environment.');
        };
    };

    const chanceEncounter = async (content: string) => {
        try {
            const chance = Math.floor(Math.random() * 100) + 1;
            console.log(chance, 'Chance Encounter');
            switch (content) {
                case 'cave': {
                    if (chance > 99) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                        await getTreasure();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000)
                    } else if (chance > 98) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000);
                    };
                    break;
                };
                case 'dungeon': {
                    if (chance > 95) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000);
                    };
                    break;
                };
                case 'ruins': {
                    if (chance > 97) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000);
                    } else if (chance > 95) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You spy a traveling merchant peddling wares. He approaches cautious yet peaceful.` })
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You spy a traveling merchant roaming about the land, possibly peddling some wares wares. \n\n He approaches cautious yet peaceful, hailing you down.` })
                        await getNPC();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000);
                    };
                    break;
                };
                case 'weather': {
                    if (chance > 99) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                        await getTreasure();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000)
                    } else if (chance > 98) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted someone to your presence!` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted someone or some thing to your presence. Or perhaps they simply grew tired of watching. \n\n Luck be to you, ${gameState?.player?.name}.` });
        
                        await getOpponent();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000);
                    } else if (chance > 97) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You spy a traveling merchant peddling wares. He approaches cautious yet peaceful.` })
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You spy a traveling merchant roaming about the land, possibly peddling some wares wares. \n\n He approaches cautious yet peaceful, hailing you down.` })
                        await getNPC();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000);
                    } else {
                        if (gameState.storyContent !== '') {
                            gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: '' });
                        }
                        mapDispatch({
                            type: MAP_ACTIONS.SET_MAP_CONTEXT,
                            payload: "You continue moving through your surroundings and find nothing of interest in your path, yet the world itself seems to be watching you."
                        });
                    };
                    break;
                };
                case 'wonder': {
                    if (chance > 97) {
                        gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                        await getTreasure();
                        setTimeout(() => {
                            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                        }, 3000)
                    };
                    break;
                };
                default: {
                    break;
                };
            };

        } catch (err: any) {
            console.log(err.message, 'Error Encountering Chance Encounter');
        };
    };

    const handleDirectionChange = async (direction: Direction) => {
        const offset = DIRECTIONS[direction];
        if (offset) {
            const newX = mapState.currentTile.x + offset.x;
            const newY = mapState.currentTile.y + offset.y;
            if (newX >= -100 && newX <= 100 && newY >= -100 && newY <= 100) {
                const newTile = await getAsceanCoords(newX, newY, mapState.map);
                const newTiles = await getAsceanGroupCoords(newX, newY, mapState.map);
                // console.log(newTiles, "DId this work?")
                const data = {
                    newTile: newTile,
                    oldTile: mapState.currentTile,
                    newTiles: newTiles,
                    map: mapState,
                };
                mapDispatch({
                type: MAP_ACTIONS.SET_NEW_MAP_COORDS,
                payload: data,
                });
                const options = [playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9];
                const random = Math.floor(Math.random() * options.length);
                options[random]();
            };
        };
    };
      
    function debounce<T>(func: (this: T, ...args: any[]) => void, delay: number): (this: T, ...args: any[]) => void {
        let timer: ReturnType<typeof setTimeout>;
        return function (this: T, ...args: any[]) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }; 
    
    const debouncedHandleDirectionChange = debounce(handleDirectionChange, 150);

    async function getAsceanCoords(x: number, y: number, map: any) {
        const tile = map?.[x + 100]?.[y + 100];
        return tile ?? null;
    };

    async function getAsceanGroupCoords(x: number, y: number, map: any) {
        let tiles = [];
        for (let i = -4; i < 5; i++) {
            for (let j = -4; j < 5; j++) {
                const tileX = x + 100 + i;
                const tileY = y + 100 + j;
                const tile = map?.[tileX]?.[tileY];
                if (tile) {
                    tiles.push(tile);
                };
            };
        };      
        return tiles;
    }; 

    const getPhenomena = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        playPhenomena();
    };

    const getWeather = async (province: string) => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        }
        switch (province) {
            case 'Alluring Isles': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Increment jungle weighs your steps, succumbing to the dense and undisturbed natural wonder. -10% Roll, Critical Strike. +10% Elemental, Ranged Damage."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Alluring Isles"
                })
                break;
            };
            case 'Astralands': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Lightning strikes surround a swirl of heavy, bleeding clouds. +10% Critical Strikes, +10% Magic Damage."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Astralands"
                })
                break;
            };
            case 'Fangs': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Soft, frothing fog surrounds the area. -10% Elemental, Ranged Damage. +5% Roll. +10% Melee Damage."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Fangs"
                })
                break;
            };
            case 'Firelands': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "It's bright and sunny, just absolute beautiful weather. Couldn't ask for a better day for a stroll into the wilderness. +10% Damage, +25% Critical Damage. You cannot dodge."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Firelands"
                })
                break;
            };
            case 'Kingdom': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Snowfall gathers and the winds greet you with shrill smiles. +10% Ancient, Physical Damage. -5% Roll."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Kingdom"
                })
                break;
            };
            case 'Licivitas': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Slick weather draws palpable breaths as you embark across the plains. A calm gives glimpses of the land of hush and tendril. +10% Ancient, Daethic Damage."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Licivitas"
                })
                break;
            };
            case 'Sedyrus': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Despite your settings, monsoons quench the root of these lands for months wtih a single flash of its reverence. +10% Ancient, Elemental Damage. +10% Critical Damage. -5% Roll. You cannot dodge."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Sedyrus"
                })
                break;
            };
            case 'Soverains': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Strange airs pervade and grant a sense of shifting winds, its swirl caressing. +10% Magic Damage. +5% Roll."
                });
                dispatch({
                    type: ACTIONS.SET_WEATHER,
                    payload: "Soverains"
                })
                break;
            };
        };
        await chanceEncounter('weather');
    };

    const getNPC = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        try {
            playMerchant();
            const npc: NPC = Object.assign({}, Merchant);
            gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: npc });
            const response = await asceanAPI.getAnimalStats(npc);
            dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: response.data.data });
            await getNPCDialog(npc.name);
            gameDispatch({ type: GAME_ACTIONS.SET_CURRENT_INTENT, payload: 'services' });
            gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
            if (!gameState.showDialog && mapState?.currentTile?.content !== 'city') {
                gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: true });
            }
        } catch (err: any) {
            console.log("Error Getting an NPC");
        };
    };

    const getWonder = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        await chanceEncounter('wonder');
    };

    const getTreasure = async () => {
        playTreasure();
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        gameDispatch({ type: GAME_ACTIONS.SET_GAMEPLAY_EVENT, payload: {
            title: "Treasure!",
            description: `${gameState.player.name}, you've come across some leftover spoils or treasure, either way its yours now if you desire.`,
        } });
        await getOneLootDrop(gameState.player.level);
        gameDispatch({ type: GAME_ACTIONS.SET_GAMEPLAY_MODAL, payload: true });
    };

    const getLandmark = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
    };

    const getHazard = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        chanceEncounter('hazard');
    };

    const getCave = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        await chanceEncounter('cave');
    };
    const getRuins = async () => {
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        await chanceEncounter('ruins');
    };
    const getDungeon = async () => {
        playDungeon();
        if (gameState.cityButton) {
            gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false }); 
        };
        await chanceEncounter('dungeon');
        // This will be a probabilistic roll of random dungeons that affect gameplay, similar to environmental effects. May last for some time.
    };
    const getCity = async () => {
        // setBackground(getCityBackground);
        gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
        gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You walk up to the edges of an open city, some structure of wall exists but is overall porous. Here, you may find services to aid and replenish your journey.` });
                
        setBackground({
            ...background,
            'background': getCityBackground.background
        });
        gameDispatch({ type: GAME_ACTIONS.SET_ENTER_CITY, payload: `You're now in a local city of the province. Using the City button, you can access the city's services and shops.`});
        setTimeout(() => {
            gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
        }, 4000);
    };
    const handleTileContent = async (content: string, lastContent: string) => {
        // console.log(content, lastContent, "Current and Last COntent")
        if (lastContent === 'city' && content !== 'city') {
            // setBackground(getPlayerBackground);
            setBackground({
                ...background,
                'background': getPlayerBackground.background
            });
        };
        if (content === 'city' && lastContent === 'city') {
            return;
        };
        try {
            switch (content) {
                case 'enemy': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Your encroaching footsteps has alerted a stranger whose reaction appears defensive.` });
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `Your encroaching footsteps has alerted a stranger to your presence. They appear to be approaching you now. \n\n May you be sure, ${gameState?.player?.name}.` });
                    await getOpponent();
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                    }, 3000);
                    break;
                };
                case 'npc': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You approach a traveling merchant peddling wares.` })
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You approach a traveling merchant roaming about the land, possibly peddling some wares wares. \n\n He approaches cautious yet peaceful as you him down.` })
                    await getNPC();
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                    }, 3000);
                    break;
                };
                case 'phenomena': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You're unsure of what there is to witness, yet feel its tendrils beckoning. Do you wish to enter?` });
                    // This will be a probabilistic roll of random supernatural occurrences that affect gameplay, similar to environmental effects. May last for some time.
                    await getPhenomena();
                    break;
                };
                case 'wonder': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Natural wonders of the world environment, may grant boons or blessings when encountered, or perhaps be where enemies or npc's congregate` });
                    // Natural wonders of the world environment, may grant boons or blessings when encountered, or perhaps be where enemies or npc's congregate
                    await getWonder(); 
                    break;
                };
                case 'ruins': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Decay of civilizations from the past, may have scavengers or treasure probabilistically determined` });
                   
                    // Decay of civilizations from the past, may have scavengers or treasure probabilistically determined
                    await getRuins();
                    break;
                };
                case 'cave': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Caves appear abundant, with many adventurers seeking untold stories that lay waiting to be discovered. Curious why there aren't more folk interested` });
                    // When prompted to enter, will create a new object map that extends the WorldMap as a 'Cave' object, with a new set of tiles and content
                    await getCave();
                    break;
                };
                case 'weather': {
                    // Weather is simply an occurrence in nature and can still precipiate other events such as enemies, treasure, landmarks, hazards, dungeons, cities, etc.
                    console.log("It's the Weather!");
                    await getWeather(mapState.province);
                    break;
                };
                case 'treasure': {
                    // This will be the getLoot() function that will be called to get the loot from the tile, probably a modal that pops up with the loot and a button to get it. 1-3 items per tile
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've happened on treasure. \n\n See what you've found?` });
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                    gameDispatch({ type: GAME_ACTIONS.SET_OVERLAY_CONTENT, payload: `You've happened on treasure, perhaps ${state?.weapons?.[0]?.influences?.[0]} is smiling upon you, ${gameState?.player?.name}. \n\n See what you've found?` });
                    await getTreasure();
                    setTimeout(() => {
                        gameDispatch({ type: GAME_ACTIONS.CLOSE_OVERLAY, payload: false });
                    }, 3000);
                    break;
                };
                case 'landmark': {
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Man-made landmarks, may have treasure, enemies, or npc's congregating` });
                    // Man-made landmarks, may have treasure, enemies, or npc's congregating.
                    await getLandmark();
                    break;
                };
                case 'hazard': {
                    // Natural hazards of the environment that when encountered, cause harmful effects akin to curses
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Natural hazards of the environment that when encountered, cause harmful effects akin to curses` });
                    await getHazard();
                    break;
                };
                case 'dungeon': {
                    // When prompted to enter, will create a new object map that extends the WorldMap as a 'Dungeon' object, with a new set of tiles and content
                    gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `Dungeons may refer to old, abandoned settlements sunk into this world. There may also be another reason` });
                    await getDungeon();
                    break;
                };
                case 'city': {
                    // This will need to be a modal that pops up with a list of options to choose from maybe?
                    // Also the occurences of the options will be things like going to a dueling arena perhaps to get opponents, checking certain shops that have tailored equipment fetching functions!
                    await getCity();
                    break;
                };
                default: {
                    console.log('No Content Found');
                    break;
                };
            };
        } catch (err: any) {
            console.log(err.message, 'Error Handling Tile Content');
        } finally {
            if (mapState.steps % 10 === 0 && mapState.steps !== 0) {
                gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've traveled ${mapState.steps} times. The world looks at you and breathes.` });
                // const response = moveContent(mapState, mapState.contentClusters, mapState.visitedTiles);
                // console.log(response, "Response Moving Content ?");
                mapDispatch({ type: MAP_ACTIONS.SET_MOVE_CONTENT, payload: mapState });
            };
        };
    };

    useEffect(() => {
        // console.log(mapState.currentTile, 'Current Tile?')
        if (mapState?.currentTile?.content === 'nothing') {
            if (gameState.cityButton) {
                gameDispatch({ type: GAME_ACTIONS.SET_LEAVE_CITY, payload: false });
                // setBackground(getPlayerBackground);
                setBackground({
                    ...background,
                    'background': getPlayerBackground.background
                });
            };
            if (mapState.steps % 10 === 0 && mapState.steps !== 0) {
                gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `You've traveled ${mapState.steps} times. The world looks at you and breathes.` });
                // const response = moveContent(mapState, mapState.contentClusters, mapState.visitedTiles);
                // console.log(response, "Response Moving Content ?");
                mapDispatch({ type: MAP_ACTIONS.SET_MOVE_CONTENT, payload: mapState })
            } else {
                gameDispatch({ type: GAME_ACTIONS.SET_STORY_CONTENT, payload: `` });
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "You continue moving through your surroundings and find nothing of interest in your path, yet the world itself seems to be watching you."
                });
            };
            return;
        };
        handleTileContent(mapState.currentTile.content, mapState.lastTile.content);
    }, [mapState.currentTile]);

    useEffect(() => {
        if (gameState.lootRoll === false || state.player_win === false) return;
        getOneLootDrop(state.computer.level);
        return () => {
            gameDispatch({ type: GAME_ACTIONS.LOOT_ROLL, payload: false });
        };
    }, [gameState.lootRoll, state.player_win]);
    
    const getOneLootDrop = async (level: number) => {
        try {
            let response = await eqpAPI.getLootDrop(level);
            gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP, payload: response.data[0] });
            let roll = Math.floor(Math.random() * 100) + 1;
            if (roll <= 25) {
                let second = await eqpAPI.getLootDrop(level);
                gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP_TWO, payload: second.data[0] });
            } else {
                gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP_TWO, payload: null });
            };
            gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error Getting Loot Drop');
        };
    };
    
    // useEffect(() => {
    //     if (state.highScore > gameState.player.high_score) {
    //         updateHighScore();
    //     } else {
    //         return;
    //     }
    // }, [state.highScore]);

    const updateHighScore = async () => {
        try {
            const response = await asceanAPI.highScore({
                'asceanId': gameState.player._id,
                'highScore': state.highScore
            });
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: firstResponse.data });
        } catch (err: any) {
            console.log(err.message, 'Error Updating High Score');
        };
    };

    function handleAction(action: any) {
        playActionButton();
        dispatch({
            type: ACTIONS.SET_COMBAT_ACTION,
            payload: action.target.value
        });
        setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
    };

    function handleCounter(counter: any) {
        playActionButton();
        dispatch({
            type: ACTIONS.SET_COMBAT_COUNTER,
            payload: counter.target.value
        });
        setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
    };

    async function setWeaponOrder(weapon: any) {
        try {
            const findWeapon = state.weapons.filter((weap: { name: any; }) => weap?.name === weapon.target.value);
            const newWeaponOrder = async () => state?.weapons.sort((a: any, b: any) => {
                return ( a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0 )
            });
            const response = await newWeaponOrder();
            playWO();
            dispatch({
                type: ACTIONS.SET_WEAPON_ORDER,
                payload: response
            });
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Weapon Order');
        };
    };

    async function setDamageType(damageType: any) {
        try {    
            playWO();
            dispatch({
                type: ACTIONS.SET_DAMAGE_TYPE,
                payload: damageType.target.value
            });
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Damage Type');
        };
    };

    async function setPrayerBlessing(prayer: any) {
        try {
            playWO();
            dispatch({
                type: ACTIONS.SET_PRAYER_BLESSING,
                payload: prayer.target.value
            });
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
        } catch (err: any) {
            console.log(err.message, 'Error Setting Prayer');
        };
    };

    async function soundEffects(effects: any) {
        try {
            if (effects.critical_success === true) {
                switch (effects.player_damage_type) {
                    case 'Spooky': {
                        playDaethic();
                        break;
                    };
                    case 'Righteous': {
                        playDaethic();
                        break;
                    };
                    case 'Wild': {
                        playWild();
                        break;
                    };
                    case 'Earth': {
                        playEarth();
                        break;
                    };
                    case 'Fire': {
                        playFire();
                        break;
                    };
                    case 'Frost': {
                        playFrost();
                        break;
                    };
                    case 'Lightning': {
                        playLightning();
                        break;
                    };
                    case 'Sorcery': {
                        playSorcery();
                        break;
                    };
                    case 'Wind': {
                        playWind();
                        break;
                    };
                    case 'Pierce': {
                        if (effects.weapons[0].type === 'Bow') {
                            playBow();
                            break;
                        } else {
                            playPierce();
                            break;
                        }
                    };
                    case 'Slash': {
                        playSlash();
                        break;
                    };
                    case 'Blunt': {
                        playBlunt();
                        break;
                    };
                    default: {
                        break;
                    };
                }
            }
            if (effects.religious_success === true) {
                playReligion();
            };
            if (effects.roll_success === true || effects.computer_roll_success === true) {
                playRoll();
            };
            if (effects.counter_success === true || effects.computer_counter_success === true) {
                playCounter();
            };
            setTimeout(() => {
                playCombatRound();
            }, 500)
        } catch (err: any) {
            console.log(err.message, 'Error Setting Sound Effects')
        };
    };

    async function handlePlayerWin(combatData: any) {
        try {
            if (mapState?.currentTile?.content === 'city') {
                playWin();
            } else {
                playReligion();
            };
            gainExperience();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            setTimeout(() => {
                setTimeLeft(0);
                dispatch({
                    type: ACTIONS.PLAYER_WIN,
                    payload: combatData
                });
                if (mapState?.currentTile?.content !== 'city') {
                    gameDispatch({ type: GAME_ACTIONS.LOOT_ROLL, payload: true });
                };
                if (gameState.opponent.name === "Wolf") {
                    clearOpponent();
                }
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleComputerWin(combatData: any) {
        try {
            playDeath();
            gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: true });
            gameDispatch({ type: GAME_ACTIONS.SET_COMBAT_OVERLAY_TEXT, payload: `You have lost the battle to ${gameState?.opponent?.name}, yet still there is always Achre for you to gain.` })
            setTimeout(() => {
                setTimeLeft(0);
                dispatch({
                    type: ACTIONS.COMPUTER_WIN,
                    payload: combatData
                });
                if (gameState.opponent.name === "Wolf") {
                    clearOpponent();
                }
                gameDispatch({ type: GAME_ACTIONS.LOADING_COMBAT_OVERLAY, payload: false });
            }, 6000);
        } catch (err: any) {
            console.log("Error Handling Player Win");
        };
    };

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            if (state.action === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose An Action!\n`]);
                return;
            };
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            const response = await gameAPI.initiateAction(state);
            // console.log(response.data, 'Response Initiating Combat');
            dispatch({
                type: ACTIONS.INITIATE_COMBAT,
                payload: response.data
            });
            await soundEffects(response.data);
            if (response.data.player_win === true) {
                await handlePlayerWin(response.data);
            };
            if (response.data.computer_win === true) {
                await handleComputerWin(response.data);
            };
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        };
    };

    const resetAscean = async () => {
        try {
            gameDispatch({ type: GAME_ACTIONS.CHECK_LOOT, payload: true });
            if (state.current_player_health <= 0 || state.new_player_health <= 0) {
                dispatch({
                    type: ACTIONS.RESET_COMPUTER,
                    payload: state
                });
            } else {
                dispatch({
                    type: ACTIONS.RESET_COMPUTER,
                    payload: state,
                });
            };
            playReplay();
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        };
    };

    useEffect(() => {
        if (gameState?.player?.origin && background.background === '') {
            setBackground({
                ...background,
                'background': getPlayerBackground.background
            });
        };
    }, [gameState?.player]);
    
    const getPlayerBackground = {
        background: "url(" + getBackgroundStyle(gameState?.player.origin) + ")",
    };

    const getCityBackground = {
        background: "url(" + process.env.PUBLIC_URL + `/images/city_2.jpg` + ")",
    };	

    function getBackgroundStyle(origin: string) {
        const num = Math.floor(Math.random() * 3) + 1;
        switch (origin) {
            case 'Ashtre':
                return process.env.PUBLIC_URL + `/images/astralands_${num}.jpg`;
            case 'Fyers':
                return process.env.PUBLIC_URL + `/images/firelands_${num}.jpg`;
            case "Li'ivi":
                return process.env.PUBLIC_URL + `/images/licivitas_${num}.jpg`;
            case "Notheo":
                return process.env.PUBLIC_URL + `/images/kingdom_${num}.jpg`;
            case "Nothos":
                return process.env.PUBLIC_URL + `/images/soverains_${num}.jpg`;
            case "Quor'eite":
                return process.env.PUBLIC_URL + `/images/sedyrus_${num}.jpg`;
            case 'Sedyreal':
                return process.env.PUBLIC_URL + `/images/sedyrus_${num}.jpg`;
        };
    };
      
    function sleep(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    };

    if (gameState.loading || gameState.loadingAscean) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <Container fluid id="game-container" style={ background }>
            { gameState.opponent ?
                <>
                <GameAscean state={state} ascean={gameState.opponent} totalPlayerHealth={state.computer_health} loading={gameState.loadingOpponent} player={false} currentPlayerHealth={state.new_computer_health} />
                <CombatOverlay 
                    ascean={gameState.player} enemy={gameState.opponent} playerWin={state.player_win} computerWin={state.computer_win} playerCritical={state.critical_success} computerCritical={state.computer_critical_success}
                    playerAction={state.player_action} computerAction={state.computer_action} playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_computer_damage} 
                    rollSuccess={state.roll_success} computerRollSuccess={state.computer_roll_success} counterSuccess={state.counter_success} computerCounterSuccess={state.computer_counter_success}
                    loadingCombatOverlay={gameState.loadingCombatOverlay} combatResolved={gameState.combatResolved} combatOverlayText={gameState.combatOverlayText}  gameDispatch={gameDispatch}
                />
                </>
            : '' }

            <GameConditions 
                setEmergencyText={setEmergencyText} dispatch={dispatch} state={state} soundEffects={soundEffects}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft} handlePlayerWin={handlePlayerWin} handleComputerWin={handleComputerWin}
            />
            
            <Settings 
                inventory={gameState.player.inventory} ascean={gameState.player} dispatch={dispatch} currentTile={mapState.currentTIle} saveAsceanCoords={saveAsceanCoords} 
                gameDispatch={gameDispatch} soundEffectsVolume={soundEffectVolume} setSoundEffectsVolume={setSoundEffectVolume} gameState={gameState} mapState={mapState}
            />
            
            { asceanState.ascean.experience === asceanState.experienceNeeded ?
                <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
            : '' }
            <GameAscean state={state} ascean={gameState.player} player={true} totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} loading={gameState.loadingAscean} />
            
            {/* TODO:FIXME: EVERYTHING THAT OCCURS SPECIFICALLY INSIDE OR OUTSIDE OF COMBAT NEEDS TO BE REFACTORED INTO THE BELOW */}
            {/* Enemies will probably automatically trigger combatEngaged, certain NPCs can be coaxed, certain enemies with higher disposition 
                will not start with combatEngaged, and allow other concepts like quests and overall world lore to occur */}
            { state.combatEngaged ? 
                <>
                    <GameAnimations 
                        playerCritical={state.critical_success} computerCritical={state.computer_critical_success}
                        playerAction={state.player_action} computerAction={state.computer_action} 
                        playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_computer_damage} 
                        rollSuccess={state.roll_success} computerRollSuccess={state.computer_roll_success} combatRound={state.combatRound}
                        counterSuccess={state.counter_success} computerCounterSuccess={state.computer_counter_success} combatEngaged={state.combatEngaged}
                    />
                    <GameActions 
                        setDamageType={setDamageType} dispatch={dispatch} state={state}
                        sleep={sleep} setPrayerBlessing={setPrayerBlessing}
                        weapons={state.weapons} damageType={state.weapons[0].damage_type} setWeaponOrder={setWeaponOrder}
                        handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} 
                        currentWeapon={state.weapons[0]} currentDamageType={state.player_damage_type} currentAction={state.action} currentCounter={state.counter_guess} 
                        setEmergencyText={setEmergencyText} timeLeft={timeLeft} setTimeLeft={setTimeLeft}
                    /> 
                    <GameCombatText 
                        emergencyText={emergencyText} combatRoundText={state.combatRound}
                        playerCombatText={state.player_action_description} computerCombatText={state.computer_action_description} 
                        playerActionText={state.player_start_description} computerActionText={state.computer_start_description}
                        playerDeathText={state.player_death_description} computerDeathText={state.computer_death_description}
                        playerSpecialText={state.player_special_description} computerSpecialText={state.computer_special_description}
                        playerReligiousText={state.player_influence_description} computerReligiousText={state.computer_influence_description}
                        playerReligiousTextTwo={state.player_influence_description_two} computerReligiousTextTwo={state.computer_influence_description_two}
                    />
                </>
            : 
                <>
                    <GameMap mapData={mapState} />
                    {/* TODO:FIXME: This will be the event modal, handling currentTIle content in this modal as a pop-up occurrence I believe TODO:FIXME: */}
                    { gameState.showDialog ?    
                        <DialogBox 
                            npc={gameState.opponent.name} dialog={gameState.dialog} dispatch={dispatch} state={state} deleteEquipment={deleteEquipment} currentIntent={gameState.currentIntent}
                            playerWin={state.player_win} computerWin={state.computer_win} ascean={gameState.player} enemy={gameState.opponent} itemSaved={gameState.itemSaved}
                            winStreak={state.winStreak} loseStreak={state.loseStreak} highScore={state.highScore} lootDropTwo={gameState.lootDropTwo}  generateWorld={generateWorld} mapState={mapState} mapDispatch={mapDispatch}
                            resetAscean={resetAscean} getOpponent={getOpponent} lootDrop={gameState.lootDrop} merchantEquipment={gameState.merchantEquipment} clearOpponent={clearOpponent}
                            gameDispatch={gameDispatch}
                        />
                    : '' }
                    { gameState.showInventory ?
                        <InventoryBag inventory={gameState.player.inventory} gameState={gameState} gameDispatch={gameDispatch} ascean={gameState.player} dispatch={dispatch} mapState={mapState}  />
                    : ""}
                    { gameState.opponent && mapState?.currentTile?.content !== 'city' ?
                        <Button variant='' className='dialog-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_DIALOG, payload: !gameState.showDialog })}>Dialog</Button>
                        : 
                        <>
                        <StoryBox ascean={gameState.player} mapState={mapState} storyContent={gameState.storyContent} />
                        <Joystick onDirectionChange={handleDirectionChange} debouncedHandleDirectionChange={debouncedHandleDirectionChange} />
                        <Button variant='' className='inventory-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_INVENTORY, payload: !gameState.showInventory })}>Inventory</Button>   
                        </>
                    }
                    { gameState.showCity ?
                        <CityBox 
                            state={state} dispatch={dispatch} ascean={gameState.player} mapState={mapState} enemy={gameState.opponent} merchantEquipment={gameState.merchantEquipment}
                            inventory={gameState.player.inventory} getOpponent={getOpponent} resetAscean={resetAscean} deleteEquipment={deleteEquipment}
                            cityOption={gameState.cityOption} clearOpponent={clearOpponent} gameDispatch={gameDispatch}
                        />
                        : ''
                    }
                    { gameState.cityButton ?
                        <Button variant='' className='city-button' onClick={() => gameDispatch({ type: GAME_ACTIONS.SET_SHOW_CITY, payload: !gameState.showCity })}>City</Button>
                        : ''
                    }
                </>
            }

            {
                mapState?.currentTile ?
                <>
                <Coordinates mapState={mapState} />
                <Content mapState={mapState} />
                </>
                : ''
            }
            <GameplayOverlay 
                ascean={gameState.player} mapState={mapState} mapDispatch={mapDispatch} loadingOverlay={gameState.loadingOverlay}
                generateWorld={generateWorld} saveWorld={saveWorld} overlayContent={gameState.overlayContent}
                loadingContent={gameState.loadingContent} gameDispatch={gameDispatch}
            />
            <GameplayEventModal 
                ascean={gameState.player} show={gameState.gameplayModal} gameplayEvent={gameState.gameplayEvent} deleteEquipment={deleteEquipment} gameDispatch={gameDispatch}
                lootDrop={gameState.lootDrop} lootDropTwo={gameState.lootDropTwo} itemSaved={gameState.itemSaved} mapDispatch={mapDispatch} mapState={mapState}
             />
        </Container>
    );
};

export default GameSolo;