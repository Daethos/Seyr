import Entity from "./Entity.js";
import Phaser from "phaser";
import TreasureChest from './images/treasure-chest.png';
import TreasureChestJson from './images/treasure-chest_atlas.json';

export default class LootDrop extends Entity {
    static preload(scene) {
        scene.load.atlas('treasures', TreasureChest, TreasureChestJson);
    };

    constructor(data) {
        let { scene, enemy, drop } = data;
        console.log(scene, enemy, drop, "Scene, Enemy, Drop");
        const enemyBody = scene.enemies.find((e) => e.id === enemy);
        console.log(enemyBody, "Enemy Body");
        super ({ scene, x: enemyBody.position.x, y: enemyBody.position.y, texture: 'treasures', frame: 'treasure-chest', depth: 2, health: 0, name: drop.name });
        const { Bodies } = Phaser.Physics.Matter.Matter;
        let circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'lootdropCollider' });
        this.setExistingBody(circleCollider);
        this.setScale(0.75);
        this.setStatic(true);
        this._id = drop._id;
        this.drop = drop;
    };

    inspectLootDrop = () => {
        // this.scene.events.emit('lootdrop-inspected', this); 
    };

    destroyLootDrop = () => {
        // this.scene.events.emit('lootdrop-destroyed', this);
    };

    get id() {
        return this._id;
    };
};