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
    async getRoomTypeDetails(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.query)
            if (!req.query.id) throw new Error()
            const roomType = Number(req.query.id)
            const roomTypeDetails =
                await this.repository.getRoomTypeDetails(roomType)

            roomTypeDetails.imageURLs = roomTypeDetails.imageURLs.map(
                (imageUrl: any) => ({
                    id: imageUrl.imageURL.id,
                    blob: uint8ArrayToBase64(imageUrl.imageURL.blob),
                    type: imageUrl.imageURL.type,
                })
            )

            if (!roomTypeDetails) {
                throw new Error()
            }
            res.status(statusCode.success.ok).send(roomTypeDetails)
        } catch (error: unknown) {
            console.log(error)
            res.status(statusCode.clientError.notFound).send(
                'No room Type found'
            )
        }
    }
    async getRoomTypesWithCapacity(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const roomTypes = await this.repository.getRoomTypesWithCapacity()
            if (!roomTypes) throw new Error()
            res.status(statusCode.success.ok).send(roomTypes)
        } catch (error: unknown) {
            res.status(statusCode.clientError.notFound).send(
                'No room Types found'
            )
        }
    }
    // get room Images
    async getRoomImages(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id) throw new Error()
            let roomId = Number(req.params.id)
            const images = await this.repository.getRoomImages(roomId)

            // loop on images and convert it to base64
            for (let image of images) {
                image.imageURL.blob = uint8ArrayToBase64(image.imageURL.blob)
            }
            res.status(statusCode.success.ok).send(images)
        } catch (error: unknown) {
            res.status(statusCode.clientError.badRequest)
        }
    }
    async addReview(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, rating, comment, roomTypeId } = req.body
            const review = {
                rating,
                comment,
                roomTypeId,
                customerId: id,
            }
            console.log(review)
            const reviewAdded = await this.repository.addReview(review)
            if (!reviewAdded) throw new Error()
            res.status(statusCode.success.created).send(reviewAdded)
        } catch (error: unknown) {
            console.log(error)
            res.status(statusCode.clientError.badRequest).send(
                'Review not added'
            )
        }
    }
}

export default RoomTypeController
