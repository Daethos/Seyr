import { useEffect, useRef, useState } from 'react'
import './GamePvP.css'
import Loading from '../../components/Loading/Loading'; 
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import useSound from 'use-sound'
import PvPAscean from '../../components/GameCompiler/PvPAscean';
import PvPConditions from '../../components/GameCompiler/PvPConditions';
import PvPCombatText from '../../components/GameCompiler/PvPCombatText';
import PvPActions from '../../components/GameCompiler/PvPActions';
import PVPAnimations from '../../components/GameCompiler/PvPAnimations';
import { ACTIONS, initialPvPData, PvPStore, PLAYER_ACTIONS, initialPlayerData, PlayerStore, PvPData, PlayerData } from '../../components/GameCompiler/PvPStore';
import useGameSounds from '../../components/GameCompiler/Sounds';
import { MAP_ACTIONS, MapStore, initialMapData, DIRECTIONS, MapData } from '../../components/GameCompiler/WorldStore';
import GameMap from '../../components/GameCompiler/GameMap';

export enum MapMode {
    FULL_MAP,
    QUADRANT,
    SURROUNDING_TILES,
    TIGHT,
};

interface GameProps {
    state: PvPData;
    dispatch: any;
    playerState: PlayerData;
    playerDispatch: any;
    mapState: MapData;
    mapDispatch: any;
    user: any;
    ascean: any;
    opponent: any;
    room: any;
    socket: any;
    setModalShow: any;
    enemyPlayer: any;
    yourData: any;
    enemyData: any;
    spectator: boolean;
};

