import Phaser from "phaser";
import Entity from "./Entity"; 
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
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super({ ...data, name: "enemy", ascean: scene.state.computer, health: scene.state.new_computer_health }); 
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
        this.rollCooldown = 0;
        this.dodgeCooldown = 0;
        this.enemySensor = null;
        this.attacking = null;

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let enemyCollider = Bodies.rectangle(this.x, this.y + 10, 24, 40, { isSensor: false, label: 'enemyCollider' });
        let enemySensor = Bodies.circle(this.x, this.y + 4, 48, { isSensor: true, label: 'enemySensor' });
        const compoundBody = Body.create({
            parts: [enemyCollider, enemySensor],
            frictionAir: 0.01, // Adjust the air friction for smoother movement
            restitution: 0.2, // Set the restitution to reduce bounce
            mass: 2, // Increase the mass for a heavier feel
            gravity: { y: 0.075 }, // Increase gravity for a faster fall
            friction: 1,
        });
        this.enemySensor = enemySensor;
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation(); 
        this.scene.matterCollision.addOnCollideStart({
            objectA: [enemySensor],
            callback: other => {
                if (other.gameObjectB && other.gameObjectB.name === 'player') {
                    this.attacking = other.gameObjectB;
                    other.gameObjectB.inCombat = true;
                };
            },
            context: this.scene,
        });
        // this.scene.input.on('pointermove', (pointer) => { if (!this.dead) this.setFlipX(pointer.worldX < this.x)});
    };

    update(scene) {
        if (this.attacking) {
            let direction = this.attacking.position.subtract(this.position);
            if (direction.length() > 24) {
                let v = direction.normalize();
                this.setVelocityX(direction.x * 1.5);
                this.setVelocityY(direction.y * 1.5);
                if (this.attackTimer) {
                    clearInterval(this.attackTimer);
                    this.attackTimer = null;
                };
            } else {
                if (this.attackTimer == null) {
                    this.attackTimer = setInterval(this.attack, 500, this.attacking);
                };
            };
        };
        this.setFlipX(this.velocity.x < 0);
        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
            this.anims.play(`player_running`, true);
        } else {
            this.anims.play(`player_idle`, true);
        };
    };

    attack = (target) => {
        // console.log(this, target, 'Attacking')
        if (target.dead || this.dead) {
            clearInterval(this.attackTimer);
            return;
        };
        if (!this.isAttacking && !this.isCountering && !this.isDodging && !this.isRolling && !this.isPosturing && !this.isConsuming && !this.isCrouching && !this.isJumping && !this.isHanging && !this.isHealing && !this.isPraying) {
            this.evaluateCombat(this, target);
        };
    };

    evaluateCombat = (player, target) => {
        // console.log(player, target, 'Evaluating Combat')
        // if (player.health < (player.maxHealth / 2) && player.stamina > 0) {
        //     this.isHealing = true;
        //     this.heal(player);
        // };
        // if (player.health < (player.maxHealth / 2) && player.stamina <= 0) {
        //     this.isPraying = true;
        //     this.pray(player);
        // };
        // if (player.health >= (player.maxHealth / 2) && player.stamina > 0) {
        //     this.isAttacking = true;
        //     this.attackOne(player, target);
        // }
        // if (player.health >= (player.maxHealth / 2) && player.stamina <= 0) {
        //     this.isPosturing = true;
        //     this.posture(player);
        // }
        // if (player.health <= (player.maxHealth / 2) && player.stamina <= 0) {
        //     this.isDodging = true;
        //     this.dodge(player);
        // }
        // if (player.health <= (player.maxHealth / 2) && player.stamina > 0) {
        //     this.isRolling = true;
        //     this.roll(player);
        // }
        // if (player.health <= (player.maxHealth / 2) && player.stamina <= 0) {
        //     this.isCountering = true;
        //     this.counter(player);
        // };
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

    // update(scene) {
    //     // IF COLLISION WITH ENEMY, THEN DEAL RESOLVE COMBAT
    //     // IF COLLISION WITH ITEM, THEN PICK UP ITEM
    //     // IF COLLISION WITH DOOR, THEN OPEN DOOR
        

    //     // =================== MOVEMENT VARIABLES ================== \\
    //     const speed = 4;
    //     const jumpVelocity = 15;
    //     // let playerVelocity = new Phaser.Math.Vector2();
    //     // playerVelocity.normalize();
    //     // playerVelocity.scale(speed);

    //     // =================== CROUCHING ================== \\

    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.crouch.C)) {
    //         this.isCrouching = this.isCrouching ? false : true;
    //         const displacement = 16;
    //         if (this.isCrouching) {
    //             this.body.parts[2].position.y += displacement;
    //             this.body.parts[2].circleRadius = 21;
    //             this.body.parts[1].vertices[0].y += displacement;
    //             this.body.parts[1].vertices[1].y += displacement; 
    //         } else {
    //             this.body.parts[2].position.y -= displacement;
    //             this.body.parts[2].circleRadius = 28;
    //             this.body.parts[1].vertices[0].y -= displacement;
    //             this.body.parts[1].vertices[1].y -= displacement;
    //         };
    //     };

    //     // =================== JUMPING ================== \\

    //     if (scene.isPlayerOnGround && this.isJumping) {
    //         this.isJumping = false;
    //     };

    //     // =================== HANGING ================== \\

    //     if (!this.isCollidingWithPlayer()) {
    //         this.isHanging = false;
    //         scene.setPlayerHanging(false);
    //         this.setStatic(false); 
    //     };

    //     // =================== STRAFING ================== \\

    //     if (this.inputKeys.strafe.E.isDown) {
    //         this.setVelocityX(speed);
    //         this.flipX = true;
    //     };
    //     if (this.inputKeys.strafe.Q.isDown) {
    //         this.setVelocityX(-speed);
    //         if (this.flipX) this.flipX = false;
    //     };

    //     // =================== ACTIONS ================== \\
        
    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.attack.ONE)) {
    //         this.isAttacking = true;
    //     };
    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.posture.TWO)) {
    //         this.isPosturing = true;
    //     };
    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.roll.THREE) && !this.isCrouching) {
    //         this.isRolling = true;
    //         const displacement = 16;
    //         this.body.parts[2].position.y += displacement;
    //         this.body.parts[2].circleRadius = 21;
    //         this.body.parts[1].vertices[0].y += displacement;
    //         this.body.parts[1].vertices[1].y += displacement; 
    //     };
    //     if (Phaser.Input.Keyboard.JustUp(this.inputKeys.roll.THREE) && !this.isCrouching) {
    //         this.isRolling = false; 
    //         const displacement = 16;
    //         this.body.parts[2].position.y -= displacement;
    //         this.body.parts[2].circleRadius = 28;
    //         this.body.parts[1].vertices[0].y -= displacement;
    //         this.body.parts[1].vertices[1].y -= displacement;
    //     };
    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.dodge.FOUR)) {
    //         this.isDodging = true;
    //     };
    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.counter.FIVE)) {
    //         this.isCountering = true;
    //     };

    //     // =================== OPTIONS ================== \\

    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.pray.R)) {
    //         console.log('Praying')
    //         this.isPraying = this.isPraying ? false : true;
    //         // Invoke / Switching Prayers
    //     };

    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.hurt.H)) {
    //         this.isHealing = this.isHealing ? false : true;
    //         // Flaskwater Charge
    //     };

    //     if (Phaser.Input.Keyboard.JustDown(this.inputKeys.consume.F)) {
    //         this.isConsuming = this.isConsuming ? false : true;
    //         // Consume Prayer
    //     };

    //     // =================== MOVEMENT ================== \\

    //     if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) {
    //         this.setVelocityX(speed);
    //         if (this.flipX) this.flipX = false;
    //     };
    //     if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) {
    //         this.setVelocityX(-speed);
    //         this.flipX = true;
    //     }; 
    //     if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) {
    //         this.setVelocityY(2);
    //     };
    //     if ((this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown || this.inputKeys.up.SPACE.isDown) && scene.isPlayerOnGround && this.isJumping === false) {
    //         this.setVelocityY(-jumpVelocity);
    //         scene.setPlayerOnGround(false);
    //         this.isJumping = true; 
    //         this.anims.play('player_jump', true);
    //     };

    //     // =================== IDLE ================== \\

    //     if (
    //         !this.inputKeys.right.D.isDown && !this.inputKeys.right.RIGHT.isDown && !this.inputKeys.left.A.isDown && !this.inputKeys.left.LEFT.isDown && 
    //         !this.inputKeys.down.S.isDown && !this.inputKeys.down.DOWN.isDown && !this.inputKeys.up.W.isDown && !this.inputKeys.up.UP.isDown && 
    //         !this.inputKeys.up.SPACE.isDown && !this.inputKeys.strafe.E.isDown && !this.inputKeys.strafe.Q.isDown && !this.inputKeys.roll.THREE.isDown &&
    //         !this.inputKeys.attack.ONE.isDown && !this.inputKeys.counter.FIVE.isDown && !this.inputKeys.dodge.FOUR.isDown && !this.inputKeys.posture.TWO.isDown &&
    //         !this.inputKeys.pray.R.isDown && !this.inputKeys.hurt.H.isDown && !this.inputKeys.consume.F.isDown
    //         ) {
    //         this.setVelocityX(0); 
    //     };

    //     // =================== VARIABLES IN MOTION ================== \\

    //     if (this.inputKeys.strafe.E.isDown || this.inputKeys.strafe.Q.isDown) {
    //         this.setVelocityX(this.body.velocity.x * 0.85);
    //         // This will be a +% Defense from Shield. 
    //         // Counter-Posturing gets +damage bonus against this tactic
    //     };
    //     if (this.inputKeys.roll.THREE.isDown) {
    //         // this.setVelocityX(this.body.velocity.x * 1.25);
    //         // Flagged to have its weapons[0].roll added as an avoidance buff
    //         // Counter-Roll gets +damage bonus against this tactic
    //     };


    //     // =================== ANIMATIONS IF-ELSE CHAIN ================== \\

    //     if (this.isHanging && scene.isPlayerHanging) { // HANGING
    //         if (!this.isCollidingWithPlayer()) {
    //             this.isHanging = false;
    //             scene.setPlayerHanging(false);
    //             this.setStatic(false);
    //         };
    //         this.anims.play('player_hanging', true);
    //         if (this.inputKeys.up.W.isDown || this.inputKeys.up.UP.isDown) { // CLIMBING UP
    //             if (this.isAtEdgeOfLedge(scene)) {
    //                 this.setStatic(false);
    //                 this.anims.play('player_climb', true);
    //                 this.setVelocityY(-3);
    //             };
    //         };
    //         if (this.inputKeys.down.S.isDown || this.inputKeys.down.DOWN.isDown) { // CLIMBING DOWN
    //             this.anims.play('player_climb', true);
    //             this.setStatic(false);
    //             this.setVelocityY(2);
    //         };
    //         if (this.inputKeys.left.A.isDown || this.inputKeys.left.LEFT.isDown) { // MOVING LEFT
    //             this.x -= 3;
    //         };
    //         if (this.inputKeys.right.D.isDown || this.inputKeys.right.RIGHT.isDown) { // MOVING RIGHT
    //             this.x += 3;
    //         };
    //     } else if (this.isJumping && (this.isAttacking || this.isPosturing || this.isCountering)) { // ATTACKING IN THE AIR
    //         this.anims.play('player_attack_from_air', true);
    //     } else if (this.isJumping && (this.inputKeys.roll.THREE.isDown)) { // ROLLING IN THE AIR
    //         if (this.body.velocity.x > 0) {
    //             this.setVelocityX(this.flipX ? -speed * 1.5 : speed * 1.5);
    //         }; 
    //         this.anims.play('player_roll', true);
    //     } else if (this.isCrouching && (this.isAttacking || this.isPosturing || this.isCountering)) { // ATTACKING WHILE CROUCHING
    //         this.anims.play('player_crouch_attacks', true).on('animationcomplete', () => {
    //             this.isAttacking = false;
    //             this.isPosturing = false;
    //             this.isCountering = false;
    //         });
    //     } else if (this.isCountering) { // COUNTERING
    //         this.anims.play('player_attack_2', true).on('animationcomplete', () => {
    //             this.isCountering = false;
    //         });
            

    //     } else if (this.isDodging) { // DODGING AKA SLIDING
    //         this.anims.play('player_slide', true);
    //         if (this.dodgeCooldown === 0) {
    //             this.dodgeCooldown = this.inCombat ? 30000 : 2000; 
    //             const dodgeDistance = 96;  
    //             const dodgeDuration = 12; // Total duration for the roll animation (in frames)
    //             const dodgeInterval = 196 / 16; // Interval between each frame update (in milliseconds)
    //             let elapsedTime = 0;
    //             let currentDistance = 0;
            
    //             const dodgeLoop = () => {
    //                 if (elapsedTime >= dodgeDuration || currentDistance >= dodgeDistance) {
    //                     clearInterval(dodgeIntervalId);
    //                     this.dodgeCooldown = 0;
    //                     this.isDodging = false;
    //                     return;
    //                 };
    //                 const direction = !this.flipX ? -(dodgeDistance / dodgeDuration) : (dodgeDistance / dodgeDuration);
    //                 this.setVelocityX(direction);
    //                 currentDistance += Math.abs(dodgeDistance / dodgeDuration);
    //                 elapsedTime++;
    //             };
            
    //             const dodgeIntervalId = setInterval(dodgeLoop, dodgeInterval);  
    //         };
            
    //     } else if (this.inputKeys.roll.THREE.isDown && !this.isJumping && !this.inCombat) { // ROLLING OUTSIDE COMBAT
    //         this.anims.play('player_roll', true);
    //         if (this.rollCooldown === 0) {
    //             this.rollCooldown = this.inCombat ? 2000 : 500; 
    //             const rollDistance = 72; 
                
    //             const rollDuration = 12; // Total duration for the roll animation
    //             const rollInterval = 1; // Interval between each movement update
                
    //             let elapsedTime = 0;
    //             let currentDistance = 0;
                
    //             const rollLoop = () => {
    //                 if (elapsedTime >= rollDuration || currentDistance >= rollDistance) {
    //                     clearInterval(rollIntervalId);
    //                     this.rollCooldown = 0;
    //                     return;
    //                 };
    //                 const direction = this.flipX ? -(rollDistance / (rollDuration / rollInterval)) : (rollDistance / (rollDuration / rollInterval));
    //                 this.setVelocityX(direction);
    //                 currentDistance += Math.abs(rollDistance / (rollDuration / rollInterval));
    //                 elapsedTime += rollInterval;
    //             };
                
    //             const rollIntervalId = setInterval(rollLoop, rollInterval);  
    //         };
    //     } else if (this.isRolling && this.inCombbat) { // ROLLING IN COMBAT
    //         console.log(this.anims, "This.anims")
    //         this.anims.play('player_roll', true).on('animationcomplete', () => { 
    //             this.isRolling = false;
    //         }); 
    //         if (this.body.velocity.x > 0) {
    //             this.setVelocityX(this.body.velocity.x * 1.25);
    //         }; 
    //     } else if (this.isPosturing) { // POSTURING
    //         this.anims.play('player_attack_3', true).on('animationcomplete', () => {
    //             this.isPosturing = false;
    //         });
    //     } else if (this.isAttacking) { // ATTACKING
    //         this.anims.play('player_attack_1', true).on('animationcomplete', () => {
    //             this.isAttacking = false;
    //         });
    //     } else if (!scene.isPlayerOnGround && !this.inputKeys.attack.ONE.isDown) { // JUMPING
    //         this.anims.play('player_jump', true);
    //     } else if (this.isCrouching && Math.abs(this.body.velocity.x) > 0.1) { // CROUCHING AND MOVING
    //         this.anims.play('player_roll', true);
    //     } else if (Math.abs(this.body.velocity.x) > 0.1) { // RUNNING
    //         this.anims.play('player_running', true);
    //     } else if (this.isConsuming) { // CONSUMING
    //         this.anims.play('player_health', true).on('animationcomplete', () => {
    //             this.isConsuming = false;
    //         });
    //     } else if (this.isHealing) { // HEALING
    //         this.anims.play('player_health', true).on('animationcomplete', () => {
    //             this.isHealing = false;
    //         });
    //     } else if (this.isPraying) { // PRAYING
    //         this.anims.play('player_pray', true).on('animationcomplete', () => {
    //             console.log('Animation Complete')
    //             this.isPraying = false;
    //         });
    //     } else if (this.isCrouching) { // CROUCHING IDLE
    //         this.anims.play('player_crouch_idle', true);
    //     } else { // IDLE
    //         this.anims.play('player_idle', true);
    //     };
    // }; 

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