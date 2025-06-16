import { AppDataSource } from '../init.js'
import { Character } from '../models/Character.js'

export const charactersRepository = AppDataSource.getRepository(Character).extend({
    async readAllRawData(): Promise<Character[]> {
        return await this.find({
            relations: {
                nemeses: {
                    secrets: true
                }
            }, // tzv. eager loading vícestupňových vztahů. - ?!
            order: {
                id: 'ASC'
            }
        })
    },
    async getAvgWeight(): Promise<number | null> {
        const raw = await this.createQueryBuilder('character').select('AVG(character.weight)::numeric(5,2)', 'result').getRawOne()
        return raw?.result ? Number(raw.result) : null
    },
    async getSumGender(): Promise<{ male: number; female: number; other: number }> {
        const raw = await this.query(`
            SELECT
                SUM(CASE WHEN LOWER(gender) IN ('m', 'male') THEN 1 ELSE 0 END) AS male,
                SUM(CASE WHEN LOWER(gender) IN ('f', 'female') THEN 1 ELSE 0 END) AS female,
                SUM(CASE WHEN LOWER(gender) NOT IN ('m', 'male', 'f', 'female') OR gender IS NULL THEN 1 ELSE 0 END) AS other
            FROM character
        `)
        return raw[0]
            ? {
                  male: Number(raw[0].male),
                  female: Number(raw[0].female),
                  other: Number(raw[0].other)
              }
            : { male: 0, female: 0, other: 0 }
    },
    async getAvgAgeOfCharactersAndNemesis(): Promise<number | null> {
        const raw = await this.query(`
            SELECT AVG(value)::numeric(5, 2) AS average_age
            FROM (
                SELECT COALESCE(DATE_PART('year', AGE(NOW(), born)), 0)::numeric AS value FROM character
                UNION ALL
                SELECT COALESCE(years, 0)::numeric AS value FROM nemesis
            ) AS combined_table;
        `)
        return raw?.[0].average_age ? Number(raw[0].average_age) : null
    }
})
