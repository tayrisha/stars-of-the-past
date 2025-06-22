import { Router } from 'express';
import { getStarsOfThePast } from '../controllers/starsOfThePast.controller';

const router = Router();

router.get('/stars-of-the-past', getStarsOfThePast);

export default router;
