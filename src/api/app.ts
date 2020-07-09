import express, { Application } from 'express'
import morgan from 'morgan'

import errorHandlerApi from '../api/errorHandler'
import Routes from '../routes/routes'
import db from '../db/models/index'


class App {

    public express!: express.Application

    constructor() {
        
        this.express = express();
        db.connection.authenticate().then(() => {
            this.middleware();
        });

    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(morgan('dev'));
        this.express.use(errorHandlerApi);
        this.routes(this.express)

    }

    private routes(app: Application): void {
        Routes.getRoutes(app);
        Routes.postRoutes(app);
        Routes.putRoutes(app);
        Routes.deleteRoutes(app);
    }



}

export default new App().express