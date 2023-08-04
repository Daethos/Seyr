import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import InventoryBag from './InventoryBag';
import Form from 'react-bootstrap/Form';
import { GAME_ACTIONS } from './GameStore';
import * as settingsAPI from '../../utils/settingsApi';
import Loading from '../Loading/Loading';
import screenfull from 'screenfull';
import { CombatSettings, GeneralSettings, InventorySettings, TacticSettings } from './SettingConcerns';

interface Props {
    inventory: any;
    ascean: any;
    dispatch: any;
    currentTile: any;
    saveAsceanCoords: (x: number, y: number) => Promise<void>;
    gameDispatch: React.Dispatch<any>;
    gameState: any;
    mapState: any;
    multiplayer?: boolean;
};

const Settings = ({ ascean, dispatch, gameDispatch, inventory, currentTile, saveAsceanCoords, gameState, mapState, multiplayer }: Props) => {
    const [settingsModalShow, setSettingsModalShow] = useState<boolean>(false);
    const [showInventory, setShowInventory] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const settingsStyle = {
        color: 'orangered',
        fontWeight: 400,
        fontVariant: 'small-caps',
        fontSize: 25 + 'px',
        height: 65 + 'vh',
        overflow: 'auto',
    };

    const saveGameSettings = async () => {
        try {
            setLoading(true);
            const settings = {
                mapMode: gameState.mapMode,
                joystickSpeed: gameState.joystickSpeed,
                soundEffectVolume: gameState.soundEffectVolume,
                timeLeft: gameState.timeLeft,
                moveTimer: gameState.moveTimer,
                shake: gameState.shake,
                canvasPosition: gameState.canvasPosition,
                canvasHeight: gameState.canvasHeight,
                canvasWidth: gameState.canvasWidth,
                vibrationTime: gameState.vibrationTime,
            };
            await settingsAPI.updateSettings(settings);
            setLoading(false);
        } catch (err: any) {
            console.log(err, "Error Saving Map Settings")
        };
    };

    const toggleFullscreen = () => {
        setFullScreen((prev: boolean) => !prev);
        screenfull.toggle();
    };

    function handleCombatTimer(e: React.ChangeEvent<HTMLInputElement>) {
        let timer = parseFloat(e.target.value);
        gameDispatch({ type: GAME_ACTIONS.SET_TIME_LEFT, payload: timer });
    };

    function handleMoveTimer(e: React.ChangeEvent<HTMLInputElement>) {
        let timer = parseFloat(e.target.value);
        gameDispatch({ type: GAME_ACTIONS.SET_MOVE_TIMER, payload: timer });
    };

    function handleShakeDurationChange(e: React.ChangeEvent<HTMLInputElement>) {
        let duration = parseFloat(e.target.value);
        gameDispatch({ type: GAME_ACTIONS.SET_SHAKE_DURATION, payload: duration });
    };

    function handleShakeIntensityChange(e: React.ChangeEvent<HTMLInputElement>) {
        let intensity = parseFloat(e.target.value);
        gameDispatch({ type: GAME_ACTIONS.SET_SHAKE_INTENSITY, payload: intensity });
    };

    function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
        let volume = parseFloat(e.target.value);
        gameDispatch({ type: GAME_ACTIONS.SET_VOLUME, payload: volume });
    };

    function handleJoystickChange(e: React.ChangeEvent<HTMLInputElement>) {
        let speed = parseFloat(e.target.value);
        gameDispatch({ type: GAME_ACTIONS.SET_JOYSTICK_SPEED, payload: speed });
    };

    function handleVibrationChange(e: React.ChangeEvent<HTMLInputElement>) {
        let speed = parseFloat(e.target.value);
        gameDispatch({ type: GAME_ACTIONS.SET_VIBRATION_TIME, payload: speed });
    };

    function returnHome() {
        // Clear Potential Loot
        navigate('/');
    };

    return (
        <>
        <Modal show={settingsModalShow} onHide={() => setSettingsModalShow(false)} centered>
        <Modal.Header>
        <h3 style={{ fontSize: '24px' }}>Gameplay Settings</h3>
        { multiplayer ? ( '' ) : (
            <Button variant='' onClick={saveGameSettings}>
                <span style={{ float: "right", color: "gold", fontSize: "20px" }}>{loading ? <Loading Combat={true} /> : `Save`}</span>
            </Button>
        ) }
        </Modal.Header>
        <Modal.Body style={settingsStyle}>
        <p style={{ color: 'gold', fontSize: "20px" }}>
            [ X: {mapState?.currentTile?.x} Y: {mapState?.currentTile?.y} ]
            [ Content: {mapState?.currentTile?.content?.charAt(0).toUpperCase() + mapState?.currentTile?.content?.slice(1)} ]
        </p>
            { multiplayer ? ( '' ) : (
                    <Button variant='' className='mb-3' style={{ color: '#fdf6d8', fontSize: "20px" }} onClick={() => saveAsceanCoords(currentTile.x, currentTile.y)}>Save Map: {mapState.name}</Button>
            ) }
        <Button variant='outline' className='mb-3' style={{ color: '#fdf6d8', fontSize: '20px' }} onClick={() => setShowInventory(!showInventory)}>Inspect Inventory</Button><br />
        { showInventory ?
            <InventoryBag settings={true} gameDispatch={gameDispatch} inventory={ascean.inventory} ascean={ascean} dispatch={dispatch} gameState={gameState} mapState={mapState} />
        : ""}
        <Accordion flush >
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <h5 style={{ marginLeft: 'auto', color: 'gold' }}>
                Gameplay Controls
                </h5>
            </Accordion.Header>
            <Accordion.Body className='settings-accordion'>
        <Button variant='' className='mb-3' style={{ color: 'gold' }} onClick={toggleFullscreen}>Full Screen Enabler</Button>

        <h6 style={{ marginLeft: 'auto', color: 'gold' }}>
        <span style={{ float: "left" }}></span>
        Combat Timer: ({gameState.timeLeft})
        <span style={{ float: "right" }}></span>
        </h6>
        <Form.Range value={gameState.timeLeft} onChange={handleCombatTimer} min={2} max={12} step={1} /><br />
        { multiplayer ? ( '' ) : (
        <><h6 style={{ marginLeft: 'auto', color: 'gold' }}>
            <span style={{ float: "left" }}></span>
            Movement Timer: ({gameState.moveTimer})
            <span style={{ float: "right" }}></span>
        </h6>
        <Form.Range value={gameState.moveTimer} onChange={handleMoveTimer} min={2} max={12} step={1} /><br /></>
        ) }
        <h6 style={{ marginLeft: 'auto', color: 'gold' }}>
            <span style={{ float: "left" }}></span>
            Joystick Delay ({gameState.joystickSpeed})
            <span style={{ float: "right" }}></span>
        </h6>
        <Form.Range value={gameState.joystickSpeed} onChange={handleJoystickChange} min={0} max={500} step={50} /><br />
        <h6 style={{ marginLeft: 'auto', color: 'gold' }}>
            <span style={{ float: "left" }}></span>
            Screen Shake Duration ({gameState.shake.duration})
            <span style={{ float: "right" }}></span>
        </h6>
        <Form.Range value={gameState.shake.duration} onChange={handleShakeDurationChange} min={0} max={1000} step={50} /><br />
        <h6 style={{ marginLeft: 'auto', color: 'gold' }}>
            <span style={{ float: "left" }}></span>
            Screen Shake Intensity ({gameState.shake.intensity})
            <span style={{ float: "right" }}></span>
        </h6>
        <Form.Range value={gameState.shake.intensity} onChange={handleShakeIntensityChange} min={0} max={5} step={0.25} /><br />
        <h6 style={{ marginLeft: 'auto', color: 'gold' }}>
            <span style={{ float: "left" }}></span>
            Sound Volume ({gameState.soundEffectVolume})
            <span style={{ float: "right" }}></span>
        </h6>
        <Form.Range value={gameState.soundEffectVolume} onChange={handleVolumeChange} min={0} max={1} step={0.1} /><br />
        <h6 style={{ marginLeft: 'auto', color: 'gold' }}>
            <span style={{ float: "left" }}></span>
            Vibration Time ({gameState.vibrationTime})
            <span style={{ float: "right" }}></span>
        </h6>
        <Form.Range value={gameState.vibrationTime} onChange={handleVibrationChange} min={0} max={1000} step={50} />
                </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
        <Accordion.Header>
            <h5 style={{ marginLeft: 'auto', color: 'gold' }}>
            Map Legend
            </h5>
        </Accordion.Header>
        <Accordion.Body className='settings-accordion'>
        <p style={{ color: 'sienna', display: "inline-block" }}>
            Cave 
        </p>{' | '}
        <p style={{ color: 'purple', display: "inline-block" }}>
            City 
        </p>{' | '}
        <p style={{ color: 'brown', display: "inline-block" }}>
            Dungeon
        </p>{' | '}
        <p style={{ color: 'red', display: "inline-block" }}>
            Enemy
        </p>{' | '}
        <p style={{ color: 'green', display: "inline-block" }}>
            Envrionment 
        </p>{' | '}
        <p style={{ color: 'darkorange', display: "inline-block" }}>
            Hazard 
        </p>{' | '}
        <p style={{ color: 'blue', display: "inline-block" }}>
            NPC 
        </p>{' | '}
        <p style={{ color: 'pink', display: "inline-block" }}>
            Phenomena 
        </p>{' | '}
        <p style={{ color: 'grey', display: "inline-block" }}>
            Ruins 
        </p>{' | '}
        <p style={{ color: 'gold', display: "inline-block" }}>
            Treasure
        </p>{' | '}
        <p style={{ color: 'white', display: "inline-block" }}>
            Wonder 
        </p>
        </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
        <Accordion.Header>
            <h5 style={{ marginLeft: 'auto', color: 'gold' }}>
            Actions (Combat Choices)
            </h5>
        </Accordion.Header>
        <Accordion.Body className='settings-accordion'>
            <CombatSettings />
            <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
            <path d="M27.026 8.969c0.743-0.896 1.226-2.154 1.226-3.562 0-2.543-1.512-4.65-3.448-4.902-0.129-0.020-0.267 0-0.399 0-0.791 0-1.527 0.305-2.139 0.827l-21.218 1.536 19.521 1.414v0.744c-0.004 0.068-0.007 0.136-0.009 0.205l-19.512 1.413 19.515 1.413v0.949l-19.515 1.413 17.355 1.257v0.262c-0.127 0.324-0.237 0.667-0.333 1.023l-17.023 1.233 16.231 1.175v1.219l-16.231 1.175 16.26 1.177v1.42l-16.26 1.177 18.883 1.367v1.040l-18.883 1.367 19.358 1.402v0.971l-19.358 1.401 19.633 1.422 0.047 0.72h7.096l0.741-9.947h2.793c0-4.765-0.305-11.554-4.332-12.312zM21.202 8.102c0.001 0.002 0.002 0.005 0.004 0.007l-0.064-0.011 0.061 0.004z"></path>
            </svg>{" "}
            Dodge - A high priority action that is effectively 100% avoidance, provided you and your opponent are not performing the same move, which comes down to initiative. The attributes affecting dodge timers also dictate whose performs faster. Go figure?
            </p>
            <br />
            <p style={{ color: '#fdf6d8' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="20" height="20" viewBox="0 0 511.701 511.701">
            <path d="M505.813,445.48l-7.757-7.757c-7.1-7.1-18.21-7.714-26.078-1.937l-87.424-87.424    c6.656-10.982,11.349-23.074,13.773-35.849c1.493-7.851-0.606-15.804-5.751-21.82c-5.052-5.897-12.39-9.114-20.173-8.892    c-8.064,0.265-15.249,4.352-19.763,10.505l-36.446-36.446L478.881,93.164c0.845-0.845,1.502-1.852,1.929-2.961l30.319-78.592    c1.212-3.149,0.461-6.716-1.929-9.105c-2.389-2.389-5.973-3.149-9.105-1.929l-78.583,30.319c-1.118,0.427-2.125,1.092-2.97,1.929    L255.854,195.521L93.158,32.825c-0.845-0.836-1.852-1.502-2.961-1.929L11.605,0.577C8.464-0.643,4.889,0.116,2.5,2.506    c-2.389,2.389-3.14,5.956-1.929,9.105L30.89,90.203c0.427,1.109,1.084,2.116,1.929,2.961L195.515,255.86l-36.454,36.446    c-4.514-6.153-11.699-10.24-19.763-10.505c-7.842-0.239-15.121,2.995-20.164,8.892c-5.154,6.016-7.253,13.969-5.76,21.82    c2.415,12.749,7.108,24.815,13.79,35.831l-87.441,87.441c-7.868-5.768-18.97-5.163-26.078,1.937l-7.748,7.757    c-7.842,7.842-7.842,20.608,0,28.45l31.881,31.881c3.925,3.925,9.079,5.888,14.234,5.888c5.146,0,10.3-1.963,14.225-5.888    l7.748-7.748c7.108-7.108,7.706-18.21,1.946-26.078l87.236-87.236c11.588,7.177,24.465,12.169,38.127,14.677    c1.485,0.273,2.97,0.401,4.454,0.401c5.837,0,11.537-2.082,16.128-5.973c5.931-5.043,9.259-12.399,9.105-20.216    c-0.162-8.721-4.736-16.469-11.622-20.941l36.497-36.497l36.497,36.497c-6.895,4.471-11.469,12.228-11.631,20.983    c-0.145,7.774,3.174,15.13,9.105,20.173c4.599,3.891,10.3,5.973,16.137,5.973c1.476,0,2.97-0.128,4.454-0.401    c13.662-2.509,26.539-7.501,38.118-14.677l87.236,87.236c-2.526,3.43-3.942,7.518-3.942,11.853c0,5.376,2.091,10.428,5.888,14.225    l7.748,7.748c3.925,3.925,9.079,5.888,14.234,5.888c5.146,0,10.3-1.963,14.225-5.888l31.88-31.872    c3.797-3.806,5.897-8.858,5.897-14.234C511.701,454.329,509.601,449.268,505.813,445.48z M64.076,459.705L52.01,447.63    l84.949-84.958l6.272,6.272l0.077,0.085c0.017,0.017,0.043,0.034,0.06,0.051l5.666,5.666L64.076,459.705z M429.337,46.171    l58.94-22.733l-22.741,58.931L304.127,243.794l-12.075-12.075l149.12-149.112c3.328-3.336,3.328-8.738,0-12.066    c-3.337-3.337-8.738-3.337-12.066,0l-149.12,149.111l-12.066-12.066L429.337,46.171z M201.446,346.467    c-3.524-1.246-6.852-2.876-10.061-4.736c-1.161-0.691-2.313-1.391-3.43-2.159c-0.888-0.597-1.775-1.203-2.628-1.852    c-2.099-1.604-4.156-3.285-6.084-5.171c-1.792-1.818-3.388-3.763-4.907-5.76c-0.777-1.033-1.493-2.099-2.193-3.183    c-0.572-0.853-1.109-1.732-1.63-2.611c-0.888-1.536-1.749-3.089-2.483-4.702c-0.068-0.137-0.12-0.282-0.179-0.418    c-0.87-1.929-1.647-3.908-2.295-5.931l42.027-42.018l36.198,36.207L201.446,346.467z M70.536,82.608    c-3.337-3.336-3.337-8.738,0-12.066c3.328-3.337,8.73-3.337,12.066,0l230.63,230.63c3.337,3.336,3.337,8.738,0,12.066    c-1.664,1.673-3.849,2.5-6.033,2.5c-2.185,0-4.369-0.828-6.033-2.5L70.536,82.608z M381.559,309.33    c-3.388,17.86-11.964,34.176-24.917,47.309l-0.367,0.375c-13.175,13.141-30.549,22.246-48.947,25.626    c-3.063,0.572-5.367-0.887-6.451-1.801c-2.014-1.707-3.14-4.207-3.089-6.878c0.068-4.011,2.816-7.407,6.528-8.09    c1.886-0.341,3.703-0.973,5.555-1.468c0.068-0.017,0.128-0.009,0.196-0.026c0.12-0.034,0.222-0.085,0.341-0.119    c2.85-0.777,5.641-1.707,8.388-2.825c0.742-0.299,1.468-0.64,2.193-0.956c2.21-0.99,4.403-1.997,6.528-3.2    c1.638-0.905,3.2-1.963,4.779-2.995c1.289-0.853,2.603-1.621,3.857-2.56c2.901-2.15,5.7-4.489,8.346-7.083l0.085-0.085    c0.008-0.008,0.017-0.008,0.026-0.026c0.162-0.154,0.282-0.341,0.435-0.503c2.295-2.372,4.437-4.864,6.383-7.501    c1.51-2.014,2.773-4.156,4.053-6.289c0.452-0.751,0.964-1.451,1.382-2.219c1.493-2.697,2.739-5.495,3.883-8.346    c0.094-0.247,0.222-0.486,0.316-0.734c1.143-2.97,2.048-6.007,2.799-9.105c0.034-0.162,0.102-0.307,0.137-0.469    c0.017-0.043,0.009-0.094,0.017-0.145c0.29-1.237,0.725-2.415,0.947-3.669c0.657-3.746,4.019-6.562,7.996-6.69    c0.094-0.009,0.196-0.009,0.29-0.009c3.337,0,5.41,1.826,6.357,2.935C381.371,303.843,382.079,306.6,381.559,309.33z     M493.738,461.864l-31.881,31.881c-1.195,1.186-3.14,1.195-4.318,0l-7.757-7.748c-0.777-0.777-0.887-1.69-0.887-2.159    c0-0.469,0.111-1.382,0.896-2.159l3.866-3.874l24.141-24.132l3.874-3.883c0.597-0.589,1.382-0.888,2.159-0.888    c0.785,0,1.562,0.299,2.159,0.888l7.748,7.757c0.777,0.777,0.896,1.681,0.896,2.159    C494.634,460.174,494.515,461.087,493.738,461.864z"></path>
            </svg>{' '}
            Initiate - Solidifying your choice of action, this triggers the combat resolution for the respective round, and reset attacks for the next. 
            </p>
          <p style={{ color: 'gold', fontSize: 25 + 'px' }}>Good luck, and have fun!</p>
        </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
        <Accordion.Header><h5 style={{ marginLeft: 'auto', color: 'gold' }}>Tactics (Combat Settings)</h5></Accordion.Header>
        <Accordion.Body className='settings-accordion'>
            <TacticSettings />
        </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
        <Accordion.Header><h5 style={{ marginLeft: 'auto', color: 'gold' }}>Inventory Information</h5></Accordion.Header>
        <Accordion.Body className='settings-accordion'>
            <InventorySettings />
        </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
        <Accordion.Header><h5 style={{ marginLeft: 'auto', color: 'gold' }}>General Information</h5></Accordion.Header>
        <Accordion.Body className='settings-accordion'>
            <GeneralSettings />
        </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <br /><br /><br />
        <Button variant='' style={{ color: 'gold' }} onClick={returnHome}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
        </svg> Return Home</Button>

        </Modal.Body>
        </Modal>
        <Button variant='' className="settings-button" onClick={() => setSettingsModalShow(true)}>
        <h3 style={{ fontSize: 12 + 'px', textAlign: 'center' }} className='settings-style'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511 511" height="20" width="20" fill="currentColor" >
            <path d="m487.5,208h-21.792c-5.402-24.064-14.791-46.742-27.971-67.562l15.399-15.4c9.163-9.163 9.163-24.071 0-33.234l-33.941-33.941c-4.438-4.439-10.34-6.883-16.617-6.883s-12.179,2.445-16.617,6.883l-15.399,15.399c-20.82-13.18-43.498-22.569-67.562-27.971v-21.791c1.13687e-13-12.958-10.542-23.5-23.5-23.5h-48c-12.958,0-23.5,10.542-23.5,23.5v21.792c-24.064,5.402-46.742,14.791-67.562,27.971l-15.399-15.399c-4.438-4.439-10.34-6.884-16.617-6.884s-12.179,2.445-16.617,6.883l-33.941,33.942c-9.163,9.163-9.163,24.071 0,33.234l15.4,15.4c-13.18,20.82-22.569,43.498-27.971,67.561h-21.793c-12.958-2.84217e-14-23.5,10.542-23.5,23.5v48c0,12.958 10.542,23.5 23.5,23.5h21.793c5.402,24.064 14.791,46.741 27.971,67.561l-15.4,15.4c-4.438,4.438-6.883,10.34-6.883,16.617s2.445,12.178 6.883,16.617l33.941,33.941c4.438,4.438 10.34,6.883 16.617,6.883s12.179-2.445 16.617-6.883l15.4-15.4c20.82,13.18 43.497,22.568 67.562,27.971v21.793c0,12.958 10.542,23.5 23.5,23.5h48c12.958,0 23.5-10.542 23.5-23.5v-21.792c24.064-5.402 46.741-14.791 67.562-27.971l15.399,15.4c4.438,4.438 10.34,6.883 16.617,6.883s12.179-2.445 16.617-6.883l33.941-33.941c4.438-4.438 6.883-10.34 6.883-16.617s-2.445-12.179-6.883-16.617l-15.399-15.399c13.18-20.82 22.568-43.497 27.971-67.562h21.791c12.958,0 23.5-10.542 23.5-23.5v-48c0-12.959-10.542-23.501-23.5-23.501zm8.5,71.5c0,4.687-3.813,8.5-8.5,8.5h-27.883c-3.589,0-6.675,2.543-7.361,6.065-5.14,26.378-15.351,51.041-30.348,73.303-2.005,2.976-1.621,6.956 0.917,9.493l19.705,19.705c1.605,1.606 2.49,3.74 2.49,6.011 0,2.27-0.884,4.405-2.49,6.01l-33.941,33.941c-1.605,1.605-3.74,2.49-6.011,2.49s-4.405-0.884-6.01-2.49l-19.706-19.706c-2.537-2.538-6.518-2.923-9.493-0.917-22.264,14.998-46.927,25.208-73.304,30.348-3.523,0.686-6.065,3.772-6.065,7.361v27.886c0,4.687-3.813,8.5-8.5,8.5h-48c-4.687,0-8.5-3.813-8.5-8.5v-27.883c0-3.589-2.542-6.675-6.065-7.361-26.377-5.14-51.041-15.351-73.303-30.348-1.276-0.859-2.736-1.28-4.188-1.28-1.935,0-3.856,0.747-5.306,2.197l-19.706,19.706c-1.605,1.605-3.739,2.49-6.01,2.49s-4.405-0.884-6.011-2.49l-33.941-33.942c-1.605-1.605-2.49-3.74-2.49-6.01 0-2.271 0.884-4.405 2.49-6.011l19.706-19.706c2.538-2.538 2.922-6.517 0.917-9.493-14.998-22.263-25.208-46.926-30.348-73.303-0.687-3.523-3.772-6.065-7.361-6.065h-27.884c-4.687,0-8.5-3.813-8.5-8.5v-48c0-4.687 3.813-8.5 8.5-8.5h27.883c3.589,0 6.675-2.543 7.361-6.065 5.14-26.377 15.351-51.04 30.348-73.303 2.005-2.976 1.621-6.956-0.917-9.493l-19.705-19.708c-3.314-3.314-3.314-8.707 0-12.021l33.941-33.941c1.605-1.605 3.74-2.49 6.011-2.49s4.405,0.884 6.01,2.49l19.705,19.705c2.538,2.537 6.516,2.922 9.494,0.917 22.263-14.997 46.926-25.208 73.304-30.348 3.522-0.687 6.065-3.772 6.065-7.362v-27.882c0-4.687 3.813-8.5 8.5-8.5h48c4.687,0 8.5,3.813 8.5,8.5v27.883c0,3.589 2.543,6.675 6.065,7.362 26.377,5.14 51.04,15.35 73.304,30.348 2.977,2.005 6.957,1.621 9.494-0.917l19.706-19.705c1.605-1.605 3.739-2.49 6.01-2.49s4.405,0.884 6.011,2.49l33.941,33.941c3.314,3.314 3.314,8.707 0,12.021l-19.705,19.705c-2.538,2.537-2.922,6.517-0.917,9.493 14.998,22.264 25.208,46.927 30.348,73.304 0.686,3.523 3.772,6.065 7.361,6.065h27.882c4.687,0 8.5,3.813 8.5,8.5v48z"></path>
            <path d="m119,255.5c0-75.266 61.234-136.5 136.5-136.5 18.423,0 36.292,3.605 53.108,10.715 3.815,1.613 8.216-0.172 9.829-3.987 1.613-3.815-0.172-8.216-3.988-9.829-18.675-7.895-38.508-11.899-58.949-11.899-83.538,0-151.5,67.963-151.5,151.5 0,34.6 11.969,68.436 33.702,95.275 1.482,1.831 3.648,2.781 5.833,2.781 1.658,0 3.327-0.547 4.715-1.672 3.219-2.607 3.716-7.329 1.109-10.548-19.577-24.177-30.359-54.661-30.359-85.836z"></path>
            <path d="m385.298,192.614c-3.816,1.611-5.603,6.011-3.992,9.827 7.096,16.804 10.694,34.656 10.694,53.059 0,75.266-61.233,136.5-136.5,136.5-31.162,0-61.636-10.774-85.808-30.337-3.219-2.606-7.941-2.109-10.548,1.112-2.605,3.22-2.108,7.942 1.112,10.548 26.833,21.717 60.658,33.677 95.244,33.677 83.538,0 151.5-67.963 151.5-151.5 0-20.419-3.996-40.234-11.875-58.894-1.612-3.816-6.013-5.603-9.827-3.992z"></path>
            <path d="m341.292,149.324c7.479,6.052 14.341,12.914 20.394,20.396 1.482,1.832 3.649,2.783 5.835,2.783 1.657,0 3.324-0.546 4.712-1.669 3.221-2.605 3.719-7.328 1.114-10.548-6.713-8.299-14.324-15.91-22.621-22.623-3.219-2.605-7.942-2.107-10.548,1.113-2.605,3.22-2.106,7.943 1.114,10.548z"></path>
            <path d="M255.5,136C189.607,136,136,189.608,136,255.5S189.607,375,255.5,375S375,321.393,375,255.5S321.393,136,255.5,136z    M255.5,360C197.878,360,151,313.122,151,255.5S197.878,151,255.5,151S360,197.879,360,255.5S313.122,360,255.5,360z"></path>
            </svg>
        </h3>
        </Button>
        </>
    );
};

export default Settings;