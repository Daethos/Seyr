import Phaser from "phaser";
import Entity from "./Entity";
import playerPng  from './images/player.png'
import playerJSON from './images/player_atlas.json';
import playerAnim from './images/player_anim.json';  
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

const equipment = { png: playerPng, json: playerJSON, anim: playerAnim };
export default class Player extends Entity {
    constructor(data) {
        console.log(data, "Player Data");
        let { scene, x, y, texture, frame } = data;
        super({ ...data, name: 'player', ascean: scene.gameData }); 
        this.scene.add.existing(this);
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
        this.dodgeCooldown = 0;
        this.playerBlessing = '';
        this.prayerConsuming = '';
        this.rollCooldown = 0;
        this.playerSensor = null;
        this.touching = [];

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.rectangle(this.x, this.y + 10, 24, 40, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y + 2, 32, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.01, // Adjust the air friction for smoother movement
            restitution: 0.2, // Set the restitution to reduce bounce
            mass: 1.5, // Increase the mass for a heavier feel
            gravity: { y: 0.075 }, // Increase gravity for a faster fall
            friction: 0.5,
        });
        this.playerSensor = playerSensor;
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation(); 
        // this.scene.matter.world.on('collisionstart', (event) => {
        //     event.pairs.forEach((pair) => {
        //         const { bodyA, bodyB, collision } = pair;
        //         console.log(bodyA, bodyB, collision, 'Collision Start')
        //         if (!bodyA.gameObject || !bodyB.gameObject) return;
        //         const isBodyAGround = bodyA?.gameObject.tile && bodyA?.gameObject.tile.properties.isGround;
        //         const isBodyBGround = bodyB?.gameObject.tile && bodyB?.gameObject.tile.properties.isGround;
        
        //         if (isBodyAGround || isBodyBGround) {
        //             const playerPositionY = this.y; // Get the Y-coordinate of the player's sprite
        //             console.log(this.y, "Player During Collision")
        //             const penetration = collision.penetration;
        //             const normal = collision.normal;
        
        //             const collisionPointA = {
        //                 x: bodyA.position.x + penetration.x * normal.x,
        //                 y: bodyA.position.y + penetration.x * normal.y
        //             };
        //             const collisionPointB = {
        //                 x: bodyB.position.x + penetration.y * normal.x,
        //                 y: bodyB.position.y + penetration.y * normal.y
        //             };
        
        //             const collisionPoint = (collisionPointA.y > collisionPointB.y) ? collisionPointA : collisionPointB;
        //             console.log(collisionPoint.y, playerPositionY, collisionPoint.y > playerPositionY, 'collisionPoint.y > playerPositionY');

        //             if (collisionPoint.y > playerPositionY) {
        //                 this.scene.setPlayerOnGround(true);
        //                 if (this.scene.isPlayerHanging) this.scene.setPlayerHanging(false);
        //                 if (this.isHanging) this.isHanging = false;
        //                 this.setStatic(false);
        //             } else {
        //                 this.scene.setPlayerHanging(true);
        //                 this.isHanging = true; 
        //                 this.setStatic(true);
        //                 this.setVelocityY(0); 
        //             };
        //         };
        //     });
        // }); 
        
