import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../Loading/Loading';
import { useEffect, useState } from 'react';
import { Equipment } from '../GameCompiler/GameStore';

interface Props {
    weapon_one: any;
    weapon_two: any;
    weapon_three: any;
    shield: any;
    helmet: any;
    chest: any;
    legs: any;
    amulet: any;
    ring_one: any;
    ring_two: any;
    trinket: any;
    gameDisplay?: boolean;
    loading?: boolean;
    damage?: boolean;
    spectator?: boolean;
};

const AsceanImageCard = ({ weapon_one, weapon_two, weapon_three, shield, helmet, chest, legs, amulet, ring_one, ring_two, trinket, gameDisplay, loading, damage, spectator }: Props) => {
    const [damaged, setDamaged] = useState<boolean>(false);

    useEffect(() => {
        if (damage) setDamaged(true);
    }, [damage]);

    useEffect(() => {
        if (damaged) {
            setTimeout(() => {
                setDamaged(false);
            }, 1500);
        };
    }, [damaged]);

    const itemPopover = (item: Equipment) => {
        return (
            <Popover className="text-info" id="popover" style={ spectator ? { zIndex: 9999 } :  { } }>
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
                {item?.rarity}
                </>}
            </Popover.Body>
        </Popover>
        );
    };

    function getBorderStyle(rarity: string) {
        switch (rarity) {
            case 'Common':
                return '0.15em solid white';
            case 'Uncommon':
                return '0.15em solid green';
            case 'Rare':
                return '0.15em solid blue';
            case 'Epic':
                return '0.15em solid purple';
            case 'Legendary':
                return '0.15em solid darkorange';
            default:
                return '0.15em solid grey';
        };
    };
    const getItemStyle = (rarity: string) => {
        return {
            border: getBorderStyle(rarity),
            background: 'black',
            boxShadow: '2px 2px 2px black',
            borderRadius: '0px',
        };
    };

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };
    return (
        <>
        { gameDisplay ? 
            <Row className={spectator ? "game-ascean spectator" : "game-ascean"}>
            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 }></Col>
            <Col 
            style={{marginLeft: -62 + 'px', marginRight: 10 + 'px'}}
            xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } 
            className="my-4">
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_one)}>
            <img src={weapon_one?.imgURL} className="m-1 eqp-popover spec" alt={weapon_one?.name} style={getItemStyle(weapon_one?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_two)}>
            <img src={weapon_two?.imgURL} className="m-1 eqp-popover spec" alt={weapon_two?.name} style={getItemStyle(weapon_two?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_three)}>
            <img src={weapon_three?.imgURL} className="m-1 eqp-popover spec" alt={weapon_three?.name} style={getItemStyle(weapon_three?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(shield)}>
            <img src={shield?.imgURL} className="m-1 eqp-popover spec" alt={shield?.name} style={getItemStyle(shield?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-5 mx-3" >
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(helmet)}>
            <img src={helmet?.imgURL} className="m-1 eqp-popover spec" alt={helmet?.name} style={getItemStyle(helmet?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(chest)}>
            <img src={chest?.imgURL} className="m-1 eqp-popover spec" alt={chest?.name} style={getItemStyle(chest?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(legs)}>
            <img src={legs?.imgURL} className="m-1 eqp-popover spec" alt={legs?.name} style={getItemStyle(legs?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-2">
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(amulet)}>
            <img src={amulet?.imgURL} className="m-1 eqp-popover spec" alt={amulet?.name} style={getItemStyle(amulet?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(ring_one)}>
            <img src={ring_one?.imgURL} className="m-1 eqp-popover spec" alt={ring_one?.name} style={getItemStyle(ring_one?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(ring_two)}>
            <img src={ring_two?.imgURL} className="m-1 eqp-popover spec" alt={ring_two?.name} style={getItemStyle(ring_two?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(trinket)}>
            <img src={trinket?.imgURL} className="m-1 eqp-popover spec" alt={trinket?.name} style={getItemStyle(trinket?.rarity)} id={damaged ? 'flicker' : ''} />
            </OverlayTrigger>
            </Col>

            </Row>
        :
            <Row className="justify-content-center">
            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 }></Col>
            <Col style={{marginLeft: -50 + 'px', marginRight: 10 + 'px'}} xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4">
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_one)}>
            <img src={weapon_one?.imgURL} className="m-2 eqp-popover spec" alt={weapon_one?.name} style={getItemStyle(weapon_one?.rarity)} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_two)}>
            <img src={weapon_two?.imgURL} className="m-2 eqp-popover spec" alt={weapon_two?.name} style={getItemStyle(weapon_two?.rarity)} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_three)}>
            <img src={weapon_three?.imgURL} className="m-2 eqp-popover spec" alt={weapon_three?.name} style={getItemStyle(weapon_three?.rarity)} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(shield)}>
            <img src={shield?.imgURL} className="m-2 eqp-popover spec" alt={shield?.name} style={getItemStyle(shield?.rarity)} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-4">
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(helmet)}>
            <img src={helmet?.imgURL} className="m-3 eqp-popover spec" alt={helmet?.name} style={getItemStyle(helmet?.rarity)} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(chest)}>
            <img src={chest?.imgURL} className="m-3 eqp-popover spec" alt={chest?.name} style={getItemStyle(chest?.rarity)} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(legs)}>
            <img src={legs?.imgURL} className="m-3 eqp-popover spec" alt={legs?.name} style={getItemStyle(legs?.rarity)} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-4">
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(amulet)}>
            <img src={amulet?.imgURL} className="m-2 eqp-popover spec" alt={amulet?.name} style={getItemStyle(amulet?.rarity)} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(ring_one)}>
            <img src={ring_one?.imgURL} className="m-2 eqp-popover spec" alt={ring_one?.name} style={getItemStyle(ring_one?.rarity)} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(ring_two)}>
            <img src={ring_two?.imgURL} className="m-2 eqp-popover spec" alt={ring_two?.name} style={getItemStyle(ring_two?.rarity)} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(trinket)}>
            <img src={trinket?.imgURL} className="m-2 eqp-popover spec" alt={trinket?.name} style={getItemStyle(trinket?.rarity)} />
            </OverlayTrigger>
            </Col>
            </Row>
        }
        </>
    );
};

export default AsceanImageCard;