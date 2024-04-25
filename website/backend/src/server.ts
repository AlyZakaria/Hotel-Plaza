import express from 'express'
import customerRoute from './routes/customer.routes'
import cron from 'node-cron'
import offerUpdateSchedule from './scheduled-events/offerUpdate'
import otpTokenDelete from './scheduled-events/otpTokenDelete'
import cors from 'cors'
import roomTypesRoute from './routes/roomTypes.routes'
import availabilityRoute from './routes/availability.routes'

const app = express()
app.use(express.json())
app.use(cors())

const port = 4000

// cron.schedule('*/1 * * * *', offerUpdateSchedule)

// will check every 6 hours if the otp token is expired
cron.schedule('0 */6 * * *', otpTokenDelete)

app.use('/api/', customerRoute)
app.use('/api/', roomTypesRoute)
app.use('/api/', availabilityRoute)

if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 4000
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

export default app
