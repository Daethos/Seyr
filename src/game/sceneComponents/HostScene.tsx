import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Phaser from "phaser";
import '../PhaserGame.css'
import MainScene from '../../scenes/MainScene';
import Modal from 'react-bootstrap/Modal';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import Boot from '../Boot';
import Preload from '../Preload';
import Menu from '../Menu';
import Play from '../Play';
import StoryAscean from '../../components/GameCompiler/StoryAscean';
import * as asceanAPI from '../../utils/asceanApi';
import DialogBox from '../DialogBox';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Attributes from '../LevelUp/Attributes';
import Mastery from '../../components/AsceanBuilder/Mastery';
import Faith from '../../components/AsceanBuilder/Faith';

export const useDocumentEvent = (event: string, callback: any) => {
    useEffect(() => {
        document.addEventListener(event, callback);
        return () => document.removeEventListener(event, callback);
    }, [event, callback]);
};

interface Props {
    user: any;
    ascean: any;
    weaponOne: any;
    weaponTwo: any;
    weaponThree: any;
    totalPlayerHealth: number;
    currentPlayerHealth: number;
    attributes: any;
    playerDefense: any;
    levelUp: boolean;
    setLevelUp: any;
    gameChange: boolean;
    setGameChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const HostScene = ({ user, ascean, weaponOne, weaponTwo, weaponThree, totalPlayerHealth, currentPlayerHealth, attributes, playerDefense, levelUp, setLevelUp, gameChange, setGameChange }: Props) => {
    const [gameState, setGameState] = useState<any>({});
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [pauseState, setPauseState] = useState<boolean>(false);
    const [muteState, setMuteState] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const [messages, setMessages] = useState<any>([]);
    const [gameData, setGameData] = useState<any>({
        ascean: ascean,
        user: user,
        weapon_one: weaponOne,
        weapon_two: weaponTwo,
        weapon_three: weaponThree,
        total_player_health: totalPlayerHealth,
        current_player_health: currentPlayerHealth,
        player_attributes: attributes,
        player_defense: playerDefense
    });
    const [asceanState, setAsceanState] = useState({
        ascean: ascean,
        constitution: 0,
        strength: 0,
        agility: 0,
        achre: 0,
        caeren: 0,
        kyosir: 0,
        level: ascean.level,
        experience: ascean.experience,
        experienceNeeded: ascean.level * 1000,
        mastery: ascean.mastery,
        faith: ascean.faith,
    })
    const { asceanID } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [worldModalShow, setWorldModalShow] = useState<boolean>(false);
    const gameRef = useRef<any>({});
    const [IS_DEV, setIS_DEV] = useState<boolean>(true);
    const [VERSION, setVERSION] = useState<string>('0.0.1');
    let scenes: any[] = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);
    scenes.push(Play);

    const [config, setConfig] = useState({
        type: Phaser.AUTO,
        parent: 'story-game',
        fullscreenTarget: 'story-game',
        width: 360,
        height: 480,
        scene: scenes,
        scale: {
            zoom: 1,
        },
        data: {
            ascean: ascean,
            user: user
        },
        physics: {
            default: 'matter',
            matter: {
                debug: true,
                gravity: { y: 0 },
            }
        },
        plugins: {
            global: [{
                key: 'rexVirtualJoystick',
                plugin: VirtualJoystickPlugin,
                start: true
            }],
            scene: [
                {
                    plugin: PhaserMatterCollisionPlugin,
                    key: 'matterCollision',
                    mapping: 'matterCollision'
                }
            ],
            src: [
                'VirtualJoysticks/plugin/src/Pad.js',
                'VirtualJoysticks/plugin/src/Stick.js',
                'VirtualJoysticks/plugin/src/Button.js',
                'VirtualJoysticks/plugin/src/DPad.js',
            ],
        },
        backgroundColor: '#000',
    })
    let canvasElement: any;
    const startGame = useCallback(async () => {
        try {
            setLoading(true);
            if (canvasElement) {
                canvasElement.lastElementChild.remove();
                canvasElement.removeChild(canvasElement.lastElementChild);
                canvasElement.removeChild(canvasElement.children[canvasElement.children.length - 1]);
                gameRef.current = null;
                console.log(canvasElement, 'Canvas Element Before')
            };
            gameRef.current = new Phaser.Game(config);
            setGameState(gameRef.current);
            canvasElement = document.querySelector('#story-game');
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        } catch (err: any) {
            console.log(err.message, 'Error Starting Game')
        };
    }, [ascean]);
    
