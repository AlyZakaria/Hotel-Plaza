import Repository from './repository'
import roomType from '../interfaces/roomType'

class RoomTypeRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.roomType
    }

    // add room type
    async addRoomType(roomType: roomType): Promise<roomType | never> {
        try {
            const roomTypeCreated = await this._model.create({
                data: roomType,
            })
            if (!roomTypeCreated) throw new Error(`Room Type can't be created`)
            return roomTypeCreated
        } catch (error: unknown) {
            throw error
        }
    }
    // delete all room types
    async deleteAll() {
        try {
            let roomTypeDeleted = this._model.deleteMany()
            await this.prisma.$transaction([roomTypeDeleted])
        } catch (error: unknown) {
            console.log(error)
        }
    }
}

export default RoomTypeRepository
