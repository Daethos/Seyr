import Phaser from "phaser";

export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
        this.ascean = {};
    };
    
    init() { }
    
    preload() { }
    
    create() {
        window.addEventListener('get-ascean', this.asceanFinishedEventListener)
        const getAscean = new CustomEvent('request-ascean');
        window.dispatchEvent(getAscean);
        console.log(this.ascean, 'Creating Ascean in Boot Scene')
        this.scene.start('Preload', {
            gameData: this.ascean
        });
    };

    asceanFinishedEventListener = (e) => {
        this.ascean = e.detail;
        window.removeEventListener('get-ascean', this.asceanFinishedEventListener);
    };
};