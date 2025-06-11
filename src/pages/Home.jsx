import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PARTICIPANTS } from '../config';

export default function Home() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') return;
    navigate(`/${name}`);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center' }}>
      <h1>Olimpiadi delle spugne</h1>
      <p>Wähle deinen Namen:</p>
      <form onSubmit={handleSubmit}>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          <option value="">– bitte auswählen –</option>
          {PARTICIPANTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <br />
        <button type="submit" style={{ marginTop: '1rem' }}>
          Zu deinem Spielplan
        </button>
      </form>
    </div>
  );
}
