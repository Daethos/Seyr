export default class ScreenShaker {
    private scene: any;
    private totalTrauma: number = 0;
    
    constructor(scene: any) {
        this.scene = scene;
        this.totalTrauma = 0;
    };

    private pause = () => {
        this.scene.pause();
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 20);
        });
    };

    public shake = (duration: number = 40, intensity: number = 0.01): void => {
        this.totalTrauma += 1.05;
        intensity *= Math.pow(this.totalTrauma, 2);
        const shakeStartIntensity = this.totalTrauma;
        if ("vibrate" in navigator) navigator.vibrate(duration);
        const startShake = (timestamp: number) => {
            const progress = timestamp - startTime;
            console.log(progress, duration, timestamp, startTime, "Shake");
            if (progress < duration) {
                const currentIntensity = shakeStartIntensity * (1 - (progress / duration));
                console.log(currentIntensity, "Current Intensity", shakeStartIntensity, "Shake Start Intensity");
                this.scene.cameras.main.shake(duration, currentIntensity);
                requestAnimationFrame(startShake);
            } else {
                this.totalTrauma = Math.max(0, this.totalTrauma - intensity); 
            };
        };
        const startTime = performance.now();
        requestAnimationFrame(startShake);
        this.pause().then(() => this.scene.resume());
    };
};