import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchStars } from '@utils/fetchStars';
import type { ApodResponse } from '~types/apod.types';

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const birthday = searchParams.get('birthday');
  const [data, setData] = useState<ApodResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!birthday) return;

    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        const stars = await fetchStars(birthday);
        setData(stars);
      } catch (err) {
        console.error(err);
        setError('Failed to load APOD data');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [birthday]);

  if (!birthday) return <p>❗No birthday provided.</p>;
  if (loading) return <p>Loading your stars... 🌌</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.date} className="border p-2 rounded shadow">
            <img src={item.url} alt={item.title} className="w-full h-auto mb-2" />
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.date}</p>
            <p className="text-sm">{item.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
