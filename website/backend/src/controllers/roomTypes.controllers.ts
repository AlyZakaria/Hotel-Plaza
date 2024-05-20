import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import { RoomTypeRepository } from '../repositories'
import { uint8ArrayToBase64 } from '../helpers'
import { roomType } from '../interfaces'
import { statusCode } from '../constants/statusCode'

class RoomTypeController extends Controller {
    constructor() {
        super()
        this.repository = new RoomTypeRepository()
    }

    async getRoomTypes(req: Request, res: Response, next: NextFunction) {
        try {
            // get all the roomTypes
            const roomTypes = await this.repository.getRoomTypes()
            if (!roomTypes) throw new Error()
            // just return only one photo
            const roomTypesFiltered: roomType[] = roomTypes.map(
                (roomType: any) => ({
                    id: roomType.id,
                    name: roomType.name,
                    View: roomType.view,
                    description: roomType.description,
                    pricepernight: roomType.pricepernight,
                    capacity: roomType.capacity,
                    imageUrl: roomType.imageURLs[0] || null,
                })
            )

            const roomTypesUpdated: roomType[] = roomTypesFiltered.map(
                (roomType: any) => ({
                    id: roomType.id,
                    name: roomType.name,
                    view: roomType.View,
                    description: roomType.description,
                    capacity: roomType.capacity,
                    pricepernight: roomType.pricepernight,
                    imageUrl: roomType.imageUrl
                        ? {
                              id: roomType.imageUrl.imageURL.id,
                              blob: uint8ArrayToBase64(
                                  roomType.imageUrl.imageURL.blob
                              ),
                              type: roomType.imageUrl.imageURL.type,
                          }
                        : null,
                })
            )

            res.status(statusCode.success.ok).send(roomTypesUpdated)
        } catch (error: unknown) {
            res.status(statusCode.clientError.notFound).send(
                'No room Types found'
            )
        }
    }
    async getRoomType(req: Request, res: Response, next: NextFunction) {
        try {
            const roomTypeId = Number(req.params.id)
            const roomType: roomType =
                await this.repository.getRoomType(roomTypeId)
            if (!roomType) throw new Error()
            res.status(statusCode.success.ok).send(roomType)
        } catch (error: unknown) {
            res.status(statusCode.clientError.notFound).send(
                'No room Type found'
            )
        }
    }
}

export default RoomTypeController
