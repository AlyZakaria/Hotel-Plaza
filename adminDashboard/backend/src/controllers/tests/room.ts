import room from '../../interfaces/room'
import request from 'supertest'
import app from '../../server'
import roomType from '../../interfaces/roomType'

// add new room and assign it to wrong roomTypeId
const RoomWithWrongRoomTypeId = async (roomType: roomType) => {
    const room: room = {
        typeId: Number(roomType.id),
    }

    const response = await request(app)
        .post('/api/room')
        .send({ typeId: room.typeId + 1 })
        .set('Accept', 'application/json')
    return response
}

// add new room and assign it to coorect roomTypeId
const RoomWithRightRoomTypeId = async (roomType: roomType) => {
    const room: room = {
        typeId: Number(roomType.id),
    }
    const response = await request(app)
        .post('/api/room')
        .send({ typeId: room.typeId })
        .set('Accept', 'application/json')
    return response
}

export { RoomWithWrongRoomTypeId, RoomWithRightRoomTypeId }
