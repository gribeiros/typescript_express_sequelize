import { Response, NextFunction, ErrorRequestHandler, Request } from 'express'

export default function errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.error(`API error handler execute: ${err}`)
    res.status(500).json({
        message: 'Erro interno no servidor'
    })
}