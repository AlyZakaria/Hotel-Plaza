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
    }
    // add Image for room Type
    async addImages(req: Request, res: Response, next: NextFunction) {
        try {
            const roomTypeId = Number(req.query.id)
            let images: any = req.body
            let byteArrays: any = []
            let mimetypes: any = []
            console.log(images[0].data_url)

            for (let i = 0; i < images.length; i++) {
                // console.log(images[i].data_url)

                let { byteArray, mimetype } = base64toBlob(images[i].data_url)
                byteArrays.push(byteArray)
                mimetypes.push(mimetype)
            }
            const addImages = await this.repository.addImagesRoomType(
                roomTypeId,
                mimetypes,
                byteArrays
            )
            if (!addImages) throw new Error(`Could not add iamges`)
            res.status(200).send('Images added successfully')
        } catch (error) {
            res.status(409).send(`Can't add these images`)
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
