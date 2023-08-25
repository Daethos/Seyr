import Phaser from "phaser"; 
import { screenShake } from "../phaser/ScreenShake";
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

export const FRAME_COUNT = {
    ATTACK_LIVE: 16,
    ATTACK_SUCCESS: 39,
    
    COUNTER_LIVE: 5,
    COUNTER_SUCCESS: 10,

    POSTURE_LIVE: 16, // 11 for frameRate: 12
    POSTURE_SUCCESS: 17, // 11 for frameRate: 12
    
    ROLL_LIVE: 10,
    ROLL_SUCCESS: 10,
    
}; 

export default class Entity extends Phaser.Physics.Matter.Sprite {

    static preload(scene) { 
        scene.load.atlas(`player_actions`, playerActionsOnePNG, playerActionsOneJSON);
        scene.load.animation(`player_actions_anim`, playerActionsOneAnim);
        scene.load.atlas(`player_actions_two`, playerActionsTwoPNG, playerActionsTwoJSON);
        scene.load.animation(`player_actions_two_anim`, playerActionsTwoAnim);
        scene.load.atlas(`player_actions_three`, playerActionsThreePNG, playerActionsThreeJSON);
        scene.load.animation(`player_actions_three_anim`, playerActionsThreeAnim);
        scene.load.atlas(`player_attacks`, playerAttacksPNG, playerAttacksJSON);
        scene.load.animation(`player_attacks_anim`, playerAttacksAnim);   
        scene.load.atlas('rabbit_idle', process.env.PUBLIC_URL + '/images/rabbit_idle.png', process.env.PUBLIC_URL + '/images/rabbit_idle_atlas.json');
        scene.load.animation('rabbit_idle_anim', process.env.PUBLIC_URL + '/images/rabbit_idle_anim.json');
        scene.load.atlas('rabbit_movement', process.env.PUBLIC_URL + '/images/rabbit_movement.png', process.env.PUBLIC_URL + '/images/rabbit_movement_atlas.json');
        scene.load.animation('rabbit_movement_anim', process.env.PUBLIC_URL + '/images/rabbit_movement_anim.json');
    };

    constructor (data) {
        let { scene, x, y, texture, frame, depth, name, ascean, health } = data;
        super (scene.matter.world, x, y, texture, frame);
        this.x += this.width / 2;
        this.y -= this.height / 2;
        this.depth = depth || 2;
        this.name = name;
        this.ascean = ascean;
        this.health = health;
        this.combatStats = null;
        this.stamina = 0;
        this._position = new Phaser.Math.Vector2(this.x, this.y);
        this.scene.add.existing(this);
        this.glowFilter = this.scene.plugins.get('rexGlowFilterPipeline');
        this.isAttacking = false;
        this.isCountering = false;
        this.isDodging = false;
        this.isPosturing = false;
        this.isRolling = false;

        this.isAtEdge = false;
        this.inCombat = false;
        this.isConsuming = false;
        this.isCrouching = false;
        this.isDead = false;
        this.isJumping = false;
        this.isHanging = false;
        this.isHealing = false;
        this.isHurt = false;
        this.isPraying = false;
        this.isStrafing = false;
        this.isStalwart = false;
        this.isRanged = false;
        this.isStunned = false;
        this.hasMagic = false;
        this.hasBow = false;

        this.actionAvailable = false;
        this.actionSuccess = false;
        this.actionTarget = null;
        this.dodgeCooldown = 0;
        this.invokeCooldown = 0;
        this.playerBlessing = '';
        this.prayerConsuming = '';
        this.rollCooldown = 0;

        this.attacking = null;
        this.sensor = null;
        this.interacting = [];
        this.targets = [];
        this.touching = [];
        this.knockbackActive = false;
        this.knocedBack = false;
        this.knockbackForce = 0.01; // 0.1 is for Platformer, trying to lower it for Top Down
        this.knockbackDirection = {};
        this.knockbackDuration = 250;
        
        this.spriteShield = null;
        this.spriteWeapon = null;
        this.frameCount = 0;
        this.currentWeaponSprite = '';
        this.particleEffect = null;
        this.stunTimer = null;
        this.stunDuration = 2500;
        
        this.currentDamageType = null;
        this.currentRound = 0; 
        this.currentAction = '';
        this.currentActionFrame = 0;
        this.interruptCondition = false;
        this.scrollingCombatText = null;
        this.winningCombatText = null;
        this.specialCombatText = null;

        this.path = [];
        this.nextPoint = {};
        this.pathDirection = {};
        this.isPathing = false;
        this.chaseTimer = null;
        this.leashTimer = null;
        this.canSwing = true;
        this.swingTimer = 0; 
        this.glowing = false;
        this.glowTimer = null;
        this.speed = 0;
        this.isPolymorphed = false;
        this.isRooted = false;
        this.isSnared = false;
    };

