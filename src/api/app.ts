import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import errorHandlerApi from '../api/errorHandler'
import UserRoutes from '../routes/UserRoutes'
import db from '../db/models/index'

class App {

    public express!: express.Application

    constructor() {
        this.express = express();
        db.connection.authenticate().then(() => {
            console.dir('[SERVER] Connected database')
            this.middleware();
            this.express.route('/').get((req: express.Request, res: express.Response) => { res.json({ serverStatus: "On" }) });
        });

    }

    private middleware(): void {
        this.express.use(express.json());
        
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(cors())
        this.express.use(morgan('common'));
        this.express.use(errorHandlerApi);
        this.routes(this.express)

    }

    private routes(app: express.Application): void {
        new UserRoutes(app);
    }

}

export default new App().express