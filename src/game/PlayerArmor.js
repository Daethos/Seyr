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
    }

    static preload(scene) {
        scene.load.atlas('knight_armor', equipment.knightArmor.png, equipment.knightArmor.json);
        scene.load.animation('knight_armor_anim', equipment.knightArmor.anim);
    }

    update() {
        // console.log(this.texture)
        this.anims.play('knight_armor', true);
        // this.playerArmor.anims.play('knight_armor', true);
        // this.playerLegs.anims.play('knight_legs', true);
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
        // this.playerArmor.setVelocity(playerVelocity.x, playerVelocity.y);

        // if (!this.input.activePointer.isDown && isClicking === true) {
        //     if (Math.abs(this.input.activePointer.upY - this.input.activePointer.downY) >= 5) {
        //         if (this.input.activePointer.upY < this.input.activePointer.downY) {
        //             swipeDirection = "up";
        //         } else if (this.input.activePointer.upY > this.input.activePointer.downY) {
        //             swipeDirection = "down";
        //         }
        //     }
        //     isClicking = false;
        // } else if (this.input.activePointer.isDown && isClicking === false) {
        //     isClicking = true;
        // }

        if (!this.scene.input.activePointer.isDown && yClicking === true) {
            this.setData("positionY", this.scene.input.activePointer.position.y);
            yClicking = false;
        } else if (this.scene.input.activePointer.isDown && yClicking === false) {
            yClicking = true;
        }
        if (Math.abs(this.y - this.getData("positionY")) <= 10) {
            this.y = this.getData("positionY");
        } else if(this.y < this.getData("positionY")) {
            this.y += 5;
        } else if(this.y > this.getData("positionY")) {
            this.y -= 5;
        }

        if(!this.scene.input.activePointer.isDown && xClicking === true) {
            this.setData("positionX", this.scene.input.activePointer.position.x);

            xClicking = false;
        } else if(this.scene.input.activePointer.isDown && xClicking === false) {
            xClicking = true;
        }
        if(Math.abs(this.x - this.getData("positionX")) <= 10) {
            this.x = this.getData("positionX");
        } else if(this.x < this.getData("positionX")) {
            this.x += 5;
        } else if(this.x > this.getData("positionX")) {
            this.x -= 5;
        }

        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play('knight_armor_move', true);
        } else {
            this.anims.play('knight_armor_idle', true);
        }

    
    }
}