    get position() {
        this._position.set(this.x, this.y);
        return this._position;
    };

    get velocity() {
        return this.body.velocity;
    };

    startingSpeed = (entity) => {
        let speed = 1.5; // PLAYER.SPEED.INITIAL
        const helmet = entity.helmet.type;
        const chest = entity.chest.type;
        const legs = entity.legs.type;
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
                default:
                    break;
            };
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

    checkIfAnimated = () => {
        if (this.anims.currentAnim) {
            return true;
        };
        return false;
    };

    clearAnimations = () => {
        if (this.anims.currentAnim) {
            this.anims.stop(this.anims.currentAnim.key);
        };
    };

    attack = () => { 
        this.anims.play(`player_attack_1`, true).on('animationcomplete', () => {
            this.isAttacking = false;
            this.currentAction = '';
        }); 
    };

    counter = () => { 
        this.anims.play('player_attack_2', true).on('animationcomplete', () => { 
            this.isCountering = false; 
            this.currentAction = '';
        });
    };

    posture = () => { 
        this.anims.play('player_attack_3', true).on('animationcomplete', () => {
            this.isPosturing = false;
            this.currentAction = '';
        }); 
    }; 

    hurt = () => {
        console.log('Hurt Triggering');
        this.clearAnimations();
        this.anims.play('player_hurt', true).on('animationcomplete', () => {
            this.isHurt = false;
        }); 
    }; 
    
    checkHanging() {
        this.scene.matterCollision.addOnCollideStart({
            objectA: this.sensor,
            callback: (event) => {
                const { bodyB, pair } = event;
                if (!bodyB.gameObject || !bodyB.gameObject.tile) return;
                const isGround = bodyB.gameObject.tile.properties.isGround;
                if (isGround) {
                    const playerPositionY = this.y; // Get the Y-coordinate of the player's sprite
                    const penetration = pair.collision.penetration;
                    const normal = pair.collision.normal;
            
                    const collisionPoint = {
                        x: bodyB.position.x + penetration.y * normal.x,
                        y: bodyB.position.y + penetration.y * normal.y
                    };
                    if (collisionPoint.y > playerPositionY) {
                        this.scene.setOnGround(event.bodyA.gameObject.name, true);
                        if (event.bodyA.gameObject.name === 'player') {
                            if (this.scene.isPlayerHanging) this.scene.setHanging(event.bodyA.gameObject.name, false);
                        } else {
                            if (this.scene.isEnemyHanging) this.scene.setHanging(event.bodyA.gameObject.name, false);
                        }
                        if (this.isHanging) this.isHanging = false;
                        this.setStatic(false);
                    } else {
                        this.scene.setHanging(event.bodyA.gameObject.name, true);
                        this.isHanging = true; 
                        this.setStatic(true);
                        this.setVelocityY(0); 
                    };
                };
            },
            context: this.scene
        });

        this.scene.matterCollision.addOnCollideActive({
            objectA: this.sensor,
            callback: (event) => {
                const { bodyB, pair } = event;
                if (!bodyB.gameObject || !bodyB.gameObject.tile) return;
                const isGround = bodyB.gameObject.tile.properties.isGround;
                if (isGround) {
                    const playerPositionY = this.y; // Get the Y-coordinate of the player's sprite
                    const penetration = pair.collision.penetration;
                    const normal = pair.collision.normal;
            
                    const collisionPoint = {
                        x: bodyB.position.x + penetration.y * normal.x,
                        y: bodyB.position.y + penetration.y * normal.y
                    }; 

                    if (collisionPoint.y > playerPositionY) {
                        this.scene.setOnGround(event.bodyA.gameObject.name, true); 
                        if (event.bodyA.gameObject.name === 'player') {
                            if (this.scene.isPlayerHanging) this.scene.setHanging(event.bodyA.gameObject.name, false);
                        } else {
                            if (this.scene.isEnemyHanging) this.scene.setHanging(event.bodyA.gameObject.name, false);
                        }
                        if (this.isHanging) this.isHanging = false;
                        this.setStatic(false);
                    } else {
                        this.scene.setHanging(event.bodyA.gameObject.name, true);
                        this.isHanging = true; 
                        this.setStatic(true);
                        this.setVelocityY(0); 
                    };
                };
            },
            context: this.scene
        });
    };

