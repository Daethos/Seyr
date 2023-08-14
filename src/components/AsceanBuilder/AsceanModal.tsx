import { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import AsceanImageCard from '../AsceanImageCard/AsceanImageCard';
import AsceanAttributeCompiler from '../AsceanAttributeCompiler/AsceanAttributeCompiler';

interface AsceanModalProps {
    ascean?: any;
    link?: string;
    symbol?: JSX.Element;
};

const modalStyle = {
    border: '4px solid #5a0043',
    boxShadow: '0 0 1.25em #5a0043',
    fontFamily: "Cinzel",
    color: '#fdf6d8',
};

export const AsceanModal = ({ ascean, link, symbol }: AsceanModalProps) => {
    const [show, setShow] = useState(false);
    return (
        <>
        <Button variant="outline" style={{ color: ascean?.hardcore ? 'red' : 'gold', marginLeft: '-14px', fontWeight: 600 }} onClick={() => setShow(true)}>{symbol}</Button>
        <Modal show={show} onHide={() => setShow(false)} centered aria-labelledby="contained-modal-title-vcenter" >
            <Modal.Header style={{ fontSize: "28px", color: "gold", border: '4px solid #5a0043', boxShadow: '0 0 1.25em #5a0043' }}>
                <div className='creature-heading'>
                    {ascean.name}
                <h2 style={{ fontSize: "18px", color: "goldenrod" }}>
                    {ascean.description}
                </h2>
                </div>
            <span style={{ float: "right" }}>
                <img className='dialog-picture' src={process.env.PUBLIC_URL + '/images/' + ascean.origin + '-' + ascean.sex + '.jpg'} alt={ascean.origin + ascean.sex} style={{ borderRadius: '50%', border: '2px solid gold', boxShadow: '0 0 10px gold' }} /> 
            </span>
            </Modal.Header>
            <Modal.Body style={modalStyle}>
                Level: {ascean.level}<br />
                Experience: {ascean.experience} / {ascean.level * 1000}<br />
                Mastery: {ascean.mastery}<br />
                <AsceanAttributeCompiler ascean={ascean} />
                <AsceanImageCard 
                    weapon_one={ascean.weapon_one}
                    weapon_two={ascean.weapon_two}
                    weapon_three={ascean.weapon_three}
                    shield={ascean.shield}
                    helmet={ascean.helmet}
                    chest={ascean.chest}
                    legs={ascean.legs}
                    amulet={ascean.amulet}
                    ring_one={ascean.ring_one}
                    ring_two={ascean.ring_two}
                    trinket={ascean.trinket}
                    key={ascean._id} 
                />
            <Nav.Link as={NavLink} to={link + ascean._id} style={{ color: ascean.hardcore ? 'red' : 'gold', fontSize: "32px", fontWeight: 900, textShadow: "1px 1px 1px purple" }} className='btn btn-lg btn-outline-black mb-1 update-links'>
                Play as {ascean.name}
            </Nav.Link>
            </Modal.Body>
        </Modal>
        </>
    );
};