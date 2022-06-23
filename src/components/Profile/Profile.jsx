import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
// import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import FileUpload from '../FileUpload/FileUpload';

const avatarPlaceholder =
  'https://www.kindpng.com/picc/m/21-211456_user-icon-hd-png-download.png';

export default function Profile() {
  const navigate = useNavigate();

  const { loggedIn, login, logout, user, setUser } = useContext(AuthContext);
  const {
    loading,
    asanaService,
    addSystemInfo,
    addSystemSuccess,
    addSystemError,
    addSystemMessage,
    clearSystemMessages
  } = useOutletContext();

  const [profile, setProfile] = useState({});
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [isEditName, setIsEditName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditRole, setIsEditRole] = useState(false);

  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [clickImage, setClickImage] = useState(false);

  useEffect(() => {
    console.log('📒 useEffect', asanaService);
    // asanaService?.setAddErrorMessage(addSystemError);
    clearSystemMessages();
    if (loggedIn) {
    }
    return () => {};
  }, []);

  useEffect(() => {
    asanaService?.getUser(user.id).then((user) => {
      setProfile(user);
      setImage(user.avatar);
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
            addSystemSuccess('Name changed');
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
          .changeUserEmail(userDb._id, userDb)
          .then((user) => {
            setProfile(user);
            setIsEditEmail(false);
            addSystemSuccess('Email changed');
            logout(false);
            navigate(`/signupInfo`);
          })
          .catch((err) => {
            console.log('📒 handleEditName err', err);
            // addSystemError(err);
          });
      })
      .catch((err) => {
        console.log('📒 handleEditName err', err);
        // addSystemError(err);
      });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('📒 handleChangePassword', profile.password);

    // check password confirmation
    if (profile.password !== passwordConfirm) {
      console.log('📒 Password confirmation does not match', passwordConfirm);
      addSystemError('Password confirmation does not match');
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
            addSystemSuccess('Password changed');
          })
          .catch((err) => {
            console.log('📒 handleEditName err', err);
            // addSystemError(err);
          });
      })
      .catch((err) => {
        console.log('📒 handleEditName err', err);
        // addSystemError(err);
      });
  };

  const handleChangeRole = () => {};

  function handleSelectImage(imageUrl, errorMessage) {
    console.log('📒 handleSelectImage', imageUrl?.length, errorMessage);
    setClickImage(false);
    if (imageUrl) {
      setUploadProgress(0);
      asanaService
        .getUser(user.id)
        .then((userDb) => {
          userDb.avatar = imageUrl;
          setUploadProgress(0);

          asanaService
            .changeUserAvatar(userDb._id, userDb, ({ loaded, total }) => {
              console.log('📒 uploadProgress', loaded, total);
              setUploadProgress(Math.floor((loaded * 100) / total));
            })
            .then((user) => {
              console.log('📒 uploaded!!');
              setProfile(user);
              setImage(imageUrl);
              setUser((prev) => ({ ...prev, avatar: user.avatar }));
              setUploadProgress(-1);
              addSystemSuccess('Avatar changed');
              // setProfile((prev) => {
              //   prev.avatar = imageUrl;
              //   return { ...prev };
              // });
              setIsEditAvatar(false);
            })
            .catch((err) => {
              console.log('📒 handleSelectImage err', err);
              // addSystemError(err);
            });
        })
        .catch((err) => {
          console.log('📒 handleSelectImage err', err);
          // addSystemError(err);
        });
    } else if (errorMessage) {
      addSystemError(errorMessage);
    }
  }

  const handleResetEdits = (e) => {
    e.stopPropagation();
    setIsEditAvatar(false);
    setIsEditName(false);
    setIsEditEmail(false);
    setIsEditPassword(false);
    setIsEditRole(false);

    setUser((prev) => ({ ...prev, refresh: !prev.refresh }));
  };

  return (
    <div className="h-full w-screen flex justify-center content-center">
      <div
        onClick={(e) => handleResetEdits(e)}
        className="border px-4 py-24 w-full md:w-11/12 lg:w-3/4 xl:w-2/3  text-black m-8"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsEditAvatar(true);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-pointer mb-2"
        >
          <div className="col-span-1 justify-self-center">
            {uploadProgress >= 0 ? (
              <div
                onClick={() => setClickImage(true)}
                className="radial-progress"
                style={{
                  '--value': `${uploadProgress}`,
                  '--size': '10rem',
                  '--thickness': '2px'
                }}
              >
                {uploadProgress}%
              </div>
            ) : (
              // <img
              //   onClick={() => setClickImage(true)}
              //   className="h-36 w-36 my-6 rounded-full hover:scale-110 shadow-lg"
              //   // className="h-36 w-36 rounded-full border-4 border-black hover:scale-110 shadow-lg"
              //   src={image}
              //   alt="bild"
              // ></img>
              <div onClick={() => setClickImage(true)} className="p-1">
                <img
                  className="h-36 w-36 rounded-full hover:scale-110 shadow-lg"
                  src={image ? image : avatarPlaceholder}
                  alt="avatar"
                />
              </div>
            )}
            <FileUpload
              className={`hidden`}
              accept={'image/*'}
              handleUpload={handleSelectImage}
              click={clickImage}
              maxSize={1024 * 400}
            />
          </div>

          <div className="col-span-1 justify-self-center md:justify-self-start md:self-center">
            {/* username */}
            <div className=" mt-3">
              {isEditName ? (
                <form className="flex justify-center">
                  <div className="flex justify-center">
                    <div
                      className="timepicker form-floating mb-3 w-10/12"
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
                <div className="flex mt-3">
                  <div className="text-md mr-4 w-24 text-left">User name:</div>
                  <div className="text-xl text-center mr-4 float-left">
                    {profile.username}
                  </div>
                  <div className="pt-1">
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

            {/* email */}
            <div className="flex mt-3 ">
              {isEditEmail ? (
                <form
                  onSubmit={(e) => handleEditEmail(e)}
                  className="border-dotted border w-full"
                >
                  <div className="flex justify-center">
                    <div
                      className="timepicker form-floating mb-3 w-10/12"
                      data-mdb-with-icon="false"
                      id="input-toggle-timepicker"
                    >
                      <input
                        type="email"
                        // pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$"
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Set Email"
                        data-mdb-toggle="input-toggle-timepicker"
                        minLength="10"
                        maxLength={30}
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
                    <button className="btn-seqColl-neutral ml-3">
                      <span className="font-material-symbols px-2 py-1">
                        add_task
                      </span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex mt-3">
                  <div className="text-md mr-4 w-24 text-left">Email:</div>
                  <div className="text-xl mr-4">{profile.email}</div>
                  <div className="">
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
            <div className="flex mt-3 ">
              {isEditPassword ? (
                <form
                  onSubmit={(e) => handleChangePassword(e)}
                  className="flex gap-2 border-dotted border p-2 w-full"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="timepicker form-floating mb-3 w-full"
                      data-mdb-with-icon="false"
                      id="input-toggle-timepicker"
                    >
                      <input
                        type="password"
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
                      className="timepicker form-floating mb-3 w-full"
                      data-mdb-with-icon="false"
                      id="input-toggle-timepicker"
                    >
                      <input
                        type="password"
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
                <div className="flex mt-3">
                  <div className="text-md mr-4 w-24 text-left">Password: </div>
                  <div className="text-xl mr-4">**********</div>
                  <div className="">
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
              /* role */ user.role === 'admino' && (
                <div className="flex mt-3">
                  {isEditRole ? (
                    <div>edit name</div>
                  ) : (
                    <div className="flex mt-3">
                      <div className="text-md mr-4 w-3/6 text-right">
                        Role:{' '}
                      </div>
                      <div className="text-xl mr-4">{user.role}</div>
                      <div className="">
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
    </div>
  );
}
