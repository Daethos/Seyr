import React, { useEffect, useState } from 'react';
import Inventory from './Inventory';
import Button from 'react-bootstrap/Button';
import { ACTIONS } from './CombatStore';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';
import { GAME_ACTIONS } from './GameStore';
import Modal from 'react-bootstrap/Modal';
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from 'react-beautiful-dnd';
import Loading from '../Loading/Loading';

interface Firewater {
  charges: number;
  maxCharges: number;
}

interface IBProps {
    inventory: any;
    ascean: any;
    dispatch: any;
    settings?: boolean;
    gameDispatch: React.Dispatch<any>;
    gameState: any;
    mapState: any;
}

interface IOProps {
    drinkFirewater: () => void;
    setShowFirewaterModal: (show: boolean) => void;
    firewater: Firewater;
    mapState: any;
};

const InventoryOptions = ({ drinkFirewater, firewater, setShowFirewaterModal, mapState }: IOProps) => {
  const getBorder = (firewater: number) => {
    switch (firewater) {
      case 0:
        return "3px solid red";
      default:
        return "3px solid gold";
    };
  };

  const firewaterStyle = {
    border: getBorder(firewater?.charges),
    boxShadow: "2px 2px 2px black",
    backgroundColor: "black",
    height: "60px",
    borderRadius: "3px"
  }

  const firewaterPopover = (
    <Popover id="popover">
      <Popover.Header id="popover" as="h3" style={{ color: "purple", fontWeight: 700 }}>Firewater ( {firewater?.charges} / {firewater?.maxCharges} ) <span id="popover-image"><img src={process.env.PUBLIC_URL +  '/images/firewater.png'} alt="Firewater" /></span></Popover.Header>
      <Popover.Body style={{ color: "purple" }}>
        This is a bottle of Fyervas Firewater, associated with Fyer of Fire and Se'vas of War. This elixir strengthens the body and imbues you with a fiery spirit, making you{' '}
        more resilient and able to withstand combat and other challenges. This bottle has {firewater?.charges} charges left.
        <br /><br />
        
      { firewater?.charges === 0 && mapState?.currentTile?.content !== 'city' ?
          <Button variant='' onClick={() => setShowFirewaterModal(true)} style={{ color: "blue", fontSize: "20px", fontWeight: 700, textShadow: "1px 1px 1px black", float: "right" }}>
            Inspect
          </Button>
      : 
          <Button variant='' onClick={drinkFirewater} style={{ color: "gold", fontSize: "20px", fontWeight: 700, textShadow: "1px 1px 1px black", float: "right" }}>
            Take a Drink?
        </Button> 
      }
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="firewater">
      <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={firewaterPopover}>
        <img src={process.env.PUBLIC_URL + '/images/firewater.png'} alt="Firewater" style={firewaterStyle} /> 
      </OverlayTrigger>
    </div>
  )
}

