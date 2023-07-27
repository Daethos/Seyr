import Phaser from "phaser";
import EventEmitter from "../phaser/EventEmitter";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
        this.assets = {};
    };
    
    init() {};
    
    preload() {};
    
    create() {
        EventEmitter.once('send-assets', this.assetsOn);
        EventEmitter.emit('retrieve-assets');
        this.scene.start('Preload', {
            gameData: {
                assets: this.assets,
            } 
        });
    };

    assetsOn = (e) => {
        this.assets = e;
    };
};