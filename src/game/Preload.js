import Phaser from "phaser";
import NewText from './NewText.js' 
import { equipment } from '../game/utility';
import PlayerHelm from "../game/PlayerHelm";
import PlayerArmor from "../game/PlayerArmor";
import PlayerLegs from "../game/PlayerLegs";
import Tileset from '../game/images/Tileset.png';
import TileJson from '../game/images/map.json';
import storyAscean from './StoryAscean';
import joystickPng from './images/generic-joystick.png';
import joystickJson from './images/generic-joystick.json';

export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload', active: false });
        this.centerX = 180;
        this.centerY = 320;
        this.width = 340;
        this.height = 36;
        this.ascean = {};
    }

    init() {
        const getAscean = () => {
            // const response = storyAscean();
        }

    }

    preload() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x8A2BE2', 1);
        this.bg.fillRect(0, 0, this.game.config.width, this.game.config.height);
        this.load.script('generic', 'phaser-virtual-joystick.min.js');
        this.load.atlas('generic', joystickPng, joystickJson);
        PlayerHelm.preload(this);
        PlayerArmor.preload(this);
        PlayerLegs.preload(this);
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
        this.load.image('tiles', Tileset);
        this.load.tilemapTiledJSON('map', TileJson);
        // this.load.atlas('generic', joystickPng, joystickJson)
        // Create Loading Bar
        this.createLoadingBar();
        // SpriteSheets
        
    }

    create() {
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.scene.start('Menu'); },
            callbackScope: this
        });
    }

    createLoadingBar() {
        // Title 
        this.title = new NewText(
            this,
            this.centerX,
            75,
            'Loading Game',
            'preload',
            0.5
        )
        // Progress Text
        this.txt_progress = new NewText(
            this,
            this.centerX,
            this.centerY - 5,
            'Loading...',
            'preload',
            { x: 0.5, y: 1 }
        )
        console.log(this.title, this.txt_progress)
        // Loading Bar
        let x = 10;
        let y = this.centerY + 5;
        console.log(this.load.progress, 'Progress')
        this.progress = this.add.graphics({ x: x, y: y });
        this.border = this.add.graphics({ x: x, y: y })
        console.log(this.load, 'This mean anythning?')
        this.load.on('progress', this.onProgress, this);
    }
    onProgress(val) {
        this.progress.clear();
        this.progress.fillStyle('0xFFFFFF', 1);
        this.progress.fillRect(0, 0, this.width * val, this.height);

        this.border.clear();
        this.border.lineStyle(4, '0x800080', 1);
        this.border.strokeRect(0, 0, this.width * val, this.height, 2);

        this.txt_progress.setText(Math.round(val * 100) + '%');
    }
}