import * as io from 'socket.io-client';
let socketInstance: io.Socket | null = null;

export const connectToSocket = (url: string): io.Socket => {
    if (!socketInstance) {
        socketInstance = io.connect(url, { transports: ['websocket'], reconnection: true, reconnectionDelay: 500, reconnectionAttempts: Infinity }); // , reconnection: true, reconnectionDelay: 500, reconnectionAttempts: Infinity
    };
    return socketInstance;
};

export const getSocketInstance = (): io.Socket => {
    if (!socketInstance) {
        throw new Error('Socket not initialized');
    };
    return socketInstance;
};

export const closeSocketConnection = (): void => {
    if (socketInstance) {
        socketInstance.close(); // May be .disconnect();
        socketInstance = null;
    };
};

export const isSocketConnected = (): boolean => {
    return !!socketInstance && socketInstance.connected;
};