import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MatchInput from './pages/MatchInput';
import Leaderboard from './pages/Leaderboard';
import Layout from './components/Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="input" element={<MatchInput />} />
        <Route path="leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
}