import { useEffect, useState, useRef, RefAttributes } from 'react';
import Form from 'react-bootstrap/Form';
import './GameCompiler.css';
import CombatSettingModal from './CombatSettingModal';
import { ACTIONS } from './CombatStore';
import { GameData, GAME_ACTIONS } from './GameStore';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import useTimers, { Timer } from './useTimers';

interface Props {
    handleAction: (action: any) => void;
    handleCounter: (action: any) => void;
    gameState: GameData;
    gameDispatch: any;
    // handleInitiate: (e: { preventDefault: () => void; }) => Promise<void>;
    handleInitiate: (state: any) => void;
    currentAction: string;
    currentCounter: string;
    currentWeapon: any;
    setWeaponOrder: any;
    weapons: any;
    setDamageType: any;
    damageType: any;
    currentDamageType: string;
    setPrayerBlessing: any;
    state: any;
    dispatch: any;
    handleInstant: (e: { preventDefault: () => void; }) => Promise<void>;
    handlePrayer: (e: { preventDefault: () => void; }) => Promise<void>;
};

const GameActions = ({ state, dispatch, gameState, gameDispatch, handleInstant, handlePrayer, setDamageType, damageType, currentDamageType, setPrayerBlessing, handleAction, handleCounter, handleInitiate, currentAction, currentCounter, currentWeapon, setWeaponOrder, weapons }: Props) => {
  const [displayedAction, setDisplayedAction] = useState<any>([]);
  const [prayerModal, setPrayerModal] = useState<boolean>(false);
  const [instantTimerId, setInstantTimerId] = useState<any>(null);
  const { combatInitiated } = state;
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
    if (!gameState.instantStatus) return;
    let instantTimer: string | number | NodeJS.Timeout | undefined;
      instantTimer = setTimeout(() => {
        gameDispatch({
          type: GAME_ACTIONS.INSTANT_COMBAT,
          payload: false,
        });
      }, 30000);
      const endTime = instantTimer ? new Date().getTime() + 30000 : 0;
      const interval = setInterval(() => {
        const remainingTime = Math.round((endTime - new Date().getTime()) / 1000);
        console.log(`Instant status will expire in ${remainingTime} seconds`);
      }, 1000);
      setInstantTimerId(instantTimer);

    return () => {
      clearTimeout(instantTimerId);
      clearInterval(interval);
      setInstantTimerId(null);
    };
  }, [gameState.instantStatus, gameDispatch]);

  useEffect(() => {
    const dodgeTimer = setTimeout(() => {
      dispatch({
        type: ACTIONS.SET_DODGE_STATUS,
        payload: false,
      });
    }, (state?.weapons?.[0]?.dodge * 1000));
    return () => clearTimeout(dodgeTimer);
  }, [state.dodgeStatus, dispatch]);

  useEffect(() => {
    const initiateTimer = setTimeout(() => {
      dispatch({
        type: ACTIONS.SET_ACTION_STATUS,
        payload: false
      })
    }, 3000);
    return () => clearTimeout(initiateTimer);
  }, [state.actionStatus, dispatch]);

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
  }

  const getEffectStyle = {
    border: 3 + 'px solid ' + borderColor(state?.player?.mastery),
    boxShadow: '0 0 1.5em ' + borderColor(state?.player?.mastery),  
  };

  const prayerColor = (prayer: string, endTick: number, combatRound: number) => {
    switch (prayer) {
        case 'Buff': 
          return {
            border: endTick === combatRound ? '2px solid #ffff66' : '2px solid gold',
            boxShadow: endTick === combatRound ? '0 0 1em #ffff66' : '0 0 1em gold',
          };
        case 'Debuff': 
          return {
            border: endTick === combatRound ? '2px solid #ee82ee' : '2px solid purple',
            boxShadow: endTick === combatRound ? '0 0 1em #ee82ee' : '0 0 1em purple',
          };
        case 'Heal': 
          return {
            border: endTick === combatRound ? '2px solid lightgreen' : '2px solid green',
            boxShadow: endTick === combatRound ? '0 0 1em lightgreen' : '0 0 1em green',
          };
        case 'Damage': 
          return {
            border: endTick === combatRound ? '2px solid #ff6666' : '2px solid red',
            boxShadow: endTick === combatRound ? '0 0 1em #ff6666' : '0 0 1em red',
          };
        default: return {};
    };
  };

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
            {' '} Others sought to channel it through their caer into a single burst.<br /><br />
            Consume a prayer to experience a burst of caerenic beauty.
            </p><br />
            <p style={{ color: "gold" }}>
            <b>Damage</b> - Burst Tick for <b>50%</b> Round Damage<br />
            </p>
            <p style={{ color: "gold" }}>
            <b>Debuff</b> - Damage Opponent With <b>50%</b> of <b>Opponent's</b> Last Attack<br />
            </p>
            <p style={{ color: "gold" }}>
            <b>Buff</b> - Damage Opponent With <b>50%</b> of <b>Your</b> Last Attack<br />
            </p>
            <p style={{ color: "gold" }}>
            <b>Heal</b> - Burst Tick for <b>50%</b> Round Heal
            </p>
          </Modal.Body>
        </Modal>
        <Button variant='' onClick={() => setPrayerModal(true)} style={{ color: "gold", fontSize: "20px", textShadow: "2.5px 2.5px 2.5px black", fontWeight: 600 }}>Consume Prayers </Button><br />
        { state.playerEffects.map((effect: any, index: number) => {
          return (
            <button key={index} className='prayer-button' style={prayerColor(effect?.prayer, effect?.tick?.end, state?.combatRound)} onClick={() => handlePrayerMiddleware(effect?.prayer)}>
              <img src={process.env.PUBLIC_URL + effect?.imgURL} alt={effect?.name} />
            </button> 
          )
        })} 
        </div>
      : '' }
    <>
      <p style={instantStyle} className={`invoke${gameState.instantStatus ? '-instant' : ''}`}>Invoke</p>
      <button className='instant-button' style={getEffectStyle} onClick={handleInstant} disabled={gameState.instantStatus ? true : false}>
        <img src={process.env.PUBLIC_URL + state?.weapons[0]?.imgURL} alt={state?.weapons[0]?.name} />
      </button>
    </>
    <div className="actionButtons" id='action-buttons'>
      {/* <Form onSubmit={handleInitiate} style={{ float: 'right' }}>                 */}
          <button value='initiate' style={{ float: 'right', padding: "5px" }} className='btn btn-outline' disabled={state.actionStatus ? true : false} id='initiate-button' onClick={() => handleInitiate(state)}>Initiate</button>
      {/* </Form> */}
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