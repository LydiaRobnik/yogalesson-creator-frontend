import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './style/navbar.scss';

export default function Navbar() {
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
    <nav className="flex gap-5 pt-4">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/user">Dashboard</NavLink>
      <NavLink to="/user/planner">Planner</NavLink>
      {loggedIn ? (
        <div>
          <span className="pr-2 text-sm text-green-300">Hi {user.name}</span>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="flex gap-4 color-primary">
          <input
            className="p-1 rounded-lg w-32"
            type="text"
            minLength={3}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
          />
          <input
            className="p-1 rounded-lg w-32"
            type="password"
            minLength={4}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
          {error && (
            <div className="text-sm pl-5 pt-2 text-red-500">{error}</div>
          )}
        </form>
      )}
    </nav>
  );
}
