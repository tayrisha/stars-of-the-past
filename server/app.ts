// server/app.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import starsOfThePastRoutes from './routes/starsOfThePast.route';

dotenv.config();

const app = express();


app.use(cors());               
app.use(express.json());       


app.use('/api', starsOfThePastRoutes); 


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
