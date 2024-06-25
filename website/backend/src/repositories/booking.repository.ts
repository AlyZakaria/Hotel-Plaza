import Repository from './repository'
import booking from '../interfaces/booking'

class bookingRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.booking
    }

    //Book.
    async book(booking: booking): Promise<any | never> {
        try {
            const transaction = await this.prisma.$transaction(
                async (tx: any) => {
                    const bookingStatus =
                        await tx.$queryRaw`CALL  book(${booking.typenames}, ${booking.numOfEachType}, ${booking.checkin}, ${booking.checkout}, ${booking.userId}, ${booking.totalAmount}, ${booking.saleId}, @message);`

                    if (!bookingStatus)
                        throw new Error(`Error in the booking process!`)
                    return bookingStatus
                }
            )
        } catch (error: unknown) {
            throw error
        }
    }
    async getMyReservations(userId: number): Promise<any | never> {
        try {
            const completedBookings = await this.prisma.reservation.findMany({
                where: {
                    customerId: userId,
                },

                include: {
                    rooms: {
                        include: {
                            room: {
                                include: {
                                    roomType: {
                                        include: {
                                            reviews: {
                                                // add condition here
                                                where: {
                                                    customerId: userId,
                                                },
                                            },
                                        }, // Include reviews for the room type
                                    },
                                },
                            },
                        },
                    },

                    bill: true, // Include bill details
                },
            })

            if (!completedBookings)
                throw new Error(
                    `No completed bookings found for the user with id: ${userId}`
                )
            return completedBookings
        } catch (error: unknown) {
            throw error
        }
    }

    async refund(reservationIdArg: String): Promise<any | never> {
        try {
            const refundQueryStatus = await this._model
                .$queryRaw`SELECT saleId FROM bill Where reservationId = ${reservationIdArg}`

            if (!refundQueryStatus) throw new Error(`Error in the refund process!`)
            return refundQueryStatus
        } catch (error: unknown) {
            throw error
        }
    }
}

export default bookingRepository
