import React, { useEffect, useState } from 'react';
import * as asceanAPI from '../../utils/asceanApi';
import { CombatData, ACTIONS } from './CombatStore';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { GameData, GAME_ACTIONS } from './GameStore';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Firewater {
    charges: number;
    maxCharges: number;
};

interface FirewaterProps {
    state: CombatData;
    dispatch: React.Dispatch<any>;
    gameDispatch: React.Dispatch<any>;
    gameState: GameData;
    story?: boolean;
};

const Firewater = ({ state, dispatch, gameDispatch, gameState, story }: FirewaterProps) => {
    const [showFirwawterModal, setShowFirewaterModal] = useState<boolean>(false);
    const [showBleed, setShowBleed] = useState<boolean>(true);
    const [firewater, setFirewater] = useState(state.player.firewater);
    const [drinking, setDrinking] = useState(false);

    useEffect(() => {
        setFirewater(gameState.player.firewater);
    }, [gameState.player.firewater]);
    
    useEffect(() => {
        if (gameState.loadedAscean) {
        setDrinking(false);
        setShowBleed(true);
        setShowFirewaterModal(false);
        gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: false });
        };
    }, [gameState.loadedAscean, drinking]);

    const drinkFirewater = async () => {
        if (firewater?.charges === 0) return;
        try {
            setDrinking(true);
            dispatch({ type: ACTIONS.PLAYER_REST, payload: 40 });
            const response = await asceanAPI.drinkFirewater(state.player._id);
            gameDispatch({ type: GAME_ACTIONS.SET_FIREWATER, payload: response.firewater });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err, "Error Drinking Firewater");
        };
    };

    const replenishFirewater = async () => {
        setShowBleed(false);
        try {
            const response = await asceanAPI.replenishFirewater(state.player._id);
            gameDispatch({ type: GAME_ACTIONS.SET_EXPERIENCE, payload: response });
            const cleanRes = await asceanAPI.getCleanAscean(state.player._id);
            dispatch({
                type: ACTIONS.SAVE_EXPERIENCE,
                payload: cleanRes.data
            });
            gameDispatch({ type: GAME_ACTIONS.LOADED_ASCEAN, payload: true });
        } catch (err: any) {
            console.log(err, "Error Replenishing Firewater");
        };
    };

    const getBorder = (firewater: number) => {
        switch (firewater) {
        case 0:
            return "3px solid red";
        default:
            return "3px solid gold";
        };
    };

    const modalStyle = {
        color: 'gold',
        fontWeight: 400,
        fontVariant: 'small-caps',
        fontSize: '18px',
        overflow: 'auto',
    };

    const firewaterStyle = {
        border: getBorder(firewater?.charges),
        boxShadow: "2px 2px 2px black",
        backgroundColor: "black",
        height: "60px",
        borderRadius: "3px"
    }; 

    const firewaterPopover = (
        <Popover id="popover">
            <Popover.Header id="popover" as="h3" style={{ color: "gold", fontWeight: 700 }}>Firewater ( {firewater?.charges} / {firewater?.maxCharges} ) <span id="popover-image"><img src={process.env.PUBLIC_URL +  '/images/firewater.png'} alt="Firewater" /></span></Popover.Header>
            <Popover.Body style={{ color: "#fdf6d8" }}>
                This is a bottle of Fyervas Firewater, associated with Fyer of Fire and Se'vas of War. This elixir strengthens the body and imbues you with a fiery spirit, making you{' '}
                more resilient and able to withstand combat and other challenges. This bottle has {firewater?.charges} charges left.
                <br /><br />
            { firewater?.charges === 0 ? (
                <Button variant='' onClick={() => setShowFirewaterModal(true)} style={{ color: "blue", fontSize: "20px", fontWeight: 700, textShadow: "1px 1px 1px black", float: "right" }}>
                    Inspect
                </Button>
            ) : (
                <Button variant='' onClick={drinkFirewater} style={{ color: "gold", fontSize: "20px", fontWeight: 700, textShadow: "1px 1px 1px black", float: "right" }}>
                    Take a Drink?
                </Button> 
            ) }
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <Modal show={showFirwawterModal} onHide={() => setShowFirewaterModal(false)} centered backdrop="static" style={{ top: story ? "-25%" : "", height: story ? "100%" : "", zIndex: 9999 }}>
                <Modal.Header style={{ fontSize: "20px", color: "orangered" }}>
                    <Modal.Title>Replenish Firewater</Modal.Title>
                </Modal.Header>
                <Modal.Body style={modalStyle}>
                    There is an Ancient method of replenishing Fyervas Firewater. Se'vas wants your blood spilled to receive his Grace. Fyer asks this over fire, and to ensure the prayer is heard, you must brew this overnight.
                    Or, you can wait until you find a city and purchase a more recent solution.
                    <br /><br />
                    <p style={{ color: '#fdf6d8', fontSize: "16px" }}>
                        Do you wish to set camp and let it bleed?
                    </p>
                    <br />
                    { firewater?.charges === 0 ? (
                    <>
                        { showBleed ? (
                            <Button variant='' style={{ float: "left", color: "red", fontSize: "24px" }} onClick={replenishFirewater}>Bleed</Button>
                        ) : ( '' ) }
                    </>
                    ) : ( '' ) }
                    <Button onClick={() => setShowFirewaterModal(false)} variant='' style={{ float: "right", color: "gold", fontSize: "24px" }}>Resist</Button>
                </Modal.Body>
            </Modal>
            <div className="story-firewater">
            <OverlayTrigger trigger="click" rootClose placement="auto-start" overlay={firewaterPopover}>
                <img src={process.env.PUBLIC_URL + '/images/firewater.png'} alt="Firewater" style={firewaterStyle} /> 
            </OverlayTrigger>
            </div>
        </>
    );
};

export default Firewater;