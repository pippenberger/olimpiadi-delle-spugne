// src/api/matches.js
import { supabase } from '../supabaseClient';

// 📥 Alle Matches abrufen
export async function fetchMatches() {
  const { data, error } = await supabase
    .from('matches')
    .select('*');

  if (error) {
    console.error('Fehler beim Abrufen der Matches:', error.message);
    return [];
  }

  return data;
}

// 📤 Ein Match speichern oder aktualisieren
export async function upsertMatch(match) {
  const { error } = await supabase
    .from('matches')
    .upsert([match], { onConflict: ['id'] });

  if (error) {
    console.error('Fehler beim Speichern des Matches:', error.message);
  }
}