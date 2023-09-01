import express, { Application } from 'express';
import cors from 'cors';

import db from '../database/connection';
import userRoutes from '../routes/user';

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';

    this.getDbConnection();
    this.getMiddlewares();
    this.getRoutes();
  }

  async getDbConnection() {
    try {
      await db.authenticate();
      console.log('Database online!!!');
    } catch (error: any) {
      throw new Error(error);
    }
  }

  getMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  getRoutes() {
    this.app.use(this.apiPaths.users, userRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
