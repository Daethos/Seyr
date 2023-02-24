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
import { getNpcDialog } from '../../components/GameCompiler/Dialog';
import DialogBox from '../../game/DialogBox';
import Button from 'react-bootstrap/Button';
import InventoryBag from '../../components/GameCompiler/InventoryBag';
import { ACTIONS, CombatStore, initialCombatData } from '../../components/GameCompiler/CombatStore';
import { MAP_ACTIONS, MapStore, initialMapData, DIRECTIONS } from '../../components/GameCompiler/WorldStore';
import Settings from '../../components/GameCompiler/Settings';
import FirstCombatModal from '../../components/GameCompiler/FirstCombatModal';
import Alert from 'react-bootstrap/Alert';
import Joystick from '../../components/GameCompiler/Joystick';
import Coordinates from '../../components/GameCompiler/Coordinates';
import Overlay from 'react-bootstrap/Overlay';
import GameplayEventModal from '../../components/GameCompiler/GameplayEventModal';
import GameplayOverlay from '../../components/GameCompiler/GameplayOverlay';
import Content from '../../components/GameCompiler/Content';

interface GameProps {
    user: any;
};

const GameSolo = ({ user }: GameProps) => {
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [mapState, mapDispatch] = useReducer(MapStore, initialMapData);
    const [ascean, setAscean] = useState<any>({});
    const [opponent, setOpponent] = useState<any | null>(null);
    const [currentIntent, setCurrentIntent] = useState<any | null>('challenge');
    const [loadingOpponent, setLoadingOpponent] = useState<boolean>(false);
    const [opponents, setOpponents] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false);
    const [loadedAscean, setLoadedAscean] = useState<boolean>(false);
    const [emergencyText, setEmergencyText] = useState<any[]>([]);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [saveExp, setSaveExp] = useState<boolean>(false);
    const [dialog, setDialog] = useState<any>({});
    const [lootRoll, setLootRoll] = useState<boolean>(false);
    const [lootDrop, setLootDrop] = useState<any>([]);
    const [lootDropTwo, setLootDropTwo] = useState<any>([]);
    const [itemSaved, setItemSaved] = useState<boolean>(false);
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showInventory, setShowInventory] = useState<boolean>(false);
    const [eqpSwap, setEqpSwap] = useState<boolean>(false);
    const [checkLoot, setCheckLoot] = useState<boolean>(false);
    const [removeItem, setRemoveItem] = useState<boolean>(false);
    const [background, setBackground] = useState<any>(null);
    const [merchantEquipment, setMerchantEquipment] = useState<any>([]);
    const [soundEffectVolume, setSoundEffectVolume] = useState<number>(0.3);


    type Direction = keyof typeof DIRECTIONS;
    const [overlayContent, setOverlayContent] = useState<string>("");
    const [loadingOverlay, setLoadingOverlay] = useState<boolean>(false);
    const [loadingContent, setLoadingContent] = useState<boolean>(false);
    const overlayRef = useRef(null);
    const [gameplayModal, setGameplayModal] = useState<boolean>(false);
    const [gameplayEvent, setGameplayEvent] = useState({ title: "", description: "" });
    const [mapName, setMapName] = useState<string>('');
    const [cityButton, setCityButton] = useState<boolean>(false);
    const [showCity, setShowCity] = useState<boolean>(false);

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

    const { asceanID } = useParams();

    const [asceanState, setAsceanState] = useState({
        ascean: ascean,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        level: ascean.level,
        opponent: 0,
        opponentExp: 0,
        experience: ascean.experience,
        experienceNeeded: ascean.level * 1000,
        mastery: ascean.mastery,
        faith: ascean.faith,
    });

    const getAscean = useCallback(async () => {
        setLoadingAscean(true);
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
            console.log(firstResponse, 'First Response')
            const response = await asceanAPI.getAsceanStats(asceanID);
            console.log(response, 'Response');

            dispatch({
                type: ACTIONS.SET_PLAYER,
                payload: response.data.data
            });
            setLoadingAscean(false);
            // let minLevel: number = 0;
            // let maxLevel: number = 0;
            // if (firstResponse.data.level < 3) {
            //     minLevel = 1;
            //     maxLevel = 3;
            // } else if (firstResponse.data.level < 5) {
            //     minLevel = 2;
            //     maxLevel = 5;
            // } else if (firstResponse.data.level < 8) {
            //     minLevel = 4;
            //     maxLevel = 10;
            // } else if (firstResponse.data.level < 11) {
            //     minLevel = 6;
            //     maxLevel = 13;
            // } else if (firstResponse.data.level < 14) {
            //     minLevel = 9;
            //     maxLevel = 16;
            // } else if (firstResponse.data.level < 17) {
            //     minLevel = 12;
            //     maxLevel = 18;
            // } else if (firstResponse.data.level <= 20) {
            //     minLevel = 15;
            //     maxLevel = 20;
            // };
            // const enemyData = {
            //     username: 'mirio',
            //     minLevel: minLevel,
            //     maxLevel: maxLevel
            // };
            // const secondResponse = await userService.getRandomEnemy(enemyData);
            // console.log(secondResponse, 'Enemy Response');
            // const selectedOpponent = await asceanAPI.getOneAscean(secondResponse.data.ascean._id);
            // console.log(selectedOpponent, 'Selected Opponent');
            // const opponentResponse = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            // console.log(opponentResponse.data.data, 'Opponent Response');
            // setOpponent(selectedOpponent.data);
            setAsceanState({
                ...asceanState,
                'ascean': response.data.data.ascean,
                'level': response.data.data.ascean.level,
                // 'opponent': opponentResponse.data.data.ascean.level,
                'opponent': 0,
                'experience': 0,
                'experienceNeeded': response.data.data.ascean.level * 1000,
                'mastery': response.data.data.ascean.mastery,
                'faith': response.data.data.ascean.faith,
            });
            // dispatch({
            //     type: ACTIONS.SET_COMPUTER,
            //     payload: opponentResponse.data.data
            // });
            // playOpponent();
            setLoading(false);
            if (response.data.data.ascean.tutorial.firstBoot === true) setLoadingOverlay(true);
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        };
    }, [asceanID]);

    useEffect(() => {
        getAscean();
    }, [asceanID, getAscean]);

    useEffect(() => {
        getOpponentDialog();
    }, [opponent]);

    const getOpponentDialog = async () => {
        try {
            const response = getNpcDialog(opponent.name);
            setDialog(response);
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
        };
    };

    const getOpponent = async () => {
        setCheckLoot(true);
        setLoadingOpponent(true);
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
            setOpponent(selectedOpponent.data);
            setAsceanState({
                ...asceanState,
                'opponent': selectedOpponent.data.level,
            });
            dispatch({
                type: ACTIONS.SET_NEW_COMPUTER,
                payload: response.data.data
            });
            playOpponent();
            setLoadingOpponent(false);
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
        if (saveExp === false) return;
        console.log(asceanState, 'Ascean State');
        saveExperience();
        return () => {
            setSaveExp(false);
        };
    }, [asceanState, saveExp]);

    const saveExperience = async () => {
        if (saveExp === false || state.player_win === false) {
            return;
        };
        try {
            setEmergencyText([`You reflect on the moments of your duel with ${opponent.name} as you count your pouch of winnings.`]);

            const response = await asceanAPI.saveExperience(asceanState);
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
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
            };
            setSaveExp(false);
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
                setSaveExp(true);
            };
            if (asceanState.experienceNeeded > asceanState.ascean.experience + opponentExp) {
                setAsceanState({
                    ...asceanState,
                    'opponentExp': opponentExp,
                    'experience': Math.round(asceanState.experience + opponentExp),
                });
                setSaveExp(true);
            };
        } catch (err: any) {
            console.log(err.message, 'Error Gaining Experience')
        };
    };

    useEffect(() => {
        if (itemSaved === false) return;
        getAsceanQuickly();
        return () => {
            setItemSaved(false);
        };
    }, [itemSaved, state]);

    useEffect(() => {
        getAsceanSlicker();
      return () => {
        setEqpSwap(false);
      };
    }, [eqpSwap]);

    useEffect(() => {
      getAsceanSlicker();
    
      return () => {
        setRemoveItem(false);
      };
    }, [removeItem]);

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
            setAscean(firstResponse.data);
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
            setAscean(firstResponse.data);
            const response = await asceanAPI.getAsceanStats(asceanID);
            dispatch({
                type: ACTIONS.SET_PLAYER_SLICK,
                payload: response.data.data
            });
            setLoadedAscean(true);
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        };
    };

    const getAsceanQuickly = async () => {
        try {
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
            dispatch({
                type: ACTIONS.SET_PLAYER_QUICK,
                payload: firstResponse.data
            });
            setLoadedAscean(true);
        } catch (err: any) {
            console.log(err.message, 'Error Getting Ascean Quickly')
        };
    };

    const saveWorld = async () => {
        try {
            // const response = await mapAPI.saveNewMap(mapState);
            // console.log(response);
            setOverlayContent(`Good luck, ${ascean.name}, for no Ancient bears witness to it on your journey. Ponder what you wish to do in this world, without guidance but for your hands in arms. Enemies needn't stay such a way, yet a Good Lorian is a rare sight. Be whom you wish and do what you will, live and yearn for wonder in the ley, or scour cities if you have the coin. Pillage and strip ruins of their refuse, clear caves and dungeons of reclusive mercenaries, knights, druids, occultists, and more. The world doesn't need you, the world doesn't want you. The world's heroes are long dead millenia prior when the Ancients fell. Many have sought to join these legends best they could, and in praise erected the honors of the Ascea, a season long festival of competiive athletic, intellectual, and poetic skills to to be judged in the manner of the Ancients before as an Ascean, worthy, vying to be crowned the va'Esai, to achieve the moniker, 'Worthy of the Preservation of Being.' Whatever you seek in this world, if you wish it so, it starts with the Ascea.`);
            setLoadingContent(true);
            // setLoadingOverlay(false);
            // setting loading overylay to false will trigger the overlay to close but I need to wait a solid 3 seconds before it does so.
            setTimeout(() => {
                setOverlayContent('');
                setLoadingOverlay(false);
                setLoadingContent(false);
            }, 60000);
        } catch (err: any) {
            console.log(err.message, 'Error Saving World');
        };
    };

    const saveAsceanCoords = async (x: number, y: number) => {
        try {
            const data = {
                ascean: ascean._id, 
                coordinates: {
                    x: mapState.currentTile.x,
                   y: mapState.currentTile.y,
                }
            };
            // const response = await asceanAPI.saveAsceanCoords(data);
            // console.log(response, 'Response Saving Ascean Coordinates');
        } catch (err: any) {
            console.log(err.message, 'Error Saving Ascean Coordinates');
        };
    };

    const generateWorld = async (mapName: string) => {
        try {
            const data = {
                name: mapName,
                ascean: ascean,
            };
            const response = await mapAPI.createMap(data);
            console.log(response, 'Response Generating World Environment.');
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_DATA,
                payload: response
            });
            const coords = await getAsceanCoords(ascean?.coordinates?.x, ascean?.coordinates?.y, response.map);
            console.log(coords, "Coordinates?")
            mapDispatch({
                type: MAP_ACTIONS.SET_MAP_COORDS,
                payload: coords,
            })
        } catch (err: any) {
            console.log(err.message, 'Error Generating World Environment.');
        };
    };

    const chanceEncounter = async () => {
        try {
            const chance = Math.floor(Math.random() * 100) + 1;
            console.log(chance, 'Chance Encounter');
            if (chance > 99) {
                await getDungeon();
            } else if (chance > 98) {
                await getCave();
            } else if (chance > 97) {
                await getWonder();
            } else if (chance > 96) {
                await getRuins();
            } else if (chance > 95) {
                await getLandmark();
            } else if (chance > 92) {
                await getTreasure();
            } else if (chance > 81) {
                await getOpponent();
            } else if (chance > 70) {
                await getNPC();
            } else {
                console.log("No Encounter");
            }

        } catch (err: any) {
            console.log(err.message, 'Error Encountering Chance Encounter');
        }
    };

    const handleDirectionChange = async (direction: Direction) => {
        console.log(direction, "Is There A Direction?");
        const offset = DIRECTIONS[direction];
        console.log(offset, "Is There An Offset?");
        if (offset) {
          const newX = mapState.currentTile.x + offset.x;
          const newY = mapState.currentTile.y + offset.y;
          if (newX >= -100 && newX <= 100 && newY >= -100 && newY <= 100) {
            const newTile = await getAsceanCoords(newX, newY, mapState.map);
            mapDispatch({
              type: MAP_ACTIONS.SET_MAP_COORDS,
              payload: newTile,
            });
          }
        }
      };
      
      function debounce<T>(func: (this: T, ...args: any[]) => void, delay: number): (this: T, ...args: any[]) => void {
        let timer: ReturnType<typeof setTimeout>;
        return function (this: T, ...args: any[]) {
          clearTimeout(timer);
          timer = setTimeout(() => func.apply(this, args), delay);
        };
      }
      
    
    const debouncedHandleDirectionChange = debounce(handleDirectionChange, 100);

    async function getAsceanCoords(x: number, y: number, map: any) {
        // Access the tile object at the specified coordinates in the map
        const tile = map?.[x + 100]?.[y + 100];
        
        // Return the tile object or null if the coordinates are out of bounds
        return tile ?? null;
    }

    const getPhenomena = async () => {

    };

    const getWeather = async (province: string) => {
        switch (province) {
            case 'Alluring Isles': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Increment jungle weighs your steps, succumbing to the dense and undisturbed natural wonder. -10% to rolls, critical strikes."
                });
                break;
            };
            case 'Astralands': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Lightning strikes surround a swirl of heavy, bleeding clouds. A good day for Astra."
                });
                break;
            };
            case 'Fangs': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Soft, frothing fog surrounds the area. -10% damage from ranged attacks"
                });
                break;
            };
            case 'Firelands': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "It's bright and sunny, just absolute beautiful weather. +10% damage to all attacks"
                });
                break;
            };
            case 'Kingdom': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Snowfall gathers and the winds greet you with shrill smiles. +10% damage to all magic attacks. -10% damage to all physical attacks."
                });
                break;
            };
            case 'Licivitas': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Slick weather draws palpable breaths as you embark across the plains. +5% to rolls, critical strikes."
                });
                break;
            };
            case 'Sedyrus': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "Harsh desert. +10% damage to all attacks"
                });
                break;
            };
            case 'Soverains': {
                mapDispatch({
                    type: MAP_ACTIONS.SET_MAP_CONTEXT,
                    payload: "It's bright and sunny, just absolute beautiful weather. +10% damage to all attacks"
                });
                break;
            };
        };
    };

    const getNPC = async () => {
        console.log("You would have gotten an NPC here.")
    };

    const getWonder = async () => {

    };

    const getTreasure = async () => {
        setGameplayEvent({
            title: "Treasure!",
            description: `${ascean.name} found a treasure chest!`,
        });
        await getOneLootDrop(ascean.level);
        setGameplayModal(true);
    };

    const getLandmark = async () => {

    };

    const getHazard = async () => {

    };

    const getCave = async () => {

    };
    const getRuins = async () => {

    };
    const getDungeon = async () => {
        console.log("You Are In A Dungeon")
        // This will be a probabilistic roll of random dungeons that affect gameplay, similar to environmental effects. May last for some time.
    };
    const getCity = async () => {
        console.log("You Are In The City")
        // This will be a probabilistic roll of random cities that affect gameplay, similar to environmental effects. May last for some time.
        setCityButton(true);
    };
    const handleTileContent = async (content: string) => {
        try {
            switch (content) {
                case 'enemy': {
                    await getOpponent();
                    break;
                };
                case 'npc': {
                    await getNPC(); // Will end up being getNPC() so it knows it's not for combat with different dialog and such as well. Enemies =/= NPCs
                    break;
                };
                case 'phenomena': {
                    // This will be a probabilistic roll of random supernatural occurrences that affect gameplay, similar to environmental effects. May last for some time.
                    await getPhenomena();
                    break;
                };
                case 'wonder': {
                    // Natural wonders of the world environment, may grant boons or blessings when encountered, or perhaps be where enemies or npc's congregate
                    await getWonder(); 
                    break;
                };
                case 'ruins': {
                    // Decay of civilizations from the past, may have scavengers or treasure probabilistically determined
                    await getRuins();
                    break;
                };
                case 'cave': {
                    // When prompted to enter, will create a new object map that extends the WorldMap as a 'Cave' object, with a new set of tiles and content
                    await getCave();
                    break;
                };
                case 'weather': {
                    // Weather is simply an occurrence in nature and can still precipiate other events such as enemies, treasure, landmarks, hazards, dungeons, cities, etc.
                    console.log("It's the Weather!");
                    await getWeather(mapState.province);
                    await chanceEncounter();
                    break;
                };
                case 'treasure': {
                    // This will be the getLoot() function that will be called to get the loot from the tile, probably a modal that pops up with the loot and a button to get it. 1-3 items per tile
                    await getTreasure();
                    break;
                };
                case 'landmark': {
                    // Man-made landmarks, may have treasure, enemies, or npc's congregating.
                    await getLandmark();
                    break;
                };
                case 'hazard': {
                    // Natural hazards of the environment that when encountered, cause harmful effects akin to curses
                    await getHazard();
                    break;
                };
                case 'dungeon': {
                    // When prompted to enter, will create a new object map that extends the WorldMap as a 'Dungeon' object, with a new set of tiles and content
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
        }
    };

    useEffect(() => {
        console.log(mapState.currentTile, 'Current Tile?')
        if (mapState?.currentTile?.content === 'nothing') return;
        handleTileContent(mapState.currentTile.content);
    }, [mapState.currentTile])

    useEffect(() => {
        if (lootRoll === false || state.player_win === false) return;
        getOneLootDrop(state.computer.level);
        return () => {
            setLootRoll(false);
        }
    }, [lootRoll, state.player_win]);
    
    const getOneLootDrop = async (level: number) => {
        try {
            let response = await eqpAPI.getLootDrop(level);
            setLootDrop(response.data[0]);
            let roll = Math.floor(Math.random() * 100) + 1;
            if (roll <= 25) {
                let second = await eqpAPI.getLootDrop(level);
                setLootDropTwo(second.data[0]);
            } else {
                setLootDropTwo(null);
            }
            setItemSaved(false);
        } catch (err: any) {
            console.log(err.message, 'Error Getting Loot Drop')
        };
    };
    
    useEffect(() => {
        if (state.highScore > ascean.high_score) {
            updateHighScore();
        } else {
            return;
        }
    }, [state.highScore]);

    const updateHighScore = async () => {
        try {
            const response = await asceanAPI.highScore({
                'asceanId': ascean._id,
                'highScore': state.highScore
            });
            const firstResponse = await asceanAPI.getOneAscean(asceanID);
            setAscean(firstResponse.data);
        } catch (err: any) {
            console.log(err.message, 'Error Updating High Score')
        }
    };

    function handleAction(action: any) {
        dispatch({
            type: ACTIONS.SET_COMBAT_ACTION,
            payload: action.target.value
        })
        setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
    };

    function handleCounter(counter: any) {
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
            console.log(err.message, 'Error Setting Weapon Order')
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
            console.log(err.message, 'Error Setting Damage Type')
        }
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
            console.log(err.message, 'Error Setting Prayer')
        }
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
            }
            
            if (effects.roll_success === true || effects.computer_roll_success === true) {
                playRoll();
            }
            
            if (effects.counter_success === true || effects.computer_counter_success === true) {
                playCounter();
            }
            
        } catch (err: any) {
            console.log(err.message, 'Error Setting Sound Effects')
        }
    };

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault()
        try {
            if (state.action === '') {
                setEmergencyText([`${user.username.charAt(0).toUpperCase() + user.username.slice(1)}, You Forgot To Choose An Action!\n`]);
                return;
            }
            setEmergencyText([``]);
            setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
            const response = await gameAPI.initiateAction(state);
            console.log(response.data, 'Response Initiating Combat');
            dispatch({
                type: ACTIONS.INITIATE_COMBAT,
                payload: response.data
            });
            await soundEffects(response.data);
            if (response.data.player_win === true) {
                playWin();
                gainExperience();
                setLootRoll(true);
                dispatch({
                    type: ACTIONS.PLAYER_WIN,
                    payload: response.data
                });
                setTimeLeft(0);
            }
            if (response.data.computer_win === true) {
                playDeath();
                dispatch({
                    type: ACTIONS.COMPUTER_WIN,
                    payload: response.data
                });
                setTimeLeft(0);
            }
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action')
        };
    };

    const resetAscean = async () => {
        try {
            setCheckLoot(true);
            if (state.current_player_health <= 0 || state.new_player_health <= 0) {
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
            playReplay();
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        };
    };

    useEffect(() => {
        if (ascean?.origin && background === null) {
            const getPlayerBackground = {
                background: "url(" + getBackgroundStyle(ascean.origin) + ")",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            };
            setBackground(getPlayerBackground);
        }
    }, [ascean]);
    

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

    if (loading || loadingAscean) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <Container fluid id="game-container" style={ background }>
            {
                opponent ?
                <GameAscean state={state} ascean={opponent} totalPlayerHealth={state.computer_health} loading={loadingOpponent} player={false} currentPlayerHealth={state.new_computer_health} />
                : ''
            }

            <GameConditions 
                setEmergencyText={setEmergencyText} dispatch={dispatch} state={state} gainExperience={gainExperience} soundEffects={soundEffects}
                playDeath={playDeath} setLootRoll={setLootRoll} playWin={playWin} timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            />

            { showInventory ?
                <InventoryBag inventory={ascean.inventory} ascean={ascean} eqpSwap={eqpSwap} removeItem={removeItem} setEqpSwap={setEqpSwap} setRemoveItem={setRemoveItem} loadedAscean={loadedAscean} setLoadedAscean={setLoadedAscean} />
            : ""}
            
            <Settings inventory={ascean.inventory} ascean={ascean} currentTile={mapState.currentTIle} saveAsceanCoords={saveAsceanCoords} eqpSwap={eqpSwap} removeItem={removeItem} setEqpSwap={setEqpSwap} setRemoveItem={setRemoveItem} loadedAscean={loadedAscean} setLoadedAscean={setLoadedAscean} soundEffectsVolume={soundEffectVolume} setSoundEffectsVolume={setSoundEffectVolume} />
            
            { asceanState.ascean.experience === asceanState.experienceNeeded ?
                <LevelUpModal asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean} />
            : '' }
            <GameAscean state={state} ascean={ascean} player={true} totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} loading={loadingAscean} />
            
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
                    {/* TODO:FIXME: This will be the event modal, handling currentTIle content in this modal as a pop-up occurrence I believe TODO:FIXME: */}
                    { showDialog ?    
                        <DialogBox 
                            npc={opponent.name} dialog={dialog} dispatch={dispatch} state={state} checkLoot={checkLoot} setCheckLoot={setCheckLoot} deleteEquipment={deleteEquipment} currentIntent={currentIntent} setCurrentIntent={setCurrentIntent}
                            playerWin={state.player_win} computerWin={state.computer_win} ascean={ascean} enemy={opponent} itemSaved={itemSaved} setItemSaved={setItemSaved}
                            winStreak={state.winStreak} loseStreak={state.loseStreak} highScore={state.highScore} lootDropTwo={lootDropTwo} setLootDropTwo={setLootDropTwo} generateWorld={generateWorld} mapState={mapState} mapDispatch={mapDispatch}
                            resetAscean={resetAscean} getOpponent={getOpponent} lootDrop={lootDrop} setLootDrop={setLootDrop} merchantEquipment={merchantEquipment} setMerchantEquipment={setMerchantEquipment}
                        />
                    : '' }
                    {
                        opponent ?
                        <Button variant='' className='dialog-button' onClick={() => setShowDialog(!showDialog)}>Dialog</Button>
                        : ''
                    }
                    {
                        showCity ?
                        ''
                        : ''
                    }
                    {
                        cityButton ?
                        <Button variant='' className='city-button' onClick={() => setShowCity(!showCity)}>City</Button>
                        : ''
                    }
                    <Button variant='' className='inventory-button' onClick={() => setShowInventory(!showInventory)}>Inventory</Button>   
                    <Joystick onDirectionChange={debouncedHandleDirectionChange} debouncedHandleDirectionChange={debouncedHandleDirectionChange} />
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
                ascean={ascean} mapState={mapState} mapDispatch={mapDispatch} loadingOverlay={loadingOverlay} setLoadingOverlay={setLoadingOverlay} 
                generateWorld={generateWorld} saveWorld={saveWorld} overlayContent={overlayContent} setOverlayContent={setOverlayContent}
                loadingContent={loadingContent} setLoadingContent={setLoadingContent}    
            />
            <GameplayEventModal 
                ascean={ascean} show={gameplayModal} setShow={setGameplayModal} gameplayEvent={gameplayEvent} deleteEquipment={deleteEquipment}
                lootDrop={lootDrop} setLootDrop={setLootDrop} lootDropTwo={lootDropTwo} setLootDropTwo={setLootDropTwo} itemSaved={itemSaved} setItemSaved={setItemSaved}
             />
        </Container>
    );
};

export default GameSolo;