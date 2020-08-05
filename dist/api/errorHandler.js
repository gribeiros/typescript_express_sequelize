"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
function errorMiddleware(error, request, response, next) {
    const status = error.status || http_status_codes_1.default.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal server error';
    response
        .status(status)
        .json({
        msg: message
    });
}
exports.default = errorMiddleware;
