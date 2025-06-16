import { Character } from './models/Character.js'

export const characterSeed: Partial<Character>[] = [
    {
        name: 'Trillian',
        gender: 'female',
        ability: 'mathematician',
        minimalDistance: 6.2,
        weight: 49,
        born: new Date('1994-12-14T00:00:00'),
        inSpaceSince: new Date('2014-12-24T17:21:50'),
        beerConsumption: 6704,
        knowsTheAnswer: true
    },
    {
        name: 'Zaphod Beeblebrox',
        gender: 'm',
        ability: 'semi_half_cousin',
        minimalDistance: 1.6,
        weight: 91,
        born: new Date('1985-02-17T00:00:00'),
        inSpaceSince: new Date('2014-12-04T04:09:55'),
        beerConsumption: 679420,
        knowsTheAnswer: true
    },
    {
        name: 'Deep Thought',
        gender: null,
        ability: '42',
        minimalDistance: 4.2,
        weight: 420,
        born: new Date('2000-02-04T00:42:00'),
        inSpaceSince: new Date('2000-10-24T20:40:00'),
        beerConsumption: 4242,
        knowsTheAnswer: true
    }
]
