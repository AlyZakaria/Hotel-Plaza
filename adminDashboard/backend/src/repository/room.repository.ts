import Repository from './repository'
import Room from '../interfaces/room'
import { access } from 'fs'
class RoomRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.room
    }

    async getRooms(): Promise<Room[] | never> {
        try {
            const rooms = await this._model.findMany({
                include: {
                    roomType: true,
                },
            })
            return rooms
        } catch (error: unknown) {
            throw error
        }
    }
    async addRoom(room: any): Promise<any | never> {
        try {
            //
            const transaction = await this.prisma.$transaction(async (tx) => {
                const roomCreated = await this._model.create({
                    data: {
                        typeId: room.typeId,
                        room_id: room.room_id,
                    },
                })
                // increase room type count
                const roomType = await tx.roomType.update({
                    where: {
                        id: room.typeId,
                    },
                    data: {
                        count: {
                            increment: 1,
                        },
                    },
                })
            })

            return transaction
        } catch (error: unknown) {
            console.log(error)
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

    async lockRoom(roomId: number): Promise<any | never> {
        try {
            const room = await this._model.update({
                where: {
                    room_id: roomId,
                },
                data: {
                    status: 'out_of_service',
                },
            })
            if (!room) throw new Error(`Could not lock room`)
            return room
        } catch (error: unknown) {
            throw error
        }
    }
    async unlockRoom(roomId: number): Promise<any | never> {
        try {
            const room = await this._model.update({
                where: {
                    room_id: roomId,
                },
                data: {
                    status: 'in_service',
                },
            })
            if (!room) throw new Error(`Could not unlock room`)
            return room
        } catch (error: unknown) {
            throw error
        }
    }
    async makeRoomOffline(roomId: number): Promise<any | never> {
        try {
            const room = await this._model.update({
                where: {
                    room_id: roomId,
                },
                data: {
                    access: 'online_inaccessible',
                },
            })
            if (!room) throw new Error(`Could not make room offline`)
            return room
        } catch (error: unknown) {
            console.log(error)
            throw error
        }
    }
    async removeRoomOffline(roomId: number): Promise<any | never> {
        try {
            const room = await this._model.update({
                where: {
                    room_id: roomId,
                },
                data: {
                    access: 'online_accessible',
                },
            })
            if (!room) throw new Error(`Could not make room online`)
            return room
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
