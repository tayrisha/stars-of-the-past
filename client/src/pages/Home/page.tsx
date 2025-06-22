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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Stars of the Past</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-4 py-2 rounded mb-4"
      />

      <DateButton label="Explore Your Cosmic Album" onClick={handleClick} />
    </div>
  );
};

export default Home;
