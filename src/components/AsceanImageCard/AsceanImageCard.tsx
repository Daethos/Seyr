import React from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'


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
}

const AsceanImageCard = ({ weapon_one, weapon_two, weapon_three, shield, helmet, chest, legs, amulet, ring_one, ring_two, trinket }: Props) => {
    const weaponOnePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_one.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_one.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon_one.type} [{weapon_one.grip}] <br />
                {weapon_one.attack_type} [{weapon_one.damage_type}] <br />
                Damage: {weapon_one.physical_damage} Physical | {weapon_one.magical_damage} Magical <br />
                Critical Chance: +{weapon_one.critical_chance}% <br />
                Critical Damage: {weapon_one.critical_damage}x <br />
                Dodge Timer: +{weapon_one.dodge}s <br />
                Roll Chance: +{weapon_one.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const weaponTwoPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_two.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_two.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
            {weapon_two.type} [{weapon_two.grip}] <br />
                {weapon_two.attack_type} [{weapon_two.damage_type}] <br />
                Damage: {weapon_two.physical_damage} Physical | {weapon_two.magical_damage} Magical <br />
                Critical Chance: +{weapon_two.critical_chance}% <br />
                Critical Damage: {weapon_two.critical_damage}x <br />
                Dodge Timer: +{weapon_two.dodge}s <br />
                Roll Chance: +{weapon_two.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const weaponThreePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_three.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_three.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon_three.type} [{weapon_three.grip}] <br />
                {weapon_three.attack_type} [{weapon_three.damage_type}] <br />
                Damage: {weapon_three.physical_damage} Physical | {weapon_three.magical_damage} Magical <br />
                Critical Chance: +{weapon_three.critical_chance}% <br />
                Critical Damage: {weapon_three.critical_damage}x <br />
                Dodge Timer: +{weapon_three.dodge}s <br />
                Roll Chance: +{weapon_three.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const shieldPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{shield.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + shield.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {shield.type}<br />
                Physical Defense: +{shield.physical_resistance}% <br />
                Magical Defense: +{shield.magical_resistance}% <br />
                Physical Damage: {shield.physical_damage}x <br />
                Magical Damage: {shield.magical_damage}x <br />
                Critical Chance: +{shield.critical_chance}% <br />
                Critical Damage: {shield.critical_damage}x <br />
                Dodge Timer: +{shield.dodge}s <br />
                Roll Chance: +{shield.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const helmetPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{helmet.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + helmet.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {helmet.type}<br />
                Physical Defense: +{helmet.physical_resistance}% <br />
                Magical Defense: +{helmet.magical_resistance}% <br />
                Physical Damage: {helmet.physical_damage}x <br />
                Magical Damage: {helmet.magical_damage}x <br />
                Critical Chance: +{helmet.critical_chance}% <br />
                Critical Damage: {helmet.critical_damage}x <br />
                Dodge Timer: +{helmet.dodge}s <br />
                Roll Chance: +{helmet.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const chestPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{chest.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + chest.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {chest.type}<br />
                Physical Defense: +{chest.physical_resistance}% <br />
                Magical Defense: +{chest.magical_resistance}% <br />
                Physical Damage: {chest.physical_damage}x <br />
                Magical Damage: {chest.magical_damage}x <br />
                Critical Chance: +{chest.critical_chance}% <br />
                Critical Damage: {chest.critical_damage}x <br />
                Dodge Timer: +{chest.dodge}s <br />
                Roll Chance: +{chest.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const legsPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{legs.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + legs.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {legs.type}<br />
                Physical Defense: +{legs.physical_resistance}% <br />
                Magical Defense: +{legs.magical_resistance}% <br />
                Physical Damage: {legs.physical_damage}x <br />
                Magical Damage: {legs.magical_damage}x <br />
                Critical Chance: +{legs.critical_chance}% <br />
                Critical Damage: {legs.critical_damage}x <br />
                Dodge Timer: +{legs.dodge}s <br />
                Roll Chance: +{legs.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const amuletPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{amulet.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + amulet.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {amulet.type}<br />
                Physical Defense: +{amulet.physical_resistance}% <br />
                Magical Defense: +{amulet.magical_resistance}% <br />
                Physical Damage: {amulet.physical_damage}x <br />
                Magical Damage: {amulet.magical_damage}x <br />
                Critical Chance: +{amulet.critical_chance}% <br />
                Critical Damage: {amulet.critical_damage}x <br />
                Dodge Timer: +{amulet.dodge}s <br />
                Roll Chance: +{amulet.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const ringOnePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring_one.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring_one.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring_one.type}<br />
                Physical Defense: +{ring_one.physical_resistance}% <br />
                Magical Defense: +{ring_one.magical_resistance}% <br />
                Physical Damage: {ring_one.physical_damage}x <br />
                Magical Damage: {ring_one.magical_damage}x <br />
                Critical Chance: +{ring_one.critical_chance}% <br />
                Critical Damage: {ring_one.critical_damage}x <br />
                Dodge Timer: +{ring_one.dodge}s <br />
                Roll Chance: +{ring_one.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const ringTwoPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring_two.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring_two.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring_two.type}<br />
                Physical Defense: +{ring_two.physical_resistance}% <br />
                Magical Defense: +{ring_two.magical_resistance}% <br />
                Physical Damage: {ring_two.physical_damage}x <br />
                Magical Damage: {ring_two.magical_damage}x <br />
                Critical Chance: +{ring_two.critical_chance}% <br />
                Critical Damage: {ring_two.critical_damage}x <br />
                Dodge Timer: +{ring_two.dodge}s <br />
                Roll Chance: +{ring_two.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    const trinketPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{trinket.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + trinket.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {trinket.type}<br />
                Physical Defense: +{trinket.physical_resistance}% <br />
                Magical Defense: +{trinket.magical_resistance}% <br />
                Physical Damage: {trinket.physical_damage}x <br />
                Magical Damage: {trinket.magical_damage}x <br />
                Critical Chance: +{trinket.critical_chance}% <br />
                Critical Damage: {trinket.critical_damage}x <br />
                Dodge Timer: +{trinket.dodge}s <br />
                Roll Chance: +{trinket.roll}% <br />
            </Popover.Body>
        </Popover>
    )
    return (
        <>
            <Row 
            // className="justify-content-center"
            className="align-items-center"
            
            >
                <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 }></Col>
            <Col 
            // style={{marginLeft: 15 + 'px'}}
            xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } 
            className="my-4 mx-4">
            <OverlayTrigger trigger="click" placement="right" overlay={weaponOnePopover}>
            <img src={weapon_one.imgURL} className="m-2 eqp-popover" />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="right" overlay={weaponTwoPopover}>
            <img src={weapon_two.imgURL} className="m-2 eqp-popover" />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="right" overlay={weaponThreePopover}>
            <img src={weapon_three.imgURL} className="m-2 eqp-popover" />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="right" overlay={shieldPopover}>
            <img src={shield.imgURL} className="m-2 eqp-popover" />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-4">
            <OverlayTrigger trigger="click" placement="top" overlay={helmetPopover}>
            <img src={helmet.imgURL} className="m-3 eqp-popover" />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="right" overlay={chestPopover}>
            <img src={chest.imgURL} className="m-3 eqp-popover" />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="bottom" overlay={legsPopover}>
            <img src={legs.imgURL} className="m-3 eqp-popover" />
            </OverlayTrigger>
            </Col>

            <Col xs={ 1 } sm={ 1 } md={ 1 } lg={ 1 } xl={ 1 } xxl={ 1 } className="my-4 mx-4">
            <OverlayTrigger trigger="click" placement="left" overlay={amuletPopover}>
            <img src={amulet.imgURL} className="m-2 eqp-popover" />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="left" overlay={ringOnePopover}>
            <img src={ring_one.imgURL} className="m-2 eqp-popover" />
            </OverlayTrigger>
            <OverlayTrigger trigger="click" placement="left" overlay={ringTwoPopover}>
            <img src={ring_two.imgURL} className="m-2 eqp-popover" />
            </OverlayTrigger>
            
            <OverlayTrigger trigger="click" placement="left" overlay={trinketPopover}>
            <img src={trinket.imgURL} className="m-2 eqp-popover" />
            </OverlayTrigger>
            </Col>

            </Row>
        </>
  )
}

export default AsceanImageCard