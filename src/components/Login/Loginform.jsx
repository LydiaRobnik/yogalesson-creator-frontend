import { LockClosedIcon } from '@heroicons/react/solid';
import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/app.scss';

export default function Example({ ModalOpen, setModalOpen }) {
  const { loggedIn, login, logout, user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError('');

    const result = await login({
      user: name,
      type: name.includes('@') ? 'email' : 'username',
      password: password
    });

    if (!result) {
      setError('Invalid username or password!');
    } else {
      setName('');
      setPassword('');
      navigate(`/user/dashboard`);
      setModalOpen(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col justify-center">
            <lottie-player
              src="https://assets9.lottiefiles.com/private_files/lf30_m6j5igxb.json"
              background="transparent"
              speed="0.5"
              style={{ width: '100%', height: '200px', self: 'center' }}
              loop
              autoplay
            ></lottie-player>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleLogin}
            action="#"
            method="POST"
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-[#738b94] focus:z-10 sm:text-sm"
                  placeholder="E-Mail or Username"
                  onChange={(e) => setName(e.target.value)}
                  minLength={3}
                />
              </div>
              <div className="pt-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-[#738b94] focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={4}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 pt-1 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm pt-1">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#c94d4e] hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-white group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
                Sign in
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
