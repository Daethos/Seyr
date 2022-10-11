import React from 'react'
import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface RingProps {
    ring?: any;
    ring_one?: any;
    ring_two?: any;
    index: any;
    userProfile: boolean;
}

const RingsCard = ({ ring, index, ring_one, ring_two, userProfile }: RingProps) => {
    const ringPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring.type}<br />
                Physical Defense: +{ring.physical_resistance}% <br />
                Magical Defense: +{ring.magical_resistance}% <br />
                Physical Damage: {ring.physical_damage}x <br />
                Magical Damage: {ring.magical_damage}x <br />
                Critical Chance: +{ring.critical_chance}% <br />
                Critical Damage: {ring.critical_damage}x <br />
                Dodge Timer: +{ring.dodge}s <br />
                Roll Chance: +{ring.roll}% <br />
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
  return (
    <>
    {
        userProfile
        ?
        <>
        <OverlayTrigger trigger="click" placement="right" overlay={ringOnePopover}>
            <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{ring_one.name}</Button>
        </OverlayTrigger>
        <OverlayTrigger trigger="click" placement="right" overlay={ringTwoPopover}>
            <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{ring_two.name}</Button>
        </OverlayTrigger>
        </>
        :
        <OverlayTrigger trigger="click" placement="right" overlay={ringPopover}>
            <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{ring.name}</Button>
        </OverlayTrigger>
    }
    </>
  )
}

export default RingsCard