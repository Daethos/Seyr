import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import playerHealthbar from '../images/player-healthbar.png';
import playerPortrait from '../images/player-portrait.png';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { Equipment, GAME_ACTIONS, GameData } from '../../components/GameCompiler/GameStore';
import StatusEffects, { StatusEffect } from '../../components/GameCompiler/StatusEffects';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface CombatUIProps {
    state: CombatData;
    dispatch: any;
    gameState: GameData;
    gameDispatch: any;
    staminaPercentage: number;
    setStaminaPercentage: any;
    pauseState: boolean;    
    handleCallback: (state: CombatData, effect: StatusEffect, effectTimer: number) => Promise<void>;
};

const CombatUI = ({ state, dispatch, gameState, gameDispatch, staminaPercentage, setStaminaPercentage, pauseState, handleCallback }: CombatUIProps) => {
    const [playerHealthPercentage, setPlayerHealthPercentage] = useState<number>(0);
    const [invokeModal, setInvokeModal] = useState<boolean>(false);
    const [prayerModal, setPrayerModal] = useState<boolean>(false);
    const [displayedAction, setDisplayedAction] = useState<any>([]);

    useEffect(() => {
        updatePlayerHealthPercentage();
    }, [state.new_player_health]);

    useEffect(() => {
        setDisplayedAction(`Damage: ${state.player_damage_type}`);
    }, [state.player_damage_type]);

    useEffect(() => {
        setDisplayedAction(`Weapon: ${state.weapons[0]?.name}`);
    }, [state.weapons[0]]);

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
        }, 30000);
        }
        return () => {
        clearTimeout(instantTimer);
        };
    }, [gameState.instantStatus, gameDispatch]);

    const updatePlayerHealthPercentage = async () => {
        try {
            const newHealthPercentage = Math.round((state.new_player_health/state.player_health) * 100);
            setPlayerHealthPercentage(newHealthPercentage);
        } catch (err: any) {
            console.log(err.message, 'Error updating Health Percentage')
        };
    };

    const itemPopover = (item: Equipment) => {
        return (
            <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{item?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + item?.imgURL} alt={item?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                { item?.name === 'Empty Weapon Slot' || item?.name === 'Empty Shield Slot' || item?.name === 'Empty Amulet Slot' || item?.name === 'Empty Ring Slot' || item?.name === 'Empty Trinket Slot' ? '' : 
                    <>
                        { item?.type && item?.grip ? (
                    <>
                        {item?.type} [{item?.grip}] <br />
                        {item?.attack_type} [{item?.damage_type?.[0]}{item?.damage_type?.[1] ? ' / ' + item.damage_type[1] : '' }{item?.damage_type?.[2] ? ' / ' + item?.damage_type?.[2] : '' }] <br />
                    </>
                    ) : item?.type ? ( <>{item.type} <br /></> ) : ( '' )}
                    {item?.constitution > 0 ? 'CON: +' + item?.constitution + ' ' : ''}
                    {item?.strength > 0 ? 'STR: +' + item?.strength + ' ' : ''}
                    {item?.agility > 0 ? 'AGI: +' + item?.agility + ' ' : ''}
                    {item?.achre > 0 ? 'ACH: +' + item?.achre + ' ' : ''}
                    {item?.caeren > 0 ? 'CAER: +' + item?.caeren + ' ' : ''}
                    {item?.kyosir > 0 ? 'KYO: +' + item?.kyosir + ' ' : ''}<br />
                    Damage: {item?.physical_damage} Phys | {item?.magical_damage} Magi <br />
                    { item?.physical_resistance || item?.magical_resistance ? (
                        <>
                            Defense: {item?.physical_resistance} Phys | {item?.magical_resistance} Magi <br />
                        </>
                    ) : ( '' ) }
                    { item?.physical_penetration || item?.magical_penetration ? (
                        <>
                            Penetration: {item?.physical_penetration} Phys | {item?.magical_penetration} Magi <br />
                        </>
                    ) : ( '' ) }
                    Crit Chance: {item?.critical_chance}% <br />
                    Crit Damage: {item?.critical_damage}x <br />
                    Roll Chance: {item?.roll}% <br />
                    { item?.influences && item?.influences?.length > 0 ? (
                        <>Influence: {item?.influences?.[0]}<br /></>
                    ) : ( '' ) }
                    <p style={{ color: getBorderStyle(item?.rarity), marginTop: "5%", fontSize: "16px" }}>
                        {item?.rarity}
                    </p>
                    { state.isStalwart ? (
                        <p style={{ color: "gold" }}>
                            Stalwart - You are engaged in combat with your shield raised, adding it to your passive defense. You receive 50% less poise damage. You receive 15% less damage. You cannot dodge or roll.
                        </p>
                    ) : ( '' ) }
                </> }
            </Popover.Body>
        </Popover>
        );
    };


    function getShadowStyle(prayer: string) {
        switch (prayer) {
            case 'Buff':
                return 'gold';
            case 'Damage':
                return 'red';
            case 'Debuff':
                return 'purple';
            case 'Heal':
                return 'green';
            case 'Avarice':
                return 'greenyellow';
            case 'Denial':
                return '#0cf';
            case 'Dispel':
                return '#fdf6d8';
            case 'Silence':
                return 'black';
            default:
                return 'white';
        };
    };

    function getBorderStyle(rarity: string) {
        switch (rarity) {
            case 'Common':
                return 'white';
            case 'Uncommon':
                return 'green';
            case 'Rare':
                return 'blue';
            case 'Epic':
                return 'purple';
            case 'Legendary':
                return 'darkorange';
            default:
                return 'grey';
        };
    };
    const getItemStyle = (rarity: string) => {
        return {
            border: '0.15em solid ' + getShadowStyle(state.playerBlessing),
            background: 'black',
            boxShadow: '0 0 2em ' + getShadowStyle(state.playerBlessing),
            borderRadius: '50%',
            fontWeight: 700,
        };
    };

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

    const getEffectStyle = {
        border: 'none',
        backgroundColor: "transparent",
        top: "-10px", // Was 22.5px
    };

    const getInvokeStyle = {
        textShadow: '0 0 1em ' + borderColor(state?.player?.mastery),
        color: borderColor(state?.player?.mastery),
        fontSize: "10px",
        fontFamily: "Cinzel",
    };

    return (
        <div style={{ position: "absolute", transform: "scale(1.25)", top: "15px", left: "10px" }} id={state.playerDamaged ? 'flicker' : ''}> 
            { !gameState.instantStatus ? (
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
                <button className='story-invoke' style={getEffectStyle} onClick={() => setInvokeModal(true)}>
                    <p style={getInvokeStyle}>
                        Invoke
                    </p> 
                </button> 
                </>
            ) : ( '' ) } 
        {state.playerEffects.length > 0 ?
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
                <Button variant='' onClick={() => setPrayerModal(true)} style={getInvokeStyle}>Consume </Button><br />
            </div>
        : ( '' )}
            <img src={playerHealthbar} alt="Health Bar" style={{ position: "absolute", width: '150px', height: '40px' }} />
            <p style={{ position: "absolute", color: "gold", fontSize: "12px", width: "150px", top: "-9px", left: "27px", fontFamily: "Cinzel", fontWeight: 600 }}>
                {state.player.name}
            </p>
            <ProgressBar 
                variant="info"
                now={playerHealthPercentage}
                style={{ position: "absolute", top: "11px", left: "10px", width: "130px", height: "15px", backgroundColor: "red" }} 
            />
            <p style={{ 
                position: "absolute", 
                color: "#fdf6d8", 
                textShadow: "1px 1px 1px black", 
                top: "9px", 
                left: "8px",
                width: "130px", 
                fontSize: "12px", 
                textAlign: "center", 
                fontFamily: "Cinzel", 
                fontWeight: 700 
            }}>{`${Math.round(state.new_player_health)} / ${state.player_health} [${playerHealthPercentage}%]`}</p>
            <img src ={playerPortrait} alt="Player Portrait" style={{ position: "absolute", width: '40px', height: '40px', top: "-4px", left: "149px", borderRadius: "50%"  }} />
            <ProgressBar 
                variant="success"
                now={staminaPercentage}
                style={{ position: "absolute", top: "-1.5px", left: "151px", width: "35px", height: "35px", backgroundColor: "red", borderRadius: "50%", transform: "rotate(-90deg)" }} 
            />
            <p style={{ 
                position: "absolute", 
                color: "#fdf6d8", 
                textShadow: "1px 1px 1px black", 
                top: "6px", 
                left: "149px",
                width: "40px", 
                fontSize: "13px", 
                textAlign: "center", 
                fontFamily: "Cinzel", 
                fontWeight: 700 
            }}>{Math.round((staminaPercentage / 100) * state.player_attributes.stamina)}</p>
            <div style={{ position: "absolute", left: "185px", top: "0px", transform: "scale(0.75)" }}>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(state.weapons[0])}>
                <img src={state.weapons[0]?.imgURL} className="m-1 eqp-popover spec" alt={state.weapons[0]?.name} style={getItemStyle(state.weapons[0]?.rarity)} />
            </OverlayTrigger>
            </div>
            <div style={{ position: "absolute", left: "230px", top: "-10px" }}>
            { state.isStalwart ? (
                <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(state.player.shield)}>
                    <img src={state.player.shield.imgURL} className="m-1 eqp-popover spec" alt={state.player.shield.name} style={getItemRarityStyle(state.player.shield.rarity)} />
                </OverlayTrigger>
            ) : ( '' )}
            </div>
            {state.playerEffects.length > 0 ? (
                <div className='combat-effects' style={{ zIndex: 2 }}>
                    {state.playerEffects.map((effect: any, index: number) => {
                        return ( <StatusEffects state={state} dispatch={dispatch} ascean={state.player} effect={effect} player={true} story={true} pauseState={pauseState} handleCallback={handleCallback} key={index} /> )
                    })}
                </div>
            ) : ( '' ) } 
        </div> 
    );
};

export default CombatUI;