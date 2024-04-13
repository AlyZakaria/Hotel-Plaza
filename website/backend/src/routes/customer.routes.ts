import { Router } from 'express'
import CustomerController from '../controllers/customer.controller'
import checkEmail from '../middlewares/checkEmail'
import verifyOtpToken from '../middlewares/verifyOtpToken'
const customerRoute = Router()

const customerController = new CustomerController()

customerRoute.post('/login', customerController.login)
customerRoute.post('/register', checkEmail, customerController.register)
customerRoute.post('/forget-password', customerController.forgetPassword)
customerRoute.post('/verify-otp', customerController.verifyOtp)

export default customerRoute