    knockback(other) {
        if (!other.pair.gameObjectB || !other.pair.gameObjectB.body) return;
        let bodyPosition = other.pair.gameObjectB.body.position;
        let body = other.pair.gameObjectB.body; 
        let offset = Phaser.Physics.Matter.Matter.Vector.mult(other.pair.collision.normal, other.pair.collision.depth); 
        let collisionPoint = Phaser.Physics.Matter.Matter.Vector.add(offset, bodyPosition);
        this.knockbackDirection = this.flipX ? Phaser.Physics.Matter.Matter.Vector.sub(collisionPoint, bodyPosition) : Phaser.Physics.Matter.Matter.Vector.sub(bodyPosition, collisionPoint);
        this.knockbackDirection = Phaser.Physics.Matter.Matter.Vector.normalise(this.knockbackDirection); 
       
        const accelerationFrames = 12; 
        const accelerationStep = this.knockbackForce / accelerationFrames; 
        const dampeningFactor = 0.9; 
        const knockbackDuration = 12; 
        const knockbackInterval = 16;
        let currentForce = 0; 
        let elapsedTime = 0; 
 

        const knockbackLoop = () => {
            if (elapsedTime >= knockbackDuration) { 
                knockbackEvent.remove();
                return;
            };
            
            if (currentForce < this.knockbackForce) currentForce += accelerationStep; 
            const forceX = (this.knockbackDirection.x * currentForce) * (this.flipX ? -5 : 5);
            const forceY = (this.knockbackDirection.y * currentForce) * (this.flipX ? -5 : 5);
            Phaser.Physics.Matter.Matter.Body.applyForce(body, bodyPosition, {
                x: forceX,
                y: forceY
            });
            currentForce *= dampeningFactor;
            elapsedTime++;
        };
           
        const knockbackEvent = this.scene.time.addEvent({
            delay: knockbackInterval,
            callback: knockbackLoop,
            callbackScope: this,
            loop: true
        });

        if ("vibrate" in navigator) {
            navigator.vibrate(40);
        };
        screenShake(this.scene);
    };

    checkDamageType = (type, concern) => {
        const types = { 'magic': ['earth', 'fire', 'frost', 'lightning', 'righteous', 'spooky', 'sorcery', 'wild', 'wind'], 'physical': ['blunt', 'pierce', 'slash'] };
        if (types[concern].includes(type)) return true;
        return false;
    };

    checkBow = (weapon) => {
        return weapon.type === 'Bow' || weapon.type === 'Greatbow';
    };

    checkMeleeOrRanged = (weapon) => {
        this.isRanged = weapon?.attack_type === 'Magic' || weapon?.type === 'Bow' || weapon?.type === 'Greatbow';
        const gripToSwingTimer = { 'One Hand': 800, 'Two Hand': 1250 }; // 750, 1250 [old]
        this.swingTimer = gripToSwingTimer[weapon?.grip] || 0;
        this.hasBow = this.checkBow(weapon);
    };

    setGlow = (object, glow) => {
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

        if (!glow) {
            if (this.glowTimer) {
                this.glowTimer.remove();
                this.glowTimer = null;
            };
            return this.glowFilter.remove(object); 
        };

        let glowColor = setColor(this.ascean.mastery);

        const updateGlow = (time) => {
            this.glowFilter.remove(object);

            const outerStrength = 2 + Math.sin(time * 0.005) * 2; // Adjust the frequency and amplitude as needed
            const innerStrength = 2 + Math.cos(time * 0.005) * 2;
            const intensity = 0.25;

            this.glowFilter.add(object, {
                outerStrength,
                innerStrength,
                glowColor,
                intensity,
                knockout: true
            });
        }; 

        updateGlow(this.scene.time.now);

        this.glowTimer = this.scene.time.addEvent({
            delay: 125, // Adjust the delay as needed
            callback: () => updateGlow(this.scene.time.now),
            loop: true,
            callbackScope: this
        });

    };

