import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function UserSection() {
  const { loggedIn, user } = useContext(AuthContext);

  const [selectedAsanas, setSelectedAsanas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('loggedIn', loggedIn, user);
    // if (!loggedIn) navigate(`/403`);
    // if (!loggedIn) navigate(`/unauthorized`); // todo

    return () => {};
  }, [loggedIn]);

  return (
    <div className="w-full max-w-7xl p-3 pt-4">
      <div className="flex flex-col">
        <main className="flex">
          {loggedIn ? (
            <Outlet context={[selectedAsanas, setSelectedAsanas]} />
          ) : (
            <div>nope</div>
          )}
        </main>
      </div>
    </div>
  );
}
