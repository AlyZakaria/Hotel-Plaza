import { describe, expect, test } from '@jest/globals'
import roomType from '../../interfaces/roomType'
import request from 'supertest'
import app from '../../server'
import RoomTypeRepository from '../../repository/roomType.repository'

const roomTypeRepository = new RoomTypeRepository()

const room_type = {
    count: 2,
    pricepernight: 100,
    capacity: 3,
    view: 'sea',
    name: 'single',
    description: 'test',
}

beforeAll(async () => {
    // truncate all data in room type schema
    try {
        await roomTypeRepository.deleteAll()
    } catch (error: unknown) {
        console.log(error)
    }
})

describe(`room type created`, () => {
    it(`add new room type with correct data using /api/room-type endpoint`, async () => {
        const response = await request(app)
            .post('/api/room-type')
            .send(room_type)
            .set('Accept', 'application/json')
            .expect(201)

        expect(response.body.view).toBe(room_type.view)
    })
    it(`add new room type with wrong view using /api/room-type endpoint`, async () => {
        room_type['view'] = 'wrong'
        const response = await request(app)
            .post('/api/room-type')
            .send(room_type)
            .set('Accept', 'application/json')
            .expect(409)

        expect(response.body.view).toBeUndefined()
    })
})