const GamePvP = ({ state, dispatch, playerState, playerDispatch, mapState, mapDispatch, user, ascean, opponent, spectator, room, socket, setModalShow, enemyPlayer, yourData, enemyData }: GameProps) => {
    const [loading, setLoading] = useState(false);
    const [loadingAscean, setLoadingAscean] = useState<boolean>(false)
    const [emergencyText, setEmergencyText] = useState<any[]>([])
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [mapMode, setMapMode] = useState<MapMode>(MapMode.FULL_MAP);
    const [vibrationTime, setVibrationTime] = useState<number>(100);
    const [canvasPosition, setCanvasPosition] = useState<{ x: number; y: number }>({ x: 0.125, y: 1.75 });
    const [canvasWidth, setCanvasWidth] = useState<number>(400);
    const [canvasHeight, setCanvasHeight] = useState<number>(400);
    const [soundEffectVolume, setSoundEffectVolume] = useState<number>(0.3);
    const [joystickSpeed, setJoystickSpeed] = useState<number>(150);
    const { playOpponent, playWO, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReplay, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9, playMerchant, playDungeon, playPhenomena, playTreasure, playActionButton, playCombatRound } = useGameSounds(soundEffectVolume);
    

    function handleAction(action: any) {
        console.log(action.target.value, '<- Action being handled');
        setTimeLeft(10);
    };

    function handleCounter(counter: any) {
        console.log(counter.target.value, 'New Counter');
        setTimeLeft(10);
    };

    async function setWeaponOrder(weapon: any) {
        let weapons: any[];
        weapons = state.weapons;
        const findWeapon = weapons.filter(
            (weap: { name: any; }) => weap?.name === weapon.target.value
        );
        const newWeaponOrder = async () => weapons.sort((a: any, b: any) => {
            return (
                a.name === findWeapon[0].name ? -1 : b.name === findWeapon[0].name ? 1 : 0
            );
        });
        const response = await newWeaponOrder();
        setTimeLeft(10);
        playWO();
    }

    async function setDamageType(damageType: any) {
        console.log(damageType.target.value, '<- Damage Type')
        setTimeLeft(10);
        playWO();
        
    }

    async function handleInitiate(e: { preventDefault: () => void; }) {
        e.preventDefault()
       
        try {
            setEmergencyText([``]);
            setTimeLeft(10);
            await socket.emit(`initiated`, state);
            console.log(state, 'Socket Emit Combat Data');
        } catch (err: any) {
            console.log(err.message, 'Error Initiating Action');
        };
    };

    const resetAscean = async () => {
        try {
            await socket.emit(`request_reduel`, state);
           
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Ascean')
        };
    };

    // TODO:FIXME: Send it via like an auto-engage to update both peoples combatData to check for both player's initiation of actions

    useEffect(() => {
        socket.on(`combat_response`, (response: any) => {
            console.log('Combat Response!')
            statusUpdate(response)
        });
    }, []);

    const [reduelRequest, setReduelRequest] = useState<boolean>(false);

    useEffect(() => {
        socket.on(`reduel_requested`, async (newData: any) => {
        });
    });

    useEffect(() => {
        socket.on(`reset_duel`, async () => {
            console.log('Duel Resetting');
            await resetCombat();
        });
    }, []);

    const resetCombat = async () => {
        try {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
        } catch (err: any) {
            console.log(err.message, 'Error Resetting Combat');
        };
    };

    useEffect(() => {
        socket.on(`soft_response`, (response: any) => {
            console.log(`Soft Response`);
            softUpdate(response);
        });
    });

    const softUpdate = async (response: any) => {
        try {
            setLoading(true);
            setTimeLeft(10);
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error Performing Soft Update');
        };
    };
    
    const statusUpdate = async (response: any) => {
        console.log(yourData.player, 'Which player are you?');
        try {
            setLoading(true);
            console.log(response, 'Response Auto Engaging');
            
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error Updating Status')
        };
    };

    function sleep(ms: number) {
        return new Promise(
            resolve => setTimeout(resolve, ms)
        );
    };

    if (loadingAscean || loading) {
        return (
            <Loading Combat={true} />
        );
    };

    return (
        <Container fluid id="game-container" >
            <GameMap 
                mapData={mapState} canvasRef={canvasRef} canvasPosition={canvasPosition} setCanvasPosition={setCanvasPosition} 
                canvasHeight={canvasHeight} canvasWidth={canvasWidth} setCanvasHeight={setCanvasHeight} setCanvasWidth={setCanvasWidth}
                mapMode={mapMode} setMapMode={setMapMode}
            />
            {/* <PVPAnimations 
                sleep={sleep} 
                playerCritical={yourData.player === 1 ? combatData.player_one_critical_success : combatData.player_two_critical_success} 
                computerCritical={enemyData.player === 2 ? combatData.player_two_critical_success : combatData.player_one_critical_success}
                combatInitiated={combatInitiated} setCombatInitiated={setCombatInitiated} 
                playerAction={yourData.player === 1 ? combatData.player_one_action : combatData.player_two_action} 

                computerAction={enemyData.player === 2 ? combatData.player_two_action : combatData.player_one_action} 
                playerDamageTotal={yourData.player === 1 ? combatData.realized_player_one_damage : combatData.realized_player_two_damage} 

                computerDamageTotal={enemyData.player === 2 ? combatData.realized_player_two_damage : combatData.realized_player_one_damage} 
                roll_success={yourData.player === 1 ? combatData.player_one_roll_success : combatData.player_two_roll_success} 

                computer_roll_success={enemyData.player === 2 ? combatData.player_two_roll_success : combatData.player_one_counter_success}
                counterSuccess={yourData.player === 1 ? combatData.player_one_counter_success : combatData.player_two_counter_success} 

                computerCounterSuccess={enemyData.player === 2 ? combatData.player_two_counter_success : combatData.player_one_counter_success}
            /> */}
                {/* <PvPAscean ascean={enemyData.ascean} PvP={true} 
                    loading={loadingAscean} yourData={yourData} enemyData={enemyData}
                    undefined={undefinedStats} setUndefined={setUndefinedStats} 
                    undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} 
                    player={false} combatData={combatData} currentPlayerHealth={enemyData.player === 2 ? currentPlayerTwoHealth : currentPlayerOneHealth} /> */}
            {/* <PvPConditions 
                combatData ={combatData} setCombatData={setCombatData} setEmergencyText={setEmergencyText} reduelRequest={reduelRequest}
                setCurrentPlayerHealth={yourData.player === 1 ? setCurrentPlayerOneHealth : setCurrentPlayerTwoHealth} 
                setCurrentComputerHealth={enemyData.player === 2 ? setCurrentPlayerTwoHealth : setCurrentPlayerOneHealth}
                setPlayerWin={setPlayerWin} setComputerWin={setComputerWin} yourData={yourData} enemyData={enemyData}
                setWinStreak={setWinStreak} setLoseStreak={setLoseStreak} playDeath={playDeath}
                playerWin={playerWin} computerWin={computerWin} playCounter={playCounter} playRoll={playRoll}
                winStreak={winStreak} loseStreak={loseStreak} setGameIsLive={setGameIsLive} highScore={highScore}
                resetAscean={resetAscean} gameIsLive={gameIsLive} setHighScore={setHighScore}
                playDaethic={playDaethic} playEarth={playEarth} playFire={playFire} playBow={playBow} playFrost={playFrost}
                playLightning={playLightning} playSorcery={playSorcery} playWind={playWind} playPierce={playPierce}
                playSlash={playSlash} playBlunt={playBlunt} playWin={playWin} playWild={playWild}
                playReligion={playReligion} setDodgeStatus={setDodgeStatus} socket={socket} freshCombatData={freshCombatData} setFreshCombatData={setFreshCombatData}
                timeLeft={timeLeft} setTimeLeft={setTimeLeft}
            /> */}
                {/* <PvPAscean ascean={ascean} PvP={true} player={true} yourData={yourData} enemyData={enemyData}
                    combatData={combatData} undefined={undefinedStats} 
                    setUndefined={setUndefinedStats} undefinedComputer={undefinedComputer} setUndefinedComputer={setUndefinedComputer} 
                    currentPlayerHealth={yourData.player === 1 ? currentPlayerOneHealth : currentPlayerTwoHealth} loading={loadingAscean} /> */}
            {/* <span style={{ float: 'right' }} id='chat-button'>
                <Button variant='outline-danger'
                    style={{ color: '#fdf6d8', borderRadius: 50 + '%',
                        marginTop: 46 + 'vh', 
                        marginLeft: 45 + 'vw',
                        border: 1.5 + 'px' + ' solid ' + 'red' 
                    }} 
                    onClick={() => setModalShow(true)}
                    >
                        {
                            spectator 
                            ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-smile-upside-down" viewBox="0 0 16 16">
                                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0-1a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"/>
                                <path d="M4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5z"/>
                            </svg>
                            : 
                            <img src={enemyData.user.photoUrl} alt={enemyData.user.username} style={{ width: 40 + 'px', height: 40 + 'px', borderRadius: 50 + '%' }} />
                        }
                </Button>
            </span> */}
            {/* { playerWin || computerWin ? '' : combatData?.player_one_weapons?.[0]?.name ?
            <PvPActions 
                setDodgeStatus={setDodgeStatus} actionStatus={actionStatus} setActionStatus={setActionStatus} PvP={true}
                state={state} sleep={sleep} dodgeStatus={dodgeStatus} yourData={yourData} enemyData={enemyData}
                weapons={yourData.player === 1 ? state.player_one_weapons : state.player_two_weapons} setWeaponOrder={setWeaponOrder} 
                damageType={yourData.player === 1 ? state.player_one_weapons[0].damage_type : state.player_two_weapons[0].damage_type} setDamageType={setDamageType}
                currentDamageType={yourData.player === 1 ? state.player_one_damage_type : state.player_two_damage_type}
                handleAction={handleAction} handleCounter={handleCounter} handleInitiate={handleInitiate} combatInitiated={combatInitiated} setCombatInitiated={setCombatInitiated}
                currentWeapon={yourData.player === 1 ? state.player_one_weapons[0] : state.player_two_weapons[0]} 
                currentAction={yourData.player === 1 ? state.player_one_action : state.player_two_action} 
                currentCounter={yourData.player === 1 ? state.player_one_counter_guess : state.player_two_counter_guess} 
                setEmergencyText={setEmergencyText}
            /> : <Loading Combat={true} />
            } */}
            {/* <PvPCombatText 
                ascean={ascean} user={user} state={state} emergencyText={emergencyText} 
                playerAction={yourData.player === 1 ? state.player_one_action : state.player_two_action} 
                computerAction={enemyData.player === 2 ? state.player_two_action : state.player_one_action} 
                playerDeathText={state.player_one_death_description} computerDeathText={state.player_two_death_description}
                playerCombatText={state.player_one_action_description} computerCombatText={state.player_two_action_description} 
                playerActionText={state.player_one_start_description} computerActionText={state.player_two_start_description}
                playerSpecialText={state.player_one_special_description} computerSpecialText={state.player_two_special_description}
                playerReligiousText={state.player_one_influence_description} computerReligiousText={state.player_two_influence_description}
                playerReligiousTextTwo={state.player_one_influence_description_two} computerReligiousTextTwo={state.player_two_influence_description_two}
            /> */}
        </Container>
    )
}

export default GamePvP