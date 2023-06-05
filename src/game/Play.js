import Phaser from 'phaser';
import Player from './Player';
import Enemy from './Enemy';
import Treasure from './Treasure';
import NewText from './NewText.js'
import stick from './images/stick.png';
import base from './images/base.png';

export default class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play', active: false });
        this.ascean = null;
        this.centerX = 480;
        this.centerY = 320;
    };
    
    init(data) {
        this.data = data;
        this.ascean = this.data.gameData.gameData.ascean;
        this.enemy = this.data.gameData.gameData.enemy;

        this.enemies = [];

        this.state = this.data.gameData.gameData.state;
        this.gameState = this.data.gameData.gameData.gameState;
        this.CONFIG = this.sys.game.config;
        this.isFullScren = this.scale.isFullscreen;
        this.DEPTH = { floor: 0 }; 
        this.allow_input = false;
        this.is_pause = false;
        this.is_gameover = false;
        this.baseSprite = this.add.sprite(0, 0, base);
        this.thumbSprite = this.add.sprite(0, 0, stick);
        this.map = null;
        this.isPlayerOnGround = true;
        this.isPlayerHanging = false;

        this.isEnemyHanging = false;
        this.isEnemyOnGround = true;
    }; 
    
    create() { 
        this.input.setDefaultCursor('url(' + process.env.PUBLIC_URL + '/images/cursor.png), pointer');
        // "url(" + getBackgroundStyle(gameState?.player.origin) + ")",
        // process.env.PUBLIC_URL + `/images/astralands_${num}.jpg`;


        // const map = this.make.tilemap({ key: 'castle_map' });
        // const tileSet = map.addTilesetImage('castle_tiles', 'castle_tiles', 32, 32, 0, 0);
        // const backgroundSet = map.addTilesetImage('layer_1', 'layer_1', 32, 32, 0, 0);
        // const layer2 = map.createLayer('Tile Layer 2', backgroundSet, 0, 0);
        // const layer1 = map.createLayer('Tile Layer 1', tileSet, 0, 0);
        // console.log(layer1, layer2, map, "Layers");
        // layer1.setCollisionByProperty({ collides: true });
        // this.matter.world.convertTilemapLayer(layer1);
        // this.matter.world.convertTilemapLayer(layer2);
        // this.map = map;
        // this.matter.world.setBounds(0, 0, 960, 640);
        // this.matter.world.createDebugGraphic();
        
        const map = this.make.tilemap({ key: 'top_down' });
        const tileSet = map.addTilesetImage('MainLev2.0', 'MainLev2.0', 32, 32, 0, 0);
        console.log(tileSet, map, "Tile Set ?")
        const layer1 = map.createLayer('Tile Layer 1', tileSet, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2', tileSet, 0, 0);
        // layer2.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer2);
        this.matter.world.convertTilemapLayer(layer1);
        this.map = map;
        // this.matter.world.setBounds(0, 0, 960, 640); // Platformer
        this.matter.world.setBounds(0, 0, 2048, 2048); // Top Down
        this.matter.world.createDebugGraphic(); 

        this.player = new Player({scene: this, x: 200, y: 200, texture: 'player_actions', frame: 'player_idle_0'});
        
        this.map.getObjectLayer('Treasures').objects.forEach(treasure => this.enemies.push(new Treasure({ scene: this, treasure })));
        this.map.getObjectLayer('Enemies').objects.forEach(enemy => this.enemies.push(new Enemy({ scene: this, x: enemy.x, y: enemy.y, texture: 'player_actions', frame: 'player_idle_0' })));
        
        this.enemy = new Enemy({scene: this, x: 400, y: 200, texture: 'player_actions', frame: 'player_idle_0'});


        this.player.inputKeys = {
            up: this.input.keyboard.addKeys('W,UP,SPACE'),
            down: this.input.keyboard.addKeys('S,DOWN'),
            left: this.input.keyboard.addKeys('A,LEFT'),
            right: this.input.keyboard.addKeys('D,RIGHT'),
            attack: this.input.keyboard.addKeys('ONE,SHIFT-ONE'),
            counter: this.input.keyboard.addKeys('FIVE,SHIFT-FIVE'),
            dodge: this.input.keyboard.addKeys('FOUR,SHIFT-FOUR'),
            posture: this.input.keyboard.addKeys('TWO,SHIFT-TWO'),
            roll: this.input.keyboard.addKeys('THREE,SHIFT-THREE'),
            crouch: this.input.keyboard.addKeys('C'),
            hurt: this.input.keyboard.addKeys('H'),
            consume: this.input.keyboard.addKeys('F'),
            pray: this.input.keyboard.addKeys('R'),
            strafe: this.input.keyboard.addKeys('E,Q'),
            shift: this.input.keyboard.addKeys('SHIFT'),
        };
          
        let camera = this.cameras.main;
        camera.zoom = 1.25;
        camera.startFollow(this.player);
        camera.setLerp(0.1, 0.1);
        // camera.setBounds(0, 0, 960, 640); // Platformer
        camera.setBounds(0, 0, 2048, 2048); // Top Down
        // var joystick = this.game.plugins.get('rexVirtualJoystick').add(this, {
        //     x: 50,
        //     y: 400,
        //     radius: 50,
        //     // base: this.baseSprite,
        //     // thumb: this.thumbSprite
        //     base: this.add.circle(0, 0, 25, 0x800080),
        //     thumb: this.add.circle(0, 0, 12.5, 0xfdf6d8),
        //     dir: 2,
        //     // forceMin: 16,
        //     // fixed: true,
        //     // enable: true
        // });
        // joystick.setScrollFactor(0);
        // this.player.joystick = joystick; 
        // this.stick = this.pad.addStick(0, 0, 200, 'generic');
        // this.stick.alignBottomLeft(20);
        this.createWelcome(); 
        this.createStateListener();
        // this.stateAddlistener(); // Figuring out a way to have the ability to always 'listen' in on state changes
    };

    setupEnemy = async function(data) {
        const setup = new CustomEvent('setup-enemy', { detail: data });
        window.dispatchEvent(setup);
    };

    combatEngaged = async function() {
        const combatEngaged = new CustomEvent('combat-engaged', { detail: true });
        window.dispatchEvent(combatEngaged);
    };

    createStateListener = async function() { 
        window.addEventListener('update-combat-data', (e) => {
            // console.log(e.detail, "State Updated");
            this.state = e.detail;
            if (this.state.action !== '') this.state.action = '';
            if (this.state.counter_action !== '') this.state.counter_action = '';
            if (this.state.computer_action !== '') this.state.computer_action = '';
            if (this.state.computer_counter_action !== '') this.state.computer_counter_action = '';
        });

        window.addEventListener('update-game-data', (e) => {
            // console.log(e.detail, "Game State Updated");
            this.gameState = e.detail;
        });
    };

    sendStateActionListener = async function() {
        // Handle Event Listener to Dispatch State
        const sendState = new CustomEvent('update-state-action', { detail: this.state });
        window.dispatchEvent(sendState);
    };

    sendStateSpecialListener = async function(special) {
        switch (special) {
            case 'invoke':
                const sendInvoke = new CustomEvent('update-state-invoke', { detail: this.state });
                window.dispatchEvent(sendInvoke);
                break;
            case 'consume':
                this.state.prayerSacrifice = this.state.playerEffects[0].prayer;
                this.state.prayerSacrificeName = this.state.playerEffects[0].name;
                const sendConsume = new CustomEvent('update-state-consume', { detail: this.state });
                window.dispatchEvent(sendConsume);
                break;
            default:
                break;
        };
    };

    stateAddlistener = async function() {
        // console.log("State Listener Added");
        // Handle Event Listener to Dispatch State
        window.addEventListener('update-combat-data', this.stateFinishedListener.bind(this));
        
    };
    
    stateFinishedListener = async function(e) {
        // console.log(e.detail, "State Finished");
        this.state = e.detail;
        window.removeEventListener('update-combat-data', this.stateFinishedListener);
    };

    

    drinkFlask = async function() {
        // Handle Event Listener to Dispatch Drinking a Flask
    };

    setState = async function(key, value) {
        // console.log("Setting: " + key + " to " + value);
        this.state[key] = value;
    };

    setStateAdd = async function(key, value) { 
        console.log("Adding: " + key + " to " + value);
        this.state[key] += value;
    };

    setGameState = async function(key, value) {
        this.gameState[key] = value;
    };

    setOnGround = async function(key, value) {
        if (key === 'player') {
            this.isPlayerOnGround = value;
        } else if (key === 'enemy') {
            this.isEnemyOnGround = value;
        };
    };

    setHanging = async function(key, value) {
        if (key === 'player') {
            this.isPlayerHanging = value;
        } else if (key === 'enemy') {
            this.isEnemyHanging = value;
        };
    };

    createTextBorder(text) {
        const border = this.add.graphics();
        border.lineStyle(4, 0x2A0134, 1);
        border.strokeRect(
            text.x - text.width * text.originX - 2.5, // Subtract half of the border width and the x origin from the x position
            text.y - text.height * text.originY - 2.5, // Subtract half of the border width and the y origin from the y position
            text.width + 5, // Add the border width to the width of the text
            text.height + 5 // Add the border width to the height of the text
        );
          
        this.add.existing(border);
        return border;
    };
      

    createWelcome() {
        this.time.addEvent({
            delay: 500,
            callback: () => {  
                this.welcome = new NewText(
                    this,
                    this.centerX,
                    this.centerY + 150,
                    `Welcome to the Seyr of Daethos, ${this.ascean.name}! What do you do when you don't know what to do?`,
                    'play',
                    0.5,
                    this.game,
                );
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
    };

    update() {
        this.enemy.update();
        this.enemies.forEach((enemy) => enemy.update());
        this.player.update(); 
    };
    pause() {
        this.scene.pause();
    };
    resume() {
        this.scene.resume();
    };
 
};