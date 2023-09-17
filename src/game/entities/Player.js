import Phaser from "phaser";
import Entity, { FRAME_COUNT } from "./Entity";  
import { screenShake, walk } from "../phaser/ScreenShake";
import StateMachine, { States } from "../phaser/StateMachine";
import ScrollingCombatText from "../phaser/ScrollingCombatText";
import HealthBar from "../phaser/HealthBar";
import EventEmitter from "../phaser/EventEmitter";
import CastingBar from "../phaser/CastingBar";

export const PLAYER = {
    COLLIDER: {
        DISPLACEMENT: 16,
        HEIGHT: 36,
        WIDTH: 20,
    },
    SPEED: {
        INITIAL: 1.5, // 1.75
        ACCELERATION: 0.1,
        DECELERATION: 0.05,
        CAERENIC: 0.5,
    },  
    SCALE: {
        SELF: 0.8,
        SHIELD: 0.6,
        WEAPON_ONE: 0.5,
        WEAPON_TWO: 0.65,
    },
    SENSOR: {
        COMBAT: 48,
        DEFAULT: 36,
        DISPLACEMENT: 12,
        EVADE: 21,
    },
    STAMINA: {
        ATTACK: 25,
        COUNTER: 10,
        DODGE: 15,
        POSTURE: 15,
        ROLL: 15,
        TSHAER: 25,
        INVOKE: -15,
    },
    DURATIONS: {
        POLYMORPHING: 1500,
        STUNNED: 2500,
        TSHAERING: 2000,
    },
};
 
export default class Player extends Entity {
    constructor(data) {
        let { scene } = data;
        super({ ...data, name: 'player', ascean: scene.state.player, health: scene.state.newPlayerHealth }); 
        const spriteName = scene?.state?.player?.weapon_one.imgURL.split('/')[2].split('.')[0];
        this.ascean = scene.state.player;
        this.playerID = scene.state.player._id;
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, spriteName);
        if (scene?.state?.player?.weapon_one?.grip === 'Two Hand') {
            this.spriteWeapon.setScale(PLAYER.SCALE.WEAPON_TWO);
        } else {
            this.spriteWeapon.setScale(PLAYER.SCALE.WEAPON_ONE);
        };
        this.spriteWeapon.setOrigin(0.25, 1);
        this.scene.add.existing(this);
        this.scene.add.existing(this.spriteWeapon);
        // this.spriteWeapon.setDepth(this + 1);
        this.spriteWeapon.setAngle(-195);
        this.currentWeaponSprite = spriteName;
        this.currentDamageType = scene?.state?.player?.weapon_one?.damage_type[0].toLowerCase();
        this.targetIndex = 1;
        this.currentTarget = null;
        this.stamina = scene?.state?.playerAttributes?.stamina;
        this.isMoving = false;
        this.targetID = null;
        this.attackedTarget = null;
        this.triggeredActionAvailable = null;
        this.rootCooldown = 0;
        this.snareCooldown = 0;
        this.isStealthing = false;
        this.tshaeralCooldown = 0;
        this.polymorphCooldown = 0;

        const shieldName = scene?.state?.player?.shield.imgURL.split('/')[2].split('.')[0];
        this.spriteShield = new Phaser.GameObjects.Sprite(this.scene, 0, 0, shieldName);
        this.spriteShield.setScale(PLAYER.SCALE.SHIELD);
        this.spriteShield.setOrigin(0.5, 0.5);
        this.scene.add.existing(this.spriteShield);
        this.spriteShield.setDepth(this + 1);
        this.spriteShield.setVisible(false);

        this.playerVelocity = new Phaser.Math.Vector2();
        this.speed = this.startingSpeed(scene?.ascean);
        this.acceleration = PLAYER.SPEED.ACCELERATION;
        this.deceleration = PLAYER.SPEED.DECELERATION;
        this.dt = this.scene.sys.game.loop.delta;
        this.stateMachine = new StateMachine(this, 'player');
        this.stateMachine
            .addState(States.NONCOMBAT, {
                onEnter: this.onNonCombatEnter,
                onUpdate: this.onNonCombatUpdate,
                onExit: this.onNonCombatExit,
            })
            .addState(States.COMBAT, {
                onEnter: this.onCombatEnter,
                onUpdate: this.onCombatUpdate,
            })
            .addState(States.ATTACK, {
                onEnter: this.onAttackEnter,
                onUpdate: this.onAttackUpdate,
                onExit: this.onAttackExit,
            })
            .addState(States.COUNTER, {
                onEnter: this.onCounterEnter,
                onUpdate: this.onCounterUpdate,
                onExit: this.onCounterExit,
            })
            .addState(States.DODGE, {
                onEnter: this.onDodgeEnter,
                onUpdate: this.onDodgeUpdate,
                onExit: this.onDodgeExit,
            })
            .addState(States.POSTURE, {
                onEnter: this.onPostureEnter,
                onUpdate: this.onPostureUpdate,
                onExit: this.onPostureExit,
            })
            .addState(States.ROLL, {
                onEnter: this.onRollEnter,
                onUpdate: this.onRollUpdate,
                onExit: this.onRollExit,
            })
            .addState(States.HEAL, {
                onEnter: this.onPrayerEnter,
                onUpdate: this.onPrayerUpdate,
                onExit: this.onPrayerExit,
            })
            .addState(States.INVOKE, {
                onEnter: this.onInvokeEnter,
                onUpdate: this.onInvokeUpdate,
                onExit: this.onInvokeExit,
            })
            .addState(States.STUN, {
                onEnter: this.onStunEnter,
                onUpdate: this.onStunUpdate,
                onExit: this.onStunExit,
            })
            .addState(States.TSHAERAL, {
                onEnter: this.onTshaeralEnter,
                onUpdate: this.onTshaeralUpdate,
                onExit: this.onTshaeralExit,
            })
            .addState(States.POLYMORPHING, {
                onEnter: this.onPolymorphingEnter,
                onUpdate: this.onPolymorphingUpdate,
                onExit: this.onPolymorphingExit,
            })

        this.stateMachine.setState(States.NONCOMBAT);

        this.metaMachine = new StateMachine(this, 'player');
        this.metaMachine
                .addState(States.CLEAN, {
                    onEnter: this.onCleanEnter,
                    onExit: this.onCleanExit,
                })
            .addState(States.STEALTH, {
                onEnter: this.onStealthEnter,
                onUpdate: this.onStealthUpdate,
                onExit: this.onStealthExit,
            })

