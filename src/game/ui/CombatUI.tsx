import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import playerHealthbar from '../images/player-healthbar.png';
import playerPortrait from '../images/player-portrait.png';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import PhaserEffects from './PhaserEffects';
import ItemPopover, { getBorderStyle, itemPopover } from './ItemPopover';
import { setInstantStatus } from '../reducers/combatState';

interface CombatUIProps {
    state: CombatData;
    staminaPercentage: number;
    pauseState: boolean;    
};

const CombatUI = ({ state, staminaPercentage, pauseState }: CombatUIProps) => {
    const dispatch = useDispatch();
    const stealth = useSelector((state: any) => state.game.stealth);
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0);
    const [invokeModal, setInvokeModal] = useState<boolean>(false);
    const [prayerModal, setPrayerModal] = useState<boolean>(false);

    useEffect(() => {
        setPlayerHealthPercentage(Math.round((state.newPlayerHealth/state.playerHealth) * 100));
    }, [state.newPlayerHealth, state.playerHealth]); 

    useEffect(() => {
        let instantTimer: ReturnType<typeof setTimeout>;
        if (state.instantStatus) {
            instantTimer = setTimeout(() => dispatch(setInstantStatus(false)), 30000);
        } else if (!state.combatEngaged) {
            dispatch(setInstantStatus(false));
        };
        return () => clearTimeout(instantTimer);
    }, [state.instantStatus, dispatch, state.combatEngaged]);


    const getItemRarityStyle = (rarity: string) => {
        return {
            border: '0.15em solid ' + getBorderStyle(rarity),
            background: 'black',
            boxShadow: '0 0 2em ' + getBorderStyle(rarity),
            borderRadius: '0 0 50% 50% / 50% 50% 50% 50%', // Custom border radius values
        };
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

    const getInvokeStyle = {
        textShadow: '0 0 1em ' + borderColor(state?.player?.mastery),
        color: borderColor(state?.player?.mastery),
    };

    return (
        <div className='player-combat-ui' id={state.playerDamaged ? 'flicker' : ''}> 
            { !state.instantStatus && (
                <>
                <Modal show={invokeModal} onHide={() => setInvokeModal(false)} centered id="modal-weapon" style={{ top: "-25%" }}> 
                <Modal.Header closeButton closeVariant='white' style={{ color: "gold", fontSize: "24px", fontWeight: 600 }}>Invoke Prayer</Modal.Header>
                <Modal.Body style={{ textAlign: "center", fontSize: "16px" }}>
                    <p style={{ color: "#fdf6d8" }}>
                    Sages ruminate achreic methods of contacting and corresponding with their creators, seeking and separating belief, ritual, and experience. As the Ancients used humans
                    {' '} to enhance their caer, those keen to the Ancients were able to hold tethers to their caer in the fade of their adherence and communion with the beings. Some believe this was nothing more than meditation to mend the mind.
                    {' '} Perhaps they were right, unwilling or unable to experience the warping and the willowing.
                    {' '} Others sought to channel it through their achre and sieve.<br /><br />
                    </p>
                    <p style={{ color: 'gold' }}> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
                    <path d="M261.094 16.03l-18.688.032.063 33.282c-15.95.64-31.854 3.145-47.595 7.53l-10.22-33.28-17.874 5.468 10.345 33.594c-12.496 4.636-24.867 10.44-37.03 17.438l-19.126-30.5-15.814 9.906 19.063 30.47c-10.68 7.15-21.16 15.22-31.44 24.218L66.907 90.124l-12.75 13.688 24.875 23.124c-2.465 2.406-4.937 4.83-7.374 7.344l-6.28 6.5 6.28 6.5c54.467 56.233 116.508 85.097 178.906 85.095 62.4-.002 124.43-28.87 178.907-85.094l6.28-6.5-6.28-6.5c-2.38-2.455-4.782-4.835-7.19-7.186l25-23.28-12.717-13.69-26.032 24.22c-9.15-8.024-18.462-15.315-27.936-21.875l19.312-30.782-15.812-9.938-19.188 30.594c-12.823-7.665-25.888-14.007-39.094-19.03l10.313-33.533-17.875-5.468-10.156 33.063c-15.513-4.467-31.21-7.082-46.938-7.906l-.062-33.44zM250.53 70.25c39.147 0 70.69 31.51 70.69 70.656s-31.543 70.688-70.69 70.688c-39.145 0-70.655-31.542-70.655-70.688 0-39.145 31.51-70.656 70.656-70.656zm64.69 9.063c32.377 11.564 64.16 31.955 94.28 61.468-30.015 29.402-61.683 49.757-93.938 61.345 15.08-16.01 24.344-37.562 24.344-61.22 0-23.838-9.4-45.545-24.687-61.593zm-129.408.03c-15.27 16.045-24.656 37.74-24.656 61.563 0 23.64 9.25 45.18 24.313 61.188-32.218-11.596-63.837-31.944-93.814-61.313 30.092-29.474 61.823-49.863 94.156-61.436zm64.75 10.813c-27.99 0-50.687 22.696-50.687 50.688 0 27.99 22.696 50.656 50.688 50.656 27.99 0 50.687-22.667 50.687-50.656 0-27.992-22.696-50.688-50.688-50.688zm78.875 146.406c-25.884 9.117-52.37 13.72-78.875 13.72-16.853 0-33.69-1.897-50.375-5.595l59.594 51.125-93.686 2.5L419.53 492.188l-85.81-144.375 71.53-.718-75.813-110.53z"></path>
                    </svg>{' '}
                    Invoke - Your mastery and adherence or devotion dictate what you can perform in an instant, a potentially damaging or life saving decision. As you grow, so too does your ability to sway chance.
                    </p> 
                    <br />
                    Invoke your mastery to experience a burst of brilliant conviction.<br /><br />
                </Modal.Body>
                </Modal>
                <button className='story-invoke' onClick={() => setInvokeModal(true)}>
                    <p className='story-invoke-name' style={getInvokeStyle}>
                        {state.playerBlessing}
                    </p> 
                </button> 
                </>
            ) } 
            { state.playerEffects.length > 0 && (
                <div className='story-prayers' style={{ position: "absolute" }}>
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
                    <Button variant='' onClick={() => setPrayerModal(true)} className='story-consume' style={getInvokeStyle}>Consume </Button><br />
                </div>
            ) }
            <img src={playerHealthbar} alt="Health Bar" style={{ position: "absolute", width: '150px', height: '40px' }} />
            <p className='story-name'>{state.player.name}</p>
            <ProgressBar variant={stealth ? "black" : "info"} now={playerHealthPercentage} className='story-health-bar' />
            <p className='story-portrait'>{`${Math.round(state.newPlayerHealth)} / ${state.playerHealth} [${playerHealthPercentage}%]`}</p>
            <img src ={playerPortrait} alt="Player Portrait" className='player-portrait' />
            <ProgressBar variant="success" now={staminaPercentage} className='story-stamina-bubble'  />
            <p className='story-stamina'>{Math.round((staminaPercentage / 100) * state.playerAttributes.stamina)}</p>
            <div className='combat-ui-weapon'> 
                <ItemPopover item={state.weapons[0]} prayer={state.playerBlessing} caerenic={state.isCaerenic} />
            </div>
            <div className='stalwart'>
            { state.isStalwart && (
                <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(state.player.shield, true)}>
                    <img src={state.player.shield.imgURL} className="m-1 eqp-popover spec" alt={state.player.shield.name} style={getItemRarityStyle(state.player.shield.rarity)} />
                </OverlayTrigger>
            ) }
            </div>
            { state.playerEffects.length > 0 && (
                <div className='combat-effects' style={{ zIndex: 2 }}>
                    {state.playerEffects.map((effect: any, index: number) => {
                        return ( <PhaserEffects state={state} effect={effect} pauseState={pauseState} key={index} /> )
                    })}
                </div>
            ) } 
        </div> 
    );
};

export default CombatUI;