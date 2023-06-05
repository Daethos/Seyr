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

        this.actionAvailable = false;
        this.actionTarget = null;
        this.dodgeCooldown = 0;
        this.invokeCooldown = 0;
        this.playerBlessing = '';
        this.prayerConsuming = '';
        this.rollCooldown = 0;

        this.attacking = null;
        this.sensor = null;
        this.touching = [];
        this.knockbackActive = false;
        this.knocedBack = false;
        this.knockbackForce = 0.01; // 0.1 is for Platformer, trying to lower it for Top Down
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
        console.log(`Is the ${this.name} looking left? ${this.flipX}`); 
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
        
        if ("vibrate" in navigator) {
            navigator.vibrate(40);
        };
        screenShake(this.scene);
        pauseGame(20).then(() => {
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
        pauseGame(20).then(() => {
            this.setVelocityX(0);
        });
    };
};

 
export function screenShake(scene) {
    const duration = 20;  
    const intensity = 0.0075;  
    scene.cameras.main.shake(duration, intensity);
};
 
export function pauseGame(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
};
  
  