"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
let config;
if (process.env.NODE_ENV == 'development') {
    config = require('../../db/config.js').development;
}
else {
    config = require('../../db/config.js').test;
}
class Database {
    constructor() {
        this.init();
    }
    init() {
        this.connection = new sequelize_1.Sequelize(config);
    }
}
exports.default = new Database();
