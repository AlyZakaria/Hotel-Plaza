import signedCustomer from '../interfaces/signedCustomer'
import customerData from '../interfaces/customerData'
import CustomerRepository from '../repositories/customer.repository'
import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

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

    // reset password

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            const customerExist = await this.repository.checkEmail(email)
            if (!customerExist) throw new Error(`Email not found`)
            console.log(customerExist.id)
            res.status(200).send(`Email found`)
        } catch (error: unknown) {
            res.status(404).send(`Email not found`)
        }
    }
}
export default CustomerController
