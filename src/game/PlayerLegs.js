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
    }

    static preload(scene) {
        scene.load.atlas('knight_legs', equipment.knightLegs.png, equipment.knightLegs.json);
        scene.load.animation('knight_legs_anim', equipment.knightLegs.anim);
    }

    update() {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        if (this.scene.inputKeys?.left.isDown) {
            playerVelocity.x = -1;
        } else if (this.scene.inputKeys?.right.isDown) {
            playerVelocity.x = 1;
        }
        if (this.scene.inputKeys?.up.isDown) {
            playerVelocity.y = -1;
        } else if (this.scene.inputKeys?.down.isDown) {
            playerVelocity.y = 1;
        }
        playerVelocity.normalize();
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x, playerVelocity.y);

        if (!this.scene.input.activePointer.isDown && yClicking === true) {
            this.setData("positionY", this.scene.input.activePointer.position.y);
            // this.playerArmor.setData("positionY", this.scene.input.activePointer.position.y);
            // this.playerLegs.setData("positionY", this.scene.input.activePointer.position.y);
            yClicking = false;
        } else if (this.scene.input.activePointer.isDown && yClicking === false) {
            yClicking = true;
        }
        if (Math.abs(this.y - this.getData("positionY")) <= 10) {
            this.y = this.getData("positionY");
            // this.playerArmor.y = this.playerArmor.getData("positionY") + 32;
            // this.playerLegs.y = this.playerLegs.getData("positionY") + 64;
        } else if (this.y < this.getData("positionY")) {
            this.y += 5;
            // this.playerArmor.y += 5;
            // this.playerLegs.y += 5;
        } else if (this.y > this.getData("positionY")) {
            this.y -= 5;
            // this.playerArmor.y -= 5;
            // this.playerLegs.y -= 5;
        }

        if(!this.scene.input.activePointer.isDown && xClicking === true) {
            this.setData("positionX", this.scene.input.activePointer.position.x);
            // this.playerArmor.setData("positionX", this.scene.input.activePointer.position.x);
            // this.playerLegs.setData("positionX", this.scene.input.activePointer.position.x);

            xClicking = false;
        } else if(this.scene.input.activePointer.isDown && xClicking === false) {
            xClicking = true;
        }
        if(Math.abs(this.x - this.getData("positionX")) <= 10) {
            this.x = this.getData("positionX");
            // this.playerArmor.x = this.playerArmor.getData("positionX");
            // this.playerLegs.x = this.playerArmor.getData("positionX");
        } else if(this.x < this.getData("positionX")) {
            this.x += 5;
            // this.playerArmor.x += 5;
            // this.playerLegs.x += 5;
        } else if(this.x > this.getData("positionX")) {
            this.x -= 5;
            // this.playerArmor.x -= 5;
            // this.playerLegs.x -= 5;
        }

        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play('knight_legs_move', true);
        } else {
            this.anims.play('knight_legs_idle', true);
        }
    
    }
}