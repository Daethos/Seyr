import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import LootDrop from './LootDrop';
import { GAME_ACTIONS } from './GameStore';

interface Props {
    ascean: any;
    gameplayEvent: any;
    show: boolean;
    lootDrop: any;
    lootDropTwo: any;
    deleteEquipment: (eqp: any) => Promise<void>;
    itemSaved: boolean;
    gameDispatch: React.Dispatch<any>;
}

const GameplayEventModal = ({ ascean, gameDispatch, gameplayEvent, show, lootDrop, lootDropTwo, itemSaved, deleteEquipment }: Props) => {

    const checkingLoot = async () => {
        console.log( lootDrop, lootDropTwo, 'Merchant Equipment')
        if (lootDrop !== null) {
            await deleteEquipment([lootDrop]);
            gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP, payload: null });
        };
        if (lootDropTwo !== null) {
            await deleteEquipment([lootDropTwo]);
            gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP_TWO, payload: null });
        };
        gameDispatch({ type: GAME_ACTIONS.SET_GAMEPLAY_MODAL, payload: false });
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
                        <LootDrop lootDrop={lootDrop} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                        <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                    </>
                : lootDrop?._id ?
                    <LootDrop lootDrop={lootDrop} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                : lootDropTwo?._id ?
                    <LootDrop lootDrop={lootDropTwo} ascean={ascean} itemSaved={itemSaved} gameDispatch={gameDispatch} />
                : '' }
                <br /><br />
                [Note: Treasure must be Saved]
            </Modal.Body>
        </Modal>
    )
    }

export default GameplayEventModal