import { pino } from 'pino'
import fs from 'fs'

export const logger = pino({
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname'
                }
            },
            {
                target: 'pino-pretty',
                options: {
                    destination: './app.log',
                    colorize: false,
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname'
                }
            }
        ]
    }
})

fs.appendFileSync('./app.log', '\n')
