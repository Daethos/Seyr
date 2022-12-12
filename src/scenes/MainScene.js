import tokenService from "../utils/tokenService";
import { useState } from 'react';
import Phaser, { Math as pMath } from 'phaser';
// import knightLegsPng from '../game/images/knight_legs.png';
// import knightLegsJson  from '../game/images/knight_legs_atlas.json';
import { equipment } from '../game/utility';
import PlayerHelm from "../game/PlayerHelm";
import PlayerArmor from "../game/PlayerArmor";
import PlayerLegs from "../game/PlayerLegs";
const { Vector2 } = pMath;



export default class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        console.log(equipment)
        PlayerHelm.preload(this);
        PlayerArmor.preload(this);
        PlayerLegs.preload(this);
        // console.log(knightLegsJson, knightLegsPng)
    }

    create() {
        this.target = new Vector2();
        this.playerHelm = new PlayerHelm({scene: this, x: 100, y: 100, texture: 'knight_helm', frame: 'knight_helm_idle'});
        this.playerArmor = new PlayerArmor({scene: this, x: 100, y: 132, texture: 'knight_armor', frame: 'knight_armor_idle'});
        this.playerLegs = new PlayerLegs({scene: this, x: 100, y: 164, texture: 'knight_legs', frame: 'knight_legs_idle'});
        // this.add.existing(this.playerHelm);
        // this.add.existing(this.playerArmor);
        // this.add.existing(this.playerLegs);
        this.inputKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update() {
        this.playerHelm.update();
        this.playerArmor.update();
        this.playerLegs.update();
    }
}