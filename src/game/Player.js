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
        this.inCombat = false;
        this.rollCooldown = 0;
        this.dodgeCooldown = 0;

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y + 32, 24, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y + 24, 36, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.01, // Adjust the air friction for smoother movement
            restitution: 0.35, // Set the restitution to reduce bounce
            mass: 1.5, // Increase the mass for a heavier feel
            gravity: { y: 0.075 }, // Increase gravity for a faster fall
            friction: 0.75,
        });
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation();
        // Check for collision with ground
        this.scene.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
                const { bodyA, bodyB } = pair;
                if (!bodyA.gameObject || !bodyB.gameObject) return;
                const isBodyAGround = bodyA?.gameObject.tile && bodyA?.gameObject.tile.properties.isGround;
                const isBodyBGround = bodyB?.gameObject.tile && bodyB?.gameObject.tile.properties.isGround;
            
                if (isBodyAGround || isBodyBGround) { 
                    this.scene.setPlayerOnGround(true);
                };
            });
        });

        this.scene.matter.world.on('collisionend', (event) => {
            
        });
 
         
        // this.scene.input.on('pointermove', (pointer) => { if (!this.dead) this.setFlipX(pointer.worldX < this.x)});
    };

    static preload(scene) {
        // scene.load.atlas(`player`, equipment.png, equipment.json);
        // scene.load.animation(`player_anim`, equipment.anim);
        // scene.load.atlas(`player_walk`, walkPNG, walkJSON);
        // scene.load.animation(`player_walk_anim`, walkAnim);
        scene.load.atlas(`player_actions`, playerActionsOnePNG, playerActionsOneJSON);
        scene.load.animation(`player_actions_anim`, playerActionsOneAnim);
        scene.load.atlas(`player_actions_two`, playerActionsTwoPNG, playerActionsTwoJSON);
        scene.load.animation(`player_actions_two_anim`, playerActionsTwoAnim);
        scene.load.atlas(`player_actions_three`, playerActionsThreePNG, playerActionsThreeJSON);
        scene.load.animation(`player_actions_three_anim`, playerActionsThreeAnim);
        scene.load.atlas(`player_attacks`, playerAttacksPNG, playerAttacksJSON);
        scene.load.animation(`player_attacks_anim`, playerAttacksAnim);
        // scene.load.atlas(`slash`, slashPNG, slashJSON);


    };

    update(scene) {
        const speed = 5;
        let playerVelocity = new Phaser.Math.Vector2();
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        const jumpVelocity = 15;

        if (scene.isPlayerOnGround && this.isJumping) {
            console.log("You just landed on the ground from jumping!")
            this.anims.play('player_landing', true);
            this.isJumping = false;
        }
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
            // this.setVelocityY(0);
        };

        if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
            this.setVelocityX(this.body.velocity.x * 0.75);
        };
        if (this.inputKeys.roll.THREE.isDown) {
            this.setVelocityX(this.body.velocity.x * 1.5);
        }; 


        if (this.isJumping && (this.inputKeys.attack.ONE.isDown || this.inputKeys.posture.TWO.isDown || this.inputKeys.counter.FIVE.isDown)) {
            this.anims.play('player_attack_from_air', true);
        } else if (this.isJumping && (this.inputKeys.roll.THREE.isDown)) {
            this.anims.play('player_roll', true);

        } else if (this.inputKeys.counter.FIVE.isDown) {
            // console.log("Counter Attacking Now");
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
        }  else if (this.inputKeys.posture.TWO.isDown) {
            // console.log("Posturing Now");
            this.anims.play('player_attack_3', true);
        } else if (this.inputKeys.attack.ONE.isDown) {
            // console.log("Attacking Now"); 
            this.anims.play('player_attack_1', true);
        } else if (!scene.isPlayerOnGround && !this.inputKeys.attack.ONE.isDown) {
            console.log("Jumping Now");
            this.anims.play('player_jump', true);
        } else if (Math.abs(this.body.velocity.x) > 0.1) {
            console.log("I am Running Now");
            this.anims.play('player_running', true);
            // console.log("I am Running Now");
        } else {
            // console.log("I am Idle Now");
            this.anims.play('player_idle', true);
        }
        

        // if (!scene.isPlayerOnGround && this.inputKeys.roll.THREE.isDown) {
        //     console.log("Air Spinning Now")
        //     this.anims.play('player_airspin', true);
        // } else if (!scene.isPlayerOnGround && !this.inputKeys.attack.ONE.isDown) {
        //     console.log("Jumping Now")
        //     this.anims.play('player_jump', true);
        // } 
        // else if (!scene.isPlayerOnGround) {
        //     console.log("Landing Now From Previous Jump")
        //     this.anims.play('player_landing', true); 
        // } 
        // else if (this.inputKeys.attack.ONE.isDown) {
        //     console.log("Attacking Now")
        //     this.anims.play('player_slash', true);

        //     // this.anims.play('slash', true);
        // } else if (this.inputKeys.counter.TWO.isDown) {
        //     console.log("Counter Attacking Now")
        //     this.anims.play('player_stab', true);
        // } else if (this.inputKeys.roll.THREE.isDown) {
        //     console.log("Rolling Now")
        //     this.anims.play('player_rolling', true).once('animationcomplete', () => {
        //         if (this.flipX) { this.flipX = false } else { this.flipX = true };
        //         this.anims.play('player_slash', true);
        //     });
        // } else if (Math.abs(this.body.velocity.x) > 0.1) {
        //     console.log("I am Running Now")
        //     this.anims.play('player_running', true);
        // } else {
        //     console.log("I am Idle Now")
        //     this.anims.play('player_idle', true);
        // };
          
        

        // if (this.joystick.touchCursor.forceX < 15 || this.joystick.touchCursor.forceX > -15) {
        //     this.setVelocityX(0);
        // };
        // if (this.joystick.touchCursor.forceX > 15 || this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
        //     this.setVelocityX(160);
        //     if (this.flipX) this.flipX = false;
        // };
        // if (this.joystick.touchCursor.forceX < -15 || this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
        //     this.setVelocityX(-160);
        //     this.flipX = true;
        // };

        // if (this.joystick.touchCursor.forceY < 15 || this.joystick.touchCursor.forceY > -15) {
        //     this.setVelocityY(0);
        // };
        // if (this.joystick.touchCursor.forceY > 15 || this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
        //     this.setVelocityY(160);
        // };
        // if (this.joystick.touchCursor.forceY < -15 || this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown) {
        //     this.setVelocityY(-160);
        // }; 
        
    };
 
      
};