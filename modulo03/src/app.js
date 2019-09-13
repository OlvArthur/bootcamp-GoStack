import express from 'express';
import routes from './routes';
<<<<<<< HEAD
=======
import path from 'path';
>>>>>>> cdf85f522ceee73a96c386ac098c57d7429d1f90

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
<<<<<<< HEAD
=======
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
>>>>>>> cdf85f522ceee73a96c386ac098c57d7429d1f90
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
