import express from 'express'
import routes from './routes/v1.js'
import errorHandler from './middleware/error-handling.js'
import swaggerUi from 'swagger-ui-express'
import swaggerParser from '@apidevtools/swagger-parser'
import { logger } from '../utils/logger.js'

const app = express()
try {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(await swaggerParser.bundle('./docs/swagger.yaml')))
    logger.info('Swagger documentation loaded successfully.')
} catch (error) {
    logger.error(`Error loading Swagger documentation: ${error}`)
}
app.use(express.json())
app.use('/v1', routes)
app.use(errorHandler)

export default app
