import { useEffect, useState, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';  
import * as settingsAPI from '../../utils/settingsApi';
import HostScene from '../../game/sceneComponents/HostScene';
import { GAME_ACTIONS, GameStore, initialGameData, getAsceanTraits } from '../../components/GameCompiler/GameStore';
import { ACTIONS, CombatStore, initialCombatData } from '../../components/GameCompiler/CombatStore';

interface Props {
    user: any;
};

const Story = ({ user }: Props) => {
    const { asceanID } = useParams();
    const [state, dispatch] = useReducer(CombatStore, initialCombatData);
    const [gameState, gameDispatch] = useReducer(GameStore, initialGameData);
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