import Controller from './controller'
import Room from '../interfaces/room'
import RoomRepository from '../repository/room.repository'
import { Request, Response, NextFunction } from 'express'

class RoomController extends Controller {
    constructor() {
        super()
        this.repository = new RoomRepository()
        this.addRoom = this.addRoom.bind(this)
        this.deleteRoom = this.deleteRoom.bind(this)
        this.updateRoom = this.updateRoom.bind(this)
        this.getRooms = this.getRooms.bind(this)
    }

    async getRooms(req: Request, res: Response, next: NextFunction) {
        try {
            const rooms: Room[] = await this.repository.getRooms()
            if (!rooms.length) throw new Error(`No rooms found`)
            res.status(200).send(rooms)
        } catch (error: any) {
            res.status(404).send(error.message)
        }
    }

    async addRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const room: Room = req.body
            const roomCreated = await this.repository.addRoom(room)
            if (!roomCreated) throw new Error(`Could not add this room`)
            res.status(200).send(roomCreated)
        } catch (error: unknown) {
            res.status(409).send(`Could not add this room`)
        }
    }

    async deleteRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomId: number = Number(req.params.id)
            const roomDeleted = await this.repository.deleteRoom(roomId)
            if (!roomDeleted) throw new Error(`Could not delete this room`)

            res.status(200).send(`Room has been deleted successfully`)
        } catch (error) {
            res.status(409).send(`room can't be deleted`)
        }
    }
    async updateRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const room: Room = req.body
            Number(room.id)
            Number(room.typeId)
            if (!room) throw new Error(`could not update this room`)
            const roomUpdated = await this.repository.updateRoom(room)
            if (!roomUpdated) throw new Error(`Could not update this room`)
            res.status(200).send(`Room has been updated successfully`)
        } catch (error: unknown) {
            res.status(409).send(`Could not update this room`)
        }
    }
}

export default RoomController
