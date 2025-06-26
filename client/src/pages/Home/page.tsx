// src/pages/Home/page.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DateButton from './components/DateButton';
import VintageDatePicker from './components/DatePicker'; 

const Home = () => {
  const [date, setDate] = useState<Date | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!date) {
      alert('Please select a date.');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0]; 
    navigate(`/gallery?birthday=${formattedDate}`); 
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex flex-col items-center pt-24 px-4"
      style={{ backgroundImage: `url('/assets/background.jpg')` }} // fixed background syntax
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 text-center w-full max-w-md">
        <h1 className="text-white text-4xl font-bold mb-6 drop-shadow font-serif">
          Stars of the Past
        </h1>

        <VintageDatePicker value={date} onChange={setDate} />

        <DateButton label="Explore Your Cosmic Album" onClick={handleClick} />
      </div>
    </div>
  );
};

export default Home;
