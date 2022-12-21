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
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
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
}

const HostScene = ({ user, ascean, weaponOne, weaponTwo, weaponThree, totalPlayerHealth, currentPlayerHealth, attributes, playerDefense }: Props) => {
    const [gameState, setGameState] = useState<any>({});
    const [showPlayer, setShowPlayer] = useState<boolean>(false);
    const [pauseState, setPauseState] = useState<boolean>(false);
    const [muteState, setMuteState] = useState<boolean>(false);
    const [fullScreen, setFullScreen] = useState<boolean>(false);
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
    const { asceanID } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [modalShow, setModalShow] = useState<boolean>(false)
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
        height: 640,
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
            let game = new Phaser.Game(config);
            // console.log(game.scene.scenes, 'New Game');
            setGameState(game);
            gameRef.current = game;
            setLoading(false);
        } catch (err: any) {
            console.log(err.message, 'Error Starting Game')
        }
    }, [asceanID])

    useEffect(() => {
        startGame();
    }, [asceanID])

    const sendAscean = async () => {
        console.log('Event Listener Added');
        const asceanData = new CustomEvent('get-ascean', {
            detail: gameData
        });
        window.dispatchEvent(asceanData);
    }

    useEffect(() => {
        window.addEventListener('request-ascean', sendAscean);
    return () => {
        window.removeEventListener('request-ascean', sendAscean);
    }
    }, [])

    const resizeGame = () => {
        // Width-Height Ration of Game Resolution
        let game_ratio = 360 / 640;
    
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
            gameRef.current.requestFullscreen();
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
            scene.sound.setMute();
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
            <div id='story-game' style={{ textAlign: 'center' }} className='my-4' ref={gameRef}>
            <div id='ui-hud' className='mt-3'>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>{ascean.name}</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Inventory</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={toggleFullscreen}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Full Screen</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' onClick={() => setShowPlayer(!showPlayer)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>World Status</h3>
            </Button>
            <Button variant='outline' style={{ color: 'orangered', fontWeight: 400, fontVariant: 'small-caps', fontSize: 25 + 'px' }} className='ascean-ui' id='world-status' onClick={() => setModalShow(true)}>
                <h3 style={{ fontSize: 12 + 'px', textAlign: 'center', color: '' }} className=''>Settings</h3>
            </Button>
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
            </div>
            {
                showPlayer ?
                (
                    <StoryAscean 
                        ascean={ascean} weaponOne={weaponOne} weaponTwo={weaponTwo} weaponThree={weaponThree} loading={loading}
                        currentPlayerHealth={currentPlayerHealth} totalPlayerHealth={totalPlayerHealth} attributes={attributes} playerDefense={playerDefense}
                    />
                ) : (
                    ''
                )
            }

            {/* {
                gameState?.scene?.scenes?.find((scene: any) => scene?.scene?.key === 'Play' && scene?.scene?.settings?.active === true)
                ? 
                    <>
                    <StoryAscean 
                        ascean={ascean} weaponOne={weaponOne} weaponTwo={weaponTwo} weaponThree={weaponThree} loading={loading}
                        currentPlayerHealth={currentPlayerHealth} totalPlayerHealth={totalPlayerHealth} attributes={attributes} playerDefense={playerDefense}
                    />
                    </>
                : ''
            } */}
        </div>

  )
}

export default HostScene