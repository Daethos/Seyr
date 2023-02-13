import { useEffect, useState, useCallback, useReducer } from 'react'
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

interface Props {
    guest: any;
    handleLogout: () => void;
}

const GuestGame = ({ guest, handleLogout }: Props) => {
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [ascean, setAscean] = useState<any>({});
    const [opponent, setOpponent] = useState<any>({});
    const [opponents, setOpponents] = useState<any>([]);
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
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [showInventory, setShowInventory] = useState<boolean>(false);
    const [eqpSwap, setEqpSwap] = useState<boolean>(false);
    const [checkLoot, setCheckLoot] = useState<boolean>(false);
    const [removeItem, setRemoveItem] = useState<boolean>(false);
    const [background, setBackground] = useState<any>(null);
    const [merchantEquipment, setMerchantEquipment] = useState<any>([]);

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


    const getAscean = async () => {
        setLoadingAscean(true);
        try {
            const guestData = {
                username: 'mirio',
                minLevel: 4,
                maxLevel: 6,
            };
            const firstResponse = await userService.getRandomEnemy(guestData);
            console.log(firstResponse, 'First Response')
            const response = await asceanAPI.getAsceanStats(firstResponse.data.ascean._id);
            console.log(response.data.data, 'Response')
            setAscean(response.data.data.ascean);

            dispatch({
                type: ACTIONS.SET_PLAYER,
                payload: response.data.data
            });
            let minLevel: number = 0;
            let maxLevel: number = 0;
            if (firstResponse.data.ascean.level < 3) {
                minLevel = 1;
                maxLevel = 3;
            } else if (firstResponse.data.ascean.level < 5) {
                minLevel = 2;
                maxLevel = 5;
            } else if (firstResponse.data.ascean.level < 8) {
                minLevel = 4;
                maxLevel = 10;
            } else if (firstResponse.data.ascean.level < 11) {
                minLevel = 6;
                maxLevel = 13;
            } else if (firstResponse.data.ascean.level < 14) {
                minLevel = 9;
                maxLevel = 16;
            } else if (firstResponse.data.ascean.level < 17) {
                minLevel = 12;
                maxLevel = 18;
            } else if (firstResponse.data.ascean.level <= 20) {
                minLevel = 15;
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
            const opponentResponse = await asceanAPI.getAsceanStats(secondResponse.data.ascean._id);
            console.log(opponentResponse.data.data, 'Opponent Response');
            setOpponent(selectedOpponent.data);
            dispatch({
                type: ACTIONS.SET_COMPUTER,
                payload: opponentResponse.data.data
            });
            playOpponent();
            setLoading(false);
            setLoadingAscean(false);
        } catch (err: any) {
            console.log(err.message, '<- Error in Getting an Ascean to Edit')
            setLoading(false)
        }
    }

    useEffect(() => {
        getAscean();
    }, [])

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
        setLoading(true);
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
            dispatch({
                type: ACTIONS.SET_NEW_COMPUTER,
                payload: response.data.data
            });
            playOpponent();
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        }
    }

    function handleAction(action: any) {
        dispatch({
            type: ACTIONS.SET_COMBAT_ACTION,
            payload: action.target.value
        })
        setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
    }

    function handleCounter(counter: any) {
        dispatch({
            type: ACTIONS.SET_COMBAT_COUNTER,
            payload: counter.target.value
        });
        setTimeLeft(timeLeft + 2 > 10 ? 10 : timeLeft + 2);
    }

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
        }
    }

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
    }

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
    }

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

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            if (state.action === '') {
                setEmergencyText([`You Forgot To Choose An Action!\n`]);
                return;
            };
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
                setLootRoll(true);
                dispatch({
                    type: ACTIONS.PLAYER_WIN,
                    payload: response.data
                });
                setTimeLeft(0);
            };
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

    const engageCombat = () => {
        dispatch({
            type: ACTIONS.SET_DUEL,
            payload: ''
        });
    };

    const resetAscean = async () => {
        try {
            dispatch({
                type: ACTIONS.RESET_PLAYER,
                payload: state
            });
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
    }, [ascean])
    

    const num = Math.floor(Math.random() * 3) + 1;
    const chance = Math.floor(Math.random() * 3) + 1;
    function getBackgroundStyle(origin: string) {
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
                rollSuccess={state.roll_success} computerRollSuccess={state.computer_roll_success}
                counterSuccess={state.counter_success} computerCounterSuccess={state.computer_counter_success}
            />
            <GameAscean state={state} ascean={opponent} totalPlayerHealth={state.computer_health} loading={loadingAscean} player={false} currentPlayerHealth={state.new_computer_health} />
            <GameConditions 
                setEmergencyText={setEmergencyText} dispatch={dispatch} state={state} soundEffects={soundEffects}
                playDeath={playDeath} setLootRoll={setLootRoll} playWin={playWin} timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            />
            <Button variant='' className='settings-button' style={{ color: 'gold' }} onClick={() => handleLogout()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg> Signup</Button>
            { !state.combatEngaged ?
                state.player_win ?
                <>
                <Button variant='' className='dialog-button' onClick={() => resetAscean()}>Reset</Button>
                <Button  variant='' className='inventory-button' onClick={() => getAscean()}>Re-Roll</Button>
                <Button variant='' className='combat-settings' style={{ gridColumnStart: 4, gridRowStart: 6}} onClick={() => getOpponent()}>New Opp</Button>
                </>
                : state.computer_win ?
                <>
                <Button variant='' className='dialog-button' onClick={() => resetAscean()}>Reset</Button>
                <Button variant='' className='inventory-button' onClick={() => getAscean()}>Re-Roll</Button>
                <Button variant='' className='combat-settings' style={{ gridColumnStart: 4, gridRowStart: 6}} onClick={() => getOpponent()}>New Opp</Button>
                </>
                :
                <>
                <Button variant='' className='dialog-button' onClick={() => engageCombat()}>Engage</Button>   
                {/* <Button variant='' className='combat-settings' style={{ gridColumnStart: 4, gridRowStart: 6}} onClick={() => getOpponent()}>New Opp</Button> */}
                </>
            : '' }
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
               emergencyText={emergencyText} combatRoundText={state.combatRound}
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

export default GuestGame