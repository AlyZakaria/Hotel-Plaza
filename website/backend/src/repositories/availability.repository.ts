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
            SELECT roomtype, (totalRooms - COUNT(roomId)) as available FROM availability
            WHERE ((checkin BETWEEN ${checkin} AND ${checkout} OR checkout BETWEEN ${checkin} AND ${checkout})
            OR (checkin <= ${checkin} AND checkout >= ${checkout}))
            GROUP BY (typeId)

            UNION

            SELECT roomtype, COUNT(roomId) as available FROM allRooms
            WHERE roomtype NOT IN(SELECT roomtype FROM availability)
            GROUP BY (roomtype)`

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
                SELECT roomtype, (totalRooms - COUNT(roomId)) as available FROM availability
                WHERE ((checkin BETWEEN ${checkin} AND ${checkout} OR checkout BETWEEN ${checkin} AND ${checkout})
                OR (checkin <= ${checkin} AND checkout >= ${checkout}))
                AND roomtype = ${type}
                GROUP BY (typeId)

                UNION

                SELECT roomtype, COUNT(roomId) as available FROM allRooms
                WHERE roomtype NOT IN(SELECT roomtype FROM availability)
                AND roomtype = ${type}
                GROUP BY (roomtype)`

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
                SELECT roomtype, roomId 
                FROM availability
                WHERE ((checkin BETWEEN ${checkin} AND ${checkout} OR checkout BETWEEN ${checkin} AND ${checkout})
                OR (checkin <= ${checkin} AND checkout >= ${checkout}))
                )

                SELECT roomtype, roomId
                FROM allRooms
                WHERE roomId NOT IN(SELECT roomId FROM cte)`

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
                SELECT roomtype, roomId 
                FROM availability
                WHERE ((checkin BETWEEN ${checkin} AND ${checkout} OR checkout BETWEEN ${checkin} AND ${checkout})
                OR (checkin <= ${checkin} AND checkout >= ${checkout}))
                AND roomtype = ${type}
                )

                SELECT roomtype, roomId
                FROM allRooms
                WHERE roomId NOT IN(SELECT roomId FROM cte)
                AND roomtype = ${type}`


            if (!availability) throw new Error(`Error Checking Availability For The Specified Type!`)
            return availability

        } catch (error: unknown) {
            throw error
        }
    }


}

export default availabilityRepository
