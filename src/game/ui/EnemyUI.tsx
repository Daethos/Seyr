import { useEffect, useState } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import enemyHealthBar from '../images/enemy-healthbar.png';
import AsceanImageCard from '../../components/AsceanImageCard/AsceanImageCard';
import AsceanAttributeCompiler from '../../components/AsceanAttributeCompiler/AsceanAttributeCompiler';
import Modal from 'react-bootstrap/Modal';
import PhaserEffects from './PhaserEffects';
import { useSelector } from 'react-redux';
import ItemPopover from './ItemPopover';
import { CombatData } from '../../components/GameCompiler/CombatStore';

interface EnemyUIProps {
    pauseState: boolean;  
};

const EnemyUI = ({ pauseState }: EnemyUIProps) => {
    const state = useSelector((state: any) => state.combat) as CombatData;
    const [playerEnemyPercentage, setEnemyHealthPercentage] = useState<number>(0); 
    const [playModalShow, setPlayModalShow] = useState<boolean>(false);
    useEffect(() => {
        updateEnemyHealthPercentage();
    }, [state.newComputerHealth]);

    const updateEnemyHealthPercentage = async () => {
        try {
            const newHealthPercentage = Math.round((state.newComputerHealth/state.computerHealth) * 100);
            setEnemyHealthPercentage(newHealthPercentage);
        } catch (err: any) {
            console.log(err.message, 'Error updating Health Percentage');
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
                        return ( <PhaserEffects state={state} effect={effect} enemy={true} pauseState={pauseState} key={index} /> )
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
                {`${Math.round(state.newComputerHealth)} / ${state.computerHealth} [${playerEnemyPercentage}%]`}
            </p>
            <div style={{ position: "absolute", left: "-40px", top: "-10px", transform: "scale(0.75)" }}>
                <ItemPopover item={state.computerWeapons[0]} prayer={state.computerBlessing} />
            </div>
        </div>
        </>
    );
};

export default EnemyUI;