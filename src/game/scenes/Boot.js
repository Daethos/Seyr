import Phaser from "phaser";
import EventEmitter from "../phaser/EventEmitter";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
        this.ascean = {};
        this.enemy = {};
        this.state = {};
        this.gameState = {};
        this.assets = {};
    };
    
    init() {};
    
    preload() {};
    
    create() {
        EventEmitter.once('get-ascean', this.asceanOn);
        EventEmitter.once('get-combat-data', this.stateOn);
        EventEmitter.once('get-game-data', this.gameStateOn);
        EventEmitter.once('send-assets', this.assetsOn);
        EventEmitter.emit('retrieve-assets');
        EventEmitter.emit('request-ascean');
        EventEmitter.emit('request-combat-data');
        EventEmitter.emit('request-game-data');

        this.scene.start('Preload', {
            gameData: {
                ascean: this.ascean,
                state: this.state,
                gameState: this.gameState,
                assets: this.assets,
            } 
        });
    };

    assetsOn = (e) => {
        this.assets = e;
    };

    asceanOn = (e) => {
        this.ascean = e;
    };

    stateOn = (e) => {
        this.state = e;
    };

    gameStateOn = (e) => {
        this.gameState = e;
    };
};