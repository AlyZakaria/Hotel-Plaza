import { describe, expect, test } from '@jest/globals'
import roomType from '../../interfaces/roomType'
import request from 'supertest'
import app from '../../server'
import RoomTypeRepository from '../../repository/roomType.repository'
import { RoomWithWrongRoomTypeId } from './room'
import { RoomWithRightRoomTypeId } from './room'
import room from '../../interfaces/room'
import addImage from './image'
import ImageRepository from '../../repository/image.repository'

const roomTypeRepository = new RoomTypeRepository()
let imageRepository = new ImageRepository()
const room_type: roomType = {
    count: 2,
    pricepernight: 100,
    capacity: 3,
    view: 'sea',
    name: 'single',
    description: 'test',
}
let room: room

beforeAll(async () => {
    // truncate all data in room type schema & imageUrl schema
    try {
        await roomTypeRepository.deleteAll()

        await imageRepository.deleteAll()
    } catch (error: unknown) {
        console.log(error)
    }
})

describe(`rooms and rooms types testing`, () => {
    describe(`room types testing`, () => {
        it(`add new room type with correct data using /api/room-type endpoint`, async () => {
            const response = await request(app)
                .post('/api/room-type')
                .send(room_type)
                .set('Accept', 'application/json')
                .expect(201)

            expect(response.body.view).toBe(room_type.view)
            room_type['id'] = Number(response.body.id)
        })
        it(`add new room type with wrong input with same roomtype using /api/room-type endpoint`, async () => {
            const response = await request(app)
                .post('/api/room-type')
                .send(room_type)
                .set('Accept', 'application/json')
                .expect(409)

            expect(response.body.view).toBeUndefined()
        })
    })
    describe(`Testing room`, () => {
        test(`add new room and assign it to wrong roomTypeId`, async () => {
            const response = await RoomWithWrongRoomTypeId(room_type)
            expect(response.status).toBe(409)
        })
        test(`add new room and assign it to coorect roomTypeId`, async () => {
            const response = await RoomWithRightRoomTypeId(room_type)
            expect(response.status).toBe(200)
            room = response.body
        })
    })
    // add image and assign it to right room type
    test(`add image and assign it to right room type`, async () => {
        let response = await request(app).get('/images/im1.jpeg')

        let base64 =
            `data:image/jpeg;base64,` +
            Buffer.from(response.body).toString('base64')

        let images = [
            {
                data_url: base64,
            },
        ]
        const response2 = await addImage(images, room_type['id'])

        expect(response2.text).toBe(`Images added successfully`)
        expect(response2.status).toBe(200)
    })
    // add image and assign it to right room type
    test(`add image and assign it to right room type`, async () => {
        let response = await request(app).get('/images/im1.jpeg')

        let base64 =
            `data:image/jpeg;base64,` +
            Buffer.from(response.body).toString('base64')

        let images = [
            {
                data_url: base64,
            },
        ]
        const response2 = await addImage(images, Number(room_type['id']) + 1)

        expect(response2.text).toBe(`Can't add these images`)
        expect(response2.status).toBe(409)
    })
})

export default room_type
