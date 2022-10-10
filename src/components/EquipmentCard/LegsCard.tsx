import React from 'react'
import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface LegProps {
    leg: any;
    index: any;
    userProfile: boolean;
}

const LegsCard = ({ leg, index, userProfile }: LegProps) => {
    const legPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{leg.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + leg.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {leg.type}<br />
                Physical Defense: +{leg.physical_resistance}% <br />
                Magical Defense: +{leg.magical_resistance}% <br />
                Physical Damage: {leg.physical_damage}x <br />
                Magical Damage: {leg.magical_damage}x <br />
                Critical Chance: +{leg.critical_chance}% <br />
                Critical Damage: {leg.critical_damage}x <br />
                Dodge Timer: +{leg.dodge}s <br />
                Roll Chance: +{leg.roll}% <br />
            </Popover.Body>
        </Popover>
    )
  return (
    <OverlayTrigger trigger="click" placement="right" overlay={legPopover}>
        <Button variant="outline-danger" className="m-3 p-4">{leg.name}</Button>
    </OverlayTrigger>
  )
}

export default LegsCard