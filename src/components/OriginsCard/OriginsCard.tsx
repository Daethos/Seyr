import React from 'react'
import './OriginsCard.css';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


interface OriginProps {
    origin?: any;
}

const OriginsCard = ({ origin }: OriginProps) => {

    const originPopover = (
        <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2"> 
            {origin.name}
            <span id="popover-image"><img src={process.env.PUBLIC_URL + origin.imgUrl} alt="Origin Culture Here" id="origin-pic" /></span>
            </Popover.Header>
            <Popover.Body id="popover-body" className="">
            
                {origin.bio}<br /><br />
                Bonuses: {origin.bonus}
            </Popover.Body>
        </Popover>
    )
  return (
        <OverlayTrigger trigger="click" placement="right" overlay={originPopover}>
            <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{origin.name}</Button>
        </OverlayTrigger>
  )
}

export default OriginsCard