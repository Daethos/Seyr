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
                    this.actionTarget = other;
                    other.gameObjectB.inCombat = true;
                    this.scene.combatEngaged();
                };
            },
            context: this.scene,
        }); 
    };

    update(scene) {
        if (this.attacking) {
            let direction = this.attacking.position.subtract(this.position);
            if (direction.length() > 24) {
                let v = direction.normalize();
                this.setVelocityX(direction.x * 1.5);
                // this.setVelocityY(direction.y * 1.5);
                // if the direction.y is less than < -1, then jump
                if (direction.y < -0.5) {
                    this.isJumping = true;
                    this.setVelocityY(-10);
                } else {
                    this.isJumping = false;
                };
                if (this.attackTimer) {
                    clearInterval(this.attackTimer);
                    this.attackTimer = null;
                };
            } else {
                if (this.attackTimer == null) {
                    const intervalTime = this.scene.state.computer_weapons[0].grip === 'Two-Hand' ? 3000 : 1500;
                    this.attackTimer = setInterval(this.attack, intervalTime, this.attacking);
                };
            };
        };
        this.setFlipX(this.velocity.x < 0);

        if (this.isCountering) { // COUNTERING
            this.anims.play('player_attack_2', true).on('animationcomplete', () => { 
                this.isCountering = false; 
            });
        } else if (this.isDodging) { // DODGING AKA SLIDING OUTSIDE COMBAT
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
            
        } else if (this.isRolling && !this.isJumping) { // ROLLING OUTSIDE COMBAT
            this.anims.play('player_roll', true);
            if (this.rollCooldown === 0) {
                const sensorDisp = 12;
                const colliderDisp = 16;
                if (this.isRolling) {
                    if (scene.state.action !== 'roll') scene.setState('computer_action', 'roll');
                    if (scene.state.counter_attack !== '') scene.setState('computer_counter_attack', '');
                    this.body.parts[2].position.y += sensorDisp;
                    this.body.parts[2].circleRadius = 21;
                    this.body.parts[1].vertices[0].y += colliderDisp;
                    this.body.parts[1].vertices[1].y += colliderDisp; 
                };
                this.rollCooldown = 50; 
                const rollDistance = 120; 
                
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
                        this.body.parts[2].circleRadius = 28;
                        this.body.parts[1].vertices[0].y -= colliderDisp;
                        this.body.parts[1].vertices[1].y -= colliderDisp; 
                        return;
                    };
                    const direction = this.flipX ? -(rollDistance / rollDuration) : (rollDistance / rollDuration);
                    this.setVelocityX(direction);
                    currentDistance += Math.abs(rollDistance / rollDuration);
                    elapsedTime += rollInterval;
                };
                const rollIntervalId = setInterval(rollLoop, rollInterval);  
            };
        } else if (this.isPosturing) { // POSTURING
            this.anims.play('player_attack_3', true).on('animationcomplete', () => {
                this.isPosturing = false;
            });
        } else if (this.isAttacking) {
            this.anims.play(`player_attack_1`, true).on('animationcomplete', () => {
                this.isAttacking = false;
            });
        } else if (this.isJumping) { // JUMPING
            console.log("Pinging JUMPING");
            this.anims.play('player_jump', true);
        } else if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
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
        // this.evaluateCombat(this, target);
        const specials = ['pray', 'consume', 'jump'];
        const action = this.evaluateCombat(this, target);
        switch (action) {
            case 'attack':
                // this.attackOne(target);
                this.isAttacking = true;
                break;
            case 'counter':
                // this.counter(target);
                this.isCountering = true;
                break;
            case 'dodge':
                this.isDodging = true;
                break;
            case 'roll':
                this.isRolling = true;
                break;
            case 'posture':
                this.isPosturing = true;
                break;
            case 'jump':
                this.isJumping = true;
                break;
            case 'pray':
                this.isPraying = true;
                break;
            case 'consume':
                this.isConsuming = true;
                break;
            default:
                break;                        
        };
        this.knockback(this.actionTarget);
    };

    evaluateCombat = (player, target) => {
        // use gameServices method to determine action.
        let computerAction;
        let computerCounter;
        let actionNumber = Math.floor(Math.random() * 101);
        const computerActions = {
            attack: 50 + this.scene.state.attack_weight,
            counter: 10 + this.scene.state.counter_weight,
            dodge: 10 + this.scene.state.dodge_weight,
            posture: 15 + this.scene.state.posture_weight,
            roll: 15 + this.scene.state.roll_weight,
            counter_attack: 20 + this.scene.state.counter_attack_weight,
            counter_counter: 20 + this.scene.state.counter_counter_weight,
            counter_dodge: 20 + this.scene.state.counter_dodge_weight,
            counter_posture: 20 + this.scene.state.counter_posture_weight,
            counter_roll: 20 + this.scene.state.counter_roll_weight,
            roll_rating: this.scene.state.computer_weapons[0].roll,
            armor_rating: (this.scene.state.computer_defense.physicalPosture + this.scene.state.computer_defense.magicalPosture)  /  4,
        };
        if (actionNumber > (100 - computerActions.attack)) {
            computerAction = 'attack';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter)) {
            computerAction = 'counter';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge)) {
            computerAction = 'dodge';
        } else if (actionNumber > (100 - computerActions.attack - computerActions.counter - computerActions.dodge - computerActions.posture)) {
            computerAction = 'posture';
        } else {
            computerAction = 'roll';
        };
        if (computerAction !== 'dodge') this.scene.setState('computer_action', computerAction);

        if (computerAction === 'counter') {
            let counterNumber = Math.floor(Math.random() * 101);
            if (counterNumber > (100 - computerActions.counter_attack)) {
                computerCounter = 'attack';
            } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter)) {
                computerCounter = 'counter';
            } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter - computerActions.counter_dodge)) {
                computerCounter = 'dodge';
            } else if (counterNumber > (100 - computerActions.counter_attack - computerActions.counter_counter - computerActions.counter_dodge - computerActions.counter_posture)) {
                computerCounter = 'posture';
            } else {
                computerCounter = 'roll';
            }; 
            this.scene.setState('computer_counter_guess', computerCounter);
        };

        return computerAction;
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