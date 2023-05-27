import { useEffect, useState, useRef } from 'react'; 
import { StatusEffect } from '../components/GameCompiler/StatusEffects';
import CombatSettingModal from '../components/GameCompiler/CombatSettingModal';
import { ACTIONS } from '../components/GameCompiler/CombatStore';
import { GameData, GAME_ACTIONS } from '../components/GameCompiler/GameStore';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';

interface Props {
    gameState: GameData;
    gameDispatch: any;
    setWeaponOrder: any;
    setDamageType: any;
    setPrayerBlessing: any;
    state: any;
    dispatch: any;
    handleInstant: (e: { preventDefault: () => void; }) => Promise<void>;
    handlePrayer: (e: { preventDefault: () => void; }) => Promise<void>;
};

const StoryActions = ({ state, dispatch, gameState, gameDispatch, handleInstant, handlePrayer, setDamageType, setPrayerBlessing, setWeaponOrder }: Props) => {
  const [displayedAction, setDisplayedAction] = useState<any>([]);
  const [invokeTime, setInvokeTime] = useState({
    instant: 30000,
    cambiren: 1000
  });
  const [prayerModal, setPrayerModal] = useState<boolean>(false);
  const [prayers, setPrayers] = useState([ 'Buff', 'Heal', 'Debuff', 'Damage' ]);
  const dropdownRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    setupPrayers(gameState.player);
  }, [gameState.player]);

  useEffect(() => {
    setDisplayedAction(`Weapon: ${state.weapons[0]?.name}`);
  }, [state.weapons[0]]);

  useEffect(() => {
    setDisplayedAction(`Damage: ${state.player_damage_type}`);
  }, [state.player_damage_type]);

  useEffect(() => {
    setDisplayedAction(`Prayer: ${state.playerBlessing}`);
  }, [state.playerBlessing]);

  useEffect(() => {
    let instantTimer: ReturnType<typeof setTimeout>;
    if (gameState.instantStatus) {
      instantTimer = setTimeout(() => {
        gameDispatch({
          type: GAME_ACTIONS.INSTANT_COMBAT,
          payload: false,
        });
      }, gameState?.miniGameCambiren ? invokeTime.cambiren : invokeTime.instant);
    }
    return () => {
      clearTimeout(instantTimer);
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
  }, [state.dodgeStatus, dispatch, state.weather]);

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
    if (state.prayerSacrifice === '' && state.prayerSacrificeName === '') return;
    handlePrayer({ preventDefault: () => {} });
  }, [state.prayerSacrifice]);

  const setupPrayers = (player: any) => {
    let extraPrayers: string[] = [];
    if (player.capable.avarice) extraPrayers.push('Avarice');
    if (player.capable.denial) extraPrayers.push('Denial');
    if (player.capable.dispel) extraPrayers.push('Dispel');
    if (player.capable.silence) extraPrayers.push('Silence');
    if (extraPrayers.length > 0) {
      setPrayers([
        ...prayers,
        ...extraPrayers
      ]);
    };
  };

  const handlePrayerMiddleware = async (effect: StatusEffect) => {
    dispatch({ type: ACTIONS.SET_PRAYER_SACRIFICE, payload: effect });
  }; 
  
  const borderColor = (mastery: string) => {
    switch (mastery) {
        case 'Constitution': return '#fdf6d8';
        case 'Strength': return 'red';
        case 'Agility': return 'green';
        case 'Achre': return 'blue';
        case 'Caeren': return 'purple';
        case 'Kyosir': return 'gold';
        default: return 'black';
    };
}; 

  const getEffectStyle = {
    border: '2px solid ' + borderColor(state?.player?.mastery),
    boxShadow: '0 0 1em ' + borderColor(state?.player?.mastery),  
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
    <div className='story-actions-container'>
    <textarea  className='story-action-reader' id='story-action-reader' value={displayedAction} readOnly></textarea>
    <CombatSettingModal story={true} state={state} damageType={state.weapons[0].damage_type} setDamageType={setDamageType} setPrayerBlessing={setPrayerBlessing} setWeaponOrder={setWeaponOrder} weapons={state.weapons} prayers={prayers} />
    {state.playerEffects.length > 0 ?
      <div className='prayers'>
        <Modal show={prayerModal} onHide={() => setPrayerModal(false)} centered id="modal-weapon">
          <Modal.Header closeButton closeVariant='white' style={{ color: "gold" }}>Consume Prayer</Modal.Header>
          <Modal.Body style={{ textAlign: "center", fontSize: "14px" }}>
            <p style={{ color: "#fdf6d8" }}>
            Those who lived during the Age of the Ancients were said to have more intimate methods of contacting and corresponding with their creators. As the Ancients used humans as a form
            {' '} to enhance themself, those favored to the Ancients were granted strength in the glow of their adherence. Some believe this was nothing more than a boost to one's disposition.
            {' '} Perhaps they were right, willing themselves inert and ineffectual.
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
            <button key={index} className='prayer-button' style={prayerColor(effect?.prayer, effect?.tick?.end, state?.combatRound)} onClick={() => handlePrayerMiddleware(effect)}>
              <img src={process.env.PUBLIC_URL + effect?.imgURL} alt={effect?.name} />
            </button> 
          )
        })} 
      </div>
    : '' }
        <button className='story-instant-button' style={getEffectStyle} onClick={handleInstant} disabled={gameState.instantStatus ? true : false}>
            <img src={process.env.PUBLIC_URL + state?.weapons[0]?.imgURL} alt={state?.weapons[0]?.name} />
        </button>
    </div>
  );
};

export default StoryActions;