import { Router } from 'express'
import charsController from '../controllers/v1/characters.js'

const router = Router()

// list of characters with statistics
router.get('/characters', charsController.readAllRawDataWithStatistics)

export default router
