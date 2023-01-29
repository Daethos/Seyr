import Phaser from "phaser";
import { equipment } from './utility';
import Entity from "./Entity";

export default class PlayerLegs extends Entity {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super({ ...data, name: 'player' });
        this.scene.add.existing(this);
        this.setScale(0.45);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 4, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y, 8, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
        this.scene.input.on('pointermove', pointer => { if (!this.dead) this.setFlipX(pointer.worldX < this.x)});
    }

    static preload(scene) {
        let player_legs = scene.gameData.gameData.ascean.legs.name.replace(/\s/g, '_').toLowerCase();
        if (player_legs.includes('greaves') || player_legs.includes('pants') || player_legs.includes("quor'ite") || player_legs.includes("knight's") || player_legs.includes("marauder's") || player_legs.includes('licivitan')) {
            player_legs = player_legs.replace(/greaves/g, 'legs');
            player_legs = player_legs.replace(/pants/g, 'legs');
            player_legs = player_legs.replace(/quor'ite/g, 'earth');
            player_legs = player_legs.replace(/knight's/g, 'knight');
            player_legs = player_legs.replace(/marauder's/g, 'marauder');
            player_legs = player_legs.replace(/licivitan/g, 'legion');
        }

        let legs_texture = player_legs.replace('_legs', '');
        this.player_legs = player_legs;

        scene.load.atlas(`${legs_texture}`, equipment[player_legs].png, equipment[player_legs].json);
        scene.load.animation(`${player_legs}_anim`, equipment[player_legs].anim);
    }

    update(scene) {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
       
        playerVelocity.normalize();
        playerVelocity.scale(speed);

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

        let player_legs = scene.gameData.ascean.legs.name.replace(/\s/g, '_').toLowerCase();
        if (player_legs.includes('greaves') || player_legs.includes('pants') || player_legs.includes("quor'ite") || player_legs.includes("knight's") || player_legs.includes("marauder's") || player_legs.includes('licivitan')) {
            player_legs = player_legs.replace(/greaves/g, 'legs');
            player_legs = player_legs.replace(/pants/g, 'legs');
            player_legs = player_legs.replace(/quor'ite/g, 'earth');
            player_legs = player_legs.replace(/knight's/g, 'knight');
            player_legs = player_legs.replace(/marauder's/g, 'marauder');
            player_legs = player_legs.replace(/licivitan/g, 'legion');
        }
        this.player_legs = player_legs;
        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play(`${this.player_legs}_move`, true);
        } else {
            this.anims.play(`${this.player_legs}_idle`, true);
        }
    
    }
}