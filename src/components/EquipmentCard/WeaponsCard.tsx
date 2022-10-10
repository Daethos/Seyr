import React from 'react'
import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


interface WeaponProps {
    weapon: any;
    index: any;
    show: boolean;
    onHide: () => any;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeaponsCard = ({ weapon, index, show, setModalShow }: WeaponProps) => {
    const weaponPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{weapon.name} [{weapon.type}] <span id="popover-image"><img src={process.env.PUBLIC_URL + weapon.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {weapon.attack_type} [{weapon.damage_type}] <br />
                Damage: {weapon.physical_damage} Physical | {weapon.magical_damage} Magical <br />
                Critical Chance: +{weapon.critical_chance}% <br />
                Critical Damage: {weapon.critical_damage}x <br />
                Dodge Timer: +{weapon.dodge}s <br />
                Roll Chance: +{weapon.roll}% <br />
            </Popover.Body>
        </Popover>
    )
  return (
    
            <OverlayTrigger trigger="click" placement="right" overlay={weaponPopover}>
                <Button variant="outline-danger" size="lg" className="m-3 p-4">{weapon.name}</Button>
            </OverlayTrigger>
    
  )
}

export default WeaponsCard