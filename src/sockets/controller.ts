import { Socket } from 'socket.io';

export const socketController = (socket: Socket) => {
  console.log(`Client connected - ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected - ${socket.id}`);
  });

  socket.on('send-message', (payload, callback) => {
    const id = 1234;
    callback(id);

    socket.broadcast.emit('send-message', payload);
  });
};
