import Phaser from "phaser";
import NewText from './NewText.js' 
import Player from "./Player.js";
import Enemy from './Enemy.js';
import Treasure from './Treasure.js';
import joystickPng from './images/generic-joystick.png';
import joystickJson from './images/generic-joystick.json';
import castle_tiles from '../game/images/castle_tiles.png';
import castle_map from '../game/images/castle_map.json';
import layer_1 from '../game/images/layer_1.png';
// Top-Down Attempt
import MainLev2 from '../game/images/MainLev2.0.png';
import top_down from '../game/images/top_down.json';

export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload', active: false });
        this.centerX = 480;
        this.centerY = 320;
        this.width = 640;
        this.height = 36;
        this.ascean = {};
        this.enemy = {};
        this.state = {};
        this.gameState = {};

    };

    init(data) {
        this.gameData = data.gameData;
    };

    preload() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, this.game.config.width, this.game.config.height);
        // this.load.script('generic', 'phaser-virtual-joystick.min.js');
        // this.load.atlas('generic', joystickPng, joystickJson);  

        Player.preload(this);
        Enemy.preload(this);
        Treasure.preload(this);
        // this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true); 
        this.load.image('castle_tiles', castle_tiles);
        this.load.image('layer_1', layer_1);
        this.load.tilemapTiledJSON('castle_map', castle_map);

        // Top-Down Attempt
        this.load.image('MainLev2.0', MainLev2);
        console.log(MainLev2, 'MainLev2');
        this.load.tilemapTiledJSON('top_down', top_down);
        
        this.createLoadingBar();
    };

    create() {
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.scene.start('Menu', {
                gameData: {
                    ascean: this.ascean,
                    enemy: this.enemy,
                    state: this.state,
                    gameState: this.gameState
                }
            }); 
        },
            callbackScope: this
        });
        window.addEventListener('get-ascean', this.asceanFinishedEventListener);
        window.addEventListener('get-enemy', this.enemyFinishedEventListener)
        window.addEventListener('get-combat-data', this.stateFinishedEventListener);
        window.addEventListener('get-game-data', this.gameStateFinishedEventListener);
        const getAscean = new CustomEvent('request-ascean');
        const getEnemy = new CustomEvent('request-enemy');
        const getState = new CustomEvent('request-combat-data');
        const getGameData = new CustomEvent('request-game-data');
        window.dispatchEvent(getAscean);
        window.dispatchEvent(getEnemy);
        window.dispatchEvent(getState);
        window.dispatchEvent(getGameData);
    };
    
    asceanFinishedEventListener = (e) => {
        this.ascean = e.detail;
        window.removeEventListener('get-ascean', this.asceanFinishedEventListener);
    };
    enemyFinishedEventListener = (e) => {
        this.enemy = e.detail;
        window.removeEventListener('get-enemy', this.enemyFinishedEventListener);
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
        // this.border = this.createTextBorder(this.title.obj);
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
        this.border = this.add.graphics({ x: x, y: y });
        this.load.on('progress', this.onProgress, this);
    };
    onProgress(val) {
        this.progress.clear();
        this.progress.fillStyle('0x000000', 1);
        this.progress.fillRect(0, 0, this.width * val, this.height);

        this.border.clear();
        this.border.lineStyle(4, '0xFDF6D8', 1);
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