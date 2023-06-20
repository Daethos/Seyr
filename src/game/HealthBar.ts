import Phaser from 'phaser';

export default class HealthBar extends Phaser.GameObjects.Container {
    private bar: Phaser.GameObjects.Graphics;
    private barWidth: number;
    private barHeight: number;
    private total: number;
    private value: number;
    private p: Phaser.GameObjects.Graphics;
    private fillColor: number;

    constructor(scene: Phaser.Scene, x: number, y: number, value: number, context?: string) {
        super(scene, x, y);
        this.total = value;
        this.value = value;
        this.barWidth = 50;
        this.barHeight = 6;
        this.fillColor = context ? 0x00CCFF : 0x008000;
        this.p = new Phaser.GameObjects.Graphics(scene);
        this.p.fillStyle(0xFF0000); 
        this.p.fillRect(-this.barWidth / 2, -this.barHeight / 2, this.barWidth, this.barHeight);
        this.add(this.p);
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.fillStyle(this.fillColor); 
        this.bar.fillRect(-this.barWidth / 2, -this.barHeight / 2, this.barWidth, this.barHeight);
        this.add(this.bar);
        scene.add.existing(this);
        this.visible = false;
    };

    setValue(value: number) {
        this.value = value;
        this.draw();
    };

    private draw() {
        this.bar.clear();
        this.bar.fillStyle(this.fillColor); 
        this.bar.fillRect(-this.barWidth / 2, -this.barHeight / 2, (this.value / this.total) * this.barWidth, this.barHeight);
    };

    update(player: any) {
        if (player.attacking && player.inCombat) {
            if (!this.visible) this.setVisible(true);
        } else {
            if (this.visible) this.setVisible(false);
        };
        this.setPosition(player.x, player.y - 25);
    };
};