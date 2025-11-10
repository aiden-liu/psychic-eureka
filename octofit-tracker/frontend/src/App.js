import React, { useState } from 'react';
import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { path: '/activities', label: 'Activities', element: <Activities /> },
  { path: '/leaderboard', label: 'Leaderboard', element: <Leaderboard /> },
  { path: '/teams', label: 'Teams', element: <Teams /> },
  { path: '/users', label: 'Users', element: <Users /> },
  { path: '/workouts', label: 'Workouts', element: <Workouts /> },
];

const App = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleToggleNav = () => setIsNavCollapsed((prev) => !prev);
  const handleCloseNav = () => setIsNavCollapsed(true);

  return (
    <div className="app-shell">
      <header className="app-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <NavLink to="/activities" className="navbar-brand" onClick={handleCloseNav}>
              <img
                src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
                alt="OctoFit Tracker logo"
                className="navbar-logo"
              />
              <span className="navbar-title">OctoFit Tracker</span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              aria-controls="primaryNavigation"
              aria-expanded={!isNavCollapsed}
              aria-label="Toggle navigation"
              onClick={handleToggleNav}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`}
              id="primaryNavigation"
            >
              <ul className="navbar-nav ms-auto gap-lg-2">
                {navItems.map(({ path, label }) => (
                  <li className="nav-item" key={path}>
                    <NavLink
                      to={path}
                      end
                      className={({ isActive }) =>
                        `nav-link ${isActive ? 'active fw-semibold' : ''}`
                      }
                      onClick={handleCloseNav}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main className="container py-5 content-shell">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          {navItems.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default App;
