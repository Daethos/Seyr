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
    }
    
    init() {
        
    }
    
    preload() {
        
        // Bitmap font for PreloadScene
        
        // ...path
        
        // ...files
    }
    
    create() {
        // this.centerX = Math.round(0.5 * this.sys.game.config.width);
        // this.centerY = Math.round(0.5 & this.sys.game.config.height);
        this.scene.start('Preload');
    }
}