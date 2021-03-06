import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import LoginModal from '../Login/LoginModal.jsx';
import SignupModal from '../Login/SignupModal';
import './navbar.scss';

const navigation = [
  { name: 'Dashboard', path: '/user/dashboard', current: false },
  { name: 'Planner', path: '/user/planner', current: false },
  { name: 'Sequences', path: '/user/sequences', current: false },
  { name: 'Asanas', path: '/user/asanas', current: false },
  { name: 'Calendar', path: '/user/calendar', current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const { loggedIn, login, logout, user, showLogin, setShowLogin } =
    useContext(AuthContext);
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const [open, setOpen] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [SignupModalOpen, setSignupModalOpen] = useState(false);

  useEffect(() => {
    if (showLogin) {
      setSignupModalOpen(true);
      setShowLogin(false);
    }
    return () => {};
  }, [showLogin]);

  const handleSwitch = (toLogin = true) => {
    if (toLogin) {
      setModalOpen(true);
      setSignupModalOpen(false);
    } else {
      setSignupModalOpen(true);
      setModalOpen(false);
    }
  };

  // async function handleLogin(e) {
  //   e.preventDefault();
  //   setError('');

  //   const result = await login({
  //     user: name,
  //     type: name.includes('@') ? 'email' : 'username',
  //     password: password
  //   });

  //   if (!result) {
  //     setError('Invalid username or password!');
  //   } else {
  //     setName('');
  //     setPassword('');
  //   }
  // }

  return (
    <>
      <LoginModal
        ModalOpen={ModalOpen}
        setModalOpen={setModalOpen}
        handleSwitch={handleSwitch}
      />
      <SignupModal
        SignupModalOpen={SignupModalOpen}
        setSignupModalOpen={setSignupModalOpen}
        handleSwitch={handleSwitch}
      />
      <Disclosure as="nav" className="bg-light color">
        {({ open }) => (
          <>
            <div
              className={
                loggedIn ? 'navbar px-2 sm:px-5' : 'navbar px-2 xl:px-0 sm:px-5'
              }
            >
              <div className="flex flex-row justify-between w-full h-16 relative">
                {/* <div className="flex flex-row items-center justify-between h-16 relative"> */}
                {loggedIn && (
                  <div className="absolute inset-y-0 left-0 flex items-center md:hidden mx-auto">
                    {/* Mobile menu button*/}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                )}

                <div
                  className={
                    loggedIn
                      ? 'flex-1 flex justify-center md:justify-start pl-20 md:pl-0'
                      : 'flex-1 flex justify-start pl-1'
                  }
                >
                  <NavLink to={'/'}>
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block md:hidden h-8 w-auto justify-self-center"
                        src="https://storage.googleapis.com/monkeyplan-bucket/app/Logo_250x250px.png"
                        alt="Workflow"
                      />

                      <img
                        className="hidden md:block h-8 w-auto pr-3"
                        src="https://storage.googleapis.com/monkeyplan-bucket/app/Logo_250x250px.png"
                        alt="Workflow"
                      />
                      <div
                        className={
                          loggedIn
                            ? 'ml-2 hidden lg:block'
                            : 'ml-2 hidden sm:block'
                        }
                      >
                        <p className="color-blue-darkest sm:text-md md:text-xl mt-1 tracking-[.18em] ">
                          Monkey Plan
                        </p>

                        <p className="sm:text-xs">Create Structured Classes</p>
                      </div>
                    </div>
                  </NavLink>

                  {loggedIn && (
                    <div className="hidden md:block sm:ml-6 self-center ">
                      <div className="flex space-x-2">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                              `${
                                isActive
                                  ? 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium'
                                  : classNames(
                                      item.current
                                        ? 'bg-gray-900 text-white'
                                        : 'color-blue-darkest hover:bg-gray-700 hover:text-white',
                                      'px-3 py-2 rounded-md text-sm font-medium'
                                    )
                              }`
                            }
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="color-blue-darkest">
                  {loggedIn ? (
                    <div>
                      <span className="pr-2 text-sm color-5 invisible md:visible">
                        Hi {user.name}!
                      </span>
                    </div>
                  ) : (
                    <>
                      <button
                        className="bg-red hover:bg-red-500 text-white text-sm py-2 px-3 sm:px-10"
                        onClick={() => setModalOpen(true)}
                      >
                        login
                      </button>
                      <button
                        className="hover:underline text-color-blue-darkest text-sm py-2 px-3 sm:px-8 xl:px-0 xl:pl-8"
                        onClick={() => setSignupModalOpen(true)}
                      >
                        sign up
                      </button>
                    </>
                  )}
                </div>

                <div className="absolute inset-y-0 right-0 flex items-center pr-0 sm:static sm:inset-auto sm:ml-0 sm:pr-0">
                  {/* Profile dropdown */}
                  {loggedIn && (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              user.avatar
                                ? user.avatar
                                : `https://www.kindpng.com/picc/m/21-211456_user-icon-hd-png-download.png`
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <NavLink
                                to={'/user/profile'}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Your Profile
                              </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={() => logout()}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    to={item.path}
                    key={item.name}
                    as="a"
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
