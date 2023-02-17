import { right } from '@popperjs/core';
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as eqpAPI from '../../utils/equipmentApi';
import Overlay from 'react-bootstrap/Overlay';
import Spinner from 'react-bootstrap/Spinner';


interface Props {
    inventory: any;
    ascean: any;
    eqpSwap: boolean;
    removeItem: boolean;
    setEqpSwap: React.Dispatch<React.SetStateAction<boolean>>;
    setRemoveItem: React.Dispatch<React.SetStateAction<boolean>>;
    bag: any;
    loadedAscean: boolean;
    setLoadedAscean: React.Dispatch<React.SetStateAction<boolean>>;
}

const Inventory = ({ ascean, inventory, eqpSwap, removeItem, setEqpSwap, setRemoveItem, bag, loadedAscean, setLoadedAscean }: Props) => {
    const [inventoryModalShow, setInventoryModalShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState<boolean>(false);
    const [inventoryType, setInventoryType] = useState({});
    const [inventoryTypeTwo, setInventoryTypeTwo] = useState<any>(null);
    const [inventoryTypeThree, setInventoryTypeThree] = useState<any>(null);
    const [inventoryRingType, setInventoryRingType] = useState<any>(null);
    const [upgradeIds, setUpgradeIds] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingContent, setLoadingContent] = useState<string>('');
    const targetRef = useRef(null);

    
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
        asceanLoaded();
        return () => {
            setLoadedAscean(false);
        };
    }, [loadedAscean]);

    async function asceanLoaded() {
        try {
            setLoadingContent('');
            setInventoryModalShow(false);
            setRemoveModalShow(false);
            setIsLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Trouble Loading Ascean');
        }
    }

    function canUpgrade(inventory: any[], name: string, rarity: string): boolean {
        const matches = inventory.filter(item => item.name === name && item.rarity === rarity);
        return matches.length >= 3;
    };

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
    };

    function handleInventoryW2(equipment: any) {
        setEditState({
            ...editState,
            [inventoryTypeTwo as keyof typeof editState]: equipment.target.value === ascean[inventoryTypeTwo as keyof typeof editState]._id ? ascean.weapon_two : inventory,
            new_weapon_one: '',
            new_weapon_two: equipment.target.value,
            new_weapon_three: '',
        });
    };

    function handleInventoryW3(equipment: any) {
        setEditState({
            ...editState,
            [inventoryTypeThree as keyof typeof editState]: equipment.target.value === ascean[inventoryTypeThree as keyof typeof editState]._id ? ascean.weapon_three : inventory,
            new_weapon_one: '',
            new_weapon_two: '',
            new_weapon_three: equipment.target.value,
        });
    };

    function handleInventoryR2(equipment: any) {
        setEditState({
            ...editState,
            [inventoryRingType as keyof typeof editState]: equipment.target.value === ascean[inventoryRingType as keyof typeof editState]._id ? ascean.ring_two : inventory,
            new_ring_one: '',
            new_ring_two: equipment.target.value,
        });
    };
    
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
            };
            if (inventory?.name.includes('Hood') || inventory?.name.includes('Helm') || inventory?.name.includes('Mask')) {
                type = 'helmet';
                setInventoryType('helmet');
            };
            if (inventory?.name.includes('Cuirass') || inventory?.name.includes('Robes') || inventory?.name.includes('Armor')) {
                setInventoryType('chest');
                type = 'chest';
            };
            if (inventory?.name.includes('Greaves') || inventory?.name.includes('Pants') || inventory?.name.includes('Legs')) {
                setInventoryType('legs');
                type = 'legs';
            };
            if (inventory?.name.includes('Amulet') || inventory?.name.includes('Necklace')) {
                setInventoryType('amulet');
                type = 'amulet';
            };
            if (inventory?.name.includes('Ring')) {
                setInventoryType('ring_one');
                setInventoryRingType('ring_two');
                type = 'ring_one';
                ringType = 'ring_two';
            };
            if (inventory?.name.includes('Trinket')) {
                setInventoryType('trinket');
                type = 'trinket';
            };
            if (inventory?.type.includes('Shield')) {
                setInventoryType('shield');
                type = 'shield';
            };
        } catch (err: any) {
            console.log(err.message, '<- This is the error in checkInventory');
        };
    };

    async function handleUpgradeItem() {
        try {
            setIsLoading(true);
            setLoadingContent(`Forging 3 ${inventory?.name}'s Into One Of Greater Quality`);
            const matches = bag.filter((item: { name: string; rarity: string; }) => item.name === inventory.name && item.rarity === inventory.rarity);
            console.log(matches, '<- What are the matches?');
            const data = {
                asceanID: ascean._id,
                upgradeID: inventory._id,
                upgradeName: inventory.name,
                upgradeType: inventory.itemType,
                currentRarity: inventory.rarity,
                inventoryType: inventoryType,
                upgradeMatches: matches,
            }
            const response = await eqpAPI.upgradeEquipment(data);
            console.log(response, '<- This is the response from handleUpgradeItem');
            setRemoveItem(true);
        } catch (err: any) {
            console.log(err.message, '<- Error upgrading item');
        };
    };

    async function handleRemoveItem() {
        try {
            setIsLoading(true);
            setLoadingContent(`Removing And Destroying ${inventory?.name}`);
            const data = {
                id: ascean._id,
                inventory: inventory,
            }
            const response = await asceanAPI.removeItem(data);
            console.log(response, '<- Response in handleRemoveItem');
            setRemoveItem(true);
        } catch (err: any) {
            console.log(err.message, '<- This is the error in handleRemoveItem');
        };
    };

    async function handleEquipmentSwap(newAscean: Object) {
        try {
            setIsLoading(true);
            setLoadingContent(`Equipping ${inventory?.name}`);
            console.log(newAscean, '<- newAscean in Swapping Equipment start');
            const response = await asceanAPI.equipmentSwap(newAscean);
            console.log(response, '<- Response in Swapping Equipment');
            setEqpSwap(!eqpSwap);
        } catch (err) {
            console.log(err, '<- This is the error in Swapping Equipment');
        };
    };

    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Common':
                return 'white';
            case 'Uncommon':
                return 'green';
            case 'Rare':
                return 'blue';
            case 'Epic':
                return 'purple';
            case 'Legendary':
                return 'darkorange';
            default:
                return 'grey';
        };
    };

    const getRarity = {
        fontSize: "20px",
        color: getRarityColor(inventory?.rarity),
        textShadow: "1px 1px 1px black"
    };

    const inventoryPopover = (
        <Popover className="text-info" id="popover-inv">
            <Popover.Header id="popover-header-inv" className="" as="h2">{inventory?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + inventory?.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body-inv" className="">
                {
                    inventory?.grip && inventory?.type ?
                    <>
                {inventory?.type} [{inventory?.grip}] <br />
                {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : '' }]  <br />
                    </>
                    : inventory?.type ? <>{inventory?.type} <br /></> : ''
                }
                {inventory?.constitution > 0 ? 'Con: +' + inventory?.constitution + ' ' : ''}
                {inventory?.strength > 0 ? 'Str: +' + inventory?.strength + ' ' : ''}
                {inventory?.agility > 0 ? 'Agi: +' + inventory?.agility + ' ' : ''}
                {inventory?.achre > 0 ? 'Ach: +' + inventory?.achre + ' ' : ''}
                {inventory?.caeren > 0 ? 'Caer: +' + inventory?.caeren + ' ' : ''}
                {inventory?.kyosir > 0 ? 'Kyo: +' + inventory?.kyosir + ' ' : ''}<br />
                Damage: {inventory?.physical_damage} Phys | {inventory?.magical_damage} Magi <br />
                {
                    inventory?.physical_resistance ?
                    <>
                    Defense: {inventory?.physical_resistance}% Phys | {inventory?.magical_resistance}% Magi <br />
                    </>
                    : ''
                }
                {
                    inventory?.physical_penetration ?
                    <>
                    Penetration: {inventory?.physical_penetration} Phys | {inventory?.magical_penetration} Magi <br />
                    </>
                    : ''
                }
                Critical Chance: {inventory?.critical_chance}% <br />
                Critical Damage: {inventory?.critical_damage}x <br />
                Dodge Timer: {inventory?.dodge}s <br />
                Roll Chance: {inventory?.roll}% <br />
                {
                    inventory?.influences?.length > 0 ?
                    <>
                Influence: {inventory?.influences} <br />
                    </>
                    : ''
                }
                <p style={{ color: getRarityColor(inventory?.rarity) }}>
                {inventory?.rarity}

                </p>
                <br />
                {inventory?.itemType}
                <Button variant='outline' style={{ float: 'right', color: 'blue', marginTop: -3 + '%', marginRight: -4 + '%', fontWeight: 600 }} onClick={() => setInventoryModalShow(!inventoryModalShow)}>Inspect</Button>
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
        };
    };

    const getItemStyle = {
        float: right,
        background: 'black',
        border: getBorderStyle(inventory?.rarity)
    };

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
        <Modal show={inventoryModalShow} onHide={() => setInventoryModalShow(false)} centered id='modal-weapon' style={{ marginTop: 30 + '%', overflow: 'auto', maxHeight: '70vh' }}>
            <Modal.Header style={{ color: 'blueviolet', fontSize: "20px" }}>
                Do You Wish To Change Your {editState[inventoryType as keyof typeof editState]?.name} to {inventory?.name}?
            </Modal.Header>
            <Modal.Body id='weapon-modal'>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{  }}>
            {/* <p style={{ color: '#fdf6d8' }}>[Inspected]</p> */}
            <h2 style={{ color: 'gold' }}>
            {inventory?.name} <img src={process.env.PUBLIC_URL + inventory?.imgURL} />{' '}
            </h2>
            <h5 style={{ color: 'goldenrod'}}>
                {
                    inventory?.grip && inventory?.type ?
                    <>
                {inventory?.type} [{inventory?.grip}] <br />
                {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : '' }{inventory?.damage_type?.[2] ? ' / ' + inventory?.damage_type[2] : '' }]  <br />
                    </>
                    : inventory?.type ? <>{inventory?.type} <br /></> : ''
                }
                </h5>

            <p style={{ color: '#fdf6d8' }}>
                {inventory?.constitution > 0 ? 'Con: +' + inventory?.constitution + ' ' : ''}
                {inventory?.strength > 0 ? 'Str: +' + inventory?.strength + ' ' : ''}
                {inventory?.agility > 0 ? 'Agi: +' + inventory?.agility + ' ' : ''}
                {inventory?.achre > 0 ? 'Ach: +' + inventory?.achre + ' ' : ''}
                {inventory?.caeren > 0 ? 'Caer: +' + inventory?.caeren + ' ' : ''}
                {inventory?.kyosir > 0 ? 'Kyo: +' + inventory?.kyosir + ' ' : ''}<br />
                Damage: {inventory?.physical_damage} Physl | {inventory?.magical_damage} Magi <br />
                {
                    inventory?.physical_resistance ?
                    <>
                    Defense: {inventory?.physical_resistance}% Phys | {inventory?.magical_resistance}% Magi <br />
                    </>
                    : ''
                }
                {
                    inventory?.physical_penetration ?
                    <>
                    Penetration: {inventory?.physical_penetration} Phys | {inventory?.magical_penetration} Magi <br />
                    </>
                    : ''
                }
                Critical Chance: {inventory?.critical_chance}% <br />
                Critical Damage: {inventory?.critical_damage}x <br />
                Dodge Timer: {inventory?.dodge}s <br />
                Roll Chance: {inventory?.roll}% <br />
                {
                    inventory?.influences?.length > 0 ?
                    <>
                Influence: {inventory?.influences} <br />
                    </>
                    : ''
                }
            </p>
            <p style={getRarity}>
                {inventory?.rarity}
            </p>
            </div>
            
            <div style={{ borderLeft: '1px solid #fdf6d8', paddingLeft: "10px" }}>
            <h2 style={{ color: 'gold' }}>
                {ascean[inventoryType as keyof typeof ascean]?.name} <img src={process.env.PUBLIC_URL + ascean[inventoryType as keyof typeof ascean]?.imgURL} />{' '}
            </h2>
            <h5 style={{ color: 'goldenrod'}}>
                {
                    ascean[inventoryType as keyof typeof ascean]?.grip && ascean[inventoryType as keyof typeof ascean]?.type ?
                    <>
                {ascean[inventoryType as keyof typeof ascean]?.type} [{ascean[inventoryType as keyof typeof ascean]?.grip}] <br />
                {ascean[inventoryType as keyof typeof ascean]?.attack_type} [{ascean[inventoryType as keyof typeof ascean]?.damage_type?.[0]}{ascean[inventoryType as keyof typeof ascean]?.damage_type?.[1] ? ' / ' + ascean[inventoryType as keyof typeof ascean]?.damage_type[1] : '' }{ascean[inventoryType as keyof typeof ascean]?.damage_type?.[2] ? ' / ' + ascean[inventoryType as keyof typeof ascean]?.damage_type[2] : '' }]  <br />
                    </>
                    : ascean[inventoryType as keyof typeof ascean]?.type ? <>{ascean[inventoryType as keyof typeof ascean]?.type} <br /></> : ''
                }
                </h5>

            <p style={{ color: '#fdf6d8' }}>
                {ascean[inventoryType as keyof typeof ascean]?.constitution > 0 ? 'Con: +' + ascean[inventoryType as keyof typeof ascean]?.constitution + ' ' : ''}
                {ascean[inventoryType as keyof typeof ascean]?.strength > 0 ? 'Str: +' + ascean[inventoryType as keyof typeof ascean]?.strength + ' ' : ''}
                {ascean[inventoryType as keyof typeof ascean]?.agility > 0 ? 'Agi: +' + ascean[inventoryType as keyof typeof ascean]?.agility + ' ' : ''}
                {ascean[inventoryType as keyof typeof ascean]?.achre > 0 ? 'Ach: +' + ascean[inventoryType as keyof typeof ascean]?.achre + ' ' : ''}
                {ascean[inventoryType as keyof typeof ascean]?.caeren > 0 ? 'Caer: +' + ascean[inventoryType as keyof typeof ascean]?.caeren + ' ' : ''}
                {ascean[inventoryType as keyof typeof ascean]?.kyosir > 0 ? 'Kyo: +' + ascean[inventoryType as keyof typeof ascean]?.kyosir + ' ' : ''}<br />
                Damage: {ascean[inventoryType as keyof typeof ascean]?.physical_damage} Phys | {ascean[inventoryType as keyof typeof ascean]?.magical_damage} Magi <br />
                {
                    ascean[inventoryType as keyof typeof ascean]?.physical_resistance ?
                    <>
                    Defense: {ascean[inventoryType as keyof typeof ascean]?.physical_resistance}% Phys | {ascean[inventoryType as keyof typeof ascean]?.magical_resistance}% Magi <br />
                    </>
                    : ''
                }
                {
                    ascean[inventoryType as keyof typeof ascean]?.physical_penetration ?
                    <>
                    Penetration: {ascean[inventoryType as keyof typeof ascean]?.physical_penetration} Phys | {ascean[inventoryType as keyof typeof ascean]?.magical_penetration} Magi <br />
                    </>
                    : ''
                }
                Critical Chance: {ascean[inventoryType as keyof typeof ascean]?.critical_chance}% <br />
                Critical Damage: {ascean[inventoryType as keyof typeof ascean]?.critical_damage}x <br />
                Dodge Timer: {ascean[inventoryType as keyof typeof ascean]?.dodge}s <br />
                Roll Chance: {ascean[inventoryType as keyof typeof ascean]?.roll}% <br />
                {
                    ascean[inventoryType as keyof typeof ascean]?.influences?.length > 0 ?
                    <>
                Influence: {ascean[inventoryType as keyof typeof ascean]?.influences} <br />
                    </>
                    : ''
                }
            </p>
                <p style={{ color: getRarityColor(ascean[inventoryType as keyof typeof ascean]?.rarity), fontSize: "20px" }}>
                    {ascean[inventoryType as keyof typeof ascean]?.rarity}
                </p>
                </div>
                
                </div>
            <br />
            <Form.Select value={
                inventoryType === 'weapon_one' ? editState.weapon_one?._id : inventoryType === 'shield' ? editState.shield._id : inventoryType === 'helmet' ? 
                editState.helmet._id : inventoryType === 'chest' ? editState.chest._id : inventoryType === 'legs' ? 
                editState.legs._id : inventoryType === 'amulet' ? editState.amulet._id : inventoryType === 'ring_one' ? 
                editState.ring_one._id : inventoryType === 'trinket' ? editState.trinket._id : ''} onChange={handleInventory}>
                    <option value={(editState as { [key: string]: any })[inventoryType as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryType as keyof typeof editState]?.name} [Selected]</option>
                    <option value={ascean[inventoryType as keyof typeof editState]?._id}>{ascean[inventoryType as keyof typeof editState]?.name} [Equipped]</option>
                    <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
            </Form.Select>
            {
                inventory?.grip && inventory?.type ?
                <><br />
                 <Form.Select value={editState.weapon_two._id} onChange={handleInventoryW2}>
                    <option value={(editState as { [key: string]: any })[inventoryTypeTwo as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryTypeTwo as keyof typeof editState]?.name} [Selected]</option>
                    <option value={ascean[inventoryTypeTwo as keyof typeof editState]?._id}>{ascean[inventoryTypeTwo as keyof typeof editState]?.name} [Equipped]</option>
                    <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                </Form.Select><br />
                <Form.Select value={editState.weapon_three._id} onChange={handleInventoryW3}>
                    <option value={(editState as { [key: string]: any })[inventoryTypeThree as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryTypeThree as keyof typeof editState]?.name} [Selected]</option>
                    <option value={ascean[inventoryTypeThree as keyof typeof editState]?._id}>{ascean[inventoryTypeThree as keyof typeof editState]?.name} [Equipped]</option>
                    <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                </Form.Select>
                </>
                : ''
            }
            {
                inventoryType === 'ring_one' ?
                <>
                <br />
                 <Form.Select value={editState.ring_two._id} onChange={handleInventoryR2}>
                    <option value={(editState as { [key: string]: any })[inventoryRingType as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryRingType as keyof typeof editState]?.name} [Selected]</option>
                    <option value={ascean[inventoryRingType]?._id}>{ascean[inventoryRingType]?.name} [Equipped]</option>
                    <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                </Form.Select>
                </>
                : ''
            }
            <br />
            
            { canUpgrade(bag, inventory?.name, inventory?.rarity) ? <Button variant='outline' ref={targetRef} className='' style={{ color: 'gold', fontWeight: 600 }} onClick={() => handleUpgradeItem()}>Upgrade</Button> : '' }
            <Button variant='outline' className='' style={{ float: 'left', color: 'green', fontWeight: 600 }} onClick={() => handleEquipmentSwap(editState)}>Equip</Button>
            <Button variant='outline' style={{ color: 'red', fontWeight: 600 }} onClick={() => setRemoveModalShow(true)}>Remove</Button>
            <Button variant='outline' className='' style={{ float: 'right', color: 'blue', fontWeight: 600 }} onClick={() => setInventoryModalShow(false)}>Close</Button>
            </Modal.Body>
        </Modal>
        <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={inventoryPopover}>
            <Button variant="" className="inventory-icon" style={getItemStyle}><img src={process.env.PUBLIC_URL + inventory?.imgURL} alt={inventory?.name} /></Button>
        </OverlayTrigger>
        <Overlay target={targetRef} show={isLoading}>
        <div
          className='d-flex align-items-center justify-content-center'
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            zIndex: 9999,
          }}
        >
            <h1 style={{ color: 'gold', fontVariant: 'small-caps', textAlign: 'center', fontSize: 36 + 'px', textShadow: '1px 1px 1px goldenrod', fontWeight: 600,
            }}>
            {loadingContent}
            </h1>
        </div>
        </Overlay>
        </>
    );
};

export default Inventory;