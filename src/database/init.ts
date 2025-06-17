import 'reflect-metadata'
import { DataSource } from 'typeorm'
import config from '../config/default.js'
import { logger } from '../utils/logger.js'
import { Character } from './models/Character.js'
import { Nemesis } from './models/Nemesis.js'
import { Secret } from './models/Secret.js'
import { characterSeed } from './seeds.js'

if (!config.database || !config.username || !config.password || !config.host || !config.dbport || !config.state) {
    logger.fatal('Database configuration is incomplete. Please check your config file.')
    process.exit(1)
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: config.host,
    port: parseInt(config.dbport, 10),
    username: config.username,
    password: config.password,
    database: config.database,
    synchronize: false,
    logging: true,
    entities: [Character, Nemesis, Secret],
    extra: {
        connectTimeoutMS: 10000,
        max: 10 //pool connection
    }
})

export async function initDatabase() {
    try {
        await AppDataSource.initialize()

        // seed the DB
        if (config.state === 'test') {
            await AppDataSource.dropDatabase()
            await AppDataSource.synchronize(true)

            const savedCharacters = await AppDataSource.getRepository(Character).save(characterSeed)
            const nemesisSeed: Partial<Nemesis>[] = [
                { isAlive: true, years: 29, character: savedCharacters[0] },
                { isAlive: true, years: 49, character: savedCharacters[2] },
                { isAlive: false, years: 48, character: savedCharacters[2] }
            ]
            const savedNemesis = await AppDataSource.getRepository(Nemesis).save(nemesisSeed)
            const secretsSeed: Partial<Secret>[] = [
                { secretCode: 4168664804, nemesis: savedNemesis[0] },
                { secretCode: 8424742058, nemesis: savedNemesis[2] },
                { secretCode: 1798274556, nemesis: savedNemesis[2] }
            ]
            await AppDataSource.getRepository(Secret).save(secretsSeed)
            logger.info('Database seeded successfully!')
        }

        logger.info('Data Source has been initialized!')
    } catch (error) {
        console.error('Error during Data Source initialization2:', error)
        if (error instanceof Error) {
            logger.error('Error during Data Source initialization:', error.message, error.stack, error.cause)
        } else {
            logger.error('Failed to initialize Data Source:', error)
        }
        process.exit(1)
    }
}
