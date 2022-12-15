import tokenService from "../utils/tokenService";
import { storyAscean } from "../game/StoryAscean";
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom';
import Phaser, { Math as pMath } from 'phaser';
// import knightLegsPng from '../game/images/knight_legs.png';
// import knightLegsJson  from '../game/images/knight_legs_atlas.json';
import { equipment } from '../game/utility';
import PlayerHelm from "../game/PlayerHelm";
import PlayerArmor from "../game/PlayerArmor";
import PlayerLegs from "../game/PlayerLegs";
import Tileset from '../game/images/Tileset.png';
import TileJson from '../game/images/map.json';
import { CanvasScaler } from "../game/CanvasScaler";
import JoystickPng from '../game/images/generic-joystick.png';
import JoystickJson from '../game/images/generic-joystick.json';


const { Vector2 } = pMath;



export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }
    
    preload() {
        console.log(equipment)
        PlayerHelm.preload(this);
        PlayerArmor.preload(this);
        PlayerLegs.preload(this);
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
        this.load.script('joystick', 'phaser-virtual-joystick.min.js');
        this.load.atlas('joystick', JoystickPng, JoystickJson);
        this.load.image('tiles', Tileset)
        this.load.tilemapTiledJSON('map', TileJson)
        // console.log(knightLegsJson, knightLegsPng)
    }
    
    create() {
        // const scaler = new CanvasScaler(this, 'CanvasScaler');
        // this.add.existing(scaler);
        const map = this.make.tilemap({ key: 'map' });
        const tileSet = map.addTilesetImage('Tileset', 'tiles', 32, 32, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1', tileSet, 0, 0);
        
        this.target = new Vector2();
        this.playerHelm = new PlayerHelm({scene: this, x: 100, y: 100, texture: 'knight_helm', frame: 'knight_helm_idle'});
        this.playerArmor = new PlayerArmor({scene: this, x: 98, y: 116, texture: 'knight_armor', frame: 'knight_armor_idle'});
        this.playerLegs = new PlayerLegs({scene: this, x: 104, y: 132, texture: 'knight_legs', frame: 'knight_legs_idle'});
        // this.add.existing(this.playerHelm);
        // this.add.existing(this.playerArmor);
        // this.add.existing(this.playerLegs);
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });
        let camera = this.cameras.main;
        camera.zoom = 1.5;
        camera.startFollow(this.playerArmor);
        camera.setLerp(0.1, 0.1);
        camera.setBounds(0, 0, 1024, 1024);
        console.log(this.game, 'What is this.game?')


        var joystick = this.game.plugins.get('rexVirtualJoystick').add(this, {
            x: 100,
            y: 400,
            radius: 50,
            base: this.add.circle(0, 0, 25, 0x888888),
            thumb: this.add.circle(0, 0, 12.5, 0xcccccc),
            // dir: '8dir',
            // forceMin: 16,
            // fixed: true,
            // enable: true
        });
        console.log(joystick.angle, 'New Joystick')
        joystick.setScrollFactor(0);
        this.playerArmor.joystick = joystick;
        this.playerLegs.joystick = joystick;
        this.playerHelm.joystick = joystick;
        
        // var pad = this.game.plugins.add(Phaser.VirtualJoystick);
        
        // this.pad = this.plugins.add(Phaser.VirtualJoystick);
        // var pad = this.plugins.add(Phaser.VirtualJoystick);
        // this.stick = this.pad.addStick(0, 0, 100, 'joystick');
          
          
    }

    update() {

        this.playerHelm.update();
        this.playerArmor.update();
        this.playerLegs.update();
    }
}

export const MainSceneReact = () => {

    const { asceanID } = useParams();
    const [loading, setLoading] = useState(true);
    const [ascean, setAscean] = useState({});
    const [weaponOne, setWeaponOne] = useState({});
    const [weaponTwo, setWeaponTwo] = useState({});
    const [weaponThree, setWeaponThree] = useState({});
    const [totalPlayerHealth, setTotalPlayerHealth] = useState(0);
    const [currentPlayerHealth, setCurrentPlayerHealth] = useState(-5)
    const [attributes, setAttributes] = useState([]);
    const [playerDefense, setPlayerDefense] = useState([]);

    const getAscean = async () => {
        const response = await storyAscean(asceanID);
        console.log(response)
        
    } 


    return (
        <div>

        </div>
    )
}
