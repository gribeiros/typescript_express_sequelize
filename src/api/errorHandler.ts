import { NextFunction, Request, Response } from 'express';
import HttpException from './handler/HttpException';
import HttpStatus from 'http-status-codes'

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || 'Internal server error';
    response
        .status(status)
        .json({
            msg: message
        })
}

export default errorMiddleware;