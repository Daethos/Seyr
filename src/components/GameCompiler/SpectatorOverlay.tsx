import { useState, useRef, useEffect } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Button from 'react-bootstrap/Button';
import { GAME_ACTIONS } from './GameStore';
import { MAP_ACTIONS } from './WorldStore';
import { SPECTATOR_ACTIONS } from './PvPStore';
import Loading from '../Loading/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import GameAnimations from './GameAnimations';
import GameCombatText from './GameCombatText';
import PvPActions from './PvPActions';
import PvPAscean from './PvPAscean';
import PvPConditions from './PvPConditions';
import SpectatorAscean from './SpectatorAscean';
import CombatSpectatorOverlay from './CombatSpectatorOverlay';

interface Props {
    ascean: any;
    mapState: any;
    mapDispatch: React.Dispatch<any>;
    loadingSpectator: boolean;
    gameDispatch: React.Dispatch<any>;
    state: any;
    dispatch: React.Dispatch<any>;
    emergencyText: any[] | (() => any[]);
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    playerState: any;
    gameState: any;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpectatorOverlay = ({ ascean, mapState, gameDispatch, mapDispatch, loadingSpectator, dispatch, state, emergencyText, setEmergencyText, playerState, gameState, setModalShow }: Props) => {
    const overlayRef = useRef(null);
    const location = useLocation();
    const article = ['a', 'e', 'i', 'o', 'u'].includes(ascean?.maps?.[0]?.currentTile?.content.charAt(0).toLowerCase()) ? 'an' : 'a';
    const navigate = useNavigate();
    const closeEverything = () => {
        gameDispatch({ type: GAME_ACTIONS.LOADING_SPECTATOR, payload: false });
    };
    useEffect(() => {
        console.log(loadingSpectator, state, 'Spectator Overlay Mounted');
        return () => {
            console.log(loadingSpectator, 'Spectator Overlay Unmounted');
        };
    }, [loadingSpectator, state]);
    const chatStyle = {
        borderRadius: "50%",
        marginTop: "25%",
        marginLeft: "25%",
        gridColumnStart: 2,
        gridRowStart: 4,
    };
    return (
        <Overlay target={overlayRef} show={loadingSpectator}>
            <div className='d-grid'
            style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 1)',
                zIndex: 9999,
                border: "0.2em solid purple",
            }}>
            <SpectatorAscean 
                state={state} ascean={state.enemy} damage={state.enemyDamaged} totalPlayerHealth={state.enemy_health} loading={gameState.loadingOpponent} player={false} currentPlayerHealth={state.new_enemy_health}
            />
            <CombatSpectatorOverlay 
                ascean={state.player} enemy={state.enemy} playerWin={state.player_win} computerWin={state.enemy_win} playerCritical={state.critical_success} computerCritical={state.enemy_critical_success}
                playerAction={state.player_action} computerAction={state.enemy_action} playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_enemy_damage} 
                rollSuccess={state.roll_success} computerRollSuccess={state.enemy_roll_success} counterSuccess={state.counter_success} computerCounterSuccess={state.enemy_counter_success}
                loadingCombatSpectatorOverlay={gameState.loadingCombatSpectatorOverlay} combatSpectatorResolved={gameState.combatSpectatorResolved} combatSpectatorOverlayText={gameState.combatSpectatorOverlayText} gameDispatch={gameDispatch} combatEngaged={state.combatEngaged}
            /> 
            <SpectatorAscean state={state} ascean={state.player} player={true} damage={state.playerDamaged} totalPlayerHealth={state.player_health} currentPlayerHealth={state.new_player_health} loading={gameState.loadingAscean} />
            <GameAnimations spectator={true}
                playerCritical={state.critical_success} computerCritical={state.enemy_critical_success}
                playerAction={state.player_action} computerAction={state.enemy_action} 
                playerDamageTotal={state.realized_player_damage} computerDamageTotal={state.realized_enemy_damage} 
                rollSuccess={state.roll_success} computerRollSuccess={state.enemy_roll_success} combatRound={state.combatRound}
                counterSuccess={state.counter_success} computerCounterSuccess={state.enemy_counter_success} combatEngaged={state.combatEngaged}
            />
            <GameCombatText 
                emergencyText={emergencyText} combatRoundText={state.combatRound} spectator={true}
                playerCombatText={state.player_action_description} computerCombatText={state.enemy_action_description} 
                playerActionText={state.player_start_description} computerActionText={state.enemy_start_description}
                playerDeathText={state.player_death_description} computerDeathText={state.enemy_death_description}
                playerSpecialText={state.player_special_description} computerSpecialText={state.enemy_special_description}
                playerReligiousText={state.player_influence_description} computerReligiousText={state.enemy_influence_description}
                playerReligiousTextTwo={state.player_influence_description_two} computerReligiousTextTwo={state.enemy_influence_description_two}
            />
            <Button variant='' style={chatStyle} onClick={() => setModalShow(true)}>
                <img src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt="Origin Culture Here" style={{ width: "10vw", borderRadius: "50%", border: "2px solid purple" }} />
            </Button>
            {/* <Button variant='' style={{ float: 'right', color: 'red', fontSize: "36px", zIndex: 9999 }} onClick={closeEverything}>X</Button> */}
            </div>
        </Overlay>
    );
};

export default SpectatorOverlay;