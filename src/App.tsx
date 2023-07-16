import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

import { RouterPath } from './types';

import Journal from './pages/Journal/Journal';
import Start from './pages/Start/Start';

const App = (): JSX.Element => {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path={RouterPath.Start} element={<Start />} />
        <Route path={RouterPath.Journal} element={<Journal />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
