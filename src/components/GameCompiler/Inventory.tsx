import { left, right } from '@popperjs/core';
import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as eqpAPI from '../../utils/equipmentApi';
import Overlay from 'react-bootstrap/Overlay';
import Table from 'react-bootstrap/Table';
import { GAME_ACTIONS, GameData, checkPlayerTrait } from './GameStore';
import { useLocation } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    inventory: any;
    ascean: any;
    bag: any;
    gameState: GameData;
    gameDispatch: React.Dispatch<any>;
    blacksmith?: boolean;
    index: number;
    story?: boolean;
};

const Inventory = ({ ascean, inventory, bag, gameDispatch, blacksmith, index, gameState, story }: Props) => {
    const [inventoryModalShow, setInventoryModalShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState<boolean>(false);
    const [forgeModalShow, setForgeModalShow] = useState<boolean>(false);
    const [inventoryType, setInventoryType] = useState({});
    const [inventoryTypeTwo, setInventoryTypeTwo] = useState<any>(null);
    const [inventoryTypeThree, setInventoryTypeThree] = useState<any>(null);
    const [inventoryRingType, setInventoryRingType] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingContent, setLoadingContent] = useState<string>('');
    const [deskTop, setDeskTop] = useState<boolean>(false);
    const targetRef = useRef(null);
    const location = useLocation();
    
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
        if (window.innerWidth > 768) {
            setDeskTop(true);
        };
    }, [])

    useEffect(() => {
      checkInventory();
      asceanLoaded();
    }, [ascean, inventory]);

    async function asceanLoaded() {
        try {
            setLoadingContent('');
            setRemoveModalShow(false);
            setIsLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Trouble Loading Ascean');
        };
    };

    function canUpgrade(inventory: any[], name: string, rarity: string): boolean {
        const matches = inventory.filter(item => item?.name === name && item?.rarity === rarity);
        console.log(matches.length, "Matches Length")
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
        try {
            let type: string = '';
            let typeTwo: string = '';
            let typeThree: string = '';
            let ringType: string = '';
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
        if (inventory?.rarity === 'Common' && ascean?.currency?.gold < 1) {
            return;
        } else if (inventory?.rarity === 'Uncommon' && ascean?.currency?.gold < 3) {
            return;
        } else if (inventory?.rarity === 'Rare' && ascean?.currency?.gold < 12) {
            return;
        } else if (inventory?.rarity === 'Epic' && ascean?.currency?.gold < 60) {
            return;
        } else if (inventory?.rarity === 'Legendary' && ascean?.currency?.gold < 300) {
            return;
        } else if (inventory?.rarity === 'Mythic' && ascean?.currency?.gold < 1500) {
            return;
        } else if (inventory?.rarity === 'Divine' && ascean?.currency?.gold < 7500) {
            return;
        } else if (inventory?.rarity === 'Ascended' && ascean?.currency?.gold < 37500) {
            return;
        } else if (inventory?.rarity === 'Godly' && ascean?.currency?.gold < 225000) {
            return;
        };
        try {
            setIsLoading(true);
            setLoadingContent(`Forging A Greater ${inventory?.name}`);
            const matches = bag.filter((item: { name: string; rarity: string; }) => item.name === inventory?.name && item?.rarity === inventory?.rarity);
            console.log(matches, '<- What are the matches?');
            const data = {
                asceanID: ascean._id,
                upgradeID: inventory._id,
                upgradeName: inventory.name,
                upgradeType: inventory.itemType,
                currentRarity: inventory.rarity,
                inventoryType: inventoryType,
                upgradeMatches: matches,
            };
            const response = await eqpAPI.upgradeEquipment(data);
            console.log(response, '<- This is the response from handleUpgradeItem');
            setInventoryModalShow(false);
            setForgeModalShow(false);
            gameDispatch({ type: GAME_ACTIONS.REMOVE_ITEM, payload: true });
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
            };
            const response = await asceanAPI.removeItem(data);
            console.log(response, '<- Response in handleRemoveItem');
            setInventoryModalShow(false);
            gameDispatch({ type: GAME_ACTIONS.REMOVE_ITEM, payload: true });
        } catch (err: any) {
            console.log(err.message, '<- This is the error in handleRemoveItem');
        };
    };

    async function handleEquipmentSwap(newAscean: Object) {
        try {
            setIsLoading(true);
            setLoadingContent(`Equipping ${inventory?.name} of ${inventory?.rarity} quality.`);
            console.log(newAscean, '<- newAscean in Swapping Equipment start');
            const response = await asceanAPI.equipmentSwap(newAscean);
            console.log(response, '<- Response in Swapping Equipment');
            setEditState({
                ...editState,
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
            });
            setInventoryModalShow(false);
            gameDispatch({ type: GAME_ACTIONS.EQP_SWAP, payload: true });
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

    const getHigherRarityColor = (rarity: string) => {
        switch (rarity) {
            case 'Common':
                return '3px solid green';
            case 'Uncommon':
                return '3px solid blue';
            case 'Rare':
                return '3px solid purple';
            case 'Epic':
                return '3px solid darkorange';
            default:
                return '3px solid white';
        };
    };

    const inventoryPopover = (
        <Popover className="text-info" id="popover-inv">
            <Popover.Header id="popover-header-inv" className="" as="h2">{inventory?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + inventory?.imgURL} /></span></Popover.Header>
            <Popover.Body id="popover-body-inv" className="">
                { inventory?.grip && inventory?.type ?
                    <>
                    {inventory?.type} [{inventory?.grip}] <br />
                    {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : '' }{inventory?.damage_type?.[2] ? ' / ' + inventory?.damage_type[2] : '' }]  <br />
                    </>
                : inventory?.type ? <>{inventory?.type} <br /></> : '' }
                {inventory?.constitution > 0 ? 'Con: +' + inventory?.constitution + ' ' : ''}
                {inventory?.strength > 0 ? 'Str: +' + inventory?.strength + ' ' : ''}
                {inventory?.agility > 0 ? 'Agi: +' + inventory?.agility + ' ' : ''}
                {inventory?.achre > 0 ? 'Ach: +' + inventory?.achre + ' ' : ''}
                {inventory?.caeren > 0 ? 'Caer: +' + inventory?.caeren + ' ' : ''}
                {inventory?.kyosir > 0 ? 'Kyo: +' + inventory?.kyosir + ' ' : ''}<br />
                Damage: {inventory?.physical_damage} Phys | {inventory?.magical_damage} Magi <br />
                { inventory?.physical_resistance || inventory?.magical_resistance ?
                    <>
                    Defense: {inventory?.physical_resistance} Phys | {inventory?.magical_resistance} Magi <br />
                    </>
                : '' }
                { inventory?.physical_penetration || inventory?.magical_penetration ?
                    <>
                    Penetration: {inventory?.physical_penetration} Phys | {inventory?.magical_penetration} Magi <br />
                    </>
                : '' }
                Critical Chance: {inventory?.critical_chance}% <br />
                Critical Damage: {inventory?.critical_damage}x <br />
                Dodge Timer: {inventory?.dodge}s <br />
                Roll Chance: {inventory?.roll}% <br />
                { inventory?.influences?.length > 0 ?
                    <>
                    Influence: {inventory?.influences} <br />
                    </>
                : '' }
                <br />
                <p style={{ color: getRarityColor(inventory?.rarity), fontSize: "16px", float: 'left', textShadow: "0.5px 0.5px 0.5px black", fontWeight: 700 }}>
                {inventory?.rarity}
                </p>
                { blacksmith ? 
                    ''
                :
                    <Button variant='outline' style={{ float: 'right', color: 'blue', marginTop: '-3%', marginRight: -8 + '%', textShadow: "0.5px 0.5px 0.5px black", fontWeight: 700 }} onClick={() => setInventoryModalShow(!inventoryModalShow)}>Inspect</Button>
                }
                <br />
            </Popover.Body>
        </Popover>
    );

    function canEquip (level: number, rarity: string) {
        switch (rarity) {
            case 'Common':
                return true;
            case 'Uncommon':
                if (level > 3) {
                    return true;
                } else {
                    return false;
                };
            case 'Rare':
                if (level > 5) {
                    return true;
                } else {
                    return false;
                };
            case 'Epic':
                if (level > 11) {
                    return true;
                } else {
                    return false;
                };
            case 'Legendary':
                if (level > 19) {
                    return true;
                } else {
                    return false;
                };
            default:
                return false;
        };
    };

    function equipLevel (rarity: string) {
        switch (rarity) {
            case 'Common':
                return 0;
            case 'Uncommon':
                return 4;
            case 'Rare':
                return 6;
            case 'Epic':
                return 12;
            case 'Legendary':
                return 20;
            default:
                return 0;
        };
    };

    function textColor(val1: number, val2: number) {
        if (val1 === undefined) val1 = 0;
        if (val2 === undefined) val2 = 0;
        if (val1 > val2) {
            return 'green';
        } else if (val1 < val2) {
            return 'red';
        } else {
            return '#fdf6d8';
        };
    };

    function getBorderSize() {
        if (story) {
            return 6;
        } else {
            return 4;
        };
    };

    function getBorderStyle(rarity: string) {
        switch (rarity) {
            case 'Common':
                return `${getBorderSize()}px solid white`;
            case 'Uncommon':
                return `${getBorderSize()}px solid green`;
            case 'Rare':
                return `${getBorderSize()}px solid blue`;
            case 'Epic':
                return `${getBorderSize()}px solid purple`;
            case 'Legendary':
                return `${getBorderSize()}px solid orange`;
            default:
                return `${getBorderSize()}px solid grey`;
        };
    };

    const getForgeCost = {
        Common: 1,
        Uncommon: 3,
        Rare: 12,
        Epic: 60,
    };

    const getNextRarity = {
        Common: "Uncommon",
        Uncommon: 'Rare',
        Rare: "Epic",
        Epic: "Legendary",
    };

    const getDraggingStyle = {
        margin: blacksmith ? '0 2% 10% 2%' : '0 0 0 0',
        border: getBorderStyle(inventory?.rarity),
        boxShadow: '0 0 0 0.25rem gold',
        display: "inline-block",
        cursor: 'grabbing',
        transform: 'scale(0.75)',
    };

    const getItemStyle = (rarity: string) => {
        return {
            margin: blacksmith ? '0 2% 10% 2%' : story ? '5% 0 0 15%' : '0 0 0 0',
            background: 'black',
            border: getBorderStyle(rarity),
            display: "inline-block",
            // transform: window.innerWidth > 1000 ? 'scale(3)' : '',
        };
    };

    const getCurrentItemStyle = {
        margin: blacksmith ? '0 2% 0 2%' : '0 0 0 0',
        background: 'black',
        border: getBorderStyle(inventory?.rarity),
        display: "inline-block"
    };

    const getNewItemStyle ={
        margin: blacksmith ? '0 2% 0 2%' : '0 0 0 0',
        background: "black",
        border: getHigherRarityColor(inventory?.rarity),
        display: "inline-block"
    };

    return (
        <>
        <Modal show={forgeModalShow} onHide={() => setForgeModalShow(false)} centered id='modal-weapon' style={{ zIndex: 99999 }}>
            <Modal.Header style={{ color: "red", fontSize: "18px" }}>
                Do You Wish To Collapse Three {inventory?.name} into one of {getNextRarity[inventory?.rarity as keyof typeof getNextRarity]} Quality for {getForgeCost[inventory?.rarity as keyof typeof getForgeCost]} Gold?
            </Modal.Header>
            <Modal.Body id='weapon-modal'>
                <Button variant='outline' className='' 
                style={{ color: 'gold', fontWeight: 600, fontSize: "24px" }} onClick={() => handleUpgradeItem()}>{getForgeCost[inventory?.rarity as keyof typeof getForgeCost]} Gold Forge 
                </Button>    
                <p style={{ color: "gold", fontSize: "24px", fontWeight: 600 }}>
                (3) <img src={process.env.PUBLIC_URL + inventory?.imgURL} alt={inventory?.name} style={getCurrentItemStyle} /> {'=>'} <img src={inventory?.imgURL} alt={inventory?.name} style={getNewItemStyle} />
                </p>
            </Modal.Body>
        </Modal>
        <Modal show={removeModalShow} onHide={() => setRemoveModalShow(false)} centered id='modal-weapon' style={{ zIndex: 99999 }}>
            <Modal.Header>
                Do You Wish To Remove and Destroy Your {inventory?.name}?
            </Modal.Header>
            <Modal.Body id='weapon-modal'>
                <Button variant='outline' className='' 
                style={{ color: 'red', fontWeight: 600 }} onClick={() => handleRemoveItem()}>Destroy</Button>    
            </Modal.Body>
        </Modal>
        <Modal show={inventoryModalShow} onHide={() => setInventoryModalShow(false)} centered id='modal-weapon' style={{ marginTop: story ? 15 : deskTop ? 10 : 30 + '%', overflow: 'auto', maxHeight: story ? '90vh' : '70vh', zIndex: 9999 }}>
            <Modal.Header style={{ color: 'blueviolet', fontSize: "20px" }}>
                Do You Wish To Change Your {editState[inventoryType as keyof typeof editState]?.name} to {inventory?.name}?
            </Modal.Header>
            <Modal.Body id='weapon-modal'>
                <Table responsive>
                    <tbody>
                        <tr style={{ fontSize: "20px", color: 'gold' }}>
                            <td>
                            {inventory?.name} <img src={process.env.PUBLIC_URL + inventory?.imgURL} />
                            </td>
                            <td>
                            {ascean[inventoryType as keyof typeof ascean]?.name} <img src={process.env.PUBLIC_URL + ascean[inventoryType as keyof typeof ascean]?.imgURL} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ color: 'goldenrod' }}>
                            { inventory?.grip && inventory?.type ?
                                <>
                                {inventory?.type} [{inventory?.grip}] <br />
                                {inventory?.attack_type} [{inventory?.damage_type?.[0]}{inventory?.damage_type?.[1] ? ' / ' + inventory?.damage_type[1] : '' }{inventory?.damage_type?.[2] ? ' / ' + inventory?.damage_type[2] : '' }]  <br />
                                </>
                            : inventory?.type ? 
                                <>{inventory?.type} <br /></> 
                            : '' }  
                            </td>
                            <td style={{ color: 'goldenrod' }}>
                            { ascean[inventoryType as keyof typeof ascean]?.grip && ascean[inventoryType as keyof typeof ascean]?.type ?
                                <>
                                {ascean[inventoryType as keyof typeof ascean]?.type} [{ascean[inventoryType as keyof typeof ascean]?.grip}] <br />
                                {ascean[inventoryType as keyof typeof ascean]?.attack_type} [{ascean[inventoryType as keyof typeof ascean]?.damage_type?.[0]}{ascean[inventoryType as keyof typeof ascean]?.damage_type?.[1] ? ' / ' + ascean[inventoryType as keyof typeof ascean]?.damage_type[1] : '' }{ascean[inventoryType as keyof typeof ascean]?.damage_type?.[2] ? ' / ' + ascean[inventoryType as keyof typeof ascean]?.damage_type[2] : '' }]  <br />
                                </>
                            : ascean[inventoryType as keyof typeof ascean]?.type ? 
                                <>{ascean[inventoryType as keyof typeof ascean]?.type} <br /></> 
                            : '' }
                            </td>
                        </tr>
                        <tr style={{ color: '#fdf6d8' }}>
                            <td style={{ color: textColor((inventory?.constitution + inventory?.strength + inventory?.agility + inventory?.achre + inventory?.caeren + inventory?.kyosir), 
                                (ascean[inventoryType as keyof typeof ascean]?.constitution + ascean[inventoryType as keyof typeof ascean]?.strength + ascean[inventoryType as keyof typeof ascean]?.agility + ascean[inventoryType as keyof typeof ascean]?.achre + ascean[inventoryType as keyof typeof ascean]?.caeren + ascean[inventoryType as keyof typeof ascean]?.kyosir)) }}>
                                {inventory?.constitution > 0 ? 'Con: +' + inventory?.constitution + ' ' : ''}
                                {inventory?.strength > 0 ? 'Str: +' + inventory?.strength + ' ' : ''}
                                {inventory?.agility > 0 ? 'Agi: +' + inventory?.agility + ' ' : ''}
                                {inventory?.achre > 0 ? 'Ach: +' + inventory?.achre + ' ' : ''}
                                {inventory?.caeren > 0 ? 'Caer: +' + inventory?.caeren + ' ' : ''}
                                {inventory?.kyosir > 0 ? 'Kyo: +' + inventory?.kyosir + ' ' : ''}
                            </td>

                            <td style={{ color: textColor((ascean[inventoryType as keyof typeof ascean]?.constitution + ascean[inventoryType as keyof typeof ascean]?.strength + ascean[inventoryType as keyof typeof ascean]?.agility + ascean[inventoryType as keyof typeof ascean]?.achre + ascean[inventoryType as keyof typeof ascean]?.caeren + ascean[inventoryType as keyof typeof ascean]?.kyosir), 
                                (inventory?.constitution + inventory?.strength + inventory?.agility + inventory?.achre + inventory?.caeren + inventory?.kyosir)) }}>
                                {ascean[inventoryType as keyof typeof ascean]?.constitution > 0 ? 'Con: +' + ascean[inventoryType as keyof typeof ascean]?.constitution + ' ' : ''}
                                {ascean[inventoryType as keyof typeof ascean]?.strength > 0 ? 'Str: +' + ascean[inventoryType as keyof typeof ascean]?.strength + ' ' : ''}
                                {ascean[inventoryType as keyof typeof ascean]?.agility > 0 ? 'Agi: +' + ascean[inventoryType as keyof typeof ascean]?.agility + ' ' : ''}
                                {ascean[inventoryType as keyof typeof ascean]?.achre > 0 ? 'Ach: +' + ascean[inventoryType as keyof typeof ascean]?.achre + ' ' : ''}
                                {ascean[inventoryType as keyof typeof ascean]?.caeren > 0 ? 'Caer: +' + ascean[inventoryType as keyof typeof ascean]?.caeren + ' ' : ''}
                                {ascean[inventoryType as keyof typeof ascean]?.kyosir > 0 ? 'Kyo: +' + ascean[inventoryType as keyof typeof ascean]?.kyosir + ' ' : ''}
                            </td>
                        </tr>

                        { (inventory?.physical_damage && inventory?.grip) || (inventory?.magical_damage && inventory?.grip) ?  
                        <tr style={{ color: '#fdf6d8' }}>
                            <td style={{ color: textColor((inventory?.physical_damage + inventory?.magical_damage), (ascean[inventoryType as keyof typeof ascean]?.physical_damage + ascean[inventoryType as keyof typeof ascean]?.magical_damage)) }}>
                            Damage: {inventory?.physical_damage} Phys | {inventory?.magical_damage} Magi
                            </td>
                            <td style={{ color: textColor((ascean[inventoryType as keyof typeof ascean]?.physical_damage + ascean[inventoryType as keyof typeof ascean]?.magical_damage), (inventory?.physical_damage + inventory?.magical_damage)) }}>
                            Damage: {ascean[inventoryType as keyof typeof ascean]?.physical_damage} Phys | {ascean[inventoryType as keyof typeof ascean]?.magical_damage} Magi
                            </td>
                        </tr>
                        : '' }
                        { inventory?.physical_resistance > 0 || ascean[inventoryType as keyof typeof ascean]?.physical_resistance > 0 || inventory?.magical_resistance > 0 || ascean[inventoryType as keyof typeof ascean]?.magical_resistance ? 
                        <tr>
                            <td style={{ color: textColor((inventory?.physical_resistance + inventory?.magical_resistance), (ascean[inventoryType as keyof typeof ascean]?.physical_resistance + ascean[inventoryType as keyof typeof ascean]?.magical_resistance)) }}>
                            { inventory?.physical_resistance || inventory?.magical_resistance ?
                                <>
                                Defense: {inventory?.physical_resistance} Phys | {inventory?.magical_resistance} Magi
                                </>
                            : 'Defense: 0 Phys | 0 Magi' }
                            </td>
                            <td style={{ color: textColor((ascean[inventoryType as keyof typeof ascean]?.physical_resistance + ascean[inventoryType as keyof typeof ascean]?.magical_resistance), (inventory?.physical_resistance + inventory?.magical_resistance)) }}>
                            { ascean[inventoryType as keyof typeof ascean]?.physical_resistance || ascean[inventoryType as keyof typeof ascean]?.magical_resistance ?
                                <>
                                Defense: {ascean[inventoryType as keyof typeof ascean]?.physical_resistance} Phys | {ascean[inventoryType as keyof typeof ascean]?.magical_resistance} Magi 
                                </>
                            : 'Defense: 0 Phys | 0 Magi' }
                            </td>
                        </tr>
                        : '' }
                        {inventory?.magical_penetration > 0 || ascean[inventoryType as keyof typeof ascean]?.magical_penetration > 0 || inventory?.physical_penetration > 0 || ascean[inventoryType as keyof typeof ascean]?.physical_penetration > 0 ? 
                        <tr>
                            <td style={{ color: textColor((inventory?.physical_penetration + inventory?.magical_penetration), (ascean[inventoryType as keyof typeof ascean]?.physical_penetration + ascean[inventoryType as keyof typeof ascean]?.magical_penetration)) }}>
                            { inventory?.physical_penetration || inventory?.magical_penetration ?
                                <>
                                Penetration: {inventory?.physical_penetration} Phys | {inventory?.magical_penetration} Magi 
                                </>
                            : 'Penetration: 0 Phys | 0 Magi' }
                            </td>
                            <td style={{ color: textColor((ascean[inventoryType as keyof typeof ascean]?.physical_penetration + ascean[inventoryType as keyof typeof ascean]?.magical_penetration), (inventory?.physical_penetration + inventory?.magical_penetration)) }}>
                            { ascean[inventoryType as keyof typeof ascean]?.physical_penetration || ascean[inventoryType as keyof typeof ascean]?.magical_penetration ?
                                <>
                                Penetration: {ascean[inventoryType as keyof typeof ascean]?.physical_penetration} Phys | {ascean[inventoryType as keyof typeof ascean]?.magical_penetration} Magi
                                </>
                            : 'Penetration: 0 Phys | 0 Magi' }
                            </td>
                        </tr>
                        : '' }

                        <tr>
                            <td style={{ color: textColor(inventory?.critical_chance, ascean[inventoryType as keyof typeof ascean]?.critical_chance) }}>
                            Crit Chance: {inventory?.critical_chance}%
                            </td>
                            <td style={{ color: textColor(ascean[inventoryType as keyof typeof ascean]?.critical_chance, inventory?.critical_chance) }}>
                            Crit Chance: {ascean[inventoryType as keyof typeof ascean]?.critical_chance}%
                            </td>
                        </tr>

                        <tr>
                            <td style={{ color: textColor(inventory?.critical_damage, ascean[inventoryType as keyof typeof ascean]?.critical_damage) }}>
                            Crit Damage: {inventory?.critical_damage}x
                            </td>
                            <td style={{ color: textColor(ascean[inventoryType as keyof typeof ascean]?.critical_damage, inventory?.critical_damage) }}>
                            Crit Damage: {ascean[inventoryType as keyof typeof ascean]?.critical_damage}x
                            </td>
                        </tr>

                        <tr >
                            <td style={{ color: textColor(ascean[inventoryType as keyof typeof ascean]?.dodge, inventory?.dodge) }}>
                            Dodge Timer: {inventory?.dodge}s
                            </td>
                            <td style={{ color: textColor(inventory?.dodge, ascean[inventoryType as keyof typeof ascean]?.dodge) }}>
                            Dodge Timer: {ascean[inventoryType as keyof typeof ascean]?.dodge}s
                            </td>
                        </tr>

                        <tr>
                            <td style={{ color: textColor(inventory?.roll, ascean[inventoryType as keyof typeof ascean]?.roll) }}>
                            Roll Chance: {inventory?.roll}%
                            </td>
                            <td style={{ color: textColor(ascean[inventoryType as keyof typeof ascean]?.roll, inventory?.roll) }}>
                            Roll Chance: {ascean[inventoryType as keyof typeof ascean]?.roll}%
                            </td>
                        </tr>
                        {inventory?.influences?.length > 0 || ascean[inventoryType as keyof typeof ascean]?.influences?.length > 0 ?
                        <tr style={{ color: '#fdf6d8' }}>
                            <td>
                            { inventory?.influences?.length > 0 ? 
                                <>
                                Influence: {inventory?.influences} <br />
                                </>
                            : '' }
                            </td>
                            <td>
                            { ascean[inventoryType as keyof typeof ascean]?.influences?.length > 0 ? 
                                <>
                                Influence: {ascean[inventoryType as keyof typeof ascean]?.influences} <br />
                                </>
                            : '' }
                            </td>
                        </tr>
                        : ''}
                        <tr>
                            <td style={getRarity}>{inventory?.rarity}</td>
                            <td style={{ color: getRarityColor(ascean[inventoryType as keyof typeof ascean]?.rarity), fontSize: "20px" }}>
                                {ascean[inventoryType as keyof typeof ascean]?.rarity}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            <br />
        { canEquip(ascean?.level, inventory?.rarity) || location.pathname.startsWith(`/GameAdmin`) ?
            <>
            <Form.Select value={
                inventoryType === 'weapon_one' ? editState.weapon_one?._id : inventoryType === 'shield' ? editState.shield._id : inventoryType === 'helmet' ? 
                editState.helmet._id : inventoryType === 'chest' ? editState.chest._id : inventoryType === 'legs' ? 
                editState.legs._id : inventoryType === 'amulet' ? editState.amulet._id : inventoryType === 'ring_one' ? 
                editState.ring_one._id : inventoryType === 'trinket' ? editState.trinket._id : ''} onChange={handleInventory}>
                    <option value={(editState as { [key: string]: any })[inventoryType as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryType as keyof typeof editState]?.name} [Selected]</option>
                    <option value={ascean[inventoryType as keyof typeof editState]?._id}>{ascean[inventoryType as keyof typeof editState]?.name} [Equipped]</option>
                    <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
            </Form.Select>
            { inventory?.grip && inventory?.type ?
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
            : '' }
            { inventoryType === 'ring_one' ?
                <>
                <br />
                 <Form.Select value={editState.ring_two._id} onChange={handleInventoryR2}>
                    <option value={(editState as { [key: string]: any })[inventoryRingType as keyof typeof editState]?._id}>{(editState as { [key: string]: any })[inventoryRingType as keyof typeof editState]?.name} [Selected]</option>
                    <option value={ascean[inventoryRingType]?._id}>{ascean[inventoryRingType]?.name} [Equipped]</option>
                    <option value={inventory?._id}>{inventory?.name} [Viewing]</option>
                </Form.Select>
                </>
            : '' }
            <br />
            </>
        : 
            <div style={{ color: "gold", fontSize: "20px" }}>
                Unforuntaely, {inventory?.name} requires you to be level {equipLevel(inventory?.rarity)} to equip.
                <br /><br />    
            </div>
        }
            { canEquip(ascean?.level, inventory?.rarity) || location.pathname.startsWith(`/GameAdmin`) ?
                <> 
                <Button variant='outline' className='' style={{ float: 'left', color: 'green', fontWeight: 600 }} onClick={() => handleEquipmentSwap(editState)}>Equip</Button> 
                <Button variant='outline' style={{ color: 'red', fontWeight: 600 }} onClick={() => setRemoveModalShow(true)}>Remove</Button>
                </>
                : 
                <Button variant='outline' style={{ color: 'red', fontWeight: 600, marginLeft: "16.5%" }} onClick={() => setRemoveModalShow(true)}>Remove</Button>
            }
            { !ascean?.hardcore && location.pathname.startsWith(`/Hardcore`) ? (
                <>
                { canUpgrade(bag, inventory?.name, inventory?.rarity) ? <Button variant='outline' ref={targetRef} className='' style={{ color: 'gold', fontWeight: 600 }} onClick={() => handleUpgradeItem()}>Upgrade</Button> : '' }
                </>
            ) : checkPlayerTrait("Sedyrist", gameState) ? (
                <>
                { canUpgrade(bag, inventory?.name, inventory?.rarity) ? <Button variant='outline' ref={targetRef} className='' style={{ color: 'gold', fontWeight: 600 }} onClick={() => handleUpgradeItem()}>Upgrade</Button> : '' }
                </>
            ) : ( '' ) }
            <Button variant='outline' className='' style={{ float: 'right', color: 'blue', fontWeight: 600 }} onClick={() => setInventoryModalShow(false)}>Close</Button>
            </Modal.Body>
        </Modal>

        { blacksmith ?
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={inventoryPopover}>
                <Button variant="" className={story ? 'story-inventory' : 'inventory-icon'} style={getItemStyle(inventory?.rarity)} >
                    <img src={process.env.PUBLIC_URL + inventory?.imgURL} alt={inventory?.name} />
                </Button>
            </OverlayTrigger>   
        :
            <Draggable draggableId={inventory?._id} index={index} key={inventory?._id}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={inventoryPopover}>
                        <img src={process.env.PUBLIC_URL + inventory?.imgURL} alt={inventory?.name} className={story ? 'story-inventory' : 'inventory-icon'} style={snapshot.isDragging ? getDraggingStyle : getItemStyle(inventory?.rarity)} />
                    </OverlayTrigger>
                </div>
            )}
            </Draggable>
        } 
        { blacksmith ?  
            <Button variant='outline' className='blacksmith-forge' onClick={() => setForgeModalShow(true)}>Forge</Button>
        : '' }
        <Overlay target={targetRef} show={isLoading}>
            <div className='d-flex align-items-center justify-content-center' style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.65)', zIndex: 99999 }}>
                <h1 style={{ color: 'gold', fontVariant: 'small-caps', textAlign: 'center', fontSize: 36 + 'px', textShadow: '1px 1px 1px goldenrod', fontWeight: 600 }}>
                    {loadingContent}
                </h1>
            </div>
        </Overlay>
        </>
    );
};

export default Inventory;