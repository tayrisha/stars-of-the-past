import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchStars } from "@utils/fetchStars";
import type { ApodResponse } from "~types/apod.types";
import GalleryCard from "./components/GalleryCard";

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const birthday = searchParams.get("birthday");
  const [data, setData] = useState<ApodResponse[]>([]);
  const [index, setIndex] = useState(0);
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
        setIndex(0);
      } catch (err) {
        console.error(err);
        setError("Failed to load APOD data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [birthday]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % data.length);
      }
      if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + data.length) % data.length);
      }
    },
    [data.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!birthday) return <p>No birthday provided.</p>;
  if (loading) return <p>Loading your stars... 🌌</p>;
  if (error) return <p>{error}</p>;
  if (!data.length) return <p>No images found for this date.</p>;

  const current = data[index];

  return (
    <div className="relative w-screen h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/background.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white text-center">
        <GalleryCard image={current} />

        <div className="flex justify-between items-center mt-6 w-full max-w-3xl px-6">
          <button
            onClick={() => {
              if (data.length > 1) {
                setIndex((prev) => (prev - 1 + data.length) % data.length);
              }
            }}
            className="text-lg italic px-5 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-all shadow-md backdrop-blur-sm text-yellow-200 tracking-wide font-serif drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]"
          >
            ◀ Prev
          </button>

          <span className="text-sm italic text-yellow-100 font-light tracking-wider drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
            {index + 1} / {data.length}
          </span>

          <button
            onClick={() => {
              if (data.length > 1) {
                setIndex((prev) => (prev + 1) % data.length);
              }
            }}
            className="text-lg italic px-5 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-all shadow-md backdrop-blur-sm text-yellow-200 tracking-wide font-serif drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
