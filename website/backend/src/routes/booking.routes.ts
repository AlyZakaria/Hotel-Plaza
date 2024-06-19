import { Router } from 'express'
import { BookingController } from '../controllers'

const bookingRoute = Router()

const bookingController = new BookingController()

bookingRoute.post('/my-reservations', bookingController.getMyReservations)


export default bookingRoute