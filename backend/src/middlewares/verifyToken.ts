import express from 'express'
import { verify } from 'jsonwebtoken'

const Token = process.env.TOKEN

const verifyToken = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const authHeader = req.get('Authorization')
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase()
            const token = authHeader.split(' ')[1]
            if (token && bearer === 'bearer') {
                const decoded = verify(token, Token as unknown as string)
                if (decoded) {
                    console.log(decoded)
                    next()
                } else throw new Error()
            } else throw new Error()
        } else throw new Error()
    } catch (error) {
        res.status(404).send(`User is not verified`)
    }
}

export default verifyToken
