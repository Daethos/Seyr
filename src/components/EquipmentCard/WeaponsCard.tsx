import React from 'react'
import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'


interface WeaponProps {
    weapon?: any;
    weapon_one?: any;
    weapon_two?: any;
    weapon_three?: any;
    index: any;
    userProfile: boolean;
}

const WeaponsCard = ({ weapon, index, weapon_one, weapon_two, weapon_three, userProfile }: WeaponProps) => {
    let weaponDamageTypeSplitter: any = [weapon.damage_type]
    if (weaponDamageTypeSplitter.length > 1) {
        weaponDamageTypeSplitter.split('');
        console.log(weaponDamageTypeSplitter, '<- What values were split?')
        return weaponDamageTypeSplitter
    } 
    const weaponPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon.type} [{weapon.grip}] <br />
                {weapon.attack_type} [{weapon?.damage_type?.[0]}{weapon?.damage_type?.[1] ? ' / ' + weapon.damage_type[1] : '' }]  <br />
                {weapon.constitution > 0 ? 'CON: +' + weapon.constitution + ' ' : ''}
                {weapon.strength > 0 ? 'STR: +' + weapon.strength + ' ' : ''}
                {weapon.agility > 0 ? 'AGI: +' + weapon.agility + ' ' : ''}
                {weapon.achre > 0 ? 'ACH: +' + weapon.achre + ' ' : ''}
                {weapon.caeren > 0 ? 'CAER: +' + weapon.caeren + ' ' : ''}
                {weapon.kyosir > 0 ? 'KYO: +' + weapon.kyosir + ' ' : ''}<br />
                Damage: {weapon.physical_damage} Physical | {weapon.magical_damage} Magical <br />
                Critical Chance: +{weapon.critical_chance}% <br />
                Critical Damage: {weapon.critical_damage}x <br />
                Dodge Timer: +{weapon.dodge}s <br />
                Roll Chance: +{weapon.roll}% <br />
                Influence: {weapon.influences}
            </Popover.Body>
        </Popover>
    )
    const weaponOnePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_one!.name} [{weapon_one?.type}] <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_one.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon_one?.attack_type} [{weapon_one?.damage_type?.[0]} {weapon_one?.damage_type?.[1] ? ' / ' + weapon_one.damage_type[1] : '' }] <br />
                {weapon_one.constitution > 0 ? 'CON: +' + weapon_one.constitution + ' ' : ''}
                {weapon_one.strength > 0 ? 'STR: +' + weapon_one.strength + ' ' : ''}
                {weapon_one.agility > 0 ? 'AGI: +' + weapon_one.agility + ' ' : ''}
                {weapon_one.achre > 0 ? 'ACH: +' + weapon_one.achre + ' ' : ''}
                {weapon_one.caeren > 0 ? 'CAER: +' + weapon_one.caeren + ' ' : ''}
                {weapon_one.kyosir > 0 ? 'KYO: +' + weapon_one.kyosir + ' ' : ''}<br />
                Damage: {weapon_one?.physical_damage} Physical | {weapon_one?.magical_damage} Magical <br />
                Critical Chance: +{weapon_one?.critical_chance}% <br />
                Critical Damage: {weapon_one?.critical_damage}x <br />
                Dodge Timer: +{weapon_one?.dodge}s <br />
                Roll Chance: +{weapon_one?.roll}% <br />
                Influence: {weapon_one.influences}
            </Popover.Body>
        </Popover>
    )
    const weaponTwoPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_two?.name} [{weapon_two?.type}] <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_two.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon_two?.attack_type} [{weapon_two?.damage_type}] <br />
                {weapon_two.constitution > 0 ? 'CON: +' + weapon_two.constitution + ' ' : ''}
                {weapon_two.strength > 0 ? 'STR: +' + weapon_two.strength + ' ' : ''}
                {weapon_two.agility > 0 ? 'AGI: +' + weapon_two.agility + ' ' : ''}
                {weapon_two.achre > 0 ? 'ACH: +' + weapon_two.achre + ' ' : ''}
                {weapon_two.caeren > 0 ? 'CAER: +' + weapon_two.caeren + ' ' : ''}
                {weapon_two.kyosir > 0 ? 'KYO: +' + weapon_two.kyosir + ' ' : ''}<br />
                Damage: {weapon_two?.physical_damage} Physical | {weapon_two?.magical_damage} Magical <br />
                Critical Chance: +{weapon_two?.critical_chance}% <br />
                Critical Damage: {weapon_two?.critical_damage}x <br />
                Dodge Timer: +{weapon_two?.dodge}s <br />
                Roll Chance: +{weapon_two?.roll}% <br />
                Influence: {weapon_two.influences}
            </Popover.Body>
        </Popover>
    )
    const weaponThreePopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon_three?.name} [{weapon_three?.type}] <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon_three.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon_three?.attack_type} [{weapon_three?.damage_type}] <br />
                {weapon_three.constitution > 0 ? 'CON: +' + weapon_three.constitution + ' ' : ''}
                {weapon_three.strength > 0 ? 'STR: +' + weapon_three.strength + ' ' : ''}
                {weapon_three.agility > 0 ? 'AGI: +' + weapon_three.agility + ' ' : ''}
                {weapon_three.achre > 0 ? 'ACH: +' + weapon_three.achre + ' ' : ''}
                {weapon_three.caeren > 0 ? 'CAER: +' + weapon_three.caeren + ' ' : ''}
                {weapon_three.kyosir > 0 ? 'KYO: +' + weapon_three.kyosir + ' ' : ''}<br />
                Damage: {weapon_three.physical_damage} Physical | {weapon_three?.magical_damage} Magical <br />
                Critical Chance: +{weapon_three.critical_chance}% <br />
                Critical Damage: {weapon_three.critical_damage}x <br />
                Dodge Timer: +{weapon_three.dodge}s <br />
                Roll Chance: +{weapon_three.roll}% <br />
                Influence: {weapon_three.influences}
            </Popover.Body>
        </Popover>
    )
  return (
    <>
    {
        userProfile
        ? 
        <>
        <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponOnePopover}>
                <Button variant="outline-danger"  className="m-3 p-4 eqp-popover">{weapon_one?.name}</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponTwoPopover}>
                <Button variant="outline-danger"  className="m-3 p-4 eqp-popover">{weapon_two?.name}</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponThreePopover}>
                <Button variant="outline-danger"  className="m-3 p-4 eqp-popover">{weapon_three?.name}</Button>
        </OverlayTrigger>
        </>
        : 
            <OverlayTrigger trigger="click" placement="auto-start" overlay={weaponPopover}>
                <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{weapon?.name}</Button>
            </OverlayTrigger>
    } 
    </>
  )
}

export default WeaponsCard