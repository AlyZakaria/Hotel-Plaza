import { Router } from 'express'
import RoomTypeController from '../controllers/roomType.controller'
import ImageController from '../controllers/image.controller'
import multer from 'multer'

const upload = multer({
    limits: { fieldSize: 25 * 1024 * 1024 },
})
const roomTypeRoute = Router()

const roomTypeController = new RoomTypeController()
const imageController = new ImageController()

roomTypeRoute.get('/room-types', roomTypeController.getRoomTypes)

roomTypeRoute.post(
    '/room-type',
    upload.array('files', 10),
    roomTypeController.addRoomType
)

roomTypeRoute.delete('/room-type?', roomTypeController.deleteRoomType)
roomTypeRoute.get('/room-type-images?', roomTypeController.getRoomTypeImages)
roomTypeRoute.put('/room-type', roomTypeController.updateRoomType)

roomTypeRoute.put(
    '/images/room-type?',
    upload.array('files', 10),
    imageController.addImages
)

export default roomTypeRoute
