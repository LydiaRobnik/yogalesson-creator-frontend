import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './validate.scss';

export default function Validate() {
  const { login } = useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    asanaService
      .validateUser(token)
      .then((user) => {
        console.log('user', user);
        // todo autologin
        login({
          user: user.email,
          type: 'email',
          password: '5555' // todo
        })
          .then(([result, data]) => {
            if (!result) {
              setError(data.message);
            }
            console.log('result', result);
          })
          .catch((err) => {
            setError(err.message);
          });
      })
      .catch((err) => {
        setError(err.message);
      });

    return () => {};
  }, [token]);

  return (
    <div className="text-black p-4">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {/* <div>Validate: {token}</div> */}
          <div className="text-2xl">
            Success! Thank you for validating your email!
          </div>

          <div className="grow w-4/6 md:w-5/6 flex flex-row flex-wrap">
            <button
              className="btn-blue btn-blue:hover mx-2 flex flex-row items-center"
              onClick={() => navigate('/user')}
            >
              {/* <span className="font-material inline pr-2">add</span> */}
              <p className="inline pt-1 text-lg ">Dashboard</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
