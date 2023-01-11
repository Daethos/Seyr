import { right } from '@popperjs/core';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



interface Props {
    inventory: any;
    ascean: any;
    eqpSwap: boolean;
    removeItem: boolean;
    setEqpSwap: React.Dispatch<React.SetStateAction<boolean>>;
    setRemoveItem: React.Dispatch<React.SetStateAction<boolean>>;
}

const Inventory = ({ ascean, inventory, eqpSwap, removeItem, setEqpSwap, setRemoveItem }: Props) => {
    const [inventoryModalShow, setInventoryModalShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState<boolean>(false);
    const [inventoryType, setInventoryType] = useState({});
    const [inventoryTypeTwo, setInventoryTypeTwo] = useState<any>(null);
    const [inventoryTypeThree, setInventoryTypeThree] = useState<any>(null);
    const [inventoryRingType, setInventoryRingType] = useState<any>(null);
    
    const [editState, setEditState] = useState({
        weapon_one: ascean.weapon_one,
        weapon_two: ascean.weapon_two,
        weapon_three: ascean.weapon_three,
        helmet: ascean.helmet,
        chest: ascean.chest,
        legs: ascean.legs,
        amulet: ascean.amulet,
        ring_one: ascean.ring_one,
        ring_two: ascean.ring_two,
        trinket: ascean.trinket,
        shield: ascean.shield,
        new_weapon_one: '',
        new_weapon_two: '',
        new_weapon_three: '',
        new_helmet: '',
        new_chest: '',
        new_legs: '',
        new_amulet: '',
        new_ring_one: '',
        new_ring_two: '',
        new_trinket: '',
        new_shield: '',
        _id: ascean._id,
    });

    useEffect(() => {
      checkInventory();
    }, [ascean, inventory]);

    useEffect(() => {
      console.log(editState, '<- What is the edit state?');
      return () => {
        console.log('unmounting...');
      }
    }, [editState])
      

    function handleInventory(equipment: any) {
        let type: string = '';
        type = `new_${inventoryType}`;
        console.log(type, '<- What is the type?');
        console.log(equipment.target.value, '<- What is the equipment?');
        setEditState({
            ...editState,
            [inventoryType as keyof typeof editState]: equipment.target.value === ascean[inventoryType as keyof typeof editState]._id ? ascean[inventoryType as keyof typeof editState] : inventory,
            [type]: equipment.target.value,
        });
    }

    function handleInventoryW2(equipment: any) {
        setEditState({
            ...editState,
            [inventoryTypeTwo as keyof typeof editState]: equipment.target.value === ascean[inventoryTypeTwo as keyof typeof editState]._id ? ascean.weapon_two : inventory,
            new_weapon_one: '',
            new_weapon_two: equipment.target.value,
            new_weapon_three: '',
        });
    }

    function handleInventoryW3(equipment: any) {
        setEditState({
            ...editState,
            [inventoryTypeThree as keyof typeof editState]: equipment.target.value === ascean[inventoryTypeThree as keyof typeof editState]._id ? ascean.weapon_three : inventory,
            new_weapon_one: '',
            new_weapon_two: '',
            new_weapon_three: equipment.target.value,
        });
    }

    function handleInventoryR2(equipment: any) {
        setEditState({
            ...editState,
            [inventoryRingType as keyof typeof editState]: equipment.target.value === ascean[inventoryRingType as keyof typeof editState]._id ? ascean.ring_two : inventory,
            new_ring_one: '',
            new_ring_two: equipment.target.value,
        });
    }
    
    async function checkInventory() {
        let type: string = '';
        let typeTwo: string = '';
        let typeThree: string = '';
        let ringType: string = '';
        try {
            if (inventory?.grip) {
                type = 'weapon_one';
                typeTwo = 'weapon_two';
                typeThree = 'weapon_three';
                setInventoryType('weapon_one');
                setInventoryTypeTwo('weapon_two');
                setInventoryTypeThree('weapon_three');
            }
            if (inventory?.name.includes('Hood') || inventory?.name.includes('Helm') || inventory?.name.includes('Mask')) {
                type = 'helmet';
                setInventoryType('helmet');
            }
            if (inventory?.name.includes('Cuirass') || inventory?.name.includes('Robes') || inventory?.name.includes('Armor')) {
                setInventoryType('chest');
                type = 'chest';
            }
            if (inventory?.name.includes('Greaves') || inventory?.name.includes('Pants') || inventory?.name.includes('Legs')) {
                setInventoryType('legs');
                type = 'legs';
            }
            if (inventory?.name.includes('Amulet')) {
                setInventoryType('amulet');
                type = 'amulet';
            }
            if (inventory?.name.includes('Ring')) {
                setInventoryType('ring_one');
                setInventoryRingType('ring_two');
                type = 'ring_one';
                ringType = 'ring_two';
            }
            if (inventory?.name.includes('Trinket')) {
                setInventoryType('trinket');
                type = 'trinket';
            }
            if (inventory?.type.includes('Shield')) {
                setInventoryType('shield');
                type = 'shield';
            }
        } catch (err: any) {
            console.log(err.message, '<- This is the error in checkInventory');
        }
    }

    async function handleRemoveItem() {
        try {
            const data = {
                id: ascean._id,
                inventory: inventory,
            }
            const response = await asceanAPI.removeItem(data);
            console.log(response, '<- Response in handleRemoveItem');
            setRemoveItem(true);
        } catch (err: any) {
            console.log(err.message, '<- This is the error in handleRemoveItem');
        }
    }

    async function handleEquipmentSwap(newAscean: Object) {
        try {
            console.log(newAscean, '<- newAscean in Swapping Equipment start');
            const response = await asceanAPI.equipmentSwap(newAscean);
            console.log(response, '<- Response in Swapping Equipment');
            setEqpSwap(!eqpSwap);
        } catch (err) {
            console.log(err, '<- This is the error in Swapping Equipment');
        }
      }

    const inventoryPopover = (
        <Popover className="text-info" id="popover" style={{ zIndex: 1 }}>
            <Popover.Header id="popover-header" className="" as="h2">{inventory?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + inventory?.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                {
                    inventory?.grip && inventory?.type ?
                    <>
                {inventory?.type} [{inventory?.grip}] <br />
                {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : '' }]  <br />
                    </>
                    : inventory?.type ? <>{inventory?.type} <br /></> : ''
                }
                {inventory?.constitution > 0 ? 'CON: +' + inventory?.constitution + ' ' : ''}
                {inventory?.strength > 0 ? 'STR: +' + inventory?.strength + ' ' : ''}
                {inventory?.agility > 0 ? 'AGI: +' + inventory?.agility + ' ' : ''}
                {inventory?.achre > 0 ? 'ACH: +' + inventory?.achre + ' ' : ''}
                {inventory?.caeren > 0 ? 'CAER: +' + inventory?.caeren + ' ' : ''}
                {inventory?.kyosir > 0 ? 'KYO: +' + inventory?.kyosir + ' ' : ''}<br />
                Damage: {inventory?.physical_damage} Physical | {inventory?.magical_damage} Magical <br />
                {
                    inventory?.physical_resistance ?
                    <>
                    Defense: {inventory?.physical_resistance} % Physical | {inventory?.magical_resistance} % Magical <br />
                    </>
                    : ''
                }
                {
                    inventory?.physical_penetration ?
                    <>
                    Penetration: {inventory?.physical_penetration} Physical | {inventory?.magical_penetration} Magical <br />
                    </>
                    : ''
                }
                Critical Chance: {inventory?.critical_chance}% <br />
                Critical Damage: {inventory?.critical_damage}x <br />
                Dodge Timer: {inventory?.dodge}s <br />
                Roll Chance: {inventory?.roll}% <br />
                {
                    inventory?.influences ?
                    <>
                Influence: {inventory?.influences} <br />
                    </>
                    : ''
                }
                <br />
                {inventory?.rarity}
                <Button variant='outline' className='' style={{ float: 'right', color: 'blue', marginTop: -3 + '%', marginRight: -4 + '%', fontWeight: 600 }} onClick={() => setInventoryModalShow(!inventoryModalShow)}>Inspect</Button>
            </Popover.Body>
        </Popover>
    )

    function getBorderStyle(rarity: string) {
        switch (rarity) {
            case 'Common':
                return '2px solid white';
            case 'Uncommon':
                return '2px solid green';
            case 'Rare':
                return '2px solid blue';
            case 'Epic':
                return '2px solid purple';
            case 'Legendary':
                return '2px solid orange';
            default:
                return '2px solid grey';
        }
    }

    const getItemStyle = {
        float: right,
        background: 'black',
        border: getBorderStyle(inventory?.rarity)
    }

    return (
        <>
        <Modal show={removeModalShow} onHide={() => setRemoveModalShow(false)} centered id='modal-weapon' style={{ marginTop: 50 + '%' }}>
            <Modal.Header>
                Do You Wish To Remove and Destroy Your {inventory?.name}?
            </Modal.Header>
            <Modal.Body id='weapon-modal'>
                <Button variant='outline' className='' 
                style={{ color: 'red', fontWeight: 600 }} onClick={() => handleRemoveItem()}>Destroy</Button>    
            </Modal.Body>
        </Modal>
        <Modal show={inventoryModalShow} onHide={() => setInventoryModalShow(false)} centered id='modal-weapon' style={{ marginTop: 60 + '%' }}>
            <Modal.Header>
                Do You Wish To Change Your {editState[inventoryType as keyof typeof editState]?.name} to {inventory?.name}?
            </Modal.Header>
            <Modal.Body id='weapon-modal'>
            <Form.Select value={
                inventoryType === 'weapon_one' ? editState.weapon_one?._id : inventoryType === 'shield' ? editState.shield._id : inventoryType === 'helmet' ? 
                editState.helmet._id : inventoryType === 'chest' ? editState.chest._id : inventoryType === 'legs' ? 
                editState.legs._id : inventoryType === 'amulet' ? editState.amulet._id : inventoryType === 'ring_one' ? 
                editState.ring_one._id : inventoryType === 'trinket' ? editState.trinket._id : ''} onChange={handleInventory}>
                    <option value={(editState as { [key: string]: any })[inventoryType as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryType as keyof typeof editState]?.name}</option>
                    <option value={ascean[inventoryType as keyof typeof editState]?._id}>{ascean[inventoryType as keyof typeof editState]?.name}</option>
                <option value={inventory?._id}>{inventory?.name}</option>
            </Form.Select>
            {
                inventory?.grip && inventory?.type ?
                <><br />
                 <Form.Select value={editState.weapon_two._id} onChange={handleInventoryW2}>
                    <option value={(editState as { [key: string]: any })[inventoryTypeTwo as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryTypeTwo as keyof typeof editState]?.name}</option>
                    <option value={ascean[inventoryTypeTwo as keyof typeof editState]?._id}>{ascean[inventoryTypeTwo as keyof typeof editState]?.name}</option>
                    <option value={inventory?._id}>{inventory?.name}</option>
                </Form.Select><br />
                <Form.Select value={editState.weapon_three._id} onChange={handleInventoryW3}>
                    <option value={(editState as { [key: string]: any })[inventoryTypeThree as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryTypeThree as keyof typeof editState]?.name}</option>
                    <option value={ascean[inventoryTypeThree as keyof typeof editState]?._id}>{ascean[inventoryTypeThree as keyof typeof editState]?.name}</option>
                    <option value={inventory?._id}>{inventory?.name}</option>
                </Form.Select>
                </>
                : ''
            }
            {
                inventoryType === 'ring_one' ?
                <>
                <br />
                 <Form.Select value={editState.ring_two} onChange={handleInventoryR2}>
                    <option value={ascean[inventoryRingType]?._id}>{ascean[inventoryRingType]?.name}</option>
                    <option value={inventory?._id}>{inventory?.name}</option>
                </Form.Select>
                </>
                : ''
            }
            <br />
            <Button variant='outline' className='' style={{ float: 'left', color: 'green', fontWeight: 600 }} onClick={() => handleEquipmentSwap(editState)}>Equip</Button>
            <Button variant='outline' style={{ color: 'red', fontWeight: 600 }} onClick={() => setRemoveModalShow(true)}>Remove</Button>
            <Button variant='outline' className='' style={{ float: 'right', color: 'blue', fontWeight: 600 }} onClick={() => setInventoryModalShow(false)}>Close</Button>
            </Modal.Body>
        </Modal>
        <OverlayTrigger trigger="click" placement="auto-start" overlay={inventoryPopover}>
            <Button variant="" className="inventory-icon" style={getItemStyle}><img src={process.env.PUBLIC_URL + inventory?.imgURL} /></Button>
        </OverlayTrigger>
        </>
    )
}

export default Inventory