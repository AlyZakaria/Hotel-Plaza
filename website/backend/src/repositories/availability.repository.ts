import { stat } from 'fs'
import Repository from './repository'
import { blob } from 'stream/consumers'

class availabilityRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.reservation
    }

    //Checking Availability Of All Types.
    async allAvailableRooms(
        checkin: Date,
        checkout: Date
    ): Promise<any | never> {
        try {
            // transaction to check the availability of rooms
            const transaction = await this.prisma.$transaction(
                async (tx: any) => {
                    // get the availability of rooms
                    const availability = await tx.$queryRaw`
                        WITH cte AS ( 
                            SELECT 
                            roomtype.id AS roomtypeId,
                            roomtype.name AS roomtype,
                            roomtype.pricepernight as price,
                            roomtype.capacity,
                            roomtype.view,
                            roomtype.description,
                            roomtype.bed,
                            roomtype.size,
                            (roomtype.count - COUNT(booking.roomId)) as available
                            FROM booking
                            JOIN reservations ON reservations.id = booking.reservationId
                            JOIN room ON booking.roomId = room.room_id
                            JOIN roomtype ON room.typeId = roomtype.id
                            WHERE ((reservations.checkin BETWEEN ${checkin} AND ${checkout} OR reservations.checkout BETWEEN ${checkin} AND ${checkout})
                            OR (reservations.checkin <= ${checkin} AND reservations.checkout >= ${checkout})) 
                            GROUP BY (room.typeId)    
                           
                            
                        )
                        SELECT 
                        *  FROM cte
                        WHERE available > 0

                        UNION

                        SELECT 
                        roomtype.id AS roomtypeId,
                        roomtype.name, 
                        roomtype.pricepernight as price,
                        roomtype.capacity,
                        roomtype.view,
                        roomtype.description,
                        roomtype.bed,
                        roomtype.size,
                        COUNT(room.room_id)
                        FROM roomtype
                        JOIN room ON roomtype.id = room.typeId 
                        WHERE roomtype.name NOT IN(SELECT roomtype FROM cte ) 
                        GROUP BY (roomtype.name)
                        `

                    if (!availability)
                        throw new Error(`Error Checking Availability!`)

                    console.log(availability)
                    // get images for rooms
                    const images = await tx.typeImage.findMany({
                        where: {
                            typeId: {
                                in: availability.map(
                                    (room: any) => room.roomtypeId
                                ),
                            },
                        },
                        distinct: ['typeId'],
                        include: {
                            imageURL: true,
                        },
                    })

                    const offers = await tx.offer.findMany({
                        where: {
                            OR: [
                                // Start offer before check-in and end offer after checkout
                                {
                                    startDate: { lte: new Date(checkin) },
                                    endDate: { gte: new Date(checkout) },
                                },
                                // Start offer before check-in and end offer before (checkout)
                                {
                                    startDate: { lte: new Date(checkin) },
                                    endDate: {
                                        lt: new Date(checkout),
                                        gte: new Date(checkin),
                                    },
                                },
                                // Start offer after check-in and end offer before (checkout)
                                {
                                    startDate: { gt: new Date(checkin) },
                                    endDate: { lt: new Date(checkout) },
                                },
                                // Start offer after check-in and end offer after checkout
                                {
                                    startDate: {
                                        gt: new Date(checkin),
                                        lte: new Date(checkout),
                                    },
                                    endDate: { gte: new Date(checkout) },
                                },
                            ],
                            status: 'active',
                        },
                    })
                    return { availability, images, offers }
                }
            )

            if (!transaction) throw new Error(`Error Checking Availability!`)
            return transaction
        } catch (error: unknown) {
            throw error
        }
    }

    //Getting The Ids Of All Available Rooms.
    async allIdsAvailable(checkin: Date, checkout: Date): Promise<any | never> {
        try {
            const availability = await this._model.$queryRaw`
                WITH cte AS ( 
                    SELECT 
                    roomtype.name AS roomtype, booking.roomId
                    FROM booking 
                    JOIN reservations ON reservations.id = booking.reservationId
                    JOIN room ON booking.roomId = room.id
                    JOIN roomtype ON room.typeId = roomtype.id
                    WHERE ((reservations.checkin BETWEEN ${checkin} AND ${checkout} OR reservations.checkout BETWEEN ${checkin} AND ${checkout})
                    OR (reservations.checkin <= ${checkin} AND reservations.checkout >= ${checkout}))
                )

                SELECT roomtype.name, room.id
                FROM roomtype
                JOIN room ON roomtype.id = room.typeId
                WHERE room.id NOT IN(SELECT roomId FROM cte)`

            if (!availability)
                throw new Error(
                    `Error Checking Availability For The Specified Type!`
                )
            return availability
        } catch (error: unknown) {
            throw error
        }
    }

    //Getting The Ids Of All Available Rooms Of A Specific Type.
    async typeIdsAvailable(
        checkin: Date,
        checkout: Date,
        type: string
    ): Promise<any | never> {
        try {
            const availability = await this._model.$queryRaw`
                WITH cte AS ( 
                    SELECT 
                    roomtype.name AS roomtype, booking.roomId
                    FROM booking 
                    JOIN reservations ON reservations.id = booking.reservationId
                    JOIN room ON booking.roomId = room.id
                    JOIN roomtype ON room.typeId = roomtype.id
                    WHERE ((reservations.checkin BETWEEN ${checkin} AND ${checkout} OR reservations.checkout BETWEEN ${checkin} AND ${checkout})
                    OR (reservations.checkin <= ${checkin} AND reservations.checkout >= ${checkout}))
                    AND roomtype.name = ${type}
                )
                
                SELECT roomtype.name, room.id
                FROM roomtype
                JOIN room ON roomtype.id = room.typeId
                WHERE room.id NOT IN(SELECT roomId FROM cte)
                AND roomtype.name = ${type}`

            if (!availability)
                throw new Error(
                    `Error Checking Availability For The Specified Type!`
                )
            return availability
        } catch (error: unknown) {
            throw error
        }
    }
}

export default availabilityRepository

// console.log(offers)
// // Given offer period and hotel stay
// const offerStartDate = new Date(offers[0].startDate)
// const offerEndDate = new Date(offers[0].endDate)
// const checkinDate: any = new Date(checkin)
// const checkoutDate: any = new Date(checkout)

// const stayed =
//     (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24) // Convert milliseconds to days

// // Calculate intersection
// const intersectionStart: any =
//     offerStartDate > checkinDate
//         ? offerStartDate
//         : checkinDate
// const intersectionEnd: any =
//     offerEndDate < checkoutDate
//         ? offerEndDate
//         : checkoutDate

// // Calculate common days
// const commonDays =
//     (intersectionEnd - intersectionStart) /
//     (1000 * 60 * 60 * 24) // Convert milliseconds to days

// console.log(`Common days: ${commonDays}`)
// console.log(`Stayed: ${stayed}`)

// for (let i = 0; i < availability.length; i++) {
//     availability[i].stayed = stayed
//     availability[i].total = availability[i].price * stayed

//     availability[i].totalAfterDiscount =
//         stayed > commonDays
//             ? availability[i].price *
//                   (stayed - commonDays) +
//               availability[i].price *
//                   commonDays *
//                   (offers[0].percentage / 100)
//             : availability[i].price *
//               stayed *
//               (offers[0].percentage / 100)
// }
// console.log(availability)

// return availability
