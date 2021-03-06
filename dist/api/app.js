"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const errorHandler_1 = __importDefault(require("../api/errorHandler"));
const routes_1 = __importDefault(require("../routes/routes"));
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
        this.express.use(morgan_1.default('dev'));
        this.express.use(errorHandler_1.default);
        this.routes(this.express);
    }
    routes(app) {
        routes_1.default.getRoutes(app);
        routes_1.default.postRoutes(app);
        routes_1.default.putRoutes(app);
        routes_1.default.deleteRoutes(app);
    }
}
exports.default = new App().express;
