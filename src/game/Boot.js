import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
        this.ascean = {};
        this.enemy = {};
        this.state = {};
        this.gameState = {};
    };
    
    init() { };
    
    preload() { };
    
    create() {
        window.addEventListener('get-ascean', this.asceanFinishedEventListener);
        window.addEventListener('get-enemy', this.enemyFinishedEventListener);
        window.addEventListener('get-combat-data', this.stateFinishedEventListener);
        window.addEventListener('get-game-data', this.gameStateFinishedEventListener);
        const getAscean = new CustomEvent('request-ascean');
        const getEnemy = new CustomEvent('request-enemy');
        const getState = new CustomEvent('request-combat-data');
        const getGameData = new CustomEvent('request-game-data');
        window.dispatchEvent(getAscean);
        window.dispatchEvent(getEnemy);
        window.dispatchEvent(getState);
        window.dispatchEvent(getGameData);
        console.log(this.enemy, 'Creating ENEMY in Boot Scene');
        this.scene.start('Preload', {
            gameData: {
                ascean: this.ascean,
                enemy: this.enemy,
                state: this.state,
                gameState: this.gameState
            } 
        });
    };

    asceanFinishedEventListener = (e) => {
        this.ascean = e.detail;
        window.removeEventListener('get-ascean', this.asceanFinishedEventListener);
    };
    enemyFinishedEventListener = (e) => {
        this.enemy = e.detail;
        console.log(e.detail, "ENEMY FINISHED EVENT LISTENER")
        window.removeEventListener('get-enemy', this.enemyFinishedEventListener);
    };
    stateFinishedEventListener = (e) => {
        this.state = e.detail;
        window.removeEventListener('get-combat-data', this.stateFinishedEventListener);
    };
    gameStateFinishedEventListener = (e) => {
        this.gameState = e.detail;
        window.removeEventListener('get-game-data', this.gameStateFinishedEventListener);
    };
};