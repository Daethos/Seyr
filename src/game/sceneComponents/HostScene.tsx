import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Phaser from "phaser";
import '../PhaserGame.css'
import MainScene from '../../scenes/MainScene';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import Boot from '../Boot';
import Preload from '../Preload';
import Menu from '../Menu';
import Play from '../Play';
import StoryAscean from '../../components/GameCompiler/StoryAscean';
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

    // useEffect(() => {
    //     // if (!gameRef.current) {
    //         setLoading(true);
    //         gameRef.current = new Phaser.Game(config);
    //         // console.log(gameRef.current, 'New Game?');
    //     //    const game = new Phaser.Game(config);
    //         setLoading(false);
    //     // }
    //     // startGame();

    // }, [])

    const startGame = useCallback(async () => {
        try {
            setLoading(true);
            let game = new Phaser.Game(config);
            // console.log(game.scene.scenes, 'New Game');
            setGameState(game);
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
    
        // Make Div Full Height of Browser and Keep the Ratin of Game Resolution
        let div = document.getElementById('story-game');
        div!.style.width = (window.innerHeight * game_ratio) + 'px';
        div!.style.height = window.innerHeight + 'px';
    
        // Check if Device DPI messes up the Width-Height Ratio
        let canvas = document.getElementsByTagName('canvas')[0];
    
        let dpi_w = (parseInt(div!.style.width) / canvas.width);
        let dpi_h = (parseInt(div!.style.height) / canvas.width);
    
        let height = window.innerHeight * (dpi_w / dpi_h);
        let width = height * game_ratio;
    
        // Scale Canvas
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    
    }
    
    window.addEventListener('resize', resizeGame);
    
    // TODO:FIXME: game.scene.scenes[0].scene.key

    return (
        <div id='story-game' style={{ textAlign: 'center' }} className='my-5'>
            {/* <StoryAscean 
                        ascean={ascean} weaponOne={weaponOne} weaponTwo={weaponTwo} weaponThree={weaponThree} loading={loading}
                        currentPlayerHealth={currentPlayerHealth} totalPlayerHealth={totalPlayerHealth} attributes={attributes} playerDefense={playerDefense}
                    /> */}
            {
                gameState?.scene?.scenes?.map((scene: any) => console.log(scene, 'Scene ???'))
            }
            {
                gameState?.scene?.scenes?.find((scene: any) => scene?.scene?.key === 'Play' && scene?.scene?.settings?.active === true)
                ? 
                    <>
                    <StoryAscean 
                        ascean={ascean} weaponOne={weaponOne} weaponTwo={weaponTwo} weaponThree={weaponThree} loading={loading}
                        currentPlayerHealth={currentPlayerHealth} totalPlayerHealth={totalPlayerHealth} attributes={attributes} playerDefense={playerDefense}
                    />
                    </>
                : ''
            }
        </div>
  )
}

export default HostScene