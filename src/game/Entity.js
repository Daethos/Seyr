import Phaser from "phaser";

export default class Entity extends Phaser.Physics.Matter.Sprite {
    constructor (data) {
        let { scene, x, y, texture, frame, depth, name, ascean, health } = data;
        super (scene.matter.world, x, y, texture, frame);
        this.x += this.width / 2;
        this.y -= this.height / 2;
        this.depth = depth || 1;
        this.name = name;
        this.ascean = ascean;
        this.health = health;
        this._position = new Phaser.Math.Vector2(this.x, this.y);
        this.scene.add.existing(this);
    };

    get position() {
        this._position.set(this.x, this.y);
        return this._position;
    };

    get velocity() {
        return this.body.velocity;
    };
};