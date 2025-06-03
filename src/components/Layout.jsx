import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">🏠 Home</Link> |{' '}
        <Link to="/input">📥 Ergebnisse</Link> |{' '}
        <Link to="/leaderboard">📊 Punktestand</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;