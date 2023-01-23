import './OriginsCard.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';

interface OriginProps {
    origin?: any;
}

const OriginsCard = ({ origin }: OriginProps) => {
    const [originModalShow, setOriginModalShow] = useState(false)

    const originPopover = (
        <Popover className="origin-popover" id="popover">
            <Popover.Header id="popover-header" className="header" as="h2"> 
            {origin.name}
            <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + origin.imgUrl} alt="Origin Culture Here" id="origin-pic" /></span>
            </Popover.Header>
            <Popover.Body id="popover-body" className="body">
            
                {origin.bio}<br /><br />
                Bonuses: {origin.bonus}
            </Popover.Body>
        </Popover>
    )
  return (
    <>
        {/* <OverlayTrigger trigger="click" placement="auto-start" overlay={originPopover}>
            <Button variant="outline-danger" className="m-3 p-4 eqp-popover">{origin.name}</Button>
        </OverlayTrigger> */}
    
        <Modal show={originModalShow} onHide={() => setOriginModalShow(false)} centered id='modal-weapon'>
        <Modal.Header closeButton closeVariant='white' style={{ textAlign: 'center', fontSize: 20 + 'px' }}> 
        <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + origin.imgUrl} alt="Origin Culture Here" id="origin-pic" /></span>
        {origin.name}
        </Modal.Header>
        <Modal.Body id='weapon-modal'>
            {origin.bio}<br /><br />
            Bonuses: {origin.bonus}
        </Modal.Body>
        </Modal>
        <Button variant='outline-danger' className="m-3 p-4 eqp-popover" onClick={() => setOriginModalShow(true)}>{origin.name}</Button>
    </>
  )
}

export default OriginsCard