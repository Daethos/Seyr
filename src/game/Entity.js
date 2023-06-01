import Phaser from "phaser";

export default class Entity extends Phaser.Physics.Matter.Sprite {
    constructor (data) {
        let { scene, x, y, texture, frame, depth, name, ascean, health } = data;
        super (scene.matter.world, x, y, texture, frame);
        this.x += this.width / 2;
        this.y -= this.height / 2;
        this.depth = depth || 1;
        this.name = name;
        this.ascean = ascean;
        this.health = health;
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
        this.isJumping = false;
        this.isHanging = false;
        this.isHealing = false;
        this.isHurt = false;
        this.isPraying = false;

        this.actionAvailable = false;
        this.actionTarget = null;
        this.dodgeCooldown = 0;
        this.invokeCooldown = 0;
        this.playerBlessing = '';
        this.prayerConsuming = '';
        this.rollCooldown = 0;

        this.sensor = null;
        this.touching = [];
        this.knockbackActive = false;
        this.knockbackForce = 0.1;
        this.knockbackDirection = {};
        this.knockbackDuration = 250;
    };

    get position() {
        this._position.set(this.x, this.y);
        return this._position;
    };

    get velocity() {
        return this.body.velocity;
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
        console.log(other, "Other");
        const bodyPosition = other.pair.bodyB.position; 
        const offset = Phaser.Physics.Matter.Matter.Vector.mult(other.pair.collision.normal, other.pair.collision.depth); 
        const collisionPoint = Phaser.Physics.Matter.Matter.Vector.add(bodyPosition, offset);
        this.knockbackDirection = Phaser.Physics.Matter.Matter.Vector.sub(this.body.position, collisionPoint);
        this.knockbackDirection = Phaser.Physics.Matter.Matter.Vector.normalise(this.knockbackDirection);
        console.log(collisionPoint, "Collision Point", this.knockbackDirection, "Knockback Direction");
 
        const accelerationFrames = 12; // Number of frames for acceleration
        const accelerationStep = this.knockbackForce / accelerationFrames; // Force increment per frame
        let currentForce = 0; // Current force value 
   
        const dampeningFactor = 0.9; // Force dampening factor 
        const knockbackDistance = 96; // Maximum knockback distance
        let distanceTravelled = 0; // Distance travelled 
        this.knockbackActive = true; 

        const knockbackDuration = 12; // Total duration for the roll animation (in frames)
        const knockbackInterval = 196 / 16; // Interval between each frame update (in milliseconds)
        let elapsedTime = 0;
        let currentDistance = 0;
    
        const knockbackLoop = () => {
            if (elapsedTime >= knockbackDuration || currentDistance >= knockbackDistance) {
                console.log("Cleared due to time or distance traditionally");
                clearInterval(knockbackIntervalId);
                this.knockbackActive = false;
                return;
            };  
            currentDistance += Math.abs(knockbackDistance / knockbackDuration);  
            if (currentForce < this.knockbackForce) { 
                currentForce += accelerationStep;
            }; 
            const maxForce = 10;
            const forceX = (-this.knockbackDirection.x * currentForce) * 1.5;
            const forceY = (-this.knockbackDirection.y * currentForce) / 3;

            Phaser.Physics.Matter.Matter.Body.applyForce(other.pair.gameObjectB.body, bodyPosition, {
                x: Math.min(forceX, maxForce),
                y: Math.min(forceY, maxForce)
            });

            currentForce *= dampeningFactor; 
            console.log(elapsedTime, "Current Frame", distanceTravelled, "Distance Traveled", currentForce, "Current Force Applied");
            elapsedTime++;
        }; 
    const knockbackIntervalId = setInterval(knockbackLoop, knockbackInterval);   
    };
};