import express from 'express'
import customerRoute from './routes/customer.routes'

const app = express()
app.use(express.json())

const port = 4000

app.use('/api/', customerRoute)

app.listen(port, () => console.log(`server is running on port ${port}`))

export default app
