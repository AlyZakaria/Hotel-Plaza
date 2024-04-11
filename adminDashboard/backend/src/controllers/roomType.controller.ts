import Controller from './controller'
import RoomTypeRepository from '../repository/roomType.repository'
import { Request, Response, NextFunction } from 'express'
import roomType from '../interfaces/roomType'

class RoomTypeController extends Controller {
    constructor() {
        super()
        this.repository = new RoomTypeRepository()
        this.addRoomType = this.addRoomType.bind(this)
        this.deleteRoomType = this.deleteRoomType.bind(this)
        this.editRoomType = this.editRoomType.bind(this)
        this.getRoomTypes = this.getRoomTypes.bind(this)
    }

    async getRoomTypes(req: Request, res: Response, next: NextFunction) {
        try {
            const roomTypes: roomType[] = await this.repository.getRoomTypes()
            if (!roomTypes.length) throw new Error(`No room types found`)
            res.status(200).send(roomTypes)
        } catch (error: any) {
            res.status(404).send(error.message)
        }
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
    // to delete roomType
    async deleteRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const roomTypeId = Number(req.query.id)
            if (!roomTypeId) throw new Error(`room type can't be deleted`)
            const roomTypeDeleteD =
                await this.repository.deleteRoomType(roomTypeId)
            res.status(200).send(`room type deleted successfulyy`)
        } catch (error: unknown) {
            console.log(error)
            res.status(404).send(`room type can't be deleted`)
        }
    }
    // to Edit roomType
    async editRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const roomType: roomType = req.body
            Number(roomType.id)
            if (!roomType) throw new Error(`room type can't be edited`)

            const roomTypeEdited = await this.repository.editRoomType(roomType)
            if (!roomTypeEdited) throw new Error(`room type can't be edited`)
            res.status(200).send(`room type edited`)
        } catch (error: unknown) {
            res.status(404).send(`room type can't be edited`)
        }
    }
}
export default RoomTypeController
