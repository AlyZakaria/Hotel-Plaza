import express from 'express'
import { concurrency } from 'sharp'

const handleBookingBody = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        // get the number of nights from difference of checkin and checkout
        const checkin = new Date(req.body.body.date.checkin)
        const checkout = new Date(req.body.body.date.checkout)
        const diffTime = Math.abs(checkout.getTime() - checkin.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        // add property nights to the request body
        req.body.body.date.nights = diffDays
        // change checkin and checkout to yyyy-mm-dd format
        req.body.body.date.checkin = checkin.toISOString().split('T')[0]
        req.body.body.date.checkout = checkout.toISOString().split('T')[0]

        // convert to string and add userId to the request body
        req.body.body.date.userId = String(req.body.decoded.id)

        const booking = {
            checkin: req.body.body.date.checkin,
            checkout: req.body.body.date.checkout,
            userId: req.body.body.date.userId,
            nights: req.body.body.date.nights,
            rooms: req.body.body.rooms.map((room: any) => {
                return {
                    name: room.roomtype,
                    price: room.total,
                    concurrency: 'USD',
                    quantity: String(room.count),
                }
            }),
        }
        req.body.booking = booking

        console.log(req.body.booking)

        next()
    } catch (error) {
        console.log(error)
    }
}

export default handleBookingBody
