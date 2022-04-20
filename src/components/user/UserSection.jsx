import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function UserSection() {
  const { loggedIn, user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('loggedIn', loggedIn, user);
    // if (!loggedIn) navigate(`/403`);
    // if (!loggedIn) navigate(`/unauthorized`); // todo

    return () => {};
  }, [loggedIn]);

  return (
    <div className="pt-4">
      <div className="flex flex-col">
        <main className="flex">{loggedIn ? <Outlet /> : <div>nope</div>}</main>
      </div>
    </div>
  );
}
