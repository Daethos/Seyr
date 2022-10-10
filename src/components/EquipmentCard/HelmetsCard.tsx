import React from 'react'
import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface HelmetProps {
    helmet: any;
    index: any;
    userProfile: boolean;
}

const HelmetsCard = ({ helmet, index, userProfile }: HelmetProps) => {
    const helmetPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{helmet.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + helmet.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {helmet.type}<br />
                Physical Defense: +{helmet.phyiscal_resistance}% <br />
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
  return (
    <OverlayTrigger trigger="click" placement="right" overlay={helmetPopover}>
        <Button variant="outline-danger"  className="m-3 p-4">{helmet.name}</Button>
    </OverlayTrigger>
  )
}

export default HelmetsCard