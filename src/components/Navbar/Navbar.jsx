import React, { useContext, useState } from 'react';
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
  const { loggedIn, login, logout, user } = useContext(AuthContext);
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const [open, setOpen] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [SignupModalOpen, setSignupModalOpen] = useState(false);

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
      <LoginModal ModalOpen={ModalOpen} setModalOpen={setModalOpen} />
      <SignupModal
        SignupModalOpen={SignupModalOpen}
        setSignupModalOpen={setSignupModalOpen}
      />
      <Disclosure as="nav" className="bg-light color">
        {({ open }) => (
          <>
            <div className="navbar px-2 sm:px-5">
              <div className="relative flex items-center justify-between h-16">
                {loggedIn && (
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden mx-auto">
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

                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start pl-0">
                  <NavLink to={'/'}>
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto height pr-3"
                        src="https://yogalesson-createor-backend.herokuapp.com/images/Logo_250x250px.png"
                        alt="Workflow"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto pr-3"
                        src="https://yogalesson-createor-backend.herokuapp.com/images/Logo_250x250px.png"
                        alt="Workflow"
                      />
                      <p className="color-blue-darkest ml-2 text-2xl mt-1">
                        Flowting Ananas<br></br>
                        <p className="text-sm">Smooth Class planning</p>
                      </p>
                    </div>
                  </NavLink>

                  {loggedIn && (
                    <div className="hidden sm:block sm:ml-6 self-center ">
                      <div className="flex space-x-4">
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
                        className="bg-red hover:bg-red-500 text-white font-bold py-3 px-10"
                        onClick={() => setModalOpen(true)}
                      >
                        login
                      </button>
                      <button
                        className="hover:underline text-color-blue-darkest py-2 px-10 pr-10"
                        onClick={() => setSignupModalOpen(true)}
                      >
                        sign up
                      </button>
                      {/* {error && (
                        <div className="text-sm pl-5 pt-2 text-red-500">
                          {error}
                        </div>
                      )} */}
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
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
