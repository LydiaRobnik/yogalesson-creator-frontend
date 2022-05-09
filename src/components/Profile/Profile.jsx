import React, { useContext, useEffect, useState } from 'react';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';

export default function Profile() {
  const { loggedIn, login, logout, user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    asanaService.getUser(user.id).then((user) => {
      setProfile(user);
    });

    return () => {
      setProfile({});
    };
  }, [user]);

  const handleEditName = () => {};
  const handleEditEmail = () => {};
  const handleChangeAvatar = () => {};
  const handleChangePassword = () => {};
  const handleChangeRole = () => {};

  return (
    <div className="flex justify-center border w-1/2 text-black">
      <div
        onClick={handleChangeAvatar}
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
          <div className="text-4xl mr-4">{profile.username}</div>
          <div className="absolute top-1 -right-5">
            <button
              className="btn-seqColl-neutral "
              onClick={() => handleEditName()}
            >
              <span className="font-material-symbols text-xs px-2 py-1">
                edit
              </span>
            </button>
          </div>
        </div>
        <div className="">
          {/* email */}
          <div className="flex relative mt-3">
            <div className="text-md mr-4 w-32 text-right">Email:</div>
            <div className="text-xl mr-4">{profile.email}</div>
            <div className="absolute top-0 -right-5">
              <button
                className="btn-seqColl-neutral "
                onClick={() => handleEditEmail()}
              >
                <span className="font-material-symbols text-xs px-2 py-1">
                  edit
                </span>
              </button>
            </div>
          </div>
          {/* password */}
          <div className="flex relative mt-3">
            <div className="text-md mr-4 w-32 text-right">Password: </div>
            <div className="text-xl mr-4">**********</div>
            <div className="absolute -top-1 right-6">
              <button
                className="btn-seqColl-neutral "
                onClick={() => handleChangePassword()}
              >
                <span className="font-material-symbols text-xs px-2 py-1">
                  edit
                </span>
              </button>
            </div>
          </div>

          {
            /* role */ user.role === 'admin' && (
              <div className="flex relative mt-3">
                <div className="text-md mr-4 w-32 text-right">Role: </div>
                <div className="text-xl mr-4">{user.role}</div>
                <div className="absolute -top-1 right-6">
                  <button
                    className="btn-seqColl-neutral "
                    onClick={() => handleChangeRole()}
                  >
                    <span className="font-material-symbols text-xs px-2 py-1">
                      edit
                    </span>
                  </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
