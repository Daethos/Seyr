import Phaser from 'phaser';
import Player from '../entities/Player';
import Enemy from '../entities/Enemy';
import NPC from '../entities/NPC';
// import Treasure from '../matter/Treasure';
import NewText from '../phaser/NewText'
import stick from '../images/stick.png';
import base from '../images/base.png';
import ParticleManager from '../phaser/ParticleManager';
import LootDrop from '../matter/LootDrop';
import EventEmitter from '../phaser/EventEmitter';
import { getCombatFetch, setStalwart, getNpcSetupFetch, getEnemySetupFetch, clearNonAggressiveEnemy, setCaerenic } from '../reducers/combatState';
import { getDrinkFirewaterFetch } from '../reducers/gameState';
import CombatMachine from '../phaser/CombatMachine';
import { Mrpas } from 'mrpas';

export const { Bodies } = Phaser.Physics.Matter.Matter;
export const worldToTile = (tile) => Math.floor(tile / 32);
export const tileToWorld = (tile) => tile * 32 + 16;
export const alignToGrid = (tile) => tileToWorld(worldToTile(tile));

export default class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play', active: false });
        this.centerX = 480;
        this.centerY = 320;
    };
    
    init() {
        this.state = {};
        this.gameState = {};
        this.dispatch = null;

        EventEmitter.once('get-ascean', this.asceanOn);
        EventEmitter.once('get-combat-data', this.stateOn);
        EventEmitter.once('get-game-data', this.gameStateOn);
        EventEmitter.once('get-dispatch', this.dispatchOn);
        EventEmitter.emit('request-dispatch');
        EventEmitter.emit('request-ascean');
        EventEmitter.emit('request-combat-data');
        EventEmitter.emit('request-game-data');
        this.enemy = {};
        this.npcs = [];
        this.combat = false;
        this.focus = {}; 
        this.enemies = [];
        this.particleManager = {};
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
        this.combatMachine = null;
        this.isEnemyHanging = false;
        this.isEnemyOnGround = true;
        this.minimap = null;
        this.combatTime = 0;
        this.combatTimer = null;
        this.lootDrops = [];
        this.players = [];
    }; 

    asceanOn = (e) => this.ascean = e;
    dispatchOn = (e) => this.dispatch = e;
    gameStateOn = (e) => this.gameState = e;
    stateOn = (e) => this.state = e;
    
    create() { 
        this.input.setDefaultCursor('url(' + process.env.PUBLIC_URL + '/images/cursor.png), pointer'); 
        
        // ================== Ascean Test Map ================== \\
        const map = this.make.tilemap({ key: 'ascean_test' });
        this.map = map;
        const camps = map.addTilesetImage('Camp_Graves', 'Camp_Graves', 32, 32, 0, 0);
        const decorations = map.addTilesetImage('AncientForestDecorative', 'AncientForestDecorative', 32, 32, 0, 0);
        const tileSet = map.addTilesetImage('AncientForestMain', 'AncientForestMain', 32, 32, 0, 0);
        const layer0 = map.createLayer('Tile Layer 0 - Base', tileSet, 0, 0);
        const layer1 = map.createLayer('Tile Layer 1 - Top', tileSet, 0, 0);
        const layerC = map.createLayer('Tile Layer - Construction', tileSet, 0, 0);
        const layer2 = map.createLayer('Tile Layer 2 - Flowers', decorations, 0, 0);
        const layer3 = map.createLayer('Tile Layer 3 - Plants', decorations, 0, 0);
        const layer4 = map.createLayer('Tile Layer 4 - Primes', decorations, 0, 0);
        const layer5 = map.createLayer('Tile Layer 5 - Snags', decorations, 0, 0);
        const layer6 = map.createLayer('Tile Layer 6 - Camps', camps, 0, 0);
        layer0.setCollisionByProperty({ collides: true });
        layer1.setCollisionByProperty({ collides: true });
        layerC.setCollisionByProperty({ collides: true });
        this.matter.world.convertTilemapLayer(layer0);
        this.matter.world.convertTilemapLayer(layer1);
        this.matter.world.convertTilemapLayer(layerC);
        // this.matter.world.convertTilemapLayer(layer2);
        // this.matter.world.convertTilemapLayer(layer3);
        // this.matter.world.convertTilemapLayer(layer4);
        // this.matter.world.convertTilemapLayer(layer5); 
        // this.matter.world.createDebugGraphic(); 

        const objectLayer = map.getObjectLayer('navmesh');
        const navMesh = this.navMeshPlugin.buildMeshFromTiled("navmesh", objectLayer, 32);
        this.navMesh = navMesh;
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        this.navMesh.enableDebug(debugGraphics); 
        this.matter.world.setBounds(0, 0, 4096, 4096); // Top Down

        // this.fov = new Mrpas(this.map.width, this.map.height, (x, y) => {
        //     const tile = this.groundLayer.getTileAt(x, y);
        //     return tile 
        //     // && !tile.collides;
        // });

        this.player = new Player({ scene: this, x: 200, y: 200, texture: 'player_actions', frame: 'player_idle_0' });
        this.map.getObjectLayer('Enemies').objects.forEach(enemy => this.enemies.push(new Enemy({ scene: this, x: enemy.x, y: enemy.y, texture: 'player_actions', frame: 'player_idle_0' })));
        this.map.getObjectLayer('Npcs').objects.forEach(npc => this.npcs.push(new NPC({ scene: this, x: npc.x, y: npc.y, texture: 'player_actions', frame: 'player_idle_0' })));
        // this.map.getObjectLayer('Treasures').objects.forEach(treasure => this.enemies.push(new Treasure({ scene: this, treasure })));

        // ====================== Combat Machine ====================== \\

        this.combatMachine = new CombatMachine(this, this.dispatch);
        this.particleManager = new ParticleManager(this);


        // ====================== Input Keys ====================== \\

        this.player.holdingBothMouseButtons = false;
        
        this.input.on('pointerdown', (pointer) => {
            if (pointer.rightButtonDown()) {
                this.player.holdingBothMouseButtons = true;
                this.player.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);
            };
        });

        this.input.on('pointermove', (pointer) => {
            if (this.player.holdingBothMouseButtons) { 
                this.player.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.worldX, pointer.worldY);
            };
        });
        
        this.input.on('pointerup', (pointer) => {
            if (!pointer.rightButtonDown()) this.player.holdingBothMouseButtons = false;
        });
          
        // Disable the default context menu when right-clicking on the Phaser canvas
        this.game.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
  
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
            target: this.input.keyboard.addKeys('TAB'),
            snare: this.input.keyboard.addKeys('V'),
            stalwart: this.input.keyboard.addKeys('G'),
        }; 

        this.target = this.add.sprite(0, 0, "target").setScale(0.15).setVisible(false);


        // ====================== Camera ====================== \\
          
        let camera = this.cameras.main;
        camera.zoom = 1.5;
        camera.startFollow(this.player);
        camera.setLerp(0.1, 0.1);
        camera.setBounds(0, 0, 4096, 4096);  
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

        const darkOverlay = this.add.graphics();
        darkOverlay.fillStyle(0x000000, 0.5); // Black with 50% opacity
        darkOverlay.fillRect(0, 0, 4096, 4096);

        this.input.keyboard.on('keydown-Z', () => {
            if (this.minimap.visible) {
                this.minimap.visible = false;
                this.minimapBorder.visible = false;
            } else {
                this.minimap.visible = true;
                this.minimapBorder.visible = true;
            };
        });

        // =========================== Lighting =========================== \\

        // const width = 960 * 2;
        // const height = 640 * 2;
        // const rt = this.make.renderTexture({
        //     width,
        //     height
        // }, true);
        // const shader = this.add.shader('Light2D', 0, 0, width, height, ['uMainSampler'], rt);
        // rt.fill(0x000000, 1);
        // rt.draw(layer0, 0, 0); 
        // rt.setTint(0x808080);

        // const vision = this.make.image({
        //     x: this.player.x,
        //     y: this.player.y,
        //     key: 'vision',
        //     add: false
        // })
        // vision.scale = 5;
        // rt.mask = new Phaser.Display.Masks.BitmapMask(this, vision);
        // rt.mask.invertAlpha = true;
        // rt.setScrollFactor(0);
        // this.vision = vision;

        this.lights.enable();
        this.playerLight = this.add.pointlight(this.player.x, this.player.y, 0xDAA520, 200, 0.0675, 0.0675); // 0xFFD700 || 0xFDF6D8 || 0xDAA520

        // =========================== Listeners =========================== \\

        this.createWelcome(); 
        this.stateListener(); 
        this.staminaListener();
        this.enemyLootDropListener();
        this.enemyStateListener();
        // this.addPlayerListener();
        // this.removePlayerListener();
        // this.multiplayerListeners();

        // =========================== Music =========================== \\
        this.music = this.sound.add('background', { volume: this.gameState.soundEffectVolume, loop: true, delay: 5000 });
        this.music.play();

        // =========================== FPS =========================== \\

        this.fpsText = this.add.text(430, 110, 'FPS: ', { font: '16px Cinzel', fill: '#fdf6d8' });
        this.fpsText.setScrollFactor(0);
    };

    // ============================ Camera ============================ \\

    // computerFov = () => {
    //     if (!this.fov || !this.map || !this.player || !this.groundLayer) return;
    //     const camera = this.cameras.main;
    //     const bounds = new Phaser.Geom.Rectangle(
    //         this.map.worldToTileX(camera.worldView.x) - 1,
    //         this.map.worldToTileY(camera.worldView.y) - 1,
    //         this.map.worldToTileX(camera.worldView.width) + 2,
    //         this.map.worldToTileY(camera.worldView.height) + 2 // 3
    //     );

    //     for (let y = bounds.y; y < bounds.y + bounds.height; y++) {
    //         for (let x = bounds.x; x < bounds.x + bounds.width; x++) {
    //             if (y < 0 || y >= this.map.height || x < 0 || x >= this.map.width) continue;
    //             const tile = this.groundLayer.getTileAt(x, y);
    //             if (!tile) continue;
    //             tile.alpha = 1;
    //             tile.tint = 0x404040;
    //         };
    //     };

    //     const { px, py } = this.map.worldToTileXY(this.player.x, this.player.y);

    //     this.fov.compute(px, py, 1, 
    //         (x, y) => { 
    //             const tile = this.groundLayer.getTileAt(x, y);
    //             if (!tile) return;
    //             return tile.tint === 0xffffff;
    //             // return tile.alpha > 0;
    //         },
    //         (x, y) => {
    //             const tile = this.groundLayer.getTileAt(x, y);
    //             if (!tile) return;
    //             const distance = Phaser.Math.Distance.Between(py, px, y, x);
    //             const alpha = Math.min(2 - distance / 6, 1);

    //             // tile.alpha = 1;
    //             tile.tint = 0xffffff;
    //             tile.alpha =  alpha;
    //     });
    // };

    // ================== Combat ================== \\

    // multiplayerListeners = () => {
    //     EventEmitter.emit('addPlayer', { id: this.player.playerID, x: this.player.x, y: this.player.y });
    //     EventEmitter.on('playerMoved', (e) => {
    //         this.players.forEach(player => {
    //             if (player.playerID === e.id) { 
    //                 player.setPosition(e.x, e.y);
    //             };
    //         });
    //     });
    //     EventEmitter.on('currentPlayers', this.currentPlayers);
    //     EventEmitter.on('playerAdded', this.addPlayer);
    //     EventEmitter.on('playerRemoved', this.removePlayer);
    // };

    // addPlayer = (e) => {
    //     if (e.id !== this.player.playerID) this.players.push(new Player({ scene: this, x: e.x, y: e.y, texture: 'player_actions', frame: 'player_idle_0' }));
    // };
    // currentPlayers = (e) => {
    //     Object.keys(e).forEach((id) => {
    //         if (e[id].playerID !== this.player.playerID) this.players.push(new Player({ scene: this, x: e[id].x, y: e[id].y, texture: 'player_actions', frame: 'player_idle_0' }));
    //     });
    // };
    // removePlayer = (e) => {
    //     this.players = this.players.filter(player => player.playerID !== e.id); 
    // };
    // addPlayerListener = () => EventEmitter.on('add-player', this.addPlayer);
    // removePlayerListener = () => EventEmitter.on('remove-player', this.removePlayer);

    // ================== Listeners ================== \\

    enemyLootDropListener = () => EventEmitter.on('enemyLootDrop', (e) => { e.drops.forEach(drop => this.lootDrops.push(new LootDrop({ scene:this, enemyID: e.enemyID, drop }))); });
    enemyStateListener = () => EventEmitter.on('aggressive-enemy', (e) => { this.enemies.forEach(enemy => enemy.enemyID === e.id ? enemy.isAggressive = e.isAggressive : null ); });
    staminaListener = () => EventEmitter.on('updated-stamina', (e) => this.player.stamina = e); 
    stateListener = () => EventEmitter.on('update-combat-data', (e) => this.state = e); 

    // ============================ Combat ============================ \\ 
    polymorph = (id) => {
        let enemy = this.enemies.find(enemy => enemy.enemyID === id);
        enemy.isPolymorphed = true;
    };
    root = () => {
        const { worldX, worldY } = this.input.activePointer;
        const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, worldX, worldY);
        const duration = 2 * distance;
        const rise = 0.5 * distance;

        const sensorRadius = 25;
        const sensorBounds = new Phaser.Geom.Circle(worldX, worldY, sensorRadius);

        const rootTween = this.add.tween({
            targets: this.target,
            props: {
                x: { from: this.player.x, to: worldX, duration: duration },
                y: { from: this.player.y, to: worldY, duration: duration },
        
                z: {
                    from: 0,
                    to: -rise,
                    duration: 0.5 * duration,
                    ease: 'Quad.easeOut',
                    yoyo: true
                },
                onStart: () => {
                    this.target.setVisible(true);
                },    
                onUpdate: (_tween, target, key, current) => {
                    if (key !== 'z') return;
                    target.y += current;
                }, 
            },
        });
        this.time.addEvent({
            delay: duration,
            callback: () => { 
                this.enemies.forEach(enemy => {
                    if (Phaser.Geom.Circle.ContainsPoint(sensorBounds, new Phaser.Geom.Point(enemy.x, enemy.y))) {
                        enemy.isRooted = true;
                    };
                });
            },
            callbackScope: this
        });
        this.time.addEvent({
            delay: 3000,
            callback: () => {
                this.target.setVisible(false);
                rootTween.destroy();
            },
            callbackScope: this
        });
    };
    snare = (id) => {
        let enemy = this.enemies.find(enemy => enemy.enemyID === id);
        enemy.isSnared = true;
    };

    // ============================ Game ============================ \\
    
    checkPlayerSuccess = () => {
        if (!this.player.actionSuccess && (this.state.action !== 'counter' && this.state.action !== 'roll' && this.state.action !== '')) this.combatMachine.input('action', '');
    };
    clearNAEnemy = () => this.dispatch(clearNonAggressiveEnemy()); 
    clearNPC = () => EventEmitter.emit('clear-npc'); 
    combatEngaged = (bool) => {
        if (bool) { this.combat = true; } else { this.combat = false; };
        this.dispatch(getCombatFetch(bool));
    };
    drinkFlask = () => this.dispatch(getDrinkFirewaterFetch(this.state.player._id));
    setupEnemy = (enemy) => {
        const data = { id: enemy.enemyID, game: enemy.ascean, enemy: enemy.combatStats, health: enemy.health, isAggressive: enemy.isAggressive, startedAggressive: enemy.startedAggressive, isDefeated: enemy.isDefeated, isTriumphant: enemy.isTriumphant };
        this.dispatch(getEnemySetupFetch(data));
    };
    setupNPC = (npc) => {
        const data = { id: npc.npcID, game: npc.ascean, enemy: npc.combatStats, health: npc.health, type: npc.npcType };
        this.dispatch(getNpcSetupFetch(data));
    };
    showDialog = (dialog) => EventEmitter.emit('show-dialog', dialog);

    // ============================ Player ============================ \\

    caerenic = (bool) => this.dispatch(setCaerenic(bool));
    stalwart = (bool) => this.dispatch(setStalwart(bool));
    useStamina = (value) => EventEmitter.emit('update-stamina', value);

    setOnGround = (key, value) => {
        if (key === 'player') {
            this.isPlayerOnGround = value;
        } else if (key === 'enemy') {
            this.isEnemyOnGround = value;
        };
    };

    setHanging = (key, value) => {
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

    startCombatTimer = () => {
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

    stopCombatTimer = () => {
        this.combatTimer.destroy();
        this.combatTimer = null;
        this.combatTime = 0;
        EventEmitter.emit('update-combat-timer', this.combatTime);
    };

    // ================= Joystick ================= \\

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

    // ================== Update ================== \\
    update() {
        this.player.update(); 
        this.enemies.forEach((enemy) => enemy.update());
        this.npcs.forEach((npc) => npc.update());
        this.combatMachine.processor();

        this.playerLight.setPosition(this.player.x, this.player.y);
        this.fpsText.setText('FPS: ' + this.game.loop.actualFps.toFixed(2));

        // this.computerFov();
        // if (this.vision) this.vision.setPosition(this.player.x, this.player.y);
    };
    pause() {
        this.scene.pause();
        this.music.pause();
    };
    resume() {
        this.scene.resume();
        this.music.resume();
    };
};