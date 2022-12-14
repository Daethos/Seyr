import Phaser from "phaser";
import NewText from './NewText.js';

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });
        this.centerX = 180;
        this.centerY = 320;
        console.log(this, 'This Menu')
        
    }

    get sizeConfig() {
        let centerX = Math.round(0.5 * this.sys.game.config.width);
        let centerY = Math.round(0.5 * this.sys.game.config.height);
        return { centerX , centerY }
    }

    init() {

    }

    create() {
        // Game Title
        this.title = new NewText(
            this,
            this.centerX,
            75,
            'Seyr of Daethos',
            'title'
        )
        // Click to Play Text
        this.text = new NewText(
            this,
            this.centerX,
            this.centerY,
            'Click To Play',
            'standard'
        )

    }

    goPlay() {
        this.scene.start('Play');
    }
}