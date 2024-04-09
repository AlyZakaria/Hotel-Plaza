import express from 'express'
import customerRoute from './routes/customer.routes'

const app = express()
app.use(express.json())

const port = 4000

app.use('/api/', customerRoute)
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }


export default app
