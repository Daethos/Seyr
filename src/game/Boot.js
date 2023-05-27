import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
        this.ascean = {};
        this.state = {};
        this.gameState = {};
    };
    
    init() { };
    
    preload() { };
    
    create() {
        window.addEventListener('get-ascean', this.asceanFinishedEventListener);
        window.addEventListener('get-combat-data', this.stateFinishedEventListener);
        window.addEventListener('get-game-data', this.gameStateFinishedEventListener);
        const getAscean = new CustomEvent('request-ascean');
        const getState = new CustomEvent('request-combat-data');
        const getGameData = new CustomEvent('request-game-data');
        window.dispatchEvent(getAscean);
        window.dispatchEvent(getState);
        window.dispatchEvent(getGameData);
        console.log(this.ascean, 'Creating Ascean in Boot Scene');
        this.scene.start('Preload', {
            gameData: {
                ascean: this.ascean,
                state: this.state,
                gameState: this.gameState
            } 
        });
    };

    asceanFinishedEventListener = (e) => {
        this.ascean = e.detail;
        window.removeEventListener('get-ascean', this.asceanFinishedEventListener);
    };
    staateFinishedEventListener = (e) => {
        this.state = e.detail;
        window.removeEventListener('get-combat-data', this.stateFinishedEventListener);
    };
    gameStateFinishedEventListener = (e) => {
        this.gameState = e.detail;
        window.removeEventListener('get-game-data', this.gameStateFinishedEventListener);
    };
};