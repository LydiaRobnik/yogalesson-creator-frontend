import { LockClosedIcon, XIcon, CheckIcon } from '@heroicons/react/solid';
import { AuthContext } from '../../context/AuthContext';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/app.scss';

export default function Example({ SignupModal, setSignupModal }) {
  const { loggedIn, login, logout, user, signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkuppercase, setCheckuppercase] = useState(false);
  const [checkpwlength, setCheckpwlength] = useState(false);
  const [checknumber, Setchecknumber] = useState(false);
  const [checklowercase, Setchecklowercase] = useState(false);

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
    }
    if (password != confirmPassword) {
      setError('Passwords do not match');
    } else {
      setName('');
      setPassword('');
      navigate(`/signupInfo`);
      setSignupModal(false);
    }
  }

  useEffect(() => {
    if (password.length > 7) {
      setCheckpwlength(true);
    }
    if (password.length < 8) {
      setCheckpwlength(false);
    }
    if (/[A-Z]/.test(password)) {
      setCheckuppercase(true);
    }
    if (!/[A-Z]/.test(password)) {
      setCheckuppercase(false);
    }
    if (/[0-9]/.test(password)) {
      Setchecknumber(true);
    }
    if (!/[0-9]/.test(password)) {
      Setchecknumber(false);
    }
    if (/[a-z]/.test(password)) {
      Setchecklowercase(true);
    }
    if (!/[a-z]/.test(password)) {
      Setchecklowercase(false);
    }
  }, [password]);

  return (
    <>
      <div className="flex items-center justify-center py-4 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <lottie-player
              src="https://assets8.lottiefiles.com/packages/lf20_kkflmtur.json"
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
            <div className="-space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Username
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-_]+\.[a-z]{2,}$"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-[#738b94] focus:z-10 sm:text-sm"
                  placeholder="E-Mail"
                  minLength={4}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="py-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-[#738b94] focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
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
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-[#738b94] focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                />
              </div>
            </div>
            <div className="color-blue-darkest">
              <h4 className="pb-2">Password must contain the following:</h4>
              <div className="flex">
                {checkuppercase ? (
                  <CheckIcon className="h-5 w-5 text-green-500 inline-flex" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-600 inline-flex" />
                )}
                <p className="inline-flex">an uppercase letter</p>
              </div>
              <div className="flex">
                {checklowercase ? (
                  <CheckIcon className="h-5 w-5 text-green-500 inline-flex" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-600 inline-flex" />
                )}
                <p>a lowercase letter</p>
              </div>
              <div className="flex">
                {checknumber ? (
                  <CheckIcon className="h-5 w-5 text-green-500 inline-flex" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-600 inline-flex" />
                )}
                <p>a number</p>
              </div>
              <div className="flex">
                {checkpwlength ? (
                  <CheckIcon className="h-5 w-5 text-green-500 inline-flex" />
                ) : (
                  <XIcon className="h-5 w-5 text-red-600 inline-flex" />
                )}
                <p className="inline-flex">minimum 8 characters</p>
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
                Create Account
              </button>
              {error && (
                <div className="text-sm pl-5 pt-3 text-red-500">{error}</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
