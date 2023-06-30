import Phaser from "phaser";
import Entity, { screenShake, pauseGame } from "./Entity"; 
import { worldToTile, tileToWorld } from "./Play";
import StateMachine, { States } from "./StateMachine";
import HealthBar from "./HealthBar";
import ScrollingCombatText from "./ScrollingCombatText";
import playerActionsOnePNG from './images/player_actions.png';
import playerActionsOneJSON from './images/player_actions_atlas.json';
import playerActionsOneAnim from './images/player_actions_anim.json';
import playerActionsTwoPNG from './images/player_actions_two.png';
import playerActionsTwoJSON from './images/player_actions_two_atlas.json';
import playerActionsTwoAnim from './images/player_actions_two_anim.json';
import playerActionsThreePNG from './images/player_actions_three.png';
import playerActionsThreeJSON from './images/player_actions_three_atlas.json';
import playerActionsThreeAnim from './images/player_actions_three_anim.json';
import playerAttacksPNG from './images/player_attacks.png';
import playerAttacksJSON from './images/player_attacks_atlas.json';
import playerAttacksAnim from './images/player_attacks_anim.json'; 
import { v4 as uuidv4 } from 'uuid';

export default class NPC extends Entity {
    static preload(scene) { 
        scene.load.atlas(`player_actions`, playerActionsOnePNG, playerActionsOneJSON);
        scene.load.animation(`player_actions_anim`, playerActionsOneAnim);
        scene.load.atlas(`player_actions_two`, playerActionsTwoPNG, playerActionsTwoJSON);
        scene.load.animation(`player_actions_two_anim`, playerActionsTwoAnim);
        scene.load.atlas(`player_actions_three`, playerActionsThreePNG, playerActionsThreeJSON);
        scene.load.animation(`player_actions_three_anim`, playerActionsThreeAnim);
        scene.load.atlas(`player_attacks`, playerAttacksPNG, playerAttacksJSON);
        scene.load.animation(`player_attacks_anim`, playerAttacksAnim);   
    };

    constructor(data) {
        let { scene } = data;
        super({ ...data, name: "enemy", ascean: scene.state.computer, health: scene.state.new_computer_health }); 
        this.scene.add.existing(this);
        this.enemyID = uuidv4();
        const types = ['Merchant-Alchemy', 'Merchant-Armor', 'Merchant-Smith', 'Merchant-Jewelry', 'Merchant-General', 'Merchant-Tailor', 'Merchant-Mystic', 'Merchant-Weapon'];
        this.npcType = types[Math.floor(Math.random() * types.length)];
        this.npcTarget = null;
        this.createNPC();
        this.stateMachine = new StateMachine(this, 'npc');
        this.stateMachine
            .addState(States.IDLE, {
                onEnter: this.onIdleEnter.bind(this),
                onUpdate: this.onIdleUpdate.bind(this),
                onExit: this.onIdleExit.bind(this),
            }) 
            .addState(States.AWARE, {
                onEnter: this.onAwarenessEnter.bind(this),
                onUpdate: this.onAwarenessUpdate.bind(this),
                onExit: this.onAwarenessExit.bind(this),
            })
            // .addState(States.PATROL, {
            //     onEnter: this.onPatrolEnter.bind(this),
            //     onUpdate: this.onPatrolUpdate.bind(this),
            //     onExit: this.onPatrolExit.bind(this),
            // })
            // .addState(States.LEASH, {
            //     onEnter: this.onLeashEnter.bind(this),
            //     onUpdate: this.onLeashUpdate.bind(this),
            //     onExit: this.onLeashExit.bind(this),
            // }) 

        this.stateMachine.setState(States.IDLE);
        this.setScale(0.8);
        this.originalPosition = new Phaser.Math.Vector2(this.x, this.y);
        this.originPoint = {}; // For Leashing
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const colliderWidth = 20; // Original width of the collider
        const colliderHeight = 36; // Original height of the collider
        const paddingWidth = 10; // Padding to be added to the width
        const paddingHeight = 10; // Padding to be added to the height

        const paddedWidth = colliderWidth + 2 * paddingWidth;
        const paddedHeight = colliderHeight + 2 * paddingHeight;
        let npcCollider = Bodies.rectangle(this.x, this.y + 10, colliderWidth, colliderHeight, { isSensor: false, label: 'npcCollider' });
        npcCollider.boundsPadding = { x: paddedWidth, y: paddedHeight };
        let npcSensor = Bodies.circle(this.x, this.y + 2, 48, { isSensor: true, label: 'npcSensor' });
        const compoundBody = Body.create({
            parts: [npcCollider, npcSensor],
            frictionAir: 0.1, 
            restitution: 0.3,
            friction: 0.15,
        });
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation();
        this.npcSensor = npcSensor;
        this.npcCollision(npcSensor); 
    }; 

