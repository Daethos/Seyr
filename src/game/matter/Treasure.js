import Entity from "../entities/Entity";
import Phaser from "phaser";
import TreasureChest from '../images/treasure-chest.png';
import TreasureChestJson from '../images/treasure-chest_atlas.json';

export default class Treasure extends Entity {
    static preload(scene) {
        scene.load.atlas('treasures', TreasureChest, TreasureChestJson);
    };

    constructor(data) {
        let { scene, treasure } = data;
        let depth = treasure?.properties?.find((p) => p?.name === 'depth')?.value || 2;
        super ({ scene, x: treasure.x, y: treasure.y, texture: 'treasures', frame: 'treasure-chest', depth, health: 0, name: 'treasure' }); // removed drops

        const { Bodies } = Phaser.Physics.Matter.Matter;
        let circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'treasureCollider' });
        this.setExistingBody(circleCollider);
        this.setScale(0.75);
        this.setStatic(true);
    };
};