import axios from 'axios';
import { ApodResponse } from '../types/apod.types';

const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';


const cache = new Map<string, ApodResponse>();

export async function fetchApodByDate(date: string): Promise<ApodResponse | null> {
  if (cache.has(date)) {
    return cache.get(date)!; 
  }

  try {
    const response = await axios.get<ApodResponse>(BASE_URL, {
      params: {
        date,
        api_key: API_KEY,
      },
    });

    const data = response.data;

    
    if (data.media_type !== 'image') {
      return null;
    }

    cache.set(date, data); 
    return data;
  } catch (error: any) {
    console.error(`Error fetching APOD for ${date}:`, error.message);
    return null; 
  }
}
