import { blob } from 'stream/consumers'
import Repository from './repository'
import { View } from '@prisma/client'

class RoomTypeRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.roomType
    }
    async getRoomTypes(): Promise<any | never> {
        try {
            const roomTypes = await this._model.findMany({
                select: {
                    id: true,
                    name: true,
                    view: true,
                    description: true,
                    capacity: true,
                    pricepernight: true,
                    imageURLs: {
                        select: {
                            imageId: true,
                            imageURL: {
                                select: {
                                    id: true,
                                    blob: true,
                                    type: true,
                                },
                            },
                        },
                    },
                },
            })
            if (!roomTypes.length) throw new Error(`No room types found`)
            return roomTypes
        } catch (error: unknown) {
            throw error
        }
    }
    async getRoomType(id: number): Promise<any | never> {
        // Get the room type by id
        try {
            const roomType = await this._model.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    capacity: true,
                    view: true,
                    name: true,
                    description: true,
                    pricepernight: true,
                    imageURLs: {
                        select: {
                            imageId: true,
                            imageURL: {
                                select: {
                                    id: true,
                                    blob: true,
                                    type: true,
                                },
                            },
                        },
                    },
                },
            })

            if (!roomType) throw new Error(`No room type found`)
            return roomType
        } catch (error: unknown) {
            throw error
        }
    }
    async checkAvailability(
        checkIn: any,
        checkOut: any,
        capacity: number
    ): Promise<any | never> {
        try {
            // Check the availability of the room
            const roomTypesAvailable = await this.prisma.reservation.findMany({
                select: {
                    id: true,
                    checkin: true,
                    checkout: true,
                    rooms: {
                        select: {
                            receptionistId: true,
                            roomId: true,
                            status: true,
                            room: {
                                select: {
                                    id: true,
                                    typeId: true,
                                    roomType: {
                                        select: {
                                            id: true,
                                            name: true,
                                            capacity: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                where: {
                    OR: [
                        {
                            checkin: {
                                gt: new Date(checkOut), // Check-in date is after the provided check-out date
                            },
                        },
                        {
                            checkout: {
                                lt: new Date(checkIn), // Check-out date is before the provided check-in date
                            },
                        },
                    ],
                    rooms: {
                        some: {
                            status: {
                                in: ['reserved', 'checked_out'],
                            },
                            room: {
                                roomType: {
                                    capacity: { gte: capacity },
                                },
                            },
                        },
                    },
                },
            })

            console.log(roomTypesAvailable)
            return roomTypesAvailable
        } catch (error) {
            console.log(error)
        }
    }
}

export default RoomTypeRepository
