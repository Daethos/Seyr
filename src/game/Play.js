import Phaser from 'phaser';
import EasyStar from 'easystarjs';
import Player from './Player';
import Enemy from './Enemy';
import NPC from './NPC';
import Treasure from './Treasure';
import NewText from './NewText.js'
import stick from './images/stick.png';
import base from './images/base.png';
import ParticleManager from './ParticleManager';
import LootDrop from './LootDrop';

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
        this.particleManager = {};
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
        this.navMesh = null;
        this.isPlayerOnGround = true;
        this.isPlayerHanging = false;

        this.isEnemyHanging = false;
        this.isEnemyOnGround = true;
        this.minimap = null;
        this.combatTime = 0;
        this.combatTimer = null;
        this.lootDrops = [];
    }; 
    
    create() { 
        this.input.setDefaultCursor('url(' + process.env.PUBLIC_URL + '/images/cursor.png), pointer'); 
        
        // const map = this.make.tilemap({ key: 'top_down' });
        // const tileSet = map.addTilesetImage('MainLev2.0', 'MainLev2.0', 32, 32, 0, 0);
        // console.log(tileSet, map, "Tile Set ?")
        // const layer1 = map.createLayer('Tile Layer 1', tileSet, 0, 0);
        // const layer2 = map.createLayer('Tile Layer 2', tileSet, 0, 0);
        // layer2.setCollisionByProperty({ collides: true });
        // this.matter.world.convertTilemapLayer(layer2);
        // this.matter.world.convertTilemapLayer(layer1);
        // this.map = map;
        // this.matter.world.setBounds(0, 0, 960, 640); // Platformer
        // this.matter.world.setBounds(0, 0, 2048, 2048); // Top Down
        
        // ================== Ascean Test Map ================== \\
        const map = this.make.tilemap({ key: 'ascean_test' });
        this.map = map;
        const decorations = map.addTilesetImage('AncientForestDecorative', 'AncientForestDecorative', 32, 32, 0, 0);
        const tileSet = map.addTilesetImage('AncientForestMain', 'AncientForestMain', 32, 32, 0, 0);
        const layer0 = map.createLayer('Tile Layer 0 - Base', tileSet, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1 - Top', tileSet, 0, 0);
        const layerC = map.createLayer('Tile Layer - Construction', tileSet, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2 - Flowers', decorations, 0, 0);
        const layer3 = map.createLayer('Tile Layer 3 - Plants', decorations, 0, 0);
        const layer4 = map.createLayer('Tile Layer 4 - Primes', decorations, 0, 0);
        const layer5 = map.createLayer('Tile Layer 5 - Snags', decorations, 0, 0);
 
        layer0.setCollisionByProperty({ collides: true });
        layer1.setCollisionByProperty({ collides: true });
        layerC.setCollisionByProperty({ collides: true });
        // layer2.setCollisionByProperty({ collides: true });
        // layer3.setCollisionByProperty({ collides: true });
        // layer4.setCollisionByProperty({ collides: true });
        // layer5.setCollisionByProperty({ collides: true });  
        this.matter.world.convertTilemapLayer(layer0);
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layerC);
        // this.matter.world.convertTilemapLayer(layer2);
        // this.matter.world.convertTilemapLayer(layer3);
        // this.matter.world.convertTilemapLayer(layer4);
        // this.matter.world.convertTilemapLayer(layer5); 
        const objectLayer = map.getObjectLayer('navmesh');
        const navMesh = this.navMeshPlugin.buildMeshFromTiled("navmesh", objectLayer, 32);
        this.navMesh = navMesh;
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.navMesh.enableDebug(debugGraphics); 
        this.matter.world.createDebugGraphic(); 

        this.matter.world.setBounds(0, 0, 4096, 4096); // Top Down

        this.player = new Player({scene: this, x: 200, y: 200, texture: 'player_actions', frame: 'player_idle_0'});
        
        // this.map.getObjectLayer('Treasures').objects.forEach(treasure => this.enemies.push(new Treasure({ scene: this, treasure })));
        
        this.enemy = new NPC({scene: this, x: 800, y: 200, texture: 'player_actions', frame: 'player_idle_0'});

        // this.map.getObjectLayer('Enemies').objects.forEach(enemy => console.log(enemy, "Enemy"));
        this.map.getObjectLayer('Enemies').objects.forEach(enemy => this.enemies.push(new Enemy({ scene: this, x: enemy.x, y: enemy.y, texture: 'player_actions', frame: 'player_idle_0' })));


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
            firewater: this.input.keyboard.addKeys('T'),
            twist: this.input.mousePointer.rightButtonDown(), 
            target: this.input.keyboard.addKeys('TAB'),
            stalwart: this.input.keyboard.addKeys('G'),
        }; 
          
        let camera = this.cameras.main;
        camera.zoom = 1.5;
        camera.startFollow(this.player);
        camera.setLerp(0.1, 0.1);
        // camera.setBounds(0, 0, 960, 640); // Platformer
        camera.setBounds(0, 0, 4096, 4096); // Top Down
        // var joystick = this.game.plugins.get('rexVirtualJoystick').add(this, {
        //     x: 860,// 750 for 1.5
        //     y: 500, // 440 for 1.5
        //     radius: 35,
        //     base: this.add.graphics()
        //         .lineStyle(2, 0x000000)
        //         .fillStyle(0xfdf6d8) 
        //         .fillCircle(0, 0, 35)
        //         .fillStyle(0x000000)
        //         .fillCircle(0, 0, 33),
        
        //     thumb: this.add.graphics()
        //         .lineStyle(2, 0x000000)
        //         .fillStyle(0xfdf6d8) 
        //         .fillCircle(0, 0, 17)
        //         .fillStyle(0x000000)
        //         .fillCircle(0, 0, 15),
        
        //     dir: '8dir',
        //     forceMin: 16,
        //     fixed: true,
        //     enable: true
        // });
        // joystick.setScrollFactor(0);
        // this.player.joystick = joystick; 
        // this.player.joystick.on('pointerdown', this.startJoystick, this);
        // this.player.joystick.on('pointerup', this.stopJoystick, this);
        this.minimap = this.cameras.add(725, 480, 225, 150).setName('mini');
        this.minimap.setBounds(0, 0, 4096, 4096);
        this.minimap.scrollX = 4096;
        this.minimap.scrollY = 4096;
        this.minimap.zoom = 0.25;
        this.minimap.startFollow(this.player);
        this.minimap.setLerp(0.1, 0.1);
        this.minimapBorder = this.add.rectangle(this.minimap.x - 6, this.minimap.y - 3, this.minimap.width + 4, this.minimap.height + 2);
        this.minimapBorder.setStrokeStyle(2, 0x000000);
        this.minimapBorder.setScrollFactor(0);
        this.minimapBorder.setScale(1 / camera.zoom);
        // this.minimapBorder.setPosition(this.minimap.x - 8, this.minimap.y - 3);
        // this.minimapBorder.setSize(this.minimap.width + 4, this.minimap.height + 2);
        

        this.input.keyboard.on('keydown-Z', () => {
            if (this.minimap.visible) {
                this.minimap.visible = false;
                this.minimapBorder.visible = false;
            } else {
                this.minimap.visible = true;
                this.minimapBorder.visible = true;
            };
        });
        this.particleManager = new ParticleManager(this);
        this.createWelcome(); 
        this.createStateListener(); 
        this.staminaListener();
        this.enemyLootDropListener();
    };

    enemyLootDropListener = () => { 
        window.addEventListener('enemyLootDrop', (e) => {
            console.log(e.detail, "e From Loot Drops");
            e.detail.drops.forEach(drop => this.lootDrops.push(new LootDrop({ scene:this, enemyID:e.detail.enemyID, drop: drop })));
        });
    };

    startJoystick(pointer) {
        if (pointer.leftButtonDown()) {
            console.log("Joystick Active")
            this.player.joystick.isActive = true;
        };
    };
    
    stopJoystick(pointer) {
        if (!pointer.leftButtonDown()) {
            this.player.joystick.isActive = false;
        };
    };

    handleJoystickUpdate() {
        const force = this.player.joystick.force;
        const angle = this.player.joystick.angle;
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

    setupNPC = async (data) => {
        const setup = new CustomEvent('setup-npc', { detail: data });
        window.dispatchEvent(setup);
        this.focus = data;
    };

    combatEngaged = async (engagement) => {
        const combatEngaged = new CustomEvent('combat-engaged', { detail: engagement });
        window.dispatchEvent(combatEngaged);
    };

    showDialog = async (dialog) => {
        const show = new CustomEvent('show-dialog', { detail: dialog });
        window.dispatchEvent(show);
    };

    stalwart = async (update) => {
        const stalwart = new CustomEvent('update-stalwart', { detail: update });
        window.dispatchEvent(stalwart);
    };

    createStateListener = async function() { 
        window.addEventListener('update-combat-data', (e) => {
            this.state = e.detail;
        });

        window.addEventListener('update-game-data', (e) => {
            this.gameState = e.detail;
        });
    };

    staminaListener = async () => {
        window.addEventListener('updated-stamina', (e) => {
            this.player.stamina = e.detail;
        });
    };

    sendStateActionListener = async function() {
        // console.log(this.state.action, this.state.computer_action, "This is the State");
        if ((this.state.action === 'counter' && this.state.computer_action === '') || (this.state.action === '' && this.state.computer_action === 'counter')) { 
            console.log("--- ERROR --- One Player Is Countering Against Inaction --- ERROR ---");
            return; 
        };
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
 
    checkStamina = (value) => {
        switch (value) {
            case 'attack':
                const stamina = new CustomEvent('update-stamina', { detail: 25 });
                window.dispatchEvent(stamina);
                break;
            case 'counter':
                const counterStamina = new CustomEvent('update-stamina', { detail: 15 });
                window.dispatchEvent(counterStamina);
                break;
            case 'posture':
                const postureStamina = new CustomEvent('update-stamina', { detail: 15 });
                window.dispatchEvent(postureStamina);
                break;
            case 'roll':
                const rollStamina = new CustomEvent('update-stamina', { detail: 15 });
                window.dispatchEvent(rollStamina);
                break;
            case 'dodge':
                const dodgeStamina = new CustomEvent('update-stamina', { detail: 15 });
                window.dispatchEvent(dodgeStamina);
                break;
            default:
                break;
        };   
    };

    drinkFlask = async () => {
        const drinkFlask = new CustomEvent('drink-firewater');
        window.dispatchEvent(drinkFlask);
    };

    setState = (key, value) => {
        const state = new CustomEvent('update-state', { detail: { key, value } });
        window.dispatchEvent(state);
        if (key === 'action') this.checkStamina(value);
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

    startCombatTimer = async () => {
        console.log("Starting Combat Timer");
        this.combatTimer = this.time.addEvent({
            delay: 1000,
            callback: () => {
                if (this.scene.isPaused()) return;
                this.combatTime += 1;
                const combatTimer = new CustomEvent('update-combat-timer', { detail: this.combatTime });
                window.dispatchEvent(combatTimer);
            },
            callbackScope: this,
            loop: true
        });
    };

    stopCombatTimer = async () => {
        console.log("Stopping Combat Timer");
        this.combatTimer.destroy();
        this.combatTimer = null;
        this.combatTime = 0;
        const resetTimer = new CustomEvent('update-combat-timer', { detail: this.combatTime });
        window.dispatchEvent(resetTimer);
    };

    update() {
        this.player.update(); 
        this.enemy.update();
        this.enemies.forEach((enemy) => enemy.update());
        // this.lootDrops.forEach((lootDrop) => lootDrop.update());
        // if (this.player.joystick.isActive) this.handleJoystickUpdate(); 
    };
    pause() {
        this.scene.pause();
    };
    resume() {
        this.scene.resume();
    };
 
};

export const worldToTile = (tile) => Math.floor(tile / 32);
export const tileToWorld = (tile) => tile * 32 + 16;
export const alignToGrid = (tile) => tileToWorld(worldToTile(tile));