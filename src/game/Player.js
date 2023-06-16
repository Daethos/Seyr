import Phaser from "phaser";
import Entity, { screenShake, pauseGame } from "./Entity";  
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
import highlightPNG from './images/highlight.png';
 
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
        scene.load.image(`highlight`, highlightPNG);
    };
    constructor(data) {
        let { scene } = data;
        super({ ...data, name: 'player', ascean: scene.state.player, health: scene.state.new_player_health }); 
        const spriteName = scene?.state?.player?.weapon_one.imgURL.split('/')[2].split('.')[0];
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, spriteName);
        this.spriteWeapon.setScale(0.6);
        this.spriteWeapon.setOrigin(0.25, 1);
        this.scene.add.existing(this);
        this.scene.add.existing(this.spriteWeapon);
        // this.spriteWeapon.setDepth(this + 1);
        this.spriteWeapon.setAngle(-195);
        this.currentWeaponSprite = spriteName;
        this.targetIndex = 0;
        this.currentTarget = null;
        this.stamina = scene.state.player_attributes.stamina;
        this.isMoving = false;
        const shieldName = scene?.state?.player?.shield.imgURL.split('/')[2].split('.')[0];
        this.spriteShield = new Phaser.GameObjects.Sprite(this.scene, 0, 0, shieldName);
        this.spriteShield.setScale(0.6);
        this.spriteShield.setOrigin(0.5, 0.5);
        this.scene.add.existing(this.spriteShield);
        this.spriteShield.setDepth(this + 1);
        this.spriteShield.setVisible(false);

        // const helmetName = scene?.state?.player?.helmet.imgURL.split('/')[2].split('.')[0];
        // const chestName = scene?.state?.player?.chest.imgURL.split('/')[2].split('.')[0];
        // const legsName = scene?.state?.player?.legs.imgURL.split('/')[2].split('.')[0];
        // this.spriteHelmet = new Phaser.GameObjects.Sprite(this.scene, 0, 0, helmetName);
        // this.spriteHelmet.setScale(0.4);
        // this.spriteHelmet.setOrigin(0.5, 1);
        // this.scene.add.existing(this.spriteHelmet);
        // this.spriteHelmet.setDepth(this + 1);

        // this.spriteChest = new Phaser.GameObjects.Sprite(this.scene, 0, 0, chestName);
        // this.spriteChest.setScale(0.6);
        // this.spriteChest.setOrigin(0.5, 0.25);
        // this.scene.add.existing(this.spriteChest);
        // this.spriteChest.setDepth(this + 1);

        // this.spriteLegs = new Phaser.GameObjects.Sprite(this.scene, 0, 0, legsName);
        // this.spriteLegs.setScale(0.6);
        // this.spriteLegs.setOrigin(0.5, -0.5);
        // this.scene.add.existing(this.spriteLegs);
        // this.spriteLegs.setDepth(this + 1);

        this.setScale(0.8);   
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.rectangle(this.x, this.y + 10, 24, 40, { isSensor: false, label: 'playerCollider' }); // Y + 10 For Platformer
        let playerSensor = Bodies.circle(this.x, this.y, 36, { isSensor: true, label: 'playerSensor' }); // Y + 2 For Platformer
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35, 
            restitution: 0.2,  
        });
        this.setExistingBody(compoundBody);                                    
        this.sensor = playerSensor;
        this.knocking = false;
        this.currentRound = 0;
        this.autorunDown = false;
        this.autorunUp = false;
        this.autorunLeft = false;
        this.autorunRight = false;
        
        // this.highlight = this.scene.add.sprite(0, 0, 'highlight');
        this.highlight = this.scene.add.graphics()
            .lineStyle(1, 0xFFD700) // Set the border color and thickness as per your preference
            .strokeCircle(0, 0, 10); // Set the radius as per your requirement
        this.scene.plugins.get('rexGlowFilterPipeline').add(this.highlight, {
            intensity: 0.02,
        });
        this.highlight.setVisible(false);

        this.setFixedRotation();   
        this.checkEnemyAttackCollision(playerSensor);
        this.playerStateListener();
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
        window.addEventListener('update-combat-data', (e) => {
            // console.log(e.detail, "State Updated");
            if (this.health > e.detail.new_player_health) {
                this.isHurt = true;
                let damage = Math.round(this.health - e.detail.new_player_health);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, damage, 1500, 'damage', e.detail.computer_critical_success);
                console.log(damage, "Damage Taken");
            };
            if (this.health < e.detail.new_player_health) {
                let heal = Math.round(e.detail.new_player_health - this.health);
                this.scrollingCombatText = new ScrollingCombatText(this.scene, this.x, this.y, heal, 1500, 'heal');
                console.log(heal, "Heal Taken");
            };
            if (this.currentRound !== e.detail.combatRound) {
                this.currentRound = e.detail.combatRound;
            }; 
            this.health = e.detail.new_player_health;
            if (e.detail.new_player_health <= 0) {
                this.isDead = true;
                this.anims.play('player_death', true);
                this.inCombat = false;
                this.attacking = null;
            };
            if (e.detail.new_computer_health <= 0) {
                this.inCombat = false;
                this.attacking = null;
            };
            this.checkMeleeOrRanged(e.detail.weapons[0]);
        });
    };
 
    checkEnemyAttackCollision(playerSensor) {
        this.scene.matterCollision.addOnCollideStart({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.gameObjectB.name === 'enemy' && other.bodyB.label === 'enemyCollider') {
                    const collisionPoint = this.calculateCollisionPoint(other);
                    const attackDirection = this.getAttackDirection(collisionPoint);
                    if (attackDirection === this.flipX) {
                        this.actionAvailable = true;
                        this.actionTarget = other;
                        const isNewEnemy = !this.touching.some(obj => obj.ascean._id === other.gameObjectB.ascean._id);
                        if (isNewEnemy) this.touching.push(other.gameObjectB);
                        this.currentTarget = other.gameObjectB; 
                        if (this.scene.state.computer._id !== other.gameObjectB.ascean._id) this.scene.setupEnemy({ game: other.gameObjectB.ascean, enemy: other.gameObjectB.combatData, health: other.gameObjectB.health });
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
                if (other.gameObjectB && other.gameObjectB.name === 'enemy' && other.bodyB.label === 'enemyCollider') {
                    const collisionPoint = this.calculateCollisionPoint(other);
                    const attackDirection = this.getAttackDirection(collisionPoint);
                    if (attackDirection === this.flipX) {
                        this.actionAvailable = true;
                        this.actionTarget = other;
                    };
                };
            },
            context: this.scene,
        });

        this.scene.matterCollision.addOnCollideEnd({
            objectA: [playerSensor],
            callback: (other) => {
                if (other.gameObjectB && other.gameObjectB.name === 'enemy' && other.bodyB.label === 'enemyCollider') {
                    this.actionAvailable = false;
                    this.actionTarget = null;
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
        this.scene.sendStateActionListener();
        if (this.particleEffect) {
            this.scene.particleManager.removeEffect(this.particleEffect.id);
            this.particleEffect.effect.destroy();
            this.particleEffect = null;
        };
        // this.knockback(this.actionTarget);
        screenShake(this.scene);
        pauseGame(20).then(() => {
            this.setVelocityX(0);
        });
    };
    
    update() {
        if (this.actionSuccess) {
            this.actionSuccess = false;
            this.playerActionSuccess();
        };
        if (this.currentWeaponSprite !== this.assetSprite(this.scene.state.weapons[0])) {
            this.currentWeaponSprite = this.assetSprite(this.scene.state.weapons[0]);
            this.spriteWeapon.setTexture(this.currentWeaponSprite);
        };
        if (this.currentShieldSprite !== this.assetSprite(this.scene.state.player.shield)) {
            this.currentShieldSprite = this.assetSprite(this.scene.state.player.shield);
            this.spriteShield.setTexture(this.currentShieldSprite);
        };
        this.touching.filter(gameObject => gameObject !== null);
        if (this.particleEffect) {
            if (!this.particleEffect.triggered) {
                this.scene.particleManager.update(this, this.particleEffect);
            };
            if (this.particleEffect.success) {
                this.particleEffect.triggered = true;
                this.particleEffect.success = false;
                this.playerActionSuccess();
            };
        };
        if (this.scrollingCombatText) this.scrollingCombatText.update(this);

        // =================== MOVEMENT VARIABLES ================== \\
        const speed = 2.25;
        let playerVelocity = new Phaser.Math.Vector2();
        
        // =================== TARGETING ================== \\
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.target.TAB)) {
            if (this.currentTarget) {
                this.currentTarget.clearTint();
            }; 
            console.log(this.touching, this.targetIndex);
            const newTarget = this.touching[this.targetIndex];
            if (!newTarget) return;
            this.targetIndex = this.targetIndex + 1 === this.touching.length ? 0 : this.targetIndex + 1;
            this.scene.setupEnemy({ game: newTarget.ascean, enemy: newTarget.combatData, health: newTarget.health }); 
            this.currentTarget = newTarget;
            this.highlightTarget(newTarget);
        };

        if (this.currentTarget) {
            this.highlightTarget(this.currentTarget); 
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

        // =================== MOVEMENT ================== \\

        if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
            playerVelocity.x = 1;
            // this.setVelocityX(speed);
            if (this.flipX) this.flipX = false;
        };

        if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
            playerVelocity.x = -1;
            // this.setVelocityX(-speed);
            this.flipX = true;
        };

        if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown)) {
            playerVelocity.y = -1;    
            // this.setVelocityY(-speed); // Was Jump Velocity When Platformer
        }; 

        if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
            playerVelocity.y = 1;    
            // this.setVelocityY(speed);
        };

        // =================== STRAFING ================== \\

        if (this.inputKeys.strafe.E.isDown) {
            playerVelocity.x = 1;
            if (!this.flipX) this.flipX = true;
            // this.setVelocity(playerVelocity.x, 0);
        };
        if (this.inputKeys.strafe.Q.isDown) {
            playerVelocity.x = -1;
            if (this.flipX) this.flipX = false;
            // this.setVelocity(playerVelocity.x, 0);
        };

        playerVelocity.normalize();
        playerVelocity.scale(speed);


        // if (this.inputKeys.shift.SHIFT.isDown && (Phaser.Input.Keyboard.JustDown(this.inputKeys.down.S) || Phaser.Input.Keyboard.JustDown(this.inputKeys.down.DOWN))) {
        //     this.autorunDown = this.autorunDown ? false : true;
        //     console.log('AutorunDown: ', this.autorunDown);
        // };

        // if (this.autorunDown) {
        //     if (this.autorunUp) this.autorunUp = false;
        //     // this.setVelocityY(speed);
        //     playerVelocity.y = 1;
            
        //     this.setVelocity(0, playerVelocity.y);
        // };

        // if (this.inputKeys.shift.SHIFT.isDown && (Phaser.Input.Keyboard.JustDown(this.inputKeys.left.A) || Phaser.Input.Keyboard.JustDown(this.inputKeys.left.LEFT))) {
        //     this.autorunLeft = this.autorunLeft ? false : true;
        //     console.log('AutorunLeft: ', this.autorunLeft);
        // };

        // if (this.autorunLeft) {
        //     if (this.autorunRight) this.autorunRight = false;
        //     // this.setVelocityX(speed);
        //     playerVelocity.x = -1;
            
        //     this.setVelocity(playerVelocity.x, 0);
        //     if (!this.flipX) this.flipX = true;
        // };

        // if (this.inputKeys.shift.SHIFT.isDown && (Phaser.Input.Keyboard.JustDown(this.inputKeys.right.D) || Phaser.Input.Keyboard.JustDown(this.inputKeys.right.RIGHT))) {
        //     this.autorunRight = this.autorunRight ? false : true;
        //     console.log('AutorunRight: ', this.autorunRight);
        // };

        // if (this.autorunRight) {
        //     if (this.autorunLeft) this.autorunLeft = false;
        //     // this.setVelocityX(playerVelocity.x);
        //     playerVelocity.x = 1;
            
        //     this.setVelocity(playerVelocity.x, 0);    
        //     if (this.flipX) this.flipX = false;
        // };

        // if (this.inputKeys.shift.SHIFT.isDown && (Phaser.Input.Keyboard.JustDown(this.inputKeys.up.W) || Phaser.Input.Keyboard.JustDown(this.inputKeys.up.UP))) {
        //     this.autorunUp = this.autorunUp ? false : true;
        //     console.log('AutorunUp: ', this.autorunUp);
        // };

        // if (this.autorunUp) {
        //     if (this.autorunDown) this.autorunDown = false;
        //     // this.setVelocityY(-playerVelocity.y);
        //     playerVelocity.y = -1;
            
        //     this.setVelocity(0, playerVelocity.y);
        // }; 

        // =================== VARIABLES IN MOTION ================== \\


        if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
            if (!this.spriteShield.visible) this.spriteShield.setVisible(true);
            if (!this.isStrafing) this.isStrafing = true;
            // Counter-Posturing gets +damage bonus against this tactic
        } else {
            this.isStrafing = false;
        };

        if (this.inputKeys.roll.THREE.isDown) { 
            // Flagged to have its weapons[0].roll added as an avoidance buff
            // Counter-Roll gets +damage bonus against this tactic
        }; 
        this.setVelocity(playerVelocity.x, playerVelocity.y);

        // =================== ACTIONS ================== \\
    
        if (this.stamina >= 10 && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
            this.scene.setState('action', 'counter');
            this.scene.setState('counter_guess', 'attack');
            this.isAttacking = true;           
            if (this.actionAvailable && this.actionTarget) {
                // this.playerActionSuccess();
            };
        };
        if (this.stamina >= 10 && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
            this.scene.setState('action', 'counter');
            this.scene.setState('counter_guess', 'posture');
            this.isPosturing = true;
            if (this.actionAvailable && this.actionTarget) {
                // this.playerActionSuccess();
            };
        };
        if (this.stamina >= 10 && !this.isStalwart && this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
            this.scene.setState('action', 'counter');
            this.scene.setState('counter_guess', 'roll');
            this.isRolling = true; 
            if (this.actionAvailable && this.actionTarget) {
                // this.playerActionSuccess();
            };
        };
    
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE) && this.stamina >= 30) {
            this.scene.setState('action', 'attack');
            if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
            this.isAttacking = true;
            if (this.actionAvailable && this.actionTarget) {
                // this.playerActionSuccess();
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO) && this.stamina >= 20) {
            this.scene.setState('action', 'posture');
            if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
            this.isPosturing = true;
            if (this.actionAvailable && this.actionTarget) {
                // this.playerActionSuccess();
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE) && this.stamina >= 20 && !this.isStalwart) {
            this.scene.setState('action', 'roll');
            this.isRolling = true;
            if (this.actionAvailable && this.actionTarget) {
                // this.playerActionSuccess();
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.dodge.FOUR) && this.stamina >= 20 && !this.isStalwart) {
            this.isDodging = true;
            this.scene.checkStamina('dodge');
            // Will need to learn how to mask filter for the enemy
            
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE) && this.stamina >= 10) {
            this.scene.setState('counter_guess', 'counter');
            this.scene.setState('action', 'counter');
            this.isCountering = true;
            if (this.actionAvailable && this.actionTarget) {
                // this.playerActionSuccess();
            };
        };

        // =================== OPTIONS ================== \\

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.pray.R) && this.invokeCooldown === 0) {
            if (this.scene.state.playerBlessing === '') return;
            console.log('Praying');
            this.isPraying = true;
            this.invokeCooldown = 30;
            if (this.playerBlessing === '' || this.playerBlessing !== this.scene.state.playerBlessing) {
                this.playerBlessing = this.scene.state.playerBlessing;
            };
            this.scene.sendStateSpecialListener('invoke');
            screenShake(this.scene);
            pauseGame(20).then(() => {
                this.setVelocityX(0);
            });
            const invokeInterval = 1000;
            let elapsedTime = 0;
            const invokeLoop = () => {
                if (elapsedTime >= this.invokeCooldown || !this.inCombat) {
                    clearInterval(invokeIntervalId);
                    this.invokeCooldown = 0;
                    this.isPraying = false;
                    return;
                };
                elapsedTime++;
            };
            const invokeIntervalId = setInterval(invokeLoop, invokeInterval);
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.hurt.H)) {
            this.isHealing = this.isHealing ? false : true;
            // Flaskwater Charge
            // May not do this
            this.scene.drinkFlask();
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.consume.F)) {
            if (this.scene.state.playerEffects.length === 0) return;
            this.isConsuming = true;
            this.prayerConsuming = this.scene.state.playerEffects[0].prayer;
            this.scene.sendStateSpecialListener('consume');
            screenShake(this.scene);
            pauseGame(20).then(() => {
                this.setVelocityX(0);
            });
        };
 
        // =================== ANIMATIONS IF-ELSE CHAIN ================== \\

        if (this.isHurt) {
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
                this.dodgeCooldown = this.inCombat ? 30000 : 2000; 
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
                    // if (this.scene.state.action !== 'roll') this.scene.setState('action', 'roll');
                    // if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
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
                        if (this.scene.state.action !== 'roll') this.scene.setState('action', '');
                        if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
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
        // } else if (this.isCrouching && (Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) { // CROUCHING AND MOVING
        //     this.anims.play('player_roll', true);
        } else if ((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) { // RUNNING
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
                this.scene.drinkFlask();
                this.isHealing = false;
            });
        } else if (this.isPraying) { // PRAYING
            console.log("Pinging PRAYING")
            this.anims.play('player_pray', true).on('animationcomplete', () => {
                this.isPraying = false;
            });
        // } else if (this.isCrouching) { // CROUCHING IDLE
        //     this.anims.play('player_crouch_idle', true);
        } else { // IDLE
            if (this.isMoving) this.isMoving = false;
            this.anims.play('player_idle', true);
        }; 

        this.spriteWeapon.setPosition(this.x, this.y);
        this.spriteShield.setPosition(this.x, this.y);
        // this.spriteHelmet.setPosition(this.x, this.y);
        // this.spriteChest.setPosition(this.x, this.y);
        // this.spriteLegs.setPosition(this.x, this.y);
        // this.spriteHealth.setPosition(this.x, this.y - 20);
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