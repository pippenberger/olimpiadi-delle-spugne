import { useEffect, useState } from 'react';
import { fetchMatches, upsertMatch } from '../api/matches';
import { PARTICIPANTS } from '../config';

export default function MatchInput() {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchMatches();
      setMatches(data);
    }
    load();
  }, []);

  const myMatches = matches.filter(
    (match) => match.player1 === selectedPlayer || match.player2 === selectedPlayer
  );

  const handleScoreChange = (matchId, field, value) => {
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId ? { ...m, [field]: value } : m
      )
    );
  };

  const handleSave = async (match) => {
    await upsertMatch(match);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Dein Spielplan</h1>

      <select
        value={selectedPlayer}
        onChange={(e) => setSelectedPlayer(e.target.value)}
        className="p-2 border mb-6 w-full"
      >
        <option value="">— Bitte Namen auswählen —</option>
        {PARTICIPANTS.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {myMatches.map((match) => (
        <div key={match.id} className="border p-3 mb-4 rounded">
          <div className="mb-2">
            <strong>{match.player1}</strong> vs. <strong>{match.player2}</strong> ({match.discipline})
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              className="border p-1 w-16"
              value={match.score1 ?? ''}
              onChange={(e) =>
                handleScoreChange(match.id, 'score1', parseInt(e.target.value, 10))
              }
              placeholder={`${match.player1}`}
            />
            <input
              type="number"
              className="border p-1 w-16"
              value={match.score2 ?? ''}
              onChange={(e) =>
                handleScoreChange(match.id, 'score2', parseInt(e.target.value, 10))
              }
              placeholder={`${match.player2}`}
            />
            <button
              onClick={() => handleSave(match)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Speichern
            </button>
          </div>
        </div>
      ))}

      {selectedPlayer && myMatches.length === 0 && (
        <p className="mt-4 text-gray-500">Keine Spiele für {selectedPlayer} gefunden.</p>
      )}
    </div>
  );
}
