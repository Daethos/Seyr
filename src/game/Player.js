import Phaser from "phaser";
import Entity, { screenShake, pauseGame } from "./Entity";  
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

        const spriteNameOne = scene?.gameData?.ascean?.weapon_one.imgURL.split('/')[2].split('.')[0];
        const spriteNameTwo = scene?.gameData?.ascean?.weapon_two.imgURL.split('/')[2].split('.')[0];
        const spriteNameThree = scene?.gameData?.ascean?.weapon_three.imgURL.split('/')[2].split('.')[0];

        scene.load.spritesheet(`${spriteNameOne}`, process.env.PUBLIC_URL + scene?.gameData?.ascean.weapon_one.imgURL, { frameWidth: 32, frameHeight: 32 });
        scene.load.spritesheet(`${spriteNameTwo}`, process.env.PUBLIC_URL + scene?.gameData?.ascean.weapon_two.imgURL, { frameWidth: 32, frameHeight: 32 });
        scene.load.spritesheet(`${spriteNameThree}`, process.env.PUBLIC_URL + scene?.gameData?.ascean.weapon_three.imgURL, { frameWidth: 32, frameHeight: 32 });
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
        this.frameCount = 0;
        this.currentWeaponSprite = spriteName;
        this.targetIndex = 0;
        this.currentTarget = null;
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

    weaponSprite(weapon) {
        return weapon.imgURL.split('/')[2].split('.')[0];
    };

    playerStateListener() {
        window.addEventListener('update-combat-data', (e) => {
            // console.log(e.detail, "State Updated");
            // if (this.health > e.detail.new_player_health) this.isHurt = true;
            if (this.currentRound !== e.detail.combatRound) {
                if (e.detail.realized_player_damage > 0) this.knockback(this.actionTarget);
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
                        // if (!other.gameObject.ascean._id ) this.touching.push(other.gameObjectB);
                        this.scene.setupEnemy({ game: other.gameObjectB.ascean, enemy: other.gameObjectB.combatData, health: other.gameObjectB.health });
                        this.scene.combatEngaged();
                        this.inCombat = true;
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
                    // this.touching = this.touching.filter(gameObject => gameObject !== other.gameObjectB);
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
    
    update() {
        if (this.currentWeaponSprite !== this.weaponSprite(this.scene.state.weapons[0])) {
            this.currentWeaponSprite = this.weaponSprite(this.scene.state.weapons[0]);
            this.spriteWeapon.setTexture(this.currentWeaponSprite);
        };
        this.touching.filter(gameObject => gameObject !== null);
        // =================== MOVEMENT VARIABLES ================== \\
        const speed = 3;
        
        // =================== TARGETING ================== \\

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.target.TAB)) {
            if (this.currentTarget) this.currentTarget.clearTint();
            console.log(this.touching, this.targetIndex);
            const newTarget = this.touching[this.targetIndex];
            this.targetIndex = this.targetIndex + 1 === this.touching.length ? 0 : this.targetIndex + 1;
            this.scene.setupEnemy({ game: newTarget.ascean, enemy: newTarget.combatData, health: newTarget.health }); 
            this.currentTarget = newTarget;
            this.highlightTarget(newTarget);
        };

        // let targetInterval;
        if (this.currentTarget) {
            this.highlightTarget(this.currentTarget);
            // targetInterval = this.scene.time.addEvent({
            //     delay: 1000,
            //     callback: () => {
            //         if (!this.currentTarget.isTinted) {
            //             this.currentTarget.setTint(0xFF0000); // Apply red tint
            //         } else {
            //             this.currentTarget.clearTint(); // Remove tint
            //         };
            //     },
            //     callbackScope: this,
            //     loop: true,
            // });
        } else {
            if (this.highlight.visible) {
                this.removeHighlight();
                // clearInterval(targetInterval);
            };
        };
 

        // =================== JUMPING ================== \\

        if (this.scene.isPlayerOnGround && this.isJumping) {
            this.isJumping = false;
        };

        // =================== HANGING ================== \\

        if (!this.isCollidingWithPlayer()) {
            this.isHanging = false;
            this.scene.setHanging('player', false);
            this.setStatic(false); 
        };

        // =================== STRAFING ================== \\

        if (this.inputKeys.strafe.E.isDown) {
            this.setVelocityX(speed);
            this.flipX = true;
        };
        if (this.inputKeys.strafe.Q.isDown) {
            this.setVelocityX(-speed);
            if (this.flipX) this.flipX = false;
        };

        // =================== ACTIONS ================== \\
    
        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
            this.scene.setState('action', 'counter');
            this.scene.setState('counter_guess', 'attack');
            this.isAttacking = true;           
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                this.knockback(this.actionTarget);
                // this.scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };
        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
            this.scene.setState('action', 'counter');
            this.scene.setState('counter_guess', 'posture');
            this.isPosturing = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // this.scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };
        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
            this.scene.setState('action', 'counter');
            this.scene.setState('counter_guess', 'roll');
            this.isRolling = true; 
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // this.scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };
    
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
            this.scene.setState('action', 'attack');
            if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
            this.isAttacking = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                this.knockback(this.actionTarget);
                // this.scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
            this.scene.setState('action', 'posture');
            if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
            this.isPosturing = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // this.scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
            this.isRolling = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // this.scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.dodge.FOUR)) {
            this.isDodging = true;
            // Will need to learn how to mask filter for the enemy
            
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE)) {
            this.scene.setState('action', 'counter');
            this.scene.setState('counter_action', 'counter');
            this.isCountering = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // this.scene.sendStateActionListener();
                // this.actionAvailable = false;
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

        // =================== MOVEMENT ================== \\

        if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
            // if (scene.state.action !== '') scene.setState('action', '');
            this.setVelocityX(speed);
            if (this.flipX) this.flipX = false;
        };

        if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
            // if (scene.state.action !== '') scene.setState('action', '');
            this.setVelocityX(-speed);
            this.flipX = true;
        };

        if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown)) {
        // if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown) && scene.isPlayerOnGround && this.isJumping === false) {
            this.setVelocityY(-speed); // Was Jump Velocity When Platformer
            this.scene.setOnGround('player', false);
            // this.isJumping = true; 
            // this.anims.play('player_jump', true);
        }; 

        if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
            // if (this.scene.state.action !== '') this.scene.setState('action', '');
            this.setVelocityY(speed);
        };

        if (this.inputKeys.shift.SHIFT.isDown && (Phaser.Input.Keyboard.JustDown(this.inputKeys.down.S) || Phaser.Input.Keyboard.JustDown(this.inputKeys.down.DOWN))) {
            this.autorunDown = this.autorunDown ? false : true;
            console.log('AutorunDown: ', this.autorunDown);
        };
        if (this.autorunDown) {
            if (this.autorunUp) this.autorunUp = false;
            this.setVelocityY(speed);
        };

        if (this.inputKeys.shift.SHIFT.isDown && (Phaser.Input.Keyboard.JustDown(this.inputKeys.left.A) || Phaser.Input.Keyboard.JustDown(this.inputKeys.left.LEFT))) {
            this.autorunLeft = this.autorunLeft ? false : true;
            console.log('AutorunLeft: ', this.autorunLeft);
        };
        if (this.autorunLeft) {
            if (this.autorunRight) this.autorunRight = false;
            this.setVelocityX(-speed);
            if (!this.flipX) this.flipX = true;
        };

        if (this.inputKeys.shift.SHIFT.isDown && (Phaser.Input.Keyboard.JustDown(this.inputKeys.right.D) || Phaser.Input.Keyboard.JustDown(this.inputKeys.right.RIGHT))) {
            this.autorunRight = this.autorunRight ? false : true;
            console.log('AutorunRight: ', this.autorunRight);
        };
        if (this.autorunRight) {
            if (this.autorunLeft) this.autorunLeft = false;
            this.setVelocityX(speed);
            if (this.flipX) this.flipX = false;
        };

        if (this.inputKeys.shift.SHIFT.isDown && (Phaser.Input.Keyboard.JustDown(this.inputKeys.up.W) || Phaser.Input.Keyboard.JustDown(this.inputKeys.up.UP))) {
            this.autorunUp = this.autorunUp ? false : true;
            console.log('AutorunUp: ', this.autorunUp);
        };
        if (this.autorunUp) {
            if (this.autorunDown) this.autorunDown = false;
            this.setVelocityY(-speed);
        };
        

        // =================== VARIABLES IN MOTION ================== \\

        if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
            this.setVelocityX(this.body.velocity.x * 0.85);
            if (this.scene.state.action !== 'posture') this.scene.setState('action', 'posture');
            // This will be a +% Defense from Shield. 
            // Counter-Posturing gets +damage bonus against this tactic
        };
        if (this.inputKeys.roll.THREE.isDown) {
            // this.setVelocityX(this.body.velocity.x * 1.25);
            // Flagged to have its weapons[0].roll added as an avoidance buff
            // Counter-Roll gets +damage bonus against this tactic
        };


        // =================== ANIMATIONS IF-ELSE CHAIN ================== \\

        if (this.isHurt) {
            this.anims.play('player_hurt', true).on('animationcomplete', () => {
                this.isHurt = false;
            }); 
        // } else if (this.isCrouching && (this.isAttacking || this.isPosturing || this.isCountering)) { // ATTACKING WHILE CROUCHING
        //     console.log("Pinging ATTACKING WHILE CROUCHING");
        //     this.anims.play('player_crouch_attacks', true).on('animationcomplete', () => {
        //         this.isAttacking = false;
        //         this.isPosturing = false;
        //         this.isCountering = false;
        //     });
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
                    console.log(elapsedTime, currentDistance, "Elapsed Time and Current Distance DODGING");
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
                    if (this.scene.state.action !== 'roll') this.scene.setState('action', 'roll');
                    if (this.scene.state.counter_guess !== '') this.scene.setState('counter_guess', '');
                    this.body.parts[2].position.y += sensorDisp;
                    this.body.parts[2].circleRadius = 21;
                    this.body.parts[1].vertices[0].y += colliderDisp;
                    this.body.parts[1].vertices[1].y += colliderDisp; 
                };
                this.rollCooldown = 50; 
                const rollDistance = 140; 
                
                const rollDuration = 20; // Total duration for the roll animation
                const rollInterval = 1; // Interval between each movement update
                
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
                    // this.setVelocityX(direction);
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
            this.anims.play('player_idle', true);
        }; 

        this.spriteWeapon.setPosition(this.x, this.y);
        this.weaponRotation();
    };

    weaponRotation() { 

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
            if (this.flipX) {
                this.spriteWeapon.setOrigin(-0.4, 1.6);
                this.spriteWeapon.setAngle(-135);
            } else {
                this.spriteWeapon.setOrigin(-0.4, 1.2);
                this.spriteWeapon.setAngle(45);
            };
        } else if (this.isAttacking) {
            if (this.flipX) {
                if (this.frameCount === 0) {
                    this.spriteWeapon.setOrigin(-0.25, 1.2);
                    this.spriteWeapon.setAngle(-250);
                }
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
            this.frameCount += 1;
        } else if (this.isPosturing) {
            if (this.flipX) {
                if (this.frameCount === 0) {
                    this.spriteWeapon.setOrigin(0.25, 1.1);
                    this.spriteWeapon.setAngle(55);
                };
                if (this.frameCount === 3) {
                    this.spriteWeapon.setOrigin(0.5, 0.75);
                    this.spriteWeapon.setAngle(40);
                };
                if (this.frameCount === 5) {
                    this.spriteWeapon.setAngle(25);
                }; 
                if (this.frameCount === 7) {
                    this.spriteWeapon.setOrigin(0, 1.2);
                    this.spriteWeapon.setAngle(-220);
                };
                if (this.frameCount === 9) {
                    this.spriteWeapon.setOrigin(0, 1.4);
                    this.spriteWeapon.setAngle(-235);
                };
                if (this.frameCount === 11) {
                    this.spriteWeapon.setAngle(-250);
                }; 
            } else {
                if (this.frameCount === 0) {
                    this.spriteWeapon.setOrigin(0, 0.5);
                    this.spriteWeapon.setAngle(-165);
                };
                if (this.frameCount === 3) {
                    this.spriteWeapon.setOrigin(0, 1);
                    this.spriteWeapon.setAngle(-45);
                };
                if (this.frameCount === 5) {
                    this.spriteWeapon.setOrigin(-0.25, 1.1);
                    this.spriteWeapon.setAngle(15);
                }; 
                if (this.frameCount === 7) {
                    this.spriteWeapon.setOrigin(-0.1, 1.2);
                    this.spriteWeapon.setAngle(-205);
                };
                if (this.frameCount === 9) {
                    this.spriteWeapon.setAngle(-190);
                };
                if (this.frameCount === 11) {
                    this.spriteWeapon.setAngle(-175);
                };
            };
            this.frameCount += 1;
        } else if (((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) && !this.isRolling && !this.flipX) {
            this.spriteWeapon.setDepth(3);
            this.spriteWeapon.setOrigin(-0.25, 0.5);
            this.spriteWeapon.setAngle(107.5);
            this.frameCount = 0;
        } else if (((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) && !this.isRolling && this.flipX) { 
            this.spriteWeapon.setDepth(3);
            this.spriteWeapon.setOrigin(0.5, 1.2);
            this.spriteWeapon.setAngle(-194.5);
            this.frameCount = 0;
        } else if (this.flipX) { // X Origin More Right
            this.spriteWeapon.setDepth(1);
            this.spriteWeapon.setOrigin(-0.25, 1.2);
            this.spriteWeapon.setAngle(-250);
            this.frameCount = 0;
        } else {
            this.spriteWeapon.setDepth(1);
            this.spriteWeapon.setOrigin(-0.15, 1.3);
            this.spriteWeapon.setAngle(-195);
            this.frameCount = 0;
        };
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