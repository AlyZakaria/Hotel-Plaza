import { Router } from 'express'
import RoomTypeController from '../controllers/roomTypes.controllers'
import { verify } from 'crypto'
import { verifyToken } from '../middlewares'

const roomTypesRoute = Router()
const roomTypesController = new RoomTypeController()

roomTypesRoute.get('/room-types', roomTypesController.getRoomTypes)
roomTypesRoute.get('/room-type/:id', roomTypesController.getRoomType)
roomTypesRoute.get('/room-type/images/:id', roomTypesController.getRoomImages)
roomTypesRoute.get('/room-details?', roomTypesController.getRoomTypeDetails)
roomTypesRoute.get(
    '/room-types&capacity',
    roomTypesController.getRoomTypesWithCapacity
)
roomTypesRoute.post(
    '/room-type/add-review',
    verifyToken,
    roomTypesController.addReview
)
export default roomTypesRoute
