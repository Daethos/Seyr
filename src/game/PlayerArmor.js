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
        let playerCollider = Bodies.circle(this.x, this.y, 4, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y, 10, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
        this.scene.input.on('pointermove', pointer => { if (!this.dead) this.setFlipX(pointer.worldX < this.x)});
    }

    static preload(scene) {
        let player_armor = scene.gameData.gameData.ascean.chest.name.replace(/\s/g, '_').toLowerCase();
        if (player_armor.includes('cuirass') || player_armor.includes('robes') || player_armor.includes('licivitan') || player_armor.includes("quor'ite") || player_armor.includes("knight's") || player_armor.includes("marauder's")) {
            player_armor = player_armor.replace(/cuirass/g, 'armor');
            player_armor = player_armor.replace(/robes/g, 'armor');
            player_armor = player_armor.replace(/quor'ite/g, 'earth');
            player_armor = player_armor.replace(/knight's/g, 'knight');
            player_armor = player_armor.replace(/marauder's/g, 'marauder');
            player_armor = player_armor.replace(/licivitan/g, 'legion');
        }

        let armor_texture = player_armor.replace('_armor', '');
        this.player_armor = player_armor;

        scene.load.atlas(`${armor_texture}`, equipment[player_armor].png, equipment[player_armor].json);
        scene.load.animation(`${player_armor}_anim`, equipment[player_armor].anim);
    }

    update(scene) {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        this.movementSpeed = 24;

        playerVelocity.normalize();
        playerVelocity.scale(speed);
        // this.setVelocity(playerVelocity.x, playerVelocity.y);
        if (this.joystick.touchCursor.forceX < 15 || this.joystick.touchCursor.forceX > -15) {
            this.setVelocityX(0);
        } 
        if (this.joystick.touchCursor.forceX > 15) {
            this.setVelocityX(1);
        } 
        if (this.joystick.touchCursor.forceX < -15) {
            this.setVelocityX(-1);
        }

        if (this.joystick.touchCursor.forceY < 15 || this.joystick.touchCursor.forceY > -15) {
            this.setVelocityY(0);
        } 
        if (this.joystick.touchCursor.forceY > 15) {
            this.setVelocityY(1);
        } 
        if (this.joystick.touchCursor.forceY < -15) {
            this.setVelocityY(-1);
        }
        let player_armor = scene.gameData.ascean.chest.name.replace(/\s/g, '_').toLowerCase();
        if (player_armor.includes('cuirass') || player_armor.includes('robes') || player_armor.includes("quor'ite") || player_armor.includes("knight's") || player_armor.includes("marauder's") || player_armor.includes('licivitan')) {
            player_armor = player_armor.replace(/cuirass/g, 'armor');
            player_armor = player_armor.replace(/robes/g, 'armor');
            player_armor = player_armor.replace(/quor'ite/g, 'earth');
            player_armor = player_armor.replace(/knight's/g, 'knight');
            player_armor = player_armor.replace(/marauder's/g, 'marauder');
            player_armor = player_armor.replace(/licivitan/g, 'legion');
        }
        this.player_armor = player_armor;

        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play(`${this.player_armor}_move`, true);
        } else {
            this.anims.play(`${this.player_armor}_idle`, true);
        }

    
    }
}