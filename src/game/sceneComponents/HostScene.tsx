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
// import { resizeGame } from '../Resize';


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
}

const HostScene = ({ user, ascean, weaponOne, weaponTwo, weaponThree, totalPlayerHealth, currentPlayerHealth, attributes, playerDefense, levelUp, setLevelUp }: Props) => {
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
        player_efense: playerDefense
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

// console.log(ascean, user, 'Ascean and User')
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

    const startGame = useCallback(async () => {
        try {
            setLoading(true);

            const oldGame = document.querySelector('.phaser-game');
            if (oldGame) oldGame.remove();

            let game = new Phaser.Game(config);
            // console.log(game.scene.scenes, 'New Game');
            setGameState(game);
            gameRef.current = game;
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error Starting Game')
        }
    }, [asceanID])
    
    const levelUpAscean = async (vaEsai: any) => {
        try {
            console.log(vaEsai, 'Va Esai');
            let response = await asceanAPI.levelUp(vaEsai);
            console.log(response, 'Level Up');
            setLevelUp(true);
        } catch (err: any) {
            console.log(err.message, 'Error Leveling Up')
        }
    }

    useEffect(() => {
        startGame();
    }, [asceanID]);


    const sendAscean = async () => {
        console.log('Event Listener Added');
        const asceanData = new CustomEvent('get-ascean', {
            detail: gameData
        });
        window.dispatchEvent(asceanData);
    }

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
    }
    }, [])

    const resizeGame = () => {
        // Width-Height Ration of Game Resolution
        let game_ratio = 360 / 480;
    
        // Check if Device DPI messes up the Width-Height Ratio
        let canvas = document.getElementsByTagName('canvas')[0];

        // Calculate the new width and height of the canvas
        // based on the current window size and the game ratio
        let newWidth = window.innerWidth;
        let newHeight = newWidth / game_ratio;

         // If the new height is too tall for the window,
        // use the window height instead and calculate the new width
        if (newHeight > window.innerHeight) {
            newHeight = window.innerHeight;
            newWidth = newHeight * game_ratio;
        }

        // Set the canvas width and height
        canvas.style.width = newWidth + 'px';
        canvas.style.height = newHeight + 'px';
    }

    useEffect(() => {
        window.addEventListener('resize', resizeGame);
      return () => {
        window.removeEventListener('resize', resizeGame);
      }
    }, [])

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            console.log('Exit Full Screen')
            setFullScreen(false);
          } else {
              console.log('Full Screen')
            gameRef.current.scale.startFullscreen();
            setFullScreen(true);
          }
    };

    const toggleMute = () => {
        const mute = () => {
            let scene = gameRef.current.scene.getScene('Play');
            console.log(scene, 'What is this Scene I made?')
            scene.sound.setMute();
        }
        const unmute = () => {
            let scene = gameRef.current.scene.getScene('Play');
            scene.sound.setMute(false);
        }
        if (!muteState) {
            mute();
            setMuteState(true);
        } else {
            unmute();
            setMuteState(false);
        }
    };

    const togglePause = () => {
        const pause = () => {
            let scene = gameRef.current.scene.getScene('Play');
            console.log(scene, 'What is this Scene I made?')
            scene.pause();
        }
        const resume = () => {
            let scene = gameRef.current.scene.getScene('Play');
            scene.resume();
        }
        if (!pauseState) {
            pause();
            setPauseState(true);
        } else {
            resume();
            setPauseState(false);
        }
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
            
            <div id='story-game' style={{ textAlign: 'center' }} className='my-5' ref={gameRef}>
            <div id='ui-hud' className='mt-3'>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>{ascean.name}</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Inventory</h3>
            </Button>

            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setWorldModalShow(true)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>World Status</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' id='world-status' onClick={() => setModalShow(true)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Settings</h3>
            </Button>
            { showPlayer ?
                ( <StoryAscean ascean={ascean} weaponOne={weaponOne} weaponTwo={weaponTwo} weaponThree={weaponThree} loading={loading} asceanState={asceanState} setAsceanState={setAsceanState} levelUpAscean={levelUpAscean}
                    currentPlayerHealth={currentPlayerHealth} totalPlayerHealth={totalPlayerHealth} attributes={attributes} playerDefense={playerDefense}
                    />
                ) : ( '' ) }
            </div>
        </div>
        {
            messages.length > 0 ?
            <DialogBox gameRef={gameRef} text={messages} />
            : ''
        }
        </>

  )
}

export default HostScene