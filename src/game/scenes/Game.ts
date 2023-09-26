import Phaser from 'phaser';
import { config } from './Config';

class GameManager {
    private games: { [key: string]: Phaser.Game };
    constructor() {
        this.games = {};
    };

    public createGame(key: string): Phaser.Game {
        return this.games[key] = new Phaser.Game(config);
    };

    public destroyGame(key: string) {
        const game = this.games[key];
        if (!game) return;
        const scene: any = game?.scene?.getScene('Play');
        if (scene.enemies && scene.npcs && scene.player) {
            for (let i = 0; i < scene.enemies.length; i++) {
                scene.enemies[i].cleanUp();
            };
            for (let i = 0; i < scene.npcs.length; i++) {
                scene.npcs[i].cleanUp();
            };
            scene.player.cleanUp();
            scene.cleanUp();
        };
        this.games[key].destroy(true);
        delete this.games[key];
    };
};

const gameManager = new GameManager();
export default gameManager;