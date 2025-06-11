import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Layout = () => {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">🏠 Home</Link> |{' '}
        <Link to="/input">📥 Ergebnisse</Link> |{' '}
        <Link to="/leaderboard">📊 Punktestand</Link>
        <Link to="/">Start</Link> |{' '}
  <Link to="/leaderboard">Leaderboard</Link> |{' '}
  <Link to="/rules">Regelwerk</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
