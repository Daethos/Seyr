import Phaser from "phaser";
import Entity from "./Entity"; 
import StateMachine, { States } from "./StateMachine";
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

export default class Enemy extends Entity {

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
        let { scene } = data;
        super({ ...data, name: "enemy", ascean: scene.state.computer, health: scene.state.new_computer_health }); 
        this.scene.add.existing(this);
        this.enemyID = new Date().getTime();
        this.createEnemy(); 
        this.stateMachine = new StateMachine(this, 'enemy');
        this.stateMachine
            .addState(States.IDLE, {
                onEnter: this.onIdleEnter.bind(this),
                onUpdate: this.onIdleUpdate.bind(this),
                onExit: this.onIdleExit.bind(this),
            })
            .addState(States.PATROL, {
                onEnter: this.onPatrolEnter.bind(this),
                onUpdate: this.onPatrolUpdate.bind(this),
                onExit: this.onPatrolExit.bind(this),
            })
            // .addState(States.AWARE, {
            //     onEnter: this.onAwarenessEnter.bind(this),
            //     onUpdate: this.onAwarenessUpdate.bind(this),
            //     onExit: this.onAwarenessExit.bind(this),
            // })
            // .addState(States.CHASE, {
            //     onEnter: this.onChasingEnter.bind(this),
            //     onUpdate: this.onChasingUpdate.bind(this),
            //     onExit: this.onChasingExit.bind(this),
            // })
            // .addState(States.COMBAT, {
            //     onEnter: this.onCombatEnter.bind(this),
            //     onUpdate: this.onCombatUpdate.bind(this),
            //     onExit: this.onCombatExit.bind(this),
            // })
            // .addState(States.LEASH, {
            //     onEnter: this.onLeashingEnter.bind(this),
            //     onUpdate: this.onLeashingUpdate.bind(this),
            //     onExit: this.onLeashingExit.bind(this),
            // })

