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
        this.focus = {};

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
        this.minimap = null;
    }; 
    
    create() { 
        this.input.setDefaultCursor('url(' + process.env.PUBLIC_URL + '/images/cursor.png), pointer'); 
        
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
            up: this.input.keyboard.addKeys('W,UP'),
            down: this.input.keyboard.addKeys('S,DOWN'),
            left: this.input.keyboard.addKeys('A,LEFT'),
            right: this.input.keyboard.addKeys('D,RIGHT'),
            attack: this.input.keyboard.addKeys('ONE'),
            counter: this.input.keyboard.addKeys('FIVE'),
            dodge: this.input.keyboard.addKeys('FOUR'),
            posture: this.input.keyboard.addKeys('TWO'),
            roll: this.input.keyboard.addKeys('THREE'), 
            hurt: this.input.keyboard.addKeys('H'),
            consume: this.input.keyboard.addKeys('F'),
            pray: this.input.keyboard.addKeys('R'),
            strafe: this.input.keyboard.addKeys('E,Q'),
            shift: this.input.keyboard.addKeys('SHIFT'),
            pause: this.input.keyboard.addKeys('T'),
            twist: this.input.mousePointer.rightButtonDown(), 
            target: this.input.keyboard.addKeys('TAB'),
        }; 
          
        let camera = this.cameras.main;
        camera.zoom = 2;
        camera.startFollow(this.player);
        camera.setLerp(0.1, 0.1);
        // camera.setBounds(0, 0, 960, 640); // Platformer
        camera.setBounds(0, 0, 2048, 2048); // Top Down
        var joystick = this.game.plugins.get('rexVirtualJoystick').add(this, {
            x: 860,
            y: 500,
            radius: 50,
            base: this.add.graphics()
                .lineStyle(2, 0x000000)
                .fillStyle(0xfdf6d8) 
                .fillCircle(0, 0, 50)
                .fillStyle(0x000000)
                .fillCircle(0, 0, 47),
        
            thumb: this.add.graphics()
                .lineStyle(2, 0x000000)
                .fillStyle(0xfdf6d8) 
                .fillCircle(0, 0, 25)
                .fillStyle(0x000000)
                .fillCircle(0, 0, 23),
        
            dir: '8dir',
            forceMin: 16,
            fixed: true,
            enable: true
        });
        joystick.setScrollFactor(0);
        this.player.joystick = joystick; 
        this.player.joystick.on('pointerdown', this.startJoystick, this);
        this.player.joystick.on('pointerup', this.stopJoystick, this);
        this.minimap = this.cameras.add(725, 10, 225, 150).setName('mini')
        this.minimap.scrollX = 2048;
        this.minimap.scrollY = 2048;
        this.minimap.zoom = 0.25;
        this.minimap.startFollow(this.player);
        this.minimap.setLerp(0.1, 0.1);
        this.input.keyboard.on('keydown-Z', () => {
            if (this.minimap.visible) {
                this.minimap.visible = false;
            } else {
                this.minimap.visible = true;
            };
        });

        this.createWelcome(); 
        this.createStateListener();
        // this.stateAddlistener(); // Figuring out a way to have the ability to always 'listen' in on state changes
    };

    startJoystick(pointer) {
        // Start tracking joystick movement when the left mouse button is pressed
        if (pointer.leftButtonDown()) {
            console.log("Joystick Active")
            this.player.joystick.isActive = true;
        };
    };
    
    stopJoystick(pointer) {
        // Stop tracking joystick movement when the left mouse button is released
        if (!pointer.leftButtonDown()) {
            this.player.joystick.isActive = false;
        };
    };

    handleJoystickUpdate() {
        const force = this.player.joystick.force;
        const angle = this.player.joystick.angle;

        // console.log(`Force: ${Math.floor(force * 100) / 100} Angle: ${Math.floor(angle * 100) / 100}`);
        if (force > 16) {

            let speedX = 0;
            let speedY = 0;
            if (angle > -60 && angle < 60) {
                if (this.player.flipX) this.player.flipX = false;
                speedX = 3;
            };
            if (angle > 30 && angle < 150) {
                speedY = 3;
            };
            if (angle > 120 || angle < -120) {
                speedX = -3;
                if (!this.player.flipX) this.player.flipX = true;
            };
            if (angle > -150 && angle < -30) {
                speedY = -3;
            };
              
            this.player.setVelocity(speedX, speedY); 
        };
    };

    setupEnemy = async function(data) {
        const setup = new CustomEvent('setup-enemy', { detail: data });
        window.dispatchEvent(setup);
        this.focus = data;
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
        if (this.player.joystick.isActive) this.handleJoystickUpdate();
        // this.minimap.update();
    };
    pause() {
        this.scene.pause();
    };
    resume() {
        this.scene.resume();
    };
 
};