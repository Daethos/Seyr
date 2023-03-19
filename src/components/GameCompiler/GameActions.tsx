import { useEffect, useState, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import './GameCompiler.css';
import CombatSettingModal from './CombatSettingModal';
import { ACTIONS } from './CombatStore';

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
    }, (state?.weapons?.[0]?.dodge * 1000));
    return () => clearTimeout(instantTimer);
  }, [instantStatus]);

  useEffect(() => {
    const dodgeTimer = setTimeout(() => {
      dispatch({
        type: ACTIONS.SET_DODGE_STATUS,
        payload: false,
      });
    }, (state?.weapons?.[0]?.dodge * 500));
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


  return (
    <>
    <textarea className='action-reader' id='action-reader' value={displayedAction} readOnly></textarea>
    <CombatSettingModal state={state} damageType={damageType} setDamageType={setDamageType} setPrayerBlessing={setPrayerBlessing} setWeaponOrder={setWeaponOrder} weapons={weapons} prayers={prayers} />
    {state.playerEffects.length > 0 ?
          (state.playerEffects.map((effect: any, index: number) => {
            return (
              <button key={index} className='prayer-button' style={prayerColor(effect?.prayer)} onClick={() => handlePrayerMiddleware(effect?.prayer)}><img src={process.env.PUBLIC_URL + effect?.imgURL} alt={effect?.name} /></button> 
            
            )
      })) : '' }
    { !state?.instantStatus ?
      <button className='instant-button' style={getEffectStyle} onClick={handleInstant}>
        <img src={process.env.PUBLIC_URL + state?.weapons[0]?.imgURL} alt={state?.weapons[0]?.name} />
      </button>
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