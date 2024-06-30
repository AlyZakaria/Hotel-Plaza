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
                    const bookingStatus = await tx.$queryRaw`
                        CALL  book(${booking.typenames}, ${booking.numOfEachType}, ${booking.checkin}, ${booking.checkout}, ${booking.userId}, ${booking.totalAmount}, ${booking.saleId}, @message);`

                    console.log(bookingStatus)
                    if (!bookingStatus)
                        throw new Error(`Error in the booking process!`)
                    return bookingStatus
                }
            )
        } catch (error: unknown) {
            console.log(error)
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

    async getSaleId(reservationIdArg: String): Promise<any | never> {
        try {
            const transaction = await this.prisma.$transaction(
                async (tx: any) => {
                    const refundQueryStatus =
                        await tx.$queryRaw`SELECT saleId FROM bill Where reservationId = ${reservationIdArg}`

                    if (!refundQueryStatus)
                        throw new Error(`Error in the refund process!`)
                    return refundQueryStatus
                }
            )
            return transaction
        } catch (error: unknown) {
            throw error
        }
    }

    async cancelStatus(reservationIdArg: String): Promise<any | never> {
        try {
            const transaction = await this.prisma.$transaction(
                async (tx: any) => {
                    const refundQueryStatus = await tx.$queryRaw`
                        
                            UPDATE booking 
                            SET booking.status = 'cancelled' 
                            WHERE reservationId = ${reservationIdArg};

                           `
                    if (refundQueryStatus) {
                        const refunded = await tx.$queryRaw` UPDATE bill
                        SET bill.status = 'refunded'
                        WHERE reservationId = ${reservationIdArg};
                        `
                        if (!refunded)
                            throw new Error(`Error in the refund process!`)
                        return refunded
                    } else throw new Error(`Error in the refund process!`)
                }
            )
            if (!transaction) throw new Error(`Error in the refund process!`)
            return transaction
        } catch (error: unknown) {
            throw error
        }
    }
}

export default bookingRepository