    createNPC = () => {
        const fetch = new CustomEvent('fetch-npc', { detail: { enemyID: this.enemyID, npcType: this.npcType } });
        window.dispatchEvent(fetch); 
        window.addEventListener('npc-fetched', this.npcFetchedFinishedListener.bind(this));
    };

    npcFetchedFinishedListener(e) {
        if (this.enemyID !== e.detail.enemyID) return;
        console.log(e.detail, "NPC Fetched")
        this.ascean = e.detail.game;
        this.health = e.detail.combat.attributes.healthTotal;
        this.combatStats = e.detail.combat;
        this.healthbar = new HealthBar(this.scene, this.x, this.y, this.health);
        window.removeEventListener('npc-fetched', this.npcFetchedFinishedListener);
    };

    npcCollision = (npcSensor) => {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [npcSensor],
            callback: other => {
                if (other.gameObjectB && other.gameObjectB.name === 'player' && !this.isDead) {
                    if (this.healthbar) this.healthbar.setVisible(true);
                    this.scene.setupNPC({ id: this.enemyID, game: this.ascean, enemy: this.combatStats, health: this.combatStats.attributes.healthTotal, type: this.npcType });
                    this.npcTarget = other.gameObjectB;
                    this.stateMachine.setState(States.AWARE);
                };
            },
            context: this.scene,
        });
        this.scene.matterCollision.addOnCollideEnd({
            objectA: [npcSensor],
            callback: other => {
                if (other.gameObjectB && other.gameObjectB.name === 'player') {
                    if (this.healthbar) this.healthbar.setVisible(false);
                    this.stateMachine.setState(States.IDLE); 
                };
            },
            context: this.scene,
        }); 
    };
  

    onIdleEnter = () => {
        this.anims.play('player_idle', true);
    }; 
    onIdleUpdate = (dt) => {
        // this.idleWait -= dt;
        // if (this.idleWait <= 0) {
        //     this.idleWait = 5000;
        //     if (this.stateMachine.isCurrentState(States.IDLE)) this.stateMachine.setState(States.PATROL);
        // };
    };
    onIdleExit = () => {
        this.anims.stop('player_idle');
    };

    onLeashEnter = () => {
        console.log("Leashing NPC to Origin Point of Encounter");
        this.anims.play('player_running', true);
        if (this.attacking) {
            this.attacking.inCombat = false;
            this.attacking = null;
        };
        this.scene.combatEngaged(false);
        this.leashTimer = this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                let originPoint = new Phaser.Math.Vector2(this.originPoint.x, this.originPoint.y);
                this.scene.navMesh.debugDrawClear();
                this.path = this.scene.navMesh.findPath(this.position, originPoint);
                console.log(this.path, "Path");
                if (this.path && this.path.length > 1) {
                    if (!this.isPathing) this.isPathing = true;
                    const nextPoint = this.path[1];
                    console.log(nextPoint, "Next Point In Path");
                    this.nextPoint = nextPoint;
                    this.scene.navMesh.debugDrawPath(this.path, 0xffd900);
                    console.log(this.path, "Paths", this.nextPoint, "Next Point", this.position, "Enemy Position");
                    const pathDirection = new Phaser.Math.Vector2(this.nextPoint.x, this.nextPoint.y);
                    this.pathDirection = pathDirection;
                    this.pathDirection.subtract(this.position);
                    console.log(this.pathDirection, pathDirection, "Path Direction");
                    this.pathDirection.normalize();
                    console.log(this.pathDirection, "Path Direction Normalized");
                    
                    const distanceToNextPoint = Math.sqrt((this.nextPoint.x - this.position.x) ** 2 + (this.nextPoint.y - this.position.y) ** 2);
                    console.log(distanceToNextPoint, "Distance to Next Point");
                    if (distanceToNextPoint < 10) {
                        console.log("NPC Reached Next Point");
                        this.path.shift();
                    };
                };
            },
            callbackScope: this,
            loop: true
        }); 
    };
    onLeashUpdate = (dt) => {
        let originPoint = new Phaser.Math.Vector2(this.originPoint.x, this.originPoint.y);
        let direction = originPoint.subtract(this.position);
        
        if (direction.length() >= 10) {
            if (this.path && this.path.length > 1) {
                this.setVelocity(this.pathDirection.x * 2.5, this.pathDirection.y * 2.5);
            } else {
                if (this.isPathing) this.isPathing = false;
                direction.normalize();
                this.setVelocity(direction.x * 2.5, direction.y * 2.5);
            };
        } else {
            this.stateMachine.setState(States.IDLE);
        };
    };
    onLeashExit = () => {
        console.log("NPC Leashed to Origin Point of Encounter");
        this.anims.stop('player_running');
        this.setVelocity(0, 0);
        this.leashTimer.destroy();
        this.leashTimer = null;
        this.scene.navMesh.debugDrawClear(); 
    };

    onPatrolEnter = () => {
        this.anims.play('player_running', true); 
        const patrolDirection = new Phaser.Math.Vector2(Math.random() - 0.5, Math.random() - 0.5).normalize();
        if (patrolDirection.x < 0) { this.flipX = true };
        const patrolSpeed = 1;
        this.patrolVelocity = { x: patrolDirection.x * patrolSpeed, y: patrolDirection.y * patrolSpeed };
        const delay = Phaser.Math.RND.between(2000, 3000);
        this.patrolTimer = this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                const wasX = this.flipX;
                this.scene.tweens.add({
                    delay: 1000,
                    targets: this,
                    x: this.originalPosition.x,
                    y: this.originalPosition.y,
                    duration: delay,
                    onUpdate: () => {
                        if (this.flipX === wasX) this.flipX = !this.flipX;
                    },
                    onComplete: () => { 
                        this.setVelocity(0, 0);
                        if (this.stateMachine.isCurrentState(States.PATROL)) this.stateMachine.setState(States.IDLE);
                    }
                });
            },
            callbackScope: this,
            loop: false,
        });
    }; 
    onPatrolUpdate = (dt) => { 
        this.setVelocity(this.patrolVelocity.x, this.patrolVelocity.y);
    };
    onPatrolExit = () => {
        this.anims.stop('player_running');
        this.patrolTimer.destroy();
    };

    onAwarenessEnter = () => {
        console.log("Aware of Player")
        this.anims.play('player_idle', true);
        this.scene.showDialog(true);
        this.setVelocity(0);
    };
    onAwarenessUpdate = (dt) => {
        if (this.npcTarget) {
            const direction = this.npcTarget.position.subtract(this.position);
            if (direction.x < 0) { this.flipX = true } else { this.flipX = false };
        };
    };
    onAwarenessExit = () => {
        this.anims.stop('player_idle');
        this.scene.showDialog(false);
    };

    update = () => {
        this.stateMachine.update(this.scene.sys.game.loop.delta);
        if (this.healthbar) this.healthbar.update(this);
    };
};