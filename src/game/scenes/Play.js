import Phaser from 'phaser';
import Player from '../entities/Player';
import Enemy from '../entities/Enemy';
import NPC from '../entities/NPC';
import Treasure from '../matter/Treasure';
import NewText from '../phaser/NewText'
import stick from '../images/stick.png';
import base from '../images/base.png';
import ParticleManager from '../phaser/ParticleManager';
import LootDrop from '../matter/LootDrop';
import EventEmitter from '../phaser/EventEmitter';

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
        this.enemy = {};
        this.npcs = [];
        this.combat = false;
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
        for (let i = 0; i < 8; i++) {
            this.npcs.push(new NPC({scene: this, x: 800, y: 200 + (i * 200), texture: 'player_actions', frame: 'player_idle_0'}));
        };
        // this.enemy = new NPC({scene: this, x: 800, y: 200, texture: 'player_actions', frame: 'player_idle_0'});
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
        this.minimap.zoom = 0.2;
        this.minimap.startFollow(this.player);
        this.minimap.setLerp(0.1, 0.1);
        this.minimapBorder = this.add.rectangle(this.minimap.x - 6, this.minimap.y - 3, this.minimap.width + 4, this.minimap.height + 2);
        this.minimapBorder.setStrokeStyle(2, 0x000000);
        this.minimapBorder.setScrollFactor(0);
        this.minimapBorder.setScale(1 / camera.zoom);
        
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
        this.enemyStateListener();
    };

    enemyStateListener = () => {
        EventEmitter.on('aggressive-enemy', (e) => {
            this.enemies.forEach(enemy => {
                if (enemy.enemyID === e.id) {
                    enemy.isAggressive = e.isAggressive;
                };
            });
        });
    };

    enemyLootDropListener = () => { 
        EventEmitter.on('enemyLootDrop', (e) => {
            e.drops.forEach(drop => this.lootDrops.push(new LootDrop({ scene:this, enemyID:e.enemyID, drop: drop })));
        });
    };

    startJoystick(pointer) {
        if (pointer.leftButtonDown()) {
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

    clearNonAggressiveEnemy = async () => {
        EventEmitter.emit('clear-non-aggressive-enemy');
    };

    clearNPC = async () => {
        EventEmitter.emit('clear-npc');
    };

    setupEnemy = async (data) => {
        EventEmitter.emit('setup-enemy', data);
        this.focus = data;
    };

    setupNPC = async (data) => {
        EventEmitter.emit('setup-npc', data);
        this.focus = data;
    };

    combatEngaged = async (engagement) => {
        if (engagement) { this.combat = true; } else { this.combat = false; };
        EventEmitter.emit('combat-engaged', engagement);
    };

    showDialog = async (dialog) => {
        EventEmitter.emit('show-dialog', dialog);
    };

    stalwart = async (update) => {
        EventEmitter.emit('update-stalwart', update);
    };

    createStateListener = async () => { // Was window.addEventListener()
        EventEmitter.on('update-combat-data', (e) => {
            this.state = e;
        });

        EventEmitter.on('update-game-data', (e) => {
            this.gameState = e;
        });
    };

    staminaListener = async () => {
        EventEmitter.on('updated-stamina', (e) => {
            this.player.stamina = e;
        });
    };

    sendEnemyActionListener = async (enemyID, enemy, damageType, combatStats, weapons, health, actionData, currentTarget) => {
        if (!currentTarget) {
            const data = { enemyID, enemy, damageType, combatStats, weapons, health, actionData, state: this.state };
            EventEmitter.emit('update-enemy-action', data);
        } else {
            if (!this.player.actionSuccess && (this.state.action !== 'counter' && this.state.action !== '')) {
                const actionReset = async () => {
                    this.state.action = '';
                    this.sendStateActionListener();
                };
                await actionReset();
            } else {
                this.sendStateActionListener();
            };
        };
    };

    sendStateActionListener = () => { // Was Async
        if ((this.state.action === 'counter' && this.state.computer_action === '') || (this.state.action === '' && this.state.computer_action === 'counter')) { 
            console.log("--- ERROR --- One Player Is Countering Against Inaction --- ERROR ---");
            return; 
        };
        EventEmitter.emit('update-state-action', this.state);
    };

    sendStateSpecialListener = async (special) => {
        switch (special) {
            case 'invoke':
                EventEmitter.emit('update-state-invoke', this.state);
                break;
            case 'consume':
                this.state.prayerSacrifice = this.state.playerEffects[0].prayer;
                this.state.prayerSacrificeName = this.state.playerEffects[0].name;
                EventEmitter.emit('update-state-consume', this.state);
                break;
            default:
                break;
        };
    };
 
    checkStamina = (value) => {
        switch (value) {
            case 'attack':
                EventEmitter.emit('update-stamina', 25);
                break;
            case 'counter':
                EventEmitter.emit('update-stamina', 10);
                break;
            case 'posture':
                EventEmitter.emit('update-stamina', 15);
                break;
            case 'roll':
                EventEmitter.emit('update-stamina', 15);
                break;
            case 'dodge':
                EventEmitter.emit('update-stamina', 15);
                break;
            default:
                break;
        };   
    };

    drinkFlask = async () => {
        EventEmitter.emit('drink-firewater');
    };

    setState = (key, value) => {
        EventEmitter.emit('update-state', { key, value });
        if (key === 'action') this.checkStamina(value);
    };

    setStateAdd = (key, value) => { // Was Async
        this.state[key] += value;
    };

    setGameState = async (key, value) => {
        this.gameState[key] = value;
    };

    setOnGround = async (key, value) => {
        if (key === 'player') {
            this.isPlayerOnGround = value;
        } else if (key === 'enemy') {
            this.isEnemyOnGround = value;
        };
    };

    setHanging = async (key, value) => {
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
            text.x - text.width * text.originX - 2.5,
            text.y - text.height * text.originY - 2.5, 
            text.width + 5, 
            text.height + 5 
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
                    `So, ${this.ascean.name}, what do you do when you don't know what to do?`,
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
                EventEmitter.emit('update-combat-timer', this.combatTime);
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
        EventEmitter.emit('update-combat-timer', this.combatTime);
    };

    update() {
        this.player.update(); 
        // this.enemy.update();
        this.enemies.forEach((enemy) => enemy.update());
        this.npcs.forEach((npc) => npc.update());
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