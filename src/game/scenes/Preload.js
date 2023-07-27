import Phaser from "phaser";
import NewText from '../phaser/NewText' 
import Player from "../entities/Player";
import Enemy from '../entities/Enemy';
import Treasure from '../matter/Treasure';
import ParticleManager from "../phaser/ParticleManager";
import ascean_test from '../images/ascean_test.json';
import AncientForestDecorative from '../images/AncientForestDecorative.png';
import AncientForestMain from '../images/AncientForestMainLev.png';

export default class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload', active: false });
        this.centerX = 480;
        this.centerY = 320;
        this.width = 640;
        this.height = 36;
        this.ascean = {};
        this.enemy = {};
        this.state = {};
        this.gameState = {};
    };

    init(data) {
        console.log(data, "Preload Data");
        this.gameData = data.gameData;
    };

    preload() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0x000000', 1);
        this.bg.fillRect(0, 0, this.game.config.width, this.game.config.height);
        ParticleManager.preload(this);
        Player.preload(this);
        Enemy.preload(this);
        // Treasure.preload(this);

        this.load.tilemapTiledJSON('ascean_test', ascean_test);
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true); 
        this.load.plugin('rexglowfilterpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexglowfilterpipelineplugin.min.js', true);

        this.gameData.assets.forEach(asset => {
            this.load.image(asset.sprite,  process.env.PUBLIC_URL + asset.imgURL, { frameWidth: 32, frameHeight: 32 });
        });
        this.load.image('AncientForestMain', AncientForestMain);
        this.load.image('AncientForestDecorative', AncientForestDecorative);

        this.createLoadingBar();
    };

    create() {
        this.time.addEvent({
            delay: 500,
            callback: () => { 
                this.scene.start('Menu', {}); 
                this.progress.destroy();
                this.border.destroy();
                this.title.destroy();
                this.txt_progress.destroy();
                this.txt_file.destroy();
            },
            callbackScope: this
        }); 
    };

    createLoadingBar() {
        this.title = new NewText(
            this,
            this.centerX,
            150,
            'Loading Game',
            'preload',
            0.5
        );
        // this.border = this.createTextBorder(this.title.obj);
        this.txt_progress = new NewText(
            this,
            this.centerX,
            this.centerY - 5,
            'Loading...',
            'preload',
            { x: 0.5, y: 1 }
        );
        this.txt_file = new NewText(
            this,
            this.centerX,
            this.centerY + 175,
            '',
            'play',
            { x: 0.5, y: 1 }
        );
        let x = this.centerX - (this.width / 2);
        let y = this.centerY + 75;
        this.progress = this.add.graphics({ x: x, y: y });
        this.border = this.add.graphics({ x: x, y: y });
        this.borderBorder = this.add.graphics({ x: x, y: y });
        this.load.on('progress', this.onProgress, this);
        this.load.on('fileprogress', this.onFileProgress, this);
    };
    onProgress(val) {
        this.progress.clear();
        this.progress.fillStyle('0xFDF6D8', 1);
        this.progress.fillRect(0, 0, this.width * val, this.height);

        this.border.clear();
        this.border.lineStyle(4, '0x000000', 1);
        this.border.strokeRect(0, 0, this.width * val, this.height, 2);

        this.borderBorder.clear();
        this.borderBorder.lineStyle(4, '0xFDF6D8', 1);
        this.borderBorder.strokeRect(0, 0, this.width, this.height, 2);

        this.txt_progress.setText(Math.round(val * 100) + '%');
    };
    onFileProgress(file) {
        this.txt_file.setText(`Loading: ${file.key}`);
    };
    createTextBorder(text) {
        const border = this.add.graphics();
        border.lineStyle(3, 0xFDF6D8, 1);
        border.strokeRect(
            text.x - text.width * text.originX - 1.5, // Subtract half of the border width and the x origin from the x position
            text.y - text.height * text.originY - 1.5, // Subtract half of the border width and the y origin from the y position
            text.width + 3, // Add the border width to the width of the text
            text.height + 3 // Add the border width to the height of the text
        );
          
        this.add.existing(border);
        return border;
    };
};