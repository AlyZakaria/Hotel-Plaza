import express from 'express'
import roomTypeRoute from './routes/roomType.route'
import imageRouter from './routes/image.route'
import roomRoute from './routes/room.route'
import path from 'path'
const app = express()
app.use('/images', express.static('assets'))
app.use(express.json())

const port = 4000

app.use('/api/', roomTypeRoute)
app.use('/api/', imageRouter)
app.use('/api/', roomRoute)
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

export default app
