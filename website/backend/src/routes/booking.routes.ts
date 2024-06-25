import { Router } from 'express'
import { BookingController } from '../controllers'
import { verifyToken } from '../middlewares'
import { handleBookingBody } from '../middlewares'
const bookingRoute = Router()

const bookingController = new BookingController()

bookingRoute.get(
    '/my-reservations',
    verifyToken,
    bookingController.getMyReservations
)
bookingRoute.post(
    '/book',
    verifyToken,
    handleBookingBody,
    bookingController.createBooking
)
bookingRoute.get('/success', bookingController.executeBooking)
export default bookingRoute
