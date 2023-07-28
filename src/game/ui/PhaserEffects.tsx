import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { StatusEffect } from '../../components/GameCompiler/StatusEffects';
import { useDispatch } from 'react-redux';
import { getEffectTickFetch, setRemoveEffect } from '../reducers/combatState';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { borderColor, getInnerWidth } from './ItemPopover';

interface StatusEffectProps {
    state: CombatData;
    effect: StatusEffect;
    enemy?: boolean;
    pauseState: boolean;
};

const PhaserEffects = ({ state, effect, enemy, pauseState }: StatusEffectProps) => {
    const dispatch = useDispatch();
    const [endTime, setEndTime] = useState<number>(effect.endTime);
    const [effectTimer, setEffectTimer] = useState<number>(effect.endTime - effect.startTime);
    const specials = ['Avarice', 'Dispel', 'Denial', 'Silence'];
    const specialDescription = {
        'Avarice': 'Increases the amount of experience and gold gained',
        'Dispel': 'Removes the last prayer affecting the enemy.',
        'Denial': 'Prevents the enemy from killing you.',
        'Silence': 'Prevents the enemy from praying.'
    }; 

    useEffect(() => {
        if (pauseState) return;
        if (endTime < effect.endTime) setEndTime(effect.endTime);
        const intervalTimer = setInterval(() => {
            setEffectTimer((effectTimer: number) => effectTimer - 1);
        }, 1000);
        if (endTime === state.combatTimer || effectTimer <= 0 || !state.combatEngaged) {
            dispatch(setRemoveEffect(effect.id));
            clearInterval(intervalTimer);
        };
        if (pauseState) clearInterval(intervalTimer);
        if (canTick(effect, effectTimer)) { 
            console.log("Ticking");
            dispatch(getEffectTickFetch({ effect, effectTimer })); // Used to have combatData: state as first arg/obj prop
        };
        
        return () => {
            clearInterval(intervalTimer); // Clean up the interval on unmount
        };
    }, [effectTimer, pauseState, endTime]);
    
    const canTick = (effect: StatusEffect, timer: number): boolean => {
        console.log(timer, effect.endTime - effect.startTime, "Can Tick")
        if (timer % 3 === 0 && timer !== (effect.endTime - effect.startTime) && (effect.prayer === 'Heal' || effect.prayer === 'Damage')) return true;
        return false;
    }; 

    const consumeEnemyPrayer = (name: string, prayer: string): void => {
        console.log('Consume Enemy Prayer', name, prayer);
    };

    const effectPopover = (
        <Popover className='text-info' id='popover'>
            <Popover.Header id='popover-header' as='h2'>{effect?.name}</Popover.Header>
            <Popover.Body id='popover-body'>
                <p>Prayer: {effect?.prayer} {effect?.refreshes ? `[Refreshes]` : `[Stacks]`}
                {effect?.debuffTarget ? <><br />Debuff Target: {effect.debuffTarget} <br /></> : ''}
                </p>
                <p>{effect?.description}</p>
                <p>
                    Duration: {effectTimer}s <br />
                    Start: {effect?.startTime}s | End: {effect?.endTime}s <br />
                    {effect?.refreshes ? `Active Refreshes: ${effect?.activeRefreshes}` : `Active Stacks: ${effect?.activeStacks}`}<br />
                </p>     
               
                <p>Effect(s): <br />
                { specials.includes(effect.prayer) ? (
                    <>
                    {specialDescription[effect.prayer as keyof typeof specialDescription]} <br />
                    </>
                ) : ( '' ) }
                    {effect?.effect?.physical_damage ? <>Physical Damage: {effect?.effect?.physical_damage} <br /> </> : ('')}
                    {effect?.effect?.magical_damage ? <>Magical Damage: {effect?.effect?.magical_damage} <br /> </> : ('')}
                    {effect?.effect?.physical_penetration ? <>Physical Penetration: {effect?.effect?.physical_penetration} <br /> </> : ('')}
                    {effect?.effect?.magical_penetration ? <>Magical Penetration: {effect?.effect?.magical_penetration} <br /> </> : ('')}
                    {effect?.effect?.critical_chance ? <>Critical Chance: {effect?.effect?.critical_chance} <br /> </> : ('')}
                    {effect?.effect?.critical_damage ? <>Critical Damage: {effect?.effect?.critical_damage} <br /> </> : ('')}
                    {effect?.effect?.physicalPosture ? <>Physical Posture: {effect?.effect?.physicalPosture} <br /> </> : ('')}
                    {effect?.effect?.magicalPosture ? <>Magical Posture: {effect?.effect?.magicalPosture} <br /> </> : ('')}
                    {effect?.effect?.physicalDefenseModifier ? <>Physical Defense: {effect?.effect?.physicalDefenseModifier} <br /> </> : ('')}
                    {effect?.effect?.magicalDefenseModifier ? <>Magical Defense: {effect?.effect?.magicalDefenseModifier} <br /> </> : ('')}
                    {effect?.effect?.roll ? <>Roll: {effect?.effect?.roll} <br /> </> : ('')}
                    {effect?.effect?.dodge ? <>Dodge: {effect?.effect?.dodge} <br /> </> : ('')}
                    {effect?.effect?.healing ? <>Heal (per Round): {Math.round(effect?.effect?.healing * 0.33)} <br /> </> : ('')}
                    {effect?.effect?.damage ? <>Damage (per Round): {Math.round(effect?.effect?.damage * 0.33)} <br /> </> : ('')}
                </p>
                {/* { !player && ascean?.capable.enemyConsume && !state.enemyPrayerConsumed ? <><Button variant='' style={{ color: 'purple' }} onClick={() => consumeEnemyPrayer(effect.name, effect.prayer)}>Consume</Button></> : '' } */}
            </Popover.Body>
        </Popover>
    );

    const getEffectStyle = {
        marginTop: getInnerWidth(),
        border: 2 + 'px solid ' + borderColor(effect?.prayer),
        boxShadow: '0 0 1em ' + borderColor(effect?.prayer),  
        borderRadius: '6px',
        marginLeft: '5%',
    };

    const getIconStyle = { 
        marginTop: '-10px',
        marginLeft: '-17.5px',
        transform: 'scale(0.65)',
    };

    return (
        <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={effectPopover}>
            <Button variant='' style={getEffectStyle} className={ enemy ? 'status-effects enemy' : 'story-effects' }>
                <img src={process.env.PUBLIC_URL + effect?.imgURL} alt={effect?.name} style={getIconStyle}/>
                <p style={{ color: "gold", fontSize: "10px", marginLeft: "-8px", top: "-10px",  display: "inline" }}>{effectTimer}s</p>
            </Button>
        </OverlayTrigger>
    );
};

export default PhaserEffects;