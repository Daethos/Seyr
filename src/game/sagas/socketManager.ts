import * as io from 'socket.io-client';
let socketInstance: io.Socket | null = null;

// Function to establish the socket connection
export const connectToSocket = (url: string): io.Socket => {
    if (!socketInstance) {
        socketInstance = io.connect(url, { transports: ['websocket'] });
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