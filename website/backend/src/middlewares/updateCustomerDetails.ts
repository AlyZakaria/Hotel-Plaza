import express from 'express'

const updateCustomerDetails: express.RequestHandler = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        let id = Number(req.body.body.id)
        const customer: any = req.body.body
        delete customer['id']

        // get all data of customer and update it
        req.body = {
            customer,
            id,
        }
        next()
    } catch (err) {}
}

export default updateCustomerDetails