    const levelUpAscean = async (vaEsai: any) => {
        try {
            let response = await asceanAPI.levelUp(vaEsai);
            setLevelUp(true);
            setAsceanState({
                ...asceanState,
                ascean: response.data,
                constitution: 0,
                strength: 0,
                agility: 0,
                achre: 0,
                caeren: 0,
                kyosir: 0,
                level: response.data.level,
                experience: response.data.experience,
                experienceNeeded: response.data.level * 1000,
                mastery: response.data.mastery,
                faith: response.data.faith,
            });
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up');
        };
    };

    useEffect(() => {
        setGameData({
            ascean: ascean,
            user: user,
            weapon_one: weaponOne,
            weapon_two: weaponTwo,
            weapon_three: weaponThree,
            total_player_health: totalPlayerHealth,
            current_player_health: currentPlayerHealth,
            player_attributes: attributes,
            player_defense: playerDefense
        });
        setTimeout(() => {
            startGame();
        }, 500);
    }, [ascean, asceanID]);


    const sendAscean = async () => {
        console.log('Event Listener Added');
        const asceanData = new CustomEvent('get-ascean', {
            detail: gameData
        });
        window.dispatchEvent(asceanData);
    };

    const createDialog = async (e: any) => {
        // I need to create a dialog box here
        console.log('Dialog Box Event Listener Added');
        setMessages({
            author: e.detail.author,
            message: e.detail.message,
        });
    }

    useEffect(() => {
        window.addEventListener('request-ascean', sendAscean);
        window.addEventListener('dialog-box', createDialog);
        return () => {
            window.removeEventListener('request-ascean', sendAscean);
            window.removeEventListener('dialog-box', createDialog);
        };
    }, [ascean]);

    const resizeGame = () => {
        let game_ratio = 360 / 480;
    
        let canvas = document.getElementsByTagName('canvas')[0];

        let newWidth = window.innerWidth;
        let newHeight = newWidth / game_ratio;

        if (newHeight > window.innerHeight) {
            newHeight = window.innerHeight;
            newWidth = newHeight * game_ratio;
        };

        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';
    };

    useEffect(() => {
        window.addEventListener('resize', resizeGame);
        return () => {
            window.removeEventListener('resize', resizeGame);
        };
    }, []);

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setFullScreen(false);
        } else {
            gameRef.current.scale.startFullscreen();
            setFullScreen(true);
        };
    };

    const toggleMute = () => {
        const mute = () => {
            let scene = gameRef.current.scene.getScene('Play');
            console.log(scene, 'What is this Scene I made?')
            scene.sound.setMute();
        };
        const unmute = () => {
            let scene = gameRef.current.scene.getScene('Play');
            scene.sound.setMute(false);
        };
        if (!muteState) {
            mute();
            setMuteState(true);
        } else {
            unmute();
            setMuteState(false);
        };
    };

    const togglePause = () => {
        const pause = () => {
            let scene = gameRef.current.scene.getScene('Play');
            console.log(scene, 'What is this Scene I made?')
            scene.pause();
        };
        const resume = () => {
            let scene = gameRef.current.scene.getScene('Play');
            scene.resume();
        };
        if (!pauseState) {
            pause();
            setPauseState(true);
        } else {
            resume();
            setPauseState(false);
        };
    };

    return (
        <>
            <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                <Modal.Body>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => toggleFullscreen()}>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>{ fullScreen ? 'Exit' : 'Enter' } Full Screen</h3>
                </Button>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={toggleMute}>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>{ muteState ? 'Unmute' : 'Mute' } Game</h3>
                </Button>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => togglePause()}>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>{ pauseState ? 'Resume' : 'Pause' } Game</h3>
                </Button>
                </Modal.Body>
            </Modal>
            <Modal show={worldModalShow} onHide={() => setWorldModalShow(false)} centered>
                <Modal.Body style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }}>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Latency: {' '}</h3>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Friends: {' '}</h3>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Players: {' '}</h3>
                </Modal.Body>
            </Modal>
            <div id='ui-hud' className='mt-3 ui-hud'>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center' }} className=''>{ascean.name}</h3>
                </Button>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center' }} className=''>Inventory</h3>
                </Button>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setWorldModalShow(true)}>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center' }} className=''>World Status</h3>
                </Button>
                <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' id='world-status' onClick={() => setModalShow(true)}>
                    <h3 style={{ fontSize: 12 + 'px', textAlign: 'center' }} className=''>Settings</h3>
                </Button>
            { showPlayer ?
                ( <StoryAscean ascean={ascean} weaponOne={weaponOne} weaponTwo={weaponTwo} weaponThree={weaponThree} loading={loading} asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean}
                    currentPlayerHealth={currentPlayerHealth} totalPlayerHealth={totalPlayerHealth} attributes={attributes} playerDefense={playerDefense} />
            ) : ( '' ) }
            </div>
            <div id='story-game' style={{ textAlign: 'center' }} className='my-5' ref={gameRef}>
            </div>
        </>
    );
};

export default HostScene;