        this.metaMachine.setState(States.CLEAN);
        
        this.sensorDisp = PLAYER.SENSOR.DISPLACEMENT;
        this.colliderDisp = PLAYER.COLLIDER.DISPLACEMENT;
        this.stealthFx = this.scene.sound.add('stealth', { volume: this.scene.gameState.soundEffectVolume, loop: false });
        this.caerenicFx = this.scene.sound.add('caerenic', { volume: this.scene.gameState.soundEffectVolume, loop: false });
        this.stalwartFx = this.scene.sound.add('stalwart', { volume: this.scene.gameState.soundEffectVolume, loop: false });
        this.prayerFx = this.scene.sound.add('prayer', { volume: this.scene.gameState.soundEffectVolume, loop: false });

        // const helmetName = scene?.state?.player?.helmet.imgURL.split('/')[2].split('.')[0];
        // const chestName = scene?.state?.player?.chest.imgURL.split('/')[2].split('.')[0];
        // const legsName = scene?.state?.player?.legs.imgURL.split('/')[2].split('.')[0];
        
        // this.spriteHelmet = new Phaser.GameObjects.Sprite(this.scene, 0, 0, helmetName);
        // this.spriteHelmet.setScale(0.35);
        // this.spriteHelmet.setOrigin(0.5, 1.15);
        // this.spriteHelmet.setDepth(this + 1);
        // this.scene.add.existing(this.spriteHelmet);
        
        // this.spriteLegs = new Phaser.GameObjects.Sprite(this.scene, 0, 0, legsName);
        // this.spriteLegs.setScale(0.55);
        // this.spriteLegs.setOrigin(0.5, -0.5);
        // this.spriteLegs.setDepth(this);
        // this.scene.add.existing(this.spriteLegs);
        
        // this.spriteChest = new Phaser.GameObjects.Sprite(this.scene, 0, 0, chestName);
        // this.spriteChest.setScale(0.55);
        // this.spriteChest.setOrigin(0.5, 0.25);
        // this.spriteChest.setDepth(this + 3);
        // this.scene.add.existing(this.spriteChest);

