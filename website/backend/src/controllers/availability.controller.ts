import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import { availabilityRepository } from '../repositories'
import { statusCode } from '../constants/statusCode'
import { commonDays, uint8ArrayToBase64 } from '../helpers'

class availabilityController extends Controller {
    constructor() {
        super()
        this.repository = new availabilityRepository()
    }

    async allAvailableRooms(req: Request, res: Response, next: NextFunction) {
        try {
            const checkin = req.body.checkin
            const checkout = req.body.checkout

            const { availability, images, offers } =
                await this.repository.allAvailableRooms(checkin, checkout)

            // combine images and availability with the same typeId and roomtypeId
            // in one list and convert image blob to base64
            const combinedRooms = availability.map((room: any) => {
                const images2 = images.filter(
                    (image: any) => image.typeId === room.roomtypeId
                )
                images2.map((image: any) => {
                    console.log(image)
                    image.type = image.imageURL.type
                    image.imageURL = uint8ArrayToBase64(image.imageURL.blob)

                    return image
                })
                return { ...room, images2 }
            })
           
            let { offerStartDate, offerEndDate, common_days } = {
                offerStartDate: new Date(),
                offerEndDate: new Date(),
                common_days: 0,
            }
            if (offers.length) {
                offerStartDate = new Date(offers[0].startDate)
                offerEndDate = new Date(offers[0].endDate)
            }
            const checkinDate: any = new Date(checkin)
            const checkoutDate: any = new Date(checkout)

            const stayed = (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24) // Convert milliseconds to days

            if (offers.length) {
                common_days = commonDays(
                    offerStartDate,
                    offerEndDate,
                    checkinDate,
                    checkoutDate
                )
            }

            for (let i = 0; i < combinedRooms.length; i++) {
                combinedRooms[i].stayed = stayed
                combinedRooms[i].total = Math.ceil(
                    combinedRooms[i].price * stayed
                )

                if (offers.length) {
                    combinedRooms[i].totalAfterDiscount =
                        stayed > common_days
                            ? combinedRooms[i].price * (stayed - common_days) +
                              combinedRooms[i].price *
                                  common_days *
                                  (offers[0].percentage / 100)
                            : combinedRooms[i].price *
                              stayed *
                              (offers[0].percentage / 100)

                    combinedRooms[i].saved =
                        ((combinedRooms[i].total -
                            combinedRooms[i].totalAfterDiscount) /
                            combinedRooms[i].total) *
                        100
                    combinedRooms[i].totalAfterDiscount = Math.ceil(
                        combinedRooms[i].totalAfterDiscount
                    )
                    combinedRooms[i].saved = Math.ceil(combinedRooms[i].saved)
                    combinedRooms[i].offerName = offers[0].name
                }
            }

            if (!combinedRooms) throw new Error()

            console.log(combinedRooms)

            res.status(statusCode.success.ok).send(
                JSON.stringify(combinedRooms, (_, v) =>
                    typeof v === 'bigint' ? v.toString() : v
                )
            )
        } catch (error: unknown) {
            console.log(error)
            res.status(statusCode.clientError.notFound).send(
                'No available rooms found'
            )
        }
    }

    async typeAvailableRooms(req: Request, res: Response, next: NextFunction) {
        try {
            const checkin = req.body.checkin
            const checkout = req.body.checkout
            const type = req.body.type

            const typeRoomsAvailable = await this.repository.typeAvailableRooms(
                checkin,
                checkout,
                type
            )
            if (!typeRoomsAvailable) throw new Error()

            res.status(200).send(typeRoomsAvailable)
        } catch (error: unknown) {
            res.status(404).send('No available rooms of this type are found')
        }
    }

    async allIdsAvailable(req: Request, res: Response, next: NextFunction) {
        try {
            const checkin = req.body.checkin
            const checkout = req.body.checkout

            const idsAvailable = await this.repository.allIdsAvailable(
                checkin,
                checkout
            )
            if (!idsAvailable) throw new Error()

            res.status(200).send(idsAvailable)
        } catch (error: unknown) {
            res.status(404).send('Ids not found')
        }
    }

    async typeIdsAvailable(req: Request, res: Response, next: NextFunction) {
        try {
            const checkin = req.body.checkin
            const checkout = req.body.checkout
            const type = req.body.type

            const allRoomsAvailable = await this.repository.typeIdsAvailable(
                checkin,
                checkout,
                type
            )
            if (!allRoomsAvailable) throw new Error()

            res.status(200).send(allRoomsAvailable)
        } catch (error: unknown) {
            res.status(404).send('Ids for this type are not found')
        }
    }
}
export default availabilityController
