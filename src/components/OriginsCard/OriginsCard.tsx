import './OriginsCard.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface OriginProps {
    origin?: any;
};

const OriginsCard = ({ origin }: OriginProps) => {
    const [originModalShow, setOriginModalShow] = useState(false);

    return (
        <>
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
    );
};

export default OriginsCard;