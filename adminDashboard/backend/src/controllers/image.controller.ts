import Controller from './controller'
import ImageRepository from '../repository/image.repository'
import { Request, Response, NextFunction } from 'express'
import base64toBlob from '../helpers/base64toBlob'

class ImageController extends Controller {
    constructor() {
        super()
        this.repository = new ImageRepository()
        this.addImages = this.addImages.bind(this)
        this.deleteImage = this.deleteImage.bind(this)
        this.deleteImageOfRoomType = this.deleteImageOfRoomType.bind(this)
    }
    // add Image for room Type
    async addImages(req: Request, res: Response, next: NextFunction) {
        try {
            const roomTypeId = Number(req.query.id)
            let images: any = req.files
            let byteArrays: any = []
            let mimetypes: any = []
            // how to get the buffer from the image and convert to base64

            for (let i = 0; i < images.length; i++) {
                const base64String = images[i].buffer.toString('base64')
                let { byteArray, mimetype } = base64toBlob(
                    images[i],
                    base64String
                )
                byteArrays.push(byteArray)
                mimetypes.push(mimetype)
            }
            console.log(roomTypeId)
            console.log(images)
            const addImages = await this.repository.addImagesRoomType(
                roomTypeId,
                mimetypes,
                byteArrays
            )
            // console.log(addImages)
            if (!addImages) throw new Error(`Could not add iamges`)
            res.status(200).send('Images added successfully')
        } catch (error) {
            console.log(error)
            res.status(409).send(`Can't add these images`)
        }
    }
    async deleteImageOfRoomType(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const imageId = Number(req.query.imageId)
            const roomId = Number(req.query.roomId)
            console.log(imageId, roomId)
            const deleteImage = await this.repository.deleteImageOfRoomType(
                roomId,
                imageId
            )
            if (!deleteImage) throw new Error(`Could not delete the image`)
            res.status(200).send(`Image deleted successfully`)
        } catch (error) {
            res.status(409).send(`Could not delete the image`)
        }
    }
    async deleteImage(req: Request, res: Response, next: NextFunction) {
        try {
            const imageId = Number(req.query.id)
            const deleteImage = await this.repository.deleteImage(imageId)
            if (!deleteImage) throw new Error(`Could not delete the image`)
            res.status(200).send(`Image deleted successfully`)
        } catch (error) {
            res.status(409).send(`Could not delete the image`)
        }
    }
}

export default ImageController
