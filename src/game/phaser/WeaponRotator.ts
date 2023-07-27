export default class WeaponRotator {
    private context: Phaser.Scene;
    private weapon: Phaser.GameObjects.Sprite;

    constructor(context: Phaser.Scene, weapon: Phaser.GameObjects.Sprite) {
        this.context = context;
        this.weapon = weapon;
    };

    public rotate = (angle: number): void => {
        this.weapon.angle = angle;
    };

    public update = (): void => {
        const { x, y } = this.context.input.activePointer;
        const angle = Phaser.Math.Angle.Between(this.weapon.x, this.weapon.y, x, y);
        this.rotate(Phaser.Math.RadToDeg(angle));
    };
};