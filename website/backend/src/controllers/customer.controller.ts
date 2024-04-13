import signedCustomer from '../interfaces/signedCustomer'
import customerData from '../interfaces/customerData'
import CustomerRepository from '../repositories/customer.repository'
import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import otpData from '../interfaces/otpData'
import makeEmail from '../emails/otpEmail'
import sendEmail from '../helpers/sendEmail'

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD
const tokenSecret = process.env.TOKEN

class CustomerController extends Controller {
    constructor() {
        super()
        this.repository = new CustomerRepository()
        this.register = this.register.bind(this)
        this.login = this.login.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.verifyOtp = this.verifyOtp.bind(this)
        this.forgetPassword = this.forgetPassword.bind(this)
    }
    // login
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: signedCustomer = req.body
            // check first that the email is not null
            if (!email) throw new Error('Please enter an email')
            // find by email
            const customer: customerData = await this.repository.login(email)
            // compare the passwords
            if (
                !bcrypt.compareSync(
                    password + pepper,
                    customer.password as string
                )
            )
                throw new Error('Invalid password')

            let token = jwt.sign(customer, tokenSecret as string)
            delete customer['password']
            customer['token'] = token
            res.status(200).send(customer)
        } catch (error: any) {
            res.status(404).send(error.message)
        }
    }
    // signup
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            const password = req.body.password
            const hash = bcrypt.hashSync(password + pepper, Number(saltRounds))
            delete req.body['password']
            const customerData = { ...req.body, password: hash }

            const customer: customerData =
                await this.repository.register(customerData)
            let token = jwt.sign(customer, tokenSecret as string)
            delete customer['password']
            customer['token'] = token
            res.status(200).send(customer)
        } catch (error: unknown) {
            res.status(201).send(`It can't be created, please try again..`)
        }
    }

    // forget password
    async forgetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            const customerExist = await this.repository.checkEmail(email)
            if (!customerExist) throw new Error(`Email not found`)
            let otp = ''
            for (let i = 0; i < 4; i++) {
                otp += Math.floor(Math.random() * 10)
            }
            console.log(otp)
            console.log(customerExist.id)
            const otpObject: otpData = {
                otp: Number(otp),
                userId: customerExist.id,
            }
            const otpData: otpData = await this.repository.sendOTP(otpObject)
            otpData['email'] = req.body['email']

            console.log(otpData)
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
            const verified = await this.repository.verifyOTP(email, Number(otp))
            console.log(verified)
            if (!verified) throw new Error()
            let token = jwt.sign(
                {
                    email: email,
                },
                tokenSecret as string,
                {
                    expiresIn: '5m',
                }
            )
            res.status(200).send(token)
        } catch (error: unknown) {
            console.log(error)
            res.status(401).send(`Wrong OTP`)
        }
    }
    //reset password
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, newPassword } = req.body
            // hash the password
            const hash = bcrypt.hashSync(
                newPassword + pepper,
                Number(saltRounds)
            )
            const verified = await this.repository.resetPassword(email, hash)
            if (!verified) throw new Error()
            res.status(200).send(`Password reset successful`)
        } catch (error: unknown) {
            res.status(404).send(`Email not found`)
        }
    }
}
export default CustomerController
