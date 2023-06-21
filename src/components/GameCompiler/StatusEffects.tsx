import { useEffect, useState } from 'react';
import { ACTIONS } from './CombatStore';
import * as gameAPI from '../../utils/gameApi';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export interface StatusEffect {
    id: string;
    name: string;
    playerName: string;
    enemyName: string;
    prayer: string;
    description: string;
    debuffTarget?: string;
    duration: number;
    refreshes: boolean;
    activeRefreshes: number;
    activeStacks: number;
    tick: {
        start: number;
        end: number;
    };
    effect: {
        physical_damage?: number;
        magical_damage?: number;
        physical_penetration?: number;
        magical_penetration?: number;
        critical_chance?: number;
        critical_damage?: number;
        physicalPosture?: number;
        magicalPosture?: number;
        physicalDefenseModifier?: number;
        magicalDefenseModifier?: number;
        roll?: number;
        dodge?: number;
        healing?: number;
        damage?: number;
    };
    imgURL: string;
    weapon: string;
    startTime: number;
    endTime: number;
};

interface StatusEffectProps {
    ascean: any;
    effect: StatusEffect;
    player?: boolean;
    spectator?: boolean;
    enemy?: boolean;
    state: any;
    dispatch: any;
    story?: boolean;
    pauseState?: boolean;
    handleCallback?: (state: any, effect: StatusEffect) => Promise<void>;
};

