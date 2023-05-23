import Phaser from "phaser";
import Entity from "./Entity";
import playerPng  from './images/player.png'
import playerJSON from './images/player_atlas.json';
import playerAnim from './images/player_anim.json';  
import slashPNG from './images/slash.png';
import slashJSON from './images/slash_atlas.json';
import walkPNG from './images/player_walk.png';
import walkJSON from './images/player_walk_atlas.json';
import walkAnim from './images/player_walk_anim.json';
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
        let { scene, x, y, texture, frame } = data;
        super({ ...data }); 
        this.scene.add.existing(this);
        this.setScale(1);
        // scene.physics.add.existing(this);
        this.isJumping = false;
        this.isHanging = false;
        this.inCombat = false;
        this.rollCooldown = 0;
        this.dodgeCooldown = 0;
        this.playerSensor = null;

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.rectangle(this.x, this.y + 8, 24, 48, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y, 28, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.01, // Adjust the air friction for smoother movement
            restitution: 0.25, // Set the restitution to reduce bounce
            mass: 1.5, // Increase the mass for a heavier feel
            gravity: { y: 0.05 }, // Increase gravity for a faster fall
            friction: 0.75,
        });
        this.playerSensor = playerSensor;
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation();
        // Check for collision with ground
        // this.scene.matter.world.on('collisionstart', (event) => {
        //     event.pairs.forEach((pair) => {
        //         const { bodyA, bodyB } = pair;
        //         if (!bodyA.gameObject || !bodyB.gameObject) return;
        //         const isBodyAGround = bodyA?.gameObject.tile && bodyA?.gameObject.tile.properties.isGround;
        //         const isBodyBGround = bodyB?.gameObject.tile && bodyB?.gameObject.tile.properties.isGround;
            
        //         if (isBodyAGround || isBodyBGround) { 
        //             this.scene.setPlayerOnGround(true);
        //         };
        //     });
        // });
        this.scene.matter.world.on('collisionstart', (event) => {
            console.log("Registering Collision Start")
            event.pairs.forEach((pair) => {
                const { bodyA, bodyB, collision } = pair;
                if (!bodyA.gameObject || !bodyB.gameObject) return;
                const isBodyAGround = bodyA?.gameObject.tile && bodyA?.gameObject.tile.properties.isGround;
                const isBodyBGround = bodyB?.gameObject.tile && bodyB?.gameObject.tile.properties.isGround;
        
                if (isBodyAGround || isBodyBGround) {
                    const playerPositionY = this.y; // Get the Y-coordinate of the player's sprite
                    const penetration = collision.penetration;
                    const normal = collision.normal;
        
                    // Calculate collision points based on penetration and normal vectors
                    const collisionPointA = {
                        x: bodyA.position.x + penetration.x * normal.x,
                        y: bodyA.position.y + penetration.x * normal.y
                    };
                    const collisionPointB = {
                        x: bodyB.position.x + penetration.y * normal.x,
                        y: bodyB.position.y + penetration.y * normal.y
                    };
        
                    // Determine the relevant collision point
                    const collisionPoint = (collisionPointA.y > collisionPointB.y) ? collisionPointA : collisionPointB;
        
                    if (collisionPoint.y > playerPositionY) {
                        // Player's feet are colliding with the ground, triggering landing animation
                        this.scene.setPlayerOnGround(true);
                        if (this.scene.isPlayerHanging) this.scene.setPlayerHanging(false);
                        if (this.isHanging) this.isHanging = false;
                        this.setStatic(false);
                    } else {
                        // Player's upper body is colliding with the ground, triggering hanging animation
                        this.scene.setPlayerHanging(true);
                        this.isHanging = true; 
                        this.setStatic(true);
                        this.setVelocityY(0); 
                    };
                };
            });
        });  
         
        // this.scene.input.on('pointermove', (pointer) => { if (!this.dead) this.setFlipX(pointer.worldX < this.x)});
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
        const speed = 5;
        let playerVelocity = new Phaser.Math.Vector2();
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        const jumpVelocity = 15;

        if (scene.isPlayerOnGround && this.isJumping) {
            console.log("You just landed on the ground from jumping!")
            this.isJumping = false;
        };
        if (!this.isCollidingWithPlayer()) {
            this.isHanging = false;
            scene.setPlayerHanging(false);
            this.setStatic(false);
        };
        if (this.inputKeys.strafe.E.isDown) {
            this.setVelocityX(speed);
            this.flipX = true;
        };
        if (this.inputKeys.strafe.Q.isDown) {
            this.setVelocityX(-speed);
            if (this.flipX) this.flipX = false;
        };

        if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
            this.setVelocityX(speed);
            if (this.flipX) this.flipX = false;
        };
        if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
            this.setVelocityX(-speed);
            this.flipX = true;
        }; 
        if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
            this.setVelocityY(jumpVelocity);
        };
        // console.log((this.isJumping === false), "isJumping", this.isJumping, "isPlayerOnGround", scene.isPlayerOnGround);
        if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown || this.inputKeys.up.SPACE.isDown) && scene.isPlayerOnGround && this.isJumping === false) {
            // console.log("Jumping Now", this)
            this.setVelocityY(-jumpVelocity);
            scene.setPlayerOnGround(false);
            this.isJumping = true; 
            this.anims.play('player_jump', true);
        };
        if (
            !this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown && !this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown && 
            !this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown && !this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown && 
            !this.inputKeys.up.SPACE.isDown && !this.inputKeys.strafe.E.isDown && !this.inputKeys.strafe.Q.isDown && !this.inputKeys.roll.THREE.isDown &&
            !this.inputKeys.attack.ONE.isDown && !this.inputKeys.counter.FIVE.isDown && !this.inputKeys.dodge.FOUR.isDown && !this.inputKeys.posture.TWO.isDown
            ) {
            this.setVelocityX(0); 
        };

        if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
            this.setVelocityX(this.body.velocity.x * 0.75);
        };
        if (this.inputKeys.roll.THREE.isDown) {
            this.setVelocityX(this.body.velocity.x * 1.5);
        }; 

        if (this.isHanging && scene.isPlayerHanging) {
            if (!this.isCollidingWithPlayer()) {
                this.isHanging = false;
                scene.setPlayerHanging(false);
                this.setStatic(false);
            };
            this.anims.play('player_hanging', true);
            if (this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown) {
                if (this.isAtEdgeOfLedge(scene)) {
                    this.setStatic(false);
                    this.anims.play('player_climb', true);
                    this.applyForce(new Phaser.Math.Vector2(0, -0.005));
                };
            };
            if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
                this.anims.play('player_climb', true);
                this.setStatic(false);
                this.applyForce(new Phaser.Math.Vector2(0, 0.005));
            };
            if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
                this.x -= 3;
            };
            if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
                this.x += 3;
            };
        } else if (this.isJumping && (this.inputKeys.attack.ONE.isDown || this.inputKeys.posture.TWO.isDown || this.inputKeys.counter.FIVE.isDown)) {
            this.anims.play('player_attack_from_air', true);
        } else if (this.isJumping && (this.inputKeys.roll.THREE.isDown)) {
            this.anims.play('player_roll', true);
        } else if (this.inputKeys.counter.FIVE.isDown) {
            this.anims.play('player_attack_2', true);
        } else if (this.inputKeys.dodge.FOUR.isDown) {
            this.anims.play('player_slide', true);
            if (this.dodgeCooldown === 0) {
                this.dodgeCooldown = this.inCombat ? 30000 : 2000; 
                const dodgeDistance = 72; 

                const dodgeDuration = 12; // Total duration for the roll animation
                const dodgeInterval = 1; // Interval between each movement update

                let elapsedTime = 0;
                let currentDistance = 0;

                const dodgeLoop = () => {
                    if (elapsedTime >= dodgeDuration || currentDistance >= dodgeDistance) {
                        clearInterval(dodgeIntervalId);
                        this.dodgeCooldown = 0;
                        return;
                    };
                    const direction = !this.flipX ? -(dodgeDistance / (dodgeDuration / dodgeInterval)) : (dodgeDistance / (dodgeDuration / dodgeInterval));
                    this.setVelocityX(direction);
                    currentDistance += Math.abs(dodgeDistance / (dodgeDuration / dodgeInterval));
                    elapsedTime += dodgeInterval;
                };

                const dodgeIntervalId = setInterval(dodgeLoop, dodgeInterval);  
            };
        } else if (this.inputKeys.roll.THREE.isDown && !this.isJumping) {
            this.anims.play('player_roll', true);
            if (this.rollCooldown === 0) {
                this.rollCooldown = this.inCombat ? 2000 : 500; 
                const rollDistance = 48; 
                
                const rollDuration = 12; // Total duration for the roll animation
                const rollInterval = 1; // Interval between each movement update
                
                let elapsedTime = 0;
                let currentDistance = 0;
                
                const rollLoop = () => {
                    if (elapsedTime >= rollDuration || currentDistance >= rollDistance) {
                        clearInterval(rollIntervalId);
                        this.rollCooldown = 0;
                        return;
                    };
                    const direction = this.flipX ? -(rollDistance / (rollDuration / rollInterval)) : (rollDistance / (rollDuration / rollInterval));
                    this.setVelocityX(direction);
                    currentDistance += Math.abs(rollDistance / (rollDuration / rollInterval));
                    elapsedTime += rollInterval;
                };
                
                const rollIntervalId = setInterval(rollLoop, rollInterval);  
            };
        } else if (this.inputKeys.posture.TWO.isDown) {
            this.anims.play('player_attack_3', true);
        } else if (this.inputKeys.attack.ONE.isDown) {
            this.anims.play('player_attack_1', true);
        } else if (!scene.isPlayerOnGround && !this.inputKeys.attack.ONE.isDown) {
            this.anims.play('player_jump', true);
        } else if (Math.abs(this.body.velocity.x) > 0.1) {
            console.log("I am Running Now");
            this.anims.play('player_running', true);
        } else {
            this.anims.play('player_idle', true);
        };
    };

    // isAtEdgeOfLedge() {
    //     const playerSensor = this.body.parts[2];
    //     const bodies = this.scene.matter.world.getAllBodies().filter(body => body.gameObject && body.gameObject?.tile?.properties?.isGround);
    //     const edgeThreshold = 0.9; // Adjust this value as needed
    //     const overlapThreshold = 0.5; // Adjust this value as needed
    //     let bodiesTouching = [];
    //     for (let i = 0; i < bodies.length; i++) {
    //         const body = bodies[i];
        
    //         if (body.id === playerSensor.id) {
    //             continue;
    //         };
    //         // if (
    //             //     body.position.y < (playerSensor.position.y - playerSensor.gameObject.height * edgeThreshold) 
    //             //     && this.scene.matter.overlap(playerSensor, body)
    //             // ) {
    //                 //     bodiesTouching.push(body);
    //                 // }; 
    //                 // Calculate the minimum y-coordinate for overlap detection
    //         const minY = playerSensor.position.y - playerSensor.gameObject.height * edgeThreshold;
    //         console.log(body.position.y < minY, "Checking Params For Bodies Touching")

    //         // Check if the body is within proximity to the top edge of the player's sensor
    //         if (body.position.y < minY) {

    //             // Calculate the overlap area between the body and the player's sensor
    //             const overlapArea = this.scene.matter.overlap(playerSensor, body);
    //             const playerSensorArea = playerSensor.gameObject.width * playerSensor.gameObject.height;
    //             console.log(overlapArea, "Overlap Area", playerSensorArea, "Player Sensor Area", overlapThreshold, "Overlap Threshold");
    //             // Check if the overlap area is above the threshold
    //             if (overlapArea / playerSensorArea > overlapThreshold) {
    //                 bodiesTouching.push(body);
    //             }
    //         }
    //     };
    //     console.log(bodiesTouching, "Bodies Touching")
    //     // if (bodiesTouching.length === 1) {
    //     //     return true;
    //     // } else {
    //     //     return false;
    //     // };
    //     return bodiesTouching.length > 0;

    // };

    isAtEdgeOfLedge(scene) {
        const playerSensor = this.body.parts[1]; // Assuming playerSensor is the second part of the compound body
        const rayStart = { x: playerSensor.position.x, y: playerSensor.position.y }; // Starting point of the ray
        const rayEnd = { x: playerSensor.position.x, y: playerSensor.position.y - playerSensor.circleRadius }; // Ending point of the ray
      
        const bodies = scene.matter.world.getAllBodies().filter(body => body.gameObject && body.gameObject?.tile?.properties?.isGround);
        const edgeThreshold = 0.9; // Adjust this value as needed
      
        let isAtEdge = false;
      
        for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
        
            // Skip the player's sensor body
            if (body.id === playerSensor.id) {
                continue;
            };
        
            // Perform ray casting
            const intersection = scene.matter.intersectRay(rayStart, rayEnd, body);
        
            // Check if the ray intersects with the body
            if (intersection.length > 0) {
                // Analyze the intersection points or perform additional checks
                // to determine if it corresponds to being at the edge of a ledge.
                // You can access the intersection points using intersection[0].pointA and intersection[0].pointB
        
                // Example: Check if the intersection occurs near the top of the sensor
                if (intersection[0].pointA.y < playerSensor.position.y - playerSensor.circleRadius * edgeThreshold) {
                    isAtEdge = true;
                    break; // No need to check further bodies
                };
            };
        };
      
        return isAtEdge;
    };
      
      
      
      
      

    isCollidingWithPlayer() {
        const bodies = this.scene.matter.world.getAllBodies().filter(body => body.gameObject && body.gameObject?.tile?.properties?.isGround);
        const playerSensor = this.body.parts[2];
        return this.scene.matter.overlap(playerSensor, bodies);
    };  
      
};