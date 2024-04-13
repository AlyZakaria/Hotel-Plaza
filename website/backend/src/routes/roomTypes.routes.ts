import { Router } from 'express'
import RoomTypeController from '../controllers/roomTypes.controllers'

const roomTypesRoute = Router()
const roomTypesController = new RoomTypeController()

roomTypesRoute.get('/room-types', roomTypesController.getRoomTypes)

export default roomTypesRoute
