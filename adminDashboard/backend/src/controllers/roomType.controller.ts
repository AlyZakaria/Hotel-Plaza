import Controller from './controller'
import RoomTypeRepository from '../repository/roomType.repository'
import { Request, Response, NextFunction } from 'express'
import roomType from '../interfaces/roomType'

class RoomTypeController extends Controller {
    constructor() {
        super()
        this.repository = new RoomTypeRepository()
        this.addRoomType = this.addRoomType.bind(this)
    }

    // add room type
    async addRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const roomType: roomType = req.body
            if (!roomType) throw new Error(`Room type can't be created`)
            const roomTypeCreated = await this.repository.addRoomType(roomType)
            res.status(201).send(roomTypeCreated)
        } catch (error: unknown) {
            res.status(409).send(`It can't be created, please try again..`)
        }
    }
}
export default RoomTypeController
