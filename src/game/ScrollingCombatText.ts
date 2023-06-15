import Phaser from 'phaser';

export default class ScrollingCombatText extends Phaser.GameObjects.Container {
    private text: Phaser.GameObjects.Text;
    private duration: number;
    private timer: Phaser.Time.TimerEvent;
    private timerTime: number;
    private context: string;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, duration: number, context: string) {
        super(scene, x, y);
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, text, { color: context === 'damage' ? '#FF0000' : 'green', fontSize: '12px' });
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