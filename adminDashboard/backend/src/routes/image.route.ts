import { Router } from 'express'
import ImageController from '../controllers/image.controller'

const imageRouter = Router()
const imageController = new ImageController()

imageRouter.delete('/image?', imageController.deleteImage)

export default imageRouter
