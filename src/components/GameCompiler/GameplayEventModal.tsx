import Modal from 'react-bootstrap/Modal';
import LootDrop from './LootDrop';
import { GAME_ACTIONS } from './GameStore';
import { MAP_ACTIONS, MapData } from './WorldStore';

interface Props {
    ascean: any;
    gameplayEvent: any;
    show: boolean;
    lootDrop: any;
    lootDropTwo: any;
    deleteEquipment: (eqp: any) => Promise<void>;
    itemSaved: boolean;
    gameDispatch: React.Dispatch<any>;
    mapDispatch: React.Dispatch<any>;
    mapState: MapData;
};

const GameplayEventModal = ({ ascean, gameDispatch, gameplayEvent, show, lootDrop, lootDropTwo, itemSaved, deleteEquipment, mapDispatch, mapState }: Props) => {

    const checkingLoot = async () => {
        if (lootDrop !== null) {
            await deleteEquipment([lootDrop]);
            gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP, payload: null });
        };
        if (lootDropTwo !== null) {
            await deleteEquipment([lootDropTwo]);
            gameDispatch({ type: GAME_ACTIONS.SET_LOOT_DROP_TWO, payload: null });
        };
        if (mapState?.currentTile?.content === 'treasure') mapDispatch({ type: MAP_ACTIONS.SET_NEW_ENVIRONMENT, payload: mapState });
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
    );
};

export default GameplayEventModal