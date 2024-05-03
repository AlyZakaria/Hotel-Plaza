import express from 'express'
import { verify } from 'jsonwebtoken'
import { TOKEN } from '../config/constants'
import { statusCode } from '../constants/statusCode'

const verifyToken: express.RequestHandler = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const authHeader = req.get('Authorization')
        console.log(authHeader)
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase()
            const token = authHeader.split(' ')[1]
            console.log(token)
            if (token && bearer === 'bearer') {
                const decoded = verify(token, TOKEN as unknown as string)
                if (decoded) {
                    console.log(decoded)
                    next()
                } else throw new Error()
            } else throw new Error()
        } else throw new Error()
    } catch (error) {
        console.log('here')
        res.status(statusCode.clientError.unauthorized).send(
            `User is not verified`
        )
    }
}

export default verifyToken
