import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import errorHandlerApi from '../api/errorHandler'
import Routes from '../routes/routes'
import db from '../db/models/index'


class App {

    public express!: express.Application

    constructor() {
        
        this.express = express();
        db.connection.authenticate().then(() => {
            console.dir('[SERVER] Connected database')
            this.middleware();
        });

    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended:true}));
        this.express.use(cors())
        this.express.use(morgan('dev'));
        this.express.use(errorHandlerApi);
        this.routes(this.express)

    }

    private routes(app: express.Application): void {
        Routes.getRoutes(app);
        Routes.postRoutes(app);
        Routes.putRoutes(app);
        Routes.deleteRoutes(app);
    }



}

export default new App().express