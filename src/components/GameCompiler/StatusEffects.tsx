import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { borderColor, getInnerWidth } from '../../game/ui/ItemPopover';

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
    effect: StatusEffect;
    player?: boolean;
    spectator?: boolean;
    enemy?: boolean;
};

const StatusEffects = ({ effect, player, spectator, enemy }: StatusEffectProps) => {

    const effectPopover = (
        <Popover className='text-info' id='popover' style={ spectator ? { zIndex: 9999 } : { } }>
            <Popover.Header id='popover-header' as='h2'>{effect?.name}</Popover.Header>
            <Popover.Body id='popover-body'>
                <p>Prayer: {effect?.prayer} {effect?.refreshes ? `[Refreshes]` : `[Stacks]`}
                {effect?.debuffTarget ? <><br />Debuff Target: {effect.debuffTarget} <br /></> : ''}
                </p>
                <p>{effect?.description}</p>
                <>
                Duration: {effect?.duration} <br />
                <p>{effect?.refreshes ? `Active Refreshes: ${effect?.activeRefreshes}` : `Active Stacks: ${effect?.activeStacks}`}<br />
                Round Start: {effect?.tick?.start} | End: {effect?.tick?.end}</p>
                </>  
                <p>Effect(s): <br /> 
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
            </Popover.Body>
        </Popover>
    ); 

    const getEffectStyle = {
        marginTop: player ? getInnerWidth() : '',
        border: 2 + 'px solid ' + borderColor(effect?.prayer),
        boxShadow: '0 0 1em ' + borderColor(effect?.prayer),  
    };

    const getIconStyle = {
        width: '100%',
        marginTop: '-17.5px',
    };

    return (
        <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={effectPopover}>
            <Button variant='' style={getEffectStyle} className={ enemy ? 'status-effects enemy' : spectator ? 'status-effects spectator' : 'status-effects'}>
                <img src={process.env.PUBLIC_URL + effect?.imgURL} alt={effect?.name} style={getIconStyle}/> 
            </Button>
        </OverlayTrigger>
    );
};

export default StatusEffects;