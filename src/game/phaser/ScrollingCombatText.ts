import Phaser from 'phaser';

export default class ScrollingCombatText extends Phaser.GameObjects.Container {
    private color: string;
    private text: Phaser.GameObjects.Text;
    private duration: number;
    private timer: Phaser.Time.TimerEvent;
    private timerTime: number;
    private context: string;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, duration: number, context: string, critical?: boolean) {
        super(scene, x, y);
        this.color = context === 'damage' ? 'red' : context === 'effect' ? 'gold' : context === 'heal' ? 'green' : 'red';
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, { 
            color: this.color, 
            fontFamily: 'Cinzel', 
            fontSize: critical ? '24px' : '16px',
            stroke: 'black',
            strokeThickness: 1 
        });
        this.visible = false;
        this.add(this.text);
        scene.add.existing(this);
        this.duration = duration;
        this.timerTime = 0;
        this.context = context;
        this.timer = scene.time.addEvent({
            delay: this.duration,
            callback: () => {
                this.destroy();
            }
        });
    };

    update(player: any) {
        if (!this.visible) this.setVisible(true);
        this.timerTime += 1;
        this.setPosition(player.x, player.y - 25 - this.timerTime);
    };
};