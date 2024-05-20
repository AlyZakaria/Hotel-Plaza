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
            const bookingStatus = await this._model.$queryRaw`CALL  book(${booking.typenames}, ${booking.numOfEachType}, ${booking.checkin}, ${booking.checkout}, ${booking.userId}, ${booking.totalAmount}, @message);
                                                              SELECT @message`

            if (!bookingStatus) throw new Error(`Error in the booking process!`)
            return bookingStatus

        } catch (error: unknown) {
            throw error
        }
    }
}

export default bookingRepository