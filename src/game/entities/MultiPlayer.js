// import EventEmitter from "../phaser/EventEmitter";
import Player from "./Player";


export default class MultiPlayer extends Player {
    constructor(data) {
        let { player } = data;
        super({ ...data, name: 'player', ascean: player.ascean, health: player.ascean.health.current });
        this.player = player;
        this.playerID = player.ascean._id;
        // this.movement();
    };

    // movement() {
    //     EventEmitter.emit('playerMoved')
    // };

    // preUpdate() {
        
    // };
};