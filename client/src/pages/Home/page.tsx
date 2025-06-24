// src/pages/Home/page.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DateButton from './DateButton';

const Home = () => {
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    if (!date) {
      alert('Please select a date.');
      return;
    }
    navigate(`/gallery?birthday=${date}`);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/background.jpg')` }}
    >
      {/* Optional: dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-white text-4xl font-bold mb-6 drop-shadow">
          Stars of the Past
        </h1>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-4 py-2 rounded mb-4 text-black"
        />

        <div>
          <DateButton label="Explore Your Cosmic Album" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Home;
