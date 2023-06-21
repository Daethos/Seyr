import { useEffect, useState, useReducer } from 'react'
import { useParams } from 'react-router-dom';
import * as asceanAPI from '../../utils/asceanApi';  
import * as settingsAPI from '../../utils/settingsApi';
import * as eqpAPI from '../../utils/equipmentApi';
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
    const [assets, setAssets] = useState([]);
    const [gameChange, setGameChange] = useState<boolean>(true);
    const [asceanState, setAsceanState] = useState({
        ascean: {},
        currentHealth: 0,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        level: 0,
        opponent: 0,
        opponentExp: 0,
        experience: 0,
        experienceNeeded: 0,
        mastery: '',
        faith: '',
        avarice: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gameStateResponse, combatStateResponse, gameSettingResponse, assetResponse] = await Promise.all([
                    asceanAPI.getOneAscean(asceanID),
                    asceanAPI.getAsceanStats(asceanID),
                    settingsAPI.getSettings(),
                    eqpAPI.index(),
                ]);
                console.log(combatStateResponse.data.data, "Ascean Response")
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
                    'experience': combatStateResponse.data.data.ascean.experience,
                    'experienceNeeded': combatStateResponse.data.data.ascean.level * 1000,
                    'mastery': combatStateResponse.data.data.ascean.mastery,
                    'faith': combatStateResponse.data.data.ascean.faith,
                });
                const sanitizedAssets = await sanitizeAssets(assetResponse.data);
                setAssets(sanitizedAssets);
                gameDispatch({ type: GAME_ACTIONS.SET_GAME_SETTINGS, payload: gameSettingResponse }); 
                gameDispatch({ type: GAME_ACTIONS.LOADING, payload: false });
                setGameChange(false);
            } catch (err: any) {
                console.log(err.message, '<- Error in Getting an Ascean for Solo Gameplay')
            };
        };

        fetchData();

    }, [asceanID]); 

    useEffect(() => {
        console.log(asceanState, 'Ascean State')
    }, [asceanState]);

    const sanitizeAssets = async (assets: any) => {
        const fields = [ 'weapons', 'shields', 'helmets', 'chests', 'legs', 'rings', 'amulets', 'trinkets' ];
        const newAssets: any = [];
        const imageSprite = async (image: any) => {
            return image.imgURL.split('/')[2].split('.')[0];
        };

        await Promise.all(fields.map(async (field: string) => {
            await Promise.all(assets[field].map(async (item: any) => {
                const sprite = await imageSprite(item);
                newAssets.push({
                    sprite: sprite,
                    imgURL: item.imgURL,
                });
            })); 
        }));
        
        return newAssets;
    }; 
        
    return (
        <div>
        { gameChange ? ( '' )
        : ( <HostScene 
                user={user} setGameChange={setGameChange} gameChange={gameChange} state={state} dispatch={dispatch} gameState={gameState} gameDispatch={gameDispatch}
                asceanState={asceanState} setAsceanState={setAsceanState} assets={assets}
            />
        )}
        </div>
    );
};

export default Story;