import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import otpToken from '../interfaces/otpToken'

// make function as middleware to verify the otp token and not expired
const tokenSecret = process.env.TOKEN

const verifyOtpToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization')
    console.log(authHeader)
    if (authHeader) {
        const bearer = authHeader.split(' ')[0].toLowerCase()
        const token = authHeader.split(' ')[1]
        if (token && bearer === 'bearer') {
            const decoded: otpToken | any = verify(
                token,
                tokenSecret as unknown as string
            )
            let dateNow = new Date()
            if (decoded && decoded.exp < dateNow.getTime() - decoded.iat) {
                req.body['token'] = decoded
                next()
            } else throw new Error()
        } else throw new Error()
    } else throw new Error()
}

// body => {old, new}  => {email, old, new}
export default verifyOtpToken
