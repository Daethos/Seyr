import React from 'react'
import './Modal.css'
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
    function handleWeaponOne(equipment: any) {
        setAsceanState({
            ...asceanState,
            'weapon_one': equipment.target.value,
        })
    }
    function handleWeaponTwo(equipment: any) {
        setAsceanState({
            ...asceanState,
            'weapon_two': equipment.target.value,
        })
    }
    function handleWeaponThree(equipment: any) {
        setAsceanState({
            ...asceanState,
            'weapon_three': equipment.target.value,
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
            id=""
            >
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
    <Form.Select value={asceanState.weapon_one}  onChange={handleWeaponOne}>
        <option>Weapon or Spell One</option>
    {weapons.map((w: any) => {
        return (
            <option value={w._id} key={w._id}>{w.name}</option>
        )
    })}
    </Form.Select>
    <Form.Select value={asceanState.weapon_two}  onChange={handleWeaponTwo}>
        <option>Weapon or Spell Two</option>
    {weapons.map((w: any) => {
        return (
            <option value={w._id} key={w._id}>{w.name}</option>
        )
    })}
    </Form.Select>
    <Form.Select value={asceanState.weapon_three}  onChange={handleWeaponThree}>
        <option>Weapon or Spell Three</option>
    {weapons.map((w: any) => {
        return (
            <option value={w._id} key={w._id}>{w.name}</option>
        )
    })}
    </Form.Select>
    </div>
    </div>
    </>
  )
}

export default Equipment