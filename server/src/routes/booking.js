import express from 'express'
import { bookSeats, getAllBookedSeats } from '../controllers/booking';

const router = express.Router()

router.post('/bookings', bookSeats)

router.get('/getbookings', getAllBookedSeats)

export default router;