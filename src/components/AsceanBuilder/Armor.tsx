import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import HelmetsCard from '../EquipmentCard/HelmetsCard';
import ChestsCard from '../EquipmentCard/ChestsCard';
import LegsCard from '../EquipmentCard/LegsCard';
import AmuletsCard from '../EquipmentCard/AmuletsCard';
import RingsCard from '../EquipmentCard/RingsCard';
import TrinketsCard from '../EquipmentCard/TrinketsCard';

interface Props {
    asceanState?: any;
    setAsceanState?: React.Dispatch<any>;
    helmets?: any;
    chests?: any;
    legs?: any;
    amulets?: any;
    rings?: any;
    trinkets?: any;
    helmetModalShow?: boolean;
    setHelmetModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
    chestModalShow?: boolean;
    setChestModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
    legsModalShow?: boolean;
    setLegsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
    amuletModalShow?: boolean;
    setAmuletModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
    ringsModalShow?: boolean;
    setRingsModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
    trinketModalShow?: boolean;
    setTrinketModalShow?: React.Dispatch<React.SetStateAction<boolean>>;
    
}

const Armor = ({ asceanState, setAsceanState, helmets, chests, legs, amulets, rings, trinkets, helmetModalShow, setHelmetModalShow, chestModalShow, setChestModalShow, legsModalShow, setLegsModalShow, amuletModalShow, setAmuletModalShow, ringsModalShow, setRingsModalShow, trinketModalShow, setTrinketModalShow }: Props) => {
    function handleEquipment(equipment: any) {
        console.log(equipment.target.value, '<- the Equipment value being handled?')
        console.log([equipment.target.innerText], '<- the Equipment name being handled?')
        let name = ''
        name = equipment.target.innerText;
        name = name.split('\n')[2];
        console.log(name, '<- What is the new name?')
        setAsceanState!({
            ...asceanState,
            [name]: equipment.target.value,
        })
    }
  return (
    <>
        <div className="edit-eqp-button">  
        <Button 
            variant="outline" 
            size="lg" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            className="my-2" 
            onClick={() => setHelmetModalShow!(true)}
        >Helmets and Hoods</Button>
        <Modal show={helmetModalShow}
            onHide={() => setHelmetModalShow!(false)}
            centered
            id="modal-weapon">
        <Modal.Body id="modal-weapon">
            {helmets.map((h: any, index: any) => {
                return (
                    <HelmetsCard userProfile={false} helmet={h} key={h._id} index={index} />
            )})}
        </Modal.Body>
        </Modal>
        </div>
        <Form.Select value={asceanState.helmet}  onChange={handleEquipment}>
            <option>Helmet and Hood Options</option>
        {helmets.map((h: any) => {
            return (
                <option value={h._id} label={h.name} key={h._id}>helmet</option>
            )
        })}
        </Form.Select>
        <svg height="5" width="100%" className="tapered-rule mt-3">
            <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>

{/* ========================================= Chest Equipment Selection ======================================= */}

        <div className="edit-eqp-button">
        <Button 
            variant="outline" 
            size="lg" 
            className="my-2" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setChestModalShow!(true)}
        >Cuirasses and Robes</Button>
        <Modal show={chestModalShow}
            onHide={() => setChestModalShow!(false)}
            centered
            id="modal-weapon">
        <Modal.Body id="modal-weapon">
            {chests.map((c: any, index: any) => {
                return (
                    <ChestsCard userProfile={false} chest={c} key={c._id} index={index}  />
            )})}
        </Modal.Body>
        </Modal>
        </div>
        <Form.Select value={asceanState.chest}  onChange={handleEquipment}>
            <option>Cuirass and Robe Options</option>
        {chests.map((c: any) => {
            return (
                <option value={c._id} label={c.name} key={c._id}>chest</option>
            )
        })}
        </Form.Select>
        <svg height="5" width="100%" className="tapered-rule mt-3">
            <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>

{/* ========================================== Leg Equipment Selection ======================================== */}

        <div className="edit-eqp-button">
        <Button 
            variant="outline" 
            className="my-2" 
            size="lg" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setLegsModalShow!(true)}
        >Greaves and Pants</Button>
        <Modal show={legsModalShow}
            onHide={() => setLegsModalShow!(false)}
            centered
            id="modal-weapon">
        <Modal.Body id="modal-weapon">
            {legs.map((l: any, index: any) => {
                return (
                    <LegsCard userProfile={false} leg={l} key={l._id} index={index} />
            )})}
        </Modal.Body>
        </Modal>
        </div>
        <Form.Select value={asceanState.leg}  onChange={handleEquipment}>
            <option>Greaves and Pant Options</option>
        {legs.map((l: any) => {
            return (
                <option value={l._id} label={l.name} key={l._id}>legs</option>
            )
        })}
        </Form.Select>
        <svg height="5" width="100%" className="tapered-rule mt-3">
            <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>  

