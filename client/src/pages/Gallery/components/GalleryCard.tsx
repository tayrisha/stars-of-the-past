import { useState } from 'react';
import type { ApodResponse } from '~types/apod.types';

interface Props {
  image: ApodResponse;
}

const GalleryCard = ({ image }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur p-6 rounded-lg shadow-lg max-w-2xl w-full">
      <div className="relative w-full h-64 rounded overflow-hidden mb-4">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded" />
        )}
        <img
          src={image.url}
          alt={image.title}
          onLoad={() => setLoaded(true)}
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <h2 className="text-2xl font-semibold mb-2">{image.title}</h2>
      <p className="text-sm text-gray-300 mb-1">{image.date}</p>
      <p className="text-sm text-gray-200">{image.explanation}</p>
    </div>
  );
};

export default GalleryCard;
