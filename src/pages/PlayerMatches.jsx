// src/pages/PlayerMatches.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function PlayerMatches() {
  const { name } = useParams();
  const [matches, setMatches] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .or(`player1.eq.${name},player2.eq.${name}`)
        .order('discipline', { ascending: true });

      if (error) {
        console.error('❌ Fehler beim Laden der Matches:', error.message);
      } else {
        setMatches(data);
      }
    };

    fetchMatches();
  }, [name]);

  const handleScoreChange = (id, playerKey, value) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, [playerKey]: value === '' ? null : Number(value) } : m
      )
    );
  };

  const handleSave = async (match) => {
    setSaving(true);
    const { error } = await supabase
      .from('matches')
      .update({
        score1: match.score1,
        score2: match.score2,
      })
      .eq('id', match.id);

    if (error) {
      alert(`❌ Fehler beim Speichern: ${error.message}`);
    }

    setSaving(false);
  };

  return (
    <div>
      <h1>Dein Spielplan: {name}</h1>
      {matches.length === 0 ? (
        <p>Keine Spiele gefunden.</p>
      ) : (
        <ul>
          {matches.map((match) => (
            <li key={match.id} style={{ marginBottom: '1rem' }}>
              <strong>{match.discipline}</strong>: {match.player1} vs. {match.player2}
              <div>
                <label>
                  {match.player1}:{' '}
                  <input
                    type="number"
                    value={match.score1 ?? ''}
                    onChange={(e) =>
                      handleScoreChange(match.id, 'score1', e.target.value)
                    }
                  />
                </label>
                <label style={{ marginLeft: '1rem' }}>
                  {match.player2}:{' '}
                  <input
                    type="number"
                    value={match.score2 ?? ''}
                    onChange={(e) =>
                      handleScoreChange(match.id, 'score2', e.target.value)
                    }
                  />
                </label>
                <button
                  onClick={() => handleSave(match)}
                  disabled={saving}
                  style={{ marginLeft: '1rem' }}
                >
                  Speichern
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
