import { Request, Response, NextFunction } from 'express'
import { CustomerRepository } from '../repositories'
import { customerData } from '../interfaces'
import { statusCode } from '../constants/statusCode'
const customerRepository = new CustomerRepository()
async function emailExist(req: Request, res: Response, next: NextFunction) {
    try {
        const email = req.body.email
    
        if (!email) throw new Error()
        const customer: customerData | null =
            await customerRepository.checkEmail(req.body.email)
        console.log(customer)
        if (customer) {
            req.body['customer'] = customer
            next()
        } else {
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        res.status(statusCode.clientError.notFound).end(`Email doesn't exist`)
    }
}

export default emailExist
