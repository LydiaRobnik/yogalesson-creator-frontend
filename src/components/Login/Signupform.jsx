import { LockClosedIcon } from '@heroicons/react/solid';
import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/app.scss';

export default function Example({ SignupModal, setSignupModal }) {
  const { loggedIn, login, logout, user, signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError('');

    const result = await signup({
      email: name,
      username: name.split('@')[0],
      password: password,
      validated: false
    });

    if (!result) {
      setError('Invalid username or password!');
    } else {
      setName('');
      setPassword('');
      navigate(`/signupInfo`);
      setSignupModal(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <lottie-player
              src="https://assets3.lottiefiles.com/packages/lf20_13s8e4bb.json"
              background="transparent"
              speed="1"
              style={{ width: '100%', height: '200px', self: 'center' }}
              loop
              autoplay
            ></lottie-player>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign up
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSignup}
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  minLength={3}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={4}
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
                Create Account
              </button>
              {error && (
                <div className="text-sm pl-5 pt-2 text-red-500">{error}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
