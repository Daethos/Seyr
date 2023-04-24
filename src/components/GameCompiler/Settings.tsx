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
    }

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
                    <Button variant='' className='mb-3' style={{ color: '#fdf6d8', fontSize: "16px" }} onClick={() => saveAsceanCoords(currentTile.x, currentTile.y)}>Save Map: {mapState.name}</Button>
            ) }
        <Button variant='outline' className='mb-3' style={{ color: '#fdf6d8', fontSize: '16px' }} onClick={() => setShowInventory(!showInventory)}>Inspect Inventory</Button><br />
        { showInventory ?
            <InventoryBag settings={true} gameDispatch={gameDispatch} inventory={ascean.inventory} ascean={ascean} dispatch={dispatch} gameState={gameState} mapState={mapState} />
        : ""}
        <br />
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

        <Accordion flush >
        <Accordion.Item eventKey="5">
        <Accordion.Header>
            <h5 style={{ marginLeft: 30 + '%', color: 'gold' }}>
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
        <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
            <path d="M311.313 25.625l-23 10.656-29.532 123.032 60.814-111.968-8.28-21.72zM59.625 50.03c11.448 76.937 48.43 141.423 100.188 195.75 14.133-9.564 28.405-19.384 42.718-29.405-22.156-27.314-37.85-56.204-43.593-86.28-34.214-26.492-67.613-53.376-99.312-80.064zm390.47.032C419.178 76.1 386.64 102.33 353.31 128.22c-10.333 58.234-58.087 112.074-118.218 158.624-65.433 50.654-146.56 92.934-215.28 121.406l-.002 32.78c93.65-34.132 195.55-81.378 276.875-146.592C375.72 231.06 435.014 151.375 450.095 50.063zm-236.158 9.344l-8.5 27.813 40.688 73.06-6.875-85.31-25.313-15.564zm114.688 87.813C223.39 227.47 112.257 302.862 19.812 355.905V388c65.917-27.914 142.58-68.51 203.844-115.938 49.83-38.574 88.822-81.513 104.97-124.843zm-144.563 2.155c7.35 18.89 19.03 37.68 34 56.063 7.03-4.98 14.056-10.03 21.094-15.094-18.444-13.456-36.863-27.12-55.094-40.97zM352.656 269.72c-9.573 9.472-19.58 18.588-29.906 27.405 54.914 37.294 117.228 69.156 171.906 92.156V358.19c-43.86-24.988-92.103-55.13-142-88.47zm-44.906 39.81c-11.65 9.32-23.696 18.253-36.03 26.845C342.046 381.51 421.05 416.15 494.655 442.75v-33.22c-58.858-24.223-127.1-58.727-186.906-100zm-58.625 52.033l-46.188 78.25 7.813 23.593 27.75-11.344 10.625-90.5zm15.844.812L316.343 467l36.47 10.28-3.533-31.967-84.31-82.938z"></path>
            </svg>{' '}
            Combat - When you wish to attack, choose one of the actions which is recorded for confirmation in the Combat Reader Window, and hit initiate. You and your opponents actions are chosen anonymously and resolve simultaneously, from a set priority of actions coupled with initiative. Certain actions if successful may cancel out the opponents or otherwise.
        </p>
            <br />
            <br />
        <p style={{ color: '#fdf6d8' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
            <path d="M261.094 16.03l-18.688.032.063 33.282c-15.95.64-31.854 3.145-47.595 7.53l-10.22-33.28-17.874 5.468 10.345 33.594c-12.496 4.636-24.867 10.44-37.03 17.438l-19.126-30.5-15.814 9.906 19.063 30.47c-10.68 7.15-21.16 15.22-31.44 24.218L66.907 90.124l-12.75 13.688 24.875 23.124c-2.465 2.406-4.937 4.83-7.374 7.344l-6.28 6.5 6.28 6.5c54.467 56.233 116.508 85.097 178.906 85.095 62.4-.002 124.43-28.87 178.907-85.094l6.28-6.5-6.28-6.5c-2.38-2.455-4.782-4.835-7.19-7.186l25-23.28-12.717-13.69-26.032 24.22c-9.15-8.024-18.462-15.315-27.936-21.875l19.312-30.782-15.812-9.938-19.188 30.594c-12.823-7.665-25.888-14.007-39.094-19.03l10.313-33.533-17.875-5.468-10.156 33.063c-15.513-4.467-31.21-7.082-46.938-7.906l-.062-33.44zM250.53 70.25c39.147 0 70.69 31.51 70.69 70.656s-31.543 70.688-70.69 70.688c-39.145 0-70.655-31.542-70.655-70.688 0-39.145 31.51-70.656 70.656-70.656zm64.69 9.063c32.377 11.564 64.16 31.955 94.28 61.468-30.015 29.402-61.683 49.757-93.938 61.345 15.08-16.01 24.344-37.562 24.344-61.22 0-23.838-9.4-45.545-24.687-61.593zm-129.408.03c-15.27 16.045-24.656 37.74-24.656 61.563 0 23.64 9.25 45.18 24.313 61.188-32.218-11.596-63.837-31.944-93.814-61.313 30.092-29.474 61.823-49.863 94.156-61.436zm64.75 10.813c-27.99 0-50.687 22.696-50.687 50.688 0 27.99 22.696 50.656 50.688 50.656 27.99 0 50.687-22.667 50.687-50.656 0-27.992-22.696-50.688-50.688-50.688zm78.875 146.406c-25.884 9.117-52.37 13.72-78.875 13.72-16.853 0-33.69-1.897-50.375-5.595l59.594 51.125-93.686 2.5L419.53 492.188l-85.81-144.375 71.53-.718-75.813-110.53z"></path>
            </svg>{' '}
            Invoke - Your Mastery and Adherence or Devotion dictate what you can perform in an instant, a potentially damaging or life saving decision. As you grow, so too does your ability to sway chance.
        </p>
            <br />
            <br />
        <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
            <path d="M45.95 14.553c-19.38.81-30.594 11.357-30.282 30.283l19.768 30.78c4.43-1.213 9.36-3.838 14.248-7.335l42.474 59.935c-17.018 20.83-31.258 44.44-42.71 70.836l26.55 26.552c11.275-23.6 24.634-44.826 39.918-63.864l210.82 297.475 166.807 33.213L460.33 325.62 162.78 114.745c19.907-16.108 41.842-29.91 65.652-41.578l-26.553-26.55c-27.206 11.803-51.442 26.576-72.735 44.292L69.39 48.56c3.443-4.823 6.062-9.735 7.342-14.242l-30.78-19.765zm400.84 86.933v.008l.003-.008h-.002zm0 .008l-28.028 124.97-25.116-80.593-18.105 70.667-26.862-49.64-.584 57.818 128.484 91.69 15.184 87.017-1.168-186.885-34.457 39.713-9.346-154.756zm-300.95 27.98l222.224 196.368 25.645 66.75-66.75-25.645L130.6 144.734c4.91-5.278 9.995-10.36 15.238-15.26zm32.305 196.274v.004h.005l-.005-.004zm.005.004l28.028 22.775-36.21 4.088 57.82 19.272-105.706 4.09 115.05 27.45L136.1 422.114l127.316 25.696-67.164 43.803 208.494 1.752-87.017-15.185-104.54-150.676-35.037-1.752z"></path>
            </svg>{' '}
            Attack - A focused attack concentrating your offensive might into extraordinary potential, potentially unleashing dual wield techniques if you are of the ability. 
        </p>
            <br />
            <p style={{ color: '#fdf6d8' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 56.821 56.821">
            <path d="M33.824,25.852c-3.307-1.56-6.611-3.119-9.917-4.679c-0.055-0.042-0.108-0.084-0.166-0.123    c-0.682-0.451-1.402-0.623-2.1-0.579c-0.17-0.046-0.346-0.079-0.531-0.079H9.882c-1.128,0-2.042,0.914-2.042,2.042    c0,1.127,0.914,2.042,2.042,2.042h5.121L0.001,34.79l5.612,3c-1.632,1.777-3.294,3.529-4.974,5.264    c-1.866,1.928,0.766,5.221,2.654,3.27c2.071-2.141,4.122-4.301,6.13-6.5l6.438,3.438l0.707-3.569    c1.818,2.002,2.945,4.479,3.581,7.53c0.553,2.658,4.686,1.845,4.132-0.815c-0.997-4.789-3.116-8.732-6.738-11.572    c0.168-0.154,0.327-0.324,0.475-0.506c2.236-2.76,4.47-5.521,6.705-8.279c2.587,1.221,5.175,2.441,7.763,3.662    C34.871,30.835,36.178,26.962,33.824,25.852z"></path>
            <path d="M23.805,19.747c2.016,0.261,3.863-1.161,4.124-3.177l-7.3-0.946    C20.367,17.64,21.789,19.486,23.805,19.747z"></path>
            <path d="M38.471,27.234c-0.287-1.164-1.336-2.293-2.588-2.517v5.343c1.252,0.225,2.301-0.863,2.588-2.027    h18.35v-0.799H38.471z"></path>
            <path d="M17.922,9.397c0.065,0.161,0.12,0.309,0.246,0.434c0.125,0.125,0.293,0.169,0.474,0.174    c-0.121,0.357-0.135,0.722,0.15,0.976s0.613,0.185,0.911,0c0.07,0.324,0.18,0.635,0.369,0.882c0.055,0.07,0.116,0.128,0.179,0.177    c0.048,0.187,0.084,0.376,0.115,0.565c-0.427,0.161-0.756,0.54-0.819,1.022c-0.093,0.699,0.399,1.339,1.099,1.432l8.325,1.098    c0.697,0.092,6.194-2.808,2.588-4.033c-1.405-0.478-3.051-0.412-4.619-0.187c-0.28-0.265-0.655-0.43-1.07-0.43h-2.676    c-0.757,0-1.387,0.541-1.529,1.257c-0.1-0.013-0.193-0.032-0.271-0.062c-0.036-0.282-0.086-0.561-0.156-0.835    c0.01-0.011,0.018-0.021,0.027-0.035c0.259-0.377,0.167-0.973,0.061-1.38c-0.174-0.67-0.626-1.257-1.151-1.69    c-0.1-0.083-0.207-0.117-0.31-0.12c-0.261-0.195-0.507-0.412-0.806-0.546c-0.402-0.181-0.822-0.151-1.239-0.049    c-0.297,0.073-0.467,0.499-0.274,0.748C17.696,8.985,17.844,9.2,17.922,9.397z"></path>
            </svg>{' '}
            Counter - Your opponent, whether man or machine, will change its preference of attacks based on their own abilitiy and yours, in addition to your preference of actions. Successfully countering the specific action of the enemy rewards an attack thricefold in power.
            </p>
            <br />
            <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
            <path d="M48.906 19.656v10.782c0 103.173 10.53 206.07 41.313 289.53 30.78 83.463 82.763 148.094 164.53 170.563l2.188.626 2.25-.5c89.686-19.12 142.322-84.028 171.187-168.344 28.865-84.315 35.406-188.656 35.406-291.875v-10.78l-10.655 1.53C323.26 39.954 191.452 40 59.595 21.188l-10.69-1.53zM67.75 41.03c63.242 8.536 126.495 12.792 189.75 12.782v184.532h174.78c-4.905 27.572-11.31 53.747-19.592 77.937-27.348 79.884-73.757 137.33-155.157 155.564-.008-.003-.02.003-.03 0v-233.5H86.53c-12.87-60.99-18.277-128.81-18.78-197.313z"></path>
            </svg>{' '}
            Posture - This low priority attack focused on leaning into your stalwart, accepting the fate of a strike while using your shield's defense as an additional bulwark. 
            </p>
            <br />
            <p style={{ color: '#fdf6d8' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512 512">
            <path d="M454.609,111.204L280.557,6.804C272.992,2.268,264.503,0,255.999,0c-8.507,0-16.995,2.268-24.557,6.796   L57.391,111.204c-5.346,3.202-9.917,7.369-13.556,12.192l207.904,124.708c2.622,1.575,5.9,1.575,8.519,0L468.16,123.396   C464.524,118.573,459.951,114.406,454.609,111.204z M157.711,130.313c-10.96,7.611-28.456,7.422-39.081-0.452   c-10.618-7.859-10.342-20.413,0.618-28.031c10.964-7.626,28.46-7.422,39.081,0.438C168.95,110.134,168.674,122.68,157.711,130.313z    M274.159,131.021c-10.594,7.362-27.496,7.166-37.762-0.429c-10.263-7.596-9.992-19.727,0.599-27.089   c10.591-7.362,27.492-7.174,37.759,0.43C285.018,111.528,284.75,123.659,274.159,131.021z M391.908,132.702   c-10.964,7.618-28.461,7.414-39.085-0.444c-10.617-7.86-10.343-20.42,0.621-28.046c10.957-7.61,28.456-7.422,39.078,0.452   C403.147,112.523,402.868,125.076,391.908,132.702z"></path>
            <path d="M246.136,258.366L38.007,133.523c-2.46,5.802-3.798,12.117-3.798,18.62v208.084   c0,16.773,8.797,32.311,23.182,40.946l174.051,104.392c5.829,3.497,12.204,5.629,18.714,6.435V265.464   C250.156,262.556,248.63,259.858,246.136,258.366z M75.845,369.736c-12.056-6.57-21.829-21.671-21.829-33.727   c0-12.056,9.773-16.502,21.829-9.932c12.056,6.571,21.826,21.671,21.826,33.728C97.671,371.861,87.901,376.307,75.845,369.736z    M75.845,247.87c-12.056-6.579-21.829-21.679-21.829-33.728c0-12.056,9.773-16.502,21.829-9.931   c12.056,6.57,21.826,21.671,21.826,33.728C97.671,249.987,87.901,254.44,75.845,247.87z M197.715,436.158   c-12.052-6.57-21.826-21.671-21.826-33.728c0-12.048,9.773-16.494,21.826-9.924c12.056,6.571,21.826,21.671,21.826,33.72   C219.541,438.284,209.771,442.729,197.715,436.158z M197.715,314.292c-12.052-6.571-21.826-21.671-21.826-33.728   s9.773-16.502,21.826-9.931c12.056,6.57,21.826,21.671,21.826,33.727C219.541,316.417,209.771,320.862,197.715,314.292z"></path>
            <path d="M473.993,133.523l-208.13,124.843c-2.494,1.492-4.02,4.19-4.02,7.099V512   c6.511-0.806,12.886-2.938,18.714-6.435l174.052-104.392c14.38-8.635,23.182-24.173,23.182-40.946V152.142   C477.791,145.64,476.453,139.325,473.993,133.523z M370.478,355.11c-19.287,10.512-34.922,3.398-34.922-15.892   c0-19.282,15.635-43.447,34.922-53.951c19.293-10.519,34.925-3.406,34.925,15.884C405.403,320.434,389.771,344.598,370.478,355.11z   "></path>
            </svg>{" "}
            Roll - This gambles fate with the chance of your % based on which weapon you're attempting it with. It's risk/reward as your ability to do heightened damage and avoiding an attack is depending on your or their success. 
            </p>
            <br />
            <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
            <path d="M27.026 8.969c0.743-0.896 1.226-2.154 1.226-3.562 0-2.543-1.512-4.65-3.448-4.902-0.129-0.020-0.267 0-0.399 0-0.791 0-1.527 0.305-2.139 0.827l-21.218 1.536 19.521 1.414v0.744c-0.004 0.068-0.007 0.136-0.009 0.205l-19.512 1.413 19.515 1.413v0.949l-19.515 1.413 17.355 1.257v0.262c-0.127 0.324-0.237 0.667-0.333 1.023l-17.023 1.233 16.231 1.175v1.219l-16.231 1.175 16.26 1.177v1.42l-16.26 1.177 18.883 1.367v1.040l-18.883 1.367 19.358 1.402v0.971l-19.358 1.401 19.633 1.422 0.047 0.72h7.096l0.741-9.947h2.793c0-4.765-0.305-11.554-4.332-12.312zM21.202 8.102c0.001 0.002 0.002 0.005 0.004 0.007l-0.064-0.011 0.061 0.004z"></path>
            </svg>{" "}
            Dodge - A high priority attack that is effectively a 100% roll, provided you and your opponent are not performing the same move, which comes down to initiative. The attributes affecting dodge timers also dictate whose refreshes faster. Go figure?
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
            <br />
            <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
            <path d="M11.868 23.416l17.041-17.041 2.167-5.432-5.432 2.167-17.041 17.041zM3.036 19.562l0-0-0-0zM5.703 16.895l-2.667 2.667 3.73 3.73-5.878 5.878 1.932 1.932 5.878-5.878 3.733 3.733 2.667-2.667c-3.934-2.271-7.149-5.505-9.395-9.395zM9.052 12.062l3.774 3.496 2.361-2.361-1.97-1.825 1.943-1.799-13.913-8.336 9.746 9.028zM22.964 20.4l-3.947-3.657-2.361 2.361 2.297 2.128-1.81 1.676 13.913 8.336-9.9-9.171z"></path>
            </svg>{' '}
            Weapons - This dropdown allows you to toggle between your equipped weapons in order to choose the best option for the current situation. Overtime, the layering of your weapons can augment your combat effectiveness, such as dual wielding.
            </p>
            <br />
            <p style={{ color: '#fdf6d8' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
            <path d="M30.926 1.41c-0 0-0 0-0 0s0-0 0-0l-0.004 0.003c-2.822 2.407-5.452 4.555-7.189 5.954-1.15-0.854-2.508-1.444-3.983-1.681l-3.515-3.77 1.316 3.682c-0.077 0.006-0.154 0.013-0.231 0.021l-5.4-4.296 1.88 4.054-7.397-3.971 3.697 4.854-7.733-4.632 6.367 8.404-5.394-3.077 4.348 5.579-2.564-1.004 4.091 4.392c0.172 1.312 0.623 2.536 1.29 3.612l-0.446 0.396-1.753-1.977-3.627 3.217 2.009 2.266-3.049 2.704-0.663-0.263 0.15 0.718-2.258 2.003c-0.232 1.546 0.669 2.583 2.293 2.585l0.779-0.691 0.108 0.518 3.883-3.169-0.693-0.275 1.743-1.546 1.94 2.187 3.627-3.217-1.679-1.893 0.644-0.572c1.39 0.851 3.024 1.342 4.773 1.342 5.054 0 9.15-4.097 9.15-9.15 0-1.353-0.294-2.638-0.821-3.793l2.745-2.447c2.369-2.101 1.89-3.789 1.567-7.070z"></path>
            </svg>{' '}
            Damage Types - Depending on the main weapon you have equipped (in slot 1), it can offer a variety of ways to damage your enemies, from slashing, piercing, blunt, and more. Each weapon has a different damage type, and each type has a different effect on the enemy. For example, piercing weapons are great for cutting through lighter armors, while blunt weapons are great for crushing heavier armors.
            </p>
            <br />
            <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 512.004 512.004">
            <path d="M438.059,257.965c-9.593-9.593-15.469-22.324-16.548-35.849l-1.207-15.153c-3.218-40.387-20.768-78.408-49.416-107.057    L322.699,51.72c-3.253-3.253-8.528-3.253-11.78,0c-10.807,10.807-16.249,24.973-16.341,39.168l-82.001-82    c-11.852-11.852-31.135-11.852-42.988,0c-3.494,3.494-5.95,7.637-7.384,12.044l-0.486-0.486    c-11.851-11.852-31.135-11.852-42.988,0c-5.741,5.741-8.903,13.374-8.903,21.494c0,0.227,0.011,0.451,0.017,0.676    c-0.36-0.012-0.721-0.027-1.083-0.027c-8.12,0-15.752,3.162-21.493,8.903s-8.903,13.374-8.903,21.493s3.162,15.752,8.903,21.495    l5.168,5.168c-4.406,1.434-8.549,3.89-12.044,7.384c-11.851,11.852-11.851,31.136,0,42.988l12.422,12.422    c-4.485,1.464-8.596,3.966-12.028,7.398c-5.741,5.741-8.903,13.375-8.903,21.495c0,8.12,3.162,15.752,8.903,21.494L204.37,336.413    c12.493,12.494,29.05,20.385,46.622,22.22c2.059,0.215,4.098,0.549,6.114,0.973c-10.967,23.129-21.132,40.389-28.805,52.152    c-4.866,7.459-9.153,13.379-12.607,17.862c-6.595-20.898-18.235-61.26-20.997-93.742c-0.39-4.584-4.411-7.976-9.005-7.595    c-4.584,0.39-7.983,4.422-7.595,9.005c3.787,44.546,22.692,100.86,26.02,110.511v10.894h-7.775c-4.6,0-8.33,3.73-8.33,8.33    c0,4.6,3.73,8.33,8.33,8.33h7.775v28.322c0,4.6,3.73,8.33,8.33,8.33c4.6,0,8.33-3.73,8.33-8.33v-28.322h7.775    c4.6,0,8.33-3.73,8.33-8.33c0-4.6-3.73-8.33-8.33-8.33h-7.775v-9.024c7.084-7.903,28.397-33.915,52.105-84.394    c5.38,2.824,10.345,6.452,14.683,10.789l15.99,15.991c1.626,1.627,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.526,0-11.78l-15.99-15.991c-5.763-5.763-12.399-10.532-19.594-14.195c2.955-6.785,5.931-13.956,8.902-21.511    c11.445,2.421,22.06,8.124,30.374,16.44l15.99,15.991c1.626,1.627,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.526,0-11.78l-15.99-15.991c-9.997-9.998-22.602-17.039-36.244-20.397    c23.268-65.831,28.869-135.074,30.188-168.212l12.602,12.601c1.626,1.626,3.758,2.44,5.89,2.44c2.131,0,4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.528,0-11.78l-8.069-8.069c-0.002-0.002-0.003-0.003-0.006-0.006l-18.36-18.36    c-7.414-7.414-11.496-17.27-11.496-27.754c0-7.65,2.174-14.966,6.229-21.241l41.674,41.674c25.85,25.85,41.686,60.157,44.589,96.6    l1.207,15.153c1.392,17.469,8.983,33.915,21.375,46.305c1.626,1.627,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44    C441.312,266.493,441.312,261.218,438.059,257.965z M99.052,63.273c2.593-2.594,6.043-4.024,9.713-4.024    c3.67,0,7.119,1.429,9.714,4.024l5.351,5.351c-4.379,1.437-8.495,3.885-11.972,7.36c-3.451,3.451-5.962,7.588-7.422,12.101    l-5.386-5.386c-2.594-2.594-4.024-6.044-4.024-9.714S96.457,65.866,99.052,63.273z M92.176,138.239    c-5.357-5.357-5.357-14.071,0-19.428c5.356-5.356,14.07-5.356,19.428,0l0.001,0.001c0.242,0.242,0.499,0.461,0.761,0.666    l11.93,11.93c-4.406,1.434-8.549,3.89-12.044,7.384c-3.451,3.451-5.961,7.587-7.422,12.099L92.176,138.239z M277.885,309.999    c-11.404-2.433-21.98-8.128-30.27-16.418l-53.328-53.328c-3.252-3.253-8.526-3.253-11.78,0s-3.253,8.526,0,11.78l53.328,53.328    c9.947,9.948,22.475,16.964,36.036,20.343c-2.583,6.46-5.165,12.611-7.721,18.449c-3.741-0.974-7.556-1.689-11.426-2.094    c-13.785-1.439-26.773-7.63-36.574-17.431L92.568,201.045c-2.594-2.594-4.024-6.044-4.024-9.714s1.429-7.119,4.024-9.714    c2.593-2.594,6.043-4.024,9.713-4.024s7.119,1.429,9.714,4.024l0.002,0.002c0.241,0.242,0.498,0.46,0.76,0.665l48.094,48.094    c1.626,1.626,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44c3.253-3.253,3.253-8.528,0-11.78l-48.6-48.6    c-2.594-2.594-4.024-6.044-4.024-9.714c0-3.67,1.429-7.119,4.024-9.714c5.357-5.356,14.072-5.354,19.428,0    c0.001,0.001,0.002,0.002,0.003,0.003l68.29,68.29c1.626,1.627,3.758,2.44,5.89,2.44c2.131,0,4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.528,0-11.78l-99.892-99.893c-2.594-2.593-4.024-6.043-4.024-9.713c0-3.67,1.429-7.119,4.024-9.714    c5.356-5.356,14.071-5.357,19.428,0l93.362,93.362c1.626,1.626,3.758,2.44,5.89,2.44s4.264-0.813,5.89-2.44    c3.253-3.253,3.253-8.528,0-11.78L130.514,51.653c-2.594-2.594-4.024-6.044-4.024-9.714c0-3.67,1.429-7.119,4.024-9.714    c5.357-5.356,14.072-5.354,19.428,0l122.774,122.773c3.253,3.253,8.528,3.253,11.78,0c3.253-3.253,3.253-8.528,0-11.78    L181.372,40.096c-5.356-5.356-5.356-14.071,0-19.428c5.357-5.354,14.071-5.356,19.428,0l107.673,107.673    C308.311,146.144,306.02,232.138,277.885,309.999z"></path>
            </svg>{' '}
            Prayers - Based on your weapon of choice, in addition to various choices of your character, you may be able to invoke the power of the Ancients or Daethos themself. Prayers are powerful abilities that can be used in combat, to provide powerful blessings and curses, to heal yourself, or to damage your enemies. Myriad concerns weight the effectiveness of a prayer.
            </p>
        </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="8">
        <Accordion.Header><h5 style={{ marginLeft: 'auto', color: 'gold' }}>Inventory Information</h5></Accordion.Header>
        <Accordion.Body className='settings-accordion'>
            <p style={{ color: '#fdf6d8' }}>
            Loot - Equipment and its improvement is paramount to your success as you gain power to combat tougher enemies. No item is unique and can be held and worn in multiplicity. You can also use your gear to craft higher quality items. Common and Uncommon quality scale with leveling, yet Rare and Epic are refined to a degree that even a novice would feel its improvement.
            </p><br />
            <p style={{ color: 'gold' }}>
            Inventory - Here you are able to view item statistics, and inspect for use in various ways. If you are of the mind, you may even be able to find a way to tinker with them.
            </p><br />
            <p style={{ color: '#fdf6d8' }}>
            Remove - This will remove the item from your inventory, and permanently destroy it.
            </p>
            <br />
            <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512">
            <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
            </svg>{' '}- The inventory itself can be changed with dragging and dropping your items to realign them as you see fit. This allows you to save the position of your inventory.
            </p>
            <br />
        </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="9">
        <Accordion.Header><h5 style={{ marginLeft: 'auto', color: 'gold' }}>General Information</h5></Accordion.Header>
        <Accordion.Body className='settings-accordion'>
            <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" width="28" height="28" viewBox="0 0 1000 1000">
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M4251.8,4993.3c-85-27-174.1-78.8-217.6-126.4c-82.9-93.3-201-165.8-273.6-165.8c-82.9,0-161.7,72.5-182.4,165.8c-29,134.7-107.8,107.8-167.9-56c-66.3-190.7-10.4-366.8,151.3-476.7c184.4-120.2,304.7-109.8,538.9,47.7c76.7,53.9,209.3,132.6,294.3,178.2c130.6,70.5,174.1,85,279.8,85c70.5,0,147.1-10.4,174.1-24.9c41.5-22.8,45.6-20.7,45.6,26.9c0,130.6-126.4,277.7-286,331.6C4508.8,5014,4340.9,5020.2,4251.8,4993.3z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3014.5,4576.7c-85-35.2-116.1-109.8-99.5-246.6c14.5-120.2,12.4-124.4-37.3-136.8c-26.9-8.3-97.4-4.2-155.4,6.2l-105.7,18.7l33.2-64.3c18.6-35.2,82.9-116.1,145.1-180.3c223.8-234.2,588.6-323.3,922.3-221.8c116.1,33.1,277.7,184.5,292.2,269.4c8.3,37.3,18.7,89.1,26.9,114l12.4,47.7l-97.4-43.5c-126.4-56-310.9-72.5-414.5-39.4c-153.4,51.8-342,273.6-342,404.1c0,37.3-14.5,58-53.9,72.5C3078.8,4601.6,3074.6,4601.6,3014.5,4576.7z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M4513,4506.3c-124.4-45.6-223.8-138.9-292.2-271.5c-56-109.8-62.2-140.9-62.2-319.2c0-225.9,31.1-310.9,136.8-364.8c33.2-18.6,93.3-82.9,132.6-145.1c93.3-143,172-172,375.1-138.9c147.2,24.9,188.6,51.8,277.7,180.3c111.9,161.7,159.6,474.6,103.6,677.7c-33.1,120.2-147.1,269.4-252.8,333.7C4815.5,4531.1,4635.2,4551.8,4513,4506.3z M5068.4,4149.8c49.7-103.6,62.2-308.8,29-420.7c-43.5-143-68.4-145.1-257-37.3c-161.7,93.3-344,159.6-437.3,159.6c-41.5,0-47.7,10.4-47.7,89.1v89.1l161.7,24.9c107.8,16.6,203.1,47.7,294.3,95.3C4987.6,4243,5022.8,4243,5068.4,4149.8z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M4253.9,3196.4c-47.7-68.4-49.7-76.7-18.7-128.5c39.4-68.4,252.8-215.5,371-252.9c82.9-29,91.2-26.9,217.6,39.4c147.1,76.7,298.4,211.4,298.4,265.3c0,20.7-18.7,60.1-41.5,89.1l-39.4,51.8l-47.7-45.6c-157.5-149.2-480.8-147.1-638.3,4.2l-51.8,49.7L4253.9,3196.4z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3858,3026.5c-97.4-29-178.2-53.9-180.3-53.9c-6.2-4.2,217.6-1900.5,223.8-1906.7c6.2-4.2,594.8-244.6,675.6-275.7c22.8-8.3,26.9,170,24.9,918.1v930.5l-167.9,80.8c-180.3,85-337.8,223.8-360.6,310.9c-6.2,29-18.7,53.9-26.9,51.8C4040.4,3080.4,3955.5,3055.5,3858,3026.5z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5230,2983c-58-93.3-252.8-246.6-402.1-315l-58-24.9v-930.6c0-509.8,6.2-928.5,16.6-926.4c8.3,0,159.6,64.2,335.8,138.8c269.4,118.1,321.2,147.1,317.1,180.3c-41.5,352.3-60.1,1268.4-33.1,1550.2l12.4,143l118.1-14.5c111.9-12.4,120.2-10.4,130.6,35.2c18.7,66.3,18.7,161.7-2.1,161.7c-8.3,0-95.3,22.8-194.8,49.7l-178.2,49.7L5230,2983z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3447.7,2518.7l-109.8-240.4l53.9-232.1c29-126.4,51.8-234.2,51.8-238.3c0-4.1,56-35.2,126.4-70.5l124.4-64.3l-10.4,68.4c-6.2,37.3-35.2,273.6-66.3,524.3c-29,250.8-53.9,464.2-58,474.6C3557.5,2750.8,3507.8,2651.4,3447.7,2518.7z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M6705.7,2688.7c-18.7-31.1-234.2-134.7-360.6-174.1c-68.4-20.7-221.8-41.5-383.4-49.7l-269.4-12.4l6.2-362.7C5729.5,361.2,6108.8-915.4,6685-1218c109.8-56,116.1-58,182.4-24.9c335.8,161.7,625.9,713,771,1467.3c95.3,493.3,120.2,791.7,130.6,1556.5l10.4,719.2l-213.5-10.4c-273.6-12.4-470.5,26.9-688.1,136.8C6790.6,2670,6711.9,2699,6705.7,2688.7z M6937.8,2180.9c82.9-26.9,199-53.9,259.1-60.1c62.2-6.2,134.7-16.6,161.7-22.8l49.7-10.4l-14.5-418.6C7362.7,757.1,7257,98,7072.5-364.1c-74.6-186.5-240.4-447.7-281.9-447.7c-47.7,0-217.6,259.1-304.7,460.1C6280.8,125,6148.2,817.2,6096.3,1693.9c-22.8,391.7-22.8,395.8,85,395.8c76.7,0,354.4,74.6,458,122.3c49.7,20.7,103.6,35.2,120.2,29S6857,2207.8,6937.8,2180.9z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3165.8,1894.9c-64.2-147.1-66.3-149.2-8.3-325.4l43.5-138.9l172-45.6c93.3-24.9,180.3-39.4,190.7-33.2c31.1,18.7,76.7,163.7,53.9,172c-10.4,4.1-82.9,41.4-163.7,85l-145.1,76.7l-33.2,134.7C3225.9,2027.5,3225.9,2027.5,3165.8,1894.9z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M2755.5,1111.5c-319.2-526.4-294.3-495.3-333.7-416.6c-39.4,72.5-82.9,95.3-116.1,62.2c-31.1-31.1-29-49.8,20.7-172l45.6-107.8l-68.4-109.9c-138.9-225.9-39.4-416.6,199-383.4c80.8,10.4,89.1,6.2,111.9-51.8c14.5-33.2,22.8-64.3,18.7-66.3c-4.1-4.1-99.5-47.7-209.3-97.4c-169.9-74.6-203.1-97.4-203.1-134.7c0-26.9,14.5-58,31.1-72.5c26.9-22.8,62.2-12.4,201,49.7c93.3,41.5,176.2,68.4,184.4,60.1c8.3-8.3,385.5-851.8,837.3-1871.5c451.8-1019.7,845.6-1894.3,872.5-1941.9c72.5-126.4,298.4-420.7,321.2-420.7c31.1,0,20.7,124.3-31.1,352.3c-43.5,190.7-157.5,464.3-880.8,2093.2c-456,1032.1-831.1,1888.1-835.2,1904.6c-4.1,18.6,58,56,170,107.8c147.1,64.2,178.2,87,182.4,130.6c12.4,101.5-51.8,101.5-275.6,0c-114-49.7-215.5-89.1-228-82.9c-12.4,4.2-37.3,45.6-56,91.2l-31.1,82.9L3085,647.2c456,603.1,439.4,534.7,153.4,603.1c-143,35.2-153.4,41.4-180.3,111.9c-16.6,41.4-37.3,91.2-45.6,111.9C3002.1,1501.1,2939.9,1414.1,2755.5,1111.5z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3810.4,879.4c-6.2-14.5-101.6-149.2-211.4-298.4c-228-308.8-225.9-298.5-47.7-433.2C3713,25.5,3789.7-7.7,3940.9-18c74.6-4.1,209.3-29,300.5-51.8c230-62.2,574.1-62.2,824.8,0c101.6,24.9,221.8,45.6,269.4,45.6c89.1,0,211.4,29,261.2,60.1c22.8,14.5,20.7,47.7-14.5,201c-24.9,101.5-60.1,288.1-78.8,412.4c-20.7,126.4-37.3,230-39.4,234.2c-6.2,6.2-654.9-263.2-669.4-275.6c-4.2-4.2,26.9-22.8,68.4-43.5c43.5-18.7,105.7-74.6,138.9-120.2c78.7-105.7,147.1-263.2,126.4-283.9c-8.3-8.3-95.3-31.1-192.7-51.8c-263.2-51.8-725.4-12.4-725.4,62.2c0,82.9,215.5,346.1,339.9,416.6c29,16.6-35.2,49.7-333.7,172c-203.1,82.9-375.1,149.2-381.3,149.2C3827,908.4,3816.6,895.9,3810.4,879.4z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3495.4-154.8c-89.1-540.9-114-708.8-103.6-739.9c10.4-33.2,33.2-39.4,155.4-37.3c178.2,2.1,290.2-49.7,420.7-188.6l93.3-99.5l157.5,416.6c87,232.1,157.5,429,157.5,441.4c0,47.7-217.6,116.1-416.6,130.6c-161.7,12.4-223.8,26.9-327.5,78.7l-124.4,62.2L3495.4-154.8z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5578.2-194.2c-76.7-26.9-161.7-41.4-259.1-41.4c-118.1,2.1-176.2-10.4-304.7-64.2c-89.1-37.3-161.7-76.7-161.7-87.1c0-18.6,184.5-493.3,302.6-775.1l29-70.5l82.9,95.3c47.7,51.8,134.7,120.2,196.9,151.3c97.4,47.7,132.6,53.9,259.1,45.6c78.8-4.1,145.1-2.1,145.1,4.2c0,16.6-122.3,686-134.7,742C5721.2-140.3,5723.3-140.3,5578.2-194.2z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3514-1097.8c-16.6-10.4,24.9-126.4,134.7-371c87.1-194.8,161.7-360.6,170-366.8c6.2-6.2,45.6,85,89.1,203.1l78.8,215.5l-64.2,93.3c-82.9,120.2-172,194.8-267.4,221.8C3563.7-1077.1,3545.1-1077.1,3514-1097.8z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5520.2-1137.2c-68.4-33.2-182.4-157.5-230-250.8c-26.9-49.8,2.1-145.1,126.4-439.4l41.5-93.3l29,72.5c43.5,103.6,128.5,184.5,217.6,207.3c74.6,20.7,124.3,12.4,275.7-51.8c31.1-14.5,35.2-8.3,26.9,22.8c-6.2,20.7-26.9,124.4-45.6,225.9c-53.9,308.8-49.7,296.4-118.1,319.2C5750.2-1091.6,5599-1097.8,5520.2-1137.2z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3124.4-2339.3c-6.2-20.7-91.2-451.8-188.6-957.5l-178.2-918.1l-163.7-184.4c-176.2-194.8-199-252.9-132.6-346.1c53.9-78.8,130.6-58,385.5,101.5c128.5,80.8,244.6,159.6,259.1,172c20.7,20.7,441.4,1566.8,447.7,1651.8c0,18.6-33.1,114-78.8,211.4c-60.1,134.7-89.1,180.3-118.1,180.3c-49.7,0-116.1,33.2-176.2,87.1C3138.9-2301.9,3136.8-2301.9,3124.4-2339.3z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M6098.4-2343.4c-53.9-99.5-275.6-138.9-429-74.6c-74.6,31.1-74.6,31.1-62.2-18.6c39.4-157.5,555.4-1956.5,569.9-1991.7c10.4-22.8,140.9-116.1,290.2-205.2c246.6-147.1,277.7-161.7,323.3-140.9c66.3,31.1,103.6,109.8,85,182.4c-8.3,31.1-87,130.6-172,219.7l-157.5,161.7L6343-3265.7c-111.9,520.2-207.2,951.3-213.5,955.4C6125.4-2304,6110.9-2320.6,6098.4-2343.4z"></path>
            </svg>{' '}
            Character - Your character is completely accessible with realized potential of your character's ability, equipment, and faith. You are able to manipulate which weapon(s) you wish to strike with, and how you want to if the weapon allows the concept.
            </p>
            <br />
            <p style={{ color: '#fdf6d8' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 512 512">
            <path d="M29.438 59.375c-3.948.032-7.903.093-11.875.188 4.333 2.772 8.685 5.483 13.062 8.124C126.162 123.92 230.69 151.4 340.5 180.594c.022.006.04.025.063.03.02.006.043-.004.062 0 1.87.498 3.72 1.003 5.594 1.5l.155-.53c.947.078 1.91.125 2.875.125 4.26 0 8.34-.767 12.125-2.19l-12.5 46.595 18.063 4.813L383 170.968c25.828 1.312 50.508 6.867 74.28 15.845-1.065 11.948 2.73 21.82 9.814 23.718 8.71 2.335 19.136-8.313 23.28-23.78 1.27-4.742 1.78-9.366 1.657-13.594l.345-1.28c-.136-.008-.27-.025-.406-.032-.56-8.924-4.116-15.77-9.876-17.313-6.808-1.823-14.666 4.304-19.75 14.44-25.275-3.725-49.624-10.894-72.47-23.69l16.345-60.968-18.033-4.843-12.093 45.155c-3.24-3.908-7.318-7.1-11.938-9.313l.094-.374C250.12 83.98 144.89 58.446 29.437 59.374zm161.25 44.25c55.52-.002 105.272 12.492 159.656 27.03 8.536.55 15.094 7.463 15.094 16.157 0 9.06-7.127 16.22-16.188 16.22-2.4 0-4.653-.5-6.688-1.407-56.172-15.04-109.352-27.786-157.406-57.97 1.85-.027 3.694-.03 5.53-.03zm-46.22 164.25v20.344H55.532c15.996 38.806 51.258 65.428 88.94 74.28v32.97h58.56c-12.115 30.534-33.527 55.682-58.5 77.592h-25.436v18.72h284.344v-18.72H376c-28.728-21.894-50.024-47.016-61.594-77.593h63.656V366.31c19.75-6.995 39.5-19.54 59.25-36.718-19.806-17.518-39.235-27.25-59.25-31.938v-29.78H144.47z"></path>
            </svg>{' '}
            Gear - Your gear and its improvement is paramount to your success as you gain power and fight tougher enemies. No item is unique and can be held and worn in multiplicity. You can also use your gear to craft higher quality items. Common and Uncommon quality scale with leveling, yet Rare and Epic are refined to a degree that even a novice would feel its improvement.
            </p>
            <br />
            <p style={{ color: 'gold' }}>
            <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="currentColor" viewBox="0 0 1000 1000">
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M6619.3,4995c-12.4-8.2-37.1-65.9-53.5-127.7c-16.5-61.8-37.1-111.2-47.4-109.1c-420.1,80.3-747.5,90.6-883.4,28.8c-109.1-49.4-142.1-90.6-185.3-236.8c-74.1-238.9-271.8-471.5-492.1-578.6c-300.6-144.1-617.7-156.5-1165.5-43.2c-436.5,90.6-803.1,127.7-978.1,98.8l-123.5-20.6l164.7-2.1c255.3-6.2,455.1-49.4,776.3-173c325.3-125.6,570.4-199.7,661-199.7c115.3,0,30.9-37.1-115.3-51.5c-187.4-18.5-374.8,10.3-716.6,105c-152.4,41.2-345.9,78.2-463.3,88.5c-205.9,18.5-267.7,14.4-160.6-8.2c187.4-41.2,442.7-123.5,615.7-197.7c304.7-129.7,527.1-168.8,947.2-168.8c796.9,2,1079,173,1120.2,683.6c8.2,96.8,26.8,197.7,39.1,220.3c59.7,113.3,317.1,117.4,628,12.4c100.9-32.9,185.3-65.9,189.4-70c8.2-8.2-947.2-3183.4-961.6-3197.8c-4.1-6.2-133.8,41.2-288.3,105c-220.3,90.6-284.2,125.6-302.7,166.8c-14.4,28.8-20.6,53.5-18.5,55.6c4.1,2.1,45.3,22.7,94.7,43.2c177.1,76.2,313,275.9,313,455.1c0,55.6-4.1,57.7-298.6,103c-123.6,18.5-232.7,41.2-243,47.4c-8.2,8.2,59.7,70,150.3,135.9c90.6,67.9,162.7,131.8,158.6,144.1c-2.1,10.3-68,51.5-144.1,90.6c-121.5,61.8-160.6,70-288.3,70c-551.9,0-766-566.3-352.1-930.7c53.5-47.4,105-84.4,115.3-84.4c28.8,0-2.1-133.8-111.2-471.5c-80.3-247.1-100.9-333.6-90.6-395.4c14.4-86.5,12.4-88.5-164.7-111.2l-103-12.4l26.8-220.3c74.1-591,348-1142.8,722.7-1455.8c193.6-162.7,500.4-310.9,745.4-360.4c313-63.8,337.7-61.8,492.1,76.2c107.1,96.8,127.7,107.1,115.3,65.9c-26.8-92.7-152.4-348-224.5-457.1c-88.5-133.8-257.4-306.8-282.1-290.3c-10.3,6.2-18.5,51.5-18.5,100.9c0,100.9-74.1,360.4-103,360.4c-10.3,0-24.7-35-30.9-78.2c-22.7-131.8-32.9-152.4-131.8-257.4c-84.4-92.7-313-261.5-354.2-261.5c-16.5,0-18.5,12.4-59.7,253.3c-14.4,76.2-30.9,138-39.1,138s-30.9-30.9-49.4-70c-18.5-39.1-80.3-109.1-140-156.5c-121.5-94.7-385-257.4-399.5-243c-4.1,4.1,14.4,67.9,45.3,140c123.5,306.8,111.2,539.5-37.1,784.5c-142.1,236.8-173,426.2-113.3,683.6l26.8,117.4l-94.7-53.5c-665.1-385-838.1-976-516.8-1770.8c24.7-59.7,16.5-80.3-234.7-539.5c-142.1-263.6-259.5-483.9-259.5-490.1s131.8-230.6,290.3-496.3l290.3-483.9l-12.4-142.1l-14.4-142.1h288.3c160.6,0,290.3,6.2,290.3,12.3c0,6.2-39.1,78.3-86.5,158.6c-78.2,133.8-490.1,1011-490.1,1044c0,6.2,49.4,28.8,111.2,47.4c269.7,86.5,553.9,337.7,827.8,733.1c4.1,4.1,278,74.1,609.5,156.5c640.4,160.6,984.3,267.7,1334.3,416c333.6,142.1,683.6,341.8,825.7,473.6l53.6,49.4l407.7-84.4c224.5-45.3,413.9-86.5,418-90.6c4.1-6.2-47.4-90.6-115.3-191.5l-123.5-185.3l216.2-96.8c117.4-53.5,218.3-94.7,222.4-90.6c8.2,8.3,195.6,704.2,189.4,708.3c-2.1,2.1-189.4,113.3-415.9,245c-226.5,133.8-420.1,249.2-430.4,257.4c-8.2,10.3,12.4,59.7,49.4,113.3c90.6,131.8,195.6,368.6,224.5,500.4c39.1,185.3,14.4,654.8-37.1,710.4c-8.2,8.2-82.4-12.4-162.7-47.4c-284.2-121.5-467.4-152.4-873.1-154.4c-199.7,0-368.6,4.1-374.8,10.3c-4.1,6.2-16.5,59.7-24.7,121.5c-14.4,107.1-12.4,109.1,30.9,94.7c76.2-22.6,599.2-16.5,743.3,8.2c263.6,47.4,597.1,179.2,597.1,236.8c0,96.8-47.4,156.5-179.1,222.4c-255.3,125.6-434.5,358.3-444.8,574.5c-4.1,80.3,4.1,111.2,30.9,129.7c61.8,39.1,107.1-8.2,121.5-127.7c28.8-232.7,212.1-399.5,586.9-537.4c164.7-59.7,269.8-148.3,296.5-247.1c28.8-113.3,103-140,253.3-96.8c267.7,78.3,288.3,222.4,92.7,654.8c-78.2,175-80.3,185.3-59.7,298.6c47.4,255.3,18.5,383-154.4,658.9l-96.8,156.5l61.8,210l61.8,212.1l-140,22.7c-203.9,32.9-591,28.8-766-10.3c-457.1-100.9-842.2-440.6-1039.9-920.4c-78.2-183.3-162.7-471.5-181.2-611.6c-8.2-55.6-20.6-103-28.8-103s-47.4,59.7-84.4,133.8c-43.3,80.3-80.3,129.7-94.7,123.5c-14.4-4.1-26.8,4.1-26.8,18.5c0,16.5,55.6,308.9,121.5,652.8c67.9,343.9,222.4,1130.5,341.8,1748.2c119.4,617.7,230.6,1190.2,247.1,1274.6c22.6,113.3,24.7,158.6,8.3,179.2C6687.3,5015.6,6656.4,5017.6,6619.3,4995z M8180.1,1471.8c70-72.1,76.2-140,16.5-216.2c-86.5-109.1-286.2-43.2-286.2,94.7C7910.4,1517.1,8064.8,1585.1,8180.1,1471.8z M5929.5,436.1c205.9-630.1,100.9-1202.5-290.3-1579.3l-94.7-92.7l-158.6,35C4875.2-1089.7,4473.7-669.7,4309-74.6c-61.8,220.3-63.8,216.2,90.6,253.3c243,59.7,469.5,203.9,568.3,362.4c28.8,47.4,30.9,47.4,111.2,12.4c129.7-57.7,415.9-51.5,597.1,14.4c80.3,28.8,154.4,53.5,166.8,55.6C5855.4,623.5,5894.5,539,5929.5,436.1z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M3596.5,2511.7c-127.7-57.7-263.6-208-306.8-335.6c-20.6-59.7-32.9-166.8-32.9-288.3c0-339.8-59.7-385-374.8-280c-59.7,18.5-45.3-94.7,22.7-205.9c88.6-135.9,205.9-210,339.8-208c203.9,4.1,366.5,117.4,420.1,296.5c12.4,39.1,28.8,156.5,37.1,257.4c14.4,193.6,41.2,265.6,109.1,288.3c24.7,6.2,45.3,39.1,55.6,78.2c18.5,90.6,59.7,164.7,133.8,251.2c53.5,61.8,59.7,78.2,37.1,105C3954.8,2571.4,3761.2,2589.9,3596.5,2511.7z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M1341.8-109.6c-28.8-4.1-119.4-28.8-201.8-51.5c-156.5-45.3-160.6-61.8-16.5-86.5c105-20.6,282.1-98.9,372.7-168.9c41.2-30.9,98.8-98.8,129.7-150.3c49.4-82.4,55.6-115.3,53.5-259.5c0-133.8-12.4-191.5-61.8-308.9c-51.5-125.6-59.7-168.8-59.7-339.7c0-175,8.2-210,65.9-331.5c129.7-278,315-411.8,593-426.3c243-12.3,459.2,70,737.2,280c88.5,68,96.8,82.4,96.8,160.6c0,80.3,28.8,263.6,53.5,341.8c8.2,28.8-4.1,28.8-119.4-8.2c-189.4-59.7-422.1-72.1-508.6-28.8c-109.1,57.6-135.9,148.3-105,366.5c35,245,18.5,473.6-43.2,603.3c-127.7,269.8-418,426.3-780.4,420.1C1463.3-99.3,1370.6-105.5,1341.8-109.6z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M8620.8-496.7c-10.3-4.1-148.3-37.1-302.7-72.1c-205.9-47.4-284.2-74.1-284.2-96.8c0-57.6-103-337.7-154.4-418c-28.8-45.3-51.5-86.5-51.5-92.7s49.4,14.4,109.1,43.3c57.7,30.9,191.5,94.7,294.5,142.1l189.4,88.5l98.8-88.5l100.9-88.5l-80.3-166.8c-45.3-90.6-74.1-173-65.9-181.2c8.2-8.2,105-74.1,214.1-144.1c148.3-94.7,203.9-119.4,214.2-100.9c39.1,72.1,78.2,284.2,78.2,434.5c0,152.4-6.2,181.2-82.4,337.7c-65.9,133.8-243,422.1-255.3,411.8C8641.4-488.5,8633.1-492.6,8620.8-496.7z"></path>
            <path transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)" d="M5037.9-2842.1c-181.2-49.4-352.1-94.7-380.9-100.9c-45.3-10.3-57.7-30.9-78.2-133.9c-24.7-121.5-140-380.9-238.9-535.4c-28.8-47.4-53.5-88.5-53.5-94.7c0-6.2,821.6-741.3,914.2-817.5c37.1-30.9,37.1-37.1,6.2-131.8c-20.6-55.6-35-107.1-35-117.4c0-8.2,115.3-16.5,255.3-16.5h257.4l-49.4,144.2c-47.4,135.9-70,166.8-444.8,570.4L4797-3647.2l57.7,41.2c123.5,84.4,313,294.4,383,422.1c65.9,115.3,160.6,364.5,160.6,415.9C5398.3-2745.3,5412.7-2743.2,5037.9-2842.1z"></path>
            </svg>{' '}
            Leveling - As you are able to defeat opponents of various qualities, you invariably gain experience, which allows you to level. Leveling has several consequences, gaining strength in yourself and the utilization of your equipment's quality. You also gain 4 points to add to your attributes at every even level.
            <br /><br />
            Common - Scales to level 4.<br /><br />
            Uncommon - Scales to level 8. (Req. Level 4)<br /><br />
            Rare - No Scaling ATM. (Req. Level 6)<br /><br />
            Epic - No Scaling. (Req. Level 12)
            </p>
            <br />
            <p style={{ color: '#fdf6d8' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 32 32">
            <path d="M20,28h2v1H10v-1h2l1-3h6L20,28z M31,3v21H1V3H31z M29,5H3v17h26V5z M28,21H4V6h24V21z M7,10h8V9  H7V10z M11,17H7v1h4V17z M19,15h-9v1h9V15z M19,13h-9v1h9V13z M20,11H10v1h10V11z"></path>
            </svg>{' '}
            Progression - And this is the developer trying to keep you informed and updated. Currently I am working on the framework of how the game will technically function i.e. combat, equipment, leveling, and scaling. I don't have a roadmap nor have I looked up how people actually work through game development stem to sternum but I'm hammering out what I can recollect from myriad gameplay seems to be necessary for the game itself to be fun and functional. So it's gameplay first to make sure anyone would trouble themself to play the thing, story connectivity-vignettes to somewhat storyboard for myself the actual game conceptually, then the phaser canvas to give what is generally static gameplay (however much I can add to the 'life' of the game I will continue to do so) and transform it into an interconnected world where the PvP and ability to communicate would be more amusing and enjoyable. If you are reading this, I appreciate you humoring me. Thank you.
            </p>
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