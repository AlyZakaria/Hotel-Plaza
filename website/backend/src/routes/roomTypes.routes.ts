import { Router } from 'express'
import RoomTypeController from '../controllers/roomTypes.controllers'

const roomTypesRoute = Router()
const roomTypesController = new RoomTypeController()

roomTypesRoute.get('/room-types', roomTypesController.getRoomTypes)
roomTypesRoute.get('/room-type/:id', roomTypesController.getRoomType)
roomTypesRoute.get('/check-availability', roomTypesController.checkAvailability)

export default roomTypesRoute
