"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(message, status) {
        super(message);
        if (status) {
            this.status = status;
        }
        this.message = message;
    }
}
exports.default = HttpException;
