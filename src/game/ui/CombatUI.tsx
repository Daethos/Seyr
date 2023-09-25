import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import playerHealthbar from '../images/player-healthbar.png';
import playerPortrait from '../images/player-portrait.png';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { useDispatch, useSelector } from 'react-redux';
import PhaserEffects from './PhaserEffects';
import ItemPopover, { getBorderStyle, itemPopover } from './ItemPopover';
import { setInstantStatus } from '../reducers/combatState';
import CombatModals from './CombatModals';
import Button from 'react-bootstrap/Button';
import EventEmitter from '../phaser/EventEmitter';

interface CombatUIProps {
    state: CombatData;
    staminaPercentage: number;
    pauseState: boolean;    
};

const CombatUI = ({ state, staminaPercentage, pauseState }: CombatUIProps) => {
    const dispatch = useDispatch();
    const stealth = useSelector((state: any) => state.game.stealth);
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0);

    useEffect(() => {
        setPlayerHealthPercentage(Math.round((state.newPlayerHealth/state.playerHealth) * 100));
    }, [state.newPlayerHealth, state.playerHealth]); 

    useEffect(() => {
        let instantTimer: ReturnType<typeof setTimeout>;
        if (state.instantStatus) {
            instantTimer = setTimeout(() => dispatch(setInstantStatus(false)), 30000);
        } else if (!state.combatEngaged) {
            dispatch(setInstantStatus(false));
        };
        return () => clearTimeout(instantTimer);
    }, [state.instantStatus, dispatch, state.combatEngaged]);

    const disengage = () => EventEmitter.emit('disengage');

    const getItemRarityStyle = (rarity: string) => {
        return {
            border: '0.15em solid ' + getBorderStyle(rarity),
            background: 'black',
            boxShadow: '0 0 2em ' + getBorderStyle(rarity),
            borderRadius: '0 0 50% 50% / 50% 50% 50% 50%', // Custom border radius values
        };
    };

    return (
        <div className='player-combat-ui' id={state.playerDamaged ? 'flicker' : ''}> 
            <CombatModals state={state} /> 
            <img src={playerHealthbar} alt="Health Bar" style={{ position: "absolute", width: '150px', height: '40px' }} />
            <p className='story-name'>{state.player.name} 
            </p>
            <ProgressBar variant={stealth ? "dark" : "info"} now={playerHealthPercentage} className='story-health-bar' />
            <p className='story-portrait'>{`${Math.round(state.newPlayerHealth)} / ${state.playerHealth} [${playerHealthPercentage}%]`}</p>
            <img src ={playerPortrait} alt="Player Portrait" className='player-portrait' />
            <ProgressBar variant="success" now={staminaPercentage} className='story-stamina-bubble'  />
            <p className='story-stamina'>{Math.round((staminaPercentage / 100) * state.playerAttributes.stamina)}</p>
            <div id={state.isCaerenic ? 'phaser-caerenic' : ''} className='combat-ui-weapon'> 
                <ItemPopover item={state.weapons[0]} prayer={state.playerBlessing} caerenic={state.isCaerenic} />
            </div>
            <div className='stalwart'>
            { state.isStalwart && (
                <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(state.player.shield, true)}>
                    <img src={state.player.shield.imgURL} id='phaser-pulse' className="m-1 eqp-popover spec" alt={state.player.shield.name} style={getItemRarityStyle(state.player.shield.rarity)} />
                </OverlayTrigger>
            ) }
            </div>
            { state.playerEffects.length > 0 && (
                <div className='combat-effects' style={{ zIndex: 2 }}>
                    {state.playerEffects.map((effect: any, index: number) => {
                        return ( <PhaserEffects state={state} effect={effect} pauseState={pauseState} key={index} /> )
                    })}
                </div>
            ) } 
            <div className='disengage'>
                {stealth && state.computer ? <Button variant='' style={{ color: '#fdf6d8', fontSize: '12px' }} onClick={disengage}>Disengage</Button> : ''}
            </div>
        </div> 
    );
};

export default CombatUI;