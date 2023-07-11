import Phaser from "phaser";
import EventEmitter from "./EventEmitter";

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
        // window.addEventListener('get-ascean', this.asceanFinishedEventListener);
        // window.addEventListener('get-enemy', this.enemyFinishedEventListener);
        // window.addEventListener('get-combat-data', this.stateOn);
        // window.addEventListener('get-game-data', this.gameStateOn);
        // window.addEventListener('send-assets', this.assetsOn);
        // const sendAssets = new CustomEvent('retrieve-assets');
        // const getAscean = new CustomEvent('request-ascean');
        // const getEnemy = new CustomEvent('request-enemy');
        // const getState = new CustomEvent('request-combat-data');
        // const getGameData = new CustomEvent('request-game-data');
        // window.dispatchEvent(sendAssets);
        // window.dispatchEvent(getAscean);
        // window.dispatchEvent(getEnemy);
        // window.dispatchEvent(getState);
        // window.dispatchEvent(getGameData);
        // EventEmitter.on('get-enemy', this.enemyFinishedEventListener);
        // EventEmitter.emit('request-enemy');
        console.log(EventEmitter, "Boot JS EVENTS")
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
                // enemy: this.enemy,
                state: this.state,
                gameState: this.gameState,
                assets: this.assets,
            } 
        });
    };

    assetsOn = (e) => {
        console.log(e, "Boot JS ASSETS")
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