import { charactersRepository } from '../database/repositories/characters.js'
import { mapDesignedEntities } from '../utils/mapper.js'

export default {
    readAllRawDataWithStatistics: async () => {
        // more effective: destructuring with await Promise.all([ place all called methods ]) and then map the returned object
        return {
            statistics: {
                charactersCount: await charactersRepository.count(),
                averageAge: await charactersRepository.getAvgAgeOfCharactersAndNemesis(),
                averageWeight: await charactersRepository.getAvgWeight(),
                genders: await charactersRepository.getSumGender()
            },
            characters: (await charactersRepository.readAllRawData()).map(mapDesignedEntities)
        }
    }
}
