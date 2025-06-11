import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MatchInput from './pages/MatchInput.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Layout from './components/Layout.jsx';
import PlayerMatches from './pages/PlayerMatches.jsx'; // Wird per :name aufgerufen
import Rules from './pages/Rules.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="input" element={<MatchInput />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path=":name" element={<PlayerMatches />} />
        <Route path="rules" element={<Rules />} />
      </Route>
    </Routes>
  );
}
