"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerApi(err, req, res, next) {
    console.error(`API error handler execute: ${err}`);
    res.status(500).json({
        message: 'Erro interno no servidor'
    });
}
exports.default = errorHandlerApi;
