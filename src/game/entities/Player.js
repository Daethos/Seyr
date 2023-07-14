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
        super({ ...data, name: 'player', ascean: scene.state.player, health: scene.state.new_player_health }); 
        const spriteName = scene?.state?.player?.weapon_one.imgURL.split('/')[2].split('.')[0];
        this.ascean = scene.state.player;
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
        this.targetIndex = 0;
        this.currentTarget = null;
        this.stamina = scene?.state?.player_attributes?.stamina;
        this.isMoving = false;
        const shieldName = scene?.state?.player?.shield.imgURL.split('/')[2].split('.')[0];
        this.spriteShield = new Phaser.GameObjects.Sprite(this.scene, 0, 0, shieldName);
        this.spriteShield.setScale(0.6);
        this.spriteShield.setOrigin(0.5, 0.5);
        this.scene.add.existing(this.spriteShield);
        this.spriteShield.setDepth(this + 1);
        this.spriteShield.setVisible(false);
        this.playerVelocity = new Phaser.Math.Vector2();
        this.speed = this.setSpeed(scene?.state?.player);
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
        
        this.stateMachine.setState(States.NONCOMBAT);

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
        this.currentRound = 0; 
        
        this.glow = this.setGlow(this);
        // this.setGlow(this.spriteWeapon);
        this.highlight = this.scene.add.graphics()
            .lineStyle(1, 0xFFD700)
            .strokeCircle(0, 0, 10); 
        this.scene.plugins.get('rexGlowFilterPipeline').add(this.highlight, {
            intensity: 0.02,
        });
        this.highlight.setVisible(false);
        this.healthbar = new HealthBar(this.scene, this.x, this.y, scene.state.player_health, 'player');
        this.setFixedRotation();   
        this.checkEnemyAttackCollision(playerSensor);
        this.playerStateListener();
        this.checkLootdropCollision(playerSensor);
        this.checkNpcCollision(playerSensor);
    };

    setGlow = (object) => {
        const setColor = (mastery) => {
            switch (mastery) {
                case 'Constitution': return 0xFDF6D8;
                case 'Strength': return 0xFF0000;
                case 'Agility': return 0x00FF00;
                case 'Achre': return 0x0000FF;
                case 'Caeren': return 0x800080;
                case 'Kyosir': return 0xFFD700;
                default: return 0xFFFFFF;
            };
        };

        return this.scene.plugins.get('rexGlowFilterPipeline').add(object, {
            outerStrength: 1,
            innerStrength: 1,
            glowColor: setColor(this.ascean.mastery),
            intensity: 0.02,
        });
    };

    setSpeed = (player) => {
        let speed = 1.75;
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

    playerStateListener() {
        EventEmitter.on('update-combat-data', (e) => {
            if (this.health > e.new_player_health) {
                this.isHurt = true;
                let damage = Math.round(this.health - e.new_player_health);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, damage, 1500, 'damage', e.computer_critical_success);
            };
            if (this.health < e.new_player_health) {
                let heal = Math.round(e.new_player_health - this.health);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, heal, 1500, 'heal');
            };
            if (this.currentRound !== e.combatRound) {
                this.currentRound = e.combatRound;
            }; 
            this.health = e.new_player_health;
            this.healthbar.setValue(this.health);
            if (this.healthbar.getTotal() < e.player_health) this.healthbar.setTotal(e.player_health);
            if (e.new_player_health <= 0) {
                this.isDead = true;
                this.anims.play('player_death', true);
                this.inCombat = false;
                this.attacking = null;
            };
            if (e.new_computer_health <= 0) {
                this.inCombat = false;
                this.attacking = null;
                this.touching = this.touching.filter(obj => obj.enemyID !== e.enemyID);
            };

            this.checkMeleeOrRanged(e.weapons[0]);
        });

        EventEmitter.on('update-combat', (e) => {
            if (e.computer_counter_success) {
                this.stateMachine.setState(States.STUN);
                this.scene.setState('computer_counter_success', false);
            };
            if (e.player_win) {
                let damage = 'Victory!';
                this.winningCombatText = new ScrollingCombatText(this.scene, this.x, this.y, damage, 3000, 'effect', true);    
            };
        });
    }; 
 
    checkEnemyAttackCollision(playerSensor) {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.gameObjectB.name === 'enemy' && other.bodyB.label === 'enemyCollider' && other.gameObjectB.isAggressive) {
                    const collisionPoint = this.calculateCollisionPoint(other);
                    const attackDirection = this.getAttackDirection(collisionPoint);
                    if (attackDirection === this.flipX) {
                        this.actionAvailable = true;
                        this.actionTarget = other;
                        const isNewEnemy = !this.touching.some(obj => obj.enemyID === other.gameObjectB.enemyID);
                        if (isNewEnemy && !isNewEnemy.isDead) this.touching.push(other.gameObjectB);
                        this.currentTarget = other.gameObjectB; 
                        if ((!this.scene.state.computer || this.scene.state.computer._id !== other.gameObjectB.ascean._id) && !other.gameObjectB.isDead) this.scene.setupEnemy({ id: other.gameObjectB.enemyID, game: other.gameObjectB.ascean, enemy: other.gameObjectB.combatStats, health: other.gameObjectB.health, isAggressive: other.gameObjectB.isAggressive, startedAggressive: other.gameObjectB.startedAggressive, isDefeated: other.gameObjectB.isDefeated, isTriumphant: other.gameObjectB.isTriumphant });
                        if (!this.scene.state.combatEngaged && !other.gameObjectB.isDead) {
                            this.scene.combatEngaged(true);
                            this.inCombat = true;
                        };
                    };
                };
            },
            context: this.scene,
        });

        this.scene.matterCollision.addOnCollideActive({
            objectA: [playerSensor],
            callback: (other) => {
                if (!other.gameObjectB || other.gameObjectB.name !== 'enemy' || other.bodyB.label !== 'enemyCollider') return;
                if (other.gameObjectB && other.gameObjectB.name === 'enemy' && other.bodyB.label === 'enemyCollider' && other.gameObjectB.isAggressive) {
                    const collisionPoint = this.calculateCollisionPoint(other);
                    const attackDirection = this.getAttackDirection(collisionPoint);
                    if (attackDirection === this.flipX) {
                        this.actionAvailable = true;
                        // this.actionTarget = other;
                    };
                };
            },
            context: this.scene,
        });

        this.scene.matterCollision.addOnCollideEnd({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.gameObjectB.name === 'enemy' && other.bodyB.label === 'enemyCollider' && other.gameObjectB.isAggressive) {
                    this.actionAvailable = false;
                    // this.actionTarget = null;
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
                    const isNewNpc = !this.touching.some(obj => obj.enemyID === other.gameObjectB.enemyID);
                    if (isNewNpc && !isNewNpc.isDead) this.touching.push(other.gameObjectB);
                    this.currentTarget = other.gameObjectB;
                    if ((!this.scene.state.computer || this.scene.state.computer._id !== other.gameObjectB.ascean._id)) this.scene.setupNPC({ id: other.gameObjectB.enemyID, game: other.gameObjectB.ascean, enemy: other.gameObjectB.combatStats, health: other.gameObjectB.health, type: other.gameObjectB.npcType });
                };
            },
            context: this.scene,
        }); 

        this.scene.matterCollision.addOnCollideEnd({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.bodyB.label === 'npcCollider' && (!this.inCombat || this.currentTarget.enemyID === other.gameObjectB.enemyID || other.gameObjectB.interacting)) { 
                    this.touching = this.touching.filter(obj => obj.enemyID !== other.gameObjectB.enemyID);
                    this.scene.clearNPC();
                };
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

    playerActionSuccess = () => {
        console.log("Player Action Success");
        if (this.scene.state.action === '') return;
        this.scene.sendStateActionListener();
        if (this.particleEffect) {
            this.scene.particleManager.removeEffect(this.particleEffect.id);
            this.particleEffect.effect.destroy();
            this.particleEffect = null;
        };
        if (!this.isRanged) this.knockback(this.actionTarget);
        screenShake(this.scene); 
    };

    onNonCombatEnter = () => {
        console.log("Entering Non Combat");
        this.anims.play('player_idle', true);
        if (this.scene.combatTimer) this.scene.stopCombatTimer();
    };
    onNonCombatUpdate = (dt) => {
        if (this.isMoving) this.isMoving = false;
        if (this.inCombat) this.stateMachine.setState(States.COMBAT);
    };
    onNonCombatExit = () => {
        this.anims.stop('player_idle');
    };

    onCombatEnter = () => {
        console.log("Entering Combat");
    };
    onCombatUpdate = (dt) => { 
        if (!this.inCombat) this.stateMachine.setState(States.NONCOMBAT); 

        // if (this.stamina >= 15 && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
        //     this.scene.setState('counter_guess', 'attack');
        //     this.stateMachine.setState(States.COUNTER);           
        // };
        // if (this.stamina >= 15 && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
        //     this.scene.setState('counter_guess', 'posture');
        //     this.stateMachine.setState(States.COUNTER);
        // };
        // if (this.stamina >= 15 && !this.isStalwart && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
        //     this.scene.setState('counter_guess', 'roll');
        //     this.stateMachine.setState(States.COUNTER);
        // };
    
        // if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE) && this.stamina >= 25 && this.canSwing) {
        //     this.stateMachine.setState(States.ATTACK);
        // };

        // if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO) && this.stamina >= 15 && this.canSwing) {
        //     this.stateMachine.setState(States.POSTURE);
        // };

        // if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE) && this.stamina >= 15 && this.canSwing) {
        //     this.scene.setState('counter_guess', 'counter');
        //     this.stateMachine.setState(States.COUNTER);
        // };
    }; 

    onAttackEnter = () => {
        if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
        this.isAttacking = true;
        this.swingReset();
    }; 
    onAttackUpdate = (dt) => {
        if (this.frameCount === 16 && !this.isRanged) {
            this.scene.setState('action', 'attack');
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
        this.scene.setState('action', '');
    };

    onCounterEnter = () => {
        this.isCountering = true;    
        this.swingReset();
    };
    onCounterUpdate = (dt) => {
        if (this.frameCount === 5) {
            this.scene.setState('action', 'counter');
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
        this.scene.setState('action', '');
        this.scene.setState('counter_guess', '');
    };

    onPostureEnter = () => {
        if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
        this.isPosturing = true;
        this.swingReset();
    };
    onPostureUpdate = (dt) => {
        if (this.frameCount === 11 && !this.isRanged) {
            this.scene.setState('action', 'posture');
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
        this.scene.setState('action', '');
    };

    onRollEnter = () => {
        this.isRolling = true;
        if (this.inCombat) this.swingReset();
    };
    onRollUpdate = (dt) => {
        if (this.frameCount === 10) this.scene.setState('action', 'roll');
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
        if (this.scene.state.action !== '') this.scene.setState('action', '');
        if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
    };

    onDodgeEnter = () => {
        this.isDodging = true;
        this.scene.checkStamina('dodge');
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
        this.scene.sendStateSpecialListener('invoke');
        screenShake(this.scene);
    };

    onStunEnter = () => {
        this.isStunned = true;
        this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, 'Stunned', 1500, 'effect', true);
        this.scene.input.keyboard.enabled = false;
        this.stunDuration = 1500;
        this.setTint(0x888888);
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
        
    };

    swingReset = () => {
        this.canSwing = false;
        this.scene.time.delayedCall(this.swingTimer, () => {
            this.canSwing = true;
        });
    };

    checkTouching = () => {
        this.touching = this.touching.filter(gameObject => {
            if (gameObject.isDead || (gameObject.isEnemy && !gameObject.inCombat)) {
                console.log("Removing from touching array", gameObject, gameObject.inCombat, gameObject.isEnemy, gameObject.isDead);
                return false;    
            };
            return true;
        });
        if (this.touching.length === 0 || this.touching.every((gameObject) => gameObject.npcType)) {
            if (this.inCombat || this.scene.combat) {
                this.scene.combatEngaged(false);
                this.inCombat = false;
            };
        };
        if (this.touching.some((gameObject) => gameObject.inCombat)) {
            if (!this.inCombat || !this.scene.combat) {
                this.scene.combatEngaged(true);
                this.inCombat = true;
            };
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


    handleActions = () => {
        // =================== TARGETING ================== \\
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.target.TAB) && this.touching.length > 0) {
            if (this.currentTarget) {
                this.currentTarget.clearTint();
            }; 
            console.log(this.touching, this.targetIndex);
            const newTarget = this.touching[this.targetIndex];
            if (!newTarget) return;
            this.targetIndex = this.targetIndex + 1 === this.touching.length ? 0 : this.targetIndex + 1;
            if (newTarget.npcType) {
                this.scene.setupNPC({ id: newTarget.enemyID, game: newTarget.ascean, enemy: newTarget.combatStats, health: newTarget.health, type: newTarget.npcType });
            } else {
                this.scene.setupEnemy({ id: newTarget.enemyID, game: newTarget.ascean, enemy: newTarget.combatStats, health: newTarget.health, isAggressive: newTarget.isAggressive, startedAggressive: newTarget.startedAggressive, isDefeated: newTarget.isDefeated, isTriumphant: newTarget.isTriumphant }); 
            };
            this.currentTarget = newTarget;
            this.highlightTarget(newTarget);
        };

        if (this.currentTarget) {
            this.highlightTarget(this.currentTarget); 
            if (this.inCombat && !this.scene.state.computer) {
                this.scene.setupEnemy({ id: this.currentTarget.enemyID, game: this.currentTarget.ascean, enemy: this.currentTarget.combatStats, health: this.currentTarget.health, 
                    isAggressive: this.currentTarget.isAggressive, startedAggressive: this.currentTarget.startedAggressive, isDefeated: this.currentTarget.isDefeated, isTriumphant: this.currentTarget.isTriumphant 
                });
            }; 
        } else {
            if (this.highlight.visible) {
                this.removeHighlight();
            };
        };

        // =================== STALWART ================== \\

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.stalwart.G)) {
            this.isStalwart = this.isStalwart ? false : true;
            if (this.isStalwart) {
                this.scene.stalwart(true);
            } else {
                this.scene.stalwart(false);
            };
        }; 
        if (this.inCombat) {
            if (this.stamina >= 15 && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
                this.scene.setState('counter_guess', 'attack');
                this.stateMachine.setState(States.COUNTER);           
            };
            if (this.stamina >= 15 && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
                this.scene.setState('counter_guess', 'posture');
                this.stateMachine.setState(States.COUNTER);
            };
            if (this.stamina >= 15 && !this.isStalwart && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
                this.scene.setState('counter_guess', 'roll');
                this.stateMachine.setState(States.COUNTER);
            };
        
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE) && this.stamina >= 25 && this.canSwing) {
                this.stateMachine.setState(States.ATTACK);
            };
            
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO) && this.stamina >= 15 && this.canSwing) {
                this.stateMachine.setState(States.POSTURE);
            };

            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE) && this.stamina >= 15 && this.canSwing) {
                this.scene.setState('counter_guess', 'counter');
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
    
            if (Phaser.Input.Keyboard.JustDown(this.inputKeys.consume.F)) {
                if (this.scene.state.playerEffects.length === 0) return;
                this.isConsuming = true;
                this.prayerConsuming = this.scene.state.playerEffects[0].prayer;
                this.scene.sendStateSpecialListener('consume');
                screenShake(this.scene);
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE) && this.stamina >= 15 && !this.isStalwart) {
            this.stateMachine.setState(States.ROLL);
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.dodge.FOUR) && this.stamina >= 15 && !this.isStalwart) {
            this.stateMachine.setState(States.DODGE);
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
            if (this.dodgeCooldown === 0) {
                const sensorDisp = 12;
                const colliderDisp = 16;
                if (this.isDodging) {
                    this.body.parts[2].position.y += sensorDisp;
                    this.body.parts[2].circleRadius = 21;
                    this.body.parts[1].vertices[0].y += colliderDisp;
                    this.body.parts[1].vertices[1].y += colliderDisp; 
                    this.body.parts[0].vertices[0].x += this.flipX ? colliderDisp : -colliderDisp;
                    this.body.parts[1].vertices[1].x += this.flipX ? colliderDisp : -colliderDisp;
                    this.body.parts[0].vertices[1].x += this.flipX ? colliderDisp : -colliderDisp;
                    this.body.parts[1].vertices[0].x += this.flipX ? colliderDisp : -colliderDisp;
                };
                this.dodgeCooldown = 2000; 
                const dodgeDistance = 126;  
                const dodgeDuration = 18;  
                const dodgeInterval = 1;  
                let elapsedTime = 0;
                let currentDistance = 0;
            
                const dodgeLoop = () => {
                    if (elapsedTime >= dodgeDuration || currentDistance >= dodgeDistance) {
                        clearInterval(dodgeIntervalId);
                        this.spriteWeapon.setVisible(true);
                        this.dodgeCooldown = 0;
                        this.isDodging = false;
                        this.body.parts[2].position.y -= sensorDisp;
                        this.body.parts[2].circleRadius = 36;
                        this.body.parts[1].vertices[0].y -= colliderDisp;
                        this.body.parts[1].vertices[1].y -= colliderDisp; 
                        this.body.parts[0].vertices[0].x -= this.flipX ? colliderDisp : -colliderDisp;
                        this.body.parts[1].vertices[1].x -= this.flipX ? colliderDisp : -colliderDisp;
                        this.body.parts[0].vertices[1].x -= this.flipX ? colliderDisp : -colliderDisp;
                        this.body.parts[1].vertices[0].x -= this.flipX ? colliderDisp : -colliderDisp;
                        return;
                    };
                    const direction = !this.flipX ? -(dodgeDistance / dodgeDuration) : (dodgeDistance / dodgeDuration);
                    this.setVelocityX(direction);
                    currentDistance += Math.abs(dodgeDistance / dodgeDuration);
                    elapsedTime += dodgeInterval;
                }; 
                const dodgeIntervalId = setInterval(dodgeLoop, dodgeInterval);  
            };
            
        } else if (this.isRolling && !this.isJumping) { // ROLLING OUTSIDE COMBAT
            this.anims.play('player_roll', true);
            this.spriteWeapon.setVisible(false);
            if (this.rollCooldown === 0) {
                const sensorDisp = 12;
                const colliderDisp = 16;
                if (this.isRolling) {
                    this.body.parts[2].position.y += sensorDisp;
                    this.body.parts[2].circleRadius = 21;
                    this.body.parts[1].vertices[0].y += colliderDisp;
                    this.body.parts[1].vertices[1].y += colliderDisp; 
                };
                this.rollCooldown = 50; 
                const rollDistance = 140; 
                
                const rollDuration = 20; 
                const rollInterval = 1;
                
                let elapsedTime = 0;
                let currentDistance = 0;
                
                const rollLoop = () => {
                    if (elapsedTime >= rollDuration || currentDistance >= rollDistance) {
                        clearInterval(rollIntervalId);
                        this.spriteWeapon.setVisible(true);
                        this.rollCooldown = 0;
                        this.isRolling = false;
                        this.body.parts[2].position.y -= sensorDisp;
                        this.body.parts[2].circleRadius = 36;
                        this.body.parts[1].vertices[0].y -= colliderDisp;
                        this.body.parts[1].vertices[1].y -= colliderDisp; 
                        return;
                    };
                    const direction = this.flipX ? -(rollDistance / rollDuration) : (rollDistance / rollDuration);
                    if (Math.abs(this.velocity.x) > 0.1) this.setVelocityX(direction);
                    if (this.velocity.y > 0.1) this.setVelocityY(rollDistance / rollDuration);
                    if (this.velocity.y < -0.1) this.setVelocityY(-rollDistance / rollDuration);
                    currentDistance += Math.abs(rollDistance / rollDuration);
                    elapsedTime += rollInterval;
                };
                const rollIntervalId = setInterval(rollLoop, rollInterval);  
            };
        } else if (this.isPosturing) { // POSTURING
            this.anims.play('player_attack_3', true).on('animationcomplete', () => {
                this.isPosturing = false;
            });
        } else if (this.isAttacking) { // ATTACKING
            this.anims.play('player_attack_1', true).on('animationcomplete', () => {
                this.isAttacking = false;
            }); 
        } else if ((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1) && !this.isRolling) { // RUNNING
            walk(this.scene);
            if (!this.isMoving) this.isMoving = true;
            this.anims.play('player_running', true);
        } else if (this.isConsuming) { // CONSUMING
            console.log("Pinging CONSUMING")
            this.anims.play('player_health', true).on('animationcomplete', () => {
                this.isConsuming = false;
            });
        } else if (this.isHealing) { // HEALING
            console.log("Pinging HEALING")
            this.anims.play('player_pray', true).on('animationcomplete', () => {
                this.isHealing = false;
            });
        } else if (this.isPraying) { // PRAYING
            console.log("Pinging PRAYING")
            this.anims.play('player_pray', true).on('animationcomplete', () => {
                this.isPraying = false;
            });
        } else { // IDLE
            if (this.isMoving) this.isMoving = false;
            this.anims.play('player_idle', true);
        }; 
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
        const speed = this.speed;

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
           this.playerVelocity.x = 1.75;
           if (!this.flipX) this.flipX = true;
       };
       if (this.inputKeys.strafe.Q.isDown) {
           this.playerVelocity.x = -1.75;
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

       // =================== NORMALIZING VELOCITY ================== \\

       this.playerVelocity.limit(speed);

       // =================== VARIABLES IN MOTION ================== \\

       if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
           if (!this.spriteShield.visible) this.spriteShield.setVisible(true);
           if (!this.isStrafing) this.isStrafing = true;
       } else if (this.isStrafing) {
           this.isStrafing = false;
       }; 

       // ==================== SETTING VELOCITY ==================== \\
       
       this.setVelocity(this.playerVelocity.x, this.playerVelocity.y);
    };
    update() {
        this.handleConcerns();
        this.stateMachine.update(this.dt);
        this.checkTouching();
        this.handleActions();
        this.handleAnimations();
        this.handleMovement();
        this.weaponRotation('player', this.currentTarget);

        this.spriteWeapon.setPosition(this.x, this.y);
        this.spriteShield.setPosition(this.x, this.y);
        // this.spriteHelmet.setPosition(this.x, this.y);
        // this.spriteLegs.setPosition(this.x, this.y);
        // this.spriteChest.setPosition(this.x, this.y);
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