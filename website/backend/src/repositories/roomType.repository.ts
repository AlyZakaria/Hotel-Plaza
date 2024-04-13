import { blob } from 'stream/consumers'
import Repository from './repository'

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
            console.log(error)
            throw error
        }
    }
}

export default RoomTypeRepository
