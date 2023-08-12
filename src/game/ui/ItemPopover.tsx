import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Equipment } from '../../components/GameCompiler/GameStore';

export const itemPopover = (item: Equipment, stalwart?: boolean, caerenic?: boolean) => {
    return (
        <Popover className="text-info" id="popover">
        <Popover.Header id="popover-header" className="" as="h2">{item?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + item?.imgURL} alt={item?.name} /></span></Popover.Header>
        <Popover.Body id="popover-body" className="">
            { item?.name === 'Empty Weapon Slot' || item?.name === 'Empty Shield Slot' || item?.name === 'Empty Amulet Slot' || item?.name === 'Empty Ring Slot' || item?.name === 'Empty Trinket Slot' ? ( '' ) : 
                <>
                { item?.type && item?.grip ? (
                    <>
                    {item?.type} [{item?.grip}] <br />
                    {item?.attack_type} [{item?.damage_type?.[0]}{item?.damage_type?.[1] ? ' / ' + item.damage_type[1] : '' }{item?.damage_type?.[2] ? ' / ' + item?.damage_type?.[2] : '' }] <br />
                    </>
                ) : item?.type ? ( <>{item.type} <br /></> ) : ( '' ) }
                {item?.constitution > 0 ? 'CON: +' + item?.constitution + ' ' : ''}
                {item?.strength > 0 ? 'STR: +' + item?.strength + ' ' : ''}
                {item?.agility > 0 ? 'AGI: +' + item?.agility + ' ' : ''}
                {item?.achre > 0 ? 'ACH: +' + item?.achre + ' ' : ''}
                {item?.caeren > 0 ? 'CAER: +' + item?.caeren + ' ' : ''}
                {item?.kyosir > 0 ? 'KYO: +' + item?.kyosir + ' ' : ''}<br />
                Damage: {item?.physical_damage} Phys | {item?.magical_damage} Magi <br />
                { item?.physical_resistance || item?.magical_resistance ? (
                    <>
                        Defense: {item?.physical_resistance} Phys | {item?.magical_resistance} Magi <br />
                    </>
                ) : ( '' ) }
                { item?.physical_penetration || item?.magical_penetration ? (
                    <>
                        Penetration: {item?.physical_penetration} Phys | {item?.magical_penetration} Magi <br />
                    </>
                ) : ( '' ) }
                Crit Chance: {item?.critical_chance}% <br />
                Crit Damage: {item?.critical_damage}x <br />
                Roll Chance: {item?.roll}% <br />
                { item?.influences && item?.influences?.length > 0 ? (
                    <>Influence: {item?.influences?.[0]}<br /></>
                ) : ( '' ) }
                <br />
                <p style={{ color: getBorderStyle(item?.rarity) }}>
                {item?.rarity}
                </p>
                { stalwart ? (
                    <p style={{ color: "gold" }}>
                        Stalwart - You are engaged in combat with your shield raised, adding it to your passive defense. 
                        You receive 50% less poise damage. 
                        You receive 10% less damage. 
                        You cannot dodge or roll.
                    </p>
                ) : ( '' ) } 
                { caerenic ? (
                    <p style={{ color: "gold" }}>
                        Caerenic - You attempt to harnass your caer with your achre, increasing your damage by 15%. 
                        You move 15% faster. 
                        You receive 25% more damage. 
                    </p>
                ) : ( '' ) }
            </> }
        </Popover.Body>
    </Popover>
    );
};

export const getBorderStyle = (rarity: string) => {
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

export const getShadowStyle = (prayer: string) => {
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

export const borderColor = (prayer: string) => {
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

export const getInnerWidth = () => {
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

interface Props {
    item: Equipment;
    prayer: string;
    caerenic?: boolean;
};

const ItemPopover = ({ item, prayer, caerenic }: Props) => { 
    const getItemStyle = {
        border: '0.15em solid ' + borderColor(prayer),
        background: 'black',
        boxShadow: '0 0 1.5em ' + borderColor(prayer),
        borderRadius: '50%',
    };
    return (
        <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(item, false, caerenic)}>
            <img src={item?.imgURL} className="m-1 eqp-popover spec" alt={item?.name} style={getItemStyle} />
        </OverlayTrigger>
    );
};

export default ItemPopover;