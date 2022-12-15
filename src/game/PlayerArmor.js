import Phaser from "phaser";
import { equipment } from './utility';
import Entity from "./Entity";

let xClicking = false;
let yClicking = false;
let swipeDirection;

export default class PlayerArmor extends Entity {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super({ ...data, name: 'player' });
        this.scene.add.existing(this);
        this.setScale(0.375);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 6, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y, 10, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
        
        // define the player's movement speed
        this.movementSpeed = 160;
    }

    static preload(scene) {
        scene.load.atlas('knight_armor', equipment.knightArmor.png, equipment.knightArmor.json);
        scene.load.animation('knight_armor_anim', equipment.knightArmor.anim);
    }
      

    update() {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        this.movementSpeed = 24;

        playerVelocity.normalize();
        playerVelocity.scale(speed);
        // this.setVelocity(playerVelocity.x, playerVelocity.y);
        console.log(this.joystick.touchCursor.forceX)
        if (this.joystick.touchCursor.forceX < 10 || this.joystick.touchCursor.forceX > -10) {
            this.setVelocityX(0);
        } 
        if (this.joystick.touchCursor.forceX > 10) {
            this.setVelocityX(1);
        } 
        if (this.joystick.touchCursor.forceX < -10) {
            this.setVelocityX(-1);
        }

        if (this.joystick.touchCursor.forceY < 10 || this.joystick.touchCursor.forceY > -10) {
            this.setVelocityY(0);
        } 
        if (this.joystick.touchCursor.forceY > 10) {
            this.setVelocityY(1);
        } 
        if (this.joystick.touchCursor.forceY < -10) {
            this.setVelocityY(-1);
        }

        // if (!this.scene.input.activePointer.isDown && yClicking === true) {
        //     this.setData("positionY", this.scene.input.activePointer.position.y);
        //     yClicking = false;
        // } else if (this.scene.input.activePointer.isDown && yClicking === false) {
        //     yClicking = true;
        // }
        // if (Math.abs(this.y - this.getData("positionY")) <= 10) {
        //     this.y = this.getData("positionY");
        // } else if(this.y < this.getData("positionY")) {
        //     this.y += 5;
        // } else if(this.y > this.getData("positionY")) {
        //     this.y -= 5;
        // }

        // if(!this.scene.input.activePointer.isDown && xClicking === true) {
        //     this.setData("positionX", this.scene.input.activePointer.position.x);

        //     xClicking = false;
        // } else if(this.scene.input.activePointer.isDown && xClicking === false) {
        //     xClicking = true;
        // }
        // if(Math.abs(this.x - this.getData("positionX")) <= 10) {
        //     this.x = this.getData("positionX");
        // } else if(this.x < this.getData("positionX")) {
        //     this.x += 5;
        // } else if(this.x > this.getData("positionX")) {
        //     this.x -= 5;
        // }

        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play('knight_armor_move', true);
        } else {
            this.anims.play('knight_armor_idle', true);
        }

    
    }
}