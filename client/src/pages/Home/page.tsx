// src/pages/Home/page.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DateButton from "./components/DateButton";
import DatePicker from "./components/DatePicker";

const Home = () => {
  const [date, setDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }
    const formattedDate = date.toISOString().split("T")[0];
    navigate(`/gallery?birthday=${formattedDate}`);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center pt-12 px-4"
      style={{ backgroundImage: `url('/assets/background.jpg')` }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        <h1 className="text-white text-5xl font-bold mb-20 drop-shadow-[0_0_8px_silver] font-serif text-center">
          Stars of the Past
        </h1>

     
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
         
          <div
            className="
              bg-white/20 backdrop-blur-lg 
              border border-white/30 
              rounded-xl shadow-lg 
              p-6 text-gray-100 font-serif 
              text-lg leading-relaxed [text-shadow:0_0_4px_silver]
            "
          >
            <p>
              <strong>
                Just type in your special date - like a birthday, anniversary,
                or any big moment - and we’ll pull up the Astronomy Picture of
                the Day for that same day every year. Then sit back and enjoy:
                dazzling stars, colorful nebulae, and amazing space scenes
                marking your milestone, letting you feel the wonder of the
                universe again and again.
              </strong>
            </p>
            <p className="mt-4 italic text-sm text-gray-300">
              Please note: APOD archives begin on June 16, 1995. No images are
              available for dates earlier than this.
            </p>
          </div>

         
          <div className="flex items-center gap-4 self-center justify-self-end">
            <DatePicker value={date} onChange={setDate} />
            <DateButton
              label="Explore Your Cosmic Album"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
