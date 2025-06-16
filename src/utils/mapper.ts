// mappers/character.mapper.ts
import { Character } from '../database/models/Character.js'

// purpuse: map entities based on designed models
export function mapDesignedEntities(character: Character): Character {
    if (character.minimalDistance) {
        character.minimalDistance = Number(character.minimalDistance)
    }

    if (character.weight) {
        character.weight = Number(character.weight)
    }

    if (character.born) {
        character.born = new Date(character.born).toString().replace(/\sGMT.*$/, '') + ' CET'
    }

    if (character.inSpaceSince) {
        character.inSpaceSince = new Date(character.inSpaceSince).toString().replace(/\sGMT.*$/, '') + ' CET'
    }

    character.nemeses?.forEach((nemesis) => {
        nemesis.secrets?.forEach((secret) => {
            if (typeof secret.secretCode === 'string') {
                secret.secretCode = Number(secret.secretCode)
            }
        })
    })

    return character
}
