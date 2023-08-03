import Phaser from "phaser";
import EventEmitter from "../phaser/EventEmitter";

export default class LootDrop extends Phaser.Physics.Matter.Image {  
    constructor(data) {
        let { scene, enemyID, drop } = data;
        const texture = imgURL(drop.imgURL);
        const enemy = scene.enemies.find((e) => e.enemyID === enemyID);
        super (scene.matter.world, enemy.body.position.x - 16, enemy.body.position.y + 16, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.setScale(0.5);
        this._id = drop._id;
        this.drop = drop;
        this.setupCollider();
        this.setupListener();
    }; 

    setupCollider = () => {
        const { Bodies } = Phaser.Physics.Matter.Matter;
        const circleCollider = Bodies.circle(this.x, this.y, 12, {
          isSensor: false,
          label: "lootdropCollider",
        });
        this.setExistingBody(circleCollider);
        this.setStatic(true);
    };

    setupListener = () => {
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

const imgURL = (url) => {
    return url.split('/')[2].split('.')[0];
};