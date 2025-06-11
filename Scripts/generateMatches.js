import fetch from 'cross-fetch';
globalThis.fetch = fetch;
import 'dotenv/config';
import { supabase } from '../src/supabaseClient.js';
import lodash from 'lodash';
const { shuffle } = lodash;


// Liste der Teilnehmer:innen
const PARTICIPANTS = [
  'Neele', 'Moritz', 'Freddy', 'Lisa', 'Janno', 'Sarah', 'Pippo',
  'Marie', 'Ronja', 'Sebi', 'Mene', 'Yannik', 'Christiane', 'Philipp'
];

// Disziplinen
const DISCIPLINES = ['Billard', 'Tischtennis', 'Schwimmen', 'Badminton'];

// Für jede Disziplin generieren wir 3 Matches pro Person
function generateMatchesForDiscipline(players, discipline) {
  const matches = [];
  const matchCount = 3;

  for (const player of players) {
    const opponents = shuffle(players.filter(p => p !== player));
    const selectedOpponents = opponents.slice(0, matchCount);

    for (const opponent of selectedOpponents) {
      const sortedPlayers = [player, opponent].sort(); // gleiche Paarung = gleiche Reihenfolge
      const matchId = `${discipline}:${sortedPlayers[0]}_vs_${sortedPlayers[1]}`;
      if (!matches.find(m => m.id === matchId)) {
        matches.push({
          id: matchId,
          discipline,
          player1: sortedPlayers[0],
          player2: sortedPlayers[1],
          score1: null,
          score2: null,
        });
      }
    }
  }

  return matches;
}

async function main() {
  const allMatches = DISCIPLINES.flatMap(discipline =>
    generateMatchesForDiscipline(PARTICIPANTS, discipline)
  );

  const { error } = await supabase.from('matches').insert(allMatches);

  if (error) {
    console.error('❌ Fehler beim Einfügen in Supabase:', error.message);
  } else {
    console.log('✅ Matches wurden erfolgreich generiert und in Supabase gespeichert!');
  }
}

main();