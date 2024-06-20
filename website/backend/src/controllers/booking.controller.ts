import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import booking from '../interfaces/booking'
import bookingRepository from '../repositories/booking.repository'
import { statusCode } from '../constants/statusCode'

const paypal = require('paypal-rest-sdk')
paypal.configure({
    mode: 'sandbox',
    client_id:
        'AQumhrYOGkkqehiNsK-5sPeoyIVt_3Cj69zWzl9cUm7cUvkfxsbfXxg0iX0nGLn7gu85EUtfhJXI1xpt',
    client_secret:
        'EEqIFUBqpaXg4xJfzrb36jD2wxPdDzrGTwFoJZlGghbJ2S8bPiw5tzQtycFXYR2iG0hCeNNkl1_7vCfU',
})

class BookingController extends Controller {
    constructor() {
        super()
        this.repository = new bookingRepository()
    }

    async createBooking(req: Request, res: Response, next: NextFunction) {
        try {
            const booking = req.body.booking
            const rooms = booking.rooms
            const nights = booking.nights

            //Concatenating Checkin and Checkout dates to put them into "custom" field in Paypal json Which only allows one String value.
            var dateUserIdList = []
            dateUserIdList.push(booking.checkin)
            dateUserIdList.push(booking.checkout)
            dateUserIdList.push(booking.userId)
            const dateUserIdString = dateUserIdList.join(',')

            //Calculating the total price and formatting it into float as a Paypal prerequisite.
            var totalprice = 0

            for (var i = 0; i < rooms.length; i++) {
                totalprice +=
                    parseInt(rooms[i].quantity) * parseFloat(rooms[i].price)
            }

            totalprice *= nights
            const totalpriceString = totalprice.toFixed(2)

            //Creating the JSON object formatted as specified by Paypal to create the payment.
            const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                redirect_urls: {
                    return_url: 'http://localhost:3000/success',
                    cancel_url: 'http://localhost:3000/cancel',
                },
                transactions: [
                    {
                        item_list: {
                            items: rooms,
                        },
                        amount: {
                            currency: 'USD',
                            total: totalpriceString,
                        },
                        description: 'Rooms',
                        custom: dateUserIdString,
                    },
                ],
            }

            //Paypal SDK function to create the payment.
            paypal.payment.create(
                create_payment_json,
                function (error: any, payment: any) {
                    if (error) {
                        throw error
                    } else {
                        for (let i = 0; i < payment.links.length; i++) {
                            if (payment.links[i].rel === 'approval_url') {
                                res.redirect(payment.links[i].href)
                            }
                        }
                    }
                }
            )
        } catch (error: unknown) {
            res.status(404).send('Error booking!')
        }
    }

    async executeBooking(req: Request, res: Response, next: NextFunction) {
        try {
            //Fetching the PayerId and the PaymentId from the URL to be used to execute the payment.
            const payerId = req.query.PayerID
            const paymentId = req.query.paymentId

            const execute_payment_json = {
                payer_id: payerId,
            }

            //Declaring variables which will be used to book the rooms in the database.
            var totalAmountArg: number = -1
            var checkinArg: String = ''
            var checkoutArg: String = ''
            var userIdArg: number = -1
            var typenamesArg: String = ''
            var numOfEachTypeArg: String = ''

            //Paypal SDK function to execute the payment.
            paypal.payment.execute(
                paymentId,
                execute_payment_json,
                function (error: any, payment: any) {
                    if (error) {
                        console.log(error.response)
                        throw error
                    } else {
                        const transaction = payment.transactions[0]
                        totalAmountArg = parseFloat(transaction.amount.total)

                        //Parsing back Checkin and Checkout date from custom field.
                        const dateString = transaction.custom
                        const dateUserIdList = dateString.split(',')
                        checkinArg = dateUserIdList[0]
                        checkoutArg = dateUserIdList[1]
                        userIdArg = parseInt(dateUserIdList[2])

                        //Formatting roomtypes and their quantities as a comma separated string to send the as a parameter to the book procedure.
                        const rooms = transaction.item_list.items

                        var roomTypeList = [] //Types of rooms needed
                        var roomCountList = [] //The numbers of rooms needed from every type

                        for (var i = 0; i < rooms.length; i++) {
                            roomTypeList.push(rooms[i].name)
                            roomCountList.push(rooms[i].quantity)
                        }

                        typenamesArg = roomTypeList.join(',')
                        numOfEachTypeArg = roomCountList.join(',')
                    }
                }
            )

            const booking: booking = {
                typenames: typenamesArg,
                numOfEachType: numOfEachTypeArg,
                checkin: checkinArg,
                checkout: checkoutArg,
                userId: userIdArg,
                totalAmount: totalAmountArg,
            }

            const book = await this.repository.book(booking)

            //paypal.payment.ref
        } catch (error: unknown) {
            res.status(404).send('Error booking!')
        }
    }

    async getMyReservations(req: Request, res: Response, next: NextFunction) {
        try {
            const CustomerId = Number(req.body.decoded.id)
            console.log(CustomerId)
            const completedBookings =
                await this.repository.getMyReservations(CustomerId)
            console.log(completedBookings)
            res.status(statusCode.success.ok).send(completedBookings)
        } catch (error) {
            console.log(error)
            res.status(statusCode.clientError.badRequest).send(
                'Error getting completed bookings!'
            )
        }
    }
}
export default BookingController
