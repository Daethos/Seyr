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
        let { scene, x, y, texture, frame } = data;
        super({ ...data, name: 'player', ascean: scene.state.player, health: scene.state.new_player_health  }); 
        this.scene.add.existing(this);
        this.setScale(0.8);   
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.rectangle(this.x, this.y + 10, 24, 40, { isSensor: false, label: 'playerCollider' }); // Y + 10 For Platformer
        let playerSensor = Bodies.circle(this.x, this.y, 36, { isSensor: true, label: 'playerSensor' }); // Y + 2 For Platformer
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35, // Adjust the air friction for smoother movement
            restitution: 0.2, // Add some bounce, remove for no bounce
            gravity: { y: 0.075 },
        });
        this.sensor = playerSensor;
        this.knocking = false;
        this.currentRound = 0;
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation();   
        // this.checkHanging(); 
        this.checkEnemyAttackCollision(playerSensor);
        this.playerStateListener();
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
                this.anims.play('player_dead', true);
                this.inCombat = false;
                this.attacking = null;
            };
            // if (this.isDead) this.anims.play('player_dead', true);
            // if (this.isHurt) this.anims.play('player_hurt', true);
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
                    // console.log(other, "This MUST be the enemy collider");
                    const collisionPoint = this.calculateCollisionPoint(other);
                    const attackDirection = this.getAttackDirection(collisionPoint);
                    if (attackDirection === this.flipX) {
                        this.actionAvailable = true;
                        // console.log(other, "This is the Other being set to Action Target AT THE START OF THE COLLISION")
                        this.actionTarget = other;
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
                        // console.log(other.gameObjectB.name, other.bodyB.label, "This is the ENEMY during COLLISION ??");
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
    
    update(scene) {
        // if (this.actionTarget && this.actionTarget.gameObjectB.name === 'enemy') {
        //     console.log("The Enemy Collider Is the Action Target!")
        // } else {
        //     console.log("Mutated Magically")
        // }
        // =================== MOVEMENT VARIABLES ================== \\
        const speed = 4;
        const jumpVelocity = 15;
            
        // =================== CROUCHING ================== \\

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.crouch.C)) {
            this.isCrouching = this.isCrouching ? false : true;
            const displacement = 16;
            if (this.isCrouching) {
                this.body.parts[2].position.y += displacement;
                this.body.parts[2].circleRadius = 21;
                this.body.parts[1].vertices[0].y += displacement;
                this.body.parts[1].vertices[1].y += displacement; 
            } else {
                this.body.parts[2].position.y -= displacement;
                this.body.parts[2].circleRadius = 36;
                this.body.parts[1].vertices[0].y -= displacement;
                this.body.parts[1].vertices[1].y -= displacement;
            };
        };

        // =================== JUMPING ================== \\

        if (scene.isPlayerOnGround && this.isJumping) {
            this.isJumping = false;
        };

        // =================== HANGING ================== \\

        if (!this.isCollidingWithPlayer()) {
            this.isHanging = false;
            scene.setHanging('player', false);
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
            scene.setState('action', 'counter');
            scene.setState('counter_guess', 'attack');
            this.isAttacking = true;           
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };
        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
            scene.setState('action', 'counter');
            scene.setState('counter_guess', 'posture');
            this.isPosturing = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };
        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
            scene.setState('action', 'counter');
            scene.setState('counter_guess', 'roll');
            this.isRolling = true; 
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };
    
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
            scene.setState('action', 'attack');
            if (scene.state.counter_guess !== '') scene.setState('counter_guess', '');
            this.isAttacking = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
            scene.setState('action', 'posture');
            if (scene.state.counter_guess !== '') scene.setState('counter_guess', '');
            this.isPosturing = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
            this.isRolling = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.dodge.FOUR)) {
            this.isDodging = true;
            // Will need to learn how to mask filter for the enemy
            
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE)) {
            scene.setState('action', 'counter');
            scene.setState('counter_action', 'counter');
            this.isCountering = true;
            if (this.actionAvailable) {
                console.log("Knocked Back!", this.actionTarget.gameObjectB.name);
                // this.newKnockback(this.actionTarget);
                this.knockback(this.actionTarget);
                // scene.sendStateActionListener();
                // this.actionAvailable = false;
            };
        };

        // =================== OPTIONS ================== \\

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.pray.R) && this.invokeCooldown === 0) {
            if (scene.state.playerBlessing === '') return;
            console.log('Praying');
            this.isPraying = true;
            this.invokeCooldown = 30;
            if (this.playerBlessing === '' || this.playerBlessing !== scene.state.playerBlessing) {
                this.playerBlessing = scene.state.playerBlessing;
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
            scene.drinkFlask();
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.consume.F)) {
            if (scene.state.playerEffects.length === 0) return;
            this.isConsuming = true;
            this.prayerConsuming = scene.state.playerEffects[0].prayer;
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

        if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown || this.inputKeys.up.SPACE.isDown)) {
        // if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown || this.inputKeys.up.SPACE.isDown) && scene.isPlayerOnGround && this.isJumping === false) {
            this.setVelocityY(-speed); // Was Jump Velocity When Platformer
            scene.setOnGround('player', false);
            // this.isJumping = true; 
            // this.anims.play('player_jump', true);
        }; 

        if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
            // if (scene.state.action !== '') scene.setState('action', '');
            this.setVelocityY(speed);
        };

        // =================== IDLE ================== \\

        if (!this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown && !this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown && 
            !this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown && !this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown && 
            !this.inputKeys.up.SPACE.isDown && !this.inputKeys.strafe.E.isDown && !this.inputKeys.strafe.Q.isDown && !this.inputKeys.roll.THREE.isDown &&
            !this.inputKeys.attack.ONE.isDown && !this.inputKeys.counter.FIVE.isDown && !this.inputKeys.dodge.FOUR.isDown && !this.inputKeys.posture.TWO.isDown &&
            !this.inputKeys.pray.R.isDown && !this.inputKeys.hurt.H.isDown && !this.inputKeys.consume.F.isDown) {
            this.setVelocityX(0); 
        };

        // =================== VARIABLES IN MOTION ================== \\

        if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
            this.setVelocityX(this.body.velocity.x * 0.85);
            if (scene.state.action !== 'posture') scene.setState('action', 'posture');
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
        // } else  if (this.isHanging && scene.isPlayerHanging) { // HANGING
        //     if (!this.isCollidingWithPlayer()) {
        //         this.isHanging = false;
        //         scene.setHanging('player', false);
        //         this.setStatic(false);
        //     };
        //     this.anims.play('player_hanging', true);
        //     if (this.inputKeys.up.SPACE.isDown) {
        //         if (this.isAtEdgeOfLedge(scene)) {
        //             this.setStatic(false);
        //             this.setVelocityY(-jumpVelocity);
        //             this.isHanging = false;
        //             this.isJumping = true; 
        //             this.anims.play('player_jump', true);                   
        //         };
        //     };
        //     if (this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown) { // CLIMBING UP
        //         if (this.isAtEdgeOfLedge(scene)) {
        //             this.setStatic(false);
        //             this.anims.play('player_climb', true);
        //             this.setVelocityY(-7.5);
        //         };
        //     };
        //     if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) { // CLIMBING DOWN
        //         this.anims.play('player_climb', true);
        //         this.setStatic(false);
        //         this.setVelocityY(2);
        //     };
        //     if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown || this.inputKeys.strafe.Q.isDown) { // MOVING LEFT
        //         this.x -= 3;
        //     };
        //     if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown || this.inputKeys.strafe.E.isDown) { // MOVING RIGHT
        //         this.x += 3;
        //     };
        // } else if (this.isJumping && (this.isAttacking || this.isPosturing || this.isCountering)) { // ATTACKING IN THE AIR
        //     console.log("Pinging ATTACKING IN THE AIR")
        //     this.anims.play('player_attack_from_air', true).on('animationcomplete', () => {
        //         this.isAttacking = false;
        //         this.isPosturing = false;
        //         this.isCountering = false;
        //     });
        // } else if (this.isJumping && (this.inputKeys.roll.THREE.isDown)) { // ROLLING IN THE AIR
        //     console.log("Pinging ROLLING IN THE AIR")
        //     if (this.body.velocity.x > 0) {
        //         this.setVelocityX(this.flipX ? -speed * 1.5 : speed * 1.5);
        //     }; 
        //     this.anims.play('player_roll', true);
        } else if (this.isCrouching && (this.isAttacking || this.isPosturing || this.isCountering)) { // ATTACKING WHILE CROUCHING
            console.log("Pinging ATTACKING WHILE CROUCHING");
            this.anims.play('player_crouch_attacks', true).on('animationcomplete', () => {
                this.isAttacking = false;
                this.isPosturing = false;
                this.isCountering = false;
            });
        } else if (this.isCountering) { // COUNTERING
            this.anims.play('player_attack_2', true).on('animationcomplete', () => { 
                this.isCountering = false; 
            });
        } else if (this.isDodging) { // DODGING AKA SLIDING OUTSIDE COMBAT
            this.anims.play('player_slide', true);
            if (this.dodgeCooldown === 0) {
                this.dodgeCooldown = this.inCombat ? 30000 : 2000; 
                const dodgeDistance = 126;  
                const dodgeDuration = 18; // Total duration for the roll animation (in frames)
                const dodgeInterval = 1; // Interval between each frame update (in milliseconds)
                let elapsedTime = 0;
                let currentDistance = 0;
            
                const dodgeLoop = () => {
                    if (elapsedTime >= dodgeDuration || currentDistance >= dodgeDistance) {
                        clearInterval(dodgeIntervalId);
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
            if (this.rollCooldown === 0) {
                const sensorDisp = 12;
                const colliderDisp = 16;
                if (this.isRolling) {
                    if (scene.state.action !== 'roll') scene.setState('action', 'roll');
                    if (scene.state.counter_guess !== '') scene.setState('counter_guess', '');
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
        // } else if (this.isJumping) { // JUMPING
        //     console.log("Pinging JUMPING");
        //     this.anims.play('player_jump', true);
        } else if (this.isCrouching && (Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) { // CROUCHING AND MOVING
            this.anims.play('player_roll', true);
        } else if ((Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1)) { // RUNNING
            this.anims.play('player_running', true);
        } else if (this.isConsuming) { // CONSUMING
            console.log("Pinging CONSUMING")
            this.anims.play('player_health', true).on('animationcomplete', () => {
                this.isConsuming = false;
            });
        } else if (this.isHealing) { // HEALING
            console.log("Pinging HEALING")
            this.anims.play('player_health', true).on('animationcomplete', () => {
                scene.drinkFlask();
                this.isHealing = false;
            });
        } else if (this.isPraying) { // PRAYING
            console.log("Pinging PRAYING")
            this.anims.play('player_pray', true).on('animationcomplete', () => {
                this.isPraying = false;
            });
        } else if (this.isCrouching) { // CROUCHING IDLE
            this.anims.play('player_crouch_idle', true);
        } else { // IDLE
            this.anims.play('player_idle', true);
        };
    };

    // isAtEdgeOfLedge(scene) {
    //     const playerSensor = this.body.parts[2];
    //     const rayStart = { x: playerSensor.position.x - playerSensor.circleRadius, y: playerSensor.position.y };
    //     const rayEnd = { x: playerSensor.position.x + playerSensor.circleRadius, y: playerSensor.position.y - playerSensor.circleRadius };
    //     const bodies = scene.matter.world.getAllBodies().filter(body => body.gameObject && body.gameObject?.tile?.properties?.isGround);
        
    //     const intersections = scene.matter.intersectRay(rayStart.x, rayStart.y, rayEnd.x, rayEnd.y, 32, bodies).filter(intersection => intersection.id !== playerSensor.id);
    //     console.log(intersections, "Intersections");
    //     const rayLength = Phaser.Math.Distance.Between(rayStart.x, rayStart.y, rayEnd.x, rayEnd.y);
    //     const totalIntersectionLength = intersections.reduce((totalLength, intersection) => totalLength + intersection.length, 0);
        
    //     console.log(rayLength, "Ray Length", totalIntersectionLength, "Total Intersection Length");
    //     const isAtEdge = totalIntersectionLength >= rayLength * 0.9; // Check if total intersection length is at least 90% of the ray length
        
    //     return isAtEdge;
    //   };
      

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