import Phaser from "phaser";
import NewText from './NewText.js' 
import Player from "./Player.js";
import sky from '../game/images/sky.png';
import ground from '../game/images/platform.png';
import Tileset from '../game/images/Tileset.png';
import AtlasTerrain from '../game/images/Atlas Terrain.png';
import TileJson from '../game/images/map.json';
import joystickPng from './images/generic-joystick.png';
import joystickJson from './images/generic-joystick.json';
import castle_tiles from '../game/images/castle_tiles.png';
import castle_map from '../game/images/castle_map.json';
import layer_1 from '../game/images/layer_1.png';

export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload', active: false });
        this.centerX = 480;
        this.centerY = 320;
        this.width = 800;
        this.height = 36;
        this.ascean = {};
        this.state = {};
        this.gameState = {};

    };

    init(data) {
        console.log(data.gameData, 'Preload Scene')
        this.gameData = data.gameData;
    };

    preload() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x2A0134', 1);
        this.bg.fillRect(0, 0, this.game.config.width, this.game.config.height);
        // this.load.script('generic', 'phaser-virtual-joystick.min.js');
        // this.load.atlas('generic', joystickPng, joystickJson);
        // this.load.image("sky", sky);
        // this.load.image("ground", ground);
        

        Player.preload(this);
        // this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
        // this.load.image('tiles', Tileset);
        // this.load.image('terrain', AtlasTerrain);
        // this.load.tilemapTiledJSON('map', TileJson);
        this.load.image('castle_tiles', castle_tiles);
        this.load.image('layer_1', layer_1);
        this.load.tilemapTiledJSON('castle_map', castle_map);
 
        this.createLoadingBar();
    };

    create() {
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.scene.start('Menu', {
                gameData: {
                    ascean: this.ascean,
                    state: this.state,
                    gameState: this.gameState
                }
            }); 
        },
            callbackScope: this
        });
        window.addEventListener('get-ascean', this.asceanFinishedEventListener);
        window.addEventListener('get-combat-data', this.stateFinishedEventListener);
        window.addEventListener('get-game-data', this.gameStateFinishedEventListener);
        const getAscean = new CustomEvent('request-ascean');
        const getState = new CustomEvent('request-combat-data');
        const getGameData = new CustomEvent('request-game-data');
        window.dispatchEvent(getAscean);
        window.dispatchEvent(getState);
        window.dispatchEvent(getGameData);
        console.log(this.ascean, 'Creating Ascean in Preload Scene');
    };
    
    asceanFinishedEventListener = (e) => {
        this.ascean = e.detail;
        window.removeEventListener('get-ascean', this.asceanFinishedEventListener);
    };

    stateFinishedEventListener = (e) => {
        this.state = e.detail;
        window.removeEventListener('get-combat-data', this.stateFinishedEventListener);
    };

    gameStateFinishedEventListener = (e) => {
        this.gameState = e.detail;
        window.removeEventListener('get-game-data', this.gameStateFinishedEventListener);
    };

    createLoadingBar() {
        this.title = new NewText(
            this,
            this.centerX,
            150,
            'Loading Game',
            'preload',
            0.5
        );
        this.border = this.createTextBorder(this.title.obj);
        this.txt_progress = new NewText(
            this,
            this.centerX,
            this.centerY - 5,
            'Loading...',
            'preload',
            { x: 0.5, y: 1 }
        );
        let x = this.centerX - (this.width / 2);
        let y = this.centerY + 5;
        this.progress = this.add.graphics({ x: x, y: y });
        this.border = this.add.graphics({ x: x, y: y })
        this.load.on('progress', this.onProgress, this);
    };
    onProgress(val) {
        this.progress.clear();
        this.progress.fillStyle('0xFDF6D8', 1);
        this.progress.fillRect(0, 0, this.width * val, this.height);

        this.border.clear();
        this.border.lineStyle(4, '0x000000', 1);
        this.border.strokeRect(0, 0, this.width * val, this.height, 2);

        this.txt_progress.setText(Math.round(val * 100) + '%');
    };
    createTextBorder(text) {
        const border = this.add.graphics();
        border.lineStyle(3, 0xFDF6D8, 1);
        border.strokeRect(
            text.x - text.width * text.originX - 1.5, // Subtract half of the border width and the x origin from the x position
            text.y - text.height * text.originY - 1.5, // Subtract half of the border width and the y origin from the y position
            text.width + 3, // Add the border width to the width of the text
            text.height + 3 // Add the border width to the height of the text
        );
          
        this.add.existing(border);
        return border;
    };
};