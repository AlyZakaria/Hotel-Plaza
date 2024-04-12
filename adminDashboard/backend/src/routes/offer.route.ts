import { Router } from 'express'
import OfferController from '../controllers/offer.controller'

const offerRoute = Router()
const offerController = new OfferController()

offerRoute.post('/offer', offerController.addOffer)

export default offerRoute
