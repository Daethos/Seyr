import React, { useEffect, useState } from 'react';
import Inventory from './Inventory';
import Button from 'react-bootstrap/Button';
import { ACTIONS } from './CombatStore';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import * as asceanAPI from '../../utils/asceanApi';
import { GAME_ACTIONS } from './GameStore';

interface Firewater {
  charges: number;
  maxCharges: number;
}

interface Props {
    inventory: any;
    ascean: any;
    dispatch: any;
    settings?: boolean;
    gameDispatch: React.Dispatch<any>;
    gameState: any;
}

interface IOProps {
    drinkFirewater: () => void;
    firewater: Firewater;
};

const InventoryOptions = ({ drinkFirewater, firewater }: IOProps) => {
  const getBorder = (firewater: number) => {
    console.log(firewater, "How many charges do you have left?");
    switch (firewater) {
      case 0:
        return "2px solid red";
      default:
        return "2px solid gold";
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
        <Button variant='' onClick={drinkFirewater} style={{ color: "gold", fontSize: "20px", fontWeight: 700, textShadow: "1px 1px 1px black", float: "right" }}>
          Take a Drink?
      </Button> 
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

const InventoryBag = ({ ascean, dispatch, inventory, settings, gameDispatch, gameState }: Props) => {
  const [activeTab, setActiveTab] = useState('gear');
  const [drinking, setDrinking] = useState(false);

  useEffect(() => {
    if (gameState.loadedAscean) {
      setDrinking(false);
      gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: false });
    }
  }, [gameState.loadedAscean, drinking]);

  const drinkFirewater = async () => {
    // if (ascean?.firewater?.charges === 0) return;
    setDrinking(true);
    dispatch({ type: ACTIONS.PLAYER_REST, payload: 40 });
    const response = await asceanAPI.drinkFirewater(ascean?._id);
    console.log(response, "Response Drinking Firewater");
    gameDispatch({ type: GAME_ACTIONS.EQP_SWAP, payload: true });
  };
  
  return (
    <>
    <div className={settings ? 'inventory-bag-settings' : 'inventory-bag'}>
      { activeTab === 'gear' && inventory?.length > 0 ?
        inventory.map((item: any, index: number) => {
          return (
            <Inventory gameDispatch={gameDispatch} bag={inventory} inventory={item} ascean={ascean} key={index} />
          )
        })
      : '' }
    </div>
    { !drinking ?
      <InventoryOptions firewater={ascean?.firewater} drinkFirewater={drinkFirewater} />
      :
    '' }
    </>
  )
}

export default InventoryBag