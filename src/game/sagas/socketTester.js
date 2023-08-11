import { closeSocketConnection, connectToSocket, isSocketConnected } from "./socketManager";

// Simulate Socket Disconnection
function simulateSocketDisconnection() {
    if (isSocketConnected()) {
        console.log('Simulating socket disconnection...');
        closeSocketConnection();
    } else {
        console.log('Socket is already disconnected.');
    };
};
  
  // Simulate Socket Reconnection
function simulateSocketReconnection() {
    if (!isSocketConnected()) {
        console.log('Simulating socket reconnection...');
        const socket = connectToSocket('http://localhost:3001'); // Replace with your socket URL
        // Add any necessary event listeners or setup here
    } else {
        console.log('Socket is already connected.');
    };
};

export function runManualSimulation() {
    // Initial socket connection
    const socket = connectToSocket('http://localhost:3001'); // Replace with your socket URL
    // Add any necessary event listeners or setup here
    
    // Simulate socket disconnection after a delay
    setTimeout(() => {
        simulateSocketDisconnection();
      
      // Simulate socket reconnection after another delay
        setTimeout(() => {
            simulateSocketReconnection();
            
            // Perform testing scenarios here
            
            // Clean up and close socket connection
            closeSocketConnection();
        }, 5000); // Delay before simulating reconnection

    }, 5000); // Delay before simulating disconnection
};