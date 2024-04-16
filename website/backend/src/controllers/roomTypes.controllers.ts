import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import RoomTypeRepository from '../repositories/roomType.repository'
import uint8ArrayToBase64 from '../helpers/uint8ArrayToBase64'

class RoomTypeController extends Controller {
    constructor() {
        super()
        this.repository = new RoomTypeRepository()
        this.getRoomTypes = this.getRoomTypes.bind(this)
        this.getRoomType = this.getRoomType.bind(this)
        this.checkAvailability = this.checkAvailability.bind(this)
    }

    async getRoomTypes(req: Request, res: Response, next: NextFunction) {
        try {
            // get all the roomTypes
            const roomTypes = await this.repository.getRoomTypes()
            if (!roomTypes) throw new Error()
            // just return only one photo
            const roomTypesFiltered = roomTypes.map((roomType: any) => ({
                id: roomType.id,
                name: roomType.name,
                imageUrl: roomType.imageURLs[0] || null,
            }))
            const roomTypesUpdated = roomTypesFiltered.map((roomType: any) => ({
                id: roomType.id,
                name: roomType.name,
                imageUrl: {
                    id: roomType.imageUrl.imageURL.id,
                    blob: uint8ArrayToBase64(roomType.imageUrl.imageURL.blob),
                    type: roomType.imageUrl.imageURL.type,
                },
            }))
            // console.log(roomTypesUpdated)

            res.status(200).send(roomTypesUpdated)
        } catch (error: unknown) {
            res.status(404).send('No room Types found')
        }
    }
    async getRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const roomTypeId = Number(req.params.id)
            const roomType = await this.repository.getRoomType(roomTypeId)
            if (!roomType) throw new Error()
            res.status(200).send(roomType)
        } catch (error: unknown) {
            res.status(404).send('No room Type found')
        }
    }

    async checkAvailability(req: Request, res: Response, next: NextFunction) {
        try {
            const { checkIn, checkOut, capacity } = req.body
            const roomTypes = await this.repository.checkAvailability(
                checkIn,
                checkOut,
                capacity
            )
        } catch (error: unknown) {
            res.status(404).send('No rooms found')
        }
    }
}

export default RoomTypeController
