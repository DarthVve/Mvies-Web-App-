import express from 'express';
import { createMovie, viewMovies, aMovie, editMovie, delMovie } from '../controllers/movieController';
import { auth }from '../middleware/auth';
const router = express.Router();


/* GET home page. */
router.post('/add-movie', auth, createMovie);
router.get('/', viewMovies);
router.get('/:id', aMovie);
router.post('/edit/:id', auth, editMovie);
router.post('/delete/:id', auth, delMovie);
export default router;
