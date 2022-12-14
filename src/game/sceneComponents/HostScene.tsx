import { useState, useEffect } from 'react'
import Phaser from "phaser";
import '../PhaserGame.css'
import MainScene from '../../scenes/MainScene';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import Boot from '../Boot';
import Preload from '../Preload';
import Menu from '../Menu';
// import { resizeGame } from '../Resize';


interface Props {
    user: any;
    ascean: any;
}

const HostScene = ({ user, ascean }: Props) => {
    const [gameState, setGameState] = useState<any>({});
    const [IS_DEV, setIS_DEV] = useState<boolean>(true);
    const [VERSION, setVERSION] = useState<string>('0.0.1');
    let scenes: any[] = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);


    const [config, setConfig] = useState({
        type: Phaser.AUTO,
        // orientation: 'LANDSCAPE',
        parent: 'story-game',
        width: 360,
        height: 640,
        centerX: Math.round(0.5 * 360),
        centerY: Math.round(0.5 * 640),
        tileSize: 32,
        scene: scenes,
        scale: {
            zoom: 1,
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

    // const config = {
    //     type: Phaser.AUTO,
    //     // orientation: 'LANDSCAPE',
    //     parent: 'story-game',
    //     width: 1024,
    //     height: 1024,
    //     scene: [MainScene],
    //     scale: {
    //         zoom: 1,
    //     },
    //     physics: {
    //         default: 'matter',
    //         matter: {
    //             debug: true,
    //             gravity: { y: 0 },
    //         }
    //     },
    //     plugins: {
    //         global: [{
    //             key: 'rexVirtualJoystick',
    //             plugin: VirtualJoystickPlugin,
    //             start: true
    //         }],
    //         scene: [
    //             {
    //                 plugin: PhaserMatterCollisionPlugin,
    //                 key: 'matterCollision',
    //                 mapping: 'matterCollision'
    //             }
    //         ],
    //         src: [
    //             'VirtualJoysticks/plugin/src/Pad.js',
    //             'VirtualJoysticks/plugin/src/Stick.js',
    //             'VirtualJoysticks/plugin/src/Button.js',
    //             'VirtualJoysticks/plugin/src/DPad.js',
    //         ],
    //     },
    //     backgroundColor: '#000',
    // };

    useEffect(() => {
        startGame();
    }, [])
    const startGame = async () => {
         try {
             let game = new Phaser.Game(config);
             console.log(game, 'New Game');

         } catch (err: any) {
            console.log(err.message, 'Error Starting Game')
         }
        
    }

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
    


    return (
        <div id='story-game' style={{ textAlign: 'center' }} className='my-5'>
        </div>
  )
}

export default HostScene