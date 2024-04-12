import request from 'supertest'
import app from '../../server'

const addImage = async (images: any, roomTypeId: any) => {
    const response = await request(app)
        .put(`/api/images/room-type?id=${roomTypeId}`)
        .send(images)
    return response
}

export default addImage
