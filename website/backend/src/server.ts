import express from 'express'
import customerRoute from './routes/customer.routes'
import cron from 'node-cron'
import offerUpdateSchedule from './scheduled-events/offerUpdate'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const port = 4000

// cron.schedule('*/1 * * * *', offerUpdateSchedule)
app.use('/api/', customerRoute)
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 4000
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

export default app
