import { Request, Response, NextFunction } from 'express'
import { CustomError } from '../../utils/errors.js'
import { logger } from '../../utils/logger.js'

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    switch (true) {
        case err instanceof CustomError:
            res.status(err.statusCode).json({ message: err.message })
            logger.error(`${err.message}`)
            break
        default:
            res.status(500).json('An unexpected error occurred on the server. Please try again later.')
            logger.error(`UNEXPECTED: ${err.message}, ${err.stack}`)
    }
}
