import Repository from './repository'

class availabilityRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.reservation
    }

    //Checking Availability Of All Types.
    async allAvailableRooms(checkin: Date, checkout: Date): Promise<any | never> {
        try {
            const availability = await this._model.$queryRaw`
            WITH cte AS ( 
                SELECT 
                roomtype.name AS roomtype,
                (roomtype.count - COUNT(booking.roomId)) as available 
                FROM booking 
                JOIN reservations ON reservations.id = booking.reservationId
                JOIN room ON booking.roomId = room.id
                JOIN roomtype ON room.typeId = roomtype.id
                WHERE ((reservations.checkin BETWEEN ${checkin} AND ${checkout} OR reservations.checkout BETWEEN ${checkin} AND ${checkout})
                OR (reservations.checkin <= ${checkin} AND reservations.checkout >= ${checkout}))
                GROUP BY (room.typeId)
            )
            SELECT * FROM cte

            UNION

            SELECT roomtype.name, COUNT(room.id)
            FROM roomtype
            JOIN room ON roomtype.id = room.typeId
            WHERE roomtype.name NOT IN(SELECT roomtype FROM cte)
            GROUP BY (roomtype.name)`

            if (!availability) throw new Error(`Error Checking Availability For The Specified Type!`)
            return availability

        } catch (error: unknown) {
            throw error
        }
    }

    //Checking Availability Of One Type.
    async typeAvailableRooms(checkin: Date, checkout: Date, type: string): Promise<any | never> {
        try {
            const availability = await this._model.$queryRaw`
                WITH cte AS ( 
                SELECT 
                roomtype.name AS roomtype,
                (roomtype.count - COUNT(booking.roomId)) as available 
                FROM booking 
                JOIN reservations ON reservations.id = booking.reservationId
                JOIN room ON booking.roomId = room.id
                JOIN roomtype ON room.typeId = roomtype.id
                WHERE ((reservations.checkin BETWEEN ${checkin} AND ${checkout} OR reservations.checkout BETWEEN ${checkin} AND ${checkout})
                OR (reservations.checkin <= ${checkin} AND reservations.checkout >= ${checkout}))
                AND roomtype.name = ${type}
                GROUP BY (room.typeId)
            )
            SELECT * FROM cte

            UNION

            SELECT roomtype.name, COUNT(room.id)
            FROM roomtype
            JOIN room ON roomtype.id = room.typeId
            WHERE roomtype.name NOT IN(SELECT roomtype FROM cte)
            AND roomtype.name = ${type}
            GROUP BY (roomtype.name)`

            if (!availability) throw new Error(`Error Checking Availability!`)
            return availability

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

            if (!availability) throw new Error(`Error Checking Availability For The Specified Type!`)
            return availability

        } catch (error: unknown) {
            throw error
        }
    }

    //Getting The Ids Of All Available Rooms Of A Specific Type.
    async typeIdsAvailable(checkin: Date, checkout: Date, type: string): Promise<any | never> {
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


            if (!availability) throw new Error(`Error Checking Availability For The Specified Type!`)
            return availability

        } catch (error: unknown) {
            throw error
        }
    }


}

export default availabilityRepository
