import { Router } from 'express'
import CustomerController from '../controllers/customer.controller'
import checkEmail from '../middlewares/checkEmail'
import verifyOtpToken from '../middlewares/verifyOtpToken'
import emailExist from '../middlewares/emailExist'
const customerRoute = Router()

const customerController = new CustomerController()

customerRoute.post('/login', customerController.login)
customerRoute.post('/register', checkEmail, customerController.register)
customerRoute.post(
    '/forget-password',
    emailExist,
    customerController.forgetPassword
)
customerRoute.post('/verify-otp', customerController.verifyOtp)
customerRoute.post(
    '/reset-password',
    verifyOtpToken,
    customerController.resetPassword
)
customerRoute.post('/receive-offer', customerController.receiveOffer)

customerRoute.put('/update-customer', customerController.updateCustomer)
customerRoute.get('/customers', customerController.getAllCustomers)

export default customerRoute
