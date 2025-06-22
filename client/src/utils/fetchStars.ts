// src/utils/fetchStars.ts
import type { ApodResponse } from '~types/apod.types';

export async function fetchStars(birthday: string): Promise<ApodResponse[]> {
  const res = await fetch(`http://localhost:4000/api/stars-of-the-past?birthday=${birthday}`);
  if (!res.ok) throw new Error('Failed to fetch from backend');
  return await res.json();
}
