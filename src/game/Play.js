import Phaser from 'phaser';
import Player from './Player';
import PlayerHelm from "../game/PlayerHelm";
import PlayerArmor from "../game/PlayerArmor";
import PlayerLegs from "../game/PlayerLegs";
import NewText from './NewText.js'
import stick from './images/stick.png';
import base from './images/base.png';

export default class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play', active: false });
        this.ascean = null;
        this.centerX = 180;
        this.centerY = 240;
    }
    
    init(data) {
        console.log(data, "Data in Play")
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

        this.player = new Player({scene: this, x: 100, y: 100, texture: 'player', frame: 'player_idle_0'}); 
        this.player.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        let camera = this.cameras.main;
        camera.zoom = 1.25;
        camera.startFollow(this.player);
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
        this.player.joystick = joystick; 
        // this.stick = this.pad.addStick(0, 0, 200, 'generic');
        // this.stick.alignBottomLeft(20);

        this.createWelcome();

    }

    createTextBorder(text) {
        const border = this.add.graphics();
        border.lineStyle(4, 0x000000, 1);
        border.strokeRect(
            text.x - text.width * text.originX - 2.5, // Subtract half of the border width and the x origin from the x position
            text.y - text.height * text.originY - 2.5, // Subtract half of the border width and the y origin from the y position
            text.width + 5, // Add the border width to the width of the text
            text.height + 5 // Add the border width to the height of the text
          );
          
        this.add.existing(border);
        return border;
      }
      

    createWelcome() {
        this.time.addEvent({
            delay: 500,
            callback: () => {  
                this.welcome = new NewText(
                    this,
                    this.centerX,
                    this.centerY + 140,
                    `Welcome to the Seyr of Daethos, ${this.gameData.name}! What do you do when you don't know what to do?`,
                    'play',
                    0.5,
                    this.game,
                );
                // console.log(this.welcome.obj, 'Welcome')
                    this.border = this.createTextBorder(this.welcome.obj);
            },
            callbackScope: this
        });
        this.time.addEvent({
            delay: 5000,
            callback: () => {  
                this.welcome.destroy();
                this.border.destroy();
            },
            callbackScope: this
        });
    }
 

    update() {
        this.player.update(this); 
        const boundaryTiles = this.map.filterTiles((tile) => {
            return tile.properties.collides;
          }, this, 0, 0, this.map.width, this.map.height);
           
    }

    pause() {
        this.scene.pause();
    }
    resume() {
        this.scene.resume();
    }
 
}