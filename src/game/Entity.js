import Phaser from "phaser";

export default class Entity extends Phaser.Physics.Matter.Sprite {
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

        this.actionAvailable = false;
        this.actionCounterable = false;
        this.actionCountered = false;
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
        this.stunDuration = 1500;

        this.currentAction = '';
        this.currentActionFrame = 0;
        this.interruptCondition = false;
        this.scrollingCombatText = null;

        this.path = [];
        this.nextPoint = {};
        this.pathDirection = {};
    };

    get position() {
        this._position.set(this.x, this.y);
        return this._position;
    };

    get velocity() {
        return this.body.velocity;
    };

    attack = () => {
        console.log("Attacking")
        this.anims.play(`player_attack_1`, true).on('animationcomplete', () => {
            this.isAttacking = false;
            this.currentAction = '';
        }); 
    };

    counter = () => {
        console.log("Countering")
        this.anims.play('player_attack_2', true).on('animationcomplete', () => { 
            this.isCountering = false; 
            this.currentAction = '';
        });
    };

    dodge = () => {
        console.log("Dodging")
        this.anims.play('player_slide', true);
        if (this.dodgeCooldown === 0) {
            this.dodgeCooldown = 1; 
            const dodgeDistance = 126;  
            const dodgeDuration = 18; 
            const dodgeInterval = 1; 
            let elapsedTime = 0;
            let currentDistance = 0; 
            const dodgeLoop = () => {
                if (elapsedTime >= dodgeDuration || currentDistance >= dodgeDistance) {
                    clearInterval(dodgeIntervalId);
                    this.dodgeCooldown = 0;
                    this.isDodging = false;
                    this.currentAction = '';
                    return;
                };
                const direction = !this.flipX ? -(dodgeDistance / dodgeDuration) : (dodgeDistance / dodgeDuration);
                this.setVelocityX(direction);
                if (this.body.velocity.y > 0) this.setVelocityY(direction);
                if (this.body.velocity.y < 0) this.setVelocityY(-direction);
                currentDistance += Math.abs(dodgeDistance / dodgeDuration);
                elapsedTime++;
            }; 
            const dodgeIntervalId = setInterval(dodgeLoop, dodgeInterval);  
        };
    };

    posture = () => {
        console.log("Posturing")
        this.anims.play('player_attack_3', true).on('animationcomplete', () => {
            this.isPosturing = false;
            this.currentAction = '';
        }); 
    };

    roll = () => {
        console.log("Rolling")
        this.anims.play('player_roll', true);
        if (this.rollCooldown === 0) {
            const sensorDisp = 12;
            const colliderDisp = 16;
            if (this.isRolling) {
                if (this.scene.state.action !== 'roll') this.scene.setState('computer_action', 'roll');
                if (this.scene.state.counter_guess !== '') this.scene.setState('computer_counter_guess', '');
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
                    this.rollCooldown = 0;
                    this.spriteWeapon.setVisible(true);
                    this.isRolling = false;
                    this.currentAction = '';
                    this.body.parts[2].position.y -= sensorDisp;
                    this.body.parts[2].circleRadius = 48;
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
    };

    hurt = () => {
        this.anims.play('player_hurt', true).on('animationcomplete', () => {
            this.isHurt = false;
        }); 
    };

    stun = () => {
        // this.stunTimer = this.scene.time.addEvent({
        //     delay: 1500,
        //     callback: () => {
        //         console.log("Stun over, callback fired");
        //         this.isStunned = false;
        //     },
        //     callbackScope: this,
        //     loop: false
        // });
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
        let bodyPosition = other.pair.gameObjectB.body.position; // TODO:FIXME: other.pair.gameObjectB is undefined sometimes =[]
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
            const forceX = (this.knockbackDirection.x * currentForce) * (this.flipX ? -15 : 15);
            const forceY = (this.knockbackDirection.y * currentForce) * (this.flipX ? -15 : 15);
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
        
        screenShake(this.scene);
        pauseGame(100).then(() => {
            this.setVelocityX(0);
        });
    };
    
    knockbackPlayer(other) { 
        let bodyPosition = other.gameObjectB.body.position;
        let body = this.scene.player.body; 
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
            const forceX = (this.knockbackDirection.x * currentForce) * (this.flipX ? -10 : 10);
            const forceY = (this.knockbackDirection.y * currentForce) * (this.flipX ? -10 : 10);
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
        pauseGame(50).then(() => {
            this.setVelocityX(0);
        });
    };

    checkDamageType = (type, concern) => {
        const magicTypes = ['Earth', 'Fire', 'Frost', 'Lightning', 'Wind', 'Righteous', 'Spooky', 'Sorcery', 'Wild'];
        const physicalTypes = ['Blunt', 'Pierce', 'Slash'];
        switch (concern) {
            case 'magic':
                if (magicTypes.includes(type)) return true;
                break;
            case 'physical':
                if (physicalTypes.includes(type)) return true;
                break;
            default:
                break;
        };
        return false;
    };

    checkBow = (weapon) => {
        if (!weapon) return false;
        if (weapon.type === 'Bow' || weapon.type === 'Greatbow') return true;
        return false;
    };

    checkMeleeOrRanged = (weapon) => {
        if (weapon?.attack_type === 'Magic' || weapon?.type === 'Bow' || weapon?.type === 'Greatbow') {
            this.isRanged = true;
        } else {
            this.isRanged = false;
        };
    };

    weaponRotation(entity, target) { 
        if (!this.isPosturing && !this.isStrafing && !this.isStalwart && this.spriteShield) this.spriteShield.setVisible(false);
        if (this.isDodging) this.spriteShield.setVisible(false);
        if (this.isStalwart && !this.isRolling && !this.isDodging) this.spriteShield.setVisible(true);
        if (this.isPraying) { // Change to isPraying for Live
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
            if (entity === 'player' && this.checkDamageType(this.scene.state.player_damage_type, 'magic') && this.frameCount === 5) {
                this.particleEffect = this.scene.particleManager.addEffect('counter', this, this.scene.state.player_damage_type.toLowerCase());
                if (this.flipX) {
                    this.particleEffect.effect.setOrigin(2, 0.5);
                } else {
                    this.particleEffect.effect.setOrigin(-1, 0.5);
                };
            } else if (entity === 'player' && this.checkBow(this.scene.state.weapons[0]) && this.frameCount === 5) {
                this.particleEffect = this.scene.particleManager.addEffect('counter', this, 'arrow');
            };
            if (entity === 'enemy' && this.checkDamageType(this.scene.state?.computer_weapons?.[0]?.damage_type[0], 'magic') && this.frameCount === 5) {
                this.particleEffect = this.scene.particleManager.addEffect('counter', this, this.scene.state.computer_weapons[0].damage_type[0].toLowerCase());
            } else if (entity === 'enemy' && this.checkBow(this.scene.state.computer_weapons[0]) && this.frameCount === 5) {
                this.particleEffect = this.scene.particleManager.addEffect('counter', this, 'arrow');
            };
            
            if ((entity === 'player' && this.checkBow(this.scene.state.weapons[0]) || entity === 'enemy' && this.checkBow(!this.scene.state.computer_weapons[0] ? this.ascean.weapon_one : this.scene.state.computer_weapons[0]))) {
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
                if (this.frameCount === 3) {
                    this.actionCounterable = true;
                };
                
                if (this.frameCount === 10) {
                    this.actionCounterable = false;
                    if (entity === 'player' && this.actionAvailable && this.actionTarget && !this.actionCountered) this.actionSuccess = true;
                    if (entity === 'enemy' && target && !this.isRanged && !this.actionCountered) {
                        const direction = target.position.subtract(this.position);
                        const distance = direction.length();
                        if (distance < 51) {
                            this.actionSuccess = true;
                        };
                    };
                };
            };

            this.frameCount += 1; 

        } else if (this.isRolling) {
            if (entity === 'player' && this.frameCount === 10 && this.inCombat && this.checkDamageType(this.scene.state.player_damage_type, 'magic')) {
                this.particleEffect = this.scene.particleManager.addEffect('roll', this, this.scene.state.player_damage_type.toLowerCase());
            } else if (entity === 'player' && this.frameCount === 10 && this.inCombat && this.checkBow(this.scene.state.weapons[0])) {
                this.particleEffect = this.scene.particleManager.addEffect('roll', this, 'arrow');
            };
            if (entity === 'enemy' && this.frameCount === 10 && this.inCombat && this.checkDamageType(this.scene.state.computer_damage_type, 'magic')) {
                this.particleEffect = this.scene.particleManager.addEffect('roll', this, this.scene.state.computer_damage_type.toLowerCase());    
            } else if (entity === 'enemy' && this.frameCount === 10 && this.inCombat && this.checkBow(this.scene.state.computer_weapons[0])) {
                this.particleEffect = this.scene.particleManager.addEffect('roll', this, 'arrow');
            };
            this.spriteShield.setVisible(false);
            this.spriteWeapon.setVisible(false);
            this.frameCount += 1;
        } else if (this.isAttacking) {
            if (entity === 'player' && this.checkDamageType(this.scene.state.player_damage_type, 'magic') && this.frameCount === 16) {
                this.particleEffect = this.scene.particleManager.addEffect('attack', this, this.scene.state.player_damage_type.toLowerCase());
            } else if (entity === 'player' && this.checkBow(this.scene.state.weapons[0]) && this.frameCount === 16) {
                this.particleEffect = this.scene.particleManager.addEffect('attack', this, 'arrow');
            };
            if (entity === 'enemy' && this.checkDamageType(this.scene.state?.computer_weapons?.[0]?.damage_type[0], 'magic') && this.frameCount === 16) {
                this.particleEffect = this.scene.particleManager.addEffect('attack', this, this.scene.state.computer_weapons[0].damage_type[0].toLowerCase());
            } else if (entity === 'enemy' && this.checkBow(this.scene.state.computer_weapons[0]) && this.frameCount === 16) {
                this.particleEffect = this.scene.particleManager.addEffect('attack', this, 'arrow');
            };
            if (this.spriteWeapon.depth !== 1) this.spriteWeapon.setDepth(1);

            if ((entity === 'player' && this.checkBow(this.scene.state.weapons[0])) || entity === 'enemy' && this.checkBow(!this.scene.state.computer_weapons[0] ? this.ascean.weapon_one : this.scene.state.computer_weapons[0])) {
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
                        this.actionCounterable = true;
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
                        console.log("Frame Success: Attack");
                        this.spriteWeapon.setAngle(60);
                        this.actionCounterable = false;
                        if (this.actionAvailable) this.actionSuccess = true;
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
                        this.actionCounterable = true;
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
                        console.log("Frame Success: Attack");
                        this.spriteWeapon.setAngle(30);
                        this.actionCounterable = false;
                        if (this.actionAvailable) this.actionSuccess = true;
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
                        this.actionCounterable = true;
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
                        this.actionCounterable = false;
                        if (entity === 'player' && this.actionAvailable && !this.actionCountered) this.actionSuccess = true;
                        if (entity === 'enemy' && target && !this.isRanged && !this.actionCountered) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) {
                                this.actionSuccess = true;
                            };
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
                        this.actionCounterable = true;
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
                        this.actionCounterable = false;
                        if (entity === 'player' && this.actionAvailable && !this.actionCountered) this.actionSuccess = true;
                        if (entity === 'enemy' && target && !this.isRanged && !this.actionCountered) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) {
                                this.actionSuccess = true;
                            };
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
            if (entity === 'player' && this.checkDamageType(this.scene.state.player_damage_type, 'magic') && this.frameCount === 3) {
                this.particleEffect = this.scene.particleManager.addEffect('posture', this, this.scene.state.player_damage_type.toLowerCase());
            } else if (entity === 'player' && this.checkBow(this.scene.state.weapons[0]) && this.frameCount === 3) {
                this.particleEffect = this.scene.particleManager.addEffect('posture', this, 'arrow');
            };
            if (entity === 'enemy' && this.checkDamageType(this.scene.state?.computer_weapons?.[0]?.damage_type[0], 'magic') && this.frameCount === 3) {
                this.particleEffect = this.scene.particleManager.addEffect('posture', this, this.scene.state.computer_weapons[0].damage_type[0].toLowerCase());
            } else if (entity === 'enemy' && this.checkBow(this.scene.state.computer_weapons[0]) && this.frameCount === 3) {
                this.particleEffect = this.scene.particleManager.addEffect('posture', this, 'arrow');
            };
            if (this.spriteWeapon.depth !== 1) this.spriteWeapon.setDepth(1);
            this.spriteShield.setVisible(true);
            if ((entity === 'player' && this.checkBow(this.scene.state.weapons[0])) || entity === 'enemy' && this.checkBow(!this.scene.state.computer_weapons[0] ? this.ascean.weapon_one : this.scene.state.computer_weapons[0])) {
                this.spriteWeapon.setDepth(3);
                this.spriteShield.setVisible(false);
                if (this.flipX) {
                    if (this.frameCount === 0) {
                        this.spriteWeapon.setOrigin(0.75, 0);
                        this.spriteWeapon.setAngle(235);
                    };
                    if (this.frameCount === 3) {
                        this.spriteWeapon.setAngle(155);
                    };
                    if (this.frameCount === 5) {
                        this.spriteWeapon.setOrigin(0, 0.25);
                        this.spriteWeapon.setAngle(135);
                    };  
                } else {
                    if (this.frameCount === 0) {
                        this.spriteWeapon.setOrigin(0, 0.5);
                        this.spriteWeapon.setAngle(-165);
                    };
                    if (this.frameCount === 3) {
                        this.spriteWeapon.setAngle(-90);
                    };
                    if (this.frameCount === 5) {
                        this.spriteWeapon.setOrigin(0.25, 0);
                        this.spriteWeapon.setAngle(-45);
                    };  
                };
            } else { 
                if (this.flipX) {
                    if (this.frameCount === 0) {
                        this.spriteWeapon.setOrigin(0.25, 1.1);
                        this.spriteWeapon.setAngle(55);
                        this.spriteShield.setOrigin(1, 0.15);
                        this.actionCounterable = true;
                    };
                    if (this.frameCount === 3) {
                        this.spriteWeapon.setOrigin(0.5, 0.75);
                        this.spriteWeapon.setAngle(40);
                        this.spriteShield.setOrigin(1.05, 0.15)
                    };
                    if (this.frameCount === 5) {
                        this.spriteWeapon.setAngle(25);
                        this.spriteShield.setOrigin(1.1, 0.15);
                    }; 
                    if (this.frameCount === 7) {
                        this.spriteWeapon.setOrigin(0, 1.2);
                        this.spriteWeapon.setAngle(-220);
                        this.spriteShield.setOrigin(1.15, 0.15);
                    };
                    if (this.frameCount === 9) {
                        this.spriteWeapon.setOrigin(0, 1.4);
                        this.spriteWeapon.setAngle(-235);
                        this.spriteShield.setOrigin(1.2, 0.15);
                    };
                    if (this.frameCount === 11) {
                        this.spriteWeapon.setAngle(-250);
                        this.spriteShield.setOrigin(1, 0.15);
                        this.actionCounterable = false;
                        if (entity === 'player' && this.actionAvailable && this.actionTarget && !this.actionCountered) this.actionSuccess = true;
                        if (entity === 'enemy' && target && !this.isRanged && !this.actionCountered) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) {
                                this.actionSuccess = true;
                            };
                        };
                    }; 
                } else {
                    if (this.frameCount === 0) {
                        this.spriteWeapon.setOrigin(0, 0.5);
                        this.spriteWeapon.setAngle(-165);
                        this.spriteShield.setOrigin(0, 0.25);
                        this.actionCounterable = true;
                    };
                    if (this.frameCount === 3) {
                        this.spriteWeapon.setOrigin(0, 1);
                        this.spriteWeapon.setAngle(-45);
                        this.spriteShield.setOrigin(-0.05, 0.15);
                    };
                    if (this.frameCount === 5) {
                        this.spriteWeapon.setOrigin(-0.25, 1.1);
                        this.spriteWeapon.setAngle(15);
                        this.spriteShield.setOrigin(-0.1, 0.15);
                    }; 
                    if (this.frameCount === 7) {
                        this.spriteWeapon.setOrigin(-0.1, 1.2);
                        this.spriteWeapon.setAngle(-205);
                        this.spriteShield.setOrigin(-0.15, 0.15);
                    };
                    if (this.frameCount === 9) {
                        this.spriteWeapon.setAngle(-190);
                        this.spriteShield.setOrigin(-0.2, 0.15);
                    };
                    if (this.frameCount === 11) {
                        this.spriteWeapon.setAngle(-175);
                        this.spriteShield.setOrigin(0, 0.15);
                        this.actionCounterable = false;
                        if (entity === 'player' && this.actionAvailable && this.actionTarget && !this.actionCountered) this.actionSuccess = true;
                        if (entity === 'enemy' && target && !this.isRanged && !this.actionCountered) {
                            const direction = target.position.subtract(this.position);
                            const distance = direction.length();
                            if (distance < 51) {
                                this.actionSuccess = true;
                            };
                        };
                    };
                };
            };
            this.frameCount += 1;
        } else if (((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) && !this.isRolling && !this.flipX) {
            if (this.isStrafing || this.isStalwart) {
                this.spriteShield.setOrigin(-0.2, 0.25);
            };
            if ((entity === 'player' && this.checkBow(this.scene.state.weapons[0])) || entity === 'enemy' && this.checkBow(this.scene.state.computer_weapons?.[0])) {
                this.spriteWeapon.setDepth(1);
                this.spriteWeapon.setOrigin(0.5, 0.25);
                this.spriteWeapon.setAngle(107.5);
            } else {
                this.spriteWeapon.setDepth(3);
                this.spriteWeapon.setOrigin(-0.25, 0.5);
                this.spriteWeapon.setAngle(107.5);
            };
            this.actionCountered = false;
            this.frameCount = 0;
        } else if (((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) && !this.isRolling && this.flipX) { 
            if (this.isStrafing || this.isStalwart) {
                this.spriteShield.setOrigin(1.2, 0.25);
            };
            if ((entity === 'player' && this.checkBow(this.scene.state.weapons[0])) || entity === 'enemy' && this.checkBow(this.scene.state.computer_weapons?.[0])) {
                this.spriteWeapon.setDepth(1);
                this.spriteWeapon.setOrigin(0.25, 0.5);
                this.spriteWeapon.setAngle(-7.5);
            } else {
                this.spriteWeapon.setDepth(3);
                this.spriteWeapon.setOrigin(0.5, 1.2);
                this.spriteWeapon.setAngle(-194.5);
            };
            this.actionCountered = false;
            this.frameCount = 0;
        } else if (this.flipX) { // X Origin More Right
            if ((entity === 'player' && this.checkBow(this.scene.state.weapons[0])) || entity === 'enemy' && this.checkBow(!this.scene.state.computer_weapons[0] ? this.ascean.weapon_one : this.scene.state.computer_weapons[0])) {
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
            this.actionCountered = false;
            this.frameCount = 0;
        } else {
            if ((entity === 'player' && this.checkBow(this.scene.state.weapons[0])) || entity === 'enemy' && this.checkBow(!this.scene.state.computer_weapons[0] ? this.ascean.weapon_one : this.scene.state.computer_weapons[0])) {
                this.spriteWeapon.setDepth(this.depth + 1);
                this.spriteWeapon.setOrigin(0.85, 0.1);
                this.spriteWeapon.setAngle(0);
            } else {
                this.spriteWeapon.setDepth(1);
                this.spriteWeapon.setOrigin(-0.15, 1.3);
                this.spriteWeapon.setAngle(-195);
            };
            this.actionCountered = false;
            this.frameCount = 0;
        };
    };
};
 
let totalTrauma = 0;
 
export function screenShake(scene) {
    totalTrauma += 1.05;
    const duration = 100;
    const intensity = 0.01 * Math.pow(totalTrauma, 2);
    
    if ("vibrate" in navigator) navigator.vibrate(duration);
    scene.cameras.main.shake(duration, intensity);
    
    const decayInterval = setInterval(() => {
        totalTrauma -= 1.05 / duration;
        if (totalTrauma <= 0) {
            totalTrauma = 0;
            clearInterval(decayInterval);
            pauseGame(duration);
        };
    }, 1);
};
 
export function pauseGame(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
};
  
export function walk(scene) {
    const duration = 32;
    const intensity = 0.00035;
    scene.cameras.main.shake(duration, intensity);
};