import Phaser from "phaser";
import Entity, { screenShake, walk } from "./Entity";  
import StateMachine, { States } from "../phaser/StateMachine";
import ScrollingCombatText from "../phaser/ScrollingCombatText";
import HealthBar from "../phaser/HealthBar";
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
import EventEmitter from "../phaser/EventEmitter";
 
export default class Player extends Entity {
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
        console.log(scene.state, "Scene State in Player.js");
        super({ ...data, name: 'player', ascean: scene.state.player, health: scene.state.newPlayerHealth }); 
        const spriteName = scene?.state?.player?.weapon_one.imgURL.split('/')[2].split('.')[0];
        this.ascean = scene.state.player;
        this.playerID = scene.state.player._id;
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, spriteName);
        if (scene?.state?.player?.weapon_one?.grip === 'Two Hand') {
            this.spriteWeapon.setScale(0.65);
        } else {
            this.spriteWeapon.setScale(0.5);
        };
        this.spriteWeapon.setOrigin(0.25, 1);
        this.scene.add.existing(this);
        this.scene.add.existing(this.spriteWeapon);
        // this.spriteWeapon.setDepth(this + 1);
        this.spriteWeapon.setAngle(-195);
        this.currentWeaponSprite = spriteName;
        this.currentDamageType = scene?.state?.player?.weapon_one?.damage_type[0].toLowerCase();
        this.targetIndex = 0;
        this.currentTarget = null;
        this.stamina = scene?.state?.playerAttributes?.stamina;
        this.isMoving = false;
        this.targetID = null;
        this.attackedTarget = null;
        this.triggeredActionAvailable = null;

        const shieldName = scene?.state?.player?.shield.imgURL.split('/')[2].split('.')[0];
        this.spriteShield = new Phaser.GameObjects.Sprite(this.scene, 0, 0, shieldName);
        this.spriteShield.setScale(0.6);
        this.spriteShield.setOrigin(0.5, 0.5);
        this.scene.add.existing(this.spriteShield);
        this.spriteShield.setDepth(this + 1);
        this.spriteShield.setVisible(false);

        this.playerVelocity = new Phaser.Math.Vector2();
        this.speed = this.startingSpeed(scene?.ascean);
        this.acceleration = 0.1;
        this.deceleration = 0.05;
        this.dt = this.scene.sys.game.loop.delta;
        this.stateMachine = new StateMachine(this, 'player');
        this.stateMachine
            .addState(States.NONCOMBAT, {
                onEnter: this.onNonCombatEnter.bind(this),
                onUpdate: this.onNonCombatUpdate.bind(this),
                onExit: this.onNonCombatExit.bind(this),
            })
            .addState(States.COMBAT, {
                onEnter: this.onCombatEnter.bind(this),
                onUpdate: this.onCombatUpdate.bind(this),
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
            .addState(States.HEAL, {
                onEnter: this.onPrayerEnter.bind(this),
                onUpdate: this.onPrayerUpdate.bind(this),
                onExit: this.onPrayerExit.bind(this),
            })
            .addState(States.INVOKE, {
                onEnter: this.onInvokeEnter.bind(this),
                onUpdate: this.onInvokeUpdate.bind(this),
                onExit: this.onInvokeExit.bind(this),
            })
            .addState(States.STUN, {
                onEnter: this.onStunEnter.bind(this),
                onUpdate: this.onStunUpdate.bind(this),
                onExit: this.onStunExit.bind(this),
            })
            .addState(States.TSHAERAL, {
                onEnter: this.onTshaeralEnter.bind(this),
                onUpdate: this.onTshaeralUpdate.bind(this),
                onExit: this.onTshaeralExit.bind(this),
            })
        
        this.stateMachine.setState(States.NONCOMBAT);
        this.sensorDisp = 12;
        this.colliderDisp = 16;

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

        this.setScale(0.8);   
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.rectangle(this.x, this.y + 10, 20, 36, { isSensor: false, label: 'playerCollider' }); // Y + 10 For Platformer
        let playerSensor = Bodies.circle(this.x, this.y + 2, 36, { isSensor: true, label: 'playerSensor' }); // Y + 2 For Platformer
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
            .lineStyle(1, 0xFFD700)
            .strokeCircle(0, 0, 10); 
        this.scene.plugins.get('rexGlowFilterPipeline').add(this.highlight, {
            intensity: 0.02,
        });
        this.highlight.setVisible(false);
        this.healthbar = new HealthBar(this.scene, this.x, this.y, scene.state.playerHealth, 'player');
        this.setFixedRotation();   
        this.checkEnemyAttackCollision(playerSensor);
        this.playerStateListener();
        this.checkLootdropCollision(playerSensor);
        this.checkNpcCollision(playerSensor);
    }; 

    startingSpeed = (player) => {
        let speed = 1.5; // 1.75
        const helmet = player.helmet.type;
        const chest = player.chest.type;
        const legs = player.legs.type;
        let modifier = 0;
        const addModifier = (item) => {
            switch (item) {
                case 'Leather-Cloth':
                    modifier += 0.05;
                    break;
                case 'Leather-Mail':
                    modifier += 0.025;
                    break;
                case 'Chain-Mail':
                    modifier += 0.0;
                    break;
                case 'Plate-Mail':
                    modifier -= 0.025;
                    break;
            };
            console.log(modifier, "Current Speed Modifier from", item);
        };
        addModifier(helmet);
        addModifier(chest);
        addModifier(legs);
        speed += modifier;
        return speed;
    };

    adjustSpeed = (speed) => {
        return this.speed += speed;
    };

    highlightTarget(sprite) {
        this.highlight.setVisible(true);
        this.highlight.setPosition(sprite.x, sprite.y + sprite.displayHeight / 2.25);
    };

    removeHighlight() {
        this.highlight.setVisible(false);
    };

    assetSprite(asset) {
        return asset.imgURL.split('/')[2].split('.')[0];
    };

    playerStateListener = () => {
        EventEmitter.on('update-combat-data', (e) => {
            if (this.health > e.newPlayerHealth) {
                this.isHurt = true;
                let damage = Math.round(this.health - e.newPlayerHealth);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, damage, 1500, 'damage', e.computerCriticalSuccess);
                console.log(`%c ${damage} Damage Taken by ${e?.computer?.name}`, 'color: #ff0000');
            };
            if (this.health < e.newPlayerHealth) {
                let heal = Math.round(e.newPlayerHealth - this.health);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, heal, 1500, 'heal');
            };
            if (this.currentRound !== e.combatRound) this.currentRound = e.combatRound;
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
        });

        EventEmitter.on('update-combat', (e) => {
            if (e.computerCounterSuccess) {
                this.stateMachine.setState(States.STUN);
                this.scene.combatMachine.input('computerCounterSuccess', false);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.attacking?.x, this.attacking?.y, 'Counter', 1500, 'heal', e.computerCriticalSuccess);    
            };
            if (e.rollSuccess) {
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Roll', 1500, 'heal', e.criticalSuccess);
            };
            if (e.counterSuccess) {
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Counter', 1500, 'heal', e.criticalSuccess);
            };
            if (e.computerRollSuccess) {
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.attacking?.x, this.attacking?.y, 'Roll', 1500, 'heal', e.computerCriticalSuccess);
            };
            if (e.newComputerHealth <= 0 && e.playerWin) {
                if (this.isTshaering) this.isTshaering = false;
                if (this.tshaeringTimer) {
                    this.tshaeringTimer.remove(false);
                    this.tshaeringTimer = null;
                };
                
                this.defeatedEnemyCheck(e.enemyID);
                this.checkTargets();

                this.winningCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Victory', 3000, 'effect', true);    
            };    
        });
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
            console.log("All Enemies Defeated!");
            this.inCombat = false;
            this.attacking = null;
            if (this.currentTarget) {
                this.currentTarget.clearTint();
                this.currentTarget = null;
            };
        } else {
            console.log("More Enemies Remain!");
            if (this.currentTarget.enemyID === enemy) { // Was targeting the enemy that was defeated
                this.currentTarget.clearTint();
                console.log(this.targets);
                const newTarget = this.targets.find(obj => obj.enemyID !== enemy);
                console.log(newTarget.ascean.name, 'New Enemy Target');
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
    
        if (hasAggressiveEnemy) {
            if (!hasRemainingEnemies) {
                console.log('Player Should Enter Combat');
                return true;
            } else {
                console.log('Player Already In Combat');
                return false;
            };
        };
    
        console.log('Player Should Not Enter Combat');
        return false;
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
            console.log('New Enemy Pushed Into Touching Array');
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
            other.gameObjectB.isAggressive
        );
    };
 
    checkEnemyAttackCollision(playerSensor) {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [playerSensor],
            callback: (other) => {
                if (this.isValidEnemyCollision(other)) {
                    const isNewEnemy = this.isNewEnemy(other.gameObjectB);
                    if (!isNewEnemy) return;
                    if (this.shouldPlayerEnterCombat(other.gameObjectB)) {
                        console.log("Engaging Combat in Start Collision Sensor");
                        this.scene.setupEnemy(other.gameObjectB);
                        this.actionTarget = other;
                        this.attacking = other.gameObjectB;
                        this.currentTarget = other.gameObjectB;
                        this.targetID = other.gameObjectB.enemyID;
                        this.scene.combatEngaged(true);
                        this.inCombat = true;
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
                this.touching = this.touching.filter(obj => obj.enemyID !== other.gameObjectB.enemyID);
                if (this.isValidEnemyCollision(other) && !this.touching.length) {
                    console.log("No Longer Touching Any Enemy, Clearing Action Available and Triggered Action Available");
                    this.actionAvailable = false;
                    this.triggeredActionAvailable = null;
                };
                this.checkTargets();
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

    onNonCombatEnter = () => {
        // console.log("Entering Non Combat");
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

    onCombatEnter = () => {
        // console.log("Entering Combat");
    };
    onCombatUpdate = (dt) => { 
        if (!this.inCombat) this.stateMachine.setState(States.NONCOMBAT);  
    }; 

    onAttackEnter = () => {
        this.isAttacking = true;
        this.swingReset();
        this.scene.checkStamina('attack');
    }; 
    onAttackUpdate = (dt) => {
        if (this.frameCount === 16 && !this.isRanged) {
            this.scene.combatMachine.input('action', 'attack');
            console.log("Attack LIVE");
        };
        if (!this.isAttacking) { 
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            };
        };
    }; 
    onAttackExit = () => {
        if (this.scene.state.action !== '') this.scene.combatMachine.input('action', '');
    };

    onCounterEnter = () => {
        this.isCountering = true;    
        this.swingReset();
        this.scene.checkStamina('counter');
    };
    onCounterUpdate = (dt) => {
        if (this.frameCount === 5 && !this.isRanged) {
            this.scene.combatMachine.input('action', 'counter');
            console.log("Counter LIVE");
        };
        if (!this.isCountering && this.inCombat) { 
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            };
        };
    };
    onCounterExit = () => {
        if (this.scene.state.action !== '') this.scene.combatMachine.input('action', '');
        if (this.scene.state.counterGuess !== '') this.scene.combatMachine.input('counterGuess', '');
    };

    onPostureEnter = () => {
        this.isPosturing = true;
        this.swingReset();
        this.scene.checkStamina('posture');
    };
    onPostureUpdate = (dt) => {
        if (this.frameCount === 11 && !this.isRanged) {
            this.scene.combatMachine.input('action', 'posture');
            console.log("Posture LIVE");
        };
        if (!this.isPosturing) { 
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            };
        };
    };
    onPostureExit = () => {
        if (this.scene.state.action !== '') this.scene.combatMachine.input('action', '');
    };

    onRollEnter = () => {
        this.isRolling = true;
        if (this.inCombat) this.swingReset();
        this.scene.checkStamina('roll');
        this.body.parts[2].position.y += this.sensorDisp;
        this.body.parts[2].circleRadius = 21;
        this.body.parts[1].vertices[0].y += this.colliderDisp;
        this.body.parts[1].vertices[1].y += this.colliderDisp; 
    };
    onRollUpdate = (dt) => {
        if (this.frameCount === 10 && !this.isRanged) this.scene.combatMachine.input('action', 'roll');
        if (!this.isRolling) { 
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            }; 
        };
    };
    onRollExit = () => {
        this.spriteWeapon.setVisible(true);
        this.rollCooldown = 0; 
        if (this.scene.state.action !== '') this.scene.combatMachine.input('action', '');
        this.body.parts[2].position.y -= this.sensorDisp;
        this.body.parts[2].circleRadius = 36;
        this.body.parts[1].vertices[0].y -= this.colliderDisp;
        this.body.parts[1].vertices[1].y -= this.colliderDisp;
    };

    onDodgeEnter = () => {
        this.isDodging = true;
        this.scene.checkStamina('dodge');
        this.wasFlipped = this.flipX; 
        this.body.parts[2].position.y += this.sensorDisp;
        this.body.parts[2].circleRadius = 21;
        this.body.parts[1].vertices[0].y += this.colliderDisp;
        this.body.parts[1].vertices[1].y += this.colliderDisp; 
        this.body.parts[0].vertices[0].x += this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[1].x += this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[0].vertices[1].x += this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
        this.body.parts[1].vertices[0].x += this.wasFlipped ? this.colliderDisp : -this.colliderDisp;
    };
    onDodgeUpdate = (dt) => { 
        if (!this.isDodging) { 
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            };
        };
    };
    onDodgeExit = () => {
        this.spriteWeapon.setVisible(true);
        this.dodgeCooldown = 0;
        this.isDodging = false;
        this.body.parts[2].position.y -= this.sensorDisp;
        this.body.parts[2].circleRadius = 36;
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
        if (!this.isHealing) { 
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            };
        };
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
        if (!this.isPraying) {
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            };
        };
    };
    onInvokeExit = () => {
        if (!this.isCaerenic) this.glow = this.setGlow(this, false);
        this.scene.combatMachine.add({ type: 'Instant', data: this.scene.state.playerBlessing });
        screenShake(this.scene);
    };

    onTshaeralEnter = () => {
        this.isTshaering = true;
        this.attacking.isConsumed = true;
        screenShake(this.scene);
        if (!this.isCaerenic) {
            this.setGlow(this, true);
        };
        this.tshaeringTimer = this.scene.time.addEvent({
            delay: 250,
            callback: () => {
                if (!this.isTshaering || this.scene.state.playerWin || this.scene.state.newComputerHealth <= 0) return;
                this.scene.combatMachine.add({ type: 'Tshaeral', data: '' });
            },
            callbackScope: this,
            // loop: true,
            repeat: 8,
        });
    };
    onTshaeralUpdate = (dt) => {
        if (!this.isTshaering) {
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            };
        };
    };
    onTshaeralExit = () => {
        if (this.tshaeringTimer) {
            this.tshaeringTimer.remove(false);
            this.tshaeringTimer = null;
        };
        if (!this.isCaerenic) {
            this.setGlow(this, false);
        } 
        screenShake(this.scene);
    };

    onStunEnter = () => {
        this.isStunned = true;
        this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Stunned', 1500, 'effect', true);
        this.scene.input.keyboard.enabled = false;
        this.stunDuration = 1500;
        this.setTint(0x888888);
        this.setStatic(true);
    };
    onStunUpdate = (dt) => {
        this.setVelocity(0);
        this.stunDuration -= dt;
        if (this.stunDuration <= 0) this.isStunned = false;
        if (!this.isStunned) {
            if (this.inCombat) {
                this.stateMachine.setState(States.COMBAT); 
            } else {
                this.stateMachine.setState(States.NONCOMBAT); 
            };
        };
    };
    onStunExit = () => {
        this.stunDuration = 1500;
        this.scene.input.keyboard.enabled = true;
        this.clearTint(); 
        this.setStatic(false);
    };

    swingReset = () => {
        this.canSwing = false;
        console.log('Player Swinging');
        this.scene.time.delayedCall(this.swingTimer, () => {
            this.canSwing = true;
            console.log('Player Swing Reset');
        }, null, this);
    };

    checkTargets = () => {
        const playerCombat = this.isPlayerInCombat();
        this.targets = this.targets.filter(gameObject => {
            if (gameObject.isDead || !gameObject.inCombat) { // && playerCombat
                console.log("Removing from targets array: [isDead || !inCombat]");
                return false;
            };
            if (gameObject.npcType && playerCombat) {
                console.log("Disengaging Combat in Targets Array Check: [npcTypes, playerCombat]");
                this.scene.combatEngaged(false);
                this.inCombat = false;
            };
            return true;
        });

        const someInCombat = this.targets.some(gameObject => gameObject.inCombat);
        if (someInCombat && !playerCombat) {
            console.log("Engaging Combat in Targets Array Check: [someInCombat, !playerCombat]");
            this.scene.combatEngaged(true);
            this.inCombat = true;
        } else if (!someInCombat && playerCombat) {
            console.log("Disengaging Combat in Targets Array Check: [!someInCombat, playerCombat]");
            this.scene.clearNonAggressiveEnemy();
            this.scene.combatEngaged(false);
            this.inCombat = false;
        };
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
        console.log(this.attackedTarget.enemyID === this.scene.state.enemyID, "Enemy ID Match");
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
                this.scene.combatMachine.add({ type: 'Weapon',  data: { key: 'action', value: this.particleEffect.action } });
            } else {
                this.scene.combatMachine.add({ type: 'Player', data: { playerAction: { action: this.particleEffect.action, counter: this.scene.state.counterGuess },  enemyID: this.attackedTarget.enemyID, ascean: this.attackedTarget.ascean, damageType: this.attackedTarget.currentDamageType, combatStats: this.attackedTarget.combatStats, weapons: this.attackedTarget.weapons, health: this.attackedTarget.health, actionData: { action: this.attackedTarget.currentAction, counter: this.attackedTarget.counterAction } } });
            };
            this.scene.particleManager.removeEffect(this.particleEffect.id);
            this.particleEffect.effect.destroy();
            this.particleEffect = null;
        } else {
            const action = this.checkPlayerAction();
            console.log(action, "Action Check");
            if (!action) return;
            if (match) { // Target Player Attack
                this.scene.combatMachine.add({ type: 'Weapon',  data: { key: 'action', value: action } });
            } else { // Blind Player Attack
                this.scene.combatMachine.add({ type: 'Player', data: { playerAction: { action: action, counter: this.scene.state.counterGuess }, enemyID: this.attackedTarget.enemyID, ascean: this.attackedTarget.ascean, damageType: this.attackedTarget.currentDamageType, combatStats: this.attackedTarget.combatStats, weapons: this.attackedTarget.weapons, health: this.attackedTarget.health, actionData: { action: this.attackedTarget.currentAction, counter: this.attackedTarget.counterAction }} });
            };
        };
            
        if (!this.isRanged) this.knockback(this.actionTarget); // actionTarget
        screenShake(this.scene); 
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
        
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.target.TAB) && this.targets.length > 1) { // More than 1 i.e. worth tabbing
            if (this.currentTarget) {
                this.currentTarget.clearTint();
            }; 
            const newTarget = this.targets[this.targetIndex];
            console.log(newTarget.ascean.name, "New Target via Tab Targetting");
            this.targetIndex = this.targetIndex + 1 === this.targets.length ? 0 : this.targetIndex + 1;
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
            if (this.stamina >= 15 && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
                this.scene.combatMachine.input('counterGuess', 'attack');
                this.stateMachine.setState(States.COUNTER);           
            };
            if (this.stamina >= 15 && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
                this.scene.combatMachine.input('counterGuess', 'posture');
                this.stateMachine.setState(States.COUNTER);
            };
            if (this.stamina >= 15 && this.movementClear() && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
                this.scene.combatMachine.input('counterGuess', 'roll');
                this.stateMachine.setState(States.COUNTER);
            };
        
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE) && this.stamina >= 25 && this.canSwing) {
                this.stateMachine.setState(States.ATTACK);
            };
            
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO) && this.stamina >= 15 && this.canSwing) {
                this.stateMachine.setState(States.POSTURE);
            };

            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE) && this.stamina >= 15 && this.canSwing) {
                this.scene.combatMachine.input('counterGuess', 'counter');
                this.stateMachine.setState(States.COUNTER);
            };

            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.pray.R) && this.invokeCooldown === 0) {
                if (this.scene.state.playerBlessing === '') return;
                this.stateMachine.setState(States.INVOKE);
                const invokeInterval = 1000;
                let elapsedTime = 0;
                const invokeLoop = () => {
                    if (elapsedTime >= this.invokeCooldown || !this.inCombat) {
                        clearInterval(invokeIntervalId);
                        this.invokeCooldown = 0;
                        return;
                    };
                    elapsedTime++;
                };
                const invokeIntervalId = setInterval(invokeLoop, invokeInterval);
            };
            if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.consume.F)) { // this.tshaeralCooldown === 0
                this.stateMachine.setState(States.TSHAERAL);
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
                this.scene.combatMachine.add({ type: 'Consume', data: this.scene.state.playerEffects });
                screenShake(this.scene);
            };
        };

        // ========================= Player Movement Actions ========================= \\

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE) && this.stamina >= 15 && this.movementClear()) {
            this.stateMachine.setState(States.ROLL);
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.dodge.FOUR) && this.stamina >= 15 && this.movementClear()) {
            this.stateMachine.setState(States.DODGE);
        };

        // ========================= Player Utility Actions ========================= \\

        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.stalwart.G)) {
            this.isCaerenic = this.isCaerenic ? false : true;
            if (this.isCaerenic) {
                this.scene.caerenic(true);
                this.setGlow(this, true);
                this.adjustSpeed(0.5);
            } else {
                this.scene.caerenic(false);
                this.setGlow(this, false);
                this.adjustSpeed(-0.5);
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.stalwart.G)) {
            this.isStalwart = this.isStalwart ? false : true;
            if (this.isStalwart) {
                this.scene.stalwart(true);
            } else {
                this.scene.stalwart(false);
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
            this.anims.play('player_hurt', true).on('animationcomplete', () => {
                this.isHurt = false;
            });  
        } else if (this.isCountering) { // COUNTERING
            this.anims.play('player_attack_2', true).on('animationcomplete', () => { 
                this.isCountering = false;  
            });
        } else if (this.isDodging) { // DODGING AKA SLIDING OUTSIDE COMBAT
            this.anims.play('player_slide', true);
            this.spriteWeapon.setVisible(false);
            if (this.dodgeCooldown === 0) this.playerDodge();
        } else if (this.isRolling && !this.isJumping) { // ROLLING OUTSIDE COMBAT
            this.anims.play('player_roll', true);
            walk(this.scene);
            this.spriteWeapon.setVisible(false);
            if (this.rollCooldown === 0) this.playerRoll();
        } else if (this.isPosturing) { // POSTURING
            walk(this.scene);
            this.anims.play('player_attack_3', true).on('animationcomplete', () => {
                this.isPosturing = false;
            });
        } else if (this.isAttacking) { // ATTACKING
            walk(this.scene);
            this.anims.play('player_attack_1', true).on('animationcomplete', () => {
                this.isAttacking = false;
            }); 
        } else if ((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1) && !this.isRolling) { // RUNNING
            walk(this.scene);
            if (!this.isMoving) this.isMoving = true;
            this.anims.play('player_running', true);
        } else if (this.isConsuming) { // CONSUMING
            console.log("Pinging CONSUMING");
            this.anims.play('player_health', true).on('animationcomplete', () => {
                this.isConsuming = false;
            });
        } else if (this.isTshaering) { // TSHAERING
            console.log("Pinging TSHAERING");
            this.anims.play('player_health', true);
        } else if (this.isHealing) { // HEALING
            console.log("Pinging HEALING");
            this.anims.play('player_pray', true).on('animationcomplete', () => {
                this.isHealing = false;
            });
        } else if (this.isPraying) { // PRAYING
            console.log("Pinging PRAYING");
            this.anims.play('player_pray', true).on('animationcomplete', () => {
                this.isPraying = false;
            });
        } else { // IDLE
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
                this.spriteWeapon.setScale(0.65);
            } else {
                this.spriteWeapon.setScale(0.5);
            };
        };
        if (this.currentShieldSprite !== this.assetSprite(this.scene.state.player.shield)) {
            this.currentShieldSprite = this.assetSprite(this.scene.state.player.shield);
            this.spriteShield.setTexture(this.currentShieldSprite);
        }; 
        if (this.healthbar) this.healthbar.update(this);
        if (this.scrollingCombatText) this.scrollingCombatText.update(this);
        if (this.winningCombatText) this.winningCombatText.update(this);
    };
    handleMovement = () => {
        // =================== MOVEMENT VARIABLES ================== \\
        const acceleration = this.acceleration;
        const deceleration = this.deceleration;
        let speed = this.speed;

        // =================== MOVEMENT ================== \\

        if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
            this.playerVelocity.x += acceleration;
            if (this.flipX) this.flipX = false;
        };

        if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
            this.playerVelocity.x -= acceleration;
            this.flipX = true;
        };

        if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown)) {
            this.playerVelocity.y -= acceleration;
        }; 

        if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
            this.playerVelocity.y += acceleration;
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

        // =================== DECELERATION ================== \\

        if (!this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown && this.playerVelocity.x !== 0 && !this.inputKeys.strafe.E.isDown && !this.inputKeys.strafe.Q.isDown && !this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown) {
            this.playerVelocity.x = this.zeroOutVelocity(this.playerVelocity.x, deceleration);
        };
        if (!this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown && this.playerVelocity.x !== 0 && !this.inputKeys.strafe.E.isDown && !this.inputKeys.strafe.Q.isDown && !this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown) {
            this.playerVelocity.x = this.zeroOutVelocity(this.playerVelocity.x, deceleration);
        };
        if (!this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown && this.playerVelocity.y !== 0 && !this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown) {
            this.playerVelocity.y = this.zeroOutVelocity(this.playerVelocity.y, deceleration);
        };
        if (!this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown && this.playerVelocity.y !== 0 && !this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown) {
            this.playerVelocity.y = this.zeroOutVelocity(this.playerVelocity.y, deceleration);
        };

        // =================== VARIABLES IN MOTION ================== \\

        if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
            if (!this.spriteShield.visible) this.spriteShield.setVisible(true);
            if (!this.isStrafing) this.isStrafing = true;
        } else if (this.isStrafing) {
            this.isStrafing = false;
        };
        
        if (this.isAttacking || this.isCountering || this.isPosturing) speed += 1;

        // =================== NORMALIZING VELOCITY ================== \\

        this.playerVelocity.limit(speed);

        // ==================== SETTING VELOCITY ==================== \\
        
        this.setVelocity(this.playerVelocity.x, this.playerVelocity.y);
    }; 
    update() {
        this.handleConcerns();
        this.stateMachine.update(this.dt);
        this.handleActions();
        this.handleAnimations();
        this.handleMovement();
        this.weaponRotation('player', this.currentTarget);
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