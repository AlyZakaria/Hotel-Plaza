import { Router } from 'express'
import RoomTypeController from '../controllers/roomType.controller'
import ImageController from '../controllers/image.controller'
import multer from 'multer'
const upload = multer()
const roomTypeRoute = Router()

const roomTypeController = new RoomTypeController()
const imageController = new ImageController()

roomTypeRoute.get('/room-types', roomTypeController.getRoomTypes)

roomTypeRoute.post('/room-type', roomTypeController.addRoomType)

roomTypeRoute.delete('/room-type?', roomTypeController.deleteRoomType)

roomTypeRoute.put('/room-type', roomTypeController.editRoomType)

roomTypeRoute.put(
    '/images/room-type?',
    upload.array('files', 10),  
    imageController.addImages
)

export default roomTypeRoute
