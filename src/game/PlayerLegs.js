import Phaser from "phaser";
import { equipment } from './utility';
import Entity from "./Entity";

let xClicking = false;
let yClicking = false;
let swipeDirection;

export default class PlayerLegs extends Entity {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super({ ...data, name: 'player' });
        this.scene.add.existing(this);
        this.setScale(0.85);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y, 24, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene) {
        scene.load.atlas('knight_legs', equipment.knightLegs.png, equipment.knightLegs.json);
        scene.load.animation('knight_legs_anim', equipment.knightLegs.anim);
    }

    update() {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
       
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        // this.setVelocity(playerVelocity.x, playerVelocity.y);

        // if (this.joystick.touchCursor.forceX === 0) {
        //     this.setVelocityX(this.joystick.touchCursor.start.x);
        // } 
        // if (this.joystick.touchCursor.forceX > 0) {
        //     this.setVelocityX(1);
        // } 
        // if (this.joystick.touchCursor.forceX < 0) {
        //     this.setVelocityX(-1);
        // }

        // if (this.joystick.touchCursor.forceY === 0) {
        //     this.setVelocityY(this.joystick.touchCursor.start.y);
        // } 
        // if (this.joystick.touchCursor.forceY > 0) {
        //     this.setVelocityY(1);
        // } 
        // if (this.joystick.touchCursor.forceY < 0) {
        //     this.setVelocityY(-1);
        // }


        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play('knight_legs_move', true);
        } else {
            this.anims.play('knight_legs_idle', true);
        }
    
    }
}