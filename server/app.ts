import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import starsOfThePastRoutes from './routes/starsOfThePast.route';


const app = express();


app.use(cors());               
app.use(express.json());       


app.use('/api', starsOfThePastRoutes); 


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
