import { Application, Request, Response,Router } from 'express'
import UserController from '../controllers/UserController'


class UserRoutes {

    constructor(app: Application) {
        this.getRoutes(app);
        this.postRoutes(app);
        this.putRoutes(app);
        this.deleteRoutes(app);
    }

    getRoutes(app: Application): void {
        app.route('/api/users/all').get(UserController.getAll);
        app.route('/api/users/all/:name').get(UserController.getAllByName)
        app.route('/api/users/:name').get(UserController.findByName);
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

export default UserRoutes;