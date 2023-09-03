import WebSocket from 'socket.io'

class MultiplayerGame {
    private player: WebSocket | null = null;
    private players: WebSocket[] = [];

    addPlayer(socket: WebSocket) {
        if (!this.player) {
            this.player = socket;
            return;
        };
    };


};

module.exports = MultiplayerGame;