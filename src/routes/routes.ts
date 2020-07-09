import { Application, Request, Response } from 'express'
import UserController from '../controllers/UserController'

class Routes {

    constructor() {

    }


    getRoutes(app: Application): void {
        app.route('/').get((req: Request, res: Response) => { res.send('Server Run') });
        app.route('/api/users/all').get(UserController.index);
        app.route('/api/users/:id').get(UserController.findOne);
    }

    postRoutes(app: Application): void {
        app.route('/api/users/create').post(UserController.create);
    }

    putRoutes(app: Application): void {
        app.route('/api/users/:id').put(UserController.update);
    }

    deleteRoutes(app: Application): void {
        app.route('/api/users/:id').delete(UserController.delete);
    }
}

export default new Routes();