import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import LootDrop from './LootDrop';

interface Props {
    ascean: any;
    gameplayEvent: any;
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    lootDrop: any;
    setLootDrop: React.Dispatch<React.SetStateAction<any>>;
    lootDropTwo: any;
    setLootDropTwo: React.Dispatch<React.SetStateAction<any>>;
    deleteEquipment: (eqp: any) => Promise<void>;
    itemSaved: boolean;
    setItemSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameplayEventModal = ({ ascean, gameplayEvent, show, setShow, lootDrop, setLootDrop, lootDropTwo, setLootDropTwo, itemSaved, setItemSaved, deleteEquipment }: Props) => {

    const checkingLoot = async () => {
        console.log( lootDrop, lootDropTwo, 'Merchant Equipment')
        if (lootDrop !== null) {
            await deleteEquipment([lootDrop]);
            setLootDrop(null);
        };
        if (lootDropTwo !== null) {
            await deleteEquipment([lootDropTwo]);
            setLootDropTwo(null);
        };
        setShow(false);
    };

    const modalStyle = {
        color: 'gold',
        fontWeight: 400,
        fontVariant: 'small-caps',
        fontSize: 20 + 'px',
        height: 50 + 'vh',
        overflow: 'auto',
    };
    return (
        <Modal show={show} onHide={() => checkingLoot()} centered backdrop="static">
            <Modal.Header closeButton closeVariant='white' style={{ fontSize: "20px", color: "orangered" }}>
                {gameplayEvent.title}   
            </Modal.Header>
            <Modal.Body style={modalStyle}>
                {gameplayEvent.description}
                <br /><br />
                { lootDrop?._id && lootDropTwo?._id ?
                    <>
                        <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                        <LootDrop lootDrop={lootDropTwo} setLootDrop={setLootDropTwo} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                    </>
                : lootDrop?._id ?
                    <LootDrop lootDrop={lootDrop} setLootDrop={setLootDrop} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                : lootDropTwo?._id ?
                    <LootDrop lootDrop={lootDropTwo} setLootDrop={setLootDropTwo} ascean={ascean} itemSaved={itemSaved} setItemSaved={setItemSaved} />
                : '' }
                <br /><br />
                [Note: Treasure must be Saved]
            </Modal.Body>
        </Modal>
    )
    }

export default GameplayEventModal