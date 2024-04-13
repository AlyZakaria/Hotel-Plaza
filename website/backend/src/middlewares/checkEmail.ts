import { Request, Response, NextFunction } from 'express'
import CustomerRepository from '../repositories/customer.repository'

const customerRepository = new CustomerRepository()
async function checkEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const email = req.body.email
        if (!email) throw new Error()
        // res.status(409).end(`Can't register`)
        const emailExist = await customerRepository.checkEmail(req.body.email)
        if (!emailExist) next()
        else res.status(409).end(`Email already exist`)
    } catch (error) {
        res.status(409).end(`Can't register`)
    }
}

export default checkEmail
