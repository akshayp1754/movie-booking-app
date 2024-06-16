import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import logger,{morganMiddleware} from './logger'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth'
import postRoutes from './routes/post'
import bookingRoutes from './routes/booking'
import { connectDB } from './utils/db.utils'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import payment from './routes/payment'
import { Theatre } from './db'



const app = express()
const PORT = process.env.PORT || 8080

connectDB()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(morganMiddleware)
app.use('/auth', authRoutes)
app.use('/post', postRoutes)
app.use('/seat', bookingRoutes)
app.use('/admin', postRoutes)
app.use('/payment', payment)

app.get('/', (req, res) =>{
    res.send(`Server is running `)
})

const seedTheatres = async () => {
  
    const theatres = [
      {
        name: 'PVR',
        location: 'swargate pune',
        screens: ['Screen 1', 'Screen 2'],
      },
      {
        name: 'INOX',
        location: 'baner pune',
        screens: ['Screen 1', 'Screen 2'],
      },
    ];
  
    try {
      await Theatre.insertMany(theatres);
      console.log('Data inserted');
      process.exit();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
//   seedTheatres();

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`)
    console.log(`Server is listening on port ${PORT}`)
})