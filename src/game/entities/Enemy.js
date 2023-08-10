import Phaser from "phaser";
import Entity, { screenShake } from "./Entity"; 
import StateMachine, { States } from "../phaser/StateMachine";
import HealthBar from "../phaser/HealthBar";
import ScrollingCombatText from "../phaser/ScrollingCombatText";
import playerActionsOnePNG from '../images/player_actions.png';
import playerActionsOneJSON from '../images/player_actions_atlas.json';
import playerActionsOneAnim from '../images/player_actions_anim.json';
import playerActionsTwoPNG from '../images/player_actions_two.png';
import playerActionsTwoJSON from '../images/player_actions_two_atlas.json';
import playerActionsTwoAnim from '../images/player_actions_two_anim.json';
import playerActionsThreePNG from '../images/player_actions_three.png';
import playerActionsThreeJSON from '../images/player_actions_three_atlas.json';
import playerActionsThreeAnim from '../images/player_actions_three_anim.json';
import playerAttacksPNG from '../images/player_attacks.png';
import playerAttacksJSON from '../images/player_attacks_atlas.json';
import playerAttacksAnim from '../images/player_attacks_anim.json'; 
import { v4 as uuidv4 } from 'uuid';
import EventEmitter from "../phaser/EventEmitter";

export default class Enemy extends Entity {

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
        super({ ...data, name: "enemy", ascean: null, health: 1 }); 
        this.scene.add.existing(this);
        this.enemyID = uuidv4();
        this.createEnemy(); 
        this.stateMachine = new StateMachine(this, 'enemy');
        this.stateMachine
            .addState(States.IDLE, {
                onEnter: this.onIdleEnter.bind(this),
                onUpdate: this.onIdleUpdate.bind(this),
                onExit: this.onIdleExit.bind(this),
            })
            .addState(States.PATROL, {
                onEnter: this.onPatrolEnter.bind(this),
                onUpdate: this.onPatrolUpdate.bind(this),
                onExit: this.onPatrolExit.bind(this),
            })
            .addState(States.AWARE, {
                onEnter: this.onAwarenessEnter.bind(this),
                onUpdate: this.onAwarenessUpdate.bind(this),
                onExit: this.onAwarenessExit.bind(this),
            })
            .addState(States.CHASE, {
                onEnter: this.onChaseEnter.bind(this),
                onUpdate: this.onChaseUpdate.bind(this),
                onExit: this.onChaseExit.bind(this),
            })
            .addState(States.COMBAT, {
                onEnter: this.onCombatEnter.bind(this),
                onUpdate: this.onCombatUpdate.bind(this),
                onExit: this.onCombatExit.bind(this),
            })
            .addState(States.EVADE, {
                onEnter: this.onEvasionEnter.bind(this),
                onUpdate: this.onEvasionUpdate.bind(this),
                onExit: this.onEvasionExit.bind(this),
            })
            .addState(States.LEASH, {
                onEnter: this.onLeashEnter.bind(this),
                onUpdate: this.onLeashUpdate.bind(this),
                onExit: this.onLeashExit.bind(this),
            })
            .addState(States.ATTACK, {
                onEnter: this.onAttackEnter.bind(this),
                onUpdate: this.onAttackUpdate.bind(this),
                onExit: this.onAttackExit.bind(this),
            })
            .addState(States.COUNTER, {
                onEnter: this.onCounterEnter.bind(this),
                onUpdate: this.onCounterUpdate.bind(this),
                onExit: this.onCounterExit.bind(this),
            })
            .addState(States.DODGE, {
                onEnter: this.onDodgeEnter.bind(this),
                onUpdate: this.onDodgeUpdate.bind(this),
                onExit: this.onDodgeExit.bind(this),
            })
            .addState(States.POSTURE, {
                onEnter: this.onPostureEnter.bind(this),
                onUpdate: this.onPostureUpdate.bind(this),
                onExit: this.onPostureExit.bind(this),
            })
            .addState(States.ROLL, {
                onEnter: this.onRollEnter.bind(this),
                onUpdate: this.onRollUpdate.bind(this),
                onExit: this.onRollExit.bind(this),    
            })
            .addState(States.STUN, {
                onEnter: this.onStunEnter.bind(this),
                onUpdate: this.onStunUpdate.bind(this),
                onExit: this.onStunExit.bind(this),
            })
            .addState(States.CONSUMED, {
                onEnter: this.onConsumedEnter.bind(this),
                onUpdate: this.onConsumedUpdate.bind(this),
                onExit: this.onConsumedExit.bind(this),
            })
            .addState(States.HURT, {
                onEnter: this.onHurtEnter.bind(this),
                onUpdate: this.onHurtUpdate.bind(this),
            })
            .addState(States.DEATH, {
                onEnter: this.onDeathEnter.bind(this),
            })
            .addState(States.DEFEATED, {
                onEnter: this.onDefeatedEnter.bind(this),
            })

        this.stateMachine.setState(States.IDLE);
        this.setScale(0.8);
        this.isAttacking = false;
        this.isCountering = false;
        this.isDodging = false;
        this.isPosturing = false;
        this.isRolling = false;
        this.inCombat = false;
        this.isConsuming = false;
        this.isCrouching = false;
        this.isJumping = false;
        this.isHanging = false;
        this.isHealing = false;
        this.isPraying = false;
        this.rollCooldown = 0;
        this.dodgeCooldown = 0;
        this.enemySensor = null;
        this.waiting = 30;
        this.idleWait = 3000;
        this.patrolTimer = null;
        this.patrolReverse = null;
        this.patrolWait = 500;
        this.patrolVelocity = 1;
        this.attackSensor = null;
        this.attackTimer = null;
        this.combatThreshold = 0;
        this.attackIsLive = false;
        this.isEnemy = true;
        this.isAggressive = Math.random() > 0.5;
        this.startedAggressive = this.isAggressive;
        this.isDefeated = false;
        this.isTriumphant = false;
        this.currentWeapon = null;
        this.isCurrentTarget = false;
        this.counterAction = '';
        this.originalPosition = new Phaser.Math.Vector2(this.x, this.y);
        this.originPoint = {}; // For Leashing
        this.isConsumed = false;
        this.sensorDisp = 12;
        this.colliderDisp = 16;
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const colliderWidth = 20; 
        const colliderHeight = 36; 
        const paddingWidth = 10;         
        const paddingHeight = 10; 

