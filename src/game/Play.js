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
    }
    
    init(data) {
        console.log(data, 'Data from Play');
        this.data = data;
        this.gameData = this.data.gameData.ascean.gameData.ascean;
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
        console.log(this, 'What is this?')
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
        const layer1 = map.createLayer('Tile Layer 1', tileSet, 0, 0);

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

        // Set the y property of each object's Transform component to align them vertically
        this.playerHelm.y = -totalHeight / 2 + (objectATop - objectABottom) / 2;
        this.playerArmor.y = 0;
        this.playerLegs.y = totalHeight / 2 - (objectCTop - objectCBottom) / 2;

        // TODO:FIXME: This is the code I'll try tomorrow to align all the sprites together
        // import objectA from './objectA';
        // import objectB from './objectB';
        // import objectC from './objectC';

        // // Get the bounding box of each object
        // let objectABounds = objectA.body.getBounds();
        // let objectBBounds = objectB.body.getBounds();
        // let objectCBounds = objectC.body.getBounds();

        // // Get the bottom and top points of the circular colliders
        // let objectABottom = objectABounds.bottom;
        // let objectATop = objectABounds.top;
        // let objectBBottom = objectBBounds.bottom;
        // let objectBTop = objectBBounds.top;
        // let objectCBottom = objectCBounds.bottom;
        // let objectCTop = objectCBounds.top;

        // // Calculate the total height of all three objects
        // let totalHeight = objectATop - objectABottom + objectBTop - objectBBottom + objectCTop - objectCBottom;

        // // Set the y property of each object's Transform component to align them vertically
        // objectA.y = -totalHeight / 2 + (objectATop - objectABottom) / 2;
        // objectB.y = 0;
        // objectC.y = totalHeight / 2 - (objectCTop - objectCBottom) / 2;




        // this.playerArmor.setScale(0.375);
        // this.playerHelm.setScale(0.225);
        // this.playerLegs.setScale(0.45);

        // this.playerArmor.y = this.playerHelm.y + 10;
        // this.playerLegs.y = this.playerArmor.y + 10;

        // let playerArmor = this.playerArmor;
        // let playerLegs = this.playerLegs;

        // playerArmor.alignTo(this.playerHelm, Phaser.Display.Align.BOTTOM_CENTER, 0, 0);
        // playerLegs.alignTo(this.playerArmor, Phaser.Display.Align.BOTTOM_CENTER, 0, 0);

        let camera = this.cameras.main;
        camera.zoom = 2;
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
        joystick.setScrollFactor(0);
        this.playerArmor.joystick = joystick;
        this.playerLegs.joystick = joystick;
        this.playerHelm.joystick = joystick;
        // this.stick = this.pad.addStick(0, 0, 200, 'generic');
        // this.stick.alignBottomLeft(20);
    }

    update() {
        this.playerHelm.update(this);
        this.playerArmor.update(this);
        this.playerLegs.update(this);
    }
}