import Phaser from "phaser";
import Entity from "./Entity";
import playerPng  from './images/player.png'
import playerJSON from './images/player_atlas.json';
import playerAnim from './images/player_anim.json'; 

const equipment = { png: playerPng, json: playerJSON, anim: playerAnim };

export default class Player extends Entity {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super({ ...data, name: 'player' });
        this.scene.add.existing(this);
        this.setScale(1);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 2, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y, 6, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody)
        this.setFixedRotation();
        this.scene.input.on('pointermove', (pointer) => { if (!this.dead) this.setFlipX(pointer.worldX < this.x)});
    };

    static preload(scene) {
        scene.load.atlas(`player`, equipment.png, equipment.json);
        scene.load.animation(`player_anim`, equipment.anim);
    };

    update(scene) {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        playerVelocity.normalize();
        playerVelocity.scale(speed);

        if (this.joystick.touchCursor.forceX < 15 || this.joystick.touchCursor.forceX > -15) {
            this.setVelocityX(0);
        };
        if (this.joystick.touchCursor.forceX > 15 || this.inputKeys.right.isDown) {
            this.setVelocityX(1);
        };
        if (this.joystick.touchCursor.forceX < -15 || this.inputKeys.left.isDown) {
            this.setVelocityX(-1);
        };

        if (this.joystick.touchCursor.forceY < 15 || this.joystick.touchCursor.forceY > -15) {
            this.setVelocityY(0);
        };
        if (this.joystick.touchCursor.forceY > 15 || this.inputKeys.up.isDown) {
            this.setVelocityY(1);
        };
        if (this.joystick.touchCursor.forceY < -15 || this.inputKeys.down.isDown) {
            this.setVelocityY(-1);
        }; 
        

        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play(`player_running`, true);
        } else {
            this.anims.play(`player_idle`, true);
        };
    };
};