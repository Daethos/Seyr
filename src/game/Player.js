import Phaser from "phaser";
import Entity from "./Entity";
import playerPng  from './images/player.png'
import playerJSON from './images/player_atlas.json';
import playerAnim from './images/player_anim.json';  
import slashPNG from './images/slash.png';
import slashJSON from './images/slash_atlas.json';
const equipment = { png: playerPng, json: playerJSON, anim: playerAnim };

export default class Player extends Entity {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super({ ...data }); 
        this.scene.add.existing(this);
        this.setScale(1);
        // scene.physics.add.existing(this);
        this.isJumping = false;

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.01, // Adjust the air friction for smoother movement
            restitution: 0.5, // Set the restitution to reduce bounce
            mass: 0.75, // Increase the mass for a heavier feel
            gravity: { y: 0.15 }, // Increase gravity for a faster fall
            friction: 0.8,
        });
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation();
        // Check for collision with ground
        // this.scene.matter.world.on('collisionstart', (event) => {
        //     event.pairs.forEach((pair) => {
        //         const { bodyA, bodyB } = pair;
        //         console.log(bodyA, bodyB)
        //         if (!bodyA.gameObject || !bodyB.gameObject) return;
        //         const isBodyAGround = bodyA?.gameObject.tile && bodyA?.gameObject.tile.properties.isGround;
        //         const isBodyBGround = bodyB?.gameObject.tile && bodyB?.gameObject.tile.properties.isGround;
            
        //         if (isBodyAGround || isBodyBGround) {
        //             // Player is on the ground
        //             // Perform actions or set flags accordingly
        //             console.log('Player is on the ground', this.isPlayerOnGround)
        //             this.isPlayerOnGround = true;
        //         };
        //     });
        // });

        this.playerGroundSensor = this.scene.matter.add.circle(this.x, this.y + 10, 4, {
            isSensor: true,
            label: 'playerGroundSensor'
        });
        
        // Collision event for detecting ground contact
        this.scene.matterCollision.addOnCollideStart({
            objectA: this.playerCollider,
            objectB: this.playerGroundSensor,
            callback: (eventData) => {
                console.log('Player is on the ground?')
                const { gameObjectB } = eventData;
                if (gameObjectB && gameObjectB.isGround) {
                    // this.isPlayerOnGround = true; // Set the on-ground flag
                    this.scene.player.isJumping = false;
                    this.scene.setPlayerOnGround(true);
                }
            },
            context: this
        });
        
        // Reset the on-ground flag when not in contact with the ground
        this.scene.matterCollision.addOnCollideEnd({
            objectA: this.playerCollider,
            objectB: this.playerGroundSensor,
            callback: () => {
                console.log('Player is not on the ground')
                this.isPlayerOnGround = false; // Reset the on-ground flag
            },
            context: this
        });
  
        // this.scene.input.on('pointermove', (pointer) => { if (!this.dead) this.setFlipX(pointer.worldX < this.x)});
    };

    static preload(scene) {
        scene.load.atlas(`player`, equipment.png, equipment.json);
        scene.load.animation(`player_anim`, equipment.anim);
        scene.load.atlas(`slash`, slashPNG, slashJSON);
    };

    update(scene) {
        const speed = 5;
        let playerVelocity = new Phaser.Math.Vector2();
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        const jumpVelocity = 25;
        if (scene.isPlayerOnGround && this.isJumping) {
            console.log("You just landed on the ground from jumping!")
            this.isJumping = false;
        }
 

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
        console.log((this.isJumping === false), "isJumping", this.isJumping, "isPlayerOnGround", scene.isPlayerOnGround);
        if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown || this.inputKeys.up.SPACE.isDown) && scene.isPlayerOnGround && this.isJumping === false) {
            console.log("Jumping Now", this)
            this.setVelocityY(-jumpVelocity);
            // scene.isPlayerOnGround = false;
            scene.setPlayerOnGround(false);
            this.isJumping = true; 
            this.anims.play('player_jump', true);
        };
        if (!this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown && !this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown && !this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown && !this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown) {
            this.setVelocityX(0);
            // this.setVelocityY(0);
        };


        if (this.inputKeys.roll.THREE.isDown) {
            this.setVelocityX(this.body.velocity.x * 1.5);
        };

        // const isTouchingGround = this.body.blocked.down;

        // // If the player is touching the ground, handle the collision
        // if (isTouchingGround) {
        //     this.handleCollision();
        // }

        if (!scene.isPlayerOnGround && this.inputKeys.roll.THREE.isDown) {
            console.log("Air Spinning Now");
            this.anims.play('player_airspin', true);
        } else if (this.inputKeys.attack.ONE.isDown) {
            console.log("Attacking Now");
            this.anims.play('player_slash', true);
        } else if (this.inputKeys.counter.TWO.isDown) {
            console.log("Counter Attacking Now");
            this.anims.play('player_stab', true);
        } else if (this.inputKeys.roll.THREE.isDown) {
            console.log("Rolling Now");
            this.anims.play('player_rolling', true).once('animationcomplete', () => {
                if (this.flipX) {
                    this.flipX = false;
                } else {
                    this.flipX = true;
                }
                this.anims.play('player_slash', true);
            });
        } 
        // else if (!scene.isPlayerOnGround && !this.inputKeys.attack.ONE.isDown) {
        //     console.log("Jumping Now");
        //     this.anims.play('player_jump', true);
        // } 
        else if (!scene.isPlayerOnGround) {
            console.log("Landing Now From Previous Jump");
            this.anims.play('player_landing', true); 
        } else if (Math.abs(this.body.velocity.x) > 0.1) {
            console.log("I am Running Now");
            this.anims.play('player_running', true);
        } else {
            console.log("I am Idle Now");
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