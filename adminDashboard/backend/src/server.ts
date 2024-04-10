import express from 'express'
import roomTypeRoute from './routes/roomType.route'

const app = express()
app.use(express.json())

const port = 4000

app.use('/api/', roomTypeRoute)

if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
}

export default app
