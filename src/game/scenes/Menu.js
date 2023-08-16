import Phaser from "phaser";
import NewText from '../phaser/NewText';
import EventEmitter from "../phaser/EventEmitter";

export default class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });
        this.centerX = 480;
        this.centerY = 320;
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
        this.text = new NewText(
            this,
            this.centerX,
            this.centerY,
            'Click or Press Enter to Play',
            'standard'
        );
        this.createMouseInput();
        this.createKeyboardInput();

    };

    createBackground() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, this.game.config.width, this.game.config.height);
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
        this.title.destroy();
        this.text.destroy();
        this.bg.destroy();
    };
};