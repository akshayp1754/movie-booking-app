import express from 'express'
const app = express()
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
import { log } from 'console'



const PORT = process.env.PORT || 3000

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

console.log(PORT)
app.get('/', (req, res) =>{
    res.send(`Server is running `)
})



app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}`)
    console.log(`Server is listening on port ${PORT}`)
})