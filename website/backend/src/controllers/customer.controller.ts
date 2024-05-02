import { customerData, signedCustomer } from '../interfaces'
import { CustomerRepository } from '../repositories'
import Controller from './Controller'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { base64toBlob, uint8ArrayToBase64 } from '../helpers'
import { SALT_ROUNDS, BCRYPT_PASSWORD, TOKEN } from '../config/constants'

class CustomerController extends Controller {
    constructor() {
        super()
        this.repository = new CustomerRepository()
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
                    password + BCRYPT_PASSWORD,
                    customer.password as string
                )
            )
                throw new Error('Invalid password')
            // check if he has profile or not
            if (customer.image && customer.imageType) {
                customer.image = uint8ArrayToBase64(customer.image)
            }
            // generate token
            let token = jwt.sign(customer, TOKEN as string)
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
            const password = req.body.password
            // hashing the input password
            const hash = bcrypt.hashSync(
                password + BCRYPT_PASSWORD,
                Number(SALT_ROUNDS)
            )
            delete req.body['password']
            const customerData: customerData = { ...req.body, password: hash }

            const customer: customerData =
                await this.repository.register(customerData)
            if (!customer) throw new Error()

            // generate token
            let token = jwt.sign(customer, TOKEN as string)
            delete customer['password']
            customer['token'] = token
            res.status(200).send(customer)
        } catch (error: unknown) {
            res.status(201).send(`It can't be created, please try again..`)
        }
    }
    async updateCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)
            if (!req.body.id) throw new Error()

            Number(req.body.id)
            const customer: customerData = req.body
            // get all data of customer and update it
            const updatedCustomer =
                await this.repository.updateCustomer(customer)
            if (!updatedCustomer) throw new Error()
            res.status(200).send(updatedCustomer)
        } catch (error: unknown) {
            console.log(error)
            res.status(404).send(`Customer not found`)
        }
    }
    async uploadProfileImage(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.params.id) throw new Error()
            let id = Number(req.params.id)
            const image: any = req.file
            // convert to base64 as large string with data:image/jpeg;base64,
            let base64 =
                `data:image/${image.mimetype};base64,` +
                image.buffer.toString('base64')
            let { byteArray, mimetype } = base64toBlob(base64)

            const updatedCustomer = await this.repository.uploadProfileImage(
                id,
                byteArray,
                mimetype
            )

            if (updatedCustomer.image && updatedCustomer.imageType) {
                updatedCustomer.image = uint8ArrayToBase64(
                    updatedCustomer.image
                )
            }

            if (!updatedCustomer) throw new Error()
            res.status(200).send(updatedCustomer)
        } catch (error: unknown) {
            console.log(error)
            res.status(404).send(`Customer not found`)
        }
    }

    // recieve offer
    async receiveOffer(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name } = req.body
            if (!email) throw new Error(`Please enter an email`)
            const notify = await this.repository.receiveOffer(email, name)
            if (!notify) throw new Error()
            res.status(200).send(`You will receive offers from now on`)
        } catch (error: any) {
            res.status(404).send(error.message)
        }
    }
    async getAllCustomers(req: Request, res: Response, next: NextFunction) {
        try {
            const getAllCustomers = await this.repository.getAllCustomers()
            res.status(200).send(getAllCustomers)
        } catch (error) {
            console.log(error)
            res.status(404).send(error)
        }
    }
}
export default CustomerController
