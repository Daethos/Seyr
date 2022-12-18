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

        let player_armor = scene.gameData.gameData.ascean.chest.name.replace(/\s/g, '_').toLowerCase();
        let player_helm = scene.gameData.gameData.ascean.helmet.name.replace(/\s/g, '_').toLowerCase();
        let player_legs = scene.gameData.gameData.ascean.legs.name.replace(/\s/g, '_').toLowerCase();
        if (player_helm.includes("quor'ite") || player_helm.includes('hood') || player_helm.includes("knight's") || player_helm.includes("marauder's")) {
            player_helm = player_helm.replace(/quor'ite/g, 'earth');
            player_helm = player_helm.replace(/hood/g, 'helm');
            player_helm = player_helm.replace(/knight's/g, 'knight');
            player_helm = player_helm.replace(/marauder's/g, 'marauder');
        }
        if (player_armor.includes('cuirass') || player_armor.includes('robes') || player_armor.includes("quor'ite") || player_armor.includes("knight's") || player_armor.includes("marauder's")) {
            player_armor = player_armor.replace(/cuirass/g, 'armor');
            player_armor = player_armor.replace(/robes/g, 'armor');
            player_armor = player_armor.replace(/quor'ite/g, 'earth');
            player_armor = player_armor.replace(/knight's/g, 'knight');
            player_armor = player_armor.replace(/marauder's/g, 'marauder');
        }
        if (player_legs.includes('greaves') || player_legs.includes('pants') || player_legs.includes("quor'ite") || player_legs.includes("knight's") || player_legs.includes("marauder's")) {
            player_legs = player_legs.replace(/greaves/g, 'legs');
            player_legs = player_legs.replace(/pants/g, 'legs');
            player_legs = player_legs.replace(/quor'ite/g, 'earth');
            player_legs = player_legs.replace(/knight's/g, 'knight');
            player_legs = player_legs.replace(/marauder's/g, 'marauder');
        }

        let armor_texture = player_armor.replace('_armor', '');
        let helm_texture = player_helm.replace('_helm', '');
        let legs_texture = player_legs.replace('_legs', '');
        this.player_legs = player_legs;

        console.log(player_armor, player_helm, player_legs, ' <- Preloading Player Frames', armor_texture, helm_texture, legs_texture, ' <- Preloading Player Textures');

        scene.load.atlas(`${legs_texture}`, equipment[player_legs].png, equipment[player_legs].json);
        scene.load.animation(`${player_legs}_anim`, equipment[player_legs].anim);
    }

    update(scene) {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
       
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


        let player_legs = scene.gameData.ascean.legs.name.replace(/\s/g, '_').toLowerCase();
        if (player_legs.includes('greaves') || player_legs.includes('pants') || player_legs.includes("quor'ite") || player_legs.includes("knight's") || player_legs.includes("marauder's")) {
            player_legs = player_legs.replace(/greaves/g, 'legs');
            player_legs = player_legs.replace(/pants/g, 'legs');
            player_legs = player_legs.replace(/quor'ite/g, 'earth');
            player_legs = player_legs.replace(/knight's/g, 'knight');
            player_legs = player_legs.replace(/marauder's/g, 'marauder');
        }
        this.player_legs = player_legs;
        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play(`${this.player_legs}_move`, true);
        } else {
            this.anims.play(`${this.player_legs}_idle`, true);
        }
    
    }
}