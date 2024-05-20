import { Router } from 'express'
import availabilityController from '../controllers/availability.controller'

const availabilityRoute = Router()
const availabilitiesController = new availabilityController()

availabilityRoute.post(
    '/all-available',
    availabilitiesController.allAvailableRooms
)
availabilityRoute.get(
    '/roomtype-available',
    availabilitiesController.typeAvailableRooms
)
availabilityRoute.get('/all-ids', availabilitiesController.allIdsAvailable)
availabilityRoute.get(
    '/roomtype-ids',
    availabilitiesController.typeIdsAvailable
)

export default availabilityRoute
