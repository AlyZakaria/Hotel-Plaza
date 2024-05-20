import express from 'express'
import cors from 'cors'
import roomTypeRoute from './routes/roomType.route'
import imageRouter from './routes/image.route'
import roomRoute from './routes/room.route'
import offerRoute from './routes/offer.route'

const app = express()
app.use('/images', express.static('assets'))
app.use(express.json({ limit: '100mb' }))

const port = 4000

// Enable CORS
app.use(cors())

app.use('/api/', roomTypeRoute)
app.use('/api/', imageRouter)
app.use('/api/', roomRoute)
app.use('/api/', offerRoute)
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

export default app
