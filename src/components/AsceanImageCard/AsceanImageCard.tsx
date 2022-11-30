import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../Loading/Loading';

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
}

const AsceanImageCard = ({ weapon_one, weapon_two, weapon_three, shield, helmet, chest, legs, amulet, ring_one, ring_two, trinket, gameDisplay, loading }: Props) => {
    // console.log(weapon_one.critical_chance)
    const weaponOnePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_one?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_one?.imgURL} alt={weapon_one?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon_one?.type} [{weapon_one?.grip}] <br />
                {weapon_one?.attack_type} [{weapon_one?.damage_type?.[0]}{weapon_one?.damage_type?.[1] ? ' / ' + weapon_one.damage_type[1] : '' }] <br />
                {weapon_one?.constitution > 0 ? 'CON: +' + weapon_one?.constitution + ' ' : ''}
                {weapon_one?.strength > 0 ? 'STR: +' + weapon_one?.strength + ' ' : ''}
                {weapon_one?.agility > 0 ? 'AGI: +' + weapon_one?.agility + ' ' : ''}
                {weapon_one?.achre > 0 ? 'ACH: +' + weapon_one?.achre + ' ' : ''}
                {weapon_one?.caeren > 0 ? 'CAER: +' + weapon_one?.caeren + ' ' : ''}
                {weapon_one?.kyosir > 0 ? 'KYO: +' + weapon_one?.kyosir + ' ' : ''}<br />
                Damage: {weapon_one?.physical_damage} Phys | {weapon_one?.magical_damage} Magi <br />
                Penetration: {weapon_one?.physical_penetration} Phys | {weapon_one?.magical_penetration} Magi <br />
                Crit Chance: {weapon_one?.critical_chance}% <br />
                Crit Damage: {weapon_one?.critical_damage}x <br />
                Dodge Timer: {weapon_one?.dodge}s <br />
                Roll Chance: {weapon_one?.roll}% <br />
                Influence: {weapon_one?.influences}
            </Popover.Body>
        </Popover>
    )
    const weaponTwoPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_two?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_two?.imgURL} alt={weapon_two?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
            {weapon_two?.type} [{weapon_two?.grip}] <br />
                {weapon_two?.attack_type} [{weapon_two?.damage_type?.[0]}{weapon_two?.damage_type?.[1] ? ' / ' + weapon_two.damage_type[1] : '' }] <br />
                {weapon_two?.constitution > 0 ? 'CON: +' + weapon_two?.constitution + ' ' : ''}
                {weapon_two?.strength > 0 ? 'STR: +' + weapon_two?.strength + ' ' : ''}
                {weapon_two?.agility > 0 ? 'AGI: +' + weapon_two?.agility + ' ' : ''}
                {weapon_two?.achre > 0 ? 'ACH: +' + weapon_two?.achre + ' ' : ''}
                {weapon_two?.caeren > 0 ? 'CAER: +' + weapon_two?.caeren + ' ' : ''}
                {weapon_two?.kyosir > 0 ? 'KYO: +' + weapon_two?.kyosir + ' ' : ''}<br />
                Damage: {weapon_two?.physical_damage} Phys | {weapon_two?.magical_damage} Magi <br />
                Penetration: {weapon_two?.physical_penetration} Phys | {weapon_two?.magical_penetration} Magi <br />
                Crit Chance: {weapon_two?.critical_chance}% <br />
                Crit Damage: {weapon_two?.critical_damage}x <br />
                Dodge Timer: {weapon_two?.dodge}s <br />
                Roll Chance: {weapon_two?.roll}% <br />
                Influence: {weapon_two?.influences}
            </Popover.Body>
        </Popover>
    )
    const weaponThreePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_three?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_three?.imgURL} alt={weapon_three?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon_three?.type} [{weapon_three?.grip}] <br />
                {weapon_three?.attack_type} [{weapon_three?.damage_type?.[0]}{weapon_three?.damage_type?.[1] ? ' / ' + weapon_three.damage_type[1] : '' }] <br />
                {weapon_three?.constitution > 0 ? 'CON: +' + weapon_three?.constitution + ' ' : ''}
                {weapon_three?.strength > 0 ? 'STR: +' + weapon_three?.strength + ' ' : ''}
                {weapon_three?.agility > 0 ? 'AGI: +' + weapon_three?.agility + ' ' : ''}
                {weapon_three?.achre > 0 ? 'ACH: +' + weapon_three?.achre + ' ' : ''}
                {weapon_three?.caeren > 0 ? 'CAER: +' + weapon_three?.caeren + ' ' : ''}
                {weapon_three?.kyosir > 0 ? 'KYO: +' + weapon_three?.kyosir + ' ' : ''}<br />
                Damage: {weapon_three?.physical_damage} Phys | {weapon_three?.magical_damage} Magi <br />
                Penetration: {weapon_three?.physical_penetration} Phys | {weapon_three?.magical_penetration} Magi <br />
                Crit Chance: {weapon_three?.critical_chance}% <br />
                Crit Damage: {weapon_three?.critical_damage}x <br />
                Dodge Timer: {weapon_three?.dodge}s <br />
                Roll Chance: {weapon_three?.roll}% <br />
                Influence: {weapon_three?.influences}
            </Popover.Body>
        </Popover>
    )
    const shieldPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{shield?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + shield?.imgURL}  alt={shield?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {shield?.constitution > 0 ? 'CON: +' + shield?.constitution + ' ' : ''}
                {shield?.strength > 0 ? 'STR: +' + shield?.strength + ' ' : ''}
                {shield?.agility > 0 ? 'AGI: +' + shield?.agility + ' ' : ''}
                {shield?.achre > 0 ? 'ACH: +' + shield?.achre + ' ' : ''}
                {shield?.caeren > 0 ? 'CAER: +' + shield?.caeren + ' ' : ''}
                {shield?.kyosir > 0 ? 'KYO: +' + shield?.kyosir + ' ' : ''}
                <br />
                {shield?.type}<br />
                Physical Defense: +{shield?.physical_resistance}% <br />
                Magical Defense: +{shield?.magical_resistance}% <br />
                Physical Damage: {shield?.physical_damage}x <br />
                Magical Damage: {shield?.magical_damage}x <br />
                Crit Chance: +{shield?.critical_chance}% <br />
                Crit Damage: {shield?.critical_damage}x <br />
                Dodge Timer: +{shield?.dodge}s <br />
                Roll Chance: +{shield?.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const helmetPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{helmet?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + helmet?.imgURL} alt={helmet?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {helmet?.constitution > 0 ? 'CON: +' + helmet?.constitution + ' ' : ''}
                {helmet?.strength > 0 ? 'STR: +' + helmet?.strength + ' ' : ''}
                {helmet?.agility > 0 ? 'AGI: +' + helmet?.agility + ' ' : ''}
                {helmet?.achre > 0 ? 'ACH: +' + helmet?.achre + ' ' : ''}
                {helmet?.caeren > 0 ? 'CAER: +' + helmet?.caeren + ' ' : ''}
                {helmet?.kyosir > 0 ? 'KYO: +' + helmet?.kyosir + ' ' : ''}
                <br />
                {helmet?.type}<br />
                Physical Defense: +{helmet?.physical_resistance}% <br />
                Magical Defense: +{helmet?.magical_resistance}% <br />
                Physical Damage: {helmet?.physical_damage}x <br />
                Magical Damage: {helmet?.magical_damage}x <br />
                Crit Chance: +{helmet?.critical_chance}% <br />
                Crit Damage: {helmet?.critical_damage}x <br />
                Dodge Timer: +{helmet?.dodge}s <br />
                Roll Chance: +{helmet?.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const chestPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{chest?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + chest?.imgURL} alt={chest?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {chest?.constitution > 0 ? 'CON: +' + chest?.constitution + ' ' : ''}
                {chest?.strength > 0 ? 'STR: +' + chest?.strength + ' ' : ''}
                {chest?.agility > 0 ? 'AGI: +' + chest?.agility + ' ' : ''}
                {chest?.achre > 0 ? 'ACH: +' + chest?.achre + ' ' : ''}
                {chest?.caeren > 0 ? 'CAER: +' + chest?.caeren + ' ' : ''}
                {chest?.kyosir > 0 ? 'KYO: +' + chest?.kyosir + ' ' : ''}
                <br />
                {chest?.type}
                <br />
                Physical Defense: +{chest?.physical_resistance}% <br />
                Magical Defense: +{chest?.magical_resistance}% <br />
                Physical Damage: {chest?.physical_damage}x <br />
                Magical Damage: {chest?.magical_damage}x <br />
                Crit Chance: +{chest?.critical_chance}% <br />
                Crit Damage: {chest?.critical_damage}x <br />
                Dodge Timer: +{chest?.dodge}s <br />
                Roll Chance: +{chest?.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const legsPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{legs?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + legs?.imgURL} alt={legs?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {legs?.constitution > 0 ? 'CON: +' + legs?.constitution + ' ' : ''}
                {legs?.strength > 0 ? 'STR: +' + legs?.strength + ' ' : ''}
                {legs?.agility > 0 ? 'AGI: +' + legs?.agility + ' ' : ''}
                {legs?.achre > 0 ? 'ACH: +' + legs?.achre + ' ' : ''}
                {legs?.caeren > 0 ? 'CAER: +' + legs?.caeren + ' ' : ''}
                {legs?.kyosir > 0 ? 'KYO: +' + legs?.kyosir + ' ' : ''}
                <br />
                {legs?.type}<br />
                Physical Defense: +{legs?.physical_resistance}% <br />
                Magical Defense: +{legs?.magical_resistance}% <br />
                Physical Damage: {legs?.physical_damage}x <br />
                Magical Damage: {legs?.magical_damage}x <br />
                Crit Chance: +{legs?.critical_chance}% <br />
                Crit Damage: {legs?.critical_damage}x <br />
                Dodge Timer: +{legs?.dodge}s <br />
                Roll Chance: +{legs?.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const amuletPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{amulet?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + amulet?.imgURL} alt={amulet?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {amulet?.constitution > 0 ? 'CON: +' + amulet?.constitution + ' ' : ''}
                {amulet?.strength > 0 ? 'STR: +' + amulet?.strength + ' ' : ''}
                {amulet?.agility > 0 ? 'AGI: +' + amulet?.agility + ' ' : ''}
                {amulet?.achre > 0 ? 'ACH: +' + amulet?.achre + ' ' : ''}
                {amulet?.caeren > 0 ? 'CAER: +' + amulet?.caeren + ' ' : ''}
                {amulet?.kyosir > 0 ? 'KYO: +' + amulet?.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{amulet?.physical_resistance}% <br />
                Magical Defense: +{amulet?.magical_resistance}% <br />
                Physical Damage: {amulet?.physical_damage}x <br />
                Magical Damage: {amulet?.magical_damage}x <br />
                Crit Chance: +{amulet?.critical_chance}% <br />
                Crit Damage: {amulet?.critical_damage}x <br />
                Dodge Timer: +{amulet?.dodge}s <br />
                Roll Chance: +{amulet?.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const ringOnePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring_one?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring_one?.imgURL} alt={ring_one?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring_one?.constitution > 0 ? 'CON: +' + ring_one?.constitution + ' ' : ''}
                {ring_one?.strength > 0 ? 'STR: +' + ring_one?.strength + ' ' : ''}
                {ring_one?.agility > 0 ? 'AGI: +' + ring_one?.agility + ' ' : ''}
                {ring_one?.achre > 0 ? 'ACH: +' + ring_one?.achre + ' ' : ''}
                {ring_one?.caeren > 0 ? 'CAER: +' + ring_one?.caeren + ' ' : ''}
                {ring_one?.kyosir > 0 ? 'KYO: +' + ring_one?.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{ring_one?.physical_resistance}% <br />
                Magical Defense: +{ring_one?.magical_resistance}% <br />
                Physical Damage: {ring_one?.physical_damage}x <br />
                Magical Damage: {ring_one?.magical_damage}x <br />
                Crit Chance: +{ring_one?.critical_chance}% <br />
                Crit Damage: {ring_one?.critical_damage}x <br />
                Dodge Timer: +{ring_one?.dodge}s <br />
                Roll Chance: +{ring_one?.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const ringTwoPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring_two?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring_two?.imgURL} alt={ring_two?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring_two?.constitution > 0 ? 'CON: +' + ring_two?.constitution + ' ' : ''}
                {ring_two?.strength > 0 ? 'STR: +' + ring_two?.strength + ' ' : ''}
                {ring_two?.agility > 0 ? 'AGI: +' + ring_two?.agility + ' ' : ''}
                {ring_two?.achre > 0 ? 'ACH: +' + ring_two?.achre + ' ' : ''}
                {ring_two?.caeren > 0 ? 'CAER: +' + ring_two?.caeren + ' ' : ''}
                {ring_two?.kyosir > 0 ? 'KYO: +' + ring_two?.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{ring_two?.physical_resistance}% <br />
                Magical Defense: +{ring_two?.magical_resistance}% <br />
                Physical Damage: {ring_two?.physical_damage}x <br />
                Magical Damage: {ring_two?.magical_damage}x <br />
                Crit Chance: +{ring_two?.critical_chance}% <br />
                Crit Damage: {ring_two?.critical_damage}x <br />
                Dodge Timer: +{ring_two?.dodge}s <br />
                Roll Chance: +{ring_two?.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const trinketPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{trinket?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + trinket?.imgURL} alt={trinket?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {trinket?.constitution > 0 ? 'CON: +' + trinket?.constitution + ' ' : ''}
                {trinket?.strength > 0 ? 'STR: +' + trinket?.strength + ' ' : ''}
                {trinket?.agility > 0 ? 'AGI: +' + trinket?.agility + ' ' : ''}
                {trinket?.achre > 0 ? 'ACH: +' + trinket?.achre + ' ' : ''}
                {trinket?.caeren > 0 ? 'CAER: +' + trinket?.caeren + ' ' : ''}
                {trinket?.kyosir > 0 ? 'KYO: +' + trinket?.kyosir + ' ' : ''}
                <br />
                Physical Defense: +{trinket?.physical_resistance}% <br />
                Magical Defense: +{trinket?.magical_resistance}% <br />
                Physical Damage: {trinket?.physical_damage}x <br />
                Magical Damage: {trinket?.magical_damage}x <br />
                Crit Chance: +{trinket?.critical_chance}% <br />
                Crit Damage: {trinket?.critical_damage}x <br />
                Dodge Timer: +{trinket?.dodge}s <br />
                Roll Chance: +{trinket?.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    if (loading) {
        return (
            <Loading Combat={true} />
        )
    }
    return (
        <>
            {
                gameDisplay
                ? 
                <Row 
            // className="justify-content-center"
            className="justify-content-center"
            style={{ marginTop: -15 + '%', marginBottom: -25 + '%' }}
            >
                <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 }></Col>
            <Col 
            style={{marginLeft: -60 + 'px', marginRight: 10 + 'px'}}
            xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } 
            className="my-4">
            <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponOnePopover}>
            <img src={weapon_one?.imgURL} className="m-1 eqp-popover spec" alt={weapon_one?.name} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponTwoPopover}>
            <img src={weapon_two?.imgURL} className="m-1 eqp-popover spec" alt={weapon_two?.name} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponThreePopover}>
            <img src={weapon_three?.imgURL} className="m-1 eqp-popover spec" alt={weapon_three?.name} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={shieldPopover}>
            <img src={shield?.imgURL} className="m-1 eqp-popover spec" alt={shield?.name} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-5 mx-2">
            <OverlayTrigger trigger="click" placement="auto-start" overlay={helmetPopover}>
            <img src={helmet?.imgURL} className="m-1 eqp-popover spec" alt={helmet?.name} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="auto-start" overlay={chestPopover}>
            <img src={chest?.imgURL} className="m-1 eqp-popover spec" alt={chest?.name} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="auto-start" overlay={legsPopover}>
            <img src={legs?.imgURL} className="m-1 eqp-popover spec" alt={legs?.name} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-2">
            <OverlayTrigger trigger="click" placement="auto-start" overlay={amuletPopover}>
            <img src={amulet?.imgURL} className="m-1 eqp-popover spec" alt={amulet?.name} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="auto-start" overlay={ringOnePopover}>
            <img src={ring_one?.imgURL} className="m-1 eqp-popover spec" alt={ring_one?.name} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={ringTwoPopover}>
            <img src={ring_two?.imgURL} className="m-1 eqp-popover spec" alt={ring_two?.name} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="auto-start" overlay={trinketPopover}>
            <img src={trinket?.imgURL} className="m-1 eqp-popover spec" alt={trinket?.name} />
            </OverlayTrigger>
            </Col>

            </Row>
                :
            <Row 
            // className="justify-content-center"
            className="justify-content-center"
            >
                <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 }></Col>
            <Col 
            style={{marginLeft: -50 + 'px', marginRight: 10 + 'px'}}
            xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } 
            className="my-4">
            <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponOnePopover}>
            <img src={weapon_one?.imgURL} className="m-2 eqp-popover spec" alt={weapon_one?.name} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponTwoPopover}>
            <img src={weapon_two?.imgURL} className="m-2 eqp-popover spec" alt={weapon_two?.name} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponThreePopover}>
            <img src={weapon_three?.imgURL} className="m-2 eqp-popover spec" alt={weapon_three?.name} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={shieldPopover}>
            <img src={shield?.imgURL} className="m-2 eqp-popover spec" alt={shield?.name} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-4">
            <OverlayTrigger trigger="click" placement="auto-start" overlay={helmetPopover}>
            <img src={helmet?.imgURL} className="m-3 eqp-popover spec" alt={helmet?.name} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="auto-start" overlay={chestPopover}>
            <img src={chest?.imgURL} className="m-3 eqp-popover spec" alt={chest?.name} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="auto-start" overlay={legsPopover}>
            <img src={legs?.imgURL} className="m-3 eqp-popover spec" alt={legs?.name} />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-4">
            <OverlayTrigger trigger="click" placement="auto-start" overlay={amuletPopover}>
            <img src={amulet?.imgURL} className="m-2 eqp-popover spec" alt={amulet?.name} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="auto-start" overlay={ringOnePopover}>
            <img src={ring_one?.imgURL} className="m-2 eqp-popover spec" alt={ring_one?.name} />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="auto-start" overlay={ringTwoPopover}>
            <img src={ring_two?.imgURL} className="m-2 eqp-popover spec" alt={ring_two?.name} />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="auto-start" overlay={trinketPopover}>
            <img src={trinket?.imgURL} className="m-2 eqp-popover spec" alt={trinket?.name} />
            </OverlayTrigger>
            </Col>

            </Row>
            }
        </>
  )
}

export default AsceanImageCard