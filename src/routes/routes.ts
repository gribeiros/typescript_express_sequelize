import { Application, Request, Response } from 'express'
import UserController from '../controllers/UserController'

class Routes {

    constructor() {

    }

    getRoutes(app: Application): void {
        app.route('/').get((req: Request, res: Response) => { res.json({ serverStatus: "On" }) });
        app.route('/api/users/all').get(UserController.getAll);
        app.route('/api/users/:name').get(UserController.findByName);
        app.route('/api/users/all/:name').get(UserController.getAllByName)
    }

    postRoutes(app: Application): void {
        app.route('/api/users/create').post(UserController.create);
    }

    putRoutes(app: Application): void {
        app.route('/api/users/:id').put(UserController.update);
    }

    deleteRoutes(app: Application): void {
        app.route('/api/users/:name').delete(UserController.delete);
    }
}

export default new Routes();