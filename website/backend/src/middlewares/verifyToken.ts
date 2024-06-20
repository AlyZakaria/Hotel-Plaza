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
        // console.log(authHeader)
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase()
            const token = authHeader.split(' ')[1]
            if (token && bearer === 'bearer') {
                const decoded: any = verify(token, TOKEN as unknown as string)
                let dateNow = new Date()
                if (decoded && decoded.exp < dateNow.getTime() - decoded.iat) {
                    if (req.body) Object.assign(req.body, decoded)
                    else
                    req.body = decoded
                    
                    next()
                } else throw new Error()
            } else throw new Error()
        } else throw new Error()
    } catch (error) {
        console.log(error)
        res.status(statusCode.clientError.unauthorized).send(
            `User is not verified`
        )
    }
}

export default verifyToken
