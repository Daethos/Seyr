import Phaser from "phaser";
import { equipment } from './utility';
import Entity from "./Entity";

export default class PlayerHelm extends Entity {
    constructor(data) {
        let { scene, x, y, texture, frame } = data;
        super({ ...data, name: 'player' });
        this.scene.add.existing(this);
        this.setScale(0.225);

        const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        let playerCollider = Bodies.circle(this.x, this.y, 2, { isSensor: false, label: 'playerCollider' });
        let playerSensor = Bodies.circle(this.x, this.y, 6, { isSensor: true, label: 'playerSensor' });
        const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
            frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody)
        this.setFixedRotation();
        this.scene.input.on('pointermove', pointer => { if (!this.dead) this.setFlipX(pointer.worldX < this.x)});
    }

    static preload(scene) {
        console.log(scene, "Scene in Player Helm")
        let player_helm = scene.gameData.helmet.name.replace(/\s/g, '_').toLowerCase();
        if (player_helm.includes("quor'ite") || player_helm.includes('hood') || player_helm.includes('mask') || player_helm.includes("knight's") || player_helm.includes("marauder's") || player_helm.includes('licivitan')) {
            player_helm = player_helm.replace(/quor'ite/g, 'earth');
            player_helm = player_helm.replace(/mask/g, 'helm');
            player_helm = player_helm.replace(/hood/g, 'helm');
            player_helm = player_helm.replace(/knight's/g, 'knight');
            player_helm = player_helm.replace(/marauder's/g, 'marauder');
            player_helm = player_helm.replace(/licivitan/g, 'legion');
        }
        let helm_texture = player_helm.replace('_helm', '');
        this.player_helm = player_helm;

        scene.load.atlas(`${helm_texture}`, equipment[player_helm].png, equipment[player_helm].json);
        scene.load.animation(`${player_helm}_anim`, equipment[player_helm].anim);
    };

    update(scene) {
        const speed = 2.5;
        let playerVelocity = new Phaser.Math.Vector2();
        playerVelocity.normalize();
        playerVelocity.scale(speed);

        if (this.joystick.touchCursor.forceX < 15 || this.joystick.touchCursor.forceX > -15) {
            this.setVelocityX(0);
        };
        if (this.joystick.touchCursor.forceX > 15) {
            this.setVelocityX(1);
        };
        if (this.joystick.touchCursor.forceX < -15) {
            this.setVelocityX(-1);
        };

        if (this.joystick.touchCursor.forceY < 15 || this.joystick.touchCursor.forceY > -15) {
            this.setVelocityY(0);
        };
        if (this.joystick.touchCursor.forceY > 15) {
            this.setVelocityY(1);
        };
        if (this.joystick.touchCursor.forceY < -15) {
            this.setVelocityY(-1);
        };
        let player_helm = scene.gameData.helmet.name.replace(/\s/g, '_').toLowerCase();
        if (player_helm.includes("quor'ite") || player_helm.includes('hood') || player_helm.includes('mask') || player_helm.includes("knight's") || player_helm.includes("marauder's") || player_helm.includes('licivitan')) {
            player_helm = player_helm.replace(/quor'ite/g, 'earth');
            player_helm = player_helm.replace(/mask/g, 'helm');
            player_helm = player_helm.replace(/hood/g, 'helm');
            player_helm = player_helm.replace(/knight's/g, 'knight');
            player_helm = player_helm.replace(/marauder's/g, 'marauder');
            player_helm = player_helm.replace(/licivitan/g, 'legion');
        };
        this.player_helm = player_helm;
        if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1 ) {
            this.anims.play(`${this.player_helm}_move`, true);
        } else {
            this.anims.play(`${this.player_helm}_idle`, true);
        };
    };
};