{/* ======================================= Amulet Equipment Selection ========================================= */}

        <div className="edit-eqp-button">
        <Button 
            variant="outline" 
            className="my-2" 
            size="lg" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setAmuletModalShow!(true)}
        >Amulets and Chokers</Button>
        <Modal show={amuletModalShow}
            onHide={() => setAmuletModalShow!(false)}
            centered
            id="modal-weapon">
        <Modal.Body id="modal-weapon">
            {amulets.map((a: any, index: any) => {
                return (
                    <AmuletsCard userProfile={false} amulet={a} key={a._id} index={index} />
            )})}
        </Modal.Body>
        </Modal>
        </div>
        <Form.Select value={asceanState.amulet}  onChange={handleEquipment}>
            <option>Amulet and Choker Options</option>
        {amulets.map((a: any) => {
            return (
                <option value={a._id} label={a.name} key={a._id}>amulet</option>
            )
        })}
        </Form.Select>
        <svg height="5" width="100%" className="tapered-rule mt-3">
            <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>

{/* ======================================== Ring Equipment Selection ============================================ */}

        <div className="edit-eqp-button">
        <Button 
            variant="outline" 
            className="my-2" 
            size="lg" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setRingsModalShow!(true)}
        >Rings and Things</Button>
        <Modal show={ringsModalShow}
            onHide={() => setRingsModalShow!(false)}
            centered
            id="modal-weapon">
        <Modal.Body id="modal-weapon">
            {rings.map((r: any, index: any) => {
                return (
                    <RingsCard userProfile={false} ring={r} ring_one={r} ring_two={r} key={r._id} index={index} />
            )})}
        </Modal.Body>
        </Modal>
        </div>
        <Form.Select value={asceanState.ring_one}  onChange={handleEquipment}>
            <option>Ring One</option>
        {rings.map((r: any) => {
            return (
                <option value={r._id} label={r.name} key={r._id}>ring_one</option>
            )
        })}
        </Form.Select>
        <Form.Select value={asceanState.ring_two}  onChange={handleEquipment}>
            <option>Ring Two</option>
        {rings.map((r: any) => {
            return (
                <option value={r._id} label={r.name} key={r._id}>ring_two</option>
            )
        })}
        </Form.Select>

        <svg height="5" width="100%" className="tapered-rule mt-3">
            <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>

{/* ====================================== Trinket Equipment Selection ============================================== */}

        <div className="edit-eqp-button">
        <Button 
            variant="outline" 
            className="my-2" 
            size="lg" 
            style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}
            onClick={() => setTrinketModalShow!(true)}
        >Trinkets</Button>
        <Modal show={trinketModalShow}
            onHide={() => setTrinketModalShow!(false)}
            centered
            id="modal-weapon">
        <Modal.Body id="modal-weapon">
            {trinkets.map((t: any, index: any) => {
                return (
                    <TrinketsCard userProfile={false} trinket={t} key={t._id} index={index} />
            )})}
        </Modal.Body>
        </Modal>
        </div>
        <Form.Select value={asceanState.trinket}  onChange={handleEquipment}>
            <option>Trinket Options</option>
        {trinkets.map((t: any) => {
            return (
                <option value={t._id} label={t.name} key={t._id}>trinket</option>
            )
        })}
        </Form.Select>
    </>
  )
}

export default Armor