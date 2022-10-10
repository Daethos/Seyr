import React from 'react'
import './EquipmentCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

interface RingProps {
    ring: any;
    index: any;
    show: boolean;
    onHide: () => any;
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const RingsCard = ({ ring, index, show, setModalShow }: RingProps) => {
    const ringPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h3">{ring.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + ring.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {ring.type}<br />
                Physical Defense: +{ring.phyiscal_resistance}% <br />
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
  return (
    <OverlayTrigger trigger="click" placement="right" overlay={ringPopover}>
        <Button variant="outline-danger" size="lg" className="m-3 p-4">{ring.name}</Button>
    </OverlayTrigger>
  )
}

export default RingsCard