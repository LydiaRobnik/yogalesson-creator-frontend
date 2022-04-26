import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.scss';

const navLinks = [
  { path: '/home', name: 'Home', icon: null },
  { path: '/user/dashboard', name: 'Dashboard', icon: null },
  { path: '/user/planner', name: 'Planner', icon: null },
];

export default function LoginModal() {
  const { loggedIn, login, logout, user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    const result = await login({
      user: name,
      type: 'username',
      password: password,
    });

    if (!result) {
      setError('Invalid username or password!');
    } else {
      setName('');
      setPassword('');
    }
  }

  return (
    <nav className="flex justify-between gap-5 pt-4">
      <div className="flex gap-5">
        {navLinks.map(({ path, name, icon }) => (
          <NavLink
            key={path}
            data-hover={name}
            className={({ isActive }) =>
              `${isActive ? 'border-dashed border-b-2' : 'opacity-60'}`
            }
            to={path}
          >
            {name}
          </NavLink>
        ))}
      </div>
      <div>
        {loggedIn ? (
          <div>
            <span className="pr-2 text-sm color-5">Hi {user.name}</span>
            <button className="btn-blue py-0" onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex gap-4 color-primary">
            <input
              className="px-1 rounded-lg w-32"
              type="text"
              minLength={3}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
            />
            <input
              className="px-1 rounded-lg w-32"
              type="password"
              minLength={4}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="submit"
              className="border-dashed border-b-2 hover:text-red-800"
            >
              Login
            </button>
            {error && (
              <div className="text-sm pl-5 pt-2 text-red-500">{error}</div>
            )}
          </form>
        )}
      </div>
    </nav>
  );
}
