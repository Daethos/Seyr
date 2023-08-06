import './OriginsCard.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface OriginProps {
    origin?: any;
};

const OriginsCard = ({ origin }: OriginProps) => {
    const [originModalShow, setOriginModalShow] = useState(false);
    // closeButton closeVariant='white' 
    return (
        <>
        <Modal show={originModalShow} onHide={() => setOriginModalShow(false)} centered id='modal-weapon'>
        <Modal.Header closeButton closeVariant='white' style={{ fontSize: '24px' }}> 
        <span id="popover-spec-image"><img src={process.env.PUBLIC_URL + origin.imgUrl} alt={origin.name} id="origin-pic" /></span>
        <p style={{ marginLeft: 'auto' }}>{origin.name}</p>
        </Modal.Header>
        <Modal.Body id='weapon-modal'>
            {origin.bio}<br /><br />
            Bonuses: {origin.bonus}
        </Modal.Body>
        </Modal>
        <Button variant='' className="m-3 p-4 eqp-popover" style={{ color: "gold", fontSize: "24px" }} onClick={() => setOriginModalShow(true)}><img src={process.env.PUBLIC_URL + origin.imgUrl} alt="Origin Culture Here" style={{ maxWidth: "15vw", borderRadius: "50%", border: "2px solid purple" }} /> <br /> {origin.name}</Button>
        </>
    );
};

export default OriginsCard;