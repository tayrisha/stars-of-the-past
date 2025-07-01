import { RequestHandler } from 'express';
import { fetchApodByDate } from '../services/nasa.service';
import { ApodResponse } from '../types/apod.types';

/**
 * GET /api/stars-of-the-past?birthday=YYYY-MM-DD
 * For each year from birth → now, fetch that day's APOD.
 */
export const getStarsOfThePast: RequestHandler = async (req, res) => {

  const birthdayParam = req.query.birthday;
  if (!birthdayParam || typeof birthdayParam !== 'string') {
    res
      .status(400)
      .json({ error: 'Missing or invalid `birthday` query parameter. Use YYYY-MM-DD.' });
    return; 
  }


  const birthDate = new Date(birthdayParam);
  if (isNaN(birthDate.getTime())) {
    res
      .status(400)
      .json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    return;
  }

  const birthYear   = birthDate.getFullYear();
  const month       = birthDate.getMonth();  
  const day         = birthDate.getDate();
  const currentYear = new Date().getFullYear();

  const results: ApodResponse[] = [];
  for (let year = birthYear; year <= currentYear; year++) {
    const apodDate = new Date(year, month, day);

    
    if (apodDate.getMonth() !== month || apodDate.getDate() !== day) {
      continue;
    }

    const isoDate = apodDate.toISOString().split('T')[0]; 
    const apod    = await fetchApodByDate(isoDate);

    if (apod) {
      results.push(apod);
    }
  }

  res.json(results);
};
