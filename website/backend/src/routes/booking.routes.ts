import { Router } from 'express'
import { BookingController } from '../controllers'
import { verifyToken } from '../middlewares'
const bookingRoute = Router()

const bookingController = new BookingController()

bookingRoute.get(
    '/my-reservations',
    verifyToken,
    bookingController.getMyReservations
)

export default bookingRoute
