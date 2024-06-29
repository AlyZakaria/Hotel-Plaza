import Repository from './repository'
import roomType from '../interfaces/roomType'

class RoomTypeRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.roomType
    }
    async getRoomTypes(): Promise<roomType[] | never> {
        try {
            const roomTypes = await this._model.findMany()
            return roomTypes
        } catch (error: unknown) {
            throw error
        }
    }
    // add room type
    async addRoomType(roomType: any, images: any): Promise<any | never> {
        try {
            const transaction = this.prisma.$transaction(async (tx) => {
                roomType.count = 1
                // add room type
                const roomTypeCreated = await tx.roomType.create({
                    data: roomType,
                })
                if (!roomTypeCreated)
                    throw new Error(`Room Type can't be created`)
                // add images
                if (images) {
                    for (let i = 0; i < images.length; i++) {
                        const image = images[i]
                        const imageCreated = await tx.imageURL.create({
                            data: {
                                blob: image.imageURL.blob,
                                type: image.imageURL.type,
                            },
                        })
                        if (!imageCreated)
                            throw new Error(`Image can't be created`)
                        const typeImage = await tx.typeImage.create({
                            data: {
                                typeId: roomTypeCreated.id,
                                imageId: imageCreated.id,
                            },
                        })
                        if (!typeImage)
                            throw new Error(`Type Image can't be created`)
                    }
                }
                return roomTypeCreated
            })

            if (!transaction) throw new Error(`Room Type can't be created`)
            return transaction
        } catch (error: unknown) {
            throw error
        }
    }
    async deleteRoomType(roomTypeId: number): Promise<boolean | never> {
        try {
            const transaction = await this.prisma.$transaction(async (tx) => {
                // get all imagesId from typeimage schema
                const imagesRoomType = await tx.typeImage.findMany({
                    where: {
                        typeId: roomTypeId,
                    },
                })
                let imagesId = imagesRoomType.map((image) => image.imageId)

                // delete the roomType
                const roomTypeDelete = await tx.roomType.delete({
                    where: { id: roomTypeId },
                })
                // delete all images related to this type
                const imageDeleted = await tx.imageURL.deleteMany({
                    where: {
                        id: {
                            in: imagesId,
                        },
                    },
                })
            })

            return true
        } catch (error) {
            return false
        }
    }
    async updateRoomType(
        roomTypeId: number,
        roomType: roomType
    ): Promise<roomType | never> {
        try {
            const roomTypeEdit = await this._model.update({
                where: {
                    id: roomTypeId,
                },
                data: roomType,
            })
            if (!roomTypeEdit) throw new Error(`Room type can't be edited`)
            return roomTypeEdit
        } catch (error: unknown) {
            throw error
        }
    }
    async getRoomTypeImages(roomTypeId: number): Promise<any | never> {
        try {
            const roomTypeImages = await this.prisma.typeImage.findMany({
                where: {
                    typeId: roomTypeId,
                },
                include: {
                    imageURL: true,
                },
            })
            if (!roomTypeImages) throw new Error(`Room type can't be found`)
            return roomTypeImages
        } catch (error: unknown) {
            throw error
        }
    }

    // delete all room types
    async deleteAll() {
        try {
            // delete all room types and not truncate

            let roomTypeDeleted = this._model.deleteMany({})
            await this.prisma.$transaction([roomTypeDeleted])
        } catch (error: unknown) {
            console.log(error)
        }
    }
}

export default RoomTypeRepository
