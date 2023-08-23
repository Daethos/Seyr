import Phaser from 'phaser';
import Play from '../scenes/Play';

const BUTTONS = [
    {ATTACK: 0xFC0000},
    {POSTURE: 0xFDF6D8}, // 0xFFD700
    {ROLL: 0x0000FC},
    {COUNTER: 0x00FC00},
    {INVOKE: 0xFFD700}, // 0xFFFFFF
    {TSHAERAL: 0x7000FF},
    {POLYMORPH: 0x00BEBE},
    {ROOT: 0xFF2E00},
    {SNARE: 0xCB0050},
    // {STEALTH: 0x000000},
];

interface ActionButton {
    name: string;
    border: Phaser.GameObjects.Graphics;
    graphic: Phaser.GameObjects.Graphics;
    color: number;
    current: number;
    total: number;
    x: number;
    y: number;
};

export default class ActionButtons extends Phaser.GameObjects.Container {
    private buttons: ActionButton[];
    private buttonWidth: number;
    private buttonHeight: number;
    private buttonPadding: number;

    constructor(scene: Play) {
        super(scene);
        this.buttons = [];
        this.buttonWidth = 22;
        this.buttonHeight = 22;
        this.buttonPadding = 5;
        this.addButtons(scene);
        scene.add.existing(this);
        const { width, height } = scene.cameras.main;
        this.setPosition(width / 2.75, height / 1.5);
        this.setScrollFactor(0);
        this.setVisible(false);      
    };

    private addButtons = (scene: Play): void => {
        let buttonX = 0;
        let buttonY = 0;
        BUTTONS.forEach((element, _index) => {
            let button: ActionButton = {
                name: Object.keys(element)[0],
                border: new Phaser.GameObjects.Graphics(scene),
                graphic: new Phaser.GameObjects.Graphics(scene),
                color: Object.values(element)[0],
                current: 100,
                total: 100,
                x: buttonX,
                y: buttonY,
            };
            button.graphic.fillStyle(Object.values(element)[0]);
            button.graphic.fillRect(buttonX, buttonY, this.buttonWidth, this.buttonHeight);
            button.graphic.setDepth(1);
            button.graphic.setVisible(false);
            
            button.border = new Phaser.GameObjects.Graphics(scene);
            button.border.lineStyle(2, 0x000000);
            button.border.strokeRect(buttonX - 1, buttonY - 1, this.buttonWidth + 2, this.buttonHeight + 2);
            button.border.setDepth(2);
            button.border.setVisible(false);
            buttonX += this.buttonWidth + this.buttonPadding;

            this.buttons.push(button);
            this.add(button.border);
            this.add(button.graphic);
        });
    };

    private draw = (): void => {
        this.buttons.forEach((button: ActionButton) => {
            button.graphic.clear();
            button.graphic.fillStyle(button.color);
            button.graphic.fillRect(button.x, button.y, this.buttonWidth, this.buttonHeight * button.current / button.total);
            if (button.current / button.total >= 1) {
                button.graphic.setVisible(false);
                button.border.setVisible(false);
            };
        });
    };   

    public setCurrent = (current: number, limit: number, name: string) => {
        const progressPercentage = current / limit;
        this.buttons.forEach((button) => {
            if (button.name === name.toUpperCase()) {
                if (progressPercentage < 1 && !button.graphic.visible) {
                    button.graphic.setVisible(true);
                    button.border.setVisible(true);
                } ;
                button.current = progressPercentage * button.total;
            };
        });
        this.draw();
    };
};