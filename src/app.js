import expresss from 'express';
import routes from './routes/routes';
import midleware from './middleware/midleware';

class App {
  constructor() {
    this.server = expresss();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(expresss.json());
    this.server.use(midleware);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
