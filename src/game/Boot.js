import Phaser from "phaser";
import { equipment } from '../game/utility';
import PlayerHelm from "../game/PlayerHelm";
import PlayerArmor from "../game/PlayerArmor";
import PlayerLegs from "../game/PlayerLegs";
import Tileset from '../game/images/Tileset.png';
import TileJson from '../game/images/map.json';


export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
        console.log(this, 'What is this?')
        this.ascean = {};
    }
    
    init() {
        
    }
    
    preload() {
        
        // Bitmap font for PreloadScene
        
        // ...path
        
        // ...files
    }
    
    create() {
        window.addEventListener('get-ascean', this.asceanFinishedEventListener)
        const getAscean = new CustomEvent('request-ascean');
        window.dispatchEvent(getAscean);

        
        this.scene.start('Preload', {
            gameData: this.ascean
        });
    }

    asceanFinishedEventListener = (e) => {
        this.ascean = e.detail;
        console.log(e.detail, 'Booting Ascean')
        window.removeEventListener('get-ascean', this.asceanFinishedEventListener);
    };
}