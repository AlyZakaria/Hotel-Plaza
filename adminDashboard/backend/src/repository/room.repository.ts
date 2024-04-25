import Repository from './repository'
import Room from '../interfaces/room'
class RoomRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.room
    }

    async getRooms(): Promise<Room[] | never> {
        try {
            const rooms = await this._model.findMany()
            return rooms
        } catch (error: unknown) {
            throw error
        }
    }
    async addRoom(room: Room): Promise<Room | never> {
        try {
            const roomCreated = await this._model.create({
                data: room,
            })
            if (!roomCreated) throw new Error(`Could not create room`)
            return roomCreated
        } catch (error: unknown) {
            throw error
        }
    }
    async deleteRoom(roomId: number): Promise<Room | never> {
        try {
            const roomDeleted = await this._model.delete({
                where: {
                    id: roomId,
                },
            })
            if (!roomDeleted) throw new Error(`Could not delete room`)

            return roomDeleted
        } catch (error: unknown) {
            throw error
        }
    }
    async updateRoom(room: Room): Promise<Room | never> {
        try {
            const roomUpdated = await this._model.update({
                where: {
                    id: room.id,
                },
                data: room,
            })
            if (!roomUpdated) throw new Error(`Could not update room`)
            return roomUpdated
        } catch (error: unknown) {
            throw error
        }
    }
    async deleteAll(): Promise<boolean | never> {
        try {
            const rooms = await this._model.deleteMany()
            if (!rooms) throw new Error(`Could not delete rooms`)
            return true
        } catch (error: unknown) {
            throw error
        }
    }
}

export default RoomRepository
