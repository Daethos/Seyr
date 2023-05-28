import { useEffect, useState, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';  
import * as settingsAPI from '../../utils/settingsApi';
import HostScene from '../../game/sceneComponents/HostScene';
import { GAME_ACTIONS, GameStore, initialGameData, getAsceanTraits } from '../../components/GameCompiler/GameStore';
import { ACTIONS, CombatStore, initialCombatData } from '../../components/GameCompiler/CombatStore';
import userService from "../../utils/userService";

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
                const [gameStateResponse, combatStateResponse, gameSettingResponse, enemyResponse] = await Promise.all([
                    asceanAPI.getOneAscean(asceanID),
                    asceanAPI.getAsceanStats(asceanID),
                    settingsAPI.getSettings(),
                    getOpponent(),
                ]);
                console.log(enemyResponse, "Enemy Response")
                const traitResponse = await getAsceanTraits(gameStateResponse.data);
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER, payload: gameStateResponse.data });
                dispatch({
                    type: ACTIONS.SET_PLAYER,
                    payload: combatStateResponse.data.data
                });
                gameDispatch({ type: GAME_ACTIONS.SET_PLAYER_TRAITS, payload: traitResponse });
                gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: enemyResponse?.game });
                setAsceanState({
                    ...asceanState,
                    'ascean': combatStateResponse.data.data.ascean,
                    'currentHealth': combatStateResponse.data.data.ascean.health.current === -10 ? combatStateResponse.data.data.attributes.healthTotal : combatStateResponse.data.data.ascean.health.current,
                    'level': combatStateResponse.data.data.ascean.level,
                    'experience': 0,
                    'experienceNeeded': combatStateResponse.data.data.ascean.level * 1000,
                    'mastery': combatStateResponse.data.data.ascean.mastery,
                    'faith': combatStateResponse.data.data.ascean.faith,
                    'opponent': enemyResponse?.game.level,
                });
                dispatch({ type: ACTIONS.SET_NEW_COMPUTER, payload: enemyResponse?.combat }); 
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

    const getOpponent = async () => {
        // gameDispatch({ type: GAME_ACTIONS.GET_OPPONENT, payload: true });
        try { 
            const player = await asceanAPI.getCleanAscean(asceanID);
            console.log(player, "Player ??")
            let minLevel: number = 0;
            let maxLevel: number = 0; 
            if (player.data.level < 3) {
                minLevel = 1;
                maxLevel = 2;
            } else  if (player.data.level <= 4) { // 3-4 
                minLevel = 2;
                maxLevel = 4;
            } else if (player.data.level === 5) { 
                minLevel = 4;
                maxLevel = 6;
            } else if (player.data.level === 6) {
                minLevel = 4;
                maxLevel = 8;
            } else if (player.data.level === 7) {
                minLevel = 5;
                maxLevel = 9;
            } else if (player.data.level === 8) {
                minLevel = 6;
                maxLevel = 10;
            } else if (player.data.level <= 10) { // 9-10
                minLevel = 7;
                maxLevel = 12;
            } else if (player.data.level <= 14) { // 11-14
                minLevel = 8;
                maxLevel = 16;
            } else if (player.data.level <= 18) { // 15-18
                minLevel = 12;
                maxLevel = 18;
            } else if (player.data.level <= 20) {
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
            console.log(selectedOpponent, response, "Enemy ??")
            return {
                game: selectedOpponent.data,
                combat: response.data.data
            } 
            // setAsceanState({
            //     ...asceanState,
            //     'opponent': selectedOpponent.data.level,
            // });

            // gameDispatch({ type: GAME_ACTIONS.SET_OPPONENT, payload: selectedOpponent.data })
            // dispatch({
            //     type: ACTIONS.SET_NEW_COMPUTER,
            //     payload: response.data.data
            // });
            // gameDispatch({ type: GAME_ACTIONS.LOADING_OPPONENT, payload: false });
        } catch (err: any) {
            console.log(err.message, 'Error retrieving Enemies')
        };
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