const StatusEffects = ({ effect, player, spectator, enemy, ascean, state, dispatch, story, pauseState, handleCallback }: StatusEffectProps) => {
    const [endTime, setEndTime] = useState(effect.endTime);
    const [effectTimer, setEffectTimer] = useState<number>(effect.endTime - effect.startTime);
    const specials = ['Avarice', 'Dispel', 'Denial', 'Silence'];
    const specialDescription = {
        'Avarice': 'Increases the amount of experience and gold gained.',
        'Dispel': 'Removes the last prayer affecting the enemy.',
        'Denial': 'Prevents the enemy from killing you.',
        'Silence': 'Prevents the enemy from praying.'
    };
    useEffect(() => {
        setEffectTimer(effect.endTime - effect.startTime);
    }, [])

    useEffect(() => {
        if (!story && !pauseState) return;
        const intervalTimer = setInterval(() => {
            setEffectTimer((effectTimer: number) => effectTimer - 1);
        }, 1000);
        if (endTime < effect.endTime) {
            setEndTime(effect.endTime); // This is for when the effect is refreshed
        };
        if ((effectTimer % 3 === 0 && effectTimer !== (effect.endTime - effect.startTime)) && (effect.prayer === 'Heal' || effect.prayer === 'Damage')) {
            console.log('Effect Tick');
            effectTick(state, effect);
        };
        
        if (endTime === state.combatTimer || effectTimer <= 0) {
            dispatch({ type: ACTIONS.REMOVE_EFFECT, payload: effect.id });
            clearInterval(intervalTimer);
        };
        if (pauseState) clearInterval(intervalTimer);
    
        return () => clearInterval(intervalTimer); // Clean up the interval on unmount
    }, [effectTimer, story, pauseState]); 

    const effectTick = async (state: any, effect: StatusEffect): Promise<void> => {
        try {
            if (handleCallback) await handleCallback(state, effect);
        } catch (err: any) {
            console.log(err, "Error In Effect Tick");
        };
    };



    const consumeEnemyPrayer = (name: string, prayer: string): void => {
        console.log('Consume Enemy Prayer', name, prayer);
    };

    const effectPopover = (
        <Popover className='text-info' id='popover' style={ spectator ? { zIndex: 9999 } : { } }>
            <Popover.Header id='popover-header' as='h2'>{effect?.name}</Popover.Header>
            <Popover.Body id='popover-body'>
                <p>Prayer: {effect?.prayer} {effect?.refreshes ? `[Refreshes]` : `[Stacks]`}
                {effect?.debuffTarget ? <><br />Debuff Target: {effect.debuffTarget} <br /></> : ''}
                </p>
                <p>{effect?.description}</p>
                { story ? (
                    <p>
                    Duration: {effectTimer}s <br />
                    Start: {effect?.startTime}s | End: {effect?.endTime}s <br />
                    {effect?.refreshes ? `Active Refreshes: ${effect?.activeRefreshes}` : `Active Stacks: ${effect?.activeStacks}`}<br />
                    </p>
                ) : (
                    <>
                    Duration: {effect?.duration} <br />
                    <p>{effect?.refreshes ? `Active Refreshes: ${effect?.activeRefreshes}` : `Active Stacks: ${effect?.activeStacks}`}<br />
                    Round Start: {effect?.tick?.start} | End: {effect?.tick?.end}</p>
                    </>        
                )}
                <p>Effect(s): <br />
                { specials.includes(effect.prayer) ? (
                    <>
                    {specialDescription[effect.prayer as keyof typeof specialDescription]} <br />
                    </>
                ) : ( '' ) }
                    {effect?.effect?.physical_damage ? <>Physical Damage: {effect?.effect?.physical_damage} <br /> </> : ''}
                    {effect?.effect?.magical_damage ? <>Magical Damage: {effect?.effect?.magical_damage} <br /> </> : ''}
                    {effect?.effect?.physical_penetration ? <>Physical Penetration: {effect?.effect?.physical_penetration} <br /> </> : ''}
                    {effect?.effect?.magical_penetration ? <>Magical Penetration: {effect?.effect?.magical_penetration} <br /> </> : ''}
                    {effect?.effect?.critical_chance ? <>Critical Chance: {effect?.effect?.critical_chance} <br /> </> : ''}
                    {effect?.effect?.critical_damage ? <>Critical Damage: {effect?.effect?.critical_damage} <br /> </> : ''}
                    {effect?.effect?.physicalPosture ? <>Physical Posture: {effect?.effect?.physicalPosture} <br /> </> : ''}
                    {effect?.effect?.magicalPosture ? <>Magical Posture: {effect?.effect?.magicalPosture} <br /> </> : ''}
                    {effect?.effect?.physicalDefenseModifier ? <>Physical Defense: {effect?.effect?.physicalDefenseModifier} <br /> </> : ''}
                    {effect?.effect?.magicalDefenseModifier ? <>Magical Defense: {effect?.effect?.magicalDefenseModifier} <br /> </> : ''}
                    {effect?.effect?.roll ? <>Roll: {effect?.effect?.roll} <br /> </> : ''}
                    {effect?.effect?.dodge ? <>Dodge: {effect?.effect?.dodge} <br /> </> : ''}
                    {effect?.effect?.healing ? <>Heal (per Round): {Math.round(effect?.effect?.healing * 0.33)} <br /> </> : ''}
                    {effect?.effect?.damage ? <>Damage (per Round): {Math.round(effect?.effect?.damage * 0.33)} <br /> </> : ''}

                </p>
                { !player && ascean.capable.enemyConsume && !state.enemyPrayerConsumed ? <><Button variant='' style={{ color: 'purple' }} onClick={() => consumeEnemyPrayer(effect.name, effect.prayer)}>Consume</Button></> : '' }
            </Popover.Body>
        </Popover>
    );


    const getInnerWidth = () => {
        const width = window.innerWidth;
        if (width > 1200) {
            return '-10%';
        } else if (width > 800) {
            return '1%';
        } else if (width > 50) {
            return '12.5%';
        } else {
            return -'10%';
        };
    };

    const borderColor = (prayer: string) => {
        switch (prayer) {
            case 'Buff': return 'gold';
            case 'Debuff': return 'purple';
            case 'Heal': return 'green';
            case 'Damage': return 'red';
            case 'Avarice' : return 'greenyellow';
            case 'Denial' : return '#0cf';
            case 'Silence' : return 'black';
            default: return 'white';
        };
    };

    const getEffectStyle = {
        marginTop: player && !story ? getInnerWidth() : story ? getInnerWidth() : '',
        border: 2 + 'px solid ' + borderColor(effect?.prayer),
        boxShadow: '0 0 1em ' + borderColor(effect?.prayer),  
        borderRadius: story ? '6px' : '',
        marginLeft: story ? '5%' : '',
    };

    const getIconStyle = {
        width: story ? '' : '100%',
        marginTop: story ? '-10px' : '-17.5px',
        marginLeft: story ? '-17.5px' : '',
        transform: story ? 'scale(0.65)' : '',
    };

    return (
        <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={effectPopover}>
            <Button variant='' style={getEffectStyle} className={ enemy ? 'status-effects enemy' : spectator ? 'status-effects spectator' : story ? 'story-effects' : 'status-effects'}>
                <img src={process.env.PUBLIC_URL + effect?.imgURL} alt={effect?.name} style={getIconStyle}/>
                { story ? ( <p style={{ color: "gold", fontSize: "10px", marginLeft: "-8px", top: "-10px",  display: "inline" }}>{effectTimer}s</p> ) : ( '' ) }
            </Button>
        </OverlayTrigger>
    );
};

export default StatusEffects;