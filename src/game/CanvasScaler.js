import Phaser from "phaser";

export class CanvasScaler extends Phaser.GameObjects.GameObject {
    constructor(scene, type) {
        super(scene, type);
        this.bind();
    }

    bind() {
        // this.scene.scale.on('resize', proxy(this.resizeCanvas, this));
        this.resizeCanvas();
    }

    resizeCanvas() {
        const containerWidth = this.scene.scale.canvas.parentElement.offsetWidth + 1; // + 1 to ensure the size of the camera is not 1px short after rounding
        const containerHeight = this.scene.scale.canvas.parentElement.offsetHeight + 1; // same

        const gameWidth = this.scene.scale.gameSize.width;
        const gameHeight = this.scene.scale.gameSize.height;
        const gameRatio = gameWidth / gameHeight;

        let newWidth = containerWidth;
        let newHeight = containerWidth / gameRatio;

        if (newHeight < containerHeight) {
            newHeight = containerHeight;
            newWidth = containerHeight * gameRatio;
        }
        const marginTop = (containerHeight - newHeight) / 2;
        const marginLeft = (containerWidth - newWidth) / 2;

        // Scale the canvas
        this.scene.scale.canvas.style.width = Math.round(newWidth) + 'px';
        this.scene.scale.canvas.style.height = Math.round(newHeight) + 'px';

        // Center it into view
        this.scene.scale.canvas.style.marginTop = Math.round(marginTop) + 'px';
        this.scene.scale.canvas.style.marginLeft = Math.round(marginLeft) + 'px';

        const scaleRatioX = marginTop ? containerWidth / gameWidth : 1;
        const scaleRatioY = marginLeft ? containerHeight / gameHeight : 1;
        const offsetX = Math.floor((-marginLeft) / scaleRatioY);
        const offsetY = Math.floor((-marginTop) / scaleRatioX);

        // Update the camera size and position
        this.scene.cameras.main.setViewport(
            offsetX,
            offsetY,
            marginLeft ? (gameWidth - (offsetX * 2)) : gameWidth,
            marginTop ? (gameHeight - (offsetY * 2)) : gameHeight
        );
    }
}