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
        this.lockRoom = this.lockRoom.bind(this)
        this.unlockRoom = this.unlockRoom.bind(this)
        this.makeRoomOffline = this.makeRoomOffline.bind(this)
        this.removeRoomOffline = this.removeRoomOffline.bind(this)
    }

    async getRooms(req: Request, res: Response, next: NextFunction) {
        try {
            const rooms: Room[] = await this.repository.getRooms()
            if (!rooms.length) throw new Error(`No rooms found`)
            res.status(200).send(rooms)
        } catch (error: any) {
            console.log(error)
            res.status(404).send(error.message)
        }
    }

    async addRoom(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('here')
            const room: any = req.body
            console.log(room)
            room.typeId = Number(room.typeId)
            room.room_id = Number(room.room_id)
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
    async lockRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomId: number = Number(req.body.room_id)
            const roomLocked = await this.repository.lockRoom(roomId)
            if (!roomLocked) throw new Error(`Could not lock this room`)
            res.status(200).send(`Room has been locked successfully`)
        } catch (error: unknown) {
            res.status(409).send(`Could not lock this room`)
        }
    }
    async unlockRoom(req: Request, res: Response, next: NextFunction) {
        try {
            const roomId: number = Number(req.body.room_id)
            const roomUnlocked = await this.repository.unlockRoom(roomId)
            if (!roomUnlocked) throw new Error(`Could not unlock this room`)
            res.status(200).send(`Room has been unlocked successfully`)
        } catch (error: unknown) {
            res.status(409).send(`Could not unlock this room`)
        }
    }

    async makeRoomOffline(req: Request, res: Response, next: NextFunction) {
        try {
            const roomId: number = Number(req.body.room_id)
            const roomOffline = await this.repository.makeRoomOffline(roomId)
            if (!roomOffline)
                throw new Error(`Could not make this room offline`)
            res.status(200).send(`Room has been made offline successfully`)
        } catch (error: unknown) {
            res.status(409).send(`Could not make this room offline`)
        }
    }
    async removeRoomOffline(req: Request, res: Response, next: NextFunction) {
        try {
            const roomId: number = Number(req.body.room_id)
            const roomOnline = await this.repository.removeRoomOffline(roomId)
            if (!roomOnline) throw new Error(`Could not make this room online`)
            res.status(200).send(`Room has been made online successfully`)
        } catch (error: unknown) {
            res.status(409).send(`Could not make this room online`)
        }
    }
}

export default RoomController
