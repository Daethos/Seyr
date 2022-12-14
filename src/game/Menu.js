import Phaser from "phaser";
import NewText from './NewText.js';

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });
        this.centerX = 180;
        this.centerY = 320;
        
    }

    get sizeConfig() {
        let centerX = Math.round(0.5 * this.sys.game.config.width);
        let centerY = Math.round(0.5 * this.sys.game.config.height);
        return { centerX , centerY }
    }

    init(data) {
        // console.log(data, 'Any Data?')
        this.gameData = data;
    }

    create() {
        // console.log(this.gameData, 'This Menu')

        this.createBackground();
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

        this.createMoustInput();
        this.createKeyboardInput();

    }

    createBackground() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x8A2BE2', 1);
        this.bg.fillRect(0, 0, this.game.config.width, this.game.config.height);
    }

    createMoustInput() {
        this.input.on('pointerup', this.goPlay, this);
    }

    createKeyboardInput() {
        function handleKeyUp(e) {
            switch(e.code) {
                case 'Enter':
                    this.goPlay();
                    break;
            }
        }
        this.input.keyboard.on('keyup', handleKeyUp, this);
    }

    goPlay() {
        this.scene.start('Play', {
            gameData: {
                ascean: this.gameData
            }
        });
    }
}