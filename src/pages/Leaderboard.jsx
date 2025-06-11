import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase.from('matches').select('*');

      if (error) {
        console.error('❌ Fehler beim Laden der Matches:', error.message);
        return;
      }

      const points = {};

      for (const match of data) {
        const { player1, player2, score1, score2 } = match;
        if (score1 === null || score2 === null) continue;

        if (!points[player1]) points[player1] = 0;
        if (!points[player2]) points[player2] = 0;

        if (score1 > score2) points[player1] += 1;
        else if (score2 > score1) points[player2] += 1;
        // kein Punkt bei Gleichstand
      }

      const scoreArray = Object.entries(points).map(([name, score]) => ({ name, score }));
      scoreArray.sort((a, b) => b.score - a.score);

      setScores(scoreArray);
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h1>🏆 Leaderboard</h1>
      {scores.length === 0 ? (
        <p>Noch keine Ergebnisse vorhanden.</p>
      ) : (
        <ol>
          {scores.map(({ name, score }) => (
            <li key={name}>
              {name}: {score} Punkt{score !== 1 ? 'e' : ''}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}