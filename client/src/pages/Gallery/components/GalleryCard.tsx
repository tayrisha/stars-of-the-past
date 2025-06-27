import { useState } from "react";
import type { ApodResponse } from "~types/apod.types";

interface Props {
  image: ApodResponse;
}

const GalleryCard = ({ image }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
  <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow-lg max-w-4xl w-full flex flex-col md:flex-row h-full">
      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-48 md:h-auto flex-shrink-0 rounded overflow-hidden mb-4 md:mb-0 md:mr-6">
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

      {/* Text Section */}
      <div className="flex flex-col justify-start flex-grow overflow-hidden text-left">
        <h2 className="text-xl md:text-2xl font-semibold italic text-yellow-100 mb-2 drop-shadow">
          {image.title}
        </h2>
        <p className="text-sm text-gray-300 mb-2">{image.date}</p>
        <div className="overflow-y-auto text-sm md:text-base text-gray-200 pr-1 whitespace-pre-line flex-grow">
          {image.explanation}
        </div>
      </div>
    </div>
  );
};

export default GalleryCard;
