import Phaser from "phaser";
import NewText from './NewText.js';

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });
        this.centerX = 480;
        this.centerY = 320;
    };

    get sizeConfig() {
        let centerX = Math.round(0.5 * this.sys.game.config.width);
        let centerY = Math.round(0.5 * this.sys.game.config.height);
        return { centerX , centerY };
    };

    init(data) {
        this.gameData = data;
    };

    create() {
        this.createBackground();
        this.title = new NewText(
            this,
            this.centerX,
            75,
            'Seyr of Daethos',
            'title'
        );
        this.border = this.createTextBorder(this.title.obj);
        this.text = new NewText(
            this,
            this.centerX,
            this.centerY,
            'Click To Play',
            'standard'
        );
        this.border = this.createTextBorder(this.text.obj);
        this.createMoustInput();
        this.createKeyboardInput();

    };

    createBackground() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x2A0134', 1);
        this.bg.fillRect(0, 0, this.game.config.width, this.game.config.height);
        // Need to create a black border around the backgrounds for the text boxes
        
    };

    createTextBorder(text) {
        const border = this.add.graphics();
        border.lineStyle(3, 0x2A0134, 1);
        border.strokeRect(
            text.x - text.width * text.originX - 1.5, // Subtract half of the border width and the x origin from the x position
            text.y - text.height * text.originY - 1.5, // Subtract half of the border width and the y origin from the y position
            text.width + 3, // Add the border width to the width of the text
            text.height + 3 // Add the border width to the height of the text
          );
          
        this.add.existing(border);
        return border;
    };

    createMoustInput() {
        this.input.on('pointerup', this.goPlay, this);
    };

    createKeyboardInput() {
        function handleKeyUp(e) {
            switch(e.code) {
                case 'Enter':
                    this.goPlay();
                    break;
            };
        };
        this.input.keyboard.on('keyup', handleKeyUp, this);
    };

    goPlay() {
        this.scene.start('Play', {
            gameData: {
                ascean: this.gameData
            }
        });
    };
};