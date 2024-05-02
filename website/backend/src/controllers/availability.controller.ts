import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import availabilityRepository from '../repositories/availability.repository'

class availabilityController extends Controller {
    constructor() {
        super()
        this.repository = new availabilityRepository()
    }

    async allAvailableRooms(req: Request, res: Response, next: NextFunction) {
        try {
            const checkin = req.body.checkin
            const checkout = req.body.checkout

            const allRoomsAvailable = await this.repository.allAvailableRooms(
                checkin,
                checkout
            )
            if (!allRoomsAvailable) throw new Error()

            res.status(200).send(
                JSON.stringify(allRoomsAvailable, (_, v) =>
                    typeof v === 'bigint' ? v.toString() : v
                )
            )
        } catch (error: unknown) {
            console.log(error)
            res.status(404).send('No available rooms found')
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
