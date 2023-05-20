import { useEffect, useState, useReducer, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';  
import * as eqpAPI from '../../utils/equipmentApi';
import * as gameAPI from '../../utils/gameApi';
import * as settingsAPI from '../../utils/settingsApi';
import GameAscean from '../../components/GameCompiler/GameAscean';
import Loading from '../../components/Loading/Loading';
import HostScene from '../../game/sceneComponents/HostScene';
import { GAME_ACTIONS, GameStore, initialGameData, Enemy, Player, NPC, getAsceanTraits, checkPlayerTrait } from '../../components/GameCompiler/GameStore';
import { ACTIONS, CombatStore, initialCombatData, CombatData, shakeScreen } from '../../components/GameCompiler/CombatStore';
import { MAP_ACTIONS, MapStore, initialMapData, DIRECTIONS, MapData, debounce, getAsceanCoords, getAsceanGroupCoords } from '../../components/GameCompiler/WorldStore';
import useGameSounds from '../../components/GameCompiler/Sounds';

interface Props {
    user: any;
};

const Story = ({ user }: Props) => {
    const { asceanID } = useParams();
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
    const [loading, setLoading] = useState(false);  
    const navigate = useNavigate();
    const { playOpponent, playWO, playCounter, playRoll, playPierce, playSlash, playBlunt, playDeath, playWin, playReplay, playReligion, playDaethic, playWild, playEarth, playFire, playBow, playFrost, playLightning, playSorcery, playWind, playWalk1, playWalk2, playWalk3, playWalk4, playWalk8, playWalk9, playMerchant, playDungeon, playPhenomena, playTreasure, playActionButton, playCombatRound } = useGameSounds(gameState.soundEffectVolume);
    
    const [tutorialContent, setTutorialContent] = useState<any | null>(null);

    const [gameChange, setGameChange] = useState<boolean>(true);
    const [asceanState, setAsceanState] = useState({
        ascean: gameState.player,
        currentHealth: 0,
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
        const fetchData = async () => {
            try {
                const [gameStateResponse, combatStateResponse, gameSettingResponse] = await Promise.all([
                    asceanAPI.getOneAscean(asceanID),
                    asceanAPI.getAsceanStats(asceanID),
                    settingsAPI.getSettings(),
                ]);
                console.log(gameStateResponse, "Game State Response")
                const traitResponse = await getAsceanTraits(gameStateResponse.data);
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: gameStateResponse.data });
                dispatch({
                    type: ACTIONS.SET_PLAYER,
                    payload: combatStateResponse.data.data
                });
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_TRAITS, payload: traitResponse });
                setAsceanState({
                    ...asceanState,
                    'ascean': combatStateResponse.data.data.ascean,
                    'currentHealth': combatStateResponse.data.data.ascean.health.current === -10 ? combatStateResponse.data.data.attributes.healthTotal : combatStateResponse.data.data.ascean.health.current,
                    'level': combatStateResponse.data.data.ascean.level,
                    'opponent': 0,
                    'experience': 0,
                    'experienceNeeded': combatStateResponse.data.data.ascean.level * 1000,
                    'mastery': combatStateResponse.data.data.ascean.mastery,
                    'faith': combatStateResponse.data.data.ascean.faith,
                });
                gameDispatch({ type: GAME_ACTIONS.SET_GAME_SETTINGS, payload: gameSettingResponse });
                if (gameStateResponse.data.tutorial.firstBoot === true) {
                    gameDispatch({ type: GAME_ACTIONS.LOADING_OVERLAY, payload: true });
                }; // Extra Code Temporary 
                gameDispatch({ type: GAME_ACTIONS.LOADING, payload: false });
                setGameChange(false);
            } catch (err: any) {
                console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
            };
        };
        fetchData();
    }, [asceanID]);

    // TODO:FIXME: Use stock models underneath the three frames of armor so they're not invisible, properly
    
    if (loading) {
        return (
            <Loading NavBar={true} />
        );
    };
        
    return (
        <>
        { gameChange ? ( '' )
        : ( <HostScene 
                user={user} setGameChange={setGameChange} gameChange={gameChange} state={state} dispatch={dispatch} gameState={gameState} gameDispatch={gameDispatch}
                asceanState={asceanState} setAsceanState={setAsceanState}
            />
        )}
        </>
    );
};

export default Story;