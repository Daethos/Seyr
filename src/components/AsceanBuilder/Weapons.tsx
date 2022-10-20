import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import WeaponsCard from '../EquipmentCard/WeaponsCard';

interface Props {
    asceanState?: any;
    setAsceanState: React.Dispatch<any>;
    weapons?: any;
    weaponModalShow?: boolean;
    setWeaponModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Equipment = ({ asceanState, setAsceanState, weapons, weaponModalShow, setWeaponModalShow }: Props) => {
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
    <div className="actions">
        <h3>Weapons & Spells</h3>
        <div className="edit-eqp-button">
        <Button variant="outline" 
            className="my-2" 
            size="lg" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setWeaponModalShow(true)}
        >Weapons & Spells</Button>
        <Modal 
            show={weaponModalShow}
            onHide={() => setWeaponModalShow(false)}
            centered
            
            aria-labelledby="contained-modal-title-vcenter"
            id="modal-weapon"
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title >
                    Weapons & Spells
                    </Modal.Title>
                </Modal.Header> */}
        <Modal.Body id="modal-weapon" className="equipment-modal">
        {weapons.map((w: any, index: any) => {
            return (
                <WeaponsCard 
                    userProfile={false} 
                    weapon={w} 
                    weapon_one={w} 
                    weapon_two={w} 
                    weapon_three={w} 
                    key={w._id} 
                    index={index} 
                />
        )})}
        </Modal.Body>
        </Modal>
    </div>
    <div className="property-block">
    <Form.Select value={asceanState.weapon_one}  onChange={handleEquipment}>
        <option>Weapon or Spell One</option>
    {weapons.map((w: any) => {
        return (
            <option value={w._id} label={w.name} key={w._id}>weapon_one</option>
        )
    })}
    </Form.Select>
    <Form.Select value={asceanState.weapon_two}  onChange={handleEquipment}>
        <option>Weapon or Spell Two</option>
    {weapons.map((w: any) => {
        return (
            <option value={w._id} label={w.name} key={w._id}>weapon_two</option>
        )
    })}
    </Form.Select>
    <Form.Select value={asceanState.weapon_three}  onChange={handleEquipment}>
        <option>Weapon or Spell Three</option>
    {weapons.map((w: any) => {
        return (
            <option value={w._id} label={w.name} key={w._id}>weapon_three</option>
        )
    })}
    </Form.Select>
    </div>
    </div>
    </>
  )
}

export default Equipment