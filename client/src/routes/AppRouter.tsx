// src/routes/AppRouter.tsx
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home/page';
import Gallery from '@pages/Gallery/page';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
};

export default AppRouter;
