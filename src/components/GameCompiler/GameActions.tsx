import { useEffect, useState, useRef, RefAttributes } from 'react';
import Form from 'react-bootstrap/Form';
import './GameCompiler.css';
import CombatSettingModal from './CombatSettingModal';
import { ACTIONS } from './CombatStore';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip, { TooltipProps } from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

interface Props {
    handleAction: (action: any) => void;
    handleCounter: (action: any) => void;
    handleInitiate: (e: { preventDefault: () => void; }) => Promise<void>;
    currentAction: string;
    currentCounter: string;
    currentWeapon: any;
    setWeaponOrder: any;
    weapons: any;
    sleep: (ms: number) => Promise<unknown>;
    setEmergencyText: React.Dispatch<React.SetStateAction<any[]>>;
    timeLeft: number;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    setDamageType: any;
    damageType: any;
    currentDamageType: string;
    setPrayerBlessing: any;
    state: any;
    dispatch: any;
    handleInstant: (e: { preventDefault: () => void; }) => Promise<void>;
    handlePrayer: (e: { preventDefault: () => void; }) => Promise<void>;
};

const GameActions = ({ state, dispatch, setEmergencyText, handleInstant, handlePrayer, setDamageType, damageType, currentDamageType, setPrayerBlessing, timeLeft, setTimeLeft, handleAction, handleCounter, handleInitiate, sleep, currentAction, currentCounter, currentWeapon, setWeaponOrder, weapons }: Props) => {
  const [displayedAction, setDisplayedAction] = useState<any>([]);
  const [prayerModal, setPrayerModal] = useState<boolean>(false);
  const { actionStatus } = state;
  const { dodgeStatus } = state;
  const { combatInitiated } = state;
  const { instantStatus } = state;
  const counters = ['attack', 'counter', 'dodge', 'posture', 'roll'];
  const prayers = ['Buff', 'Heal', 'Debuff', 'Damage'];
  const dropdownRef = useRef<HTMLSelectElement | null>(null);
  useEffect(() => {
    if (currentAction === 'counter') {
      setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1) + ': ' + currentCounter.charAt(0).toUpperCase() + currentCounter.slice(1));
    } else {
      setDisplayedAction(currentAction.charAt(0).toUpperCase() + currentAction.slice(1));
      dispatch({ type: ACTIONS.CLEAR_COUNTER, payload: '' });
    };
  }, [currentAction, currentCounter]);

  useEffect(() => {
    setDisplayedAction(`Weapon: ${currentWeapon?.name}`);
  }, [currentWeapon]);

  useEffect(() => {
    setDisplayedAction(`Damage: ${currentDamageType}`);
  }, [currentDamageType]);

  useEffect(() => {
    setDisplayedAction(`Prayer: ${state.playerBlessing}`);
  }, [state.playerBlessing]);

  useEffect(() => {
    if (state.combatInitiated) {
        if (dropdownRef.current) {
            dropdownRef!.current.selectedIndex = 0;
        };
        dispatch({
          type: ACTIONS.SET_COMBAT_INITIATED,
          payload: false
        });
      };
  }, [combatInitiated]);

  useEffect(() => {
    const instantTimer = setTimeout(() => {
      dispatch({
        type: ACTIONS.SET_INSTANT_STATUS,
        payload: false,
      });
    }, (state?.weapons?.[0]?.dodge * 500));
    return () => clearTimeout(instantTimer);
  }, [instantStatus]);

  useEffect(() => {
    const dodgeTimer = setTimeout(() => {
      dispatch({
        type: ACTIONS.SET_DODGE_STATUS,
        payload: false,
      });
    }, (state?.weapons?.[0]?.dodge * 1000));
    return () => clearTimeout(dodgeTimer);
  }, [dodgeStatus]);

  useEffect(() => {
    const initiateTimer = setTimeout(() => {
      dispatch({
        type: ACTIONS.SET_ACTION_STATUS,
        payload: false
      })
    }, 3000);
    return () => clearTimeout(initiateTimer);
  }, [actionStatus]);

  useEffect(() => {
    console.log(state.prayerSacrifice, "Pre-Check Prayer")
    if (state.prayerSacrifice === '') return;
    console.log(state.prayerSacrifice, "Sacrifing Prayer")
    handlePrayer({ preventDefault: () => {} });

  }, [state.prayerSacrifice]);

  const handlePrayerMiddleware = async (prayer: string) => {
    console.log("Setting Prayer to Sacrifice: ", prayer);
    dispatch({
      type: ACTIONS.SET_PRAYER_SACRIFICE,
      payload: prayer,
    });
  };

  const prayerPopover = (
    <Popover className="text-info" id="popover" >
        <Popover.Header id="popover-header" className="" as="h2" style={{ backgroundColor: "black" }}>Consume Prayer<span id="popover-image"></span></Popover.Header>
        <Popover.Body id="popover-body" className="" style={{ backgroundColor: "black", fontSize: "12px" }}>
            Those who lived during the Age of the Ancients were said to have more intimate methods of contacting and corresponding with their creators. As the Ancients used humans as a form
            {' '} to enhance their being, those favored to the Ancients were granted strength in the glow of their beloved Ancient. Some believed this was more than simply a boost to one's disposition.
            {' '} Others sought to channel it through their caer into a single burst.
            <br /><br />
            Consume a Prayer to experience a burst of caerenic beauty.
            <p style={{ color: "gold" }}></p>
            Damage - Damage Opponent for 150% Round Damage<br />
            Debuff - Damage Opponent From Opponent's Last Attack<br />
            Buff - Damage Opponent From Last Attack<br />
            Heal - Heal for 150% Round Heal
        </Popover.Body>
    </Popover>
);

  
  const borderColor = (mastery: string) => {
    switch (mastery) {
        case 'Constitution': return 'white';
        case 'Strength': return 'red';
        case 'Agility': return 'green';
        case 'Achre': return 'blue';
        case 'Caeren': return 'purple';
        case 'Kyosir': return 'gold';
        default: return 'black';
    };
};

  const instantStyle = {
    color: borderColor(state?.player?.mastery),
    fontSize: "1.1em",
    textShadow: '1.5px 1.5px 1.5px black',
    gridColumnStart: 3, 
    gridRowStart: 6,
    marginTop: "3.25em",
    marginLeft: "",
  }

  const getEffectStyle = {
    border: 2 + 'px solid ' + borderColor(state?.player?.mastery),
    boxShadow: '0 0 1em ' + borderColor(state?.player?.mastery),  
    borderRadius: "50%",
  };

  const prayerColor = (prayer: string) => {
    switch (prayer) {
        case 'Buff': 
          return {
            border: '2px solid gold',
            boxShadow: '0 0 1em gold',
          };
        case 'Debuff': 
          return {
            border: '2px solid purple',
            boxShadow: '0 0 1em purple',
          };
        case 'Heal': 
          return {
            border: '2px solid green',
            boxShadow: '0 0 1em green',
          };
        case 'Damage': 
          return {
            border: '2px solid red',
            boxShadow: '0 0 1em red',
          };
        default: return {};
    };
};

  const consumeTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id='consume-tooltip' {...props}>
      <strong>Consume Prayer</strong>
    </Tooltip>
  );

  const instantTooltip = (props: JSX.IntrinsicAttributes & TooltipProps & RefAttributes<HTMLDivElement>) => (
    <Tooltip id='instant-tooltip' {...props}>
      <strong>Invocation</strong>
    </Tooltip>
  );

  return (
    <>

    <textarea className='action-reader' id='action-reader' value={displayedAction} readOnly></textarea>
    <CombatSettingModal state={state} damageType={damageType} setDamageType={setDamageType} setPrayerBlessing={setPrayerBlessing} setWeaponOrder={setWeaponOrder} weapons={weapons} prayers={prayers} />
    {state.playerEffects.length > 0 ?
      <div className='prayers'>
        <Modal show={prayerModal} onHide={() => setPrayerModal(false)} centered id="modal-weapon">
          <Modal.Header closeButton closeVariant='white' style={{ color: "gold" }}>Consume Prayer</Modal.Header>
          <Modal.Body style={{ textAlign: "center", fontSize: "14px" }}>
            <p style={{ color: "#fdf6d8" }}>
          Those who lived during the Age of the Ancients were said to have more intimate methods of contacting and corresponding with their creators. As the Ancients used humans as a form
            {' '} to enhance their being, those favored to the Ancients were granted strength in the glow of their beloved Ancient. Some believed this was more than simply a boost to one's disposition.
            {' '} Others sought to channel it through their caer into a single burst.
            <br />
            </p>

            Consume a Prayer to experience a burst of caerenic beauty.
            <br /><br />
            <p style={{ color: "gold" }}>
            Damage - Damage Opponent for 150% Round Damage<br />
            </p>
            <p style={{ color: "gold" }}>
            Debuff - Damage Opponent From Opponent's Last Attack<br />
            </p>
            <p style={{ color: "gold" }}>
            Buff - Damage Opponent From Last Attack<br />
            </p>
            <p style={{ color: "gold" }}>
            Heal - Heal for 150% Round Heal
            </p>
          </Modal.Body>
        </Modal>
        <Button variant='' onClick={() => setPrayerModal(true)} style={{ color: "gold", fontSize: "20px", textShadow: "2.5px 2.5px 2.5px black", fontWeight: 600 }}>Sacrifical Prayers </Button><br />
        {/* <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={prayerPopover}>
        <p style={{ color: "gold" }}>Sacrifical Prayers</p>
        </OverlayTrigger> */}
        {
      state.playerEffects.map((effect: any, index: number) => {
        return (
          <OverlayTrigger key={index} placement='auto-start' overlay={consumeTooltip}>
              <button className='prayer-button' style={prayerColor(effect?.prayer)} onClick={() => handlePrayerMiddleware(effect?.prayer)}>
                <img src={process.env.PUBLIC_URL + effect?.imgURL} alt={effect?.name} />
              </button> 
            </OverlayTrigger>
          )
        })} 
        </div>
      : '' }
    { !state?.instantStatus ?
    <>
      <p style={instantStyle}>
      Invoke
      </p>
      <OverlayTrigger placement='auto-start' overlay={instantTooltip}>
        <button className='instant-button' style={getEffectStyle} onClick={handleInstant}>
          <img src={process.env.PUBLIC_URL + state?.weapons[0]?.imgURL} alt={state?.weapons[0]?.name} />
        </button>
      </OverlayTrigger>
    </>
    : '' }
    <div className="actionButtons" id='action-buttons'>
      <Form onSubmit={handleInitiate} style={{ float: 'right' }}>                
          <button value='initiate' type='submit' className='btn btn-outline' disabled={state.actionStatus ? true : false} id='initiate-button'>Initiate</button>
      </Form>
      <button value='attack' onClick={handleAction} className='btn btn-outline' id='action-button'>Attack</button>
      <select onChange={handleCounter} className='btn btn-outline' id='action-button' ref={dropdownRef}>
        <option>Counter</option>
        {counters.map((counter: string, index: number) => ( 
          <option value={counter} key={index}>{counter.charAt(0).toUpperCase() + counter.slice(1)}</option> 
        ))}
      </select>
      <button value='dodge' onClick={handleAction} disabled={state.dodgeStatus ? true : false} className='btn btn-outline' id='dodge-button'>Dodge</button>
      <button value='posture' onClick={handleAction} className='btn btn-outline' id='action-button'>Posture</button>
      <button value='roll' onClick={handleAction} className='btn btn-outline' id='action-button'>Roll</button>
    </div>
    </>
  );
};

export default GameActions;