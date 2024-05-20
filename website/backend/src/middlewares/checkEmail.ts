import { Request, Response, NextFunction } from 'express'
import { CustomerRepository } from '../repositories'
import { statusCode } from '../constants/statusCode'

const customerRepository = new CustomerRepository()
async function checkEmail(req: Request, res: Response, next: NextFunction) {
    try {
        const email = req.body.email
        if (!email) throw new Error()
        const emailExist = await customerRepository.checkEmail(req.body.email)
        if (!emailExist) next()
        else
            res.status(statusCode.clientError.badRequest).end(
                `Email already exist`
            )
    } catch (error) {
        res.status(statusCode.clientError.unauthorized).end(`Can't register`)
    }
}

export default checkEmail
