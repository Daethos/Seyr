import Phaser from 'phaser';
import PlayerHelm from "../game/PlayerHelm";
import PlayerArmor from "../game/PlayerArmor";
import PlayerLegs from "../game/PlayerLegs";
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import joystickPng from './images/generic-joystick.png';
import joystickJson from './images/generic-joystick.json';
import stick from './images/stick.png';
import base from './images/base.png';
import VirtualJoyStick from 'phaser3-rex-plugins/plugins/virtualjoystick';

export default class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play', active: false });
        this.ascean = null;
        console.log(this, 'Events ?')
        // this.events.on('game-data-updated', this.onGameUpdated, this);
    }
    
    onGameUpdated(e) {
        this.ascean = e.detail;
        
    }
    
    init() {
        this.CONFIG = this.sys.game.config;
        
        this.DEPTH = {
            floor: 0
        };
        
        this.allow_input = false;
        this.is_pause = false;
        this.is_gameover = false;
        this.baseSprite = this.add.sprite(0, 0, base);
        this.thumbSprite = this.add.sprite(0, 0, stick);
    }
    
    
    create() {
        const asceanFinishedEventListener = ({ ascean }) => {
            this.ascean = ascean;
            console.log(ascean, 'Another stab at an Ascean')
            window.removeEventListener('get-ascean', asceanFinishedEventListener);
        };
        window.addEventListener('get-ascean', asceanFinishedEventListener)

        console.log(this.ascean, 'Ascean?')
        const map = this.make.tilemap({ key: 'map' });
        const tileSet = map.addTilesetImage('Tileset', 'tiles', 32, 32, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1', tileSet, 0, 0);
        console.log(this, 'This in Play')
        // if (this.gameRef.current) {
        //     const { ascean, user } = this.gameRef.current.data;
        //     console.log(ascean, user, 'Ascean and User?')
        //     // Use gameData and setGameData in your scene
        //   }

        this.playerHelm = new PlayerHelm({scene: this, x: 100.25, y: 100, texture: 'knight_helm', frame: 'knight_helm_idle'});
        this.playerArmor = new PlayerArmor({scene: this, x: 99, y: 110, texture: 'knight_armor', frame: 'knight_armor_idle'});
        this.playerLegs = new PlayerLegs({scene: this, x: 105, y: 120, texture: 'knight_legs', frame: 'knight_legs_idle'});
        let camera = this.cameras.main;
        camera.zoom = 1;
        camera.startFollow(this.playerArmor);
        camera.setLerp(0.1, 0.1);
        camera.setBounds(0, 0, 1024, 1024);
        var joystick = this.game.plugins.get('rexVirtualJoystick').add(this, {
            x: 100,
            y: 400,
            radius: 50,
            // base: this.baseSprite,
            // thumb: this.thumbSprite
            base: this.add.circle(0, 0, 25, 0x800080),
            thumb: this.add.circle(0, 0, 12.5, 0xfdf6d8),
            dir: 2,
            // forceMin: 16,
            // fixed: true,
            // enable: true
        });
        console.log(joystick.angle, 'New Joystick')
        joystick.setScrollFactor(0);
        this.playerArmor.joystick = joystick;
        this.playerLegs.joystick = joystick;
        this.playerHelm.joystick = joystick;
        console.log(this.game, 'Game ?')
        // this.virtualJoystick = new VirtualJoyStick(this, {
        //     baseSprite,
        //     thumbSprite
        // })
        // this.virtualJoystick.add(200, 300);

        // this.pad = this.game.plugins.get(Phaser.VirtualJoystick);
        // console.log(this.pad, 'this.pad ?')
        // this.stick = this.pad.addStick(0, 0, 200, 'generic');
        // this.stick.alignBottomLeft(20);
    }

    update() {
        this.playerHelm.update();
        this.playerArmor.update();
        this.playerLegs.update();
    }
}