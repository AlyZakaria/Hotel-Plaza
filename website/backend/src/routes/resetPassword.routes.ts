import e, { Router } from 'express'
import { ResetPasswordController } from '../controllers'
import { verifyOtpToken, emailExist } from '../middlewares'

const resetPasswordRoute = Router()

const resetPasswordController = new ResetPasswordController()

resetPasswordRoute.post(
    '/forget-password',
    emailExist,
    resetPasswordController.forgetPassword
)
resetPasswordRoute.post('/verify-otp', resetPasswordController.verifyOtp)
resetPasswordRoute.post(
    '/reset-password',
    verifyOtpToken,
    resetPasswordController.resetPassword
)

export default resetPasswordRoute