        // Collision handler for the hanging mechanic
        this.checkHanging(); 
    };

    checkHanging() {
        this.scene.matterCollision.addOnCollideStart({
            objectA: this.playerSensor,
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
                        this.scene.setPlayerOnGround(true);
                        if (this.scene.isPlayerHanging) this.scene.setPlayerHanging(false);
                        if (this.isHanging) this.isHanging = false;
                        this.setStatic(false);
                    } else {
                        this.scene.setPlayerHanging(true);
                        this.isHanging = true; 
                        this.setStatic(true);
                        this.setVelocityY(0); 
                    }
                }
            }
        });
    };

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

    update(scene) {
        // IF COLLISION WITH ENEMY, THEN DEAL RESOLVE COMBAT
        // IF COLLISION WITH ITEM, THEN PICK UP ITEM
        // IF COLLISION WITH DOOR, THEN OPEN DOOR
        

        // =================== MOVEMENT VARIABLES ================== \\
        const speed = 4;
        const jumpVelocity = 15;
        // let playerVelocity = new Phaser.Math.Vector2();
        // playerVelocity.normalize();
        // playerVelocity.scale(speed);

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
                this.body.parts[2].circleRadius = 28;
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
            scene.setPlayerHanging(false);
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
            scene.setState('counter_attack', 'attack');
            this.isAttacking = true;
        };
        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
            scene.setState('action', 'counter');
            scene.setState('counter_attack', 'posture');
            this.isPosturing = true;
        };
        if (this.inputKeys.shift.SHIFT.isDown && Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE)) {
            scene.setState('action', 'counter');
            scene.setState('counter_attack', 'roll'); 
        };
    
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
            scene.setState('action', 'attack');
            if (scene.state.counter_attack !== '') scene.setState('counter_attack', '');
            this.isAttacking = true;
        };
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
            scene.setState('action', 'posture');
            if (scene.state.counter_attack !== '') scene.setState('counter_attack', '');
            this.isPosturing = true;
        };
        if ((Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE) || Phaser.Input.Keyboard.JustUp(this.inputKeys.roll.THREE))) {
            this.isRolling = this.isRolling ? false : true;
            const sensorDisp = 12;
            const colliderDisp = 16;
            if (this.isRolling) {
                if (scene.state.action !== 'roll') scene.setState('action', 'roll');
                if (scene.state.counter_attack !== '') scene.setState('counter_attack', '');
                this.body.parts[2].position.y += sensorDisp;
                this.body.parts[2].circleRadius = 21;
                this.body.parts[1].vertices[0].y += colliderDisp;
                this.body.parts[1].vertices[1].y += colliderDisp; 
            } else {    
                if (scene.state.action !== '') scene.setState('action', '');
                this.body.parts[2].position.y -= sensorDisp;
                this.body.parts[2].circleRadius = 28;
                this.body.parts[1].vertices[0].y -= colliderDisp;
                this.body.parts[1].vertices[1].y -= colliderDisp;
            }
        }; 
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.dodge.FOUR)) {
            this.isDodging = true;
        };
        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE)) {
            scene.setState('action', 'counter');
            scene.setState('counter_action', 'counter');
            this.isCountering = true;
        };

        // =================== OPTIONS ================== \\

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.pray.R)) {
            console.log('Praying')
            this.isPraying = this.isPraying ? false : true;
            if (scene.state.playerBlessing === '') return;
            if (this.playerBlessing === '' || this.playerBlessing !== scene.state.playerBlessing) {
                this.playerBlessing = scene.state.playerBlessing;
            };
            // TODO:FIXME: addListener for invoking(this.playerBlessing);
            // Invoke / Switching Prayers triggers a prayer animation
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.hurt.H)) {
            this.isHealing = this.isHealing ? false : true;
            // Flaskwater Charge
            // May not do this
            scene.drinkFlask();
        };

        if (Phaser.Input.Keyboard.JustDown(this.inputKeys.consume.F)) {
            this.isConsuming = this.isConsuming ? false : true;
            if (scene.state.playerEffects.length === 0) return;
            this.prayerConsuming = scene.state.playerEffects[0].prayer;
            // TODO:FIXME: addListener for consuming(this.prayerConsuming);
            // Consume Prayer triggers the charge crush animation
        };

        // =================== MOVEMENT ================== \\

        if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
            if (scene.state.action !== 'attack') scene.setState('action', 'attack');
            this.setVelocityX(speed);
            if (this.flipX) this.flipX = false;
        };
        if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
            if (scene.state.action !== 'attack') scene.setState('action', 'attack');
            this.setVelocityX(-speed);
            this.flipX = true;
        }; 
        // if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
        //     this.setVelocityY(2);
        // };
        if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown || this.inputKeys.up.SPACE.isDown) && scene.isPlayerOnGround && this.isJumping === false) {
            this.setVelocityY(-jumpVelocity);
            scene.setPlayerOnGround(false);
            this.isJumping = true; 
            this.anims.play('player_jump', true);
        }; 


        // =================== IDLE ================== \\

        if (
            !this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown && !this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown && 
            !this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown && !this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown && 
            !this.inputKeys.up.SPACE.isDown && !this.inputKeys.strafe.E.isDown && !this.inputKeys.strafe.Q.isDown && !this.inputKeys.roll.THREE.isDown &&
            !this.inputKeys.attack.ONE.isDown && !this.inputKeys.counter.FIVE.isDown && !this.inputKeys.dodge.FOUR.isDown && !this.inputKeys.posture.TWO.isDown &&
            !this.inputKeys.pray.R.isDown && !this.inputKeys.hurt.H.isDown && !this.inputKeys.consume.F.isDown
            ) {
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

        if (this.isHanging && scene.isPlayerHanging) { // HANGING
            console.log("Pinging HANGING")
            if (!this.isCollidingWithPlayer()) {
                this.isHanging = false;
                scene.setPlayerHanging(false);
                this.setStatic(false);
            };
            this.anims.play('player_hanging', true);
            if (this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown) { // CLIMBING UP
                if (this.isAtEdgeOfLedge(scene)) {
                    this.setStatic(false);
                    this.anims.play('player_climb', true);
                    this.setVelocityY(-5);
                };
            };
            if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) { // CLIMBING DOWN
                this.anims.play('player_climb', true);
                this.setStatic(false);
                this.setVelocityY(2);
            };
            if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown || this.inputKeys.strafe.Q.isDown) { // MOVING LEFT
                this.x -= 3;
            };
            if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown || this.inputKeys.strafe.E.isDown) { // MOVING RIGHT
                this.x += 3;
            };
        } else if (this.isJumping && (this.isAttacking || this.isPosturing || this.isCountering)) { // ATTACKING IN THE AIR
            console.log("Pinging ATTACKING IN THE AIR")
            this.anims.play('player_attack_from_air', true).on('animationcomplete', () => {
                this.isAttacking = false;
                this.isPosturing = false;
                this.isCountering = false;
            });
        } else if (this.isJumping && (this.inputKeys.roll.THREE.isDown)) { // ROLLING IN THE AIR
            console.log("Pinging ROLLING IN THE AIR")
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.flipX ? -speed * 1.5 : speed * 1.5);
            }; 
            this.anims.play('player_roll', true);
        } else if (this.isCrouching && (this.isAttacking || this.isPosturing || this.isCountering)) { // ATTACKING WHILE CROUCHING
            console.log("Pinging ATTACKING WHILE CROUCHING");
            this.anims.play('player_crouch_attacks', true).on('animationcomplete', () => {
                this.isAttacking = false;
                this.isPosturing = false;
                this.isCountering = false;
            });
        } else if (this.isCountering) { // COUNTERING
            console.log("Pinging COUNTERING") 
            this.anims.play('player_attack_2', true).on('animationcomplete', () => { 
                this.isCountering = false; 
            });
        } else if (this.isDodging && !this.inCombat) { // DODGING AKA SLIDING OUTSIDE COMBAT
            console.log("Pinging DODGING AKA SLIDING")
            this.anims.play('player_slide', true);
            if (this.dodgeCooldown === 0) {
                this.dodgeCooldown = this.inCombat ? 30000 : 2000; 
                const dodgeDistance = 96;  
                const dodgeDuration = 12; // Total duration for the roll animation (in frames)
                const dodgeInterval = 196 / 16; // Interval between each frame update (in milliseconds)
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
                    elapsedTime++;
                };
            
                const dodgeIntervalId = setInterval(dodgeLoop, dodgeInterval);  
            };
            
        } else if (this.inputKeys.roll.THREE.isDown && !this.isJumping && !this.inCombat) { // ROLLING OUTSIDE COMBAT
            console.log("Pinging ROLLING OUTSIDE COMBAT")
            this.anims.play('player_roll', true);
            if (this.rollCooldown === 0) {
                this.rollCooldown = this.inCombat ? 2000 : 500; 
                const rollDistance = 72; 
                
                const rollDuration = 12; // Total duration for the roll animation
                const rollInterval = 1; // Interval between each movement update
                
                let elapsedTime = 0;
                let currentDistance = 0;
                
                const rollLoop = () => {
                    if (elapsedTime >= rollDuration || currentDistance >= rollDistance) {
                        clearInterval(rollIntervalId);
                        this.rollCooldown = 0;
                        // This is where the roll is changed in the scene back to ''
                        return;
                    };
                    const direction = this.flipX ? -(rollDistance / (rollDuration / rollInterval)) : (rollDistance / (rollDuration / rollInterval));
                    this.setVelocityX(direction);
                    currentDistance += Math.abs(rollDistance / (rollDuration / rollInterval));
                    elapsedTime += rollInterval;
                };
                
                const rollIntervalId = setInterval(rollLoop, rollInterval);  
            };
        } else if (this.isRolling && this.inCombat) { // ROLLING IN COMBAT
            console.log("Pinging ROLLING IN COMBAT");
            this.anims.play('player_roll', true).on('animationcomplete', () => {
                this.isRolling = false;
            }); 
            if (this.body.velocity.x > 0) {
                this.setVelocityX(this.body.velocity.x * 1.25);
            }; 
        } else if (this.isPosturing) { // POSTURING
            console.log("Pinging POSTURING");
            this.anims.play('player_attack_3', true).on('animationcomplete', () => {
                this.isPosturing = false;
            });
        } else if (this.isAttacking) { // ATTACKING
            console.log("Pinging ATTACKING");
            this.anims.play('player_attack_1', true).on('animationcomplete', () => {
                this.isAttacking = false;
            });
        } else if (this.isJumping) { // JUMPING
            console.log("Pinging JUMPING");
            this.anims.play('player_jump', true);
        } else if (this.isCrouching && Math.abs(this.body.velocity.x) > 0.1) { // CROUCHING AND MOVING
            console.log("Pinging CROUCHING AND MOVING")
            this.anims.play('player_roll', true);
        } else if (Math.abs(this.body.velocity.x) > 0.1) { // RUNNING
            console.log("Pinging RUNNING")
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
            console.log("Pinging CROUCHING IDLE")
            this.anims.play('player_crouch_idle', true);
        } else { // IDLE
            console.log("Pinging IDLE")
            this.anims.play('player_idle', true);
        };
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