    weaponRotation = (entity, target) => {  
        if (!this.isPosturing && !this.isStrafing && !this.isStalwart && this.spriteShield) this.spriteShield.setVisible(false);
        if (this.isDodging || this.isRolling) this.spriteShield.setVisible(false);
        if (this.isDodging || this.isRolling) this.spriteWeapon.setVisible(false);
        if (this.isStalwart && !this.isRolling && !this.isDodging) this.spriteShield.setVisible(true);
        if (this.isPraying || this.isHealing) {
            if (this.spriteWeapon.depth < 3) this.spriteWeapon.setDepth(3);
            if (this.flipX) {
                if (this.frameCount === 0) {
                    this.spriteWeapon.setOrigin(0.65, 1.5);
                    this.spriteWeapon.setAngle(-175);
                };
                if (this.frameCount === 8) {
                    this.spriteWeapon.setOrigin(-0.3, 0.65);
                    this.spriteWeapon.setAngle(-225);
                };
            } else {
                if (this.frameCount === 0) {
                    this.spriteWeapon.setOrigin(-0.75, 0.65);
                    this.spriteWeapon.setAngle(-275);
                };
                if (this.frameCount === 8) {
                    this.spriteWeapon.setOrigin(0.35, 1.3);
                    this.spriteWeapon.setAngle(-225);
                }; 
            };
            this.frameCount += 1;
        } else if (this.isCountering) { 
            if (this.frameCount === FRAME_COUNT.COUNTER_LIVE) {
                if (entity === 'player' && this.inCombat && this.isRanged) {
                    if (this.hasMagic) this.particleEffect = this.scene.particleManager.addEffect('counter', this, this.currentDamageType);
                    if (this.hasBow) this.particleEffect = this.scene.particleManager.addEffect('counter', this, 'arrow');
                };
            };
            
            if ((entity === 'player' && this.hasBow) || (entity === 'enemy' && this.hasBow)) {
                if (this.flipX) {
                    this.spriteWeapon.setOrigin(0.1, 0.2);
                    this.spriteWeapon.setAngle(-225);
                } else {
                    this.spriteWeapon.setOrigin(0.25, 0);
                    this.spriteWeapon.setAngle(-45);
                };
            } else {
                if (this.flipX) {
                    this.spriteWeapon.setOrigin(-0.4, 1.6);
                    this.spriteWeapon.setAngle(-135);
                } else {
                    this.spriteWeapon.setOrigin(-0.4, 1.2);
                    this.spriteWeapon.setAngle(45);
                }; 
                
                if (this.frameCount === FRAME_COUNT.COUNTER_SUCCESS) {
                    if (entity === 'player' && this.actionAvailable && this.triggeredActionAvailable && !this.isRanged) {
                        this.actionSuccess = true;
                        this.attackedTarget = this.triggeredActionAvailable;
                    }; 
                    if (entity === 'enemy' && target && !this.isRanged) {
                        const direction = target.position.subtract(this.position);
                        const distance = direction.length();
                        if (distance < 51) this.actionSuccess = true;
                    };
                };
            };

            this.frameCount += 1; 

        } else if (this.isRolling) {
            if (this.frameCount === FRAME_COUNT.ROLL_LIVE) {
                if (entity === 'player' && this.inCombat && this.isRanged) {
                    if (this.hasMagic) this.particleEffect = this.scene.particleManager.addEffect('roll', this, this.currentDamageType);
                    if (this.hasBow) this.particleEffect = this.scene.particleManager.addEffect('roll', this, 'arrow');
                };
                if (entity === 'enemy' && this.attacking && this.inCombat && this.isRanged) {
                    if (this.hasMagic) this.particleEffect = this.scene.particleManager.addEffect('roll', this, this.currentDamageType);
                    if (this.hasBow) this.particleEffect = this.scene.particleManager.addEffect('roll', this, 'arrow');
                };
            };

            this.frameCount += 1;
        } else if (this.isAttacking) {
            if (this.frameCount === FRAME_COUNT.ATTACK_LIVE) {
                if (entity === 'player' && this.inCombat && this.isRanged) {
                    if (this.hasMagic) this.particleEffect = this.scene.particleManager.addEffect('attack', this, this.currentDamageType);
                    if (this.hasBow) this.particleEffect = this.scene.particleManager.addEffect('attack', this, 'arrow');
                };
                if (entity === 'enemy' && this.attacking && this.inCombat && this.isRanged) {
                    if (this.hasMagic) this.particleEffect = this.scene.particleManager.addEffect('attack', this, this.currentDamageType);
                    if (this.hasBow) this.particleEffect = this.scene.particleManager.addEffect('attack', this, 'arrow');
                };
            };

            if (this.spriteWeapon.depth !== 1) this.spriteWeapon.setDepth(1);

            if ((entity === 'player' && this.hasBow) || (entity === 'enemy' && this.hasBow)) {
                this.spriteWeapon.setDepth(this.depth + 1);
                if (this.flipX) {
                    if (this.frameCount === 0) { 
                        this.spriteWeapon.setOrigin(0.15, 0.85);
                        this.spriteWeapon.setAngle(90);
                    };
                    if (this.frameCount === 4) {
                        this.spriteWeapon.setAngle(72.5);
                    };
                    if (this.frameCount === 12) {
                        this.spriteWeapon.setAngle(90);
                    };
                    if (this.frameCount === 13) {
                        this.spriteWeapon.setAngle(130);
                    };
                    if (this.frameCount === 14) {
                        this.spriteWeapon.setAngle(170);
                    };
                    if (this.frameCount === 15) {
                        this.spriteWeapon.setAngle(210);
                    };
                    if (this.frameCount === 16) {
                        this.spriteWeapon.setAngle(250);
                    };
                    if (this.frameCount === 18) {
                        this.spriteWeapon.setOrigin(0.5, 0.5);
                        this.spriteWeapon.setAngle(340);
                    };
                    if (this.frameCount === 20) {
                        this.spriteWeapon.setAngle(290);
                    };
                    if (this.frameCount === 22) {
                        this.spriteWeapon.setOrigin(0.25, 0.5);
                        this.spriteWeapon.setAngle(250);
                    };
                    if (this.frameCount === 35) {
                        this.spriteWeapon.setOrigin(0.25, 0.25);
                        this.spriteWeapon.setAngle(0);
                    };
                    if (this.frameCount === 36) {
                        this.spriteWeapon.setAngle(15);
                    };
                    if (this.frameCount === 37) {
                        this.spriteWeapon.setOrigin(0.15, 0.85);
                        this.spriteWeapon.setAngle(30);
                    }; 
                    if (this.frameCount === 38) {
                        this.spriteWeapon.setAngle(45);
                    };
                    if (this.frameCount === 39) {
                        this.spriteWeapon.setAngle(60);
                        if (entity === 'player' && this.actionAvailable && this.triggeredActionAvailable) {
                            this.attackedTarget = this.triggeredActionAvailable;
                            this.actionSuccess = true;
                        };
                        if (entity === 'enemy' && target && !this.isRanged) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) this.actionSuccess = true;
                        };
                    }; 
                } else { 
                    if (this.frameCount === 0) { 
                        this.spriteWeapon.setOrigin(0.85, 0.1);
                        this.spriteWeapon.setAngle(0);
                    }
                    if (this.frameCount === 4) {
                        this.spriteWeapon.setAngle(17.5);
                    };
                    if (this.frameCount === 12) {
                        this.spriteWeapon.setAngle(0);
                    };
                    if (this.frameCount === 13) {
                        this.spriteWeapon.setAngle(-30);
                    };
                    if (this.frameCount === 14) {
                        this.spriteWeapon.setAngle(-60);
                    };
                    if (this.frameCount === 15) {
                        this.spriteWeapon.setAngle(-90);
                    };
                    if (this.frameCount === 16) {
                        this.spriteWeapon.setAngle(-120);
                    };
                    if (this.frameCount === 18) {
                        this.spriteWeapon.setOrigin(0, 0.5);
                        this.spriteWeapon.setAngle(-75);
                    };
                    if (this.frameCount === 20) {
                        this.spriteWeapon.setAngle(-10);
                    };
                    if (this.frameCount === 22) {
                        this.spriteWeapon.setOrigin(0.25, 0.5);
                        this.spriteWeapon.setAngle(-125);
                    };
                    if (this.frameCount === 35) {
                        this.spriteWeapon.setOrigin(0.25, 0.25);
                        this.spriteWeapon.setAngle(90);
                    };
                    if (this.frameCount === 36) {
                        this.spriteWeapon.setAngle(75);
                    };
                    if (this.frameCount === 37) {
                        this.spriteWeapon.setOrigin(0.85, 0.1);
                        this.spriteWeapon.setAngle(60);
                    }; 
                    if (this.frameCount === 38) {
                        this.spriteWeapon.setAngle(45);
                    };
                    if (this.frameCount === 39) {
                        this.spriteWeapon.setAngle(30);
                        if (entity === 'player' && this.actionAvailable && this.triggeredActionAvailable) {
                            this.actionSuccess = true;
                            this.attackedTarget = this.triggeredActionAvailable;
                        };
                        if (entity === 'enemy' && target && !this.isRanged) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) this.actionSuccess = true;
                        };
                    }; 
                };
            } else {
                if (this.flipX) {
                    if (this.frameCount === 0) { 
                        this.spriteWeapon.setOrigin(-0.25, 1.2);
                        this.spriteWeapon.setAngle(-250);
                    };
                    if (this.frameCount === 4) {
                        this.spriteWeapon.setAngle(-267.5);
                    };
                    if (this.frameCount === 12) {
                        this.spriteWeapon.setAngle(-250);
                    };
                    if (this.frameCount === 13) {
                        this.spriteWeapon.setAngle(-210);
                    };
                    if (this.frameCount === 14) {
                        this.spriteWeapon.setAngle(-170);
                    };
                    if (this.frameCount === 15) {
                        this.spriteWeapon.setAngle(-130);
                    };
                    if (this.frameCount === 16) {
                        this.spriteWeapon.setAngle(-90);
                    };
                    if (this.frameCount === 18) {
                        this.spriteWeapon.setOrigin(0.5, 0.75);
                        this.spriteWeapon.setAngle(0);
                    };
                    if (this.frameCount === 20) {
                        this.spriteWeapon.setAngle(30);
                    };
                    if (this.frameCount === 22) {
                        this.spriteWeapon.setOrigin(0.25, 1.1);
                        this.spriteWeapon.setAngle(55);
                    };
                    if (this.frameCount === 35) {
                        this.spriteWeapon.setOrigin(0.5, 0.75);
                        this.spriteWeapon.setAngle(30);
                    };
                    if (this.frameCount === 36) {
                        this.spriteWeapon.setAngle(0);
                    };
                    if (this.frameCount === 37) {
                        this.spriteWeapon.setOrigin(-0.25, 1.2);
                        this.spriteWeapon.setAngle(-90);
                    }; 
                    if (this.frameCount === 38) {
                        this.spriteWeapon.setAngle(-130);
                    };
                    if (this.frameCount === 39) {
                        this.spriteWeapon.setAngle(-170);
                        if (entity === 'player' && this.actionAvailable && this.triggeredActionAvailable && !this.isRanged) {
                            this.actionSuccess = true;
                            this.attackedTarget = this.triggeredActionAvailable;
                        };
                        if (entity === 'enemy' && target && !this.isRanged) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) this.actionSuccess = true;
                        };
                    };
                    if (this.frameCount === 40) {
                        this.spriteWeapon.setAngle(-210);
                    };
                    if (this.frameCount === 41) {
                        this.spriteWeapon.setAngle(-250);
                    };
                    if (this.frameCount === 42) {
                        this.spriteWeapon.setAngle(-267.5);
                    };
                } else { 
                    if (this.frameCount === 0) { 
                        this.spriteWeapon.setOrigin(-0.15, 1.25);
                        this.spriteWeapon.setAngle(-185);
                    }
                    if (this.frameCount === 4) {
                        this.spriteWeapon.setAngle(-182.5);
                    };
                    if (this.frameCount === 12) {
                        this.spriteWeapon.setAngle(150);
                    };
                    if (this.frameCount === 13) {
                        this.spriteWeapon.setAngle(120);
                    };
                    if (this.frameCount === 14) {
                        this.spriteWeapon.setAngle(90);
                    };
                    if (this.frameCount === 15) {
                        this.spriteWeapon.setAngle(60);
                    };
                    if (this.frameCount === 16) {
                        this.spriteWeapon.setAngle(30);
                    };
                    if (this.frameCount === 18) {
                        this.spriteWeapon.setOrigin(-0.25, 0.75);
                        this.spriteWeapon.setAngle(-75);
                    };
                    if (this.frameCount === 20) {
                        this.spriteWeapon.setAngle(-90);
                    };
                    if (this.frameCount === 22) {
                        this.spriteWeapon.setOrigin(0, 0.5);
                        this.spriteWeapon.setAngle(-150);
                    };
                    if (this.frameCount === 35) {
                        this.spriteWeapon.setOrigin(-0.25, 0.75);
                        this.spriteWeapon.setAngle(-90);
                    };
                    if (this.frameCount === 36) {
                        this.spriteWeapon.setAngle(-75);
                    };
                    if (this.frameCount === 37) {
                        this.spriteWeapon.setOrigin(-0.15, 1.25);
                        this.spriteWeapon.setAngle(30);
                    }; 
                    if (this.frameCount === 38) {
                        this.spriteWeapon.setAngle(60);
                    };
                    if (this.frameCount === 39) {
                        this.spriteWeapon.setAngle(90);
                        if (entity === 'player' && this.actionAvailable && this.triggeredActionAvailable && !this.isRanged) {
                            this.actionSuccess = true;
                            this.attackedTarget = this.triggeredActionAvailable;
                        };
                        if (entity === 'enemy' && target && !this.isRanged) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) this.actionSuccess = true;
                        };
                    };
                    if (this.frameCount === 40) {
                        this.spriteWeapon.setAngle(120);
                    };
                    if (this.frameCount === 41) {
                        this.spriteWeapon.setAngle(150);
                    };
                    if (this.frameCount === 42) {
                        this.spriteWeapon.setAngle(-180);
                    };
                };
            };
            this.frameCount += 1;
        } else if (this.isPosturing) {
            if (this.frameCount === FRAME_COUNT.POSTURE_LIVE) {
                if (entity === 'player' && this.inCombat && this.isRanged) {
                    if (this.hasMagic) this.particleEffect = this.scene.particleManager.addEffect('posture', this, this.currentDamageType);
                    if (this.hasBow) this.particleEffect = this.scene.particleManager.addEffect('posture', this, 'arrow');
                };
                if (entity === 'enemy' && this.attacking && this.inCombat && this.isRanged) {
                    if (this.hasMagic && this.attacking) this.particleEffect = this.scene.particleManager.addEffect('posture', this, this.currentDamageType);
                    if (this.hasBow && this.attacking) this.particleEffect = this.scene.particleManager.addEffect('posture', this, 'arrow');
                };
            }; 
            if (this.spriteWeapon.depth !== 1) this.spriteWeapon.setDepth(1);
            this.spriteShield.setVisible(true);

            if ((entity === 'player' && this.hasBow) || (entity === 'enemy' && this.hasBow)) {
                this.spriteWeapon.setDepth(3);
                this.spriteShield.setVisible(false);
                if (this.flipX) {
                    if (this.frameCount === 0) {
                        this.spriteWeapon.setOrigin(0.75, 0);
                        this.spriteWeapon.setAngle(235);
                    };
                    if (this.frameCount === 5) {
                        this.spriteWeapon.setAngle(155);
                    };
                    if (this.frameCount === 8) {
                        this.spriteWeapon.setOrigin(0, 0.25);
                        this.spriteWeapon.setAngle(135);
                    };  
                } else {
                    if (this.frameCount === 0) {
                        this.spriteWeapon.setOrigin(0, 0.5);
                        this.spriteWeapon.setAngle(-165);
                    };
                    if (this.frameCount === 5) {
                        this.spriteWeapon.setAngle(-90);
                    };
                    if (this.frameCount === 8) {
                        this.spriteWeapon.setOrigin(0.25, 0);
                        this.spriteWeapon.setAngle(-45);
                    };  
                };
            } else { 
                if (this.flipX) {
                    if (this.frameCount === 0) { // 0
                        this.spriteWeapon.setOrigin(0.25, 1.1);
                        this.spriteWeapon.setAngle(55);
                        this.spriteShield.setOrigin(1, 0.15);
                    };
                    if (this.frameCount === 5) { // 3
                        this.spriteWeapon.setOrigin(0.5, 0.75);
                        this.spriteWeapon.setAngle(40);
                        this.spriteShield.setOrigin(1.05, 0.15)
                    };
                    if (this.frameCount === 8) { // 5
                        this.spriteWeapon.setAngle(25);
                        this.spriteShield.setOrigin(1.1, 0.15);
                    }; 
                    if (this.frameCount === 11) { // 7
                        this.spriteWeapon.setOrigin(0, 1.2);
                        this.spriteWeapon.setAngle(-220);
                        this.spriteShield.setOrigin(1.15, 0.15);
                    };
                    if (this.frameCount === 14) { // 9
                        this.spriteWeapon.setOrigin(0, 1.4);
                        this.spriteWeapon.setAngle(-235);
                        this.spriteShield.setOrigin(1.2, 0.15);
                    }; 
                    if (this.frameCount === 17) { // 11
                        this.spriteWeapon.setAngle(-250);
                        this.spriteShield.setOrigin(1, 0.15);
                        if (entity === 'player' && this.actionAvailable && this.triggeredActionAvailable && !this.isRanged) {
                            this.actionSuccess = true;
                            this.attackedTarget = this.triggeredActionAvailable;
                        };
                        if (entity === 'enemy' && target && !this.isRanged) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) this.actionSuccess = true;
                        };
                    }; 
                } else {
                    if (this.frameCount === 0) { // 0
                        this.spriteWeapon.setOrigin(0, 0.5);
                        this.spriteWeapon.setAngle(-165);
                        this.spriteShield.setOrigin(0, 0.25);
                    };
                    if (this.frameCount === 5) { // 3
                        this.spriteWeapon.setOrigin(0, 1);
                        this.spriteWeapon.setAngle(-45);
                        this.spriteShield.setOrigin(-0.05, 0.15);
                    };
                    if (this.frameCount === 8) { // 5
                        this.spriteWeapon.setOrigin(-0.25, 1.1);
                        this.spriteWeapon.setAngle(15);
                        this.spriteShield.setOrigin(-0.1, 0.15);
                    }; 
                    if (this.frameCount === 11) { // 7
                        this.spriteWeapon.setOrigin(-0.1, 1.2);
                        this.spriteWeapon.setAngle(-205);
                        this.spriteShield.setOrigin(-0.15, 0.15);
                    };
                    if (this.frameCount === 14) { // 9
                        this.spriteWeapon.setAngle(-190);
                        this.spriteShield.setOrigin(-0.2, 0.15);
                    };
                    if (this.frameCount === 17) { // 11
                        this.spriteWeapon.setAngle(-175);
                        this.spriteShield.setOrigin(0, 0.15);
                        if (entity === 'player' && this.actionAvailable && this.triggeredActionAvailable && !this.isRanged) {
                            this.actionSuccess = true; 
                            this.attackedTarget = this.triggeredActionAvailable;
                        };
                        if (entity === 'enemy' && target && !this.isRanged) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) this.actionSuccess = true;
                        };
                    };
                };
            };
            this.frameCount += 1;
        } else if (((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) && !this.isRolling && !this.flipX) {
            if (this.isStrafing || this.isStalwart) {
                this.spriteShield.setOrigin(-0.2, 0.25);
            };
            if ((entity === 'player' && this.hasBow) || (entity === 'enemy' && this.hasBow)) {
                this.spriteWeapon.setDepth(1);
                this.spriteWeapon.setOrigin(0.5, 0.25);
                this.spriteWeapon.setAngle(107.5);
            } else {
                this.spriteWeapon.setDepth(3);
                this.spriteWeapon.setOrigin(-0.25, 0.5);
                this.spriteWeapon.setAngle(107.5);
            };
            if (this.frameCount > 0) this.frameCount = 0;
        } else if (((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) && !this.isRolling && this.flipX) { 
            if (this.isStrafing || this.isStalwart) {
                this.spriteShield.setOrigin(1.2, 0.25);
            };
            if ((entity === 'player' && this.hasBow) || (entity === 'enemy' && this.hasBow)) {
                this.spriteWeapon.setDepth(1);
                this.spriteWeapon.setOrigin(0.25, 0.5);
                this.spriteWeapon.setAngle(-7.5);
            } else {
                this.spriteWeapon.setDepth(3);
                this.spriteWeapon.setOrigin(0.5, 1.2);
                this.spriteWeapon.setAngle(-194.5);
            };
            if (this.frameCount > 0) this.frameCount = 0;
        } else if (this.flipX) { // X Origin More Right
            if ((entity === 'player' && this.hasBow) || (entity === 'enemy' && this.hasBow)) {
                this.spriteWeapon.setDepth(this.depth + 1);
                // this.spriteWeapon.setOrigin(0.5, 1.2); // Works as a back hand hold
                // this.spriteWeapon.setAngle(-150);
                this.spriteWeapon.setOrigin(0.15, 0.85);
                this.spriteWeapon.setAngle(90);
            } else {
                this.spriteWeapon.setDepth(1);
                this.spriteWeapon.setOrigin(-0.25, 1.2);
                this.spriteWeapon.setAngle(-250);
            };
            if (this.frameCount > 0) this.frameCount = 0;
        } else {
            if ((entity === 'player' && this.hasBow) || (entity === 'enemy' && this.hasBow)) {
                this.spriteWeapon.setDepth(this.depth + 1);
                this.spriteWeapon.setOrigin(0.85, 0.1);
                this.spriteWeapon.setAngle(0);
            } else {
                this.spriteWeapon.setDepth(1);
                this.spriteWeapon.setOrigin(-0.15, 1.3);
                this.spriteWeapon.setAngle(-195);
            };
            if (this.frameCount > 0) this.frameCount = 0;
        };
    };
};