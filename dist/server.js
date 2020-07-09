"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./api/app"));
const port = require('./config/config')().serverPort;
app_1.default.listen(port, () => {
    console.log(`\n[SERVER] Running at http://localhost:${port}\n`);
});
