import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import enemyHealthBar from '../images/enemy-healthbar.png';
import { CombatData } from '../../components/GameCompiler/CombatStore';
import { Equipment } from '../../components/GameCompiler/GameStore';
import StatusEffects, { StatusEffect } from '../../components/GameCompiler/StatusEffects';
import AsceanImageCard from '../../components/AsceanImageCard/AsceanImageCard';
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface EnemyUIProps {
    state: CombatData;
    dispatch: any;
    pauseState: boolean;  
    handleCallback: (state: CombatData, effect: StatusEffect, effectTimer: number) => Promise<void>;
};

const EnemyUI = ({ state, dispatch, pauseState, handleCallback }: EnemyUIProps) => {
    const [playerEnemyPercentage, setEnemyrHealthPercentage] = useState<number>(0); 
    const [playModalShow, setPlayModalShow] = useState<boolean>(false);
    useEffect(() => {
        updateEnemyHealthPercentage();
    }, [state.new_computer_health]);

    const updateEnemyHealthPercentage = async () => {
        try {
            const newHealthPercentage = Math.round((state.new_computer_health/state.computer_health) * 100);
            setEnemyrHealthPercentage(newHealthPercentage);
        } catch (err: any) {
            console.log(err.message, 'Error updating Health Percentage');
        };
    };

    const itemPopover = (item: Equipment) => {
        return (
            <Popover className="text-info" id="popover">
            <Popover.Header id="popover-header" className="" as="h2">{item?.name} <span id="popover-image"><img src={process.env.PUBLIC_URL + item?.imgURL} alt={item?.name} /></span></Popover.Header>
            <Popover.Body id="popover-body" className="">
                { item?.name === 'Empty Weapon Slot' || item?.name === 'Empty Shield Slot' || item?.name === 'Empty Amulet Slot' || item?.name === 'Empty Ring Slot' || item?.name === 'Empty Trinket Slot' ? ( '' ) : 
                    <>
                    { item?.type && item?.grip ? (
                        <>
                        {item?.type} [{item?.grip}] <br />
                        {item?.attack_type} [{item?.damage_type?.[0]}{item?.damage_type?.[1] ? ' / ' + item.damage_type[1] : '' }{item?.damage_type?.[2] ? ' / ' + item?.damage_type?.[2] : '' }] <br />
                        </>
                    ) : item?.type ? ( <>{item.type} <br /></> ) : ( '' ) }
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
                        <>Influence: {item?.influences?.[0]}<br /><br /></>
                    ) : ( '' ) }
                    <p style={{ color: getBorderStyle(item?.rarity) }}>
                    {item?.rarity}
                    </p>
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
            border: '0.15em solid ' + getShadowStyle(state.computerBlessing),
            background: 'black',
            boxShadow: '0 0 1.5em ' + getShadowStyle(state.computerBlessing),
            borderRadius: '50%',
        };
    };

    return (
        <>
        <Modal 
            show={playModalShow}
            onHide={() => setPlayModalShow(false)}
            centered
            aria-labelledby="contained-modal-title-vcenter"
            id="modal-delete"
            style={{ fontFamily: "Cinzel", top: "-25%", overflowY: "scroll", transform: "scale(0.75)" }}
        >
        <Modal.Header style={{ fontSize: "28px", color: "gold" }}>
           {state?.computer?.name}
           <span style={{ float: "right" }}>
            <img
            className='dialog-picture' 
            src={process.env.PUBLIC_URL + '/images/' + state?.computer?.origin + '-' + state?.computer?.sex + '.jpg'} 
            alt={state?.computer?.origin + state?.computer?.sex} 
            style={{ borderRadius: 50 + '%', border: '2px solid gold', boxShadow: '0 0 10px gold' }}
            /> 
            </span>
        </Modal.Header>
        <Modal.Body id="modal-delete" className="equipment-modal" style={{ color: "#fdf6d8" }}>
            <div className='creature-heading'>
                <h2 style={{ fontSize: "18px", color: "gold" }}>{state?.computer?.description}</h2>
            </div>
            Level: {state?.computer?.level}<br />
            Experience: {state?.computer?.experience} / {state?.computer?.level * 1000}<br />
            Mastery: {state?.computer?.mastery}<br />
            <AsceanAttributeCompiler ascean={state?.computer} />
            <AsceanImageCard 
                weapon_one={state?.computer?.weapon_one}
                weapon_two={state?.computer?.weapon_two}
                weapon_three={state?.computer?.weapon_three}
                shield={state?.computer?.shield}
                helmet={state?.computer?.helmet}
                chest={state?.computer?.chest}
                legs={state?.computer?.legs}
                amulet={state?.computer?.amulet}
                ring_one={state?.computer?.ring_one}
                ring_two={state?.computer?.ring_two}
                trinket={state?.computer?.trinket}
                key={state?.computer?._id} 
            /> 
        </Modal.Body>
        </Modal>
        <div style={{ position: "absolute", top: "15px", left: "765px", transform: "scale(1.25)" }} id={state.computerDamaged ? 'flicker' : ''}>
            {state.computerEffects.length > 0 ? (
                <div className='combat-effects'>
                    {state.computerEffects.map((effect: any, index: number) => {
                        return ( <StatusEffects state={state} dispatch={dispatch} ascean={state.computer} effect={effect} player={true} story={true} pauseState={pauseState} handleCallback={handleCallback} key={index} /> )
                    })}
                </div>
            ) : ( '' ) }
            <img src={enemyHealthBar} alt="Health Bar" style={{ position: "absolute", width: '150px', height: '40px' }} />
            <p onClick={() => setPlayModalShow(true)} style={{ position: "absolute", color: "gold", fontSize: "12px", width: "150px", top: "-9px", left: "0px", fontFamily: "Cinzel", textAlign: "center" }}>
                {state.computer.name}
            </p>
            <ProgressBar 
                variant="info"
                now={playerEnemyPercentage}
                style={{ position: "absolute", left: "10px", top: "11px", width: "130px", height: "15px", backgroundColor: "red" }} 
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
            }}>
                {`${Math.round(state.new_computer_health)} / ${state.computer_health} [${playerEnemyPercentage}%]`}
            </p>
            <div style={{ position: "absolute", left: "-40px", top: "-10px", transform: "scale(0.75)" }}>
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={itemPopover(state.computer_weapons[0])}>
                <img src={state.computer_weapons[0]?.imgURL} className="m-1 eqp-popover spec" alt={state.computer_weapons[0]?.name} style={getItemStyle(state.computer_weapons[0]?.rarity)} />
            </OverlayTrigger>
            </div>
        </div>
        </>
    );
};

export default EnemyUI;