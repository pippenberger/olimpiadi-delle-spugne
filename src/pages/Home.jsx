import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { DISCIPLINES, PARTICIPANTS } from '../config';

export default function MatchInput() {
  const [form, setForm] = useState({
    discipline: DISCIPLINES[0],
    player1: '',
    player2: '',
    winner: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('matches').insert([form]);
    if (error) alert('Fehler beim Eintragen: ' + error.message);
    else alert('Match eingetragen!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>🎯 Match eintragen</h2>
      <label>
        Disziplin:
        <select name="discipline" value={form.discipline} onChange={handleChange}>
          {DISCIPLINES.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Spieler:in 1:
        <select name="player1" value={form.player1} onChange={handleChange}>
          <option value="">--</option>
          {PARTICIPANTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Spieler:in 2:
        <select name="player2" value={form.player2} onChange={handleChange}>
          <option value="">--</option>
          {PARTICIPANTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Gewinner:in:
        <select name="winner" value={form.winner} onChange={handleChange}>
          <option value="">--</option>
          {PARTICIPANTS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Eintragen</button>
    </form>
  );
}