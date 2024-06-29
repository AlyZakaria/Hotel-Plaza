import Repository from './repository'

class ImageRepository extends Repository {
    constructor() {
        super()
        this._model = this.prisma.imageURL
    }
    // add image for room type
    async addImage(image: any, byteArray: any): Promise<any> {
        try {
            const addImage = await this._model.create({
                data: {
                    blob: byteArray,
                    type: image.mimetype,
                },
            })
            if (!image) throw new Error()

            return addImage
        } catch (error: unknown) {
            throw error
        }
    }

    // add Images for room type
    async addImagesRoomType(
        roomTypeId: number,
        mimetypes: any,
        byteArrays: any
    ): Promise<string | never> {
        try {
            let imagesArray = []
            for (let i = 0; i < mimetypes.length; i++) {
                imagesArray.push({
                    blob: byteArrays[i],
                    mimetype: mimetypes[i],
                })
            }
            for (let i = 0; i < byteArrays.length; i++) {
                const transaction = await this.prisma.$transaction(
                    async (tx) => {
                        const image = await tx.imageURL.create({
                            data: {
                                blob: imagesArray[i].blob,
                                type: imagesArray[i].mimetype,
                            },
                        })
                        const imageRoomType = await tx.typeImage.create({
                            data: {
                                typeId: roomTypeId,
                                imageId: image.id,
                            },
                        })
                    }
                )
            }
            // Transaction committed successfully
            return 'Transaction completed'
        } catch (error) {
            throw error
        }
    }
    // delete image of room type
    async deleteImageOfRoomType(
        roomTypeId: number,
        imageId: number
    ): Promise<boolean | never> {
        try {

            const imageDeleted = await this.prisma.typeImage.deleteMany({
                where: {
                    typeId: roomTypeId,
                    imageId: imageId,
                },
                
            })
            console.log(imageDeleted)
            if (!imageDeleted) throw new Error(`image can't be deleted`)
            return true
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    // delete imageId
    async deleteImage(imageId: number): Promise<boolean | never> {
        try {
            const imageDeleted = await this._model.delete({
                where: {
                    id: imageId,
                },
            })
            if (!imageDeleted) throw new Error(`image can't be deleted`)
            return true
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    // delete All images
    async deleteAll(): Promise<boolean | never> {
        try {
            let roomImagesDeleted = this.prisma.typeImage.deleteMany({})
            let imageIds = this._model.deleteMany({})
            await this.prisma.$transaction([roomImagesDeleted, imageIds])
            return true
        } catch (error: unknown) {
            console.log(error)
            throw error
        }
    }
}

export default ImageRepository
