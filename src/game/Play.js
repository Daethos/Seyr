import Phaser from 'phaser';
import PlayerHelm from "../game/PlayerHelm";
import PlayerArmor from "../game/PlayerArmor";
import PlayerLegs from "../game/PlayerLegs";
import VirtualJoystick from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import NewText from './NewText.js'

import joystickPng from './images/generic-joystick.png';
import joystickJson from './images/generic-joystick.json';
import stick from './images/stick.png';
import base from './images/base.png';
import VirtualJoyStick from 'phaser3-rex-plugins/plugins/virtualjoystick';

export default class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play', active: false });
        this.ascean = null;
        this.centerX = 180;
        this.centerY = 240;
    }
    
    init(data) {
        console.log(data, 'Data from Play');
        this.data = data;
        this.gameData = this.data.gameData.ascean.gameData.ascean;
        this.CONFIG = this.sys.game.config;
        this.isFullScren = this.scale.isFullscreen;
        this.DEPTH = {
            floor: 0
        };
        
        this.allow_input = false;
        this.is_pause = false;
        this.is_gameover = false;
        this.baseSprite = this.add.sprite(0, 0, base);
        this.thumbSprite = this.add.sprite(0, 0, stick);
        this.map = null;

    }
    
    create() {
        console.log(this, 'What is this?')

        // window.addEventListener('full-screen', this.fullScreenEventListener(this));
        // window.addEventListener('exit-full-screen', this.exitFullScreenEventListener(this));

        let player_armor = this.gameData.ascean.chest.name.replace(/\s/g, '_').toLowerCase();
        let player_helm = this.gameData.ascean.helmet.name.replace(/\s/g, '_').toLowerCase();
        let player_legs = this.gameData.ascean.legs.name.replace(/\s/g, '_').toLowerCase();
        if (player_helm.includes("quor'ite") || player_helm.includes('hood') || player_helm.includes("knight's") || player_helm.includes("marauder's")) {
            player_helm = player_helm.replace(/quor'ite/g, 'earth');
            player_helm = player_helm.replace(/hood/g, 'helm');
            player_helm = player_helm.replace(/knight's/g, 'knight');
            player_helm = player_helm.replace(/marauder's/g, 'marauder');
        }
        if (player_armor.includes('cuirass') || player_armor.includes('robes') || player_armor.includes("quor'ite") || player_armor.includes("knight's") || player_armor.includes("marauder's")) {
            player_armor = player_armor.replace(/cuirass/g, 'armor');
            player_armor = player_armor.replace(/robes/g, 'armor');
            player_armor = player_armor.replace(/quor'ite/g, 'earth');
            player_armor = player_armor.replace(/knight's/g, 'knight');
            player_armor = player_armor.replace(/marauder's/g, 'marauder');
        }
        if (player_legs.includes('greaves') || player_legs.includes('pants') || player_legs.includes("quor'ite") || player_legs.includes("knight's") || player_legs.includes("marauder's")) {
            player_legs = player_legs.replace(/greaves/g, 'legs');
            player_legs = player_legs.replace(/pants/g, 'legs');
            player_legs = player_legs.replace(/quor'ite/g, 'earth');
            player_legs = player_legs.replace(/knight's/g, 'knight');
            player_legs = player_legs.replace(/marauder's/g, 'marauder');
        }

        let armor_texture = player_armor.replace('_armor', '');
        let helm_texture = player_helm.replace('_helm', '');
        let legs_texture = player_legs.replace('_legs', '');

        console.log(player_armor, player_helm, player_legs, ' <- Player Frames', armor_texture, helm_texture, legs_texture, ' <- Player Textures');
        const map = this.make.tilemap({ key: 'map' });
        const tileSet = map.addTilesetImage('Tileset', 'tiles', 32, 32, 0, 0);
        const atlasTerrain = map.addTilesetImage('Atlas Terrain', 'terrain', 32, 32, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1', atlasTerrain, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2', atlasTerrain, 0, 0);
        layer1.setCollisionByProperty({ collides: true });
        layer2.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layer2);
        this.map = map;


        this.playerHelm = new PlayerHelm({scene: this, x: 100, y: 100, texture: helm_texture, frame: `${player_helm}_idle`});
        this.playerArmor = new PlayerArmor({scene: this, x: 100, y: 110, texture: armor_texture, frame: `${player_armor}_idle`});
        this.playerLegs = new PlayerLegs({scene: this, x: 100, y: 120, texture: legs_texture, frame: `${player_legs}_idle`});

        // this.playerHelm.setScale(1);
        // this.playerArmor.setScale(1);
        // this.playerLegs.setScale(1);

        // Get the top and bottom coordinates of each object
        let objectATop = this.playerHelm.getTopLeft().y;
        let objectABottom = this.playerHelm.getBottomRight().y;
        let objectBTop = this.playerArmor.getTopLeft().y;
        let objectBBottom = this.playerArmor.getBottomRight().y;
        let objectCTop = this.playerLegs.getTopLeft().y;
        let objectCBottom = this.playerLegs.getBottomRight().y;

        // Calculate the total height of all three objects
        let totalHeight = objectATop - objectABottom + objectBTop - objectBBottom + objectCTop - objectCBottom;

        let objectA = this.playerHelm;
        let objectB = this.playerArmor;
        let objectC = this.playerLegs;

        let totalWidth = (objectA.width * objectA.scale) + (objectB.width * objectB.scale) + (objectC.width * objectC.scale);

        console.log(objectA.displayHeight, objectB.displayHeight, objectC.displayHeight, ' <- Widths');

        objectB.setOrigin(0.5, 0.5);
        objectB.setPosition(objectA.x, objectA.y + objectA.displayHeight / 2 + objectB.displayHeight / 2 - 1);

        objectC.setOrigin(0.5, 0.5);
        objectC.setPosition(objectB.x, objectB.y + objectB.displayHeight / 2 + objectC.displayHeight / 2 - 1);


        this.playerHelm = objectA;
        this.playerArmor = objectB;
        this.playerLegs = objectC;



  

        let camera = this.cameras.main;
        camera.zoom = 1;
        camera.startFollow(this.playerArmor);
        camera.setLerp(0.1, 0.1);
        camera.setBounds(0, 0, 1024, 1024);
        var joystick = this.game.plugins.get('rexVirtualJoystick').add(this, {
            x: 50,
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
        joystick.setScrollFactor(0);
        this.playerArmor.joystick = joystick;
        this.playerLegs.joystick = joystick;
        this.playerHelm.joystick = joystick;
        // this.stick = this.pad.addStick(0, 0, 200, 'generic');
        // this.stick.alignBottomLeft(20);

        this.createWelcome();

    }

    createWelcome() {
        console.log(this.gameData, 'Game Data')
        this.time.addEvent({
            delay: 500,
            callback: () => {  this.welcome = new NewText(
                this,
                this.centerX,
                this.centerY + 140,
                `Welcome to the game, ${this.gameData.ascean.name}!`,
                'play',
                0.5,
            )
        },
            callbackScope: this
        });
        this.time.addEvent({
            delay: 3000,
            callback: () => {  this.welcome.destroy();
        },
            callbackScope: this
        });
    }
 

    update() {
        
        const gameObjects = this.add.group([this.playerHelm, this.playerArmor, this.playerLegs]);
        const boundaryTiles = this.map.filterTiles((tile) => {
            return tile.properties.collides;
          }, this, 0, 0, this.map.width, this.map.height);
          

        this.playerHelm.update(this);
        this.playerArmor.update(this);
        this.playerLegs.update(this);

        if (this.alignmentCheck( this.playerHelm, this.playerArmor, this.playerLegs)) {
            // console.log('Out of Alignment')
            this.snapIntoAlignment();
        }
    }

    pause() {
        this.scene.pause();
    }
    resume() {
        this.scene.resume();
    }

    alignmentCheck(helm, armor, legs) {
        if (helm.x !== armor.x || helm.x !== legs.x || armor.x !== legs.x) {
            return true;
        }
        if (armor.y !== (helm.y + helm.displayHeight / 2 + armor.displayHeight / 2 - 1) && (armor.y - (helm.y +helm.displayHeight / 2 + armor.displayHeight / 2 - 1)) > 0.2 ) {
            return true;
        }
        if (legs.y !== (armor.y + armor.displayHeight / 2 + legs.displayHeight / 2 - 1) && (legs.y - (armor.y + armor.displayHeight / 2 + legs.displayHeight / 2 - 1)) > 0.2) {
            return true;
        }
        return false;
    }

    snapIntoAlignment() {
        console.log('Is this being called?')
        let objectA = this.playerHelm;
        let objectB = this.playerArmor;
        let objectC = this.playerLegs;

        // objectB.setOrigin(0.5, 0.5);
        objectB.setPosition(objectA.x, objectA.y + objectA.displayHeight / 2 + objectB.displayHeight / 2 - 1);

        // objectC.setOrigin(0.5, 0.5);
        objectC.setPosition(objectB.x, objectB.y + objectB.displayHeight / 2 + objectC.displayHeight / 2 - 1);

        this.playerHelm = objectA;
        this.playerArmor = objectB;
        this.playerLegs = objectC;
    }
}