import { Request, Response, NextFunction } from 'express'
import charsService from '../../../services/characters.js'

export default {
    readAllRawDataWithStatistics: async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.status(200).json(await charsService.readAllRawDataWithStatistics())
        } catch (error) {
            next(error)
        }
    }
}
