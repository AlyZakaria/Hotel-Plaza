import Controller from './controller'
import { Request, Response, NextFunction } from 'express'
import OfferRepository from '../repository/offer.repository'
import offer from '../interfaces/offer'
import sendEmail from '../helpers/sendEmail'
import makeEmail from '../emails/offerEmail'

class OfferController extends Controller {
    constructor() {
        super()
        this.repository = new OfferRepository()
        this.addOffer = this.addOffer.bind(this)
    }
    // mohamedzakariaali@gmail.com
    // add new Offer
    async addOffer(req: Request, res: Response, next: NextFunction) {
        try {
            const offer: offer = req.body
            Number(offer.id)
            offer['startDate'] = new Date(offer['startDate'])
            offer['endDate'] = new Date(offer['endDate'])
            const { offerCreated, roomType, customers } =
                await this.repository.addOffer(offer)
            if (!offerCreated) throw new Error(`Error creating offer`)
            const email = makeEmail(offerCreated, roomType, customers)

            await sendEmail(email)
            res.status(200).send(offerCreated)
        } catch (error: any) {
            res.status(409).send(`Error creating offer`)
        }
    }
}
export default OfferController
