import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface Props {
    effect: any;
    player?: boolean;
}

const StatusEffects = ({ effect, player }: Props) => {
    const effectPopover = (
        <Popover className='text-info' id='popover'>
            <Popover.Header id='popover-header' as='h2'>{effect?.name}</Popover.Header>
            <Popover.Body id='popover-body'>
                <p>Prayer: {effect?.prayer} {effect?.refreshes ? `[Refreshes]` : `[Stacks]`}
                {effect?.debuffTarget ? <><br />Debuff Target: {effect.debuffTarget} <br /></> : ''}
                </p>
                <p>{effect?.description}</p>
                    Duration: {effect?.duration} <br />
                    Intensity: {effect?.intensity?.value}
                <p>{effect?.refreshes ? `Active Refreshes: ${effect?.activeRefreshes}` : `Active Stacks: ${effect?.activeStacks}`}<br />
                Round Start: {effect?.tick?.start} | End: {effect?.tick?.end}</p>
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
                    {effect?.effect?.healing ? <>Healing (over Time): {Math.round(effect?.effect?.healing)} <br /> </> : ''}
                    {effect?.effect?.damage ? <>Damage (over Time): {Math.round(effect?.effect?.damage)} <br /> </> : ''}
                </p>
            </Popover.Body>
        </Popover>
    );

    const borderColor = (prayer: string) => {
        switch (prayer) {
            case 'Buff': return 'gold';
            case 'Debuff': return 'purple';
            case 'Heal': return 'green';
            case 'Damage': return 'red';
            default: return 'black';
        }
    }

    const getEffectStyle = {
        marginTop: player ? '-10%' : 0,
        border: 2 + 'px solid ' + borderColor(effect?.prayer),
        boxShadow: '0 0 1em ' + borderColor(effect?.prayer),  
    }

    const getIconStyle = {
        width: 100 + '%',
        marginTop: -17.5 + 'px',
    }

    return (

        <OverlayTrigger trigger='click' rootClose placement='auto-start' overlay={effectPopover}>
            <Button variant='' style={getEffectStyle} className='status-effects'><img src={process.env.PUBLIC_URL + effect?.imgURL} alt={effect?.name} style={getIconStyle}/></Button>
        </OverlayTrigger>
    )
}

export default StatusEffects