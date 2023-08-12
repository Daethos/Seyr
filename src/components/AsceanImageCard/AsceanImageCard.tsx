import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../Loading/Loading';
import { useEffect, useState } from 'react';
import { getBorderStyle, itemPopover } from '../../game/ui/ItemPopover';

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
    story?: boolean;
};

const AsceanImageCard = ({ weapon_one, weapon_two, weapon_three, shield, helmet, chest, legs, amulet, ring_one, ring_two, trinket, gameDisplay, loading, damage, spectator, story }: Props) => {
    const [damaged, setDamaged] = useState<boolean>(false);

    useEffect(() => {
        if (damage) setDamaged(true);
    }, [damage]);

    useEffect(() => {
        if (damaged) setTimeout(() => setDamaged(false), 1500);
    }, [damaged]); 
 
    const getItemStyle = (rarity: string) => {
        return {
            border: '0.15em solid ' + getBorderStyle(rarity),
            background: 'black',
            boxShadow: '2px 2px 2px black',
            borderRadius: '0px',
            zIndex: 9999,
        };
    };

    const getId = () =>  damaged ? 'flicker' : '';

    if (loading) {
        return (
            <Loading Combat={true} />
        );
    };
    return (
        <>
        { gameDisplay ? (
            <Row className={spectator ? "game-ascean spectator" : story ? 'game-ascean story' : "game-ascean"}>
            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 }></Col>
            <Col style={{marginLeft: -62 + 'px', marginRight: 10 + 'px'}} xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4">
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_one)}>
                <img src={weapon_one?.imgURL} className="m-1 eqp-popover spec" alt={weapon_one?.name} style={getItemStyle(weapon_one?.rarity)} id={getId()} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_two)}>
                <img src={weapon_two?.imgURL} className="m-1 eqp-popover spec" alt={weapon_two?.name} style={getItemStyle(weapon_two?.rarity)} id={getId()} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(weapon_three)}>
                <img src={weapon_three?.imgURL} className="m-1 eqp-popover spec" alt={weapon_three?.name} style={getItemStyle(weapon_three?.rarity)} id={getId()} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(shield)}>
                <img src={shield?.imgURL} className="m-1 eqp-popover spec" alt={shield?.name} style={getItemStyle(shield?.rarity)} id={getId()} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-5 mx-3" >
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(helmet)}>
                <img src={helmet?.imgURL} className="m-1 eqp-popover spec" alt={helmet?.name} style={getItemStyle(helmet?.rarity)} id={getId()} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(chest)}>
                <img src={chest?.imgURL} className="m-1 eqp-popover spec" alt={chest?.name} style={getItemStyle(chest?.rarity)} id={getId()} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(legs)}>
                <img src={legs?.imgURL} className="m-1 eqp-popover spec" alt={legs?.name} style={getItemStyle(legs?.rarity)} id={getId()} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-2">
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(amulet)}>
                <img src={amulet?.imgURL} className="m-1 eqp-popover spec" alt={amulet?.name} style={getItemStyle(amulet?.rarity)} id={getId()} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(ring_one)}>
                <img src={ring_one?.imgURL} className="m-1 eqp-popover spec" alt={ring_one?.name} style={getItemStyle(ring_one?.rarity)} id={getId()} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(ring_two)}>
                <img src={ring_two?.imgURL} className="m-1 eqp-popover spec" alt={ring_two?.name} style={getItemStyle(ring_two?.rarity)} id={getId()} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(trinket)}>
                <img src={trinket?.imgURL} className="m-1 eqp-popover spec" alt={trinket?.name} style={getItemStyle(trinket?.rarity)} id={getId()} />
            </OverlayTrigger>
            </Col>

            </Row>
        ) : (
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
        ) }
        </>
    );
};

export default AsceanImageCard;