        const paddedWidth = colliderWidth + 2 * paddingWidth;
        const paddedHeight = colliderHeight + 2 * paddingHeight;
        let enemyCollider = Bodies.rectangle(this.x, this.y + 10, colliderWidth, colliderHeight, { isSensor: false, label: 'enemyCollider' });
        enemyCollider.boundsPadding = { x: paddedWidth, y: paddedHeight };
        let enemySensor = Bodies.circle(this.x, this.y + 2, 48, { isSensor: true, label: 'enemySensor' });
        const compoundBody = Body.create({
            parts: [enemyCollider, enemySensor],
            frictionAir: 0.1, 
            restitution: 0.3,
            friction: 0.15,
        });
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation();
        this.enemyStateListener();
        this.enemySensor = enemySensor;
        this.enemyCollision(enemySensor);
    };

    isNewEnemy = (player) => {
        return !player.targets.some(obj => obj.enemyID === this.enemyID);
    };

    playerStatusCheck = (other) => {
        return (this.ascean && other && other.name === 'player' && !other.inCombat);
    };

    enemyStatusCheck = () => {
        return (!this.isDead && !this.isDefeated && !this.isTriumphant && !this.inCombat && this.isAggressive);
    };
    
    enemyCollision = (enemySensor) => {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [enemySensor],
            callback: other => {
                if (this.ascean && other.gameObjectB && other.gameObjectB.name === 'player' && this.enemyStatusCheck()) {
                    // this.attacking = other.gameObjectB;
                    // this.inCombat = true;
                    // const newEnemy = this.isNewEnemy(other.gameObjectB);
                    // if (newEnemy) other.gameObjectB.targets.push(this);
                    // if (this.healthbar) this.healthbar.setVisible(true);
                    // this.originPoint = new Phaser.Math.Vector2(this.x, this.y).clone();
                    // this.stateMachine.setState(States.CHASE); 
                    // this.actionTarget = other;
                    // if (!other.gameObjectB.attacking) { // inCombat
                    //     if (this.scene.state.enemyID !== this.enemyID) this.scene.setupEnemy(this);
                    //     other.gameObjectB.inCombat = true;
                    //     other.gameObjectB.attacking = this;
                    //     other.gameObjectB.currentTarget = this;
                    //     console.log('Computer Engaging Combat: [Collide Start]');
                    //     this.scene.combatEngaged(true);
                    // };
                    this.createCombat(other, 'start');
                } else if (this.playerStatusCheck(other.gameObjectB) && !this.isDead && !this.isAggressive) {
                    const newEnemy = this.isNewEnemy(other.gameObjectB);
                    if (newEnemy) other.gameObjectB.targets.push(this);
                    if (this.healthbar) this.healthbar.setVisible(true);
                    if (this.scene.state.enemyID !== this.enemyID) this.scene.setupEnemy(this);
                    this.originPoint = new Phaser.Math.Vector2(this.x, this.y).clone();
                    if (this.stateMachine.isCurrentState(States.DEFEATED)) {
                        this.scene.showDialog(true);
                    } else {
                        this.stateMachine.setState(States.AWARE);
                    };
                };
            },
            context: this.scene,
        });
        this.scene.matterCollision.addOnCollideActive({
            objectA: [enemySensor],
            callback: other => {
                if (this.playerStatusCheck(other.gameObjectB) && this.enemyStatusCheck() && !this.isAttacking) {
                    // this.attacking = other.gameObjectB;
                    // this.inCombat = true;
                    // const newEnemy = this.isNewEnemy(other.gameObjectB);
                    // if (newEnemy) {
                    //     if (this.scene.state.enemyID !== this.enemyID) this.scene.setupEnemy(this);
                    //     other.gameObjectB.targets.push(this);
                    // };
                    // if (this.healthbar) this.healthbar.setVisible(true);
                    // this.originPoint = new Phaser.Math.Vector2(this.x, this.y).clone();
                    // this.stateMachine.setState(States.CHASE); 
                    // this.actionTarget = other;
                    // other.gameObjectB.inCombat = true;
                    // other.gameObjectB.attacking = this;
                    // other.gameObjectB.currentTarget = this;
                    // if (!other.gameObjectB.attacking) { // !scene.combat || !scene.state.combatEngaged
                    //     console.log('Computer Engaging Combat: [Collide Active]');
                    //     this.scene.combatEngaged(true);
                    // };
                    this.createCombat(other, 'during');
                };
            },
            context: this.scene,
        }); 
        this.scene.matterCollision.addOnCollideEnd({
            objectA: [enemySensor],
            callback: other => {
                if (this.playerStatusCheck(other.gameObjectB) && !this.isDead && !this.isAggressive) {
                    if (this.healthbar) this.healthbar.setVisible(false);
                    if (this.isDefeated) {
                        this.scene.showDialog(false);
                        this.stateMachine.setState(States.DEFEATED);
                    } else {
                        this.stateMachine.setState(States.IDLE);
                    };
                    this.scene.clearNonAggressiveEnemy();
                };
            },
            context: this.scene,
        });
    };

    enemyFetchedOn = (e) => {
        if (this.enemyID !== e.enemyID) return;
        this.ascean = e.game;
        this.health = e.game.health.total;
        this.combatStats = e.combat; 
        this.weapons = [e.combat.combat_weapon_one, e.combat.combat_weapon_two, e.combat.combat_weapon_three];
        
        this.createWeapon(e.game.weapon_one); 
        this.createShield(e.game.shield);

        this.healthbar = new HealthBar(this.scene, this.x, this.y, this.health);
        EventEmitter.off('enemy-fetched', this.enemyFetchedOn.bind(this));
    };

    createEnemy = () => {
        const fetch = { enemyID: this.enemyID, level: this.scene.state.player.level };
        EventEmitter.emit('fetch-enemy', fetch);
        EventEmitter.on('enemy-fetched', this.enemyFetchedOn.bind(this));
    };

    createShield = (shield) => {
        const shieldName = this.imgSprite(shield);
        this.spriteShield = new Phaser.GameObjects.Sprite(this.scene, 0, 0, shieldName);
        this.spriteShield.setScale(0.6);
        this.spriteShield.setOrigin(0.5, 0.5);
        this.scene.add.existing(this.spriteShield);
        this.spriteShield.setVisible(false);
    };

    createWeapon = (weapon) => {
        const weaponName = this.imgSprite(weapon); 
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, weaponName);
        this.setWeapon(weapon);
        this.checkDamage(weapon.damage_type[0].toLowerCase());
        this.checkMeleeOrRanged(weapon);
        if (weapon.grip === 'Two Hand') {
            this.spriteWeapon.setScale(0.65);
        } else {
            this.spriteWeapon.setScale(0.5);
        };
        this.spriteWeapon.setOrigin(0.25, 1);
        this.scene.add.existing(this.spriteWeapon);
        this.spriteWeapon.setAngle(-195);
    };

    attackInterval() {
        if (this.currentWeapon) {
            const weapon = this.currentWeapon;
            return weapon.attack_type === 'Magic' || weapon.type === 'Bow' || weapon.type === 'Greatbow' ? 1000 : weapon.grip === 'Two Hand' ? 750 : 500;
        } else if (this.currentWeaponSprite !== '') {
            const weapons = [this.ascean.weapon_one, this.ascean.weapon_two, this.ascean.weapon_three];
            const weapon = weapons.find(weapon => weapon.imgURL.split('/')[2].split('.')[0] === this.currentWeaponSprite);
            return weapon.attack_type === 'Magic' || weapon.type === 'Bow' || weapon.type === 'Greatbow' ? 1000 : weapon.grip === 'Two Hand' ? 750 : 500;
        } else {
            const weapon = this.ascean.weapon_one;
            return weapon.attack_type === 'Magic' || weapon.type === 'Bow' || weapon.type === 'Greatbow' ? 1000 : weapon.grip === 'Two Hand' ? 750 : 500;
        };
    };
 
    enemyStateListener() {
        EventEmitter.on('update-combat-data', this.combatDataUpdate); // Formerly 'update-combat'
        EventEmitter.on('update-combat', this.combatDataUpdate); 
    };

    clearCombat = () => {
        console.log(`${this.ascean.name} Has Defeated ${this.scene.state.player.name}`);
        if (!this.stateMachine.isCurrentState(States.LEASH)) this.stateMachine.setState(States.LEASH);
        this.inCombat = false;
        this.attacking = null;
        this.isTriumphant = true;
        this.isAggressive = false; // Added to see if that helps with post-combat losses for the player
    };

    createCombat = (combat, when) => {
        const newEnemy = this.isNewEnemy(combat.gameObjectB);
        if (newEnemy) {
            combat.gameObjectB.targets.push(this);
            this.attacking = combat.gameObjectB;
            this.inCombat = true;
            if (this.healthbar) this.healthbar.setVisible(true);
            this.originPoint = new Phaser.Math.Vector2(this.x, this.y).clone();
            this.stateMachine.setState(States.CHASE); 
            this.actionTarget = combat;
        };

        if (!combat.gameObjectB.attacking || !combat.gameObjectB.inCombat) { // !inCombat
            if (this.scene.state.enemyID !== this.enemyID) this.scene.setupEnemy(this);
            combat.gameObjectB.attacking = this;
            combat.gameObjectB.currentTarget = this;
            combat.gameObjectB.inCombat = true;
            console.log(`%c ${this.ascean.name} engaging combat: [Collide ${when}]`, 'color: orange');
            this.scene.combatEngaged(true);
        }; 
    };

    combatDataUpdate = (e) => {
        if (this.enemyID !== e.enemyID) {
            if (this.inCombat) this.currentRound = e.combatRound;
            if (this.inCombat && this.attacking && e.newPlayerHealth <= 0 && e.computerWin) this.clearCombat();
            return;
        };
        if (this.currentRound !== e.combatRound) this.currentRound = e.combatRound;
        if (this.health > e.newComputerHealth) { // ENEMY DAMAGED
            const damage = Math.round(this.health - e.newComputerHealth);
            this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, damage, 1500, 'damage', e.criticalSuccess);
            console.log(`%c ${e.player.name} Dealt ${damage} Damage To ${this.ascean.name}`, 'color: #00ff00');
            if (!this.stateMachine.isCurrentState(States.CONSUMED)) this.stateMachine.setState(States.HURT);
            if (this.isStunned) this.isStunned = false;
            if (e.newComputerHealth <= 0) {
                this.stateMachine.setState(States.DEFEATED);
            };
        };
        if (this.health < e.newComputerHealth) { // ENEMY HEALED
            let heal = Math.round(e.newComputerHealth - this.health);
            this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, heal, 1500, 'heal');
        }; 
        
        this.health = e.newComputerHealth;
        this.healthbar.setValue(this.health);
        if (this.healthbar.getTotal() < e.computerHealth) this.healthbar.setTotal(e.computerHealth);
        if (this.healthbar) this.updateHealthBar(this.health);

        this.weapons = e.computerWeapons;  
        this.setWeapon(e.computerWeapons[0]); 
        this.checkDamage(e.computerDamageType.toLowerCase()); 
        
        if (e.counterSuccess && !this.stateMachine.isCurrentState(States.STUN)) this.setStun();        
        if (e.newPlayerHealth <= 0) this.clearCombat();
        this.checkMeleeOrRanged(e.computerWeapons?.[0]);
    };

    checkDamage = (damage) => {
        this.currentDamageType = damage;
        this.hasMagic = this.checkDamageType(damage, 'magic');
    };

    imgSprite = (weapon) => {
        return weapon.imgURL.split('/')[2].split('.')[0];
    }; 

    setStun = () => {
        console.log("%c Player Counter Success, Enemy Is Now Stunned", 'color: #00ff00');
        this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Stunned', 2500, 'effect', true);
        this.isStunned = true;
    };

    setWeapon = (weapon) => {
        return this.currentWeapon = weapon;
    };

    updateHealthBar(health) {
        this.healthbar.setValue(health);
    };

    onDefeatedEnter = () => {
        this.anims.play('player_pray', true).on('animationcomplete', () => {
            this.anims.play('player_idle', true);
        });
        this.isDefeated = true;
        this.inCombat = false;
        this.attacking = null;
        this.isAggressive = false;
        // this.healthbar.destroy();
        this.healthbar.setVisible(false);
        this.scene.time.delayedCall(300000, () => {
            this.isDefeated = false;
            this.health = this.ascean.health.total;
            this.isAggressive = this.startedAggressive;
            this.stateMachine.setState(States.IDLE);
        }, null, this);
    };
    onDeathEnter = () => {
        this.isDead = true;
        this.anims.play('player_death', true);
        this.inCombat = false;
        this.attacking = null;
        this.spriteWeapon.destroy();
        this.spriteShield.destroy();
        this.healthbar.destroy();
    };

    onHurtEnter = () => {
        this.isHurt = true;
        this.hurt();
    };
    onHurtUpdate = (dt) => {
        if (!this.isHurt) {
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT);
            } else {
                this.stateMachine.setState(States.IDLE);
            };
        };
    };

    onIdleEnter = () => {
        this.anims.play('player_idle', true);
        if (this.currentRound !== 0) this.currentRound = 0;
    };
    onIdleUpdate = (dt) => {
        this.idleWait -= dt;
        if (this.idleWait <= 0) {
            this.idleWait = Phaser.Math.RND.between(3500, 5000);
            if (this.stateMachine.isCurrentState(States.IDLE)) this.stateMachine.setState(States.PATROL);
        };
    };
    onIdleExit = () => {
        this.anims.stop('player_idle');
    };
 
    onPatrolEnter = () => {
        this.anims.play('player_running', true); 
        const patrolDirection = new Phaser.Math.Vector2(Math.random() - 0.5, Math.random() - 0.5).normalize();
        if (patrolDirection.x < 0) { this.flipX = true };
        const patrolSpeed = 1;
        this.patrolVelocity = { x: patrolDirection.x * patrolSpeed, y: patrolDirection.y * patrolSpeed };
        const delay = Phaser.Math.RND.between(2000, 3500);
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
        this.anims.play('player_idle', true);
        this.setVelocity(0);
        this.scene.showDialog(true);
    };
    onAwarenessUpdate = (dt) => {};
    onAwarenessExit = () => {
        this.anims.stop('player_idle');
        this.scene.showDialog(false);
    };

    onChaseEnter = () => {
        this.anims.play('player_running', true);
        this.chaseTimer = this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.scene.navMesh.debugDrawClear();
                this.path = this.scene.navMesh.findPath(this.position, this.attacking.position);
                if (this.path && this.path.length > 1) {
                    if (!this.isPathing) this.isPathing = true;
                    const nextPoint = this.path[1];
                    this.nextPoint = nextPoint;
                    this.scene.navMesh.debugDrawPath(this.path, 0xffd900);
                    const pathDirection = new Phaser.Math.Vector2(this.nextPoint.x, this.nextPoint.y);
                    this.pathDirection = pathDirection;
                    this.pathDirection.subtract(this.position);
                    this.pathDirection.normalize();
                    const distanceToNextPoint = Math.sqrt((this.nextPoint.x - this.position.x) ** 2 + (this.nextPoint.y - this.position.y) ** 2);
                    if (distanceToNextPoint < 10) {
                        this.path.shift();
                    };
                };
            },
            callbackScope: this,
            loop: true
        }); 
    }; 
    onChaseUpdate = (dt) => {
        const rangeMultiplier = this.isRanged ? 1.75 : 1;
        const direction = this.attacking.position.subtract(this.position);
        const distance = direction.length();
        if (Math.abs(this.originPoint.x - this.position.x) > 750 * rangeMultiplier || Math.abs(this.originPoint.y - this.position.y) > 750 * rangeMultiplier || !this.inCombat || distance > 750 * rangeMultiplier) {
            this.stateMachine.setState(States.LEASH);
            return;
        };  
        if (distance >= 175 * rangeMultiplier) {
            if (this.path && this.path.length > 1) {
                this.setVelocity(this.pathDirection.x * 2.5, this.pathDirection.y * 2.5);
            } else {
                if (this.isPathing) this.isPathing = false;
                direction.normalize();
                this.setVelocity(direction.x * 2.5, direction.y * 2.5);
            };
        } else {
            this.stateMachine.setState(States.COMBAT);
        };
    }; 
    onChaseExit = () => {
        this.anims.stop('player_running');
        this.scene.navMesh.debugDrawClear();
        this.setVelocity(0, 0);
        this.chaseTimer.destroy();
        this.chaseTimer = null;
    };

    onCombatEnter = () => {
        this.anims.play('player_running', true);
        this.attackTimer = this.scene.time.addEvent({
            delay: this.attackInterval(),
            callback: () => {
                this.combat(this.attacking);
            },
            callbackScope: this,
            loop: true,
        });
    };
    onCombatUpdate = (dt) => {
        this.evaluateCombatDistance();
    };
    onCombatExit = () => { 
        this.attackTimer.destroy();
        this.attackTimer = null;
    };

    onEvasionEnter = () => { 
        const chance = Phaser.Math.Between(1, 100); 
        if (chance > 50) {
            this.isDodging = true; 
        } else {
            this.isRolling = true; 
        }; 
        this.handleAnimations();
    };
    onEvasionUpdate = (dt) => {
        if (this.flipX) {
            this.setVelocityY(3); // Was 5
        } else {
            this.setVelocityY(-3); // Was 5
        };
        if (!this.isDodging && !this.isRolling) this.evaluateCombatDistance();
    }; 
    onEvasionExit = () => {};

    onAttackEnter = () => {
        this.isAttacking = true;
        this.attack();
    };
    onAttackUpdate = (dt) => {
        if (this.frameCount === 16 && !this.isRanged) this.scene.combatMachine.input('computerAction', 'attack', this.enemyID);
        if (!this.isRanged) this.swingMomentum(this.attacking);
        if (!this.isAttacking) this.evaluateCombatDistance(); 
    };
    onAttackExit = () => {
        if (this.scene.state.computerAction !== '') this.scene.combatMachine.input('computerAction', '', this.enemyID);
    };

    onCounterEnter = () => {
        this.isCountering = true;
        this.counter();
    };
    onCounterUpdate = (dt) => {
        if (this.frameCount === 5 && !this.isRanged) this.scene.combatMachine.input('computerAction', 'counter', this.enemyID);
        if (!this.isRanged) this.swingMomentum(this.attacking);
        if (!this.isCountering) this.evaluateCombatDistance();
    };
    onCounterExit = () => {
        if (this.scene.state.computerAction !== '') this.scene.combatMachine.input('computerAction', '', this.enemyID);
        if (this.scene.state.computerCounterGuess !== '') this.scene.combatMachine.input('computerCounterGuess', '', this.enemyID);
    };

    onDodgeEnter = () => {
        this.isDodging = true; 
        this.body.parts[2].position.y += this.sensorDisp;
        this.body.parts[2].circleRadius = 21;
        this.body.parts[1].vertices[0].y += this.colliderDisp;
        this.body.parts[1].vertices[1].y += this.colliderDisp; 
        this.body.parts[0].vertices[0].x += this.flipX ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[1].x += this.flipX ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[0].vertices[1].x += this.flipX ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[0].x += this.flipX ? this.colliderDisp : -this.colliderDisp;
        this.handleAnimations();
    };
    onDodgeUpdate = (dt) => {
        if (!this.isDodging) this.evaluateCombatDistance();
    };
    onDodgeExit = () => {
        this.body.parts[2].position.y -= this.sensorDisp;
        this.body.parts[2].circleRadius = 48;
        this.body.parts[1].vertices[0].y -= this.colliderDisp;
        this.body.parts[1].vertices[1].y -= this.colliderDisp; 
        this.body.parts[0].vertices[0].x -= this.flipX ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[1].x -= this.flipX ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[0].vertices[1].x -= this.flipX ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[0].x -= this.flipX ? this.colliderDisp : -this.colliderDisp;
    };

    onPostureEnter = () => {
        this.isPosturing = true;
        this.posture();
    };
    onPostureUpdate = (dt) => {
        if (this.frameCount === 11 && !this.isRanged) this.scene.combatMachine.input('computerAction', 'posture', this.enemyID);
        if (!this.isRanged) this.swingMomentum(this.attacking);
        if (!this.isPosturing) this.evaluateCombatDistance();
    };
    onPostureExit = () => {
        if (this.scene.state.computerAction !== '') this.scene.combatMachine.input('computerAction', '', this.enemyID);
    };

    onRollEnter = () => {
        this.isRolling = true; 
        this.body.parts[2].position.y += this.sensorDisp;
        this.body.parts[2].circleRadius = 21;
        this.body.parts[1].vertices[0].y += this.colliderDisp;
        this.body.parts[1].vertices[1].y += this.colliderDisp; 
        this.handleAnimations();
    };
    onRollUpdate = (dt) => { 
        if (this.frameCount === 10 && !this.isRanged) this.scene.combatMachine.input('computerAction', 'roll', this.enemyID);
        if (!this.isRolling) this.evaluateCombatDistance();
    };
    onRollExit = () => { 
        if (this.scene.state.computerAction !== '') this.scene.combatMachine.input('computerAction', '', this.enemyID);   
        this.body.parts[2].position.y -= this.sensorDisp;
        this.body.parts[2].circleRadius = 48;
        this.body.parts[1].vertices[0].y -= this.colliderDisp;
        this.body.parts[1].vertices[1].y -= this.colliderDisp;
    };

    onLeashEnter = () => {
        console.log(`Leashing ${this.ascean.name} to Origin Point of Encounter`);
        this.anims.play('player_running', true);
        if (this.attacking) {
            if (this.attacking.targets.includes(this)) {
                console.log("Removing Enemy from Attacking Targets inside ENEMY LEASH");
                const index = this.attacking.targets.indexOf(this);
                this.attacking.targets.splice(index, 1);
            };
            this.scene.clearNonAggressiveEnemy();
            this.attacking = null;
            this.inCombat = false;
        };
        this.leashTimer = this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                let originPoint = new Phaser.Math.Vector2(this.originPoint.x, this.originPoint.y);
                this.scene.navMesh.debugDrawClear();
                this.path = this.scene.navMesh.findPath(this.position, originPoint);
                if (this.path && this.path.length > 1) {
                    if (!this.isPathing) this.isPathing = true;
                    const nextPoint = this.path[1];
                    this.nextPoint = nextPoint;
                    this.scene.navMesh.debugDrawPath(this.path, 0xffd900);
                    const pathDirection = new Phaser.Math.Vector2(this.nextPoint.x, this.nextPoint.y);
                    this.pathDirection = pathDirection;
                    this.pathDirection.subtract(this.position);
                    this.pathDirection.normalize();
                    const distanceToNextPoint = Math.sqrt((this.nextPoint.x - this.position.x) ** 2 + (this.nextPoint.y - this.position.y) ** 2);
                    if (distanceToNextPoint < 10) {
                        console.log("Enemy Reached Next Point");
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
        console.log(`${this.ascean.name} Leashed to Origin Point of Encounter`)
        this.anims.stop('player_running');
        this.setVelocity(0, 0);
        this.leashTimer.destroy();
        this.leashTimer = null;
        this.scene.navMesh.debugDrawClear(); 
    };

    onConsumedEnter = () => {
        this.consumedDuration = 2000;
        this.setGlow(this, true);
        this.consumedTimer = this.scene.time.addEvent({
            delay: 250,
            callback: () => {
                if (this.attacking) {
                    const direction = this.attacking.position.subtract(this.position);
                    direction.normalize();
                    this.setVelocity(direction.x * 0.75, direction.y * 0.75);
                };
            },
            callbackScope: this,
            loop: true,
        });
    };
    onConsumedUpdate = (dt) => {
        if (!this.isConsumed) this.evaluateCombatDistance();
        this.consumedDuration -= dt;
        if (this.consumedDuration <= 0) {
            this.isConsumed = false;
        };
    };
    onConsumedExit = () => {
        this.consumedTimer.destroy();
        this.consumedTimer = null;
        this.setGlow(this, false);
    };

    onStunEnter = () => {
        this.stunDuration = 2500;
        this.setTint(0x888888); 
        this.setStatic(true);
    };
    onStunUpdate = (dt) => {
        this.evaluateCombatDistance();
        this.stunDuration -= dt;
        if (this.stunDuration <= 0) {
            this.isStunned = false;
        };
    };
    onStunExit = () => { 
        this.clearTint();
        this.setStatic(false);
    };

    enemyActionSuccess = () => {
        if (this.isRanged) this.scene.checkPlayerSuccess();
        if (this.particleEffect) {
            if (this.isCurrentTarget) {
                this.scene.combatMachine.add({ type: 'Weapon', data: { key: 'computerAction', value: this.particleEffect.action }, id: this.enemyID });
            } else {
                this.scene.combatMachine.add({ type: 'Enemy', data: { enemyID: this.enemyID, ascean: this.ascean, damageType: this.currentDamageType, combatStats: this.combatStats, weapons: this.weapons, health: this.health, actionData: { action: this.particleEffect.action, counter: this.counterAction }, id: this.enemyID}});
            };
            this.scene.particleManager.removeEffect(this.particleEffect.id);
            this.particleEffect.effect.destroy();
            this.particleEffect = null;
        } else {
            if (this.isCurrentTarget) {
                if (this.scene.state.computerAction === '') return;
                this.scene.combatMachine.add({ type: 'Weapon', data: { key: 'computerAction', value: this.scene.state.computerAction }, id: this.enemyID });
            } else {
                this.scene.combatMachine.add({ type: 'Enemy', data: { enemyID: this.enemyID, ascean: this.ascean, damageType: this.currentDamageType, combatStats: this.combatStats, weapons: this.weapons, health: this.health, actionData: { action: this.currentAction, counter: this.counterAction }, id: this.enemyID}});
            };
        };

        if (!this.isRanged) this.knockback(this.actionTarget)
        screenShake(this.scene);
    };

    enemyDodge = () => {
        this.dodgeCooldown = 50; // Was a 6x Mult for Dodge Prev aka 1728
        const dodgeDistance = 2304; // 126
        const dodgeDuration = 288; // 18  
        let currentDistance = 0;
        const dodgeLoop = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            if (progress >= dodgeDuration || currentDistance >= dodgeDistance) {
                this.spriteWeapon.setVisible(true);
                this.dodgeCooldown = 0;
                this.isDodging = false;
                this.currentAction = '';
                return;
            };
            const direction = !this.flipX ? -(dodgeDistance / dodgeDuration) : (dodgeDistance / dodgeDuration);
            if (Math.abs(this.velocity.x) > 0.1) this.setVelocityX(direction);
            if (this.velocity.y > 0.1) this.setVelocityY(dodgeDistance / dodgeDuration);
            if (this.velocity.y < -0.1) this.setVelocityY(-dodgeDistance / dodgeDuration);
            currentDistance += Math.abs(dodgeDistance / dodgeDuration);
            requestAnimationFrame(dodgeLoop);
        };
        let startTime = null;
        requestAnimationFrame(dodgeLoop);
    };

    enemyRoll = () => {
        this.rollCooldown = 50; // Was a x7 Mult for Roll Prev aka 2240
        const rollDistance = 1920; // 140
        const rollDuration = 320; // 20
        let currentDistance = 0;
        const rollLoop = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            if (progress >= rollDuration || currentDistance >= rollDistance) {
                this.spriteWeapon.setVisible(true);
                this.rollCooldown = 0;
                this.isRolling = false;
                this.currentAction = '';
                return;
            };
            const direction = this.flipX ? -(rollDistance / rollDuration) : (rollDistance / rollDuration);
            if (Math.abs(this.velocity.x) > 0.1) this.setVelocityX(direction);
            if (this.velocity.y > 0.1) this.setVelocityY(rollDistance / rollDuration);
            if (this.velocity.y < -0.1) this.setVelocityY(-rollDistance / rollDuration);
            currentDistance += Math.abs(rollDistance / rollDuration);
            requestAnimationFrame(rollLoop);
        };
        let startTime = null;
        requestAnimationFrame(rollLoop);
    };

    handleAnimations = () => {
        if (this.isDodging) { // DODGING AKA SLIDING OUTSIDE COMBAT
            this.anims.play('player_slide', true);
            this.spriteWeapon.setVisible(false);
            if (this.dodgeCooldown === 0) this.enemyDodge();
        };
        if (this.isRolling) { // ROLLING OUTSIDE COMBAT
            this.anims.play('player_roll', true);
            this.spriteWeapon.setVisible(false);
            if (this.rollCooldown === 0) this.enemyRoll();
        }; 
    };

    swingMomentum = (target) => {
        if (!target) return;
        let direction = target.position.subtract(this.position);
        direction.normalize();
        this.setVelocity(direction.x * 2, direction.y * 2);
    };

    evaluateCombatDistance = () => {
        if (!this.attacking || !this.inCombat) {
            this.stateMachine.setState(States.LEASH);
            return;
        };  
        let direction = this.attacking.position.subtract(this.position);
        const distanceY = Math.abs(direction.y);
        const rangeMultiplier = this.isRanged ? 3 : 1;
        
        if (this.isStunned) {
            this.setVelocity(0);
        } else if (direction.length() >= 175 * rangeMultiplier) { // > 525
            this.stateMachine.setState(States.CHASE);
        } else if (this.isRanged) {
            if (!this.stateMachine.isCurrentState(States.COMBAT)) this.stateMachine.setState(States.COMBAT);
            if (distanceY > 10) {
                direction.normalize();
                this.setVelocityY(direction.y * 4.5);
            };
            if ((this.attacking.position.subtract(this.position)).length() > 75 * rangeMultiplier) { // 225-525
                this.anims.play('player_running', true);
                direction.normalize();
                this.setVelocityX(direction.x * 2.25); // 2.5
                this.setVelocityY(direction.y * 2.25); // 2.5
            } else if ((this.attacking.position.subtract(this.position)).length() < 75 && !this.attacking.isRanged) { // < 75
                this.anims.play('player_running', true);
                direction.normalize();
                this.setVelocityX(direction.x * -2.0); // -2.25
                this.setVelocityY(direction.y * -1.25); // -1.5
            } else if (distanceY < 10) { // Between 75 and 225 and within y-distance
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.anims.play('player_idle', true);
            } else { // Between 75 and 225 and outside y-distance
                direction.normalize();
                this.setVelocityY(direction.y * 2.25); // 2.5
            };
        } else { // Melee
            if (!this.stateMachine.isCurrentState(States.COMBAT)) this.stateMachine.setState(States.COMBAT);
            if (direction.length() > 60) { 
                this.anims.play('player_running', true);
                direction.normalize();
                this.setVelocityX(direction.x * 2.5); // 2.75
                this.setVelocityY(direction.y * 2.5); // 2.75
            } else { // Inside melee range
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.anims.play('player_idle', true);
            };
        };
    };

    checkEvasion = (particle) => {
        const particleVector = new Phaser.Math.Vector2(particle.effect.x, particle.effect.y);
        const enemyVector = new Phaser.Math.Vector2(this.x, this.y);
        const distance = particleVector.subtract(enemyVector);
        if (distance.length() < 75) { // 50 || 100
            return true;
        };
        return false;
    };

    getEnemyParticle = () => {
        return this.attacking.particleEffect
            ? this.scene.particleManager.getEffect(this.attacking.particleEffect.id)
            : null;
    };

    isUnderRangedAttack = () => {
        const player = this.getEnemyParticle();
        if (!player) return;
        return (this.attacking.isRanged && this.checkEvasion(player) && !this.stateMachine.isCurrentState(States.EVADE));
    }; 

    currentTargetCheck = () => {
        if (this.scene.state.enemyID === this.enemyID && !this.isCurrentTarget) { // attacking.currentTarget?.enemyID
            console.log("%c Wasn't Current Target, Now Selected as Current Target", 'color: #00ff00');
            this.isCurrentTarget = true;
        } else if (this.scene.state.enemyID !== this.enemyID && this.isCurrentTarget) {
            console.log("%c Was Current Target, Now Deselected as Current Target", 'color: #ff0000');    
            this.isCurrentTarget = false;
        };
    };

    currentWeaponCheck = () => {
        if (this.spriteWeapon && this.spriteShield) {
            this.spriteWeapon.setPosition(this.x, this.y);
            this.spriteShield.setPosition(this.x, this.y);
            this.weaponRotation('enemy', this.attacking);
        };
        if (!this.currentWeapon || this.currentWeaponSprite === this.imgSprite(this.currentWeapon) || this.enemyID !== this.scene.state.enemyID) return;
        this.currentWeaponSprite = this.imgSprite(this.currentWeapon);
        this.spriteWeapon.setTexture(this.currentWeaponSprite);
        const gripScale = { 'One Hand': 0.5, 'Two Hand': 0.65 };
        this.spriteWeapon.setScale(gripScale[this.currentWeapon.grip]);
    };

    currentParticleCheck = () => {
        if (!this.particleEffect.triggered) this.scene.particleManager.update(this, this.particleEffect);
        if (this.particleEffect.success) {
            this.particleEffect.triggered = true;
            this.particleEffect.success = false;
            this.enemyActionSuccess();
        };
    };

    getDirection = () => {
        const direction = this.attacking.position.subtract(this.position);
        if (direction.x < 0 && !this.flipX) {
            this.setFlipX(true);
        } else if (direction.x > 0 && this.flipX) {
            this.setFlipX(false);
        };
    };

    evaluateEnemyState = () => {
        if (this.isStunned && !this.stateMachine.isCurrentState(States.STUN)) {
            this.stateMachine.setState(States.STUN);
            return; // Exit early to avoid other state changes
        };
        if (this.isConsumed && !this.stateMachine.isCurrentState(States.CONSUMED)) {
            this.stateMachine.setState(States.CONSUMED);
            return; // Exit early to avoid other state changes
        };
        if (this.actionSuccess) {
            this.actionSuccess = false;
            this.enemyActionSuccess();
        };
        if (this.particleEffect) this.currentParticleCheck();
        this.currentWeaponCheck();

        if (this.healthbar) this.healthbar.update(this);
        if (this.scrollingCombatText) this.scrollingCombatText.update(this);
        if (this.attacking) {
            if (this.isUnderRangedAttack()) {
                console.log(`%c ${this.ascean.name} Evading Ranged Attack`, 'color: gold');
                this.stateMachine.setState(States.EVADE);
                return; // Exit early to avoid other state changes
            };
            this.getDirection();
            this.currentTargetCheck();
        } else if (!this.stateMachine.isCurrentState(States.PATROL)) {
            this.setFlipX(this.velocity.x < 0);
        };

        switch (this.currentAction) {
            case 'attack':
                this.stateMachine.setState(States.ATTACK);
                break;
            case 'counter':
                this.stateMachine.setState(States.COUNTER);
                break;
            case 'dodge':
                this.stateMachine.setState(States.DODGE);
                break;
            case 'roll':
                this.stateMachine.setState(States.ROLL);
                break;
            case 'posture':
                this.stateMachine.setState(States.POSTURE);
                break; 
            case 'pray':
                this.isPraying = true;
                break;
            case 'consume':
                this.isConsuming = true;
                break;
            default:
                break;                        
        }; 
    };
 
    update() {
        this.evaluateEnemyState(); 
        this.stateMachine.update(this.scene.sys.game.loop.delta);   
    };

    combat = (target) => { 
        const action = this.evaluateCombat(target);
        this.currentAction = action;
    };

    evaluateCombat = (target) => {  
        let computerAction;
        let computerCounter;
        let actionNumber = Math.floor(Math.random() * 101);
        const computerActions = {
            attack: 40 + this.scene.state.attackWeight,
            counter: 10 + this.scene.state.counterWeight,
            dodge: 10 + this.scene.state.dodgeWeight,
            posture: 20 + this.scene.state.postureWeight,
            roll: 20 + this.scene.state.rollWeight,
            counterAttack: 25 + this.scene.state.counterAttackWeight,
            counterCounter: 25 + this.scene.state.counterCounterWeight,
            counterPosture: 25 + this.scene.state.counterPostureWeight,
            counterRoll: 25 + this.scene.state.counterRollWeight,
            roll_rating: !this.currentWeapon? this.currentWeapon.roll : this.ascean.weapon_one.roll,
            armor_rating: (this.scene.state.computerDefense.physicalPosture + this.scene.state.computerDefense.magicalPosture)  /  4,
        };
        if (actionNumber > (100 - computerActions.attack) || target.isStunned) {
            computerAction = 'attack';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter) && !this.isRanged) {
            computerAction = 'counter';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.posture)) {
            computerAction = 'posture';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.posture - computerActions.roll)) {
            computerAction = 'roll';
        } else {
            computerAction = 'dodge';
        };

        if (computerAction === 'counter') {
            let counterNumber = Math.floor(Math.random() * 101);
            if (counterNumber > (100 - computerActions.counterAttack) || target.isAttacking) {
                computerCounter = 'attack';
            } else if (counterNumber > (100 - computerActions.counterAttack - computerActions.counterCounter) || target.isCountering) {
                computerCounter = 'counter';
            } else if (counterNumber > (100 - computerActions.counterAttack - computerActions.counterCounter - computerActions.counterPosture) || target.isPosturing) {
                computerCounter = 'posture';
            } else if (counterNumber > (100 - computerActions.counterAttack - computerActions.counterCounter - computerActions.counterPosture - computerActions.counterRoll) || target.isRolling) {
                computerCounter = 'roll';
            } else {
                computerCounter = ['attack', 'counter', 'posture', 'roll'][Math.floor(Math.random() * 4)];
            };
            this.counterAction = computerCounter;
            this.scene.combatMachine.input('computerCounterGuess', computerCounter, this.enemyID);
        } else if (this.scene.state.computerCounterGuess !== '') {
            this.scene.combatMachine.input('computerCounterGuess', '', this.enemyID);
            this.counterAction = '';
        };
        return computerAction;
    };
};
