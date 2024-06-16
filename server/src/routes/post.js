import { Router } from "express";
const router = Router();
import upload from "../utils/uploader";
import { isAuthenticated } from "../middlewares/auth";
import {assignMovie, createMovie, getAllAssignments, getAllMovies, theatreDetails} from '../controllers/post'

router.post("/movie", isAuthenticated, upload.single("image"), createMovie);

router.get("/theatre", theatreDetails)

router.get("/getMovies", getAllMovies)

router.post('/assignMovie', assignMovie) 

router.get('/getMovie', getAllAssignments)

export default router;
