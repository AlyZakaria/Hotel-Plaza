import { Request, Response, NextFunction } from 'express'
import Controller from './Controller'
import { generateOtp, sendEmail } from '../helpers'
import jwt from 'jsonwebtoken'
import { ResetPasswordRepository } from '../repositories'
import { SALT_ROUNDS, BCRYPT_PASSWORD, TOKEN } from '../config/constants'
import { otpData } from '../interfaces'
import makeEmail from '../emails/otpEmail'
import bcrypt from 'bcrypt'

class ResetPasswordController extends Controller {
    constructor() {
        super()
        this.repository = new ResetPasswordRepository()
    }
    // forget password
    async forgetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body.customer)
            const customerExist = req.body.customer

            const otp = generateOtp()

            // make otpObject before sending to repository
            const otpObject: otpData = {
                otp: otp,
                userId: customerExist.id,
            }
            // create otp instance to the database
            const otpData: otpData = await this.repository.sendOTP(otpObject)
            otpData['email'] = customerExist.email

            // send otp to the email
            const sendableEmail = makeEmail(otpData)
            await sendEmail(sendableEmail)

            res.status(200).send()
        } catch (error: unknown) {
            console.log(error)
            res.status(404).send(`Email not found`)
        }
    }
    // verify otp
    async verifyOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, otp } = req.body
            console.log(email, otp)
            const verified = await this.repository.verifyOTP(email, otp)
            if (!verified) throw new Error()

            let token = jwt.sign(
                {
                    email: email,
                },
                TOKEN as string,
                {
                    expiresIn: '5m',
                }
            )
            res.status(200).send(token)
        } catch (error: unknown) {
            res.status(401).send(`Wrong OTP`)
        }
    }
    //reset password
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { token, newPassword } = req.body
            // hash the password
            const hash = bcrypt.hashSync(
                newPassword + BCRYPT_PASSWORD,
                Number(SALT_ROUNDS)
            )
            const updatePassword = await this.repository.resetPassword(
                token,
                hash
            )
            if (!updatePassword) throw new Error()
            res.status(200).send(`Password reset successful`)
        } catch (error: unknown) {
            res.status(404).send(`Email not found`)
        }
    }
}

export default ResetPasswordController
