import Phaser from "phaser";
import Entity from "../entities/Entity";
import TreasureChest from '../images/treasure-chest.png';
import TreasureChestJson from '../images/treasure-chest_atlas.json';
import EventEmitter from "../phaser/EventEmitter";

export default class LootDrop extends Entity {
    static preload(scene) {
        scene.load.atlas('treasures', TreasureChest, TreasureChestJson);
    };

    constructor(data) {
        let { scene, enemyID, drop } = data;
        console.log(scene, enemyID, drop, "Scene, Enemy, Drop");
        const enemy = scene.enemies.find((e) => e.enemyID === enemyID);
        console.log(enemy.body, "Enemy Body");
        super ({ scene, x: enemy.body.position.x - 16, y: enemy.body.position.y + 16, texture: 'treasures', frame: 'treasure-chest', depth: 2, health: 0, name: drop.name });
        const { Bodies } = Phaser.Physics.Matter.Matter;
        let circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'lootdropCollider' });
        this.setExistingBody(circleCollider);
        this.setScale(0.75);
        this.setStatic(true);
        this._id = drop._id;
        this.drop = drop;
        this.lootDropListener();
    };

    lootDropListener = () => {
        EventEmitter.on('destroy-lootdrop', (e) => {
            if (e === this._id) {
                this.destroyLootDrop();
            };
        });
    };

    destroyLootDrop = () => {
        this.destroy();
    }; 
};