        this.stateMachine.setState(States.IDLE);
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
        this.waiting = 30;
        this.idleWait = 500;
        this.patrolWait = 500;
        this.patrolVelocity = 1;
        this.attackSensor = null;
        this.attackIsLive = false;
        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let enemyCollider = Bodies.rectangle(this.x, this.y + 10, 24, 40, { isSensor: false, label: 'enemyCollider' });
        let enemySensor = Bodies.circle(this.x, this.y + 2, 48, { isSensor: true, label: 'enemySensor' });
        const compoundBody = Body.create({
            parts: [enemyCollider, enemySensor],
            frictionAir: 0.1, 
            restitution: 0.3,
            friction: 0.15,
        });
        this.setExistingBody(compoundBody);                                    
        this.setFixedRotation();
        this.enemyStateListener();
        this.enemySensor = enemySensor;
        // this.scene.matterCollision.addOnCollideStart({
        //     objectA: [enemySensor],
        //     callback: other => {
        //         if (other.gameObjectB && other.gameObjectB.name === 'player') {
        //             this.attacking = other.gameObjectB;
        //             this.stateMachine.setState(States.CHASE); // TODO:FIXME: State Machine Combat
        //             this.actionTarget = other;
        //             other.gameObjectB.inCombat = true;
        //             this.scene.combatEngaged();
        //         };
        //     },
        //     context: this.scene,
        // }); 
    };

    createEnemy() {
        const fetch = new CustomEvent('fetch-enemy', { detail: { enemyID: this.enemyID } });
        window.dispatchEvent(fetch); 
        window.addEventListener('enemy-fetched', this.enemyFetchedFinishedListener.bind(this));
    };

    enemyFetchedFinishedListener(e) {
        if (this.enemyID !== e.detail.enemyID) return;
        console.log(e.detail, "Enemy Fetched")
        this.ascean = e.detail.game;
        this.health = e.detail.game.health.total;
        this.combatData = e.detail.combat; 
        
        const weaponName = e.detail.game.weapon_one.imgURL.split('/')[2].split('.')[0];
        
        this.spriteWeapon = new Phaser.GameObjects.Sprite(this.scene, 0, 0, weaponName);
        this.spriteWeapon.setScale(0.6);
        this.spriteWeapon.setOrigin(0.25, 1);
        this.scene.add.existing(this.spriteWeapon);
        this.spriteWeapon.setAngle(-195);

        const shieldName = e.detail.game.shield.imgURL.split('/')[2].split('.')[0];

        this.spriteShield = new Phaser.GameObjects.Sprite(this.scene, 0, 0, shieldName);
        this.spriteShield.setScale(0.6);
        this.spriteShield.setOrigin(0.5, 0.5);
        this.scene.add.existing(this.spriteShield);
        this.spriteShield.setVisible(false);

        window.removeEventListener('enemy-fetched', this.enemyFetchedFinishedListener);
    };

    weaponSprite(weapon) {
        return weapon.imgURL.split('/')[2].split('.')[0];
    };
 
    enemyStateListener() {
        window.addEventListener('update-combat-data', (e) => {
            // console.log(e.detail, "State Updated");
            if (this.ascean.name !== e.detail.computer.name) return;
            if (this.health > e.detail.new_computer_health) this.isHurt = true;
            this.health = e.detail.new_computer_health;
            if (e.detail.new_computer_health <= 0) {
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

    attackInterval() {
        if (this.scene.state.computer_weapons[0]) {
            return this.scene.state.computer_weapons[0].grip;
        } else if (this.currentWeaponSprite !== '') {
            const weapons = [this.ascean.weapon_one, this.ascean.weapon_two, this.ascean.weapon_three];
            const weapon = weapons.find(weapon => weapon.imgURL.split('/')[2].split('.')[0] === this.currentWeaponSprite);
            return weapon.grip;
        } else {
            return this.ascean.weapon_one.grip;
        };
    };

    onIdleEnter = () => {
        console.log("Idle Enter");
        this.anims.play('player_idle', true);
    };
    onIdleUpdate = (dt) => {
        this.idleWait -= dt;
        if (this.idleWait <= 0) {
            this.idleWait = 500;
            console.log("Idle Exit");
            this.stateMachine.setState('patrol');
        };
    };
    onIdleExit = () => {
        this.anims.stop('player_idle');
    };
    onPatrolEnter = () => {
        console.log("Patrolling");
        this.anims.play('player_running', true);
        const patrolDirection = new Phaser.Math.Vector2(Math.random() - 0.5, Math.random() - 0.5).normalize();
        const patrolSpeed = 1;  
        this.patrolVelocity = { x: patrolDirection.x * patrolSpeed, y: patrolDirection.y * patrolSpeed };
        console.log(this.patrolVelocity, "Patrol Velocity")
        const delay = Phaser.Math.RND.between(1500, 3000); 
        this.scene.time.addEvent({
            delay: delay,
            callback: () => {
                this.setVelocity(0, 0);
                this.stateMachine.setState(States.IDLE);
            },
            callbackScope: this,
            loop: false,
        }); 
    };
    onPatrolUpdate = (dt) => { 
        this.setVelocity(this.patrolVelocity.x, this.patrolVelocity.y);
    };
    onPatrolExit = () => {
        this.anims.stop('player_running');
    };
 
    update() {
        this.stateMachine.update(this.scene.sys.game.loop.delta);

        if (this.scene.state.computer_weapons[0] && this.currentWeaponSprite !== this.weaponSprite(this.scene.state.computer_weapons[0]) && this.ascean._id === this.scene.state.computer._id) {
            this.currentWeaponSprite = this.weaponSprite(this.scene.state.computer_weapons[0]);
            this.spriteWeapon.setTexture(this.currentWeaponSprite);
        };
        if (this.attacking) { 
            let direction = this.attacking.position.subtract(this.position);
            if (direction.length() >=  180) {
                this.isRolling = true;
                direction.normalize();
                this.setVelocityX(direction.x * 3.25);
                this.setVelocityY(direction.y * 3.25);
            } else if (direction.length() > 120) {  // 90
                // if (this.waiting > 0) { // 96-64 is the Danger Zone ?
                //     this.waiting--; 
                //     this.setVelocityX(0);
                //     this.setVelocityY(0);
                // } else {
                    direction.normalize();
                    this.setVelocityX(direction.x * 2.75);
                    this.setVelocityY(direction.y * 2.75);    
                // };
            } else if (direction.length() > 80) { // 60
                direction.normalize();
                this.setVelocityX(direction.x * 2.5);
                this.setVelocityY(direction.y * 2.5);
                if (this.attackTimer) {
                    clearInterval(this.attackTimer);
                    this.attackTimer = null;
                };
            } else {
                // This needs revision, There needs to be a radius where the enemy contemplates its choices based on the player's position, and action(s)
                if (this.attackTimer == null) {
                    const intervalTime = this.attackInterval() === 'Two Hand' ? 1250 : 750;
                    this.attackTimer = setInterval(this.attack, intervalTime, this.attacking);
                    console.log("Attack Timer Started, Distance: ", direction.length(), "px");
                };
                const times = [10, 20, 30, 40];
                this.waiting = times[Math.floor(Math.random() * times.length)];
            };
        };
        
        this.setFlipX(this.velocity.x < 0);

        // if (this.isHurt) {
        //     this.anims.play('player_hurt', true).on('animationcomplete', () => {
        //         this.isHurt = false;
        //     }); 
        // } else if (this.isCountering) { // COUNTERING
        //     this.anims.play('player_attack_2', true).on('animationcomplete', () => { 
        //         this.isCountering = false; 
        //     });
        // } else if (this.isDodging) { // DODGING AKA SLIDING OUTSIDE COMBAT
        //     this.anims.play('player_slide', true);
        //     if (this.dodgeCooldown === 0) {
        //         this.dodgeCooldown = this.inCombat ? 30000 : 2000; 
        //         const dodgeDistance = 126;  
        //         const dodgeDuration = 18; 
        //         const dodgeInterval = 1; 
        //         let elapsedTime = 0;
        //         let currentDistance = 0;
            
        //         const dodgeLoop = () => {
        //             if (elapsedTime >= dodgeDuration || currentDistance >= dodgeDistance) {
        //                 clearInterval(dodgeIntervalId);
        //                 this.dodgeCooldown = 0;
        //                 this.isDodging = false;
        //                 return;
        //             };
        //             const direction = !this.flipX ? -(dodgeDistance / dodgeDuration) : (dodgeDistance / dodgeDuration);
        //             this.setVelocityX(direction);
        //             currentDistance += Math.abs(dodgeDistance / dodgeDuration);
        //             elapsedTime++;
        //         };
            
        //         const dodgeIntervalId = setInterval(dodgeLoop, dodgeInterval);  
        //     };
            
        // } else if (this.isRolling && !this.isJumping) { // ROLLING OUTSIDE COMBAT
        //     this.anims.play('player_roll', true);
        //     if (this.rollCooldown === 0) {
        //         const sensorDisp = 12;
        //         const colliderDisp = 16;
        //         if (this.isRolling) {
        //             if (this.scene.state.action !== 'roll') this.scene.setState('computer_action', 'roll');
        //             if (this.scene.state.counter_guess !== '') this.scene.setState('computer_counter_guess', '');
        //             this.body.parts[2].position.y += sensorDisp;
        //             this.body.parts[2].circleRadius = 21;
        //             this.body.parts[1].vertices[0].y += colliderDisp;
        //             this.body.parts[1].vertices[1].y += colliderDisp; 
        //         };
        //         this.rollCooldown = 50; 
        //         const rollDistance = 140; 
                
        //         const rollDuration = 20;  
        //         const rollInterval = 1;  
                
        //         let elapsedTime = 0;
        //         let currentDistance = 0;
                
        //         const rollLoop = () => {
        //             if (elapsedTime >= rollDuration || currentDistance >= rollDistance) {
        //                 clearInterval(rollIntervalId);
        //                 this.rollCooldown = 0;
        //                 this.isRolling = false;
        //                 this.body.parts[2].position.y -= sensorDisp;
        //                 this.body.parts[2].circleRadius = 48;
        //                 this.body.parts[1].vertices[0].y -= colliderDisp;
        //                 this.body.parts[1].vertices[1].y -= colliderDisp; 
        //                 return;
        //             };
        //             const direction = this.flipX ? -(rollDistance / rollDuration) : (rollDistance / rollDuration);
        //             if (Math.abs(this.velocity.x) > 0.1) this.setVelocityX(direction);
        //             if (this.velocity.y > 0.1) this.setVelocityY(rollDistance / rollDuration);
        //             if (this.velocity.y < -0.1) this.setVelocityY(-rollDistance / rollDuration);
        //             currentDistance += Math.abs(rollDistance / rollDuration);
        //             elapsedTime += rollInterval;
        //         };
        //         const rollIntervalId = setInterval(rollLoop, rollInterval);  
        //     };
        // } else if (this.isPosturing) { // POSTURING
        //     this.anims.play('player_attack_3', true).on('animationcomplete', () => {
        //         this.isPosturing = false;
        //     });
        // } else if (this.isAttacking) {
        //     this.anims.play(`player_attack_1`, true).on('animationcomplete', () => {
        //         this.isAttacking = false;
        //     }); 
        // } else if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
        //     this.anims.play(`player_running`, true);
        // } else {
        //     this.anims.play(`player_idle`, true);
        // };

        if (this.spriteWeapon && this.spriteShield) {
            this.spriteWeapon.setPosition(this.x, this.y);
            this.spriteShield.setPosition(this.x, this.y);
            this.weaponRotation();
        }; 
    };

    attack = (target) => {
        if (target.dead || this.dead) {
            clearInterval(this.attackTimer);
            return;
        };
        let direction = target.position.subtract(this.position); 
        if (direction.length() > 50) {
            console.log("Enemy Attacking, Player out of Range, Moving to Player, Current Distance: ", direction.length(), "px");
            direction.normalize();
            this.setVelocityX(direction.x * 2.75);
            this.setVelocityY(direction.y * 2.75);  
        };
        const specials = ['pray', 'consume'];
        const action = this.evaluateCombat(this, target);
        switch (action) {
            case 'attack':
                this.isAttacking = true;
                break;
            case 'counter':
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
            case 'pray':
                this.isPraying = true;
                break;
            case 'consume':
                this.isConsuming = true;
                break;
            default:
                break;                        
        }; 
        if (direction.length() > 52) {
            console.log("Enemy attack unsuccessful in initiation, distance: ", direction.length(), "px");
        } else {
            console.log("Enemy attack successful in initiation, distance: ", direction.length(), "px");
            this.knockbackPlayer(this.actionTarget);
        };
    };

    evaluateCombat = (player, target) => { 

        // TODO:FIXME: Add section to 'check' if there is a state.action i.e. player action that is 'live', and if so, augment the computer action to counter it.
        console.log(this.scene.state.action, this.scene.state.counter_guess, "The Potential Actions of the Player");

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