import express from 'express'
import cron from 'node-cron'
import cors from 'cors'
import bodyParser from 'body-parser'
import offerUpdateSchedule from './scheduled-events/offerUpdate'
import otpTokenDelete from './scheduled-events/otpTokenDelete'
import customerRoute from './routes/customer.routes'
import {
    roomTypesRoute,
    availabilityRoute,
    resetPasswordRoute,
    bookingRoute,
} from './routes'
import { NODE_ENV, PORT } from './config/constants'

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Origin',
            'X-Requested-With',
            'Accept',
        ],
    })
)

// cron.schedule('*/1 * * * *', offerUpdateSchedule)

// will check every 6 hours if the otp token is expired
cron.schedule('0 */6 * * *', otpTokenDelete)

app.use('/api/', customerRoute)
app.use('/api/', resetPasswordRoute)
app.use('/api/', roomTypesRoute)
app.use('/api/', availabilityRoute)
app.use('/api/', bookingRoute)

if (NODE_ENV !== 'test') {
    const port = PORT || 3000
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

export default app
