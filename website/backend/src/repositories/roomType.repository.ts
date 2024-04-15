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
        // Check the availability of the room
    }
}

export default RoomTypeRepository
