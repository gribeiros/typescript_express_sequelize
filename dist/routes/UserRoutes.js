"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controllers/UserController"));
class UserRoutes {
    constructor(app) {
        this.getRoutes(app);
        this.postRoutes(app);
        this.putRoutes(app);
        this.deleteRoutes(app);
    }
    getRoutes(app) {
        app.route('/').get((req, res) => { res.json({ serverStatus: "On" }); });
        app.route('/api/users/all').get(UserController_1.default.getAll);
        app.route('/api/users/:name').get(UserController_1.default.findByName);
        app.route('/api/users/all/:name').get(UserController_1.default.getAllByName);
    }
    postRoutes(app) {
        app.route('/api/users/create').post(UserController_1.default.create);
    }
    putRoutes(app) {
        app.route('/api/users/:id').put(UserController_1.default.update);
    }
    deleteRoutes(app) {
        app.route('/api/users/:name').delete(UserController_1.default.delete);
    }
}
exports.default = UserRoutes;
