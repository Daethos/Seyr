import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ShieldsCard from '../EquipmentCard/ShieldsCard';

interface Props {
    asceanState?: any;
    setAsceanState?: any;
    shields?: any;
    shieldModalShow?: boolean;
    setShieldModalShow?: any;
}

const Shields = ({ asceanState, setAsceanState, shields, shieldModalShow, setShieldModalShow }: Props) => {
    function handleEquipment(equipment: any) {
        setAsceanState({
            ...asceanState,
            'shield': equipment.target.value,
        })
    }
  return (
    <>
    <div className="edit-eqp-button">
        <Button variant="outline" 
            className="mb-2" 
            size="lg" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setShieldModalShow(true)}
        >Shields</Button>
        <Modal show={shieldModalShow}
            onHide={() => setShieldModalShow(false)}
            centered
            id="modal-weapon">
        <Modal.Body id="modal-weapon">
            {shields.map((s: any, index: any) => {
                return (
                    <ShieldsCard userProfile={false} shield={s} key={s._id} index={index} />
            )})}
        </Modal.Body>
        </Modal>
    </div>
    <Form.Select value={asceanState.shield}  onChange={handleEquipment}>
        <option>Shield Options</option>
    {shields.map((s: any) => {
        return (
            <option value={s._id} key={s._id}>{s.name}</option>
        )
    })}
    </Form.Select>
    </>
  )
}

export default Shields