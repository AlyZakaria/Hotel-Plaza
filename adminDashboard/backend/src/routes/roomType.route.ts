import { Router } from 'express'
import RoomTypeController from '../controllers/roomType.controller'

const roomTypeRoute = Router()

const roomTypeController = new RoomTypeController()

roomTypeRoute.post('/room-type', roomTypeController.addRoomType)

export default roomTypeRoute
