import { Request, Response, NextFunction } from 'express'
import CustomerRepository from '../repositories/customer.repository'
import customerData from '../interfaces/customerData'

const customerRepository = new CustomerRepository()
async function emailExist(req: Request, res: Response, next: NextFunction) {
    try {
        const email = req.body.email
        if (!email) throw new Error()
        const customer: customerData | null =
            await customerRepository.checkEmail(req.body.email)

        if (customer) {
            req.body['customer'] = customer
            next()
        } else {
            res.status(409).end(`Email doesn't exist`)
        }
    } catch (error) {
        res.status(409).end(`Email doesn't exist`)
    }
}

export default emailExist
