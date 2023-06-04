import Entity from "./Entity.js";
import Phaser from "phaser";
import TreasureChest from './images/treasure-chest.png';
import TreasureChestJson from './images/treasure-chest_atlas.json';

export default class Treasure extends Entity {
    
    static preload(scene) {
        scene.load.atlas('treasures', TreasureChest, TreasureChestJson);
    };

    constructor(data) {
        let { scene, treasure } = data;
        let depth = treasure?.properties?.find((p) => p?.name === 'depth')?.value;
        super ({ scene, x: treasure.x, y: treasure.y, texture: 'treasures', frame: 'treasure-chest', depth, health: 0, name: 'treasure' }); // removed drops

        // let yOrigin = treasure?.properties?.find((p) => p?.name === 'yOrigin')?.value;
        // this.y = this.y + this.height * (yOrigin - 0.5);
        
        const { Bodies } = Phaser.Physics.Matter.Matter;
        let circleCollider = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'collider' });
        this.setExistingBody(circleCollider);
        
        this.setStatic(true);
        // this.setOrigin(0.5, yOrigin);
    };
};