import Phaser from "phaser";
import NewText from '../phaser/NewText';
import EventEmitter from "../phaser/EventEmitter";

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

    init() {};

    create() {
        this.createBackground();
        this.title = new NewText(
            this,
            this.centerX,
            150,
            'The Ascean',
            'title'
        );
        // this.border = this.createMenuBorder(this.title.obj);
        this.text = new NewText(
            this,
            this.centerX,
            this.centerY,
            'Click or Press Enter to Play',
            'standard'
        );
        // this.border = this.createMenuBorder(this.text.obj);
        this.createMouseInput();
        this.createKeyboardInput();

    };

    createBackground() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, this.game.config.width, this.game.config.height);
    };

    createMenuBorder(text) {
        const border = this.add.graphics();
        border.lineStyle(3, 0xFDF6D8, 1);
        border.strokeRect(
            text.x - text.width * text.originX - 1.5, 
            text.y - text.height * text.originY - 1.5, 
            text.width + 3,
            text.height + 3 
          );
          
        this.add.existing(border);
        return border;
    };

    createMouseInput() {
        this.input.on('pointerup', this.goPlay, this);
    };

    createKeyboardInput() {
        function handleKeyUp(e) {
            switch(e.code) {
                case 'Enter':
                    this.goPlay();
                    break;
                case 'Space':
                    this.goPlay();
                    break;
                default:
                    break;
            };
        };
        this.input.keyboard.on('keyup', handleKeyUp, this);
    };

    goPlay() {
        this.scene.start('Play', {}); 
        EventEmitter.emit('launch-game', true);
    };
};