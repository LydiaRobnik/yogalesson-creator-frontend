import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const { loggedIn, login, logout, user, setUser } = useContext(AuthContext);
  const { loading, setErrors, errors } = useOutletContext();

  const [profile, setProfile] = useState({});
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditRole, setIsEditRole] = useState(false);

  useEffect(() => {
    asanaService.getUser(user.id).then((user) => {
      setProfile(user);
    });

    return () => {
      setProfile({});
    };
  }, [user]);

  const handleChangeAvatar = () => {
    console.log('📒 handleChangeAvatar');
  };

  const handleEditName = (e) => {
    e.preventDefault();
    console.log('📒 handleEditName', profile.username);

    asanaService
      .getUser(user.id)
      .then((userDb) => {
        userDb.username = profile.username;

        asanaService
          .changeUsername(userDb._id, userDb)
          .then((user) => {
            setProfile(user);
            setIsEditName(false);
            setUser((prev) => ({ ...prev, name: user.username }));
          })
          .catch((err) => {
            console.log('📒 handleEditName err', err);
          });
      })
      .catch((err) => {
        console.log('📒 handleEditName err', err);
      });
  };

  const handleEditEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('📒 handleEditEmail', profile.email);

    asanaService
      .getUser(user.id)
      .then((userDb) => {
        userDb.email = profile.email;

        asanaService
          .saveUser(userDb._id, userDb)
          .then((user) => {
            setProfile(user);
            setIsEditEmail(false);
            setUser((prev) => ({ ...prev, name: user.username }));
          })
          .catch((err) => {
            console.log('📒 handleEditName err', err);
          });
      })
      .catch((err) => {
        console.log('📒 handleEditName err', err);
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('📒 handleChangePassword', profile.password);

    // check password confirmation
    if (profile.password !== passwordConfirm) {
      console.log('📒 Password confirmation does not match', passwordConfirm);
      setErrors((prev) => [...prev, 'Password confirmation does not match']);
      return;
    }

    asanaService
      .getUser(user.id)
      .then((userDb) => {
        userDb.password = profile.password;

        asanaService
          .changeUserPassword(userDb._id, userDb)
          .then((user) => {
            setProfile(user);
            setIsEditPassword(false);
          })
          .catch((err) => {
            console.log('📒 handleEditName err', err);
          });
      })
      .catch((err) => {
        console.log('📒 handleEditName err', err);
      });
  };

  const handleChangeRole = () => {};

  const handleResetEdits = (e) => {
    e.stopPropagation();
    setIsEditAvatar(false);
    setIsEditName(false);
    setIsEditEmail(false);
    setIsEditPassword(false);
    setIsEditRole(false);
  };

  return (
    <div
      onClick={(e) => handleResetEdits(e)}
      className="flex justify-center border p-4 w-full md:w-3/4 lg:w-1/2 text-black"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsEditAvatar(true);
        }}
        className="flex flex-col justify-center items-center cursor-pointer"
      >
        {/* <div className="text-2xl">{user.name}'s Profile</div> */}

        <img
          className="h-36 w-36 rounded-full"
          src="https://www.kindpng.com/picc/m/21-211456_user-icon-hd-png-download.png"
          alt=""
        />
        {/* username */}
        <div className="relative mt-3">
          {isEditName ? (
            <form className="flex justify-center">
              <div className="flex justify-center">
                <div
                  className="timepicker relative form-floating mb-3 xl:w-96"
                  data-mdb-with-icon="false"
                  id="input-toggle-timepicker"
                >
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Set Username"
                    data-mdb-toggle="input-toggle-timepicker"
                    minLength="3"
                    maxLength={20}
                    required
                    autoFocus
                    defaultValue={profile.username}
                    onChange={(e) =>
                      setProfile((prev) => {
                        prev.username = e.target.value;
                        return { ...prev };
                      })
                    }
                  />
                  <label forhtml="floatingInput" className="text-gray-500">
                    Change Username
                  </label>
                </div>
                <button
                  className="btn-seqColl-neutral ml-3"
                  onClick={(e) => handleEditName(e)}
                >
                  <span className="font-material-symbols px-2 py-1">
                    add_task
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="text-4xl mr-4">{profile.username}</div>
              <div className="absolute top-1 -right-5">
                <button
                  className="btn-seqColl-neutral "
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditName(true);
                  }}
                >
                  <span className="font-material-symbols text-xs px-2 py-1">
                    edit
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="">
          {/* email */}
          <div className="flex relative mt-3">
            {isEditEmail ? (
              <form>
                <div className="flex justify-center">
                  <div
                    className="timepicker relative form-floating mb-3 xl:w-96"
                    data-mdb-with-icon="false"
                    id="input-toggle-timepicker"
                  >
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Set Email"
                      data-mdb-toggle="input-toggle-timepicker"
                      minLength="3"
                      maxLength={20}
                      required
                      autoFocus
                      defaultValue={profile.email}
                      onChange={(e) =>
                        setProfile((prev) => {
                          prev.email = e.target.value;
                          return { ...prev };
                        })
                      }
                    />
                    <label forhtml="floatingInput" className="text-gray-500">
                      Change Email
                    </label>
                  </div>
                  <button
                    className="btn-seqColl-neutral ml-3"
                    onClick={(e) => handleEditEmail(e)}
                  >
                    <span className="font-material-symbols px-2 py-1">
                      add_task
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex relative mt-3">
                <div className="text-md mr-4 w-24 text-right">Email:</div>
                <div className="text-xl mr-4">{profile.email}</div>
                <div className="absolute top-0 -right-5">
                  <button
                    className="btn-seqColl-neutral "
                    onClick={() => setIsEditEmail(true)}
                  >
                    <span className="font-material-symbols text-xs px-2 py-1">
                      edit
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* password */}
          <div className="flex relative mt-3">
            {isEditPassword ? (
              <form
                onSubmit={(e) => handleChangePassword(e)}
                className="flex gap-2 border-dotted border p-2"
              >
                <div className="flex flex-col justify-center">
                  <div
                    className="timepicker relative form-floating mb-3 xl:w-96"
                    data-mdb-with-icon="false"
                    id="input-toggle-timepicker"
                  >
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Set Password"
                      data-mdb-toggle="input-toggle-timepicker"
                      minLength="8"
                      maxLength={20}
                      required
                      autoFocus
                      defaultValue={'*******'}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) =>
                        setProfile((prev) => {
                          prev.password = e.target.value;
                          return { ...prev };
                        })
                      }
                    />
                    <label forhtml="floatingInput" className="text-gray-500">
                      Change Password
                    </label>
                  </div>
                  <div
                    className="timepicker relative form-floating mb-3 xl:w-96"
                    data-mdb-with-icon="false"
                    id="input-toggle-timepicker"
                  >
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Set Password confirm"
                      data-mdb-toggle="input-toggle-timepicker"
                      minLength="8"
                      maxLength={20}
                      required
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <label forhtml="floatingInput" className="text-gray-500">
                      Confirm Password
                    </label>
                  </div>
                </div>
                <button className="btn-seqColl-neutral ml-3">
                  <span className="font-material-symbols px-2 py-1">
                    add_task
                  </span>
                </button>
              </form>
            ) : (
              <div className="flex relative mt-3">
                <div className="text-md mr-4 w-24 text-right">Password: </div>
                <div className="text-xl mr-4">**********</div>
                <div className="absolute -top-1 -right-5">
                  <button
                    className="btn-seqColl-neutral "
                    onClick={() => setIsEditPassword(true)}
                  >
                    <span className="font-material-symbols text-xs px-2 py-1">
                      edit
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {
            /* role */ user.role === 'admin' && (
              <div className="flex relative mt-3">
                {isEditRole ? (
                  <div>edit name</div>
                ) : (
                  <div className="flex relative mt-3">
                    <div className="text-md mr-4 w-24 text-right">Role: </div>
                    <div className="text-xl mr-4">{user.role}</div>
                    <div className="absolute -top-1 -right-5">
                      <button
                        className="btn-seqColl-neutral "
                        onClick={() => setIsEditRole(true)}
                      >
                        <span className="font-material-symbols text-xs px-2 py-1">
                          edit
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
