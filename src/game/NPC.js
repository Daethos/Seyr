import Phaser from "phaser";
import Entity from "./Entity"; 
import StateMachine, { States } from "./StateMachine";
import HealthBar from "./HealthBar"; 
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
        this.interacting = false;
        this.createNPC();
        this.stateMachine = new StateMachine(this, 'npc');
        this.stateMachine
            .addState(States.IDLE, {
                onEnter: this.onIdleEnter.bind(this), 
                onExit: this.onIdleExit.bind(this),
            }) 
            .addState(States.AWARE, {
                onEnter: this.onAwarenessEnter.bind(this),
                onUpdate: this.onAwarenessUpdate.bind(this),
                onExit: this.onAwarenessExit.bind(this),
            }) 

        this.stateMachine.setState(States.IDLE);
        this.setScale(0.8);
        this.originalPosition = new Phaser.Math.Vector2(this.x, this.y);
        this.originPoint = {}; 
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const colliderWidth = 20; 
        const colliderHeight = 36; 
        const paddingWidth = 10; 
        const paddingHeight = 10; 

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
        console.log(e.detail, "NPC Fetched");
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
                if (other.gameObjectB && other.gameObjectB.name === 'player' && !this.isDead && !other.gameObjectB.inCombat) {
                    if (this.healthbar) this.healthbar.setVisible(true);
                    this.interacting = true;
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
                if (other.gameObjectB && other.gameObjectB.name === 'player' && this.interacting) {
                    if (this.healthbar) this.healthbar.setVisible(false);
                    this.interacting = false;
                    this.stateMachine.setState(States.IDLE); 
                };
            },
            context: this.scene,
        }); 
    }; 

    onIdleEnter = () => {
        this.anims.play('player_idle', true);
    };  
    onIdleExit = () => {
        this.anims.stop('player_idle');
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