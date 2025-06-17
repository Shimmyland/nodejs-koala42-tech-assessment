import 'reflect-metadata'
import { expect } from 'chai'
import request from 'supertest'
import app from '../../../src/api/app.js'
import { initDatabase } from '../../../src/database/init.js'

describe('Characters', () => {
    describe('Get /characters', () => {
        before(async () => {
            await initDatabase()
        })

        it('should return 200', async () => {
            
            const response = await request(app).get('/v1/characters')

            expect(response.status).to.equal(200)
            expect(response.body).to.have.keys('statistics', 'characters')
            expect(response.body.statistics).to.have.keys('charactersCount', 'averageAge', 'averageWeight', 'genders')
            expect(response.body.statistics.genders).to.have.keys('male', 'female', 'other')
            expect(response.body.characters).to.be.an('array').with.lengthOf(3)
            expect(response.body.characters[0]).to.have.property('ability', 'mathematician')
            expect(Object.keys(response.body.characters[0])).to.have.lengthOf(11)
            expect(response.body.characters[0].nemeses[0]).to.have.keys('id', 'years', 'isAlive', 'secrets')
            expect(response.body.characters[0].nemeses[0].secrets[0]).to.have.keys('id', 'secretCode')
        })
    }) 
})
