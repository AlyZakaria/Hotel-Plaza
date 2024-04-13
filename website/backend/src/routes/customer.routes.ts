import { Router } from 'express'
import CustomerController from '../controllers/customer.controller'
import checkEmail from '../middlewares/checkEmail'

const customerRoute = Router()

const customerController = new CustomerController()

customerRoute.post('/login', customerController.login)
customerRoute.post('/register', checkEmail, customerController.register)
customerRoute.post('/reset-password', customerController.resetPassword)

export default customerRoute
