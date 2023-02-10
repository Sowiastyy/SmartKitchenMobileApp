import { Socket } from 'socket.io-client';

export const connection = new Socket('192.168.8.109:3000', { transports: ['websocket'] });

connection.on('connect', (socket) => {
  console.log("Connected to server");
});

export function input(barcode) {
  connection.emit('scan', { barcode });
}
