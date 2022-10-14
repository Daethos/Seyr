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
        console.log(equipment.target.value, '<- the Equipment value being handled?')
        console.log([equipment.target.innerText], '<- the Equipment name being handled?')
        let name = ''
        name = equipment.target.innerText;
        name = name.split('\n')[2];
        console.log(name, '<- What is the new name?')
        setAsceanState({
            ...asceanState,
            [name]: equipment.target.value,
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
            <option value={s._id} label={s.name} key={s._id}>shield</option>
        )
    })}
    </Form.Select>
    </>
  )
}

export default Shields