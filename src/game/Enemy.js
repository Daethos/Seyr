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
        let { scene } = data;
        super({ ...data, name: "enemy", ascean: scene.state.computer, health: scene.state.new_computer_health }); 
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
            .addState(States.HURT, {
                onEnter: this.onHurtEnter.bind(this),
                onUpdate: this.onHurtUpdate.bind(this),
            })
            .addState(States.DEATH, {
                onEnter: this.onDeathEnter.bind(this),
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
        this.originalPosition = new Phaser.Math.Vector2(this.x, this.y);
        this.originPoint = {}; // For Leashing
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        const colliderWidth = 20; // Original width of the collider
        const colliderHeight = 36; // Original height of the collider
        const paddingWidth = 10; // Padding to be added to the width
        const paddingHeight = 10; // Padding to be added to the height

        // Calculate the new width and height with padding
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
        this.scene.matterCollision.addOnCollideStart({
            objectA: [enemySensor],
            callback: other => {
                if (other.gameObjectB && other.gameObjectB.name === 'player' && !this.isDead) {
                    this.attacking = other.gameObjectB;
                    this.inCombat = true;
                    if (this.healthbar) this.healthbar.setVisible(true);
                    if (this.scene.state.computer._id !== this.ascean._id && !other.gameObjectB.touching.find((touched) => touched.ascean._id === this.ascean._id)) {
                        this.scene.setupEnemy({ id: this.enemyID, game: this.ascean, enemy: this.combatStats, health: this.health });
                    };
                    this.originPoint = new Phaser.Math.Vector2(this.x, this.y).clone();
                    this.stateMachine.setState(States.CHASE); // TODO:FIXME: State Machine Combat
                    this.actionTarget = other;
                    other.gameObjectB.inCombat = true;
                    other.gameObjectB.attacking = this;
                    this.scene.combatEngaged(true);
                };
            },
            context: this.scene,
        }); 
    };

    createEnemy() {
        const fetch = new CustomEvent('fetch-enemy', { detail: { enemyID: this.enemyID } });
        window.dispatchEvent(fetch); 
        window.addEventListener('enemy-fetched', this.enemyFetchedFinishedListener.bind(this));
    };

    enemyFetchedFinishedListener(e) {
        if (this.enemyID !== e.detail.enemyID) return;
        console.log(e.detail, "Enemy Fetched")
        this.ascean = e.detail.game;
        this.health = e.detail.game.health.total;
        this.combatStats = e.detail.combat; 
        
        const weaponName = e.detail.game.weapon_one.imgURL.split('/')[2].split('.')[0];
        
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, weaponName);
        this.spriteWeapon.setScale(0.6);
        this.spriteWeapon.setOrigin(0.25, 1);
        this.scene.add.existing(this.spriteWeapon);
        this.spriteWeapon.setAngle(-195);

        const shieldName = e.detail.game.shield.imgURL.split('/')[2].split('.')[0];

        this.spriteShield = new Phaser.GameObjects.Sprite(this.scene, 0, 0, shieldName);
        this.spriteShield.setScale(0.6);
        this.spriteShield.setOrigin(0.5, 0.5);
        this.scene.add.existing(this.spriteShield);
        this.spriteShield.setVisible(false);

        this.healthbar = new HealthBar(this.scene, this.x, this.y, this.health);
        this.checkMeleeOrRanged(this.ascean.weapon_one);

        window.removeEventListener('enemy-fetched', this.enemyFetchedFinishedListener);
    };

    weaponSprite(weapon) {
        return weapon.imgURL.split('/')[2].split('.')[0];
    };
 
    enemyStateListener() {
        window.addEventListener('update-combat', (e) => {
            if (this.enemyID !== e.detail.enemyID) return;
            console.log("Enemy Updating Combat Data")
            this.combatData = e.detail;
            if (this.health > e.detail.new_computer_health) { 
                let damage = Math.round(this.health - e.detail.new_computer_health);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, damage, 1500, 'damage', e.detail.critical_success);
                this.stateMachine.setState(States.HURT);
                if (this.isStunned) this.isStunned = false;
            };
            if (this.health < e.detail.new_computer_health) {
                let heal = Math.round(e.detail.new_computer_health - this.health);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, heal, 1500, 'heal');
            };
            if (e.detail.counter_success) {
                console.log("Player Counter Success, Enemy Is Now Stunned");
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Stunned', 1500, 'effect');
                this.isStunned = true;
            };
            this.health = e.detail.new_computer_health;
            if (this.healthbar) this.updateHealthBar(this.health);
            if (e.detail.new_computer_health <= 0) {
                this.stateMachine.setState(States.DEATH);
            };
            if (e.detail.new_player_health <= 0) {
                if (!this.stateMachine.isCurrentState(States.LEASH)) this.stateMachine.setState(States.LEASH);
                this.inCombat = false;
                this.attacking = null;
            };
            this.checkMeleeOrRanged(e.detail.computer_weapons?.[0]);
        });

        window.addEventListener('update-combat-data', (e) => {
            if (this.enemyID !== e.detail.enemyID) return; 
            this.health = e.detail.new_computer_health;
            if (this.healthbar) this.updateHealthBar(this.health);
            if (e.detail.new_computer_health <= 0) {
                this.stateMachine.setState(States.DEATH);
            };
        });
    };

    attackInterval() {
        if (this.scene.state.computer_weapons[0]) {
            return this.scene.state.computer_weapons[0].grip === 'Two Hand' ? 900 : 600;
        } else if (this.currentWeaponSprite !== '') {
            const weapons = [this.ascean.weapon_one, this.ascean.weapon_two, this.ascean.weapon_three];
            const weapon = weapons.find(weapon => weapon.imgURL.split('/')[2].split('.')[0] === this.currentWeaponSprite);
            return weapon.grip === 'Two Hand' ? 900 : 600;
        } else {
            return this.ascean.weapon_one.grip === 'Two Hand' ? 900 : 600;
        };
    };

    updateHealthBar(health) {
        this.healthbar.setValue(health);
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
    };
    onIdleUpdate = (dt) => {
        this.idleWait -= dt;
        if (this.idleWait <= 0) {
            this.idleWait = 3000;
            // console.log("Idle Transitioning to Patrol");
            if (this.stateMachine.isCurrentState(States.IDLE)) this.stateMachine.setState(States.PATROL);
        };
    };
    onIdleExit = () => {
        this.anims.stop('player_idle');
    };
 
    onPatrolEnter = () => {
        // console.log("Entering Patrol State");
        this.anims.play('player_running', true); 
        const patrolDirection = new Phaser.Math.Vector2(Math.random() - 0.5, Math.random() - 0.5).normalize();
        if (patrolDirection.x < 0) { this.flipX = true };
        const patrolSpeed = 1;
        this.patrolVelocity = { x: patrolDirection.x * patrolSpeed, y: patrolDirection.y * patrolSpeed };
        const delay = Phaser.Math.RND.between(1500, 3000);
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
        // console.log("Exiting Patrol State")
        this.anims.stop('player_running');
        this.patrolTimer.destroy();
    };

    onAwarenessEnter = () => {
        console.log("Aware of Player")
        this.anims.play('player_idle', true);
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                let direction = this.attacking.position.subtract(this.position);
                if (direction.length() < 100) {
                    this.stateMachine.setState(States.CHASE);
                    console.log("Chasing Player From Awareness")
                } else {
                    this.stateMachine.setState(States.PATROL);
                    console.log("Patrolling From Awareness")
                };
            },
            callbackScope: this,
            loop: false,
        });
    };
    onAwarenessUpdate = (dt) => {
        this.setVelocity(0, 0);
    };
    onAwarenessExit = () => {
        this.anims.stop('player_idle');
    };

    onChaseEnter = () => {
        this.anims.play('player_running', true);
        this.chaseTimer = this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                this.scene.navMesh.debugDrawClear();
                this.path = this.scene.navMesh.findPath(this.position, this.attacking.position);
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
                        console.log("Enemy Reached Next Point");
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
        if ( Math.abs(this.originPoint.x - this.position.x) > 350 * rangeMultiplier || Math.abs(this.originPoint.y - this.position.y) > 400 * rangeMultiplier || !this.inCombat || distance > 500 * rangeMultiplier ) {
            console.log("Chase transitioning to Leash");
            this.stateMachine.setState(States.LEASH);
            return;
        };  
        if (distance >= 150 * rangeMultiplier) {
            if (this.path && this.path.length > 1) {
                this.setVelocity(this.pathDirection.x * 2.5, this.pathDirection.y * 2.5);
            } else {
                if (this.isPathing) this.isPathing = false;
                direction.normalize();
                this.setVelocity(direction.x * 2.5, direction.y * 2.5);
            };
        } else {
            console.log("Enemy Transitioning to Attacking Player");
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
        this.evasionTimer = this.scene.time.addEvent({
            delay: 0, // Was 50
            callback: () => {
                const chance = Phaser.Math.Between(1, 100);
                if (chance < 50) {
                    this.isDoging = true;
                    this.dodge();
                } else {
                    this.isRolling = true;
                    this.roll();    
                };
            },
            callbackScope: this,
            loop: false, // Was true
        });
    };
    onEvasionUpdate = (dt) => {
        if (this.flipX) {
            this.setVelocityY(5); // Was 3
        } else {
            this.setVelocityY(-5); // Was 3
        };
        if (!this.isDodging && !this.isRolling) this.evaluateCombatDistance();
    };
    onEvasionExit = () => {
        this.evasionTimer.destroy();
    };

    onAttackEnter = () => {
        this.isAttacking = true;
        this.attack();
    };
    onAttackUpdate = (dt) => {
        if (this.frameCount === 16 && !this.isRanged) this.scene.setState('computer_action', 'attack');
        if (!this.isAttacking) this.evaluateCombatDistance(); 
    };
    onAttackExit = () => {
        this.scene.setState('computer_action', '');
    };

    onCounterEnter = () => {
        this.isCountering = true;
        this.counter();
    };
    onCounterUpdate = (dt) => {
        if (this.frameCount === 10) this.scene.setState('computer_action', 'counter');
        if (!this.isCountering) this.evaluateCombatDistance();
    };
    onCounterExit = () => {
        this.scene.setState('computer_action', '');
        this.scene.setState('computer_counter_guess', '');
    };

    onDodgeEnter = () => {
        this.isDodging = true;
        this.dodge();
    };
    onDodgeUpdate = (dt) => {
        if (!this.isDodging) this.evaluateCombatDistance();
    };

    onPostureEnter = () => {
        this.isPosturing = true;
        this.posture();
    };
    onPostureUpdate = (dt) => {
        if (this.frameCount === 3 && !this.isRanged) this.scene.setState('computer_action', 'posture');
        if (!this.isPosturing) this.evaluateCombatDistance();
    };
    onPostureExit = () => {
        this.scene.setState('computer_action', '');
    };

    onRollEnter = () => {
        this.isRolling = true;
        this.roll();
    };
    onRollUpdate = (dt) => {
        if (!this.isRolling) this.evaluateCombatDistance();
    };
    onRollExit = () => { 
        this.scene.setState('computer_action', '');
    };

    onLeashEnter = () => {
        console.log("Leashing Enemy to Origin Point of Encounter");
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
        console.log("Enemy Leashed to Origin Point of Encounter")
        this.anims.stop('player_running');
        this.setVelocity(0, 0);
        this.leashTimer.destroy();
        this.leashTimer = null;
        this.scene.navMesh.debugDrawClear(); 
    };

    onStunEnter = () => {
        this.stunDuration = 1500;
        this.setTint(0x888888); 
    };
    onStunUpdate = (dt) => {
        this.evaluateCombatDistance();
        this.stunDuration -= dt;
        if (this.stunDuration <= 0) {
            this.isStunned = false;
        };
    };
    onStunExit = () => {
        this.stunDuration = 1500;
        this.clearTint();
    };

    enemyActionSuccess = () => {
        if (this.scene.state.computer_action === '') return;
        this.scene.sendStateActionListener();
        if (this.particleEffect) {
            this.scene.particleManager.removeEffect(this.particleEffect.id);
            this.particleEffect.effect.destroy();
            this.particleEffect = null;
        };
        screenShake(this.scene);
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
            console.log("Enemy Transitioning from Attacking to Chasing Player");
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
                this.setVelocityX(direction.x * 2.5);
                this.setVelocityY(direction.y * 2.5);
            } else if ((this.attacking.position.subtract(this.position)).length() < 75 && !this.attacking.isRanged) { // < 75
                this.anims.play('player_running', true);
                direction.normalize();
                this.setVelocityX(direction.x * -2.25);
                this.setVelocityY(direction.y * -1.5);
            } else if (distanceY < 10) { // Between 75 and 225 and within y-distance
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.anims.play('player_idle', true);
            } else { // Between 75 and 225 and outside y-istance
                direction.normalize();
                this.setVelocityY(direction.y * 2.5);
            };
        } else { // Melee
            if (!this.stateMachine.isCurrentState(States.COMBAT)) this.stateMachine.setState(States.COMBAT);
            if (direction.length() > 52) { // Outside melee range
                this.anims.play('player_running', true);
                direction.normalize();
                this.setVelocityX(direction.x * 2.75);
                this.setVelocityY(direction.y * 2.75);  
            } else { // Inside melee range
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.anims.play('player_idle', true);
            };
        };
    };

    evaluateEnemyState = () => {
        if (this.isStunned && !this.stateMachine.isCurrentState(States.STUN)) {
            this.stateMachine.setState(States.STUN);
            return; // Exit early to avoid other state changes
        };
        if (this.actionSuccess) {
            this.actionSuccess = false;
            this.enemyActionSuccess();
        };
        if (this.particleEffect) {
            if (!this.particleEffect.triggered) {
                this.scene.particleManager.update(this, this.particleEffect);
            };
            if (this.particleEffect.success) {
                this.particleEffect.triggered = true;
                this.particleEffect.success = false;
                this.enemyActionSuccess();
            };
        };
        if (this.spriteWeapon && this.spriteShield) {
            this.spriteWeapon.setPosition(this.x, this.y);
            this.spriteShield.setPosition(this.x, this.y);
            this.weaponRotation('enemy', this.attacking);
        };
        if (this.healthbar) this.healthbar.update(this);
        if (this.scrollingCombatText) this.scrollingCombatText.update(this);
        if (this.attacking) {
            let direction = this.attacking.position.subtract(this.position);
            if (direction.x < 0) {
              this.setFlipX(true);  
            } else {
              this.setFlipX(false);  
            };
        } else if (!this.stateMachine.isCurrentState(States.PATROL)) {
            this.setFlipX(this.velocity.x < 0);
        };
        if (this.scene.state.computer_weapons[0] && this.currentWeaponSprite !== this.weaponSprite(this.scene.state.computer_weapons[0]) && this.enemyID === this.scene.state.enemyID) {
            this.currentWeaponSprite = this.weaponSprite(this.scene.state.computer_weapons[0]);
            this.spriteWeapon.setTexture(this.currentWeaponSprite);
        }; 
        if (this.attacking && this.attacking.isRanged) {
            if (this.attacking.isAttacking || this.attacking.isPosturing || this.attacking.isCountering) {
                if (Math.abs(this.position.y - this.attacking.position.y) <= 40) this.stateMachine.setState(States.EVADE); 
            };
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
        if (this.isDead) return; 
        this.evaluateEnemyState(); 
        this.stateMachine.update(this.scene.sys.game.loop.delta);   
    };

    combat = (target) => { 
        const action = this.evaluateCombat();
        this.currentAction = action;
    };

    evaluateCombat = () => {  
        let computerAction;
        let computerCounter;
        let actionNumber = Math.floor(Math.random() * 101);
        const computerActions = {
            attack: 50 + this.scene.state.attack_weight,
            counter: 10 + this.scene.state.counter_weight,
            dodge: 10 + this.scene.state.dodge_weight,
            posture: 15 + this.scene.state.posture_weight,
            roll: 15 + this.scene.state.roll_weight,
            counter_attack: 25 + this.scene.state.counter_attack_weight,
            counter_counter: 25 + this.scene.state.counter_counter_weight,
            counter_posture: 25 + this.scene.state.counter_posture_weight,
            counter_roll: 25 + this.scene.state.counter_roll_weight,
            roll_rating: !this.scene.state.computer_weapons.length ? this.ascean.weapon_one.roll : this.scene.state.computer_weapons?.[0].roll,
            armor_rating: (this.scene.state.computer_defense.physicalPosture + this.scene.state.computer_defense.magicalPosture)  /  4,
        };
        if (actionNumber > (100 - computerActions.attack)) {
            computerAction = 'attack';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter)) {
            computerAction = 'counter';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge)) {
            computerAction = 'dodge';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge - computerActions.posture)) {
            computerAction = 'posture';
        } else {
            computerAction = 'roll';
        };

        if (computerAction === 'counter') {
            let counterNumber = Math.floor(Math.random() * 101);
            if (counterNumber > (100 - computerActions.counter_attack)) {
                computerCounter = 'attack';
            } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter)) {
                computerCounter = 'counter';
            } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter - computerActions.counter_dodge - computerActions.counter_posture)) {
                computerCounter = 'posture';
            } else {
                computerCounter = 'roll';
            }; 
            this.scene.setState('computer_counter_guess', computerCounter);
        } else if (this.scene.state.computer_counter_guess !== '') {
            this.scene.setState('computer_counter_guess', '');
        };
        return computerAction;
    };

    isAtEdgeOfLedge(scene) { 
        const playerSensor = this.body.parts[2]; // Assuming playerSensor is the second part of the compound body
        const rayStart = { x: playerSensor.position.x - playerSensor.circleRadius, y: playerSensor.position.y }; // Starting point of the ray
        const rayEnd = { x: playerSensor.position.x + playerSensor.circleRadius, y: playerSensor.position.y - playerSensor.circleRadius }; // Ending point of the ray
        const bodies = scene.matter.world.getAllBodies().filter(body => body.gameObject && body.gameObject?.tile?.properties?.isGround);
        let isAtEdge = false;
        const intersections = scene.matter.intersectRay(rayStart.x, rayStart.y, rayEnd.x, rayEnd.y, 32, bodies).filter(intersection => intersection.id !== playerSensor.id);
        if (intersections.length === 1) {
            isAtEdge = true;
        }; 
        return isAtEdge;
    };  

    isCollidingWithPlayer() {
        const bodies = this.scene.matter.world.getAllBodies().filter(body => body.gameObject && body.gameObject?.tile?.properties?.isGround);
        const playerSensor = this.body.parts[2];
        return this.scene.matter.overlap(playerSensor, bodies);
    };   
};
