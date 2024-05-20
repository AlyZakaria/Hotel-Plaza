import { Router } from 'express'
import { CustomerController } from '../controllers'
import { checkEmail, verifyToken } from '../middlewares'
import multer from 'multer'

const upload = multer()

const customerRoute = Router()

const customerController = new CustomerController()

customerRoute.post('/login', customerController.login)
customerRoute.post('/register', checkEmail, customerController.register)

customerRoute.post('/receive-offer', customerController.receiveOffer)
customerRoute.put(
    '/upload-profile/:id',
    verifyToken,
    upload.single('files'),
    customerController.uploadProfileImage
)

customerRoute.put(
    '/update-customer',
    verifyToken,
    customerController.updateCustomer
)
customerRoute.get('/customers', customerController.getAllCustomers)

export default customerRoute
