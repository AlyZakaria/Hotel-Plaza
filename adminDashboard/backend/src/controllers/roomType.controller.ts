import Controller from './controller'
import RoomTypeRepository from '../repository/roomType.repository'
import { Request, Response, NextFunction } from 'express'
import roomType from '../interfaces/roomType'
import uint8ArrayToBase64 from '../helpers/uint8ArrayToBase64'
import { parse } from 'path'
class RoomTypeController extends Controller {
    constructor() {
        super()
        this.repository = new RoomTypeRepository()
        this.addRoomType = this.addRoomType.bind(this)
        this.deleteRoomType = this.deleteRoomType.bind(this)
        this.editRoomType = this.editRoomType.bind(this)
        this.getRoomTypes = this.getRoomTypes.bind(this)
        this.getRoomTypeImages = this.getRoomTypeImages.bind(this)
        this.updateRoomType = this.updateRoomType.bind(this)
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
            const roomType: any = req.body
            const images = roomType.images
            delete roomType['images']
            console.log(images)
            // add count to one
            roomType.count = 1
            // convert to number
            roomType.size = Number(roomType.size)
            roomType.pricepernight = Number(roomType.pricepernight)
            roomType.capacity = Number(roomType.capacity)

            if (!roomType) throw new Error(`Room type can't be created`)
            const roomTypeCreated = await this.repository.addRoomType(
                roomType,
                images
            )
            res.status(201).send(roomTypeCreated)
        } catch (error: unknown) {
            console.log(error)
            res.status(409).send(`It can't be created, please try again..`)
        }
    }
    async updateRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const roomType: roomType = req.body

            const roomTypeId = Number(roomType.id)
            delete roomType['id']
            roomType.size = Number(roomType.size)
            roomType.pricepernight = Number(roomType.pricepernight)
            roomType.capacity = Number(roomType.capacity)

            const roomTypeUpdated = await this.repository.updateRoomType(
                roomTypeId,
                roomType
            )
            console.log(roomType)
            if (!roomTypeUpdated) throw new Error(`Room type can't be updated`)
            res.status(200).send(roomTypeUpdated)
        } catch (error: unknown) {
            console.log(error)
            res.status(409).send(`It can't be updated, please try again..`)
        }
    }
    // to delete roomType
    async deleteRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const roomTypeId = Number(req.query.id)
            if (!roomTypeId) throw new Error(`room type can't be deleted`)
            const roomTypeDeleted =
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

    async getRoomTypeImages(req: Request, res: Response, next: NextFunction) {
        try {
            const roomTypeId = Number(req.query.id)
            if (!roomTypeId) throw new Error(`room type can't be found`)
            let roomTypeImages =
                await this.repository.getRoomTypeImages(roomTypeId)
            // convert to base64
            roomTypeImages = roomTypeImages.map((image: any) => {
                return {
                    ...image,
                    imageURL: {
                        ...image.imageURL,
                        blob: uint8ArrayToBase64(image.imageURL.blob),
                    },
                }
            })

            console.log(roomTypeImages)
            if (!roomTypeImages) throw new Error(`room type can't be found`)
            res.status(200).send(roomTypeImages)
        } catch (error: unknown) {
            res.status(404).send(`room type can't be found`)
        }
    }
}
export default RoomTypeController
