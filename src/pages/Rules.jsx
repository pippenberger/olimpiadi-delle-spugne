import React from 'react';

export default function Rules() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Regelwerk</h1>
      <p>Willkommen bei den <strong>Olimpiadi delle spugne</strong>!</p>
      <ul>
        <li>Jede Person spielt pro Disziplin <strong>3 Matches</strong>.</li>
        <li>Die Disziplinen sind: <strong>Billard, Tischtennis, Schwimmen, Badminton</strong>.</li>
        <li>Die Gegner:innen werden zufällig, aber ausgeglichen (2 Männer & 1 Frau oder umgekehrt) verteilt.</li>
        <li>Ergebnisse werden von den Spielenden selbst eingetragen.</li>
        <li>Ein Sieg zählt <strong>3 Punkte</strong>, ein Unentschieden <strong>1 Punkt</strong>.</li>
        <li>Die Gesamtpunktzahl ergibt sich aus allen Matches.</li>
      </ul>
    </div>
  );
}
