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
    <div style={{ display: "flex", gridColumnStart: 3, gridRowStart: 7, zIndex: 999, color: "gold", marginTop: "22.5%", float: "right" }} className="">
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

  useEffect(() => {
    if (gameState.loadedAscean) {
      setDrinking(false);
      setShowBleed(true);
      setShowFirewaterModal(false);
      gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: false });
    }
  }, [gameState.loadedAscean, drinking]);

  const saveInventory = async (inventory: any) => {
    try {
      const flattenedInventory = inventory.map((item: any) => item._id);
      const data = { ascean: ascean._id, inventory: flattenedInventory };
      const response = await asceanAPI.saveAsceanInventory(data);
      console.log(response, "Response Saving Inventory");
      gameDispatch({ type: GAME_ACTIONS.ITEM_SAVED, payload: true });
    } catch (err: any) {
      console.log(err, "Error Saving Inventory");
    };
  };

  const drinkFirewater = async () => {
    if (ascean?.firewater?.charges === 0) return;
    setDrinking(true);
    dispatch({ type: ACTIONS.PLAYER_REST, payload: 40 });
    const response = await asceanAPI.drinkFirewater(ascean?._id);
    gameDispatch({ type: GAME_ACTIONS.SET_FIREWATER, payload: response.firewater })
    console.log(response, "Response Drinking Firewater");
    gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
  };

  const replenishFirewater = async () => {
    setShowBleed(false);
    try {
      console.log("Replenishing Firewater");
      const response = await asceanAPI.replenishFirewater(ascean?._id);
      console.log(response, "Response Replenishing Firewater");
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
    console.log("Drag End")
    console.log(result, "Result")
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (destination.index === source.index) return;

    const itemIndex = dndInventory.findIndex((item: { _id: string; }) => item._id === draggableId);
    if (itemIndex !== -1) {
      // setDndInventory((prevState: any) => {
      //   const newState = [...prevState];
      //   newState.splice(source.index, 1);
      //   newState.splice(destination.index, 0, itemIndex);
      //   return newState;
      // });
      const itemsCopy = Array.from(dndInventory);
      const [reorderedItem] = itemsCopy.splice(source.index, 1);
      itemsCopy.splice(destination.index, 0, reorderedItem);

      // Update the state with the new inventory order
      setDndInventory(itemsCopy);
    }
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
  {/* <Droppable droppableId='Inventory'>
    {(provided) => {
      return ( */}
        <div className={settings ? 'inventory-bag-settings' : 'inventory-bag'}>
          { activeTab === 'gear' && dndInventory?.length > 0 ?
            dndInventory.map((item: any, index: number) => {
              return (
                <Droppable key={item._id} droppableId={item._id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} >
              <Inventory gameDispatch={gameDispatch} bag={dndInventory} inventory={item} ascean={ascean} key={index} index={index} />
              {provided.placeholder}
            </div>
                  )}
                </Droppable>
                )
            })
          : '' }
        </div>
          {/* {provided.placeholder}
      )
    }}
  </Droppable> */}
</DragDropContext>


    {/* <div className={settings ? 'inventory-bag-settings' : 'inventory-bag'}>
      { activeTab === 'gear' && dndInventory?.length > 0 ?
        dndInventory.map((item: any, index: number) => {
          return (
            <Inventory gameDispatch={gameDispatch} bag={dndInventory} inventory={item} ascean={ascean} key={index} index={index} />
            )
          })
          : '' }
    </div> */}



    { !drinking ?
      <InventoryOptions firewater={ascean?.firewater} drinkFirewater={drinkFirewater} setShowFirewaterModal={setShowFirewaterModal} mapState={mapState} />
      :
    '' }
    <div style={{ display: "flex", gridColumnStart: 4, gridRowStart: 7, zIndex: 999, marginTop: "18%", float: "right" }}>
    <Button onClick={() => saveInventory(dndInventory)} variant='' style={{ fontSize: "16px", fontWeight: 600, textShadow: "1px 1px 1px black", color: "gold", border: "2px solid gold", background: "black", boxShadow: "2px 2px 2px black" }}>Save Inventory</Button>
    </div>
    </>
  )
}

export default InventoryBag