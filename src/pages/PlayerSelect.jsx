// src/pages/PlayerSelect.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function PlayerSelect() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('player1, player2');

      if (error) {
        console.error('Fehler beim Laden der Spieler:', error.message);
      } else {
        const uniquePlayers = Array.from(
          new Set([...data.flatMap(match => [match.player1, match.player2])])
        ).sort();
        setPlayers(uniquePlayers);
      }
    };

    fetchPlayers();
  }, []);

  const handleSelect = (name) => {
    navigate(`/player/${encodeURIComponent(name)}`);
  };

  return (
    <div>
      <h1>Wer bist du?</h1>
      <ul>
        {players.map(name => (
          <li key={name}>
            <button onClick={() => handleSelect(name)}>{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