        this.setScale(PLAYER.SCALE.SELF);   
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.rectangle(this.x, this.y + 10, PLAYER.COLLIDER.WIDTH, PLAYER.COLLIDER.HEIGHT, { isSensor: false, label: 'playerCollider' }); // Y + 10 For Platformer
        let playerSensor = Bodies.circle(this.x, this.y + 2, PLAYER.SENSOR.DEFAULT, { isSensor: true, label: 'playerSensor' }); // Y + 2 For Platformer
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35, 
            restitution: 0.2,  
        });
        this.setExistingBody(compoundBody);                                    
        this.sensor = playerSensor;
        this.knocking = false;
        this.isCaerenic = false;
        this.isTshaering = false;
        this.tshaeringTimer = null;
        // this.setGlow(this.spriteWeapon);
        this.highlight = this.scene.add.graphics()
            .lineStyle(3, 0xFF0000)
            .setScale(0.35)
            .strokeCircle(0, 0, 10); 
        this.scene.plugins.get('rexGlowFilterPipeline').add(this.highlight, {
            intensity: 0.005,
        });
        this.highlight.setVisible(false);
        this.healthbar = new HealthBar(this.scene, this.x, this.y, scene.state.playerHealth, 'player');
        this.castbar = new CastingBar(this.scene, this.x, this.y, 0, this);

        this.setFixedRotation();   
        this.checkEnemyCollision(playerSensor);
        this.playerStateListener();
        this.checkLootdropCollision(playerSensor);
        this.checkNpcCollision(playerSensor);
    };  

    multiplayerMovement = () => {
        EventEmitter.emit('playerMoving', { 
            x: this.x, y: this.y, flipX: this.flipX, attacking: this.isAttacking, countering: this.isCountering,
            dodging: this.isDodging, posturing: this.isPosturing, rolling: this.isRolling, isMoving: this.isMoving,
            consuming: this.isConsuming, caerenic: this.isCaerenic, tshaering: this.isTshaering, polymorphing: this.isPolymorphing,
            praying: this.isPraying, healing: this.isHealing, stunned: this.isStunned, stealthing: this.isStealthing,
            currentWeaponSprite: this.currentWeaponSprite, currentShieldSprite: this.currentShieldSprite, health: this.health,
            velocity: { x: this.playerVelocity.x, y: this.playerVelocity.y },
        });
    };

    cleanUp() {
        EventEmitter.off('update-combat-data', this.constantUpdate);
        EventEmitter.off('update-combat', this.eventUpdate);
    };

    highlightTarget(sprite) {
        this.highlight.setVisible(true);
        this.setDepth(sprite.depth + 1);
        this.highlight.setPosition(sprite.x, sprite.y);
    };

    removeHighlight() {
        this.highlight.setVisible(false);
    };

    assetSprite(asset) {
        return asset.imgURL.split('/')[2].split('.')[0];
    };

    playerStateListener = () => {
        EventEmitter.on('update-combat-data', this.constantUpdate); 
        EventEmitter.on('update-combat', this.eventUpdate);
        EventEmitter.on('disengage', this.disengage); 
    }; 

    disengage = () => {
        this.inCombat = false;
        this.attacking = null;
        this.currentTarget = null;
        this.scene.clearNAEnemy();
        this.removeHighlight();
        this.scene.combatEngaged(false);
    };

    constantUpdate = (e) => {
        if (this.health > e.newPlayerHealth) {
            // this.isHurt = true;
            // this.clearAnimations();
            let damage = Math.round(this.health - e.newPlayerHealth);
            this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, damage, 1500, 'damage', e.computerCriticalSuccess);
            console.log(`%c ${damage} Damage Taken by ${e?.computer?.name}`, 'color: #ff0000')
        };
        if (this.health < e.newPlayerHealth) {
            let heal = Math.round(e.newPlayerHealth - this.health);
            this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, heal, 1500, 'heal');
        };
        if (this.currentRound !== e.combatRound) {
            this.currentRound = e.combatRound;
            if (this.targets.length) this.checkTargets(); // Was inside playerWin
        };
        this.health = e.newPlayerHealth;
        this.healthbar.setValue(this.health);
        if (this.healthbar.getTotal() < e.playerHealth) this.healthbar.setTotal(e.playerHealth);
        if (e.newPlayerHealth <= 0) {
            // this.isDead = true;
            this.inCombat = false;
            this.attacking = null;
            this.anims.play('player_pray', true).on('animationcomplete', () => {
                this.anims.play('player_idle', true);
            });
        };
        this.checkWeapons(e.weapons[0], e.playerDamageType.toLowerCase());
    };

    eventUpdate = (e) => {
        if (e.computerCounterSuccess) {
            this.stateMachine.setState(States.STUN);
            this.scene.combatMachine.input('computerCounterSuccess', false);
            this.specialCombatText = new ScrollingCombatText(this.scene, this.attacking?.position?.x, this.attacking?.position?.y, 'Counter', 1500, 'damage', e.computerCriticalSuccess);    
        };
        if (e.rollSuccess) {
            this.specialCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Roll', 1500, 'heal', e.criticalSuccess);
        };
        if (e.counterSuccess) {
            this.specialCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Counter', 1500, 'heal', e.criticalSuccess);
        };
        if (e.computerRollSuccess) {
            this.specialCombatText = new ScrollingCombatText(this.scene, this.attacking?.position?.x, this.attacking?.position?.y, 'Roll', 1500, 'damage', e.computerCriticalSuccess);
        };
        if (e.newComputerHealth <= 0 && e.playerWin) {
            if (this.isTshaering) this.isTshaering = false;
            if (this.tshaeringTimer) {
                this.tshaeringTimer.remove(false);
                this.tshaeringTimer = null;
            };
            
            this.defeatedEnemyCheck(e.enemyID);
            
            this.winningCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Victory', 3000, 'effect', true);    
        };    
    };

    checkWeapons = (weapon, damage) => {
        this.currentDamageType = damage;    
        this.hasMagic = this.checkDamageType(damage, 'magic');
        this.checkMeleeOrRanged(weapon);
    };

    defeatedEnemyCheck = (enemy) => {
        this.targets = this.targets.filter(obj => obj.enemyID !== enemy);
        this.scene.combatMachine.clear(enemy);
        if (this.targets.every(obj => !obj.inCombat)) {
            this.inCombat = false;
            this.attacking = null;
            if (this.currentTarget) {
                this.currentTarget.clearTint();
                this.currentTarget = null;
            };
        } else {
            if (this.currentTarget.enemyID === enemy) { // Was targeting the enemy that was defeated
                this.currentTarget.clearTint();
                const newTarget = this.targets.find(obj => obj.enemyID !== enemy);
                if (!newTarget) return;
                this.scene.setupEnemy(newTarget);
                this.currentTarget = newTarget;
                this.attacking = newTarget;
                this.targetID = newTarget.enemyID;
                this.highlightTarget(newTarget);
            }; 
        };
    };

    isPlayerInCombat = () => {
        return this.inCombat || this.scene.combat || this.scene.state.combatEngaged;
    };

    shouldPlayerEnterCombat = (enemy) => {
        const hasAggressiveEnemy = enemy?.isAggressive;
        const hasRemainingEnemies = this.scene.combat && this.scene.state.combatEngaged && this.inCombat;
    
        if (hasAggressiveEnemy && !hasRemainingEnemies) {
            return true;
        };
    
        return false;
    }; 

    enterCombat = (other) => {
        this.scene.setupEnemy(other.gameObjectB);
        this.actionTarget = other;
        this.attacking = other.gameObjectB;
        this.currentTarget = other.gameObjectB;
        this.targetID = other.gameObjectB.enemyID;
        this.scene.combatEngaged(true);
        this.highlightTarget(other.gameObjectB);
        this.inCombat = true;
    };

    isAttackTarget = (enemy) => {
        if (this.attacking?.enemyID === enemy.enemyID) {
            return true;
        };
        return false;
    };

    isNewEnemy = (enemy) => {
        const newEnemy = !this.targets.some(obj => obj.enemyID === enemy.enemyID);
        if (newEnemy) {
            this.targets.push(enemy);
            return true;
        };
        return false;
    };

    isValidEnemyCollision(other) {
        return (
            other.gameObjectB &&
            other.gameObjectB.name === 'enemy' &&
            other.bodyB.label === 'enemyCollider' &&
            other.gameObjectB.isAggressive &&
            other.gameObjectB.ascean
        );
    };
 
    checkEnemyCollision(playerSensor) {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [playerSensor],
            callback: (other) => {
                if (this.isValidEnemyCollision(other)) {
                    const isNewEnemy = this.isNewEnemy(other.gameObjectB);
                    if (!isNewEnemy) return;
                    if (this.shouldPlayerEnterCombat(other.gameObjectB)) {
                        this.enterCombat(other);
                    };
                    this.touching.push(other.gameObjectB);
                    this.checkTargets();
                };
            },
            context: this.scene,
        });

        this.scene.matterCollision.addOnCollideActive({
            objectA: [playerSensor],
            callback: (other) => {
                if (this.isValidEnemyCollision(other)) {
                    const collisionPoint = this.calculateCollisionPoint(other);
                    const attackDirection = this.getAttackDirection(collisionPoint);
                    if (attackDirection === this.flipX) {
                        this.actionAvailable = true;
                        this.triggeredActionAvailable = other.gameObjectB;
                        if (!this.actionTarget) this.actionTarget = other;
                        if (!this.attacking) this.attacking = other.gameObjectB;
                        if (!this.currentTarget) this.currentTarget = other.gameObjectB;
                        if (!this.targetID) this.targetID = other.gameObjectB.enemyID;    
                    };
                };
            },
            context: this.scene,
        });

        this.scene.matterCollision.addOnCollideEnd({
            objectA: [playerSensor],
            callback: (other) => {
                this.touching = this.touching.filter(obj => obj?.enemyID !== other?.gameObjectB?.enemyID);
                if (this.isValidEnemyCollision(other) && !this.touching.length) {
                    this.actionAvailable = false;
                    this.triggeredActionAvailable = null;
                    this.checkTargets(); // Was outside of if statement
                };
            },
            context: this.scene,
        });
    };

    checkLootdropCollision(playerSensor) {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.bodyB.label === 'lootdropCollider') {
                    this.interacting.push(other.gameObjectB);
                    const interactingLoot = { loot: other.gameObjectB._id, interacting: true };
                    EventEmitter.emit('interacting-loot', interactingLoot);
                };
            },
            context: this.scene,
        }); 

        this.scene.matterCollision.addOnCollideEnd({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.bodyB.label === 'lootdropCollider') {
                    this.interacting = this.interacting.filter(obj => obj.id !== other.gameObjectB.id);
                    const interactingLoot = { loot: other.gameObjectB._id, interacting: false };
                    EventEmitter.emit('interacting-loot', interactingLoot);
                };
            },
            context: this.scene,
        });
    };

    checkNpcCollision = (playerSensor) => {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.bodyB.label === 'npcCollider' && !this.inCombat) { 
                    const isNewNpc = !this.targets.some(obj => obj.enemyID === other.gameObjectB.enemyID);
                    if (isNewNpc && !isNewNpc.isDead) this.targets.push(other.gameObjectB);
                    this.currentTarget = other.gameObjectB;
                    this.targetID = other.gameObjectB.enemyID;
                    if ((!this.scene.state.computer || this.scene.state.computer._id !== other.gameObjectB.ascean._id)) this.scene.setupNPC(other.gameObjectB);
                };
            },
            context: this.scene,
        }); 

        this.scene.matterCollision.addOnCollideEnd({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.bodyB.label === 'npcCollider' && (!this.inCombat || this.currentTarget.enemyID === other.gameObjectB.enemyID || other.gameObjectB.interacting)) { 
                    this.targets = this.targets.filter(obj => obj.enemyID !== other.gameObjectB.enemyID);
                    this.scene.clearNPC();
                };
                this.checkTargets();
            },
            context: this.scene,
        });
    };

    calculateCollisionPoint(other) {
        const bodyPosition = other.pair.gameObjectB.body.position;
        const offset = Phaser.Physics.Matter.Matter.Vector.mult(other.pair.collision.normal, other.pair.collision.depth);
        return Phaser.Physics.Matter.Matter.Vector.add(bodyPosition, offset);
    };
    
    getAttackDirection(collisionPoint) {
        const sensorPosition = this.sensor.position;
        return collisionPoint.x < sensorPosition.x;
    };

    combatChecker = (state) => {
        if (state) return;
        if (this.inCombat) {
            this.stateMachine.setState(States.COMBAT); 
        } else {
            this.stateMachine.setState(States.NONCOMBAT); 
        };
    };

    onNonCombatEnter = () => {
        this.anims.play('player_idle', true);
        if (this.scene.combatTimer) this.scene.stopCombatTimer();
        if (this.currentRound !== 0) this.currentRound = 0;
    };
    onNonCombatUpdate = (dt) => {
        if (this.isMoving) this.isMoving = false;
        if (this.inCombat) this.stateMachine.setState(States.COMBAT);
    };
    onNonCombatExit = () => {
        this.anims.stop('player_idle');
    };

    onCombatEnter = () => {};
    onCombatUpdate = (dt) => { 
        if (!this.inCombat) this.stateMachine.setState(States.NONCOMBAT);  
    }; 

    onAttackEnter = () => {
        this.isAttacking = true;
        this.swingReset(States.ATTACK);
        this.scene.useStamina(PLAYER.STAMINA.ATTACK);
    }; 
    onAttackUpdate = (dt) => {
        if (this.frameCount === FRAME_COUNT.ATTACK_LIVE && !this.isRanged) {
            this.scene.combatMachine.input('action', 'attack');
        };
        this.combatChecker(this.isAttacking);
    }; 
    onAttackExit = () => {
        if (this.scene.state.action !== '') this.scene.combatMachine.input('action', '');
    };

    onCounterEnter = () => {
        this.isCountering = true;    
        this.swingReset(States.COUNTER);
        this.scene.useStamina(PLAYER.STAMINA.COUNTER);
    };
    onCounterUpdate = (dt) => {
        if (this.frameCount === FRAME_COUNT.COUNTER_LIVE && !this.isRanged) {
            this.scene.combatMachine.input('action', 'counter');
        };
        this.combatChecker(this.isCountering);
    };
    onCounterExit = () => {
        if (this.scene.state.action !== '') this.scene.combatMachine.input('action', '');
        if (this.scene.state.counterGuess !== '') this.scene.combatMachine.input('counterGuess', '');
    };

    onPostureEnter = () => {
        this.isPosturing = true;
        this.swingReset(States.POSTURE);
        this.scene.useStamina(PLAYER.STAMINA.POSTURE);
    };
    onPostureUpdate = (dt) => {
        if (this.frameCount === FRAME_COUNT.POSTURE_LIVE && !this.isRanged) { //
            this.scene.combatMachine.input('action', 'posture');
        };
        this.combatChecker(this.isPosturing);
    };
    onPostureExit = () => {
        if (this.scene.state.action !== '') this.scene.combatMachine.input('action', '');
    };

    onRollEnter = () => {
        this.isRolling = true;
        if (this.inCombat) this.swingReset(States.ROLL);
        this.scene.useStamina(PLAYER.STAMINA.ROLL);
        this.body.parts[2].position.y += this.sensorDisp;
        this.body.parts[2].circleRadius = PLAYER.SENSOR.EVADE;
        this.body.parts[1].vertices[0].y += this.colliderDisp;
        this.body.parts[1].vertices[1].y += this.colliderDisp; 
    };
    onRollUpdate = (dt) => {
        if (this.frameCount === FRAME_COUNT.ROLL_LIVE && !this.isRanged) this.scene.combatMachine.input('action', 'roll');
        this.combatChecker(this.isRolling);
    };
    onRollExit = () => {
        this.spriteWeapon.setVisible(true);
        this.rollCooldown = 0; 
        if (this.scene.state.action !== '') this.scene.combatMachine.input('action', '');
        this.body.parts[2].position.y -= this.sensorDisp;
        this.body.parts[2].circleRadius = PLAYER.SENSOR.DEFAULT;
        this.body.parts[1].vertices[0].y -= this.colliderDisp;
        this.body.parts[1].vertices[1].y -= this.colliderDisp;
    };

    onDodgeEnter = () => {
        this.isDodging = true;
        this.scene.useStamina(15);
        this.wasFlipped = this.flipX; 
        this.body.parts[2].position.y += this.sensorDisp;
        this.body.parts[2].circleRadius = PLAYER.SENSOR.EVADE;
        this.body.parts[1].vertices[0].y += this.colliderDisp;
        this.body.parts[1].vertices[1].y += this.colliderDisp; 
        this.body.parts[0].vertices[0].x += this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[1].x += this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[0].vertices[1].x += this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[0].x += this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
    };
    onDodgeUpdate = (dt) => { 
        this.combatChecker(this.isDodging);
    };
    onDodgeExit = () => {
        this.spriteWeapon.setVisible(true);
        this.dodgeCooldown = 0;
        this.isDodging = false;
        this.body.parts[2].position.y -= this.sensorDisp;
        this.body.parts[2].circleRadius = PLAYER.SENSOR.DEFAULT;
        this.body.parts[1].vertices[0].y -= this.colliderDisp;
        this.body.parts[1].vertices[1].y -= this.colliderDisp; 
        this.body.parts[0].vertices[0].x -= this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[1].x -= this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[0].vertices[1].x -= this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[0].x -= this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
    };

    onPrayerEnter = () => {
        this.isHealing = true;
    };
    onPrayerUpdate = (dt) => {
        this.combatChecker(this.isHealing);
    };
    onPrayerExit = () => {
        this.scene.drinkFlask();
    };

    onInvokeEnter = () => {
        this.isPraying = true;
        if (!this.isCaerenic) this.glow = this.setGlow(this, true);
        this.invokeCooldown = 30;
        if (this.playerBlessing === '' || this.playerBlessing !== this.scene.state.playerBlessing) {
            this.playerBlessing = this.scene.state.playerBlessing;
        };
    };
    onInvokeUpdate = (dt) => {
        this.combatChecker(this.isPraying);
    };
    onInvokeExit = () => {
        if (!this.isCaerenic) this.glow = this.setGlow(this, false);
        this.scene.combatMachine.action({ type: 'Instant', data: this.scene.state.playerBlessing });
        screenShake(this.scene);
        this.prayerFx.play();
        this.scene.useStamina(PLAYER.STAMINA.INVOKE);
    };

    onCleanEnter = () => {};
    onCleanExit = () => {};

    onStealthEnter = () => {
        this.isStealthing = true; 
        this.stealthEffect(true);    
        EventEmitter.emit('stealth', true);
    };
    onStealthUpdate = (dt) => {
        if (!this.isStealthing || this.currentRound > 1) this.metaMachine.setState(States.CLEAN); 
    };
    onStealthExit = () => { 
        this.isStealthing = false;
        this.stealthEffect(false);
        EventEmitter.emit('stealth', false);
    };

    stealthEffect(stealth) {
        if (stealth) {
            const getStealth = (object) => {
                object.setAlpha(0.7);
                object.setBlendMode(Phaser.BlendModes.SCREEN);
                this.scene.tweens.add({
                    targets: object,
                    tint: 0x00AAFF,
                    duration: 500,
                    yoyo: true,
                    repeat: -1,
                }); 
            };
            getStealth(this);
            getStealth(this.spriteWeapon);
            getStealth(this.spriteShield);
        } else {
            const clearStealth = (object) => {
                this.scene.tweens.killTweensOf(object);
                object.setAlpha(1);
                object.clearTint();
                object.setBlendMode(Phaser.BlendModes.NORMAL);
            };
            clearStealth(this);
            clearStealth(this.spriteWeapon);
            clearStealth(this.spriteShield);
        };
        this.stealthFx.play();    
    };

    onTshaeralEnter = () => {
        this.isTshaering = true;
        this.attacking.isConsumed = true;
        this.scene.useStamina(PLAYER.STAMINA.TSHAER);
        screenShake(this.scene);
        if (!this.isCaerenic) {
            this.setGlow(this, true);
        };
        this.specialCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Tshaering', PLAYER.DURATIONS.TSHAERING / 2, 'damage');
        this.castbar.setTotal(PLAYER.DURATIONS.TSHAERING);
        this.castbar.setTime(PLAYER.DURATIONS.TSHAERING);
        this.tshaeringTimer = this.scene.time.addEvent({
            delay: 250,
            callback: () => {
                if (!this.isTshaering || this.scene.state.playerWin || this.scene.state.newComputerHealth <= 0) {
                    this.tshaeringTimer.remove(false);
                    this.tshaeringTimer = null;
                    return;
                };
                this.scene.combatMachine.action({ type: 'Tshaeral', data: '' });
                // updateBeam(this.scene.time.now);
            },
            callbackScope: this,
            repeat: 8,
        });
        this.setStatic(true);
    };
    onTshaeralUpdate = (dt) => {
        this.combatChecker(this.isTshaering);
        if (this.isTshaering) this.castbar.update(dt, 'channel');
    };
    onTshaeralExit = () => {
        if (this.tshaeringTimer) {
            this.tshaeringTimer.remove(false);
            this.tshaeringTimer = null;
        };
        this.castbar.reset();
        // if (this.beamTimer) {
        //     this.beamTimer.remove();
        //     this.beamTimer = null;
        // };
        if (!this.isCaerenic) {
            this.setGlow(this, false);
        }; 
        // this.tshaeringGraphic.destroy();
        // this.tshaeringGraphic = null;
        screenShake(this.scene);
        this.setStatic(false);
    };

    onPolymorphingEnter = () => {
        this.specialCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Polymorphing', PLAYER.DURATIONS.POLYMORPHING / 2, 'cast');
        this.castbar.setTotal(PLAYER.DURATIONS.POLYMORPHING);
        this.isPolymorphing = true;
        if (!this.isCaerenic) this.setGlow(this, true);
    };
    onPolymorphingUpdate = (dt) => {
        if (this.isMoving) this.isPolymorphing = false;
        this.combatChecker(this.isPolymorphing);
        if (this.castbar.time >= PLAYER.DURATIONS.POLYMORPHING) {
            this.polymorphSuccess = true;
            this.isPolymorphing = false;
        };
        if (this.isPolymorphing) this.castbar.update(dt, 'cast');
    };
    onPolymorphingExit = () => {
        if (this.polymorphSuccess) {
            this.scene.polymorph(this.attacking?.enemyID);
            this.setTimeEvent('polymorphCooldown', 4000);    
            screenShake(this.scene);
            this.polymorphSuccess = false;
        };
        this.castbar.reset();
        if (!this.isCaerenic) this.setGlow(this, false);
    };

    onStunEnter = () => {
        this.isStunned = true;
        this.specialCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Stunned', PLAYER.DURATIONS.STUNNED, 'effect', true);
        this.scene.input.keyboard.enabled = false;
        this.stunDuration = PLAYER.DURATIONS.STUNNED;
        this.setTint(0x888888);
        this.setStatic(true);
    };
    onStunUpdate = (dt) => {
        this.setVelocity(0);
        this.stunDuration -= dt;
        if (this.stunDuration <= 0) this.isStunned = false;
        this.combatChecker(this.isStunned);
    };
    onStunExit = () => {
        this.stunDuration = PLAYER.DURATIONS.STUNNED;
        this.scene.input.keyboard.enabled = true;
        this.clearTint(); 
        this.setStatic(false);
    };

    setTimeEvent = (cooldown, limit = 30000) => {
        this[cooldown] = limit;
        const type = cooldown.split('Cooldown')[0];
        const interval = 1000;
        let time = 0;
        this.scene.actionBar.setCurrent(time, limit, type);
        const timer = this.scene.time.addEvent({
            delay: interval,
            callback: () => {
                time += interval;
                this.scene.actionBar.setCurrent(time, limit, type);
                if (time >= limit || !this.inCombat) {
                    if (!this.inCombat) this.scene.actionBar.setCurrent(limit, limit, type);
                    this[cooldown] = 0;
                    timer.remove(false);
                    timer.destroy();
                };
            },
            callbackScope: this,
            loop: true,
        });
    };

    swingReset = (type) => {
        this.canSwing = false;
        this.scene.time.delayedCall(this.swingTimer, () => {
            this.canSwing = true;
        }, null, this);
        let time = 0;
        this.scene.actionBar.setCurrent(time, this.swingTimer, type);
        const swingTime = this.scene.time.addEvent({
            delay: this.scene.game.loop.delta,
            callback: () => {
                if (time >= this.swingTimer) {
                    swingTime.remove(false);
                    swingTime.destroy();
                    return;
                };
                time += this.scene.game.loop.delta; // 16.667ms~ / this.swingTimer ?? 
                this.scene.actionBar.setCurrent(time, this.swingTimer, type);
            },
            callbackScope: this,
            loop: true,
        });
    };

    checkTargets = () => {
        const playerCombat = this.isPlayerInCombat();
        this.targets = this.targets.filter(gameObject => {
            if (gameObject.isDead || !gameObject.inCombat) { // && playerCombat
                return false;
            };
            if (gameObject.npcType && playerCombat) {
                this.scene.combatEngaged(false);
                this.inCombat = false;
            };
            return true;
        });

        if (!this.targets.length && this.scene.state.computer) {
            this.scene.clearNAEnemy();
        };

        const someInCombat = this.targets.some(gameObject => gameObject.inCombat);
        if (someInCombat && !playerCombat) {
            this.scene.combatEngaged(true);
            this.inCombat = true;
        } else if (!someInCombat && playerCombat && !this.isStealthing) {
            this.scene.clearNAEnemy();
            this.scene.combatEngaged(false);
            this.inCombat = false;
        };

        if (!this.touching.length && (this.triggeredActionAvailable || this.actionAvailable)) {
            if (this.triggeredActionAvailable) this.triggeredActionAvailable = null;
            if (this.actionAvailable) this.actionAvailable = false;
        };
    };

    removeTarget = (enemyID) => {
        this.targets = this.targets.filter(gameObject => gameObject.enemyID !== enemyID);
        this.checkTargets();
    };
    
    zeroOutVelocity = (velocityDirection, deceleration) => {
        if (velocityDirection > 0) {
            velocityDirection -= deceleration;
            if (velocityDirection < 0) velocityDirection = 0;
        } else if (velocityDirection < 0) {
            velocityDirection += deceleration;
            if (velocityDirection > 0) velocityDirection = 0;
        };
        return velocityDirection;
    };

    enemyIdMatch = () => {
        return this.attackedTarget.enemyID === this.scene.state.enemyID;
    };

    checkPlayerAction = () => {
        if (this.scene.state.action) return this.scene.state.action;    
        if (this.isAttacking) return 'attack';
        if (this.isCountering) return 'counter';
        if (this.isPosturing) return 'posture';
        if (this.isRolling) return 'roll';
        return '';
    };
    
    movementClear = () => {
        return (
            !this.stateMachine.isCurrentState(States.ROLL) &&
            !this.stateMachine.isCurrentState(States.DODGE) &&
            !this.stateMachine.isCurrentState(States.COUNTER) &&
            !this.stateMachine.isCurrentState(States.ATTACK) &&
            !this.stateMachine.isCurrentState(States.POSTURE) &&
            !this.stateMachine.isCurrentState(States.INVOKE) &&
            !this.stateMachine.isCurrentState(States.TSHAERAL) &&
            !this.stateMachine.isCurrentState(States.HEAL) &&
            !this.isStalwart
        );
    };

    playerActionSuccess = async () => {
        const match = this.enemyIdMatch();
        if (this.particleEffect) {
            if (match) {
                this.scene.combatMachine.action({ type: 'Weapon',  data: { key: 'action', value: this.particleEffect.action } });
            } else {
                this.scene.combatMachine.action({ type: 'Player', data: { playerAction: { action: this.particleEffect.action, counter: this.scene.state.counterGuess },  enemyID: this.attackedTarget.enemyID, ascean: this.attackedTarget.ascean, damageType: this.attackedTarget.currentDamageType, combatStats: this.attackedTarget.combatStats, weapons: this.attackedTarget.weapons, health: this.attackedTarget.health, actionData: { action: this.attackedTarget.currentAction, counter: this.attackedTarget.counterAction } } });
            };
            this.scene.particleManager.removeEffect(this.particleEffect.id);
            this.particleEffect.effect.destroy();
            this.particleEffect = null;
        } else {
            const action = this.checkPlayerAction();
            if (!action) return;
            if (match) { // Target Player Attack
                this.scene.combatMachine.action({ type: 'Weapon',  data: { key: 'action', value: action } });
            } else { // Blind Player Attack
                this.scene.combatMachine.action({ type: 'Player', data: { playerAction: { action: action, counter: this.scene.state.counterGuess }, enemyID: this.attackedTarget.enemyID, ascean: this.attackedTarget.ascean, damageType: this.attackedTarget.currentDamageType, combatStats: this.attackedTarget.combatStats, weapons: this.attackedTarget.weapons, health: this.attackedTarget.health, actionData: { action: this.attackedTarget.currentAction, counter: this.attackedTarget.counterAction }} });
            };
        };
            
        if (!this.isRanged) this.knockback(this.actionTarget); // actionTarget
        // screenShake(this.scene); 
    };

    playerDodge = () => {
        this.dodgeCooldown = 50; // Was a 6x Mult for Dodge Prev aka 1728
        const dodgeDistance = 2800; // 126 || 2304
        const dodgeDuration = 350; // 18 || 288  
        let currentDistance = 0;

        const dodgeLoop = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
        
            if (progress >= dodgeDuration || currentDistance >= dodgeDistance) {
                this.spriteWeapon.setVisible(true);
                this.dodgeCooldown = 0;
                this.isDodging = false;
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

    playerRoll = () => {
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

    handleActions = () => {
        // ========================= Tab Targeting ========================= \\
        
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.target.TAB) && this.targets.length) { // was > 1 More than 1 i.e. worth tabbing
            if (this.currentTarget) {
                this.currentTarget.clearTint();
            };
            const newTarget = this.targets[this.targetIndex];
            this.targetIndex = this.targetIndex + 1 >= this.targets.length ? 0 : this.targetIndex + 1;
            if (!newTarget) return;
            if (newTarget.npcType) { // NPC
                this.scene.setupNPC(newTarget);
            } else { // Enemy
                this.scene.setupEnemy(newTarget);
                this.attacking = newTarget;
            };
            this.currentTarget = newTarget;
            this.targetID = newTarget.enemyID;
            this.highlightTarget(newTarget);
        };

        if (this.currentTarget) {
            this.highlightTarget(this.currentTarget); 
            if (this.inCombat && !this.scene.state.computer) {
                this.scene.setupEnemy(this.currentTarget);
            }; 
        } else {
            if (this.highlight.visible) {
                this.removeHighlight();
            };
        };

        // ========================= Player Combat Actions ========================= \\

        if (this.inCombat && this.attacking) {
            if (this.stamina >= PLAYER.STAMINA.COUNTER && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
                this.scene.combatMachine.input('counterGuess', 'attack');
                this.stateMachine.setState(States.COUNTER);           
            };
            if (this.stamina >= PLAYER.STAMINA.COUNTER && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
                this.scene.combatMachine.input('counterGuess', 'posture');
                this.stateMachine.setState(States.COUNTER);
            };
            if (this.stamina >= PLAYER.STAMINA.COUNTER && this.movementClear() && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
                this.scene.combatMachine.input('counterGuess', 'roll');
                this.stateMachine.setState(States.COUNTER);
            };
        
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE) && this.stamina >= PLAYER.STAMINA.ATTACK && this.canSwing) {
                this.stateMachine.setState(States.ATTACK);
            };
            
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO) && this.stamina >= PLAYER.STAMINA.POSTURE && this.canSwing) {
                this.stateMachine.setState(States.POSTURE);
            };

            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE) && this.stamina >= PLAYER.STAMINA.COUNTER && this.canSwing) {
                this.scene.combatMachine.input('counterGuess', 'counter');
                this.stateMachine.setState(States.COUNTER);
            };
            if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.snare.V) && this.rootCooldown === 0) {
                this.scene.root();
                this.setTimeEvent('rootCooldown', 6000);
                screenShake(this.scene);
            };
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.snare.V) && this.snareCooldown === 0) {
                this.scene.snare(this.attacking.enemyID);
                this.setTimeEvent('snareCooldown', 6000);
            };
            if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.pray.R) && !this.isMoving && this.polymorphCooldown === 0) { // && this.polymorphCooldown === 0
                this.stateMachine.setState(States.POLYMORPHING);
            };
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.pray.R) && this.invokeCooldown === 0) {
                if (this.scene.state.playerBlessing === '') return;
                this.setTimeEvent('invokeCooldown');
                this.stateMachine.setState(States.INVOKE);
            };
            if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.consume.F) && this.stamina >= PLAYER.STAMINA.TSHAER && this.tshaeralCooldown === 0) { // this.tshaeralCooldown === 0
                this.stateMachine.setState(States.TSHAERAL);
                this.setTimeEvent('tshaeralCooldown', 15000);
                this.scene.time.addEvent({
                    delay: 2000,
                    callback: () => {
                        this.isTshaering = false;
                    },
                    callbackScope: this,
                    loop: false,
                });
            };
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.consume.F)) {
                if (this.scene.state.playerEffects.length === 0) return;
                this.isConsuming = true;
                this.scene.combatMachine.action({ type: 'Consume', data: this.scene.state.playerEffects });
                screenShake(this.scene);
            };
        };

        // ========================= Player Movement Actions ========================= \\

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE) && this.stamina >= PLAYER.STAMINA.ROLL && this.movementClear()) {
            this.stateMachine.setState(States.ROLL);
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.dodge.FOUR) && this.stamina >= PLAYER.STAMINA.DODGE && this.movementClear()) {
            this.stateMachine.setState(States.DODGE);
        };

        // ========================= Player Utility Actions ========================= \\

        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.stalwart.G)) {
            this.isCaerenic = this.isCaerenic ? false : true;
            this.caerenicFx.play();
            if (this.isCaerenic) {
                this.scene.caerenic(true);
                this.setGlow(this, true);
                this.adjustSpeed(PLAYER.SPEED.CAERENIC);
            } else {
                this.scene.caerenic(false);
                this.setGlow(this, false);
                this.adjustSpeed(-PLAYER.SPEED.CAERENIC);
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.stalwart.G)) {
            this.isStalwart = this.isStalwart ? false : true;
            this.stalwartFx.play();
            if (this.isStalwart) {
                this.scene.stalwart(true);
            } else {
                this.scene.stalwart(false);
            };
        }; 

        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.firewater.T)) {
            if (this.isStealthing) {
                this.isStealthing = false;
            } else {
                this.metaMachine.setState(States.STEALTH);
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.firewater.T)) {
            this.stateMachine.setState(States.HEAL);
        };
    };

    handleAnimations = () => {
        if (this.isStunned) {
            this.setVelocity(0);
        } else if (this.isHurt) {
            this.anims.play('player_hurt', true).on('animationcomplete', () => this.isHurt = false);  
        } else if (this.isCountering) {
            this.anims.play('player_attack_2', true).on('animationcomplete', () => this.isCountering = false);
        } else if (this.isDodging) { 
            this.anims.play('player_slide', true);
            this.spriteWeapon.setVisible(false);
            if (this.dodgeCooldown === 0) this.playerDodge();
        } else if (this.isRolling) { 
            this.anims.play('player_roll', true);
            walk(this.scene);
            this.spriteWeapon.setVisible(false);
            if (this.rollCooldown === 0) this.playerRoll();
        } else if (this.isPosturing) {
            walk(this.scene);
            this.anims.play('player_attack_3', true).on('animationcomplete', () => this.isPosturing = false);
        } else if (this.isAttacking) {
            walk(this.scene);
            this.anims.play('player_attack_1', true).on('animationcomplete', () => this.isAttacking = false); 
        } else if ((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) {
            // walk(this.scene);
            if (!this.isMoving) this.isMoving = true;
            this.anims.play('player_running', true);
        } else if (this.isConsuming) { 
            this.anims.play('player_health', true).on('animationcomplete', () => this.isConsuming = false);
        } else if (this.isPolymorphing) { 
            this.anims.play('player_health', true);
        } else if (this.isTshaering) {
            this.anims.play('player_health', true);
        } else if (this.isHealing) {
            this.anims.play('player_pray', true).on('animationcomplete', () => this.isHealing = false);
        } else if (this.isPraying) {
            this.anims.play('player_pray', true).on('animationcomplete', () => this.isPraying = false);
        } else {
            if (this.isMoving) this.isMoving = false;
            this.anims.play('player_idle', true);
        };
        this.spriteWeapon.setPosition(this.x, this.y);
        this.spriteShield.setPosition(this.x, this.y);
        // this.spriteHelmet.setPosition(this.x, this.y);
        // this.spriteLegs.setPosition(this.x, this.y);
        // this.spriteChest.setPosition(this.x, this.y);
    };

    handleConcerns = () => {
        if (this.actionSuccess) {
            this.actionSuccess = false;
            this.playerActionSuccess();
        };
        if (this.particleEffect) { 
            if (this.particleEffect.success) {
                this.particleEffect.triggered = true;
                this.particleEffect.success = false;
                this.playerActionSuccess();
            } else {
                this.scene.particleManager.update(this, this.particleEffect);
            };
        };
        if (this.inCombat && !this.scene.combatTimer) this.scene.startCombatTimer();
        if (this.inCombat && !this.healthbar.visible) this.healthbar.setVisible(true);
        if (this.currentWeaponSprite !== this.assetSprite(this.scene.state.weapons[0])) {
            this.currentWeaponSprite = this.assetSprite(this.scene.state.weapons[0]);
            this.spriteWeapon.setTexture(this.currentWeaponSprite);
            if (this.scene.state.weapons[0].grip === 'Two Hand') {
                this.spriteWeapon.setScale(PLAYER.SCALE.WEAPON_TWO);
            } else {
                this.spriteWeapon.setScale(PLAYER.SCALE.WEAPON_ONE);
            };
        };
        if (this.currentShieldSprite !== this.assetSprite(this.scene.state.player.shield)) {
            this.currentShieldSprite = this.assetSprite(this.scene.state.player.shield);
            this.spriteShield.setTexture(this.currentShieldSprite);
        }; 
        if (this.healthbar) this.healthbar.update(this);
        if (this.scrollingCombatText) this.scrollingCombatText.update(this);
        if (this.winningCombatText) this.winningCombatText.update(this);
        if (this.specialCombatText) this.specialCombatText.update(this);

        this.weaponRotation('player', this.currentTarget);
    };

    handleMovement = () => {
        let speed = this.speed;

        // =================== MOVEMENT ================== \\

        if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
            this.playerVelocity.x += this.acceleration;
            if (this.flipX) this.flipX = false;
        };

        if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
            this.playerVelocity.x -= this.acceleration;
            this.flipX = true;
        };

        if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown)) {
            this.playerVelocity.y -= this.acceleration;
        }; 

        if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
            this.playerVelocity.y += this.acceleration;
        };

        // =================== STRAFING ================== \\

        if (this.inputKeys.strafe.E.isDown) {
            this.playerVelocity.x = speed; // 1.75
            if (!this.flipX) this.flipX = true;
        };
        if (this.inputKeys.strafe.Q.isDown) {
            this.playerVelocity.x = -speed; // 1.75
            if (this.flipX) this.flipX = false;
        };

        // ========================= Twisting ========================= \\

        if (this.holdingBothMouseButtons) {
            this.flipX = this.body.velocity.x < 0;
            this.playerVelocity.x += Math.cos(this.angle) + this.acceleration;
            this.playerVelocity.y += Math.sin(this.angle) + this.acceleration; 
        };

        // =================== DECELERATION ================== \\

        if (!this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown && this.playerVelocity.x !== 0 && !this.inputKeys.strafe.E.isDown && !this.inputKeys.strafe.Q.isDown && !this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown) {
            this.playerVelocity.x = this.zeroOutVelocity(this.playerVelocity.x, this.deceleration);
        };
        if (!this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown && this.playerVelocity.x !== 0 && !this.inputKeys.strafe.E.isDown && !this.inputKeys.strafe.Q.isDown && !this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown) {
            this.playerVelocity.x = this.zeroOutVelocity(this.playerVelocity.x, this.deceleration);
        };
        if (!this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown && this.playerVelocity.y !== 0 && !this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown) {
            this.playerVelocity.y = this.zeroOutVelocity(this.playerVelocity.y, this.deceleration);
        };
        if (!this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown && this.playerVelocity.y !== 0 && !this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown) {
            this.playerVelocity.y = this.zeroOutVelocity(this.playerVelocity.y, this.deceleration);
        };

        // =================== VARIABLES IN MOTION ================== \\

        if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
            if (!this.spriteShield.visible && !this.isDodging && !this.isRolling) this.spriteShield.setVisible(true);
            if (!this.isStrafing) this.isStrafing = true;
        } else if (this.isStrafing) {
            this.isStrafing = false;
        };
        
        if (this.isAttacking || this.isCountering || this.isPosturing) speed += 1;
        
        // ==================== SETTING VELOCITY ==================== \\
        
        this.playerVelocity.limit(speed);
        this.setVelocity(this.playerVelocity.x, this.playerVelocity.y);
        // console.log(this.scene.multiplayer)
        // this.multiplayerMovement(); 
    }; 
    update() {
        this.handleConcerns();
        this.stateMachine.update(this.dt);
        this.metaMachine.update(this.dt);
        this.handleActions();
        this.handleAnimations();
        this.handleMovement();
    };

    isAtEdgeOfLedge(scene) {
        const playerSensor = this.body.parts[2]; // Assuming playerSensor is the second part of the compound body
        const rayStart = { x: playerSensor.position.x - playerSensor.circleRadius, y: playerSensor.position.y }; // Starting point of the ray
        const rayEnd = { x: playerSensor.position.x + playerSensor.circleRadius, y: playerSensor.position.y - playerSensor.circleRadius }; // Ending point of the ray
        const bodies = scene.matter.world.getAllBodies().filter(body => body.gameObject && body.gameObject?.tile?.properties?.isGround);
        let isAtEdge = false;
        const intersections = scene.matter.intersectRay(rayStart.x, rayStart.y, rayEnd.x, rayEnd.y, 36, bodies).filter(intersection => intersection.id !== playerSensor.id);
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