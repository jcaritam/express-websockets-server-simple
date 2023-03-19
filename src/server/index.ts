import http from 'http';
import express, { Express } from 'express';
import * as socketIo from 'socket.io';

const PORT = process.env.PORT || 3000;

export default class Server {
  app: Express;
  port: number | string;
  server;
  io;
  constructor() {
    this.app = express();
    this.port = PORT;
    this.server = http.createServer(this.app);
    this.io = new socketIo.Server(this.server);
    this.init();
  }

  init() {
    this.middlewares();
    this.routes();

    this.sockets();
  }

  middlewares() {
    this.app.use(express.static('public'));
  }

  routes() {}

  sockets() {
    this.io.on('connection', (socket) => {
      console.log(`Client conectado`);

      socket.on('send-message', (payload) => {
        console.log(`received message: ${payload}`);
      });

      socket.on('disconnect', () => {
        console.log(`cliente desconectado`);
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server listen on: http://localhost:${this.port}`);
    });
  }
}