const InventoryBag = ({ ascean, dispatch, inventory, settings, gameDispatch, gameState, mapState }: IBProps) => {
  const [dndInventory, setDndInventory] = useState(inventory);
  const [activeTab, setActiveTab] = useState('gear');
  const [drinking, setDrinking] = useState(false);
  const [showFirwawterModal, setShowFirewaterModal] = useState<boolean>(false);
  const [showBleed, setShowBleed] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (gameState.loadedAscean) {
      setDrinking(false);
      setShowBleed(true);
      setShowFirewaterModal(false);
      gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: false });
    };
  }, [gameState.loadedAscean, drinking]);

  useEffect(() => {
    setDndInventory(inventory);
  }, [inventory]);

  const saveInventory = async (inventory: any) => {
    try {
      setLoading(true);
      const flattenedInventory = inventory.map((item: any) => item._id);
      const data = { ascean: ascean._id, inventory: flattenedInventory };
      await asceanAPI.saveAsceanInventory(data);
      gameDispatch({ type: GAME_ACTIONS.REPOSITION_INVENTORY, payload: true });
      setLoading(false);
    } catch (err: any) {
      console.log(err, "Error Saving Inventory");
    };
  };

  const drinkFirewater = async () => {
    if (ascean?.firewater?.charges === 0) return;
    try {
      setDrinking(true);
      dispatch({ type: ACTIONS.PLAYER_REST, payload: 40 });
      const response = await asceanAPI.drinkFirewater(ascean?._id);
      gameDispatch({ type: GAME_ACTIONS.SET_FIREWATER, payload: response.firewater });
      gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
    } catch (err: any) {
      console.log(err, "Error Drinking Firewater");
    };
  };

  const replenishFirewater = async () => {
    setShowBleed(false);
    try {
      const response = await asceanAPI.replenishFirewater(ascean?._id);
      gameDispatch({ type: GAME_ACTIONS.SET_FIREWATER, payload: response.firewater });
      const cleanRes = await asceanAPI.getCleanAscean(ascean?._id);
      dispatch({
        type: ACTIONS.SAVE_EXPERIENCE,
        payload: cleanRes.data
      });
      gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
    } catch (err: any) {
      console.log(err, "Error Replenishing Firewater");
    }
  };

  const onDragStart = (start: DragStart) => {
    console.log('drag start:', start);
  }

  
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.index === source.index) return;
    const itemIndex = dndInventory.findIndex((item: { _id: string; }) => item._id === draggableId);
    if (itemIndex !== -1) {
      const itemsCopy = Array.from(dndInventory);
      const [reorderedItem] = itemsCopy.splice(source.index, 1);
      itemsCopy.splice(destination.index, 0, reorderedItem);
      setDndInventory(itemsCopy);
    };
  };

  const modalStyle = {
    color: 'gold',
    fontWeight: 400,
    fontVariant: 'small-caps',
    fontSize: 18 + 'px',
    height: 47.5 + 'vh',
    overflow: 'auto',
};
  
  return (
    <>
    <Modal show={showFirwawterModal} onHide={() => setShowFirewaterModal(false)} centered backdrop="static">
    <Modal.Header style={{ fontSize: "20px", color: "orangered" }}>
        <Modal.Title>Replenish Firewater</Modal.Title>
    </Modal.Header>
    <Modal.Body style={modalStyle}>
        There is an Ancient method of replenishing Fyervas Firewater. Se'vas wants your blood spilled to receive his Grace. Fyer asks this over fire, and to ensure the prayer is heard, you must brew this overnight.
        Or, you can wait until you find a city and purchase a more recent solution.
        <br /><br /><br />
        <p style={{ color: '#fdf6d8', fontSize: "16px" }}>
        Do you wish to set camp and let it bleed?
        </p>
        <br />
        { showBleed ?
          <Button variant='' style={{ float: "left", color: "red", fontSize: "24px" }} onClick={replenishFirewater}>Bleed</Button>
        : '' }
        <Button onClick={() => setShowFirewaterModal(false)} variant='' style={{ float: "right", color: "gold", fontSize: "24px" }}>Resist</Button>
    </Modal.Body>
    </Modal>

    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className={settings ? 'inventory-bag-settings' : 'inventory-bag'}>
        { activeTab === 'gear' && dndInventory?.length > 0 ?
            dndInventory.map((item: any, index: number) => {
              return (
                <Droppable key={index} droppableId={item._id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} >
              <Inventory gameDispatch={gameDispatch} bag={dndInventory} inventory={item} ascean={ascean} index={index} />
              {provided.placeholder}
            </div>
                  )}
                </Droppable>
                )
            })
          : '' }
        </div>
    </DragDropContext>

    { !drinking ?
      <InventoryOptions firewater={ascean?.firewater} drinkFirewater={drinkFirewater} setShowFirewaterModal={setShowFirewaterModal} mapState={mapState} />
      :
    '' }
    <div style={{ display: "flex", gridColumnStart: 3, gridRowStart: 8, zIndex: 999, float: "right" }}>
    <Button size='sm' onClick={() => saveInventory(dndInventory)} variant='' style={{ height: "70%", fontWeight: 600, textShadow: "1px 1px 1px black", color: "gold", border: "3px solid gold", background: "black", boxShadow: "2px 2px 2px black" }}>
      {loading ? <Loading NavBar={true} /> : 
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 512 512">
        <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
        </svg>}
      </Button>
    </div>
    </>
  )
}

export default InventoryBag