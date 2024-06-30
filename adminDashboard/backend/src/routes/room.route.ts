import { Router } from 'express'
import RoomController from '../controllers/room.controller'

const roomRoute = Router()

const roomController = new RoomController()

roomRoute.get('/rooms', roomController.getRooms)

roomRoute.post('/room', roomController.addRoom)

roomRoute.post('/lock-room', roomController.lockRoom)
roomRoute.post('/unlock-room', roomController.unlockRoom)
roomRoute.post('/make-room-offline', roomController.makeRoomOffline)
roomRoute.post('/remove-room-offline', roomController.removeRoomOffline)

roomRoute.put('/room', roomController.updateRoom)

roomRoute.delete('/room/:id', roomController.deleteRoom)

export default roomRoute
