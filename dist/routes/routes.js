"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
class Routes {
    constructor() {
    }
    getRoutes(app) {
        app.route('/').get((req, res) => { res.send('Server Run'); });
        app.route('/api/users/all').get(UserController_1.default.index);
        app.route('/api/users/:id').get(UserController_1.default.findOne);
    }
    postRoutes(app) {
        app.route('/api/users/create').post(UserController_1.default.create);
    }
    putRoutes(app) {
        app.route('/api/users/:id').put(UserController_1.default.update);
    }
    deleteRoutes(app) {
        app.route('/api/users/:id').delete(UserController_1.default.delete);
    }
}
exports.default = new Routes();
