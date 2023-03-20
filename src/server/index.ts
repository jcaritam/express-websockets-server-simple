import http from 'http';
import express, { Express } from 'express';
import * as socketIo from 'socket.io';
import { socketController } from '../sockets/controller';

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
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server listen on: http://localhost:${this.port}`);
    });
  }
}
