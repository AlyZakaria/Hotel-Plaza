import { Router } from 'express'
import ImageController from '../controllers/image.controller'

const imageRouter = Router()
const imageController = new ImageController()

imageRouter.delete('/image?', imageController.deleteImage)
imageRouter.delete('/images/room-type?', imageController.deleteImageOfRoomType)

export default imageRouter
