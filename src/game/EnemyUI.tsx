import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import enemyHealthBar from './images/enemy-healthbar.png';
import { CombatData } from '../components/GameCompiler/CombatStore';
import { Equipment } from '../components/GameCompiler/GameStore';
import StatusEffects from '../components/GameCompiler/StatusEffects';

interface EnemyUIProps {
    state: CombatData;
    dispatch: any;
};

const EnemyUI = ({ state, dispatch }: EnemyUIProps) => {
    const [playerEnemyPercentage, setEnemyrHealthPercentage] = useState<number>(0);

    useEffect(() => {
        updateEnemyHealthPercentage();
    }, [state.new_computer_health]);

    const updateEnemyHealthPercentage = async () => {
        try {
            const newHealthPercentage = Math.round((state.new_computer_health/state.computer_health) * 100);
            setEnemyrHealthPercentage(newHealthPercentage);
        } catch (err: any) {
            console.log(err.message, 'Error updating Health Percentage');
        };
    };

    const itemPopover = (item: Equipment) => {
        return (
            <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{item?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + item?.imgURL} alt={item?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                { item?.name === 'Empty Weapon Slot' || item?.name === 'Empty Shield Slot' || item?.name === 'Empty Amulet Slot' || item?.name === 'Empty Ring Slot' || item?.name === 'Empty Trinket Slot' ? '' : 
                    <>
                    { item?.type && item?.grip ? 
                    <>
                    {item?.type} [{item?.grip}] <br />
                    {item?.attack_type} [{item?.damage_type?.[0]}{item?.damage_type?.[1] ? ' / ' + item.damage_type[1] : '' }{item?.damage_type?.[2] ? ' / ' + item?.damage_type?.[2] : '' }] <br />
                    </>
                : item?.type ? <>{item.type} <br /></> : ''}
                {item?.constitution > 0 ? 'CON: +' + item?.constitution + ' ' : ''}
                {item?.strength > 0 ? 'STR: +' + item?.strength + ' ' : ''}
                {item?.agility > 0 ? 'AGI: +' + item?.agility + ' ' : ''}
                {item?.achre > 0 ? 'ACH: +' + item?.achre + ' ' : ''}
                {item?.caeren > 0 ? 'CAER: +' + item?.caeren + ' ' : ''}
                {item?.kyosir > 0 ? 'KYO: +' + item?.kyosir + ' ' : ''}<br />
                Damage: {item?.physical_damage} Phys | {item?.magical_damage} Magi <br />
                { item?.physical_resistance || item?.magical_resistance ?
                    <>
                    Defense: {item?.physical_resistance} Phys | {item?.magical_resistance} Magi <br />
                    </>
                : '' }
                { item?.physical_penetration || item?.magical_penetration ?
                    <>
                    Penetration: {item?.physical_penetration} Phys | {item?.magical_penetration} Magi <br />
                    </>
                : '' }
                Crit Chance: {item?.critical_chance}% <br />
                Crit Damage: {item?.critical_damage}x <br />
                Dodge Timer: {item?.dodge}s <br />
                Roll Chance: {item?.roll}% <br />
                { item?.influences && item?.influences?.length > 0 ?
                    <>Influence: {item?.influences?.[0]}<br /><br /></>
                : '' }
                <p style={{ color: getBorderStyle(item?.rarity) }}>
                {item?.rarity}
                </p>
                </>}
            </Popover.Body>
        </Popover>
        );
    };

    function getShadowStyle(prayer: string) {
        switch (prayer) {
            case 'Buff':
                return 'gold';
            case 'Damage':
                return 'red';
            case 'Debuff':
                return 'purple';
            case 'Heal':
                return 'green';
            default:
                return 'white';
        };
    };

    function getBorderStyle(rarity: string) {
        switch (rarity) {
            case 'Common':
                return 'white';
            case 'Uncommon':
                return 'green';
            case 'Rare':
                return 'blue';
            case 'Epic':
                return 'purple';
            case 'Legendary':
                return 'darkorange';
            default:
                return 'grey';
        };
    };

    const getItemStyle = (rarity: string) => {
        return {
            border: '0.15em solid ' + getShadowStyle(state.computerBlessing),
            background: 'black',
            boxShadow: '0 0 1.5em ' + getShadowStyle(state.computerBlessing),
            borderRadius: '50%',
        };
    };

    return (
        <div style={{ position: "absolute", top: "15px", left: "790px", transform: "scale(1.25)" }} id={state.computerDamaged ? 'flicker' : ''}>
            {state.computerEffects.length > 0 ? (
                <div className='combat-effects'>
                    {state.computerEffects.map((effect: any, index: number) => {
                        return ( <StatusEffects state={state} dispatch={dispatch} ascean={state.computer} effect={effect} player={true} story={true} key={index} /> )
                    })}
                </div>
            ) : ( '' ) }
            <img src={enemyHealthBar} alt="Health Bar" style={{ position: "absolute", width: '125px', height: '35px' }} />
            <p style={{ position: "absolute", color: "gold", fontSize: "12px", width: "125px", top: "-9px", left: "-20px", fontFamily: "Cinzel", textAlign: "center" }}>
            {state.computer.name}
            </p>
            <ProgressBar 
                variant="info"
                now={playerEnemyPercentage}
                style={{ position: "absolute", left: "9px", top: "9px", width: "106px", height: "15px", backgroundColor: "red" }} 
            />
            <p style={{ 
                position: "absolute", 
                color: "#fdf6d8", 
                textShadow: "1px 1px 1px black", 
                top: "8px", 
                left: "8px",
                width: "105px", 
                fontSize: "12px", 
                textAlign: "center", 
                fontFamily: "Cinzel", 
                fontWeight: 700
            }}>
                {`${Math.round(state.new_computer_health)} / ${state.computer_health} [${playerEnemyPercentage}%]`}
            </p>
            <div style={{ position: "absolute", left: "-50px", top: "-10px", transform: "scale(0.75)" }}>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(state.computer_weapons[0])}>
                <img src={state.computer_weapons[0]?.imgURL} className="m-1 eqp-popover spec" alt={state.computer_weapons[0]?.name} style={getItemStyle(state.computer_weapons[0]?.rarity)} />
            </OverlayTrigger>
            </div>
        </div>
    );
};

export default EnemyUI;