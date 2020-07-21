"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = __importDefault(require("../api/errorHandler"));
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
const index_1 = __importDefault(require("../db/models/index"));
class App {
    constructor() {
        this.express = express_1.default();
        index_1.default.connection.authenticate().then(() => {
            console.dir('[SERVER] Connected database');
            this.middleware();
        });
    }
    middleware() {
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: true }));
        this.express.use(cors_1.default());
        this.express.use(morgan_1.default('dev'));
        this.express.use(errorHandler_1.default);
        this.routes(this.express);
    }
    routes(app) {
        new UserRoutes_1.default(app);
    }
}
exports.default = new App().express;
